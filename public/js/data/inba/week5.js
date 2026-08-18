/* INBA01-5 — Week 5: Leading.
   Understanding leadership, leadership theories, contemporary leadership, and
   motivation.

   Same rules as the earlier weeks: concepts only, never the analogies used to
   explain them, and nothing written that is not in Abi's notes. */

window.MODULE_CONTENT = window.MODULE_CONTENT || {};
window.MODULE_CONTENT.inba = window.MODULE_CONTENT.inba || { weeks: [], exams: [] };

window.MODULE_CONTENT.inba.weeks.push({
  id: 'inba-week5',
  number: 5,
  title: 'Leading & Motivation',
  emoji: '🎤',
  accent: 6,
  blurb: 'Influencing people rather than managing processes — and what actually makes them want to.',
  topics: [

  /* ═══════════════════════ WHAT LEADERSHIP IS ═══════════════════════ */
  {
    id: 'i5-leadership',
    title: 'What Leadership Is',
    emoji: '🧭',
    summary: 'The definition, the three components, and how leadership differs from management.',
    notes: [
      {
        heading: 'Definition',
        emoji: '📖',
        html:
          '<div class="keybox"><b>Leadership</b> is "the ability of an individual to influence other persons to ' +
          'voluntarily contribute to the attainment of the aims of the business" (Marx, van Rooyen, Bosch &amp; ' +
          'Reynders, 2008).</div>' +
          '<p><b>Leadership is not a position.</b> The word doing the work in that definition is ' +
          '<b>voluntarily</b> — influence rather than instruction.</p>' +
          '<p>The world of work has shifted from managers managing both people and machines to leaders ' +
          '<b>leading people</b> and <b>managing processes and machines</b>. Machines are predictable and do as ' +
          'they are told; people are unpredictable, with different beliefs, capabilities, interests, skills and ' +
          'personal goals. The other functions of management cannot be successfully executed without ' +
          'leadership.</p>'
      },
      {
        heading: 'Three components, and leadership against management',
        emoji: '🔺',
        html:
          '<div class="keybox"><b>The leader</b> · the person who guides the process, with their own ' +
          'personality, interests and characteristics' +
          '<br><b>The followers</b> · the team members essential to achieving the goal, with their own ' +
          'expectations, maturity levels and competencies' +
          '<br><b>The situation</b> · the context or circumstances, which dictate how leader and follower ' +
          'interact</div>' +
          '<p>The three are <b>interactive</b> — influence moves from follower to leader as well as the other ' +
          'way round.</p>' +
          '<p>"Management is doing things right; leadership is doing the right things." <b>Management is ' +
          'broader in scope</b> — leadership is just one of the four management functions. The ability to ' +
          '<b>influence others</b> is the defining characteristic of leadership, and an organisation relies on ' +
          'both managers and leaders.</p>'
      },
      {
        heading: 'Elements of leadership',
        emoji: '🔑',
        html:
          '<div class="keybox"><b>Authority</b> · the right of a manager to give commands and demand actions' +
          '<br><b>Power</b> · the ability to influence an employee’s behaviour' +
          '<br><b>Responsibility</b> · the duty to achieve organisational goals' +
          '<br><b>Delegation</b> · allocating responsibility and authority for achieving goals' +
          '<br><b>Accountability</b> · the evaluation of how well individuals meet their responsibilities</div>' +
          '<p>Of the five types of power, <b>referent power is the one most commonly used by effective ' +
          'leaders</b> — though good leaders use a mix depending on what is needed.</p>'
      }
    ],
    questions: [
      {
        id: 'i5a-1', type: 'mcq', marks: 2,
        prompt: 'Leadership is defined as the ability of an individual to:',
        options: [
          'Influence other persons to voluntarily contribute to the aims of the business',
          'Instruct employees to complete assigned tasks',
          'Plan and organise the work of a department',
          'Monitor whether results match the plan'
        ],
        answer: 0,
        solution: [
          { lab: 'The definition', val: 'Influence others to contribute voluntarily to the aims of the business' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: '"Voluntarily" is the word that separates leadership from authority. Anyone with a job title can ' +
             'instruct; leadership is getting willing contribution.'
      },
      {
        id: 'i5a-2', type: 'multi', marks: 3,
        prompt: 'What are the three components of leadership? <b>Select all that apply.</b>',
        options: ['The leader', 'The followers', 'The situation', 'The salary'],
        answers: [0, 1, 2],
        solution: [
          { lab: 'The leader', val: 'Guides the process' },
          { lab: 'The followers', val: 'Essential to achieving the goal' },
          { lab: 'The situation', val: 'The context in which the action happens' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'They are interactive rather than separate. Followers influence the leader as much as the leader ' +
             'influences them, and the situation shapes both.'
      },
      {
        id: 'i5a-3', type: 'mcq', marks: 3,
        prompt: 'How do leadership and management relate to one another?',
        options: [
          'Management is broader — leadership is one of the four management functions',
          'Leadership is broader — management is one part of leading',
          'They are two words for the same activity',
          'They are entirely unrelated'
        ],
        answer: 0,
        solution: [
          { lab: 'Management', val: 'Broader in scope' },
          { lab: 'Leadership', val: 'One of the four management functions — but the defining characteristic is influence' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'An organisation relies on both. The saying is that management is doing things right and ' +
             'leadership is doing the right things.'
      },
      {
        id: 'i5a-4', type: 'match', marks: 3,
        prompt: 'Match each component of leadership to what it contributes.',
        pairs: [
          { left: 'The leader', right: 'Personality, interests and characteristics that shape how they guide' },
          { left: 'The followers', right: 'Expectations, maturity levels and competencies' },
          { left: 'The situation', right: 'The context that dictates how the other two interact' }
        ],
        solution: [
          { lab: 'Leader', val: 'Individual factors' },
          { lab: 'Followers', val: 'Their own expectations and capability' },
          { lab: 'Situation', val: 'The circumstances surrounding both' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'Treating followers as passive is the common error. Their maturity and competence change what ' +
             'kind of leadership will work at all.'
      },
      {
        id: 'i5a-5', type: 'multi', marks: 3,
        prompt: 'Which of these are elements of leadership? <b>Select all that apply.</b>',
        options: [
          'Authority',
          'Power',
          'Responsibility',
          'Delegation',
          'Accountability',
          'Profitability'
        ],
        answers: [0, 1, 2, 3, 4],
        solution: [
          { lab: 'The five elements', val: 'Authority, power, responsibility, delegation and accountability' },
          { lab: 'Profitability', val: 'A strategic goal, not an element of leadership' },
          { lab: 'Answer', val: 'The first five', final: true }
        ],
        why: 'All five carried over from organising in Week 4, and they matter here because they also shape ' +
             'motivation.'
      },
      {
        id: 'i5a-6', type: 'mcq', marks: 2,
        prompt: 'Which type of power is most commonly used by <b>effective leaders</b>?',
        options: ['Referent power', 'Coercive power', 'Legitimate power', 'Reward power'],
        answer: 0,
        solution: [
          { lab: 'Referent power', val: 'From charisma, respect and admiration' },
          { lab: 'But', val: 'Good leaders use a mix, depending on what the situation needs' },
          { lab: 'Answer', val: 'Referent power', final: true }
        ],
        why: 'It fits the definition of leadership: referent power produces voluntary contribution, where ' +
             'coercive power produces compliance.'
      }
    ]
  },

  /* ═══════════════════════ COMMUNICATION ═══════════════════════ */
  {
    id: 'i5-comms',
    title: 'Leadership Communication',
    emoji: '📡',
    summary: 'The directions communication flows, what blocks it, and the transactional model.',
    notes: [
      {
        heading: 'Directions of communication',
        emoji: '↕️',
        html:
          '<p><b>Business communication</b> is exchanging information between individuals, both inside and ' +
          'outside the organisation. <b>Leadership communication</b> is the process of sharing information to ' +
          'guide and motivate others toward a common goal — leadership is expressed <i>through</i> ' +
          'communication.</p>' +
          '<div class="keybox"><b>Downward</b> · from leadership down through the levels of authority. Sets ' +
          'strategy, provides directives, shares official information.' +
          '<br><b>Upward</b> · from employees to management. Gathers feedback, hears concerns, gains insight ' +
          'from the front lines.' +
          '<br><b>Lateral</b> · between individuals or departments at the same level. Breaks down silos and ' +
          'improves collaboration.' +
          '<br><b>External</b> · with customers, suppliers and other stakeholders.</div>'
      },
      {
        heading: 'Barriers, and the transactional model',
        emoji: '🚧',
        html:
          '<div class="keybox"><b>Barriers leaders must overcome</b>' +
          '<br><b>Information overload</b> · too many emails or messages, causing a lack of clarity and missed ' +
          'critical information' +
          '<br><b>Communication silos</b> · information trapped within one department or level' +
          '<br><b>Remote team neglect</b> · failing to keep communication clear and consistent with remote ' +
          'members, leaving them isolated' +
          '<br><b>Low engagement</b> · poor communication making employees feel disconnected from the leader ' +
          'and the organisation’s purpose</div>' +
          '<p>The <b>transactional model</b> holds that communication never happens in a vacuum. It is framed ' +
          'by three contexts:</p>' +
          '<div class="keybox"><b>Relational context</b> · the history and type of relationship between the ' +
          'communicators' +
          '<br><b>Cultural context</b> · the aspects of identity people bring to the encounter' +
          '<br><b>Social context</b> · the stated rules and unstated norms of the workplace</div>' +
          '<p>Communicators send and receive at the same time — a leader presenting a strategy is ' +
          'simultaneously decoding the team’s non-verbal responses and adapting in real time.</p>'
      }
    ],
    questions: [
      {
        id: 'i5b-1', type: 'match', marks: 3,
        prompt: 'Match each direction of communication to what it is used for.',
        pairs: [
          { left: 'Downward communication', right: 'Setting strategy, providing directives and sharing official information' },
          { left: 'Upward communication', right: 'Gathering feedback, hearing concerns and gaining front-line insight' },
          { left: 'Lateral communication', right: 'Breaking down silos between departments at the same level' }
        ],
        solution: [
          { lab: 'Downward', val: 'From leadership through the levels of authority' },
          { lab: 'Upward', val: 'From employees to management' },
          { lab: 'Lateral', val: 'Between people at the same hierarchical level' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'Upward is the one most often neglected. Without it, an organisation loses exactly the insight ' +
             'the people doing the work already have.'
      },
      {
        id: 'i5b-2', type: 'multi', marks: 3,
        prompt: 'Which of these are barriers to leadership communication? <b>Select all that apply.</b>',
        options: [
          'Information overload',
          'Communication silos',
          'Failing to keep remote team members informed',
          'Low engagement from poor communication',
          'Holding regular team meetings'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Overload', val: 'Too many messages, so critical information is missed' },
          { lab: 'Silos', val: 'Information trapped in one department or level' },
          { lab: 'Remote neglect', val: 'Leaves people isolated and out of the loop' },
          { lab: 'Low engagement', val: 'Employees feel disconnected from the purpose' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Information overload is the counter-intuitive one: more communication is not automatically ' +
             'better communication.'
      },
      {
        id: 'i5b-3', type: 'match', marks: 3,
        prompt: 'Match each context in the transactional model to what it covers.',
        pairs: [
          { left: 'Relational context', right: 'The history and type of relationship between the communicators' },
          { left: 'Cultural context', right: 'The aspects of identity people bring to the encounter' },
          { left: 'Social context', right: 'The stated rules and unstated norms of the workplace' }
        ],
        solution: [
          { lab: 'Relational', val: 'Who these two people are to each other' },
          { lab: 'Cultural', val: 'What each brings from their background' },
          { lab: 'Social', val: 'What this workplace treats as normal' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'It is why the same words land differently on a new intern and a trusted colleague of ten years ' +
             '— the message is identical but all three contexts differ.'
      },
      {
        id: 'i5b-4', type: 'mcq', marks: 3,
        prompt: 'What does the <b>transactional model</b> say about how communication works?',
        options: [
          'Communicators send and receive simultaneously, adapting in real time',
          'A message travels one way from sender to receiver',
          'Communication only succeeds when written down',
          'Feedback should be collected after the conversation ends'
        ],
        answer: 0,
        solution: [
          { lab: 'Simultaneous', val: 'A leader presents while decoding the team’s non-verbal responses' },
          { lab: 'Result', val: 'They adapt during the presentation rather than after it' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Noticing confusion halfway through and changing course is the skill being described. Waiting ' +
             'until the end is too late.'
      },
      {
        id: 'i5b-5', type: 'mcq', marks: 2,
        prompt: 'Which direction of communication would a leader encourage to break down <b>silos</b> between ' +
                'departments?',
        options: ['Lateral', 'Downward', 'Upward', 'External'],
        answer: 0,
        solution: [
          { lab: 'Lateral', val: 'Between individuals or departments at the same hierarchical level' },
          { lab: 'Its purpose', val: 'Breaking down silos and improving collaboration' },
          { lab: 'Answer', val: 'Lateral', final: true }
        ],
        why: 'Silos form sideways, between departments, so the remedy has to travel sideways too. More ' +
             'downward communication would not touch it.'
      }
    ]
  },

  /* ═══════════════════════ TRAIT AND BEHAVIOURAL THEORIES ═══════════════════════ */
  {
    id: 'i5-trait',
    title: 'Trait & Behavioural Theories',
    emoji: '🧬',
    summary: 'Born or made — the two traditional explanations of what makes a leader.',
    notes: [
      {
        heading: 'Trait theory',
        emoji: '⭐',
        html:
          '<p>The <b>first of the traditional theories</b>. It suggests effective leaders naturally possess a ' +
          'specific set of <b>inherent traits, qualities or innate abilities</b> — that leaders differ from ' +
          'non-leaders because of traits they were <b>born with</b>.</p>' +
          '<div class="keybox"><b>The seven key leadership traits</b> (Robbins &amp; Coulter, 2007)' +
          '<br><b>Drive</b> · high effort and energy, ambition, persistence and initiative' +
          '<br><b>Desire to lead</b> · a genuine wish to influence and guide others' +
          '<br><b>Honesty and integrity</b> · truthfulness, and consistency between words and actions' +
          '<br><b>Self-confidence</b> · calm assurance that convinces others of the rightness of decisions' +
          '<br><b>Intelligence</b> · gathering, synthesising and interpreting complex information' +
          '<br><b>Knowledge about the job</b> · deep understanding of company, industry and technical work' +
          '<br><b>Extraversion</b> · energetic, sociable and assertive</div>' +
          '<p><b>Its limitation:</b> having a trait does not automatically make someone a good leader, and a ' +
          'trait effective in one situation may not be in another.</p>'
      },
      {
        heading: 'Behavioural theories',
        emoji: '🎬',
        html:
          '<p>Researchers realised the "born leader" idea was incomplete — the right traits did not guarantee ' +
          'success. So the focus shifted from <b>who you are</b> to <b>what you do</b>.</p>' +
          '<p>Behavioural theory suggests the behaviour of successful leaders must be different from that of ' +
          'unsuccessful ones. Researchers studied how leaders delegated tasks, communicated and motivated their ' +
          'teams.</p>' +
          '<div class="keybox"><b>The crucial difference:</b> unlike traits, <b>behaviour can be learned and ' +
          'acquired</b> — it is a set of skills that can be taught to anyone.</div>'
      }
    ],
    questions: [
      {
        id: 'i5c-1', type: 'multi', marks: 3,
        prompt: 'Which of these are among the seven key leadership traits? <b>Select all that apply.</b>',
        options: [
          'Drive',
          'Desire to lead',
          'Honesty and integrity',
          'Knowledge about the job',
          'Wealth',
          'Seniority'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'The seven traits', val: 'Drive, desire to lead, honesty and integrity, self-confidence, intelligence, knowledge about the job, extraversion' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Neither wealth nor seniority appears. Trait theory is about personal qualities, not position or ' +
             'circumstance.'
      },
      {
        id: 'i5c-2', type: 'mcq', marks: 3,
        prompt: 'What is the fundamental claim of <b>trait theory</b>?',
        options: [
          'Effective leaders naturally possess inherent traits they were born with',
          'Leadership behaviour can be taught to anyone',
          'The best style depends entirely on the situation',
          'Leaders are motivated by exchanges and incentives'
        ],
        answer: 0,
        solution: [
          { lab: 'Trait theory', val: 'Leaders differ from non-leaders because of innate qualities' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The other three are behavioural theory, situational leadership and transactional leadership. ' +
             'Trait theory is the only one that treats leadership as something you are born with.'
      },
      {
        id: 'i5c-3', type: 'mcq', marks: 3,
        prompt: 'What is the key difference between trait and behavioural theories?',
        options: [
          'Traits are innate; behaviour can be learned and taught to anyone',
          'Traits apply to managers and behaviours to leaders',
          'Traits are measurable and behaviours are not',
          'Behavioural theory came first historically'
        ],
        answer: 0,
        solution: [
          { lab: 'Trait theory', val: 'Who you are — inherent qualities' },
          { lab: 'Behavioural theory', val: 'What you do — a set of skills that can be taught' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'This is why the shift mattered so much: if leadership is behaviour, it can be developed, and ' +
             'leadership training becomes worth doing.'
      },
      {
        id: 'i5c-4', type: 'multi', marks: 3,
        prompt: 'What are the stated limitations of trait theory? <b>Select all that apply.</b>',
        options: [
          'Having a trait does not automatically make someone a good leader',
          'A trait effective in one situation may not be in another',
          'It cannot be applied to any organisation',
          'It only applies to top management'
        ],
        answers: [0, 1],
        solution: [
          { lab: 'First limitation', val: 'A trait on its own guarantees nothing' },
          { lab: 'Second limitation', val: 'Effectiveness depends on the situation' },
          { lab: 'Answer', val: 'The first two', final: true }
        ],
        why: 'The second limitation is what leads directly to situational leadership — if context changes ' +
             'which traits work, context has to be part of the theory.'
      },
      {
        id: 'i5c-5', type: 'mcq', marks: 2,
        prompt: 'Behavioural theories shifted the focus of leadership research from:',
        options: [
          'Who you are, to what you do',
          'What you do, to who you are',
          'The follower, to the leader',
          'The organisation, to the individual'
        ],
        answer: 0,
        solution: [
          { lab: 'Trait theory asked', val: 'Who is a leader?' },
          { lab: 'Behavioural theory asked', val: 'What do leaders do?' },
          { lab: 'Answer', val: 'Who you are, to what you do', final: true }
        ],
        why: 'The shift happened because the right traits alone did not predict success — which is a finding, ' +
             'not merely a change of fashion.'
      }
    ]
  },

  /* ═══════════════════════ LEADERSHIP STYLES ═══════════════════════ */
  {
    id: 'i5-styles',
    title: 'Leadership Styles',
    emoji: '🎚️',
    summary: 'The continuum from complete leader control to complete team freedom.',
    notes: [
      {
        heading: 'The leadership continuum',
        emoji: '📊',
        html:
          '<p>The styles exist on a spectrum, from the leader having complete control to the team having the ' +
          'most freedom.</p>' +
          '<div class="keybox"><b>Autocratic</b> · the manager makes most decisions and acts in an ' +
          'authoritative manner, usually unconcerned about subordinates’ attitudes towards them. Emphasis is on ' +
          'getting the task accomplished. Used mostly by military officers and some production line ' +
          'supervisors.' +
          '<br><br><b>Participative</b> · the manager shares decision-making with the group and encourages ' +
          'teamwork, discussion of issues and alternatives. Concerned about subordinates’ ideas and attitudes; ' +
          'coaches and co-ordinates their efforts. Found in many successful organisations.' +
          '<br><br><b>Laissez-faire</b> · the manager turns over virtually all authority and control to the ' +
          'group, who are given a task and the freedom to accomplish it. Works well with highly motivated, ' +
          'experienced, educated personnel. Found in high-tech companies, laboratories and colleges.</div>'
      },
      {
        heading: 'Three kinds of participative leader',
        emoji: '🗳️',
        html:
          '<div class="keybox"><b>Democratic</b> · the group discusses and then votes; the majority rules. ' +
          'Works well with highly trained, professional teams.' +
          '<br><b>Consensual</b> · the group discusses until everyone agrees on the final decision. Common in ' +
          'mediation, or when total buy-in is critical.' +
          '<br><b>Consultative</b> · the leader consults the team for input and advice, but <b>the final ' +
          'decision rests with the leader</b>. Can boost morale and productivity because employees feel ' +
          'heard.</div>' +
          '<p>Autocratic leadership is not simply bad — it is effective in a crisis, when a decision must be ' +
          'made quickly, or when the leader is the undisputed expert. <b>There is no single best style</b>, ' +
          'which is what leads to situational leadership.</p>'
      }
    ],
    questions: [
      {
        id: 'i5d-1', type: 'match', marks: 3,
        prompt: 'Match each leadership style to how decisions are made.',
        pairs: [
          { left: 'Autocratic', right: 'The manager makes most decisions and acts authoritatively' },
          { left: 'Participative', right: 'The manager shares decision-making and encourages teamwork' },
          { left: 'Laissez-faire', right: 'The manager turns virtually all authority over to the group' }
        ],
        solution: [
          { lab: 'Autocratic', val: 'Most leader control' },
          { lab: 'Participative', val: 'Shared' },
          { lab: 'Laissez-faire', val: 'Most group freedom' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'They sit on one continuum measured by how much authority the group holds, which is why they are ' +
             'best learned in order rather than as three separate labels.'
      },
      {
        id: 'i5d-2', type: 'match', marks: 3,
        prompt: 'Match each type of participative leader to how the decision is reached.',
        pairs: [
          { left: 'Democratic', right: 'The group discusses and votes; the majority rules' },
          { left: 'Consensual', right: 'The group discusses until everyone agrees' },
          { left: 'Consultative', right: 'The leader seeks input but makes the final decision' }
        ],
        solution: [
          { lab: 'Democratic', val: 'Majority rules' },
          { lab: 'Consensual', val: 'Everyone must agree' },
          { lab: 'Consultative', val: 'The leader decides, having listened' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'Consultative is the one people mislabel as democratic. Being asked is not the same as getting a ' +
             'vote.'
      },
      {
        id: 'i5d-3', type: 'mcq', marks: 3,
        prompt: 'When is an <b>autocratic</b> style effective?',
        options: [
          'In a crisis, when a decision must be made quickly, or when the leader is the undisputed expert',
          'When the team is highly experienced and self-motivated',
          'When total buy-in from every member is essential',
          'Never — it is always the wrong choice'
        ],
        answer: 0,
        solution: [
          { lab: 'Effective when', val: 'Speed matters, or the leader genuinely knows best' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The second option describes when laissez-faire works and the third describes consensual ' +
             'leadership. No style is universally wrong.'
      },
      {
        id: 'i5d-4', type: 'mcq', marks: 2,
        prompt: 'Which style works well with highly motivated, experienced and educated personnel, and is found ' +
                'in laboratories and colleges?',
        options: ['Laissez-faire', 'Autocratic', 'Consensual', 'Consultative'],
        answer: 0,
        solution: [
          { lab: 'Laissez-faire', val: 'The group is given the task and the freedom to accomplish it' },
          { lab: 'Suits', val: 'Highly motivated, experienced, educated personnel' },
          { lab: 'Answer', val: 'Laissez-faire', final: true }
        ],
        why: 'It depends entirely on the people. The same hands-off approach applied to an inexperienced team ' +
             'would leave them without direction.'
      },
      {
        id: 'i5d-5', type: 'multi', marks: 3,
        prompt: 'Which of these describe the <b>participative</b> style? <b>Select all that apply.</b>',
        options: [
          'The manager encourages discussion of issues and alternatives',
          'The manager is concerned about subordinates’ ideas and attitudes',
          'The manager coaches subordinates and co-ordinates their efforts',
          'The manager is unconcerned about subordinates’ attitudes'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Participative', val: 'Shares decisions, encourages discussion, coaches and co-ordinates' },
          { lab: 'The last option', val: 'Describes the autocratic style' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'It is described as the style found in many successful organisations, which is not the same as ' +
             'saying it is right for every situation.'
      }
    ]
  },

  /* ═══════════════════════ SITUATIONAL LEADERSHIP ═══════════════════════ */
  {
    id: 'i5-situational',
    title: 'Situational Leadership',
    emoji: '🎯',
    summary: 'Fiedler’s contingency theory, and matching style to a follower’s maturity.',
    notes: [
      {
        heading: 'Fiedler’s contingency theory',
        emoji: '⚖️',
        html:
          '<p>First, understand the leader’s style — is the leader naturally <b>task-oriented</b> (focused on ' +
          'the goal) or <b>relationship-oriented</b> (focused on the team)?</p>' +
          '<div class="keybox"><b>Then analyse the situation on three factors</b>' +
          '<br><b>Leader-member relations</b> · trust' +
          '<br><b>Task structure</b> · clarity' +
          '<br><b>Position power</b> · authority</div>' +
          '<div class="keybox"><b>Then match them</b>' +
          '<br><b>Task-oriented</b> leaders excel in situations that are either <b>very favourable</b> (high ' +
          'control) or <b>very unfavourable</b> (low control).' +
          '<br><b>Relationship-oriented</b> leaders excel in situations of <b>moderate</b> favourability.</div>'
      },
      {
        heading: 'Hersey and Blanchard’s leadership cycle',
        emoji: '🔄',
        html:
          '<p>This model holds that the best leadership style depends on the <b>maturity level of the ' +
          'subordinate</b>.</p>' +
          '<div class="keybox"><b>Maturity</b> means both:' +
          '<br><b>Competence</b> · skills and knowledge' +
          '<br><b>Commitment</b> · confidence and motivation</div>' +
          '<p>It is drawn as a cycle, because a leader’s style should <b>evolve as an employee grows</b> — ' +
          'moving between combinations of high and low task behaviour and high and low relationship ' +
          'behaviour.</p>' +
          '<p>Nobody sits in one developmental stage permanently; the level is judged <b>task by task</b>.</p>'
      }
    ],
    questions: [
      {
        id: 'i5e-1', type: 'multi', marks: 3,
        prompt: 'Which three factors does Fiedler use to analyse a situation? <b>Select all that apply.</b>',
        options: [
          'Leader-member relations',
          'Task structure',
          'Position power',
          'Company profitability'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Leader-member relations', val: 'Trust' },
          { lab: 'Task structure', val: 'Clarity' },
          { lab: 'Position power', val: 'Authority' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'Together they determine how favourable the situation is, which is what decides which leader ' +
             'orientation will do best in it.'
      },
      {
        id: 'i5e-2', type: 'mcq', marks: 3,
        prompt: 'According to Fiedler, <b>task-oriented</b> leaders excel in situations that are:',
        options: [
          'Either very favourable or very unfavourable',
          'Only very favourable',
          'Only moderately favourable',
          'Only very unfavourable'
        ],
        answer: 0,
        solution: [
          { lab: 'Task-oriented', val: 'Excel at both extremes — high control or low control' },
          { lab: 'Relationship-oriented', val: 'Excel in moderate favourability' },
          { lab: 'Answer', val: 'Either very favourable or very unfavourable', final: true }
        ],
        why: 'The counter-intuitive part is that it is both extremes rather than one. In the middle, where ' +
             'relationships do the work, the relationship-oriented leader is stronger.'
      },
      {
        id: 'i5e-3', type: 'multi', marks: 3,
        prompt: 'In Hersey and Blanchard’s model, what does a subordinate’s <b>maturity</b> consist of? ' +
                '<b>Select all that apply.</b>',
        options: [
          'Competence — skills and knowledge',
          'Commitment — confidence and motivation',
          'Length of service',
          'Job title'
        ],
        answers: [0, 1],
        solution: [
          { lab: 'Competence', val: 'Skills and knowledge' },
          { lab: 'Commitment', val: 'Confidence and motivation' },
          { lab: 'Answer', val: 'The first two', final: true }
        ],
        why: 'Neither is about how long someone has been there. A capable person can be low in commitment, ' +
             'and an eager newcomer high in it — the two move independently.'
      },
      {
        id: 'i5e-4', type: 'mcq', marks: 3,
        prompt: 'What does Hersey and Blanchard’s model say determines the best leadership style?',
        options: [
          'The maturity level of the subordinate',
          'The personality of the leader',
          'The size of the organisation',
          'The industry the business operates in'
        ],
        answer: 0,
        solution: [
          { lab: 'The model', val: 'Style should match the subordinate’s maturity' },
          { lab: 'And', val: 'It should evolve as the employee grows' },
          { lab: 'Answer', val: 'The maturity level of the subordinate', final: true }
        ],
        why: 'It is drawn as a cycle for that reason: the right style for someone in their first month is the ' +
             'wrong style for the same person two years later.'
      },
      {
        id: 'i5e-5', type: 'mcq', marks: 3,
        scenario: 'A manager uses the same directive style with a brand-new team member and with a senior ' +
                  'specialist of ten years.',
        prompt: 'Why is this a mistake under situational leadership?',
        options: [
          'The two are at different maturity levels, so the same style cannot suit both',
          'Directive styles are never appropriate',
          'Senior staff should always be led autocratically',
          'New staff should be left to work independently'
        ],
        answer: 0,
        solution: [
          { lab: 'The new member', val: 'Needs direction; a hands-off style would leave them unsupported' },
          { lab: 'The specialist', val: 'Would find direction demoralising and micromanaging' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The whole point of the model is that style is matched to the person and the task, not applied ' +
             'uniformly across a team.'
      }
    ]
  },

  /* ═══════════════════════ TRUST ═══════════════════════ */
  {
    id: 'i5-trust',
    title: 'Trust & Leadership',
    emoji: '🤲',
    summary: 'The five dimensions employees use to judge whether a leader can be trusted.',
    notes: [
      {
        heading: 'The five pillars of trust',
        emoji: '🏛️',
        html:
          '<p>Brevis and Vrba (2014) identify five dimensions employees use to judge a leader’s ' +
          'trustworthiness:</p>' +
          '<div class="keybox"><b>Integrity</b> · honesty and truthfulness. Strong moral principles and keeping ' +
          'promises. Admitting a mistake instead of blaming others.' +
          '<br><br><b>Competence</b> · knowledge and skill. Trust is about capability as well as character — ' +
          'employees need to believe you know what you are doing, through well-informed decisions based on data ' +
          'and experience.' +
          '<br><br><b>Consistency</b> · reliability and good judgement. Being predictable in moods and ' +
          'decisions, applying rules fairly, handling similar situations the same way and following through on ' +
          'commitments.' +
          '<br><br><b>Loyalty</b> · willingness to protect and support. Having the team’s back, supporting them ' +
          'in front of others, and genuinely caring about their wellbeing.' +
          '<br><br><b>Openness</b> · transparency and information sharing.</div>'
      }
    ],
    questions: [
      {
        id: 'i5f-1', type: 'multi', marks: 3,
        prompt: 'Which of these are the five pillars of trust? <b>Select all that apply.</b>',
        options: [
          'Integrity',
          'Competence',
          'Consistency',
          'Loyalty',
          'Openness',
          'Seniority'
        ],
        answers: [0, 1, 2, 3, 4],
        solution: [
          { lab: 'The five pillars', val: 'Integrity, competence, consistency, loyalty and openness' },
          { lab: 'Seniority', val: 'Not one of them — trust is not conferred by rank' },
          { lab: 'Answer', val: 'The first five', final: true }
        ],
        why: 'Seniority is the tempting wrong answer precisely because position and trust are so often ' +
             'confused. A job title can compel compliance but cannot produce trust.'
      },
      {
        id: 'i5f-2', type: 'match', marks: 4,
        prompt: 'Match each pillar of trust to what it means.',
        pairs: [
          { left: 'Integrity', right: 'Honesty, strong moral principles, and keeping promises' },
          { left: 'Competence', right: 'The knowledge and skill to make well-informed decisions' },
          { left: 'Consistency', right: 'Being predictable and applying rules fairly' },
          { left: 'Loyalty', right: 'Protecting and supporting the team, and having their back' }
        ],
        solution: [
          { lab: 'Integrity', val: 'Character' },
          { lab: 'Competence', val: 'Capability' },
          { lab: 'Consistency', val: 'Predictability' },
          { lab: 'Loyalty', val: 'Protection' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'Integrity and competence are the pair worth separating: a leader can be entirely honest and ' +
             'still not be trusted, if the team does not believe they know what they are doing.'
      },
      {
        id: 'i5f-3', type: 'mcq', marks: 3,
        prompt: 'Which pillar of trust is about <b>capability rather than character</b>?',
        options: ['Competence', 'Integrity', 'Loyalty', 'Openness'],
        answer: 0,
        solution: [
          { lab: 'Competence', val: 'Knowledge and skill — employees must believe you know what you are doing' },
          { lab: 'Answer', val: 'Competence', final: true }
        ],
        why: 'It is the pillar people leave out when they think of trust as purely moral. Both halves are ' +
             'needed.'
      },
      {
        id: 'i5f-4', type: 'mcq', marks: 2,
        prompt: 'A leader who handles similar situations with the same fairness and follows through on ' +
                'commitments is demonstrating:',
        options: ['Consistency', 'Openness', 'Loyalty', 'Competence'],
        answer: 0,
        solution: [
          { lab: 'Consistency', val: 'Reliability and good judgement' },
          { lab: 'Its effect', val: 'Creates a sense of safety and stability' },
          { lab: 'Answer', val: 'Consistency', final: true }
        ],
        why: 'Employees need to know what to expect. Unpredictability costs trust even when each individual ' +
             'decision is defensible.'
      },
      {
        id: 'i5f-5', type: 'mcq', marks: 2,
        prompt: 'Which pillar involves supporting the team in front of others and caring about their wellbeing?',
        options: ['Loyalty', 'Integrity', 'Consistency', 'Competence'],
        answer: 0,
        solution: [
          { lab: 'Loyalty', val: 'Willingness to protect and support' },
          { lab: 'In practice', val: 'Publicly defending the team and not putting them in a difficult position' },
          { lab: 'Answer', val: 'Loyalty', final: true }
        ],
        why: 'It is directional — loyalty here means the leader’s loyalty downwards to the team, not the ' +
             'team’s loyalty upwards.'
      }
    ]
  },

  /* ═══════════════════════ CONTEMPORARY LEADERSHIP ═══════════════════════ */
  {
    id: 'i5-contemporary',
    title: 'Contemporary Leadership',
    emoji: '✨',
    summary: 'Transactional against transformational, and the styles built on values.',
    notes: [
      {
        heading: 'Transactional and transformational',
        emoji: '🔀',
        html:
          '<div class="keybox"><b>Transactional leaders</b> are motivated to <b>maintain the status quo</b>. ' +
          'Extremely task-oriented, managing through clear exchanges and incentives — rewards such as bonuses ' +
          'or praise for good performance, and corrective action for deviations from the plan. Effective in ' +
          'stable, routine environments where consistency and efficiency are key.' +
          '<br><br><b>Transformational leaders</b> are driven to <b>change things</b>. They do not rely on ' +
          'external incentives but inspire followers by appealing to their values and sense of purpose.</div>' +
          '<p>Transformational leadership "is viewed as a leader’s effect on followers in that the followers ' +
          'feel trust, admiration, loyalty and respect for their leader and are motivated to do more than is ' +
          'expected of them" (Du Toit et al., 2008).</p>' +
          '<p>They motivate through charisma, act as <b>mentors</b> attentive to each follower’s needs, ' +
          'challenge assumptions, encourage creativity, and provide a vision of the future. Research links the ' +
          'style to <b>higher follower satisfaction, better performance and increased organisational ' +
          'loyalty</b>, which matters more in a turbulent business environment.</p>'
      },
      {
        heading: 'Ethical leadership and diversity',
        emoji: '🧭',
        html:
          '<p>One of the most important tasks of leadership is to identify and live by the organisation’s ' +
          'purpose and ethical values. <b>A leader’s personal values generally become the organisation’s ' +
          'values</b>, and the ethical standard set by leaders filters down through every level of management ' +
          'and to all employees.</p>' +
          '<div class="keybox"><b>Best practices for managing diversity</b>' +
          '<br><b>1.</b> Secure top-level commitment — a shared vision from the top, championed by senior ' +
          'leadership' +
          '<br><b>2.</b> Actively identify new talent pools, to find people from non-traditional backgrounds' +
          '<br><b>3.</b> Create an environment where employees feel safe to connect and discuss ' +
          'diversity-related issues, such as mentorship programmes' +
          '<br><b>4.</b> Make diversity a measurable part of the company’s goals</div>'
      }
    ],
    questions: [
      {
        id: 'i5g-1', type: 'match', marks: 4,
        prompt: 'Match each statement to the leadership approach it describes.',
        pairs: [
          { left: 'What transactional leadership seeks', right: 'To maintain the status quo through exchanges and incentives' },
          { left: 'What transformational leadership seeks', right: 'To change things by appealing to values and sense of purpose' },
          { left: 'Where transactional leadership works best', right: 'Stable, routine environments where consistency and efficiency are key' },
          { left: 'Where transformational leadership matters most', right: 'Turbulent environments needing fully engaged employees' }
        ],
        solution: [
          { lab: 'Transactional', val: 'Rewards for performance, corrective action for deviation' },
          { lab: 'Transformational', val: 'Inspiration rather than external incentives' },
          { lab: 'The environment', val: 'Decides which of the two fits' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'They are not a good-and-bad pair. Transactional leadership is effective in stable, routine ' +
             'environments where consistency is what the work needs.'
      },
      {
        id: 'i5g-2', type: 'mcq', marks: 3,
        prompt: 'In which environment is <b>transactional</b> leadership most effective?',
        options: [
          'Stable, routine environments where consistency and efficiency are key',
          'Turbulent environments requiring constant innovation',
          'Organisations undergoing major cultural change',
          'Start-ups with no established processes'
        ],
        answer: 0,
        solution: [
          { lab: 'Transactional', val: 'Clear exchanges, incentives and corrective action' },
          { lab: 'Suits', val: 'Stable, routine work where predictability is the goal' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The other three are exactly where transformational leadership is described as increasingly ' +
             'important.'
      },
      {
        id: 'i5g-3', type: 'multi', marks: 3,
        prompt: 'What does research link <b>transformational</b> leadership to? <b>Select all that apply.</b>',
        options: [
          'Higher follower satisfaction',
          'Better performance',
          'Increased organisational loyalty',
          'Lower salary costs'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Satisfaction, performance, loyalty', val: 'All three linked to transformational leadership' },
          { lab: 'Salary costs', val: 'Not among the findings' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'It is tied to fully engaged employees, which is why the style is described as increasingly ' +
             'important in a turbulent business environment.'
      },
      {
        id: 'i5g-4', type: 'multi', marks: 3,
        prompt: 'Which of these are best practices for managing diversity? <b>Select all that apply.</b>',
        options: [
          'Secure top-level commitment with a shared vision from senior leadership',
          'Actively identify new talent pools from non-traditional backgrounds',
          'Create an environment where employees feel safe to discuss diversity issues',
          'Make diversity a measurable part of the company’s goals',
          'Leave the matter entirely to the HR department'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'The four practices', val: 'Top-level commitment, new talent pools, a safe environment, measurable goals' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'The first practice is the reason the last option fails: it requires a proactive and committed ' +
             'approach championed from the top, not delegation to one department.'
      },
      {
        id: 'i5g-5', type: 'mcq', marks: 3,
        prompt: 'Why do a leader’s personal values matter so much to ethical leadership?',
        options: [
          'They generally become the organisation’s values, filtering down to every level',
          'They determine the company’s profitability',
          'They are legally binding on employees',
          'They replace the need for a code of ethics'
        ],
        answer: 0,
        solution: [
          { lab: 'A leader’s values', val: 'Generally become the organisation’s values' },
          { lab: 'The standard they set', val: 'Filters down through every level of management and to all employees' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'It connects to Week 1, where leading by example was named the most powerful of the four ways of ' +
             'managing ethics — for exactly this reason.'
      }
    ]
  },

  /* ═══════════════════════ MOTIVATION ═══════════════════════ */
  {
    id: 'i5-motivation',
    title: 'Motivating Employees',
    emoji: '🔋',
    summary: 'The performance equation, and the cycle a motivated person moves through.',
    notes: [
      {
        heading: 'Why motivation matters',
        emoji: '⚡',
        html:
          '<p><b>Motivation</b> is about activating and inspiring people to do their job (Lazenby, 2016). Just ' +
          'because an employee <i>can</i> do a job through skills and training does not mean they are motivated ' +
          'to do it well — and if motivation is lacking, performance suffers regardless of ability.</p>' +
          '<div class="keybox"><b>The performance equation</b> — a three-legged stool that only stands if all ' +
          'three legs are strong:<br><b>Motivation</b> · <b>Ability</b> · <b>Work environment</b></div>'
      },
      {
        heading: 'The motivation process',
        emoji: '🔁',
        html:
          '<div class="keybox"><b>Need</b> · an unsatisfied need exists' +
          '<br><b>Motive</b> · the need becomes a motive to achieve something' +
          '<br><b>Behaviour</b> · the motive leads to certain behaviours' +
          '<br><b>Consequence</b> · the behaviour produces a result' +
          '<br><b>Level of satisfaction</b> · the need is either satisfied or not' +
          '<br><b>Feedback</b> · which starts the process again</div>' +
          '<p>If the need remains unsatisfied the process begins again — possibly elsewhere, if the employee ' +
          'looks for another job. And satisfaction may be brief: people have many needs, and once one is ' +
          'satisfied they move on to the next.</p>'
      }
    ],
    questions: [
      {
        id: 'i5h-1', type: 'multi', marks: 3,
        prompt: 'What are the three parts of the performance equation? <b>Select all that apply.</b>',
        options: ['Motivation', 'Ability', 'Work environment', 'Salary'],
        answers: [0, 1, 2],
        solution: [
          { lab: 'The three legs', val: 'Motivation, ability and work environment' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'All three must be strong. A capable, motivated employee in a poor work environment still ' +
             'underperforms, which is why it is drawn as a stool rather than a sum.'
      },
      {
        id: 'i5h-2', type: 'mcq', marks: 2,
        prompt: 'Motivation is defined as:',
        options: [
          'Activating and inspiring people to do their job',
          'Training employees in the skills their job requires',
          'Paying employees fairly for their work',
          'Monitoring whether employees meet their targets'
        ],
        answer: 0,
        solution: [
          { lab: 'Motivation', val: 'Activating and inspiring people to do their job' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Training addresses ability, which is a separate leg of the same stool. Being able to do the job ' +
             'and wanting to do it well are different problems.'
      },
      {
        id: 'i5h-3', type: 'mcq', marks: 3,
        prompt: 'What happens in the motivation process when a need remains <b>unsatisfied</b>?',
        options: [
          'The process begins again, possibly at another organisation',
          'The employee stops having needs',
          'The need is replaced by a lower-level one permanently',
          'Motivation becomes impossible'
        ],
        answer: 0,
        solution: [
          { lab: 'Dissatisfaction', val: 'The need remains, and the process starts over' },
          { lab: 'Possibly', val: 'By seeking a position elsewhere' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'That is the practical consequence for a business: an unmet need does not disappear, it goes ' +
             'looking for somewhere else to be met.'
      },
      {
        id: 'i5h-4', type: 'mcq', marks: 3,
        prompt: 'Why is satisfying an employee’s need often only a <b>brief</b> solution?',
        options: [
          'People have many needs — once one is satisfied they move on to the next',
          'Employees forget they were satisfied',
          'Managers rarely follow through on promises',
          'Satisfaction cannot be measured'
        ],
        answer: 0,
        solution: [
          { lab: 'Once satisfied', val: 'The person moves on to the next need' },
          { lab: 'Example', val: 'A promotion to team leader is followed by a wish to reach middle management' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'It is why motivation is a continuous management task rather than a problem that gets solved ' +
             'once.'
      },
      {
        id: 'i5h-5', type: 'mcq', marks: 2,
        prompt: 'An employee has the skills and training to do a job well but performs poorly anyway. According ' +
                'to the performance equation, which leg is most likely weak?',
        options: [
          'Motivation or the work environment',
          'Ability',
          'None — the equation does not apply',
          'All three equally'
        ],
        answer: 0,
        solution: [
          { lab: 'Ability', val: 'Confirmed present — they have the skills and training' },
          { lab: 'So the weakness lies in', val: 'Motivation or the work environment' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'This is the diagnostic value of the equation: ruling out one leg tells a manager where to ' +
             'actually look.'
      }
    ]
  },

  /* ═══════════════════════ CONTENT THEORIES ═══════════════════════ */
  {
    id: 'i5-needs',
    title: 'Theories of Needs',
    emoji: '🪜',
    summary: 'Maslow, Alderfer, Herzberg and McClelland — what people want.',
    notes: [
      {
        heading: 'Maslow and Alderfer',
        emoji: '🔺',
        html:
          '<p><b>Maslow’s Hierarchy of Needs</b> (Abraham Maslow) is a five-level pyramid. A leader’s role is ' +
          'to help employees satisfy needs at all levels — if the foundational needs are shaky it is very ' +
          'difficult to be motivated by higher-level goals. An employee worried about job security (safety) ' +
          'will not be motivated by an Employee of the Month award (esteem).</p>' +
          '<div class="keybox"><b>Alderfer’s ERG theory</b> reduces this to three: <b>Existence</b>, ' +
          '<b>Relatedness</b> and <b>Growth</b>.' +
          '<br><br>Two differences matter. You can be motivated by <b>more than one need at a time</b> — two ' +
          'or three simultaneously. And if frustrated in satisfying a higher need, an employee may ' +
          '<b>regress</b> and intensify focus on a lower one: a demand for higher pay may be a symptom of a ' +
          'stifling environment offering no growth.</div>'
      },
      {
        heading: 'Herzberg and McClelland',
        emoji: '⚖️',
        html:
          '<p><b>Herzberg’s Two-Factor Theory</b> found that the factors leading to job <b>satisfaction</b> are ' +
          '<b>separate from</b> those leading to <b>dissatisfaction</b> — which is where the name comes from. ' +
          'The things that make us dissatisfied are not simply the opposite of the things that satisfy us.</p>' +
          '<div class="keybox"><b>Motivators</b> (drive satisfaction) · a challenging job · personal growth ' +
          'opportunities · recognition · feelings of achievement' +
          '<br><b>Hygiene factors</b> (drive dissatisfaction) · company policy · administration · quality of ' +
          'supervision</div>' +
          '<p><b>McClelland’s theory of needs</b> differs from the others in that the needs are <b>learned</b> ' +
          'through life experience and culture rather than instinctive:</p>' +
          '<div class="keybox"><b>nAch — Need for Achievement</b> · to excel against a standard. Wants ' +
          'challenging but achievable goals, clear feedback, and personal responsibility for outcomes.' +
          '<br><b>nPow — Need for Power</b> · to be influential and make an impact. Can be personalised or, ' +
          'more positively, <b>socialised</b> — using power to build up the team.' +
          '<br><b>nAff — Need for Affiliation</b> · warm, close relationships and belonging. Wants harmonious ' +
          'environments and social approval.</div>'
      }
    ],
    questions: [
      {
        id: 'i5i-1', type: 'multi', marks: 3,
        prompt: 'What are the three needs in Alderfer’s <b>ERG</b> theory? <b>Select all that apply.</b>',
        options: ['Existence', 'Relatedness', 'Growth', 'Esteem'],
        answers: [0, 1, 2],
        solution: [
          { lab: 'ERG', val: 'Existence, Relatedness, Growth' },
          { lab: 'Esteem', val: 'A level in Maslow’s hierarchy, not one of Alderfer’s three' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'Esteem is the tempting wrong answer because the two theories overlap heavily — ERG is a ' +
             'condensed version of the same idea.'
      },
      {
        id: 'i5i-2', type: 'mcq', marks: 3,
        prompt: 'What does ERG theory say that Maslow’s hierarchy does not?',
        options: [
          'More than one need can motivate at the same time, and frustration can cause regression to a lower need',
          'Needs must be satisfied strictly in order',
          'Only physical needs genuinely motivate',
          'Needs are learned rather than instinctive'
        ],
        answer: 0,
        solution: [
          { lab: 'Simultaneous', val: 'Two or three needs can influence behaviour at once' },
          { lab: 'Regression', val: 'Frustration at a higher need intensifies focus on a lower one' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The regression idea is practically useful: a demand for more money may be a symptom of no ' +
             'growth or poor relationships rather than a genuine pay problem.'
      },
      {
        id: 'i5i-3', type: 'multi', marks: 3,
        prompt: 'Which of these are <b>motivators</b> in Herzberg’s Two-Factor Theory? <b>Select all that apply.</b>',
        options: [
          'A challenging job',
          'Personal growth opportunities',
          'Recognition',
          'Company policy',
          'Quality of supervision'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Motivators', val: 'Challenging job, growth opportunities, recognition, feelings of achievement' },
          { lab: 'Hygiene factors', val: 'Company policy, administration, quality of supervision' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'Hygiene factors sit <i>around</i> the job; motivators are in the job itself. Fixing hygiene ' +
             'removes dissatisfaction but does not create satisfaction.'
      },
      {
        id: 'i5i-4', type: 'mcq', marks: 3,
        prompt: 'What was Herzberg’s central finding?',
        options: [
          'The factors causing job satisfaction are separate from those causing dissatisfaction',
          'Satisfaction and dissatisfaction are opposite ends of one scale',
          'Only pay affects job satisfaction',
          'Job satisfaction has no effect on productivity'
        ],
        answer: 0,
        solution: [
          { lab: 'The finding', val: 'Two separate sets of factors, hence "two-factor"' },
          { lab: 'Meaning', val: 'Removing what dissatisfies does not automatically create satisfaction' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The second option is exactly the assumption Herzberg disproved, and it is the one most people ' +
             'hold instinctively.'
      },
      {
        id: 'i5i-5', type: 'match', marks: 3,
        prompt: 'Match each of McClelland’s needs to what a person driven by it wants.',
        pairs: [
          { left: 'Need for Achievement (nAch)', right: 'Challenging but achievable goals, clear feedback and personal responsibility' },
          { left: 'Need for Power (nPow)', right: 'Influence, leadership positions and having their ideas adopted' },
          { left: 'Need for Affiliation (nAff)', right: 'Harmonious environments, collaboration and social approval' }
        ],
        solution: [
          { lab: 'nAch', val: 'To excel against a standard' },
          { lab: 'nPow', val: 'To be influential and make an impact' },
          { lab: 'nAff', val: 'Warm, close relationships and belonging' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The managerial task is to identify an employee’s dominant need and offer opportunities that ' +
             'satisfy it — a high-nAff person in a solitary competitive role will be demotivated.'
      },
      {
        id: 'i5i-6', type: 'mcq', marks: 3,
        prompt: 'How does McClelland’s theory differ fundamentally from Maslow’s and Alderfer’s?',
        options: [
          'His needs are learned through life experience and culture, not instinctive',
          'His needs apply only to managers',
          'He identifies five needs rather than three',
          'His needs must be satisfied in a fixed order'
        ],
        answer: 0,
        solution: [
          { lab: 'Maslow and Alderfer', val: 'Universal, instinctive needs' },
          { lab: 'McClelland', val: 'Motivational needs are learned and reinforced over time' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'If needs are learned, they differ from person to person by background — which is why the theory ' +
             'is about identifying an individual’s dominant need rather than assuming a common ladder.'
      },
      {
        id: 'i5i-7', type: 'mcq', marks: 2,
        prompt: 'What is <b>socialised</b> power in McClelland’s theory?',
        options: [
          'Using power to build up the team and achieve organisational goals',
          'Power derived from social media influence',
          'Power granted by a vote of colleagues',
          'The need to be liked by others'
        ],
        answer: 0,
        solution: [
          { lab: 'Personalised power', val: 'Power for its own sake' },
          { lab: 'Socialised power', val: 'Power used to build up the team and achieve organisational goals' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The distinction matters for selection: someone high in socialised power and low in affiliation ' +
             'can make an excellent manager, being driven to lead without needing to be everyone’s friend.'
      }
    ]
  },

  /* ═══════════════════════ PROCESS THEORIES ═══════════════════════ */
  {
    id: 'i5-process',
    title: 'Expectancy, Equity & Goal-Setting',
    emoji: '⚙️',
    summary: 'The three theories about how people decide whether effort is worth it.',
    notes: [
      {
        heading: 'Expectancy theory',
        emoji: '🧮',
        html:
          '<p>Vroom’s theory is called a <b>process theory</b> because it describes the mental calculation we ' +
          'go through before acting. Three components:</p>' +
          '<div class="keybox"><b>Expectancy</b> · <i>"Can I do it?"</i> The perceived link between <b>effort ' +
          'and performance</b>.' +
          '<br><br><b>Instrumentality</b> · <i>"Will I be rewarded?"</i> The perceived link between ' +
          '<b>performance and outcome</b>. Influenced by trust in management to keep promises, clear consistent ' +
          'policies linking performance to rewards, and transparency in how rewards are decided.' +
          '<br><br><b>Valence</b> · <i>"Do I want the reward?"</i> The attractiveness or value of the outcome ' +
          '<b>to that individual</b>, influenced by their personal needs, goals and values. A bonus has high ' +
          'valence for someone saving for a house; extra time off has high valence for a new parent.</div>'
      },
      {
        heading: 'Equity and goal-setting',
        emoji: '⚖️',
        html:
          '<p><b>Equity theory</b> (Stacey Adams) states that employees compare their efforts and rewards with ' +
          'those of other employees in similar situations. Individuals are motivated by the desire to be ' +
          'treated equally.</p>' +
          '<div class="keybox">The equity in this theory refers to <b>perceived equity, not actual equity</b>. ' +
          'A state of equity exists when the <b>input-outcome ratio</b> of one employee equals that of another ' +
          'employee on the same level. An unequal ratio is seen as unfair.</div>' +
          '<p><b>Goal-setting theory</b> (refined by Edwin Locke and Gary Latham) holds that performance ' +
          'improves when employees strive towards a goal, because a goal directs attention and motivates ' +
          'action. An effective goal must be <b>SMART</b>.</p>' +
          '<div class="keybox"><b>The more challenging the goal, the higher the performance</b> — provided ' +
          'employees are <b>committed</b> to accomplishing it. Commitment comes from <b>collaboration</b> ' +
          'between the employee and the organisation on the goal. <b>Feedback</b> tells employees whether they ' +
          'are on track, and expectations must remain realistic.</div>'
      }
    ],
    questions: [
      {
        id: 'i5j-1', type: 'match', marks: 3,
        prompt: 'Match each component of expectancy theory to the question it answers.',
        pairs: [
          { left: 'Expectancy', right: 'Can I do it? — the link between effort and performance' },
          { left: 'Instrumentality', right: 'Will I be rewarded? — the link between performance and outcome' },
          { left: 'Valence', right: 'Do I want the reward? — how much the outcome is valued' }
        ],
        solution: [
          { lab: 'Expectancy', val: 'Effort to performance' },
          { lab: 'Instrumentality', val: 'Performance to outcome' },
          { lab: 'Valence', val: 'The value of that outcome to the individual' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'All three must hold. A reward nobody wants motivates nobody, however achievable the target and ' +
             'however trustworthy the manager.'
      },
      {
        id: 'i5j-2', type: 'mcq', marks: 3,
        prompt: 'A manager wants to strengthen <b>instrumentality</b>. What should they do?',
        options: [
          'Be trustworthy, define clearly what performance leads to which rewards, and apply policies consistently',
          'Offer larger bonuses than competitors',
          'Set easier targets so employees can succeed',
          'Ask employees which rewards they would prefer'
        ],
        answer: 0,
        solution: [
          { lab: 'Instrumentality', val: 'The belief that performing well actually brings the promised reward' },
          { lab: 'Strengthened by', val: 'Trust, clarity about what earns what, and consistent application' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The third option addresses expectancy and the fourth valence. Each component has its own remedy, ' +
             'which is what makes the theory useful to a manager.'
      },
      {
        id: 'i5j-3', type: 'mcq', marks: 3,
        prompt: 'In equity theory, the equity being described is:',
        options: [
          'Perceived equity, not actual equity',
          'Actual equity, measured objectively',
          'Equity in the accounting sense — the owners’ stake',
          'Equal pay for every employee'
        ],
        answer: 0,
        solution: [
          { lab: 'Equity theory', val: 'Concerns perceived equity, not actual equity' },
          { lab: 'A state of equity', val: 'When one employee’s input-outcome ratio equals another’s at the same level' },
          { lab: 'Answer', val: 'Perceived equity', final: true }
        ],
        why: 'This is what makes it a management problem rather than a payroll one: an objectively fair ' +
             'arrangement still demotivates if it is not perceived as fair.'
      },
      {
        id: 'i5j-4', type: 'mcq', marks: 2,
        prompt: 'Who developed equity theory?',
        options: ['Stacey Adams', 'Victor Vroom', 'Frederick Herzberg', 'David McClelland'],
        answer: 0,
        solution: [
          { lab: 'Equity theory', val: 'Stacey Adams' },
          { lab: 'Answer', val: 'Stacey Adams', final: true }
        ],
        why: 'Vroom gave expectancy theory, Herzberg the two-factor theory and McClelland the learned needs. ' +
             'Four theorists, four separate ideas.'
      },
      {
        id: 'i5j-5', type: 'multi', marks: 3,
        prompt: 'According to goal-setting theory, what makes a challenging goal raise performance? ' +
                '<b>Select all that apply.</b>',
        options: [
          'The employee is committed to accomplishing it',
          'There has been collaboration on the goal between employee and organisation',
          'Feedback tells the employee whether they are on track',
          'The goal is kept secret from the employee’s team'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Commitment', val: 'The condition on which the whole effect depends' },
          { lab: 'Collaboration', val: 'How commitment is generated' },
          { lab: 'Feedback', val: 'Lets employees adjust effort and strategy' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'Difficulty alone does not raise performance. A hard goal imposed on someone who never agreed to ' +
             'it produces disengagement rather than effort.'
      },
      {
        id: 'i5j-6', type: 'mcq', marks: 2,
        prompt: 'Why is Vroom’s expectancy theory called a <b>process</b> theory?',
        options: [
          'It describes the mental calculation a person goes through before acting',
          'It applies only to production processes',
          'It describes the process of setting goals',
          'It must be applied in a fixed sequence of steps'
        ],
        answer: 0,
        solution: [
          { lab: 'Process theory', val: 'Describes the reasoning that leads to action' },
          { lab: 'The questions asked', val: 'Can I do it? Will I be rewarded? Do I want the reward?' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'It contrasts with the content theories — Maslow, ERG, Herzberg and McClelland — which describe ' +
             '<i>what</i> people want rather than <i>how</i> they decide to act.'
      }
    ]
  },

  /* ═══════════════════════ CHARISMATIC, VISIONARY, SERVANT ═══════════════════════ */
  {
    id: 'i5-servant',
    title: 'Charismatic, Visionary & Servant Leadership',
    emoji: '🌟',
    summary: 'Leading by presence, by vision, and by putting the team first.',
    notes: [
      {
        heading: 'Charismatic and visionary',
        emoji: '💫',
        html:
          '<p><b>Charismatic leaders</b> create an <b>emotional connection</b> that drives extraordinary ' +
          'effort. They motivate individuals to go above and beyond their usual responsibilities, create an ' +
          'atmosphere of change, and have a profound emotional impact on followers. A strong, positive ' +
          'relationship exists between a charismatic leader and employee performance.</p>' +
          '<div class="keybox"><b>Traits of a charismatic leader</b>' +
          '<br>Self-confidence, with belief in themselves and their mission' +
          '<br>A clear and exciting picture of the future' +
          '<br>Strong communication skills, articulating a vision that resonates with followers' +
          '<br>Often seen as unique, original and counter-cultural' +
          '<br>Able to read the needs of followers and the opportunities in the market</div>' +
          '<p><b>Visionary leadership goes beyond charisma.</b> While visionary leaders are often charismatic, ' +
          'a visionary leader creates and communicates a vision that is <b>realistic, credible and ' +
          'inspirational</b>, so that people genuinely want to be part of it. Transformational leaders are ' +
          'often visionary leaders.</p>'
      },
      {
        heading: 'Stewardship and servant leadership',
        emoji: '🌱',
        html:
          '<p><b>Stewardship</b> describes how leaders empower others to make decisions and gain control over ' +
          'their work. Stewards <b>lead with their team, not over them</b>, and sincerely care about their ' +
          'subordinates’ development and success. This creates a team-oriented environment built on trust, ' +
          'where decision-making is <b>decentralised</b> and power is shared, because what matters is the ' +
          'team’s collective capability.</p>' +
          '<p><b>Servant leadership takes stewardship a step further.</b> These leaders do not seek the ' +
          'spotlight and devote themselves entirely to a greater cause. It is about working <b>selflessly</b> ' +
          'with others to achieve shared goals that improve <b>collective rather than individual welfare</b>.</p>'
      }
    ],
    questions: [
      {
        id: 'i5k-1', type: 'mcq', marks: 3,
        prompt: 'What distinguishes <b>visionary</b> leadership from charismatic leadership?',
        options: [
          'A visionary leader creates and communicates a vision that is realistic, credible and inspirational',
          'A visionary leader has a more magnetic personality',
          'A visionary leader avoids emotional connection with followers',
          'They are two names for the same thing'
        ],
        answer: 0,
        solution: [
          { lab: 'Charismatic', val: 'Creates an emotional connection driving extraordinary effort' },
          { lab: 'Visionary', val: 'Goes beyond charisma — a realistic, credible and inspirational vision' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Visionary leaders are often charismatic, but charisma alone is personality. The vision has to be ' +
             'credible enough that people genuinely want to be part of it.'
      },
      {
        id: 'i5k-2', type: 'multi', marks: 3,
        prompt: 'Which of these are traits of a <b>charismatic</b> leader? <b>Select all that apply.</b>',
        options: [
          'Self-confidence and belief in their mission',
          'A clear and exciting picture of the future',
          'Strong communication skills that make a vision resonate',
          'Able to read followers’ needs and market opportunities',
          'A preference for working alone'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'The traits', val: 'Self-confidence, a picture of the future, communication skills, reading needs and opportunities' },
          { lab: 'Also', val: 'Often seen as unique, original and counter-cultural' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Every trait listed is outward-facing. Charisma is defined by its effect on other people, so a ' +
             'preference for solitude contradicts it.'
      },
      {
        id: 'i5k-3', type: 'mcq', marks: 2,
        prompt: 'What is <b>stewardship</b> in leadership?',
        options: [
          'Empowering others to make decisions and gain control over their work',
          'Directing subordinates closely to ensure quality',
          'Managing the organisation’s financial assets',
          'Taking personal credit for team achievements'
        ],
        answer: 0,
        solution: [
          { lab: 'Stewardship', val: 'Leaders empower others to decide and to control their own work' },
          { lab: 'Stewards', val: 'Lead <i>with</i> their team, not over them' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The "with, not over" phrasing is the whole idea. Decision-making is decentralised and power is ' +
             'shared, because the team’s collective capability is what matters.'
      },
      {
        id: 'i5k-4', type: 'mcq', marks: 3,
        prompt: 'How does <b>servant leadership</b> go beyond stewardship?',
        options: [
          'Servant leaders do not seek the spotlight and devote themselves entirely to a greater cause',
          'Servant leaders retain all decision-making authority',
          'Servant leaders focus on individual rather than collective welfare',
          'Servant leaders avoid delegating any responsibility'
        ],
        answer: 0,
        solution: [
          { lab: 'Stewardship', val: 'Empowering the team and sharing power' },
          { lab: 'Servant leadership', val: 'A step further — selfless service to a greater cause' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The third option inverts it exactly: servant leadership is about shared goals improving ' +
             '<i>collective</i> rather than individual welfare.'
      },
      {
        id: 'i5k-5', type: 'multi', marks: 3,
        prompt: 'Which of these describe a <b>stewardship</b> environment? <b>Select all that apply.</b>',
        options: [
          'Decision-making is decentralised',
          'Power is shared among the team',
          'The leader cares about subordinates’ development and success',
          'The leader keeps authority concentrated at the top'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Decentralised', val: 'Decisions move to the team' },
          { lab: 'Shared power', val: 'Collective capability is the point' },
          { lab: 'Development', val: 'Sincere care for subordinates’ growth' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'The last option is the opposite arrangement. Concentrating authority at the top is precisely ' +
             'what leading "over" a team rather than "with" it looks like.'
      }
    ]
  },

  /* ═══════════════════════ MOTIVATION IN PRACTICE ═══════════════════════ */
  {
    id: 'i5-practice',
    title: 'Motivation in Practice',
    emoji: '🛠️',
    summary: 'Strategies leaders actually use, how to spot morale, and what money can and cannot do.',
    notes: [
      {
        heading: 'Strategies for building a motivated team',
        emoji: '📋',
        html:
          '<div class="keybox"><b>Job design</b> · redesigning jobs to be satisfying and challenging — job ' +
          'rotation, job enlargement (horizontal loading) and job enrichment (vertical loading)' +
          '<br><b>Employee involvement</b> · participative management, and quality circles — small groups who ' +
          'take responsibility for solving quality problems and generate their own solutions' +
          '<br><b>Career management</b> · helping employees identify and follow a path to their aspirations' +
          '<br><b>Management-by-Objectives (MBO)</b> · a direct application of goal-setting theory' +
          '<br><b>Training and education</b> · learning opportunities motivate because they support growth' +
          '<br><b>Employee-recognition programmes</b> · formally acknowledging above-average performance' +
          '<br><b>Empowerment programmes</b> · letting employees set their own goals, decide and solve problems' +
          '<br><b>Reward systems</b> · linking performance to rewards, tied to expectancy theory' +
          '<br><b>Intrapreneurial incentives</b> · financial and institutional support for employees to develop ' +
          'their own ideas and innovations' +
          '<br><b>Employee engagement</b> · the ultimate goal — a bond formed when the employee’s need to ' +
          'contribute meets the organisation’s goals</div>' +
          '<p><b>MBO</b> cascades organisational goals down to individual objectives. Managers and employees ' +
          '<b>jointly set goals</b>, determine how to measure them, and agree on timelines, with regular ' +
          'feedback provided.</p>'
      },
      {
        heading: 'Monitoring motivation, and money',
        emoji: '📈',
        html:
          '<p>You cannot manage what you do not measure. Indicators of morale in the workplace:</p>' +
          '<div class="keybox"><b>High morale</b> · high commitment to team and organisation · high ' +
          'productivity · good customer service · good work attendance · low employee turnover · ' +
          '<b>constructive</b> conflict' +
          '<br><br><b>Low morale</b> · low commitment · low productivity · poor customer service · high sick ' +
          'leave and absenteeism · high employee turnover · <b>destructive</b> conflict</div>' +
          '<p><b>Money as a motivator.</b> Under equity theory, money is the <b>yardstick for comparison</b> — ' +
          'salary and bonuses are how we compare our input-outcome ratio with others. Under expectancy theory, ' +
          'money motivates only if all three conditions hold: effort leads to performance, performance leads to ' +
          'the reward, and the employee genuinely values the money.</p>' +
          '<div class="keybox">Money is often a <b>threshold factor</b>. Once a fair and competitive wage is ' +
          'met, its power to generate sustained motivation diminishes, and purpose and growth become more ' +
          'powerful drivers. Money can <b>prevent dissatisfaction</b> and <b>reward performance</b>, but it ' +
          'cannot create lasting job satisfaction or engagement on its own.</div>'
      }
    ],
    questions: [
      {
        id: 'i5l-1', type: 'mcq', marks: 3,
        prompt: '<b>Management-by-Objectives (MBO)</b> is a direct application of which theory?',
        options: [
          'Goal-setting theory',
          'Equity theory',
          'Herzberg’s two-factor theory',
          'Maslow’s hierarchy of needs'
        ],
        answer: 0,
        solution: [
          { lab: 'MBO', val: 'Cascades organisational goals down to individual objectives' },
          { lab: 'Managers and employees', val: 'Jointly set goals, agree measures and timelines, with regular feedback' },
          { lab: 'Answer', val: 'Goal-setting theory', final: true }
        ],
        why: 'Every element of MBO maps onto goal-setting theory: specific goals, joint agreement to secure ' +
             'commitment, and feedback so people know whether they are on track.'
      },
      {
        id: 'i5l-2', type: 'multi', marks: 3,
        prompt: 'Which of these are indicators of <b>high morale</b>? <b>Select all that apply.</b>',
        options: [
          'High levels of productivity',
          'Good work attendance',
          'Low employee turnover',
          'Constructive conflict between individuals and departments',
          'High levels of absenteeism'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'High morale', val: 'High productivity, good attendance, low turnover, constructive conflict' },
          { lab: 'Absenteeism', val: 'An indicator of low morale' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Conflict is the interesting one. Its presence is not a bad sign — what distinguishes high from ' +
             'low morale is whether that conflict is constructive or destructive.'
      },
      {
        id: 'i5l-3', type: 'match', marks: 4,
        prompt: 'Match each motivation strategy to what it involves.',
        pairs: [
          { left: 'Employee involvement', right: 'Participative management and quality circles solving their own problems' },
          { left: 'Empowerment programmes', right: 'Letting employees set their own goals, decide and solve problems' },
          { left: 'Intrapreneurial incentives', right: 'Support for employees to develop their own ideas and innovations' },
          { left: 'Employee-recognition programmes', right: 'Formally acknowledging above-average performance' }
        ],
        solution: [
          { lab: 'Involvement', val: 'Using employees’ full capacity through their input' },
          { lab: 'Empowerment', val: 'Real ownership over outcomes' },
          { lab: 'Intrapreneurial', val: 'Acting like entrepreneurs inside the company' },
          { lab: 'Recognition', val: 'Bonuses, shares, profit-sharing, certificates, rewards' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'Involvement and empowerment sit on a scale: involvement asks for input on decisions, ' +
             'empowerment hands the decision over.'
      },
      {
        id: 'i5l-4', type: 'mcq', marks: 3,
        prompt: 'Why is money described as a <b>threshold factor</b>?',
        options: [
          'Once a fair and competitive wage is met, its power to sustain motivation diminishes',
          'It must reach a legal minimum before it motivates anyone',
          'Only senior employees are motivated by it',
          'It motivates equally regardless of the amount'
        ],
        answer: 0,
        solution: [
          { lab: 'Below the threshold', val: 'Pay is a genuine problem' },
          { lab: 'Above it', val: 'Purpose and growth become more powerful drivers' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'It echoes Herzberg: money behaves like a hygiene factor. Fixing it removes dissatisfaction ' +
             'without creating satisfaction.'
      },
      {
        id: 'i5l-5', type: 'multi', marks: 3,
        prompt: 'According to expectancy theory, money motivates only if which conditions are met? ' +
                '<b>Select all that apply.</b>',
        options: [
          'The employee believes effort leads to performance',
          'The employee believes performance leads to the monetary reward',
          'The employee genuinely values the money',
          'The amount exceeds what competitors pay'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Expectancy', val: 'Effort leads to performance' },
          { lab: 'Instrumentality', val: 'Performance leads to the reward' },
          { lab: 'Valence', val: 'The money is genuinely valued' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'All three must hold at once. A generous bonus nobody believes will actually be paid motivates ' +
             'no better than no bonus at all.'
      },
      {
        id: 'i5l-6', type: 'mcq', marks: 3,
        prompt: 'What can money do, and not do, as a motivator?',
        options: [
          'It can prevent dissatisfaction and reward performance, but cannot create lasting satisfaction alone',
          'It can create lasting job satisfaction on its own',
          'It has no effect on motivation whatsoever',
          'It only matters to employees with a high need for achievement'
        ],
        answer: 0,
        solution: [
          { lab: 'Money can', val: 'Prevent dissatisfaction and reward performance' },
          { lab: 'Money cannot', val: 'Create lasting job satisfaction or engagement on its own' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Effective leaders use it as one tool — applied fairly and transparently, alongside meaningful ' +
             'work, recognition and growth opportunities.'
      },
      {
        id: 'i5l-7', type: 'mcq', marks: 2,
        prompt: 'What are <b>quality circles</b>?',
        options: [
          'Small groups of employees who take responsibility for solving quality problems and generate their own solutions',
          'Regular inspections carried out by management',
          'A ranking of employees by output quality',
          'Meetings where managers set quality targets'
        ],
        answer: 0,
        solution: [
          { lab: 'Quality circles', val: 'Small employee groups solving quality problems themselves' },
          { lab: 'Part of', val: 'Employee involvement — using the full capacity of employees' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The motivating part is that the group generates its own solutions. Being told the answer would ' +
             'defeat the purpose.'
      }
    ]
  }

  ]
});
