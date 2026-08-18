/* INBA01-5 — Week 1: The role of business, entrepreneurship, ethics and the
   business environment.

   Built from Abi's own Week 1 notes (SparkleStudy-source/inba, extracted from
   the Milpark site). Every fact below is taken from those notes — nothing is
   filled in from general business knowledge, because a plausible-sounding
   answer that her module does not teach is worse than no question at all.

   Only theory that can be marked objectively appears here. The notes are full
   of reflection prompts and "what would you do" scenarios; those are good for
   learning and impossible to mark, so they are deliberately left out. */

window.MODULE_CONTENT = window.MODULE_CONTENT || {};
window.MODULE_CONTENT.inba = window.MODULE_CONTENT.inba || { weeks: [], exams: [] };

window.MODULE_CONTENT.inba.weeks.push({
  id: 'inba-week1',
  number: 1,
  title: 'Business, Entrepreneurship & Ethics',
  emoji: '🏪',
  accent: 2,
  blurb: 'What a business actually is, who starts one, and what it owes everyone else.',
  topics: [

  /* ═══════════════════════ WHAT A BUSINESS IS ═══════════════════════ */
  {
    id: 'i1-business',
    title: 'What a Business Is',
    emoji: '🔥',
    summary: 'The four things every business does, from a church bazaar to a taxi rank.',
    notes: [
      {
        heading: 'A business is like a braai',
        emoji: '🍖',
        html:
          '<p>Your notes use a braai to explain it. You start with <b>raw ingredients</b> (resources) — the meat ' +
          'and the wood. You apply <b>skill and effort</b> (human activity) to transform those ingredients ' +
          '(<b>production</b>) into a plate of food your friends rave about, and the satisfaction of a job well ' +
          'done (goods and services you sell at a profit).</p>' +
          '<div class="keybox"><b>The four elements</b> — every example in the notes has all four:' +
          '<br><b>Human activities</b> · people putting in time, effort and coordination' +
          '<br><b>Production</b> · turning inputs into something people want' +
          '<br><b>Exchange</b> · money changing hands for the goods or service' +
          '<br><b>Profit</b> · the financial reward received</div>' +
          '<p>A spaza shop, a hair salon, a factory and a large international service provider are all ' +
          'businesses. So is a church bazaar and a taxi rank — the notes work through both.</p>'
      },
      {
        heading: 'Why we say business is complex',
        emoji: '🌪️',
        html:
          '<p>The Mzansi Fresh Market case in your notes makes the point. A small family grocer in Soweto faced ' +
          'loadshedding spoiling stock, the July unrest cutting supply routes, and COVID-19 lockdowns emptying the ' +
          'shop — all at once, and none of it their doing.</p>' +
          '<p>That is why the business environment gets a whole lesson later in the week.</p>'
      }
    ],
    questions: [
      {
        id: 'i1b-1', type: 'multi', marks: 3,
        prompt: 'According to your notes, which of the following are essential elements of a business? ' +
                '<b>Select all that apply.</b>',
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
          { lab: 'Human activities', val: 'People putting in time, effort and coordination' },
          { lab: 'Production', val: 'Transforming inputs into goods or services' },
          { lab: 'Exchange', val: 'Money changing hands for what was produced' },
          { lab: 'Profit', val: 'The financial reward received' },
          { lab: 'Answer', val: 'All four of the above, and neither of the last two', final: true }
        ],
        why: 'The church bazaar in your notes has no shopfront and the taxi rank has no formal registration, ' +
             'yet both are used as examples of business activity. The four elements are what all of them share.'
      },
      {
        id: 'i1b-2', type: 'mcq', marks: 2,
        scenario: 'At a church bazaar, visitors hand over money for a homemade cupcake.',
        prompt: 'Which element of business does this describe?',
        options: ['Exchange', 'Production', 'Human activities', 'Profit'],
        answer: 0,
        solution: [
          { lab: 'What happened', val: 'Money was traded for a good' },
          { lab: 'Element', val: 'Exchange — visitors exchange money for goods and services' },
          { lab: 'Answer', val: 'Exchange', final: true }
        ],
        why: 'Production is the baking of the cupcake. Exchange is specifically the moment money is traded ' +
             'for it. The two are easy to blur because they happen at the same stall.'
      },
      {
        id: 'i1b-3', type: 'match', marks: 4,
        prompt: 'Your notes use a taxi rank as a worked example. Match each part of it to the business element it illustrates.',
        pairs: [
          { left: 'Drivers, marshals and passengers each play a role', right: 'Human activities' },
          { left: 'People are moved safely from one place to another', right: 'Production' },
          { left: 'Passengers pay a fare for the ride', right: 'Exchange' },
          { left: 'Drivers earn income after covering fuel and maintenance', right: 'Profit' }
        ],
        solution: [
          { lab: 'Human activities', val: 'Drivers transport, marshals organise queues, passengers pay' },
          { lab: 'Production', val: 'The service produced is transportation' },
          { lab: 'Exchange', val: 'A fare is a direct trade of money for a service' },
          { lab: 'Profit', val: 'What is left after fuel, maintenance and costs' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'A taxi rank produces a service rather than a physical good, which is why it is a useful example — ' +
             'the four elements are still all there.'
      },
      {
        id: 'i1b-4', type: 'mcq', marks: 2,
        prompt: 'In the braai comparison used in your notes, what do the meat and wood represent?',
        options: [
          'The resources a business starts with',
          'The profit a business earns',
          'The customers a business serves',
          'The competition a business faces'
        ],
        answer: 0,
        solution: [
          { lab: 'The comparison', val: 'Raw ingredients are the starting point' },
          { lab: 'In business terms', val: 'Resources — what you begin with before any effort is applied' },
          { lab: 'Answer', val: 'The resources a business starts with', final: true }
        ],
        why: 'The skill and effort applied to them is the human activity, and the finished plate of food is the ' +
             'good or service. Each part of the braai maps onto one part of the business.'
      },
      {
        id: 'i1b-5', type: 'mcq', marks: 2,
        prompt: 'For a formal business, your notes define <b>profit</b> as:',
        options: [
          'The financial reward received',
          'The total money taken from customers',
          'The value of the resources used up',
          'The number of people employed'
        ],
        answer: 0,
        solution: [
          { lab: 'Definition', val: 'Profit is the financial reward received' },
          { lab: 'Not the same as', val: 'Total money taken in, which takes no account of costs' },
          { lab: 'Answer', val: 'The financial reward received', final: true }
        ],
        why: 'The street vendor example makes the difference plain: the vendor earns a profit only after ' +
             'covering ingredients, oil and transport.'
      },
      {
        id: 'i1b-6', type: 'multi', marks: 3,
        scenario: 'Mzansi Fresh Market, a family grocer in Soweto, faced several difficulties in 2021.',
        prompt: 'Which of these challenges from the case study came from <b>outside</b> the business? ' +
                '<b>Select all that apply.</b>',
        options: [
          'Loadshedding causing refrigeration failures',
          'The July unrest damaging supply routes',
          'COVID-19 lockdowns reducing foot traffic',
          'Choosing which staff member to promote',
          'Deciding the shop layout'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Loadshedding', val: 'External — the business does not control the power supply' },
          { lab: 'July unrest', val: 'External — it damaged routes the business relies on' },
          { lab: 'COVID-19 lockdowns', val: 'External — imposed on the business' },
          { lab: 'The last two', val: 'Internal decisions management makes itself' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'This is the distinction Lesson 4 builds on: some things a business controls, some it can only ' +
             'influence, and some it can merely prepare for.'
      }
    ]
  },

  /* ═══════════════════════ TRANSFORMATION ═══════════════════════ */
  {
    id: 'i1-transform',
    title: 'Transformation, Products & Services',
    emoji: '🔄',
    summary: 'Production means turning something into something else — and services behave differently.',
    notes: [
      {
        heading: 'Production is transformation',
        emoji: '🍞',
        html:
          '<p>Production is about taking what you have and turning it into something people actually need or ' +
          'want. A baker takes flour, sugar and butter and transforms them into a loaf of bread. A construction ' +
          'crew takes bricks, sand, cement and steel and transforms them into a house.</p>' +
          '<p>Services transform too. A hospital brings together beds, medicine and medical expertise and ' +
          'transforms them into <b>healthcare</b>. An airline brings together an aeroplane, fuel and crew and ' +
          'transforms them into <b>transportation</b>.</p>'
      },
      {
        heading: 'Products against services',
        emoji: '✂️',
        html:
          '<div class="keybox"><b>Product</b> vs <b>Service</b>' +
          '<br>Tangible, can be seen and touched · Intangible, an experience or deed' +
          '<br>Buyer owns the item afterwards · No transfer of ownership' +
          '<br>Produced, stored, sold, then consumed later · Produced and consumed simultaneously' +
          '<br>Can be stored · Perishable, cannot be stored' +
          '<br>Typically standardised · Varies from one delivery to the next' +
          '<br>Lower customer involvement · High customer involvement' +
          '<br>Easier to evaluate before purchase · Difficult to evaluate, relies on trust</div>' +
          '<p>The unsold laptop can be sold tomorrow. The empty airline seat is revenue lost forever.</p>'
      }
    ],
    questions: [
      {
        id: 'i1t-1', type: 'match', marks: 4,
        prompt: 'Match each example from your notes to the characteristic of services it illustrates.',
        pairs: [
          { left: 'An empty airline seat is revenue lost forever', right: 'Perishable, cannot be stored' },
          { left: 'A doctor needs the patient to describe symptoms', right: 'High customer involvement' },
          { left: 'You cannot see the quality of a repair before it is done', right: 'Difficult to evaluate before purchase' },
          { left: 'You only experience a concert, you do not own it', right: 'No transfer of ownership' }
        ],
        solution: [
          { lab: 'Perishability', val: 'Unused service capacity cannot be kept for tomorrow' },
          { lab: 'Involvement', val: 'The customer supplies input the service cannot run without' },
          { lab: 'Evaluation', val: 'You rely on experience and trust rather than inspection' },
          { lab: 'Ownership', val: 'Nothing changes hands to keep' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'Each of these is a genuinely different problem for the business. Perishability affects pricing, ' +
             'involvement affects staffing, and difficulty of evaluation is why reputation matters so much in services.'
      },
      {
        id: 'i1t-2', type: 'mcq', marks: 2,
        prompt: 'A car is made in a factory and driven later; a haircut is produced and consumed at the same time. ' +
                'Which difference does this illustrate?',
        options: [
          'A product can be stored before sale, a service cannot',
          'A product is cheaper to make than a service',
          'A product needs more customer involvement',
          'A product is harder to evaluate before purchase'
        ],
        answer: 0,
        solution: [
          { lab: 'The car', val: 'Produced, then stored, then sold, then consumed' },
          { lab: 'The haircut', val: 'Produced and consumed simultaneously' },
          { lab: 'Answer', val: 'A product can be stored before sale, a service cannot', final: true }
        ],
        why: 'The other three options reverse the actual difference — services are the ones with high customer ' +
             'involvement and are harder to evaluate beforehand.'
      },
      {
        id: 'i1t-3', type: 'multi', marks: 3,
        prompt: 'Which of the following describe a <b>service</b> rather than a product? <b>Select all that apply.</b>',
        options: [
          'Intangible — an experience or deed',
          'Perishable and cannot be stored',
          'High customer involvement in production',
          'Ownership transfers to the buyer',
          'Typically standardised and identical each time'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Intangible', val: 'Non-physical, unlike a product you can touch' },
          { lab: 'Perishable', val: 'The empty airline seat cannot be sold tomorrow' },
          { lab: 'High involvement', val: 'The customer provides information or materials' },
          { lab: 'The last two', val: 'Both describe products' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'A service varies from one delivery to the next — the notes point out that the quality of a ' +
             'customer service call can vary, while every unit of one laptop model is identical.'
      },
      {
        id: 'i1t-4', type: 'mcq', marks: 2,
        scenario: 'An airline uses an aeroplane, fuel, pilots, air hostesses and ground crew.',
        prompt: 'According to your notes, what are all of these transformed into?',
        options: [
          'Transportation',
          'Profit',
          'Tangible products',
          'Customer loyalty'
        ],
        answer: 0,
        solution: [
          { lab: 'The inputs', val: 'Aeroplane, fuel, crew and many other resources' },
          { lab: 'Brought together into', val: 'A single service — transportation' },
          { lab: 'Answer', val: 'Transportation', final: true }
        ],
        why: 'The point being made is that transformation is not only about physical goods. Loose resources ' +
             'are combined into one service, exactly as flour and sugar are combined into bread.'
      },
      {
        id: 'i1t-5', type: 'mcq', marks: 2,
        prompt: 'Your notes say a hospital transforms beds, medicine and medical expertise into which service?',
        options: ['Healthcare', 'Accommodation', 'Insurance', 'Research'],
        answer: 0,
        solution: [
          { lab: 'The inputs', val: 'Beds, medicine, and the medical expertise of the doctors' },
          { lab: 'The output', val: 'Patients receive diagnosis, treatment and care' },
          { lab: 'Answer', val: 'Healthcare', final: true }
        ],
        why: 'The beds are not the service — they are one input among several that get combined into it.'
      }
    ]
  },

  /* ═══════════════════════ THE FOUR RESOURCES ═══════════════════════ */
  {
    id: 'i1-resources',
    title: 'The Four Resources',
    emoji: '⛏️',
    summary: 'Natural, human, capital and entrepreneurship — and why they are all scarce.',
    notes: [
      {
        heading: 'Four types of scarce resource',
        emoji: '4️⃣',
        html:
          '<div class="keybox"><b>1. Natural resources</b> — raw materials from the earth. The "land" in the ' +
          'economic sense: agricultural land, space for factories, minerals like gold and platinum, forests and ' +
          'water. These are finite; we cannot create more land or refill a mine.' +
          '<br><br><b>2. Human resources</b> — people and their skills. Physical and mental effort, skills and ' +
          'knowledge. People get paid <b>wages</b> for their labour.' +
          '<br><br><b>3. Capital resources</b> — the man-made tools and machinery used to produce other goods and ' +
          'services: the oven, the cement mixer, the x-ray machine. Investors who provide capital earn ' +
          '<b>interest or rent</b> for its use.' +
          '<br><br><b>4. Entrepreneurship</b> — the drive and vision to bring it all together and take the risk.</div>'
      },
      {
        heading: 'Why it matters',
        emoji: '🧩',
        html:
          '<p>A successful business does not magically appear. It relies on a combination of these four resources ' +
          'skilfully put together and transformed into a product or service that meets a need.</p>' +
          '<p>Entrepreneurship is the one that mobilises the other three — which is why it gets its own lesson.</p>'
      }
    ],
    questions: [
      {
        id: 'i1r-1', type: 'match', marks: 4,
        prompt: 'Match each example to the type of resource it is.',
        pairs: [
          { left: 'Gold and platinum under the soil', right: 'Natural resources' },
          { left: 'The skills of a nurse or a pilot', right: 'Human resources' },
          { left: 'An oven in a bakery', right: 'Capital resources' },
          { left: 'The vision to open the bakery and take the risk', right: 'Entrepreneurship' }
        ],
        solution: [
          { lab: 'Natural', val: 'Raw materials from the earth, including minerals' },
          { lab: 'Human', val: 'People, and the effort, skills and knowledge they bring' },
          { lab: 'Capital', val: 'Man-made tools used to produce other goods and services' },
          { lab: 'Entrepreneurship', val: 'The drive and vision to combine the rest and carry the risk' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'The oven is the trap here. It is man-made and used to produce something else, which makes it ' +
             'capital — not a natural resource, even though it is a physical object.'
      },
      {
        id: 'i1r-2', type: 'mcq', marks: 2,
        prompt: 'Your notes say that people are paid <b>wages</b> for their labour. Which resource does this describe?',
        options: ['Human resources', 'Capital resources', 'Natural resources', 'Entrepreneurship'],
        answer: 0,
        solution: [
          { lab: 'Wages', val: 'The return paid for physical and mental effort' },
          { lab: 'Resource', val: 'Human resources — people and their skills' },
          { lab: 'Answer', val: 'Human resources', final: true }
        ],
        why: 'Each resource earns a different return. Your notes state that those who provide capital earn ' +
             'interest or rent, which is a separate thing from wages.'
      },
      {
        id: 'i1r-3', type: 'mcq', marks: 2,
        prompt: 'According to your notes, investors who provide <b>capital</b> earn:',
        options: [
          'Interest or rent for its use',
          'Wages for their labour',
          'A share of the natural resources',
          'Nothing until the business is sold'
        ],
        answer: 0,
        solution: [
          { lab: 'Capital resources', val: 'Man-made tools and machinery used in production' },
          { lab: 'The return', val: 'Interest or rent, paid for the use of that capital' },
          { lab: 'Answer', val: 'Interest or rent for its use', final: true }
        ],
        why: 'Wages go to human resources. Keeping the returns straight is a quick way to keep the four ' +
             'resources themselves straight.'
      },
      {
        id: 'i1r-4', type: 'mcq', marks: 2,
        prompt: 'Why do your notes describe natural resources as <b>finite</b>?',
        options: [
          'There is only so much of them — we cannot create more land or refill a mine',
          'They are owned by the government',
          'They can only be used once per year',
          'They are the cheapest of the four resources'
        ],
        answer: 0,
        solution: [
          { lab: 'Finite means', val: 'Limited in quantity, and not replaceable at will' },
          { lab: 'The example given', val: 'We cannot just create more land or refill a mine' },
          { lab: 'Answer', val: 'There is only so much of them', final: true }
        ],
        why: 'This is what makes resources <i>scarce</i>, which is the reason a business has to choose carefully ' +
             'how it combines them.'
      },
      {
        id: 'i1r-5', type: 'multi', marks: 3,
        prompt: 'Which of the following are given as <b>natural resources</b> in your notes? <b>Select all that apply.</b>',
        options: [
          'Agricultural land for farming',
          'Minerals under the soil',
          'Forests and water',
          'The cement mixer on a building site',
          'The builder operating it'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Natural resources', val: 'Land, minerals, forests and water — raw materials from the earth' },
          { lab: 'The cement mixer', val: 'Man-made, so it is a capital resource' },
          { lab: 'The builder', val: 'A person, so a human resource' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'The test is whether it came from the earth or was made by people. A forest is natural; a mixer ' +
             'was manufactured to help produce something else.'
      },
      {
        id: 'i1r-6', type: 'mcq', marks: 2,
        prompt: 'Which resource is described as the one that brings the other three together?',
        options: ['Entrepreneurship', 'Capital resources', 'Human resources', 'Natural resources'],
        answer: 0,
        solution: [
          { lab: 'Entrepreneurship', val: 'The drive and vision to bring it all together and take the risk' },
          { lab: 'The comparison used', val: 'A conductor bringing the musicians together into a symphony' },
          { lab: 'Answer', val: 'Entrepreneurship', final: true }
        ],
        why: 'Human resources supply effort and skill, but it is the entrepreneur who decides to mobilise land, ' +
             'labour and capital in the first place and carries the risk if it fails.'
      }
    ]
  },

  /* ═══════════════════════ ENTREPRENEURSHIP ═══════════════════════ */
  {
    id: 'i1-entre',
    title: 'Entrepreneurship',
    emoji: '🚀',
    summary: 'What an entrepreneur actually is, why they matter, and the ways into business.',
    notes: [
      {
        heading: 'Definitions',
        emoji: '📖',
        html:
          '<div class="keybox"><b>An entrepreneur</b> is an individual who identifies opportunities, gathers ' +
          'resources, and accepts the risks to create value.' +
          '<br><br><b>Entrepreneurship</b> is the continuous process of building something valuable amidst ' +
          'scarcity and uncertainty.</div>' +
          '<p>Christo Wiese, chairman of Shoprite Holdings, defines it as identifying what the consumer wants and ' +
          'delivering it with the best possible value — shifting the focus from making money to creating value.</p>' +
          '<p>Not every business owner is an entrepreneur. Buying a franchise makes you a business owner but not ' +
          'necessarily an entrepreneur; seeing a gap and building something from scratch does.</p>'
      },
      {
        heading: 'Two motivations, three roles',
        emoji: '💡',
        html:
          '<div class="keybox"><b>Necessity entrepreneur</b> — starts a business because they feel they have no ' +
          'other good option. A survivalist motivation: not by choice.' +
          '<br><b>Opportunity entrepreneur</b> — starts because they see a chance to do something new or better. ' +
          'By choice, to pursue a passion and fill a market gap.</div>' +
          '<p>Their roles in the economy: <b>job creators</b>, <b>drivers of innovation and productivity</b>, and ' +
          '<b>wealth creators</b>. In 2019 small businesses contributed 22% of all business turnover in South ' +
          'Africa and created over 10 million jobs.</p>'
      }
    ],
    questions: [
      {
        id: 'i1e-1', type: 'mcq', marks: 2,
        scenario: 'Someone loses their job, cannot find another, and starts a small business to pay the bills.',
        prompt: 'What kind of entrepreneur do your notes call this?',
        options: [
          'A necessity entrepreneur',
          'An opportunity entrepreneur',
          'An intrapreneur',
          'A franchisee'
        ],
        answer: 0,
        solution: [
          { lab: 'The motivation', val: 'No other good options for work — a survivalist motivation' },
          { lab: 'Not by choice', val: 'They were forced into it rather than pursuing a gap' },
          { lab: 'Answer', val: 'A necessity entrepreneur', final: true }
        ],
        why: 'The difference is entirely about <i>why</i> they started, not how well the business does. ' +
             'An opportunity entrepreneur starts by choice, to chase something they have spotted.'
      },
      {
        id: 'i1e-2', type: 'multi', marks: 3,
        prompt: 'Which of these are given in your notes as roles entrepreneurs play in the economy? ' +
                '<b>Select all that apply.</b>',
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
          { lab: 'Innovation and productivity', val: 'New entrants force everyone to up their game' },
          { lab: 'Wealth creators', val: 'For themselves, employees and communities' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'Your notes tie this to the National Development Plan: SMMEs are considered essential for ' +
             'generating the new jobs needed to fight poverty and inequality.'
      },
      {
        id: 'i1e-3', type: 'mcq', marks: 2,
        prompt: 'Your notes define an <b>entrepreneur</b> as an individual who:',
        options: [
          'Identifies opportunities, gathers resources, and accepts the risks to create value',
          'Owns any business, regardless of how it was started',
          'Invests money in businesses run by other people',
          'Manages the day-to-day operations of a large company'
        ],
        answer: 0,
        solution: [
          { lab: 'Three parts', val: 'Identifies opportunities · gathers resources · accepts the risks' },
          { lab: 'The purpose', val: 'To create value' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Accepting risk is the part people leave out. Owning a business is not enough on its own — your ' +
             'notes are explicit that a franchisee is an owner but not necessarily an entrepreneur.'
      },
      {
        id: 'i1e-4', type: 'mcq', marks: 2,
        prompt: 'Christo Wiese defines entrepreneurship as:',
        options: [
          'Identifying what the consumer wants and delivering it with the best possible value',
          'Taking the largest possible financial risk for the largest possible profit',
          'Setting up a business and hoping for profit',
          'Employing as many people as the business can afford'
        ],
        answer: 0,
        solution: [
          { lab: 'Wiese’s focus', val: 'What the consumer wants, delivered at the best possible value' },
          { lab: 'What it shifts', val: 'From making money to creating value' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Your notes contrast this with the media description — "someone who sets up a business, takes on ' +
             'financial risks, and hopes for profit" — which they say is true but misses the whole story.'
      },
      {
        id: 'i1e-5', type: 'match', marks: 3,
        prompt: 'Besides starting from scratch, your notes give three other routes into business. Match each to its description.',
        pairs: [
          { left: 'Buy an existing business', right: 'Customers, brand and systems are already there, but you may inherit its problems' },
          { left: 'Buy a franchise', right: 'You get a proven business model, but must follow the franchisor’s rules' },
          { left: 'Become an intrapreneur', right: 'Act entrepreneurially inside a large company, using its resources' }
        ],
        solution: [
          { lab: 'Existing business', val: 'Established, but its problems come with it' },
          { lab: 'Franchise', val: 'Proven model, less freedom' },
          { lab: 'Intrapreneur', val: 'Innovating within someone else’s company' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'This is why your notes say a franchisee may not be an entrepreneur in the true economic sense — ' +
             'the model already exists and the rules are set by someone else.'
      },
      {
        id: 'i1e-6', type: 'mcq', marks: 2,
        prompt: 'Which statement matches your notes on whether every business owner is an entrepreneur?',
        options: [
          'No — buying a franchise makes you an owner, but not necessarily an entrepreneur',
          'Yes — anyone who owns a business is an entrepreneur',
          'No — only people who employ staff are entrepreneurs',
          'Yes — provided the business makes a profit'
        ],
        answer: 0,
        solution: [
          { lab: 'The distinction', val: 'Spotting a gap and building from scratch is entrepreneurial' },
          { lab: 'Buying a franchise', val: 'Follows an existing model — replication rather than innovation' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Your notes make the same point with the KFC example: opening a branch to the company’s exact ' +
             'rules and menu adds no new consumer value.'
      }
    ]
  },

  /* ═══════════════════════ THE ENTREPRENEURIAL PROCESS ═══════════════════════ */
  {
    id: 'i1-process',
    title: 'The Entrepreneurial Process',
    emoji: '🗺️',
    summary: 'Seven steps from looking in the mirror to launching, plus the skills you need on the way.',
    notes: [
      {
        heading: 'The seven steps',
        emoji: '🪜',
        html:
          '<div class="keybox"><b>1.</b> Decision to become an entrepreneur — introspection about strengths, ' +
          'risk tolerance and perseverance' +
          '<br><b>2.</b> Determining your entrepreneurial skills' +
          '<br><b>3.</b> Resource mobilisation — financial, human and physical resources' +
          '<br><b>4.</b> Opportunity recognition' +
          '<br><b>5.</b> Feasibility analysis' +
          '<br><b>6.</b> The business plan' +
          '<br><b>7.</b> Launch and management</div>' +
          '<p>A feasibility study is "the collection of data that helps forecast whether an idea, opportunity or ' +
          'venture will survive and may result in a decision to move forward, or to abandon the idea".</p>'
      },
      {
        heading: 'The seven skill areas',
        emoji: '🧰',
        html:
          '<div class="keybox"><b>Strategy</b> · how your business fits the market and how you will compete' +
          '<br><b>Planning</b> · thinking ahead about resources and actions' +
          '<br><b>Communication</b> · selling your vision; listening, writing, negotiating, motivating' +
          '<br><b>Marketing</b> · who your customer is, what need you satisfy, at what price' +
          '<br><b>Financial</b> · tracking expenses, cash flow, whether an investment is worth it' +
          '<br><b>Project management</b> · breaking work down, deadlines, the right resources' +
          '<br><b>Human relations</b> · leading, motivating and dealing with people</div>' +
          '<p>A good <b>opportunity</b> must solve a real customer problem, be scalable, have the right timing, ' +
          'and be potentially rewarding for you.</p>'
      }
    ],
    questions: [
      {
        id: 'i1p-1', type: 'mcq', marks: 2,
        prompt: 'What is the <b>first</b> step of the entrepreneurial process in your notes?',
        options: [
          'The decision to become an entrepreneur',
          'Opportunity recognition',
          'Writing the business plan',
          'Resource mobilisation'
        ],
        answer: 0,
        solution: [
          { lab: 'Step 1', val: 'Decision to become an entrepreneur' },
          { lab: 'What it involves', val: 'Introspection — strengths, weaknesses, risk tolerance, perseverance' },
          { lab: 'Answer', val: 'The decision to become an entrepreneur', final: true }
        ],
        why: 'Your notes put it plainly: before you even look at your business idea, you look in the mirror. ' +
             'The idea comes later in the sequence than most people expect.'
      },
      {
        id: 'i1p-2', type: 'mcq', marks: 2,
        prompt: 'At which step do you verify whether an idea is actually viable, before investing significant money?',
        options: [
          'Step 5 — feasibility analysis',
          'Step 2 — determining your entrepreneurial skills',
          'Step 6 — the business plan',
          'Step 7 — launch and management'
        ],
        answer: 0,
        solution: [
          { lab: 'Feasibility analysis', val: 'Researching the market, the industry and the finances' },
          { lab: 'Its purpose', val: 'To decide whether to move forward or abandon the idea' },
          { lab: 'Answer', val: 'Step 5 — feasibility analysis', final: true }
        ],
        why: 'It comes before the business plan on purpose. Your notes say it saves you from wasting time and ' +
             'resources on an idea that is unlikely to succeed.'
      },
      {
        id: 'i1p-3', type: 'multi', marks: 3,
        prompt: 'Your notes say a good <b>opportunity</b> must meet certain tests. Which of these are given? ' +
                '<b>Select all that apply.</b>',
        options: [
          'Solve a real customer problem',
          'Be scalable and grow with you',
          'Have the right timing',
          'Be potentially rewarding for you',
          'Require no financial investment'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Solves a real problem', val: 'Otherwise there is no customer' },
          { lab: 'Scalable', val: 'It can grow with you' },
          { lab: 'Right timing', val: 'A window of opportunity is open' },
          { lab: 'Rewarding', val: 'Worth doing for you specifically' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Your notes open this section with the line that a good idea is not the same as a good opportunity. ' +
             'These four tests are what separates them.'
      },
      {
        id: 'i1p-4', type: 'match', marks: 4,
        prompt: 'Match each entrepreneurial skill to what your notes say it does.',
        pairs: [
          { left: 'Strategy skills', right: 'Understanding how your business fits the market and how you will compete' },
          { left: 'Marketing skills', right: 'Knowing your ideal customer, the need you satisfy, and at what price' },
          { left: 'Financial skills', right: 'Tracking expenses, understanding cash flow, judging an investment' },
          { left: 'Project management skills', right: 'Breaking big tasks into steps and setting deadlines' }
        ],
        solution: [
          { lab: 'Strategy', val: 'Your position in the market and how you compete' },
          { lab: 'Marketing', val: 'Customer, need and price' },
          { lab: 'Financial', val: 'Expenses, cash flow, investment decisions' },
          { lab: 'Project management', val: 'Breaking work down and scheduling it' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'Strategy and planning are the pair most often confused. Your notes separate them neatly: ' +
             'if strategy is your map, planning is your itinerary.'
      },
      {
        id: 'i1p-5', type: 'multi', marks: 3,
        prompt: 'At the resource mobilisation step, which resources do your notes say you should gather? ' +
                '<b>Select all that apply.</b>',
        options: [
          'Financial resources — savings, loans or investors',
          'Human resources — co-founders and employees with complementary skills',
          'Physical resources — equipment and spaces, including online',
          'Political resources — contacts in government'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Financial', val: 'Savings, loans or investors' },
          { lab: 'Human', val: 'Co-founders and employees, especially complementary skills' },
          { lab: 'Physical', val: 'Equipment and spaces, including online' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'The word "complementary" is doing real work in the human resources point — the notes suggest ' +
             'hiring for the skills you do not already have, not more of your own.'
      },
      {
        id: 'i1p-6', type: 'mcq', marks: 2,
        prompt: 'According to your notes, what does a <b>feasibility study</b> research?',
        options: [
          'The market, the industry, and the finances',
          'Only the expected profit',
          'The personality of the entrepreneur',
          'The competitors’ business plans'
        ],
        answer: 0,
        solution: [
          { lab: 'The market', val: 'Who are your customers? Is there really demand?' },
          { lab: 'The industry', val: 'Is it growing or declining?' },
          { lab: 'Finances', val: 'Can you make money? What are the costs?' },
          { lab: 'Answer', val: 'The market, the industry, and the finances', final: true }
        ],
        why: 'The entrepreneur’s own personality is examined at step 1, not here. By step 5 the question has ' +
             'moved from "am I suited to this" to "will this idea survive".'
      }
    ]
  },

  /* ═══════════════════════ ETHICS ═══════════════════════ */
  {
    id: 'i1-ethics',
    title: 'Business Ethics',
    emoji: '⚖️',
    summary: 'Your moral compass, why the law is only the floor, and how organisations manage it.',
    notes: [
      {
        heading: 'Ethics, and the law',
        emoji: '🧭',
        html:
          '<p>Ethics is "the code of moral principles and values that directs the behaviour of an individual or a ' +
          'group in terms of what is right or wrong" (Brevis &amp; Vrba, 2014).</p>' +
          '<div class="keybox"><b>The law</b> is the minimum standard of behaviour required by the government — ' +
          'the line you cannot cross without penalty.<br><b>Ethics</b> is a higher standard: doing the right ' +
          'thing, not just the legal thing.</div>' +
          '<p><b>Gift or bribe?</b> A gift is a token of appreciation given <b>after</b> a deal is done, with no ' +
          'strings attached. A bribe is an incentive given <b>before</b> a decision, expecting a favour in return. ' +
          'The difference is the intention behind it.</p>'
      },
      {
        heading: 'Deciding, and managing',
        emoji: '🏛️',
        html:
          '<div class="keybox"><b>Three approaches to an ethical decision</b>' +
          '<br><b>Utilitarian</b> · "Which option creates the greatest good for the greatest number?"' +
          '<br><b>Human rights</b> · "Does this decision respect everyone’s fundamental rights?"' +
          '<br><b>Justice</b> · "Is this decision fair to everyone affected?"</div>' +
          '<div class="keybox"><b>Four ways organisations manage ethics</b>' +
          '<br>Leading by example · a code of ethics · ethical structures · whistle-blowing</div>' +
          '<p>South Africa’s <b>King Code</b> (King V) covers good corporate governance — running a company ' +
          'responsibly, transparently and with accountability. Originally for JSE-listed companies, it now ' +
          'applies to all organisations.</p>'
      }
    ],
    questions: [
      {
        id: 'i1x-1', type: 'mcq', marks: 2,
        prompt: 'Your notes describe <b>the law</b> as:',
        options: [
          'The minimum standard of behaviour required by the government',
          'The same thing as ethics',
          'A higher standard than ethics',
          'A set of guidelines companies may ignore'
        ],
        answer: 0,
        solution: [
          { lab: 'The law', val: 'The minimum standard — the line you cannot cross without penalty' },
          { lab: 'Ethics', val: 'A higher standard: the right thing, not just the legal thing' },
          { lab: 'Answer', val: 'The minimum standard of behaviour required by the government', final: true }
        ],
        why: 'The example given is paying minimum wage: legal, but arguably not ethical if the company is making ' +
             'huge profits while staff struggle. Legal and ethical are not the same question.'
      },
      {
        id: 'i1x-2', type: 'mcq', marks: 3,
        scenario: 'A contractor offers a payment to a tender officer before the winning bid is chosen, ' +
                  'expecting favourable treatment.',
        prompt: 'According to the distinction in your notes, this is:',
        options: [
          'A bribe, because it comes before the decision and expects a favour',
          'A gift, because money changed hands voluntarily',
          'A gift, because it was offered rather than demanded',
          'Neither, provided it is declared afterwards'
        ],
        answer: 0,
        solution: [
          { lab: 'Timing', val: 'Given before a decision is made' },
          { lab: 'Intention', val: 'Expecting a favour or preferential treatment in return' },
          { lab: 'Answer', val: 'A bribe', final: true }
        ],
        why: 'Your notes say the difference is the intention behind it. A gift comes after the deal with no ' +
             'strings; the timing is the clearest signal of which one you are looking at.'
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
          { lab: 'Utilitarian', val: 'Maximise overall benefits and minimise overall harm' },
          { lab: 'Human rights', val: 'Protect individual rights and dignity' },
          { lab: 'Justice', val: 'Ensure equitable distribution of benefits and burdens' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The weakness of the utilitarian approach is exactly what the other two guard against — your notes ' +
             'note it can justify sacrificing a minority for the benefit of the majority.'
      },
      {
        id: 'i1x-4', type: 'multi', marks: 3,
        prompt: 'Which of these are listed in your notes as ways organisations ensure ethical decisions are made? ' +
                '<b>Select all that apply.</b>',
        options: [
          'Leading by example',
          'A code of ethics',
          'Ethical structures',
          'Whistle-blowing',
          'Raising prices'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Leading by example', val: 'The most powerful tool — it must start with senior management' },
          { lab: 'Code of ethics', val: 'A formal document setting out expected standards' },
          { lab: 'Ethical structures', val: 'Committees, training programmes, an ethics ombudsman' },
          { lab: 'Whistle-blowing', val: 'Reporting illegal or unethical behaviour' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Your notes call leading by example the most powerful of the four: if employees see leaders cutting ' +
             'corners, they conclude that ethics are not a real priority whatever the policy says.'
      },
      {
        id: 'i1x-5', type: 'multi', marks: 3,
        prompt: 'Your notes give examples of <b>ethical structures</b>. Which of these are included? ' +
                '<b>Select all that apply.</b>',
        options: [
          'Ethics committees that review ethical decisions',
          'Ethics training programmes',
          'An ethics ombudsman employees can consult confidentially',
          'An annual profit forecast'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Committees', val: 'Review ethical decisions' },
          { lab: 'Training programmes', val: 'Help employees recognise and resolve ethical issues' },
          { lab: 'Ombudsman', val: 'A confidential, neutral person to go to without fear of retaliation' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'All three are formal systems rather than good intentions. That is the point of the category — ' +
             'they give people a route to take when something is wrong.'
      },
      {
        id: 'i1x-6', type: 'mcq', marks: 2,
        prompt: 'What does your notes’ description of the <b>King Code</b> say about who it applies to?',
        options: [
          'King V now applies to all organisations, including government entities and non-profits',
          'It applies only to companies listed on the JSE',
          'It applies only to private companies',
          'It is optional for every organisation'
        ],
        answer: 0,
        solution: [
          { lab: 'Originally', val: 'Intended for companies listed on the JSE' },
          { lab: 'King V', val: 'Now applies to all organisations, including government and non-profits' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Its core message is good corporate governance — running an organisation responsibly, ' +
             'transparently and with accountability.'
      },
      {
        id: 'i1x-7', type: 'mcq', marks: 2,
        prompt: 'Your notes say whistle-blowing only works under one condition. Which?',
        options: [
          'Whistle-blowers are protected from victimisation, bullying or losing their jobs',
          'The report is made anonymously',
          'The company is listed on the JSE',
          'The wrongdoing is worth more than a set amount'
        ],
        answer: 0,
        solution: [
          { lab: 'The check on misconduct', val: 'Only works if whistle-blowers are protected' },
          { lab: 'Without protection', val: 'No one will ever speak up' },
          { lab: 'Answer', val: 'Whistle-blowers are protected', final: true }
        ],
        why: 'The mechanism is worthless without the protection, which is why it is written into the definition ' +
             'rather than treated as a nice-to-have.'
      }
    ]
  },

  /* ═══════════════════════ CSR AND THE TRIPLE BOTTOM LINE ═══════════════════════ */
  {
    id: 'i1-csr',
    title: 'CSR & The Triple Bottom Line',
    emoji: '🌍',
    summary: 'The four pillars, the three Ps, and the difference between citizenship and investment.',
    notes: [
      {
        heading: 'The four pillars of CSR',
        emoji: '🏛️',
        html:
          '<p>CSR is about how a business meets its needs without harming society or the environment — and ' +
          'ideally, making them better.</p>' +
          '<div class="keybox"><b>1. Environmental</b> · "How do we protect our planet?" Reducing pollution, ' +
          'saving water and electricity, sustainable materials, offsetting carbon.' +
          '<br><b>2. Ethical</b> · "Are we treating everyone fairly?" Fair wages, honesty with customers, ' +
          'dealing ethically with suppliers.' +
          '<br><b>3. Philanthropic</b> · "How are we actively making our community better?" Donations, ' +
          'supporting schools, employee volunteering, foundations.' +
          '<br><b>4. Economic</b> · "Is profit our only goal?" Decisions with positive social and environmental ' +
          'impact even when they do not maximise short-term profit.</div>'
      },
      {
        heading: 'The three Ps',
        emoji: '📊',
        html:
          '<p>For centuries success was measured by profit alone — the bottom line. The <b>Triple Bottom Line</b>, ' +
          'named by <b>John Elkington</b>, proposes three separate bottom lines:</p>' +
          '<div class="keybox"><b>Profit</b> (economic) · is the company financially viable?' +
          '<br><b>Planet</b> (environmental) · its impact on the natural world' +
          '<br><b>People</b> (social) · how it treats employees, customers, suppliers and communities</div>' +
          '<p>The collapse of <b>Steinhoff</b> is the cautionary tale: it looked hugely profitable on paper, but ' +
          'the profit was built on fraudulent accounting while People and Planet were disregarded.</p>' +
          '<p>The TBL aligns with the philosophy of <b>Ubuntu</b> — "I am because we are".</p>'
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
          { lab: 'Environmental', val: 'Pollution, water and electricity, sustainable materials, carbon' },
          { lab: 'Ethical', val: 'Fair wages, honesty with customers, dealing ethically with suppliers' },
          { lab: 'Philanthropic', val: 'Donations, schools, volunteering, foundations' },
          { lab: 'Economic', val: 'Positive impact even at the cost of short-term profit' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'Ethical and philanthropic are the pair that get muddled. Ethical is about how you treat the people ' +
             'you already deal with; philanthropic is about actively giving something back beyond that.'
      },
      {
        id: 'i1c-2', type: 'multi', marks: 3,
        prompt: 'What are the three bottom lines of the Triple Bottom Line? <b>Select all that apply.</b>',
        options: ['Profit', 'Planet', 'People', 'Productivity', 'Property'],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Profit', val: 'Economic — is the company financially viable?' },
          { lab: 'Planet', val: 'Environmental — its impact on the natural world' },
          { lab: 'People', val: 'Social — how it treats everyone it encounters' },
          { lab: 'Answer', val: 'Profit, Planet and People', final: true }
        ],
        why: 'They are often called the three Ps, which is why the two wrong options here also start with P — ' +
             'the letter is not the thing being tested.'
      },
      {
        id: 'i1c-3', type: 'mcq', marks: 2,
        prompt: 'Who named the Triple Bottom Line, according to your notes?',
        options: ['John Elkington', 'Christo Wiese', 'Mervyn King', 'Michael Porter'],
        answer: 0,
        solution: [
          { lab: 'Named by', val: 'John Elkington' },
          { lab: 'The proposal', val: 'Companies measured against three separate bottom lines' },
          { lab: 'Answer', val: 'John Elkington', final: true }
        ],
        why: 'Christo Wiese appears in your notes for his definition of entrepreneurship, and the King Code for ' +
             'corporate governance — different people, different ideas, same week of notes.'
      },
      {
        id: 'i1c-4', type: 'mcq', marks: 3,
        prompt: 'Your notes use Steinhoff as an example of what?',
        options: [
          'Prioritising the illusion of profit over People and Planet',
          'A company excelling at all three bottom lines',
          'Successful whistle-blowing',
          'A necessity entrepreneur succeeding'
        ],
        answer: 0,
        solution: [
          { lab: 'What happened', val: 'It appeared hugely profitable, built on fraudulent accounting' },
          { lab: 'What was disregarded', val: 'Employees, the public, and ethical business practice' },
          { lab: 'Answer', val: 'Prioritising the illusion of profit over People and Planet', final: true }
        ],
        why: 'The word "illusion" matters — the profit was not real. It shows why measuring only one bottom ' +
             'line can hide a company that is about to collapse.'
      },
      {
        id: 'i1c-5', type: 'match', marks: 3,
        prompt: 'Your notes distinguish three related ideas. Match each to its meaning.',
        pairs: [
          { left: 'Corporate social responsibility', right: 'The overarching strategy aligning operations with the well-being of society' },
          { left: 'Corporate citizenship', right: 'Seeing the company as a member of the community, with rights and responsibilities' },
          { left: 'Corporate social investment', right: 'The tangible plan for the specific programmes invested in' }
        ],
        solution: [
          { lab: 'CSR', val: 'The overall strategy' },
          { lab: 'Corporate citizenship', val: 'The mindset — a member of society with duties as well as rights' },
          { lab: 'CSI', val: 'The concrete programmes: sponsoring events, donating bikes, subsidised schemes' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The order is strategy, then mindset, then spend. CSI is the narrowest of the three — it is the ' +
             'actual money going out of the door.'
      },
      {
        id: 'i1c-6', type: 'mcq', marks: 2,
        prompt: 'Which South African philosophy do your notes say the Triple Bottom Line aligns with?',
        options: [
          'Ubuntu — "I am because we are"',
          'The King Code',
          'The National Development Plan',
          'The Bill of Rights'
        ],
        answer: 0,
        solution: [
          { lab: 'Ubuntu', val: '"I am because we are"' },
          { lab: 'Why it fits', val: 'A business’s success is tied to the health of the community it serves' },
          { lab: 'Answer', val: 'Ubuntu', final: true }
        ],
        why: 'The King Code and the NDP both appear in your notes too, but for governance and for job creation ' +
             'respectively — not as the philosophy behind the three Ps.'
      }
    ]
  },

  /* ═══════════════════════ THE BUSINESS ENVIRONMENT ═══════════════════════ */
  {
    id: 'i1-environ',
    title: 'The Business Environment',
    emoji: '🌦️',
    summary: 'What you control, what you can influence, and what you can only prepare for.',
    notes: [
      {
        heading: 'Three environments',
        emoji: '🚢',
        html:
          '<p>Your notes use a ship. The <b>micro environment</b> is your own ship — the engine, crew and ' +
          'navigation. You cannot control the stormy seas (macro) or the other ships (market), but you can make ' +
          'sure your own vessel is seaworthy.</p>' +
          '<div class="keybox"><b>Micro</b> · the internal world of the business, the one part management ' +
          '<b>controls</b>. Gives you strengths and weaknesses.' +
          '<br><b>Market</b> · your immediate competitive arena — customers, competitors, suppliers, ' +
          'intermediaries. Also called the <b>task environment</b>. You cannot control it but you can influence it.' +
          '<br><b>Macro</b> · the wider world. You cannot control or influence it. Gives you opportunities and ' +
          'threats.</div>'
      },
      {
        heading: 'Inside the micro, and PESTLE outside',
        emoji: '🌐',
        html:
          '<p>The micro environment has three main areas: <b>vision, mission and strategy</b>; <b>business ' +
          'functions and structure</b>; and <b>your resources</b> — which are tangible, intangible, or ' +
          'organisational capabilities.</p>' +
          '<div class="keybox"><b>PESTLE</b> — the macro framework' +
          '<br><b>P</b>olitical · <b>E</b>conomic · <b>S</b>ocial · <b>T</b>echnology · <b>L</b>egal · ' +
          '<b>E</b>nvironmental</div>' +
          '<p>Competition within the market environment is analysed with the <b>Five Forces</b> model. A strong ' +
          'force makes an industry <b>less</b> attractive; a weak force makes it <b>more</b> attractive.</p>'
      }
    ],
    questions: [
      {
        id: 'i1n-1', type: 'match', marks: 3,
        prompt: 'Match each environment to how much control management has over it.',
        pairs: [
          { left: 'Micro environment', right: 'Management has control' },
          { left: 'Market environment', right: 'Cannot control, but can influence' },
          { left: 'Macro environment', right: 'Cannot control or influence — only prepare for' }
        ],
        solution: [
          { lab: 'Micro', val: 'The internal world of the business' },
          { lab: 'Market', val: 'Customers, competitors, suppliers and intermediaries' },
          { lab: 'Macro', val: 'The wider world — the weather for your business' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'The ship comparison holds the whole lesson together: your own vessel, the other ships, and the ' +
             'weather. Degree of control is what separates the three.'
      },
      {
        id: 'i1n-2', type: 'multi', marks: 3,
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
          { lab: 'PESTLE stands for', val: 'Political, Economic, Social, Technology, Legal, Environmental' },
          { lab: 'Not in it', val: 'Financial and Psychological — economic already covers the money side' },
          { lab: 'Answer', val: 'Political, Economic, Legal and Environmental', final: true }
        ],
        why: 'Financial is the tempting one, because a business obviously cares about it. But the framework ' +
             'puts that under Economic — inflation, interest rates and growth — rather than giving it its own letter.'
      },
      {
        id: 'i1n-8', type: 'mcq', marks: 2,
        prompt: 'In <b>PESTLE</b>, what do the <b>S</b> and the <b>T</b> stand for?',
        options: [
          'Social and Technology',
          'Strategic and Trade',
          'Structural and Transport',
          'Supplier and Taxation'
        ],
        answer: 0,
        solution: [
          { lab: 'S', val: 'Social' },
          { lab: 'T', val: 'Technology' },
          { lab: 'Answer', val: 'Social and Technology', final: true }
        ],
        why: 'Your notes give technology examples such as AI and the adoption of digital payments — things that ' +
             'change what is possible for a business without anyone in it deciding anything.'
      },
      {
        id: 'i1n-3', type: 'mcq', marks: 2,
        prompt: 'Your notes say the micro environment gives you which pair?',
        options: [
          'Strengths and weaknesses',
          'Opportunities and threats',
          'Profits and losses',
          'Customers and competitors'
        ],
        answer: 0,
        solution: [
          { lab: 'A strength', val: 'An internal capability that gives you an advantage' },
          { lab: 'A weakness', val: 'An internal limitation that places you at a disadvantage' },
          { lab: 'Answer', val: 'Strengths and weaknesses', final: true }
        ],
        why: 'Opportunities and threats come from outside — the macro environment. Internal and external is the ' +
             'whole distinction being drawn here.'
      },
      {
        id: 'i1n-4', type: 'match', marks: 3,
        prompt: 'Match each resource in the micro environment to the example your notes give.',
        pairs: [
          { left: 'Tangible resources', right: 'Machinery, company vehicles, cash in the bank' },
          { left: 'Intangible resources', right: 'A brand name, a patent, a reputation for quality' },
          { left: 'Organisational capabilities', right: 'The ability to roll out a network or run rapid delivery logistics' }
        ],
        solution: [
          { lab: 'Tangible', val: 'Things you can see and touch' },
          { lab: 'Intangible', val: 'Invisible but valuable assets' },
          { lab: 'Capabilities', val: 'Your ability to combine resources effectively' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'A capability is not a thing you own but something you can do — which is why it is listed ' +
             'separately from the assets on the balance sheet.'
      },
      {
        id: 'i1n-5', type: 'mcq', marks: 2,
        prompt: 'In the Five Forces model, what does a <b>strong</b> force mean for an industry?',
        options: [
          'The industry is less attractive',
          'The industry is more attractive',
          'The industry is unaffected',
          'The industry is growing'
        ],
        answer: 0,
        solution: [
          { lab: 'A strong force', val: 'Makes an industry less attractive' },
          { lab: 'A weak force', val: 'Makes an industry more attractive' },
          { lab: 'Answer', val: 'The industry is less attractive', final: true }
        ],
        why: 'It is the intensity of competition being measured. The stronger the forces pressing on you, the ' +
             'harder it is to make money there.'
      },
      {
        id: 'i1n-6', type: 'mcq', marks: 2,
        prompt: 'Which other name do your notes give the <b>market environment</b>?',
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
        why: 'The name is a reminder that although you cannot control customers, competitors or suppliers, ' +
             'dealing with them is squarely management’s job.'
      },
      {
        id: 'i1n-7', type: 'multi', marks: 3,
        prompt: 'Which of these belong to the <b>micro environment</b> as described in your notes? ' +
                '<b>Select all that apply.</b>',
        options: [
          'Vision, mission and strategy',
          'Business functions and structure',
          'The company’s own resources',
          'Interest rates set by the reserve bank',
          'Rival companies competing for the same customers'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'The three areas', val: 'Vision/mission/strategy, functions and structure, and resources' },
          { lab: 'Interest rates', val: 'Macro — economic, and outside anyone’s control' },
          { lab: 'Rivals', val: 'Market environment' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'The test is control. A company writes its own mission and chooses its own structure; it does ' +
             'neither for interest rates or for its competitors.'
      }
    ]
  }

  ]
});
