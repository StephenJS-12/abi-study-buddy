/* MABU01-5 — the lesson each maths topic belongs to.
 *
 * The same idea as the business one, against Milpark's own contents page for
 * maths. Kept separate because the two modules register their weeks in
 * different places: business into window.MODULE_CONTENT.inba, maths into
 * window.WEEK_DATA, which is where this file looks.
 *
 * LESSONS WITH NO TOPICS ARE DECLARED ANYWAY
 *
 *   One lesson is still unwritten — Week 1 Lesson 4, on turning words into
 *   equations. It is listed here with no topics rather than left out, so the
 *   contents page shows the shape of the actual week. Leaving it out would tell
 *   her Week 1 has four lessons and she had finished it, which is the one thing
 *   worse than an empty row.
 *
 *   validate.js still checks that every topic lands in exactly one lesson, so
 *   an empty lesson cannot be used to quietly hide one.
 */

(function () {

  var MAP = {

    'week1': [
      { number: 1, title: 'Basic mathematical rules and notation of fractions',
        emoji: '🍕',
        topics: ['w1-basics', 'w1-simplify', 'w1-multiply', 'w1-divide', 'w1-addsub'] },
      { number: 2, title: 'Basic mathematical rules and notation of decimals',
        emoji: '🔟',
        topics: ['w1-decimals', 'w1-rounding'] },
      { number: 3, title: 'Basic mathematical rules and notation of exponents',
        emoji: '⚡',
        topics: ['w1-powers', 'w1-exprules', 'w1-decay'] },
      /* NOT YET WRITTEN. Milpark's 4.1 to 4.3: turning words into solvable
         equations, then one-step and two-step equations. Nothing in the app
         mentions equations at all. Deferred deliberately — Abi is not worried
         about it for now. */
      { number: 4, title: 'Codifying words into equations to solve basic business problems',
        emoji: '🧩', topics: [] },
      { number: 5, title: 'Reasonability checks using fractions, decimals and rounding',
        emoji: '🧠',
        /* 5.1 and 5.2 also live inside the Rounding topic in Lesson 2, where
           they were first met. This is 5.3 to 5.5 — the multiplication and
           division checks, which are where decimals actually catch people. */
        topics: ['w1-reason'] }
    ],

    'week2': [
      { number: 1, title: 'Convert fractions, decimals and percentages',
        emoji: '🔄',
        topics: ['w2-convert', 'w2-rbp'] },
      { number: 2, title: 'Introduction to business uses of percentages',
        emoji: '📈',
        topics: ['w2-change', 'w2-overhead', 'w2-variance'] },
      { number: 3, title: 'Use of percentages to determine discount amounts',
        emoji: '🏷️',
        topics: ['w2-discount'] },
      { number: 4, title: 'Use of percentages to determine the selling price',
        emoji: '💰',
        topics: ['w2-margin'] }
    ],

    'week3': [
      { number: 1, title: 'Measures of central tendency',
        emoji: '🎯',
        topics: ['w3-mean', 'w3-median', 'w3-mode'] },
      { number: 2, title: 'Measures of dispersion',
        emoji: '📏',
        topics: ['w3-spread', 'w3-percentile', 'w3-sd', 'w3-skew'] },
      { number: 3, title: 'Introduction to probability',
        emoji: '🎲',
        topics: ['w3-prob', 'w3-venn', 'w3-add', 'w3-mult'] },
      { number: 4, title: 'Expected value and decision-making',
        emoji: '⚖️',
        topics: ['w3-ev'] }
    ],

    'week4': [
      { number: 1, title: 'Key concepts regarding time value of money',
        emoji: '⏳',
        topics: ['w4-terms'] },
      { number: 2, title: 'Simple and compound interest',
        emoji: '💹',
        topics: ['w4-simple', 'w4-compound', 'w4-calc'] },
      { number: 3, title: 'Nominal and effective interest rates',
        emoji: '📊',
        topics: ['w4-freq'] }
    ],

    'week5': [
      { number: 1, title: 'Determining the present value (PV) of a future accumulated amount',
        emoji: '⏪',
        topics: ['w5-pv', 'w5-pvcalc'] },
      { number: 2, title: 'Changes during a term — interest rates',
        emoji: '🔀',
        topics: ['w5-ratefv', 'w5-ratepv'] },
      { number: 3, title: 'Changes during a term — additional amounts',
        emoji: '➕',
        topics: ['w5-addfv', 'w5-addpv'] }
    ],

    /* All five lessons, complete. The first Week 6 PDF stopped partway through
       Lesson 2 and the last three were declared here with no topics; the full
       notes arrived and they are written. */
    'week6': [
      { number: 1, title: 'The basic elements and calculations of annuities',
        emoji: '🔁',
        topics: ['w6-annuity', 'w6-annfv', 'w6-anncalc', 'w6-annpmt', 'w6-annrate'] },
      { number: 2, title: 'Using an annuity to pay back a loan',
        emoji: '🏠',
        topics: ['w6-loancost', 'w6-schedule', 'w6-amort'] },
      { number: 3, title: 'Interest rate changes during term of amortised loan',
        emoji: '📉',
        topics: ['w6-amortfn', 'w6-ratechange'] },
      { number: 4, title: 'PMT made at the beginning of an interest period',
        emoji: '⏰',
        topics: ['w6-due'] },
      { number: 5, title: 'The effect of deposits and balloon payments on annuity TVM values',
        emoji: '🎈',
        topics: ['w6-deposit', 'w6-balloon'] }
    ]
  };

  var weeks = window.WEEK_DATA || [];

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
        emoji: lesson.emoji || '📘',
        topicIds: found,
        /* Carried through so validate.js can tell a topic that was dropped
           from one that was never named. */
        wanted: lesson.topics.length
      });
    }
    week.lessons = out;
  }
}());
