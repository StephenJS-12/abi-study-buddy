/* INBA01-5 — the lesson each topic belongs to.
 *
 * Milpark structures the module Week > Lesson > Topic. The app was built
 * Week > Topic, which flattened the middle level away — so a week showed
 * twelve topics in one list where the course shows four lessons of three.
 *
 * WHY THIS IS A SEPARATE FILE
 *
 *   The six week files are large, verified, and carry every question in the
 *   module. Threading a `lesson:` field through sixty-one topic definitions
 *   would touch all of them for a change that is really about one thing: the
 *   shape of the contents page. Holding the whole map here instead means it
 *   can be read against the official topic list in one sitting, which is
 *   exactly how it was checked.
 *
 * THE MAPPING IS NOT ONE-TO-ONE
 *
 *   A topic here often covers several of Milpark's numbered items — their
 *   4.1 to 4.4 are four short pages on the micro, market and macro
 *   environments, and one topic covers all of them. Where a topic spans two
 *   lessons it is filed under the one it is mostly about. tests/validate.js
 *   checks that every topic lands in exactly one lesson and that no lesson
 *   names a topic that does not exist.
 */

(function () {

  var MAP = {

    'inba-week1': [
      { number: 1, title: 'The nature and role of business',
        topics: ['i1-business', 'i1-transform', 'i1-resources'] },
      { number: 2, title: 'Entrepreneurship',
        topics: ['i1-entre', 'i1-process', 'i1-plan'] },
      { number: 3, title: 'Ethics and sustainability',
        topics: ['i1-ethics', 'i1-csr', 'i1-tbl', 'i1-govern'] },
      { number: 4, title: 'The micro, market and macro environments',
        topics: ['i1-environ', 'i1-swot'] }
    ],

    'inba-week2': [
      { number: 1, title: 'The basic functions of management',
        topics: ['i2-management', 'i2-functions'] },
      { number: 2, title: 'Levels and skills of management',
        topics: ['i2-levels', 'i2-skills'] },
      { number: 3, title: 'Main roles of managers',
        topics: ['i2-roles'] },
      { number: 4, title: 'Functional areas of a business',
        topics: ['i2-areas', 'i2-marketing', 'i2-finance', 'i2-hrlog'] }
    ],

    'inba-week3': [
      { number: 1, title: 'Importance of planning',
        topics: ['i3-planning', 'i3-value'] },
      { number: 2, title: 'The planning process',
        topics: ['i3-process', 'i3-control'] },
      { number: 3, title: 'Planning at each management level',
        topics: ['i3-smart', 'i3-hierarchy', 'i3-strategic', 'i3-tacop'] },
      { number: 4, title: 'Functional area planning',
        topics: ['i3-opsplan', 'i3-finplan', 'i3-mktplan'] }
    ],

    'inba-week4': [
      { number: 1, title: 'Importance of organising',
        topics: ['i4-organising'] },
      { number: 2, title: 'Job and organisational design',
        topics: ['i4-principles', 'i4-authority', 'i4-power', 'i4-delegation', 'i4-jobdesign'] },
      { number: 3, title: 'Departmentalisation',
        topics: ['i4-depart', 'i4-structure'] },
      /* The sixteen numbered items in this lesson are confirmed and all of
         them are now covered, except 4.13 — which is absent from the source
         notes themselves — and 4.5, an E-Bike SA application.

         The lesson's TITLE is still unconfirmed: it appears in neither the
         screenshot nor the extracted notes. "Functional area organising"
         follows the pattern of Week 3's "Functional area planning" and Week
         6's "Functional area control". */
      { number: 4, title: 'Functional area organising',
        topics: ['i4-opsorg', 'i4-opswork', 'i4-hrmkt', 'i4-mktcomms', 'i4-mktdist',
                 'i4-finpur', 'i4-finorg', 'i4-purlevel', 'i4-purinternal'] }
    ],

    'inba-week5': [
      { number: 1, title: 'Importance of leading',
        topics: ['i5-leadership', 'i5-comms'] },
      { number: 2, title: 'Conventional theories of leadership',
        topics: ['i5-trait', 'i5-styles', 'i5-situational', 'i5-trust'] },
      { number: 3, title: 'Contemporary leadership theory',
        topics: ['i5-contemporary', 'i5-servant'] },
      { number: 4, title: 'Motivation',
        topics: ['i5-motivation', 'i5-needs', 'i5-process', 'i5-practice'] }
    ],

    'inba-week6': [
      { number: 1, title: 'Importance of control',
        topics: ['i6-control'] },
      { number: 2, title: 'The control process',
        topics: ['i6-process'] },
      { number: 3, title: 'Inventory and quality control',
        topics: ['i6-inventory', 'i6-invsystems', 'i6-quality'] },
      { number: 4, title: 'Functional area control',
        topics: ['i6-funcontrol'] }
    ]
  };

  /* Emoji per lesson, purely so the contents page has something to look at.
     Keyed on week and lesson so they never collide within a week. */
  var EMOJI = {
    'inba-week1': ['🏬', '🚀', '⚖️', '🌍'],
    'inba-week2': ['🧭', '🪜', '🎭', '🏭'],
    'inba-week3': ['🗓️', '🔄', '🎯', '🧩'],
    'inba-week4': ['🏗️', '🔗', '🗄️', '🧰'],
    'inba-week5': ['🌟', '📚', '💡', '🔥'],
    'inba-week6': ['🎛️', '🔁', '📦', '📊']
  };

  var weeks = ((window.MODULE_CONTENT || {}).inba || {}).weeks || [];

  for (var w = 0; w < weeks.length; w++) {
    var week = weeks[w];
    var plan = MAP[week.id];
    if (!plan) continue;

    var byId = {}, i, j;
    for (i = 0; i < (week.topics || []).length; i++) byId[week.topics[i].id] = week.topics[i];

    var out = [];
    for (i = 0; i < plan.length; i++) {
      var lesson = plan[i];
      var found = [];
      for (j = 0; j < lesson.topics.length; j++) {
        var topic = byId[lesson.topics[j]];
        /* A named topic that does not exist is dropped rather than pushed
           through as a hole in the list. validate.js reports it loudly. */
        if (!topic) continue;
        topic.lesson = lesson.number;
        found.push(topic.id);
      }
      out.push({
        number: lesson.number,
        title: lesson.title,
        emoji: (EMOJI[week.id] || [])[i] || '📘',
        topicIds: found,
        /* Carried through so validate.js can tell a topic that was dropped
           from one that was never named. */
        wanted: lesson.topics.length
      });
    }
    week.lessons = out;
  }
}());
