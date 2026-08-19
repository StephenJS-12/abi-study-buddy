/* Abi's Study Buddy — router, screens and shell wiring */

var App = (function () {

  var screen, backBtn, backLabel, pointsCount, pointsFill, pbar, veil, modalBody;
  var route = { name: 'home', params: {} };
  var backAction = null;

  /* WHERE SHE CAME FROM.
   *
   * Every screen used to name its own Back destination, which made Back mean
   * "the page above this one in the structure" rather than "the page I was
   * just on". Opening the schedule from the module picker and pressing Back
   * landed her in whichever module she happened to have open last — a screen
   * she had not been on and had not asked for.
   *
   * So this is a real history stack. go() pushes where she was, back() pops.
   * Each entry carries the module that was loaded at the time, because the
   * calendar can send her into a topic belonging to a different subject, and
   * coming back has to restore the module as well as the screen.
   */
  var history = [];
  var MAX_HISTORY = 40;

  /* Screens that belong to one module, and so wear that module's colour.
     Everything not listed here spans every module and stays the default. */
  var INSIDE_MODULE = {
    home: true, week: true, notes: true, notesWeek: true, notesTopic: true
  };

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

    /* onConfirm runs BEFORE the body is thrown away, so a handler can still
       read its own form. It used to run after, which meant every field in the
       modal was already destroyed and any dialog that asked a question got
       nothing back — silently, because reading a property off null throws
       inside a click handler and goes nowhere.

       The close is in a finally so a handler that fails cannot leave her
       staring at a modal with a dead button. */
    ok.addEventListener('click', function () {
      try {
        if (cfg.onConfirm) cfg.onConfirm();
      } finally {
        closeModal();
      }
    });
  }

  function closeModal() { veil.hidden = true; modalBody.innerHTML = ''; }

  function applyMotion() {
    document.body.classList.toggle('reduce-motion', !Store.motionOn());
  }

  /* ───────────────────────── routing ───────────────────────── */

  function go(name, params, opts) {
    opts = opts || {};

    /* The brand in the top bar means "start again from the top", so it wipes
       the trail rather than adding to it. */
    if (opts.reset) history.length = 0;

    /* Going to the screen she is already on is not a journey, so it must not
       leave a copy of that screen behind for Back to return to. */
    var samePlace = route.name === name && sameParams(route.params, params || {});
    if (!opts.reset && !opts.replace && !samePlace) {
      history.push({
        name: route.name,
        params: route.params,
        /* `fromModule` is for callers that switch module BEFORE navigating —
           the calendar does, and without this the trail would record where she
           ended up rather than where she left. */
        moduleId: opts.fromModule !== undefined ? opts.fromModule : (Content.moduleId() || null)
      });
      if (history.length > MAX_HISTORY) history.shift();
    }

    enter(name, params);
  }

  /* Back. Pops where she was and returns there, restoring the module that was
     loaded at the time — a calendar session can send her into a topic from a
     different subject, and coming back has to undo that too. */
  function back() {
    if (!history.length) return enter('modules', {});
    var prev = history.pop();

    if (prev.moduleId && prev.moduleId !== Content.moduleId()) {
      Content.use(prev.moduleId);
      Store.rememberModule(prev.moduleId);
    }
    enter(prev.name, prev.params);
  }

  /* The shared part of both: everything except deciding what to remember. */
  function enter(name, params) {
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

  /* Shallow is enough: route params are flat, and the only array among them
     is the list of week ids. */
  function sameParams(a, b) {
    var k;
    for (k in a) {
      if (!Object.prototype.hasOwnProperty.call(a, k)) continue;
      if (String(a[k]) !== String(b[k])) return false;
    }
    for (k in b) {
      if (!Object.prototype.hasOwnProperty.call(b, k)) continue;
      if (String(a[k]) !== String(b[k])) return false;
    }
    return true;
  }

  /* What to call the screen Back would return to. The label has to describe
     where she is going, not where she is — "All modules" when that is what is
     underneath, "Schedule" when she came in from the calendar. */
  function backLabelFor(prev) {
    if (!prev) return null;
    switch (prev.name) {
      case 'modules':   return 'All modules';
      case 'home':      return prev.moduleId && Modules.get(prev.moduleId)
                                ? Modules.get(prev.moduleId).code
                                : 'Module';
      case 'notes':     return 'All notes';
      case 'notesWeek': return 'Topics';
      case 'notesTopic':return 'Notes';
      case 'schedule':  return 'Schedule';
      case 'progress':
      case 'rewards':   return 'Progress';
      case 'week':      return 'Questions';
      default:          return 'Back';
    }
  }

  /* Puts the Back button where the history says it should point. Screens no
     longer choose this for themselves — that is what made Back mean "up a
     level" instead of "where I just was". */
  function crumbFromHistory() {
    if (!history.length) return setCrumb(null);
    setCrumb(backLabelFor(history[history.length - 1]), back);
  }

  function draw() {
    /* The home hero carries her points in full, so the copy in the top bar
       would be the same number twice on the same screen. Everywhere else the
       bar is the only place she can see it. */
    document.body.classList.toggle('at-home', route.name === 'modules');
    /* The page is 940px wide because that is a comfortable reading measure for
       notes and questions. A seven-day calendar is not reading matter, and at
       940px each day column came out 127px wide with the topic titles cut off.
       The schedule screen gets the width it needs instead. */
    document.body.classList.toggle('at-schedule', route.name === 'schedule');

    /* A module's own colour, but only on the screens that belong to it. The
       picker, the schedule and progress all span every module at once, so a
       single module's colour would mean nothing there. */
    Themes.apply(INSIDE_MODULE[route.name] ? Content.moduleId() : '');

    switch (route.name) {
      case 'modules':   return screenModules();
      case 'home':      return screenHome();
      case 'week':      return screenWeek(route.params.weekIds || route.params.weekId, route.params.mode);
      case 'notes':     return screenNotesWeeks();
      case 'notesWeek': return screenNotesTopics(route.params.weekId);
      case 'notesTopic':return screenNotesTopic(route.params.topicId);
      case 'schedule':  return screenSchedule();
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
        /* Just the standing figure. The module blurb sat above this saying what
           the subject is, which she already knows — it is her degree. */
        '<p class="tile-desc tile-stat">' + badges + ' of ' + topics + ' badges</p>' +
      '</button>';
    }).join('');

    /* The hero carries the reward progress rather than a card further down the
       page. On a home screen the thing she is working towards should be the
       first thing she sees, not a footnote under the tiles.

       Number, bar and caption all describe the SAME thing: how far she is
       towards the next reward. They used to disagree — the bar measured the
       gap to the next reward while the number read "85/1000", so a bar three
       quarters full sat under a figure that was eight percent of its total. */
    var target = nextReward
      ? '<span class="hero-cap"> → ' + nextReward.at + '</span>'
      : '<span class="hero-cap">/' + Store.POINT_CAP + '</span>';

    var goalLine = nextReward
      ? '<b>' + (nextReward.at - points) + '</b> more ' +
        (nextReward.at - points === 1 ? 'point' : 'points') + ' for ' +
        nextReward.emoji + ' <b>' + esc(nextReward.title) + '</b>'
      : 'Every reward unlocked. Genuinely well done.';

    /* Claimable rewards are their own fact, not a replacement for the goal —
       saying only "3 ready to claim" left the bar with nothing explaining it. */
    var readyLine = readyNow > 0
      ? '<p class="hero-ready">🎁 ' + readyNow +
        (readyNow === 1 ? ' reward is' : ' rewards are') + ' waiting to be claimed</p>'
      : '';

    screen.innerHTML =
      '<section class="hero">' +
        /* The greeting IS the heading. It used to sit above "What are we doing
           today?" in small uppercase, which made the warm line the caption and
           the filler line the headline. */
        '<h1 class="hero-title">' + esc(Copy.greeting()) + '</h1>' +

        '<div class="hero-goal">' +
          '<div class="hero-points">' + points + target + '</div>' +
          '<div class="hero-track">' +
            '<div class="hero-track-fill" style="width:' + prog.pct + '%"></div>' +
          '</div>' +
          '<p class="hero-goal-line">' + goalLine + '</p>' +
          readyLine +
        '</div>' +
      '</section>' +

      /* Directly under the greeting, so what is coming up and what is late is
         among the first things she sees rather than something to scroll for.
         Null scope: everything, across every module and none. */
      Dashboard.html(null) +

      '<div class="section-title">Your modules</div>' +
      '<div class="modgrid">' + cards + '</div>' +

      '<div class="section-title">Everything else</div>' +
      '<div class="grid-2">' +
        '<button class="tile acc-2" type="button" data-goto="schedule">' +
          '<span class="tile-glow"></span><span class="tile-emoji">🗓️</span>' +
          '<h3 class="tile-title">Study schedule</h3>' +
          '<p class="tile-desc">' + esc(scheduleLine()) + '</p></button>' +
        '<button class="tile acc-3" type="button" data-goto="progress">' +
          '<span class="tile-glow"></span><span class="tile-emoji">🏆</span>' +
          '<h3 class="tile-title">Progress &amp; rewards</h3>' +
          '<p class="tile-desc">' +
            (readyNow > 0
              ? '<b>' + readyNow + ' ready to claim!</b>'
              : 'Points, badges and rewards') +
          '</p></button>' +
      '</div>';

    Array.prototype.forEach.call(screen.querySelectorAll('[data-module]'), function (b) {
      b.addEventListener('click', function () { openModule(b.getAttribute('data-module')); });
    });
    Dashboard.bind(screen, null);
    bindTiles();
  }

  function openModule(id) {
    Content.use(id);
    Store.rememberModule(id);
    go('home');
  }

  /* Whether the colour picker on the module home is open. Not persisted: it
     is a thing she opens, changes and forgets, not a preference. */
  var themePickerOpen = false;

  /* The colour picker for THIS module. It lives on the module's own home
     screen rather than in the global cog, because the setting belongs to the
     module and because from here she can see the change happen to the screen
     she is standing on. */
  function themePickerHtml(mod) {
    if (!mod) return '';
    var current = Themes.get(mod.id);
    var list = Themes.all(), swatches = '';

    for (var i = 0; i < list.length; i++) {
      var t = list[i], on = t.id === current;
      swatches += '<button class="swatch' + (on ? ' is-on' : '') + '" type="button"' +
        ' data-theme="' + esc(t.id) + '" aria-pressed="' + (on ? 'true' : 'false') + '"' +
        ' title="' + esc(t.name) + '">' +
        '<span class="swatch-blob" style="background:' + t.ink +
          ';box-shadow: inset 0 -0.55rem 0 ' + t.tint + ', inset 0 0 0 0.28rem ' + t.accent + '"></span>' +
        '<span class="swatch-name">' + esc(t.name) + '</span>' +
      '</button>';
    }

    return '<details class="modtheme"' + (themePickerOpen ? ' open' : '') + ' id="modTheme">' +
      '<summary class="modtheme-head">' +
        '<span class="modtheme-emoji">🎨</span>' +
        '<span class="modtheme-title">Colour for ' + esc(mod.code) + '</span>' +
        '<span class="modtheme-now">' + esc(Themes.swatch(current).name) + '</span>' +
        '<span class="modtheme-caret">▾</span>' +
      '</summary>' +
      '<div class="modtheme-body">' +
        '<p class="modtheme-hint">Changes how this module looks — its home, its notes and its ' +
        'questions. Everything shared between modules stays as it is.</p>' +
        '<div class="swatches">' + swatches + '</div>' +
      '</div>' +
    '</details>';
  }

  /* What the schedule tile says. The next session is the only thing worth
     putting on a tile — "12 sessions this week" is a statistic, "Fractions,
     today at 17:00" is something she can act on. A shortfall outranks it,
     because that needs fixing before anything else on the tile matters. */
  function scheduleLine() {
    var plan = Schedule.plan();
    if (plan.warnings.length) {
      return '⚠️ ' + plan.warnings.length +
             (plan.warnings.length === 1 ? ' module will not fit' : ' modules will not fit');
    }
    var next = plan.sessions.length ? plan.sessions[0] : null;
    if (!next) {
      /* Nothing is planned until she has given an exam date, so the tile has
         to say what is missing rather than just looking empty. */
      return plan.needsDates.length
        ? 'Add your exam dates to fill this in'
        : 'Everything is done — nothing left to plan';
    }

    var today = Schedule.todayYmd();
    var when = next.date === today
      ? 'Today'
      : (next.date === Schedule.ymd(Schedule.addDays(new Date(), 1))
          ? 'Tomorrow'
          : Schedule.pretty(next.date));

    /* A session can hold more than one topic. The tile names the first and
       counts the rest, because a tile listing three topics stops being a
       glance. */
    var first = next.items[0];
    var more = next.items.length - 1;
    return when + ' at ' + next.time + ' — ' + first.title +
           (more > 0 ? ' +' + more + ' more' : '');
  }

  /* ───────────────────────── schedule ─────────────────────────

     The calendar spans every module at once, so unlike every other screen
     below the picker it does not belong to whichever module she last opened.
     It is reachable from the home screen and from inside a module, and looks
     the same from both. */

  function screenSchedule() {
    /* Back to wherever she came from. She can reach this from the picker or
       from inside a module, and sending her to the wrong one of those is the
       kind of small wrongness that makes an app feel unreliable. */
    crumbFromHistory();
    Calendar.render(screen);
  }

  /* Called from a calendar card: switch to that topic's module, then open its
     notes. Switching module first is what makes a card for a subject she is
     not currently "in" work at all — and the history stack records the module
     she was in before, so Back undoes the switch as well as the screen. */
  function openTopic(moduleId, topicId) {
    var was = Content.moduleId() || null;
    if (moduleId && moduleId !== was) {
      Content.use(moduleId);
      Store.rememberModule(moduleId);
    }
    go('notesTopic', { topicId: topicId }, { fromModule: was });
  }

  /* Which kind of session she last picked. Held here rather than per week,
     because the choice is about how she wants to work today, not about which
     week she is on. */
  var chosenMode = 'practise';

  /* Which weeks she wants in the next round. More than one is the normal case —
     revising a single week at a time is nothing like sitting a real test, where
     everything is mixed together. */
  var chosenWeeks = {};

  var MODE_CARDS = [
    /* Kept short deliberately. These three sit side by side, so what matters is
       the difference between them, not a full description of each. */
    { id: 'practise', emoji: '🌱', name: 'Practise',
      blurb: 'Notes and full working shown. No points.' },
    { id: 'test', emoji: '⭐', name: 'Test',
      blurb: 'No notes, no hints. <b>1 point</b> each.' },
    { id: 'exam', emoji: '📝', name: 'Exam Questions',
      blurb: 'Longer, from the practice papers. <b>2 points</b> each.' }
  ];

  function screenHome() {
    var mod = Content.module();

    /* Back to the picker, unless this is the only module she has — in which
       case there is nothing to go back to and the crumb would be a dead end. */
    if (Modules.all().length > 1) {
      crumbFromHistory();
    } else {
      setCrumb(null);
    }

    var weeks = Content.weeks();
    var readyNow = Rewards.readyCount(Store.points());

    /* Exam Questions only exists where a practice paper has been built. Offering
       it and then showing her nothing to pick would be worse than not offering
       it at all. */
    var anyExam = weeks.some(function (w) { return Content.hasExam(w.id); });
    if (chosenMode === 'exam' && !anyExam) chosenMode = 'practise';

    var modeCards = MODE_CARDS.filter(function (m) {
      return m.id !== 'exam' || anyExam;
    }).map(function (m) {
      return '<button class="modecard' + (chosenMode === m.id ? ' is-on' : '') + '" ' +
        'type="button" data-pickmode="' + m.id + '">' +
        '<div class="modecard-top"><span class="em">' + m.emoji + '</span>' +
        '<span class="nm">' + m.name + '</span></div>' +
        '<p>' + m.blurb + '</p>' +
      '</button>';
    }).join('');

    /* Which weeks she can actually use in this mode. Exam Questions only exists
       where a practice paper has been built. */
    function weekUsable(w) {
      return chosenMode === 'exam' ? Content.hasExam(w.id) : !w.comingSoon;
    }
    var usableWeeks = weeks.filter(weekUsable);

    /* Drop any week that the mode she just picked cannot offer, so a selection
       made under Practise cannot silently carry an impossible week into Exam. */
    var stillValid = {};
    usableWeeks.forEach(function (w) { if (chosenWeeks[w.id]) stillValid[w.id] = true; });
    chosenWeeks = stillValid;

    /* Nothing chosen means nothing to launch, which is a dead end on first
       visit — so default to everything. Revising across weeks at once is the
       point of allowing more than one. */
    if (!Object.keys(chosenWeeks).length) {
      usableWeeks.forEach(function (w) { chosenWeeks[w.id] = true; });
    }

    var pickedCount = Object.keys(chosenWeeks).length;
    var allPicked = pickedCount === usableWeeks.length && pickedCount > 0;

    var weekTiles = weeks.map(function (w) {
      var qn = (w.topics || []).reduce(function (n, t) { return n + t.questions.length; }, 0);

      if (!weekUsable(w)) {
        var why = w.comingSoon ? 'Coming soon' : 'No exam paper for this week yet';
        return '<button class="tile acc-' + w.accent + ' is-locked" type="button" disabled>' +
          '<span class="tile-glow"></span>' +
          '<span class="tile-emoji">' + w.emoji + '</span>' +
          '<span class="tile-kicker">Week ' + w.number + '</span>' +
          '<h3 class="tile-title">' + esc(w.title) + '</h3>' +
          '<p class="tile-desc">' + why + '</p>' +
        '</button>';
      }

      var on = !!chosenWeeks[w.id];
      return '<button class="tile weektile acc-' + w.accent + (on ? ' is-picked' : '') + '" ' +
        'type="button" data-weekpick="' + w.id + '" aria-pressed="' + (on ? 'true' : 'false') + '">' +
        '<span class="tile-glow"></span>' +
        '<span class="weektile-tick">' + (on ? '✓' : '') + '</span>' +
        '<span class="tile-emoji">' + w.emoji + '</span>' +
        '<span class="tile-kicker">Week ' + w.number + '</span>' +
        '<h3 class="tile-title">' + esc(w.title) + '</h3>' +
        /* The week title already says what the week covers; the blurb underneath
           was saying it again at greater length. */
        '<p class="tile-desc tile-stat">' + (w.topics || []).length + ' topics · ' + qn + '+ questions</p>' +
      '</button>';
    }).join('');

    screen.innerHTML =
      '<div class="hero">' +
        '<span class="hero-orb">' + (mod ? mod.emoji : '✨') + '</span>' +
        '<h1>' + esc(Copy.moduleHello()) + '</h1>' +
        /* Named from the module she actually opened. This used to be the maths
           module hardcoded, which would have been quietly wrong the moment a
           second module went live. */
        '<p class="hero-sub">' +
          (mod ? esc(mod.title) + ' · ' + esc(mod.code) : 'Choose a module to begin') +
        '</p>' +
      '</div>' +

      /* The same dashboard, scoped to this module: only its events, only its
         notes, only its numbers. */
      Dashboard.html(mod ? mod.id : null) +

      /* Two things to do in a module: read about it, or answer questions on it.
         Everything else on this screen used to sit at the same level, which
         made choosing harder than it needed to be. */
      '<button class="bigbox bigbox-notes" type="button" data-goto="notes">' +
        '<span class="bigbox-emoji">📖</span>' +
        '<span class="bigbox-body">' +
          '<span class="bigbox-title">Notes</span>' +
          '<span class="bigbox-desc">Explanations and worked examples. Nothing is marked.</span>' +
        '</span>' +
        '<span class="bigbox-go">›</span>' +
      '</button>' +

      '<section class="bigbox bigbox-tests">' +
        '<div class="bigbox-head">' +
          '<span class="bigbox-emoji">✏️</span>' +
          '<span class="bigbox-body">' +
            /* No description — the three mode cards directly below say what the
               choice is far better than a sentence introducing them. */
            '<span class="bigbox-title">Questions</span>' +
          '</span>' +
        '</div>' +

        '<div class="modecards">' + modeCards + '</div>' +

        /* The pills and the ticked tiles show that more than one is allowed, so
           the paragraph explaining it was only ever restating the interface. */
        '<div class="section-title" style="margin-top:1.6rem">Which weeks?</div>' +
        '<div class="pillrow" style="margin-bottom:1rem">' +
          '<button class="pill' + (allPicked ? ' is-on' : '') + '" type="button" id="weekAll">' +
            'All weeks</button>' +
          '<button class="pill" type="button" id="weekNone">Clear</button>' +
        '</div>' +
        '<div class="grid-weeks">' + weekTiles + '</div>' +

        '<div class="launchbar" style="margin-top:1.4rem">' +
          '<div class="lb-info">' +
            (pickedCount
              ? '<b>' + pickedCount + '</b> week' + (pickedCount === 1 ? '' : 's') +
                ' · <b>' + MODE_CARDS.filter(function (m) { return m.id === chosenMode; })[0].name + '</b>'
              : 'Choose at least one week.') +
          '</div>' +
          '<button class="btn btn-pink btn-lg" type="button" id="weekGo"' +
            (pickedCount ? '' : ' disabled') + '>Next ✨</button>' +
        '</div>' +
      '</section>' +

      themePickerHtml(mod) +

      '<div class="grid-2" style="margin-top:2rem">' +
        /* The calendar covers every module at once, so it is the same screen
           from here as it is from the picker. It is offered in both places
           because "when am I doing this" is a question she has just as often
           standing inside a module as outside one. */
        '<button class="tile acc-2" type="button" data-goto="schedule">' +
          '<span class="tile-glow"></span><span class="tile-emoji">🗓️</span>' +
          '<h3 class="tile-title">Study schedule</h3>' +
          '<p class="tile-desc">' + esc(scheduleLine()) + '</p></button>' +
        '<button class="tile acc-3" type="button" data-goto="progress">' +
          '<span class="tile-glow"></span><span class="tile-emoji">🏆</span>' +
          '<h3 class="tile-title">Progress &amp; rewards</h3>' +
          '<p class="tile-desc">' +
            (readyNow > 0
              ? '<b>' + readyNow + ' ready to claim!</b>'
              : 'Points, badges and rewards') +
          '</p></button>' +
      '</div>';

    Dashboard.bind(screen, mod ? mod.id : null);

    var themeBox = document.getElementById('modTheme');
    if (themeBox) {
      themeBox.addEventListener('toggle', function () { themePickerOpen = themeBox.open; });
    }

    Array.prototype.forEach.call(screen.querySelectorAll('[data-theme]'), function (b) {
      b.addEventListener('click', function () {
        Themes.set(mod.id, b.getAttribute('data-theme'));
        /* Repaint before redrawing, so the new colour is already on the body
           when the screen is rebuilt and she sees one change, not two. */
        Themes.apply(mod.id);
        screenHome();
      });
    });

    Array.prototype.forEach.call(screen.querySelectorAll('[data-pickmode]'), function (b) {
      b.addEventListener('click', function () {
        chosenMode = b.getAttribute('data-pickmode');
        screenHome();          // redraw: the week tiles depend on the mode
      });
    });

    Array.prototype.forEach.call(screen.querySelectorAll('[data-weekpick]'), function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-weekpick');
        if (chosenWeeks[id]) delete chosenWeeks[id];
        else chosenWeeks[id] = true;
        screenHome();          // redraw: the launch bar and the All pill both change
      });
    });

    document.getElementById('weekAll').addEventListener('click', function () {
      chosenWeeks = {};
      usableWeeks.forEach(function (w) { chosenWeeks[w.id] = true; });
      screenHome();
    });

    document.getElementById('weekNone').addEventListener('click', function () {
      /* Deliberately left empty rather than snapping back to everything — the
         redraw's "nothing chosen" default only applies on arrival, so Clear
         actually clears. */
      chosenWeeks = { __cleared: true };
      delete chosenWeeks.__cleared;
      var el = document.getElementById('weekGo');
      Array.prototype.forEach.call(screen.querySelectorAll('[data-weekpick]'), function (t) {
        t.classList.remove('is-picked');
        t.setAttribute('aria-pressed', 'false');
        t.querySelector('.weektile-tick').textContent = '';
      });
      el.disabled = true;
      document.querySelector('.lb-info').innerHTML = 'Choose at least one week.';
      document.getElementById('weekAll').classList.remove('is-on');
    });

    /* The weeks and the mode both travel to the setup screen, so it never has
       to ask anything she has already answered here. */
    document.getElementById('weekGo').addEventListener('click', function () {
      var ids = Object.keys(chosenWeeks);
      if (ids.length) go('week', { weekIds: ids, mode: chosenMode });
    });

    Array.prototype.forEach.call(screen.querySelectorAll('[data-goto]'), function (b) {
      b.addEventListener('click', function () { go(b.getAttribute('data-goto'), {}); });
    });
  }

  function bindTiles() {
    Array.prototype.forEach.call(screen.querySelectorAll('[data-week]'), function (b) {
      b.addEventListener('click', function () { go('week', { weekIds: [b.getAttribute('data-week')] }); });
    });
    Array.prototype.forEach.call(screen.querySelectorAll('[data-goto]'), function (b) {
      b.addEventListener('click', function () { go(b.getAttribute('data-goto'), {}); });
    });
  }

  /* ───────────────────────── week setup ───────────────────────── */

  function screenWeek(weekIds, wantedMode) {
    /* Arrives as a list. A single id is still accepted so an older link, or a
       route built anywhere else, keeps working. */
    if (typeof weekIds === 'string') weekIds = [weekIds];

    var picked = (weekIds || []).map(Content.week).filter(function (w) { return !!w; });
    if (!picked.length) return go('home');

    crumbFromHistory();

    /* The remembered setup is keyed on the whole selection, so choosing weeks
       1 and 3 together remembers its own topic choice rather than inheriting
       whatever week 1 was last set to on its own. */
    var setupKey = picked.map(function (w) { return w.id; }).sort().join('+');
    var saved = Store.recallSetup(setupKey) || {};

    var mode = wantedMode || saved.mode || 'practise';

    /* Exam Questions only exists where a paper has been built. Any week without
       one simply drops out of the selection rather than blocking the round. */
    var withExams = picked.filter(function (w) { return Content.hasExam(w.id); });
    if (mode === 'exam' && !withExams.length) mode = 'practise';

    var count = saved.count || 10;
    var COUNTS = { practise: [5, 10, 15, 20, 30], test: [10, 20, 30], exam: [10, 20, 30] };

    /* Exam mode has its own topics and its own question bank — no crossover.
       Returns [{ week, topics }] so the picklist can keep them grouped: a flat
       list of thirty topics from four weeks is unreadable. */
    function groupsFor(m) {
      var source = m === 'exam' ? withExams : picked;
      return source.map(function (w) {
        var topics = m === 'exam' ? (Content.examFor(w.id) || {}).topics || [] : (w.topics || []);
        return { week: w, topics: topics };
      }).filter(function (g) { return g.topics.length; });
    }

    function topicsFor(m) {
      var out = [];
      groupsFor(m).forEach(function (g) {
        g.topics.forEach(function (t) { out.push(t); });
      });
      return out;
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
      var groups = groupsFor(mode);
      var showHeadings = groups.length > 1;

      return groups.map(function (g) {
        var rows = g.topics.map(function (t) {
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

        /* Only labelled when there is more than one week to tell apart. */
        return (showHeadings
          ? '<div class="picklist-week">' + g.week.emoji + ' Week ' + g.week.number +
            ' · ' + esc(g.week.title) + '</div>'
          : '') + rows;
      }).join('');
    }

    function countPills() {
      return COUNTS[mode].map(function (c) {
        return '<button class="pill' + (c === count ? ' is-on' : '') + '" type="button" data-count="' + c + '">' + c + '</button>';
      }).join('');
    }

    screen.innerHTML =
      '<div class="pagehead">' +
        '<span class="kicker">' +
          (picked.length === 1
            ? 'Week ' + picked[0].number
            : picked.length + ' weeks together') + '</span>' +
        '<h1>' +
          (picked.length === 1
            ? picked[0].emoji + ' ' + esc(picked[0].title)
            : '🎲 ' + picked.map(function (w) { return w.number; }).sort().join(', ')
              .replace(/,([^,]*)$/, ' and$1').replace(/^/, 'Weeks ')) +
        '</h1>' +
        '<p>' +
          (picked.length === 1
            ? esc(picked[0].blurb)
            : 'Shuffled together.') + '</p>' +
      '</div>' +

      /* The kind of session was chosen on the module home. Asking again here
         would be the same question twice, one screen apart. */

      '<div class="setup-block">' +
        '<h3><span class="step-no">1</span> Which topics?</h3>' +
        '<div class="pillrow" style="margin-bottom:.8rem">' +
          '<button class="pill" type="button" id="selAll">Select all</button>' +
          '<button class="pill" type="button" id="selNone">Clear all</button>' +
        '</div>' +
        '<div class="picklist" id="picklist">' + picklist() + '</div>' +
      '</div>' +

      '<div class="setup-block">' +
        '<h3><span class="step-no">2</span> How many questions?</h3>' +
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

    /* No mode buttons on this screen any more — that choice is made on the
       module home and arrives as a route parameter. */

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
      Store.rememberSetup(setupKey, { topics: ids, mode: mode, count: count });
      Quiz.start({
        weekIds: picked.map(function (w) { return w.id; }),
        topicIds: ids,
        mode: mode,
        count: count
      });
    });
  }

  /* ───────────────────────── notes ───────────────────────── */

  function screenNotesWeeks() {
    crumbFromHistory();
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
      '<h1>📖 Your study notes</h1></div>' +
      '<div class="grid-weeks">' + tiles + '</div>';

    Array.prototype.forEach.call(screen.querySelectorAll('[data-nweek]'), function (b) {
      b.addEventListener('click', function () { go('notesWeek', { weekId: b.getAttribute('data-nweek') }); });
    });
  }

  function screenNotesTopics(weekId) {
    var w = Content.week(weekId);
    if (!w) return go('notes');
    crumbFromHistory();

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
      '<h1>' + w.emoji + ' ' + esc(w.title) + '</h1></div>' +
      '<div class="picklist">' + list + '</div>';

    Array.prototype.forEach.call(screen.querySelectorAll('[data-ntopic]'), function (b) {
      b.addEventListener('click', function () { go('notesTopic', { topicId: b.getAttribute('data-ntopic') }); });
    });
  }

  function screenNotesTopic(topicId) {
    var t = Content.topic(topicId);
    var w = Content.weekOfTopic(topicId);
    if (!t || !w) return go('notes');

    crumbFromHistory();

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
    crumbFromHistory();

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
    var lastModule = Modules.remembered();
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

      /* Collapsible per module. With two modules and a badge for every topic
         this screen runs to a great many tiles, and she is usually only
         interested in one subject at a time. The module she was last studying
         opens by default so the page is not a wall of closed boxes.

         <details> rather than a scripted toggle: it keeps its own state, works
         from the keyboard, and needs no event binding after a re-render. */
      var openNow = mod.id === lastModule;

      return '<details class="modbadges"' + (openNow ? ' open' : '') + '>' +
        '<summary class="modbadges-head">' +
          '<span class="modbadges-emoji">' + mod.emoji + '</span>' +
          '<span><b>' + esc(mod.code) + '</b> · ' + esc(mod.title) + '</span>' +
          '<span class="chip chip-pink">' + earnedHere + '/' + totalHere + '</span>' +
          '<span class="modbadges-caret" aria-hidden="true">⌄</span>' +
        '</summary>' +
        '<div class="modbadges-body">' + weekBlocks + '</div>' +
      '</details>';
    }).join('');

    screen.innerHTML =
      '<div class="pagehead"><span class="kicker">Your progress</span>' +
      '<h1>🏆 How you\'re doing</h1>' +
      '<p>Test answers are 1 point, exam questions 2. Every module feeds the same ladder.</p></div>' +

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
        /* `reading` was captured on the last keystroke rather than read from the
           textarea here, which is what it needs to be anyway: the code has
           already been parsed and checked by the time she can press this. */
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

    /* Every control on the calendar changes the plan, so the calendar asks to
       be redrawn rather than patching itself. Handing it draw() keeps the
       "which screen am I on" decision in exactly one place. */
    Calendar.init(function () { if (route.name === 'schedule') draw(); });

    /* The dashboard appears on two different screens, so it asks to be
       redrawn rather than knowing which one it is on. */
    Dashboard.init(function () { draw(); });

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
    /* reset, so the very first screen leaves no phantom entry behind it. */
    go('modules', {}, { reset: true });
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
        onConfirm: function () { go('modules', {}, { reset: true }); }
      });
      return;
    }
    go('modules', {}, { reset: true });
  }

  return {
    init: init,
    go: go,
    modal: modal,
    setCrumb: setCrumb,
    refreshPoints: refreshPoints,
    openTopic: openTopic,
    /* So a dialog can add a button of its own — the event editor puts Remove
       beside Save — and still close the modal when it fires. */
    closeModal: closeModal
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
