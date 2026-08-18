/* INBA01-5 — Week 1: The role of business, entrepreneurship, ethics and the
   business environment.

   Built from Abi's own Week 1 notes. Two rules held throughout:

   1. Questions test CONCEPTS, never the teaching devices used to explain them.
      The notes lean on analogies — a braai, a ship, a GPS — and on named
      examples. Knowing that the meat in the braai stood for resources is worth
      nothing in an exam. Where a scenario appears below it is there to be
      CLASSIFIED using a concept, which is a skill, not recalled.

   2. Nothing is filled in from outside the notes. Where a list was only partly
      legible it is not asked as a complete-the-set question. */

window.MODULE_CONTENT = window.MODULE_CONTENT || {};
window.MODULE_CONTENT.inba = window.MODULE_CONTENT.inba || { weeks: [], exams: [] };

window.MODULE_CONTENT.inba.weeks.push({
  id: 'inba-week1',
  number: 1,
  title: 'Business, Entrepreneurship & Ethics',
  emoji: '🏪',
  accent: 2,
  blurb: 'What a business is, who starts one, what it owes everyone else, and the world it sits in.',
  topics: [

  /* ═══════════════════════ WHAT A BUSINESS IS ═══════════════════════ */
  {
    id: 'i1-business',
    title: 'What a Business Is',
    emoji: '🏬',
    summary: 'The four elements present in every business, and why business is called complex.',
    notes: [
      {
        heading: 'The four elements',
        emoji: '4️⃣',
        html:
          '<div class="keybox"><b>Human activities</b> · people applying time, effort and coordination' +
          '<br><b>Production</b> · transforming resources into something people need or want' +
          '<br><b>Exchange</b> · money traded for those goods or services' +
          '<br><b>Profit</b> · the financial reward received</div>' +
          '<p>All four are present whether the business is a spaza shop, a hair salon, a factory or a large ' +
          'international service provider. Profit is the financial reward received — what remains once the ' +
          'costs of producing have been covered.</p>'
      },
      {
        heading: 'Why business is complex',
        emoji: '🌪️',
        html:
          '<p>A business does not operate in isolation. Forces outside it — power supply, civil unrest, ' +
          'pandemics, supply routes — can disrupt production and exchange without anyone inside the business ' +
          'making a single wrong decision.</p>' +
          '<p>Separating what a business <b>controls</b> from what it can only <b>respond to</b> is the subject ' +
          'of the business environment later this week.</p>'
      }
    ],
    questions: [
      {
        id: 'i1b-1', type: 'multi', marks: 3,
        prompt: 'Which of the following are essential elements of a business? <b>Select all that apply.</b>',
        options: [
          'Human activities',
          'Production',
          'Exchange',
          'Profit',
          'Government registration',
          'A physical shopfront'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Human activities', val: 'Time, effort and coordination applied by people' },
          { lab: 'Production', val: 'Transforming resources into goods or services' },
          { lab: 'Exchange', val: 'Money traded for what was produced' },
          { lab: 'Profit', val: 'The financial reward received' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Registration and premises are common to many businesses but are not part of the definition. ' +
             'An informal trader with neither is still carrying out all four elements.'
      },
      {
        id: 'i1b-2', type: 'mcq', marks: 2,
        scenario: 'A customer hands over money for a cupcake at a stall.',
        prompt: 'Which element of business does this describe?',
        options: ['Exchange', 'Production', 'Human activities', 'Profit'],
        answer: 0,
        solution: [
          { lab: 'What happened', val: 'Money was traded for a good' },
          { lab: 'Element', val: 'Exchange' },
          { lab: 'Answer', val: 'Exchange', final: true }
        ],
        why: 'Baking the cupcake was production. Exchange is specifically the transfer of money for the good, ' +
             'and the two happen at different moments even when they happen at the same stall.'
      },
      {
        id: 'i1b-3', type: 'match', marks: 4,
        prompt: 'Match each activity to the element of business it demonstrates.',
        pairs: [
          { left: 'Drivers, marshals and passengers each perform a role', right: 'Human activities' },
          { left: 'People are moved safely from one place to another', right: 'Production' },
          { left: 'A passenger pays a fare for the journey', right: 'Exchange' },
          { left: 'Income remains after fuel and maintenance are paid', right: 'Profit' }
        ],
        solution: [
          { lab: 'Human activities', val: 'The effort and coordination of people' },
          { lab: 'Production', val: 'A service is produced — transportation' },
          { lab: 'Exchange', val: 'A direct trade of money for a service' },
          { lab: 'Profit', val: 'What is left once costs are covered' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'The four elements are just as present when the output is a service rather than a physical good. ' +
             'Nothing is manufactured here, yet production still occurs.'
      },
      {
        id: 'i1b-4', type: 'mcq', marks: 2,
        prompt: 'For a formal business, <b>profit</b> is defined as:',
        options: [
          'The financial reward received',
          'The total money taken from customers',
          'The value of the resources used up',
          'The number of people employed'
        ],
        answer: 0,
        solution: [
          { lab: 'Profit', val: 'The financial reward received' },
          { lab: 'Not', val: 'Total money taken in, which ignores costs entirely' },
          { lab: 'Answer', val: 'The financial reward received', final: true }
        ],
        why: 'The distinction matters: a trader can take a great deal of money and still make no profit if ' +
             'ingredients, transport and other costs consume it.'
      },
      {
        id: 'i1b-5', type: 'multi', marks: 3,
        prompt: 'Which of these disruptions to a business come from <b>outside</b> it? <b>Select all that apply.</b>',
        options: [
          'Loadshedding causing refrigeration failures',
          'Civil unrest damaging supply routes',
          'Deciding which staff member to promote',
          'Choosing the shop layout'
        ],
        answers: [0, 1],
        solution: [
          { lab: 'Loadshedding', val: 'External — the business does not control the power supply' },
          { lab: 'Civil unrest', val: 'External — it damages routes the business depends on' },
          { lab: 'Promotions and layout', val: 'Internal decisions management makes itself' },
          { lab: 'Answer', val: 'The first two', final: true }
        ],
        why: 'This is the internal-external split that the three business environments are built on. ' +
             'The test is whether management could have decided otherwise.'
      }
    ]
  },

  /* ═══════════════════════ TRANSFORMATION ═══════════════════════ */
  {
    id: 'i1-transform',
    title: 'Transformation, Products & Services',
    emoji: '🔄',
    summary: 'Production as transformation, and the seven ways a service differs from a product.',
    notes: [
      {
        heading: 'Production is transformation',
        emoji: '⚗️',
        html:
          '<p>Production means taking what you have and turning it into something people need or want. Inputs ' +
          'become outputs: flour, sugar and butter become bread; bricks, sand, cement and steel become a house.</p>' +
          '<p>Services are transformed too. Loose resources — beds, medicine and medical expertise, or an ' +
          'aeroplane, fuel and crew — are combined into a single service.</p>'
      },
      {
        heading: 'Product against service',
        emoji: '⚖️',
        html:
          '<div class="keybox"><b>Product</b> → <b>Service</b>' +
          '<br>Tangible, can be seen and touched → Intangible, an experience or deed' +
          '<br>Buyer owns the item afterwards → No transfer of ownership' +
          '<br>Produced, stored, sold, consumed later → Produced and consumed simultaneously' +
          '<br>Can be stored → Perishable, cannot be stored' +
          '<br>Typically standardised → Varies from one delivery to the next' +
          '<br>Lower customer involvement → High customer involvement' +
          '<br>Easier to evaluate before purchase → Difficult to evaluate; relies on experience and trust</div>'
      }
    ],
    questions: [
      {
        id: 'i1t-1', type: 'match', marks: 4,
        prompt: 'Match each situation to the characteristic of services it demonstrates.',
        pairs: [
          { left: 'An unsold seat on a departed flight is revenue lost forever', right: 'Perishable, cannot be stored' },
          { left: 'A patient must describe their symptoms for a diagnosis', right: 'High customer involvement' },
          { left: 'The quality of a repair cannot be judged beforehand', right: 'Difficult to evaluate before purchase' },
          { left: 'Attending a concert leaves you owning nothing', right: 'No transfer of ownership' }
        ],
        solution: [
          { lab: 'Perishability', val: 'Unused capacity cannot be kept for tomorrow' },
          { lab: 'Involvement', val: 'The customer supplies input the service cannot run without' },
          { lab: 'Evaluation', val: 'Judgement relies on experience and trust' },
          { lab: 'Ownership', val: 'Nothing changes hands to keep' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'Each characteristic creates a different management problem — perishability drives pricing, ' +
             'involvement drives staffing, and difficulty of evaluation is why reputation carries so much weight.'
      },
      {
        id: 'i1t-2', type: 'mcq', marks: 2,
        prompt: 'A manufactured item is made, stored, then used later; a haircut is produced and consumed at the ' +
                'same moment. Which difference is this?',
        options: [
          'A product can be stored before sale; a service cannot',
          'A product is cheaper to produce than a service',
          'A product requires more customer involvement',
          'A product is harder to evaluate before purchase'
        ],
        answer: 0,
        solution: [
          { lab: 'Product', val: 'Produced, then stored, then sold, then consumed' },
          { lab: 'Service', val: 'Produced and consumed simultaneously' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The last three reverse the real difference. Services are the ones with high customer involvement ' +
             'and the ones that are hard to evaluate in advance.'
      },
      {
        id: 'i1t-3', type: 'multi', marks: 3,
        prompt: 'Which of these describe a <b>service</b> rather than a product? <b>Select all that apply.</b>',
        options: [
          'Intangible — an experience or deed',
          'Perishable and cannot be stored',
          'High customer involvement in production',
          'Ownership transfers to the buyer',
          'Typically standardised and identical each time'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Intangible', val: 'Non-physical' },
          { lab: 'Perishable', val: 'Capacity unused is capacity lost' },
          { lab: 'High involvement', val: 'The customer provides information or materials' },
          { lab: 'The last two', val: 'Both describe products' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'Variability is one of the sharpest differences: every unit of one product model is identical, ' +
             'while the same service delivered twice can differ noticeably.'
      },
      {
        id: 'i1t-4', type: 'mcq', marks: 2,
        prompt: 'What does it mean to say a business <b>transforms</b> resources?',
        options: [
          'It turns inputs into outputs that satisfy a need or want',
          'It sells resources on at a higher price without changing them',
          'It replaces old equipment with new equipment',
          'It converts profits into new investments'
        ],
        answer: 0,
        solution: [
          { lab: 'Transformation', val: 'Taking what you have and turning it into something people need or want' },
          { lab: 'Applies to', val: 'Both physical goods and services' },
          { lab: 'Answer', val: 'It turns inputs into outputs that satisfy a need or want', final: true }
        ],
        why: 'Reselling unchanged goods is trade, not transformation. Production specifically involves the ' +
             'inputs becoming something different.'
      },
      {
        id: 'i1t-5', type: 'multi', marks: 3,
        prompt: 'Which characteristics belong to a <b>product</b>? <b>Select all that apply.</b>',
        options: [
          'Can be stored and sold later',
          'Ownership transfers to the buyer',
          'Perishable and cannot be stored',
          'Difficult to evaluate before purchase'
        ],
        answers: [0, 1],
        solution: [
          { lab: 'Storable', val: 'An unsold item can be sold tomorrow' },
          { lab: 'Ownership transfers', val: 'The buyer owns the item after purchase' },
          { lab: 'The last two', val: 'Both describe services' },
          { lab: 'Answer', val: 'The first two', final: true }
        ],
        why: 'Storability is what makes products forgiving — an unsold item is not lost value, merely value ' +
             'not yet realised.'
      }
    ]
  },

  /* ═══════════════════════ THE FOUR RESOURCES ═══════════════════════ */
  {
    id: 'i1-resources',
    title: 'The Four Resources',
    emoji: '⛏️',
    summary: 'Natural, human, capital and entrepreneurship — what each is and what it earns.',
    notes: [
      {
        heading: 'Four scarce resources',
        emoji: '🧱',
        html:
          '<div class="keybox"><b>Natural resources</b> · raw materials from the earth — the "land" in the ' +
          'economic sense. Agricultural land, space for factories, minerals, forests, water. <b>Finite</b>: ' +
          'more land cannot be created and a mine cannot be refilled.' +
          '<br><br><b>Human resources</b> · people, and the physical and mental effort, skills and knowledge ' +
          'they bring. Paid <b>wages</b> for their labour.' +
          '<br><br><b>Capital resources</b> · man-made tools and machinery used to produce other goods and ' +
          'services. Those who provide capital earn <b>interest or rent</b> for its use.' +
          '<br><br><b>Entrepreneurship</b> · the drive and vision to bring the other three together and take ' +
          'the risk.</div>' +
          '<p>All four are <b>scarce</b>, which is why a business must choose carefully how it combines them.</p>'
      }
    ],
    questions: [
      {
        id: 'i1r-1', type: 'match', marks: 4,
        prompt: 'Match each item to the type of resource it is.',
        pairs: [
          { left: 'Minerals such as gold and platinum', right: 'Natural resources' },
          { left: 'The skills of a nurse or a pilot', right: 'Human resources' },
          { left: 'An oven used in a bakery', right: 'Capital resources' },
          { left: 'The vision to start the business and carry the risk', right: 'Entrepreneurship' }
        ],
        solution: [
          { lab: 'Natural', val: 'Raw materials from the earth' },
          { lab: 'Human', val: 'People and the effort and knowledge they bring' },
          { lab: 'Capital', val: 'Man-made tools used to produce other goods and services' },
          { lab: 'Entrepreneurship', val: 'Combining the rest and carrying the risk' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'The oven is the trap. It is a physical object, but it was manufactured to help produce something ' +
             'else, which makes it capital rather than a natural resource.'
      },
      {
        id: 'i1r-2', type: 'match', marks: 3,
        prompt: 'Match each resource to the return it earns.',
        pairs: [
          { left: 'Human resources', right: 'Wages' },
          { left: 'Capital resources', right: 'Interest or rent' },
          { left: 'Entrepreneurship', right: 'Profit' }
        ],
        solution: [
          { lab: 'Human', val: 'People are paid wages for their labour' },
          { lab: 'Capital', val: 'Investors earn interest or rent for its use' },
          { lab: 'Entrepreneurship', val: 'Profit is the financial reward received' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'Keeping the returns straight is a quick way to keep the resources themselves straight — each ' +
             'one is compensated differently because each contributes differently.'
      },
      {
        id: 'i1r-3', type: 'mcq', marks: 2,
        prompt: 'Why are natural resources described as <b>finite</b>?',
        options: [
          'There is only so much of them — more land cannot be created and a mine cannot be refilled',
          'They are owned by the government',
          'They may only be used once per year',
          'They are the cheapest of the four resources'
        ],
        answer: 0,
        solution: [
          { lab: 'Finite', val: 'Limited in quantity and not replaceable at will' },
          { lab: 'Consequence', val: 'This is what makes resources scarce' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Scarcity is the reason business exists as a discipline at all — unlimited resources would remove ' +
             'the need to choose between uses.'
      },
      {
        id: 'i1r-4', type: 'multi', marks: 3,
        prompt: 'Which of these are <b>capital resources</b>? <b>Select all that apply.</b>',
        options: [
          'A cement mixer on a building site',
          'An x-ray machine in a clinic',
          'The forest a timber company harvests',
          'The builder operating the equipment',
          'Water used in production'
        ],
        answers: [0, 1],
        solution: [
          { lab: 'Cement mixer and x-ray machine', val: 'Man-made tools used to produce other goods and services' },
          { lab: 'Forest and water', val: 'Natural resources' },
          { lab: 'The builder', val: 'A human resource' },
          { lab: 'Answer', val: 'The first two', final: true }
        ],
        why: 'The test is whether it was made by people to help produce something else. That separates a mixer ' +
             'from the sand it mixes.'
      },
      {
        id: 'i1r-5', type: 'mcq', marks: 2,
        prompt: 'Which resource brings the other three together?',
        options: ['Entrepreneurship', 'Capital resources', 'Human resources', 'Natural resources'],
        answer: 0,
        solution: [
          { lab: 'Entrepreneurship', val: 'The drive and vision to combine the rest and take the risk' },
          { lab: 'Answer', val: 'Entrepreneurship', final: true }
        ],
        why: 'Human resources supply effort and skill, but the decision to mobilise land, labour and capital ' +
             'at all — and the risk if it fails — belongs to the entrepreneur.'
      },
      {
        id: 'i1r-6', type: 'mcq', marks: 2,
        prompt: 'What does the term "land" mean in the economic sense?',
        options: [
          'All raw materials from the earth, including minerals, forests and water',
          'Only agricultural land used for farming',
          'Any property a business owns',
          'The site a factory is built on'
        ],
        answer: 0,
        solution: [
          { lab: 'Land, economically', val: 'The whole category of natural resources' },
          { lab: 'Includes', val: 'Farmland, factory space, minerals, forests and water' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The everyday meaning is far narrower than the economic one, which is why the four resources are ' +
             'usually named "natural resources" instead.'
      }
    ]
  },

  /* ═══════════════════════ ENTREPRENEURSHIP ═══════════════════════ */
  {
    id: 'i1-entre',
    title: 'Entrepreneurship',
    emoji: '🚀',
    summary: 'Definitions, the two motivations, the roles played, and the routes into business.',
    notes: [
      {
        heading: 'Definitions',
        emoji: '📖',
        html:
          '<div class="keybox"><b>An entrepreneur</b> is an individual who identifies opportunities, gathers ' +
          'resources, and accepts the risks to create value.' +
          '<br><br><b>Entrepreneurship</b> is the continuous process of building something valuable amidst ' +
          'scarcity and uncertainty.</div>' +
          '<p>Christo Wiese defines it as identifying what the consumer wants and delivering it with the best ' +
          'possible value — shifting the focus from making money to <b>creating value</b>.</p>' +
          '<p>Not every business owner is an entrepreneur. Following an existing model is replication; seeing a ' +
          'gap and building something from scratch is entrepreneurship. The mindset can also exist inside a ' +
          'large company, which is called <b>corporate entrepreneurship</b>.</p>'
      },
      {
        heading: 'Motivations, roles and routes',
        emoji: '🛣️',
        html:
          '<div class="keybox"><b>Necessity entrepreneur</b> · starts a business because they feel they have no ' +
          'other good option. A survivalist motivation — not by choice.' +
          '<br><b>Opportunity entrepreneur</b> · starts because they see a chance to do something new or ' +
          'better. By choice, to fill a market gap.</div>' +
          '<p>Roles in the economy: <b>job creators</b>, <b>drivers of innovation and productivity</b>, and ' +
          '<b>wealth creators</b>.</p>' +
          '<div class="keybox"><b>Routes into business</b> · start from scratch · buy an existing business ' +
          '(customers and systems exist, but so do its problems) · buy a franchise (a proven model, but the ' +
          'franchisor sets the rules) · become an <b>intrapreneur</b> inside a large company</div>'
      }
    ],
    questions: [
      {
        id: 'i1e-1', type: 'mcq', marks: 2,
        scenario: 'A person loses their job, cannot find another, and starts a small business to pay the bills.',
        prompt: 'Which kind of entrepreneur is this?',
        options: [
          'A necessity entrepreneur',
          'An opportunity entrepreneur',
          'An intrapreneur',
          'A franchisee'
        ],
        answer: 0,
        solution: [
          { lab: 'Motivation', val: 'No other good options — a survivalist motivation' },
          { lab: 'Not by choice', val: 'Forced into it rather than pursuing a gap' },
          { lab: 'Answer', val: 'A necessity entrepreneur', final: true }
        ],
        why: 'The classification depends entirely on why they started, not on how well the business does ' +
             'afterwards. Either kind can succeed.'
      },
      {
        id: 'i1e-2', type: 'multi', marks: 3,
        prompt: 'Which of these are roles entrepreneurs play in the economy? <b>Select all that apply.</b>',
        options: [
          'Job creators',
          'Drivers of innovation and productivity',
          'Wealth creators',
          'Tax collectors',
          'Regulators of competition'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Job creators', val: 'Growing businesses hire people' },
          { lab: 'Innovation and productivity', val: 'New entrants force competitors to improve' },
          { lab: 'Wealth creators', val: 'For themselves, employees and communities' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'Collecting tax and regulating competition are government functions. Entrepreneurs are subject to ' +
             'both rather than performing either.'
      },
      {
        id: 'i1e-3', type: 'mcq', marks: 2,
        prompt: 'An <b>entrepreneur</b> is defined as an individual who:',
        options: [
          'Identifies opportunities, gathers resources, and accepts the risks to create value',
          'Owns any business, regardless of how it was started',
          'Invests money in businesses run by other people',
          'Manages the day-to-day operations of a large company'
        ],
        answer: 0,
        solution: [
          { lab: 'Three parts', val: 'Identifies opportunities · gathers resources · accepts risk' },
          { lab: 'Purpose', val: 'To create value' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Accepting the risk is the part most often left out, and it is what separates an entrepreneur ' +
             'from an investor or a salaried manager.'
      },
      {
        id: 'i1e-4', type: 'mcq', marks: 2,
        prompt: 'Christo Wiese defines entrepreneurship as:',
        options: [
          'Identifying what the consumer wants and delivering it with the best possible value',
          'Taking the largest possible risk for the largest possible profit',
          'Setting up a business and hoping for profit',
          'Employing as many people as the business can afford'
        ],
        answer: 0,
        solution: [
          { lab: 'The focus', val: 'What the consumer wants, at the best possible value' },
          { lab: 'The shift', val: 'From making money to creating value' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The third option is the common media description. It is not wrong, but it describes the risk ' +
             'and reward without mentioning the value created, which is the point being made.'
      },
      {
        id: 'i1e-5', type: 'match', marks: 3,
        prompt: 'Match each route into business to its description.',
        pairs: [
          { left: 'Buy an existing business', right: 'Customers, brand and systems already exist, but so may its problems' },
          { left: 'Buy a franchise', right: 'A proven business model, but the franchisor sets the rules' },
          { left: 'Become an intrapreneur', right: 'Act entrepreneurially inside a large company, using its resources' }
        ],
        solution: [
          { lab: 'Existing business', val: 'Established, with its problems included' },
          { lab: 'Franchise', val: 'Proven model, less freedom' },
          { lab: 'Intrapreneur', val: 'Innovating within someone else’s company' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'This is why a franchisee may not be an entrepreneur in the true economic sense — the model and ' +
             'the rules were created by somebody else.'
      },
      {
        id: 'i1e-6', type: 'mcq', marks: 2,
        prompt: 'What is <b>corporate entrepreneurship</b>?',
        options: [
          'An entrepreneurial mindset applied inside a large organisation',
          'A company buying out its smaller competitors',
          'A business owned jointly by several entrepreneurs',
          'The legal registration of a new company'
        ],
        answer: 0,
        solution: [
          { lab: 'Corporate entrepreneurship', val: 'The entrepreneurial mindset within a big corporation' },
          { lab: 'Related term', val: 'Someone doing this is an intrapreneur' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Entrepreneurship is a way of working, not only a way of owning. It can happen in social projects ' +
             'and inside established companies as well as in start-ups.'
      }
    ]
  },

  /* ═══════════════════════ THE ENTREPRENEURIAL PROCESS ═══════════════════════ */
  {
    id: 'i1-process',
    title: 'The Entrepreneurial Process',
    emoji: '🗺️',
    summary: 'Seven steps, seven skill areas, what makes an opportunity, and what makes it hard.',
    notes: [
      {
        heading: 'The seven steps',
        emoji: '🪜',
        html:
          '<div class="keybox"><b>1.</b> Decision to become an entrepreneur — introspection about strengths, ' +
          'risk tolerance and perseverance' +
          '<br><b>2.</b> Determining your entrepreneurial skills' +
          '<br><b>3.</b> Resource mobilisation — financial, human and physical' +
          '<br><b>4.</b> Opportunity recognition' +
          '<br><b>5.</b> Feasibility analysis' +
          '<br><b>6.</b> The business plan' +
          '<br><b>7.</b> Launch and management</div>' +
          '<p>A <b>feasibility study</b> is "the collection of data that helps forecast whether an idea, ' +
          'opportunity or venture will survive and may result in a decision to move forward, or to abandon the ' +
          'idea". It researches <b>the market</b>, <b>the industry</b> and <b>the finances</b>.</p>' +
          '<p>A good <b>opportunity</b> must solve a real customer problem, be scalable, have the right timing, ' +
          'and be potentially rewarding.</p>'
      },
      {
        heading: 'Skills and challenges',
        emoji: '🧰',
        html:
          '<div class="keybox"><b>The seven skill areas</b> · Strategy · Planning · Communication · Marketing ' +
          '· Financial · Project management · Human relations</div>' +
          '<div class="keybox"><b>Challenges facing new entrepreneurs</b> · abandoning another career · ' +
          'choosing the right business · financing · finding customers · teambuilding · being a visionary · ' +
          'dealing with the unknown</div>' +
          '<p>Dealing with the unknown is described as the most challenging part of emerging as a new ' +
          'entrepreneur: how long the business will last, how profitable it will be, and whether it can provide ' +
          'a steady income all remain unanswered.</p>'
      }
    ],
    questions: [
      {
        id: 'i1p-1', type: 'mcq', marks: 2,
        prompt: 'What is the <b>first</b> step of the entrepreneurial process?',
        options: [
          'The decision to become an entrepreneur',
          'Opportunity recognition',
          'Writing the business plan',
          'Resource mobilisation'
        ],
        answer: 0,
        solution: [
          { lab: 'Step 1', val: 'Decision to become an entrepreneur' },
          { lab: 'What it involves', val: 'Introspection about strengths, risk tolerance and perseverance' },
          { lab: 'Answer', val: 'The decision to become an entrepreneur', final: true }
        ],
        why: 'The idea comes later than most people expect. The process begins with whether you are suited to ' +
             'this at all, not with what you will sell.'
      },
      {
        id: 'i1p-2', type: 'mcq', marks: 3,
        prompt: 'At which step is an idea verified as viable, before significant money is invested?',
        options: [
          'Step 5 — feasibility analysis',
          'Step 2 — determining entrepreneurial skills',
          'Step 6 — the business plan',
          'Step 7 — launch and management'
        ],
        answer: 0,
        solution: [
          { lab: 'Feasibility analysis', val: 'Researching the market, the industry and the finances' },
          { lab: 'Its outcome', val: 'A decision to move forward, or to abandon the idea' },
          { lab: 'Answer', val: 'Step 5', final: true }
        ],
        why: 'It deliberately precedes the business plan. There is no point writing a detailed plan for a ' +
             'venture the research says will not survive.'
      },
      {
        id: 'i1p-3', type: 'multi', marks: 3,
        prompt: 'Which tests must a good <b>opportunity</b> meet? <b>Select all that apply.</b>',
        options: [
          'Solve a real customer problem',
          'Be scalable and grow with you',
          'Have the right timing',
          'Be potentially rewarding',
          'Require no financial investment'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Real problem', val: 'Otherwise there is no customer' },
          { lab: 'Scalable', val: 'It can grow' },
          { lab: 'Timing', val: 'A window of opportunity is open' },
          { lab: 'Rewarding', val: 'Worth doing for you specifically' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'A good idea is not the same as a good opportunity. These four tests are exactly what separates ' +
             'the two.'
      },
      {
        id: 'i1p-4', type: 'match', marks: 4,
        prompt: 'Match each entrepreneurial skill area to what it covers.',
        pairs: [
          { left: 'Strategy skills', right: 'How the business fits the market and how it will compete' },
          { left: 'Marketing skills', right: 'Who the ideal customer is, what need is satisfied, at what price' },
          { left: 'Financial skills', right: 'Tracking expenses, cash flow, and whether an investment is worth it' },
          { left: 'Human relations skills', right: 'Leading, motivating and dealing with people' }
        ],
        solution: [
          { lab: 'Strategy', val: 'Market position and how you compete' },
          { lab: 'Marketing', val: 'Customer, need and price' },
          { lab: 'Financial', val: 'Expenses, cash flow and investment decisions' },
          { lab: 'Human relations', val: 'Leading and motivating people' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'Strategy and planning are the pair most easily confused: strategy is the map, planning is the ' +
             'itinerary drawn from it.'
      },
      {
        id: 'i1p-5', type: 'multi', marks: 3,
        prompt: 'Which resources are gathered at the <b>resource mobilisation</b> step? <b>Select all that apply.</b>',
        options: [
          'Financial — savings, loans or investors',
          'Human — co-founders and employees with complementary skills',
          'Physical — equipment and spaces, including online',
          'Political — contacts in government'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Financial', val: 'Savings, loans or investors' },
          { lab: 'Human', val: 'People whose skills complement your own' },
          { lab: 'Physical', val: 'Equipment and spaces, including online' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'The word "complementary" carries weight — the advice is to gather the skills you lack, not more ' +
             'of the ones you already have.'
      },
      {
        id: 'i1p-6', type: 'multi', marks: 3,
        prompt: 'Which of these are listed as challenges facing new entrepreneurs? <b>Select all that apply.</b>',
        options: [
          'Abandoning another career',
          'Financing the business',
          'Finding customers',
          'Dealing with the unknown',
          'Paying company tax',
          'Choosing an accounting system'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Abandoning a career', val: 'Walking away from a secure job for something unpredictable' },
          { lab: 'Financing', val: 'Borrowing, own funds or investors' },
          { lab: 'Finding customers', val: 'Requires understanding the target market' },
          { lab: 'Dealing with the unknown', val: 'Described as the most challenging part of all' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'The others listed are choosing the right business, teambuilding and being a visionary — seven ' +
             'challenges in total, none of which are routine administration.'
      },
      {
        id: 'i1p-7', type: 'mcq', marks: 2,
        prompt: 'What does a <b>feasibility study</b> research?',
        options: [
          'The market, the industry, and the finances',
          'Only the expected profit',
          'The personality of the entrepreneur',
          'Competitors’ business plans'
        ],
        answer: 0,
        solution: [
          { lab: 'The market', val: 'Who the customers are, and whether demand exists' },
          { lab: 'The industry', val: 'Whether it is growing or declining' },
          { lab: 'The finances', val: 'Costs, and whether money can be made' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The entrepreneur’s own personality was examined at step 1. By step 5 the question has changed ' +
             'from "am I suited to this" to "will this idea survive".'
      }
    ]
  },

  /* ═══════════════════════ THE BUSINESS PLAN ═══════════════════════ */
  {
    id: 'i1-plan',
    title: 'The Business Plan',
    emoji: '📑',
    summary: 'The three core sections, and the seven components inside them.',
    notes: [
      {
        heading: 'What it is for',
        emoji: '🧭',
        html:
          '<p>The business plan is the detailed blueprint used to secure funding from banks, convince ' +
          'investors, attract partners, and guide the first few years of trading. It is step 6 of the ' +
          'entrepreneurial process, written only once feasibility has been established.</p>' +
          '<div class="keybox"><b>Three core sections</b>' +
          '<br><b>The business concept</b> · what the business is about' +
          '<br><b>The marketplace</b> · who the customers and competitors are' +
          '<br><b>The financials</b> · how money will be made and managed</div>'
      },
      {
        heading: 'The components',
        emoji: '📋',
        html:
          '<div class="keybox"><b>1. Executive summary</b> · the "elevator pitch" — a summary of the entire plan' +
          '<br><b>2. General company description</b> · what the business does, its mission, the problem it solves' +
          '<br><b>3. Products and services plan</b> · what makes the offering special' +
          '<br><b>4. Marketing plan</b> · target market, how to reach them, pricing and credit policies' +
          '<br><b>5. Management plan</b> · the experience and skills of the team; advisors and investors' +
          '<br><b>6. Operating plan</b> · premises, equipment, quality, suppliers' +
          '<br><b>7. Financial plan</b> · revenue and expense projections for three years, startup costs, ' +
          'sources of funding</div>'
      }
    ],
    questions: [
      {
        id: 'i1pl-1', type: 'multi', marks: 3,
        prompt: 'What are the three core sections shared by every business plan? <b>Select all that apply.</b>',
        options: [
          'The business concept',
          'The marketplace',
          'The financials',
          'The staff handbook',
          'The tax return'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'The business concept', val: 'What the business is about' },
          { lab: 'The marketplace', val: 'Customers and competitors' },
          { lab: 'The financials', val: 'How money will be made and managed' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'Every component of a plan falls under one of these three headings, which is a useful way to ' +
             'check that nothing important has been left out.'
      },
      {
        id: 'i1pl-2', type: 'mcq', marks: 2,
        prompt: 'Which section of a business plan is described as the "elevator pitch"?',
        options: [
          'The executive summary',
          'The general company description',
          'The marketing plan',
          'The financial plan'
        ],
        answer: 0,
        solution: [
          { lab: 'Executive summary', val: 'A summary of the entire plan' },
          { lab: 'Its nickname', val: 'The elevator pitch' },
          { lab: 'Answer', val: 'The executive summary', final: true }
        ],
        why: 'It comes first in the document but summarises everything after it, which is why it is usually ' +
             'the last part actually written.'
      },
      {
        id: 'i1pl-3', type: 'match', marks: 4,
        prompt: 'Match each section of a business plan to what it contains.',
        pairs: [
          { left: 'Marketing plan', right: 'Target market, how to reach them, pricing and credit policies' },
          { left: 'Management plan', right: 'The experience and skills of the team, and its advisors' },
          { left: 'Operating plan', right: 'Premises, equipment, quality control and suppliers' },
          { left: 'Financial plan', right: 'Revenue and expense projections, startup costs and funding sources' }
        ],
        solution: [
          { lab: 'Marketing', val: 'Attracting and keeping customers' },
          { lab: 'Management', val: 'Who is behind the business — this builds credibility' },
          { lab: 'Operating', val: 'The daily nuts and bolts' },
          { lab: 'Financial', val: 'Three years of projections plus startup costs' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'The management plan is the one people underestimate. Investors are backing the team as much as ' +
             'the idea, which is why it exists as its own section.'
      },
      {
        id: 'i1pl-4', type: 'mcq', marks: 2,
        prompt: 'At which step of the entrepreneurial process is the business plan written?',
        options: ['Step 6', 'Step 1', 'Step 3', 'Step 7'],
        answer: 0,
        solution: [
          { lab: 'Step 5', val: 'Feasibility analysis comes first' },
          { lab: 'Step 6', val: 'The business plan' },
          { lab: 'Step 7', val: 'Launch and management follows' },
          { lab: 'Answer', val: 'Step 6', final: true }
        ],
        why: 'It sits between proving the idea can work and actually launching. Writing it earlier would mean ' +
             'planning in detail for something not yet shown to be viable.'
      },
      {
        id: 'i1pl-5', type: 'multi', marks: 3,
        prompt: 'What is a business plan used for? <b>Select all that apply.</b>',
        options: [
          'Securing funding from banks',
          'Convincing investors',
          'Guiding the first few years of the business',
          'Registering the business with government'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Funding', val: 'Banks and investors need to see the plan' },
          { lab: 'Attracting partners', val: 'It builds credibility' },
          { lab: 'Guidance', val: 'It directs the first few years of trading' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'Registration is a legal step handled separately. The plan is a persuasion and navigation ' +
             'document, not an official filing.'
      }
    ]
  },

  /* ═══════════════════════ ETHICS ═══════════════════════ */
  {
    id: 'i1-ethics',
    title: 'Business Ethics',
    emoji: '⚖️',
    summary: 'The moral compass, the law as a floor, and how organisations manage both.',
    notes: [
      {
        heading: 'Ethics and the law',
        emoji: '🧭',
        html:
          '<p>Ethics is "the code of moral principles and values that directs the behaviour of an individual or ' +
          'a group in terms of what is right or wrong" (Brevis &amp; Vrba, 2014). Business ethics deals with ' +
          'difficult decisions about right and wrong from a moral or community point of view.</p>' +
          '<div class="keybox"><b>The law</b> is the minimum standard of behaviour required by government — the ' +
          'line you cannot cross without penalty.<br><b>Ethics</b> is a higher standard: doing the right thing, ' +
          'not merely the legal thing.</div>' +
          '<p><b>Gift or bribe?</b> A gift is a token of appreciation given <b>after</b> a deal, with no strings ' +
          'attached. A bribe is an incentive given <b>before</b> a decision, expecting a favour in return. The ' +
          'difference is the intention.</p>'
      },
      {
        heading: 'Deciding and managing',
        emoji: '🏛️',
        html:
          '<div class="keybox"><b>Three approaches to an ethical decision</b>' +
          '<br><b>Utilitarian</b> · which option creates the greatest good for the greatest number? Maximise ' +
          'benefits, minimise harm. Risk: it can justify sacrificing a minority.' +
          '<br><b>Human rights</b> · does this respect everyone’s fundamental rights? Protects individual ' +
          'rights and dignity.' +
          '<br><b>Justice</b> · is this fair to everyone affected? Ensures equitable distribution of benefits ' +
          'and burdens.</div>' +
          '<div class="keybox"><b>Four ways organisations manage ethics</b>' +
          '<br><b>Leading by example</b> · the most powerful tool; it must start with senior management' +
          '<br><b>A code of ethics</b> · a formal document of values and expected standards' +
          '<br><b>Ethical structures</b> · ethics committees, training programmes, an ethics ombudsman' +
          '<br><b>Whistle-blowing</b> · reporting illegal or unethical behaviour; only works if whistle-blowers ' +
          'are protected</div>'
      }
    ],
    questions: [
      {
        id: 'i1x-1', type: 'mcq', marks: 2,
        prompt: 'The law is best described as:',
        options: [
          'The minimum standard of behaviour required by government',
          'The same thing as ethics',
          'A higher standard than ethics',
          'A set of guidelines companies may ignore'
        ],
        answer: 0,
        solution: [
          { lab: 'The law', val: 'The minimum standard — the line you cannot cross without penalty' },
          { lab: 'Ethics', val: 'A higher standard' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Paying the legal minimum wage while making large profits is the standard illustration: lawful, ' +
             'and still open to an ethical objection.'
      },
      {
        id: 'i1x-2', type: 'mcq', marks: 3,
        scenario: 'A contractor offers a payment to a tender officer before the winning bid is chosen, ' +
                  'expecting favourable treatment.',
        prompt: 'This is:',
        options: [
          'A bribe, because it precedes the decision and expects a favour',
          'A gift, because money changed hands voluntarily',
          'A gift, because it was offered rather than demanded',
          'Neither, provided it is declared afterwards'
        ],
        answer: 0,
        solution: [
          { lab: 'Timing', val: 'Given before a decision is made' },
          { lab: 'Intention', val: 'Expecting a favour or preferential treatment' },
          { lab: 'Answer', val: 'A bribe', final: true }
        ],
        why: 'Timing is the clearest signal. A gift follows a completed deal and carries no expectation; ' +
             'anything given beforehand to influence an outcome is a bribe.'
      },
      {
        id: 'i1x-3', type: 'match', marks: 3,
        prompt: 'Match each approach to ethical decision-making to its core question.',
        pairs: [
          { left: 'Utilitarian approach', right: 'Which option creates the greatest good for the greatest number?' },
          { left: 'Human rights approach', right: 'Does this decision respect everyone’s fundamental rights?' },
          { left: 'Justice approach', right: 'Is this decision fair to everyone affected?' }
        ],
        solution: [
          { lab: 'Utilitarian', val: 'Maximise overall benefit, minimise overall harm' },
          { lab: 'Human rights', val: 'Protect individual rights and dignity' },
          { lab: 'Justice', val: 'Equitable distribution of benefits and burdens' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The weakness of the utilitarian approach is exactly what the other two guard against: it can ' +
             'justify sacrificing the rights of a minority for the benefit of the majority.'
      },
      {
        id: 'i1x-4', type: 'multi', marks: 3,
        prompt: 'Which of these are ways organisations ensure ethical decisions are made? <b>Select all that apply.</b>',
        options: [
          'Leading by example',
          'A code of ethics',
          'Ethical structures',
          'Whistle-blowing',
          'Raising prices'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Leading by example', val: 'The most powerful tool; starts with senior management' },
          { lab: 'Code of ethics', val: 'A formal statement of values and expected behaviour' },
          { lab: 'Ethical structures', val: 'Committees, training, an ombudsman' },
          { lab: 'Whistle-blowing', val: 'Reporting wrongdoing' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Leading by example is singled out as the strongest: if staff see leaders cutting corners, the ' +
             'written policy stops mattering.'
      },
      {
        id: 'i1x-5', type: 'multi', marks: 3,
        prompt: 'Which of these are examples of <b>ethical structures</b>? <b>Select all that apply.</b>',
        options: [
          'Ethics committees that review ethical decisions',
          'Ethics training programmes',
          'An ethics ombudsman employees can consult confidentially',
          'An annual profit forecast'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Committees', val: 'Review ethical decisions' },
          { lab: 'Training', val: 'Help employees recognise and resolve ethical issues' },
          { lab: 'Ombudsman', val: 'A confidential, neutral person to consult without fear of retaliation' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'All three are formal systems rather than intentions. That is what distinguishes a structure from ' +
             'a value — it gives someone a route to take when something is wrong.'
      },
      {
        id: 'i1x-6', type: 'mcq', marks: 2,
        prompt: 'Whistle-blowing only functions as a check on misconduct when:',
        options: [
          'Whistle-blowers are protected from victimisation, bullying or losing their jobs',
          'The report is made anonymously',
          'The company is listed on the stock exchange',
          'The wrongdoing exceeds a set financial value'
        ],
        answer: 0,
        solution: [
          { lab: 'The condition', val: 'Protection from victimisation' },
          { lab: 'Without it', val: 'Nobody speaks up, and the mechanism is worthless' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The protection is part of the definition rather than an optional extra, because the entire ' +
             'mechanism depends on people being willing to use it.'
      },
      {
        id: 'i1x-7', type: 'mcq', marks: 2,
        prompt: 'What distinguishes a gift from a bribe?',
        options: [
          'The intention behind it, and whether it comes before or after a decision',
          'The monetary value involved',
          'Whether it is given in cash or in kind',
          'Whether the recipient reports it'
        ],
        answer: 0,
        solution: [
          { lab: 'A gift', val: 'A token of appreciation after a deal, with no strings attached' },
          { lab: 'A bribe', val: 'An incentive before a decision, expecting a favour' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Value is not the test. A small payment made to influence a pending decision is still a bribe, ' +
             'and an expensive gift after the fact may not be.'
      }
    ]
  },

  /* ═══════════════════════ CORPORATE GOVERNANCE ═══════════════════════ */
  {
    id: 'i1-govern',
    title: 'Corporate Governance',
    emoji: '🏛️',
    summary: 'Who directs and controls a company, and the rules that keep power balanced.',
    notes: [
      {
        heading: 'What governance is',
        emoji: '📜',
        html:
          '<p>Corporate governance is <b>"the system of rules, practices, and processes by which a company is ' +
          'directed and controlled"</b> (Erasmus et al., 2013). It is about ethical and effective leadership so ' +
          'the company thrives long-term for the benefit of all its stakeholders.</p>' +
          '<p>Knowing how to act ethically is not enough on its own — governance is the skill of <i>managing</i> ' +
          'a business so that it behaves ethically.</p>'
      },
      {
        heading: 'The board, and the King Code',
        emoji: '👥',
        html:
          '<p>Governance is the responsibility of the <b>Board of Directors</b> — a group elected to represent ' +
          'the company’s shareholders and oversee its activities.</p>' +
          '<div class="keybox"><b>Executive directors</b> · full-time employees of the company, part of the ' +
          'management team' +
          '<br><b>Non-executive directors</b> · independent outsiders who provide objectivity and monitor the ' +
          'performance of the management team</div>' +
          '<p>A rule of good governance is that <b>the Chairman of the Board and the CEO should be two ' +
          'different people</b>. The Chairman leads the board and sets its agenda; the CEO implements the ' +
          'board’s strategy. This maintains a balance of power.</p>' +
          '<p>South Africa’s <b>King Code</b> is the guide to ethical business behaviour. Originally intended ' +
          'for JSE-listed companies, <b>King V now applies to all organisations</b>, including government ' +
          'entities and non-profits.</p>'
      }
    ],
    questions: [
      {
        id: 'i1g-1', type: 'mcq', marks: 2,
        prompt: 'Corporate governance is defined as:',
        options: [
          'The system of rules, practices and processes by which a company is directed and controlled',
          'The code of moral principles guiding an individual’s behaviour',
          'A company’s programme of donations to community causes',
          'The legal minimum standard of behaviour required by government'
        ],
        answer: 0,
        solution: [
          { lab: 'Governance', val: 'Rules, practices and processes for directing and controlling a company' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The second option defines ethics and the third describes corporate social investment. Governance ' +
             'is specifically about how the company is steered and held to account.'
      },
      {
        id: 'i1g-2', type: 'mcq', marks: 2,
        prompt: 'Whose responsibility is corporate governance?',
        options: [
          'The Board of Directors',
          'The human resources department',
          'The shareholders directly',
          'The company’s auditors'
        ],
        answer: 0,
        solution: [
          { lab: 'The board', val: 'Elected to represent shareholders and oversee the company’s activities' },
          { lab: 'Answer', val: 'The Board of Directors', final: true }
        ],
        why: 'Shareholders elect the board rather than governing directly. The board acts as their ' +
             'representatives — the company’s guardians.'
      },
      {
        id: 'i1g-3', type: 'match', marks: 4,
        prompt: 'Match each role on or around the board to its description.',
        pairs: [
          { left: 'Executive directors', right: 'Full-time employees of the company and part of its management team' },
          { left: 'Non-executive directors', right: 'Independent outsiders who provide objectivity and monitor management' },
          { left: 'Chairman of the Board', right: 'Leads the board and sets its agenda' },
          { left: 'Chief Executive Officer', right: 'Implements the board’s strategy' }
        ],
        solution: [
          { lab: 'Executive', val: 'Inside the business day to day' },
          { lab: 'Non-executive', val: 'Independent, and there to watch the management team' },
          { lab: 'Chairman', val: 'Runs the board itself' },
          { lab: 'CEO', val: 'Runs the company, carrying out what the board decided' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'A board made only of executives would be monitoring itself, which is why independent outsiders ' +
             'are required for the arrangement to mean anything.'
      },
      {
        id: 'i1g-4', type: 'mcq', marks: 3,
        prompt: 'Why should the Chairman of the Board and the CEO be two different people?',
        options: [
          'To maintain a balance of power between setting strategy and implementing it',
          'Because the workload is too great for one person',
          'Because company law forbids one person holding both',
          'To reduce the total salary paid to executives'
        ],
        answer: 0,
        solution: [
          { lab: 'The Chairman', val: 'Leads the board and sets its agenda' },
          { lab: 'The CEO', val: 'Implements the board’s strategy' },
          { lab: 'Answer', val: 'To maintain a balance of power', final: true }
        ],
        why: 'If one person both set the strategy and judged its execution, the board would have no ' +
             'independent check on the person running the company.'
      },
      {
        id: 'i1g-5', type: 'mcq', marks: 2,
        prompt: 'Which statement about the King Code is correct?',
        options: [
          'King V applies to all organisations, including government entities and non-profits',
          'It applies only to companies listed on the JSE',
          'It applies only to private companies',
          'It has no relevance outside the financial sector'
        ],
        answer: 0,
        solution: [
          { lab: 'Originally', val: 'Intended for JSE-listed companies' },
          { lab: 'King V', val: 'Now applies to all organisations' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Its core message is good corporate governance — running an organisation responsibly, ' +
             'transparently and with accountability, whatever kind of organisation it is.'
      }
    ]
  },

  /* ═══════════════════════ CSR ═══════════════════════ */
  {
    id: 'i1-csr',
    title: 'Corporate Social Responsibility',
    emoji: '🤝',
    summary: 'The four pillars, the four drivers, and how CSR, citizenship and CSI differ.',
    notes: [
      {
        heading: 'The four pillars',
        emoji: '🏛️',
        html:
          '<p>CSR concerns how a business meets its needs without harming society or the environment — and ' +
          'ideally improves both. Social responsibility covers a responsible and safe workplace, housing, ' +
          'health, community involvement, environmental awareness and empowerment.</p>' +
          '<div class="keybox"><b>Environmental</b> · how do we protect our planet? Pollution, water and ' +
          'electricity, sustainable materials, carbon.' +
          '<br><b>Ethical</b> · are we treating everyone fairly? Fair wages, honesty with customers, dealing ' +
          'ethically with suppliers.' +
          '<br><b>Philanthropic</b> · how are we making our community better? Donations, schools, volunteering, ' +
          'foundations.' +
          '<br><b>Economic</b> · is profit our only goal? Decisions with positive social and environmental ' +
          'impact even when they do not maximise short-term profit.</div>'
      },
      {
        heading: 'Drivers, and three related terms',
        emoji: '⚙️',
        html:
          '<div class="keybox"><b>Four drivers of CSR</b>' +
          '<br><b>Social</b> · reputation; consumers, employees and investors choose on character' +
          '<br><b>Governmental</b> · labour laws and environmental regulation, plus incentives and subsidies' +
          '<br><b>Market</b> · CSR as an investment — cost reduction and revenue generation' +
          '<br><b>Ethical</b> · doing it because it is right</div>' +
          '<p>Governmental drivers distinguish the <b>letter of the law</b> — the minimum needed to avoid a ' +
          'penalty — from the <b>spirit of the law</b>, embracing the intention behind the regulation.</p>' +
          '<div class="keybox"><b>CSR</b> · the overarching strategy aligning operations with society’s wellbeing' +
          '<br><b>Corporate citizenship</b> · seeing the company as a member of the community, with rights and ' +
          'responsibilities' +
          '<br><b>Corporate social investment (CSI)</b> · the tangible plan of specific programmes invested in</div>'
      }
    ],
    questions: [
      {
        id: 'i1c-1', type: 'match', marks: 4,
        prompt: 'Match each pillar of CSR to its core question.',
        pairs: [
          { left: 'Environmental responsibility', right: 'How do we protect our planet?' },
          { left: 'Ethical responsibility', right: 'Are we treating everyone fairly?' },
          { left: 'Philanthropic responsibility', right: 'How are we actively making our community better?' },
          { left: 'Economic responsibility', right: 'Is profit our only goal?' }
        ],
        solution: [
          { lab: 'Environmental', val: 'Pollution, resources, sustainable materials, carbon' },
          { lab: 'Ethical', val: 'Fair wages, honesty, dealing ethically with suppliers' },
          { lab: 'Philanthropic', val: 'Donations, schools, volunteering, foundations' },
          { lab: 'Economic', val: 'Positive impact even at the cost of short-term profit' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'Ethical and philanthropic are the pair most often confused. Ethical concerns how you treat those ' +
             'you already deal with; philanthropic is giving something back beyond that.'
      },
      {
        id: 'i1c-2', type: 'multi', marks: 3,
        prompt: 'Which of these are drivers of CSR? <b>Select all that apply.</b>',
        options: [
          'Social drivers',
          'Governmental drivers',
          'Market drivers',
          'Ethical drivers',
          'Seasonal drivers',
          'Geographic drivers'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Social', val: 'Reputation with consumers, employees and investors' },
          { lab: 'Governmental', val: 'Laws and regulation, incentives and subsidies' },
          { lab: 'Market', val: 'CSR treated as an investment that improves the bottom line' },
          { lab: 'Ethical', val: 'Doing it because it is right' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'The four answer the question of <i>why</i> companies invest in CSR at all, which is different ' +
             'from the four pillars describing <i>what</i> they invest in.'
      },
      {
        id: 'i1c-3', type: 'mcq', marks: 3,
        prompt: 'What is the difference between the <b>letter</b> and the <b>spirit</b> of the law?',
        options: [
          'The letter is the minimum needed to avoid a penalty; the spirit embraces the intention behind the regulation',
          'The letter applies to companies, the spirit applies to individuals',
          'The letter is written law, the spirit is unwritten custom',
          'They mean the same thing in a business context'
        ],
        answer: 0,
        solution: [
          { lab: 'Letter of the law', val: 'Doing the minimum required to avoid a fine or penalty' },
          { lab: 'Spirit of the law', val: 'Embracing the intention behind the regulation' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'This mirrors the ethics-versus-law distinction: compliance is the floor, and the spirit of the ' +
             'law is where ethics starts to matter more than enforcement.'
      },
      {
        id: 'i1c-4', type: 'match', marks: 3,
        prompt: 'Match each term to its meaning.',
        pairs: [
          { left: 'Corporate social responsibility', right: 'The overarching strategy aligning operations with society’s wellbeing' },
          { left: 'Corporate citizenship', right: 'Seeing the company as a member of the community, with rights and responsibilities' },
          { left: 'Corporate social investment', right: 'The tangible plan of specific programmes invested in' }
        ],
        solution: [
          { lab: 'CSR', val: 'The overall strategy' },
          { lab: 'Corporate citizenship', val: 'The mindset — a member of society with duties as well as rights' },
          { lab: 'CSI', val: 'The concrete programmes and the money spent on them' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The three narrow in sequence: strategy, then mindset, then actual spend. CSI is the most ' +
             'specific of the three.'
      },
      {
        id: 'i1c-5', type: 'multi', marks: 3,
        prompt: 'Which of these fall under <b>environmental</b> responsibility? <b>Select all that apply.</b>',
        options: [
          'Reducing pollution',
          'Using sustainable materials',
          'Donating to local schools',
          'Paying fair wages'
        ],
        answers: [0, 1],
        solution: [
          { lab: 'Pollution and materials', val: 'Environmental responsibility' },
          { lab: 'Donating to schools', val: 'Philanthropic responsibility' },
          { lab: 'Fair wages', val: 'Ethical responsibility' },
          { lab: 'Answer', val: 'The first two', final: true }
        ],
        why: 'Each of the four pillars has its own examples, and sorting an activity into the right one is ' +
             'the skill being tested rather than recognising that all four are good things.'
      }
    ]
  },

  /* ═══════════════════════ THE TRIPLE BOTTOM LINE ═══════════════════════ */
  {
    id: 'i1-tbl',
    title: 'The Triple Bottom Line',
    emoji: '📊',
    summary: 'Three bottom lines instead of one, and what happens when only one is measured.',
    notes: [
      {
        heading: 'The three Ps',
        emoji: '3️⃣',
        html:
          '<p>For centuries success was measured by profit alone — the bottom line. The <b>Triple Bottom ' +
          'Line</b>, named by <b>John Elkington</b>, proposes measuring a company against three separate ' +
          'bottom lines:</p>' +
          '<div class="keybox"><b>Profit</b> (economic) · the traditional measure of financial viability' +
          '<br><b>Planet</b> (environmental) · impact on the natural world — carbon footprint, energy use, ' +
          'pollution' +
          '<br><b>People</b> (social) · how the company treats employees, customers, suppliers and communities ' +
          '— fair wages, safe conditions, community development</div>' +
          '<p>A company that appears highly profitable while disregarding people and the environment can ' +
          'collapse anyway, because the profit was never as sound as it looked.</p>'
      },
      {
        heading: 'In practice',
        emoji: '🌍',
        html:
          '<p>Companies listed on the Johannesburg Stock Exchange must integrate sustainability reporting with ' +
          'their financial reports, and adhere to the King Code.</p>' +
          '<p>The Triple Bottom Line aligns with the philosophy of <b>Ubuntu</b> — "I am because we are" — ' +
          'which holds that a business’s success is tied to the health and prosperity of the community it ' +
          'serves. Internationally, the UN Sustainable Development Goals and ESG reporting requirements are ' +
          'making it a standard expectation.</p>'
      }
    ],
    questions: [
      {
        id: 'i1tb-1', type: 'multi', marks: 3,
        prompt: 'Which are the three bottom lines of the Triple Bottom Line? <b>Select all that apply.</b>',
        options: ['Profit', 'Planet', 'People', 'Productivity', 'Property'],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Profit', val: 'Economic — financial viability' },
          { lab: 'Planet', val: 'Environmental — impact on the natural world' },
          { lab: 'People', val: 'Social — how everyone the company deals with is treated' },
          { lab: 'Answer', val: 'Profit, Planet and People', final: true }
        ],
        why: 'All five options begin with P deliberately. The initial letter is a memory aid, not the concept ' +
             'being tested.'
      },
      {
        id: 'i1tb-2', type: 'mcq', marks: 2,
        prompt: 'Who named the Triple Bottom Line?',
        options: ['John Elkington', 'Christo Wiese', 'Michael Porter', 'Henry Mintzberg'],
        answer: 0,
        solution: [
          { lab: 'Named by', val: 'John Elkington' },
          { lab: 'Answer', val: 'John Elkington', final: true }
        ],
        why: 'Christo Wiese is cited for a definition of entrepreneurship. The other two appear in later ' +
             'parts of the module, for competition and for managerial roles.'
      },
      {
        id: 'i1tb-3', type: 'match', marks: 3,
        prompt: 'Match each bottom line to what it measures.',
        pairs: [
          { left: 'Profit', right: 'Whether the company is financially viable' },
          { left: 'Planet', right: 'Carbon footprint, energy use and pollution' },
          { left: 'People', right: 'Fair wages, safe working conditions and community development' }
        ],
        solution: [
          { lab: 'Profit', val: 'The traditional economic measure' },
          { lab: 'Planet', val: 'Impact on the natural world' },
          { lab: 'People', val: 'Treatment of employees, customers, suppliers and communities' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'People covers everyone the business touches, not only its own staff — suppliers and communities ' +
             'are explicitly included.'
      },
      {
        id: 'i1tb-4', type: 'mcq', marks: 2,
        prompt: 'Which philosophy does the Triple Bottom Line align with, holding that a business’s success is ' +
                'tied to the community it serves?',
        options: [
          'Ubuntu',
          'The King Code',
          'The National Development Plan',
          'Corporate citizenship'
        ],
        answer: 0,
        solution: [
          { lab: 'Ubuntu', val: '"I am because we are"' },
          { lab: 'Answer', val: 'Ubuntu', final: true }
        ],
        why: 'The King Code is a governance framework and the NDP is a national economic plan. Ubuntu is the ' +
             'philosophical idea the three Ps are said to echo.'
      },
      {
        id: 'i1tb-5', type: 'mcq', marks: 3,
        prompt: 'What is the danger of measuring a company by profit alone?',
        options: [
          'A company can appear highly profitable while disregarding people and the environment, and collapse anyway',
          'Profit is impossible to measure accurately',
          'Profit is less important than the other two bottom lines',
          'Shareholders are not interested in profit'
        ],
        answer: 0,
        solution: [
          { lab: 'The risk', val: 'Apparent profit can conceal serious underlying problems' },
          { lab: 'Which is why', val: 'Three separate bottom lines are measured instead of one' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The argument is not that profit does not matter. It is that profit on its own is an incomplete ' +
             'and sometimes misleading picture of a company’s health.'
      }
    ]
  },

  /* ═══════════════════════ THE BUSINESS ENVIRONMENT ═══════════════════════ */
  {
    id: 'i1-environ',
    title: 'The Business Environment',
    emoji: '🌦️',
    summary: 'Three environments, five market components, and the PESTLE framework.',
    notes: [
      {
        heading: 'Three environments, three degrees of control',
        emoji: '🎛️',
        html:
          '<div class="keybox"><b>Micro</b> · the internal world of the business — the one part management ' +
          '<b>controls</b>. Yields <b>strengths and weaknesses</b>.' +
          '<br><b>Market</b> · the immediate competitive arena. Cannot be controlled but <b>can be ' +
          'influenced</b>. Also called the <b>task environment</b>.' +
          '<br><b>Macro</b> · the wider world. Cannot be controlled or influenced. Yields <b>opportunities and ' +
          'threats</b>.</div>' +
          '<p>The micro environment has three areas: <b>vision, mission and strategy</b>; <b>business functions ' +
          'and structure</b>; and <b>resources</b> — which are tangible, intangible, or organisational ' +
          'capabilities.</p>'
      },
      {
        heading: 'The market environment, and PESTLE',
        emoji: '🧭',
        html:
          '<div class="keybox"><b>Five components of the market environment</b>' +
          '<br><b>Customers</b> · people with needs and the purchasing power to satisfy them' +
          '<br><b>Competitors</b> · rivals offering similar products to the same customers' +
          '<br><b>Suppliers</b> · providers of raw materials, components, equipment and capital' +
          '<br><b>Intermediaries</b> · wholesalers, retailers and banking intermediaries who help reach the ' +
          'end-user' +
          '<br><b>The labour market and unions</b> · the people you hire, and the organisations representing ' +
          'them</div>' +
          '<div class="keybox"><b>PESTLE</b> — the macro framework' +
          '<br><b>P</b>olitical · <b>E</b>conomic · <b>S</b>ocial · <b>T</b>echnology · <b>L</b>egal · ' +
          '<b>E</b>nvironmental</div>' +
          '<p>Competition is analysed with the <b>Five Forces</b> model: a strong force makes an industry ' +
          '<b>less</b> attractive, a weak force makes it <b>more</b> attractive.</p>'
      }
    ],
    questions: [
      {
        id: 'i1n-1', type: 'match', marks: 3,
        prompt: 'Match each environment to the degree of control management has over it.',
        pairs: [
          { left: 'Micro environment', right: 'Management has control' },
          { left: 'Market environment', right: 'Cannot control, but can influence' },
          { left: 'Macro environment', right: 'Cannot control or influence — only prepare for' }
        ],
        solution: [
          { lab: 'Micro', val: 'The internal world of the business' },
          { lab: 'Market', val: 'Customers, competitors, suppliers, intermediaries, labour' },
          { lab: 'Macro', val: 'The wider world' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'Degree of control is the single distinction that separates the three, and it determines what a ' +
             'manager can usefully do about each.'
      },
      {
        id: 'i1n-2', type: 'multi', marks: 3,
        prompt: 'Which of these are components of the <b>market environment</b>? <b>Select all that apply.</b>',
        options: [
          'Customers',
          'Competitors',
          'Suppliers',
          'Intermediaries',
          'The labour market and unions',
          'Interest rates set by the central bank'
        ],
        answers: [0, 1, 2, 3, 4],
        solution: [
          { lab: 'The five components', val: 'Customers, competitors, suppliers, intermediaries, labour and unions' },
          { lab: 'Interest rates', val: 'Macro — economic, and beyond influence' },
          { lab: 'Answer', val: 'The first five', final: true }
        ],
        why: 'The market environment is everything the business deals with directly. Interest rates affect it ' +
             'profoundly but no amount of strategy will change them.'
      },
      {
        id: 'i1n-3', type: 'multi', marks: 3,
        prompt: 'Which of these belong to the <b>PESTLE</b> framework? <b>Select all that apply.</b>',
        options: [
          'Political',
          'Economic',
          'Legal',
          'Environmental',
          'Financial',
          'Psychological'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'PESTLE', val: 'Political, Economic, Social, Technology, Legal, Environmental' },
          { lab: 'Not included', val: 'Financial and Psychological' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Financial is the tempting wrong answer, but the money side of the environment is covered by ' +
             'Economic — inflation, interest rates and growth.'
      },
      {
        id: 'i1n-4', type: 'mcq', marks: 2,
        prompt: 'Which pair does the <b>micro</b> environment yield?',
        options: [
          'Strengths and weaknesses',
          'Opportunities and threats',
          'Profits and losses',
          'Customers and competitors'
        ],
        answer: 0,
        solution: [
          { lab: 'A strength', val: 'An internal capability that gives an advantage' },
          { lab: 'A weakness', val: 'An internal limitation that creates a disadvantage' },
          { lab: 'Answer', val: 'Strengths and weaknesses', final: true }
        ],
        why: 'Opportunities and threats come from outside, in the macro environment. Internal against ' +
             'external is the whole distinction.'
      },
      {
        id: 'i1n-5', type: 'match', marks: 3,
        prompt: 'Match each kind of resource in the micro environment to its description.',
        pairs: [
          { left: 'Tangible resources', right: 'Things that can be seen and touched — machinery, vehicles, cash' },
          { left: 'Intangible resources', right: 'Invisible but valuable — a brand name, a patent, a reputation' },
          { left: 'Organisational capabilities', right: 'The ability to combine resources effectively' }
        ],
        solution: [
          { lab: 'Tangible', val: 'Physical assets' },
          { lab: 'Intangible', val: 'Non-physical assets' },
          { lab: 'Capabilities', val: 'Not a thing owned, but something the business can do' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'A capability is the odd one out on purpose: it is not an asset that appears on a balance sheet ' +
             'but a demonstrated ability to put assets to work.'
      },
      {
        id: 'i1n-6', type: 'mcq', marks: 2,
        prompt: 'In the Five Forces model, a <b>strong</b> force means:',
        options: [
          'The industry is less attractive',
          'The industry is more attractive',
          'The industry is unaffected',
          'The industry is growing'
        ],
        answer: 0,
        solution: [
          { lab: 'Strong force', val: 'Makes an industry less attractive' },
          { lab: 'Weak force', val: 'Makes an industry more attractive' },
          { lab: 'Answer', val: 'The industry is less attractive', final: true }
        ],
        why: 'The model measures the intensity of competitive pressure. The stronger the forces pressing on a ' +
             'business, the harder it is to be profitable there.'
      },
      {
        id: 'i1n-7', type: 'mcq', marks: 2,
        prompt: 'Which other name is given to the market environment?',
        options: [
          'The task environment',
          'The internal environment',
          'The macro environment',
          'The competitive advantage'
        ],
        answer: 0,
        solution: [
          { lab: 'Also called', val: 'The task environment' },
          { lab: 'Why', val: 'Managing it is one of management’s most important tasks' },
          { lab: 'Answer', val: 'The task environment', final: true }
        ],
        why: 'The name is a reminder that although customers, competitors and suppliers cannot be controlled, ' +
             'dealing with them is squarely a management responsibility.'
      },
      {
        id: 'i1n-8', type: 'multi', marks: 3,
        prompt: 'Which of these make up the <b>micro</b> environment? <b>Select all that apply.</b>',
        options: [
          'Vision, mission and strategy',
          'Business functions and structure',
          'The company’s own resources',
          'Rival firms competing for the same customers'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Three areas', val: 'Vision/mission/strategy, functions and structure, and resources' },
          { lab: 'Rivals', val: 'Market environment' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'The test is control. A business writes its own mission and chooses its own structure; it does ' +
             'neither for its competitors.'
      }
    ]
  }

  ]
});
