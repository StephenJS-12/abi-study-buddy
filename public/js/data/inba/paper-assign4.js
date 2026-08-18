/* INBA01-5 — questions derived from Assignment 4 (example paper, with memo).

   Worked through in order:

     Q1.1  draw the organisation structure (22 marks — the single biggest
           question in any of the four papers)
             → unity of command read off a chart; two types of
               departmentalisation operating at different levels of the same
               structure; what a location structure buys you; and the trap that
               a three-tier chart does not show three levels of management
     Q1.2  evaluate the mission statement against three criteria (7 marks)
             → NOT converted. See the note below.
     Q1.3  rewrite it as a good mission statement (2 marks)
             → NOT converted, for the same reason.
     Q1.4  draft two strategic goals and three values (5 marks)
             → already covered. Strategic goals and the big areas they span are
               tested in i3-strategic, and management values as a factor
               shaping strategic goals is tested there too. The three values
               themselves are the student's own opinion.
     Q1.5  evaluate a marketing goal against the criteria for effective goals
             → a goal that is well written and still fails, on the one SMART
               criterion nothing yet tested. See the second note below.
     Sec B 1.1  six sources of finance (12 marks)
             → NOT converted. See the third note below.
     Sec B 1.2  five practical ways to find new customers (10 marks)
             → the promotional mix. The memo answers this with a marketing
               blog listicle, but the tactics it lists sort cleanly into the
               four elements of the promotional mix, which is real theory in
               Abi's notes and was never tested.

   THREE PLACES THIS MEMO GOES OUTSIDE ABI'S NOTES:

   1. Q1.2 turns on "the three questions of criteria as indicated on page 28 of
      your study guide" — what is our product or service, who are our
      customers, and how do we provide it. Those three questions ARE NOT IN
      ABI'S NOTES. Her material treats the mission statement as the thing that
      directs strategic goals and as top management's job, and never gives
      criteria for judging one. Q1.2 and Q1.3 are 9 marks and neither is
      convertible. Flagged to Stephen.

   2. Q1.5 says "the criteria for effective goals" and the memo applies SIX:
      specific and measurable, set for a period, challenging yet realistic,
      responsibility clearly assigned, LINKED TO REWARDS, and CONSISTENT. The
      last three are not in Abi's notes — she has SMART, which has five
      criteria and neither rewards nor consistency among them. Under SMART the
      assignment's goal largely passes; under the memo's six it fails. No
      question here asks whether that goal is effective, because the answer
      depends on which framework you were taught. What IS asked is the
      transferable skill, using her framework.

   3. Section B 1.1 wants six named sources of finance and the memo gives
      family and friends, angel investors, government grants, personal
      investment, bank loans, and venture capital. Abi's notes carry savings,
      loans and investors as the three categories, plus the short-term
      instruments in i3-finplan — not this list. Assignment 1 already added the
      three questions her notes do support here (a1-4, a1-6, a1-7), and going
      further would mean teaching her a list she cannot find in her material.

   These merge into the existing topic pools rather than forming a topic. */

(function () {
  var byTopic = {};

  /* ───────── Q1.1 · unity of command, read off the chart ───────── */
  byTopic['i4-principles'] = [
    {
      id: 'a4-1', type: 'mcq', marks: 3,
      prompt: 'On an organisation chart, four regional managers each report to the managing director and to ' +
              'nobody else, and each functional manager reports to exactly one regional manager. Which design ' +
              'principle does this satisfy, and what does it prevent?',
      options: [
        'Unity of command — it prevents two managers issuing contradictory instructions with no way for the employee to know which to follow',
        'Span of control — it prevents any one manager from supervising too many people at once',
        'Specialisation — it prevents employees from having to perform tasks outside their expertise',
        'Standardisation — it prevents the same job being done differently by different people'
      ],
      answer: 0,
      solution: [
        { lab: 'Unity of command', val: 'Each employee has only one direct supervisor to report to' },
        { lab: 'What it prevents', val: 'Contradictory instructions from two managers, with no way to choose between them' },
        { lab: 'Answer', val: 'Unity of command', final: true }
      ],
      why: 'It is the principle you can literally see on a chart: count the lines arriving at each box. More ' +
           'than one, and unity of command has been broken — which is exactly why a matrix structure, where ' +
           'employees have two reporting lines, is treated as a deliberate exception.'
    }
  ];

  /* ───────── Q1.1 · departmentalisation ───────── */
  byTopic['i4-depart'] = [
    {
      id: 'a4-2', type: 'mcq', marks: 3,
      prompt: 'A car dealership with branches across South Africa divides itself first into four regional ' +
              'divisions — KwaZulu-Natal, Gauteng, Western Cape and Eastern Cape. Each region is then divided ' +
              'into marketing, production, finance and human resources departments. Which type or types of ' +
              'departmentalisation is this organisation using?',
      options: [
        'Location departmentalisation at the first level, and functional departmentalisation within each region',
        'Location departmentalisation only — the functions inside each region are not a form of departmentalisation',
        'Functional departmentalisation only — the regions are branches rather than divisions',
        'Matrix departmentalisation, because there are two levels of division'
      ],
      answer: 0,
      solution: [
        { lab: 'First level', val: 'Location — organised by the geographic regions served' },
        { lab: 'Second level', val: 'Functional — grouped by the specialised skills performed' },
        { lab: 'Not matrix', val: 'Matrix means two reporting lines for one employee, not two levels of division' },
        { lab: 'Answer', val: 'Location first, then functional', final: true }
      ],
      why: 'A real organisation rarely uses just one type, and a question asking you to name "the" type is ' +
           'often asking for two. The matrix distractor is the one to watch: two <i>levels</i> of division is ' +
           'an ordinary hierarchy, while a matrix is two <i>bosses</i> for the same person.'
    },
    {
      id: 'a4-3', type: 'multi', marks: 4,
      prompt: 'A national business organises itself into regional divisions, each operating almost like a ' +
              'standalone business. What does this structure give it? <b>Select all that apply.</b>',
      options: [
        'Local responsiveness to customer preferences',
        'Responsiveness to cultural nuances in each region',
        'Responsiveness to the legal requirements of each region',
        'Faster, decentralised decisions made closer to the customer',
        'The removal of any need for functional specialists within each region',
        'A guarantee that the brand message stays identical everywhere'
      ],
      answers: [0, 1, 2, 3],
      solution: [
        { lab: 'Location departmentalisation', val: 'Organised by the geographic regions served' },
        { lab: 'What it buys', val: 'Local responsiveness to preferences, culture and law' },
        { lab: 'And', val: 'Decentralised decisions taken closer to the customer' },
        { lab: 'Answer', val: 'The first four', final: true }
      ],
      why: 'The last two options are the price rather than the benefit. Each region still needs its own ' +
           'functional staff, and the more responsive a division is to local conditions the harder a single ' +
           'consistent brand message becomes.'
    }
  ];

  /* ───────── Q1.1 · what the chart does and does not show ───────── */
  byTopic['i2-levels'] = [
    {
      id: 'a4-4', type: 'mcq', marks: 3,
      prompt: 'An organisation chart shows a Managing Director at the top, four Regional Managers reporting ' +
              'to him, and four functional managers — marketing, production, finance and human resources — ' +
              'reporting to each Regional Manager. A student concludes that the chart therefore shows all ' +
              'three levels of management. Is that right?',
      options: [
        'No — the Managing Director is top management, but regional managers and functional managers are both given as examples of middle management. Lower management does not appear on this chart at all',
        'Yes — three tiers of boxes on a chart are the three levels of management',
        'No — all three tiers shown are top management, because they are all managers of managers',
        'Yes — but only because the organisation happens to have exactly three tiers'
      ],
      answer: 0,
      solution: [
        { lab: 'Top management', val: 'Board, CEO, Managing Director' },
        { lab: 'Middle management', val: 'Marketing, HR and operations managers — AND regional managers and divisional heads' },
        { lab: 'Lower management', val: 'Team leaders, supervisors and foremen — absent from this chart' },
        { lab: 'Answer', val: 'No — two of the three tiers are both middle management', final: true }
      ],
      why: 'Tiers on a chart and levels of management are not the same thing, and this is the trap in every ' +
           'org-chart question. The test for lower management is whether they supervise <i>non-managerial</i> ' +
           'employees — and nobody on this chart does.'
    }
  ];

  /* ───────── Q1.5 · a goal that is well written and still fails ───────── */
  byTopic['i3-smart'] = [
    {
      id: 'a4-5', type: 'mcq', marks: 3,
      prompt: 'A marketing department sets the goal: <i>"Increase customer brand recognition by 15% within ' +
              'the next 12 months."</i> It is clearly worded, carries a number, and has a deadline. The ' +
              'organisation’s strategic goals for the same period say nothing about brand recognition — they ' +
              'are entirely about opening branches in new provinces. Which SMART criterion does this goal ' +
              'fail?',
      options: [
        'Relevant — it is not aligned with the broader objectives it is supposed to support',
        'Specific — "brand recognition" is too vague a thing to aim at',
        'Measurable — recognition cannot be tracked in the way sales can',
        'Time-bound — 12 months is too long a period for a departmental goal'
      ],
      answer: 0,
      solution: [
        { lab: 'Specific', val: 'Met — it names brand recognition and the department responsible' },
        { lab: 'Measurable', val: 'Met — 15%' },
        { lab: 'Time-bound', val: 'Met — 12 months' },
        { lab: 'Relevant', val: 'Failed — it does not connect to any strategic goal above it' },
        { lab: 'Answer', val: 'Relevant', final: true }
      ],
      why: 'Relevant is the criterion people skip, because a goal can pass the other four while pulling a ' +
           'department in a direction the organisation is not going. That is the whole reason goals form a ' +
           'hierarchy — each level is supposed to support the one above it.'
    }
  ];

  /* ───────── Section B 1.2 · practical ways to find customers ───────── */
  byTopic['i3-mktplan'] = [
    {
      id: 'a4-6', type: 'match', marks: 4,
      prompt: 'A small business owner is trying to attract new customers. Match each thing she does to the ' +
              'element of the <b>promotional mix</b> it belongs to.',
      pairs: [
        { left: 'Paying for listings so the business appears when people search online', right: 'Advertising' },
        { left: 'Running a two-week introductory offer at a reduced price for first-time buyers', right: 'Sales promotions' },
        { left: 'Sponsoring a local charity fun run to raise the business’s profile in the community', right: 'Public relations' },
        { left: 'Posting behind-the-scenes videos and replying to comments on the business’s own channels', right: 'Social media' }
      ],
      solution: [
        { lab: 'The promotional mix', val: 'Advertising, sales promotions, public relations and social media' },
        { lab: 'Advertising', val: 'Paid placement of a message' },
        { lab: 'Sales promotions', val: 'A short-term incentive to try or buy' },
        { lab: 'Public relations', val: 'Building goodwill and profile rather than selling directly' },
        { lab: 'Answer', val: 'All four rows as above', final: true }
      ],
      why: 'A question asking for practical ways to find customers is marked far better when the tactics are ' +
           'organised under the mix than when they are listed at random — and the mix is also how you spot ' +
           'that you have suggested five versions of the same thing.'
    }
  ];

  /* ── merge into the pools the week files already registered ──────────────── */

  var weeks = ((window.MODULE_CONTENT || {}).inba || {}).weeks || [];
  var wanted = [], k;
  for (k in byTopic) { if (byTopic.hasOwnProperty(k)) wanted.push(k); }

  for (var w = 0; w < weeks.length; w++) {
    var topics = weeks[w].topics || [];
    for (var t = 0; t < topics.length; t++) {
      var extra = byTopic[topics[t].id];
      if (!extra) continue;
      topics[t].questions = (topics[t].questions || []).concat(extra);
      for (var m = 0; m < wanted.length; m++) {
        if (wanted[m] === topics[t].id) { wanted.splice(m, 1); break; }
      }
    }
  }

  if (wanted.length && typeof window.console !== 'undefined' && window.console.warn) {
    window.console.warn('Assignment 4 questions have no home topic: ' + wanted.join(', '));
  }
}());
