/* INBA01-5 — Week 3: Planning.
   All four lessons: understanding planning, the planning process, planning at
   each management level, and planning in the functional areas.

   Same rules as Weeks 1 and 2: concepts only, never the analogies used to
   explain them, and nothing written that is not in Abi's notes. */

window.MODULE_CONTENT = window.MODULE_CONTENT || {};
window.MODULE_CONTENT.inba = window.MODULE_CONTENT.inba || { weeks: [], exams: [] };

window.MODULE_CONTENT.inba.weeks.push({
  id: 'inba-week3',
  number: 3,
  title: 'Planning',
  emoji: '🗓️',
  accent: 4,
  blurb: 'What planning is, the process behind it, and how it changes at every level of management.',
  topics: [

  /* ═══════════════════════ WHAT PLANNING IS ═══════════════════════ */
  {
    id: 'i3-planning',
    title: 'What Planning Is',
    emoji: '📐',
    summary: 'The definition, and the characteristics that separate a good plan from a bad one.',
    notes: [
      {
        heading: 'Definitions',
        emoji: '📖',
        html:
          '<p>In simple terms, planning is deciding <b>what</b> to do, <b>how</b> to do it, <b>when</b> to do ' +
          'it, and <b>who</b> will do it, to achieve the organisation’s objectives.</p>' +
          '<div class="keybox"><b>Planning</b> is "the process whereby objectives are formulated, and action ' +
          'plans are set in motion to reach these objectives" (Marx, Van Rooyen, Bosch &amp; Reynders, 2008).' +
          '<br><br>More fully: "Planning involves those activities of management that determine the mission and ' +
          'goals of an organisation, the ways in which these are to be accomplished, and the deployment of the ' +
          'necessary resources to realise them" (Du Toit, Erasmus and Strydom, 2008).</div>' +
          '<p>Planning therefore involves <b>forecasting</b> future conditions and charting a course of action, ' +
          'and <b>designing strategies</b> to solve current problems, prevent future ones and capitalise on new ' +
          'opportunities. Those strategies become the basis for the organisation’s goals, objectives, policies ' +
          'and procedures.</p>' +
          '<p><b>Planning connects where the organisation is now to where it wants to be in the future.</b> It ' +
          'is the foundational function from which all other management tasks flow.</p>'
      },
      {
        heading: 'Characteristics of planning',
        emoji: '✅',
        html:
          '<div class="keybox"><b>Goal-oriented</b> · the entire purpose of planning is to achieve ' +
          'organisational objectives' +
          '<br><b>Future-focused</b> · looking ahead, forecasting conditions and working out how to get there' +
          '<br><b>An intellectual process</b> · a mental exercise requiring conceptual skills — creativity, ' +
          'analytical thinking and sound judgment' +
          '<br><b>Involves choice and decision-making</b> · choosing the best path from several alternatives; ' +
          'every plan is the result of a series of decisions' +
          '<br><b>The first step</b> · it lays the foundation for organising, leading and controlling, and ' +
          'provides the framework within which they operate' +
          '<br><b>A continuous process</b> · not a once-off event' +
          '<br><b>Efficient</b> · a good plan accomplishes goals with minimum cost, effort and waste</div>'
      }
    ],
    questions: [
      {
        id: 'i3a-1', type: 'mcq', marks: 2,
        prompt: 'In simple terms, planning is deciding:',
        options: [
          'What to do, how to do it, when to do it, and who will do it',
          'How much profit the business should make this year',
          'Which employees should be promoted',
          'What the business is currently doing well'
        ],
        answer: 0,
        solution: [
          { lab: 'Planning decides', val: 'What, how, when and who' },
          { lab: 'Purpose', val: 'To achieve the organisation’s objectives' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'All four questions must be answered for a plan to be actionable. A goal without a who and a ' +
             'when is an intention rather than a plan.'
      },
      {
        id: 'i3a-2', type: 'mcq', marks: 3,
        prompt: 'Which definition of planning is given by Du Toit, Erasmus and Strydom?',
        options: [
          'The activities of management that determine the mission and goals, the ways these are accomplished, and the deployment of resources to realise them',
          'The process of monitoring activities to ensure they are accomplished as planned',
          'Determining what needs to be done, how it will be done and who is to do it',
          'Influencing employees to work towards achieving the objectives'
        ],
        answer: 0,
        solution: [
          { lab: 'Three parts', val: 'Mission and goals · how they are accomplished · deployment of resources' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The other three are the definitions of controlling, organising and leading from Week 2. All four ' +
             'functions have formal definitions and they are easy to confuse under exam pressure.'
      },
      {
        id: 'i3a-3', type: 'multi', marks: 3,
        prompt: 'Which of these are characteristics of planning? <b>Select all that apply.</b>',
        options: [
          'Goal-oriented',
          'Future-focused',
          'An intellectual process',
          'Involves choice and decision-making',
          'A once-off event completed at the start of the year'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Goal-oriented', val: 'Its whole purpose is achieving objectives' },
          { lab: 'Future-focused', val: 'Forecasting and looking ahead' },
          { lab: 'Intellectual', val: 'Requires conceptual skills, creativity and judgment' },
          { lab: 'Choice', val: 'Selecting the best path from alternatives' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'The last option contradicts one of the characteristics outright — planning is a <i>continuous ' +
             'process</i>, revisited as circumstances change.'
      },
      {
        id: 'i3a-4', type: 'mcq', marks: 2,
        prompt: 'Why is planning described as <b>the first step</b>?',
        options: [
          'It lays the foundation for organising, leading and controlling, and provides the framework they operate within',
          'It is the easiest of the four management functions',
          'It is the only function performed by top management',
          'It must be completed before the business is registered'
        ],
        answer: 0,
        solution: [
          { lab: 'Planning', val: 'The foundational function from which all other management tasks flow' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'This is the same dependency seen in Week 2: you cannot organise around a goal that does not yet ' +
             'exist, nor control results against a plan that was never made.'
      },
      {
        id: 'i3a-5', type: 'mcq', marks: 2,
        prompt: 'Which skill does planning particularly require, as an intellectual process?',
        options: [
          'Conceptual skills',
          'Technical skills',
          'Human skills',
          'No particular skill'
        ],
        answer: 0,
        solution: [
          { lab: 'An intellectual process', val: 'A mental exercise requiring creativity, analytical thinking and sound judgment' },
          { lab: 'The skill', val: 'Conceptual' },
          { lab: 'Answer', val: 'Conceptual skills', final: true }
        ],
        why: 'It connects directly to Week 2: conceptual skill is thinking about abstract and complex ' +
             'situations, which is exactly what forecasting an unknown future demands.'
      },
      {
        id: 'i3a-6', type: 'mcq', marks: 2,
        prompt: 'What does planning connect?',
        options: [
          'Where the organisation is now to where it wants to be in the future',
          'The employees to the shareholders',
          'The business to its suppliers',
          'One department to another'
        ],
        answer: 0,
        solution: [
          { lab: 'Planning connects', val: 'The present position to the desired future position' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'That is why forecasting matters so much to it — the destination lies in a future nobody can ' +
             'observe directly.'
      }
    ]
  },

  /* ═══════════════════════ BENEFITS AND LIMITATIONS ═══════════════════════ */
  {
    id: 'i3-value',
    title: 'Benefits & Limitations of Planning',
    emoji: '⚖️',
    summary: 'Ten reasons to plan, and seven reasons it can go wrong.',
    notes: [
      {
        heading: 'Benefits',
        emoji: '👍',
        html:
          '<p>Without planning, efforts become disjointed, resources are wasted, and the organisation drifts ' +
          'without direction. Planning is what makes organising, leading and controlling effective and ' +
          'efficient.</p>' +
          '<div class="keybox"><b>Provides direction</b> · <b>Promotes coordination</b> · <b>Encourages ' +
          'innovation and technological awareness</b> · <b>Ensures cohesion</b> · <b>Promotes stability</b> · ' +
          '<b>Minimises uncertainty</b> · <b>Improves employee morale</b> · <b>Achieves economies</b> · ' +
          '<b>Facilitates control</b> · <b>Provides a competitive edge</b></div>'
      },
      {
        heading: 'Limitations',
        emoji: '👎',
        html:
          '<p>Planning can be time-consuming, costly and rigid. The common disadvantages are:</p>' +
          '<div class="keybox"><b>Rigidity</b> · poorly managed plans stifle creativity and discourage ' +
          'employees from taking initiative' +
          '<br><b>Misdirected planning</b> · ineffective leadership can produce plans serving personal agendas ' +
          'rather than the organisation’s real needs' +
          '<br><b>Time-consuming</b> · gathering and analysing data is slow, and the environment may change ' +
          'before the plan is even finished' +
          '<br><b>Uncertainty</b> · plans rest on forecasts, and forecasts can be wrong' +
          '<br><b>False sense of security</b> · an elaborate plan can create complacency and cause missed ' +
          'opportunities' +
          '<br><b>Costly</b> · the golden rule is that <b>the cost of planning should never exceed its ' +
          'benefits</b>' +
          '<br><b>The trap of in-process planning</b> · planning on the fly, working out the next step just ' +
          'before it is needed. The consequences of poor in-process planning are usually far greater than the ' +
          'effort of preplanning</div>'
      }
    ],
    questions: [
      {
        id: 'i3b-1', type: 'multi', marks: 3,
        prompt: 'Which of these are benefits of planning? <b>Select all that apply.</b>',
        options: [
          'Provides direction',
          'Promotes coordination',
          'Minimises uncertainty',
          'Facilitates control',
          'Guarantees the forecast will be correct'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Direction, coordination', val: 'Efforts pull the same way rather than becoming disjointed' },
          { lab: 'Minimises uncertainty', val: 'Reduces it — it cannot remove it' },
          { lab: 'Facilitates control', val: 'You cannot measure results without a plan to measure against' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Planning <i>minimises</i> uncertainty but never removes it — which is exactly why uncertainty ' +
             'also appears in the list of limitations.'
      },
      {
        id: 'i3b-2', type: 'mcq', marks: 2,
        prompt: 'What is the "golden rule" regarding the cost of planning?',
        options: [
          'The cost of planning should never exceed its benefits',
          'Planning should always be done as cheaply as possible',
          'Planning costs should be a fixed percentage of revenue',
          'Planning should be free, since managers are already paid'
        ],
        answer: 0,
        solution: [
          { lab: 'Costly', val: 'Data collection, analysis and the process itself can be expensive' },
          { lab: 'The golden rule', val: 'The cost of planning should never exceed its benefits' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'It is not an argument against planning but against over-planning: past a point, more analysis ' +
             'costs more than the better decision is worth.'
      },
      {
        id: 'i3b-3', type: 'match', marks: 4,
        prompt: 'Match each limitation of planning to what it means.',
        pairs: [
          { left: 'Rigidity', right: 'Stifles creativity and discourages employees from taking initiative' },
          { left: 'Misdirected planning', right: 'Plans serve personal agendas rather than the organisation’s needs' },
          { left: 'False sense of security', right: 'An elaborate plan creates complacency and missed opportunities' },
          { left: 'In-process planning', right: 'Planning on the fly, working out the next step just before it is needed' }
        ],
        solution: [
          { lab: 'Rigidity', val: 'The plan becomes a cage' },
          { lab: 'Misdirected', val: 'The wrong goals, pursued competently' },
          { lab: 'False security', val: 'Preparedness mistaken for certainty' },
          { lab: 'In-process', val: 'Deciding too late to decide well' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'Rigidity and in-process planning are opposite failures — one plans too tightly, the other barely ' +
             'plans at all, and both cost more than planning properly would have.'
      },
      {
        id: 'i3b-4', type: 'multi', marks: 3,
        prompt: 'Which of these are limitations of planning? <b>Select all that apply.</b>',
        options: [
          'It can be time-consuming',
          'It can be costly',
          'It relies on forecasts that may be wrong',
          'It removes the need for management judgement'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Time-consuming', val: 'The environment may change before the plan is finished' },
          { lab: 'Costly', val: 'Data collection and analysis are expensive' },
          { lab: 'Uncertainty', val: 'Forecasts about an unknown future can be wrong' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'Planning requires <i>more</i> judgement, not less — it is described as an intellectual process ' +
             'demanding creativity and sound judgment.'
      },
      {
        id: 'i3b-5', type: 'mcq', marks: 3,
        prompt: 'Why is <b>in-process planning</b> described as risky?',
        options: [
          'The consequences of doing it poorly are usually far greater than the effort of preplanning',
          'It costs more money than formal planning',
          'It requires more staff than formal planning',
          'It cannot be used in small businesses'
        ],
        answer: 0,
        solution: [
          { lab: 'In-process planning', val: 'Working out the next step just before it is needed' },
          { lab: 'The risk', val: 'Its consequences usually outweigh the effort preplanning would have taken' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'It is a false economy: the time apparently saved by not planning is paid back with interest when ' +
             'something goes wrong that planning would have anticipated.'
      }
    ]
  },

  /* ═══════════════════════ THE PLANNING PROCESS ═══════════════════════ */
  {
    id: 'i3-process',
    title: 'The Planning Process',
    emoji: '🔄',
    summary: 'A three-step cycle, and the five-step process underneath it.',
    notes: [
      {
        heading: 'The three-step planning cycle',
        emoji: '3️⃣',
        html:
          '<div class="keybox"><b>1. Setting goals</b> · formulate clear, specific goals based on the ' +
          'organisation’s mission. <i>Where do we want to go?</i>' +
          '<br><b>2. Developing action plans</b> · consider the organisation’s context and choose between ' +
          'alternative plans of action. <i>How will we get there?</i>' +
          '<br><b>3. Implementing plans</b> · execute the chosen plan through the rest of the management ' +
          'process</div>' +
          '<p>Planning is not a once-off event but a <b>continuous loop</b>. After implementing, results are ' +
          'monitored and the feedback sends you back to set new goals or adjust the action plan.</p>'
      },
      {
        heading: 'The five-step planning process',
        emoji: '5️⃣',
        html:
          '<div class="keybox"><b>Step 1 · Developing awareness</b> — an honest audit of current status, ' +
          'commitments, strengths and weaknesses. Auditing resources, capabilities and performance; examining ' +
          'the external environment for opportunities and threats; recognising past decisions and obligations ' +
          'that constrain future action.' +
          '<br><br><b>Step 2 · Establishing outcome statements</b> — setting goals, in one of three ways ' +
          '(below).' +
          '<br><br><b>Step 3 · Premising</b> — identifying and writing down the assumptions the plan rests on, ' +
          'so they can be monitored and the plan adjusted if they prove false. The quality of a plan depends on ' +
          'the quality and validity of its premises.' +
          '<br><br><b>Step 4 · Determining a course of action</b> — generating alternatives, evaluating them ' +
          'on cost, risk, resources and fit with organisational values, then selecting one and specifying ' +
          'what, how, when and who.' +
          '<br><br><b>Step 5 · Formulating supportive plans</b> — a major plan needs a network of smaller ' +
          'derivative plans to succeed. The overarching plan cannot stand alone.</div>'
      },
      {
        heading: 'Three approaches to setting outcomes',
        emoji: '🎯',
        html:
          '<div class="keybox"><b>Goal planning</b> · setting specific, measurable, achievable, relevant and ' +
          'time-bound (SMART) objectives. Goals are formulated first and action statements derived from them, ' +
          'creating a hierarchy from corporate to departmental level.' +
          '<br><br><b>Domain / directional planning</b> · choosing a general direction when things are ' +
          'uncertain, without initially specifying precise goals. Ideal in high uncertainty, when stakeholders ' +
          'disagree on specific goals, or during start-up or transition.' +
          '<br><br><b>Hybrid planning</b> · begins with directional planning and transitions into goal ' +
          'planning as knowledge accumulates and uncertainty decreases.</div>'
      }
    ],
    questions: [
      {
        id: 'i3c-1', type: 'match', marks: 3,
        prompt: 'Match each step of the three-step planning cycle to what happens in it.',
        pairs: [
          { left: 'Setting goals', right: 'Formulating clear goals based on the organisation’s mission' },
          { left: 'Developing action plans', right: 'Choosing between alternative plans of action to reach the goals' },
          { left: 'Implementing plans', right: 'Executing the plan through the rest of the management process' }
        ],
        solution: [
          { lab: 'Step 1', val: 'Where do we want to go?' },
          { lab: 'Step 2', val: 'How will we get there?' },
          { lab: 'Step 3', val: 'Putting it into effect' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The cycle does not end at step 3 — results are monitored and the feedback returns you to step 1 ' +
             'or 2, which is what makes an organisation responsive.'
      },
      {
        id: 'i3c-2', type: 'mcq', marks: 2,
        prompt: 'What is the <b>first</b> step of the five-step planning process?',
        options: [
          'Developing awareness',
          'Establishing outcome statements',
          'Premising',
          'Determining a course of action'
        ],
        answer: 0,
        solution: [
          { lab: 'Step 1', val: 'Developing awareness — an honest audit of the present position' },
          { lab: 'Why first', val: 'You need a precise understanding of the present before mapping the future' },
          { lab: 'Answer', val: 'Developing awareness', final: true }
        ],
        why: 'Goals come second, not first. Setting a destination before knowing your starting point is how ' +
             'plans become unachievable.'
      },
      {
        id: 'i3c-3', type: 'mcq', marks: 3,
        prompt: 'What is <b>premising</b>?',
        options: [
          'Identifying and writing down the assumptions a plan rests on, so they can be monitored',
          'Choosing between alternative courses of action',
          'Deciding where the business will be located',
          'Setting the specific measurable goals of the plan'
        ],
        answer: 0,
        solution: [
          { lab: 'Premising', val: 'Identifying the assumptions the plan is built on' },
          { lab: 'Why it matters', val: 'A plan is only as good as the quality and validity of its premises' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Assumptions are not static. Writing them down is what allows them to be monitored and the plan ' +
             'adjusted when one turns out to be false.'
      },
      {
        id: 'i3c-4', type: 'match', marks: 3,
        prompt: 'Match each approach to establishing outcome statements to its description.',
        pairs: [
          { left: 'Goal planning', right: 'Setting specific SMART objectives and deriving action statements from them' },
          { left: 'Domain / directional planning', right: 'Choosing a general direction without initially specifying precise goals' },
          { left: 'Hybrid planning', right: 'Beginning directional, then moving to goal planning as uncertainty decreases' }
        ],
        solution: [
          { lab: 'Goal planning', val: 'Precise from the start' },
          { lab: 'Directional', val: 'A general domain, chosen under uncertainty' },
          { lab: 'Hybrid', val: 'Directional first, precise later' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'Directional planning suits high uncertainty, stakeholder disagreement, or a start-up or ' +
             'transition — situations where committing to a precise number would be false precision.'
      },
      {
        id: 'i3c-5', type: 'multi', marks: 3,
        prompt: 'What happens at <b>Step 4, determining a course of action</b>? <b>Select all that apply.</b>',
        options: [
          'Generating alternatives by brainstorming and research',
          'Evaluating alternatives on cost, risk and resource requirements',
          'Selecting the best course and specifying what, how, when and who',
          'Auditing the organisation’s current resources and performance'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Generate', val: 'Different ways to achieve the stated goals' },
          { lab: 'Evaluate', val: 'On cost, risk, resources and alignment with values' },
          { lab: 'Select', val: 'And specify what, how, when and who' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'Auditing current resources belongs to Step 1, developing awareness — it has already happened by ' +
             'the time alternatives are being weighed.'
      },
      {
        id: 'i3c-6', type: 'mcq', marks: 2,
        prompt: 'Why does a major plan need <b>supportive plans</b>?',
        options: [
          'The overarching plan cannot stand alone and needs a network of derivative plans to succeed',
          'Because supportive plans replace the main plan if it fails',
          'Because each department must write its own version of the same plan',
          'Because supportive plans are legally required'
        ],
        answer: 0,
        solution: [
          { lab: 'Step 5', val: 'Formulating supportive plans' },
          { lab: 'The point', val: 'A major plan requires derivative plans to be executed successfully' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Launching a product needs a marketing plan, a hiring plan and a budget plan alongside it. The ' +
             'main plan describes the destination; the supportive plans make it reachable.'
      }
    ]
  },

  /* ═══════════════════════ THE LINK TO CONTROL ═══════════════════════ */
  {
    id: 'i3-control',
    title: 'The Link to Control',
    emoji: '🔁',
    summary: 'Why planning and control are two sides of one coin, and the Deming cycle.',
    notes: [
      {
        heading: 'Planning and control',
        emoji: '🪙',
        html:
          '<p>In both the three-step and five-step processes, planning does not end at implementation. The ' +
          '<b>control</b> function — monitoring results — feeds directly back into planning. They are two sides ' +
          'of the same coin.</p>' +
          '<p>If a deviation from the plan is spotted, that feedback is used to adjust the goals or the ' +
          'actions, starting the process again. This creates a cycle of <b>continuous improvement</b>.</p>'
      },
      {
        heading: 'The Deming cycle',
        emoji: '♻️',
        html:
          '<div class="keybox"><b>Plan</b> · develop the plan using the five-step process' +
          '<br><b>Do</b> · implement the plan and its supportive plans' +
          '<br><b>Check (control)</b> · monitor ongoing activities and results, comparing them against the ' +
          'goals and standards established during planning' +
          '<br><b>Act</b> · take corrective action based on the feedback — adapting the plan, modifying goals ' +
          'or changing processes, which feeds back into Plan and restarts the cycle</div>'
      }
    ],
    questions: [
      {
        id: 'i3d-1', type: 'match', marks: 4,
        prompt: 'Match each stage of the Deming cycle to what happens in it.',
        pairs: [
          { left: 'Plan', right: 'Develop the plan using the five-step process' },
          { left: 'Do', right: 'Implement the plan and its supportive plans' },
          { left: 'Check', right: 'Monitor results against the goals and standards set during planning' },
          { left: 'Act', right: 'Take corrective action, which feeds back into planning' }
        ],
        solution: [
          { lab: 'Plan', val: 'Develop it' },
          { lab: 'Do', val: 'Implement it' },
          { lab: 'Check', val: 'Compare results against the plan — this is the control function' },
          { lab: 'Act', val: 'Correct, adapt, and restart the cycle' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'Act is the stage people skip. Checking results without acting on them produces reports rather ' +
             'than improvement, and the cycle never closes.'
      },
      {
        id: 'i3d-2', type: 'mcq', marks: 2,
        prompt: 'Which stage of the Deming cycle corresponds to the <b>control</b> function?',
        options: ['Check', 'Plan', 'Do', 'Act'],
        answer: 0,
        solution: [
          { lab: 'Check', val: 'Monitoring activities and results against the goals and standards' },
          { lab: 'Answer', val: 'Check', final: true }
        ],
        why: 'Control is measurement against a standard, and the standard was set during planning — which is ' +
             'exactly why the two functions cannot be separated.'
      },
      {
        id: 'i3d-3', type: 'mcq', marks: 3,
        prompt: 'How do planning and control relate to one another?',
        options: [
          'Control feeds back into planning, creating a cycle of continuous improvement',
          'Control replaces planning once a plan is implemented',
          'They are performed by different levels of management and do not interact',
          'Planning happens yearly and control happens only when something goes wrong'
        ],
        answer: 0,
        solution: [
          { lab: 'Control', val: 'Monitors results and detects deviation from the plan' },
          { lab: 'That feedback', val: 'Adjusts the goals or actions, restarting the process' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Described as two sides of the same coin. Without a plan there is no standard to control against, ' +
             'and without control nobody learns whether the plan worked.'
      },
      {
        id: 'i3d-4', type: 'mcq', marks: 2,
        prompt: 'What happens at the <b>Act</b> stage of the Deming cycle?',
        options: [
          'Corrective action is taken — adapting the plan, modifying goals or changing processes',
          'The plan is written for the first time',
          'The plan is implemented',
          'Results are measured against the standard'
        ],
        answer: 0,
        solution: [
          { lab: 'Act', val: 'Corrective action based on the feedback from Check' },
          { lab: 'Then', val: 'It feeds directly back into Plan, restarting the cycle' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The other three options are Plan, Do and Check. Knowing the order matters as much as knowing ' +
             'the four names.'
      },
      {
        id: 'i3d-5', type: 'mcq', marks: 2,
        prompt: 'What does the feedback loop in the planning process create?',
        options: [
          'A cycle of continuous improvement',
          'A permanent, unchangeable plan',
          'A reduction in the need for management',
          'A guarantee that goals will be met'
        ],
        answer: 0,
        solution: [
          { lab: 'The loop', val: 'Deviation is spotted, goals or actions are adjusted, the process restarts' },
          { lab: 'Answer', val: 'A cycle of continuous improvement', final: true }
        ],
        why: 'This is why planning is described as a continuous process rather than a document produced once ' +
             'a year and filed.'
      }
    ]
  },

  /* ═══════════════════════ SMART GOALS ═══════════════════════ */
  {
    id: 'i3-smart',
    title: 'SMART Goals',
    emoji: '🎯',
    summary: 'The five criteria any effective goal must meet, at any level.',
    notes: [
      {
        heading: 'Why vague goals fail',
        emoji: '❓',
        html:
          '<p>Goals like "we need to improve customer satisfaction" or "we must increase sales" are useless, ' +
          'because they are too vague to act on and there is no way to know whether they have been achieved.</p>' +
          '<p>SMART is the framework for the criteria any goal should meet to be effective, <b>regardless of ' +
          'the level it is set at</b>.</p>'
      },
      {
        heading: 'The five criteria',
        emoji: '⭐',
        html:
          '<div class="keybox"><b>S — Specific</b> · clear and focused. What exactly do you want to achieve? ' +
          'The who, what, where and why.' +
          '<br><b>M — Measurable</b> · you must be able to track progress. How will you know it is done?' +
          '<br><b>A — Achievable</b> · realistic given your resources and time. Can it be done?' +
          '<br><b>R — Relevant</b> · aligned with broader objectives. Does it make sense?' +
          '<br><b>T — Time-bound</b> · set a deadline to stay on track. When will it be achieved?</div>'
      }
    ],
    questions: [
      {
        id: 'i3e-1', type: 'multi', marks: 3,
        prompt: 'What do the letters of <b>SMART</b> stand for? <b>Select all that apply.</b>',
        options: [
          'Specific',
          'Measurable',
          'Achievable',
          'Relevant',
          'Time-bound',
          'Strategic'
        ],
        answers: [0, 1, 2, 3, 4],
        solution: [
          { lab: 'SMART', val: 'Specific, Measurable, Achievable, Relevant, Time-bound' },
          { lab: 'Strategic', val: 'A level of planning, not a SMART criterion' },
          { lab: 'Answer', val: 'The first five', final: true }
        ],
        why: 'Strategic is the tempting sixth, because it appears constantly elsewhere in this week. It is a ' +
             'planning level, not a test of whether a goal is well written.'
      },
      {
        id: 'i3e-2', type: 'match', marks: 5,
        prompt: 'Match each SMART criterion to the question it asks.',
        pairs: [
          { left: 'Specific', right: 'What exactly do you want to achieve?' },
          { left: 'Measurable', right: 'How will you know it is done?' },
          { left: 'Achievable', right: 'Can it be done with the resources and time available?' },
          { left: 'Relevant', right: 'Does it align with broader objectives?' },
          { left: 'Time-bound', right: 'When will it be achieved?' }
        ],
        solution: [
          { lab: 'Specific', val: 'Clear and focused' },
          { lab: 'Measurable', val: 'Progress can be tracked' },
          { lab: 'Achievable', val: 'Realistic given resources and time' },
          { lab: 'Relevant', val: 'Aligned with the wider objectives' },
          { lab: 'Time-bound', val: 'Has a deadline' },
          { lab: 'Answer', val: 'All five rows as above', final: true }
        ],
        why: 'Measurable and time-bound are the two most often left out, and they are the two that make a ' +
             'goal checkable — without them nobody can say whether it was met.'
      },
      {
        id: 'i3e-3', type: 'mcq', marks: 2,
        prompt: 'Why is a goal such as "improve customer satisfaction" described as useless?',
        options: [
          'It is too vague to act on, and there is no way to know whether it has been achieved',
          'Customer satisfaction cannot be improved',
          'It belongs to the marketing department only',
          'It is too ambitious for one year'
        ],
        answer: 0,
        solution: [
          { lab: 'The problem', val: 'Too vague to act on' },
          { lab: 'And', val: 'No way to tell whether it was achieved' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'It fails at least Specific, Measurable and Time-bound at once, which is why nobody could act on ' +
             'it or report on it.'
      },
      {
        id: 'i3e-4', type: 'mcq', marks: 2,
        prompt: 'At which level of management does the SMART framework apply?',
        options: [
          'Any level — it applies regardless of the level the goal is set at',
          'Top management only',
          'Middle management only',
          'First-line management only'
        ],
        answer: 0,
        solution: [
          { lab: 'SMART', val: 'The criteria any goal should meet to be effective' },
          { lab: 'Applies', val: 'Regardless of the level it is set at' },
          { lab: 'Answer', val: 'Any level', final: true }
        ],
        why: 'The <i>content</i> of a goal changes enormously between levels. The test of whether it is well ' +
             'written does not.'
      },
      {
        id: 'i3e-5', type: 'mcq', marks: 3,
        scenario: 'A goal reads: "Reduce customer wait time on the support line."',
        prompt: 'Which SMART criteria does this goal still fail?',
        options: [
          'Measurable and time-bound',
          'Specific and relevant',
          'Achievable and relevant',
          'It meets all five criteria'
        ],
        answer: 0,
        solution: [
          { lab: 'Specific', val: 'Met — it names the wait time on the support line' },
          { lab: 'Measurable', val: 'Failed — by how much?' },
          { lab: 'Time-bound', val: 'Failed — by when?' },
          { lab: 'Answer', val: 'Measurable and time-bound', final: true }
        ],
        why: 'Making a goal specific is the easy half. Attaching a number and a deadline is what turns it into ' +
             'something anyone can be held to.'
      }
    ]
  },

  /* ═══════════════════════ HIERARCHY OF GOALS ═══════════════════════ */
  {
    id: 'i3-hierarchy',
    title: 'The Hierarchy of Goals',
    emoji: '🔺',
    summary: 'Strategic, tactical and operational goals — who sets each, and how they differ.',
    notes: [
      {
        heading: 'Three levels of goal',
        emoji: '🪜',
        html:
          '<div class="keybox"><b>Strategic goals</b> · decided on by <b>top management</b>, applicable to the ' +
          'organisation as a whole. Includes the vision, mission and long-term goals.' +
          '<br><br><b>Tactical goals</b> · decided on by <b>middle management</b>, applied to functional ' +
          'divisions. Break strategic goals into actionable plans for each department.' +
          '<br><br><b>Operational goals</b> · decided on by <b>first-level management</b>, applied to ' +
          'supervisory and individual employees. The daily, weekly and monthly tasks that bring tactical goals ' +
          'to life.</div>' +
          '<p>It is a pyramid where every level supports the one above it, so that everyone from the intern to ' +
          'the CEO is moving in the same direction intentionally rather than accidentally.</p>'
      },
      {
        heading: 'Comparing the three',
        emoji: '📊',
        html:
          '<div class="keybox"><b>Time frame</b> · Strategic: long-term (3–10 years) · Tactical: medium-term ' +
          '(1–3 years) · Operational: short-term (under 1 year)' +
          '<br><br><b>Scope</b> · Strategic: broad, organisation-wide, general · Tactical: more specific, ' +
          'departmental or functional · Operational: very specific, concrete, task-oriented' +
          '<br><br><b>Main question</b> · Strategic: <i>Where are we going?</i> · Tactical: <i>How will we get ' +
          'there, by department?</i> · Operational: <i>What do I do today?</i>' +
          '<br><br><b>Uncertainty</b> · Strategic: high · Tactical: moderate · Operational: low — it deals with ' +
          'the predictable here-and-now</div>'
      }
    ],
    questions: [
      {
        id: 'i3f-1', type: 'match', marks: 3,
        prompt: 'Match each type of goal to who decides it.',
        pairs: [
          { left: 'Strategic goals', right: 'Top management' },
          { left: 'Tactical goals', right: 'Middle management' },
          { left: 'Operational goals', right: 'First-level management' }
        ],
        solution: [
          { lab: 'Strategic', val: 'Applicable to the organisation as a whole' },
          { lab: 'Tactical', val: 'Applied to functional divisions' },
          { lab: 'Operational', val: 'Applied to supervisory and individual employees' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The hierarchy of goals maps exactly onto the levels of management from Week 2 — the same ladder ' +
             'viewed from the goal-setting side.'
      },
      {
        id: 'i3f-2', type: 'match', marks: 3,
        prompt: 'Match each level of goal to its time frame.',
        pairs: [
          { left: 'Strategic goals', right: 'Long-term — 3 to 10 years' },
          { left: 'Tactical goals', right: 'Medium-term — 1 to 3 years' },
          { left: 'Operational goals', right: 'Short-term — under 1 year' }
        ],
        solution: [
          { lab: 'Strategic', val: '3 to 10 years' },
          { lab: 'Tactical', val: '1 to 3 years' },
          { lab: 'Operational', val: 'Less than a year' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The horizons overlap slightly at their edges, which is why the deciding level and the scope ' +
             'matter as much as the number of years.'
      },
      {
        id: 'i3f-3', type: 'match', marks: 3,
        prompt: 'Match each level of goal to the main question it answers.',
        pairs: [
          { left: 'Strategic goals', right: 'Where are we going?' },
          { left: 'Tactical goals', right: 'How will we get there, by department?' },
          { left: 'Operational goals', right: 'What do I do today?' }
        ],
        solution: [
          { lab: 'Strategic', val: 'Direction for the whole organisation' },
          { lab: 'Tactical', val: 'The route, department by department' },
          { lab: 'Operational', val: 'The task in front of you now' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The three questions narrow from the organisation, to the department, to the individual — which ' +
             'is the whole point of a hierarchy.'
      },
      {
        id: 'i3f-4', type: 'mcq', marks: 3,
        prompt: 'Which level of goal carries the <b>highest uncertainty</b>?',
        options: [
          'Strategic — it looks furthest into the future',
          'Tactical — it must satisfy two other levels',
          'Operational — daily work changes most often',
          'All three carry equal uncertainty'
        ],
        answer: 0,
        solution: [
          { lab: 'Strategic', val: 'High uncertainty' },
          { lab: 'Tactical', val: 'Moderate' },
          { lab: 'Operational', val: 'Low — it deals with the predictable here-and-now' },
          { lab: 'Answer', val: 'Strategic', final: true }
        ],
        why: 'Uncertainty rises with the time horizon. Forecasting ten years out is a very different exercise ' +
             'from scheduling tomorrow morning.'
      },
      {
        id: 'i3f-5', type: 'multi', marks: 3,
        prompt: 'Which of these describe <b>operational goals</b>? <b>Select all that apply.</b>',
        options: [
          'Highly specific, concrete and task-oriented',
          'Short-term — under a year',
          'Set by first-level management',
          'Broad and applicable to the organisation as a whole'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Specific and concrete', val: 'Focused on individual tasks, processes and resources' },
          { lab: 'Short-term', val: 'Daily, weekly and monthly' },
          { lab: 'First-level management', val: 'Team leaders and supervisors' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'The last option describes strategic goals. Broad and organisation-wide is precisely what ' +
             'operational goals are not.'
      },
      {
        id: 'i3f-6', type: 'mcq', marks: 2,
        prompt: 'What is the purpose of a hierarchy of goals?',
        options: [
          'To ensure everyone in the organisation is moving in the same direction intentionally',
          'To ensure senior managers are paid more than junior ones',
          'To separate the departments from one another',
          'To reduce the number of goals a business sets'
        ],
        answer: 0,
        solution: [
          { lab: 'The pyramid', val: 'Every level supports the one above it' },
          { lab: 'The result', val: 'Everyone from the intern to the CEO pulls the same way' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Without it, alignment happens only by accident — a CEO, a sales team and an intern can all work ' +
             'hard on entirely unconnected things.'
      }
    ]
  },

  /* ═══════════════════════ STRATEGIC PLANNING ═══════════════════════ */
  {
    id: 'i3-strategic',
    title: 'Strategic Planning',
    emoji: '🧭',
    summary: 'Long-term plans, the areas they cover, and the four factors that shape them.',
    notes: [
      {
        heading: 'Strategic plans',
        emoji: '🏔️',
        html:
          '<p>Strategic plans are developed by <b>top management</b> to accomplish the mission of the ' +
          'organisation. They are also known as <b>long-term plans</b>, and normally span <b>three to five ' +
          'years or more</b>, depending on the industry.</p>' +
          '<p>Once the mission is clear, top management sets strategic goals covering big areas:</p>' +
          '<div class="keybox"><b>Profitability</b> · <b>Market share</b> (competitive position) · ' +
          '<b>Technological leadership</b> · <b>Social responsibility</b></div>' +
          '<p>Strategic goals should be <b>very specific</b>, because the tactical goals are derived from ' +
          'them.</p>'
      },
      {
        heading: 'Four factors influencing strategic goals',
        emoji: '🧲',
        html:
          '<div class="keybox"><b>The mission statement</b> · directs the strategic goals' +
          '<br><br><b>The business environment</b> · the uncertain, complex and unpredictable world the ' +
          'organisation operates in. Goals must adapt to environmental trends such as new technology and ' +
          'market shifts — the external half of a SWOT analysis, from the macro environment.' +
          '<br><br><b>Management values</b> · the shared beliefs of top management about what is good, right ' +
          'and important. They become the ethical compass of the company and dictate how goals are pursued and ' +
          'the ethical boundaries within which they are set.' +
          '<br><br><b>Management experience</b> · the collective knowledge and past experience of the ' +
          'management team, which informs goal-setting with practical insight.</div>'
      }
    ],
    questions: [
      {
        id: 'i3g-1', type: 'multi', marks: 3,
        prompt: 'Which factors influence an organisation’s strategic goals? <b>Select all that apply.</b>',
        options: [
          'The mission statement',
          'The business environment',
          'Management values',
          'Management experience',
          'The number of employees'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Mission statement', val: 'Directs the strategic goals' },
          { lab: 'Business environment', val: 'Goals must adapt to environmental trends' },
          { lab: 'Management values', val: 'The ethical compass — how goals are pursued' },
          { lab: 'Management experience', val: 'Practical insight from past careers' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Two of the four are internal to the management team — its values and its experience — which is ' +
             'why two organisations in the same industry can set very different goals.'
      },
      {
        id: 'i3g-2', type: 'multi', marks: 3,
        prompt: 'Which big areas do strategic goals typically cover? <b>Select all that apply.</b>',
        options: [
          'Profitability',
          'Market share or competitive position',
          'Technological leadership',
          'Social responsibility',
          'The weekly staff roster'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'The four areas', val: 'Profitability, market share, technological leadership, social responsibility' },
          { lab: 'The roster', val: 'Operational — daily and task-oriented' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'All four are organisation-wide and long-term, which is what makes them strategic rather than ' +
             'departmental concerns.'
      },
      {
        id: 'i3g-3', type: 'mcq', marks: 2,
        prompt: 'What timeframe do strategic plans normally span?',
        options: [
          'Three to five years or more, depending on the industry',
          'One to three years',
          'Less than twelve months',
          'Exactly ten years in every industry'
        ],
        answer: 0,
        solution: [
          { lab: 'Strategic plans', val: 'Also known as long-term plans' },
          { lab: 'Timeframe', val: 'Normally three to five years or more, varying by organisation and industry' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'It varies by industry for good reason — a software company and a mining company face completely ' +
             'different planning horizons.'
      },
      {
        id: 'i3g-4', type: 'mcq', marks: 3,
        prompt: 'Why should strategic goals be <b>very specific</b>?',
        options: [
          'Because the tactical goals are derived from them',
          'Because they are legally binding on the company',
          'Because top management is judged on them personally',
          'Because they must be published to shareholders'
        ],
        answer: 0,
        solution: [
          { lab: 'The reason', val: 'Tactical goals are derived from the strategic goals' },
          { lab: 'Consequence', val: 'A vague strategic goal cannot be broken into workable departmental ones' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Vagueness compounds downwards. If the strategic goal is unclear, every tactical and operational ' +
             'goal beneath it inherits that fog.'
      },
      {
        id: 'i3g-5', type: 'mcq', marks: 3,
        prompt: 'What are <b>management values</b>, as a factor influencing strategic goals?',
        options: [
          'The shared beliefs of top management about what is good, right and important',
          'The monetary worth of the management team’s shareholding',
          'The salaries paid to senior managers',
          'The qualifications held by the management team'
        ],
        answer: 0,
        solution: [
          { lab: 'Management values', val: 'Shared beliefs about what is good, right and important' },
          { lab: 'Their effect', val: 'The ethical compass — they dictate how goals are pursued' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Values set the ethical boundaries within which goals are chosen, which links this directly back ' +
             'to business ethics in Week 1.'
      }
    ]
  },

  /* ═══════════════════════ TACTICAL AND OPERATIONAL ═══════════════════════ */
  {
    id: 'i3-tacop',
    title: 'Tactical & Operational Planning',
    emoji: '🛠️',
    summary: 'Breaking strategy into departmental plans, and those into daily work.',
    notes: [
      {
        heading: 'Tactical planning',
        emoji: '📋',
        html:
          '<p><b>Tactical planning</b> is the process of breaking down the broad, long-term strategic plan into ' +
          'distinct, medium to short-term plans for specific departments or units. It is done by <b>middle ' +
          'management</b> — typically department heads and regional managers.</p>' +
          '<p>Tactical goals are also called <b>functional goals</b>, because the planning takes place in the ' +
          'functional areas — marketing, production, finance and so on. They are intermediate plans derived ' +
          'from the strategic plans, covering <b>one to three years</b>.</p>' +
          '<div class="keybox"><b>Key aspects considered by functional area</b>' +
          '<br><b>Marketing</b> · product lines, marketing position, distribution channels, market ' +
          'communication, prices' +
          '<br><b>Finance</b> · policy on debtors, dividends, asset management, capital structure' +
          '<br><b>Production and operations</b> · improvement of productivity, locational problems, legislation' +
          '<br><b>Human resources</b> · labour relations, labour turnover, training, equity considerations' +
          '<br><b>Purchasing</b> · suppliers, policy on creditors, sources of raw materials</div>' +
          '<p>Elements of a tactical plan include the <b>goals</b> — specific short-term targets that must be ' +
          'SMART and must directly support a strategic goal — and the <b>tactics</b>, the general methods used ' +
          'to achieve them.</p>'
      },
      {
        heading: 'Operational planning',
        emoji: '⏱️',
        html:
          '<p><b>Operational planning</b> is the process of creating a detailed, short-term action plan for the ' +
          'people and processes directly involved in creating and delivering the organisation’s products or ' +
          'services. Also called <b>short-term planning</b>, its timeframe is <b>less than 12 months</b>.</p>' +
          '<p>It concentrates on the daily and weekly tasks of supervisors, departmental managers and ' +
          'individual employees, and answers:</p>' +
          '<div class="keybox"><b>What</b> specific task do I do? · <b>Who</b> is doing it? · <b>When</b> does ' +
          'it need to be finished? · <b>How much</b> money or resources do I have?</div>' +
          '<div class="keybox"><b>Components of an operational plan</b>' +
          '<br><b>Specific tasks</b> · individual, actionable tasks rather than broader goals' +
          '<br><b>Assigned responsibilities</b> · every task assigned to a specific person or team, with no ' +
          'ambiguity about ownership' +
          '<br><b>Clear timelines</b> · tight schedules with non-negotiable deadlines' +
          '<br><b>Detailed budgets</b> · granular allocation of financial resources</div>'
      }
    ],
    questions: [
      {
        id: 'i3h-1', type: 'mcq', marks: 2,
        prompt: 'What is <b>tactical planning</b>?',
        options: [
          'Breaking the long-term strategic plan into medium to short-term plans for specific departments',
          'Setting the organisation’s mission and long-term direction',
          'Scheduling the daily tasks of individual employees',
          'Monitoring results against the plan'
        ],
        answer: 0,
        solution: [
          { lab: 'Tactical planning', val: 'Breaking strategy down for departments or units' },
          { lab: 'Done by', val: 'Middle management — department heads and regional managers' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Tactical planning sits between the other two: it receives strategy from above and produces the ' +
             'plans that operational planning turns into daily work.'
      },
      {
        id: 'i3h-2', type: 'mcq', marks: 2,
        prompt: 'Tactical goals are also known as:',
        options: ['Functional goals', 'Strategic goals', 'Operational goals', 'Mission statements'],
        answer: 0,
        solution: [
          { lab: 'Also called', val: 'Functional goals' },
          { lab: 'Why', val: 'The planning takes place in the functional areas — marketing, production, finance' },
          { lab: 'Answer', val: 'Functional goals', final: true }
        ],
        why: 'The alternative name is a useful reminder of where tactical planning happens: inside the ' +
             'departments, not above them.'
      },
      {
        id: 'i3h-3', type: 'match', marks: 4,
        prompt: 'Match each functional area to the key aspects it considers during tactical planning.',
        pairs: [
          { left: 'Marketing', right: 'Product lines, distribution channels, market communication and prices' },
          { left: 'Finance', right: 'Policy on debtors, dividends, asset management and capital structure' },
          { left: 'Human resources', right: 'Labour relations, labour turnover, training and equity considerations' },
          { left: 'Purchasing', right: 'Suppliers, policy on creditors and sources of raw materials' }
        ],
        solution: [
          { lab: 'Marketing', val: 'Product, place, promotion and price' },
          { lab: 'Finance', val: 'Debtors, dividends, assets and capital structure' },
          { lab: 'Human resources', val: 'Relations, turnover, training and equity' },
          { lab: 'Purchasing', val: 'Suppliers, creditors and raw materials' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'The marketing row is the four Ps from Week 2 appearing as tactical concerns — the same framework ' +
             'seen from the planning side.'
      },
      {
        id: 'i3h-4', type: 'mcq', marks: 2,
        prompt: 'What is the timeframe of <b>operational planning</b>?',
        options: [
          'Less than 12 months',
          'One to three years',
          'Three to five years',
          'Five to ten years'
        ],
        answer: 0,
        solution: [
          { lab: 'Operational planning', val: 'Also called short-term planning' },
          { lab: 'Timeframe', val: 'Less than 12 months' },
          { lab: 'Answer', val: 'Less than 12 months', final: true }
        ],
        why: 'It concentrates on daily and weekly tasks, so its horizon is the shortest of the three by a ' +
             'considerable margin.'
      },
      {
        id: 'i3h-5', type: 'multi', marks: 3,
        prompt: 'Which questions does operational planning answer? <b>Select all that apply.</b>',
        options: [
          'What specific task do I do?',
          'Who is doing it?',
          'When does it need to be finished?',
          'How much money or resources do I have?',
          'Where should the company be in ten years?'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'What, who, when, how much', val: 'The questions frontline managers and employees need answered' },
          { lab: 'The ten-year question', val: 'Strategic planning' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'All four are immediate and concrete. The moment a question stretches beyond the year, it has ' +
             'stopped being operational.'
      },
      {
        id: 'i3h-6', type: 'multi', marks: 3,
        prompt: 'Which of these are components of an <b>operational plan</b>? <b>Select all that apply.</b>',
        options: [
          'Specific tasks',
          'Assigned responsibilities',
          'Clear timelines',
          'Detailed budgets',
          'The organisation’s mission statement'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Specific tasks', val: 'Individual and actionable, not broad goals' },
          { lab: 'Assigned responsibilities', val: 'No ambiguity about ownership' },
          { lab: 'Clear timelines', val: 'Tight schedules, non-negotiable deadlines' },
          { lab: 'Detailed budgets', val: 'Granular allocation of financial resources' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'The mission belongs to strategic planning. An operational plan assumes the mission and gets on ' +
             'with the work it implies.'
      },
      {
        id: 'i3h-7', type: 'mcq', marks: 3,
        prompt: 'What must the goals in a tactical plan do?',
        options: [
          'Be SMART, and directly support a strategic goal',
          'Be broad enough to cover the whole organisation',
          'Be set by first-line supervisors',
          'Avoid deadlines, so departments stay flexible'
        ],
        answer: 0,
        solution: [
          { lab: 'Tactical goals', val: 'Specific short-term targets for the department' },
          { lab: 'Two requirements', val: 'They must be SMART, and must support a strategic goal' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Both halves matter. A perfectly written SMART goal that supports no strategic aim is a ' +
             'department working hard in its own direction.'
      },
      {
        id: 'i3h-8', type: 'multi', marks: 3,
        prompt: 'Which of these are elements of a <b>tactical plan</b>? <b>Select all that apply.</b>',
        options: [
          'Goals',
          'Tactics',
          'Actions',
          'Resources',
          'Timeline',
          'The organisation’s vision statement'
        ],
        answers: [0, 1, 2, 3, 4],
        solution: [
          { lab: 'Goals', val: 'Specific SMART targets supporting a strategic goal' },
          { lab: 'Tactics', val: 'The general methods used to achieve them' },
          { lab: 'Actions', val: 'The concrete steps — who does what, in what sequence' },
          { lab: 'Resources', val: 'Human, financial, physical and external' },
          { lab: 'Timeline', val: 'A deadline for each action and goal' },
          { lab: 'Answer', val: 'The first five', final: true }
        ],
        why: 'The vision belongs to strategic planning. A tactical plan inherits the vision rather than ' +
             'setting it.'
      },
      {
        id: 'i3h-9', type: 'match', marks: 3,
        prompt: 'Match each element of a tactical plan to what it describes.',
        pairs: [
          { left: 'Tactics', right: 'The general methods used, without the minute details' },
          { left: 'Actions', right: 'The concrete steps — who does what, and in what sequence' },
          { left: 'Resources', right: 'The human, financial, physical and external inputs needed' }
        ],
        solution: [
          { lab: 'Tactics', val: 'The approach in general terms' },
          { lab: 'Actions', val: 'The individual tasks that move each tactic forward' },
          { lab: 'Resources', val: 'What is needed to complete the actions' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The three narrow from approach, to task, to what the task consumes. A plan without resources is ' +
             'described as just a wish list.'
      },
      {
        id: 'i3h-10', type: 'multi', marks: 3,
        prompt: 'Which of these are types of <b>operational plan</b>? <b>Select all that apply.</b>',
        options: [
          'Operational budgets',
          'Maintenance plans',
          'Sales and operational planning',
          'Project plans',
          'The corporate mission statement'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Operational budgets', val: 'The day-to-day financial plan controlling spending' },
          { lab: 'Maintenance plans', val: 'Schedules keeping equipment functional and preventing downtime' },
          { lab: 'Sales and operational planning', val: 'Aligning sales forecasts with production capacity' },
          { lab: 'Project plans', val: 'Temporary work managed through detailed operational planning' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Sales and operational planning is the one worth remembering: without it a business ends up with ' +
             'stock-outs or wasteful overproduction, because sales promised what production cannot make.'
      }
    ]
  },

  /* ═══════════════════════ PLANNING IN OPERATIONS ═══════════════════════ */
  {
    id: 'i3-opsplan',
    title: 'Planning in Operations',
    emoji: '⚙️',
    summary: 'Planning the transformation model, six performance objectives, and the three levels in operations.',
    notes: [
      {
        heading: 'Planning governs the transformation model',
        emoji: '🔧',
        html:
          '<div class="keybox"><b>Inputs</b> · determining the quantity and type of materials, technology and ' +
          'labour needed' +
          '<br><b>Processes</b> · deciding how the transformation should occur — automation, labour intensity' +
          '<br><b>Outputs</b> · planning production levels, quality control measures and service standards</div>' +
          '<p>Planning reconciles supply and demand by balancing three dimensions: <b>volume</b> (the quantity ' +
          'required), <b>timing</b> (when it must be delivered) and <b>quality</b> (conforming to customer ' +
          'expectations).</p>'
      },
      {
        heading: 'The six performance objectives',
        emoji: '🎯',
        html:
          '<p>These function as planning benchmarks for all levels of management:</p>' +
          '<div class="keybox"><b>Quality</b> · plan for doing things right the first time; establish standards ' +
          'and procedures' +
          '<br><b>Cost</b> · plan for cost efficiency; identify cost-control measures and optimise resource ' +
          'allocation' +
          '<br><b>Speed</b> · plan for quick delivery; streamline processes to reduce lead times' +
          '<br><b>Flexibility</b> · plan for adaptability; develop contingency plans to respond to demand ' +
          'changes' +
          '<br><b>Reliability</b> · plan for consistency; ensure schedules, deliveries and standards are ' +
          'predictable' +
          '<br><b>Service</b> · plan for customer satisfaction; design service processes that exceed ' +
          'expectations</div>' +
          '<p>At the tactical level these become <b>six operational priorities derived from customer needs</b>: ' +
          'higher quality, lower cost, shorter lead time, greater adaptability, lower variability, and a higher ' +
          'level of service.</p>'
      },
      {
        heading: 'Design planning, and the three levels',
        emoji: '📐',
        html:
          '<div class="keybox"><b>Product and service design planning</b> · determines the specifications, ' +
          'features and benefits that satisfy customer expectations' +
          '<br><b>Process design planning</b> · establishes how those products and services will be created or ' +
          'delivered within operational capabilities</div>' +
          '<div class="keybox"><b>Strategic</b> · how operations helps achieve competitive advantage, and which ' +
          'performance dimensions are prioritised' +
          '<br><b>Tactical</b> · translating strategic objectives into operational goals; setting measurable ' +
          'performance objectives; medium-term improvement plans' +
          '<br><b>Operational</b> · daily and weekly production or service schedules; allocating people, ' +
          'equipment and materials; workflow sequences; managing capacity, lead times and quality control</div>'
      }
    ],
    questions: [
      {
        id: 'i3i-1', type: 'match', marks: 3,
        prompt: 'Match each part of the transformation model to what is planned for it.',
        pairs: [
          { left: 'Inputs', right: 'The quantity and type of materials, technology and labour needed' },
          { left: 'Processes', right: 'How the transformation should occur — automation and labour intensity' },
          { left: 'Outputs', right: 'Production levels, quality control measures and service standards' }
        ],
        solution: [
          { lab: 'Inputs', val: 'What goes in' },
          { lab: 'Processes', val: 'How it is converted' },
          { lab: 'Outputs', val: 'What comes out, and to what standard' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'This is the transformation model from Week 1 with planning applied to each stage — the same ' +
             'idea seen from the operations manager’s side.'
      },
      {
        id: 'i3i-2', type: 'multi', marks: 3,
        prompt: 'Planning reconciles supply and demand by balancing which three dimensions? ' +
                '<b>Select all that apply.</b>',
        options: ['Volume', 'Timing', 'Quality', 'Location'],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Volume', val: 'The quantity of products or services required' },
          { lab: 'Timing', val: 'When they must be delivered' },
          { lab: 'Quality', val: 'Conforming to customer expectations' },
          { lab: 'Answer', val: 'Volume, timing and quality', final: true }
        ],
        why: 'All three must hold at once. The right quantity delivered late, or on time but faulty, still ' +
             'fails to reconcile supply with demand.'
      },
      {
        id: 'i3i-3', type: 'match', marks: 4,
        prompt: 'Match each operations performance objective to its planning focus.',
        pairs: [
          { left: 'Quality', right: 'Doing things right the first time; establishing standards and procedures' },
          { left: 'Speed', right: 'Quick delivery; streamlining processes to reduce lead times' },
          { left: 'Flexibility', right: 'Adaptability; contingency plans to respond to demand changes' },
          { left: 'Reliability', right: 'Consistency; predictable schedules, deliveries and standards' }
        ],
        solution: [
          { lab: 'Quality', val: 'Right first time' },
          { lab: 'Speed', val: 'Shorter lead times' },
          { lab: 'Flexibility', val: 'Able to change when demand does' },
          { lab: 'Reliability', val: 'Predictable, every time' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'Speed and reliability are easily confused. Speed is how fast; reliability is how consistently — ' +
             'a supplier can be quick and still be unpredictable.'
      },
      {
        id: 'i3i-4', type: 'multi', marks: 3,
        prompt: 'Which of these are operations performance objectives? <b>Select all that apply.</b>',
        options: ['Quality', 'Cost', 'Speed', 'Flexibility', 'Reliability', 'Ownership'],
        answers: [0, 1, 2, 3, 4],
        solution: [
          { lab: 'The six objectives', val: 'Quality, cost, speed, flexibility, reliability and service' },
          { lab: 'Ownership', val: 'Not one of them' },
          { lab: 'Answer', val: 'The first five', final: true }
        ],
        why: 'Service is the sixth and is not listed here. All six act as planning benchmarks for every level ' +
             'of management, not only for operations staff.'
      },
      {
        id: 'i3i-5', type: 'match', marks: 3,
        prompt: 'Match each planning level within the operations function to what it decides.',
        pairs: [
          { left: 'Strategic', right: 'How operations helps achieve competitive advantage, and which performance dimensions to prioritise' },
          { left: 'Tactical', right: 'Translating strategic objectives into measurable operational goals and medium-term improvements' },
          { left: 'Operational', right: 'Daily and weekly schedules, and allocating people, equipment and materials' }
        ],
        solution: [
          { lab: 'Strategic', val: 'Which dimensions of performance the business competes on' },
          { lab: 'Tactical', val: 'Turning those into measurable objectives and improvement programmes' },
          { lab: 'Operational', val: 'The schedules and resources that deliver them' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The same three planning levels appear inside a single function as across the whole ' +
             'organisation, which is why the vocabulary is worth learning once and reusing.'
      },
      {
        id: 'i3i-7', type: 'mcq', marks: 3,
        prompt: 'What is the difference between <b>product and service design planning</b> and <b>process ' +
                'design planning</b>?',
        options: [
          'The first determines the specifications and features that satisfy customers; the second establishes how they will be created or delivered',
          'The first applies to products and the second only to services',
          'The first is done by top management and the second by supervisors',
          'They are two names for the same activity'
        ],
        answer: 0,
        solution: [
          { lab: 'Product and service design planning', val: 'Specifications, features and benefits that satisfy customer expectations' },
          { lab: 'Process design planning', val: 'How they will be created or delivered within operational capabilities' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'They are separate decisions. A product can be beautifully designed and still be impossible to ' +
             'produce with the capabilities the business actually has.'
      },
      {
        id: 'i3i-6', type: 'mcq', marks: 3,
        prompt: 'At the <b>operational</b> level within the operations function, planning includes:',
        options: [
          'Daily and weekly production schedules, and allocating people, equipment and materials',
          'Deciding which performance dimensions give competitive advantage',
          'Translating strategic objectives into medium-term improvement programmes',
          'Setting the organisation’s mission'
        ],
        answer: 0,
        solution: [
          { lab: 'Operational level', val: 'Short-term and task-specific, focused on the transformation itself' },
          { lab: 'Includes', val: 'Schedules, resource allocation, workflow, capacity and quality control' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The second option is strategic and the third tactical. The same three planning levels appear ' +
             'inside the operations function as across the organisation.'
      }
    ]
  },

  /* ═══════════════════════ PLANNING IN FINANCE ═══════════════════════ */
  {
    id: 'i3-finplan',
    title: 'Planning in Finance',
    emoji: '💹',
    summary: 'Ratios, budgets, current assets, and where the money comes from.',
    notes: [
      {
        heading: 'Financial planning and analysis',
        emoji: '🩺',
        html:
          '<p>Financial planning ensures the business’s limited funds are allocated in the most optimal way to ' +
          'achieve its objectives while sustaining operations and growth. It involves forecasting future ' +
          'financial needs and aligning resources with strategic goals — anticipating cash flow requirements, ' +
          'investment opportunities and potential risks.</p>' +
          '<p><b>Financial analysis</b> is the process of monitoring a company’s financial position, ' +
          'identifying its strengths and weaknesses, and spotting trends.</p>' +
          '<div class="keybox"><b>Financial ratios and what they plan for</b>' +
          '<br><b>Liquidity ratios</b> · short-term cash flow planning; meeting immediate obligations' +
          '<br><b>Solvency ratios</b> · long-term capital structure planning; balancing debt and equity' +
          '<br><b>Profitability ratios</b> · efficiency improvements and cost management, to maximise return ' +
          'on investment and return on equity</div>'
      },
      {
        heading: 'Budgets',
        emoji: '📒',
        html:
          '<p><b>Financial budgets</b> form the core of financial planning, integrating operational budgets ' +
          'with the broader financial strategy:</p>' +
          '<div class="keybox"><b>Capital expenditure budget</b> · the plan for big, long-term investments ' +
          'such as machinery or a building' +
          '<br><b>Financing budget</b> · how money will be obtained — a loan, issuing shares, or other sources' +
          '<br><b>Budgeted statement of financial position</b> · projects the financial condition at the end ' +
          'of the budget period' +
          '<br><b>Cash budget</b> · plans cash inflows and outflows to ensure liquidity and identify future ' +
          'surpluses or shortages</div>' +
          '<p>The <b>cash budget</b> lets management plan <b>bridging finance</b> when shortfalls are expected, ' +
          'and plan short-term investments when surpluses are. It walks the line between holding enough cash ' +
          'to be safe (liquidity) and holding so much that profitable opportunities are missed ' +
          '(profitability).</p>'
      },
      {
        heading: 'Assets and financial structure',
        emoji: '⚖️',
        html:
          '<p>Managing <b>current assets</b> — cash, debtors and inventory — is a constant cost-risk ' +
          'trade-off:</p>' +
          '<div class="keybox"><b>Over-investment</b> · idle cash, inventory gathering dust, too much tied up ' +
          'in debtors. Low risk, but low profitability, and the idle money carries an opportunity cost.' +
          '<br><b>Under-investment</b> · not enough cash to pay bills, insufficient inventory to meet demand, ' +
          'or credit policies so strict they deter sales.</div>' +
          '<p><b>Financial structure planning</b> is finding the optimal mix of funding sources, balancing ' +
          'cost, risk and flexibility. <b>Short-term financing</b> funds current assets:</p>' +
          '<div class="keybox"><b>Trade credit</b> · financing through delayed payment to suppliers' +
          '<br><b>Accruals</b> · temporary financing from unpaid obligations such as wages or taxes' +
          '<br><b>Bank overdrafts</b> · short-term borrowing for liquidity management' +
          '<br><b>Factoring</b> · selling accounts receivable to improve cash flow</div>'
      }
    ],
    questions: [
      {
        id: 'i3j-1', type: 'match', marks: 3,
        prompt: 'Match each type of financial ratio to what it helps plan.',
        pairs: [
          { left: 'Liquidity ratios', right: 'Short-term cash flow, and meeting immediate obligations' },
          { left: 'Solvency ratios', right: 'Long-term capital structure, balancing debt and equity' },
          { left: 'Profitability ratios', right: 'Efficiency improvements and cost management' }
        ],
        solution: [
          { lab: 'Liquidity', val: 'Can we pay what is due now?' },
          { lab: 'Solvency', val: 'Can we survive long-term with this mix of debt and equity?' },
          { lab: 'Profitability', val: 'Are we generating a good return?' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'Liquidity and solvency are the pair most often confused. Liquidity is about the short term, ' +
             'solvency about surviving the long one.'
      },
      {
        id: 'i3j-2', type: 'match', marks: 4,
        prompt: 'Match each financial budget to its purpose.',
        pairs: [
          { left: 'Capital expenditure budget', right: 'Planning big, long-term investments such as machinery' },
          { left: 'Financing budget', right: 'Planning how money will be obtained — loans, shares or other sources' },
          { left: 'Budgeted statement of financial position', right: 'Projecting the financial condition at the end of the period' },
          { left: 'Cash budget', right: 'Planning cash inflows and outflows to ensure liquidity' }
        ],
        solution: [
          { lab: 'Capital expenditure', val: 'What large assets to buy' },
          { lab: 'Financing', val: 'Where the money comes from' },
          { lab: 'Budgeted statement of financial position', val: 'What the balance sheet should look like at the end' },
          { lab: 'Cash budget', val: 'When money moves in and out' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'The cash budget is the one that catches businesses out. A profitable company can still fail if ' +
             'the cash arrives later than the bills.'
      },
      {
        id: 'i3j-3', type: 'mcq', marks: 3,
        prompt: 'What does the <b>cash budget</b> allow management to plan for?',
        options: [
          'Bridging finance when shortfalls are expected, and short-term investment when surpluses are',
          'Which machinery to purchase over the next five years',
          'How many employees to recruit next year',
          'The selling price of each product'
        ],
        answer: 0,
        solution: [
          { lab: 'Cash budget', val: 'Identifies future cash shortages and surpluses' },
          { lab: 'Shortfall', val: 'Plan bridging finance — a short-term loan' },
          { lab: 'Surplus', val: 'Plan a short-term investment rather than letting cash sit idle' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'It balances liquidity against profitability — enough cash to be safe, but not so much sitting ' +
             'idle that opportunities are missed.'
      },
      {
        id: 'i3j-4', type: 'mcq', marks: 3,
        prompt: 'What is the problem with <b>over-investment</b> in current assets?',
        options: [
          'Low risk but low profitability — idle money carries an opportunity cost',
          'A lack of cash to pay bills',
          'Insufficient inventory to meet customer demand',
          'Credit policies so strict that sales are lost'
        ],
        answer: 0,
        solution: [
          { lab: 'Over-investment', val: 'Idle cash, unsold inventory, too much tied up in debtors' },
          { lab: 'The trade-off', val: 'Low risk, low profitability' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The other three describe under-investment. Managing current assets is a trade-off, and both ' +
             'directions have a cost.'
      },
      {
        id: 'i3j-5', type: 'multi', marks: 3,
        prompt: 'Which of these are short-term financing instruments? <b>Select all that apply.</b>',
        options: [
          'Trade credit',
          'Accruals',
          'Bank overdrafts',
          'Factoring',
          'Issuing shares'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Trade credit', val: 'Delayed payment to suppliers' },
          { lab: 'Accruals', val: 'Temporary financing from unpaid wages or taxes' },
          { lab: 'Bank overdrafts', val: 'Short-term borrowing for liquidity' },
          { lab: 'Factoring', val: 'Selling accounts receivable to improve cash flow' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Issuing shares raises long-term capital. Short-term financing funds current assets — inventory ' +
             'and money owed by customers.'
      },
      {
        id: 'i3j-6', type: 'mcq', marks: 2,
        prompt: 'What is <b>financial analysis</b>?',
        options: [
          'Monitoring the financial position, identifying strengths and weaknesses, and spotting trends',
          'Recording every transaction the business makes',
          'Deciding the price of each product',
          'Preparing the payroll each month'
        ],
        answer: 0,
        solution: [
          { lab: 'Financial analysis', val: 'A necessary part of financial planning' },
          { lab: 'It reveals', val: 'Whether a company is poised for growth or cannot pay its bills' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Managers, investors and lenders all use it — which is why it looks for trends rather than ' +
             'simply reporting the current numbers.'
      }
    ]
  },

  /* ═══════════════════════ PLANNING IN MARKETING ═══════════════════════ */
  {
    id: 'i3-mktplan',
    title: 'Planning in Marketing',
    emoji: '📣',
    summary: 'Segmentation, distribution intensity, promotion decisions, and service planning.',
    notes: [
      {
        heading: 'Why marketing plans first',
        emoji: '🌉',
        html:
          '<p>Marketing planning determines what is possible in the marketplace <b>before the rest of the ' +
          'organisation commits its resources</b>. Before management can decide about production or financing, ' +
          'it must first determine through research and analysis what can be achieved in the market.</p>' +
          '<p>Market research provides the information needed for sound decisions, and a key part of planning ' +
          'is <b>forecasting future demand and sales</b>.</p>' +
          '<p>No company can satisfy everyone. Planning involves identifying market segments and selecting ' +
          'target markets that align with the company’s strengths and objectives — <b>segmentation, targeting ' +
          'and positioning (STP)</b>.</p>'
      },
      {
        heading: 'Distribution intensity',
        emoji: '🚚',
        html:
          '<p>Market coverage exists on a spectrum, from available everywhere to available in only a few ' +
          'exclusive locations. The choice depends on product type, brand image and customer buying ' +
          'behaviour.</p>' +
          '<div class="keybox"><b>Intensive distribution</b> · saturate the market, available at every ' +
          'possible convenient outlet, using as many intermediaries as possible. Suits <b>convenience ' +
          'products</b>.' +
          '<br><b>Selective distribution</b> · a limited number of intermediaries who can distribute most ' +
          'effectively and profitably. Suits a wide range of products.' +
          '<br><b>Exclusive distribution</b> · limit intermediaries to a single one or very few, creating an ' +
          'image of exclusivity, prestige and high quality. Suits <b>specialty products</b> such as luxury ' +
          'cars.</div>'
      },
      {
        heading: 'Promotion and customer service',
        emoji: '📢',
        html:
          '<div class="keybox"><b>Promotion planning decisions</b>' +
          '<br><b>Communication objectives</b> · what are we trying to achieve? Should be a SMART goal' +
          '<br><b>Promotional mix</b> · the combination of advertising, sales promotions, public relations and ' +
          'social media' +
          '<br><b>Message design</b> · the core story being told' +
          '<br><b>Media selection</b> · which channels best reach the target audience' +
          '<br><b>Budget allocation</b> · how much is spent on each promotional activity</div>' +
          '<p>The goal is a clear, consistent message across all media and consumer touchpoints.</p>' +
          '<p><b>Customer service</b> can be planned into each element of the marketing mix: <b>product</b> ' +
          '(quality, ease of support, warranties and post-purchase service), <b>price</b> (a strategy ' +
          'reflecting the value of the service, since customers will pay a premium for exceptional support), ' +
          '<b>promotion</b> (communications highlighting service excellence) and <b>place</b> (delivery that is ' +
          'convenient, reliable and transparent).</p>'
      }
    ],
    questions: [
      {
        id: 'i3k-1', type: 'match', marks: 3,
        prompt: 'Match each distribution strategy to its description.',
        pairs: [
          { left: 'Intensive distribution', right: 'Saturating the market through as many outlets as possible' },
          { left: 'Selective distribution', right: 'A limited number of intermediaries who distribute most effectively' },
          { left: 'Exclusive distribution', right: 'A single or very few intermediaries, creating prestige and exclusivity' }
        ],
        solution: [
          { lab: 'Intensive', val: 'Everywhere — suits convenience products' },
          { lab: 'Selective', val: 'A chosen few — suits a wide range of products' },
          { lab: 'Exclusive', val: 'Almost nowhere — suits specialty products such as luxury cars' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'They sit on a spectrum from everywhere to almost nowhere, and the right point on it depends on ' +
             'the product type, the brand image and how customers actually buy.'
      },
      {
        id: 'i3k-2', type: 'mcq', marks: 2,
        prompt: 'Which distribution strategy suits <b>convenience products</b>?',
        options: ['Intensive distribution', 'Exclusive distribution', 'Selective distribution', 'None of them'],
        answer: 0,
        solution: [
          { lab: 'Convenience products', val: 'Should be available at every possible convenient outlet' },
          { lab: 'Strategy', val: 'Intensive distribution' },
          { lab: 'Answer', val: 'Intensive distribution', final: true }
        ],
        why: 'The name says what customers expect: a convenience product that is inconvenient to buy has lost ' +
             'the only advantage it had.'
      },
      {
        id: 'i3k-3', type: 'multi', marks: 3,
        prompt: 'Which of these are promotion planning decisions? <b>Select all that apply.</b>',
        options: [
          'Communication objectives',
          'Promotional mix',
          'Message design',
          'Media selection',
          'Budget allocation',
          'Choosing the company’s auditors'
        ],
        answers: [0, 1, 2, 3, 4],
        solution: [
          { lab: 'Objectives', val: 'What the communication is trying to achieve — a SMART goal' },
          { lab: 'Promotional mix', val: 'Advertising, sales promotions, public relations, social media' },
          { lab: 'Message design', val: 'The core story' },
          { lab: 'Media selection', val: 'Which channels reach the audience' },
          { lab: 'Budget allocation', val: 'How much goes to each activity' },
          { lab: 'Answer', val: 'The first five', final: true }
        ],
        why: 'The aim across all five is a clear, consistent message at every point where a customer meets ' +
             'the business.'
      },
      {
        id: 'i3k-4', type: 'mcq', marks: 3,
        prompt: 'Why must marketing planning happen <b>before</b> production and financing decisions?',
        options: [
          'It determines what is possible in the marketplace before the organisation commits its resources',
          'Because the marketing department is the largest',
          'Because marketing budgets are approved first',
          'Because production cannot begin until adverts have run'
        ],
        answer: 0,
        solution: [
          { lab: 'Marketing planning', val: 'Determines what can be achieved in the market' },
          { lab: 'Only then', val: 'Can management decide about production or financing' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Committing resources to produce something the market will not buy is exactly the waste that ' +
             'planning exists to prevent.'
      },
      {
        id: 'i3k-5', type: 'mcq', marks: 2,
        prompt: 'What does <b>STP</b> stand for in marketing planning?',
        options: [
          'Segmentation, targeting and positioning',
          'Strategy, tactics and planning',
          'Sales, turnover and profit',
          'Specific, timed and planned'
        ],
        answer: 0,
        solution: [
          { lab: 'STP', val: 'Segmentation, targeting and positioning' },
          { lab: 'Because', val: 'No company can satisfy everyone' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Consumers do not all have the same needs, so the market is divided into smaller similar groups ' +
             'before any of them is chosen to serve.'
      },
      {
        id: 'i3k-6', type: 'match', marks: 4,
        prompt: 'Match each element of the marketing mix to how customer service is planned into it.',
        pairs: [
          { left: 'Product', right: 'Quality, ease of support, warranties and post-purchase service' },
          { left: 'Price', right: 'A pricing strategy reflecting the value of the service offered' },
          { left: 'Promotion', right: 'Communications that promise and highlight service excellence' },
          { left: 'Place', right: 'Delivery that is convenient, reliable and transparent' }
        ],
        solution: [
          { lab: 'Product', val: 'Support designed in, not added later' },
          { lab: 'Price', val: 'Customers pay a premium for exceptional support' },
          { lab: 'Promotion', val: 'Service excellence communicated' },
          { lab: 'Place', val: 'A delivery process customers can rely on' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'Customer service is not a separate department in this model — it is planned into all four Ps, ' +
             'and considered across the whole customer lifecycle.'
      }
    ]
  }

  ]
});
