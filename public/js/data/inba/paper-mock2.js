/* INBA01-5 — questions derived from Mock Exam 2 (example paper).

   Twenty one-mark MCQs, five four-mark short answers and two fifteen-mark
   long answers. Most of it was already in the pools, which is the expected
   result by the fifth paper — this exam is a broad sweep of the whole module
   rather than a deep dig into one part of it. Five questions here, each on an
   angle nothing else tested.

   Worked through in order. Where a question is marked "covered", the pool
   already tests exactly that point:

     Q1  top management                        covered (i2-levels)
     Q2  tactical planning                     covered (i3-tacop)
     Q3  concurrent control                    NOT IN HER NOTES — see below
     Q4  human skill                           covered (i2-skills)
     Q5  functional structure                  covered (i4-depart)
     Q6  expert power                          covered (i4d-3)
     Q7  job rotation                          → m2-3, scenario was untested
     Q8  efficient                             covered (i2-management)
     Q9  spokesperson                          covered (a1-23)
     Q10 openness                              → m2-2, the one untested pillar
     Q11 role of entrepreneurs in the economy  covered (i1e-2)
     Q12 what follows measurement              → m2-1, the sequence was untested
     Q13 chain of command                      NOT IN HER NOTES — see below
     Q14 task-oriented leader                  covered (i5-situational)
     Q15 external physical environment         → m2-5, mapped onto PESTLE
     Q16 Hersey and Blanchard "Telling"        NOT IN HER NOTES — see below
     Q17 abandoning a career                   covered (a2-12)
     Q18 standardisation                       → m2-4, scenario was untested
     Q19 operational goal, lower management    covered (i3-hierarchy)
     Q20 justice approach                      covered (i1x-3)
     Q21 four steps of control                 covered (i6b-1, a2-4)
     Q22 strategic against tactical planning   covered (i3-tacop)
     Q23 four dimensions of trust              covered (i5f-1, i5f-2) + m2-2
     Q24 two types of power                    covered (a2-7)
     Q25 four benefits of planning             covered (i3-value)
     Q26 entrepreneurship essay                covered (a2-9 to a2-12)
     Q27 SABMiller structure and motivation    covered, and see paper-mock3

   THREE THINGS THIS EXAM ASKS THAT ABI'S NOTES DO NOT CONTAIN:

   1. Q3 — CONCURRENT CONTROL. The preventative / concurrent / post control
      classification is not in her Week 6. This is now the third paper to
      require it and Mock Exam 3 spends 8 marks on it. Flagged to Stephen as a
      decision, not filled in here.

   2. Q13 — CHAIN OF COMMAND. Her i4-principles topic covers unity of command
      and span of control and stops there. Mock Exam 3 asks this too (Q1.19).

   3. Q16 — Hersey and Blanchard's four NAMED styles (Telling, Selling,
      Participating, Delegating). Her notes describe the model as moving
      between combinations of high and low task behaviour and high and low
      relationship behaviour, and never name the four quadrants.

   These merge into the existing topic pools rather than forming a topic. */

(function () {
  var byTopic = {};

  /* ───────── Q12 · the order of the control steps ───────── */
  byTopic['i6-process'] = [
    {
      id: 'm2-1', type: 'mcq', marks: 3,
      prompt: 'A manager has set the standard and has collected the figures showing what was actually ' +
              'produced. Which step of the control process comes next, and what does it involve?',
      options: [
        'Evaluate deviations — validate that the standard was realistic and the data reliable, then judge whether the gap is significant',
        'Take corrective action — the figures are in, so the shortfall can be fixed straight away',
        'Establish standards — the standard should be revisited before anything else happens',
        'Allocate resources — the manager decides what to spend on closing the gap'
      ],
      answer: 0,
      solution: [
        { lab: 'Step 1', val: 'Establish standards' },
        { lab: 'Step 2', val: 'Measure actual performance' },
        { lab: 'Step 3', val: 'Evaluate deviations — the step that comes next' },
        { lab: 'Step 4', val: 'Take corrective action' },
        { lab: 'Answer', val: 'Evaluate deviations', final: true }
      ],
      why: 'Jumping from measurement straight to correction is the mistake the second option describes, and ' +
           'it is the one real managers actually make. Without the evaluation step you can spend money ' +
           'fixing a gap that was never real, or blame a team for a target that was never achievable.'
    }
  ];

  /* ───────── Q10 and Q23 · openness ───────── */
  byTopic['i5-trust'] = [
    {
      id: 'm2-2', type: 'mcq', marks: 3,
      prompt: 'A manager tells her team the whole truth about a difficult situation, including the parts she ' +
              'could comfortably have kept to herself, and shares information rather than holding it. Which ' +
              'dimension of trust is she demonstrating?',
      options: [
        'Openness — transparency and information sharing',
        'Integrity — honesty, strong moral principles and keeping promises',
        'Loyalty — willingness to protect and support the team',
        'Competence — knowledge and skill, so the team believes she knows what she is doing'
      ],
      answer: 0,
      solution: [
        { lab: 'Openness', val: 'Transparency and information sharing — telling the whole truth' },
        { lab: 'Integrity', val: 'About being honest, rather than about how much is shared' },
        { lab: 'Answer', val: 'Openness', final: true }
      ],
      why: 'Openness and integrity are the pair that get swapped. Integrity is not lying; openness is not ' +
           'withholding. A manager can be scrupulously honest in everything she says and still be closed, ' +
           'and the five pillars treat those as two different things.'
    }
  ];

  /* ───────── Q7 and Q18 · job design in practice ───────── */
  byTopic['i4-jobdesign'] = [
    {
      id: 'm2-3', type: 'mcq', marks: 3,
      prompt: 'An intern spends a year at a company moving between different departments, spending a few ' +
              'months in each, so that she learns how the whole organisation fits together. Which element of ' +
              'job design is this, and what is it best used for?',
      options: [
        'Job rotation — best as a training tool, to increase flexibility and cross-training',
        'Job enlargement — increasing the number and variety of tasks in one job to reduce boredom',
        'Job enrichment — increasing both the tasks and the control and authority the worker has',
        'Job specialisation — narrowing activities down to simple, repetitive routines'
      ],
      answer: 0,
      solution: [
        { lab: 'Job rotation', val: 'Moving employees between positions' },
        { lab: 'Best used for', val: 'Training — flexibility and cross-training' },
        { lab: 'Its limit', val: 'It swaps one routine task for another, so its effect on long-term motivation is limited' },
        { lab: 'Answer', val: 'Job rotation', final: true }
      ],
      why: 'Rotation is the one that looks most like a motivation tool and is really a training tool. Moving ' +
           'between four routine jobs is still four routine jobs, which is why the module rates its ' +
           'long-term motivational impact as limited.'
    },
    {
      id: 'm2-4', type: 'mcq', marks: 3,
      prompt: 'A bank builds a mobile app so that a customer applying for a home loan is taken through ' +
              'exactly the same steps, in the same order, as they would be at a branch counter. Which ' +
              'principle is the bank applying?',
      options: [
        'Standardisation — uniform, consistent procedures, so the work is done the same way regardless of who or what performs it',
        'Specialisation — narrowing activities down to simple, repetitive routines performed by specialists',
        'Delegation — assigning a portion of the workload to others, with the authority to complete it',
        'Flexibility — allowing the process to adapt to each customer’s circumstances'
      ],
      answer: 0,
      solution: [
        { lab: 'Standardisation', val: 'Uniform and consistent procedures employees follow in doing their jobs' },
        { lab: 'What it ensures', val: 'Work is done consistently every time, regardless of who performs it' },
        { lab: 'Answer', val: 'Standardisation', final: true }
      ],
      why: 'Both mock exams ask this one, in almost the same words, which makes it worth knowing cold. The ' +
           'giveaway is the phrase "the same way as" — that is consistency, and consistency is ' +
           'standardisation.'
    }
  ];

  /* ───────── Q15 · a climate factor, placed in her framework ───────── */
  byTopic['i1-environ'] = [
    {
      id: 'm2-5', type: 'mcq', marks: 3,
      prompt: 'An agricultural business is worried about changing rainfall patterns caused by climate change. ' +
              'Which PESTLE factor is this, which environment does it sit in, and what can management do ' +
              'about it?',
      options: [
        'Environmental — a macro factor, which management can neither control nor influence, only prepare for',
        'Environmental — a market factor, which management can influence through its suppliers',
        'Political — a macro factor, since government sets climate policy',
        'Technological — a micro factor, since better forecasting software would solve it'
      ],
      answer: 0,
      solution: [
        { lab: 'PESTLE', val: 'Political, Economic, Social, Technology, Legal, Environmental' },
        { lab: 'Rainfall and climate', val: 'The Environmental factor' },
        { lab: 'Which environment', val: 'Macro — external and uncontrollable' },
        { lab: 'Answer', val: 'Environmental, macro, prepare for it', final: true }
      ],
      why: 'Some exam papers call this the <i>physical</i> environment rather than the Environmental factor ' +
           'of PESTLE. It is the same thing under a different name, so read the options rather than hunting ' +
           'for the exact word your notes used.'
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
    window.console.warn('Mock Exam 2 questions have no home topic: ' + wanted.join(', '));
  }
}());
