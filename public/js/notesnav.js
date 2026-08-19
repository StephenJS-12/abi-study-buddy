/* Abi's Study Buddy — the contents sidebar for the notes.
 *
 * The notes are three levels deep: week, then lesson, then topic. Getting from
 * one topic to another meant Back, Back, forward, forward — four taps to move
 * between two pages that sit next to each other in the course.
 *
 * This is the whole module in one list, always to hand. Weeks collapse,
 * lessons collapse, and the sidebar itself collapses when she wants the notes
 * to have the screen.
 *
 * WHAT IT REMEMBERS
 *
 *   Which weeks and lessons are open, and whether the sidebar is showing.
 *   Held here rather than in Store: it is where she happens to be looking, not
 *   a preference worth carrying between sessions. The week and lesson holding
 *   whatever she is reading are opened automatically, so arriving at a topic
 *   from the calendar shows her where in the course she has landed.
 *
 * MATHS HAS NO LESSONS
 *
 *   So its weeks list their topics directly, one level shallower. The module
 *   decides its own depth and nothing here needs telling.
 */

var NotesNav = (function () {

  var open = { weeks: {}, lessons: {} };
  /* Decided on first use, not fixed: on a laptop the sidebar is a column
     alongside the notes and should be there. On a phone it is a strip above
     them, and starting open would push the notes off the screen. */
  var showing = null;
  var go = function () {};

  function init(onGo) { go = onGo; }

  function esc(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* Opens the branch holding a topic, so the sidebar always shows where she
     is rather than making her hunt for it. */
  function reveal(topicId) {
    if (!topicId) return;
    var week = Content.weekOfTopic(topicId);
    if (!week) return;
    open.weeks[week.id] = true;
    var topic = Content.topic(topicId);
    if (topic && topic.lesson) open.lessons[week.id + '|' + topic.lesson] = true;
  }

  /* `current` is the topic she is reading, or '' on the week and lesson
     screens. `openWeek` keeps a branch open when she is looking at that week
     without having chosen a topic yet. */
  function html(current, openWeek, openLesson) {
    if (showing === null) {
      showing = !!(typeof window !== 'undefined' && window.innerWidth >= 960);
    }
    if (current) reveal(current);
    if (openWeek) open.weeks[openWeek] = true;
    if (openWeek && openLesson) open.lessons[openWeek + '|' + openLesson] = true;

    var weeks = Content.weeks(), out = '', w, L, t;

    for (w = 0; w < weeks.length; w++) {
      var week = weeks[w];
      if (week.comingSoon) continue;

      var body = '';

      if (week.lessons && week.lessons.length) {
        for (L = 0; L < week.lessons.length; L++) {
          var lesson = week.lessons[L];
          var lKey = week.id + '|' + lesson.number;
          var topicRows = '';

          for (t = 0; t < lesson.topicIds.length; t++) {
            var lt = Content.topic(lesson.topicIds[t]);
            if (lt) topicRows += topicRow(lt, current);
          }

          body += '<details class="nnav-lesson"' + (open.lessons[lKey] ? ' open' : '') +
            ' data-nnav-lesson="' + esc(lKey) + '">' +
            '<summary>' +
              '<span class="nnav-caret">▸</span>' +
              '<span class="nnav-lesson-no">L' + lesson.number + '</span>' +
              '<span class="nnav-label">' + esc(lesson.title) + '</span>' +
            '</summary>' +
            '<div class="nnav-topics">' + topicRows + '</div>' +
          '</details>';
        }
      } else {
        /* No lessons — the topics hang straight off the week. */
        for (t = 0; t < (week.topics || []).length; t++) {
          body += topicRow(week.topics[t], current);
        }
        body = '<div class="nnav-topics">' + body + '</div>';
      }

      out += '<details class="nnav-week"' + (open.weeks[week.id] ? ' open' : '') +
        ' data-nnav-week="' + esc(week.id) + '">' +
        '<summary>' +
          '<span class="nnav-caret">▸</span>' +
          '<span class="nnav-week-no">Wk ' + week.number + '</span>' +
          '<span class="nnav-label">' + esc(week.title) + '</span>' +
        '</summary>' +
        body +
      '</details>';
    }

    return '<aside class="nnav' + (showing ? '' : ' is-shut') + '">' +
      '<button class="nnav-handle" type="button" data-nnav-toggle="1"' +
        ' aria-expanded="' + (showing ? 'true' : 'false') + '">' +
        '<span class="nnav-handle-icon">' + (showing ? '×' : '☰') + '</span>' +
        '<span class="nnav-handle-text">Contents</span>' +
      '</button>' +
      '<nav class="nnav-body" aria-label="Notes contents">' + out + '</nav>' +
    '</aside>';
  }

  function topicRow(topic, current) {
    var on = topic.id === current;
    return '<button class="nnav-topic' + (on ? ' is-current' : '') + '" type="button"' +
      ' data-nnav-topic="' + esc(topic.id) + '"' + (on ? ' aria-current="page"' : '') + '>' +
      '<span class="nnav-topic-emoji">' + esc(topic.emoji || '') + '</span>' +
      '<span class="nnav-topic-title">' + esc(topic.title) + '</span>' +
      (Store.hasBadge(topic.id) ? '<span class="nnav-badge">🏅</span>' : '') +
    '</button>';
  }

  function bind(el) {
    function each(sel, fn) { Array.prototype.forEach.call(el.querySelectorAll(sel), fn); }

    /* <details> reports its own state, which is the only reliable way to know
       it — she can open one by click, by keyboard, or by find-in-page. */
    each('[data-nnav-week]', function (d) {
      d.addEventListener('toggle', function () { open.weeks[d.getAttribute('data-nnav-week')] = d.open; });
    });
    each('[data-nnav-lesson]', function (d) {
      d.addEventListener('toggle', function () { open.lessons[d.getAttribute('data-nnav-lesson')] = d.open; });
    });

    each('[data-nnav-topic]', function (b) {
      b.addEventListener('click', function () { go(b.getAttribute('data-nnav-topic')); });
    });

    each('[data-nnav-toggle]', function (b) {
      b.addEventListener('click', function () {
        showing = !showing;
        var box = el.querySelector('.nnav');
        var wrap = el.querySelector('.noteswrap');
        if (!box) return;
        /* Toggled in place rather than by redrawing: a redraw would rebuild
           the notes underneath her and lose her scroll position for the sake
           of hiding a column.

           The wrapper is told too, so the column the sidebar was occupying
           goes back to the notes instead of leaving a gap. */
        box.className = showing ? 'nnav' : 'nnav is-shut';
        if (wrap) wrap.className = showing ? 'noteswrap' : 'noteswrap is-navshut';
        var icon = box.querySelector('.nnav-handle-icon');
        if (icon) icon.textContent = showing ? '×' : '☰';
        b.setAttribute('aria-expanded', showing ? 'true' : 'false');
      });
    });
  }

  return {
    init: init,
    html: html,
    bind: bind,
    /* So a screen can wrap itself without duplicating the layout markup. */
    wrap: function (navHtml, mainHtml) {
        return '<div class="noteswrap' + (showing ? '' : ' is-navshut') + '">' + navHtml +
             '<div class="noteswrap-main">' + mainHtml + '</div></div>';
    }
  };
})();
