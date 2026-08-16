/* Abi's Study Buddy — the shared practise/test engine.
   One engine, used everywhere. Practise adds a hideable notes helper;
   Test awards points. Everything else is identical. */

var Quiz = (function () {

  var S = null;   // active session

  var MODE_NAME  = { practise: 'Practise', test: 'Test', exam: 'Exam Questions' };
  var MODE_LOWER = { practise: 'practise round', test: 'test', exam: 'exam paper' };

  /* ───────────────────────── helpers ───────────────────────── */

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* Accepts "R1 234,56", "1,234.56", "12 500", "-8", "0.4167" */
  function parseNum(raw) {
    if (raw == null) return NaN;
    var s = String(raw).trim();
    if (!s) return NaN;
    s = s.replace(/[Rr%\s ]/g, '');
    if (s.indexOf(',') > -1 && s.indexOf('.') === -1) {
      // A lone comma is treated as a decimal separator unless it looks like a thousands group
      // (typographic minus is normalised just below, before parseFloat)
      if (/,\d{3}$/.test(s) || /,\d{3},/.test(s)) s = s.replace(/,/g, '');
      else s = s.replace(',', '.');
    } else {
      s = s.replace(/,/g, '');
    }
    s = s.replace(/[−–—]/g, '-');   // typographic minus / en dash / em dash
    var n = parseFloat(s);
    return isNaN(n) ? NaN : n;
  }

  function closeEnough(given, target, tol) {
    if (isNaN(given)) return false;
    return Math.abs(given - target) <= (tol == null ? 0.01 : tol);
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* The canonical correct answer, as text, for the review list. */
  function correctText(q) {
    if (q.type === 'mcq') return q.options[q.answer];
    if (q.type === 'numeric') return (q.pre || '') + q.answer + (q.suf ? ' ' + q.suf : '');
    if (q.type === 'steps') {
      return q.steps.map(function (st) {
        return (st.pre || '') + st.answer + (st.suf ? ' ' + st.suf : '');
      }).join(' → ');
    }
    return '';
  }

  function givenText(r) {
    var g = r.given;
    if (g === undefined || g === null || g === '') return '<i>no answer</i>';
    if (r.q.type === 'steps' && g.join) {
      return g.map(function (v, i) {
        var st = r.q.steps[i];
        return (st.pre || '') + v + (st.suf ? ' ' + st.suf : '');
      }).join(' → ');
    }
    if (r.q.type === 'numeric') return (r.q.pre || '') + g + (r.q.suf ? ' ' + r.q.suf : '');
    return String(g);
  }

  /* Her answer against the right one, shown at the top of each review entry. */
  function answerBox(r) {
    if (r.right) {
      return '<div class="ansbox is-right">' +
             '<div><span class="ansbox-lab">Your answer</span>' + givenText(r) + '</div>' +
             '</div>';
    }
    return '<div class="ansbox is-wrong">' +
           '<div><span class="ansbox-lab">Your answer</span>' + givenText(r) + '</div>' +
           '<div><span class="ansbox-lab">Correct answer</span><b>' + correctText(r.q) + '</b></div>' +
           '</div>';
  }

  function solutionHtml(q) {
    var rows = (q.solution || []).map(function (s) {
      return '<div class="solstep' + (s.final ? ' final' : '') + '">' +
             '<div class="solstep-lab">' + s.lab + '</div>' +
             '<div class="solstep-val">' + s.val + '</div></div>';
    }).join('');
    var why = q.why ? '<div class="solwhy"><b>Why this works:</b> ' + q.why + '</div>' : '';
    return '<div class="solution"><h4>Full worked solution</h4>' + rows + why + '</div>';
  }

  /* ───────────────────────── session ───────────────────────── */

  /* Multiple-choice options are shuffled per sitting, so the right answer is never
     in the same place twice and she cannot pattern-match on position. */
  function shuffleOptions(q) {
    if (q.type !== 'mcq' || !q.options) return q;
    var order = shuffle(q.options.map(function (_, i) { return i; }));
    var opts = [], newAnswer = 0;
    for (var i = 0; i < order.length; i++) {
      opts.push(q.options[order[i]]);
      if (order[i] === q.answer) newAnswer = i;
    }
    q.options = opts;
    q.answer = newAnswer;
    return q;
  }

  function start(cfg) {
    var pool = shuffle(Content.gather(cfg.topicIds, cfg.count));
    var count = Math.min(cfg.count, pool.length);

    S = {
      weekId: cfg.weekId,
      topicIds: cfg.topicIds,
      mode: cfg.mode,               // 'practise' | 'test' | 'exam'
      /* Where to go when she finishes or leaves. Starting a practise round from a notes
         page should return her to that notes page, not to the week's setup screen. */
      origin: cfg.origin || { name: 'week', params: { weekId: cfg.weekId }, label: null },
      questions: pool.slice(0, count).map(shuffleOptions),
      idx: 0,
      streak: 0,
      correct: 0,
      pointsWon: 0,
      results: [],                  // { q, right, given }
      helperOpen: false,          // starts closed so the question leads
      answered: false,
      stepState: null
    };
    render();
  }

  function current() { return S.questions[S.idx]; }

  /* ───────────────────────── rendering ───────────────────────── */

  /* Question prompts carry markup for fractions and emphasis. The tutor wants
     the words, not the HTML, and a stray tag would only spend tokens. */
  function stripTags(html) {
    return String(html)
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /* The topic's notes as plain text, for practise mode only. In a test or exam
     she is meant to be recalling this, not being handed it. */
  function notesTextFor(topicId) {
    var topic = Content.topic(topicId);
    if (!topic) return '';
    var holder = document.createElement('div');
    holder.innerHTML = Notes.renderBlocks(topic, false);
    return stripTags(holder.textContent || '');
  }

  function render() {
    if (!S) return;
    if (S.idx >= S.questions.length) return renderResults();

    var q = current();
    var pct = Math.round((S.idx / S.questions.length) * 100);

    var streakChip = S.streak >= 2
      ? '<span class="streakflag' + (S.streak >= 4 ? ' hot' : '') + '">🔥 ' + S.streak + ' in a row</span>'
      : '';

    var helper = '';
    if (S.mode === 'practise') {
      var topic = Content.topic(q._topicId);
      helper =
        '<div class="helper' + (S.helperOpen ? ' is-open' : '') + '" id="helperPanel">' +
          '<button class="helper-bar" type="button" id="helperToggle" aria-expanded="' + (S.helperOpen ? 'true' : 'false') + '">' +
            '<span>💡</span><span>Stuck? Open the notes for ' + esc(topic.title) + '</span>' +
            '<span class="spin">▾</span>' +
          '</button>' +
          '<div class="helper-body" id="helperBody"' + (S.helperOpen ? '' : ' hidden') + '>' +
            Notes.renderBlocks(topic, false) +   // each block individually collapsible, all closed
          '</div>' +
        '</div>';
    }

    var html =
      '<div class="quizhead">' +
        '<span class="qcount">Question ' + (S.idx + 1) + ' of ' + S.questions.length + '</span>' +
        '<div class="qprogress"><div style="width:' + pct + '%"></div></div>' +
        streakChip +
      '</div>' +
      helper +
      '<div class="qcard" id="qcard">' +
        (q.marks ? '<span class="qmarks">(' + q.marks + ' mark' + (q.marks > 1 ? 's' : '') + ')</span>' : '') +
        '<div class="chip chip-pink" style="margin-bottom:.8rem">' + q._topicEmoji + ' ' + esc(q._topicTitle) + '</div>' +
        (q.scenario ? '<div class="qscenario">' + q.scenario + '</div>' : '') +
        '<div class="qprompt">' + q.prompt + '</div>' +
        answerAreaHtml(q) +
        '<div id="verdictSlot"></div>' +
        '<div class="qfoot" id="qfoot"></div>' +
      '</div>';

    var screen = document.getElementById('screen');
    screen.innerHTML = html;
    App.setCrumb('Leave ' + MODE_LOWER[S.mode], confirmLeave);

    /* What Pip is allowed to say is decided by the mode she is handed. In
       practise she may explain the method; in a test or exam she may only
       help Abi find her next move.

       Only the wording of the question travels — `q.answer` and the worked
       solution stay here. A helper that was never told the answer cannot let
       it slip, whatever it is asked. */
    Buddy.setContext({
      id: q._topicId,
      title: q._topicTitle,
      mode: S.mode,
      questionText: stripTags((q.scenario || '') + ' ' + q.prompt),
      notes: S.mode === 'practise' ? notesTextFor(q._topicId) : ''
    });

    if (S.mode === 'practise') {
      document.getElementById('helperToggle').addEventListener('click', function () {
        S.helperOpen = !S.helperOpen;
        var panel = document.getElementById('helperPanel');
        var body = document.getElementById('helperBody');
        panel.classList.toggle('is-open', S.helperOpen);
        body.hidden = !S.helperOpen;
        this.setAttribute('aria-expanded', S.helperOpen ? 'true' : 'false');
      });
      Notes.bind(document.getElementById('helperBody'));
    }

    bindAnswers(q);
  }

  function answerAreaHtml(q) {
    if (q.type === 'mcq') {
      var keys = ['A', 'B', 'C', 'D', 'E', 'F'];
      return '<div class="opts" id="answerArea">' +
        q.options.map(function (o, i) {
          return '<button class="opt" type="button" data-opt="' + i + '">' +
                 '<span class="opt-key">' + keys[i] + '</span><span>' + o + '</span></button>';
        }).join('') + '</div>';
    }

    if (q.type === 'numeric') {
      return '<div id="answerArea">' +
        '<div class="numrow">' +
          '<div class="numwrap" id="numWrap">' +
            (q.pre ? '<span class="pre">' + q.pre + '</span>' : '') +
            '<input type="text" inputmode="decimal" id="numInput" autocomplete="off" placeholder="Your answer">' +
            (q.suf ? '<span class="suf">' + q.suf + '</span>' : '') +
          '</div>' +
          '<button class="btn btn-primary" type="button" id="checkBtn">Check</button>' +
        '</div>' +
        (q.note ? '<div class="answernote">' + q.note + '</div>' : '') +
      '</div>';
    }

    if (q.type === 'steps') {
      return '<div class="steps" id="answerArea">' +
        q.steps.map(function (st, i) {
          return '<div class="stepbox' + (i === 0 ? ' is-active' : '') + '" data-step="' + i + '">' +
            '<div class="stepbox-head">' +
              '<span class="stepbox-no">' + (i + 1) + '</span>' +
              '<span class="stepbox-q">' + st.q + '</span>' +
            '</div>' +
            '<div class="numrow">' +
              '<div class="numwrap">' +
                (st.pre ? '<span class="pre">' + st.pre + '</span>' : '') +
                '<input type="text" inputmode="decimal" data-stepInput="' + i + '" autocomplete="off" placeholder="Answer">' +
                (st.suf ? '<span class="suf">' + st.suf + '</span>' : '') +
              '</div>' +
              '<button class="btn btn-primary btn-sm" type="button" data-stepBtn="' + i + '">Check</button>' +
            '</div>' +
            '<div class="stepbox-explain" data-stepExplain="' + i + '" hidden></div>' +
          '</div>';
        }).join('') + '</div>';
    }

    return '';
  }

  /* ───────────────────────── answering ───────────────────────── */

  function bindAnswers(q) {
    if (q.type === 'mcq') {
      var opts = document.querySelectorAll('[data-opt]');
      Array.prototype.forEach.call(opts, function (btn) {
        btn.addEventListener('click', function () {
          if (S.answered) return;
          var chosen = parseInt(btn.getAttribute('data-opt'), 10);
          var right = chosen === q.answer;
          Array.prototype.forEach.call(opts, function (b, i) {
            b.disabled = true;
            if (i === q.answer) b.classList.add('is-right');
            else if (i === chosen) b.classList.add('is-wrong');
          });
          finishQuestion(q, right, btn, q.options[chosen]);
        });
      });
      return;
    }

    if (q.type === 'numeric') {
      var input = document.getElementById('numInput');
      var wrap = document.getElementById('numWrap');
      var check = document.getElementById('checkBtn');

      var submit = function () {
        if (S.answered) return;
        var val = parseNum(input.value);
        if (isNaN(val)) { wrap.classList.add('shake'); setTimeout(function(){ wrap.classList.remove('shake'); }, 450); return; }
        var right = closeEnough(val, q.answer, q.tol);
        wrap.classList.add(right ? 'is-right' : 'is-wrong');
        input.disabled = true;
        check.disabled = true;
        finishQuestion(q, right, wrap, input.value.trim());
      };

      check.addEventListener('click', submit);
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(); });
      setTimeout(function () { input.focus(); }, 60);
      return;
    }

    if (q.type === 'steps') {
      S.stepState = { at: 0, right: [], given: [] };

      var handleStep = function (i) {
        if (S.answered) return;
        if (i !== S.stepState.at) return;
        var box = document.querySelector('[data-step="' + i + '"]');
        var input = box.querySelector('[data-stepInput]');
        var wrap = box.querySelector('.numwrap');
        var val = parseNum(input.value);
        if (isNaN(val)) { wrap.classList.add('shake'); setTimeout(function(){ wrap.classList.remove('shake'); }, 450); return; }

        var st = q.steps[i];
        var right = closeEnough(val, st.answer, st.tol);
        S.stepState.right.push(right);
        S.stepState.given.push(input.value.trim());

        wrap.classList.add(right ? 'is-right' : 'is-wrong');
        input.disabled = true;
        box.querySelector('[data-stepBtn]').disabled = true;
        box.classList.remove('is-active');
        box.classList.add('is-done');

        var ex = box.querySelector('[data-stepExplain]');
        ex.innerHTML = (right ? '✓ ' : '→ ') + st.explain;
        ex.hidden = false;
        if (!right) ex.style.color = 'var(--pink-600)';

        if (right) Celebrate.sparkles(8, window.innerWidth / 2, window.innerHeight / 2);

        S.stepState.at += 1;
        if (S.stepState.at < q.steps.length) {
          var next = document.querySelector('[data-step="' + S.stepState.at + '"]');
          next.classList.add('is-active');
          var ni = next.querySelector('[data-stepInput]');
          setTimeout(function () { ni.focus(); ni.scrollIntoView({ block: 'center', behavior: 'smooth' }); }, 120);
        } else {
          var allRight = S.stepState.right.every(function (r) { return r; });
          finishQuestion(q, allRight, box, S.stepState.given.slice());
        }
      };

      var btns = document.querySelectorAll('[data-stepBtn]');
      Array.prototype.forEach.call(btns, function (b) {
        b.addEventListener('click', function () {
          handleStep(parseInt(b.getAttribute('data-stepBtn'), 10));
        });
      });
      var inputs = document.querySelectorAll('[data-stepInput]');
      Array.prototype.forEach.call(inputs, function (inp) {
        inp.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') handleStep(parseInt(inp.getAttribute('data-stepInput'), 10));
        });
      });
      setTimeout(function () { if (inputs[0]) inputs[0].focus(); }, 60);
    }
  }

  /* ───────────────────────── verdict ───────────────────────── */

  function finishQuestion(q, right, anchorEl, given) {
    S.answered = true;
    S.results.push({ q: q, right: right, given: given });

    var unlocked = Store.recordAnswer(q._topicId, right);

    if (right) {
      S.correct += 1;
      S.streak += 1;
      Store.noteStreak(S.streak);

      if (S.mode === 'test' || S.mode === 'exam') {
        var before = Store.points();
        var granted = Store.addPoints(S.mode);
        if (granted) {
          S.pointsWon += granted;
          App.refreshPoints(true);
          var after = Store.points();

          Rewards.newlyUnlocked(before, after).forEach(function (rw, k) {
            setTimeout(function () { Celebrate.reward(rw.emoji, rw.title); }, 1200 + k * 500);
          });
          if (Store.isFull() && before < Store.POINT_CAP) {
            setTimeout(function () { Celebrate.maxedOut(); }, 600);
          }
        }
      }
      Celebrate.correct(S.streak, anchorEl);
      /* Pip joins in, so she reads as watching rather than as a button that
         happens to be sitting there. */
      if (window.Buddy) Buddy.cheer();
    } else {
      S.streak = 0;
      var card = document.getElementById('qcard');
      if (card) { card.classList.add('shake'); setTimeout(function () { card.classList.remove('shake'); }, 450); }
    }

    unlocked.forEach(function (tid, k) {
      var t = Content.topic(tid);
      if (t) setTimeout(function () { Celebrate.badge(t.emoji, t.title); }, 900 + k * 400);
    });

    var slot = document.getElementById('verdictSlot');
    var worth = Store.POINTS_PER[S.mode] || 0;
    var pointLine = (right && worth)
      ? (Store.isFull()
          ? ' Your points bar is already full at ' + Store.POINT_CAP + '!'
          : ' <b>+' + worth + ' point' + (worth > 1 ? 's' : '') + '</b>')
      : '';

    slot.innerHTML =
      '<div class="verdict ' + (right ? 'good' : 'bad') + '">' +
        '<div class="verdict-head">' +
          '<span>' + (right ? '🎉' : '💛') + '</span>' +
          '<span>' + (right ? 'Correct!' : 'Not quite — here\'s how it works') + '</span>' +
        '</div>' +
        '<p style="margin:0">' +
          (right
            ? 'Nice work.' + pointLine
            : 'No stress at all — getting it wrong now is exactly how you get it right in the test.') +
        '</p>' +
        (right && S.mode === 'practise' ? '' : solutionHtml(q)) +
      '</div>';

    var last = S.idx === S.questions.length - 1;
    document.getElementById('qfoot').innerHTML =
      (right && S.mode === 'practise'
        ? '<button class="btn btn-ghost" type="button" id="showSolBtn">Show me the working</button>'
        : '') +
      '<button class="btn btn-primary btn-lg" type="button" id="nextBtn">' +
        (last ? 'See my results ✨' : 'Next question →') +
      '</button>';

    var showSol = document.getElementById('showSolBtn');
    if (showSol) {
      showSol.addEventListener('click', function () {
        showSol.remove();
        document.querySelector('.verdict').insertAdjacentHTML('beforeend', solutionHtml(q));
      });
    }

    document.getElementById('nextBtn').addEventListener('click', function () {
      S.idx += 1;
      S.answered = false;
      S.stepState = null;
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.getElementById('nextBtn').focus();
  }

  /* ───────────────────────── results ───────────────────────── */

  function renderResults() {
    var total = S.questions.length;
    var pct = total ? Math.round((S.correct / total) * 100) : 0;

    var msg, emoji;
    if (pct === 100)      { msg = 'Flawless. Every single one.'; emoji = '👑'; }
    else if (pct >= 80)   { msg = 'That is seriously strong work.'; emoji = '🌟'; }
    else if (pct >= 60)   { msg = 'Solid — you know most of this already.'; emoji = '💪'; }
    else if (pct >= 40)   { msg = 'Getting there. Read the solutions and go again.'; emoji = '🌱'; }
    else                  { msg = 'This one is worth a practise round first.'; emoji = '🫶'; }

    /* Full review. Wrong answers open automatically with the worked solution showing,
       so she gets the same explanation the practise mode gives. Correct ones collapse
       but can still be opened. */
    var review = S.results.map(function (r, i) {
      var open = !r.right;
      return '' +
        '<section class="revitem ' + (r.right ? 'is-right' : 'is-wrong') + (open ? ' is-open' : '') + '">' +
          '<button class="revitem-bar" type="button" data-rev="' + i + '" aria-expanded="' + open + '">' +
            '<span class="mark">' + (r.right ? '✅' : '💛') + '</span>' +
            '<span class="txt">Q' + (i + 1) + ' · ' + esc(r.q._topicTitle) + '</span>' +
            '<span class="spin">▾</span>' +
          '</button>' +
          '<div class="revitem-body"' + (open ? '' : ' hidden') + '>' +
            (r.q.scenario ? '<div class="qscenario">' + r.q.scenario + '</div>' : '') +
            '<div class="qprompt">' + r.q.prompt + '</div>' +
            answerBox(r) +
            solutionHtml(r.q) +
          '</div>' +
        '</section>';
    }).join('');

    var pointsLine = Store.POINTS_PER[S.mode]
      ? '<div class="stat"><div class="stat-num">+' + S.pointsWon + '</div><div class="stat-lab">Points won</div></div>'
      : '';

    document.getElementById('screen').innerHTML =
      '<div class="scoreburst">' +
        '<div class="ring" style="--pct:' + pct + '%">' +
          '<div><div class="big">' + S.correct + '/' + total + '</div>' +
          '<div class="small">' + pct + '%</div></div>' +
        '</div>' +
        '<h2>' + emoji + ' ' + MODE_NAME[S.mode] + ' complete</h2>' +
        '<p>' + msg + '</p>' +
      '</div>' +
      '<div class="statstrip">' +
        '<div class="stat"><div class="stat-num">' + S.correct + '</div><div class="stat-lab">Correct</div></div>' +
        '<div class="stat"><div class="stat-num">' + (total - S.correct) + '</div><div class="stat-lab">To revisit</div></div>' +
        '<div class="stat"><div class="stat-num">' + Store.get().bestStreak + '</div><div class="stat-lab">Best streak</div></div>' +
        pointsLine +
      '</div>' +
      '<div class="section-title">Review your answers</div>' +
      '<p style="color:var(--ink-soft);font-size:.92rem;margin-bottom:1rem">' +
        (total - S.correct > 0
          ? 'The ones you got wrong are already open, with the full working. Tap any question to open or close it.'
          : 'Every one correct. Tap a question if you want to see the working anyway.') +
      '</p>' +
      '<div class="revlist">' + review + '</div>' +
      '<div class="qfoot" style="margin-top:2rem">' +
        '<button class="btn btn-ghost btn-lg" type="button" id="againBtn">Go again 🔁</button>' +
        '<button class="btn btn-primary btn-lg" type="button" id="doneBtn">' +
          (S.origin.label || 'Back to Week ' + (Content.week(S.weekId) ? Content.week(S.weekId).number : '')) +
        '</button>' +
      '</div>';

    Celebrate.finish(pct);
    App.setCrumb(null);

    var cfg = { weekId: S.weekId, topicIds: S.topicIds, mode: S.mode, count: total, origin: S.origin };
    var origin = S.origin;
    S.finished = true;   // the round is over, so leaving needs no confirmation
    document.getElementById('againBtn').addEventListener('click', function () { start(cfg); });
    document.getElementById('doneBtn').addEventListener('click', function () {
      S = null;
      App.go(origin.name, origin.params);
    });

    Array.prototype.forEach.call(document.querySelectorAll('[data-rev]'), function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.parentNode;
        var body = item.querySelector('.revitem-body');
        var open = item.className.indexOf('is-open') === -1;
        item.className = item.className.replace(' is-open', '') + (open ? ' is-open' : '');
        body.hidden = !open;
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  }

  function confirmLeave() {
    App.modal({
      title: 'Leave this ' + MODE_LOWER[S.mode] + '?',
      body: '<p>Your progress in this round will not be saved, but any points and badges you have already ' +
            'earned are safe.</p>',
      confirmLabel: 'Yes, leave',
      confirmClass: 'btn-danger',
      onConfirm: function () {
        var origin = S.origin;
        S = null;
        App.go(origin.name, origin.params);
      }
    });
  }

  return {
    start: start,
    active: function () { return !!S && !S.finished; },
    clear: function () { S = null; }
  };
})();
