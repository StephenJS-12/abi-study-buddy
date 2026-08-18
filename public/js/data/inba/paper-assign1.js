/* INBA01-5 — questions derived from Assignment 1 (example paper).

   Assignment 1 is almost entirely long-form application: "use an AI tool to
   find a business opportunity", "substantiate why you chose these three
   institutions", "provide a personal reflection". None of that can be marked
   automatically, and none of it is what Abi is trying to revise. What each
   sub-question EXAMINES, though, is theory — and that is what is asked here.

   Every sub-question of the paper was worked through in order so none is
   skipped:

     Q1.1   describe the opportunity, justify the venture
              → the four tests of a good opportunity; feasibility and its two
                legitimate outcomes
     Q1.2   access to finance, funding institutions
              → financial structure planning; resource mobilisation; where
                providers of capital sit in the business environment
     Q1.3   attract and keep a 16–35 target group
              → the formal definition of marketing; the four Ps applied to a
                target group; promotion objectives; forecasting demand
     Q1.4.1 support and mentorship for young founders
              → the reasons behind the advice given to student entrepreneurs
     Q1.4.2 government programmes and initiatives
              → the macro environment, and what management can do about it
     Q2.1   ethical leadership and governance challenges
              → leading by example; governance as distinct from personal
                ethics; what the King reports cover, and how
     Q2.2.1 which level of management
              → top management in a government structure
     Q2.2.2 which manager drives capacity building
              → developing talent, and whose job it is
     Q2.2.3 bureaucracy, resource scarcity, corruption
              → tall structures and what they suit; the scarcity of all four
                resources
     Q2.3   roles used to engage business and communities
              → the Mintzberg roles defined as facing outward
     Q2.4   functional areas that remedy poor service delivery
              → matching a specific failure to the function responsible; the
                supply chain and its broken link
     Q2.5   what would you bring as a manager
              → why excellence at the work does not transfer to managing it

   Where the paper expects South African specifics the notes do not carry —
   named funding institutions, named government programmes — the question asks
   the concept underneath instead. Inventing the specifics would teach her
   facts this module never gave her, and she would carry them into an exam.

   These merge into the existing topic pools rather than forming a topic of
   their own, so she meets them while revising the topic they belong to. */

(function () {
  var byTopic = {};

  /* ───────── Q1.1 the opportunity · Q1.2 resources · Q1.4.1 support ───────── */
  byTopic['i1-process'] = [
    {
      id: 'a1-1', type: 'match', marks: 4,
      prompt: 'A founder is defending a new venture to a panel. Match each statement she makes to the test ' +
              'of a good opportunity it satisfies.',
      pairs: [
        { left: 'Households here complain constantly about something nobody currently solves', right: 'It solves a real customer problem' },
        { left: 'The same platform could serve five times as many customers without costing five times as much', right: 'It is scalable' },
        { left: 'Smartphone ownership in this group has only just reached the level the service needs', right: 'It has the right timing' },
        { left: 'The projected margin covers the running costs and still leaves a return', right: 'It is potentially rewarding' }
      ],
      solution: [
        { lab: 'Real problem', val: 'Without one there is no customer, however good the idea' },
        { lab: 'Scalable', val: 'It can grow beyond what the founder can personally serve' },
        { lab: 'Timing', val: 'A window is open now that was not open before' },
        { lab: 'Rewarding', val: 'Worth doing for this founder specifically' },
        { lab: 'Answer', val: 'All four rows as above', final: true }
      ],
      why: 'A good idea and a good opportunity are not the same thing, and these four tests are exactly what ' +
           'separates them. Notice that each statement is evidence rather than enthusiasm — that is what a ' +
           'panel is listening for.'
    },
    {
      id: 'a1-2', type: 'mcq', marks: 3,
      prompt: 'A founder spends three months on a feasibility study, researching the market, the industry and ' +
              'the finances. The research shows demand is far smaller than she assumed and the margins will ' +
              'not cover the running costs, so she abandons the idea without ever writing a business plan. ' +
              'Has the entrepreneurial process gone wrong?',
      options: [
        'No — a decision to abandon the idea is one of the two legitimate outcomes of a feasibility analysis',
        'Yes — the process is only complete once a business plan has been written',
        'Yes — feasibility analysis belongs after the business plan, so the steps were done in the wrong order',
        'No — but only because she had not yet spent any money on the venture'
      ],
      answer: 0,
      solution: [
        { lab: 'Feasibility analysis', val: 'Step 5 — the market, the industry and the finances' },
        { lab: 'Its two outcomes', val: 'A decision to move forward, or a decision to abandon the idea' },
        { lab: 'Where it sits', val: 'Deliberately before the business plan at step 6' },
        { lab: 'Answer', val: 'No — abandoning is a legitimate outcome', final: true }
      ],
      why: 'This is the whole point of putting feasibility before the business plan. Finding out the venture ' +
           'will not survive is the study working, not failing — and far cheaper at step 5 than at step 7.'
    },
    {
      id: 'a1-3', type: 'multi', marks: 4,
      prompt: 'A founder justifies a venture like this: <i>"Load-shedding has left households with a problem ' +
              'nobody is currently solving at a price they can afford. The projected margin covers my running ' +
              'costs and still leaves a worthwhile return."</i> Which of the four tests of a good opportunity ' +
              'has this justification actually addressed? <b>Select all that apply.</b>',
      options: [
        'It solves a real customer problem',
        'It is potentially rewarding',
        'It is scalable',
        'It has the right timing',
        'It requires no financial investment'
      ],
      answers: [0, 1],
      solution: [
        { lab: 'Addressed', val: 'A real unsolved problem, and a return worth having' },
        { lab: 'Not addressed', val: 'Scalability — nothing says it can grow beyond one founder' },
        { lab: 'Not addressed', val: 'Timing — nothing says why now rather than three years ago' },
        { lab: 'Answer', val: 'The first two only', final: true }
      ],
      why: 'Half the tests are missing, and that is the trap. A justification that proves a problem exists ' +
           'and money can be made sounds complete until you ask whether it can grow, and why the window is ' +
           'open now.'
    },
    {
      id: 'a1-4', type: 'mcq', marks: 3,
      prompt: 'An entrepreneur has decided she is suited to running a business, has honestly assessed her own ' +
              'skills, and has identified an opportunity she is confident in. She cannot raise the money to ' +
              'buy equipment or bring in the two people whose skills she lacks, and the venture stalls there. ' +
              'Which step of the entrepreneurial process is she stuck at?',
      options: [
        'Step 3 — resource mobilisation',
        'Step 5 — feasibility analysis',
        'Step 6 — the business plan',
        'Step 7 — launch and management'
      ],
      answer: 0,
      solution: [
        { lab: 'Resource mobilisation', val: 'Financial, human and physical resources' },
        { lab: 'What she is short of', val: 'The financial and the human ones' },
        { lab: 'Answer', val: 'Step 3', final: true }
      ],
      why: 'Financing appears twice in this module — as a step of the process, and as one of the seven ' +
           'challenges facing new entrepreneurs. That is not repetition: it is the point at which most ' +
           'ventures actually stop.'
    },
    {
      id: 'a1-5', type: 'match', marks: 4,
      prompt: 'Match each piece of advice given to young entrepreneurs to the reason given for it.',
      pairs: [
        { left: 'Do what you love', right: 'Hands-on experience is what lets you understand the business completely' },
        { left: 'Know what you want', right: 'A thorough understanding of what you want in life shapes how you organise your time' },
        { left: 'Be innovative with rules', right: 'Ideas nobody has tried before are what create new opportunities' },
        { left: 'Manage your time', right: 'Student and business owner are separate roles that must be prioritised in balance' }
      ],
      solution: [
        { lab: 'Do what you love', val: 'Interest is what sustains the hands-on work' },
        { lab: 'Know what you want', val: 'You cannot organise time towards a goal you have not defined' },
        { lab: 'Be innovative', val: 'Thinking outside the box is where opportunities come from' },
        { lab: 'Manage your time', val: 'Running a business while studying is stressful' },
        { lab: 'Answer', val: 'All four rows as above', final: true }
      ],
      why: 'The list of tips is easy to memorise and easy to lose marks on, because an exam asks you to ' +
           'motivate them. The reason attached to each one is the part worth carrying in.'
    }
  ];

  /* ───────── Q1.2 · access to finance ───────── */
  byTopic['i3-finplan'] = [
    {
      id: 'a1-6', type: 'mcq', marks: 3,
      prompt: 'A new venture must decide how much of its funding will come from borrowing and how much from ' +
              'the owners’ own money. Debt is cheaper but must be repaid on schedule whatever happens; ' +
              'owners’ money carries no repayment obligation but costs more in the long run. What is this ' +
              'decision called, and what is it trying to find?',
      options: [
        'Financial structure planning — the optimal mix of funding sources, balancing risk against cost',
        'Financial analysis — monitoring the company’s current financial position and performance',
        'Capital expenditure budgeting — planning big, long-term investments in property and equipment',
        'Liquidity planning — making sure immediate obligations can be met as they fall due'
      ],
      answer: 0,
      solution: [
        { lab: 'Financial structure planning', val: 'Finding the optimal mix of funding sources' },
        { lab: 'What it balances', val: 'Risk against cost' },
        { lab: 'Answer', val: 'Financial structure planning', final: true }
      ],
      why: 'There is no single right mix — that is why it is a planning decision rather than a calculation. ' +
           'Every extra rand of debt lowers the cost and raises the risk at the same time.'
    }
  ];

  /* ───────── Q1.2 · who the funders are · Q1.4.2 · government ───────── */
  byTopic['i1-environ'] = [
    {
      id: 'a1-7', type: 'mcq', marks: 3,
      prompt: 'A new venture approaches commercial banks and development finance institutions for the capital ' +
              'it needs to start trading. In the business environment model, where do these providers of ' +
              'capital sit, and how much control does the venture have over them?',
      options: [
        'The market environment — external stakeholders it can influence but not control',
        'The micro environment — internal to the business and fully controllable',
        'The macro environment — it can neither control nor influence them',
        'They sit outside the business environment model altogether'
      ],
      answer: 0,
      solution: [
        { lab: 'Suppliers', val: 'Providers of raw materials, components, equipment — and capital' },
        { lab: 'Intermediaries', val: 'Include banking intermediaries' },
        { lab: 'The market environment', val: 'External, but influenceable' },
        { lab: 'Answer', val: 'The market environment', final: true }
      ],
      why: 'That word <i>influenceable</i> is the practical point. A funder can be persuaded by a good ' +
           'business plan, which is exactly what nothing in the macro environment can be.'
    },
    {
      id: 'a1-8', type: 'mcq', marks: 3,
      prompt: 'Government announces a national programme offering wage subsidies to businesses that employ ' +
              'people under 35. A small business owner has no say in whether the programme exists, how long ' +
              'it will run, or what conditions come with it. Which environment does this factor belong to, ' +
              'and what is the appropriate management response?',
      options: [
        'The macro environment — it cannot be controlled or influenced, so management can only prepare for it and respond',
        'The market environment — management can influence it by negotiating directly with government',
        'The micro environment — it forms part of the resources the business controls',
        'The macro environment — and management should record it as a weakness of the business'
      ],
      answer: 0,
      solution: [
        { lab: 'Macro environment', val: 'External, uncontrollable — the PESTLE factors' },
        { lab: 'What it yields', val: 'Opportunities and threats, not strengths and weaknesses' },
        { lab: 'Answer', val: 'Macro — prepare for it and respond', final: true }
      ],
      why: 'The last option gets the environment right and the output wrong, which is the commonest way to ' +
           'lose this mark. Strengths and weaknesses come from inside; the macro world can only hand you an ' +
           'opportunity or a threat.'
    },
    {
      id: 'a1-9', type: 'multi', marks: 4,
      prompt: 'Which of these would management classify as <b>macro</b> environment factors — external forces ' +
              'it can neither control nor influence? <b>Select all that apply.</b>',
      options: [
        'A new government programme subsidising the employment of young people',
        'An interest rate increase announced by the Reserve Bank',
        'New environmental legislation restricting emissions',
        'The size of the business’s own staff training budget',
        'A competitor cutting its prices',
        'A supplier changing its delivery schedule'
      ],
      answers: [0, 1, 2],
      solution: [
        { lab: 'Macro', val: 'Government programmes, interest rates, legislation — uncontrollable' },
        { lab: 'Micro', val: 'The training budget, which the business sets itself' },
        { lab: 'Market', val: 'Competitors and suppliers — external, but influenceable' },
        { lab: 'Answer', val: 'The first three', final: true }
      ],
      why: 'The last two are the ones worth arguing over. They are outside the business, which makes them ' +
           'feel macro, but a competitor and a supplier can both be responded to and influenced — so they ' +
           'sit in the market environment.'
    }
  ];

  /* ───────── Q1.3 · attracting and keeping the target group ───────── */
  byTopic['i2-marketing'] = [
    {
      id: 'a1-10', type: 'multi', marks: 4,
      prompt: 'Marketing is defined as "the management tasks and decisions directed at successfully meeting ' +
              'opportunities and threats in a dynamic environment by effectively developing and transferring ' +
              'a need-satisfying market offering to consumers" (Erasmus et al., 2023). Which of these does ' +
              'that definition require of a business? <b>Select all that apply.</b>',
      options: [
        'That it meets the opportunities and threats of a changing environment',
        'That it develops an offering built around a need consumers actually have',
        'That it transfers that offering to consumers, rather than merely designing it',
        'That marketing is treated as a set of management tasks and decisions',
        'That it sells at the lowest price available in the market',
        'That it drives its competitors out of the market'
      ],
      answers: [0, 1, 2, 3],
      solution: [
        { lab: 'Meeting the environment', val: 'Opportunities and threats, and the environment is dynamic' },
        { lab: 'Need-satisfying', val: 'Built around a real consumer need' },
        { lab: 'Transferring', val: 'Getting it to the consumer, not just developing it' },
        { lab: 'Management tasks', val: 'A management process, not an activity bolted on at the end' },
        { lab: 'Answer', val: 'The first four', final: true }
      ],
      why: 'Every phrase in that definition is doing work. "Transferring" is the one most often dropped — a ' +
           'perfectly designed offering that never reaches the consumer has not been marketed.'
    },
    {
      id: 'a1-11', type: 'match', marks: 4,
      prompt: 'A venture aimed at consumers aged 16 to 35 plans the four actions below. Match each one to the ' +
              'element of the marketing mix it belongs to.',
      pairs: [
        { left: 'Building a lighter version of the app so it runs on entry-level phones', right: 'Product' },
        { left: 'Setting a reduced student rate below the standard subscription', right: 'Price' },
        { left: 'Making the service available through campus shops as well as online', right: 'Place' },
        { left: 'Running a campaign on the social platforms this age group actually uses', right: 'Promotion' }
      ],
      solution: [
        { lab: 'Product', val: 'The good or service itself, and its need-satisfying attributes' },
        { lab: 'Price', val: 'The amount charged, reflecting the product’s value' },
        { lab: 'Place', val: 'The locations and methods that make it available' },
        { lab: 'Promotion', val: 'The communication used to inform and persuade' },
        { lab: 'Answer', val: 'All four rows as above', final: true }
      ],
      why: 'Place is the one that catches people out. It is not where the business is — it is how the ' +
           'product reaches the customer, which is why "campus shops as well as online" is a distribution ' +
           'decision rather than a promotional one.'
    }
  ];

  /* ───────── Q1.3 · planning the marketing ───────── */
  byTopic['i3-mktplan'] = [
    {
      id: 'a1-12', type: 'mcq', marks: 3,
      prompt: 'The first decision in planning promotion is the communication objective — what the campaign is ' +
              'actually trying to achieve. What kind of goal should that objective be?',
      options: [
        'A SMART goal — specific, measurable, achievable, relevant and time-bound',
        'A broad statement of intent, so the campaign is not restricted',
        'A financial target only, since promotion is judged on sales',
        'Whatever objective the chosen media channel is best suited to'
      ],
      answer: 0,
      solution: [
        { lab: 'Communication objectives', val: 'The first of the five promotion planning decisions' },
        { lab: 'What form they take', val: 'A SMART goal' },
        { lab: 'Answer', val: 'A SMART goal', final: true }
      ],
      why: 'SMART turns up here rather than only in the planning week, which is the point of it — it is a ' +
           'test any goal at any level has to pass, including "raise awareness among 16 to 35 year olds".'
    },
    {
      id: 'a1-13', type: 'mcq', marks: 2,
      prompt: 'Market research provides the information marketing planning needs in order to make sound ' +
              'decisions. Which forecast is described as a key part of that planning?',
      options: [
        'Forecasting future demand and sales',
        'Forecasting the competitor’s next product launch',
        'Forecasting the exchange rate for the coming year',
        'Forecasting staff turnover in the marketing department'
      ],
      answer: 0,
      solution: [
        { lab: 'Market research', val: 'Provides the information for sound decisions' },
        { lab: 'The key forecast', val: 'Future demand and sales' },
        { lab: 'Answer', val: 'Future demand and sales', final: true }
      ],
      why: 'This forecast is why marketing plans before the other functions: production cannot decide how ' +
           'much to make, and finance cannot decide what to fund, until somebody says how much will sell.'
    }
  ];

  /* ───────── Q2.1 · ethical leadership ───────── */
  byTopic['i1-ethics'] = [
    {
      id: 'a1-14', type: 'mcq', marks: 3,
      prompt: 'An organisation has a published code of ethics, a functioning ethics committee and a ' +
              'whistle-blowing hotline. Its senior managers ignore all three, awarding contracts to people ' +
              'they know personally. Which of the four ways of managing ethics has failed here, and why is ' +
              'it described as the most powerful of the four?',
      options: [
        'Leading by example — it must start with senior management, and the other three carry little weight without it',
        'The code of ethics — a code that has been written down and published cannot be ignored',
        'Ethical structures — an ethics committee removes the need for managers to set an example themselves',
        'Whistle-blowing — it is the most powerful because it operates independently of management'
      ],
      answer: 0,
      solution: [
        { lab: 'The four ways', val: 'Leading by example, a code of ethics, ethical structures, whistle-blowing' },
        { lab: 'The most powerful', val: 'Leading by example — and it must start with senior management' },
        { lab: 'Answer', val: 'Leading by example', final: true }
      ],
      why: 'The other three are all documents and processes, and this organisation has every one of them. ' +
           'That is exactly the scenario the module is warning about: the machinery of ethics with nobody at ' +
           'the top actually using it.'
    }
  ];

  /* ───────── Q2.1 · governance ───────── */
  byTopic['i1-govern'] = [
    {
      id: 'a1-15', type: 'mcq', marks: 3,
      prompt: 'Every manager in an organisation can correctly explain what the right thing to do would be, ' +
              'and each believes they behave decently. The organisation as a whole nevertheless keeps making ' +
              'decisions that damage its stakeholders. What does the module say is missing, and why is ' +
              'knowing right from wrong not enough on its own?',
      options: [
        'Corporate governance — the system of rules, practices and processes by which a company is directed and controlled. Governance is the skill of <i>managing</i> a business so that it behaves ethically',
        'A code of ethics — nothing can be expected of managers until the standards are written down',
        'Nothing is missing — if every manager knows what is right, the organisation will act ethically',
        'Corporate social responsibility — an organisation behaves ethically once it invests in its community'
      ],
      answer: 0,
      solution: [
        { lab: 'Ethics', val: 'Knowing what is right or wrong' },
        { lab: 'Governance', val: 'The system that directs and controls the company so that it acts on it' },
        { lab: 'Answer', val: 'Corporate governance', final: true }
      ],
      why: 'This is the distinction the whole governance topic rests on. Personal ethics is knowledge; ' +
           'governance is the machinery that turns that knowledge into how an organisation actually behaves.'
    },
    {
      id: 'a1-16', type: 'match', marks: 3,
      prompt: 'The King Committee Reports cover three areas. Match each one to how the reports say it is ' +
              'achieved.',
      pairs: [
        { left: 'Ethical leadership', right: 'Through integrity, fairness and accountability' },
        { left: 'Transparency', right: 'Through honest reporting to stakeholders' },
        { left: 'Sustainability', right: 'By considering the impact on the Triple Bottom Line' }
      ],
      solution: [
        { lab: 'Ethical leadership', val: 'Integrity, fairness, accountability' },
        { lab: 'Transparency', val: 'Honest reporting to stakeholders' },
        { lab: 'Sustainability', val: 'People, planet and profit together' },
        { lab: 'Answer', val: 'All three rows as above', final: true }
      ],
      why: 'Naming the three areas earns some of the marks; saying how each is achieved earns the rest. ' +
           'These reports are also why South Africa is described as a world leader in corporate governance.'
    }
  ];

  /* ───────── Q2.2.1 · which level of management ───────── */
  byTopic['i2-levels'] = [
    {
      id: 'a1-17', type: 'mcq', marks: 3,
      prompt: 'A management structure is being described for a government department rather than a company. ' +
              'Which posts are given as the equivalent of top management there, and what does that level do?',
      options: [
        'The Minister and the Director-General — they set the mission, vision and overall goals and develop long-term strategy',
        'The Minister and the Director-General — they supervise frontline employees and allocate the daily tasks',
        'Regional managers and divisional heads — they set the mission, vision and long-term strategy',
        'Supervisors and team leaders — a government department has no equivalent of top management'
      ],
      answer: 0,
      solution: [
        { lab: 'Top management', val: 'Board, CEO, Managing Director — in government, Minister and Director-General' },
        { lab: 'What it does', val: 'Mission, vision, overall goals, long-term strategy, major policy and budgets' },
        { lab: 'Answer', val: 'The first option', final: true }
      ],
      why: 'The second option names the right people and gives them the wrong job. The levels are defined by ' +
           'what the work is and how far ahead it looks, not by the job titles attached to them.'
    },
    {
      id: 'a1-18', type: 'mcq', marks: 3,
      prompt: 'Two organisations of similar size are compared. One has nine layers of management between the ' +
              'chief executive and the frontline; the other has three. What does the module say largely ' +
              'determines how many levels of management an organisation has?',
      options: [
        'Its size, and the span of control — the number of people one manager can effectively oversee',
        'The number of functional areas the organisation operates',
        'Whether the organisation is in the public sector or the private sector',
        'The qualifications held by the members of its top management'
      ],
      answer: 0,
      solution: [
        { lab: 'Determined by', val: 'Organisational size and the span of control' },
        { lab: 'Span of control', val: 'How many people one manager can effectively oversee' },
        { lab: 'Answer', val: 'Size and the span of control', final: true }
      ],
      why: 'The two are linked: for a given number of employees, a narrow span forces more layers and a wide ' +
           'span allows fewer. That single ratio is what produces a tall structure or a flat one.'
    }
  ];

  /* ───────── Q2.2.2 · which manager drives capacity building ───────── */
  byTopic['i2-hrlog'] = [
    {
      id: 'a1-19', type: 'mcq', marks: 3,
      prompt: 'An organisation launches a programme to equip its existing employees with the specific ' +
              'technical and leadership capabilities their jobs now demand, going well beyond basic ' +
              'induction training. Which of the five HRM tasks is this, and who drives it?',
      options: [
        'Developing talent — driven by human resources, as a responsibility shared with the line managers',
        'Finding qualified talent — driven by human resources through recruitment',
        'HR planning — driven by top management alone, since it flows from strategy',
        'Retaining talent — driven by the finance function, through compensation'
      ],
      answer: 0,
      solution: [
        { lab: 'Developing talent', val: 'Task 3 — skills to do the job, including technological and leadership capabilities' },
        { lab: 'Whose job', val: 'HR and line managers share responsibility for managing people' },
        { lab: 'Answer', val: 'Developing talent, driven by HR with the line managers', final: true }
      ],
      why: 'Development is deliberately described as going beyond basic training. And the shared ' +
           'responsibility matters: a training programme HR runs alone, with no line manager behind it, is ' +
           'the kind that gets attended and then ignored.'
    }
  ];

  /* ───────── Q2.2.3 · bureaucratic processes ───────── */
  byTopic['i4-structure'] = [
    {
      id: 'a1-20', type: 'mcq', marks: 3,
      prompt: 'An organisation has many layers of management and a narrow span of control. Decisions are ' +
              'centralised and slow, costs are high because of the managerial salaries involved, and staff ' +
              'have little autonomy. Setting its drawbacks aside, which conditions does this structure suit?',
      options: [
        'Large, complex organisations, inexperienced employees, and a stable environment',
        'Agile organisations, skilled self-motivated professionals, and a dynamic environment',
        'Any organisation, since closer supervision always improves performance',
        'Small organisations that want to reduce the cost of managerial salaries'
      ],
      answer: 0,
      solution: [
        { lab: 'Tall structure', val: 'Many layers, narrow span, centralised, close supervision' },
        { lab: 'Suits', val: 'Large complex organisations, inexperienced employees, stable environments' },
        { lab: 'Its risks', val: 'Bureaucracy, stifled innovation, slow adaptation' },
        { lab: 'Answer', val: 'The first option', final: true }
      ],
      why: 'The second option describes exactly what a flat structure suits, which is the discrimination ' +
           'being tested. Neither shape is better in itself — a tall structure is only bureaucratic when it ' +
           'is used where a flat one belonged.'
    }
  ];

  /* ───────── Q2.2.3 · resource scarcity ───────── */
  byTopic['i1-resources'] = [
    {
      id: 'a1-21', type: 'mcq', marks: 3,
      prompt: 'An organisation has a limited budget, limited skilled staff and limited equipment, and cannot ' +
              'obtain more of any of them in the short term. All four business resources are described as ' +
              'scarce. What does the module say follows from that?',
      options: [
        'It must choose carefully how it combines them',
        'It should acquire as much of every resource as it can afford',
        'Only natural resources are genuinely limited, so the other three can always be replaced',
        'Scarcity applies to small businesses, but not to large organisations or government'
      ],
      answer: 0,
      solution: [
        { lab: 'All four resources', val: 'Natural, human, capital, entrepreneurship — all scarce' },
        { lab: 'What follows', val: 'The business must choose carefully how it combines them' },
        { lab: 'Answer', val: 'It must choose carefully how it combines them', final: true }
      ],
      why: 'Scarcity is what makes management necessary in the first place. If resources were unlimited ' +
           'there would be nothing to allocate and no decisions worth making.'
    }
  ];

  /* ───────── Q2.3 · the roles that face outward ───────── */
  byTopic['i2-roles'] = [
    {
      id: 'a1-22', type: 'multi', marks: 4,
      prompt: 'A manager wants to strengthen the organisation’s relationships with outside businesses and the ' +
              'surrounding community. Which of Mintzberg’s roles are defined in terms of dealing with people ' +
              'or organisations <b>outside</b> the manager’s own organisation? <b>Select all that apply.</b>',
      options: [
        'Liaison — maintaining a network of outside contacts',
        'Spokesperson — transmitting information to outsiders about plans, policies and results',
        'Negotiator — representing the organisation at major negotiations',
        'Disseminator — transmitting information to members of the organisation',
        'Leader — motivating subordinates, staffing and training',
        'Resource allocator — allocating resources and approving significant decisions'
      ],
      answers: [0, 1, 2],
      solution: [
        { lab: 'Liaison', val: 'Outside contacts — can consume up to half a manager’s time' },
        { lab: 'Spokesperson', val: 'Information out, to outsiders' },
        { lab: 'Negotiator', val: 'Represents the organisation externally' },
        { lab: 'The other three', val: 'Disseminator, Leader and Resource allocator all point inward' },
        { lab: 'Answer', val: 'The first three', final: true }
      ],
      why: 'Disseminator and Spokesperson are the pair to keep straight: both move information outward from ' +
           'the manager, but the Disseminator sends it to their own people and the Spokesperson sends it out ' +
           'of the organisation.'
    },
    {
      id: 'a1-23', type: 'match', marks: 4,
      prompt: 'A senior manager spends a week on the four activities below. Match each one to the managerial ' +
              'role it belongs to.',
      pairs: [
        { left: 'Explaining the organisation’s turnaround plan to journalists at a press briefing', right: 'Spokesperson' },
        { left: 'Meeting business forums and community leaders to build a network of contacts', right: 'Liaison' },
        { left: 'Representing the organisation in wage talks with the trade unions', right: 'Negotiator' },
        { left: 'Deciding which of three departments receives the limited capital budget', right: 'Resource allocator' }
      ],
      solution: [
        { lab: 'Spokesperson', val: 'Informational — transmits to outsiders' },
        { lab: 'Liaison', val: 'Interpersonal — maintains a network of outside contacts' },
        { lab: 'Negotiator', val: 'Decisional — represents the organisation at major negotiations' },
        { lab: 'Resource allocator', val: 'Decisional — allocates resources and approves decisions' },
        { lab: 'Answer', val: 'All four rows as above', final: true }
      ],
      why: 'Three of these face outward and one faces inward, and they come from all three categories. That ' +
           'is Mintzberg’s actual finding: a manager moves between roles constantly rather than working ' +
           'through one category at a time.'
    }
  ];

  /* ───────── Q2.4 · the functional areas ───────── */
  byTopic['i2-areas'] = [
    {
      id: 'a1-24', type: 'match', marks: 4,
      prompt: 'An organisation is failing to deliver the services it exists to provide. Match each specific ' +
              'failure to the functional area responsible for putting it right.',
      pairs: [
        { left: 'Collections run late because routes and schedules are badly planned and never checked', right: 'Operations' },
        { left: 'Staff do not have the technical skills to maintain the equipment they are given', right: 'Human resources' },
        { left: 'Contractors are appointed without comparing prices or checking the quality of their work', right: 'Logistics — purchasing and supply' },
        { left: 'The budget is overspent by the third quarter with no record of where the money went', right: 'Finance' }
      ],
      solution: [
        { lab: 'Operations', val: 'Utilising resources to render the service — planning, scheduling, controlling' },
        { lab: 'Human resources', val: 'The right people in the right jobs, with the skills the job needs' },
        { lab: 'Purchasing and supply', val: 'Comparing prices, ensuring quality, managing suppliers' },
        { lab: 'Finance', val: 'Where the money goes, and whether it went where it was budgeted' },
        { lab: 'Answer', val: 'All four rows as above', final: true }
      ],
      why: 'A question that asks which functional areas to fix is really asking you to read a symptom and ' +
           'name the function that owns it. Late delivery, missing skills, bad contracts and missing money ' +
           'are four different failures, not one general one.'
    },
    {
      id: 'a1-25', type: 'mcq', marks: 3,
      prompt: 'An organisation contracts external companies to maintain its roads and streetlights. One of ' +
              'those contractors stops work, and several unrelated services halt with it. Which ' +
              'characteristic of a supply chain does this demonstrate?',
      options: [
        'A supply chain is a network of linked businesses, and one broken link can disrupt the entire chain — which is why supplier relationships matter',
        'A supply chain only fails when its largest supplier fails, so small contractors carry little risk',
        'A supply chain is internal to the organisation, so an external contractor is not part of it',
        'A supply chain failure is a marketing problem, because customers are the ones who notice it'
      ],
      answer: 0,
      solution: [
        { lab: 'Supply chain', val: 'A network of businesses linked through the buying and selling of materials' },
        { lab: 'The risk', val: 'One broken link can disrupt the whole chain, halting production and sales' },
        { lab: 'Why it matters', val: 'It is the reason supplier relationships are managed rather than left to chance' },
        { lab: 'Answer', val: 'The first option', final: true }
      ],
      why: 'The word "network" is doing the work. A chain of businesses is only as strong as its weakest ' +
           'link, and size is not what determines which link that is.'
    }
  ];

  /* ───────── Q2.5 · what a manager brings ───────── */
  byTopic['i2-skills'] = [
    {
      id: 'a1-26', type: 'mcq', marks: 3,
      prompt: 'The module warns that "the skills that make someone excellent in a specialist role are not the ' +
              'skills needed to manage that role". An organisation keeps promoting its very best technicians ' +
              'into management posts, and they keep struggling in them. What mistake is being made?',
      options: [
        'Assuming that being excellent at the work automatically makes someone able to manage the people doing it',
        'Assuming that managers never need any technical knowledge of the work they oversee',
        'Assuming that human skills are only required at the top of an organisation',
        'Assuming that conceptual skills matter more than technical skills at every level'
      ],
      answer: 0,
      solution: [
        { lab: 'Technical skills', val: 'The procedures and knowledge of a specialised field — what made them excellent' },
        { lab: 'What managing adds', val: 'Human skills at every level, and conceptual skills as you climb' },
        { lab: 'Answer', val: 'The first option', final: true }
      ],
      why: 'The second option is the opposite error and also wrong — technical skill is <i>high</i> for lower ' +
           'management, because a supervisor needs it to train staff and solve daily problems. The mistake is ' +
           'assuming technical skill is <i>sufficient</i>, not assuming it is unnecessary.'
    }
  ];

  /* ── merge into the pools the week files already registered ────────────────
     Nothing here defines a topic of its own. If a topic id is ever renamed in
     a week file, the warning below is what stops these questions from silently
     disappearing from the app. */

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
    window.console.warn('Assignment 1 questions have no home topic: ' + wanted.join(', '));
  }
}());
