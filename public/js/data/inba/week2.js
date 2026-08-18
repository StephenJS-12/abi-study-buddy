/* INBA01-5 — Week 2: Management fundamentals.
   Concept, functions, levels, skills, roles and functional areas.

   Built from Abi's own Week 2 notes. As with Week 1, nothing here is filled in
   from outside those notes, and every reflection prompt and drag-and-drop
   practice activity is left out — good for learning, impossible to mark. */

window.MODULE_CONTENT = window.MODULE_CONTENT || {};
window.MODULE_CONTENT.inba = window.MODULE_CONTENT.inba || { weeks: [], exams: [] };

window.MODULE_CONTENT.inba.weeks.push({
  id: 'inba-week2',
  number: 2,
  title: 'Management Fundamentals',
  emoji: '🧭',
  accent: 3,
  blurb: 'What managers actually do, at every level, and the ten hats they wear doing it.',
  topics: [

  /* ═══════════════════════ WHAT MANAGEMENT IS ═══════════════════════ */
  {
    id: 'i2-management',
    title: 'What Management Is',
    emoji: '🎯',
    summary: 'Doing things right against doing the right things — and why an organisation needs either.',
    notes: [
      {
        heading: 'Efficiency and effectiveness',
        emoji: '⚖️',
        html:
          '<div class="keybox"><b>Efficiency</b> is <b>doing things right</b>. Getting the most output from the ' +
          'least input — not wasting time, money or effort.' +
          '<br><br><b>Effectiveness</b> is <b>doing the right things</b>. Performing the activities that will ' +
          'actually help reach the organisation’s most important goals.</div>' +
          '<p>The difference matters. You can be incredibly efficient and still be efficiently doing the wrong ' +
          'thing — your notes use a factory brilliantly producing VCRs. Efficient, and completely ineffective.</p>' +
          '<p><b>Effectiveness is the key to success; efficiency is what makes that success sustainable.</b></p>'
      },
      {
        heading: 'Why management matters',
        emoji: '🎼',
        html:
          '<p>An organisation without management is a sports team without a coach, or an orchestra without a ' +
          'conductor. Your notes give four reasons it is essential:</p>' +
          '<div class="keybox"><b>1. It gives direction</b> · management is the business’s GPS, channelling ' +
          'people, money and equipment towards goals' +
          '<br><b>2. It keeps operations balanced</b> · between the company’s goals, the employees’ goals, the ' +
          'owners’ interests and the available resources' +
          '<br><b>3. It connects the organisation to the outside world</b> · adapting to change, and sometimes ' +
          'creating it' +
          '<br><b>4. It drives productivity</b> · the greatest possible output from the least input</div>'
      }
    ],
    questions: [
      {
        id: 'i2m-1', type: 'mcq', marks: 2,
        prompt: 'Your notes define <b>efficiency</b> as:',
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
          { lab: 'Answer', val: 'Doing things right — the most output from the least input', final: true }
        ],
        why: 'The second option is effectiveness. The two get swapped constantly, and the phrasing is the ' +
             'giveaway: efficiency is about the <i>method</i>, effectiveness is about the <i>choice</i>.'
      },
      {
        id: 'i2m-2', type: 'mcq', marks: 3,
        scenario: 'A factory brilliantly and efficiently produces VCRs.',
        prompt: 'How do your notes describe this factory?',
        options: [
          'Efficient but completely ineffective',
          'Effective but inefficient',
          'Both efficient and effective',
          'Neither efficient nor effective'
        ],
        answer: 0,
        solution: [
          { lab: 'Efficient', val: 'It wastes nothing making what it makes' },
          { lab: 'Ineffective', val: 'Nobody wants VCRs — it is the wrong goal' },
          { lab: 'Answer', val: 'Efficient but completely ineffective', final: true }
        ],
        why: 'This is the whole point of separating the two words. Being excellent at the wrong activity is ' +
             'still failure, and no amount of extra efficiency fixes it.'
      },
      {
        id: 'i2m-3', type: 'mcq', marks: 2,
        prompt: 'According to your notes, which statement is correct?',
        options: [
          'Effectiveness is the key to success; efficiency is what makes that success sustainable',
          'Efficiency is the key to success; effectiveness makes it sustainable',
          'Only efficiency matters to an organisation’s success',
          'The two mean the same thing in practice'
        ],
        answer: 0,
        solution: [
          { lab: 'Effectiveness', val: 'The key to an organisation’s success' },
          { lab: 'Efficiency', val: 'What makes that success sustainable' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The order matters. Pick the right goal first, then pursue it without waste — doing it the other ' +
             'way round gets you a very economical journey to the wrong place.'
      },
      {
        id: 'i2m-4', type: 'multi', marks: 3,
        prompt: 'Which of these does your notes give as reasons management is important? <b>Select all that apply.</b>',
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
          { lab: 'Balance', val: 'Between company goals, employee goals, owners and resources' },
          { lab: 'Connection', val: 'Keeping the business in tune with its environment' },
          { lab: 'Productivity', val: 'Greatest output from the least input' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'The last one is the opposite of what your notes describe — Patrice Motsepe is used as an example ' +
             'of a manager who empowered staff through training so they could operate independently.'
      },
      {
        id: 'i2m-5', type: 'multi', marks: 3,
        prompt: 'Your notes say management must balance competing interests inside a business. Which are listed? ' +
                '<b>Select all that apply.</b>',
        options: [
          'The company’s goals, such as profit and growth',
          'The employees’ goals, such as fair pay and job satisfaction',
          'The owners’ interests, such as a return on investment',
          'The available resources',
          'The competitors’ pricing decisions'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Company goals', val: 'Profit, growth' },
          { lab: 'Employee goals', val: 'Fair pay, job satisfaction' },
          { lab: 'Owners', val: 'A return on investment' },
          { lab: 'Resources', val: 'People, money, physical assets' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'All four sit <i>inside</i> the business — the micro environment from Week 1. A competitor’s ' +
             'pricing belongs to the market environment, which management does not balance but responds to.'
      }
    ]
  },

  /* ═══════════════════════ THE FOUR FUNCTIONS ═══════════════════════ */
  {
    id: 'i2-functions',
    title: 'The Four Functions',
    emoji: '🔁',
    summary: 'Plan, organise, lead, control — in that order, and round again.',
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
          '<p><i>Source: Robbins &amp; Coulter (2007:9), as given in your notes.</i></p>'
      },
      {
        heading: 'Why the order is not optional',
        emoji: '➡️',
        html:
          '<p>The four are linked in a logical sequence forming a continuous cycle, and they need to be done in ' +
          'order:</p>' +
          '<p>You cannot <b>organise</b> a team if you have not first <b>planned</b> what the goal is. You cannot ' +
          '<b>lead</b> people to do work that has not been organised and assigned. You cannot <b>control</b> and ' +
          'check results if you have not led the team to do the work in the first place.</p>' +
          '<p>That said, managers often perform several at once — planning next quarter’s budget while leading a ' +
          'meeting to resolve a conflict and checking a timeline that has slipped.</p>'
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
        why: 'Planning and organising are the pair most often confused. Planning decides the goal; organising ' +
             'decides who will do what to reach it.'
      },
      {
        id: 'i2f-2', type: 'mcq', marks: 2,
        prompt: 'Which function do your notes describe as the starting point of the cycle?',
        options: ['Planning', 'Organising', 'Leading', 'Controlling'],
        answer: 0,
        solution: [
          { lab: 'Planning', val: 'Like setting the GPS — it marks the starting point of the process' },
          { lab: 'Why', val: 'You cannot organise a team before you know the goal' },
          { lab: 'Answer', val: 'Planning', final: true }
        ],
        why: 'Your notes call planning the preparation phase for achieving the organisation’s goals. Everything ' +
             'else in the cycle depends on it having happened.'
      },
      {
        id: 'i2f-3', type: 'mcq', marks: 2,
        scenario: 'The head of a department compares this month’s sales figures against the quarterly target.',
        prompt: 'Which function is this?',
        options: ['Controlling', 'Planning', 'Organising', 'Leading'],
        answer: 0,
        solution: [
          { lab: 'What is happening', val: 'Progress is being checked against the plan' },
          { lab: 'Function', val: 'Controlling — monitoring activities to ensure they go as planned' },
          { lab: 'Answer', val: 'Controlling', final: true }
        ],
        why: 'Setting the target would have been planning. Comparing actual results against it afterwards is ' +
             'the control function doing its job.'
      },
      {
        id: 'i2f-4', type: 'mcq', marks: 2,
        scenario: 'An owner creates a new roster to ensure adequate weekend staff coverage.',
        prompt: 'Which function is this?',
        options: ['Organising', 'Controlling', 'Planning', 'Leading'],
        answer: 0,
        solution: [
          { lab: 'What is happening', val: 'People are being allocated to tasks and times' },
          { lab: 'Function', val: 'Organising — who is to do it, and how' },
          { lab: 'Answer', val: 'Organising', final: true }
        ],
        why: 'A roster is the classic organising task: the goal already exists, and this decides who covers ' +
             'what to meet it.'
      },
      {
        id: 'i2f-5', type: 'mcq', marks: 3,
        prompt: 'Why do your notes say the four functions must be done in order?',
        options: [
          'You cannot organise a team before planning the goal, or control results before the work has been led',
          'Because the textbook lists them alphabetically',
          'Because each function is handled by a different level of management',
          'Because a manager can only perform one function at a time'
        ],
        answer: 0,
        solution: [
          { lab: 'Planning first', val: 'There is nothing to organise around without a goal' },
          { lab: 'Then organising', val: 'Work must be assigned before anyone can be led to do it' },
          { lab: 'Then leading, then controlling', val: 'You cannot check results that do not exist yet' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The last option is explicitly contradicted: your notes say managers often perform several ' +
             'functions simultaneously, even though the logical order still holds.'
      },
      {
        id: 'i2f-6', type: 'mcq', marks: 2,
        scenario: 'A team leader hosts a virtual coffee meeting to check in on her remote team’s morale.',
        prompt: 'Which function is this?',
        options: ['Leading', 'Controlling', 'Organising', 'Planning'],
        answer: 0,
        solution: [
          { lab: 'What is happening', val: 'Motivating people and building connection' },
          { lab: 'Function', val: 'Leading — dealing with people' },
          { lab: 'Answer', val: 'Leading', final: true }
        ],
        why: 'Your notes single this out as a modern difficulty: managers now have to lead hybrid and remote ' +
             'teams and make them feel connected despite the distance.'
      }
    ]
  },

  /* ═══════════════════════ LEVELS OF MANAGEMENT ═══════════════════════ */
  {
    id: 'i2-levels',
    title: 'Levels of Management',
    emoji: '🪜',
    summary: 'The strategists, the translators and the implementers.',
    notes: [
      {
        heading: 'Three levels',
        emoji: '🏢',
        html:
          '<div class="keybox"><b>Top management</b> — the strategists, the "why". Board of Directors, CEO, ' +
          'Managing Director; in government, the Minister and Director-General. Sets mission, vision and overall ' +
          'goals; develops long-term strategy; approves major policy and large budgets; represents the company ' +
          'publicly. Also known as the <b>strategic</b> level.' +
          '<br><br><b>Middle management</b> — the translators, the "how". Marketing, HR and operations managers, ' +
          'regional managers, divisional heads, project leaders. Translates top-level strategy into actionable ' +
          'plans; medium-term planning; develops <b>tactical</b> objectives.' +
          '<br><br><b>Lower management</b> — the implementers, the "do". Also called supervisory or line ' +
          'management: team leaders, supervisors, foremen. Short-term and task-oriented; creates ' +
          '<b>operational</b> plans from middle management’s tactical plans.</div>'
      },
      {
        heading: 'Span of control',
        emoji: '📏',
        html:
          '<p>The number of management levels is largely determined by the organisation’s size and the ' +
          '<b>span of control</b> — the number of people one manager can effectively oversee.</p>' +
          '<p>A one-person shoe repair shop combines all management functions in the owner. A national retail ' +
          'chain needs multiple complex layers to coordinate thousands of employees.</p>' +
          '<p>One thing sets lower management apart: unlike the other two levels, they do <b>not</b> supervise ' +
          'other managers. They supervise operational employees.</p>'
      }
    ],
    questions: [
      {
        id: 'i2l-1', type: 'match', marks: 3,
        prompt: 'Match each level of management to how your notes describe it.',
        pairs: [
          { left: 'Top management', right: 'The strategists — the "why"' },
          { left: 'Middle management', right: 'The translators — the "how"' },
          { left: 'Lower management', right: 'The implementers — the "do"' }
        ],
        solution: [
          { lab: 'Top', val: 'Sets the mission, vision and long-term strategy' },
          { lab: 'Middle', val: 'Turns that strategy into plans a department can act on' },
          { lab: 'Lower', val: 'Gets the daily work done' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The sports team comparison in your notes: head coach, assistant coaches, position coaches. All ' +
             'management, completely different jobs.'
      },
      {
        id: 'i2l-2', type: 'mcq', marks: 2,
        prompt: 'What is the <b>span of control</b>?',
        options: [
          'The number of people one manager can effectively oversee',
          'The number of levels of management in an organisation',
          'The size of the budget a manager may approve',
          'The geographic area a business operates in'
        ],
        answer: 0,
        solution: [
          { lab: 'Span of control', val: 'How many people one manager can effectively oversee' },
          { lab: 'Why it matters', val: 'Along with size, it determines how many levels an organisation needs' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The second option is the consequence, not the definition. A narrow span of control forces more ' +
             'levels, because each manager can only handle so many people.'
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
          { lab: 'Top', val: 'Strategic — the mission and long-term direction' },
          { lab: 'Middle', val: 'Tactical — turning strategy into department objectives' },
          { lab: 'Lower', val: 'Operational — the daily and weekly detail' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'Strategic, tactical and operational is the same ladder viewed from the planning side. Week 3 of ' +
             'your module goes into each in detail.'
      },
      {
        id: 'i2l-4', type: 'mcq', marks: 3,
        prompt: 'What makes lower management different from the other two levels?',
        options: [
          'They do not supervise other managers — they supervise operational employees',
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
        why: 'They still plan, organise, lead and control — just over a shorter horizon and with a team that ' +
             'does the work rather than manages it.'
      },
      {
        id: 'i2l-5', type: 'multi', marks: 3,
        prompt: 'Which of these are responsibilities of <b>top management</b>? <b>Select all that apply.</b>',
        options: [
          'Setting the company’s mission, vision and overall goals',
          'Developing long-term strategies',
          'Approving large budgets and major policy decisions',
          'Allocating daily tasks to frontline employees',
          'Handling the weekly staff roster'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Mission and vision', val: 'Top management sets them' },
          { lab: 'Long-term strategy', val: 'The strategic level' },
          { lab: 'Major policy and budgets', val: 'Ultimate authority for the organisation' },
          { lab: 'The last two', val: 'Lower management — day-to-day and task-oriented' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'The time horizon is the quickest test. Anything measured in days belongs to lower management; ' +
             'anything measured in years belongs to the top.'
      },
      {
        id: 'i2l-6', type: 'mcq', marks: 2,
        prompt: 'A marketing manager or a human resource manager sits at which level?',
        options: ['Middle management', 'Top management', 'Lower management', 'They are not managers'],
        answer: 0,
        solution: [
          { lab: 'Middle management', val: 'Responsible for specific departments or functions' },
          { lab: 'Their job', val: 'Translating top-level strategy into plans for their department' },
          { lab: 'Answer', val: 'Middle management', final: true }
        ],
        why: 'Your notes also place regional managers, divisional heads and project leaders here, depending on ' +
             'the organogram.'
      }
    ]
  },

  /* ═══════════════════════ MANAGERIAL SKILLS ═══════════════════════ */
  {
    id: 'i2-skills',
    title: 'Managerial Skills',
    emoji: '🧰',
    summary: 'Conceptual, human and technical — and how the mix changes as you climb.',
    notes: [
      {
        heading: 'Three skills',
        emoji: '🎓',
        html:
          '<div class="keybox"><b>Technical skills</b> · the ability to use the procedures, techniques and ' +
          'knowledge of a specialised field. Directly related to the job.' +
          '<br><br><b>Human skills</b> · the ability to work with, understand and motivate other people, as ' +
          'individuals or in groups. <b>Necessary at all levels of management.</b>' +
          '<br><br><b>Conceptual skills</b> · the ability to coordinate and integrate all of an organisation’s ' +
          'interests and activities — "the ability to think and to conceptualise about abstract and complex ' +
          'situations" (Robbins &amp; Coulter, 2007:13).</div>' +
          '<p>Your notes open with the trap: promote your best software developer to lead the team, and a ' +
          'technical genius may struggle to explain goals or resolve conflicts. The skills that made someone ' +
          'excellent in a role are not the skills they need to manage it.</p>'
      },
      {
        heading: 'The mix by level',
        emoji: '📐',
        html:
          '<div class="keybox"><b>Top management</b> · high conceptual, medium interpersonal, low technical' +
          '<br><b>Middle management</b> · a balance of all three' +
          '<br><b>Lower management</b> · high technical, medium interpersonal, lower conceptual</div>' +
          '<p>The CEO is not writing code or balancing a departmental budget. The supervisor needs deep ' +
          'technical knowledge to train staff, solve daily problems and command respect.</p>'
      }
    ],
    questions: [
      {
        id: 'i2s-1', type: 'match', marks: 3,
        prompt: 'Match each managerial skill to its definition.',
        pairs: [
          { left: 'Technical skills', right: 'Using the procedures, techniques and knowledge of a specialised field' },
          { left: 'Human skills', right: 'Working with, understanding and motivating other people' },
          { left: 'Conceptual skills', right: 'Thinking about abstract and complex situations, integrating the whole organisation' }
        ],
        solution: [
          { lab: 'Technical', val: 'Job-specific know-how' },
          { lab: 'Human', val: 'People, individually and in groups' },
          { lab: 'Conceptual', val: 'The organisation as a whole and how it fits its environment' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'Conceptual is the hardest to pin down. It is about seeing the whole picture at once — which is ' +
             'why your notes attach it to the level responsible for the whole organisation.'
      },
      {
        id: 'i2s-2', type: 'mcq', marks: 3,
        prompt: 'Which skill mix do your notes give for <b>top management</b>?',
        options: [
          'High conceptual, medium interpersonal, low technical',
          'High technical, medium interpersonal, lower conceptual',
          'A balance of all three',
          'High technical, high conceptual, low interpersonal'
        ],
        answer: 0,
        solution: [
          { lab: 'Conceptual', val: 'High — setting long-term vision and strategy' },
          { lab: 'Interpersonal', val: 'Medium — leading executives, inspiring the workforce, negotiating' },
          { lab: 'Technical', val: 'Low — the CEO is not writing code' },
          { lab: 'Answer', val: 'High conceptual, medium interpersonal, low technical', final: true }
        ],
        why: 'The second option is lower management, exactly inverted. The mix flips as you climb, which is ' +
             'why promoting a brilliant technician can go so badly.'
      },
      {
        id: 'i2s-3', type: 'mcq', marks: 2,
        prompt: 'Which skill do your notes say is necessary at <b>all</b> levels of management?',
        options: ['Human skills', 'Technical skills', 'Conceptual skills', 'None — each level needs only one'],
        answer: 0,
        solution: [
          { lab: 'Human skills', val: 'Necessary at all levels — every manager works with people' },
          { lab: 'Examples given', val: 'First-line dealing with technical staff; top dealing with lower managers' },
          { lab: 'Answer', val: 'Human skills', final: true }
        ],
        why: 'Technical and conceptual rise and fall as you move up the ladder. Human skills never stop ' +
             'mattering, because every level is managing people.'
      },
      {
        id: 'i2s-4', type: 'mcq', marks: 2,
        prompt: 'Which skill mix belongs to <b>lower management</b>?',
        options: [
          'High technical, medium interpersonal, lower conceptual',
          'High conceptual, medium interpersonal, low technical',
          'A balance of all three',
          'High conceptual, high technical, no interpersonal'
        ],
        answer: 0,
        solution: [
          { lab: 'Technical', val: 'High — needed to train staff and solve daily problems' },
          { lab: 'Interpersonal', val: 'Medium — they spend all day with their team' },
          { lab: 'Conceptual', val: 'Lower — just enough to see how the team fits the department' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Deep technical knowledge is also how a supervisor commands respect, according to your notes — ' +
             'it is not only about doing the work.'
      },
      {
        id: 'i2s-5', type: 'mcq', marks: 2,
        prompt: 'Which level needs <b>a balance of all three</b> skills?',
        options: ['Middle management', 'Top management', 'Lower management', 'No level does'],
        answer: 0,
        solution: [
          { lab: 'Conceptual', val: 'To understand the bigger strategy' },
          { lab: 'Technical', val: 'Enough to ask the right questions in their function' },
          { lab: 'Interpersonal', val: 'To communicate up and down the ladder' },
          { lab: 'Answer', val: 'Middle management', final: true }
        ],
        why: 'It follows from the job. A middle manager is translating between two levels, so they need enough ' +
             'of the language spoken at each.'
      },
      {
        id: 'i2s-6', type: 'mcq', marks: 3,
        scenario: 'A brilliant software developer is promoted to lead the team. They struggle to explain the ' +
                  'project goals and cannot resolve conflicts between colleagues.',
        prompt: 'Which skill are they lacking?',
        options: ['Human skills', 'Technical skills', 'Conceptual skills', 'Financial skills'],
        answer: 0,
        solution: [
          { lab: 'They have', val: 'Technical skills in abundance — they are a genius at the work' },
          { lab: 'They lack', val: 'The ability to work with, understand and motivate other people' },
          { lab: 'Answer', val: 'Human skills', final: true }
        ],
        why: 'This is your notes’ opening example, and the reason the three skills are taught separately. ' +
             'Being excellent at a job is not the same as being able to manage people doing it.'
      }
    ]
  },

  /* ═══════════════════════ MANAGERIAL ROLES ═══════════════════════ */
  {
    id: 'i2-roles',
    title: 'The Ten Managerial Roles',
    emoji: '🎭',
    summary: 'Mintzberg’s ten hats, in three groups.',
    notes: [
      {
        heading: 'Three categories, ten roles',
        emoji: '🎩',
        html:
          '<p><b>Henry Mintzberg</b> identified ten roles every manager plays, divided into three categories:</p>' +
          '<div class="keybox"><b>Interpersonal</b> · Figurehead · Leader · Liaison' +
          '<br><b>Informational</b> · Monitor · Disseminator · Spokesperson' +
          '<br><b>Decisional</b> · Entrepreneur · Disturbance handler · Resource allocator · Negotiator</div>'
      },
      {
        heading: 'What each one does',
        emoji: '📖',
        html:
          '<div class="keybox"><b>Figurehead</b> · symbolic head; routine duties of a legal or social nature — ' +
          'greeting visitors, signing legal documents' +
          '<br><b>Leader</b> · responsible for motivating subordinates, staffing and training' +
          '<br><b>Liaison</b> · maintains a self-developed network of outside contacts' +
          '<br><b>Monitor</b> · seeks and receives a wide variety of internal and external information' +
          '<br><b>Disseminator</b> · transmits information to members of the organisation' +
          '<br><b>Spokesperson</b> · transmits information to <i>outsiders</i> about plans, policies and results' +
          '<br><b>Entrepreneur</b> · searches for opportunities and initiates improvement projects' +
          '<br><b>Disturbance handler</b> · corrective action when facing important, unexpected disturbances' +
          '<br><b>Resource allocator</b> · allocates resources of all kinds; approves significant decisions' +
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
          { lab: 'Mintzberg', val: 'Identified ten roles every manager plays' },
          { lab: 'Grouped into', val: 'Interpersonal, informational and decision-making' },
          { lab: 'Answer', val: 'Henry Mintzberg', final: true }
        ],
        why: 'Robbins and Coulter appear all through your notes for definitions of the four functions, but the ' +
             'ten roles are Mintzberg’s.'
      },
      {
        id: 'i2r-2', type: 'match', marks: 3,
        prompt: 'Match each interpersonal role to what the manager is doing.',
        pairs: [
          { left: 'Figurehead', right: 'Giving a speech at a company event and signing legal documents' },
          { left: 'Leader', right: 'Conducting a performance review and helping an employee set career goals' },
          { left: 'Liaison', right: 'Having lunch with a key client to maintain the relationship' }
        ],
        solution: [
          { lab: 'Figurehead', val: 'The symbolic, public face of the unit' },
          { lab: 'Leader', val: 'Hiring, training, motivating and evaluating' },
          { lab: 'Liaison', val: 'Building a network inside and outside the organisation' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'Your notes say the liaison role can consume up to half a manager’s time — far more than the ' +
             'ceremonial figurehead duties people picture when they think of a manager.'
      },
      {
        id: 'i2r-3', type: 'multi', marks: 3,
        prompt: 'Which of these are the <b>informational</b> roles? <b>Select all that apply.</b>',
        options: ['Monitor', 'Disseminator', 'Spokesperson', 'Negotiator', 'Figurehead'],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Monitor', val: 'Seeks and receives information' },
          { lab: 'Disseminator', val: 'Passes it to people inside the organisation' },
          { lab: 'Spokesperson', val: 'Passes it to people outside' },
          { lab: 'Negotiator and Figurehead', val: 'Decisional and interpersonal respectively' },
          { lab: 'Answer', val: 'Monitor, Disseminator and Spokesperson', final: true }
        ],
        why: 'The three form a neat chain: take information in, spread it inside, then speak for the ' +
             'organisation outside.'
      },
      {
        id: 'i2r-4', type: 'mcq', marks: 3,
        prompt: 'What is the difference between the <b>Disseminator</b> and the <b>Spokesperson</b>?',
        options: [
          'The disseminator passes information to members of the organisation; the spokesperson passes it to outsiders',
          'The disseminator speaks to the media; the spokesperson speaks to staff',
          'The disseminator gathers information; the spokesperson analyses it',
          'There is no difference — they are two names for one role'
        ],
        answer: 0,
        solution: [
          { lab: 'Disseminator', val: 'Transmits information to members of the organisation' },
          { lab: 'Spokesperson', val: 'Transmits information to outsiders — plans, policies, actions, results' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The direction of travel is the whole distinction. Gathering the information in the first place ' +
             'is the Monitor, which is a third separate role.'
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
          { lab: 'Entrepreneur', val: 'Initiates change, deliberately' },
          { lab: 'Disturbance handler', val: 'Responds to change that was forced on them' },
          { lab: 'Resource allocator', val: 'Decides where money, people and time go' },
          { lab: 'Negotiator', val: 'Speaks for the organisation in major negotiations' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'Entrepreneur and disturbance handler are the pair worth separating: both involve change, but one ' +
             'is chosen and the other is not.'
      },
      {
        id: 'i2r-6', type: 'mcq', marks: 2,
        scenario: 'A manager participates in union contract negotiations on behalf of the company.',
        prompt: 'Which role is this?',
        options: ['Negotiator', 'Liaison', 'Spokesperson', 'Disturbance handler'],
        answer: 0,
        solution: [
          { lab: 'The activity', val: 'Representing the organisation at a major negotiation' },
          { lab: 'Role', val: 'Negotiator — a decision-making role' },
          { lab: 'Answer', val: 'Negotiator', final: true }
        ],
        why: 'Your notes give union contract negotiations as the identifiable activity for this exact role. ' +
             'A liaison builds the network; a negotiator strikes the deal.'
      },
      {
        id: 'i2r-7', type: 'multi', marks: 3,
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
        why: 'Decisional is the largest of the three groups with four roles, against three each for ' +
             'interpersonal and informational. Ten in total.'
      }
    ]
  },

  /* ═══════════════════════ FUNCTIONAL AREAS ═══════════════════════ */
  {
    id: 'i2-areas',
    title: 'Functional Areas',
    emoji: '🏭',
    summary: 'The five main departments a business runs on, and the three that arrived later.',
    notes: [
      {
        heading: 'The five main functional areas',
        emoji: '🗂️',
        html:
          '<div class="keybox"><b>Operations</b> · utilising resources to manufacture products or render services' +
          '<br><b>Human resources</b> · the people side of the business' +
          '<br><b>Marketing</b> · converting what the business makes into what customers want' +
          '<br><b>Finance</b> · where the money comes from and where it goes' +
          '<br><b>Logistics — purchasing and supply</b> · the supply chain</div>' +
          '<p>Your notes are explicit that there are several other roles and functions, but that these five are ' +
          'the scope of this module.</p>'
      },
      {
        heading: 'Operations, and three later additions',
        emoji: '⚙️',
        html:
          '<div class="keybox"><b>Operations function</b> · the function aimed at utilising resources to ' +
          'manufacture products or render services' +
          '<br><b>Operations managers</b> · the personnel directly responsible for managing that function' +
          '<br><b>Operations management</b> · the activities, decisions and responsibilities involved in ' +
          'executing it — planning, organising, scheduling and controlling</div>' +
          '<p>Strydom (2008) identifies three <b>additional</b> functions as businesses evolve:</p>' +
          '<div class="keybox"><b>IT manager</b> · manages the technology life cycle — new systems, networks and ' +
          'hardware, data security and access' +
          '<br><b>PR manager</b> · guardian of the company’s image, internally and externally' +
          '<br><b>Administrative manager</b> · a generalist who supports the whole organisation rather than ' +
          'specialising in one function</div>'
      }
    ],
    questions: [
      {
        id: 'i2a-1', type: 'multi', marks: 3,
        prompt: 'Which of these are among the <b>five main functional areas</b> covered by this module? ' +
                '<b>Select all that apply.</b>',
        options: [
          'Operations',
          'Human resources',
          'Marketing',
          'Finance',
          'Public relations',
          'Information technology'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'The five main areas', val: 'Operations, human resources, marketing, finance, and logistics' },
          { lab: 'PR and IT', val: 'Listed separately as additional functions (Strydom, 2008)' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Logistics — purchasing and supply — is the fifth main area and is not offered here. PR and IT are ' +
             'real functions but your notes group them as later additions.'
      },
      {
        id: 'i2a-2', type: 'match', marks: 3,
        prompt: 'Your notes distinguish three related operations terms. Match each to its meaning.',
        pairs: [
          { left: 'Operations function', right: 'Utilising resources to manufacture products or render services' },
          { left: 'Operations managers', right: 'The personnel directly responsible for managing that function' },
          { left: 'Operations management', right: 'The activities and decisions involved in executing it' }
        ],
        solution: [
          { lab: 'The function', val: 'What the business does' },
          { lab: 'The managers', val: 'Who is responsible for it' },
          { lab: 'The management', val: 'Planning, organising, scheduling and controlling it' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The three words look almost identical, which is exactly why your notes define them separately — ' +
             'the function, the people, and the activity are three different things.'
      },
      {
        id: 'i2a-3', type: 'match', marks: 3,
        prompt: 'Match each of the three additional functions to what it does.',
        pairs: [
          { left: 'IT manager', right: 'Manages the technology life cycle, networks and data security' },
          { left: 'PR manager', right: 'Guardian of the company’s image, internally and externally' },
          { left: 'Administrative manager', right: 'A generalist supporting the whole organisation across departments' }
        ],
        solution: [
          { lab: 'IT', val: 'New systems, hardware, and controlling data access' },
          { lab: 'PR', val: 'A favourable perception among employees, public, media and investors' },
          { lab: 'Administrative', val: 'Office management, record-keeping, logistical support' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The administrative manager is the odd one out on purpose — your notes describe them as a ' +
             'generalist who does <i>not</i> specialise in one function.'
      },
      {
        id: 'i2a-4', type: 'mcq', marks: 2,
        prompt: 'Which function is directly concerned with transforming inputs into outputs?',
        options: ['Operations', 'Finance', 'Marketing', 'Human resources'],
        answer: 0,
        solution: [
          { lab: 'Every business', val: 'Is a system that transforms inputs into outputs' },
          { lab: 'The function concerned with it', val: 'Operations — creating products and providing services' },
          { lab: 'Answer', val: 'Operations', final: true }
        ],
        why: 'This is the transformation idea from Week 1 reappearing. E-Bike SA buys raw materials, and ' +
             'operations is the department that assembles them into working e-bikes.'
      },
      {
        id: 'i2a-5', type: 'multi', marks: 3,
        prompt: 'Your notes say effective operations can be a source of competitive advantage. Which of these are ' +
                'given as ways? <b>Select all that apply.</b>',
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
          { lab: 'Revenue increase', val: 'Quality can command higher prices or more sales' },
          { lab: 'Capital efficiency', val: 'Better use of facilities and equipment' },
          { lab: 'Innovation', val: 'Operational skill and knowledge feed new products' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Your notes put it as Profit = Revenue − Costs, and point out that operations is one of the few ' +
             'functions that can push on both sides of that equation.'
      },
      {
        id: 'i2a-6', type: 'mcq', marks: 2,
        prompt: 'According to your notes, who is the <b>administrative manager</b>?',
        options: [
          'A generalist who supports the entire organisation rather than specialising in one function',
          'The manager responsible for data security and networks',
          'The manager who protects the company’s public image',
          'The most senior manager in the organisation'
        ],
        answer: 0,
        solution: [
          { lab: 'Not a specialist', val: 'They do not specialise in one function' },
          { lab: 'Their job', val: 'Organising and facilitating the activities of the specialised managers' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The other two options describe the IT and PR managers, which are the other two additional ' +
             'functions Strydom identifies alongside this one.'
      }
    ]
  }

  ]
});
