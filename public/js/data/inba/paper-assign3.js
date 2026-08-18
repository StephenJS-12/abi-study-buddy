/* INBA01-5 — questions derived from Assignment 3 (example paper, with memo).

   This is the third paper to examine power, control and organising, so most of
   what it asks was already in the pools before this file existed. Rather than
   restate those questions in different words, this file adds only the angles
   the paper exposes that nothing else tests. Six questions, and that is the
   honest yield.

   Worked through in order:

     Q1.1.1 "In your opinion, what allowed the bank to win this accolade?"
              → NOT converted. It is opinion plus outside research: the memo's
                answer is a Consulta customer-satisfaction survey with market
                share percentages for six named banks. No module theory is
                being examined and there is no answer to mark against.
     Q1.1.2 control measures that keep customers happy
              → control as a continuous feedback loop that informs the next
                plan. See the note below on what the memo answers instead.
     Q1.2   two types of power the CEO can use
              → legitimate power, which was the one type never set as a
                scenario. See the note below on the memo's error here.
     Q1.3   which leadership theory to expose a new teller to
              → Hersey and Blanchard: maturity judged task by task, and what
                the leader actually varies as the employee grows
     Q1.4   what organising is, and how it is applied (15 marks)
              → the five actions of organising and what each involves; and
                which concepts belong in an organising answer at all

   TWO PLACES WHERE THIS MEMO SHOULD NOT BE FOLLOWED:

   1. Q1.1.2's memo answer is "preventative control" and "concurrent control".
      Those are real management concepts and they are NOT IN ABI'S NOTES. Her
      Week 6 classifies control by process (the four steps) and by function
      (inventory, quality, financial), never by timing. This paper is from a
      different module code and year (INBM02-5, 5/2022) and cites a different
      study guide, so its answer key does not track her material. Nothing here
      teaches preventative/concurrent/feedback control, because a fact she
      memorises from a memo and cannot find in her notes is worse than a gap.
      Flagged to Stephen: if that classification IS on her syllabus, it needs
      to come from her notes and the topic should be extended properly.

   2. Q1.2's memo says reward power "is the same power the CEO can exercise to
      correct behaviour of staff not performing". That is wrong by this
      module's own definitions — controlling behaviour through negative
      consequences is COERCIVE power. Assignment 2's a2-8 already sets reward
      and coercive against each other as mirror images, which inoculates
      against exactly this confusion, so it is not repeated here.

   Nothing is answered from outside Abi's notes, and these merge into the
   existing topic pools rather than forming a topic. */

(function () {
  var byTopic = {};

  /* ───────── Q1.1.2 · control that keeps customers happy ───────── */
  byTopic['i6-control'] = [
    {
      id: 'a3-1', type: 'mcq', marks: 3,
      prompt: 'A bank resolves each customer complaint as it arrives, and resolves them well. The same ' +
              'complaint keeps arriving anyway, month after month, because nothing upstream ever changes. ' +
              'What does the module say control is supposed to provide beyond catching mistakes?',
      options: [
        'A continuous feedback loop — the feedback informs the next plan, making management a continuous loop of improvement',
        'A record of mistakes, so that responsibility for each one can be assigned',
        'A guarantee that the same mistake becomes impossible once it has been corrected',
        'Nothing beyond catching mistakes — that is the whole purpose of the control function'
      ],
      answer: 0,
      solution: [
        { lab: 'Control', val: 'Narrows the gap between what was planned and what was achieved' },
        { lab: 'And also', val: 'Provides a continuous feedback loop — learning from mistakes, not only catching them' },
        { lab: 'The effect', val: 'The feedback informs the next plan, so the cycle improves each time round' },
        { lab: 'Answer', val: 'A continuous feedback loop', final: true }
      ],
      why: 'This is why control connects back to planning rather than ending the cycle. A business that only ' +
           'catches mistakes fixes the same one forever; a business that feeds what it learns into the next ' +
           'plan stops generating it.'
    }
  ];

  /* ───────── Q1.2 · legitimate power ───────── */
  byTopic['i4-power'] = [
    {
      id: 'a3-2', type: 'mcq', marks: 3,
      prompt: 'A new chief executive arrives on her first morning and issues instructions. The staff carry ' +
              'them out, although nobody has yet seen her work, knows what she is expert in, or has any ' +
              'personal feeling about her either way. Which type of power is she relying on?',
      options: [
        'Legitimate power — derived from her formal position or title in the hierarchy',
        'Expert power — derived from specialised knowledge, skills or expertise',
        'Referent power — derived from being liked, respected or identified with personally',
        'Reward power — derived from the ability to control and provide rewards'
      ],
      answer: 0,
      solution: [
        { lab: 'What the staff know', val: 'Only her position — not her expertise, and not her as a person' },
        { lab: 'Legitimate power', val: '"Do this because I am the boss"' },
        { lab: 'Answer', val: 'Legitimate power', final: true }
      ],
      why: 'It is the only one of the five available to somebody on day one, and the only one that arrives ' +
           'with the job title rather than being earned. That is also its weakness — it is the first to be ' +
           'ignored once a leader loses credibility.'
    }
  ];

  /* ───────── Q1.3 · Hersey and Blanchard ───────── */
  byTopic['i5-situational'] = [
    {
      id: 'a3-3', type: 'mcq', marks: 3,
      prompt: 'A specialist with ten years in the job is highly capable and needs almost no supervision on ' +
              'her usual work. She is now asked to take on a system she has never used before. Her manager ' +
              'plans to leave her to it, as he always does. What does Hersey and Blanchard’s model say about ' +
              'this?',
      options: [
        'Maturity is judged task by task, so on an unfamiliar task she may need considerably more direction than usual',
        'Her maturity level is settled by ten years of service, so the hands-off style remains correct',
        'A capable employee should always be led hands-off, whatever the task',
        'Maturity is a fixed personal trait, so it does not change with the work being done'
      ],
      answer: 0,
      solution: [
        { lab: 'Maturity', val: 'Competence — skills and knowledge; and commitment — confidence and motivation' },
        { lab: 'How it is judged', val: 'Task by task' },
        { lab: 'Nobody', val: 'Sits in one developmental stage permanently' },
        { lab: 'Answer', val: 'Judged task by task — she may need more direction here', final: true }
      ],
      why: 'This is the part of the model people miss, and it is the most practically useful part. Maturity ' +
           'is not a rating you carry around; on a task she has never done, an expert is a beginner again.'
    },
    {
      id: 'a3-4', type: 'mcq', marks: 3,
      prompt: 'Hersey and Blanchard’s model is drawn as a <b>cycle</b> rather than a fixed prescription. As an ' +
              'employee grows in competence and commitment, what is it that the leader moves between?',
      options: [
        'Combinations of high and low task behaviour, and high and low relationship behaviour',
        'The three factors of leader-member relations, task structure and position power',
        'The five types of power, adopting a different one at each stage',
        'The four functions of management, applying one at each stage of growth'
      ],
      answer: 0,
      solution: [
        { lab: 'What varies', val: 'Task behaviour and relationship behaviour, each high or low' },
        { lab: 'Why a cycle', val: 'The style should evolve as the employee grows' },
        { lab: 'The second option', val: 'Belongs to Fiedler’s contingency theory, not this model' },
        { lab: 'Answer', val: 'The first option', final: true }
      ],
      why: 'The two theories in this topic are easily swapped. Fiedler analyses the <i>situation</i> on three ' +
           'factors; Hersey and Blanchard read the <i>person</i>, and vary two behaviours in response.'
    }
  ];

  /* ───────── Q1.4 · what organising is and how it is applied ───────── */
  byTopic['i4-organising'] = [
    {
      id: 'a3-5', type: 'match', marks: 5,
      prompt: 'A 15-mark question asks what organising is and how a business applies it. Match each of the ' +
              'five actions of organising to what it involves.',
      pairs: [
        { left: 'Designing jobs and assigning tasks', right: 'Breaking the big goal into smaller manageable tasks, then assigning them to specific people or teams' },
        { left: 'Grouping and structuring', right: 'Logically grouping people into teams, departments or functions, which allows specialisation and collaboration' },
        { left: 'Allocating resources', right: 'Deciding who gets the budget, the equipment and the raw materials' },
        { left: 'Establishing authority and communication', right: 'Clear lines of reporting — who makes which decisions, and who reports to whom' },
        { left: 'Ensuring coordination and control', right: 'Building mechanisms for communication and cooperation between all the moving parts' }
      ],
      solution: [
        { lab: 'Design and assign', val: 'The work itself, broken down and handed out' },
        { lab: 'Group and structure', val: 'The shape of the organisation' },
        { lab: 'Allocate resources', val: 'What each part gets to work with' },
        { lab: 'Authority and communication', val: 'Who decides, and who answers to whom' },
        { lab: 'Coordination and control', val: 'Keeping the parts working together' },
        { lab: 'Answer', val: 'All five rows as above', final: true }
      ],
      why: 'A long question on organising is marked on coverage, and these five are the coverage. Together ' +
           'they are the difference between a structure and a list of people — the work, the shape, the ' +
           'resources, the reporting lines, and the mechanisms that keep it all in step.'
    },
    {
      id: 'a3-6', type: 'multi', marks: 4,
      prompt: 'A long question asks how a business applies the principle of organising in its daily ' +
              'operations. Which of these belong in that answer? <b>Select all that apply.</b>',
      options: [
        'Coordination — integrating all the activities and resources so the parts work in harmony',
        'Authority — the right to make decisions, issue orders and use the organisation’s resources',
        'Delegation — assigning a portion of a manager’s total workload to others, with the authority to complete it',
        'Specialisation and standardisation — dividing the work by skill, and making the procedures consistent',
        'Setting the organisation’s vision, mission and long-term goals',
        'Measuring actual performance against the standards, and correcting the deviations'
      ],
      answers: [0, 1, 2, 3],
      solution: [
        { lab: 'Belongs to organising', val: 'Coordination, authority, delegation, specialisation, standardisation' },
        { lab: 'Belongs to planning', val: 'Setting vision, mission and long-term goals' },
        { lab: 'Belongs to control', val: 'Measuring performance and correcting deviations' },
        { lab: 'Answer', val: 'The first four', final: true }
      ],
      why: 'The two wrong options are the commonest way to lose marks on a 15-mark organising question — ' +
           'drifting into the function before it or the function after it. Organising is the <i>who, how and ' +
           'with what</i>; the what and why belong to planning, and the did-it-work belongs to control.'
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
    window.console.warn('Assignment 3 questions have no home topic: ' + wanted.join(', '));
  }
}());
