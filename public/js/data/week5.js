/* Week 5 — Present value, and terms that change partway through

   Three lessons, exactly as Milpark lists them:
     1. Determining the present value (PV) of a future accumulated amount
     2. Changes during a term — interest rates
     3. Changes during a term — additional amounts

   ON THE NUMBERS

   Every figure was calculated independently before it was written down, and
   the two-step answers in Lesson 3 were checked a second time by discounting
   each cash flow on its own — a different route to the same answer.

   Two rounding quirks in the source notes are deliberately kept and taught
   rather than quietly corrected, because Abi will hit both in the exam:

     * Lesson 1 prints PV = R578 402 by hand and R578 397 on the calculator.
       The R5 gap is rounding between the steps. Both are accepted.
     * The Lesson 1 exercise writes i as 0.0142 but then works with the
       unrounded 0.0141666… If you take 0.0142 literally you get R356 454
       instead of R356 735 — a R281 error from one decimal place. */

window.WEEK_DATA = window.WEEK_DATA || [];

window.WEEK_DATA.push({
  id: 'week5',
  number: 5,
  title: 'Present Value & Changing Terms',
  emoji: '🕰️',
  accent: 5,
  blurb: 'Working backwards to what money is worth today, and handling rate changes and extra payments partway through a term.',
  topics: [

  /* ═══════════════════════ FINDING THE PRESENT VALUE ═══════════════════════ */
  {
    id: 'w5-pv',
    title: 'Finding the Present Value',
    emoji: '⏪',
    summary: 'Turning the compound interest formula around to work backwards from a future amount.',
    notes: [
      {
        heading: 'The same formula, read the other way',
        emoji: '🔁',
        html:
          '<p>Week 4 answered one question: <i>if I invest this much today, what will it be worth later?</i> ' +
          'Week 5 asks the opposite one: <i>how much do I need today to end up with that amount later?</i></p>' +
          '<p>There is no new formula. It is the same one, rearranged.</p>' +
          '<div class="keybox">FV = PV(1 + <span class="math">i</span>)<sup>n</sup><br><br>' +
          'Divide both sides by (1 + <span class="math">i</span>)<sup>n</sup>:<br><br>' +
          '<b>PV = FV ÷ (1 + <span class="math">i</span>)<sup>n</sup></b></div>' +
          '<p>Going forwards is called <b>accumulating</b>. Going backwards is called <b>discounting</b>. ' +
          'Because (1 + <span class="math">i</span>)<sup>n</sup> is always bigger than 1, dividing by it always ' +
          'makes the number smaller — so <b>the present value is always less than the future value</b>. ' +
          'If yours comes out bigger, you multiplied when you should have divided.</p>'
      },
      {
        heading: 'Three things to find before you start',
        emoji: '🧭',
        html:
          '<p>Every one of these questions is the same three steps before any arithmetic happens.</p>' +
          '<ul class="tickly">' +
          '<li><b>m</b> — how many times a year interest is compounded. Read it off the words: yearly = 1, ' +
          'half-yearly = 2, quarterly = 4, bi-monthly = 6, monthly = 12.</li>' +
          '<li><b><span class="math">i</span></b> — the rate for <i>one</i> period, which is the quoted annual ' +
          'rate divided by m.</li>' +
          '<li><b>n</b> — the number of periods, which is the term in years multiplied by m.</li>' +
          '</ul>' +
          '<div class="watchout"><b>"Bi-monthly" in this module means six times a year</b> — every two months — ' +
          'not twice a month. It is the one that catches people out.</div>'
      },
      {
        heading: 'Worked example — the coffee-stained loan',
        emoji: '☕',
        html:
          '<p>E-Bike SA has a loan agreement where the amount borrowed has been spilled on and is unreadable. ' +
          'What is still legible: the term is 5 years, the rate is 11% per annum compounded monthly, and a single ' +
          'repayment of R1 000 000 is due at the end. How much was borrowed?</p>' +
          '<div class="worked"><div class="worked-title">PV of R1 000 000, i<sup>(12)</sup> = 11% p.a., 5 years</div>' +
          '<div class="solstep"><div class="solstep-lab">m</div><div class="solstep-val">Compounded monthly, so 12</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Rate per period (<span class="math">i</span>)</div>' +
          '<div class="solstep-val">11% ÷ 12 = 0.9167% = 0.009167</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Periods (n)</div><div class="solstep-val">5 years × 12 = 60</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Formula</div>' +
          '<div class="solstep-val">PV = FV ÷ (1 + <span class="math">i</span>)<sup>n</sup></div></div>' +
          '<div class="solstep"><div class="solstep-lab">Substitute</div>' +
          '<div class="solstep-val">R1 000 000 ÷ (1.009167)<sup>60</sup></div></div>' +
          '<div class="solstep"><div class="solstep-lab">Apply the power</div>' +
          '<div class="solstep-val">(1.009167)<sup>60</sup> = 1.728916</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Present value</div>' +
          '<div class="solstep-val">R578 397</div></div></div>' +
          '<p>So Ventcap SA lent E-Bike SA about <b>R578 397</b>, and the other R421 603 of that R1 000 000 ' +
          'repayment is interest.</p>'
      },
      {
        heading: 'Exercise — R500 000 in four years',
        emoji: '🎯',
        html:
          '<p><i>How much must you invest today to have R500 000 after 4 years, at a nominal 8.5% per annum ' +
          'compounded bi-monthly?</i></p>' +
          '<div class="worked"><div class="worked-title">Solution</div>' +
          '<div class="solstep"><div class="solstep-lab">m</div><div class="solstep-val">Bi-monthly, so 6</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Rate per period</div>' +
          '<div class="solstep-val">8.5% ÷ 6 = 1.41667% = 0.0141667</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Periods</div><div class="solstep-val">4 years × 6 = 24</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Apply the power</div>' +
          '<div class="solstep-val">(1.0141667)<sup>24</sup> = 1.4016</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Present value</div>' +
          '<div class="solstep-val">R500 000 ÷ 1.4016 = R356 735</div></div></div>' +
          '<div class="watchout"><b>Do not round the rate.</b> The notes write this rate as 0.0142, but they then ' +
          'calculate with the full 0.0141666… If you actually use 0.0142 you get (1.0142)<sup>24</sup> = 1.4027 and ' +
          'an answer of R356 454 — <b>R281 out</b>, from one decimal place. Keep the rate in your calculator, or ' +
          'carry at least six decimals.</div>'
      }
    ],
    questions: [
      {
        id: 'w5p1', type: 'mcq', marks: 2,
        prompt: 'Starting from FV = PV(1 + <span class="math">i</span>)<sup>n</sup>, how do you make PV the subject?',
        options: [
          'Divide the future value by (1 + i)ⁿ',
          'Multiply the future value by (1 + i)ⁿ',
          'Subtract (1 + i)ⁿ from the future value',
          'Divide the future value by n'
        ],
        answer: 0,
        solution: [
          { lab: 'Start', val: 'FV = PV(1 + i)ⁿ' },
          { lab: 'PV is multiplied by the bracket', val: 'So undo it by dividing' },
          { lab: 'Answer', val: 'PV = FV ÷ (1 + i)ⁿ', final: true }
        ],
        why: 'This is the only algebra in the whole week. Everything else is deciding what m, i and n are.'
      },
      {
        id: 'w5p2', type: 'mcq', marks: 2,
        prompt: 'An amount is invested for 4 years at a nominal rate compounded <b>bi-monthly</b>. What is n?',
        options: ['24', '8', '48', '4'],
        answer: 0,
        solution: [
          { lab: 'Bi-monthly', val: 'Every two months, so 6 times a year' },
          { lab: 'n = term × m', val: '4 years × 6' },
          { lab: 'Answer', val: 'n = 24', final: true }
        ],
        why: '8 is what you get if you read bi-monthly as twice a year, and 48 if you read it as twice a month. Neither is what this module means.'
      },
      {
        id: 'w5p3', type: 'numeric', marks: 3,
        prompt: 'You have R33 581 in a savings account today. The quoted nominal rate was 10% per year compounded <b>quarterly</b>. You deposited a single lump sum 5 years ago and have neither added to it nor withdrawn from it since. What did you deposit? (Round to the nearest Rand.)',
        pre: 'R', answer: 20494, tol: 2,
        solution: [
          { lab: 'Identify', val: 'FV = R33 581, m = 4, term = 5 years' },
          { lab: 'Rate per period', val: '10% ÷ 4 = 2.5% = 0.025' },
          { lab: 'Periods', val: '5 × 4 = 20' },
          { lab: 'Apply the power', val: '(1.025)²⁰ = 1.638616' },
          { lab: 'Answer', val: 'R33 581 ÷ 1.638616 = R20 494', final: true }
        ],
        why: 'The wording matters: "have not since withdrawn or added money" is what tells you a single PV/FV calculation is enough. If there had been a movement, you would need the two-step method from Lesson 3.'
      },
      {
        id: 'w5p4', type: 'numeric', marks: 3,
        prompt: 'You have R8 080 in a savings account today, at a quoted nominal 15% per year compounded <b>monthly</b>. You deposited a single lump sum 6 months ago and have not touched the account since. What did you deposit? (Round to the nearest Rand.)',
        pre: 'R', answer: 7500, tol: 2,
        solution: [
          { lab: 'Identify', val: 'FV = R8 080, m = 12, term = 6 months' },
          { lab: 'Rate per period', val: '15% ÷ 12 = 1.25% = 0.0125' },
          { lab: 'Periods', val: '6 months is 6 monthly periods, so n = 6' },
          { lab: 'Apply the power', val: '(1.0125)⁶ = 1.077383' },
          { lab: 'Answer', val: 'R8 080 ÷ 1.077383 = R7 500', final: true }
        ],
        why: 'The term here is given in months, not years, so there is no multiplying to do — n is just 6. Watch for that; converting 6 months to 0.5 years and then multiplying by 12 gets you to the same place, but the shortcut is safer.'
      },
      {
        id: 'w5p5', type: 'numeric', marks: 3,
        prompt: 'You have R62 954 in a savings account today, at a quoted nominal 8% per year compounded <b>yearly</b>. You deposited a single lump sum 12 years ago and have not touched it since. What did you deposit? (Round to the nearest Rand.)',
        pre: 'R', answer: 25000, tol: 2,
        solution: [
          { lab: 'Identify', val: 'FV = R62 954, m = 1, term = 12 years' },
          { lab: 'Rate per period', val: '8% ÷ 1 = 0.08' },
          { lab: 'Periods', val: '12 × 1 = 12' },
          { lab: 'Apply the power', val: '(1.08)¹² = 2.51817' },
          { lab: 'Answer', val: 'R62 954 ÷ 2.51817 = R25 000', final: true }
        ],
        why: 'A clean R25 000 is a good sign you got it right. Check it by going forwards: R25 000 × 2.51817 = R62 954.'
      },
      {
        id: 'w5p6', type: 'steps', marks: 5,
        scenario: 'You want R500 000 available in 4 years. A fixed deposit pays a nominal 8.5% per annum compounded <b>bi-monthly</b>.',
        prompt: 'Work out how much you need to invest today.',
        steps: [
          {
            q: 'How many interest periods are there in a year (m)?',
            answer: 6, tol: 0.01,
            explain: 'Bi-monthly means every two months, so six times a year.'
          },
          {
            q: 'What is the interest rate per period, as a decimal? Give at least four decimal places.',
            answer: 0.014167, tol: 0.0001,
            explain: '8.5% ÷ 6 = 1.416666…%, which as a decimal is 0.0141666… Do not shorten this to 0.0142.'
          },
          {
            q: 'Calculate (1 + i)ⁿ, to four decimal places.',
            answer: 1.4016, tol: 0.0015,
            explain: 'n = 4 × 6 = 24, so (1.0141667)²⁴ = 1.4016.'
          },
          {
            q: 'Now calculate the present value, to the nearest Rand.',
            pre: 'R', answer: 356735, tol: 3,
            explain: 'R500 000 ÷ 1.4016 = R356 735.'
          }
        ],
        solution: [
          { lab: 'm, i, n', val: '6, 0.0141667, 24' },
          { lab: 'Formula', val: 'PV = FV ÷ (1 + i)ⁿ' },
          { lab: 'Substitute', val: 'R500 000 ÷ (1.0141667)²⁴' },
          { lab: 'Apply the power', val: 'R500 000 ÷ 1.4016' },
          { lab: 'Present value', val: 'R356 735', final: true }
        ],
        why: 'Rounding the rate to 0.0142 at step 2 would give R356 454 at step 4 — R281 out. This is exactly why the module keeps telling you not to round between steps.'
      },
      {
        id: 'w5p7', type: 'mcq', marks: 2,
        prompt: 'You calculate a present value and get an answer <b>larger</b> than the future value you started with. What has gone wrong?',
        options: [
          'You multiplied by (1 + i)ⁿ instead of dividing by it',
          'Nothing — this happens when the rate is high enough',
          'You used too many decimal places in the rate',
          'Nothing — this happens when the term is longer than ten years'
        ],
        answer: 0,
        solution: [
          { lab: 'The bracket', val: '(1 + i)ⁿ is always greater than 1 for a positive rate' },
          { lab: 'Dividing by it', val: 'Always makes the number smaller' },
          { lab: 'So', val: 'PV < FV, always' },
          { lab: 'Answer', val: 'You multiplied instead of dividing', final: true }
        ],
        why: 'This is the fastest reasonability check in the whole topic, and it costs you nothing. Money today is worth more than the same amount later, so the amount you need today must be smaller.'
      }
    ]
  },

  /* ═══════════════════════ PV ON THE CALCULATOR ═══════════════════════ */
  {
    id: 'w5-pvcalc',
    title: 'Present Value on the Calculator',
    emoji: '🧮',
    summary: 'The keystrokes for PV, the sign convention, and why the calculator disagrees with your pen by R5.',
    notes: [
      {
        heading: 'The keystrokes',
        emoji: '⌨️',
        html:
          '<p>Same loan as the last topic: R1 000 000 due in 5 years, 11% per annum compounded monthly.</p>' +
          '<div class="tablewrap"><table class="dtable">' +
          '<tr><th>Step</th><th>Keys</th><th>What it does</th></tr>' +
          '<tr><td>1</td><td>Clear all</td><td>Wipes the TVM registers, so nothing left over from the last question is used</td></tr>' +
          '<tr><td>2</td><td>12 → P/YR</td><td>Sets periods per year to 12, because interest compounds monthly</td></tr>' +
          '<tr><td>3</td><td>1 000 000 +/− → FV</td><td>Stores the amount to be paid out, as a negative</td></tr>' +
          '<tr><td>4</td><td>5 → xP/YR</td><td>Converts 5 years into 60 periods and stores it as n</td></tr>' +
          '<tr><td>5</td><td>11 → I/YR</td><td>Stores the <b>nominal annual</b> rate — 11, not 0.9167</td></tr>' +
          '<tr><td>6</td><td>PV</td><td>Displays 578 397</td></tr>' +
          '</table></div>' +
          '<div class="watchout"><b>Step 5 takes the annual rate, not the periodic one.</b> The calculator already ' +
          'knows P/YR = 12, so it divides for you. Entering 0.9167 here would treat it as 0.9167% <i>per year</i>.</div>'
      },
      {
        heading: 'Why one number is negative',
        emoji: '➖',
        html:
          '<p>A financial calculator needs money to move in both directions before it will solve anything. That is ' +
          'the <b>sign convention</b>: cash you <i>receive</i> is positive, cash you <i>pay out</i> is negative.</p>' +
          '<p>In this loan, E-Bike SA receives the loan at the start and pays R1 000 000 back at the end — so FV goes ' +
          'in negative and PV comes out positive. If you enter both as positives, the calculator has nothing to ' +
          'balance and will return an error rather than an answer.</p>' +
          '<div class="keybox"><b>xP/YR</b> saves you a multiplication. Press <b>5 xP/YR</b> and it turns 5 years into ' +
          'n = 60 using the P/YR you already set. It is not a separate rule — just the "n = term × m" step done for you.</div>'
      },
      {
        heading: 'The R5 that is meant to be there',
        emoji: '🔍',
        html:
          '<p>Work that loan by hand and you get R578 402. Work it on the calculator and you get R578 397. The notes ' +
          'flag the gap themselves — and it is not an error in either method.</p>' +
          '<div class="worked"><div class="worked-title">Where the R5 comes from</div>' +
          '<div class="solstep"><div class="solstep-lab">By hand</div>' +
          '<div class="solstep-val">(1.009167)<sup>60</sup> written down as 1.7289, then R1 000 000 ÷ 1.7289 = R578 402</div></div>' +
          '<div class="solstep"><div class="solstep-lab">The real factor</div>' +
          '<div class="solstep-val">1.728916…, carried on to many more decimals</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">On the calculator</div>' +
          '<div class="solstep-val">R1 000 000 ÷ 1.728916… = R578 397</div></div></div>' +
          '<p>You rounded to four decimal places partway through; the calculator did not round at all. On a ' +
          'R1 000 000 loan that shows up as R5.</p>' +
          '<div class="watchout"><b>Both answers earn full marks in this module</b> as long as your method is shown. ' +
          'But the lesson generalises: the bigger the amount, the more a rounded intermediate costs you. Round once, ' +
          'at the end.</div>'
      }
    ],
    questions: [
      {
        id: 'w5c1', type: 'mcq', marks: 2,
        prompt: 'Calculating the present value of a R1 000 000 loan by hand gives R578 402, but the financial calculator gives R578 397. Why?',
        options: [
          'The hand calculation rounded (1 + i)ⁿ partway through; the calculator did not round at all',
          'The calculator uses simple interest rather than compound interest',
          'The calculator adds a small fee to every present value',
          'The hand calculation used the wrong number of periods'
        ],
        answer: 0,
        solution: [
          { lab: 'By hand', val: '(1.009167)⁶⁰ written as 1.7289' },
          { lab: 'Actually', val: '1.728916…' },
          { lab: 'Effect', val: 'Dividing R1 000 000 by a slightly smaller number gives a slightly larger answer' },
          { lab: 'Answer', val: 'Rounding between the steps', final: true }
        ],
        why: 'Neither answer is wrong here. But notice the direction: rounding the factor down pushed the present value up. On bigger amounts the gap grows in proportion.'
      },
      {
        id: 'w5c2', type: 'numeric', marks: 3,
        prompt: 'A single repayment of R1 000 000 is due in 5 years. Interest is a nominal 11% per annum compounded monthly. Calculate the amount borrowed, to the nearest Rand.',
        pre: 'R', answer: 578397, tol: 6,
        solution: [
          { lab: 'Identify', val: 'FV = R1 000 000, m = 12, term = 5 years' },
          { lab: 'Rate per period', val: '11% ÷ 12 = 0.009167' },
          { lab: 'Periods', val: '5 × 12 = 60' },
          { lab: 'Apply the power', val: '(1.009167)⁶⁰ = 1.728916' },
          { lab: 'Answer', val: 'R1 000 000 ÷ 1.728916 = R578 397', final: true }
        ],
        why: 'R578 402 is accepted too — that is what you get rounding the factor to 1.7289 first. Both are marked correct here, but get into the habit of the unrounded one.'
      },
      {
        id: 'w5c3', type: 'mcq', marks: 2,
        prompt: 'Setting P/YR to 12, what does pressing <b>5 xP/YR</b> do?',
        options: [
          'Works out n as 5 × 12 = 60 and stores it',
          'Sets the interest rate to 5% per year',
          'Divides the interest rate by 5',
          'Sets the number of years to 5 and leaves n alone'
        ],
        answer: 0,
        solution: [
          { lab: 'P/YR is already 12', val: 'The calculator knows how many periods a year holds' },
          { lab: 'xP/YR takes years', val: 'And multiplies by P/YR' },
          { lab: 'Answer', val: 'n = 60', final: true }
        ],
        why: 'It is the "n = term × m" step, automated. If you would rather do it yourself, enter 60 straight into n instead — same result.'
      },
      {
        id: 'w5c4', type: 'mcq', marks: 2,
        prompt: 'On a financial calculator, why is the R1 000 000 entered as a <b>negative</b> future value?',
        options: [
          'Because it is money being paid out, and the calculator needs at least one inflow and one outflow',
          'Because future values are always negative',
          'Because the loan is a liability rather than an asset',
          'Because the answer must come out positive'
        ],
        answer: 0,
        solution: [
          { lab: 'Sign convention', val: 'Money received is positive, money paid out is negative' },
          { lab: 'This loan', val: 'Received at the start, repaid at the end' },
          { lab: 'So', val: 'PV positive, FV negative' },
          { lab: 'Answer', val: 'It is an outflow, and the calculator needs both directions', final: true }
        ],
        why: 'Entering both as positive is the single most common reason the calculator returns an error instead of a number.'
      },
      {
        id: 'w5c5', type: 'mcq', marks: 2,
        prompt: 'On the I/YR key, which figure do you enter for a nominal rate of 11% per annum compounded monthly, with P/YR set to 12?',
        options: ['11', '0.9167', '0.11', '132'],
        answer: 0,
        solution: [
          { lab: 'I/YR', val: 'Wants the nominal annual rate' },
          { lab: 'P/YR is already 12', val: 'The calculator does the ÷ 12 itself' },
          { lab: 'Answer', val: 'Enter 11', final: true }
        ],
        why: 'Entering 0.9167 tells it the rate is 0.9167% a year, which is where wildly wrong answers usually come from. The one place you enter the periodic rate is when working by hand.'
      },
      {
        id: 'w5c6', type: 'mcq', marks: 2,
        prompt: 'What is the practical rule the R5 difference is teaching?',
        options: [
          'Round once, at the end — carrying rounded intermediates into later steps compounds the error',
          'Always use the financial calculator and never the formula',
          'Always round every intermediate to four decimal places for consistency',
          'The formula and the calculator use different mathematics, so the answers will never match'
        ],
        answer: 0,
        solution: [
          { lab: 'Cause', val: 'A factor rounded at 4 decimals, then divided into R1 000 000' },
          { lab: 'Scale', val: 'A tiny relative error on a large amount is a visible Rand amount' },
          { lab: 'Answer', val: 'Round once, at the end', final: true }
        ],
        why: 'The formula and the calculator use identical mathematics — the only difference is when the rounding happens. That matters more in Lesson 3, where you feed one answer into the next calculation.'
      }
    ]
  },

  /* ═══════════════════════ FV WITH A RATE CHANGE ═══════════════════════ */
  {
    id: 'w5-ratefv',
    title: 'Future Value When the Rate Changes',
    emoji: '🔀',
    summary: 'Splitting a term into two "mini-investments" when the interest rate changes partway through.',
    notes: [
      {
        heading: 'Two mini-investments, back to back',
        emoji: '✂️',
        html:
          '<p>FV = PV(1 + <span class="math">i</span>)<sup>n</sup> assumes one rate for the whole term. When the ' +
          'rate changes partway through, that assumption breaks — so you cut the term at the date it changes and ' +
          'treat each piece as its own investment.</p>' +
          '<ul class="tickly">' +
          '<li><b>Step 1</b> — accumulate from the start to the date of the change. Call the answer FV<sub>interim</sub>.</li>' +
          '<li><b>Step 2</b> — use FV<sub>interim</sub> as the PV of the second piece and accumulate to the end.</li>' +
          '</ul>' +
          '<div class="watchout"><b>You cannot average the two rates.</b> Averaging 8% and 10% to 9% ignores the fact ' +
          'that the two rates apply to different amounts of money for different lengths of time. It is only right by ' +
          'accident, and usually not even then.</div>'
      },
      {
        heading: 'Worked example — R15 000 over five years',
        emoji: '💼',
        html:
          '<p>R15 000 is invested for 5 years. It earns a nominal 8% per annum compounded half-yearly for the first ' +
          '2 years, then 10% per annum compounded half-yearly for the remaining 3 years.</p>' +
          '<div class="worked"><div class="worked-title">Step 1 — the first 2 years</div>' +
          '<div class="solstep"><div class="solstep-lab">Rate per period</div>' +
          '<div class="solstep-val">8% ÷ 2 = 4% = 0.04</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Periods</div><div class="solstep-val">2 years × 2 = 4</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Apply the power</div>' +
          '<div class="solstep-val">(1.04)<sup>4</sup> = 1.169859</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">FV<sub>interim</sub></div>' +
          '<div class="solstep-val">R15 000 × 1.169859 = R17 548</div></div></div>' +
          '<div class="worked"><div class="worked-title">Step 2 — the remaining 3 years</div>' +
          '<div class="solstep"><div class="solstep-lab">New PV</div>' +
          '<div class="solstep-val">R17 548, the interim value</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Rate per period</div>' +
          '<div class="solstep-val">10% ÷ 2 = 5% = 0.05</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Periods</div><div class="solstep-val">3 years × 2 = 6</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Apply the power</div>' +
          '<div class="solstep-val">(1.05)<sup>6</sup> = 1.340096</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Future value</div>' +
          '<div class="solstep-val">R17 548 × 1.340096 = R23 516</div></div></div>'
      },
      {
        heading: 'The same thing on one line',
        emoji: '🧵',
        html:
          '<p>Because step 2 just multiplies step 1 by another growth factor, you can chain them:</p>' +
          '<div class="keybox"><b>FV = PV(1 + <span class="math">i</span><sub>1</sub>)<sup>n₁</sup> ' +
          '(1 + <span class="math">i</span><sub>2</sub>)<sup>n₂</sup></b></div>' +
          '<div class="math-block">R15 000 × (1.04)<sup>4</sup> × (1.05)<sup>6</sup> = R23 516</div>' +
          '<p>Identical answer, and it avoids rounding in the middle. Use whichever you prefer — but if a question ' +
          'says "round all your answers, interim and final", it wants the two-step version and its interim figure ' +
          'shown. Those two routes can differ by a Rand, and that is expected.</p>'
      },
      {
        heading: 'Exercise — R1 000 over four years',
        emoji: '🎯',
        html:
          '<p><i>R1 000 is deposited into a 4-year fixed deposit. It earns a nominal 7.5% per annum compounded ' +
          'bi-monthly for the first year, then 8.5% per annum compounded bi-monthly for the rest of the term.</i></p>' +
          '<div class="worked"><div class="worked-title">Solution</div>' +
          '<div class="solstep"><div class="solstep-lab">Year 1 rate</div>' +
          '<div class="solstep-val">7.5% ÷ 6 = 0.0125, n₁ = 1 × 6 = 6</div></div>' +
          '<div class="solstep"><div class="solstep-lab">FV<sub>interim</sub></div>' +
          '<div class="solstep-val">R1 000 × (1.0125)<sup>6</sup> = R1 000 × 1.077383 = R1 077</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Years 2–4 rate</div>' +
          '<div class="solstep-val">8.5% ÷ 6 = 0.0141667, n₂ = 3 × 6 = 18</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Apply the power</div>' +
          '<div class="solstep-val">(1.0141667)<sup>18</sup> = 1.288155</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Future value</div>' +
          '<div class="solstep-val">R1 077 × 1.288155 = R1 387</div></div></div>'
      }
    ],
    questions: [
      {
        id: 'w5rf1', type: 'numeric', marks: 3,
        prompt: 'R15 000 is invested at a nominal 8% per annum compounded half-yearly. What is it worth after 2 years, to the nearest Rand?',
        pre: 'R', answer: 17548, tol: 2,
        solution: [
          { lab: 'Rate per period', val: '8% ÷ 2 = 0.04' },
          { lab: 'Periods', val: '2 × 2 = 4' },
          { lab: 'Apply the power', val: '(1.04)⁴ = 1.169859' },
          { lab: 'Answer', val: 'R15 000 × 1.169859 = R17 548', final: true }
        ],
        why: 'This is the FV_interim of the worked example — the value on the day the rate changes. Everything in step 2 depends on getting this right first.'
      },
      {
        id: 'w5rf2', type: 'numeric', marks: 4,
        prompt: 'Continuing that investment: the R17 548 now earns a nominal 10% per annum compounded half-yearly for a further 3 years. What is the value at the end of the full 5-year term, to the nearest Rand?',
        pre: 'R', answer: 23516, tol: 3,
        solution: [
          { lab: 'New PV', val: 'R17 548' },
          { lab: 'Rate per period', val: '10% ÷ 2 = 0.05' },
          { lab: 'Periods', val: '3 × 2 = 6' },
          { lab: 'Apply the power', val: '(1.05)⁶ = 1.340096' },
          { lab: 'Answer', val: 'R17 548 × 1.340096 = R23 516', final: true }
        ],
        why: 'The one-line version R15 000 × (1.04)⁴ × (1.05)⁶ gives the same R23 516. Check yourself with it — if the two routes disagree by more than a Rand or two, one of them has an error rather than a rounding difference.'
      },
      {
        id: 'w5rf3', type: 'mcq', marks: 2,
        prompt: 'Why can you not simply average two interest rates that apply to different parts of a term?',
        options: [
          'Because each rate applies to a different amount of money for a different length of time',
          'Because averaging only works for simple interest',
          'Because the two rates are always compounded at different frequencies',
          'Because the average of two percentages is not a percentage'
        ],
        answer: 0,
        solution: [
          { lab: 'First period', val: 'The rate applies to the original PV' },
          { lab: 'Second period', val: 'The rate applies to the larger interim value' },
          { lab: 'And the periods', val: 'Are usually different lengths too' },
          { lab: 'Answer', val: 'Different amounts, different lengths', final: true }
        ],
        why: 'In the worked example the 10% rate applied to R17 548 for 3 years while the 8% applied to R15 000 for 2. Averaging to 9% pretends both applied to the same money for the same time.'
      },
      {
        id: 'w5rf4', type: 'numeric', marks: 4,
        prompt: 'R200 000 is deposited into a 20-year fixed deposit. It earns a nominal 12% per annum compounded <b>yearly</b> for the first eight years, and 10% per annum compounded <b>twice a year</b> for the remainder. What has accumulated at the end of the 20 years? (Round to the nearest Rand.)',
        pre: 'R', answer: 1597046, tol: 20,
        solution: [
          { lab: 'First 8 years', val: 'i = 0.12, n = 8, (1.12)⁸ = 2.475963' },
          { lab: 'FV interim', val: 'R200 000 × 2.475963 = R495 193' },
          { lab: 'Remaining 12 years', val: 'i = 10% ÷ 2 = 0.05, n = 12 × 2 = 24' },
          { lab: 'Apply the power', val: '(1.05)²⁴ = 3.2251' },
          { lab: 'Answer', val: 'R495 193 × 3.2251 = R1 597 047 (R1 597 046 unrounded)', final: true }
        ],
        why: 'Working it in one line without rounding gives R1 597 046. Both are marked right — on an amount this size, one rounded interim is worth about R1.'
      },
      {
        id: 'w5rf5', type: 'numeric', marks: 4,
        prompt: 'R10 000 is deposited into a 6-year fixed deposit. It earns a nominal 15% per annum compounded <b>yearly</b> for the first three years, and 10% per annum compounded <b>twice a year</b> for the remainder. What has accumulated at the end of the term? (Round to the nearest Rand.)',
        pre: 'R', answer: 20381, tol: 3,
        solution: [
          { lab: 'First 3 years', val: 'i = 0.15, n = 3, (1.15)³ = 1.520875' },
          { lab: 'FV interim', val: 'R10 000 × 1.520875 = R15 209' },
          { lab: 'Remaining 3 years', val: 'i = 10% ÷ 2 = 0.05, n = 3 × 2 = 6' },
          { lab: 'Apply the power', val: '(1.05)⁶ = 1.340096' },
          { lab: 'Answer', val: 'R15 209 × 1.340096 = R20 382 (R20 381 unrounded)', final: true }
        ],
        why: 'Note that the compounding frequency changed as well as the rate — from once a year to twice. You must recalculate both i and n for the second piece, not just i.'
      },
      {
        id: 'w5rf6', type: 'numeric', marks: 4,
        prompt: 'R22 000 is deposited into a 12-year fixed deposit. It earns a nominal 11% per annum compounded <b>monthly</b> for the first five years, and 12% per annum compounded <b>quarterly</b> for the remainder. What has accumulated at the end of the term? (Round to the nearest Rand.)',
        pre: 'R', answer: 87024, tol: 4,
        solution: [
          { lab: 'First 5 years', val: 'i = 11% ÷ 12 = 0.009167, n = 5 × 12 = 60' },
          { lab: 'Apply the power', val: '(1.009167)⁶⁰ = 1.728916' },
          { lab: 'FV interim', val: 'R22 000 × 1.728916 = R38 036' },
          { lab: 'Remaining 7 years', val: 'i = 12% ÷ 4 = 0.03, n = 7 × 4 = 28' },
          { lab: 'Apply the power', val: '(1.03)²⁸ = 2.287928' },
          { lab: 'Answer', val: 'R38 036 × 2.287928 = R87 024', final: true }
        ],
        why: 'The remaining term is 12 − 5 = 7 years, not 12. Reading the second period as the whole term is the most expensive mistake in these questions.'
      },
      {
        id: 'w5rf7', type: 'steps', marks: 5,
        scenario: 'R1 000 is deposited into a 4-year fixed deposit. It earns a nominal 7.5% per annum compounded bi-monthly for the first year, then 8.5% per annum compounded bi-monthly for the remainder.',
        prompt: 'Work out the accumulated amount at the end of the 4 years.',
        steps: [
          {
            q: 'What is n for the first piece — the first year?',
            answer: 6, tol: 0.01,
            explain: 'Bi-monthly is 6 times a year, and the first piece is 1 year long, so n₁ = 6.'
          },
          {
            q: 'Calculate the interim value at the end of year 1, to the nearest Rand.',
            pre: 'R', answer: 1077, tol: 2,
            explain: 'i₁ = 7.5% ÷ 6 = 0.0125, so R1 000 × (1.0125)⁶ = R1 000 × 1.077383 = R1 077.'
          },
          {
            q: 'What is n for the second piece?',
            answer: 18, tol: 0.01,
            explain: 'The remainder is 4 − 1 = 3 years, and bi-monthly is 6 a year, so n₂ = 18.'
          },
          {
            q: 'Now calculate the final accumulated amount, to the nearest Rand.',
            pre: 'R', answer: 1387, tol: 2,
            explain: 'i₂ = 8.5% ÷ 6 = 0.0141667, so R1 077 × (1.0141667)¹⁸ = R1 077 × 1.288155 = R1 387.'
          }
        ],
        solution: [
          { lab: 'Piece 1', val: 'i₁ = 0.0125, n₁ = 6' },
          { lab: 'FV interim', val: 'R1 000 × 1.077383 = R1 077' },
          { lab: 'Piece 2', val: 'i₂ = 0.0141667, n₂ = 18' },
          { lab: 'Growth factor', val: '(1.0141667)¹⁸ = 1.288155' },
          { lab: 'Future value', val: 'R1 077 × 1.288155 = R1 387', final: true }
        ],
        why: 'Step 3 is the one to watch. n₂ covers the remainder of the term — 3 years — not the whole 4.'
      }
    ]
  },

  /* ═══════════════════════ PV WITH A RATE CHANGE ═══════════════════════ */
  {
    id: 'w5-ratepv',
    title: 'Present Value When the Rate Changes',
    emoji: '⏮️',
    summary: 'The same split, run backwards: discounting through two rates to find what you need today.',
    notes: [
      {
        heading: 'Running the split in reverse',
        emoji: '↩️',
        html:
          '<p>If accumulating through two rates means multiplying by two growth factors, then discounting back ' +
          'through them means dividing by both.</p>' +
          '<div class="keybox"><b>PV = FV ÷ [(1 + <span class="math">i</span><sub>1</sub>)<sup>n₁</sup> × ' +
          '(1 + <span class="math">i</span><sub>2</sub>)<sup>n₂</sup>]</b></div>' +
          '<p>You can also do it in two visible steps, and for exam answers that is usually better because it shows ' +
          'your working. Start at the <b>far end</b> — the last piece of the term — and discount back to the date of ' +
          'the rate change. That gives PV<sub>interim</sub>. Then discount PV<sub>interim</sub> back to today ' +
          'through the first rate.</p>' +
          '<div class="watchout"><b>Backwards means backwards.</b> When you are solving for PV, the first calculation ' +
          'you do is the <i>second</i> piece of the term. Starting at the beginning gets you nowhere, because you do ' +
          'not yet know any amount at the beginning — that is the thing you are looking for.</div>'
      },
      {
        heading: 'Worked example — R1 000 000 in five years',
        emoji: '💼',
        html:
          '<p>A loan is repayable with a single R1 000 000 payment in 5 years. Interest is a nominal 11% per annum ' +
          'compounded monthly for the first 2 years, then 10% per annum compounded monthly for the remaining 3.</p>' +
          '<div class="worked"><div class="worked-title">Using the combined formula</div>' +
          '<div class="solstep"><div class="solstep-lab">First 2 years</div>' +
          '<div class="solstep-val"><span class="math">i</span>₁ = 11% ÷ 12 = 0.009167, n₁ = 2 × 12 = 24</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Last 3 years</div>' +
          '<div class="solstep-val"><span class="math">i</span>₂ = 10% ÷ 12 = 0.008333, n₂ = 3 × 12 = 36</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Growth factors</div>' +
          '<div class="solstep-val">(1.009167)<sup>24</sup> = 1.2448 &nbsp;and&nbsp; (1.008333)<sup>36</sup> = 1.3482</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Multiply them</div>' +
          '<div class="solstep-val">1.2448 × 1.3482 = 1.6782</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Present value</div>' +
          '<div class="solstep-val">R1 000 000 ÷ 1.6782 = R595 857</div></div></div>' +
          '<p>Compare this to the R578 397 from Lesson 1, where the whole 5 years ran at 11%. The rate dropping to ' +
          '10% halfway means less interest accrues, so more has to be borrowed today to reach the same R1 000 000. ' +
          'That direction is a useful reasonability check.</p>'
      },
      {
        heading: 'Exercise — R500 000 in four years',
        emoji: '🎯',
        html:
          '<p><i>How much must you invest today to have at least R500 000 after 4 years, if the account pays a nominal ' +
          '7.5% per annum compounded bi-monthly for the first year and 8.5% per annum compounded bi-monthly for the ' +
          'rest of the term?</i></p>' +
          '<div class="worked"><div class="worked-title">Solution — start at the far end</div>' +
          '<div class="solstep"><div class="solstep-lab">Step 1, the last 3 years</div>' +
          '<div class="solstep-val"><span class="math">i</span>₂ = 8.5% ÷ 6 = 0.0141667, n₂ = 18</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Growth factor</div>' +
          '<div class="solstep-val">(1.0141667)<sup>18</sup> = 1.288155</div></div>' +
          '<div class="solstep"><div class="solstep-lab">PV<sub>interim</sub></div>' +
          '<div class="solstep-val">R500 000 ÷ 1.288155 = R388 152</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Step 2, the first year</div>' +
          '<div class="solstep-val"><span class="math">i</span>₁ = 7.5% ÷ 6 = 0.0125, n₁ = 6</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Growth factor</div>' +
          '<div class="solstep-val">(1.0125)<sup>6</sup> = 1.077383</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Present value</div>' +
          '<div class="solstep-val">R388 152 ÷ 1.077383 = R360 273</div></div></div>' +
          '<p>PV<sub>interim</sub> has a real meaning: it is what the account would have to hold at the end of ' +
          'year 1 for the remaining 3 years of growth to reach R500 000.</p>'
      }
    ],
    questions: [
      {
        id: 'w5rp1', type: 'numeric', marks: 4,
        prompt: 'A single repayment of R1 000 000 is due in 5 years. Interest is a nominal 11% per annum compounded monthly for the first 2 years, then 10% per annum compounded monthly for the remaining 3 years. Calculate the amount borrowed, to the nearest Rand.',
        pre: 'R', answer: 595857, tol: 25,
        solution: [
          { lab: 'First 2 years', val: 'i₁ = 0.009167, n₁ = 24, (1.009167)²⁴ = 1.2448' },
          { lab: 'Last 3 years', val: 'i₂ = 0.008333, n₂ = 36, (1.008333)³⁶ = 1.3482' },
          { lab: 'Combined factor', val: '1.2448 × 1.3482 = 1.6782' },
          { lab: 'Formula', val: 'PV = FV ÷ [(1 + i₁)ⁿ¹(1 + i₂)ⁿ²]' },
          { lab: 'Answer', val: 'R1 000 000 ÷ 1.6782 = R595 857', final: true }
        ],
        why: 'Multiplying the two rounded factors gives 1.6782 and R595 877; keeping full precision gives R595 857. Both are accepted. More usefully: this is larger than the R578 397 from Lesson 1 because the rate fell to 10% halfway, so less interest builds and more must be borrowed today.'
      },
      {
        id: 'w5rp2', type: 'mcq', marks: 2,
        prompt: 'When solving for the <b>present value</b> across a term where the rate changes, which piece of the term do you calculate first?',
        options: [
          'The second piece — discount the known future value back to the date of the change',
          'The first piece — accumulate from today to the date of the change',
          'Either one; the order makes no difference to the method',
          'Both at once, using the average of the two rates'
        ],
        answer: 0,
        solution: [
          { lab: 'What you know', val: 'An amount at the END of the term' },
          { lab: 'What you want', val: 'An amount at the START' },
          { lab: 'So you must', val: 'Work backwards from the known end' },
          { lab: 'Answer', val: 'The second piece first', final: true }
        ],
        why: 'You cannot start at the beginning because there is no amount there yet — that is the unknown. This is the mirror image of the FV questions, where you start at the beginning because that is the amount you know.'
      },
      {
        id: 'w5rp3', type: 'numeric', marks: 4,
        prompt: 'What principal did you borrow if you must repay R100 000 after 10 years, with interest at a nominal 12% per annum compounded <b>once a year</b> for the first three years and 14% per annum compounded <b>half-yearly</b> thereafter? (Round to the nearest Rand.)',
        pre: 'R', answer: 27604, tol: 3,
        solution: [
          { lab: 'Last 7 years', val: 'i₂ = 14% ÷ 2 = 0.07, n₂ = 7 × 2 = 14' },
          { lab: 'Growth factor', val: '(1.07)¹⁴ = 2.578534' },
          { lab: 'PV interim', val: 'R100 000 ÷ 2.578534 = R38 782' },
          { lab: 'First 3 years', val: 'i₁ = 0.12, n₁ = 3, (1.12)³ = 1.404928' },
          { lab: 'Answer', val: 'R38 782 ÷ 1.404928 = R27 604', final: true }
        ],
        why: 'The second piece runs for 10 − 3 = 7 years. R38 782 is what would still be owing three years in — a real amount, not just an intermediate number.'
      },
      {
        id: 'w5rp4', type: 'numeric', marks: 4,
        prompt: 'What principal did you borrow if you must repay R55 000 after 6 years, with interest at a nominal 13% per annum compounded <b>once a year</b> for the first two years and 12% per annum compounded <b>half-yearly</b> thereafter? (Round to the nearest Rand.)',
        pre: 'R', answer: 27025, tol: 3,
        solution: [
          { lab: 'Last 4 years', val: 'i₂ = 12% ÷ 2 = 0.06, n₂ = 4 × 2 = 8' },
          { lab: 'Growth factor', val: '(1.06)⁸ = 1.593848' },
          { lab: 'PV interim', val: 'R55 000 ÷ 1.593848 = R34 508' },
          { lab: 'First 2 years', val: 'i₁ = 0.13, n₁ = 2, (1.13)² = 1.2769' },
          { lab: 'Answer', val: 'R34 508 ÷ 1.2769 = R27 025', final: true }
        ],
        why: 'Reasonability check: R27 025 roughly doubles to R55 000 over 6 years, which is about right for rates in the 12–13% range. If your answer had come out near R45 000 you would know something was wrong.'
      },
      {
        id: 'w5rp5', type: 'numeric', marks: 4,
        prompt: 'What principal did you borrow if you must repay R23 000 after 5 years, with interest at a nominal 11% per annum compounded <b>twice a year</b> for the first three years and 12% per annum compounded <b>quarterly</b> thereafter? (Round to the nearest Rand.)',
        pre: 'R', answer: 13168, tol: 3,
        solution: [
          { lab: 'Last 2 years', val: 'i₂ = 12% ÷ 4 = 0.03, n₂ = 2 × 4 = 8' },
          { lab: 'Growth factor', val: '(1.03)⁸ = 1.26677' },
          { lab: 'PV interim', val: 'R23 000 ÷ 1.26677 = R18 156' },
          { lab: 'First 3 years', val: 'i₁ = 11% ÷ 2 = 0.055, n₁ = 3 × 2 = 6' },
          { lab: 'Growth factor', val: '(1.055)⁶ = 1.378843' },
          { lab: 'Answer', val: 'R18 156 ÷ 1.378843 = R13 168', final: true }
        ],
        why: 'Both the rate and the compounding frequency change here — twice a year becomes quarterly. Recalculate i and n for each piece separately rather than assuming one of them carries over.'
      },
      {
        id: 'w5rp6', type: 'numeric', marks: 4,
        prompt: 'How much must you invest today to have at least R500 000 after 4 years, if the account pays a nominal 7.5% per annum compounded bi-monthly for the first year and 8.5% per annum compounded bi-monthly thereafter? (Round to the nearest Rand.)',
        pre: 'R', answer: 360273, tol: 3,
        solution: [
          { lab: 'Last 3 years', val: 'i₂ = 8.5% ÷ 6 = 0.0141667, n₂ = 18' },
          { lab: 'Growth factor', val: '(1.0141667)¹⁸ = 1.288155' },
          { lab: 'PV interim', val: 'R500 000 ÷ 1.288155 = R388 152' },
          { lab: 'First year', val: 'i₁ = 7.5% ÷ 6 = 0.0125, n₁ = 6, (1.0125)⁶ = 1.077383' },
          { lab: 'Answer', val: 'R388 152 ÷ 1.077383 = R360 273', final: true }
        ],
        why: 'Compare this to the Lesson 1 exercise, where the same R500 000 over the same 4 years at a flat 8.5% needed R356 735. The lower rate in year 1 means less growth, so you must put in about R3 500 more.'
      },
      {
        id: 'w5rp7', type: 'mcq', marks: 2,
        prompt: 'Everything else being equal, what happens to the present value needed today if the interest rate for part of the term is <b>lowered</b>?',
        options: [
          'It rises — less interest accrues, so more must be invested now',
          'It falls — a lower rate always means a smaller amount',
          'It is unchanged, because the future value is fixed',
          'It rises or falls depending on which part of the term the change falls in'
        ],
        answer: 0,
        solution: [
          { lab: 'Lower rate', val: 'Smaller growth factor' },
          { lab: 'Dividing by a smaller number', val: 'Gives a larger answer' },
          { lab: 'Answer', val: 'The present value rises', final: true }
        ],
        why: 'You saw both sides of this: R578 397 at a flat 11%, R595 857 once the rate drops to 10% for the last 3 years. Use the direction as a check before you trust an answer.'
      }
    ]
  },

  /* ═══════════════════════ FV WITH AN EXTRA AMOUNT ═══════════════════════ */
  {
    id: 'w5-addfv',
    title: 'Future Value With an Extra Deposit or Withdrawal',
    emoji: '➕',
    summary: 'Splitting the term at the date money moves in or out, and carrying an adjusted amount forward.',
    notes: [
      {
        heading: 'The same cut, for a different reason',
        emoji: '✂️',
        html:
          '<p>Lesson 2 cut the term where the rate changed. This lesson cuts it where <b>money moves</b> — a deposit, ' +
          'a withdrawal, an extra payment or a receipt partway through. The rate may not change at all.</p>' +
          '<ul class="tickly">' +
          '<li><b>Step 1</b> — accumulate from the start to the date of the movement. That gives FV<sub>interim</sub>.</li>' +
          '<li><b>Adjust</b> — add the deposit, or subtract the withdrawal.</li>' +
          '<li><b>Step 2</b> — use the adjusted amount as the PV of the second piece and accumulate to the end.</li>' +
          '</ul>' +
          '<div class="keybox"><b>PV<sub>interim</sub> = FV<sub>interim</sub> + deposit</b><br>' +
          '<b>PV<sub>interim</sub> = FV<sub>interim</sub> − withdrawal</b></div>' +
          '<p>That middle line is the whole lesson. Everything either side of it is ordinary compound interest.</p>'
      },
      {
        heading: 'Worked example — R15 000 plus R20 000 later',
        emoji: '💼',
        html:
          '<p>R15 000 is invested for 5 years at a nominal 10% per annum compounded half-yearly. After 2 years a ' +
          'further R20 000 is deposited into the same account. What is in the account after 5 years?</p>' +
          '<div class="worked"><div class="worked-title">Step 1 — up to the deposit</div>' +
          '<div class="solstep"><div class="solstep-lab">Rate per period</div>' +
          '<div class="solstep-val">10% ÷ 2 = 5% = 0.05</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Periods</div><div class="solstep-val">2 years × 2 = 4</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Apply the power</div>' +
          '<div class="solstep-val">(1.05)<sup>4</sup> = 1.215506</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">FV<sub>interim</sub></div>' +
          '<div class="solstep-val">R15 000 × 1.215506 = R18 233</div></div></div>' +
          '<div class="worked"><div class="worked-title">Adjust, then step 2</div>' +
          '<div class="solstep"><div class="solstep-lab">PV<sub>interim</sub></div>' +
          '<div class="solstep-val">R18 233 + R20 000 = R38 233</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Periods left</div><div class="solstep-val">3 years × 2 = 6</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Apply the power</div>' +
          '<div class="solstep-val">(1.05)<sup>6</sup> = 1.340096</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Future value</div>' +
          '<div class="solstep-val">R38 233 × 1.340096 = R51 236</div></div></div>' +
          '<div class="watchout"><b>The R20 000 does not earn 5 years of interest.</b> It arrives at year 2, so it ' +
          'earns 3 years. That is why it must be added at the split rather than at the start — adding it to the ' +
          'original R15 000 would overstate the answer by about R4 800.</div>'
      },
      {
        heading: 'Exercise — R700 now, R300 in a year',
        emoji: '🎯',
        html:
          '<p><i>You invest R700 today in a 4-year fixed deposit and a further R300 after the first year. The account ' +
          'earns a nominal 8.5% per annum compounded bi-monthly. What has accumulated at the end of the term?</i></p>' +
          '<div class="worked"><div class="worked-title">Solution</div>' +
          '<div class="solstep"><div class="solstep-lab">Rate per period</div>' +
          '<div class="solstep-val">8.5% ÷ 6 = 0.0141667 (same throughout — only the money moves)</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Step 1, year 1</div>' +
          '<div class="solstep-val">n₁ = 6, (1.0141667)<sup>6</sup> = 1.088068</div></div>' +
          '<div class="solstep"><div class="solstep-lab">FV<sub>interim</sub></div>' +
          '<div class="solstep-val">R700 × 1.088068 = R762</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Adjust</div>' +
          '<div class="solstep-val">R762 + R300 = R1 062</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Step 2, years 2–4</div>' +
          '<div class="solstep-val">n₂ = 18, (1.0141667)<sup>18</sup> = 1.288155</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Future value</div>' +
          '<div class="solstep-val">R1 062 × 1.288155 = R1 368</div></div></div>' +
          '<p>R1 000 went in and R1 368 came out. Notice the rate never changed — the only reason for splitting the ' +
          'term was the R300 arriving a year late.</p>'
      }
    ],
    questions: [
      {
        id: 'w5af1', type: 'numeric', marks: 3,
        prompt: 'R15 000 is invested at a nominal 10% per annum compounded half-yearly. What has it accumulated to after 2 years, to the nearest Rand?',
        pre: 'R', answer: 18233, tol: 2,
        solution: [
          { lab: 'Rate per period', val: '10% ÷ 2 = 0.05' },
          { lab: 'Periods', val: '2 × 2 = 4' },
          { lab: 'Apply the power', val: '(1.05)⁴ = 1.215506' },
          { lab: 'Answer', val: 'R15 000 × 1.215506 = R18 233', final: true }
        ],
        why: 'This is FV_interim — the balance on the day the extra R20 000 goes in. Get the split date right and the rest is ordinary compound interest.'
      },
      {
        id: 'w5af2', type: 'numeric', marks: 4,
        prompt: 'Continuing that account: R20 000 is deposited at the 2-year mark, and the money stays invested at a nominal 10% per annum compounded half-yearly for a further 3 years. What is in the account at the end of the 5 years? (Round to the nearest Rand.)',
        pre: 'R', answer: 51236, tol: 3,
        solution: [
          { lab: 'FV interim', val: 'R18 233' },
          { lab: 'Add the deposit', val: 'R18 233 + R20 000 = R38 233' },
          { lab: 'Periods left', val: '3 × 2 = 6' },
          { lab: 'Apply the power', val: '(1.05)⁶ = 1.340096' },
          { lab: 'Answer', val: 'R38 233 × 1.340096 = R51 236', final: true }
        ],
        why: 'If you had instead invested the whole R35 000 for all 5 years you would end with R56 037. The R4 801 difference is the two years of growth the R20 000 never had.'
      },
      {
        id: 'w5af3', type: 'mcq', marks: 2,
        prompt: 'A term is split at the date of a <b>withdrawal</b>. How is the interim amount adjusted before the second calculation?',
        options: [
          'Subtract the withdrawal from FV_interim to get PV_interim',
          'Add the withdrawal to FV_interim to get PV_interim',
          'Subtract the withdrawal from the original present value',
          'Subtract the withdrawal from the final future value at the end'
        ],
        answer: 0,
        solution: [
          { lab: 'A withdrawal', val: 'Takes money out of the account' },
          { lab: 'On the day it happens', val: 'The balance drops by that amount' },
          { lab: 'Answer', val: 'PV_interim = FV_interim − withdrawal', final: true }
        ],
        why: 'Subtracting at the start or the end would both be wrong, because the withdrawn money did earn interest up to the withdrawal date and earned none after it. The split date is the only place the adjustment belongs.'
      },
      {
        id: 'w5af4', type: 'numeric', marks: 4,
        prompt: 'Eight years ago you deposited R200 000 in a fund earning a nominal 12% per annum compounded <b>yearly</b>. You made one withdrawal of R100 000, exactly six years ago. How much is in the fund today? (Round to the nearest Rand.)',
        pre: 'R', answer: 297810, tol: 5,
        solution: [
          { lab: 'When was the withdrawal?', val: '8 − 6 = 2 years after the deposit' },
          { lab: 'First 2 years', val: 'i = 0.12, n = 2, (1.12)² = 1.2544' },
          { lab: 'FV interim', val: 'R200 000 × 1.2544 = R250 880' },
          { lab: 'Subtract the withdrawal', val: 'R250 880 − R100 000 = R150 880' },
          { lab: 'Remaining 6 years', val: '(1.12)⁶ = 1.973823' },
          { lab: 'Answer', val: 'R150 880 × 1.973823 = R297 810', final: true }
        ],
        why: 'The dates are given as "years ago" from today, so convert them first: the withdrawal is 2 years into an 8-year term, leaving 6. Getting that subtraction the wrong way round is the main trap in this question.'
      },
      {
        id: 'w5af5', type: 'numeric', marks: 4,
        prompt: 'Ten years ago you deposited R80 000 in a fund earning a nominal 15% per annum compounded <b>quarterly</b>. You made one withdrawal of R80 000, exactly six and a half years ago. How much is in the fund today? (Round to the nearest Rand.)',
        pre: 'R', answer: 140486, tol: 5,
        solution: [
          { lab: 'When was the withdrawal?', val: '10 − 6.5 = 3.5 years after the deposit' },
          { lab: 'First 3.5 years', val: 'i = 15% ÷ 4 = 0.0375, n = 3.5 × 4 = 14' },
          { lab: 'Apply the power', val: '(1.0375)¹⁴ = 1.674301' },
          { lab: 'FV interim', val: 'R80 000 × 1.674301 = R133 944' },
          { lab: 'Subtract the withdrawal', val: 'R133 944 − R80 000 = R53 944' },
          { lab: 'Remaining 6.5 years', val: '(1.0375)²⁶ = 2.604298' },
          { lab: 'Answer', val: 'R53 944 × 2.604298 = R140 486', final: true }
        ],
        why: 'Half-years work fine here: 3.5 years at 4 periods a year is exactly 14 periods. A fractional term is only a problem when it does not land on a whole period.'
      },
      {
        id: 'w5af6', type: 'numeric', marks: 4,
        prompt: 'Four years ago you deposited R120 000 in a fund earning a nominal 13% per annum compounded <b>half-yearly</b>. You made one withdrawal of R75 000, exactly three years ago. How much is in the fund today? (Round to the nearest Rand.)',
        pre: 'R', answer: 89164, tol: 4,
        solution: [
          { lab: 'When was the withdrawal?', val: '4 − 3 = 1 year after the deposit' },
          { lab: 'First year', val: 'i = 13% ÷ 2 = 0.065, n = 2, (1.065)² = 1.134225' },
          { lab: 'FV interim', val: 'R120 000 × 1.134225 = R136 107' },
          { lab: 'Subtract the withdrawal', val: 'R136 107 − R75 000 = R61 107' },
          { lab: 'Remaining 3 years', val: 'n = 6, (1.065)⁶ = 1.459142' },
          { lab: 'Answer', val: 'R61 107 × 1.459142 = R89 164', final: true }
        ],
        why: 'Reasonability check: R120 000 went in and R75 000 came out, so R45 000 net — yet R89 164 is there today. Almost the whole difference is interest that the R75 000 earned during the year it was still invested, plus six years of growth on what stayed.'
      },
      {
        id: 'w5af7', type: 'steps', marks: 5,
        scenario: 'You invest R700 today in a 4-year fixed deposit and a further R300 after the first year. The account earns a nominal 8.5% per annum compounded bi-monthly throughout.',
        prompt: 'Work out what has accumulated at the end of the 4 years.',
        steps: [
          {
            q: 'Calculate the balance just before the R300 goes in, to the nearest Rand.',
            pre: 'R', answer: 762, tol: 2,
            explain: 'i = 8.5% ÷ 6 = 0.0141667 and n₁ = 6, so R700 × (1.0141667)⁶ = R700 × 1.088068 = R762.'
          },
          {
            q: 'What amount do you carry into the second calculation?',
            pre: 'R', answer: 1062, tol: 2,
            explain: 'PV_interim = FV_interim + the deposit = R762 + R300 = R1 062.'
          },
          {
            q: 'How many interest periods are left after the deposit?',
            answer: 18, tol: 0.01,
            explain: '3 years remain, at 6 periods a year, so n₂ = 18.'
          },
          {
            q: 'Now calculate the final accumulated amount, to the nearest Rand.',
            pre: 'R', answer: 1368, tol: 2,
            explain: 'R1 062 × (1.0141667)¹⁸ = R1 062 × 1.288155 = R1 368.'
          }
        ],
        solution: [
          { lab: 'Rate per period', val: '0.0141667, unchanged throughout' },
          { lab: 'FV interim', val: 'R700 × 1.088068 = R762' },
          { lab: 'PV interim', val: 'R762 + R300 = R1 062' },
          { lab: 'Growth factor', val: '(1.0141667)¹⁸ = 1.288155' },
          { lab: 'Future value', val: 'R1 062 × 1.288155 = R1 368', final: true }
        ],
        why: 'The rate never changes in this question. The split exists purely because the R300 arrives a year late, and so earns three years of interest rather than four.'
      }
    ]
  },

  /* ═══════════════════════ PV WITH PAYMENTS DURING THE TERM ═══════════════════════ */
  {
    id: 'w5-addpv',
    title: 'Present Value With Payments During the Term',
    emoji: '💳',
    summary: 'Working backwards through instalments to find what was borrowed, or what a cash price would have been.',
    notes: [
      {
        heading: 'Backwards, one mini-loan at a time',
        emoji: '↩️',
        html:
          '<p>Same split as the last topic, run in reverse. You know the amounts paid during and at the end of the ' +
          'term, and you want the amount at the very start.</p>' +
          '<ul class="tickly">' +
          '<li><b>Step 1</b> — discount the final payment back to the date of the earlier one. That gives ' +
          'PV<sub>interim</sub>: what is still owing on that date.</li>' +
          '<li><b>Adjust</b> — add back the payment made on that date, because it was owing too. ' +
          'FV<sub>interim</sub> = PV<sub>interim</sub> + payment.</li>' +
          '<li><b>Step 2</b> — discount FV<sub>interim</sub> back to today.</li>' +
          '</ul>' +
          '<div class="watchout">Note the adjustment flips direction compared to the previous topic. There, a deposit ' +
          'was <i>added</i> going forwards. Here, a payment is <i>added back</i> going backwards — because at that ' +
          'moment, just before it was paid, that money was still part of the debt.</div>'
      },
      {
        heading: 'Worked example — a loan repaid in two payments',
        emoji: '📄',
        html:
          '<p>A 5-year loan at a nominal 11% per annum compounded monthly is repayable in two payments: R400 000 ' +
          'after 2 years, and R600 000 at the end of the 5 years. How much was borrowed?</p>' +
          '<div class="worked"><div class="worked-title">Step 1 — the second mini-loan</div>' +
          '<div class="solstep"><div class="solstep-lab">Discount R600 000 back</div>' +
          '<div class="solstep-val">3 years, not 5 — only as far as the first payment</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Rate and periods</div>' +
          '<div class="solstep-val"><span class="math">i</span> = 0.009167, n = 3 × 12 = 36</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Apply the power</div>' +
          '<div class="solstep-val">(1.009167)<sup>36</sup> = 1.388879</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">PV<sub>interim</sub></div>' +
          '<div class="solstep-val">R600 000 ÷ 1.388879 = R432 003</div></div></div>' +
          '<p>So after the R400 000 payment there is still R432 003 outstanding, which grows into the R600 000 final ' +
          'settlement — R167 997 of interest over those 3 years.</p>' +
          '<div class="worked"><div class="worked-title">Adjust, then step 1 of the loan</div>' +
          '<div class="solstep"><div class="solstep-lab">Add the payment back</div>' +
          '<div class="solstep-val">FV<sub>interim</sub> = R432 003 + R400 000 = R832 003</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Discount back</div>' +
          '<div class="solstep-val">2 years, so n = 24, (1.009167)<sup>24</sup> = 1.244829</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Amount borrowed</div>' +
          '<div class="solstep-val">R832 003 ÷ 1.244829 = R668 368</div></div></div>' +
          '<p>R832 003 is what was owing at the 2-year mark, just before anything was paid. Once R400 000 of it is ' +
          'settled, R432 003 remains.</p>'
      },
      {
        heading: 'Cash price — the same idea, said differently',
        emoji: '🚚',
        html:
          '<p>"What would the cash price have been?" is the same question in different words. A vehicle paid for with ' +
          'a deposit today and instalments later has a cash price equal to <b>all of those payments discounted back ' +
          'to today</b>.</p>' +
          '<div class="keybox">Cash price = deposit + (payment₁ ÷ growth to its date) + (payment₂ ÷ growth to its date)</div>' +
          '<p>The deposit needs no discounting — it is already being paid today. This per-payment route and the ' +
          'two-step mini-loan route give the same answer; discounting each payment on its own is usually quicker ' +
          'when there are three or more of them.</p>'
      },
      {
        heading: 'Exercise — R200 000 added after a year',
        emoji: '🎯',
        html:
          '<p><i>A 4-year savings account requires an initial payment today and another R200 000 a year later. It pays ' +
          'a nominal 8.5% per annum compounded bi-monthly. How much must you pay today to have at least R500 000 after ' +
          'the 4-year term?</i></p>' +
          '<div class="worked"><div class="worked-title">Solution</div>' +
          '<div class="solstep"><div class="solstep-lab">Step 1, discount back 3 years</div>' +
          '<div class="solstep-val">R500 000 ÷ (1.0141667)<sup>18</sup> = R500 000 ÷ 1.288155 = R388 152</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Adjust</div>' +
          '<div class="solstep-val">R388 152 − R200 000 = R188 152 still needed at the 1-year mark</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Step 2, discount back 1 year</div>' +
          '<div class="solstep-val">n = 6, (1.0141667)<sup>6</sup> = 1.088068</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Pay today</div>' +
          '<div class="solstep-val">R188 152 ÷ 1.088068 = R172 923</div></div></div>' +
          '<div class="watchout"><b>The R200 000 is subtracted here, not added.</b> It is money you are putting <i>in</i>, ' +
          'so it reduces what the account needs to hold from your own pocket at that date. In the loan example the ' +
          'R400 000 was money going <i>out</i> to settle a debt, so it was added back. Decide by asking which ' +
          'direction the money moves, not by memorising a sign.</div>'
      }
    ],
    questions: [
      {
        id: 'w5ap1', type: 'numeric', marks: 3,
        prompt: 'A final payment of R600 000 is due 3 years from now on a loan charging a nominal 11% per annum compounded monthly. How much is outstanding today, to the nearest Rand?',
        pre: 'R', answer: 432003, tol: 4,
        solution: [
          { lab: 'Identify', val: 'FV = R600 000, i = 11% ÷ 12 = 0.009167, n = 3 × 12 = 36' },
          { lab: 'Apply the power', val: '(1.009167)³⁶ = 1.388879' },
          { lab: 'Answer', val: 'R600 000 ÷ 1.388879 = R432 003', final: true }
        ],
        why: 'The R167 997 difference is the interest that will accrue over those 3 years. In the worked example this figure is PV_interim — the balance after the first repayment.'
      },
      {
        id: 'w5ap2', type: 'numeric', marks: 5,
        prompt: 'A 5-year loan at a nominal 11% per annum compounded monthly is repayable in two payments: R400 000 after 2 years and R600 000 at the end of the term. How much was borrowed? (Round to the nearest Rand.)',
        pre: 'R', answer: 668368, tol: 5,
        solution: [
          { lab: 'Discount R600 000 back 3 years', val: 'R600 000 ÷ (1.009167)³⁶ = R432 003' },
          { lab: 'Add the interim payment back', val: 'R432 003 + R400 000 = R832 003' },
          { lab: 'Discount back 2 years', val: '(1.009167)²⁴ = 1.244829' },
          { lab: 'Answer', val: 'R832 003 ÷ 1.244829 = R668 368', final: true }
        ],
        why: 'Check it a different way: discount each payment on its own. R400 000 ÷ (1.009167)²⁴ = R321 329, and R600 000 ÷ (1.009167)⁶⁰ = R347 038. Together, R668 367 — the same answer to within a Rand of rounding.'
      },
      {
        id: 'w5ap3', type: 'numeric', marks: 5,
        prompt: 'A 4-year savings account requires a payment today and another R200 000 exactly a year later, and pays a nominal 8.5% per annum compounded bi-monthly. How much must you pay today to have at least R500 000 at the end of the term? (Round to the nearest Rand.)',
        pre: 'R', answer: 172923, tol: 4,
        solution: [
          { lab: 'Discount R500 000 back 3 years', val: 'R500 000 ÷ (1.0141667)¹⁸ = R388 152' },
          { lab: 'Subtract the R200 000 you pay in', val: 'R388 152 − R200 000 = R188 152' },
          { lab: 'Discount back 1 year', val: '(1.0141667)⁶ = 1.088068' },
          { lab: 'Answer', val: 'R188 152 ÷ 1.088068 = R172 923', final: true }
        ],
        why: 'Cross-check by discounting each flow separately: R500 000 ÷ (1.0141667)²⁴ = R356 735, less R200 000 ÷ (1.0141667)⁶ = R183 812, gives R172 923 exactly.'
      },
      {
        id: 'w5ap4', type: 'mcq', marks: 2,
        prompt: 'When working backwards to find what was borrowed, why is an interim <b>repayment</b> added to the discounted balance rather than subtracted?',
        options: [
          'Because immediately before it was paid, that money was still part of the outstanding debt',
          'Because all amounts are positive when working backwards',
          'Because the repayment earns interest after it is made',
          'Because the discounting has already removed it once'
        ],
        answer: 0,
        solution: [
          { lab: 'PV_interim', val: 'What is still owing just AFTER the payment' },
          { lab: 'FV_interim', val: 'What was owing just BEFORE it' },
          { lab: 'The difference', val: 'Is the payment itself' },
          { lab: 'Answer', val: 'It was still part of the debt a moment earlier', final: true }
        ],
        why: 'Get the two interim amounts the right way round and the arithmetic follows. In the worked example: R432 003 owing after, R832 003 owing before, and R400 000 between them.'
      },
      {
        id: 'w5ap5', type: 'numeric', marks: 5,
        prompt: 'You bought a delivery vehicle for a deposit of R50 000 on the day of purchase, a further R100 000 three years later and a final R150 000 six years after purchase. The dealership charged compound interest at 14% per annum compounded <b>once a year</b>. What was the cash price of the vehicle? (Round to the nearest Rand.)',
        pre: 'R', answer: 185835, tol: 4,
        solution: [
          { lab: 'Deposit', val: 'R50 000, already paid today, so no discounting' },
          { lab: 'R100 000 in 3 years', val: '(1.14)³ = 1.481544, so R100 000 ÷ 1.481544 = R67 497' },
          { lab: 'R150 000 in 6 years', val: '(1.14)⁶ = 2.194973, so R150 000 ÷ 2.194973 = R68 338' },
          { lab: 'Add them up', val: 'R50 000 + R67 497 + R68 338' },
          { lab: 'Answer', val: 'R185 835', final: true }
        ],
        why: 'R300 000 was handed over in total, but the cash price is only R185 835 — the other R114 165 is interest for the privilege of paying late. That gap is the clearest illustration of the time value of money in the whole module.'
      },
      {
        id: 'w5ap6', type: 'numeric', marks: 5,
        prompt: 'You bought a delivery vehicle for a deposit of R80 000 on the day of purchase, a further R100 000 two years later and a final R150 000 eight years after purchase. The dealership charged compound interest at 12% per annum compounded <b>quarterly</b>. What was the cash price? (Round to the nearest Rand.)',
        pre: 'R', answer: 217191, tol: 4,
        solution: [
          { lab: 'Rate per period', val: '12% ÷ 4 = 0.03' },
          { lab: 'Deposit', val: 'R80 000, paid today' },
          { lab: 'R100 000 in 2 years', val: 'n = 8, (1.03)⁸ = 1.26677, so R100 000 ÷ 1.26677 = R78 941' },
          { lab: 'R150 000 in 8 years', val: 'n = 32, (1.03)³² = 2.575083, so R150 000 ÷ 2.575083 = R58 251' },
          { lab: 'Answer', val: 'R80 000 + R78 941 + R58 251 = R217 192 (R217 191 unrounded)', final: true }
        ],
        why: 'Each payment gets its own n, counted from today to the date it is made. The R150 000 is discounted over 32 quarters and ends up worth barely more than a third of its face value.'
      },
      {
        id: 'w5ap7', type: 'numeric', marks: 5,
        prompt: 'You bought a delivery vehicle for a deposit of R10 000 on the day of purchase, a further R120 000 a year later and a final R250 000 three years after purchase. The dealership charged compound interest at 13% per annum compounded <b>half-yearly</b>. What was the cash price? (Round to the nearest Rand.)',
        pre: 'R', answer: 287133, tol: 4,
        solution: [
          { lab: 'Rate per period', val: '13% ÷ 2 = 0.065' },
          { lab: 'Deposit', val: 'R10 000, paid today' },
          { lab: 'R120 000 in 1 year', val: 'n = 2, (1.065)² = 1.134225, so R120 000 ÷ 1.134225 = R105 799' },
          { lab: 'R250 000 in 3 years', val: 'n = 6, (1.065)⁶ = 1.459142, so R250 000 ÷ 1.459142 = R171 334' },
          { lab: 'Answer', val: 'R10 000 + R105 799 + R171 334 = R287 133', final: true }
        ],
        why: 'A short term and a big final payment mean less discounting: R380 000 of payments come back to R287 133, where the six-year deal in the previous question shrank R300 000 to R185 835. The longer you have the money, the more it costs.'
      },
      {
        id: 'w5ap8', type: 'mcq', marks: 2,
        prompt: 'Two 5-year loans at a nominal 11% per annum compounded monthly both repay R1 000 000 in total. Loan A pays R400 000 at year 2 and R600 000 at year 5. Loan B pays the whole R1 000 000 at year 5. Which lets you borrow <b>more</b> today?',
        options: [
          'Loan A — paying R400 000 early means less interest accrues on it',
          'Loan B — keeping the money longer is always worth more',
          'They allow exactly the same amount, because the total repaid is the same',
          'It depends on the interest rate'
        ],
        answer: 0,
        solution: [
          { lab: 'Loan A', val: 'R432 003 + R400 000 discounted back = R668 368' },
          { lab: 'Loan B', val: 'R1 000 000 ÷ (1.009167)⁶⁰ = R578 397' },
          { lab: 'Why A is bigger', val: 'R400 000 stops accruing interest three years early' },
          { lab: 'Answer', val: 'Loan A, by about R90 000', final: true }
        ],
        why: 'Both figures come straight from this week: R578 397 from Lesson 1 and R668 368 from this topic. The totals repaid are identical, so the only thing separating them is timing — and timing is worth R89 971. This is the whole point of the module in one comparison.'
      }
    ]
  }

  ]
});
