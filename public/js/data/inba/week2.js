/* INBA01-5 — Week 2: Management fundamentals.
   Concept, functions, levels, skills, roles and the functional areas.

   Same two rules as Week 1: questions test concepts rather than the analogies
   used to explain them, and nothing is filled in from outside Abi's notes. */

window.MODULE_CONTENT = window.MODULE_CONTENT || {};
window.MODULE_CONTENT.inba = window.MODULE_CONTENT.inba || { weeks: [], exams: [] };

window.MODULE_CONTENT.inba.weeks.push({
  id: 'inba-week2',
  number: 2,
  title: 'Management Fundamentals',
  emoji: '🧭',
  accent: 3,
  blurb: 'What managers do, at every level, the ten hats they wear, and the departments they run.',
  topics: [

  /* ═══════════════════════ WHAT MANAGEMENT IS ═══════════════════════ */
  {
    id: 'i2-management',
    title: 'What Management Is',
    emoji: '🎯',
    summary: 'The definition, doing things right against doing the right things, and why it matters.',
    notes: [
      {
        heading: 'Definitions',
        emoji: '📖',
        html:
          '<div class="keybox"><b>Management</b> is the process of <b>planning, organising, leading and ' +
          'controlling</b> in employing the <b>human, financial and physical resources</b> of an organisation ' +
          'to reach its goals and objectives (Stoner, Freeman &amp; Gilbert, 2001; Erasmus et al., 2016).' +
          '<br><br>Robbins &amp; Coulter (2007) put it as "coordinating and overseeing the work activities of ' +
          'others so that their activities are completed efficiently and effectively".' +
          '<br><br><b>A manager</b> is "a person who coordinates and integrates all the work activities of ' +
          'employees in an organisation with the purpose of achieving its vision and goals" (Lazenby, 2016).</div>'
      },
      {
        heading: 'Efficiency, effectiveness, and importance',
        emoji: '⚖️',
        html:
          '<div class="keybox"><b>Efficiency</b> is <b>doing things right</b> — the most output from the least ' +
          'input, wasting no time, money or effort.' +
          '<br><b>Effectiveness</b> is <b>doing the right things</b> — performing the activities that reach the ' +
          'organisation’s most important goals.</div>' +
          '<p>A business can be efficient and ineffective at once: excellent at producing something nobody ' +
          'wants. <b>Effectiveness is the key to success; efficiency is what makes that success ' +
          'sustainable.</b></p>' +
          '<div class="keybox"><b>Why management is essential</b>' +
          '<br><b>It gives direction</b> · channelling people, money and equipment towards goals' +
          '<br><b>It keeps operations balanced</b> · between company goals, employee goals, owners’ interests ' +
          'and available resources' +
          '<br><b>It connects the organisation to the outside world</b> · adapting to change, sometimes creating it' +
          '<br><b>It drives productivity</b> · the greatest output from the least input</div>'
      }
    ],
    questions: [
      {
        id: 'i2m-1', type: 'multi', marks: 3,
        prompt: 'Management is defined as employing which resources of an organisation to reach its goals? ' +
                '<b>Select all that apply.</b>',
        options: ['Human', 'Financial', 'Physical', 'Political'],
        answers: [0, 1, 2],
        solution: [
          { lab: 'The definition', val: 'Planning, organising, leading and controlling in employing the human, financial and physical resources' },
          { lab: 'Answer', val: 'Human, financial and physical', final: true }
        ],
        why: 'The three resource types echo the four scarce resources from Week 1, grouped for management ' +
             'purposes into the people, the money and the things.'
      },
      {
        id: 'i2m-2', type: 'mcq', marks: 2,
        prompt: '<b>Efficiency</b> is:',
        options: [
          'Doing things right — the most output from the least input',
          'Doing the right things — the activities that reach the goals',
          'Reaching the target regardless of what it costs',
          'Keeping employees satisfied at work'
        ],
        answer: 0,
        solution: [
          { lab: 'Efficiency', val: 'Doing things right' },
          { lab: 'In practice', val: 'Maximum results from minimal resources' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The second option is effectiveness. Efficiency concerns the <i>method</i>; effectiveness ' +
             'concerns the <i>choice</i> of what to do at all.'
      },
      {
        id: 'i2m-3', type: 'mcq', marks: 3,
        scenario: 'A factory produces a product with almost no waste, on time and under budget. There is no ' +
                  'longer any demand for that product.',
        prompt: 'How would this factory be described?',
        options: [
          'Efficient but ineffective',
          'Effective but inefficient',
          'Both efficient and effective',
          'Neither efficient nor effective'
        ],
        answer: 0,
        solution: [
          { lab: 'Efficient', val: 'It wastes nothing producing what it produces' },
          { lab: 'Ineffective', val: 'The activity does not serve any goal worth reaching' },
          { lab: 'Answer', val: 'Efficient but ineffective', final: true }
        ],
        why: 'This is why the two words are separated. Excellence at the wrong activity is still failure, and ' +
             'more efficiency only reaches the wrong destination faster.'
      },
      {
        id: 'i2m-4', type: 'mcq', marks: 2,
        prompt: 'Which statement is correct?',
        options: [
          'Effectiveness is the key to success; efficiency is what makes that success sustainable',
          'Efficiency is the key to success; effectiveness makes it sustainable',
          'Only efficiency matters to an organisation’s success',
          'The two mean the same thing in practice'
        ],
        answer: 0,
        solution: [
          { lab: 'Effectiveness', val: 'The key to success' },
          { lab: 'Efficiency', val: 'What makes success sustainable' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The order matters: choose the right goal first, then pursue it without waste. Reversed, you get ' +
             'a very economical journey to the wrong place.'
      },
      {
        id: 'i2m-5', type: 'multi', marks: 3,
        prompt: 'Which of these are reasons management is essential to an organisation? <b>Select all that apply.</b>',
        options: [
          'It gives direction',
          'It keeps operations balanced',
          'It connects the organisation to the outside world',
          'It drives productivity',
          'It removes the need for employees to make decisions'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Direction', val: 'Channelling resources towards goals' },
          { lab: 'Balance', val: 'Between competing internal interests' },
          { lab: 'Connection', val: 'Keeping the business in tune with its environment' },
          { lab: 'Productivity', val: 'Greatest output from the least input' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'The last option is the opposite of good management. Empowering staff so they can operate ' +
             'independently is given as an example of management done well.'
      },
      {
        id: 'i2m-6', type: 'multi', marks: 3,
        prompt: 'Which competing interests must management balance <b>inside</b> a business? <b>Select all that apply.</b>',
        options: [
          'The company’s goals, such as profit and growth',
          'The employees’ goals, such as fair pay and job satisfaction',
          'The owners’ interests, such as a return on investment',
          'The available resources',
          'Competitors’ pricing decisions'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Company, employees, owners, resources', val: 'All internal to the business' },
          { lab: 'Competitor pricing', val: 'Market environment — responded to, not balanced' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'All four sit inside the micro environment from Week 1, which is precisely the part management ' +
             'controls and therefore can balance.'
      }
    ]
  },

  /* ═══════════════════════ THE FOUR FUNCTIONS ═══════════════════════ */
  {
    id: 'i2-functions',
    title: 'The Four Functions',
    emoji: '🔁',
    summary: 'Plan, organise, lead, control — in order, and round again.',
    notes: [
      {
        heading: 'The four, defined',
        emoji: '📋',
        html:
          '<div class="keybox"><b>Planning</b> · defining goals, establishing a strategy, and developing plans ' +
          'to coordinate activities' +
          '<br><b>Organising</b> · determining what needs to be done, how it will be done, and who is to do it' +
          '<br><b>Leading</b> · motivating, leading, and other actions involved in dealing with people' +
          '<br><b>Controlling</b> · monitoring activities to ensure they are accomplished as planned</div>' +
          '<p><i>Robbins &amp; Coulter (2007:9)</i></p>' +
          '<p>Leading is also defined as "influencing employees to work toward achieving the objectives" ' +
          '(Lussier, 2000), and controlling as "evaluating how well an organisation is achieving its goals and ' +
          'taking action to maintain or improve performance" (Jones, George &amp; Hill, 2000).</p>'
      },
      {
        heading: 'Why the order holds',
        emoji: '➡️',
        html:
          '<p>The four are linked in a logical sequence forming a continuous cycle. You cannot <b>organise</b> ' +
          'a team before <b>planning</b> the goal; you cannot <b>lead</b> people to do work that has not been ' +
          'organised and assigned; you cannot <b>control</b> results that do not yet exist.</p>' +
          '<p>Managers nonetheless perform several at once — planning a budget while leading a meeting and ' +
          'checking a slipped timeline.</p>'
      }
    ],
    questions: [
      {
        id: 'i2f-1', type: 'match', marks: 4,
        prompt: 'Match each management function to its definition.',
        pairs: [
          { left: 'Planning', right: 'Defining goals, establishing a strategy, developing plans to coordinate activities' },
          { left: 'Organising', right: 'Determining what needs to be done, how it will be done, and who is to do it' },
          { left: 'Leading', right: 'Motivating and other actions involved in dealing with people' },
          { left: 'Controlling', right: 'Monitoring activities to ensure they are accomplished as planned' }
        ],
        solution: [
          { lab: 'Planning', val: 'The destination and the route' },
          { lab: 'Organising', val: 'Who does what, with which resources' },
          { lab: 'Leading', val: 'Getting people to actually do it' },
          { lab: 'Controlling', val: 'Checking it happened as planned' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'Planning and organising are the pair most often confused: planning decides the goal, organising ' +
             'decides who will do what to reach it.'
      },
      {
        id: 'i2f-2', type: 'mcq', marks: 2,
        prompt: 'Which function is the starting point of the management cycle?',
        options: ['Planning', 'Organising', 'Leading', 'Controlling'],
        answer: 0,
        solution: [
          { lab: 'Planning', val: 'The preparation phase for achieving goals' },
          { lab: 'Why first', val: 'There is nothing to organise around until a goal exists' },
          { lab: 'Answer', val: 'Planning', final: true }
        ],
        why: 'Every other function depends on planning having happened, which is why it heads the sequence ' +
             'rather than appearing anywhere in it.'
      },
      {
        id: 'i2f-3', type: 'mcq', marks: 2,
        scenario: 'A department head compares this month’s sales figures against the quarterly target.',
        prompt: 'Which function is this?',
        options: ['Controlling', 'Planning', 'Organising', 'Leading'],
        answer: 0,
        solution: [
          { lab: 'What is happening', val: 'Progress is measured against the plan' },
          { lab: 'Function', val: 'Controlling' },
          { lab: 'Answer', val: 'Controlling', final: true }
        ],
        why: 'Setting the target was planning. Comparing actual results against it afterwards is control ' +
             'doing its job.'
      },
      {
        id: 'i2f-4', type: 'mcq', marks: 2,
        scenario: 'An owner creates a new roster to ensure adequate weekend staff coverage.',
        prompt: 'Which function is this?',
        options: ['Organising', 'Controlling', 'Planning', 'Leading'],
        answer: 0,
        solution: [
          { lab: 'What is happening', val: 'People are allocated to tasks and times' },
          { lab: 'Function', val: 'Organising — who is to do it, and how' },
          { lab: 'Answer', val: 'Organising', final: true }
        ],
        why: 'The goal already exists; this decides who covers what to meet it. That is organising rather ' +
             'than planning.'
      },
      {
        id: 'i2f-5', type: 'mcq', marks: 2,
        scenario: 'A team leader holds a meeting to check in on a remote team’s morale.',
        prompt: 'Which function is this?',
        options: ['Leading', 'Controlling', 'Organising', 'Planning'],
        answer: 0,
        solution: [
          { lab: 'What is happening', val: 'Motivating people and building connection' },
          { lab: 'Function', val: 'Leading — dealing with people' },
          { lab: 'Answer', val: 'Leading', final: true }
        ],
        why: 'Leading has become harder with hybrid and remote teams, where a manager must create connection ' +
             'without physical presence.'
      },
      {
        id: 'i2f-6', type: 'mcq', marks: 3,
        prompt: 'Why must the four functions follow a logical order?',
        options: [
          'You cannot organise before planning a goal, nor control results before the work has been led',
          'Because each function is handled by a different level of management',
          'Because a manager can only perform one function at a time',
          'Because the functions are listed alphabetically'
        ],
        answer: 0,
        solution: [
          { lab: 'The dependency', val: 'Each function needs the previous one to have happened' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The third option is explicitly untrue — managers routinely perform several functions at once, ' +
             'even though the logical dependency between them still holds.'
      }
    ]
  },

  /* ═══════════════════════ LEVELS ═══════════════════════ */
  {
    id: 'i2-levels',
    title: 'Levels of Management',
    emoji: '🪜',
    summary: 'Three levels, three planning horizons, and what sets the bottom one apart.',
    notes: [
      {
        heading: 'The three levels',
        emoji: '🏢',
        html:
          '<div class="keybox"><b>Top management</b> — the strategists. Board of Directors, CEO, Managing ' +
          'Director; in government the Minister and Director-General. Sets mission, vision and overall goals; ' +
          'develops long-term strategy; approves major policy and large budgets; represents the company ' +
          'publicly. Known as the <b>strategic</b> level.' +
          '<br><br><b>Middle management</b> — the translators. Marketing, HR and operations managers; regional ' +
          'managers, divisional heads, project leaders. Translates strategy into actionable plans, does ' +
          'medium-term planning, and develops <b>tactical</b> objectives.' +
          '<br><br><b>Lower management</b> — the implementers. Also called supervisory or line management: team ' +
          'leaders, supervisors, foremen. Short-term and task-oriented, creating <b>operational</b> plans from ' +
          'middle management’s tactical ones.</div>'
      },
      {
        heading: 'Comparing the three levels',
        emoji: '📊',
        html:
          '<div class="keybox"><b>Alternative names</b>' +
          '<br>Top management · the <b>Strategic</b> level' +
          '<br>Middle management · the <b>Tactical</b> level' +
          '<br>Lower management · <b>Supervisory</b>, <b>Operational</b> or <b>First-Line</b></div>' +
          '<div class="keybox"><b>Time horizon</b>' +
          '<br>Top · long-term · Middle · medium-term · Lower · short-term, day-to-day</div>' +
          '<div class="keybox"><b>Who each level manages</b>' +
          '<br><b>Top</b> · middle managers — and the whole organisation or major parts of it' +
          '<br><b>Middle</b> · other middle managers and lower-level managers. The link between top and lower' +
          '<br><b>Lower</b> · non-managerial, frontline employees</div>'
      },
      {
        heading: 'Span of control',
        emoji: '📏',
        html:
          '<p>The number of management levels is determined largely by the organisation’s size and the ' +
          '<b>span of control</b> — the number of people one manager can effectively oversee.</p>' +
          '<p>Lower management differs from the other two levels in one important way: they do <b>not</b> ' +
          'supervise other managers. They supervise <b>operational employees</b>, who hold no management ' +
          'position and report directly to them.</p>'
      }
    ],
    questions: [
      {
        id: 'i2l-1', type: 'match', marks: 3,
        prompt: 'Match each level of management to its role.',
        pairs: [
          { left: 'Top management', right: 'Sets the mission, vision and long-term strategy' },
          { left: 'Middle management', right: 'Translates strategy into actionable plans for a department' },
          { left: 'Lower management', right: 'Oversees day-to-day activities and allocates daily tasks' }
        ],
        solution: [
          { lab: 'Top', val: 'The strategic level' },
          { lab: 'Middle', val: 'Turns strategy into departmental objectives' },
          { lab: 'Lower', val: 'Gets the daily work done' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'Each level acts on a different time horizon, and that is usually the fastest way to tell which ' +
             'level a described activity belongs to.'
      },
      {
        id: 'i2l-2', type: 'mcq', marks: 2,
        prompt: 'What is the <b>span of control</b>?',
        options: [
          'The number of people one manager can effectively oversee',
          'The number of management levels in an organisation',
          'The size of budget a manager may approve',
          'The geographic area a business operates in'
        ],
        answer: 0,
        solution: [
          { lab: 'Span of control', val: 'How many people one manager can effectively oversee' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The number of levels is a consequence of it, not the definition: a narrow span forces more ' +
             'layers, because each manager can only handle so many people.'
      },
      {
        id: 'i2l-3', type: 'match', marks: 3,
        prompt: 'Match each level to the kind of plan it produces.',
        pairs: [
          { left: 'Top management', right: 'Strategic, long-term plans' },
          { left: 'Middle management', right: 'Tactical objectives, medium-term' },
          { left: 'Lower management', right: 'Operational plans, short-term' }
        ],
        solution: [
          { lab: 'Top', val: 'Strategic' },
          { lab: 'Middle', val: 'Tactical' },
          { lab: 'Lower', val: 'Operational' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'Strategic, tactical and operational is the same ladder seen from the planning side, and Week 3 ' +
             'of the module examines each in detail.'
      },
      {
        id: 'i2l-4', type: 'mcq', marks: 3,
        prompt: 'What distinguishes lower management from the other two levels?',
        options: [
          'They supervise operational employees rather than other managers',
          'They do not perform any of the four management functions',
          'They report directly to the board of directors',
          'They set the organisation’s mission and vision'
        ],
        answer: 0,
        solution: [
          { lab: 'Top and middle', val: 'Both supervise other managers' },
          { lab: 'Lower', val: 'Supervises operational employees, who hold no management position' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'They still plan, organise, lead and control — over a shorter horizon, and with a team that does ' +
             'the work rather than manages it.'
      },
      {
        id: 'i2l-5', type: 'multi', marks: 3,
        prompt: 'Which of these are responsibilities of <b>top management</b>? <b>Select all that apply.</b>',
        options: [
          'Setting the mission, vision and overall goals',
          'Developing long-term strategies',
          'Approving large budgets and major policy decisions',
          'Allocating daily tasks to frontline employees',
          'Drawing up the weekly staff roster'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Mission, strategy, major policy', val: 'Top management' },
          { lab: 'Daily tasks and rosters', val: 'Lower management' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'The time horizon is the quickest test: anything measured in days belongs at the bottom, ' +
             'anything measured in years at the top.'
      },
      {
        id: 'i2l-6', type: 'mcq', marks: 2,
        prompt: 'A marketing manager or human resource manager belongs to which level?',
        options: ['Middle management', 'Top management', 'Lower management', 'Neither — they are not managers'],
        answer: 0,
        solution: [
          { lab: 'Middle management', val: 'Responsible for a specific department or function' },
          { lab: 'Answer', val: 'Middle management', final: true }
        ],
        why: 'Regional managers, divisional heads and project leaders also sit here, depending on the ' +
             'organisation’s structure.'
      },
      {
        id: 'i2l-7', type: 'match', marks: 3,
        prompt: 'Match each level of management to its alternative name.',
        pairs: [
          { left: 'Top management', right: 'The strategic level' },
          { left: 'Middle management', right: 'The tactical level' },
          { left: 'Lower management', right: 'Supervisory, operational or first-line' }
        ],
        solution: [
          { lab: 'Top', val: 'Strategic — sets the mission and long-term direction' },
          { lab: 'Middle', val: 'Tactical — develops tactical objectives from strategy' },
          { lab: 'Lower', val: 'Supervisory, operational or first-line' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The alternative names match the kind of plan each level produces, which is why strategic, ' +
             'tactical and operational planning map onto the same three levels.'
      },
      {
        id: 'i2l-8', type: 'match', marks: 3,
        prompt: 'Match each level of management to the people it manages.',
        pairs: [
          { left: 'Top management', right: 'Middle managers, and the organisation as a whole' },
          { left: 'Middle management', right: 'Other middle managers and lower-level managers' },
          { left: 'Lower management', right: 'Non-managerial, frontline employees' }
        ],
        solution: [
          { lab: 'Top', val: 'Manages the whole organisation or major parts of it' },
          { lab: 'Middle', val: 'The link between top and lower management' },
          { lab: 'Lower', val: 'Frontline employees who hold no management position' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'Only lower management supervises people who are not themselves managers, which is exactly what ' +
             'sets that level apart.'
      },
      {
        id: 'i2l-9', type: 'match', marks: 3,
        prompt: 'Match each level to its planning time horizon.',
        pairs: [
          { left: 'Top management', right: 'Long-term' },
          { left: 'Middle management', right: 'Medium-term' },
          { left: 'Lower management', right: 'Short-term, day-to-day' }
        ],
        solution: [
          { lab: 'Top', val: 'Long-term strategy for the entire organisation' },
          { lab: 'Middle', val: 'Medium-term plans for their department or function' },
          { lab: 'Lower', val: 'Short-term, task-oriented execution' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'Time horizon is the fastest way to place an unfamiliar activity: anything measured in days ' +
             'belongs at the bottom, anything in years at the top.'
      }
    ]
  },

  /* ═══════════════════════ SKILLS ═══════════════════════ */
  {
    id: 'i2-skills',
    title: 'Managerial Skills',
    emoji: '🧰',
    summary: 'Conceptual, human and technical — and how the mix inverts as you climb.',
    notes: [
      {
        heading: 'Three skills',
        emoji: '🎓',
        html:
          '<div class="keybox"><b>Technical skills</b> · using the procedures, techniques and knowledge of a ' +
          'specialised field. Directly related to the job.' +
          '<br><br><b>Human skills</b> · working with, understanding and motivating other people, individually ' +
          'or in groups. <b>Necessary at all levels.</b>' +
          '<br><br><b>Conceptual skills</b> · coordinating and integrating all of an organisation’s interests ' +
          'and activities — "the ability to think and to conceptualise about abstract and complex situations" ' +
          '(Robbins &amp; Coulter, 2007).</div>' +
          '<p>The skills that make someone excellent in a specialist role are not the skills needed to manage ' +
          'that role.</p>'
      },
      {
        heading: 'The mix by level',
        emoji: '📐',
        html:
          '<div class="keybox"><b>Top management</b> · high conceptual, medium interpersonal, low technical' +
          '<br><b>Middle management</b> · a balance of all three' +
          '<br><b>Lower management</b> · high technical, medium interpersonal, lower conceptual</div>' +
          '<p>Top managers steer the whole organisation and navigate its external environment; supervisors ' +
          'need deep technical knowledge to train staff, solve daily problems and command respect.</p>' +
          '<div class="keybox"><b>What each skill focuses on</b>' +
          '<br><b>Technical</b> · the actual work — hands-on tasks and processes' +
          '<br><b>Human</b> · the people — communication and motivation' +
          '<br><b>Conceptual</b> · the organisation — the big picture and abstract ideas</div>' +
          '<div class="keybox"><b>Most critical for</b>' +
          '<br><b>Technical</b> · lower (first-line) management — high for lower, medium for middle, low for top' +
          '<br><b>Human</b> · <b>all levels</b> — required at every level' +
          '<br><b>Conceptual</b> · top management — low for lower, medium for middle, high for top</div>'
      }
    ],
    questions: [
      {
        id: 'i2s-1', type: 'match', marks: 3,
        prompt: 'Match each managerial skill to its definition.',
        pairs: [
          { left: 'Technical skills', right: 'Using the procedures, techniques and knowledge of a specialised field' },
          { left: 'Human skills', right: 'Working with, understanding and motivating other people' },
          { left: 'Conceptual skills', right: 'Thinking about abstract and complex situations and integrating the whole organisation' }
        ],
        solution: [
          { lab: 'Technical', val: 'Job-specific know-how' },
          { lab: 'Human', val: 'People, individually and in groups' },
          { lab: 'Conceptual', val: 'The organisation as a whole and how it fits its environment' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'Conceptual skill is about seeing the whole picture at once, which is why it attaches to the ' +
             'level responsible for the whole organisation.'
      },
      {
        id: 'i2s-2', type: 'mcq', marks: 3,
        prompt: 'Which skill mix belongs to <b>top management</b>?',
        options: [
          'High conceptual, medium interpersonal, low technical',
          'High technical, medium interpersonal, lower conceptual',
          'A balance of all three',
          'High technical, high conceptual, low interpersonal'
        ],
        answer: 0,
        solution: [
          { lab: 'Conceptual', val: 'High — setting long-term vision and strategy' },
          { lab: 'Interpersonal', val: 'Medium — leading executives and negotiating' },
          { lab: 'Technical', val: 'Low — not involved in day-to-day technical detail' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The second option is lower management, exactly inverted — which is why promoting a brilliant ' +
             'technician straight to the top so often goes badly.'
      },
      {
        id: 'i2s-3', type: 'mcq', marks: 2,
        prompt: 'Which skill is necessary at <b>all</b> levels of management?',
        options: ['Human skills', 'Technical skills', 'Conceptual skills', 'None — each level needs only one'],
        answer: 0,
        solution: [
          { lab: 'Human skills', val: 'Every manager works with people' },
          { lab: 'Examples', val: 'Supervisors dealing with technical staff; top managers dealing with other managers' },
          { lab: 'Answer', val: 'Human skills', final: true }
        ],
        why: 'Technical and conceptual rise and fall as you move up. Human skills never stop mattering, ' +
             'because every level is managing people.'
      },
      {
        id: 'i2s-4', type: 'mcq', marks: 2,
        prompt: 'Which skill mix belongs to <b>lower management</b>?',
        options: [
          'High technical, medium interpersonal, lower conceptual',
          'High conceptual, medium interpersonal, low technical',
          'A balance of all three',
          'High conceptual and technical, no interpersonal'
        ],
        answer: 0,
        solution: [
          { lab: 'Technical', val: 'High — needed to train staff and solve daily problems' },
          { lab: 'Interpersonal', val: 'Medium — they spend all day with their team' },
          { lab: 'Conceptual', val: 'Lower — enough to see how the team fits the department' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Deep technical knowledge is also how a supervisor earns their team’s respect, not only how they ' +
             'get the work done.'
      },
      {
        id: 'i2s-5', type: 'mcq', marks: 2,
        prompt: 'Which level requires <b>a balance of all three</b> skills?',
        options: ['Middle management', 'Top management', 'Lower management', 'No level does'],
        answer: 0,
        solution: [
          { lab: 'Conceptual', val: 'To understand the wider strategy' },
          { lab: 'Technical', val: 'Enough to make informed decisions in their function' },
          { lab: 'Interpersonal', val: 'To communicate up and down the ladder' },
          { lab: 'Answer', val: 'Middle management', final: true }
        ],
        why: 'It follows from the job: a middle manager translates between two levels and needs enough of the ' +
             'language spoken at each.'
      },
      {
        id: 'i2s-6', type: 'mcq', marks: 3,
        scenario: 'A highly skilled specialist is promoted to lead their team. They cannot explain the ' +
                  'project goals clearly and cannot resolve conflicts between colleagues.',
        prompt: 'Which skill are they lacking?',
        options: ['Human skills', 'Technical skills', 'Conceptual skills', 'Financial skills'],
        answer: 0,
        solution: [
          { lab: 'They have', val: 'Technical skills in abundance' },
          { lab: 'They lack', val: 'The ability to work with, understand and motivate people' },
          { lab: 'Answer', val: 'Human skills', final: true }
        ],
        why: 'This is why the three skills are taught separately: being excellent at a job is not the same as ' +
             'being able to manage people doing it.'
      },
      {
        id: 'i2s-7', type: 'match', marks: 3,
        prompt: 'Match each managerial skill to what it focuses on.',
        pairs: [
          { left: 'Technical skills', right: 'The actual work — hands-on tasks and processes' },
          { left: 'Human skills', right: 'The people — communication and motivation' },
          { left: 'Conceptual skills', right: 'The organisation — the big picture and abstract ideas' }
        ],
        solution: [
          { lab: 'Technical', val: 'The work itself' },
          { lab: 'Human', val: 'The people doing it' },
          { lab: 'Conceptual', val: 'The organisation as a whole' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The three focuses widen in scope: the task, then the people, then the whole organisation — ' +
             'which is exactly why the mix shifts as a manager rises.'
      },
      {
        id: 'i2s-8', type: 'match', marks: 3,
        prompt: 'Match each skill to the level it is most critical for.',
        pairs: [
          { left: 'Technical skills', right: 'Lower (first-line) management' },
          { left: 'Conceptual skills', right: 'Top management' },
          { left: 'Human skills', right: 'All levels of management' }
        ],
        solution: [
          { lab: 'Technical', val: 'High for lower, medium for middle, low for top' },
          { lab: 'Conceptual', val: 'Low for lower, medium for middle, high for top' },
          { lab: 'Human', val: 'Required at every level' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'Technical and conceptual are exact mirrors of each other across the levels. Human skills are ' +
             'the constant, which is why they are the one skill no manager can do without.'
      }
    ]
  },

  /* ═══════════════════════ ROLES ═══════════════════════ */
  {
    id: 'i2-roles',
    title: 'The Ten Managerial Roles',
    emoji: '🎭',
    summary: 'Mintzberg’s ten roles, grouped into three categories.',
    notes: [
      {
        heading: 'Three categories, ten roles',
        emoji: '🎩',
        html:
          '<p><b>Henry Mintzberg</b> identified ten roles every manager plays, in three categories:</p>' +
          '<div class="keybox"><b>Interpersonal</b> · Figurehead · Leader · Liaison' +
          '<br><b>Informational</b> · Monitor · Disseminator · Spokesperson' +
          '<br><b>Decisional</b> · Entrepreneur · Disturbance handler · Resource allocator · Negotiator</div>'
      },
      {
        heading: 'What each role does',
        emoji: '📖',
        html:
          '<div class="keybox"><b>Figurehead</b> · symbolic head; routine duties of a legal or social nature' +
          '<br><b>Leader</b> · motivation of subordinates; staffing and training' +
          '<br><b>Liaison</b> · maintains a network of outside contacts. Can consume up to half a manager’s time' +
          '<br><b>Monitor</b> · seeks and receives wide-ranging internal and external information' +
          '<br><b>Disseminator</b> · transmits information to members of the organisation' +
          '<br><b>Spokesperson</b> · transmits information to <i>outsiders</i> about plans, policies and results' +
          '<br><b>Entrepreneur</b> · searches for opportunities and initiates improvement projects' +
          '<br><b>Disturbance handler</b> · corrective action when facing important, unexpected disturbances' +
          '<br><b>Resource allocator</b> · allocates resources of all kinds and approves significant decisions' +
          '<br><b>Negotiator</b> · represents the organisation at major negotiations</div>'
      }
    ],
    questions: [
      {
        id: 'i2r-1', type: 'mcq', marks: 2,
        prompt: 'Who identified the ten managerial roles?',
        options: ['Henry Mintzberg', 'Robbins and Coulter', 'John Elkington', 'Christo Wiese'],
        answer: 0,
        solution: [
          { lab: 'Mintzberg', val: 'Identified ten roles in three categories' },
          { lab: 'Answer', val: 'Henry Mintzberg', final: true }
        ],
        why: 'Robbins and Coulter are cited throughout the module for the four functions, but the ten roles ' +
             'are Mintzberg’s.'
      },
      {
        id: 'i2r-2', type: 'match', marks: 3,
        prompt: 'Match each interpersonal role to what the manager is doing.',
        pairs: [
          { left: 'Figurehead', right: 'Performing symbolic duties such as signing legal documents and hosting visitors' },
          { left: 'Leader', right: 'Hiring, training, motivating and evaluating employee performance' },
          { left: 'Liaison', right: 'Building and maintaining a network of contacts outside the immediate team' }
        ],
        solution: [
          { lab: 'Figurehead', val: 'The symbolic, public face of the unit' },
          { lab: 'Leader', val: 'Responsible for the people in the team' },
          { lab: 'Liaison', val: 'Networks inside and outside the organisation' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The liaison role can take up to half a manager’s time — far more than the ceremonial figurehead ' +
             'duties most people picture.'
      },
      {
        id: 'i2r-3', type: 'multi', marks: 3,
        prompt: 'Which of these are the <b>informational</b> roles? <b>Select all that apply.</b>',
        options: ['Monitor', 'Disseminator', 'Spokesperson', 'Negotiator', 'Figurehead'],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Monitor', val: 'Takes information in' },
          { lab: 'Disseminator', val: 'Spreads it inside the organisation' },
          { lab: 'Spokesperson', val: 'Communicates it outside' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'The three form a chain: gather, distribute internally, then speak for the organisation ' +
             'externally.'
      },
      {
        id: 'i2r-4', type: 'mcq', marks: 3,
        prompt: 'What is the difference between the <b>Disseminator</b> and the <b>Spokesperson</b>?',
        options: [
          'The disseminator passes information to members of the organisation; the spokesperson passes it to outsiders',
          'The disseminator speaks to the media; the spokesperson speaks to staff',
          'The disseminator gathers information; the spokesperson analyses it',
          'There is no difference between them'
        ],
        answer: 0,
        solution: [
          { lab: 'Disseminator', val: 'Information to members of the organisation' },
          { lab: 'Spokesperson', val: 'Information to outsiders — plans, policies, actions, results' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The direction of travel is the whole distinction. Gathering information in the first place is ' +
             'the Monitor, a third and separate role.'
      },
      {
        id: 'i2r-5', type: 'match', marks: 4,
        prompt: 'Match each decision-making role to its description.',
        pairs: [
          { left: 'Entrepreneur', right: 'Searches for opportunities and initiates improvement projects' },
          { left: 'Disturbance handler', right: 'Takes corrective action when facing unexpected disturbances' },
          { left: 'Resource allocator', right: 'Allocates resources and approves significant decisions' },
          { left: 'Negotiator', right: 'Represents the organisation at major negotiations' }
        ],
        solution: [
          { lab: 'Entrepreneur', val: 'Initiates change deliberately' },
          { lab: 'Disturbance handler', val: 'Responds to change forced upon them' },
          { lab: 'Resource allocator', val: 'Decides where money, people and time go' },
          { lab: 'Negotiator', val: 'Speaks for the organisation in major negotiations' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'Entrepreneur and disturbance handler both involve change, but one is chosen and the other is ' +
             'not — that is the distinction worth holding on to.'
      },
      {
        id: 'i2r-6', type: 'multi', marks: 3,
        prompt: 'Which of these are <b>decision-making</b> roles? <b>Select all that apply.</b>',
        options: [
          'Entrepreneur',
          'Disturbance handler',
          'Resource allocator',
          'Negotiator',
          'Monitor',
          'Liaison'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'The four decisional roles', val: 'Entrepreneur, disturbance handler, resource allocator, negotiator' },
          { lab: 'Monitor', val: 'Informational' },
          { lab: 'Liaison', val: 'Interpersonal' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Decisional is the largest group with four roles, against three each for interpersonal and ' +
             'informational — ten in total.'
      },
      {
        id: 'i2r-7', type: 'mcq', marks: 2,
        scenario: 'A manager takes corrective action after a key supplier unexpectedly fails to deliver.',
        prompt: 'Which role is this?',
        options: ['Disturbance handler', 'Entrepreneur', 'Resource allocator', 'Monitor'],
        answer: 0,
        solution: [
          { lab: 'The situation', val: 'An important, unexpected disturbance' },
          { lab: 'Role', val: 'Disturbance handler' },
          { lab: 'Answer', val: 'Disturbance handler', final: true }
        ],
        why: 'The entrepreneur role also brings about change, but it is change the manager chose to start. ' +
             'This one was forced on them.'
      }
    ]
  },

  /* ═══════════════════════ FUNCTIONAL AREAS ═══════════════════════ */
  {
    id: 'i2-areas',
    title: 'Functional Areas & Operations',
    emoji: '🏭',
    summary: 'The five main departments, three later additions, and operations in detail.',
    notes: [
      {
        heading: 'The functional areas',
        emoji: '🗂️',
        html:
          '<div class="keybox"><b>The five main functional areas</b> · Operations · Human resources · ' +
          'Marketing · Finance · Logistics (purchasing and supply)</div>' +
          '<div class="keybox"><b>Three additional functions</b> (Strydom, 2008)' +
          '<br><b>IT manager</b> · manages the technology life cycle — new systems, networks and hardware, ' +
          'data security and access' +
          '<br><b>PR manager</b> · guardian of the company’s image, internally and externally' +
          '<br><b>Administrative manager</b> · a generalist supporting the whole organisation rather than ' +
          'specialising in one function</div>'
      },
      {
        heading: 'Operations',
        emoji: '⚙️',
        html:
          '<div class="keybox"><b>Operations function</b> · aimed at utilising resources to manufacture ' +
          'products or render services' +
          '<br><b>Operations managers</b> · the personnel directly responsible for managing that function' +
          '<br><b>Operations management</b> · the activities, decisions and responsibilities involved in ' +
          'executing it — planning, organising, scheduling and controlling</div>' +
          '<p>Effective operations can be a source of competitive advantage through <b>cost reduction</b> ' +
          '(less waste), <b>revenue increase</b> (quality and service excellence), <b>capital efficiency</b> ' +
          '(less investment for the same output) and as a <b>driver of innovation</b>.</p>'
      }
    ],
    questions: [
      {
        id: 'i2a-1', type: 'multi', marks: 3,
        prompt: 'Which of these are among the <b>five main functional areas</b>? <b>Select all that apply.</b>',
        options: [
          'Operations',
          'Human resources',
          'Marketing',
          'Finance',
          'Logistics — purchasing and supply',
          'Public relations'
        ],
        answers: [0, 1, 2, 3, 4],
        solution: [
          { lab: 'The five', val: 'Operations, human resources, marketing, finance, logistics' },
          { lab: 'Public relations', val: 'One of three additional functions' },
          { lab: 'Answer', val: 'The first five', final: true }
        ],
        why: 'PR, IT and administration are real functions but are grouped separately as later additions ' +
             'rather than as part of the core five.'
      },
      {
        id: 'i2a-2', type: 'match', marks: 3,
        prompt: 'Match each operations term to its meaning.',
        pairs: [
          { left: 'Operations function', right: 'Utilising resources to manufacture products or render services' },
          { left: 'Operations managers', right: 'The personnel directly responsible for managing that function' },
          { left: 'Operations management', right: 'The activities and decisions involved in executing it' }
        ],
        solution: [
          { lab: 'The function', val: 'What the business does' },
          { lab: 'The managers', val: 'Who is responsible' },
          { lab: 'The management', val: 'Planning, organising, scheduling and controlling it' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The three terms look nearly identical, which is exactly why they are defined separately: the ' +
             'function, the people and the activity are three different things.'
      },
      {
        id: 'i2a-3', type: 'match', marks: 3,
        prompt: 'Match each additional function to what it does.',
        pairs: [
          { left: 'IT manager', right: 'Manages the technology life cycle, networks and data security' },
          { left: 'PR manager', right: 'Guardian of the company’s image, internally and externally' },
          { left: 'Administrative manager', right: 'A generalist supporting the whole organisation across departments' }
        ],
        solution: [
          { lab: 'IT', val: 'Systems, hardware, and controlling data access' },
          { lab: 'PR', val: 'A favourable perception among employees, public, media and investors' },
          { lab: 'Administrative', val: 'Office management, record-keeping, logistical support' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The administrative manager is deliberately the odd one out — a generalist who does <i>not</i> ' +
             'specialise in one function.'
      },
      {
        id: 'i2a-4', type: 'mcq', marks: 2,
        prompt: 'Which function is directly concerned with transforming inputs into outputs?',
        options: ['Operations', 'Finance', 'Marketing', 'Human resources'],
        answer: 0,
        solution: [
          { lab: 'Every business', val: 'Is a system that transforms inputs into outputs' },
          { lab: 'The function concerned', val: 'Operations' },
          { lab: 'Answer', val: 'Operations', final: true }
        ],
        why: 'This is the transformation concept from Week 1 reappearing as a department: operations is where ' +
             'production actually happens.'
      },
      {
        id: 'i2a-5', type: 'multi', marks: 3,
        prompt: 'How can effective operations be a source of competitive advantage? <b>Select all that apply.</b>',
        options: [
          'Cost reduction through less waste',
          'Revenue increase through quality and service excellence',
          'Capital efficiency — less investment for the same output',
          'Driving innovation from a strong operational base',
          'Reducing the number of customers served'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Cost reduction', val: 'Less rework and scrap lowers production costs' },
          { lab: 'Revenue increase', val: 'Quality can command higher prices' },
          { lab: 'Capital efficiency', val: 'Better use of facilities and equipment' },
          { lab: 'Innovation', val: 'Operational skill feeds new product development' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Since profit is revenue minus costs, operations is one of the few functions able to push on ' +
             'both sides of that equation at once.'
      }
    ]
  },

  /* ═══════════════════════ MARKETING ═══════════════════════ */
  {
    id: 'i2-marketing',
    title: 'Marketing',
    emoji: '📣',
    summary: 'The definition, the four Ps, and what a target market is.',
    notes: [
      {
        heading: 'What marketing is',
        emoji: '🌉',
        html:
          '<p><b>Marketing</b> is "the management tasks and decisions directed at successfully meeting ' +
          'opportunities and threats in a dynamic environment by effectively developing and transferring a ' +
          'need-satisfying market offering to consumers" (Erasmus et al., 2023).</p>' +
          '<p>It is more than advertising or sales. It is a management process using market research to develop ' +
          'a <b>market offering</b>. Modern marketing focuses on <b>long-term relationships</b> with customers ' +
          '— attracting, retaining and enhancing relationships with profitable customers — and persuades ' +
          'rather than compels.</p>'
      },
      {
        heading: 'The marketing mix',
        emoji: '4️⃣',
        html:
          '<div class="keybox"><b>The four Ps</b>' +
          '<br><b>Product</b> · the good or service itself, with its need-satisfying attributes' +
          '<br><b>Price</b> · the amount charged, reflecting the product’s value' +
          '<br><b>Place</b> · the locations and methods used to make the product available (distribution)' +
          '<br><b>Promotion</b> · the communication methods used to inform and persuade consumers</div>' +
          '<p>The mix creates a market offering tailored to a <b>target market</b> — a group of consumers ' +
          'sharing common characteristics and needs.</p>'
      }
    ],
    questions: [
      {
        id: 'i2k-1', type: 'multi', marks: 3,
        prompt: 'Which of these make up the <b>marketing mix</b>? <b>Select all that apply.</b>',
        options: ['Product', 'Price', 'Place', 'Promotion', 'Profit', 'Production'],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'The four Ps', val: 'Product, Price, Place, Promotion' },
          { lab: 'Profit and production', val: 'Both begin with P but belong elsewhere' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'The two wrong options begin with P deliberately — the letter is a memory aid, not the concept.'
      },
      {
        id: 'i2k-2', type: 'match', marks: 4,
        prompt: 'Match each element of the marketing mix to its meaning.',
        pairs: [
          { left: 'Product', right: 'The good or service itself, with its need-satisfying attributes' },
          { left: 'Price', right: 'The amount charged, reflecting the value offered' },
          { left: 'Place', right: 'The locations and methods used to make it available' },
          { left: 'Promotion', right: 'The communication used to inform and persuade consumers' }
        ],
        solution: [
          { lab: 'Product', val: 'What is offered' },
          { lab: 'Price', val: 'What is charged' },
          { lab: 'Place', val: 'How it reaches the customer — distribution' },
          { lab: 'Promotion', val: 'How the customer is told about it' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: '"Place" is the one that catches people out — it means distribution, not the shop’s address.'
      },
      {
        id: 'i2k-3', type: 'mcq', marks: 2,
        prompt: 'What is a <b>target market</b>?',
        options: [
          'A group of consumers sharing common characteristics and needs',
          'The sales figure a business aims to achieve',
          'The geographic region a business trades in',
          'The competitor a business aims to overtake'
        ],
        answer: 0,
        solution: [
          { lab: 'Target market', val: 'Consumers sharing common characteristics and needs' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The marketing mix is built for a specific target market, which is why identifying it comes ' +
             'before deciding on product, price, place and promotion.'
      },
      {
        id: 'i2k-4', type: 'mcq', marks: 3,
        prompt: 'Which statement best reflects modern marketing?',
        options: [
          'It focuses on building long-term relationships with profitable customers',
          'It is another word for advertising',
          'It compels customers to buy through aggressive selling',
          'It is concerned only with setting the right price'
        ],
        answer: 0,
        solution: [
          { lab: 'The focus', val: 'Attracting, retaining and enhancing relationships with profitable customers' },
          { lab: 'The method', val: 'Persuading rather than compelling' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Advertising is only one part of promotion, which is itself only one of the four Ps. Treating ' +
             'marketing as advertising misses most of what it is.'
      },
      {
        id: 'i2k-5', type: 'mcq', marks: 2,
        prompt: 'Marketing is described as the bridge between a business and:',
        options: [
          'Its environment — connecting the company with its customers',
          'Its suppliers',
          'Its shareholders',
          'Its regulators'
        ],
        answer: 0,
        solution: [
          { lab: 'The bridge', val: 'Between the business and its environment' },
          { lab: 'Its job', val: 'Ensuring the business’s resources meet market demands' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Marketing manages the transfer of products and services to the market, which is why it faces ' +
             'outward more than any other function.'
      }
    ]
  },

  /* ═══════════════════════ FINANCE ═══════════════════════ */
  {
    id: 'i2-finance',
    title: 'Finance',
    emoji: '💰',
    summary: 'Break-even, the two statements, and the vocabulary of money.',
    notes: [
      {
        heading: 'What financial management is for',
        emoji: '🎯',
        html:
          '<p>The primary goal of financial management is to <b>maximise the value of the business</b> by ' +
          'making strategic financial decisions. It answers three questions:</p>' +
          '<div class="keybox"><b>Which long-term investments should we make?</b> · for example, buying new ' +
          'machinery' +
          '<br><b>How will we pay for them?</b> · using owners’ money (<b>equity</b>) or borrowing (<b>debt</b>)' +
          '<br><b>How do we manage day-to-day financial activities?</b> · collecting payment from customers, ' +
          'paying suppliers</div>' +
          '<div class="keybox"><b>The financial function manages the continuous flow of funds</b>' +
          '<br><b>1. Financing</b> · acquiring funds' +
          '<br><b>2. Investment</b> · using funds to acquire assets' +
          '<br><b>3. Accounting</b> · administering and reporting on financial matters</div>'
      },
      {
        heading: 'Core concepts',
        emoji: '🧮',
        html:
          '<div class="keybox"><b>Assets</b> · what the business owns — cash, inventory' +
          '<br><b>Liabilities</b> · what the business owes — loans, money owed to suppliers' +
          '<br><b>Equity</b> · the owners’ stake in the business' +
          '<br><b>Fixed costs</b> · remain constant regardless of production levels — rent, salaries' +
          '<br><b>Variable costs</b> · change with production volume — raw materials' +
          '<br><b>Profit</b> · the favourable difference between income and costs</div>' +
          '<p>The <b>break-even point</b> is the level of sales where total revenue equals total costs, ' +
          'resulting in neither profit nor loss.</p>'
      },
      {
        heading: 'The financial statements',
        emoji: '📄',
        html:
          '<div class="keybox"><b>Statement of financial position</b> (balance sheet) · a snapshot of the ' +
          'company’s financial health at a point in time, showing <b>Assets = Liabilities + Equity</b>' +
          '<br><br><b>Statement of financial performance</b> · summarises the profit or loss for a particular ' +
          'period and how it has been distributed</div>' +
          '<p><b>Accounting</b> is the administering and reporting of financial matters.</p>'
      }
    ],
    questions: [
      {
        id: 'i2n-1', type: 'mcq', marks: 2,
        prompt: 'What is the <b>break-even point</b>?',
        options: [
          'The level of sales where total revenue equals total costs',
          'The point at which a business becomes profitable for the year',
          'The moment all loans have been repaid',
          'The maximum a business can produce'
        ],
        answer: 0,
        solution: [
          { lab: 'Break-even', val: 'Total revenue equals total costs' },
          { lab: 'Result', val: 'Neither profit nor loss' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'It is the dividing line rather than a goal — below it the business loses money, above it the ' +
             'business makes money.'
      },
      {
        id: 'i2n-2', type: 'match', marks: 3,
        prompt: 'Match each financial term to its meaning.',
        pairs: [
          { left: 'Assets', right: 'What the business owns, such as cash and inventory' },
          { left: 'Liabilities', right: 'What the business owes, such as loans and money owed to suppliers' },
          { left: 'Equity', right: 'The owners’ stake in the business' }
        ],
        solution: [
          { lab: 'Assets', val: 'Owned' },
          { lab: 'Liabilities', val: 'Owed' },
          { lab: 'Equity', val: 'The owners’ share' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The three are linked by the accounting equation: Assets = Liabilities + Equity. Knowing two of ' +
             'them always gives you the third.'
      },
      {
        id: 'i2n-3', type: 'multi', marks: 3,
        prompt: 'Which of these are <b>fixed costs</b>? <b>Select all that apply.</b>',
        options: ['Rent', 'Salaries', 'Raw materials', 'Packaging used per unit sold'],
        answers: [0, 1],
        solution: [
          { lab: 'Fixed costs', val: 'Remain constant regardless of production levels — rent and salaries' },
          { lab: 'Variable costs', val: 'Change with production volume — raw materials and per-unit packaging' },
          { lab: 'Answer', val: 'Rent and salaries', final: true }
        ],
        why: 'The test is whether the cost changes when output changes. Rent is owed whether the factory ' +
             'produces one unit or a thousand.'
      },
      {
        id: 'i2n-4', type: 'mcq', marks: 3,
        prompt: 'What does the <b>statement of financial position</b> (balance sheet) show?',
        options: [
          'A snapshot of the company’s financial health at a point in time',
          'Profit or loss over a period of time',
          'The forecast revenue for the next three years',
          'The market value of the company’s shares'
        ],
        answer: 0,
        solution: [
          { lab: 'Statement of financial position', val: 'A snapshot at a point in time — Assets = Liabilities + Equity' },
          { lab: 'Statement of financial performance', val: 'Profit or loss over a period' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'A snapshot against a period is the whole distinction between the two statements — one is a ' +
             'photograph, the other a summary of what happened over time.'
      },
      {
        id: 'i2n-5', type: 'mcq', marks: 2,
        prompt: 'Which equation does the statement of financial position show?',
        options: [
          'Assets = Liabilities + Equity',
          'Profit = Assets − Liabilities',
          'Equity = Revenue − Costs',
          'Assets = Revenue + Profit'
        ],
        answer: 0,
        solution: [
          { lab: 'The accounting equation', val: 'Assets = Liabilities + Equity' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Everything the business owns was funded either by someone it owes, or by its owners. That is ' +
             'why the two sides always balance.'
      },
      {
        id: 'i2n-6', type: 'mcq', marks: 2,
        prompt: '<b>Profit</b> is defined as:',
        options: [
          'The favourable difference between income and costs',
          'All money received from customers',
          'The value of the assets a business owns',
          'The owners’ stake in the business'
        ],
        answer: 0,
        solution: [
          { lab: 'Profit', val: 'The favourable difference between income and costs' },
          { lab: 'If costs exceed income', val: 'There is a loss instead' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The last option is equity, which is a different idea: profit is a flow over a period, equity is ' +
             'a balance at a moment.'
      },
      {
        id: 'i2n-7', type: 'mcq', marks: 2,
        prompt: 'What is the primary goal of financial management?',
        options: [
          'To maximise the value of the business through strategic financial decisions',
          'To keep costs as low as possible',
          'To produce the annual financial statements',
          'To secure the largest possible loan'
        ],
        answer: 0,
        solution: [
          { lab: 'Primary goal', val: 'Maximise the value of the business' },
          { lab: 'By', val: 'Making strategic financial decisions' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Producing statements is accounting, one part of the function. The goal is broader: deciding ' +
             'what to invest in, how to fund it, and how to run the day-to-day money.'
      },
      {
        id: 'i2n-8', type: 'match', marks: 3,
        prompt: 'Match each part of the financial function to what it does.',
        pairs: [
          { left: 'Financing', right: 'Acquiring funds' },
          { left: 'Investment', right: 'Using funds to acquire assets' },
          { left: 'Accounting', right: 'Administering and reporting on financial matters' }
        ],
        solution: [
          { lab: 'Financing', val: 'Getting the money in' },
          { lab: 'Investment', val: 'Putting the money to work' },
          { lab: 'Accounting', val: 'Recording and reporting on it' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The three describe a continuous flow of funds: raise it, deploy it, account for it — then ' +
             'round again.'
      },
      {
        id: 'i2n-9', type: 'mcq', marks: 2,
        prompt: 'Paying for an investment using the owners’ money rather than borrowing is known as using:',
        options: ['Equity', 'Debt', 'Working capital', 'Revenue'],
        answer: 0,
        solution: [
          { lab: 'Equity', val: 'The owners’ money and their stake in the business' },
          { lab: 'Debt', val: 'Borrowed money that must be repaid' },
          { lab: 'Answer', val: 'Equity', final: true }
        ],
        why: 'This is the same equity from the accounting equation. How an investment is funded — equity or ' +
             'debt — is one of the three central financial questions.'
      }
    ]
  },

  /* ═══════════════════════ HR AND LOGISTICS ═══════════════════════ */
  {
    id: 'i2-hrlog',
    title: 'Human Resources & Logistics',
    emoji: '🧑‍🤝‍🧑',
    summary: 'Getting the right people, and getting the right materials.',
    notes: [
      {
        heading: 'Human resource management',
        emoji: '👥',
        html:
          '<p><b>Human Resource Management (HRM)</b> is the organisational function dedicated to managing ' +
          'people. Its responsibility is to ensure <b>the right people are in the right jobs, at the right ' +
          'time</b>.</p>' +
          '<p>Traditionally administrative, HR today works with a <b>profit centre mindset</b> — accountable ' +
          'for its actions and required to show how investment in people drives profit and effectiveness.</p>' +
          '<div class="keybox"><b>HR contributes by</b> · providing well-trained and motivated staff · ' +
          'ensuring the business operates within labour law · increasing job satisfaction · ensuring employees ' +
          'have the skills needed for a digital world · managing change · aligning employee needs with ' +
          'organisational requirements</div>' +
          '<p>Managing people is a <b>shared responsibility</b> between HR professionals and line managers. In ' +
          'smaller businesses, line managers often perform HR duties alongside their own roles.</p>' +
          '<div class="keybox"><b>The five HRM tasks</b>' +
          '<br><b>1. HR planning</b> · using the organisation’s goals and strategy to forecast future human ' +
          'resource needs — what kind and how many skilled people are needed, and when' +
          '<br><b>2. Finding qualified talent</b> · recruitment, to attract a pool of qualified candidates' +
          '<br><b>3. Developing talent</b> · equipping employees with the specific skills to do the job, going ' +
          'beyond basic training to include technological and leadership capabilities' +
          '<br><b>4. Retaining talent</b> · the factors influencing whether an employee stays or leaves — ' +
          'compensation, company culture, career growth and work-life balance' +
          '<br><b>5. Motivating talent</b> · motivation is the inner drive that pushes an employee to perform ' +
          'well, and it does not follow automatically from being hired</div>'
      },
      {
        heading: 'Purchasing and supply',
        emoji: '🚚',
        html:
          '<p>A <b>supply chain</b> is "a network of businesses linked together through the buying and selling ' +
          'of materials" (Erasmus et al., 2023). If one link breaks, it can disrupt the entire chain, halting ' +
          'production and sales — which is why supplier relationships matter.</p>' +
          '<div class="keybox"><b>Purchasing managers are responsible for</b> · comparing prices · sourcing ' +
          'everything from stationery to strategic raw materials · keeping up with new technologies and ' +
          'substitute materials · ensuring quality · understanding market trends and supplier availability</div>' +
          '<p>The goal of purchasing and supply is to acquire the <b>right materials, in the right quantity, at ' +
          'the right quality, at the right time, and for the right price</b>.</p>'
      }
    ],
    questions: [
      {
        id: 'i2h-1', type: 'mcq', marks: 2,
        prompt: 'What is the responsibility of Human Resource Management?',
        options: [
          'Ensuring the right people are in the right jobs, at the right time',
          'Managing the company’s cash flow',
          'Transforming inputs into finished products',
          'Setting the organisation’s long-term strategy'
        ],
        answer: 0,
        solution: [
          { lab: 'HRM', val: 'The organisational function dedicated to managing people' },
          { lab: 'Its responsibility', val: 'The right people, in the right jobs, at the right time' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Getting this right is described as a source of competitive advantage, and finding, developing ' +
             'and keeping the right people as one of management’s hardest challenges.'
      },
      {
        id: 'i2h-2', type: 'multi', marks: 3,
        prompt: 'How does HR contribute to organisational effectiveness? <b>Select all that apply.</b>',
        options: [
          'Providing well-trained and motivated staff',
          'Ensuring the business operates within labour law',
          'Increasing employee job satisfaction',
          'Managing change for the benefit of individuals and the organisation',
          'Setting the selling price of the product'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Trained staff', val: 'Well-trained and motivated people' },
          { lab: 'Compliance', val: 'Operating within labour law' },
          { lab: 'Satisfaction', val: 'Increasing job satisfaction' },
          { lab: 'Change', val: 'Managing it for both the individual and the organisation' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Pricing belongs to marketing. Everything HR contributes runs through people, whether that is ' +
             'their skills, their satisfaction or their legal protection.'
      },
      {
        id: 'i2h-3', type: 'mcq', marks: 2,
        prompt: 'Who is responsible for managing people in an organisation?',
        options: [
          'It is shared between HR professionals and line managers',
          'The HR department alone',
          'Line managers alone',
          'Top management alone'
        ],
        answer: 0,
        solution: [
          { lab: 'Large organisations', val: 'A dedicated HR department coordinates the function' },
          { lab: 'Smaller businesses', val: 'Line managers often perform HR duties alongside their own roles' },
          { lab: 'Answer', val: 'It is shared', final: true }
        ],
        why: 'Even where an HR department exists, the line manager is the one who recruits into their team ' +
             'and manages performance day to day.'
      },
      {
        id: 'i2h-4', type: 'mcq', marks: 2,
        prompt: 'A <b>supply chain</b> is defined as:',
        options: [
          'A network of businesses linked together through the buying and selling of materials',
          'The route a delivery vehicle takes between depots',
          'The list of a company’s approved suppliers',
          'The sequence of steps that transforms inputs into outputs'
        ],
        answer: 0,
        solution: [
          { lab: 'Supply chain', val: 'A network of businesses linked by buying and selling materials' },
          { lab: 'Why it matters', val: 'One broken link can halt production and sales' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The last option describes the transformation process, which happens inside one business. A ' +
             'supply chain spans many.'
      },
      {
        id: 'i2h-5', type: 'multi', marks: 3,
        prompt: 'What is the goal of purchasing and supply? To acquire materials that are right in which ways? ' +
                '<b>Select all that apply.</b>',
        options: [
          'The right quantity',
          'The right quality',
          'The right time',
          'The right price',
          'The right colour'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'The goal', val: 'The right materials, in the right quantity, at the right quality, at the right time, for the right price' },
          { lab: 'Answer', val: 'Quantity, quality, time and price', final: true }
        ],
        why: 'All four must hold at once. Materials that are cheap but late, or prompt but poor, still fail ' +
             'the purchasing function’s test.'
      },
      {
        id: 'i2h-6', type: 'multi', marks: 3,
        prompt: 'Which of these are responsibilities of a <b>purchasing manager</b>? <b>Select all that apply.</b>',
        options: [
          'Comparing prices',
          'Ensuring the quality of materials bought',
          'Keeping up with new technologies and substitute materials',
          'Recruiting and training factory staff'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Prices', val: 'Comparing them across suppliers' },
          { lab: 'Quality', val: 'Materials bought directly affect the final product' },
          { lab: 'New technologies', val: 'Substitutes can improve productivity' },
          { lab: 'Recruitment', val: 'Human resources' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'Quality is the one people forget. Purchasing is not only about price — what is bought sets the ' +
             'ceiling on the quality of what can be produced.'
      },
      {
        id: 'i2h-7', type: 'multi', marks: 3,
        prompt: 'Which of these are tasks of Human Resource Management? <b>Select all that apply.</b>',
        options: [
          'HR planning',
          'Finding qualified talent',
          'Developing talent',
          'Retaining talent',
          'Motivating talent',
          'Setting the company’s long-term strategy'
        ],
        answers: [0, 1, 2, 3, 4],
        solution: [
          { lab: 'The five HRM tasks', val: 'Planning, finding, developing, retaining and motivating talent' },
          { lab: 'Long-term strategy', val: 'Top management' },
          { lab: 'Answer', val: 'The first five', final: true }
        ],
        why: 'The five follow the arc of an employee’s time with the business: work out who is needed, find ' +
             'them, train them, keep them, and keep them wanting to be there.'
      },
      {
        id: 'i2h-8', type: 'mcq', marks: 2,
        prompt: 'What question does <b>HR planning</b> answer?',
        options: [
          'What kind and how many skilled people do we need, and when do we need them?',
          'How much should each employee be paid?',
          'Which employees are likely to resign this year?',
          'How many hours should each shift last?'
        ],
        answer: 0,
        solution: [
          { lab: 'HR planning', val: 'Uses the organisation’s goals and strategy to forecast future needs' },
          { lab: 'The question', val: 'What kind and how many skilled people, and when' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'It starts from the organisation’s goals, which is what makes it planning rather than ' +
             'administration — the strategy determines the people needed, not the other way round.'
      },
      {
        id: 'i2h-9', type: 'multi', marks: 3,
        prompt: 'Which factors influence an employee’s decision to stay with an organisation? ' +
                '<b>Select all that apply.</b>',
        options: [
          'Compensation',
          'Company culture',
          'Career growth opportunities',
          'Work-life balance',
          'The company’s share price'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Retention', val: 'The factors influencing whether an employee stays or leaves' },
          { lab: 'Those factors', val: 'Compensation, company culture, career growth and work-life balance' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Finding and training good people is expensive, so retention protects an investment the business ' +
             'has already made.'
      },
      {
        id: 'i2h-10', type: 'mcq', marks: 2,
        prompt: 'What is <b>motivation</b>, as described in the HRM tasks?',
        options: [
          'The inner drive that pushes an employee to perform well',
          'The salary paid for good performance',
          'The training given to a new employee',
          'The process of recruiting qualified candidates'
        ],
        answer: 0,
        solution: [
          { lab: 'Motivation', val: 'The inner drive to perform well' },
          { lab: 'Note', val: 'Completing an onboarding programme does not automatically make an employee motivated' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The point being made is that motivation is not a box HR can tick on arrival — it has to be ' +
             'maintained after the hiring and training are done.'
      }
    ]
  }

  ]
});
