/* Abi's Study Buddy — router, screens and shell wiring */

var App = (function () {

  var screen, backBtn, backLabel, pointsCount, pointsFill, pbar, veil, modalBody;
  var route = { name: 'home', params: {} };
  var backAction = null;

  /* Whether the full reward ladder is showing. Deliberately not persisted —
     it is a view preference for the moment she is in, not something worth
     remembering between sessions. */
  var rewardsExpanded = false;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ───────────────────────── shell ───────────────────────── */

  function refreshPoints(bump) {
    var p = Store.points();
    var prog = Rewards.progress(p);

    pointsCount.textContent = p;

    /* The bar tracks progress to the next reward. Against the full 500 a single point is
       0.2% of the width, which rounds away to nothing and makes the bar look broken. */
    var capEl = document.getElementById('pointsCap');
    if (capEl) {
      capEl.textContent = prog.next ? ' → ' + prog.next.at : '/' + Store.POINT_CAP;
    }
    var goalEl = document.getElementById('pointsGoal');
    if (goalEl) {
      goalEl.textContent = prog.next ? prog.next.emoji : '🏆';
      goalEl.title = prog.next
        ? prog.need + ' more for ' + prog.next.title
        : 'Every reward earned';
    }
    if (pbar) {
      pbar.title = prog.next
        ? p + ' points · ' + prog.need + ' more for ' + prog.next.emoji + ' ' + prog.next.title
        : p + ' points · every reward earned';
    }

    pointsFill.style.width = prog.pct + '%';
    pbar.classList.toggle('is-full', p >= Store.POINT_CAP);
    if (bump) {
      pbar.classList.remove('bump');
      void pbar.offsetWidth;
      pbar.classList.add('bump');
    }
  }

  function setCrumb(label, action) {
    if (!label) {
      backBtn.hidden = true;
      backAction = null;
      return;
    }
    backBtn.hidden = false;
    backLabel.textContent = label;
    backAction = action;
  }

  function modal(cfg) {
    var needsText = !!cfg.requireText;
    modalBody.innerHTML =
      '<h3 id="modalTitle">' + cfg.title + '</h3>' +
      cfg.body +
      (needsText
        ? '<input class="field" id="modalField" type="text" autocomplete="off" spellcheck="false" placeholder="Type it exactly">'
        : '') +
      '<div class="modal-actions">' +
        (cfg.hideCancel ? '' :
          '<button class="btn btn-ghost" type="button" id="modalCancel">' +
            (cfg.cancelLabel || 'Cancel') + '</button>') +
        '<button class="btn ' + (cfg.confirmClass || 'btn-primary') + '" type="button" id="modalOk"' +
          (needsText || cfg.confirmDisabled ? ' disabled' : '') + '>' +
          (cfg.confirmLabel || 'OK') + '</button>' +
      '</div>';

    veil.hidden = false;

    var ok = document.getElementById('modalOk');
    var cancel = document.getElementById('modalCancel');

    /* Lets a caller wire up its own controls inside the body — the transfer screens
       need a textarea they can read on confirm. */
    if (cfg.onOpen) cfg.onOpen(modalBody, ok);

    if (needsText) {
      var field = document.getElementById('modalField');
      field.addEventListener('input', function () {
        ok.disabled = field.value.trim() !== cfg.requireText;
      });
      setTimeout(function () { field.focus(); }, 80);
    }

    if (cancel) cancel.addEventListener('click', closeModal);
    ok.addEventListener('click', function () {
      closeModal();
      if (cfg.onConfirm) cfg.onConfirm();
    });
  }

  function closeModal() { veil.hidden = true; modalBody.innerHTML = ''; }

  function applyMotion() {
    document.body.classList.toggle('reduce-motion', !Store.motionOn());
  }

  /* ───────────────────────── routing ───────────────────────── */

  function go(name, params) {
    Quiz.clear();
    route = { name: name, params: params || {} };
    window.scrollTo({ top: 0 });

    /* Reset to general chat before drawing. Screens that want Pip to know
       something more specific — a notes topic, a live question — say so
       during their own render, which happens inside draw(). */
    if (window.Buddy) {
      Buddy.setContext({
        id: 'app:' + name,
        title: 'Abi\'s Study Buddy',
        mode: 'app',
        /* Blank on the picker, where she has not chosen a subject yet. */
        moduleId: name === 'modules' ? '' : (Content.moduleId() || '')
      });
    }

    draw();
  }

  function draw() {
    /* The home hero carries her points in full, so the copy in the top bar
       would be the same number twice on the same screen. Everywhere else the
       bar is the only place she can see it. */
    document.body.classList.toggle('at-home', route.name === 'modules');

    switch (route.name) {
      case 'modules':   return screenModules();
      case 'home':      return screenHome();
      case 'week':      return screenWeek(route.params.weekId);
      case 'notes':     return screenNotesWeeks();
      case 'notesWeek': return screenNotesTopics(route.params.weekId);
      case 'notesTopic':return screenNotesTopic(route.params.topicId);
      /* Rewards, badges and stats are one screen now. The old route is kept
         pointing at it so any link she has open still lands somewhere sensible. */
      case 'progress':
      case 'rewards':   return screenProgress();
      default:          return screenHome();
    }
  }

  /* ───────────────────────── home ───────────────────────── */

  /* ───────────────────────── modules ───────────────────────── */

  /* The first thing she sees: which subject is she doing today.
     Points and rewards are shown here rather than per module, because there is
     only one ladder — study whichever she likes, it all feeds the same bar. */
  function greeting() {
    var h = new Date().getHours();
    if (h < 5) return 'Still up';
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }

  function screenModules() {
    setCrumb(null);

    var all = Modules.all();
    var points = Store.points();
    var nextReward = Rewards.next(points);
    var prog = Rewards.progress(points);
    var readyNow = Rewards.readyCount(points);

    var cards = all.map(function (m) {
      var content = Modules.contentFor(m.id);
      var live = m.status === 'ready' && content.weeks.length;

      if (!live) {
        return '<button class="tile acc-' + m.accent + ' is-locked" type="button" disabled>' +
          '<span class="tile-glow"></span>' +
          '<span class="tile-emoji">' + m.emoji + '</span>' +
          '<span class="tile-kicker">' + esc(m.code) + '</span>' +
          '<h3 class="tile-title">' + esc(m.title) + '</h3>' +
          '<p class="tile-desc">Coming soon — Stephen is still building this one.</p>' +
        '</button>';
      }

      var topics = 0, badges = 0;
      content.weeks.forEach(function (w) {
        (w.topics || []).forEach(function (t) {
          topics++;
          if (Store.hasBadge(t.id)) badges++;
        });
      });

      return '<button class="tile acc-' + m.accent + '" type="button" data-module="' + m.id + '">' +
        '<span class="tile-glow"></span>' +
        '<span class="tile-emoji">' + m.emoji + '</span>' +
        '<span class="tile-kicker">' + esc(m.code) + '</span>' +
        '<h3 class="tile-title">' + esc(m.title) + '</h3>' +
        '<p class="tile-desc">' + esc(m.blurb) + '</p>' +
        '<p class="tile-desc" style="margin-top:.5rem;font-weight:700;color:var(--lilac-700)">' +
          badges + ' of ' + topics + ' badges earned</p>' +
      '</button>';
    }).join('');

    /* The hero carries the reward progress rather than a card further down the
       page. On a home screen the thing she is working towards should be the
       first thing she sees, not a footnote under the tiles. */
    var goalLine = readyNow > 0
      ? '<b>' + readyNow + (readyNow === 1 ? ' reward is' : ' rewards are') + ' ready to claim.</b>'
      : nextReward
        ? (nextReward.at - points) + ' more points for ' + nextReward.emoji +
          ' <b>' + esc(nextReward.title) + '</b>'
        : 'Every reward unlocked. Genuinely well done.';

    screen.innerHTML =
      '<section class="hero">' +
        '<p class="hero-hi">' + greeting() + ', Abi <span class="hero-star">✦</span></p>' +
        '<h1 class="hero-title">What are we doing today?</h1>' +

        '<div class="hero-goal">' +
          '<div class="hero-points">' + points +
            '<span class="hero-cap">/' + Store.POINT_CAP + '</span></div>' +
          '<div class="hero-track">' +
            '<div class="hero-track-fill" style="width:' + prog.pct + '%"></div>' +
          '</div>' +
          '<p class="hero-goal-line">' + goalLine + '</p>' +
        '</div>' +
      '</section>' +

      '<div class="section-title">Your modules</div>' +
      '<div class="modgrid">' + cards + '</div>' +

      '<div class="section-title">Everything else</div>' +
      '<div class="grid-2">' +
        '<button class="tile acc-3" type="button" data-goto="progress">' +
          '<span class="tile-glow"></span><span class="tile-emoji">🏆</span>' +
          '<h3 class="tile-title">Progress &amp; rewards</h3>' +
          '<p class="tile-desc">' +
            (readyNow > 0
              ? '<b>' + readyNow + ' ready to claim!</b>'
              : 'Your points, badges and everything you have unlocked.') +
          '</p></button>' +
      '</div>';

    Array.prototype.forEach.call(screen.querySelectorAll('[data-module]'), function (b) {
      b.addEventListener('click', function () { openModule(b.getAttribute('data-module')); });
    });
    bindTiles();
  }

  function openModule(id) {
    Content.use(id);
    Store.rememberModule(id);
    go('home');
  }

  function screenHome() {
    var mod = Content.module();

    /* Back to the picker, unless this is the only module she has — in which
       case there is nothing to go back to and the crumb would be a dead end. */
    if (Modules.ready().length > 1 || Modules.all().length > 1) {
      setCrumb('All modules', function () { go('modules'); });
    } else {
      setCrumb(null);
    }

    var st = Store.get();
    var weeks = Content.weeks();
    var readyNow = Rewards.readyCount(Store.points());
    var nextReward = Rewards.next(Store.points());

    var weekTiles = weeks.map(function (w) {
      var qn = (w.topics || []).reduce(function (n, t) { return n + t.questions.length; }, 0);
      if (w.comingSoon) {
        return '<button class="tile acc-' + w.accent + ' is-locked" type="button" disabled>' +
          '<span class="tile-glow"></span>' +
          '<span class="tile-emoji">' + w.emoji + '</span>' +
          '<span class="tile-kicker">Week ' + w.number + '</span>' +
          '<h3 class="tile-title">' + esc(w.title) + '</h3>' +
          '<p class="tile-desc">Coming soon 🌸</p></button>';
      }
      return '<button class="tile acc-' + w.accent + '" type="button" data-week="' + w.id + '">' +
        '<span class="tile-glow"></span>' +
        '<span class="tile-emoji">' + w.emoji + '</span>' +
        '<span class="tile-kicker">Week ' + w.number + '</span>' +
        '<h3 class="tile-title">' + esc(w.title) + '</h3>' +
        '<p class="tile-desc">' + esc(w.blurb) + '</p>' +
        '<div style="margin-top:.8rem"><span class="chip">' + w.topics.length + ' topics</span> ' +
        '<span class="chip chip-mint">' + qn + ' questions</span></div>' +
        '</button>';
    }).join('');

    screen.innerHTML =
      '<div class="hero">' +
        '<span class="hero-orb">' + (mod ? mod.emoji : '✨') + '</span>' +
        '<h1>Hey Abi — ready to study?</h1>' +
        /* Named from the module she actually opened. This used to be the maths
           module hardcoded, which would have been quietly wrong the moment a
           second module went live. */
        '<p class="hero-sub">' +
          (mod ? esc(mod.title) + ' · ' + esc(mod.code) : 'Choose a module to begin') +
        '</p>' +
      '</div>' +

      '<div class="statstrip">' +
        '<div class="stat"><div class="stat-num">' + Store.points() + '<span style="font-size:.6em;color:var(--muted)">/' + Store.POINT_CAP + '</span></div><div class="stat-lab">Points</div></div>' +
        '<div class="stat"><div class="stat-num">' + readyNow + '</div><div class="stat-lab">Rewards ready</div></div>' +
        '<div class="stat"><div class="stat-num">' + Store.badgeCount() + '</div><div class="stat-lab">Badges</div></div>' +
        '<div class="stat"><div class="stat-num">' + st.bestStreak + '</div><div class="stat-lab">Best streak</div></div>' +
        '<div class="stat"><div class="stat-num">' + Store.accuracy() + '%</div><div class="stat-lab">Accuracy</div></div>' +
      '</div>' +

      '<div class="section-title">Pick a week</div>' +
      '<div class="grid-weeks">' + weekTiles + '</div>' +

      '<div class="section-title">Everything else</div>' +
      '<div class="grid-2">' +
        '<button class="tile acc-1" type="button" data-goto="notes">' +
          '<span class="tile-glow"></span><span class="tile-emoji">📖</span>' +
          '<h3 class="tile-title">Notes</h3>' +
          '<p class="tile-desc">Read the explanations and worked examples, topic by topic.</p></button>' +
        '<button class="tile acc-3" type="button" data-goto="progress">' +
          '<span class="tile-glow"></span><span class="tile-emoji">🏆</span>' +
          '<h3 class="tile-title">Progress &amp; rewards</h3>' +
          '<p class="tile-desc">' +
            (readyNow > 0
              ? '<b>' + readyNow + ' ready to claim!</b>'
              : (nextReward
                  ? (nextReward.at - Store.points()) + ' points to ' + nextReward.emoji + ' ' + esc(nextReward.title)
                  : 'Every reward unlocked.')) +
          '</p></button>' +
      '</div>';

    bindTiles();
  }

  function bindTiles() {
    Array.prototype.forEach.call(screen.querySelectorAll('[data-week]'), function (b) {
      b.addEventListener('click', function () { go('week', { weekId: b.getAttribute('data-week') }); });
    });
    Array.prototype.forEach.call(screen.querySelectorAll('[data-goto]'), function (b) {
      b.addEventListener('click', function () { go(b.getAttribute('data-goto'), {}); });
    });
  }

  /* ───────────────────────── week setup ───────────────────────── */

  function screenWeek(weekId) {
    var w = Content.week(weekId);
    if (!w) return go('home');

    setCrumb('All weeks', function () { go('home'); });

    var saved = Store.recallSetup(weekId) || {};
    var exam = Content.examFor(weekId);

    var mode = saved.mode || 'practise';
    if (mode === 'exam' && !exam) mode = 'practise';
    var count = saved.count || 10;

    var COUNTS = { practise: [5, 10, 15, 20, 30], test: [10, 20, 30], exam: [10, 20, 30] };

    /* Exam mode has its own topics and its own question bank — no crossover. */
    function topicsFor(m) {
      return m === 'exam' ? (exam ? exam.topics : []) : w.topics;
    }

    var chosen = {};
    function selectAllFor(m) {
      chosen = {};
      topicsFor(m).forEach(function (t) { chosen[t.id] = true; });
    }
    if (saved.mode === mode && saved.topics && saved.topics.length) {
      saved.topics.forEach(function (id) { if (Content.topic(id)) chosen[id] = true; });
    }
    if (!Object.keys(chosen).length) selectAllFor(mode);

    function picklist() {
      return topicsFor(mode).map(function (t) {
        var badge = Store.hasBadge(t.id) ? ' 🏅' : '';
        var supply = Content.isUnlimited([t.id])
          ? '∞ questions'
          : t.questions.length + ' questions';
        return '<button class="pick' + (chosen[t.id] ? ' is-on' : '') + '" type="button" data-topic="' + t.id + '">' +
          '<span class="pick-box">✓</span>' +
          '<span class="pick-emoji">' + t.emoji + '</span>' +
          '<span class="pick-body">' +
            '<span class="pick-title">' + esc(t.title) + badge + '</span>' +
            '<span class="pick-meta">' + supply + ' · ' + esc(t.summary) + '</span>' +
          '</span></button>';
      }).join('');
    }

    function countPills() {
      return COUNTS[mode].map(function (c) {
        return '<button class="pill' + (c === count ? ' is-on' : '') + '" type="button" data-count="' + c + '">' + c + '</button>';
      }).join('');
    }

    screen.innerHTML =
      '<div class="pagehead">' +
        '<span class="kicker">Week ' + w.number + '</span>' +
        '<h1>' + w.emoji + ' ' + esc(w.title) + '</h1>' +
        '<p>' + esc(w.blurb) + '</p>' +
      '</div>' +

      '<div class="setup-block">' +
        '<h3><span class="step-no">1</span> What kind of session?</h3>' +
        '<div class="modecards">' +
          '<button class="modecard' + (mode === 'practise' ? ' is-on' : '') + '" type="button" data-mode="practise">' +
            '<div class="modecard-top"><span class="em">🌱</span><span class="nm">Practise</span></div>' +
            '<p>The notes for each topic sit right above the question — open them whenever you need, hide them when you don\'t. No points, no pressure.</p>' +
          '</button>' +
          '<button class="modecard' + (mode === 'test' ? ' is-on' : '') + '" type="button" data-mode="test">' +
            '<div class="modecard-top"><span class="em">⭐</span><span class="nm">Test</span></div>' +
            '<p>Questions only — no notes, no hints. Every correct answer earns you <b>1 point</b>.</p>' +
          '</button>' +
          (exam
            ? '<button class="modecard' + (mode === 'exam' ? ' is-on' : '') + '" type="button" data-mode="exam">' +
                '<div class="modecard-top"><span class="em">📝</span><span class="nm">Exam Questions</span></div>' +
                '<p>Longer, multi-step questions in the style of the real practice paper. Its own separate question bank. ' +
                '<b>2 points</b> each.</p>' +
              '</button>'
            : '') +
        '</div>' +
      '</div>' +

      '<div class="setup-block">' +
        '<h3><span class="step-no">2</span> Which topics?</h3>' +
        '<div class="pillrow" style="margin-bottom:.8rem">' +
          '<button class="pill" type="button" id="selAll">Select all</button>' +
          '<button class="pill" type="button" id="selNone">Clear all</button>' +
        '</div>' +
        '<div class="picklist" id="picklist">' + picklist() + '</div>' +
      '</div>' +

      '<div class="setup-block">' +
        '<h3><span class="step-no">3</span> How many questions?</h3>' +
        '<div class="pillrow" id="countRow">' + countPills() + '</div>' +
      '</div>' +

      '<div class="launchbar">' +
        '<div class="lb-info" id="lbInfo"></div>' +
        '<button class="btn btn-pink btn-lg" type="button" id="startBtn">Let\'s go ✨</button>' +
      '</div>';

    function chosenIds() {
      return Object.keys(chosen).filter(function (k) { return chosen[k]; });
    }

    function updateInfo() {
      var ids = chosenIds();
      var info = document.getElementById('lbInfo');
      var start = document.getElementById('startBtn');

      if (!ids.length) {
        info.innerHTML = 'Pick at least one topic to get started.';
        start.disabled = true;
        return;
      }
      start.disabled = false;

      var unlimited = Content.isUnlimited(ids);
      var pool = unlimited ? count : Content.poolSize(ids);
      var actual = Math.min(count, pool);

      var tail = unlimited
        ? ' <span style="color:var(--mint-600)">· freshly generated every time ✨</span>'
        : (pool < count
            ? ' <span style="color:var(--pink-600)">(only ' + pool + ' available in these topics)</span>'
            : '');

      var modeName = { practise: 'Practise', test: 'Test', exam: 'Exam Questions' }[mode];
      info.innerHTML = '<b>' + actual + '</b> question' + (actual === 1 ? '' : 's') +
        ' · <b>' + modeName + '</b> · ' +
        ids.length + ' topic' + (ids.length === 1 ? '' : 's') + tail;
    }

    function rebindPicks() {
      Array.prototype.forEach.call(screen.querySelectorAll('[data-topic]'), function (b) {
        b.addEventListener('click', function () {
          var id = b.getAttribute('data-topic');
          chosen[id] = !chosen[id];
          b.classList.toggle('is-on', !!chosen[id]);
          updateInfo();
        });
      });
    }

    rebindPicks();

    document.getElementById('selAll').addEventListener('click', function () {
      selectAllFor(mode);
      document.getElementById('picklist').innerHTML = picklist();
      rebindPicks();
      updateInfo();
    });
    document.getElementById('selNone').addEventListener('click', function () {
      chosen = {};
      document.getElementById('picklist').innerHTML = picklist();
      rebindPicks();
      updateInfo();
    });

    Array.prototype.forEach.call(screen.querySelectorAll('[data-mode]'), function (b) {
      b.addEventListener('click', function () {
        var previous = mode;
        mode = b.getAttribute('data-mode');
        Array.prototype.forEach.call(screen.querySelectorAll('[data-mode]'), function (o) {
          o.classList.toggle('is-on', o === b);
        });

        // Exam mode uses a different set of topics, so the picklist has to be rebuilt
        if ((previous === 'exam') !== (mode === 'exam')) {
          selectAllFor(mode);
          document.getElementById('picklist').innerHTML = picklist();
          rebindPicks();
        }

        if (COUNTS[mode].indexOf(count) === -1) count = COUNTS[mode][0];
        document.getElementById('countRow').innerHTML = countPills();
        bindCounts();
        updateInfo();
      });
    });

    function bindCounts() {
      Array.prototype.forEach.call(screen.querySelectorAll('[data-count]'), function (b) {
        b.addEventListener('click', function () {
          count = parseInt(b.getAttribute('data-count'), 10);
          Array.prototype.forEach.call(screen.querySelectorAll('[data-count]'), function (o) {
            o.classList.toggle('is-on', o === b);
          });
          updateInfo();
        });
      });
    }
    bindCounts();
    updateInfo();

    document.getElementById('startBtn').addEventListener('click', function () {
      var ids = chosenIds();
      if (!ids.length) return;
      Store.rememberSetup(weekId, { topics: ids, mode: mode, count: count });
      Quiz.start({ weekId: weekId, topicIds: ids, mode: mode, count: count });
    });
  }

  /* ───────────────────────── notes ───────────────────────── */

  function screenNotesWeeks() {
    setCrumb('Home', function () { go('home'); });
    var tiles = Content.weeks().map(function (w) {
      if (w.comingSoon) {
        return '<button class="tile acc-' + w.accent + ' is-locked" type="button" disabled>' +
          '<span class="tile-glow"></span><span class="tile-emoji">' + w.emoji + '</span>' +
          '<span class="tile-kicker">Week ' + w.number + '</span>' +
          '<h3 class="tile-title">' + esc(w.title) + '</h3>' +
          '<p class="tile-desc">' + esc(w.comingSoonNote || 'Coming soon') + '</p></button>';
      }
      return '<button class="tile acc-' + w.accent + '" type="button" data-nweek="' + w.id + '">' +
        '<span class="tile-glow"></span><span class="tile-emoji">' + w.emoji + '</span>' +
        '<span class="tile-kicker">Week ' + w.number + '</span>' +
        '<h3 class="tile-title">' + esc(w.title) + '</h3>' +
        '<p class="tile-desc">' + esc(w.blurb) + '</p></button>';
    }).join('');

    screen.innerHTML =
      '<div class="pagehead"><span class="kicker">Notes</span>' +
      '<h1>📖 Your study notes</h1>' +
      '<p>Concepts explained from the ground up, with worked examples you can follow step by step.</p></div>' +
      '<div class="grid-weeks">' + tiles + '</div>';

    Array.prototype.forEach.call(screen.querySelectorAll('[data-nweek]'), function (b) {
      b.addEventListener('click', function () { go('notesWeek', { weekId: b.getAttribute('data-nweek') }); });
    });
  }

  function screenNotesTopics(weekId) {
    var w = Content.week(weekId);
    if (!w) return go('notes');
    setCrumb('All notes', function () { go('notes'); });

    var list = w.topics.map(function (t) {
      return '<button class="pick" type="button" data-ntopic="' + t.id + '">' +
        '<span class="pick-emoji">' + t.emoji + '</span>' +
        '<span class="pick-body">' +
          '<span class="pick-title">' + esc(t.title) + (Store.hasBadge(t.id) ? ' 🏅' : '') + '</span>' +
          '<span class="pick-meta">' + esc(t.summary) + '</span>' +
        '</span><span style="color:var(--lilac-400);font-weight:800">›</span></button>';
    }).join('');

    screen.innerHTML =
      '<div class="pagehead"><span class="kicker">Week ' + w.number + ' notes</span>' +
      '<h1>' + w.emoji + ' ' + esc(w.title) + '</h1>' +
      '<p>Choose a topic to read.</p></div>' +
      '<div class="picklist">' + list + '</div>';

    Array.prototype.forEach.call(screen.querySelectorAll('[data-ntopic]'), function (b) {
      b.addEventListener('click', function () { go('notesTopic', { topicId: b.getAttribute('data-ntopic') }); });
    });
  }

  function screenNotesTopic(topicId) {
    var t = Content.topic(topicId);
    var w = Content.weekOfTopic(topicId);
    if (!t || !w) return go('notes');

    setCrumb('Week ' + w.number + ' topics', function () { go('notesWeek', { weekId: w.id }); });

    screen.innerHTML =
      '<div class="pagehead"><span class="kicker">Week ' + w.number + ' · Notes</span>' +
      '<h1>' + t.emoji + ' ' + esc(t.title) + '</h1>' +
      '<p>' + esc(t.summary) + '</p></div>' +
      Notes.renderBlocks(t, true) +
      '<div class="card" style="margin-top:1.6rem;text-align:center;background:linear-gradient(150deg,var(--lilac-50),var(--pink-50))">' +
        '<p style="font-weight:700;margin-bottom:.8rem">Feeling ready to try some questions?</p>' +
        '<button class="btn btn-pink btn-lg" type="button" id="toQuiz">Practise this topic 🌱</button>' +
      '</div>';

    Notes.bind(screen);

    /* The tutor is given the notes as rendered on this page, so it is talking
       about exactly what she is looking at — and can never drift out of step
       with the content the way a separate copy would. */
    Buddy.setContext({
      id: t.id,
      title: t.title,
      moduleId: Content.moduleId(),
      mode: 'notes',
      notes: screen.textContent || ''
    });

    document.getElementById('toQuiz').addEventListener('click', function () {
      Quiz.start({
        weekId: w.id,
        topicIds: [t.id],
        mode: 'practise',
        count: 10,
        // come back here afterwards, not to the week's setup screen
        origin: { name: 'notesTopic', params: { topicId: t.id }, label: 'Back to the notes' }
      });
    });
  }

  /* ─────────────────── progress, rewards and badges ─────────────────── */

  /* One screen, because they were three views of the same thing: points earned,
     what those points unlock, and which topics she has mastered. Splitting them
     meant checking two places to answer "how am I doing", and the points figure
     appeared on both.

     It sits above the modules rather than inside one, since points and rewards
     are shared across every module — the badges are simply grouped by module. */
  function screenProgress() {
    setCrumb('Home', function () { go('modules'); });

    var st = Store.get();
    var points = Store.points();
    var next = Rewards.next(points);
    var ready = Rewards.readyCount(points);

    /* ── the reward ladder ──
       Twenty-four rewards is a long scroll, and most of them are neither
       claimable nor close. Collapsed she sees what she can take now and the
       few she is actually working towards; the rest are one tap away. */
    var ladder = Rewards.all();
    var shown = ladder;

    if (!rewardsExpanded) {
      var lockedSoFar = 0;
      shown = ladder.filter(function (rw) {
        var state = Rewards.state(rw, points);
        if (state === 'ready') return true;          // claimable — always show
        if (state === 'claimed') return false;       // already hers
        lockedSoFar++;
        return lockedSoFar <= 3;                     // the next few to aim at
      });
    }

    var hiddenCount = ladder.length - shown.length;

    var rows = shown.map(function (rw, i) {
      var state = Rewards.state(rw, points);
      var body =
        '<div class="reward-face">' + rw.emoji + '</div>' +
        '<div class="reward-body">' +
          '<div class="reward-title">' + esc(rw.title) + '</div>' +
          '<div class="reward-note">' + esc(rw.note) + '</div>' +
        '</div>' +
        '<div class="reward-side">';

      if (state === 'claimed') {
        body += '<span class="chip chip-mint">Claimed ✓</span>';
      } else if (state === 'ready') {
        body += '<button class="btn btn-pink btn-sm" type="button" data-claim="' + rw.at + '">Claim it</button>';
      } else {
        body += '<span class="reward-at">' + rw.at + '</span>' +
                '<span class="reward-need">' + (rw.at - points) + ' to go</span>';
      }
      body += '</div>';

      return '<div class="reward is-' + state + ' is-' + (rw.kind || 'milestone') + '" data-reward="' + i + '">' +
             body + '</div>';
    }).join('');

    var nudge = next
      ? '<p>Next up at <b>' + next.at + ' points</b>: ' + next.emoji + ' ' + esc(next.title) +
        ' — <b>' + (next.at - points) + '</b> more to go.</p>'
      : '<p>You have reached every single reward. All ' + Store.POINT_CAP +
        ' points of them. Extraordinary.</p>';

    /* ── badges, grouped by module ──
       Read straight from each module's own content rather than from whichever
       module happens to be loaded, so this screen shows everything she has
       earned across all of them at once. */
    var badgeSections = Modules.all().map(function (mod) {
      var content = Modules.contentFor(mod.id);
      var weeks = (content.weeks || []).filter(function (w) {
        return !w.comingSoon && (w.topics || []).length;
      });
      if (!weeks.length) return '';

      var earnedHere = 0, totalHere = 0;
      var weekBlocks = weeks.map(function (w) {
        var badges = w.topics.map(function (t) {
          var earned = Store.hasBadge(t.id);
          var got = Store.topicCorrect(t.id);
          totalHere++;
          if (earned) earnedHere++;
          return '<div class="badge' + (earned ? ' is-earned' : '') + '" title="' + esc(t.title) + '">' +
            '<div class="badge-face">' + t.emoji + '</div>' +
            '<div class="badge-name">' + esc(t.title) + '</div>' +
            '<div class="badge-name" style="font-size:.65rem;opacity:.8">' +
              (earned ? 'Unlocked!' : got + '/' + Store.BADGE_AT) + '</div>' +
          '</div>';
        }).join('');
        return '<div class="section-title">Week ' + w.number + ' · ' + esc(w.title) + '</div>' +
               '<div class="badgegrid">' + badges + '</div>';
      }).join('');

      return '<div class="modbadges">' +
        '<div class="modbadges-head">' +
          '<span class="modbadges-emoji">' + mod.emoji + '</span>' +
          '<span><b>' + esc(mod.code) + '</b> · ' + esc(mod.title) + '</span>' +
          '<span class="chip chip-pink">' + earnedHere + '/' + totalHere + '</span>' +
        '</div>' +
        weekBlocks +
      '</div>';
    }).join('');

    screen.innerHTML =
      '<div class="pagehead"><span class="kicker">Your progress</span>' +
      '<h1>🏆 How you\'re doing</h1>' +
      '<p>Every correct answer in Test mode is 1 point, and in Exam Questions it is 2. ' +
      'Points from every module go to the same rewards.</p></div>' +

      '<div class="statstrip">' +
        '<div class="stat"><div class="stat-num">' + points +
          '<span style="font-size:.6em;color:var(--muted)">/' + Store.POINT_CAP + '</span></div>' +
          '<div class="stat-lab">Points</div></div>' +
        '<div class="stat"><div class="stat-num">' + ready + '</div><div class="stat-lab">Ready to claim</div></div>' +
        '<div class="stat"><div class="stat-num">' + Store.badgeCount() + '</div><div class="stat-lab">Badges</div></div>' +
        '<div class="stat"><div class="stat-num">' + st.totalCorrect + '</div><div class="stat-lab">Correct answers</div></div>' +
        '<div class="stat"><div class="stat-num">' + st.bestStreak + '</div><div class="stat-lab">Best streak</div></div>' +
        '<div class="stat"><div class="stat-num">' + Store.accuracy() + '%</div><div class="stat-lab">Accuracy</div></div>' +
      '</div>' +

      '<div class="card" style="margin:1.4rem 0;background:linear-gradient(150deg,var(--lilac-50),var(--pink-50))">' +
        nudge +
      '</div>' +

      '<div class="section-title">🎁 Rewards</div>' +
      '<div class="rewardlist">' + rows + '</div>' +
      (hiddenCount > 0 || rewardsExpanded
        ? '<button class="btn btn-ghost btn-block" type="button" id="ladderToggle" ' +
          'style="margin-top:.8rem">' +
            (rewardsExpanded
              ? 'Show fewer'
              : 'Show all ' + ladder.length + ' rewards (' + hiddenCount + ' more)') +
          '</button>'
        : '') +

      '<div class="section-title" style="margin-top:2.2rem">🏅 Badges</div>' +
      '<p style="font-size:.92rem;color:var(--ink-soft);margin:-.4rem 0 1rem">Answer ' +
        Store.BADGE_AT + ' questions correctly in a topic to unlock its badge. Practise and ' +
        'test both count.</p>' +
      badgeSections +

      travelCard();

    Array.prototype.forEach.call(screen.querySelectorAll('[data-claim]'), function (b) {
      b.addEventListener('click', function () {
        var at = parseInt(b.getAttribute('data-claim'), 10);
        var rw = null;
        Rewards.all().forEach(function (r) { if (r.at === at) rw = r; });
        if (!rw) return;

        modal({
          title: rw.emoji + ' ' + rw.title,
          body: '<p>' + esc(rw.note) + '</p>' +
                '<p style="font-size:.9rem;color:var(--ink-soft)">Claiming marks it as used, and it cannot be ' +
                'un-claimed. Go and tell Stephen!</p>',
          confirmLabel: 'Claim it 🎉',
          confirmClass: 'btn-pink',
          onConfirm: function () {
            Store.claim(at);

            /* Stephen is the one who has to honour this, so he is told what was
               claimed and when. Fire-and-forget on purpose: the claim is already
               recorded, and a mail provider having a bad day must not make it
               look as though it failed. */
            if (window.Notify) {
              Notify.send(
                'claim',
                rw.emoji + ' ' + rw.title + ' (at ' + rw.at + ' points)',
                'Claimed with ' + Store.points() + ' points on the board'
              );
            }

            Celebrate.confetti(120);
            Celebrate.sparkles(20, window.innerWidth / 2, window.innerHeight / 2);
            screenProgress();
          }
        });
      });
    });

    var toggle = document.getElementById('ladderToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        rewardsExpanded = !rewardsExpanded;
        screenProgress();
      });
    }

    var codeOut = document.getElementById('codeOutBtn');
    var codeIn = document.getElementById('codeInBtn');
    if (codeOut) codeOut.addEventListener('click', showCodeOut);
    if (codeIn) codeIn.addEventListener('click', showCodeIn);
  }

  /* ──────────────────── is anything actually being saved? ──────────────────── */

  function browserName() {
    var ua = navigator.userAgent || '';
    if (navigator.brave) return 'Brave';        // Brave's user agent claims to be Chrome
    if (/Edg\//.test(ua)) return 'Edge';
    if (/Firefox\//.test(ua)) return 'Firefox';
    if (/OPR\//.test(ua)) return 'Opera';
    if (/Chrome\//.test(ua)) return 'Chrome';
    return 'this browser';
  }

  function whenText(iso) {
    var day = Transfer.savedOn(iso);
    if (!day) return null;
    var d = new Date(iso);
    var mins = d.getMinutes();
    return day + ' at ' + d.getHours() + ':' + (mins < 10 ? '0' + mins : mins);
  }

  /* How her progress gets from one device to another.

     On the hosted site that happens by itself, so this reports on it. Opened
     from a folder there is no account to sync with, and the transfer code is
     the only way across — the two never appear together, because there should
     only ever be one way to do a thing. */
  function travelCard() {
    /* Nothing to say on the hosted site: Settings reports on syncing, and
       progress moves between devices without her doing anything. */
    if (window.Cloud && Cloud.enabled()) return '';

    return '<div class="card" style="margin-top:1.2rem">' +
      '<h3>📦 Moving to another laptop</h3>' +
      '<p style="font-size:.93rem;color:var(--ink-soft)">Your points and badges are saved in this ' +
      'browser, on this computer — copying the site across does not bring them with it. ' +
      'This turns everything you have earned into one line of text you can send to yourself ' +
      'and paste in on the other side.</p>' +
      '<div class="pillrow" style="margin-top:.9rem">' +
        '<button class="btn btn-primary" type="button" id="codeOutBtn">Get my code</button>' +
        '<button class="btn btn-ghost" type="button" id="codeInBtn">Paste a code in</button>' +
      '</div>' +
    '</div>';
  }

  function showSaveWarning() {
    var warn = document.getElementById('saveWarn');
    if (!warn) return;
    var h = Store.health();
    if (h.ok) { warn.hidden = true; return; }

    warn.hidden = false;
    warn.innerHTML =
      '<b>⚠️ ' + browserName() + ' is not letting this site save anything.</b> ' +
      'You can carry on, but your points will disappear when you close the window. ' +
      'Show this to Stephen — it is a browser setting, not anything you did.';
  }

  /* ──────────────────── moving between computers ──────────────────── */

  function showCodeOut() {
    var code = Transfer.makeCode();
    var ta, note;

    modal({
      title: '📦 Your progress code',
      body:
        '<p style="font-size:.93rem;color:var(--ink-soft)">This one line holds your <b>' +
        Store.points() + ' points</b>, <b>' + Store.badgeCount() + ' badges</b> and everything ' +
        'you have answered. Send it to yourself however is easiest — a message to yourself works ' +
        'fine. Then on the other laptop open <b>Progress</b> and choose <b>Paste a code in</b>.</p>' +
        '<textarea class="field codebox" id="codeOut" rows="4" readonly spellcheck="false"></textarea>' +
        '<button class="btn btn-pink" type="button" id="codeCopy">Copy it 📋</button>' +
        '<p class="codenote" id="codeNote"></p>',
      confirmLabel: 'Done',
      hideCancel: true,
      onOpen: function (body) {
        ta = body.querySelector('#codeOut');
        note = body.querySelector('#codeNote');

        /* Assigned as a value, never written into the markup — the code is base64
           and would otherwise need escaping on the way in and back out again. */
        ta.value = code;

        body.querySelector('#codeCopy').addEventListener('click', function () {
          ta.focus();
          ta.select();
          var copied = false;
          try { copied = document.execCommand('copy'); } catch (e) {}
          note.className = 'codenote ' + (copied ? 'is-good' : 'is-bad');
          note.textContent = copied
            ? 'Copied. Paste it somewhere you can open on the other laptop.'
            : 'Could not copy by itself — the code is selected for you, so press Ctrl+C now.';
        });

        setTimeout(function () { ta.focus(); ta.select(); }, 80);
      }
    });
  }

  function showCodeIn() {
    var reading = null;
    var ta, note, okBtn;

    var here = Store.points();

    modal({
      title: '📥 Paste a code in',
      body:
        '<p style="font-size:.93rem;color:var(--ink-soft)">Paste the code from the other laptop. ' +
        'It replaces what is saved on this computer' +
        (here ? ' — there are <b>' + here + ' points</b> here at the moment' : '') + '.</p>' +
        '<textarea class="field codebox" id="codeIn" rows="4" spellcheck="false" ' +
        'placeholder="Paste the code here"></textarea>' +
        '<p class="codenote" id="codeInNote"></p>',
      confirmLabel: 'Bring it in ✨',
      confirmClass: 'btn-pink',
      confirmDisabled: true,
      onOpen: function (body, ok) {
        ta = body.querySelector('#codeIn');
        note = body.querySelector('#codeInNote');
        okBtn = ok;

        /* Checked as she types rather than on confirm, so she sees the points and
           badges the code contains before anything here is replaced. */
        ta.addEventListener('input', function () {
          reading = Transfer.inspect(ta.value);
          if (!reading.ok) {
            okBtn.disabled = true;
            note.className = 'codenote is-bad';
            note.textContent = ta.value.replace(/\s+/g, '') ? reading.why : '';
            return;
          }
          var when = Transfer.savedOn(reading.saved);
          okBtn.disabled = false;
          note.className = 'codenote is-good';
          note.textContent = 'Found ' + reading.points + ' points, ' + reading.badges +
            (reading.badges === 1 ? ' badge' : ' badges') + ' and ' + reading.correct +
            ' correct answers' + (when ? ', saved on ' + when : '') + '.';
        });

        setTimeout(function () { ta.focus(); }, 80);
      },
      onConfirm: function () {
        /* The textarea is detached by now, but `reading` was captured on the last
           keystroke, so there is nothing left to read out of the DOM. */
        if (!reading || !reading.ok || !Transfer.apply(reading)) return;

        applyMotion();
        refreshPoints(true);
        showSaveWarning();
        screenProgress();

        /* The restore always looks right on screen, because the app is reading it out
           of memory. Whether it reached disk is a separate question, and the wrong
           moment to discover the answer is after the window has been closed. */
        if (!Store.health().ok) {
          modal({
            title: '⚠️ It came in, but it will not stay',
            body: '<p>Your <b>' + Store.points() + ' points</b> are showing now, but ' +
                  browserName() + ' is refusing to save anything on this laptop, so closing ' +
                  'this window will lose them again.</p>' +
                  '<p style="font-size:.9rem;color:var(--ink-soft)">Keep the code safe and show ' +
                  'this message to Stephen — it is a browser setting that needs changing.</p>',
            confirmLabel: 'OK',
            confirmClass: 'btn-danger',
            hideCancel: true
          });
          return;
        }

        Celebrate.confetti(140);
        modal({
          title: '✨ All moved across',
          body: '<p>Everything is here: <b>' + Store.points() + ' points</b>, <b>' +
                Store.badgeCount() + ' badges</b> and your whole answer history. ' +
                'Carry on exactly where you left off.</p>',
          confirmLabel: 'Lovely',
          hideCancel: true
        });
      }
    });
  }

  /* ───────────────────────── boot ───────────────────────── */

  function init() {
    screen      = document.getElementById('screen');
    backBtn     = document.getElementById('backBtn');
    backLabel   = document.getElementById('backLabel');
    pointsCount = document.getElementById('pointsCount');
    pointsFill  = document.getElementById('pointsFill');
    pbar        = document.querySelector('.pbar');
    veil        = document.getElementById('modalVeil');
    modalBody   = document.getElementById('modalBody');

    backBtn.addEventListener('click', function () { if (backAction) backAction(); });

    var cog = document.getElementById('settingsBtn');
    if (cog) cog.addEventListener('click', function () { Settings.open(); });

    var home = document.getElementById('homeBtn');
    home.addEventListener('click', goHomeSafely);
    home.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goHomeSafely(); }
    });

    veil.addEventListener('click', function (e) { if (e.target === veil) closeModal(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !veil.hidden) closeModal();
    });

    applyMotion();
    showSaveWarning();
    refreshPoints();

    /* Appended to the body rather than to a screen, so she stays put while
       the page changes underneath her. */
    if (window.Buddy) Buddy.mount();

    /* The module picker IS home. A module is still loaded up front so that any
       screen reached directly has content behind it, but she always starts by
       choosing what she is doing today. */
    var resume = Modules.remembered();
    if (resume) Content.use(resume);
    go('modules');
  }

  /* The brand in the top bar goes all the way out to the module picker — it is
     the one thing on screen that always means "start again from the top". */
  function goHomeSafely() {
    if (Quiz.active()) {
      modal({
        title: 'Leave this round?',
        body: '<p>Your progress in this round will not be saved, but any points and badges you have already ' +
              'earned are safe.</p>',
        confirmLabel: 'Yes, go home',
        confirmClass: 'btn-danger',
        onConfirm: function () { go('modules'); }
      });
      return;
    }
    go('modules');
  }

  return {
    init: init,
    go: go,
    modal: modal,
    setCrumb: setCrumb,
    refreshPoints: refreshPoints
  };
})();

/* Her saved progress is fetched before the first screen is drawn, so she never
   sees a stale points total flick up to the real one a second later. Cloud.pull
   always calls back, including when the server cannot be reached — a lost
   connection must leave her working offline, not staring at a blank page. */
document.addEventListener('DOMContentLoaded', function () {
  if (window.Cloud && Cloud.enabled()) Cloud.pull(App.init);
  else App.init();
});
