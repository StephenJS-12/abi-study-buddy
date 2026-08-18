/* INBA01-5 — questions derived from Assignment 2 (example paper, with memo).

   This paper came with its marking memo, which is more useful than the paper.
   The memo shows that almost every mark is awarded for CLASSIFYING a concrete
   example under the right piece of theory: a job title under a level of
   management, a goal statement under strategic/tactical/operational, a factory
   action under a step of the control process, a described behaviour under a
   type of power. That is a markable skill, and it is the one thing the existing
   pools were thinnest on — they test the lists themselves thoroughly.

   Worked through in order:

     Q1.1  three levels of management, with an example of each
             → the posts the module gives as examples of each level
     Q1.2  an objective formulated at each level
             → classifying real goal statements; the scope of each goal level
     Q2.1  four steps to establish control, with an example of each
             → classifying factory actions under the four steps; what a
               performance standard must be; which corrective choice training is
     Q3.1  identify the two types of power in the scenario
             → holding two types of power at once; reward against coercive
     Q3.2  research two real business leaders who hold each type
             → NOT converted. The memo says "award marks for any leader
               mentioned and motivation, marker's discretion advised" — there
               is no right answer to mark against.
     Sec B essay: define entrepreneurship, the role of entrepreneurship in
           South Africa, three challenges he faced, why he beats competitors
             → entrepreneurship as distinct from an entrepreneur; replication
               against entrepreneurship; opportunity against necessity; what
               each of the seven challenges looks like in practice
             → the essay's "in your own opinion" section, its bibliography and
               its formatting marks are not theory and are not converted.

   Two things worth knowing about this memo, neither of which became a question:

   1. Its tactical goal example is mislabelled. It heads the example "HR
      department" and then gives "increase room occupancy rates to 70%", noting
      in brackets that this is a marketing goal. Occupancy is not an HR
      objective. The goal statement used below is kept but attributed to
      middle management generally, not to HR.

   2. It places a "Training and Development Manager" at lower management. A
      functional manager of that kind sits at middle management by this
      module's own definition, so no question is built on that classification.

   As with Assignment 1, nothing is answered from outside Abi's notes, and
   these merge into the existing topic pools rather than forming a topic. */

(function () {
  var byTopic = {};

  /* ───────── Q1.1 · the three levels, with examples ───────── */
  byTopic['i2-levels'] = [
    {
      id: 'a2-1', type: 'match', marks: 3,
      prompt: 'An exam question asks you to identify the three levels of management and give an example of ' +
              'each. Match each level to the posts the module gives as examples of it.',
      pairs: [
        { left: 'Top management', right: 'The Board of Directors, the CEO and the Managing Director' },
        { left: 'Middle management', right: 'Marketing, HR and operations managers; regional managers, divisional heads and project leaders' },
        { left: 'Lower management', right: 'Team leaders, supervisors and foremen' }
      ],
      solution: [
        { lab: 'Top', val: 'The strategic level — in government, the Minister and Director-General' },
        { lab: 'Middle', val: 'The tactical level — the link between top and lower' },
        { lab: 'Lower', val: 'Supervisory, operational or first-line' },
        { lab: 'Answer', val: 'All three rows as above', final: true }
      ],
      why: 'Naming the three levels earns some of the marks and the examples earn the rest, which is why the ' +
           'job titles are worth knowing as well as the definitions. The giveaway for middle management is ' +
           'that the title names a <i>function</i> — marketing, HR, operations.'
    }
  ];

  /* ───────── Q1.2 · an objective at each level ───────── */
  byTopic['i3-hierarchy'] = [
    {
      id: 'a2-2', type: 'match', marks: 3,
      prompt: 'Match each objective to the kind of goal it is and the level that sets it.',
      pairs: [
        { left: 'Expand market share from 10% to 20% over the next five years', right: 'A strategic goal, set by top management' },
        { left: 'Raise occupancy rates to 70% across the regional branches within two years', right: 'A tactical goal, set by middle management' },
        { left: 'Run a buy-one-get-one-free promotion on Mondays during February', right: 'An operational goal, set by first-level management' }
      ],
      solution: [
        { lab: 'Strategic', val: 'Organisation-wide, 3 to 10 years' },
        { lab: 'Tactical', val: 'Departmental or divisional, 1 to 3 years' },
        { lab: 'Operational', val: 'A specific task, under a year' },
        { lab: 'Answer', val: 'All three rows as above', final: true }
      ],
      why: 'The time frame is the quickest tell — five years, two years, one month. The scope is the second: ' +
           'the whole organisation, a set of branches, one promotion on one day of the week.'
    },
    {
      id: 'a2-3', type: 'match', marks: 3,
      prompt: 'Match each level of goal to the scope it has.',
      pairs: [
        { left: 'Strategic goals', right: 'Broad, organisation-wide and general' },
        { left: 'Tactical goals', right: 'More specific — departmental or functional' },
        { left: 'Operational goals', right: 'Very specific, concrete and task-oriented' }
      ],
      solution: [
        { lab: 'Strategic', val: 'Where are we going?' },
        { lab: 'Tactical', val: 'How will we get there, by department?' },
        { lab: 'Operational', val: 'What do I do today?' },
        { lab: 'Answer', val: 'All three rows as above', final: true }
      ],
      why: 'Scope narrows as you descend the pyramid while specificity rises, and the two move together. A ' +
           'goal that is broad <i>and</i> concrete does not exist at any level.'
    }
  ];

  /* ───────── Q2.1 · the four steps of control, applied ───────── */
  byTopic['i6-process'] = [
    {
      id: 'a2-4', type: 'match', marks: 4,
      prompt: 'The owner of a growing manufacturer wants to establish control in her production facility. ' +
              'Match each action she takes to the step of the control process it belongs to.',
      pairs: [
        { left: 'Setting a target of 200 units a day, and a minimum quality score of 9 out of 10', right: 'Establish standards' },
        { left: 'Collecting figures every day on how many units were produced, and of what type', right: 'Measure actual performance' },
        { left: 'Investigating why only 160 units came off the line, and whether 200 was ever realistic', right: 'Evaluate deviations' },
        { left: 'Booking the team onto a training course to address what the investigation found', right: 'Take corrective action' }
      ],
      solution: [
        { lab: 'Step 1', val: 'Establish standards — defining the finish line before the race begins' },
        { lab: 'Step 2', val: 'Measure actual performance — continuously, quantifiably, reliably' },
        { lab: 'Step 3', val: 'Evaluate deviations — validate the discrepancy, then determine its significance' },
        { lab: 'Step 4', val: 'Take corrective action' },
        { lab: 'Answer', val: 'All four rows as above', final: true }
      ],
      why: 'Step 3 is the one that gets collapsed into step 4 under exam pressure. Notice it contains two ' +
           'separate jobs: finding out why the shortfall happened, <i>and</i> checking the standard was fair ' +
           'in the first place.'
    },
    {
      id: 'a2-5', type: 'multi', marks: 4,
      prompt: 'A manager is setting the performance standards her department will be controlled against. To ' +
              'be useful, what must a performance standard be? <b>Select all that apply.</b>',
      options: [
        'Relevant to a specific organisational goal',
        'Realistic given practical conditions',
        'Attainable with reasonable effort, while still being challenging',
        'Set by top management rather than by the department',
        'Identical across every department in the organisation'
      ],
      answers: [0, 1, 2],
      solution: [
        { lab: 'Relevant', val: 'Tied to a specific organisational goal, not measured for its own sake' },
        { lab: 'Realistic', val: 'Achievable under the conditions that actually exist' },
        { lab: 'Attainable but challenging', val: 'Reachable with reasonable effort, without being easy' },
        { lab: 'Answer', val: 'The first three', final: true }
      ],
      why: 'Realistic and attainable sound like the same requirement and are not. Realistic is about the ' +
           'conditions the work happens in; attainable is about the effort it demands — a standard can be ' +
           'perfectly reasonable on paper and impossible in a facility that loses power for four hours a day.'
    },
    {
      id: 'a2-6', type: 'mcq', marks: 3,
      prompt: 'A production line falls short of its daily target. The manager investigates, confirms the ' +
              'target was fair and the figures reliable, finds that the shortfall traces back to employees ' +
              'never having been trained on the new machine, and books them onto a training course. Which of ' +
              'the three corrective choices has she made?',
      options: [
        'Improve actual performance — addressing the root cause of the shortfall',
        'Revise the strategy — changing the approach being taken to reach the goal',
        'Adjust the standard — changing a target that was unrealistic in the first place',
        'None of the three, because training is a human resources matter rather than a control action'
      ],
      answer: 0,
      solution: [
        { lab: 'What she validated', val: 'The standard was fair and the data reliable — so the deviation is real' },
        { lab: 'The root cause', val: 'Missing training, not an unachievable target' },
        { lab: 'The choice', val: 'Improve actual performance' },
        { lab: 'Answer', val: 'Improve actual performance', final: true }
      ],
      why: 'The validation step is what rules out the third option. Had the target been unrealistic, ' +
           'adjusting the standard would have been the correct action and the training would have been money ' +
           'spent solving a problem that did not exist.'
    }
  ];

  /* ───────── Q3.1 · two types of power in one scenario ───────── */
  byTopic['i4-power'] = [
    {
      id: 'a2-7', type: 'multi', marks: 4,
      prompt: 'Two facts are known about a doctor who runs a small surgery. First, the three interns working ' +
              'under him consult him whenever there is something about a patient they do not understand. ' +
              'Second, he decides each year whether bonuses are paid, based on the surgery’s financial ' +
              'performance. Which <b>two</b> types of power do these two facts demonstrate? ' +
              '<b>Select all that apply.</b>',
      options: [
        'Expert power',
        'Reward power',
        'Coercive power',
        'Referent power',
        'Legitimate power'
      ],
      answers: [0, 1],
      solution: [
        { lab: 'The interns consult him', val: 'Expert power — specialised knowledge and expertise' },
        { lab: 'He decides on bonuses', val: 'Reward power — the ability to control and provide rewards' },
        { lab: 'Answer', val: 'Expert and reward power', final: true }
      ],
      why: 'A question like this gives you one piece of evidence per type of power, so count the pieces of ' +
           'evidence. Nothing here says he punishes anyone (coercive), that people follow him because they ' +
           'admire him personally (referent), or that the interns obey a title rather than the knowledge ' +
           '(legitimate).'
    },
    {
      id: 'a2-8', type: 'mcq', marks: 3,
      prompt: 'Two managers both change their teams’ behaviour by controlling what happens next. One offers ' +
              'bonuses, promotions and public praise. The other threatens demotion and termination. Which ' +
              'two types of power are these, and what do they have in common?',
      options: [
        'Reward and coercive power — both work on consequences rather than on agreement',
        'Reward and legitimate power — both depend on the manager’s formal position',
        'Referent and expert power — both are personal rather than positional',
        'Legitimate and coercive power — both are granted by the organisation’s hierarchy'
      ],
      answer: 0,
      solution: [
        { lab: 'Reward power', val: 'The ability to control and provide rewards' },
        { lab: 'Coercive power', val: 'The ability to punish or impose negative consequences' },
        { lab: 'What they share', val: 'Both secure compliance through consequences, not agreement' },
        { lab: 'Answer', val: 'Reward and coercive power', final: true }
      ],
      why: 'They are mirror images of one another, and that shared mechanism is their weakness: behaviour ' +
           'bought with consequences lasts exactly as long as the consequences do.'
    }
  ];

  /* ───────── Section B · defining entrepreneurship ───────── */
  byTopic['i1-entre'] = [
    {
      id: 'a2-9', type: 'mcq', marks: 3,
      prompt: 'An essay question asks you to define <b>entrepreneurship</b> before discussing anything else. ' +
              'Which of these is the definition of entrepreneurship, rather than of an entrepreneur?',
      options: [
        'The continuous process of building something valuable amidst scarcity and uncertainty',
        'An individual who identifies opportunities, gathers resources, and accepts the risks to create value',
        'The ownership of any business, however it came to be started',
        'The entrepreneurial mindset applied inside a large existing company'
      ],
      answer: 0,
      solution: [
        { lab: 'Entrepreneurship', val: 'The continuous process of building something valuable amidst scarcity and uncertainty' },
        { lab: 'An entrepreneur', val: 'The individual who identifies opportunities, gathers resources and accepts the risk' },
        { lab: 'The fourth option', val: 'Describes corporate entrepreneurship' },
        { lab: 'Answer', val: 'The first option', final: true }
      ],
      why: 'One is a process and the other is a person, and an essay that opens by defining the wrong one ' +
           'loses the mark. The words "scarcity and uncertainty" are the part that carries weight — the ' +
           'process is defined by the conditions it happens under.'
    },
    {
      id: 'a2-10', type: 'mcq', marks: 3,
      prompt: 'A man buys a franchise of a well-known chain and runs it profitably for a decade, following ' +
              'the franchisor’s proven model exactly as the agreement requires. In the sense this module ' +
              'means, is he an entrepreneur?',
      options: [
        'No — following an existing model is replication. Entrepreneurship is seeing a gap and building something from scratch',
        'Yes — anyone who owns and runs their own business is an entrepreneur',
        'Yes — buying a franchise is one of the routes into business, so it is by definition entrepreneurship',
        'No — because a franchise cannot create value for consumers'
      ],
      answer: 0,
      solution: [
        { lab: 'Replication', val: 'Following an existing model' },
        { lab: 'Entrepreneurship', val: 'Seeing a gap and building something from scratch' },
        { lab: 'Note', val: 'Buying a franchise is still a legitimate route into business' },
        { lab: 'Answer', val: 'No — this is replication', final: true }
      ],
      why: 'The third option is the trap, and it is half right: a franchise <i>is</i> one of the four routes ' +
           'into business. Being a route in does not make it entrepreneurship, and the module says plainly ' +
           'that not every business owner is an entrepreneur.'
    },
    {
      id: 'a2-11', type: 'mcq', marks: 3,
      prompt: 'A man in stable, well-paid employment notices that nobody in his township offers a particular ' +
              'kind of restaurant, resigns from his job, and opens one to fill that gap. Which kind of ' +
              'entrepreneur is he, and what determines the classification?',
      options: [
        'An opportunity entrepreneur — the classification depends on why he started, and he started by choice to fill a market gap',
        'A necessity entrepreneur — the classification depends on the risk he took by resigning',
        'An opportunity entrepreneur — the classification depends on whether the business ultimately succeeds',
        'A necessity entrepreneur — anyone who leaves employment to trade is classified this way'
      ],
      answer: 0,
      solution: [
        { lab: 'Opportunity entrepreneur', val: 'Starts because they see a chance to do something new or better' },
        { lab: 'Necessity entrepreneur', val: 'Starts because they feel they have no other good option' },
        { lab: 'What decides it', val: 'The motivation for starting, nothing else' },
        { lab: 'Answer', val: 'An opportunity entrepreneur, classified by his motivation', final: true }
      ],
      why: 'The third option gets the type right for the wrong reason, which is worth as little as getting ' +
           'it wrong. Either kind of entrepreneur can succeed or fail — the outcome plays no part in the ' +
           'classification.'
    }
  ];

  /* ───────── Section B · the challenges he faced ───────── */
  byTopic['i1-process'] = [
    {
      id: 'a2-12', type: 'match', marks: 4,
      prompt: 'An essay asks you to discuss three challenges a founder faced and how each was overcome. ' +
              'Match each of the challenges facing new entrepreneurs to what it looks like in practice.',
      pairs: [
        { left: 'Abandoning another career', right: 'Walking away from a secure salary for something unpredictable' },
        { left: 'Financing the business', right: 'A growing list of equipment and assets, but no money in the account to pay the bills' },
        { left: 'Finding customers', right: 'Trade is slow at the start, and it takes understanding the target market to change that' },
        { left: 'Dealing with the unknown', right: 'Not knowing how long it will last, how profitable it will be, or whether it can provide a steady income' }
      ],
      solution: [
        { lab: 'Abandoning a career', val: 'The first of the seven challenges' },
        { lab: 'Financing', val: 'Assets on the books are not the same thing as cash in the bank' },
        { lab: 'Finding customers', val: 'Requires knowing who the target market is and how to reach them' },
        { lab: 'Dealing with the unknown', val: 'Described as the most challenging part of emerging as a new entrepreneur' },
        { lab: 'Answer', val: 'All four rows as above', final: true }
      ],
      why: 'Naming a challenge is worth about half the marks in a question like this — the rest comes from ' +
           'showing what it actually looked like. Financing is the one people describe wrongly: the problem ' +
           'is rarely having no assets, it is having assets and no cash.'
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
    window.console.warn('Assignment 2 questions have no home topic: ' + wanted.join(', '));
  }
}());
