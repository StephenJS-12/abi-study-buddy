/* Abi's Study Buddy — the modules she is studying.
 *
 * Each module is a self-contained set of weeks, topics, questions and notes.
 * Everything below the module picker works exactly as it did when there was
 * only one, because the app already read its content through Content rather
 * than reaching for the data files itself.
 *
 * Points and rewards are deliberately NOT per module. There is one ladder to
 * 1000 shared across everything, so what Stephen owes stays the same however
 * many modules she takes. Badges, streaks and topic progress are per topic,
 * and topic ids carry their module's prefix, so those separate naturally.
 *
 * To add a module: add an entry here, add its data files to index.html, and
 * have them register with Modules.contentFor(id). Nothing else needs to know.
 */

window.MODULE_CONTENT = window.MODULE_CONTENT || {};

var Modules = (function () {

  var CATALOGUE = [
    {
      id: 'mabu',
      code: 'MABU01-5',
      title: 'Mathematical Skills for Business',
      emoji: '📐',
      accent: 1,
      blurb: 'Fractions and decimals, percentages and mark-ups, statistics, and interest.',
      status: 'ready'
    }

    /* Modules waiting on their notes and past papers. Give each one a real id,
       code and title and it appears on the home screen as "coming soon" — she
       can see the whole year even before the questions exist.

       {
         id: 'xxxx',
         code: 'XXXX01-5',
         title: 'Something Else Entirely',
         emoji: '📚',
         accent: 2,
         blurb: 'One line about what it covers.',
         status: 'soon'
       }
    */
  ];

  function contentFor(id) {
    if (!window.MODULE_CONTENT[id]) {
      window.MODULE_CONTENT[id] = { weeks: [], exams: [] };
    }
    return window.MODULE_CONTENT[id];
  }

  /* The original module's data files load into the globals they always used.
     Adopting them here rather than editing eight large, verified data files
     keeps this change away from the question bank entirely — the safest place
     for a restructure not to touch. */
  (function adoptOriginal() {
    var mabu = contentFor('mabu');
    mabu.weeks = window.WEEK_DATA || [];
    mabu.exams = window.EXAM_DATA || [];
  })();

  function all() { return CATALOGUE; }

  function get(id) {
    for (var i = 0; i < CATALOGUE.length; i++) {
      if (CATALOGUE[i].id === id) return CATALOGUE[i];
    }
    return null;
  }

  function ready() {
    return CATALOGUE.filter(function (m) {
      return m.status === 'ready' && contentFor(m.id).weeks.length;
    });
  }

  /* Where she was last time, so returning to the site does not always land
     her on the picker when she is only really studying one thing. */
  function remembered() {
    var wanted = Store.get().lastModule;
    if (wanted && get(wanted)) return wanted;
    var open = ready();
    return open.length ? open[0].id : null;
  }

  return {
    all: all,
    get: get,
    ready: ready,
    remembered: remembered,
    contentFor: contentFor
  };
})();
