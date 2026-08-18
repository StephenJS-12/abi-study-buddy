/* INBA01-5 — Week 4: Organising.
   All four lessons: understanding organising, design principles, organisational
   structure and departmentalisation, and organising in the functional areas.

   Same rules as the earlier weeks: concepts only, never the analogies used to
   explain them, and nothing written that is not in Abi's notes. */

window.MODULE_CONTENT = window.MODULE_CONTENT || {};
window.MODULE_CONTENT.inba = window.MODULE_CONTENT.inba || { weeks: [], exams: [] };

window.MODULE_CONTENT.inba.weeks.push({
  id: 'inba-week4',
  number: 4,
  title: 'Organising',
  emoji: '🏗️',
  accent: 5,
  blurb: 'Turning a plan into a structure — authority, power, delegation and how a business is divided up.',
  topics: [

  /* ═══════════════════════ WHAT ORGANISING IS ═══════════════════════ */
  {
    id: 'i4-organising',
    title: 'What Organising Is',
    emoji: '🧱',
    summary: 'The definition, the five actions it involves, and why it matters.',
    notes: [
      {
        heading: 'Definition',
        emoji: '📖',
        html:
          '<p>If planning is the <b>what</b> and <b>why</b>, organising is the <b>who</b>, <b>how</b> and ' +
          '<b>with what</b>. It follows the planning function and aims to implement the organisation’s plans.</p>' +
          '<div class="keybox"><b>Organising</b> is "the process of creating a structure for the organisation ' +
          'that will enable its people to work effectively towards its vision, mission, goals and objectives" ' +
          '(Brevis &amp; Vrba, 2014).<br><br>Also defined as the method of organising activities so that ' +
          'objectives can be accomplished (Strydom, 2008).</div>'
      },
      {
        heading: 'The five actions of organising',
        emoji: '5️⃣',
        html:
          '<div class="keybox"><b>Designing jobs and assigning tasks</b> · breaking the big goal into smaller ' +
          'manageable tasks, then assigning them to specific people or teams' +
          '<br><b>Grouping and structuring</b> · logically grouping people into teams, departments or ' +
          'functions, which allows specialisation and collaboration' +
          '<br><b>Allocating resources</b> · deciding who gets the budget, the equipment, the raw materials' +
          '<br><b>Establishing authority and communication</b> · clear lines of reporting — who makes which ' +
          'decisions, and who reports to whom' +
          '<br><b>Ensuring coordination and control</b> · building mechanisms for communication and ' +
          'cooperation between all the moving parts</div>'
      },
      {
        heading: 'Why organising matters',
        emoji: '⭐',
        html:
          '<div class="keybox"><b>It designs jobs and enables synergy</b> · coordinated effort produces more ' +
          'than the sum of disconnected tasks. It avoids duplication of work and makes clear who is ' +
          'responsible when a problem arises.' +
          '<br><br><b>It enables specialisation, increasing productivity</b> · the workload is divided by ' +
          'skill and qualification, so employees become experts and nobody is overburdened or underutilised.' +
          '<br><br><b>It ensures resource efficiency</b> · financial, human and technological resources go ' +
          'where they will have the greatest impact.' +
          '<br><br><b>It establishes clear channels for coordination</b> · related tasks are grouped into ' +
          'logical departments, with mechanisms that keep those departments working in harmony.</div>'
      }
    ],
    questions: [
      {
        id: 'i4a-1', type: 'mcq', marks: 2,
        prompt: 'Organising is defined as:',
        options: [
          'The process of creating a structure that enables people to work effectively towards the organisation’s goals',
          'Defining goals and developing plans to coordinate activities',
          'Motivating and influencing employees to achieve objectives',
          'Monitoring activities to ensure they are accomplished as planned'
        ],
        answer: 0,
        solution: [
          { lab: 'Organising', val: 'Creating a structure that enables people to work towards vision, mission and goals' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The other three define planning, leading and controlling. All four functions have formal ' +
             'definitions and they are easy to confuse under pressure.'
      },
      {
        id: 'i4a-2', type: 'mcq', marks: 2,
        prompt: 'If planning answers <b>what</b> and <b>why</b>, organising answers:',
        options: [
          'Who, how, and with what',
          'When and where only',
          'How much it will cost',
          'Whether the goal was achieved'
        ],
        answer: 0,
        solution: [
          { lab: 'Planning', val: 'The what and the why — the blueprint' },
          { lab: 'Organising', val: 'The who, how and with what — gathering people and resources' },
          { lab: 'Answer', val: 'Who, how, and with what', final: true }
        ],
        why: 'Without organising, the plan stays a piece of paper. It is the function that turns an abstract ' +
             'plan into a concrete structure.'
      },
      {
        id: 'i4a-3', type: 'multi', marks: 3,
        prompt: 'Which of these are actions involved in organising? <b>Select all that apply.</b>',
        options: [
          'Designing jobs and assigning tasks',
          'Grouping and structuring',
          'Allocating resources',
          'Establishing authority and communication',
          'Forecasting next year’s sales'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'The five actions', val: 'Designing jobs, grouping, allocating resources, establishing authority, ensuring coordination' },
          { lab: 'Forecasting', val: 'Planning' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Forecasting belongs to planning, which happens first. Organising begins once the goal already ' +
             'exists and asks how to build a structure that can reach it.'
      },
      {
        id: 'i4a-4', type: 'mcq', marks: 3,
        prompt: 'What does organising achieve through <b>synergy</b>?',
        options: [
          'Coordinated effort produces a result greater than the sum of individual, disconnected tasks',
          'Employees work longer hours than they otherwise would',
          'The business needs fewer managers',
          'Every employee performs every task'
        ],
        answer: 0,
        solution: [
          { lab: 'Synergy', val: 'The coordinated whole exceeds the sum of the parts' },
          { lab: 'It also', val: 'Avoids duplication, and makes clear who solves a problem when one arises' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The last option is the opposite of what organising does — dividing work by skill is precisely ' +
             'how specialisation raises productivity.'
      },
      {
        id: 'i4a-5', type: 'multi', marks: 3,
        prompt: 'Why is organising important? <b>Select all that apply.</b>',
        options: [
          'It designs jobs and enables synergy',
          'It enables specialisation, increasing productivity',
          'It ensures resource efficiency',
          'It establishes clear channels for coordination',
          'It removes the need for planning'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Synergy', val: 'Coordinated effort beats disconnected effort' },
          { lab: 'Specialisation', val: 'Work divided by skill and qualification' },
          { lab: 'Resource efficiency', val: 'Resources go where they have most impact' },
          { lab: 'Coordination', val: 'Departments working in harmony' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Organising follows planning rather than replacing it. There is nothing to organise around until ' +
             'a plan has set the goal.'
      }
    ]
  },

  /* ═══════════════════════ DESIGN PRINCIPLES ═══════════════════════ */
  {
    id: 'i4-principles',
    title: 'Design Principles & Coordination',
    emoji: '📏',
    summary: 'Unity of command, span of control, and what happens when each is set wrongly.',
    notes: [
      {
        heading: 'Unity of command',
        emoji: '☝️',
        html:
          '<p>Each employee should have <b>only one direct supervisor</b> to whom they report. This minimises ' +
          'confusion about who they should be reporting to.</p>' +
          '<p>Without it, two managers could give contradictory instructions and the employee would have no ' +
          'way to know which to follow.</p>'
      },
      {
        heading: 'Span of control',
        emoji: '↔️',
        html:
          '<p><b>Span of control</b> is the number of subordinates reporting to one manager.</p>' +
          '<div class="keybox"><b>A wide span</b> (around 15 subordinates) is efficient and can empower ' +
          'employees, but it can stretch a manager too thin, leading to inadequate supervision.' +
          '<br><br><b>A narrow span</b> (around 3 subordinates) allows close supervision, but is costly, ' +
          'creates too many management layers, and can lead to micromanagement.</div>' +
          '<p>Too few subordinates also leaves managers underutilised, often causing them to become too ' +
          'involved in their subordinates’ work and allowing them little discretion.</p>'
      }
    ],
    questions: [
      {
        id: 'i4b-1', type: 'mcq', marks: 2,
        prompt: 'What does the principle of <b>unity of command</b> require?',
        options: [
          'Each employee reports to only one direct supervisor',
          'All decisions are made by one senior manager',
          'Every department follows the same procedures',
          'Managers must agree before issuing instructions'
        ],
        answer: 0,
        solution: [
          { lab: 'Unity of command', val: 'One direct supervisor per employee' },
          { lab: 'Purpose', val: 'Minimises confusion about who to report to' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'It exists to prevent contradictory instructions. An employee receiving two conflicting orders ' +
             'has no principled way to choose between them.'
      },
      {
        id: 'i4b-2', type: 'mcq', marks: 2,
        prompt: '<b>Span of control</b> refers to:',
        options: [
          'The number of subordinates reporting to one manager',
          'The range of decisions a manager may take',
          'The geographic area a manager oversees',
          'The length of the planning horizon'
        ],
        answer: 0,
        solution: [
          { lab: 'Span of control', val: 'How many subordinates report to one manager' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'It is a count of people, not of authority or territory — and it drives how many management ' +
             'layers an organisation ends up needing.'
      },
      {
        id: 'i4b-3', type: 'multi', marks: 3,
        prompt: 'What are the risks of a <b>wide</b> span of control? <b>Select all that apply.</b>',
        options: [
          'The manager may be stretched too thin',
          'Supervision may become inadequate',
          'It creates too many management layers',
          'It leads to micromanagement'
        ],
        answers: [0, 1],
        solution: [
          { lab: 'Wide span', val: 'Efficient and empowering, but the manager can be stretched thin' },
          { lab: 'The result', val: 'Inadequate supervision' },
          { lab: 'The last two', val: 'Risks of a narrow span' },
          { lab: 'Answer', val: 'The first two', final: true }
        ],
        why: 'The two spans fail in opposite directions. Wide risks too little supervision; narrow risks too ' +
             'much, plus the cost of the extra layers.'
      },
      {
        id: 'i4b-4', type: 'multi', marks: 3,
        prompt: 'What are the drawbacks of a <b>narrow</b> span of control? <b>Select all that apply.</b>',
        options: [
          'It is costly',
          'It creates too many management layers',
          'It can lead to micromanagement',
          'It leaves employees without any supervision'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Narrow span', val: 'Allows close supervision' },
          { lab: 'But', val: 'Costly, too many layers, and micromanagement' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'Managers with too few subordinates also become underutilised, and tend to involve themselves ' +
             'too closely in work their team should be doing independently.'
      },
      {
        id: 'i4b-5', type: 'mcq', marks: 2,
        prompt: 'A manager with three subordinates has which kind of span of control?',
        options: ['Narrow', 'Wide', 'Neither — three is the ideal', 'It depends on the industry only'],
        answer: 0,
        solution: [
          { lab: 'Narrow span', val: 'Around three subordinates per manager' },
          { lab: 'Wide span', val: 'Around fifteen' },
          { lab: 'Answer', val: 'Narrow', final: true }
        ],
        why: 'There is no universally ideal number — the right span depends on factors covered later in this ' +
             'week, such as task complexity and how skilled the employees are.'
      }
    ]
  },

  /* ═══════════════════════ AUTHORITY ═══════════════════════ */
  {
    id: 'i4-authority',
    title: 'Authority, Responsibility & Accountability',
    emoji: '⚖️',
    summary: 'The right, the obligation, the answerability — and the one that cannot be delegated.',
    notes: [
      {
        heading: 'The three concepts',
        emoji: '🔑',
        html:
          '<div class="keybox"><b>Authority</b> · the <b>right</b> to make decisions, issue orders and use ' +
          'resources. It includes the right to require the performance of certain duties and to discipline ' +
          'employees who neglect them (Brevis &amp; Vrba, 2014).' +
          '<br><br><b>Responsibility</b> · the <b>obligation</b> of an employee to perform assigned tasks ' +
          '(Hellriegel et al., 2008).' +
          '<br><br><b>Accountability</b> · the expectation that employees will <b>accept credit or blame</b> ' +
          'for the results of their work (Hellriegel et al., 2008).</div>' +
          '<p><b>Managers can delegate responsibility and authority, but never accountability.</b> A manager ' +
          'remains ultimately answerable for everything happening in their department, even work they did not ' +
          'personally check.</p>'
      },
      {
        heading: 'Types of authority',
        emoji: '🗂️',
        html:
          '<p>Lazenby (2016) identifies three pairs:</p>' +
          '<div class="keybox"><b>Formal authority</b> · the specific work relationships indicated by the ' +
          'organisation’s structure — shown on the organogram.' +
          '<br><b>Informal authority</b> · influence a person has due to their expertise, experience or ' +
          'relationships, rather than their formal position.' +
          '<br><br><b>Line authority</b> · direct, formal authority flowing down the structure. The backbone ' +
          'of the command structure, giving managers the right to direct subordinates in the direct line from ' +
          'the top to the bottom.' +
          '<br><b>Staff authority</b> · indirect, supportive authority based on expertise rather than position ' +
          'in the chain of command. Advisers with specialised knowledge who may advise, recommend and support ' +
          'line managers, but who cannot give orders to line employees.' +
          '<br><br><b>Centralised</b> and <b>decentralised</b> authority · concerning where the locus of ' +
          'decision-making sits.</div>'
      }
    ],
    questions: [
      {
        id: 'i4c-1', type: 'match', marks: 3,
        prompt: 'Match each concept to its definition.',
        pairs: [
          { left: 'Authority', right: 'The right to make decisions, issue orders and use resources' },
          { left: 'Responsibility', right: 'The obligation to perform assigned tasks' },
          { left: 'Accountability', right: 'The expectation of accepting credit or blame for the results' }
        ],
        solution: [
          { lab: 'Authority', val: 'A right' },
          { lab: 'Responsibility', val: 'An obligation' },
          { lab: 'Accountability', val: 'Answerability for the outcome' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'Right, obligation, answerability — three different words on purpose. Responsibility is about ' +
             'doing the work; accountability is about carrying the consequences.'
      },
      {
        id: 'i4c-2', type: 'mcq', marks: 3,
        prompt: 'Which of these can a manager <b>never</b> delegate?',
        options: ['Accountability', 'Authority', 'Responsibility', 'Any of them can be delegated'],
        answer: 0,
        solution: [
          { lab: 'Can be delegated', val: 'Responsibility and authority' },
          { lab: 'Cannot be delegated', val: 'Accountability' },
          { lab: 'Answer', val: 'Accountability', final: true }
        ],
        why: 'A manager remains ultimately answerable for everything in their department, including work they ' +
             'never personally inspected. That is what makes delegation a risk worth managing.'
      },
      {
        id: 'i4c-3', type: 'match', marks: 4,
        prompt: 'Match each type of authority to its description.',
        pairs: [
          { left: 'Formal authority', right: 'The work relationships indicated by the organisation’s structure' },
          { left: 'Informal authority', right: 'Influence from expertise, experience or relationships rather than position' },
          { left: 'Line authority', right: 'Direct authority to direct subordinates in the chain of command' },
          { left: 'Staff authority', right: 'Indirect authority based on expertise, to advise and recommend' }
        ],
        solution: [
          { lab: 'Formal', val: 'Shown on the organogram' },
          { lab: 'Informal', val: 'Held regardless of title' },
          { lab: 'Line', val: 'The backbone of the command structure' },
          { lab: 'Staff', val: 'Specialised advisers who cannot give orders to line employees' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'A staff specialist may know far more than the line manager they advise and still have no power ' +
             'to instruct anyone — expertise and authority are separate things here.'
      },
      {
        id: 'i4c-4', type: 'mcq', marks: 2,
        prompt: 'What is <b>informal authority</b>?',
        options: [
          'Influence from expertise, experience or relationships rather than formal position',
          'Authority granted temporarily while a manager is absent',
          'Authority written into the organogram',
          'Authority held by staff specialists only'
        ],
        answer: 0,
        solution: [
          { lab: 'Formal authority', val: 'Shown by the organisation’s structure' },
          { lab: 'Informal authority', val: 'Influence from expertise, experience or relationships' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'It explains why a long-serving employee with no title can carry more real influence than a ' +
             'newly appointed supervisor who has one.'
      },
      {
        id: 'i4c-5', type: 'mcq', marks: 2,
        prompt: 'A branch manager is held answerable for the branch’s overall performance, even though they do ' +
                'not personally check every task. This illustrates:',
        options: ['Accountability', 'Authority', 'Delegation', 'Specialisation'],
        answer: 0,
        solution: [
          { lab: 'What is described', val: 'Answering for results they did not personally produce' },
          { lab: 'Concept', val: 'Accountability' },
          { lab: 'Answer', val: 'Accountability', final: true }
        ],
        why: 'Managers are ultimately accountable for everything in their departments, which is exactly why ' +
             'accountability cannot be handed to someone else.'
      }
    ]
  },

  /* ═══════════════════════ POWER ═══════════════════════ */
  {
    id: 'i4-power',
    title: 'The Five Types of Power',
    emoji: '⚡',
    summary: 'French and Raven’s typology — where influence actually comes from.',
    notes: [
      {
        heading: 'Power',
        emoji: '🔌',
        html:
          '<p>Power is the ability to influence others’ behaviour — the skill to change the behaviour of ' +
          'others within the organisation. Lazenby (2016) refers to <b>French and Raven’s (1959)</b> typology ' +
          'of five types of power.</p>' +
          '<div class="keybox"><b>Legitimate power</b> · derived from a person’s formal position or title in ' +
          'the hierarchy. <i>"Do this because I am the boss."</i>' +
          '<br><br><b>Reward power</b> · based on the ability to control and provide rewards — bonuses, ' +
          'promotions, praise. <i>"If you do this, you will get a reward."</i>' +
          '<br><br><b>Coercive power</b> · based on the ability to punish or impose negative consequences — ' +
          'demotions, termination. Forcing compliance through fear. <i>"If you do not do this, there will be ' +
          'negative consequences."</i>' +
          '<br><br><b>Expert power</b> · stems from specialised knowledge, skills or expertise. <i>"Do this ' +
          'because I have the knowledge to guide us."</i>' +
          '<br><br><b>Referent power</b> · personal power, not affiliated with a position but with the ' +
          'individual. People follow because they like, respect or identify with them.</div>'
      }
    ],
    questions: [
      {
        id: 'i4d-1', type: 'multi', marks: 3,
        prompt: 'Which of these are the five types of power? <b>Select all that apply.</b>',
        options: [
          'Legitimate',
          'Reward',
          'Coercive',
          'Expert',
          'Referent',
          'Financial'
        ],
        answers: [0, 1, 2, 3, 4],
        solution: [
          { lab: 'The five types', val: 'Legitimate, reward, coercive, expert and referent' },
          { lab: 'Financial', val: 'Not one of them' },
          { lab: 'Answer', val: 'The first five', final: true }
        ],
        why: 'Reward power covers the money side, but it is broader than that — praise and promotion are ' +
             'rewards too, and neither costs anything directly.'
      },
      {
        id: 'i4d-2', type: 'match', marks: 5,
        prompt: 'Match each type of power to its source.',
        pairs: [
          { left: 'Legitimate power', right: 'A person’s formal position or title in the hierarchy' },
          { left: 'Reward power', right: 'The ability to control and provide rewards' },
          { left: 'Coercive power', right: 'The ability to punish or impose negative consequences' },
          { left: 'Expert power', right: 'Specialised knowledge, skills or expertise' },
          { left: 'Referent power', right: 'Being liked, respected or identified with personally' }
        ],
        solution: [
          { lab: 'Legitimate', val: 'The position' },
          { lab: 'Reward', val: 'What you can give' },
          { lab: 'Coercive', val: 'What you can take away' },
          { lab: 'Expert', val: 'What you know' },
          { lab: 'Referent', val: 'Who you are' },
          { lab: 'Answer', val: 'All five rows as above', final: true }
        ],
        why: 'Only legitimate power comes from the job title. The other four can be held by someone with no ' +
             'formal authority at all.'
      },
      {
        id: 'i4d-3', type: 'mcq', marks: 2,
        scenario: 'A team follows a colleague’s direction because she is the only person who understands the ' +
                  'core system, and they rely on her knowledge.',
        prompt: 'Which type of power is this?',
        options: ['Expert power', 'Legitimate power', 'Referent power', 'Reward power'],
        answer: 0,
        solution: [
          { lab: 'The source', val: 'Specialised knowledge and expertise' },
          { lab: 'Type', val: 'Expert power' },
          { lab: 'Answer', val: 'Expert power', final: true }
        ],
        why: 'Referent power would mean they follow her because they like or admire her. Here it is what she ' +
             'knows, not who she is.'
      },
      {
        id: 'i4d-4', type: 'mcq', marks: 3,
        scenario: 'A supervisor tells staff that if they refuse to work overtime they will receive a poor ' +
                  'performance review.',
        prompt: 'Which type of power is being used?',
        options: ['Coercive power', 'Reward power', 'Legitimate power', 'Expert power'],
        answer: 0,
        solution: [
          { lab: 'The mechanism', val: 'Compliance forced through fear of a negative consequence' },
          { lab: 'Type', val: 'Coercive power' },
          { lab: 'Answer', val: 'Coercive power', final: true }
        ],
        why: 'Reward and coercive power are mirror images: one offers something desirable, the other threatens ' +
             'something undesirable. Both work on consequences rather than on agreement.'
      },
      {
        id: 'i4d-5', type: 'mcq', marks: 2,
        prompt: 'Which type of power is described as <b>personal</b> — belonging to the individual rather than ' +
                'to a position?',
        options: ['Referent power', 'Legitimate power', 'Coercive power', 'Reward power'],
        answer: 0,
        solution: [
          { lab: 'Referent power', val: 'Not affiliated with a position but with the individual person' },
          { lab: 'Why people follow', val: 'They like, respect or identify with them' },
          { lab: 'Answer', val: 'Referent power', final: true }
        ],
        why: 'It is the one type that survives a change of job title, because it was never attached to the ' +
             'title in the first place.'
      },
      {
        id: 'i4d-6', type: 'mcq', marks: 2,
        prompt: 'Whose typology of power does the module use?',
        options: [
          'French and Raven (1959)',
          'Mintzberg (1973)',
          'Robbins and Coulter (2007)',
          'Brevis and Vrba (2014)'
        ],
        answer: 0,
        solution: [
          { lab: 'The typology', val: 'French and Raven, 1959' },
          { lab: 'Answer', val: 'French and Raven (1959)', final: true }
        ],
        why: 'Mintzberg gave the ten managerial roles in Week 2, and Brevis and Vrba are cited for the ' +
             'definitions of organising and authority — different authors, different frameworks.'
      }
    ]
  },

  /* ═══════════════════════ DELEGATION ═══════════════════════ */
  {
    id: 'i4-delegation',
    title: 'Delegation',
    emoji: '🤝',
    summary: 'Assigning part of the workload — and who benefits from it.',
    notes: [
      {
        heading: 'What delegation is',
        emoji: '📤',
        html:
          '<p><b>Delegation</b> is "the process through which managers assign a portion of their total ' +
          'workload to others" (Smit &amp; Cronje, 2003). It is a strategic process of assigning tasks <b>and ' +
          'the authority to complete them</b>, which develops employees and helps ensure the organisation’s ' +
          'success.</p>' +
          '<p>Managers can delegate responsibility and authority, but <b>never accountability</b> — the ' +
          'manager remains ultimately answerable for the outcome.</p>'
      },
      {
        heading: 'Who benefits',
        emoji: '🎁',
        html:
          '<div class="keybox"><b>For the organisation</b> · ensures succession planning — if a manager ' +
          'leaves, someone is trained and ready to step into the role.' +
          '<br><br><b>For the employee</b> · develops decision-making, problem-solving and management skills, ' +
          'preparing them for future advancement.' +
          '<br><br><b>For the manager</b> · frees up time to focus on higher-level strategic tasks.</div>' +
          '<p>Delegation does not happen automatically — the manager initiates it by informing the subordinate ' +
          'of the required tasks.</p>'
      }
    ],
    questions: [
      {
        id: 'i4e-1', type: 'mcq', marks: 2,
        prompt: '<b>Delegation</b> is defined as:',
        options: [
          'The process through which managers assign a portion of their total workload to others',
          'The process of dividing work into simple repetitive routines',
          'The process of grouping employees into departments',
          'The process of monitoring results against a plan'
        ],
        answer: 0,
        solution: [
          { lab: 'Delegation', val: 'Assigning a portion of the manager’s workload to others' },
          { lab: 'Includes', val: 'Both the task and the authority to complete it' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The second option is specialisation. Delegation passes work downwards; specialisation divides ' +
             'work sideways.'
      },
      {
        id: 'i4e-2', type: 'match', marks: 3,
        prompt: 'Match each party to the benefit delegation brings them.',
        pairs: [
          { left: 'The organisation', right: 'Succession planning — someone is trained and ready to step up' },
          { left: 'The employee', right: 'Develops decision-making, problem-solving and management skills' },
          { left: 'The manager', right: 'Frees up time to focus on higher-level strategic tasks' }
        ],
        solution: [
          { lab: 'Organisation', val: 'Continuity when a manager leaves' },
          { lab: 'Employee', val: 'Development and preparation for advancement' },
          { lab: 'Manager', val: 'Time for strategic work' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'It is one action with three separate payoffs, which is why delegation is treated as strategic ' +
             'rather than simply as offloading work.'
      },
      {
        id: 'i4e-3', type: 'multi', marks: 3,
        prompt: 'What can a manager delegate? <b>Select all that apply.</b>',
        options: ['Responsibility', 'Authority', 'Accountability', 'The consequences of failure'],
        answers: [0, 1],
        solution: [
          { lab: 'Can delegate', val: 'Responsibility and authority' },
          { lab: 'Cannot delegate', val: 'Accountability — and therefore not the consequences either' },
          { lab: 'Answer', val: 'Responsibility and authority', final: true }
        ],
        why: 'Delegating a task without the authority to carry it out sets someone up to fail, which is why ' +
             'the two travel together.'
      },
      {
        id: 'i4e-4', type: 'mcq', marks: 2,
        prompt: 'Who initiates the delegation process?',
        options: [
          'The manager, by informing the subordinate of the required tasks',
          'The subordinate, by requesting extra work',
          'The human resources department',
          'It happens automatically as workload increases'
        ],
        answer: 0,
        solution: [
          { lab: 'Delegation', val: 'Does not happen automatically' },
          { lab: 'The manager', val: 'Initiates it by informing the subordinate of the required tasks' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Because it is deliberate, it can also be neglected — a manager who never initiates it ends up ' +
             'doing everything themselves.'
      },
      {
        id: 'i4e-5', type: 'mcq', marks: 3,
        prompt: 'Why is delegation described as developing <b>succession planning</b>?',
        options: [
          'If a manager leaves, someone has been trained and is ready to step into the role',
          'It reduces the number of managers a business needs',
          'It allows managers to retire earlier',
          'It removes the need to recruit externally'
        ],
        answer: 0,
        solution: [
          { lab: 'Succession planning', val: 'Someone trained and ready to step up' },
          { lab: 'How delegation does it', val: 'Employees gain decision-making and management experience in advance' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The benefit only materialises if the delegated work is genuinely developmental. Handing over ' +
             'routine tasks trains nobody for anything.'
      }
    ]
  },

  /* ═══════════════════════ SPECIALISATION AND JOB DESIGN ═══════════════════════ */
  {
    id: 'i4-jobdesign',
    title: 'Specialisation, Standardisation & Job Design',
    emoji: '🔩',
    summary: 'Dividing work up, making it consistent, and making it bearable.',
    notes: [
      {
        heading: 'Specialisation and standardisation',
        emoji: '🏭',
        html:
          '<div class="keybox"><b>Specialisation</b> · the division of labour aimed at improving how goals are ' +
          'achieved (Strydom, 2008); the "narrowing-down of activities to simple, repetitive routines" ' +
          '(Brevis &amp; Vrba, 2014). Complex jobs are broken into smaller repetitive tasks performed by ' +
          'specialists. Generally attributed to <b>Adam Smith</b>.' +
          '<br><br><b>Standardisation</b> · the uniform and consistent procedures employees follow in doing ' +
          'their jobs (Hellriegel et al., 2008). It ensures work is done consistently every time regardless of ' +
          'who performs it, through job descriptions, policies and step-by-step procedures.</div>' +
          '<div class="keybox"><b>Benefits</b> · increased expertise and fewer errors · improved efficiency, ' +
          'since less time is lost switching between task types · easier training and technology development · ' +
          'lower replacement cost for simple tasks</div>'
      },
      {
        heading: 'Job design',
        emoji: '🧑‍🔧',
        html:
          '<div class="keybox"><b>Job rotation</b> · moving employees between positions. Best as a training ' +
          'tool to increase flexibility and cross-training, but it swaps one routine task for another, so its ' +
          'impact on long-term motivation is limited.' +
          '<br><br><b>Job enlargement (horizontal loading)</b> · increasing the <b>number and variety</b> of ' +
          'tasks. Making the job wider but not deeper, to reduce boredom. Risks higher training costs and ' +
          'demands for higher pay.' +
          '<br><br><b>Job enrichment (vertical loading)</b> · increasing both the number of tasks <b>and the ' +
          'control and authority</b> the worker has. Managers delegate authority, remove micromanagement, and ' +
          'let employees plan, execute and evaluate their own work.' +
          '<br><br><b>Work teams</b> · empowering a group to design its own work system, with autonomy to ' +
          'assign tasks internally, control quality, manage the schedule and solve problems collectively.</div>'
      }
    ],
    questions: [
      {
        id: 'i4f-1', type: 'mcq', marks: 2,
        prompt: '<b>Specialisation</b> is best described as:',
        options: [
          'The division of labour — narrowing activities down to simple, repetitive routines',
          'The uniform procedures employees follow in doing their jobs',
          'Increasing the variety of tasks an employee performs',
          'Assigning part of a manager’s workload to others'
        ],
        answer: 0,
        solution: [
          { lab: 'Specialisation', val: 'Division of labour into simple repetitive routines' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The second option is standardisation, the third job enlargement and the fourth delegation. All ' +
             'four are organising concepts and they sit close together.'
      },
      {
        id: 'i4f-2', type: 'mcq', marks: 3,
        prompt: 'What is the difference between <b>job enlargement</b> and <b>job enrichment</b>?',
        options: [
          'Enlargement adds more tasks (wider); enrichment adds control and authority (deeper)',
          'Enlargement adds control; enrichment adds more tasks',
          'Enlargement applies to managers; enrichment applies to workers',
          'They are two names for the same approach'
        ],
        answer: 0,
        solution: [
          { lab: 'Job enlargement', val: 'Horizontal loading — number and variety of tasks' },
          { lab: 'Job enrichment', val: 'Vertical loading — tasks plus control and authority over the job' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Horizontal and vertical loading is the clearest way to hold them apart: wider against deeper. ' +
             'Only enrichment changes how much say the employee has.'
      },
      {
        id: 'i4f-3', type: 'match', marks: 4,
        prompt: 'Match each job design approach to its description.',
        pairs: [
          { left: 'Job rotation', right: 'Moving employees between positions to build flexibility and cross-training' },
          { left: 'Job enlargement', right: 'Increasing the number and variety of tasks — wider, not deeper' },
          { left: 'Job enrichment', right: 'Increasing tasks and the control and authority the worker holds' },
          { left: 'Work teams', right: 'Empowering a group to design its own work system and manage itself' }
        ],
        solution: [
          { lab: 'Rotation', val: 'A training tool, with limited effect on motivation' },
          { lab: 'Enlargement', val: 'Horizontal loading' },
          { lab: 'Enrichment', val: 'Vertical loading' },
          { lab: 'Work teams', val: 'Collective autonomy and shared accountability' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'Rotation is the weakest of the four for motivation, because swapping one routine task for ' +
             'another leaves the work just as routine.'
      },
      {
        id: 'i4f-4', type: 'multi', marks: 3,
        prompt: 'What are the benefits of specialisation? <b>Select all that apply.</b>',
        options: [
          'Increased expertise and fewer errors',
          'Improved efficiency, with less time lost switching between tasks',
          'Easier training and technology development',
          'Greater variety in each employee’s working day'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Expertise', val: 'A specialist repeating a task becomes highly skilled' },
          { lab: 'Efficiency', val: 'Less time lost switching task types' },
          { lab: 'Training', val: 'Easier to train for one task, and to build tools for it' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'Variety is what specialisation removes, which is precisely the problem job enlargement and ' +
             'rotation exist to address.'
      },
      {
        id: 'i4f-5', type: 'mcq', marks: 2,
        prompt: '<b>Standardisation</b> ensures that:',
        options: [
          'Work is done consistently every time, regardless of who performs it',
          'Each employee performs a wider variety of tasks',
          'Employees control how their own work is done',
          'Managers assign part of their workload to others'
        ],
        answer: 0,
        solution: [
          { lab: 'Standardisation', val: 'Uniform, consistent procedures' },
          { lab: 'Achieved through', val: 'Job descriptions, policies and step-by-step procedures' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Specialisation decides <i>who</i> does a task; standardisation decides <i>how</i> it is done, so ' +
             'the result does not depend on which person happened to do it.'
      },
      {
        id: 'i4f-6', type: 'mcq', marks: 2,
        prompt: 'Which job design approach gives a group autonomy to assign tasks internally, control quality ' +
                'and manage its own schedule?',
        options: ['Work teams', 'Job rotation', 'Job enlargement', 'Standardisation'],
        answer: 0,
        solution: [
          { lab: 'Work teams', val: 'An entire group designs its own work system' },
          { lab: 'They can', val: 'Assign tasks, control quality, manage the schedule, solve problems collectively' },
          { lab: 'Answer', val: 'Work teams', final: true }
        ],
        why: 'It is job enrichment applied to a group rather than an individual, which is why it also improves ' +
             'coordination between the people involved.'
      }
    ]
  },

  /* ═══════════════════════ DEPARTMENTALISATION ═══════════════════════ */
  {
    id: 'i4-depart',
    title: 'Departmentalisation',
    emoji: '🗄️',
    summary: 'The five ways a business divides itself up, and what each is good and bad at.',
    notes: [
      {
        heading: 'The five types',
        emoji: '5️⃣',
        html:
          '<div class="keybox"><b>Functional</b> · grouping people by the specialised skills and functions ' +
          'they perform — marketing, operations, finance, HR. The most common approach.' +
          '<br><br><b>Product</b> · separate divisions based on specific products or product lines, each ' +
          'becoming a mini company within the corporation.' +
          '<br><br><b>Location</b> (geographical) · organised by the geographic regions served, each division ' +
          'operating almost like a standalone business.' +
          '<br><br><b>Customer</b> · structured around specific customer segments, so each major customer ' +
          'type is served by specialists in that segment.' +
          '<br><br><b>Matrix</b> · a hybrid overlaying two structures, with vertical and horizontal lines of ' +
          'authority.</div>'
      },
      {
        heading: 'What each is good and bad at',
        emoji: '⚖️',
        html:
          '<p><b>Functional</b> · high specialisation, efficiency through reduced duplication, clear career ' +
          'paths, and managers who are experts in what they oversee. Its challenge is <b>departmental ' +
          'silos</b>, where teams focus on their own goals rather than the company’s.</p>' +
          '<p><b>Product</b> · deep product expertise, faster decisions because all the specialists sit ' +
          'together, and clear accountability since each division’s profitability can be measured.</p>' +
          '<p><b>Location</b> · local responsiveness to customer preferences, cultural nuances and legal ' +
          'requirements; faster decentralised decisions made closer to the customer.</p>' +
          '<p><b>Customer</b> · deep understanding of each segment and highly customised offerings. Its ' +
          'disadvantages are duplication of functional staff and higher administrative costs, divisions ' +
          'competing for resources, and difficulty keeping a consistent brand message.</p>' +
          '<p><b>Matrix</b> · employees have <b>two reporting lines</b> — a vertical (functional) manager ' +
          'ensuring technical excellence and career development, and a horizontal (project or product) manager ' +
          'responsible for the day-to-day tasks and deadlines of that initiative.</p>'
      }
    ],
    questions: [
      {
        id: 'i4g-1', type: 'multi', marks: 3,
        prompt: 'Which of these are the five types of departmentalisation? <b>Select all that apply.</b>',
        options: [
          'Functional',
          'Product',
          'Location',
          'Customer',
          'Matrix',
          'Seasonal'
        ],
        answers: [0, 1, 2, 3, 4],
        solution: [
          { lab: 'The five types', val: 'Functional, product, location, customer and matrix' },
          { lab: 'Seasonal', val: 'Not one of them' },
          { lab: 'Answer', val: 'The first five', final: true }
        ],
        why: 'Other forms exist — virtual organisations, for instance — but these five are the ones this ' +
             'module examines.'
      },
      {
        id: 'i4g-2', type: 'match', marks: 4,
        prompt: 'Match each type of departmentalisation to how it groups people.',
        pairs: [
          { left: 'Functional', right: 'By the specialised skills and functions they perform' },
          { left: 'Product', right: 'Into divisions based on specific products or product lines' },
          { left: 'Location', right: 'By the geographic regions the business serves' },
          { left: 'Customer', right: 'Around specific customer segments' }
        ],
        solution: [
          { lab: 'Functional', val: 'Marketing, operations, finance, HR' },
          { lab: 'Product', val: 'Each product line as a mini company' },
          { lab: 'Location', val: 'Each region almost a standalone business' },
          { lab: 'Customer', val: 'Specialists per customer type' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'Product and customer look similar but differ in what defines the division: what is sold, ' +
             'against who it is sold to.'
      },
      {
        id: 'i4g-3', type: 'mcq', marks: 3,
        prompt: 'What is the main challenge of <b>functional</b> departmentalisation?',
        options: [
          'Departmental silos — teams focus on their own goals rather than company objectives',
          'Duplication of functional staff across divisions',
          'Employees report to two managers at once',
          'Local managers cannot respond to regional differences'
        ],
        answer: 0,
        solution: [
          { lab: 'Functional', val: 'Groups specialists together, which is efficient' },
          { lab: 'The risk', val: 'Teams become isolated and pursue departmental rather than company goals' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The other three are the characteristic weaknesses of the customer, matrix and centralised ' +
             'structures respectively — each structure fails in its own way.'
      },
      {
        id: 'i4g-4', type: 'mcq', marks: 3,
        prompt: 'In a <b>matrix</b> structure, employees report to:',
        options: [
          'Two managers — a functional manager and a project or product manager',
          'One manager only, as in every other structure',
          'A committee rather than an individual',
          'Whichever manager is available'
        ],
        answer: 0,
        solution: [
          { lab: 'Vertical (functional) manager', val: 'Technical excellence and career development' },
          { lab: 'Horizontal (project/product) manager', val: 'Day-to-day tasks and deadlines of the initiative' },
          { lab: 'Answer', val: 'Two managers', final: true }
        ],
        why: 'This is the one structure that deliberately breaks unity of command, which is why it is used ' +
             'for complex work where the trade-off is judged worthwhile.'
      },
      {
        id: 'i4g-5', type: 'multi', marks: 3,
        prompt: 'What are the disadvantages of <b>customer</b> departmentalisation? <b>Select all that apply.</b>',
        options: [
          'Duplication of functional staff and higher administrative costs',
          'Divisions competing for company resources',
          'Difficulty maintaining a consistent brand message',
          'Employees becoming too specialised in one function'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Duplication', val: 'Each division may need its own marketing and finance staff' },
          { lab: 'Competition', val: 'Divisions compete for resources and fail to share insights' },
          { lab: 'Brand consistency', val: 'Hard when each division focuses on its own niche' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'Over-specialisation in one function is a functional-structure concern. Divisional structures ' +
             'trade that away and pay for it in duplication instead.'
      },
      {
        id: 'i4g-6', type: 'mcq', marks: 2,
        prompt: 'Which structure gives the greatest <b>local responsiveness</b> — understanding customer ' +
                'preferences, cultural nuances and legal requirements in a region?',
        options: [
          'Location departmentalisation',
          'Functional departmentalisation',
          'Matrix departmentalisation',
          'Product departmentalisation'
        ],
        answer: 0,
        solution: [
          { lab: 'Location', val: 'Organised by the geographic regions served' },
          { lab: 'Its biggest benefit', val: 'Local responsiveness, and faster decisions made closer to the customer' },
          { lab: 'Answer', val: 'Location departmentalisation', final: true }
        ],
        why: 'A regional manager can respond to a local competitor without waiting for head office, which is ' +
             'the whole point of pushing the decision closer to the market.'
      }
    ]
  },

  /* ═══════════════════════ TALL, FLAT AND SPAN ═══════════════════════ */
  {
    id: 'i4-structure',
    title: 'Tall & Flat Structures',
    emoji: '🏢',
    summary: 'Many layers against few, and what decides the right span of control.',
    notes: [
      {
        heading: 'Tall against flat',
        emoji: '📐',
        html:
          '<div class="keybox"><b>Tall structure</b> · many layers of management and a <b>narrow</b> span of ' +
          'control. Hierarchical, like a pyramid.' +
          '<br><b>Flat structure</b> · few layers of management and a <b>wide</b> span of control. Horizontal, ' +
          'like a pancake.</div>' +
          '<div class="keybox"><b>Tall</b> · centralised and slower decision-making · higher cost from more ' +
          'managerial salaries and administration · low employee autonomy with close supervision · more ' +
          'defined career paths · suits large complex organisations, inexperienced employees and stable ' +
          'environments · risks being bureaucratic, stifling innovation and slow to adapt' +
          '<br><br><b>Flat</b> · decentralised and faster decision-making · lower cost from fewer managers · ' +
          'high employee autonomy with minimal supervision · fewer promotion opportunities · suits agile ' +
          'organisations, skilled self-motivated professionals and dynamic environments · risks role ' +
          'ambiguity, manager burnout and a lack of clear direction</div>'
      },
      {
        heading: 'What decides the ideal span',
        emoji: '🔍',
        html:
          '<div class="keybox"><b>Employee and manager capability</b> · wider if employees are skilled, ' +
          'experienced and motivated and the manager delegates well; narrower if employees are new or need ' +
          'mentoring' +
          '<br><b>Physical distribution of the team</b> · wider if co-located; narrower if spread across ' +
          'cities, countries or time zones' +
          '<br><b>Task complexity and similarity</b> · wider if tasks are simple, repetitive and similar; ' +
          'narrower if complex, varied and creative' +
          '<br><b>Amount of supervisory work</b> · wider if employees are self-directed; narrower if ' +
          'supervision is intensive and time-consuming' +
          '<br><b>Required interaction</b> · wider if employees work independently; narrower if the job needs ' +
          'frequent deep collaboration with the manager' +
          '<br><b>Process standardisation</b> · wider if there are clear standard procedures to follow; ' +
          'narrower if procedures are loose</div>'
      }
    ],
    questions: [
      {
        id: 'i4h-1', type: 'match', marks: 4,
        prompt: 'Match each feature to the structure it belongs to.',
        pairs: [
          { left: 'Layers and span in a tall structure', right: 'Many layers of management, narrow span of control' },
          { left: 'Layers and span in a flat structure', right: 'Few layers of management, wide span of control' },
          { left: 'Decision-making in a tall structure', right: 'Centralised and slower' },
          { left: 'Decision-making in a flat structure', right: 'Decentralised and faster' }
        ],
        solution: [
          { lab: 'Tall', val: 'Many layers, narrow span, centralised and slower decisions' },
          { lab: 'Flat', val: 'Few layers, wide span, decentralised and faster decisions' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'Layers and span move in opposite directions, because the same number of people has to be ' +
             'supervised either way. Decision speed follows from how many layers a decision must climb.'
      },
      {
        id: 'i4h-2', type: 'multi', marks: 3,
        prompt: 'Which of these describe a <b>flat</b> organisational structure? <b>Select all that apply.</b>',
        options: [
          'Decentralised and faster decision-making',
          'Lower cost due to fewer managers',
          'High employee autonomy',
          'More defined career advancement paths'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Flat', val: 'Faster decisions, lower cost, high autonomy' },
          { lab: 'Career paths', val: 'A tall structure advantage — more layers means more promotion steps' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'Fewer promotion opportunities is the trade-off flat structures make. Fewer layers means less ' +
             'vertical mobility for the people in them.'
      },
      {
        id: 'i4h-3', type: 'mcq', marks: 3,
        prompt: 'Which is the key challenge of a <b>tall</b> structure?',
        options: [
          'It can be bureaucratic, stifle innovation and be slow to adapt',
          'It risks role ambiguity and manager burnout',
          'Employees receive too little supervision',
          'It is too cheap to sustain'
        ],
        answer: 0,
        solution: [
          { lab: 'Tall structure', val: 'Many layers, centralised, slower decisions' },
          { lab: 'Key challenge', val: 'Bureaucratic, stifles innovation, slow to adapt' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The second option is the flat structure’s risk. Each shape has its own characteristic failure, ' +
             'and neither is simply better than the other.'
      },
      {
        id: 'i4h-4', type: 'multi', marks: 3,
        prompt: 'Which factors allow a <b>wider</b> span of control? <b>Select all that apply.</b>',
        options: [
          'Employees are highly skilled, experienced and motivated',
          'The team is co-located in the same office',
          'Tasks are simple, repetitive and similar',
          'The organisation has clear standard operating procedures',
          'The work requires frequent deep collaboration with the manager'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Capable employees', val: 'Need little supervision' },
          { lab: 'Co-located', val: 'Communication is easy and informal' },
          { lab: 'Simple similar tasks', val: 'Less varied supervision needed' },
          { lab: 'Standard procedures', val: 'Employees follow the manual rather than asking' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'The last one demands a narrower span. Every factor comes down to the same question: how much of ' +
             'the manager’s attention does each person need?'
      },
      {
        id: 'i4h-5', type: 'mcq', marks: 2,
        prompt: 'A team spread across several countries and time zones calls for:',
        options: [
          'A narrower span of control',
          'A wider span of control',
          'No change to the span of control',
          'The removal of all management layers'
        ],
        answer: 0,
        solution: [
          { lab: 'Physical distribution', val: 'Managing remote teams requires more effort' },
          { lab: 'Therefore', val: 'A narrower span is needed' },
          { lab: 'Answer', val: 'A narrower span of control', final: true }
        ],
        why: 'Distance costs the manager time and attention per person, so fewer people can be supervised ' +
             'well — the same logic as complex tasks needing a narrower span.'
      },
      {
        id: 'i4h-6', type: 'mcq', marks: 3,
        prompt: 'A legal adviser recommends a change to how a sales team handles contracts, but cannot ' +
                'instruct them to adopt it. This is an example of:',
        options: [
          'Staff authority',
          'Line authority',
          'Coercive power',
          'Unity of command'
        ],
        answer: 0,
        solution: [
          { lab: 'Staff authority', val: 'Indirect and supportive, based on expertise rather than position' },
          { lab: 'They may', val: 'Advise, recommend and support — but not give orders to line employees' },
          { lab: 'Answer', val: 'Staff authority', final: true }
        ],
        why: 'Line positions are directly responsible for producing results; staff positions support and ' +
             'advise. Expertise and the right to command are separate things.'
      }
    ]
  },

  /* ═══════════════════════ ORGANISING OPERATIONS ═══════════════════════ */
  {
    id: 'i4-opsorg',
    title: 'Organising Operations',
    emoji: '🏭',
    summary: 'Process types by volume and variety, and the four facility layouts.',
    notes: [
      {
        heading: 'What organising operations involves',
        emoji: '⚙️',
        html:
          '<div class="keybox"><b>Structuring resources</b> · assembling and allocating people, technology, ' +
          'materials and information; defining roles, assigning responsibilities and coordinating workflows' +
          '<br><b>The transformation process</b> · the input-transformation-output model organised as a system' +
          '<br><b>Alignment with strategy</b> · resources, process type and structure must match the strategic ' +
          'goals</div>' +
          '<p>If the goal is <b>low-cost efficiency</b>, operations are organised for mass production with ' +
          'tight controls. If the goal is <b>customisation and flexibility</b>, operations are organised into ' +
          'empowered teams.</p>' +
          '<p>Selecting the <b>process type</b> is a choice about how to structure work, based on the ' +
          '<b>volume</b> of output against the <b>variety</b> of output. Low volume with high variety suits a ' +
          '<b>project</b> process — flexible, temporary teams with broad responsibilities and high autonomy.</p>'
      },
      {
        heading: 'The four facility layouts',
        emoji: '🗺️',
        html:
          '<div class="keybox"><b>Fixed-position layout</b> · the product is static because of its size, shape ' +
          'or location, and people, materials and equipment are brought to it. Best for <b>project</b> ' +
          'processes — a shipbuilding yard, a construction site.' +
          '<br><br><b>Process layout</b> (functional, flexible-flow) · resources grouped by function, with ' +
          'different products taking different routes through the facility. Best for <b>jobbing or batch</b> ' +
          'processes with low volume and high variety — a hospital with X-ray, cardiology and pharmacy.' +
          '<br><br><b>Product layout</b> (line-flow) · the workflow arranged in a linear sequence of steps for ' +
          'efficient production of one type of product. Best for <b>mass or continuous</b> processes with high ' +
          'volume and low variety — an assembly line.' +
          '<br><br><b>Cellular layout</b> (hybrid) · resources organised into cells, each dedicated to a family ' +
          'of similar products. Combines the flexibility of a process layout with the efficiency of a product ' +
          'layout. Best for <b>batch</b> processes with moderate volume and variety.</div>'
      }
    ],
    questions: [
      {
        id: 'i4i-1', type: 'match', marks: 4,
        prompt: 'Match each facility layout to its description.',
        pairs: [
          { left: 'Fixed-position layout', right: 'The product stays still and resources are brought to it' },
          { left: 'Process layout', right: 'Resources grouped by function, with products taking different routes' },
          { left: 'Product layout', right: 'A linear sequence of steps for one type of product' },
          { left: 'Cellular layout', right: 'Resources grouped into cells, each making a family of similar products' }
        ],
        solution: [
          { lab: 'Fixed-position', val: 'Best for project processes' },
          { lab: 'Process', val: 'Best for jobbing or batch, low volume and high variety' },
          { lab: 'Product', val: 'Best for mass or continuous, high volume and low variety' },
          { lab: 'Cellular', val: 'Best for batch, moderate volume and variety' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'Volume and variety decide the layout. High volume with low variety earns a line; low volume ' +
             'with high variety needs the flexibility of grouping by function instead.'
      },
      {
        id: 'i4i-2', type: 'mcq', marks: 2,
        prompt: 'Selecting the <b>process type</b> is a choice based on which two things?',
        options: [
          'The volume of output against the variety of output',
          'The cost of labour against the cost of materials',
          'The number of employees against the number of managers',
          'The size of the factory against the size of the market'
        ],
        answer: 0,
        solution: [
          { lab: 'The two dimensions', val: 'Volume of output and variety of output' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Everything else in the operations structure follows from where a business sits on those two ' +
             'dimensions, including which facility layout makes sense.'
      },
      {
        id: 'i4i-3', type: 'mcq', marks: 3,
        prompt: 'Which layout suits a construction site, where the building cannot be moved?',
        options: [
          'Fixed-position layout',
          'Product layout',
          'Process layout',
          'Cellular layout'
        ],
        answer: 0,
        solution: [
          { lab: 'The product', val: 'Static because of its size, shape or location' },
          { lab: 'Therefore', val: 'People, materials and equipment are brought to the product' },
          { lab: 'Answer', val: 'Fixed-position layout', final: true }
        ],
        why: 'It is the one layout where the work moves to the product rather than the product moving through ' +
             'the work, which is why it suits project processes.'
      },
      {
        id: 'i4i-4', type: 'mcq', marks: 3,
        prompt: 'A business whose strategic goal is <b>low-cost efficiency</b> should organise operations for:',
        options: [
          'Mass production with tight controls',
          'Empowered, autonomous teams',
          'A fixed-position layout',
          'Maximum product variety'
        ],
        answer: 0,
        solution: [
          { lab: 'Low-cost efficiency', val: 'Mass production with tight controls' },
          { lab: 'Customisation and flexibility', val: 'Empowered teams instead' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'This is the alignment-with-strategy principle: the structure follows from the goal, which is ' +
             'why planning precedes organising.'
      },
      {
        id: 'i4i-5', type: 'multi', marks: 3,
        prompt: 'What does structuring resources in operations involve? <b>Select all that apply.</b>',
        options: [
          'Allocating people, technology, materials and information',
          'Defining roles and assigning responsibilities',
          'Coordinating workflows',
          'Setting the organisation’s mission'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Allocating', val: 'People, technology, materials and information' },
          { lab: 'Defining', val: 'Roles and responsibilities' },
          { lab: 'Coordinating', val: 'Workflows, to meet production or service goals' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'The mission is set by top management as part of strategic planning, long before operations ' +
             'organises anything around it.'
      }
    ]
  },

  /* ═══════════════════════ ORGANISING HR AND MARKETING ═══════════════════════ */
  {
    id: 'i4-hrmkt',
    title: 'Organising HR & Marketing',
    emoji: '🧑‍💼',
    summary: 'Job analysis, description and specification — and how marketing divides itself up.',
    notes: [
      {
        heading: 'The three components of job design',
        emoji: '📋',
        html:
          '<p>A clear job description helps ensure HR decisions are fair and objective, which matters for legal ' +
          'compliance. It also provides the standard for performance reviews.</p>' +
          '<div class="keybox"><b>Job analysis</b> · the systematic process of gathering and analysing ' +
          'information about the content, context and human requirements of a job. What tasks are performed, ' +
          'what the employee is responsible for, what decisions are made, what knowledge is needed, and under ' +
          'what conditions the work is done. Carried out by observing and recording activities, interviewing ' +
          'the employee, or using a standardised survey.' +
          '<br><br><b>Job description</b> · a written document outlining the core responsibilities, duties and ' +
          'purpose of a role. <b>It is about the job itself.</b> Includes the job title, purpose, duties and ' +
          'responsibilities, reporting structure and working conditions.' +
          '<br><br><b>Job specification</b> · the personal qualifications, characteristics and skills a person ' +
          'must possess to perform the job successfully. <b>It is about the person.</b> Includes education, ' +
          'experience, skills and abilities, personal traits and physical demands.</div>'
      },
      {
        heading: 'Organising marketing',
        emoji: '📣',
        html:
          '<p>The marketing function is divided into specialised areas, each with defined roles, ' +
          'responsibilities and reporting relationships to ensure coordination and accountability:</p>' +
          '<div class="keybox"><b>Market research</b> · <b>Advertising and promotions</b> · <b>Digital ' +
          'marketing and social media</b> · <b>Public relations</b> · <b>Sales and customer service</b> · ' +
          '<b>Product or brand management</b></div>'
      }
    ],
    questions: [
      {
        id: 'i4j-1', type: 'match', marks: 3,
        prompt: 'Match each component of job design to what it covers.',
        pairs: [
          { left: 'Job analysis', right: 'Systematically gathering information about a job’s content, context and requirements' },
          { left: 'Job description', right: 'A written document outlining the duties and purpose of the role' },
          { left: 'Job specification', right: 'The qualifications, skills and traits a person must possess' }
        ],
        solution: [
          { lab: 'Job analysis', val: 'The investigation' },
          { lab: 'Job description', val: 'About the job' },
          { lab: 'Job specification', val: 'About the person' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'Description and specification are the pair that get swapped. One describes the work, the other ' +
             'describes who could do it — and the analysis is what produces both.'
      },
      {
        id: 'i4j-2', type: 'multi', marks: 3,
        prompt: 'Which of these would appear in a <b>job description</b>? <b>Select all that apply.</b>',
        options: [
          'Job title',
          'Duties and responsibilities',
          'Reporting structure',
          'Working conditions',
          'The education a candidate must hold'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Job description', val: 'Title, purpose, duties and responsibilities, reporting structure, working conditions' },
          { lab: 'Education', val: 'Belongs to the job specification' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'The test is whether the item describes the job or the person. Education is a requirement of the ' +
             'candidate, so it sits in the specification.'
      },
      {
        id: 'i4j-3', type: 'multi', marks: 3,
        prompt: 'Which of these appear in a <b>job specification</b>? <b>Select all that apply.</b>',
        options: [
          'Education',
          'Experience',
          'Skills and abilities',
          'Personal traits',
          'The daily duties of the role'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Job specification', val: 'Education, experience, skills and abilities, personal traits, physical demands' },
          { lab: 'Daily duties', val: 'Job description' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Physical demands belong here too. Everything in a specification is something a candidate either ' +
             'has or does not have.'
      },
      {
        id: 'i4j-4', type: 'mcq', marks: 3,
        prompt: 'Why does a clear job description matter for HR decisions?',
        options: [
          'It helps ensure decisions are fair and objective, which matters for legal compliance',
          'It reduces the salary that must be offered',
          'It removes the need for performance reviews',
          'It guarantees the role will be filled quickly'
        ],
        answer: 0,
        solution: [
          { lab: 'Fairness and objectivity', val: 'Important for legal compliance' },
          { lab: 'It also', val: 'Provides the standard against which performance is reviewed' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'It is the opposite of removing performance reviews — the description is what a review measures ' +
             'someone against.'
      },
      {
        id: 'i4j-5', type: 'multi', marks: 3,
        prompt: 'Into which specialised areas is the marketing function typically divided? ' +
                '<b>Select all that apply.</b>',
        options: [
          'Market research',
          'Advertising and promotions',
          'Digital marketing and social media',
          'Public relations',
          'Payroll administration'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Marketing areas', val: 'Research, advertising and promotions, digital and social, PR, sales and customer service, brand management' },
          { lab: 'Payroll', val: 'A finance team' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Each area has defined roles, responsibilities and reporting relationships — which is functional ' +
             'departmentalisation applied inside a single department.'
      }
    ]
  },

  /* ═══════════════════════ ORGANISING FINANCE AND PURCHASING ═══════════════════════ */
  {
    id: 'i4-finpur',
    title: 'Organising Finance & Purchasing',
    emoji: '💼',
    summary: 'The finance teams, and whether purchasing should be centralised.',
    notes: [
      {
        heading: 'The finance teams',
        emoji: '💰',
        html:
          '<div class="keybox"><b>Accounting</b> · records every financial transaction and creates the reports ' +
          'that show whether the company is profitable' +
          '<br><b>Budgeting</b> · creates the financial map for the year, setting spending limits for each ' +
          'department' +
          '<br><b>Cash management</b> · ensures there is always enough cash to pay the bills, and invests any ' +
          'surplus short-term' +
          '<br><b>Payroll</b> · ensures every employee is paid on time, managing salaries, taxes and benefits' +
          '<br><b>Auditing and compliance</b> · reviews the work of the other teams to ensure accuracy and ' +
          'compliance</div>'
      },
      {
        heading: 'Organising purchasing and supply',
        emoji: '🛒',
        html:
          '<p>Four considerations in organising the purchasing and supply function:</p>' +
          '<div class="keybox"><b>1.</b> Where the function is positioned in the organisational structure' +
          '<br><b>2.</b> How the internal purchasing and supply department is organised' +
          '<br><b>3.</b> How the functions are coordinated with the other functional management areas' +
          '<br><b>4.</b> Supply-chain management cross-functional teams</div>' +
          '<p>The most important structural decision is between <b>centralised</b> and <b>decentralised</b> ' +
          'purchasing, which determines where authority resides and how purchasing power is used.</p>' +
          '<div class="keybox"><b>Centralised purchasing</b> · all major decisions made by a central team at ' +
          'headquarters, creating a unified front to the supply market. Suits uniform needs across branches. ' +
          'Advantages: <b>cost savings</b> from higher volumes commanding better discounts, ' +
          '<b>standardisation</b> of quality and specifications, and buyers becoming <b>deep category ' +
          'experts</b>.' +
          '<br><br><b>Decentralised purchasing</b> · authority distributed to individual business units, ' +
          'plants or regional offices. Suits geographically dispersed operations with unique local needs. ' +
          'Advantages: <b>speed and responsiveness</b>, <b>local relationships</b> with community-based ' +
          'suppliers, and <b>autonomy</b> where units are run as independent profit centres.' +
          '<br><br><b>A combination of both</b> · a hybrid where a central team negotiates long-term contracts ' +
          'for large strategic items while local units handle the rest.</div>'
      }
    ],
    questions: [
      {
        id: 'i4k-1', type: 'match', marks: 4,
        prompt: 'Match each finance team to what it does.',
        pairs: [
          { left: 'Accounting', right: 'Records transactions and reports whether the company is profitable' },
          { left: 'Budgeting', right: 'Sets spending limits for each department for the year' },
          { left: 'Cash management', right: 'Ensures there is enough cash to pay bills, and invests any surplus' },
          { left: 'Auditing and compliance', right: 'Reviews the other teams’ work for accuracy and compliance' }
        ],
        solution: [
          { lab: 'Accounting', val: 'The record of what happened' },
          { lab: 'Budgeting', val: 'The plan for what should happen' },
          { lab: 'Cash management', val: 'Making sure the money is there when needed' },
          { lab: 'Auditing', val: 'Checking the rest' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'Payroll is the fifth team. Auditing reviewing the others is a form of internal control — the ' +
             'same principle as separating who spends money from who records it.'
      },
      {
        id: 'i4k-2', type: 'multi', marks: 3,
        prompt: 'What are the advantages of <b>centralised</b> purchasing? <b>Select all that apply.</b>',
        options: [
          'Cost savings, since higher volumes command better discounts',
          'Standardisation of quality and specifications',
          'Buyers becoming deep experts in specific categories',
          'Faster response to unique local needs'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Cost savings', val: 'Volume buys discounts' },
          { lab: 'Standardisation', val: 'Consistent quality and specifications company-wide' },
          { lab: 'Category expertise', val: 'Buyers specialise deeply' },
          { lab: 'Local responsiveness', val: 'A decentralised advantage' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'The two approaches trade directly against each other: buying power and consistency on one side, ' +
             'speed and local fit on the other.'
      },
      {
        id: 'i4k-3', type: 'multi', marks: 3,
        prompt: 'What are the advantages of <b>decentralised</b> purchasing? <b>Select all that apply.</b>',
        options: [
          'Speed and responsiveness to local needs',
          'Local relationships with community-based suppliers',
          'Autonomy where units run as independent profit centres',
          'A unified front to the supply market'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Speed', val: 'Local buyers react quickly' },
          { lab: 'Relationships', val: 'With community-based suppliers' },
          { lab: 'Autonomy', val: 'Needed when units are independent profit centres' },
          { lab: 'Unified front', val: 'A centralised advantage' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'A unified front is exactly what decentralising gives up. Many small buyers negotiating ' +
             'separately have less leverage than one large one.'
      },
      {
        id: 'i4k-4', type: 'mcq', marks: 3,
        prompt: 'Which purchasing approach suits a business with <b>uniform needs across all its branches</b>?',
        options: [
          'Centralised purchasing',
          'Decentralised purchasing',
          'Neither — uniform needs make purchasing unnecessary',
          'It makes no difference'
        ],
        answer: 0,
        solution: [
          { lab: 'Uniform needs', val: 'Every branch wants the same things' },
          { lab: 'Therefore', val: 'A central team can buy for all of them and command better discounts' },
          { lab: 'Answer', val: 'Centralised purchasing', final: true }
        ],
        why: 'Decentralising only pays when local needs genuinely differ. Where they do not, it forfeits ' +
             'buying power for no benefit.'
      },
      {
        id: 'i4k-5', type: 'multi', marks: 3,
        prompt: 'Which of these are considerations in organising the purchasing and supply function? ' +
                '<b>Select all that apply.</b>',
        options: [
          'Where the function is positioned in the organisational structure',
          'How the internal department is organised',
          'How it is coordinated with other functional areas',
          'Supply-chain management cross-functional teams',
          'The retail price of the finished product'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'The four considerations', val: 'Position, internal organisation, coordination, cross-functional teams' },
          { lab: 'Retail price', val: 'A marketing decision' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'All four are structural questions about where authority sits and how it connects to the rest of ' +
             'the business — which is what organising is.'
      },
      {
        id: 'i4k-6', type: 'mcq', marks: 2,
        prompt: 'What does a <b>combination</b> of centralised and decentralised purchasing look like?',
        options: [
          'A central team negotiates long-term contracts for large strategic items while local units handle the rest',
          'Purchasing is done by an outside company',
          'Each department buys everything independently',
          'All purchasing decisions require board approval'
        ],
        answer: 0,
        solution: [
          { lab: 'The hybrid', val: 'Central control of strategic purchases, local control of the rest' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'It captures the buying power where volume matters most and leaves local flexibility where it ' +
             'matters more than price.'
      }
    ]
  }

  ]
});
