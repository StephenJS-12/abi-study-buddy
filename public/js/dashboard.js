/* Abi's Study Buddy — the dashboard.
 *
 * Sits directly under the greeting on the home screen and on every module
 * screen, so it is among the first things she sees rather than something to
 * scroll for.
 *
 * The same code draws both. The only difference is scope:
 *
 *   Dashboard.html(null)     everything, on the home screen
 *   Dashboard.html('inba')   one module, on that module's screen
 *
 * Three parts: the numbers, the next seven days, and a to-do list. All three
 * read from planner.js and none of them know about study sessions — those
 * have their own progress on the schedule screen, and mixing the two would
 * bury the handful of things that have real deadlines.
 */

var Dashboard = (function () {

  var DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var STRIP_DAYS = 7;

  /* Toggles, held per scope so opening maths does not inherit whatever the
     home screen was showing. Not persisted: these are things she flicks on to
     check something and off again. */
  var showDoneEvents = {};
  var showDoneTodos = {};

  var redraw = function () {};
  function init(onRedraw) { redraw = onRedraw; }

  function esc(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function key(scope) { return scope === null || scope === undefined ? '*' : scope; }

  /* A module's calendar colour, so an event chip matches the schedule. */
  function hue(moduleId) {
    if (!moduleId || typeof Calendar === 'undefined') return null;
    return Calendar.hueFor(moduleId);
  }

  /* ───────────────────────── the whole thing ───────────────────────── */

  function html(scope) {
    return '<section class="dash">' +
      kpisHtml(scope) +
      '<div class="dash-cols">' +
        stripHtml(scope) +
        todosHtml(scope) +
      '</div>' +
    '</section>';
  }

  /* ───────────────────────── the numbers ───────────────────────── */

  function kpisHtml(scope) {
    var k = Planner.kpis(scope);

    function tile(cls, emoji, n, label, note) {
      return '<div class="kpi ' + cls + (n ? '' : ' is-zero') + '">' +
        '<span class="kpi-emoji">' + emoji + '</span>' +
        '<b class="kpi-num">' + n + '</b>' +
        '<span class="kpi-label">' + label + '</span>' +
        '<span class="kpi-note">' + note + '</span>' +
      '</div>';
    }

    return '<div class="dash-kpis">' +
      tile('kpi-up', '⏳', k.upcoming, 'Upcoming', 'next ' + Planner.WINDOW_DAYS + ' days') +
      tile('kpi-over', '⚠️', k.overdue, 'Overdue', k.overdue ? 'needs doing' : 'nothing late') +
      tile('kpi-done', '✅', k.completed, 'Completed', 'all time') +
    '</div>';
  }

  /* ───────────────────────── the next seven days ─────────────────────────
     Seven day rows rather than seven columns. On a dashboard the question is
     "what is coming", which is a list; seven columns would give each event
     about thirty pixels of name. */

  function stripHtml(scope) {
    var k = key(scope);
    var showing = !!showDoneEvents[k];
    var today = Schedule.parseYmd(Schedule.todayYmd());
    var from = Schedule.ymd(today);
    var to = Schedule.ymd(Schedule.addDays(today, STRIP_DAYS - 1));

    var found = Planner.events(scope, { includeDone: showing, from: from, to: to });
    var byDate = {};
    for (var i = 0; i < found.length; i++) {
      if (!byDate[found[i].date]) byDate[found[i].date] = [];
      byDate[found[i].date].push(found[i]);
    }

    var rows = '';
    for (var d = 0; d < STRIP_DAYS; d++) {
      var day = Schedule.addDays(today, d);
      var date = Schedule.ymd(day);
      var here = byDate[date] || [];

      var items = '';
      for (var e = 0; e < here.length; e++) items += eventHtml(here[e]);
      if (!here.length) items = '<span class="mini-none">—</span>';

      rows += '<div class="mini-day' + (d === 0 ? ' is-today' : '') + '">' +
        '<div class="mini-when">' +
          '<span class="mini-dow">' + (d === 0 ? 'Today' : DAY_SHORT[day.getDay()]) + '</span>' +
          '<span class="mini-num">' + day.getDate() + '</span>' +
        '</div>' +
        '<div class="mini-items">' + items + '</div>' +
      '</div>';
    }

    var doneN = Planner.events(scope, { includeDone: true, from: from, to: to }).length - found.length;

    return '<div class="dash-card">' +
      '<div class="dash-card-head">' +
        '<h3>Next 7 days</h3>' +
        '<button class="dash-add" type="button" data-addevent="' + esc(k) + '">+ Add</button>' +
      '</div>' +
      '<div class="mini">' + rows + '</div>' +
      '<div class="dash-card-foot">' +
        toggleHtml('dash-showdone-ev', esc(k), showing,
                   'View completed' + (!showing && doneN > 0 ? ' (' + doneN + ')' : '')) +
        '<button class="cal-linkbtn" type="button" data-goto="schedule">Full calendar ›</button>' +
      '</div>' +
    '</div>';
  }

  function eventHtml(ev) {
    var t = Planner.typeOf(ev.type);
    var c = hue(ev.moduleId);
    var mod = ev.moduleId && typeof Modules !== 'undefined' && Modules.get(ev.moduleId)
      ? Modules.get(ev.moduleId).code : '';

    return '<div class="mini-ev' + (ev.done ? ' is-done' : '') + '"' +
      (c ? ' style="--card-ink:' + c.ink + ';--card-tint:' + c.tint + ';--card-edge:' + c.edge + '"' : '') + '>' +
      '<button class="mini-tick" type="button" data-evtick="' + esc(ev.id) + '"' +
        ' aria-pressed="' + (ev.done ? 'true' : 'false') + '"' +
        ' title="' + (ev.done ? 'Mark as not done' : 'Mark as done') + '">' +
        (ev.done ? '✓' : '') + '</button>' +
      '<span class="mini-body">' +
        '<span class="mini-name">' + t.emoji + ' ' + esc(ev.name) + '</span>' +
        '<span class="mini-meta">' + esc(t.name) +
          (ev.time ? ' · ' + esc(ev.time) : '') +
          (mod ? ' · ' + esc(mod) : '') +
        '</span>' +
      '</span>' +
      '<button class="mini-del" type="button" data-evdel="' + esc(ev.id) + '"' +
        ' aria-label="Remove">×</button>' +
    '</div>';
  }

  /* ───────────────────────── the to-do list ───────────────────────── */

  function todosHtml(scope) {
    var k = key(scope);
    var showing = !!showDoneTodos[k];
    var items = Planner.todos(scope, showing);
    var doneN = Planner.todoDoneCount(scope);

    var rows = '';
    for (var i = 0; i < items.length; i++) {
      var t = items[i];
      var mod = t.moduleId && typeof Modules !== 'undefined' && Modules.get(t.moduleId)
        ? Modules.get(t.moduleId).code : '';
      rows += '<li class="todo' + (t.done ? ' is-done' : '') + '">' +
        '<button class="todo-tick" type="button" data-todotick="' + esc(t.id) + '"' +
          ' aria-pressed="' + (t.done ? 'true' : 'false') + '">' + (t.done ? '✓' : '') + '</button>' +
        '<span class="todo-text">' + esc(t.text) +
          (scope === null && mod ? ' <span class="todo-mod">' + esc(mod) + '</span>' : '') +
        '</span>' +
        '<button class="todo-del" type="button" data-tododel="' + esc(t.id) + '"' +
          ' aria-label="Remove">×</button>' +
      '</li>';
    }
    if (!items.length) {
      rows = '<li class="todo-empty">Nothing on the list. Add something below.</li>';
    }

    return '<div class="dash-card">' +
      '<div class="dash-card-head"><h3>To-do</h3></div>' +
      '<ul class="todos">' + rows + '</ul>' +
      '<form class="todo-add" data-todoadd="' + esc(k) + '">' +
        '<input type="text" placeholder="Add a note…" maxlength="200" autocomplete="off">' +
        '<button type="submit" aria-label="Add">+</button>' +
      '</form>' +
      '<div class="dash-card-foot">' +
        toggleHtml('dash-showdone-td', esc(k), showing,
                   'View completed' + (!showing && doneN > 0 ? ' (' + doneN + ')' : '')) +
      '</div>' +
    '</div>';
  }

  function toggleHtml(attr, val, on, label) {
    return '<button class="dash-toggle' + (on ? ' is-on' : '') + '" type="button"' +
      ' ' + attr + '="' + val + '" aria-pressed="' + (on ? 'true' : 'false') + '">' +
      '<span class="dash-toggle-box">' + (on ? '✓' : '') + '</span>' + esc(label) +
    '</button>';
  }

  /* ───────────────────────── adding an event ─────────────────────────
     Shared by the dashboard and the main calendar, so the same box appears
     wherever the + is pressed. */

  function openAdd(scope, onSaved) {
    var mods = typeof Modules !== 'undefined' ? Modules.ready() : [];
    var preset = (scope === null || scope === undefined) ? '' : scope;

    var typeOpts = '';
    for (var i = 0; i < Planner.TYPES.length; i++) {
      var t = Planner.TYPES[i];
      typeOpts += '<option value="' + esc(t.id) + '">' + t.emoji + ' ' + esc(t.name) + '</option>';
    }

    var modOpts = '<option value="">No module</option>';
    for (var m = 0; m < mods.length; m++) {
      modOpts += '<option value="' + esc(mods[m].id) + '"' +
        (mods[m].id === preset ? ' selected' : '') + '>' + esc(mods[m].code) + '</option>';
    }

    App.modal({
      title: 'Add to the calendar',
      body:
        '<p class="ev-hint">Assignments, tests, classes — anything with a date that is not ' +
        'a study session. These never have study sessions created for them.</p>' +
        '<div class="ev-form">' +
          '<label class="ev-field ev-field-wide"><span>Name</span>' +
            '<input id="evName" type="text" maxlength="120" autocomplete="off" ' +
              'placeholder="e.g. Assignment 2 due"></label>' +
          '<label class="ev-field"><span>Date</span>' +
            '<input id="evDate" type="date" value="' + esc(Schedule.todayYmd()) + '"></label>' +
          '<label class="ev-field"><span>Time <i>(optional)</i></span>' +
            '<input id="evTime" type="time"></label>' +
          '<label class="ev-field"><span>Type</span>' +
            '<select id="evType">' + typeOpts + '</select></label>' +
          '<label class="ev-field"><span>Module</span>' +
            '<select id="evMod">' + modOpts + '</select></label>' +
        '</div>',
      confirmLabel: 'Add it',
      confirmClass: 'btn-primary',
      confirmDisabled: true,
      onOpen: function (box, okBtn) {
        var name = document.getElementById('evName');
        var date = document.getElementById('evDate');
        function check() {
          okBtn.disabled = !name.value.replace(/^\s+|\s+$/g, '') || !date.value;
        }
        name.addEventListener('input', check);
        date.addEventListener('change', check);
        setTimeout(function () { name.focus(); }, 80);
        check();
      },
      onConfirm: function () {
        Planner.addEvent({
          name: document.getElementById('evName').value,
          date: document.getElementById('evDate').value,
          time: document.getElementById('evTime').value,
          type: document.getElementById('evType').value,
          moduleId: document.getElementById('evMod').value
        });
        if (onSaved) onSaved();
      }
    });
  }

  /* ───────────────────────── events ───────────────────────── */

  function bind(el, scope) {
    function each(sel, fn) { Array.prototype.forEach.call(el.querySelectorAll(sel), fn); }
    var k = key(scope);

    each('[data-addevent]', function (b) {
      b.addEventListener('click', function () { openAdd(scope, redraw); });
    });

    each('[data-evtick]', function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-evtick');
        var ev = Planner.findEvent(id);
        var was = !!(ev && ev.done);
        Planner.setEventDone(id, !was);
        if (!was && window.Celebrate && Store.motionOn()) Celebrate.tick(b);
        redraw();
      });
    });

    each('[data-evdel]', function (b) {
      b.addEventListener('click', function () {
        Planner.removeEvent(b.getAttribute('data-evdel'));
        redraw();
      });
    });

    each('[dash-showdone-ev]', function (b) {
      b.addEventListener('click', function () {
        showDoneEvents[k] = !showDoneEvents[k];
        redraw();
      });
    });

    each('[dash-showdone-td]', function (b) {
      b.addEventListener('click', function () {
        showDoneTodos[k] = !showDoneTodos[k];
        redraw();
      });
    });

    each('[data-todoadd]', function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input');
        if (!input.value.replace(/^\s+|\s+$/g, '')) return;
        /* On the home screen a note belongs to nothing in particular; inside a
           module it belongs to that module. */
        Planner.addTodo(input.value, scope === null ? '' : scope);
        input.value = '';
        redraw();
      });
    });

    each('[data-todotick]', function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-todotick');
        var all = Planner.todos(scope, true), was = false;
        for (var i = 0; i < all.length; i++) if (all[i].id === id) was = !!all[i].done;
        Planner.setTodoDone(id, !was);
        if (!was && window.Celebrate && Store.motionOn()) Celebrate.tick(b);
        redraw();
      });
    });

    each('[data-tododel]', function (b) {
      b.addEventListener('click', function () {
        Planner.removeTodo(b.getAttribute('data-tododel'));
        redraw();
      });
    });
  }

  return {
    init: init,
    html: html,
    bind: bind,
    openAdd: openAdd
  };
})();
