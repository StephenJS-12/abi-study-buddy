/* INBA01-5 — Week 6: Control.
   Understanding control, the four-step process, inventory and quality control,
   and control in the functional areas.

   The source file ends part-way through Lesson 4, after operations, finance and
   human resources, still showing a "Next" arrow. Marketing and purchasing
   control are covered in the equivalent lessons of Weeks 2 and 4 but were not
   captured here, so they are not written.

   Same rules as the earlier weeks: concepts only, never the analogies used to
   explain them, and nothing written that is not in Abi's notes. */

window.MODULE_CONTENT = window.MODULE_CONTENT || {};
window.MODULE_CONTENT.inba = window.MODULE_CONTENT.inba || { weeks: [], exams: [] };

window.MODULE_CONTENT.inba.weeks.push({
  id: 'inba-week6',
  number: 6,
  title: 'Control',
  emoji: '🎛️',
  accent: 1,
  blurb: 'Checking that what was planned actually happened — and doing something when it did not.',
  topics: [

  /* ═══════════════════════ UNDERSTANDING CONTROL ═══════════════════════ */
  {
    id: 'i6-control',
    title: 'Understanding Control',
    emoji: '🎯',
    summary: 'What control is, the five reasons for it, and what makes a control system effective.',
    notes: [
      {
        heading: 'Defining control',
        emoji: '📖',
        html:
          '<p>Control ensures the organisation reaches the goals it set during planning. It is <b>the process ' +
          'that narrows the gap between what was planned and what was achieved</b>.</p>' +
          '<div class="keybox">Control is "the creation of realistic standards against which the actual ' +
          'performance of the employees and the business can be measured, and whereby any deviations from the ' +
          'business’s standards can be detected in good time. If deviations occur, the necessary corrective ' +
          'steps can be followed to ensure that the set objectives of the business are achieved" ' +
          '(Nieuwenhuizen, 2007).</div>' +
          '<p>Control provides a <b>continuous feedback loop</b>. It is not only about catching mistakes but ' +
          'about learning from them — the feedback informs the next plan, making the whole management process a ' +
          'continuous loop of improvement. A manager performing it asks: <i>Are we hitting our targets? If not, ' +
          'why not, and what do we need to change?</i></p>'
      },
      {
        heading: 'Five reasons for control',
        emoji: '5️⃣',
        html:
          '<div class="keybox"><b>Complete the cycle</b> · control is the link that connects everything. ' +
          'Planning is really the first step of control, because it sets the standards you later measure ' +
          'against. Without control, planning is pointless — you would set a goal with no way of knowing ' +
          'whether you reached it.' +
          '<br><br><b>Cope with change</b> · responding to external change that threatens the business.' +
          '<br><br><b>Limit errors</b> · detecting errors and poor decisions early, before they accumulate and ' +
          'become expensive to fix.' +
          '<br><br><b>Handle complexity</b> · keeping a growing company manageable and spotting weak points ' +
          'such as an underperforming department or a logistical bottleneck.' +
          '<br><br><b>Minimise cost</b> · improving efficiency by monitoring the use of resources, identifying ' +
          'waste and streamlining processes.</div>'
      },
      {
        heading: 'Five characteristics of an effective control system',
        emoji: '✅',
        html:
          '<div class="keybox"><b>Integration with planning</b> · the goals set during planning should be ' +
          'directly convertible into the standards measured during control. You cannot control what you cannot ' +
          'measure.' +
          '<br><b>Flexibility</b> · able to accommodate changes in objectives or unexpected events without ' +
          'needing a complete overhaul.' +
          '<br><b>Accuracy</b> · precise information. A report showing R1 million total profit looks fine, but ' +
          'an accurate system would show that one product line is losing money while another is highly ' +
          'profitable.' +
          '<br><b>Timeliness</b> · supplied regularly and frequently enough for managers to act while it still ' +
          'matters. A daily sales report beats a monthly one.' +
          '<br><b>Simplicity</b> · as simple as possible. The cost of the control system should not exceed the ' +
          'benefits it provides; too much control is demotivating and expensive.</div>'
      }
    ],
    questions: [
      {
        id: 'i6a-1', type: 'mcq', marks: 2,
        prompt: 'Control is best described as the process that:',
        options: [
          'Narrows the gap between what was planned and what was achieved',
          'Defines the goals the organisation will pursue',
          'Arranges people and resources to carry out the plan',
          'Influences employees to contribute voluntarily'
        ],
        answer: 0,
        solution: [
          { lab: 'Control', val: 'Narrows the gap between planned and achieved' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The other three describe planning, organising and leading. Control is the only one that looks ' +
             'backwards at what actually happened.'
      },
      {
        id: 'i6a-2', type: 'multi', marks: 3,
        prompt: 'Which of these are reasons for control? <b>Select all that apply.</b>',
        options: [
          'Complete the managerial cycle',
          'Cope with change',
          'Limit errors',
          'Handle complexity',
          'Minimise cost',
          'Replace the need for planning'
        ],
        answers: [0, 1, 2, 3, 4],
        solution: [
          { lab: 'The five reasons', val: 'Complete the cycle, cope with change, limit errors, handle complexity, minimise cost' },
          { lab: 'Answer', val: 'The first five', final: true }
        ],
        why: 'Control depends on planning rather than replacing it — planning sets the standards that control ' +
             'later measures against.'
      },
      {
        id: 'i6a-3', type: 'multi', marks: 3,
        prompt: 'What are the characteristics of an effective control system? <b>Select all that apply.</b>',
        options: [
          'Integrated with planning',
          'Flexible',
          'Accurate',
          'Timely',
          'Simple',
          'Confidential'
        ],
        answers: [0, 1, 2, 3, 4],
        solution: [
          { lab: 'The five characteristics', val: 'Integrated, flexible, accurate, timely and simple' },
          { lab: 'Answer', val: 'The first five', final: true }
        ],
        why: 'Confidentiality is not among them. A control system exists to inform the managers who must act ' +
             'on it, so restricting who sees it would defeat the purpose.'
      },
      {
        id: 'i6a-4', type: 'match', marks: 4,
        prompt: 'Match each characteristic of an effective control system to what it means.',
        pairs: [
          { left: 'Integration with planning', right: 'Goals set during planning convert directly into measurable standards' },
          { left: 'Flexibility', right: 'Accommodates changed objectives or unexpected events without an overhaul' },
          { left: 'Accuracy', right: 'Gives precise information rather than a misleading headline figure' },
          { left: 'Timeliness', right: 'Arrives frequently enough for managers to act while it still matters' }
        ],
        solution: [
          { lab: 'Integration', val: 'You cannot control what you cannot measure' },
          { lab: 'Flexibility', val: 'A rigid system snaps under pressure' },
          { lab: 'Accuracy', val: 'Breaks a total down far enough to act on' },
          { lab: 'Timeliness', val: 'Late information is useless information' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'Simplicity is the fifth. Together they describe a dashboard — clear, accurate, and giving the ' +
             'right information at the right time.'
      },
      {
        id: 'i6a-5', type: 'mcq', marks: 3,
        prompt: 'Why is planning described as "really the first step of control"?',
        options: [
          'Because planning sets the standards that control later measures against',
          'Because planning happens in the same department as control',
          'Because control must be completed before planning begins',
          'Because both are performed only by top management'
        ],
        answer: 0,
        solution: [
          { lab: 'Planning', val: 'Sets the standards' },
          { lab: 'Control', val: 'Measures actual performance against them' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'It is why the two functions cannot be separated. Without a plan there is no standard, and ' +
             'without control nobody ever learns whether the plan worked.'
      },
      {
        id: 'i6a-6', type: 'mcq', marks: 3,
        prompt: 'Why does <b>simplicity</b> matter in a control system?',
        options: [
          'If it is too cumbersome managers will ignore it, and its cost should not exceed its benefits',
          'Simple systems are always more accurate',
          'Complex systems cannot be automated',
          'Employees are unable to understand detailed data'
        ],
        answer: 0,
        solution: [
          { lab: 'Complexity', val: 'Is the enemy of execution — a cumbersome system gets ignored' },
          { lab: 'And', val: 'Too much control is demotivating and expensive' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Irrelevant information makes demands on management time, which adds cost without adding ' +
             'control. More data is not automatically more control.'
      }
    ]
  },

  /* ═══════════════════════ THE CONTROL PROCESS ═══════════════════════ */
  {
    id: 'i6-process',
    title: 'The Control Process',
    emoji: '🔄',
    summary: 'Four steps from setting the standard to fixing what went wrong.',
    notes: [
      {
        heading: 'The four steps',
        emoji: '4️⃣',
        html:
          '<div class="keybox"><b>1. Establish standards</b> · defining the finish line before the race begins' +
          '<br><b>2. Measure actual performance</b>' +
          '<br><b>3. Evaluate deviations</b>' +
          '<br><b>4. Take corrective action</b></div>' +
          '<p>A <b>performance standard</b> is a planned target against which actual performance can be ' +
          'compared. To be useful it must be <b>relevant</b> to a specific organisational goal, <b>realistic</b> ' +
          'given practical conditions, and <b>attainable</b> with reasonable effort while still being ' +
          'challenging.</p>'
      },
      {
        heading: 'Measuring, evaluating and correcting',
        emoji: '📏',
        html:
          '<p>Measurement must be <b>continuous, quantifiable and reliable</b>. Faulty data produces faulty ' +
          'decisions — garbage in, garbage out.</p>' +
          '<div class="keybox"><b>Control by exception</b> · a management principle where only <b>significant</b> ' +
          'deviations from the standard are brought to the attention of upper management. Lower and middle ' +
          'management handle routine, day-to-day deviations; top management is notified only of major problems ' +
          'or exceptional opportunities.</div>' +
          '<p><b>Evaluating a deviation</b> has two parts. First <b>validate the discrepancy</b> — check the ' +
          'standard is still realistic, since a flawed standard makes the deviation a false signal, and check ' +
          'the measurement data is reliable. Then <b>determine the significance</b> against pre-defined ' +
          'acceptable limits; only deviations outside them warrant a root cause analysis.</p>' +
          '<div class="keybox"><b>Three corrective choices</b>' +
          '<br><b>Improve actual performance</b> · address the root causes' +
          '<br><b>Revise the strategy</b> · change the approach being taken' +
          '<br><b>Adjust the standard</b> · where the standard itself was unrealistic</div>'
      }
    ],
    questions: [
      {
        id: 'i6b-1', type: 'multi', marks: 3,
        prompt: 'What are the four steps of the control process? <b>Select all that apply.</b>',
        options: [
          'Establish standards',
          'Measure actual performance',
          'Evaluate deviations',
          'Take corrective action',
          'Appoint a control manager'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'The four steps', val: 'Establish standards, measure performance, evaluate deviations, take corrective action' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'The order matters as much as the four names. You cannot evaluate a deviation from a standard ' +
             'that was never set.'
      },
      {
        id: 'i6b-2', type: 'mcq', marks: 2,
        prompt: 'A <b>performance standard</b> is:',
        options: [
          'A planned target against which actual performance can be compared',
          'The average performance of employees last year',
          'The maximum output a machine can produce',
          'A legal requirement imposed on the business'
        ],
        answer: 0,
        solution: [
          { lab: 'Performance standard', val: 'A planned target for comparison' },
          { lab: 'Must be', val: 'Relevant, realistic and attainable' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'It comes from the plan rather than from past performance. Using last year’s average as the ' +
             'standard would bake in whatever went wrong last year.'
      },
      {
        id: 'i6b-3', type: 'mcq', marks: 3,
        prompt: 'What is <b>control by exception</b>?',
        options: [
          'Only significant deviations are brought to the attention of upper management',
          'Certain departments are exempted from control',
          'Control is applied only when a problem is reported',
          'Managers may make exceptions to the standards they set'
        ],
        answer: 0,
        solution: [
          { lab: 'Routine deviations', val: 'Handled by lower and middle management' },
          { lab: 'Top management', val: 'Notified only of major problems or exceptional opportunities' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'It exists because managers in a growing company would otherwise drown in data. It is about ' +
             'filtering what reaches the top, not about exempting anyone from control.'
      },
      {
        id: 'i6b-4', type: 'multi', marks: 3,
        prompt: 'What must happen when <b>evaluating a deviation</b>? <b>Select all that apply.</b>',
        options: [
          'Check whether the standard itself is still realistic',
          'Check whether the measurement data is reliable',
          'Determine whether the deviation falls outside pre-defined acceptable limits',
          'Discipline the employee responsible'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Validate', val: 'The standard may be obsolete, or the data may be wrong' },
          { lab: 'Determine significance', val: 'Against pre-defined acceptable limits' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'Skipping validation means the business might invest in solving a problem that does not exist — ' +
             'or blame a team for a standard that was never achievable.'
      },
      {
        id: 'i6b-5', type: 'match', marks: 3,
        prompt: 'Match each corrective action to what it involves.',
        pairs: [
          { left: 'Improve actual performance', right: 'Addressing the root causes of the shortfall' },
          { left: 'Revise the strategy', right: 'Changing the approach being taken to reach the goal' },
          { left: 'Adjust the standard', right: 'Changing the target where it was unrealistic in the first place' }
        ],
        solution: [
          { lab: 'Improve performance', val: 'Fix what is going wrong' },
          { lab: 'Revise strategy', val: 'Try a different route' },
          { lab: 'Adjust standard', val: 'Accept the target was wrong' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'Adjusting the standard is legitimate but easily abused — it is the right answer only when ' +
             'validation showed the standard was genuinely unachievable.'
      },
      {
        id: 'i6b-6', type: 'multi', marks: 3,
        prompt: 'Measurement of actual performance must be: <b>Select all that apply.</b>',
        options: ['Continuous', 'Quantifiable', 'Reliable', 'Confidential'],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Continuous', val: 'Measured often enough to spot a problem while it can still be fixed' },
          { lab: 'Quantifiable', val: 'Hard numbers rather than "runs smoothly"' },
          { lab: 'Reliable', val: 'Trustworthy data — garbage in, garbage out' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'Quantifiable is the one businesses skip. "High motivation" cannot be controlled, but an ' +
             'absenteeism rate or engagement score can.'
      }
    ]
  },

  /* ═══════════════════════ INVENTORY CONTROL ═══════════════════════ */
  {
    id: 'i6-inventory',
    title: 'Inventory Control',
    emoji: '📦',
    summary: 'Why hold stock at all, what it costs, and finding the balance.',
    notes: [
      {
        heading: 'Why organisations hold inventory',
        emoji: '🏬',
        html:
          '<div class="keybox"><b>To meet customer needs and prevent stockouts</b> · products available the ' +
          'moment a customer wants to buy' +
          '<br><b>To ensure smooth operations</b> · a buffer against uncertainty, preventing the manufacturing ' +
          'process from grinding to a halt when a supplier is late or demand spikes' +
          '<br><b>To act as a financial hedge</b></div>' +
          '<p>Holding inventory also allows <b>economies of scale</b> — buying in large volumes earns a volume ' +
          'discount, and producing large batches is often more efficient than small runs.</p>'
      },
      {
        heading: 'The cost of getting it wrong',
        emoji: '⚖️',
        html:
          '<div class="keybox"><b>Too much inventory</b> · increased holding costs for storage space, ' +
          'warehouse staff, insurance and security · risk of <b>obsolescence</b> as products go out of date or ' +
          'spoil · increased risk of damage and theft · capital tied up that could be used elsewhere' +
          '<br><br><b>Too little inventory</b> · running out of a component can shut down the production line ' +
          '· empty shelves mean missed sales and damaged reputation as customers go to a competitor · more ' +
          'frequent orders cost more in shipping and administration · missed volume discounts, so a higher ' +
          'price per unit</div>' +
          '<p>The <b>Economic Order Quantity (EOQ)</b> is the point that minimises total inventory costs, ' +
          'balancing <b>carrying costs</b> (holding it) against <b>ordering costs</b> (buying it). EOQ tells ' +
          'you <b>how much</b> to order — not how to manage the stock day to day.</p>'
      }
    ],
    questions: [
      {
        id: 'i6c-1', type: 'multi', marks: 3,
        prompt: 'Why do organisations hold inventory? <b>Select all that apply.</b>',
        options: [
          'To meet customer needs and prevent stockouts',
          'To ensure smooth operations as a buffer against uncertainty',
          'To act as a financial hedge',
          'To increase the risk of obsolescence'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'The three reasons', val: 'Meeting customer needs, smooth operations, a financial hedge' },
          { lab: 'Obsolescence', val: 'A cost of holding inventory, not a reason for it' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'Obsolescence is one of the risks that makes the decision a balance rather than simply holding as ' +
             'much stock as possible.'
      },
      {
        id: 'i6c-2', type: 'multi', marks: 3,
        prompt: 'What are the costs of holding <b>too much</b> inventory? <b>Select all that apply.</b>',
        options: [
          'Increased holding costs for storage, staff, insurance and security',
          'Risk of obsolescence as products go out of date or spoil',
          'Increased risk of damage and theft',
          'Production lines shutting down for want of components'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Too much', val: 'Holding costs, obsolescence, damage and theft' },
          { lab: 'Shutdowns', val: 'A cost of holding too little' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'The two failure directions have completely different costs, which is why inventory control is a ' +
             'balancing act rather than a minimisation exercise.'
      },
      {
        id: 'i6c-3', type: 'mcq', marks: 3,
        prompt: 'What does the <b>Economic Order Quantity (EOQ)</b> determine?',
        options: [
          'How much to order, at the point where total inventory costs are minimised',
          'When to place each order',
          'Which supplier to buy from',
          'How much stock to hold in reserve'
        ],
        answer: 0,
        solution: [
          { lab: 'EOQ', val: 'The order quantity that minimises total inventory costs' },
          { lab: 'Balancing', val: 'Carrying costs against ordering costs' },
          { lab: 'Answer', val: 'How much to order', final: true }
        ],
        why: 'It answers only the quantity question. How to manage that stock day to day is what the ' +
             'inventory control systems are for.'
      },
      {
        id: 'i6c-4', type: 'match', marks: 3,
        prompt: 'Match each term in the EOQ trade-off to what it describes.',
        pairs: [
          { left: 'Carrying costs', right: 'The cost of holding stock — storage, insurance, security' },
          { left: 'Ordering costs', right: 'The cost of buying stock — shipping and administration per order' },
          { left: 'Economic Order Quantity', right: 'The order size at which the two together are lowest' }
        ],
        solution: [
          { lab: 'Carrying costs', val: 'Rise as you hold more' },
          { lab: 'Ordering costs', val: 'Rise as you order more often' },
          { lab: 'EOQ', val: 'The point where their total is minimised' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'They move in opposite directions, which is what creates a minimum point between them rather ' +
             'than an answer at either extreme.'
      },
      {
        id: 'i6c-5', type: 'multi', marks: 3,
        prompt: 'What are the costs of holding <b>too little</b> inventory? <b>Select all that apply.</b>',
        options: [
          'A component shortage can shut down the production line',
          'Empty shelves mean missed sales and reputational damage',
          'More frequent orders cost more in shipping and administration',
          'Missed volume discounts, so a higher price per unit',
          'Warehouse insurance premiums rise'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'Too little', val: 'Shutdowns, lost sales, higher ordering costs, missed discounts' },
          { lab: 'Insurance', val: 'A holding cost — the penalty for too much' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Running lean is not automatically cheaper. Ordering in small quantities more often costs more ' +
             'per unit and more in administration.'
      }
    ]
  },

  /* ═══════════════════════ INVENTORY SYSTEMS ═══════════════════════ */
  {
    id: 'i6-invsystems',
    title: 'Inventory Control Systems',
    emoji: '⚙️',
    summary: 'Five ways to keep stock at the right level, and what each suits.',
    notes: [
      {
        heading: 'The systems',
        emoji: '🗂️',
        html:
          '<div class="keybox"><b>Fixed-order quantity system</b> · a fixed quantity — the EOQ — is ordered ' +
          'every time, triggered when stock drops to a set <b>reorder point</b>. Ideal for items with stable, ' +
          'predictable demand.' +
          '<br><br><b>Cyclical-ordering system</b> · orders are placed at <b>fixed time intervals</b> but the ' +
          '<b>quantity varies</b> — you check what is left and order enough to return to a maximum level. Best ' +
          'for seasonal or irregular demand you can still plan for.' +
          '<br><br><b>Materials Requirement Planning (MRP)</b> · a computer-based system that starts with the ' +
          'production schedule for finished goods and works <b>backwards</b> to calculate exactly which raw ' +
          'materials and components are needed, and when. Best for complex manufacturing with many parts. Keeps ' +
          'inventory very low but requires extremely reliable suppliers.' +
          '<br><br><b>Just-in-Time (JIT)</b> · aims to hold almost <b>zero inventory</b>. Suppliers deliver ' +
          'materials directly to the production line exactly when needed. Suits high-volume repetitive ' +
          'manufacturing, and does not work without strong supplier alliances and efficient logistics.' +
          '<br><br><b>Quick Response (QR) and Automatic Replenishment (AR)</b> · the retail versions of JIT. ' +
          'Under QR the manufacturer quickly restocks the retailer based on actual sales data; under AR the ' +
          'supplier automatically manages the retailer’s inventory using real-time sales information. ' +
          'Point-of-sale data pulls products through the supply chain. Best for fast-moving consumer goods.</div>'
      },
      {
        heading: 'Efficient Consumer Response',
        emoji: '🔗',
        html:
          '<p><b>ECR</b> is a broader strategy than QR. It aims to make the <b>entire supply chain</b> ' +
          'efficient, from manufacturer to shopper. It relies on <b>electronic data interchange (EDI)</b> to ' +
          'eliminate paperwork and delays, with documents transferred automatically between supply chain ' +
          'participants.</p>' +
          '<p>The goal is to reduce costs and inventory for <b>everyone</b> in the supply chain while improving ' +
          'customer service.</p>'
      }
    ],
    questions: [
      {
        id: 'i6d-1', type: 'match', marks: 4,
        prompt: 'Match each inventory control system to how it works.',
        pairs: [
          { left: 'Fixed-order quantity system', right: 'A fixed quantity is ordered whenever stock hits the reorder point' },
          { left: 'Cyclical-ordering system', right: 'Orders are placed at fixed intervals, with the quantity varying' },
          { left: 'MRP system', right: 'Works backwards from the production schedule to calculate what is needed and when' },
          { left: 'Just-in-Time system', right: 'Materials are delivered to the production line exactly when needed' }
        ],
        solution: [
          { lab: 'Fixed-order quantity', val: 'Same amount, variable timing' },
          { lab: 'Cyclical ordering', val: 'Same timing, variable amount' },
          { lab: 'MRP', val: 'Computer-based, driven by the production schedule' },
          { lab: 'JIT', val: 'Almost zero inventory held' },
          { lab: 'Answer', val: 'All four rows as above', final: true }
        ],
        why: 'The first two are exact mirrors: one fixes the quantity and lets the timing vary, the other ' +
             'fixes the timing and lets the quantity vary.'
      },
      {
        id: 'i6d-2', type: 'mcq', marks: 3,
        prompt: 'Which system suits items with <b>stable, predictable demand</b>?',
        options: [
          'Fixed-order quantity system',
          'Cyclical-ordering system',
          'Just-in-Time system',
          'Efficient Consumer Response'
        ],
        answer: 0,
        solution: [
          { lab: 'Fixed-order quantity', val: 'A set quantity ordered whenever stock hits the reorder point' },
          { lab: 'Suits', val: 'Stable, predictable demand' },
          { lab: 'Answer', val: 'Fixed-order quantity system', final: true }
        ],
        why: 'Predictability is what makes a fixed reorder point safe. With irregular demand the stock could ' +
             'run out long before it reaches that point.'
      },
      {
        id: 'i6d-3', type: 'mcq', marks: 3,
        prompt: 'What does an <b>MRP</b> system do?',
        options: [
          'Works backwards from the production schedule to calculate materials needed and when',
          'Holds a fixed buffer of every component at all times',
          'Orders the same quantity at the same interval regardless of demand',
          'Lets the supplier manage the retailer’s stock levels'
        ],
        answer: 0,
        solution: [
          { lab: 'MRP', val: 'Starts with the schedule for finished goods and works backwards' },
          { lab: 'Trade-off', val: 'Keeps inventory very low, but requires extremely reliable suppliers' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'Working backwards from the finished product is what makes it suit complex manufacturing, where ' +
             'one delayed part can hold up hundreds of others.'
      },
      {
        id: 'i6d-4', type: 'multi', marks: 3,
        prompt: 'What does a <b>Just-in-Time</b> system require to work? <b>Select all that apply.</b>',
        options: [
          'Very reliable suppliers',
          'Efficient logistics',
          'Strong supplier alliances and coordination',
          'Large warehouse capacity'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'JIT', val: 'Aims to hold almost zero inventory' },
          { lab: 'Depends on', val: 'Reliable suppliers, efficient logistics and strong supplier alliances' },
          { lab: 'Answer', val: 'The first three', final: true }
        ],
        why: 'Warehouse capacity is exactly what JIT is designed to make unnecessary. The buffer that stock ' +
             'normally provides is replaced entirely by supplier reliability.'
      },
      {
        id: 'i6d-5', type: 'mcq', marks: 3,
        prompt: 'How does <b>Efficient Consumer Response (ECR)</b> differ from Quick Response?',
        options: [
          'It aims to make the entire supply chain efficient, from manufacturer to shopper',
          'It applies only to manufacturing, not retail',
          'It requires holding more inventory, not less',
          'It replaces electronic data with manual paperwork'
        ],
        answer: 0,
        solution: [
          { lab: 'QR', val: 'The manufacturer restocks the retailer based on sales data' },
          { lab: 'ECR', val: 'A broader strategy covering the whole chain, using electronic data interchange' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The goal is to reduce costs and inventory for everyone in the chain rather than pushing the ' +
             'burden of holding stock onto whichever party has least power.'
      },
      {
        id: 'i6d-6', type: 'mcq', marks: 2,
        prompt: 'Under <b>Automatic Replenishment (AR)</b>, who manages the retailer’s inventory levels?',
        options: [
          'The supplier, using real-time sales information',
          'The retailer, using monthly stock counts',
          'An external auditor',
          'Nobody — stock is ordered manually'
        ],
        answer: 0,
        solution: [
          { lab: 'AR', val: 'The supplier automatically manages the retailer’s inventory' },
          { lab: 'Driven by', val: 'Point-of-sale data pulling products through the supply chain' },
          { lab: 'Answer', val: 'The supplier', final: true }
        ],
        why: 'The sale itself triggers the replacement order. Buying a shirt automatically starts the process ' +
             'that puts another one on the shelf.'
      }
    ]
  },

  /* ═══════════════════════ QUALITY CONTROL ═══════════════════════ */
  {
    id: 'i6-quality',
    title: 'Quality Control, TQM & ISO 9001',
    emoji: '🏅',
    summary: 'Building quality in rather than inspecting it at the end.',
    notes: [
      {
        heading: 'Total Quality Management',
        emoji: '💎',
        html:
          '<p><b>TQM</b> is a management philosophy that aims to satisfy customer needs through high-quality ' +
          'products and services by making <b>every single employee responsible for quality</b>.</p>' +
          '<p>Rather than a separate quality control department inspecting finished products at the end of the ' +
          'line, <b>quality is built into all processes</b> and becomes everyone’s responsibility at every ' +
          'step.</p>' +
          '<div class="keybox"><b>The aims of TQM</b>' +
          '<br><b>Putting the customer first</b> · understanding and meeting customer needs' +
          '<br><b>Involving the entire business</b> · no department is too small; finance, marketing and HR all ' +
          'affect quality' +
          '<br><b>Empowering everyone</b> to be quality-conscious and to fix problems' +
          '<br><b>Focusing on costs of quality</b> · it is cheaper to prevent a mistake than to fix it' +
          '<br><b>Doing it right the first time</b> · being proactive saves time, money and reputation' +
          '<br><b>Creating systems for quality</b> · clear processes and standards' +
          '<br><b>Committing to continuous improvement</b></div>'
      },
      {
        heading: 'ISO 9001:2015',
        emoji: '📜',
        html:
          '<p>An internationally recognised standard for a company’s <b>Quality Management System</b> — a seal ' +
          'of approval showing customers there is a reliable system in place to deliver quality. In South ' +
          'Africa it is known as <b>SANS 9001:2015</b>, administered by the <b>South African Bureau of ' +
          'Standards (SABS)</b>.</p>' +
          '<p>Its goal is to provide social and economic benefits by promoting higher product quality and ' +
          'business integration, overall efficiency and service excellence, and enhanced competitiveness in ' +
          'local and international markets.</p>' +
          '<div class="keybox"><b>The seven core principles</b>' +
          '<br>Customer Focus · Leadership · Engagement of People · Process Approach · Improvement · ' +
          'Evidence-Based Decision Making · Relationship Management</div>'
      }
    ],
    questions: [
      {
        id: 'i6e-1', type: 'mcq', marks: 3,
        prompt: 'What is the central idea of <b>Total Quality Management</b>?',
        options: [
          'Quality is built into all processes and is every employee’s responsibility',
          'A dedicated department inspects finished products before dispatch',
          'Quality problems are corrected once customers report them',
          'Quality is the responsibility of the operations function alone'
        ],
        answer: 0,
        solution: [
          { lab: 'TQM', val: 'Every single employee is responsible for quality' },
          { lab: 'Rather than', val: 'A separate department inspecting at the end of the line' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The second option is exactly what TQM replaces. Inspecting at the end finds defects; building ' +
             'quality in prevents them.'
      },
      {
        id: 'i6e-2', type: 'multi', marks: 3,
        prompt: 'Which of these are aims of TQM? <b>Select all that apply.</b>',
        options: [
          'Putting the customer first',
          'Involving the entire business',
          'Doing it right the first time',
          'Committing to continuous improvement',
          'Reducing the number of employees'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'The aims', val: 'Customer first, whole business involved, empowerment, costs of quality, right first time, systems, continuous improvement' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Involving the entire business is the aim people underestimate — finance, marketing and HR all ' +
             'affect quality even though none of them touches the product.'
      },
      {
        id: 'i6e-3', type: 'mcq', marks: 3,
        prompt: 'What does TQM mean by <b>focusing on costs of quality</b>?',
        options: [
          'It is cheaper to prevent a mistake than to fix it after it happens',
          'Quality should be improved only where it costs nothing',
          'The cheapest supplier should always be chosen',
          'Quality costs should be excluded from the budget'
        ],
        answer: 0,
        solution: [
          { lab: 'The principle', val: 'Prevention is cheaper than correction' },
          { lab: 'Which supports', val: 'Doing it right the first time' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'It is the economic argument for TQM: building quality in looks more expensive up front and is ' +
             'cheaper overall once rework, recalls and lost customers are counted.'
      },
      {
        id: 'i6e-4', type: 'multi', marks: 3,
        prompt: 'Which of these are core principles of ISO 9001:2015? <b>Select all that apply.</b>',
        options: [
          'Customer Focus',
          'Leadership',
          'Engagement of People',
          'Process Approach',
          'Evidence-Based Decision Making',
          'Cost Minimisation'
        ],
        answers: [0, 1, 2, 3, 4],
        solution: [
          { lab: 'The seven principles', val: 'Customer focus, leadership, engagement of people, process approach, improvement, evidence-based decision making, relationship management' },
          { lab: 'Answer', val: 'The first five', final: true }
        ],
        why: 'Improvement and relationship management are the other two. Cost minimisation is not among them ' +
             '— the standard is about a reliable quality system, not a cheap one.'
      },
      {
        id: 'i6e-5', type: 'mcq', marks: 2,
        prompt: 'In South Africa, the ISO 9001:2015 standard is known as:',
        options: [
          'SANS 9001:2015, administered by the SABS',
          'The King Code',
          'The National Quality Standard',
          'BEE 9001'
        ],
        answer: 0,
        solution: [
          { lab: 'SANS 9001:2015', val: 'The South African version of the standard' },
          { lab: 'Administered by', val: 'The South African Bureau of Standards' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The King Code covers corporate governance from Week 1. Different standard, different subject ' +
             'entirely, and both are South African — which is what makes them confusable.'
      },
      {
        id: 'i6e-6', type: 'mcq', marks: 2,
        prompt: 'What does ISO 9001 certify?',
        options: [
          'That the company has a reliable Quality Management System in place',
          'That every product the company makes is defect-free',
          'That the company is financially sound',
          'That the company complies with labour law'
        ],
        answer: 0,
        solution: [
          { lab: 'ISO 9001', val: 'An internationally recognised standard for a Quality Management System' },
          { lab: 'It certifies', val: 'The system, not any individual product' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'The distinction matters. Certification says a reliable process exists, which is a claim about ' +
             'how the company works rather than a guarantee about each item.'
      }
    ]
  },

  /* ═══════════════════════ CONTROL IN THE FUNCTIONAL AREAS ═══════════════════════ */
  {
    id: 'i6-funcontrol',
    title: 'Control in the Functional Areas',
    emoji: '🏢',
    summary: 'Budgets as the financial standard, and how performance is appraised.',
    notes: [
      {
        heading: 'Budgetary control',
        emoji: '💰',
        html:
          '<p>A <b>budget</b> is the most important instrument for financial control — a formal plan that ' +
          'allocates financial resources to different departments and activities. It answers: <i>given our ' +
          'strategy and our limited resources, what is our specific, measurable plan for the upcoming ' +
          'period?</i></p>' +
          '<div class="keybox">A budget connects two management functions:' +
          '<br><b>Planning</b> · allocating limited resources to turn strategy into reality' +
          '<br><b>Control</b> · its most powerful role — the budget becomes the <b>standard</b> against which ' +
          'actual performance is measured</div>' +
          '<p>Budgeting has evolved from <b>top-down</b>, where top management created the budget and told ' +
          'everyone else what to do — demotivating and often out of touch with reality — to <b>participatory</b>, ' +
          'where managers at all levels build their own department’s budgets, which are then consolidated. This ' +
          'creates buy-in and more accurate budgets.</p>' +
          '<div class="keybox"><b>Responsibility centres</b>' +
          '<br><b>Cost centres</b> · measured by cost budgets' +
          '<br><b>Income centres</b> · measured by income budgets and sales revenue' +
          '<br><b>Profit centres</b> · measured by profit budgets and overall profitability</div>'
      },
      {
        heading: 'Controlling human resources',
        emoji: '👥',
        html:
          '<p>A <b>360-degree feedback system</b> gathers feedback from a full circle of sources: the manager, ' +
          'peers, direct reports, and sometimes customers. The employee may also complete a ' +
          '<b>self-appraisal</b>.</p>' +
          '<p>It provides a well-rounded, multi-perspective view of performance, <b>reducing single-person ' +
          'bias</b> and highlighting strengths and blind spots a manager alone might not see.</p>'
      }
    ],
    questions: [
      {
        id: 'i6f-1', type: 'mcq', marks: 3,
        prompt: 'Why is a budget described as connecting <b>planning and control</b>?',
        options: [
          'It is created as a plan and then becomes the standard performance is measured against',
          'It is written by the planning department and read by the control department',
          'It must be approved twice, once for each function',
          'It replaces the need for both functions'
        ],
        answer: 0,
        solution: [
          { lab: 'As a plan', val: 'It allocates limited resources to turn strategy into reality' },
          { lab: 'As control', val: 'It becomes the standard against which actual performance is measured' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'It is the clearest single example of the point made all week: the plan supplies the standard, ' +
             'and without a standard there is nothing to control against.'
      },
      {
        id: 'i6f-2', type: 'match', marks: 3,
        prompt: 'Match each responsibility centre to how its performance is measured.',
        pairs: [
          { left: 'Cost centre', right: 'Against a cost budget' },
          { left: 'Income centre', right: 'Against an income budget and sales revenue' },
          { left: 'Profit centre', right: 'Against a profit budget and overall profitability' }
        ],
        solution: [
          { lab: 'Cost centre', val: 'Judged on what it spends' },
          { lab: 'Income centre', val: 'Judged on what it brings in' },
          { lab: 'Profit centre', val: 'Judged on both together' },
          { lab: 'Answer', val: 'All three rows as above', final: true }
        ],
        why: 'A profit budget cannot be built until the income and cost budgets exist, which is why profit ' +
             'centres carry the widest responsibility of the three.'
      },
      {
        id: 'i6f-3', type: 'mcq', marks: 3,
        prompt: 'How has budgeting evolved, and why?',
        options: [
          'From top-down to participatory, because involving managers creates buy-in and more accurate budgets',
          'From participatory to top-down, because senior managers see the whole picture',
          'From annual to daily, because conditions change faster',
          'It has not changed'
        ],
        answer: 0,
        solution: [
          { lab: 'Top-down', val: 'Demotivating and often out of touch with reality' },
          { lab: 'Participatory', val: 'Managers at all levels build their own budgets, then consolidate' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'It is the same principle as goal-setting theory from Week 5: commitment comes from ' +
             'collaboration on the target rather than from being handed one.'
      },
      {
        id: 'i6f-4', type: 'multi', marks: 3,
        prompt: 'From whom does a <b>360-degree feedback</b> system gather feedback? <b>Select all that apply.</b>',
        options: [
          'The manager',
          'Peers',
          'Direct reports',
          'Sometimes customers',
          'Competitors'
        ],
        answers: [0, 1, 2, 3],
        solution: [
          { lab: 'The full circle', val: 'Manager, peers, direct reports and sometimes customers' },
          { lab: 'Plus', val: 'The employee may complete a self-appraisal' },
          { lab: 'Answer', val: 'The first four', final: true }
        ],
        why: 'Direct reports are the source that makes it a full circle. Feedback that only travels downwards ' +
             'is just an ordinary appraisal.'
      },
      {
        id: 'i6f-5', type: 'mcq', marks: 3,
        prompt: 'What is the main advantage of 360-degree feedback?',
        options: [
          'It reduces single-person bias and highlights blind spots a manager might not see',
          'It is quicker than a standard appraisal',
          'It removes the need for performance standards',
          'It guarantees a positive review'
        ],
        answer: 0,
        solution: [
          { lab: 'Multi-perspective', val: 'A well-rounded view of performance' },
          { lab: 'Which reduces', val: 'The bias of relying on one person’s judgement' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'A manager sees only part of how someone works. Peers and direct reports see the parts the ' +
             'manager is not present for.'
      },
      {
        id: 'i6f-6', type: 'mcq', marks: 2,
        prompt: 'What is a <b>budget</b>?',
        options: [
          'A formal plan that allocates financial resources to departments and activities',
          'A record of money already spent',
          'A forecast of the share price',
          'A legal document filed with the regulator'
        ],
        answer: 0,
        solution: [
          { lab: 'A budget', val: 'A plan expressed in numbers — a financial roadmap' },
          { lab: 'Answer', val: 'The first option', final: true }
        ],
        why: 'It looks forward rather than back. A record of past spending is accounting; a budget is the ' +
             'plan that spending will later be measured against.'
      }
    ]
  }

  ]
});
