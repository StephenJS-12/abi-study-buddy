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
  },

  /* ═══════════════════════ ORGANISING OPERATIONS WORK ═══════════════════════
     Lesson 4.4. Job design under Lesson 2 is the general treatment; this is
     the operations department's own, and it is a different subject: not how to
     make a job bearable, but how to find the best way to do a task and how
     long that task should take. */
  {
    id: 'i4-opswork',
    title: 'Organising Operations Work',
    emoji: '⏱️',
    summary: 'Work study — finding the best method, and setting a fair standard time.',
    notes: [
      {
        heading: 'Why the people matter as much as the machines',
        emoji: '🧑‍🏭',
        html:
          '<p>Operations looks like a subject about machines and workflows, but it is also about the people ' +
          'who run them. How jobs are designed in the department affects <b>efficiency</b>, <b>quality</b> and ' +
          '<b>employee satisfaction</b>. A well-designed job brings out the best in people; a poorly designed ' +
          'one produces <b>errors, burnout and high turnover</b>.</p>'
      },
      {
        heading: 'Work study',
        emoji: '🔬',
        html:
          '<p><b>Work study</b> is a scientific approach that systematically analyses every factor in the work ' +
          'environment to improve how tasks are carried out. It looks for the most effective way to perform a ' +
          'task, <b>balancing efficiency against human capability</b>.</p>' +
          '<div class="keybox"><b>1. Method study</b> · <i>Is there a better, safer, easier way to do this?</i>' +
          '<br>The systematic recording and investigation of current and proposed work methods, to develop ' +
          'more efficient ones — reducing costs and unnecessary movement, and improving safety.' +
          '<br><br><b>2. Work measurement</b> · <i>How long should this take?</i>' +
          '<br>Techniques for determining the <b>standard time</b> a trained worker should take to complete a ' +
          'job at a defined level of performance. The point is <b>fair performance standards</b>, and those ' +
          'standards are then needed for <b>scheduling, budgeting and capacity planning</b>.</div>'
      }
    ],
    questions: [
      {
        id: 'i4l-1', type: 'mcq', marks: 2,
        prompt: 'What is <b>work study</b>?',
        options: [
          'A scientific approach that analyses every factor in the work environment to improve how tasks are carried out',
          'A survey asking employees how satisfied they are with their jobs',
          'The process of recruiting workers with the right qualifications',
          'A record of how many hours each employee has worked this month'
        ],
        answer: 0,
        solution: [
          { lab: 'Work study', val: 'A systematic, scientific analysis of the work environment' },
          { lab: 'Its aim', val: 'The most effective way to perform a task' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The word "study" makes it sound like observation for its own sake. It is not — it exists to ' +
             'change how the work is done.'
      },
      {
        id: 'i4l-2', type: 'match', marks: 3,
        prompt: 'Match each method of work study to the question it answers.',
        pairs: [
          { left: 'Method study', right: 'Is there a better, safer and easier way to do this task?' },
          { left: 'Work measurement', right: 'How long should this task take a trained worker?' },
          { left: 'Work study overall', right: 'What is the most effective way to perform this task at all?' }
        ],
        solution: [
          { lab: 'Method study', val: 'Improves HOW the work is done' },
          { lab: 'Work measurement', val: 'Determines HOW LONG it should take' },
          { lab: 'Together', val: 'The two methods that make up work study' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The two are easy to blur because both involve watching someone work. One is about the method, ' +
             'the other about the clock.'
      },
      {
        id: 'i4l-3', type: 'mcq', marks: 3,
        prompt: 'A warehouse reorganises its shelves so that high-demand items sit closer to the packing ' +
                'station, and gives the pickers better carts. Staff walk noticeably less each day. Which part ' +
                'of work study is this?',
        options: [
          'Method study — it changed how the work is done, reducing unnecessary movement',
          'Work measurement — it changed how long the work takes',
          'Job enrichment — it gave the pickers more control over their work',
          'Capacity planning — it changed how much the warehouse can handle'
        ],
        answer: 0,
        solution: [
          { lab: 'What changed', val: 'The layout and the equipment — the method' },
          { lab: 'Method study', val: 'Reduces costs and unnecessary movement, and improves safety' },
          { lab: 'Answer', val: 'Method study', final: true }
        ],
        why: 'The time saved is a <i>result</i>, not the subject. Work measurement would have been setting a ' +
             'target time for a pick; this changed the walk instead.'
      },
      {
        id: 'i4l-4', type: 'mcq', marks: 3,
        prompt: 'A bank determines that a trained teller should process a standard cash deposit in 90 ' +
                'seconds. What is that figure called, and what is it for?',
        options: [
          'A standard time — used to set fair performance expectations, and to schedule, budget and plan capacity',
          'A method study — used to find a better way of processing deposits',
          'A maximum time — the longest a teller is permitted to take before being disciplined',
          'An average time — the mean of what all tellers currently achieve'
        ],
        answer: 0,
        solution: [
          { lab: 'Standard time', val: 'What a trained worker should take at a defined level of performance' },
          { lab: 'Set by', val: 'Work measurement' },
          { lab: 'Used for', val: 'Fair standards, scheduling, budgeting and capacity planning' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The last option is the trap. A standard is what the work <i>should</i> take, not the average of ' +
             'what it currently does — an average would bake in whatever is going wrong today.'
      },
      {
        id: 'i4l-5', type: 'multi', marks: 4,
        prompt: 'Standard times are needed for more than judging individual performance. Which of these does ' +
                'the module say they are used for? <b>Select all that apply.</b>',
        options: [
          'Scheduling',
          'Budgeting',
          'Capacity planning',
          'Setting fair performance standards',
          'Deciding which employees to make redundant',
          'Setting the selling price of the product'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Scheduling', val: 'How many people are needed, and when' },
          { lab: 'Budgeting', val: 'What the labour will cost' },
          { lab: 'Capacity planning', val: 'How much the operation can handle' },
          { lab: 'Fair standards', val: 'The stated purpose of work measurement' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'A standard time looks like a stick to beat people with, and the list of uses shows it is mostly ' +
             'a planning tool — you cannot roster a shift without knowing how long the work takes.'
      },
      {
        id: 'i4l-6', type: 'multi', marks: 4,
        prompt: 'What does the module say a poorly designed job produces? <b>Select all that apply.</b>',
        options: [
          'Errors',
          'Burnout',
          'High turnover',
          'Higher wages for the workers affected',
          'Automatic redesign by the operations manager'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Errors', val: 'Quality suffers' },
          { lab: 'Burnout', val: 'Satisfaction suffers' },
          { lab: 'High turnover', val: 'And then the people leave' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'The three run into one another, which is what makes job design an operations problem and not ' +
             'only an HR one: errors are a quality cost before they are a people cost.'
      }
    ]
  },

  /* ═══════════════════════ MARKETING COMMUNICATIONS ═══════════════════════
     Lesson 4.8. */
  {
    id: 'i4-mktcomms',
    title: 'Organising Marketing Communications',
    emoji: '📢',
    summary: 'Dividing communication into specialised parts, and keeping one message across all of them.',
    notes: [
      {
        heading: 'The structure',
        emoji: '🗂️',
        html:
          '<p><b>Marketing communications</b> are all the methods of communicating with stakeholders — not ' +
          'only selling to customers. The first step in organising them is to divide the function into ' +
          '<b>coordinated, specialised elements</b>:</p>' +
          '<div class="keybox"><b>Advertising</b> · paid, non-personal advertisements, including digital' +
          '<br><b>Personal selling</b> · direct, person-to-person communication' +
          '<br><b>Direct marketing</b> · communicating directly with customers to generate a response, such ' +
          'as email or direct mail' +
          '<br><b>Sales promotion</b> · short-term incentives to encourage purchases' +
          '<br><b>Publicity and public relations</b> · managing reputation and the relationship with the ' +
          'public, through earned media and events</div>' +
          '<p>The marketing manager assigns clear roles and responsibilities for each — while ensuring they ' +
          'all work together to deliver <b>one consistent message</b>.</p>'
      },
      {
        heading: 'The other organising decisions',
        emoji: '🧭',
        html:
          '<div class="keybox"><b>Allocating resources and budgets</b> · people and money go to each section. ' +
          'Marketing works with finance on a master budget, then decides how much goes to each element, and ' +
          'how the advertising budget is split across media platforms.' +
          '<br><br><b>Establishing channels and media choices</b> · choosing the platforms that reach the ' +
          'audience, and keeping the message and look consistent across traditional and digital channels. It ' +
          'means setting up communication lines between internal teams and outside partners such as media ' +
          'agencies.' +
          '<br><br><b>Managing people and roles</b> · assigning sales representatives to regions or client ' +
          'types, building specialist teams, and selecting and training the people who represent the brand.' +
          '<br><br><b>Coordinating public relations</b> · event management — press conferences, exhibitions, ' +
          'sponsorships — and a <b>crisis protocol</b> saying who is authorised to speak for the organisation.' +
          '<br><br><b>Managing databases and direct marketing</b> · database management so campaigns can be ' +
          'targeted, and coordination between telemarketing, direct mail and email so they tell one story.</div>'
      }
    ],
    questions: [
      {
        id: 'i4m-1', type: 'multi', marks: 4,
        prompt: 'Which of these are the specialised elements a marketing communications function is divided ' +
                'into? <b>Select all that apply.</b>',
        options: [
          'Advertising',
          'Personal selling',
          'Direct marketing',
          'Sales promotion',
          'Publicity and public relations',
          'Product design'
        ],
        answers: [0, 1, 2, 3, 4],
        solution: [
          { lab: 'The five', val: 'Advertising, personal selling, direct marketing, sales promotion, publicity and PR' },
          { lab: 'Product design', val: 'Part of the product itself, not of communicating about it' },
          { lab: 'Answer', val: 'The first five', final: true }
        ],
        why: 'Marketing communications covers every method of talking to stakeholders. Designing the thing ' +
             'being talked about is a different job.'
      },
      {
        id: 'i4m-2', type: 'match', marks: 4,
        prompt: 'Match each element of marketing communications to what it is.',
        pairs: [
          { left: 'Advertising', right: 'Paid, non-personal advertisements, including digital' },
          { left: 'Personal selling', right: 'Direct, person-to-person communication' },
          { left: 'Direct marketing', right: 'Communicating directly with a customer to generate a response' },
          { left: 'Sales promotion', right: 'Short-term incentives to encourage a purchase' }
        ],
        solution: [
          { lab: 'Advertising', val: 'Paid and non-personal' },
          { lab: 'Personal selling', val: 'Person to person' },
          { lab: 'Direct marketing', val: 'Straight to the customer, wanting a response' },
          { lab: 'Sales promotion', val: 'Short-term, incentive-based' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'Direct marketing and personal selling both reach one customer at a time. The difference is that ' +
             'direct marketing is asking for a <i>response</i>, not holding a conversation.'
      },
      {
        id: 'i4m-3', type: 'mcq', marks: 3,
        prompt: 'A marketing manager divides the communications function into five specialised sections and ' +
                'gives each its own roles and responsibilities. What must she also ensure, and why?',
        options: [
          'That all five work together to deliver one consistent message',
          'That each section reports to a different senior manager, to keep them independent',
          'That each section has an equal share of the budget',
          'That the sections never communicate with outside agencies'
        ],
        answer: 0,
        solution: [
          { lab: 'Specialisation', val: 'Divides the work into parts that can be done well' },
          { lab: 'The risk', val: 'Five parts each saying something slightly different' },
          { lab: 'Answer', val: 'One consistent message', final: true }
        ],
        why: 'This is the general organising problem in one place: dividing work creates the need to ' +
             'coordinate it. Five well-run sections with five different messages is worse than one mediocre ' +
             'message.'
      },
      {
        id: 'i4m-4', type: 'mcq', marks: 3,
        prompt: 'As part of coordinating public relations, an organisation writes down in advance who is ' +
                'authorised to speak to the media and the public during an emergency. What is this called?',
        options: [
          'A crisis protocol',
          'A media plan',
          'A master budget',
          'A database management policy'
        ],
        answer: 0,
        solution: [
          { lab: 'Crisis protocol', val: 'Communications during emergencies, and who may speak' },
          { lab: 'Why in advance', val: 'Being prepared is part of the PR role' },
          { lab: 'Answer', val: 'A crisis protocol', final: true }
        ],
        why: 'The point of writing it down beforehand is that a crisis is exactly when nobody has time to ' +
             'decide who should be talking.'
      },
      {
        id: 'i4m-5', type: 'multi', marks: 4,
        prompt: 'Allocating resources and budgets is one of the organising decisions in marketing ' +
                'communications. Which of these does it involve? <b>Select all that apply.</b>',
        options: [
          'Working with finance to develop a master budget',
          'Deciding how much of the budget each element receives',
          'Splitting the advertising budget across specific media platforms',
          'Setting the price the product will sell for',
          'Deciding which suppliers the business will buy raw materials from'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Master budget', val: 'The total to be spent on marketing communications, agreed with finance' },
          { lab: 'Per element', val: 'How much advertising gets, how much PR gets' },
          { lab: 'Per platform', val: 'Split according to specific marketing goals' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'Pricing is one of the four Ps and suppliers belong to purchasing. Both are marketing-adjacent, ' +
             'which is what makes them plausible here.'
      },
      {
        id: 'i4m-6', type: 'mcq', marks: 3,
        prompt: 'Why does organising direct marketing start with database management?',
        options: [
          'Because campaigns can only be targeted, and feel personal and relevant, if the data behind them is organised',
          'Because the law requires every business to keep a customer database',
          'Because a database replaces the need to coordinate telemarketing, direct mail and email',
          'Because databases are cheaper than advertising'
        ],
        answer: 0,
        solution: [
          { lab: 'Direct marketing', val: 'Communicating directly with a customer to generate a response' },
          { lab: 'What it relies on', val: 'Well-organised data, and coordinated execution' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Direct marketing sent to the wrong list is not direct marketing, it is junk mail. The database ' +
             'is what makes the "direct" part true.'
      }
    ]
  },

  /* ═══════════════════════ ORGANISING DISTRIBUTION ═══════════════════════
     Lesson 4.9. */
  {
    id: 'i4-mktdist',
    title: 'Organising Distribution',
    emoji: '🚚',
    summary: 'Channels, how widely the product is available, and moving and storing it.',
    notes: [
      {
        heading: 'Channels and coverage',
        emoji: '🛣️',
        html:
          '<p>A marketing campaign that creates demand is worth nothing if the product cannot reach the ' +
          'customer. A <b>distribution channel</b> is the path a product takes from the producer to the end ' +
          'user. Organising it means selecting the right <b>intermediaries</b> — wholesalers and retailers — ' +
          'and building teams to manage those partnerships, negotiate agreements, and train and support them.</p>' +
          '<p>A <b>direct</b> channel reaches the customer with no intermediary; an <b>indirect</b> channel ' +
          'relies on distributors to reach many outlets.</p>' +
          '<div class="keybox"><b>Market coverage</b> — how widely available the product will be, and each ' +
          'choice needs a different structure' +
          '<br><b>Intensive</b> · the product is everywhere. A broad structure coordinating many partners; ' +
          'the challenge is managing the network.' +
          '<br><b>Selective</b> · a limited number of chosen outlets. A more selective, managed structure ' +
          'with a specialised team, so the customer experience can be controlled.' +
          '<br><b>Exclusive</b> · very few locations. A tight, controlled relationship with each partner.</div>'
      },
      {
        heading: 'Logistics, and working with everyone else',
        emoji: '📦',
        html:
          '<p>Organising <b>logistics</b> means structuring a system for the physical movement and storage of ' +
          'goods:</p>' +
          '<div class="keybox"><b>Transportation</b> · how the product moves — road, rail, air or sea' +
          '<br><b>Storage</b> · where inventory is held, and how many warehouses there are. One central ' +
          'warehouse or several regional centres, a decision that changes delivery times and costs.' +
          '<br><b>Inventory management</b> · how much stock sits at each point in the channel. Too much ties ' +
          'up cash; too little means stockouts and lost sales.</div>' +
          '<p>Distribution also has to be <b>coordinated internally</b>: marketing works closely with ' +
          'purchasing to make sure raw materials are available, and with operations and finance. Distribution ' +
          'is directly linked to the purchasing and supply chain function.</p>'
      }
    ],
    questions: [
      {
        id: 'i4n-1', type: 'mcq', marks: 2,
        prompt: 'A <b>distribution channel</b> is:',
        options: [
          'The path a product takes from the producer to the end user',
          'The medium an advertisement is broadcast on',
          'The warehouse where finished goods are stored',
          'The route a delivery vehicle drives between two towns'
        ],
        answer: 0,
        solution: [
          { lab: 'Distribution channel', val: 'Producer to end user' },
          { lab: 'Organising it', val: 'Selecting intermediaries, and managing those partnerships' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The word "channel" is used for media in the section just before this one, which is exactly why ' +
             'the second option is offered.'
      },
      {
        id: 'i4n-2', type: 'match', marks: 3,
        prompt: 'Match each level of market coverage to the structure it needs.',
        pairs: [
          { left: 'Intensive distribution', right: 'A broad structure coordinating many partners — the challenge is managing the network' },
          { left: 'Selective distribution', right: 'A more managed structure with a specialised team, so the customer experience can be controlled' },
          { left: 'Exclusive distribution', right: 'A tight, controlled relationship with each of very few partners' }
        ],
        solution: [
          { lab: 'Intensive', val: 'Everywhere — the organisational problem is scale' },
          { lab: 'Selective', val: 'A chosen few — the organisational problem is control' },
          { lab: 'Exclusive', val: 'Almost nowhere — the organisational problem is the relationship' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The three appear in Week 3 as a planning decision about where to sell. Here the same three are ' +
             'an organising decision: each one demands a different shape of team.'
      },
      {
        id: 'i4n-3', type: 'multi', marks: 4,
        prompt: 'Organising logistics covers the physical movement and storage of goods. Which decisions does ' +
                'it include? <b>Select all that apply.</b>',
        options: [
          'Transportation — road, rail, air or sea',
          'Storage — where inventory is held and how many warehouses there are',
          'Inventory management — how much stock sits at each point in the channel',
          'Which intermediaries to appoint as distributors',
          'What the product should be priced at'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Transportation', val: 'How the product moves' },
          { lab: 'Storage', val: 'Where it waits, and in how many places' },
          { lab: 'Inventory management', val: 'How much waits at each point' },
          { lab: 'Intermediaries', val: 'A channel decision, not a logistics one' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'Appointing distributors is the closest wrong answer, because it is part of distribution — but ' +
             'it is organising the <i>channel</i>, not moving the goods along it.'
      },
      {
        id: 'i4n-4', type: 'mcq', marks: 3,
        prompt: 'A business is deciding whether to hold its stock in one central warehouse or several ' +
                'regional distribution centres. What does the module say this decision affects?',
        options: [
          'Delivery times and costs',
          'The price the product can be sold at',
          'Which intermediaries will agree to stock the product',
          'The quality of the product itself'
        ],
        answer: 0,
        solution: [
          { lab: 'The decision', val: 'How many warehouses, and where' },
          { lab: 'What it changes', val: 'Delivery times and costs' },
          { lab: 'Answer', val: 'Delivery times and costs', final: true }
        ],
        why: 'One warehouse is cheaper to run and further from most customers. That trade-off is the whole ' +
             'decision.'
      },
      {
        id: 'i4n-5', type: 'mcq', marks: 3,
        prompt: 'What does the module say goes wrong at each extreme of inventory management?',
        options: [
          'Too much stock ties up cash; too little causes stockouts and lost sales',
          'Too much stock causes stockouts; too little ties up cash',
          'Both extremes only affect delivery times, not money',
          'Neither extreme matters once a distribution channel is chosen'
        ],
        answer: 0,
        solution: [
          { lab: 'Too much', val: 'Cash tied up in stock that is not selling' },
          { lab: 'Too little', val: 'Stockouts, and the sales that go with them' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The same balance appears in Week 6 as inventory control. Here it is an organising decision — ' +
             'how much sits at each point in the channel — rather than a control one.'
      },
      {
        id: 'i4n-6', type: 'multi', marks: 4,
        prompt: 'Distribution cannot be organised by the marketing department alone. Which functions does ' +
                'the module say it must work closely with? <b>Select all that apply.</b>',
        options: [
          'Purchasing, so that raw materials for production are available',
          'Operations',
          'Finance',
          'Public relations',
          'Human resources'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Purchasing', val: 'Distribution is directly linked to the purchasing and supply chain function' },
          { lab: 'Operations', val: 'What is being distributed has to be made first' },
          { lab: 'Finance', val: 'Warehouses and transport are capital decisions' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'PR and HR are real functions that distribution touches eventually, but the three named here are ' +
             'the ones it cannot work without.'
      }
    ]
  },

  /* ═══════════════════════ OTHER ELEMENTS IN FINANCE ═══════════════════════
     Lesson 4.11. */
  {
    id: 'i4-finorg',
    title: 'More Organising in Finance',
    emoji: '🧾',
    summary: 'Who may spend what, the systems that make it consistent, and who finance talks to.',
    notes: [
      {
        heading: 'Beyond the structure itself',
        emoji: '🗃️',
        html:
          '<p>Apart from the organisational structure, the finance function has other elements to contend ' +
          'with in organising:</p>' +
          '<div class="keybox"><b>Resource allocation</b> · once the budget is set, finance directs the flow ' +
          'of money. It establishes clear rules: <b>who can approve a spending request</b>, the <b>spending ' +
          'limits</b> for department managers, and the <b>process for requesting funds</b> for a new project. ' +
          'It also ensures the money is safe and accessible.' +
          '<br><br><b>Systems and processes</b> · every financial action needs a clear process, or the ' +
          'business runs on rules that change from day to day. Finance designs and maintains them: processes ' +
          'such as submitting an expense report or getting a purchase approved; a central information or ' +
          'accounting system; and <b>standardisation</b> — one universal list of categories, so the same ' +
          'purchase made by two departments is recorded the same way.' +
          '<br><br><b>Coordination and communication</b> · finance does not work in a silo. It connects to ' +
          'every other part of the business, needs knowledge of several disciplines, and has to stay aware of ' +
          'the external business environment.</div>'
      }
    ],
    questions: [
      {
        id: 'i4o-1', type: 'multi', marks: 4,
        prompt: 'Once the budget is set, finance directs the flow of money by establishing clear rules. ' +
                'Which rules does the module name? <b>Select all that apply.</b>',
        options: [
          'Who can approve a spending request',
          'The spending limits for department managers',
          'The process for requesting funds for a new project',
          'Which suppliers each department must use',
          'How much each department is allowed to earn'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Approval', val: 'Who may say yes, and to what' },
          { lab: 'Limits', val: 'How much a manager may commit' },
          { lab: 'Requesting', val: 'How to ask for money for something new' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'All three are about <i>authority over money</i> rather than about the money itself — which is ' +
             'why resource allocation belongs to organising and not to planning.'
      },
      {
        id: 'i4o-2', type: 'mcq', marks: 3,
        prompt: 'Finance insists that every department uses the same universal list of categories, so that ' +
                'pens bought by the marketing team and pens bought by the sales team are recorded the same ' +
                'way. What is this an example of?',
        options: [
          'Standardisation',
          'Resource allocation',
          'Coordination and communication',
          'Specialisation'
        ],
        answer: 0,
        solution: [
          { lab: 'Standardisation', val: 'One universal list, so the same thing is recorded the same way' },
          { lab: 'Part of', val: 'The systems and processes finance designs and maintains' },
          { lab: 'Answer', val: 'Standardisation', final: true }
        ],
        why: 'Standardisation appears in Lesson 2 as a job design principle. This is the same idea applied to ' +
             'records rather than to tasks — consistency regardless of who does it.'
      },
      {
        id: 'i4o-3', type: 'multi', marks: 4,
        prompt: 'Which of these are the systems and processes the finance department designs and maintains? ' +
                '<b>Select all that apply.</b>',
        options: [
          'A process for submitting an expense report',
          'A process for getting a purchase approved',
          'A central information or accounting system',
          'A universal list of spending categories',
          'The advertising schedule for the year'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Processes', val: 'Expense reports, purchase approvals' },
          { lab: 'Systems', val: 'A central accounting or information system' },
          { lab: 'Standardisation', val: 'One list of categories for everyone' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'The point of all four is that a financial action should work the same way every time. A business ' +
             'without them is described as one where the traffic laws change on every journey.'
      },
      {
        id: 'i4o-4', type: 'mcq', marks: 3,
        prompt: 'Why does the module say the finance department cannot work in a silo?',
        options: [
          'Because it connects to every other part of the business, needs knowledge of several disciplines, and must stay aware of the external environment',
          'Because it does not have enough staff to work alone',
          'Because accounting rules require two departments to sign off every transaction',
          'Because finance reports to marketing rather than to top management'
        ],
        answer: 0,
        solution: [
          { lab: 'Connected to', val: 'Every other functional area' },
          { lab: 'Draws on', val: 'Several subject disciplines' },
          { lab: 'Watches', val: 'The external business environment' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Money moves through every function, so finance ends up as the one department that has to ' +
             'understand a little of what all of them do.'
      },
      {
        id: 'i4o-5', type: 'match', marks: 3,
        prompt: 'Match each element of organising in finance to what it deals with.',
        pairs: [
          { left: 'Resource allocation', right: 'Who may approve spending, and up to what limit' },
          { left: 'Systems and processes', right: 'The steps a financial action follows, every time' },
          { left: 'Coordination and communication', right: 'Finance’s connections to the other functions and to the outside world' }
        ],
        solution: [
          { lab: 'Resource allocation', val: 'Authority over money' },
          { lab: 'Systems and processes', val: 'Consistency of method' },
          { lab: 'Coordination', val: 'Everyone else' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The three answer three different questions: who decides, how it is done, and who else needs to ' +
             'know.'
      }
    ]
  },

  /* ═══════════════════════ WHERE PURCHASING SITS ═══════════════════════
     Lesson 4.15. Note this is NOT the same as 4.14, which is centralised
     against decentralised — that is about where authority sits horizontally,
     and this is about how high up the function reports. */
  {
    id: 'i4-purlevel',
    title: 'How High Purchasing Sits',
    emoji: '🪜',
    summary: 'The five factors that decide how senior the purchasing function is.',
    notes: [
      {
        heading: 'A strategic placement',
        emoji: '📌',
        html:
          '<p>A purchasing function buried inside the accounting department has a very different impact from ' +
          'one represented in the boardroom. Its <b>hierarchical level</b> reflects how strategically the ' +
          'company views its supply chain, which makes the placement of purchasing on the organisation chart ' +
          'a <b>strategic decision</b>.</p>' +
          '<div class="keybox"><b>Five factors determining the level</b>' +
          '<br><b>1. The amount of spending</b> · the more of the company’s money that flows through ' +
          'purchasing, the more important it becomes. A retailer where most costs are inventory needs a ' +
          'high-level executive reporting to the CEO; a service firm spending little may place it at an ' +
          'operational level.' +
          '<br><b>2. Supplier power</b> · when suppliers hold more power, purchasing needs more influence. ' +
          'Few supplier options, or concentrated market power, calls for high-level negotiation and strategic ' +
          'relationship management.' +
          '<br><b>3. The scale and complexity of the business</b> · purchasing needs evolve from simple buying ' +
          'to complex supply chain management as a company grows.' +
          '<br><b>4. The critical nature of what is bought</b> · the expertise a purchase demands drives the ' +
          'position. Buying paper clips is not buying custom-designed components.' +
          '<br><b>5. Top management’s perception</b> · if purchasing is seen only as a cost centre to be ' +
          'minimised it will sit low; if it is seen as a value centre, important to quality and innovation, ' +
          'it will sit higher.</div>'
      }
    ],
    questions: [
      {
        id: 'i4p-1', type: 'multi', marks: 4,
        prompt: 'Which of these determine how high the purchasing and supply function sits in the ' +
                'organisation? <b>Select all that apply.</b>',
        options: [
          'The amount of spending flowing through it',
          'Supplier power',
          'The scale and complexity of the business',
          'The critical nature of what is being purchased',
          'Top management’s perception of the function',
          'The number of years the purchasing manager has worked there'
        ],
        answers: [0, 1, 2, 3, 4],
        solution: [
          { lab: 'The five factors', val: 'Spending, supplier power, scale and complexity, criticality, and perception' },
          { lab: 'Length of service', val: 'A fact about a person, not about the function' },
          { lab: 'Answer', val: 'The first five', final: true }
        ],
        why: 'Four of the five are facts about the business. The fifth is an opinion held by top management — ' +
             'and it is listed as a determining factor just like the others.'
      },
      {
        id: 'i4p-2', type: 'mcq', marks: 3,
        prompt: 'In a large retailer, most of the company’s costs are the inventory it buys to sell. ' +
                'Which factor does this describe, and what does it imply for where purchasing sits?',
        options: [
          'The amount of spending — a high financial impact demands a high-level executive reporting to the CEO',
          'Supplier power — a retailer has many suppliers competing for its business',
          'The critical nature of what is purchased — retail goods need specialist buyers',
          'Top management’s perception — retailers traditionally value purchasing highly'
        ],
        answer: 0,
        solution: [
          { lab: 'The factor', val: 'The amount of spending flowing through purchasing' },
          { lab: 'Described as', val: 'The most straightforward of the five' },
          { lab: 'The implication', val: 'A high-level executive reporting directly to the CEO' },
          { lab: 'Answer', val: 'The amount of spending', final: true }
        ],
        why: 'It is called the most straightforward factor for a reason: the more of the company’s money ' +
             'a function controls, the harder it is to leave it low down.'
      },
      {
        id: 'i4p-3', type: 'mcq', marks: 3,
        prompt: 'A company buys custom-designed components that require the buyer to understand engineering ' +
                'and global markets. Which factor is raising the purchasing function’s level here?',
        options: [
          'The critical nature of what is being purchased — the expertise a purchase demands drives the position',
          'The amount of spending — custom components are expensive',
          'The scale and complexity of the business',
          'Supplier power'
        ],
        answer: 0,
        solution: [
          { lab: 'The factor', val: 'How critical, and how specialised, the purchase is' },
          { lab: 'The contrast drawn', val: 'Buying paper clips is not buying custom-designed components' },
          { lab: 'Answer', val: 'The critical nature of what is being purchased', final: true }
        ],
        why: 'Cost is the tempting answer and it is a different factor. What matters here is the knowledge ' +
             'the buyer needs, not the size of the invoice.'
      },
      {
        id: 'i4p-4', type: 'mcq', marks: 3,
        prompt: 'Two companies spend similar amounts on similar goods, yet one has a supply chain executive ' +
                'in top management and the other has a purchasing officer reporting to the finance manager. ' +
                'Which of the five factors best explains a difference the other four cannot?',
        options: [
          'Top management’s perception — whether purchasing is seen as a cost centre or a value centre',
          'The amount of spending',
          'Supplier power',
          'The critical nature of what is being purchased'
        ],
        answer: 0,
        solution: [
          { lab: 'Cost centre', val: 'Something to be minimised — low status' },
          { lab: 'Value centre', val: 'Important to quality and innovation — higher position' },
          { lab: 'Answer', val: 'Top management’s perception', final: true }
        ],
        why: 'The question rules out the measurable factors on purpose. When the facts are the same and the ' +
             'answer is different, what is left is what management believes.'
      },
      {
        id: 'i4p-5', type: 'mcq', marks: 3,
        prompt: 'What does the module say the hierarchical level of the purchasing function reflects?',
        options: [
          'How strategically the company views its supply chain',
          'How many people the purchasing department employs',
          'How long the company has been trading',
          'How many suppliers the company currently uses'
        ],
        answer: 0,
        solution: [
          { lab: 'The level', val: 'Where purchasing sits on the organisation chart' },
          { lab: 'What it reflects', val: 'How strategically the supply chain is viewed' },
          { lab: 'Which makes it', val: 'A strategic decision, not an administrative one' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'This is the point of the whole topic: where a function sits on a chart is a statement about how ' +
             'much the company thinks it matters.'
      },
      {
        id: 'i4p-6', type: 'mcq', marks: 3,
        prompt: 'A manufacturer has very few possible suppliers for a key input, and those suppliers hold ' +
                'concentrated market power. What does the module say this calls for?',
        options: [
          'More influence for purchasing, since high-level negotiation and strategic relationship management are needed',
          'Less influence for purchasing, since there is little choice to be made',
          'Moving purchasing into the operations department',
          'Switching from centralised to decentralised purchasing'
        ],
        answer: 0,
        solution: [
          { lab: 'The factor', val: 'Supplier power' },
          { lab: 'The rule', val: 'When suppliers hold more power, purchasing needs more influence' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The second option is the intuitive one and it is backwards. Few options does not mean little to ' +
             'decide — it means the negotiation matters more, so it needs someone more senior doing it.'
      }
    ]
  },

  /* ═══════════════════════ INSIDE THE PURCHASING DEPARTMENT ═══════════════
     Lesson 4.16. */
  {
    id: 'i4-purinternal',
    title: 'Inside the Purchasing Department',
    emoji: '🗂️',
    summary: 'Generalists or specialists, the three kinds of coordination, and cross-functional teams.',
    notes: [
      {
        heading: 'Two models',
        emoji: '⚖️',
        html:
          '<p>The <b>internal organisation of the purchasing function</b> is how tasks and responsibilities ' +
          'are divided <i>within</i> the department. There are two models (Erasmus et al., 2023):</p>' +
          '<div class="keybox"><b>The generalist model</b> (informal structure) · buyers handle whatever ' +
          'purchase requests reach them, taking a wide variety of items from start to finish. Most common in ' +
          '<b>smaller businesses</b> with lower volumes and less complex needs.' +
          '<br><br><b>The specialist model</b> (structured approach) · the team is divided by category or by ' +
          'supplier. Each buyer becomes an expert in their area and builds relationships with their own ' +
          'suppliers. Suits <b>larger businesses</b> with high spending and complex needs.</div>'
      },
      {
        heading: 'Coordination, and cross-functional teams',
        emoji: '🤝',
        html:
          '<div class="keybox"><b>Three types of coordination</b>' +
          '<br><b>Internal</b> · different buyers and teams inside the purchasing department working together' +
          '<br><b>Supplier</b> · building strong, ethical relationships with suppliers' +
          '<br><b>Cross-department</b> · working closely with finance, marketing, production and the rest</div>' +
          '<p>A <b>cross-functional sourcing team</b> brings people from different departments together on a ' +
          'specific buying project — to get diverse perspectives, encourage innovation, and make sure the ' +
          'company gets the best possible value. They are often formed for big tasks, and may even include a ' +
          'key supplier for input on ingredients or manufacturing.</p>'
      }
    ],
    questions: [
      {
        id: 'i4q-1', type: 'match', marks: 3,
        prompt: 'Match each way of organising a purchasing department to what it means.',
        pairs: [
          { left: 'The generalist model', right: 'Buyers handle whatever request reaches them, across a wide variety of items' },
          { left: 'The specialist model', right: 'The team is divided by category or supplier, and each buyer becomes an expert' },
          { left: 'A cross-functional sourcing team', right: 'People from several departments brought together for one buying project' }
        ],
        solution: [
          { lab: 'Generalist', val: 'An informal structure — everyone does everything' },
          { lab: 'Specialist', val: 'A structured approach — everyone has an area' },
          { lab: 'Cross-functional', val: 'Not a model at all, but a team formed for a task' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The first two are choices about how the department is built. The third sits across it and is ' +
             'assembled when a particular purchase needs more than purchasing knows.'
      },
      {
        id: 'i4q-2', type: 'mcq', marks: 3,
        prompt: 'A large mining company gives each buyer a specific category and lets them deal exclusively ' +
                'with the suppliers in it. Which model is this, and what kind of business does it suit?',
        options: [
          'The specialist model — larger businesses with high spending and complex purchasing needs',
          'The specialist model — smaller businesses that cannot afford many buyers',
          'The generalist model — larger businesses that need flexibility',
          'The generalist model — any business, since it is the simpler of the two'
        ],
        answer: 0,
        solution: [
          { lab: 'Specialist model', val: 'Divided by category or supplier; each buyer an expert' },
          { lab: 'Suits', val: 'Larger businesses, high spending, complex needs' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Specialising costs you flexibility and buys you expertise. That trade is only worth making once ' +
             'the volume is there to justify it.'
      },
      {
        id: 'i4q-3', type: 'mcq', marks: 3,
        prompt: 'In a small company, one buyer might order stationery one day, appoint a marketing agency the ' +
                'next, and place an order for raw steel the week after. Which model is this, and why does it ' +
                'suit the business?',
        options: [
          'The generalist model — lower purchasing volumes and less complex needs do not justify specialists',
          'The specialist model — the buyer specialises in variety',
          'The generalist model — small companies are legally required to use one buyer',
          'A cross-functional sourcing team — several kinds of purchase are involved'
        ],
        answer: 0,
        solution: [
          { lab: 'Generalist model', val: 'Jacks-of-all-trades, handling the whole process for any item' },
          { lab: 'Most common in', val: 'Smaller businesses, lower volumes, less complexity' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'It is a real choice rather than a shortcoming. Splitting one buyer into three specialists needs ' +
             'enough work to keep three specialists busy.'
      },
      {
        id: 'i4q-4', type: 'multi', marks: 4,
        prompt: 'What are the three types of coordination a purchasing department needs? ' +
                '<b>Select all that apply.</b>',
        options: [
          'Internal coordination, between buyers and teams inside the department',
          'Supplier coordination, building strong and ethical supplier relationships',
          'Cross-department coordination, with finance, marketing and production',
          'Competitor coordination, agreeing prices with rival buyers',
          'Customer coordination, letting customers choose the suppliers'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Internal', val: 'Inside the department' },
          { lab: 'Supplier', val: 'Outward, to the people it buys from' },
          { lab: 'Cross-department', val: 'Sideways, to the rest of the business' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'The fourth option is worth pausing on: agreeing prices with rival buyers is collusion, which ' +
             'the ethics topic in Week 1 rules out entirely.'
      },
      {
        id: 'i4q-5', type: 'multi', marks: 4,
        prompt: 'What is the purpose of a cross-functional sourcing team? <b>Select all that apply.</b>',
        options: [
          'To get diverse perspectives on the purchase',
          'To encourage innovation',
          'To make sure the company gets the best possible value',
          'To remove the need for a purchasing department',
          'To reduce the number of suppliers the company deals with'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Diverse perspectives', val: 'Engineering, finance and purchasing see different things' },
          { lab: 'Innovation', val: 'Which a single buyer working alone is unlikely to produce' },
          { lab: 'Best value', val: 'The point of the exercise' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'It is an addition to the purchasing department, not a replacement for it — a buyer is normally ' +
             'on the team, managing costs and contracts.'
      },
      {
        id: 'i4q-6', type: 'mcq', marks: 3,
        prompt: 'A cross-functional sourcing team is being assembled for a major new product. Who might be ' +
                'included, beyond the company’s own staff?',
        options: [
          'A key supplier, to give input on ingredients and manufacturing',
          'A competitor, to benchmark the price',
          'A customer, to approve the final specification',
          'Nobody — cross-functional means internal departments only'
        ],
        answer: 0,
        solution: [
          { lab: 'The team', val: 'People from different departments, on one buying project' },
          { lab: 'May also include', val: 'A key supplier, for input on ingredients or manufacturing' },
          { lab: 'Answer', val: 'A key supplier', final: true }
        ],
        why: 'The last option is the natural assumption from the name and it is wrong. "Cross-functional" ' +
             'describes where the members come from, not a boundary at the company gate.'
      }
    ]
  }

  ]
});
