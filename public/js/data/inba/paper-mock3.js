/* INBA01-5 — questions derived from Mock Exam 3 (example paper, with memo).

   Twenty scenario MCQs, then paragraph questions and a SABMiller case study.
   The MCQ section is almost entirely "read a scenario, name the concept",
   which is the most convertible format in any of these papers — and six of
   its twenty scenarios land on concepts the pool defined but never set as a
   scenario.

   Worked through in order. "Covered" means the pool already tests that point:

     1.1  utilitarian approach            covered (i1x-3)
     1.2  preventative control            NOT IN HER NOTES — see below
     1.3  human skill                     covered (i2-skills)
     1.4  responsibility                  → m3-1, scenario was untested
     1.5  coordination breaks silos       → m3-2, and see the memo error below
     1.6  divisional structure            NOT IN HER NOTES — see below
     1.7  tactical planning               covered (i3-tacop)
     1.8  motivation                      covered (i5-motivation)
     1.9  physical environment            covered by m2-5 in paper-mock2
     1.10 job rotation                    covered by m2-3 in paper-mock2
     1.11 efficiency                      covered (i2-management)
     1.12 referent power                  → m3-3, scenario was untested
     1.13 accountability                  covered (i4c-5)
     1.14 standardisation                 covered by m2-4 in paper-mock2
     1.15 JIT falls under controlling     → m3-5, the cross-link was untested
     1.16 spokesperson                    covered (a1-23)
     1.17 task-oriented leadership        covered (i5e-2)
     1.18 Maslow — esteem                 → m3-4, scenario was untested
     1.19 chain of command                NOT IN HER NOTES — see below
     1.20 integrity                       covered (i5f-2)
     B1.1 strategic against tactical      covered (i3-tacop)
     B1.2 four benefits of planning       covered (i3-value)
     B1.3 the HR function                 covered (i2-hrlog, a1-19)
     B2.1 the three types of control      NOT IN HER NOTES — see below
     B2.3 stakeholder affected            NOT IN HER NOTES — no stakeholder
          typology exists in her material
     B2.4 non-programmed decision making  NOT IN HER NOTES — decision-making
          types do not appear anywhere in her six weeks
     B3.1 task against employee-oriented  her notes use task-oriented against
          RELATIONSHIP-oriented (Fiedler) and never equate those to autocratic
          and democratic the way this memo does, so it is not converted
     B3.2 five dimensions of trust        covered (i5f-1, i5f-2, m2-2)
     C1.1 five ways SABMiller motivates   covered (i5-practice)
     C1.2 five advantages of decentralis. → m3-6, worth 10 marks
     C1.3 SABMiller's structure           covered (i4-depart)

   AN ERROR IN THIS MEMO: question 1.5 describes an organisation operating in
   silos and asks what would let an employee link departments and integrate
   their tasks. The options are (a) standardisation (b) coordination
   (c) delegation (d) specialisation. The memo answers "C", which is
   delegation. Integrating activities across departments is COORDINATION —
   option (b) — by this module's own definitions, and delegation is not
   remotely it. m3-2 teaches the correct answer.

   FOUR THINGS THIS EXAM ASKS THAT ABI'S NOTES DO NOT CONTAIN:

   1. PREVENTATIVE / CONCURRENT / POST control (Q1.2, and B2.1-B2.2 for a
      further 8 marks). This is the fourth paper to require it. Her Week 6
      classifies control by process and by function and never by timing.

   2. CHAIN OF COMMAND (Q1.19). Her i4-principles topic has unity of command
      and span of control and nothing else.

   3. DIVISIONAL and LINE-AND-STAFF structures (Q1.6). Her five types are
      functional, product, location, customer and matrix. "Divisional" overlaps
      with location and product but is not a named type in her material.

   4. NON-PROGRAMMED DECISION MAKING (B2.4) and a STAKEHOLDER TYPOLOGY (B2.3).
      Neither appears anywhere in her six weeks.

   All four are flagged to Stephen rather than filled in. These merge into the
   existing topic pools rather than forming a topic. */

(function () {
  var byTopic = {};

  /* ───────── 1.4 · responsibility ───────── */
  byTopic['i4-authority'] = [
    {
      id: 'm3-1', type: 'mcq', marks: 3,
      prompt: 'A newly appointed assistant manager at a dealership is given the job of making sure things run ' +
              'smoothly, that the necessary procedures are followed, and that the dealership turns a profit. ' +
              'He has been given a duty to perform, not a right to command. Which of the three related ' +
              'concepts describes what he has been given?',
      options: [
        'Responsibility — the obligation to perform the duties assigned to him',
        'Authority — the right to make decisions, issue orders and use the organisation’s resources',
        'Accountability — being answerable to a superior for the outcome, which cannot be delegated',
        'Power — the ability to influence the behaviour of others in the organisation'
      ],
      answer: 0,
      solution: [
        { lab: 'Responsibility', val: 'The obligation to carry out assigned duties' },
        { lab: 'Authority', val: 'The right that lets you carry them out' },
        { lab: 'Accountability', val: 'The answerability for how they turned out' },
        { lab: 'Answer', val: 'Responsibility', final: true }
      ],
      why: 'The three run in sequence: you are given a duty (responsibility), the right to act on it ' +
           '(authority), and you answer for the result (accountability). The wording that gives it away here ' +
           'is "was assigned a task" — a task handed to you is a duty, not a right.'
    }
  ];

  /* ───────── 1.5 · coordination ───────── */
  byTopic['i4-organising'] = [
    {
      id: 'm3-2', type: 'mcq', marks: 3,
      prompt: 'An organisation is operating in silos: departments pursue their own goals, work is not ' +
              'distributed sensibly across them, and the organisation keeps missing its targets. An employee ' +
              'is given a project to link the departments and integrate the tasks performed across the ' +
              'organisation. Which element of organising is she being asked to supply?',
      options: [
        'Coordination — integrating all the activities and resources so the parts work in harmony',
        'Delegation — assigning a portion of a manager’s workload to others, with the authority to do it',
        'Standardisation — uniform procedures so the work is done the same way regardless of who does it',
        'Specialisation — dividing the work by skill so employees become experts in narrower tasks'
      ],
      answer: 0,
      solution: [
        { lab: 'The problem', val: 'Departmental silos — the named challenge of functional departmentalisation' },
        { lab: 'The fix', val: 'Coordination — the fifth action of organising, building mechanisms for cooperation between the parts' },
        { lab: 'Not specialisation', val: 'Dividing work further is what produced the silos in the first place' },
        { lab: 'Answer', val: 'Coordination', final: true }
      ],
      why: 'Specialisation is the tempting wrong answer because it sounds like organising, but dividing the ' +
           'work is the cause here, not the cure. Every organisation that specialises creates silos, and ' +
           'coordination is the mechanism that is supposed to hold the pieces back together.'
    }
  ];

  /* ───────── 1.12 · referent power ───────── */
  byTopic['i4-power'] = [
    {
      id: 'm3-3', type: 'mcq', marks: 3,
      prompt: 'New employees at a company go to one particular manager for advice. They say they do so not ' +
              'because of his position, but because he is humble, willing to share what he knows, and someone ' +
              'they genuinely respect and like. Which type of power does he hold?',
      options: [
        'Referent power — personal power, belonging to the individual rather than to a position',
        'Legitimate power — derived from his formal position or title in the hierarchy',
        'Expert power — derived from his specialised knowledge, skills or expertise',
        'Reward power — derived from his ability to control and provide rewards'
      ],
      answer: 0,
      solution: [
        { lab: 'The evidence', val: '"Not because of his position" rules out legitimate power' },
        { lab: 'Why they follow', val: 'They like, respect and identify with him' },
        { lab: 'Answer', val: 'Referent power', final: true }
      ],
      why: 'Expert power is the close call, since he does share what he knows. The deciding detail is <i>why ' +
           'they come to him</i> — the scenario says respect and humility, not knowledge. When both are ' +
           'present, look for which one the question puts the weight on.'
    }
  ];

  /* ───────── 1.18 · Maslow, esteem ───────── */
  byTopic['i5-needs'] = [
    {
      id: 'm3-4', type: 'mcq', marks: 3,
      prompt: 'A high-performing employee is publicly complimented by top management and awarded a bursary ' +
              'for his contribution. He becomes noticeably more motivated and driven to outperform his ' +
              'colleagues. Which level of Maslow’s hierarchy has the organisation satisfied?',
      options: [
        'Esteem — recognition and the respect of others',
        'Safety — security of employment and of income',
        'Social — belonging and acceptance within the group',
        'Physiological — the basic needs that come before all the others'
      ],
      answer: 0,
      solution: [
        { lab: 'What he received', val: 'Public recognition and an award for excellence' },
        { lab: 'The level', val: 'Esteem' },
        { lab: 'The leader’s job', val: 'Help employees satisfy needs at all levels — shaky foundations block higher ones' },
        { lab: 'Answer', val: 'Esteem', final: true }
      ],
      why: 'The module makes the point in reverse: an employee worried about job security will not be ' +
           'motivated by an Employee of the Month award. Recognition only motivates once the levels beneath ' +
           'it are steady, which is why the same award lands very differently on two people.'
    }
  ];

  /* ───────── 1.15 · JIT as a control activity ───────── */
  byTopic['i6-invsystems'] = [
    {
      id: 'm3-5', type: 'mcq', marks: 3,
      prompt: 'A company introduces a Just-in-Time approach so that production meets its quality standards ' +
              'and stock is not piled up in the warehouse. Under which of the four management functions does ' +
              'a Just-in-Time system fall?',
      options: [
        'Controlling — it is an inventory control system, keeping stock at the right level against a standard',
        'Planning — it decides what the organisation intends to achieve',
        'Organising — it arranges people and resources into a structure',
        'Leading — it influences employees to contribute towards the goal'
      ],
      answer: 0,
      solution: [
        { lab: 'Just-in-Time', val: 'One of the inventory control systems' },
        { lab: 'Inventory control', val: 'Part of the control function' },
        { lab: 'Answer', val: 'Controlling', final: true }
      ],
      why: 'It is easy to file JIT under operations and stop there, but the exam wants the management ' +
           'function. Anything that measures a real level against an intended level and corrects the ' +
           'difference is control, whatever department it happens in.'
    }
  ];

  /* ───────── C1.2 · advantages of decentralisation (10 marks) ───────── */
  byTopic['i4-structure'] = [
    {
      id: 'm3-6', type: 'multi', marks: 4,
      prompt: 'A global business runs a flat structure and empowers its regional offices to make their own ' +
              'operational decisions. What are the advantages of this decentralised approach? ' +
              '<b>Select all that apply.</b>',
      options: [
        'Faster decision-making, because decisions are taken closer to where the work happens',
        'High employee autonomy, with minimal supervision needed',
        'Lower cost, because fewer layers of management are required',
        'Local responsiveness to customer preferences and regional conditions',
        'A unified front when negotiating with suppliers',
        'A guarantee that every unit applies company policy identically'
      ],
      answers: [0, 1, 2, 3],
      solution: [
        { lab: 'Flat and decentralised', val: 'Faster decisions, lower cost, high autonomy' },
        { lab: 'Regional divisions', val: 'Local responsiveness, decisions closer to the customer' },
        { lab: 'The last two', val: 'Advantages of CENTRALISING — exactly what decentralising gives up' },
        { lab: 'Answer', val: 'The first four', final: true }
      ],
      why: 'The two wrong options are worth as much as the four right ones, because a ten-mark question on ' +
           'decentralisation is really asking whether you know the trade-off. Speed and local fit are bought ' +
           'with consistency and bargaining power.'
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
    window.console.warn('Mock Exam 3 questions have no home topic: ' + wanted.join(', '));
  }
}());
