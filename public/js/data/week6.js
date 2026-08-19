/* Week 6 — Annuities, and paying a loan back with one
 *
 * PART OF THIS WEEK IS NOT HERE YET
 *
 *   Milpark lists five lessons. The notes PDF stops partway through the
 *   second, at section 2.6, so this file covers:
 *
 *     Lesson 1  The basic elements and calculations of annuities   1.1 - 1.10
 *     Lesson 2  Using an annuity to pay back a loan                2.1 - 2.6
 *
 *   Still to come, once the rest of the notes arrive:
 *
 *     Lesson 2  2.7 Compiling an amortisation table, 2.8 its exercise
 *     Lesson 3  Interest rate changes during term of amortised loan
 *     Lesson 4  PMT made at the beginning of an interest period
 *     Lesson 5  The effect of deposits and balloon payments
 *
 *   Lessons 3 to 5 are declared with no topics in lessons.js rather than left
 *   out, so the contents page shows the real shape of the week. The Week 6
 *   additional-exercises paper has 21 questions covering them; those are held
 *   back with the notes.
 *
 * ON THE NUMBERS
 *
 *   The exercises paper ships with no memo, so every answer here was computed
 *   from scratch and each one checked twice — annuity factors one way, a
 *   payment-by-payment roll-forward the other.
 *
 *   One error in the source notes is corrected rather than reproduced. Section
 *   1.1 prints the fourth deposit's value as "R1 000 x 1.1100 = R1 110". It is
 *   R1 100, and the notes' own total of R6 105.10 only adds up with R1 100 —
 *   R1 110 would make it R6 115.10. The formula in 1.2 gives R6 105.10, so the
 *   total is right and the one line is wrong.
 */

window.WEEK_DATA = window.WEEK_DATA || [];

window.WEEK_DATA.push({
  id: 'week6',
  number: 6,
  title: 'Annuities & Loan Repayments',
  emoji: '🔁',
  accent: 6,
  blurb: 'Regular equal payments — what they grow to, what instalment a loan needs, and where the money goes.',
  topics: [

  /* ═══════════════════════ WHAT AN ANNUITY IS ═══════════════════════ */
  {
    id: 'w6-annuity',
    title: 'What an Annuity Is',
    emoji: '🔁',
    summary: 'A series of equal payments, and why each one earns a different amount of interest.',
    notes: [
      {
        heading: 'Saving in instalments',
        emoji: '🐖',
        html:
          '<p>Almost nobody saves by putting one large sum away and leaving it. We put away smaller regular amounts — ' +
          'R500 a month here, R1 000 a year there. Loans work the same way in reverse: a fixed instalment, paid over ' +
          'and over until the debt is gone.</p>' +
          '<p>A series of equal payments made at regular intervals is called an <b>annuity</b>, and this week is the ' +
          'maths of them.</p>' +
          '<div class="keybox">An <b>annuity</b> is a series of consecutive payments, of <b>equal amount</b>, made at ' +
          '<b>regular intervals of equal length</b>.</div>' +
          '<p>The payment itself has a symbol of its own: <b>PMT</b>. It joins PV, FV, <span class="math">i</span> ' +
          'and n from the last two weeks.</p>'
      },
      {
        heading: 'Four words that decide which formula you need',
        emoji: '📖',
        html:
          '<div class="tablewrap"><table class="dtable">' +
          '<tr><th>Term</th><th>What it means</th></tr>' +
          '<tr><td><b>Ordinary annuity</b></td><td>Payments made at the <b>end</b> of each interval</td></tr>' +
          '<tr><td><b>Annuity-due</b></td><td>Payments made at the <b>beginning</b> of each interval</td></tr>' +
          '<tr><td><b>Simple annuity</b></td><td>The payment intervals and the interest periods <b>coincide</b> — ' +
          'paid monthly, compounded monthly</td></tr>' +
          '<tr><td><b>Complex annuity</b></td><td>They do <b>not</b> coincide — paid monthly, compounded yearly</td></tr>' +
          '</table></div>' +
          '<div class="watchout">Everything this week is a <b>simple ordinary annuity</b>: paid at the end, and the ' +
          'payment interval matches the compounding period. Complex annuities come later.</div>'
      },
      {
        heading: 'Worked example — the pay-point tablet',
        emoji: '📱',
        html:
          '<p>E-Bike SA\'s pay-point tablet lasts about five years. To part-fund replacing it you pay <b>R1 000 into a ' +
          'savings account at the end of each year for 5 years</b>, earning 10% per annum compounded annually. What is ' +
          'in the account at the end of year 5?</p>' +
          '<p>Treat each deposit as its own little investment — the trick from Week 5 — and the answer is five ' +
          'compound-interest sums added together.</p>' +
          '<div class="watchout"><b>The first deposit does not earn five years of interest.</b> It arrives at the ' +
          '<i>end</i> of year 1, so it only grows for the remaining 4 years. The last one arrives at the end of year 5 ' +
          'and earns nothing at all. That is what "ordinary" costs you.</div>' +
          '<div class="worked"><div class="worked-title">Five deposits, five different terms</div>' +
          '<div class="solstep"><div class="solstep-lab">Deposit 1 — grows 4 years</div>' +
          '<div class="solstep-val">R1 000 × (1.10)<sup>4</sup> = R1 000 × 1.46410 = R1 464.10</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Deposit 2 — grows 3 years</div>' +
          '<div class="solstep-val">R1 000 × (1.10)<sup>3</sup> = R1 000 × 1.33100 = R1 331.00</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Deposit 3 — grows 2 years</div>' +
          '<div class="solstep-val">R1 000 × (1.10)<sup>2</sup> = R1 000 × 1.21000 = R1 210.00</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Deposit 4 — grows 1 year</div>' +
          '<div class="solstep-val">R1 000 × (1.10)<sup>1</sup> = R1 000 × 1.10000 = R1 100.00</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Deposit 5 — grows not at all</div>' +
          '<div class="solstep-val">R1 000 × (1.10)<sup>0</sup> = R1 000 × 1.00000 = R1 000.00</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Add them up</div>' +
          '<div class="solstep-val">R6 105.10</div></div></div>' +
          '<p>R5 000 went in. R1 105.10 of interest came with it.</p>' +
          '<div class="watchout"><b>A misprint worth knowing about.</b> The notes give deposit 4 as "R1 000 × 1.1100 ' +
          '= R1 110". It is R1 100 — one year at 10% multiplies by 1.10, not 1.11. Their own total of R6 105.10 is ' +
          'correct and only works with R1 100; with R1 110 the column would add to R6 115.10.</div>'
      }
    ],
    questions: [
      {
        id: 'w6a1', type: 'mcq', marks: 2,
        prompt: 'What is an <b>annuity</b>?',
        options: [
          'A series of equal payments made at regular intervals of equal length',
          'A single large payment made at the end of a term',
          'Any payment made into a savings account',
          'The interest earned on a fixed deposit'
        ],
        answer: 0,
        solution: [
          { lab: 'Equal amounts', val: 'Every payment is the same size' },
          { lab: 'Equal intervals', val: 'And they arrive at regular, equal gaps' },
          { lab: 'Answer', val: 'A series of equal payments at regular intervals', final: true }
        ],
        why: 'Both halves matter. Payments of differing sizes, or at irregular gaps, are not an annuity and none of this week\'s formulas apply to them.'
      },
      {
        id: 'w6a2', type: 'mcq', marks: 2,
        prompt: 'An account is paid into at the <b>end</b> of every month, and interest is compounded <b>monthly</b>. What kind of annuity is that?',
        options: [
          'A simple ordinary annuity',
          'A simple annuity-due',
          'A complex ordinary annuity',
          'A complex annuity-due'
        ],
        answer: 0,
        solution: [
          { lab: 'Paid at the end', val: 'Ordinary, not due' },
          { lab: 'Monthly payments, monthly compounding', val: 'The periods coincide, so simple' },
          { lab: 'Answer', val: 'Simple ordinary', final: true }
        ],
        why: 'Two independent questions: WHEN in the period the payment falls (ordinary or due), and WHETHER the payment interval matches the compounding period (simple or complex). Everything this week is simple and ordinary.'
      },
      {
        id: 'w6a3', type: 'mcq', marks: 2,
        prompt: 'Payments are made <b>monthly</b> but interest is compounded <b>yearly</b>. What is that annuity called?',
        options: ['Complex', 'Simple', 'Ordinary', 'Annuity-due'],
        answer: 0,
        solution: [
          { lab: 'Payment interval', val: 'One month' },
          { lab: 'Interest period', val: 'One year' },
          { lab: 'They do not coincide', val: 'So the annuity is complex' },
          { lab: 'Answer', val: 'Complex', final: true }
        ],
        why: 'The formulas in this week only work when the two periods match. A complex annuity needs a different approach, which comes later in the course.'
      },
      {
        id: 'w6a4', type: 'numeric', marks: 3,
        prompt: 'R1 000 is paid into an account at the <b>end</b> of each year for 5 years, at 10% per annum compounded annually. How much interest has the <b>first</b> deposit earned by the end of year 5? Give your answer to two decimal places.',
        pre: 'R', answer: 464.10, tol: 1,
        solution: [
          { lab: 'When does it arrive?', val: 'End of year 1' },
          { lab: 'So how long does it grow?', val: '5 − 1 = 4 years' },
          { lab: 'Future value', val: 'R1 000 × (1.10)⁴ = R1 464.10' },
          { lab: 'Answer', val: 'R1 464.10 − R1 000 = R464.10', final: true }
        ],
        why: 'The n − 1 is the whole idea behind an ordinary annuity. Using 5 years here would give R1 610.51 and put the final answer out by nearly R150.'
      },
      {
        id: 'w6a5', type: 'numeric', marks: 4,
        prompt: 'Continuing that account: add up what all five R1 000 deposits are worth at the end of year 5. Give your answer to two decimal places.',
        pre: 'R', answer: 6105.10, tol: 1,
        solution: [
          { lab: 'Deposit 1, 4 years', val: 'R1 000 × 1.46410 = R1 464.10' },
          { lab: 'Deposit 2, 3 years', val: 'R1 000 × 1.33100 = R1 331.00' },
          { lab: 'Deposit 3, 2 years', val: 'R1 000 × 1.21000 = R1 210.00' },
          { lab: 'Deposit 4, 1 year', val: 'R1 000 × 1.10000 = R1 100.00' },
          { lab: 'Deposit 5, no growth', val: 'R1 000 × 1.00000 = R1 000.00' },
          { lab: 'Answer', val: 'R6 105.10', final: true }
        ],
        why: 'Six calculations for five deposits. The next topic replaces the whole thing with one formula — but do it the long way once, because that is where the formula comes from.'
      },
      {
        id: 'w6a6', type: 'mcq', marks: 2,
        prompt: 'In an <b>ordinary</b> annuity running for n periods, how many interest periods does the <b>last</b> payment earn?',
        options: [
          'None — it arrives at the very end of the term',
          'One',
          'n − 1',
          'n'
        ],
        answer: 0,
        solution: [
          { lab: 'Ordinary means', val: 'Paid at the END of each period' },
          { lab: 'The last period ends', val: 'On the last day of the term' },
          { lab: 'Answer', val: 'It earns no interest at all', final: true }
        ],
        why: 'Which is why an annuity-due — paid at the start — is always worth more than an otherwise identical ordinary annuity. Every payment gets one extra period.'
      }
    ]
  },

  /* ═══════════════════════ THE ANNUITY FORMULA ═══════════════════════ */
  {
    id: 'w6-annfv',
    title: 'The Annuity Formula',
    emoji: '📐',
    summary: 'One formula that replaces adding up every payment separately.',
    notes: [
      {
        heading: 'Six calculations become one',
        emoji: '✨',
        html:
          '<p>Adding five compound-interest sums works. It also takes six steps, and a 360-payment home loan would ' +
          'take 361. For a simple ordinary annuity there is a single formula:</p>' +
          '<div class="keybox"><b>FV = PMT × [ ((1 + <span class="math">i</span>)<sup>n</sup> − 1) ÷ ' +
          '<span class="math">i</span> ]</b></div>' +
          '<ul class="tickly">' +
          '<li><b>PMT</b> — the size of each payment</li>' +
          '<li><b><span class="math">i</span></b> — the rate for one period, which is the quoted annual rate ÷ m</li>' +
          '<li><b>n</b> — the number of payments, which is the term × m</li>' +
          '</ul>' +
          '<div class="watchout">It only holds for a <b>simple ordinary</b> annuity: paid at the end of each period, ' +
          'with the payment interval matching the compounding period. Check that before you reach for it.</div>'
      },
      {
        heading: 'Worked example — the same tablet, in one step',
        emoji: '📱',
        html:
          '<div class="worked"><div class="worked-title">R1 000 a year, 10% p.a., 5 years</div>' +
          '<div class="solstep"><div class="solstep-lab">PMT</div><div class="solstep-val">R1 000</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Rate per period</div>' +
          '<div class="solstep-val">Compounded once a year, so <span class="math">i</span> = 10% = 0.10</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Periods</div><div class="solstep-val">5 × 1 = 5</div></div>' +
          '<div class="solstep"><div class="solstep-lab">The bracket</div>' +
          '<div class="solstep-val">((1.10)<sup>5</sup> − 1) ÷ 0.10 = (1.61051 − 1) ÷ 0.10 = 6.10510</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Future value</div>' +
          '<div class="solstep-val">R1 000 × 6.10510 = R6 105.10</div></div></div>' +
          '<p>Same answer as adding the five deposits, in one line instead of six.</p>' +
          '<p>That 6.10510 is worth a second look: it says <i>five payments of R1 each would grow to R6.11</i>. ' +
          'The bracket is the annuity itself, and PMT just scales it.</p>'
      },
      {
        heading: 'Exercise — saving for retirement',
        emoji: '🎯',
        html:
          '<p><i>An employee deposits R500 at the end of each month into an account earning 8% per annum compounded ' +
          'monthly. What is in the account after 12 months?</i></p>' +
          '<div class="worked"><div class="worked-title">Solution</div>' +
          '<div class="solstep"><div class="solstep-lab">Rate per period</div>' +
          '<div class="solstep-val">8% ÷ 12 = 0.0066667</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Periods</div>' +
          '<div class="solstep-val">12 months = 12 payments</div></div>' +
          '<div class="solstep"><div class="solstep-lab">The bracket</div>' +
          '<div class="solstep-val">((1.0066667)<sup>12</sup> − 1) ÷ 0.0066667 = 12.44993</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Future value</div>' +
          '<div class="solstep-val">R500 × 12.44993 = R6 225</div></div></div>' +
          '<p>R6 000 paid in, R225 of interest. Not much in a year — but the bracket grows faster than the payments ' +
          'do, and over a working life that gap is the entire point of saving early.</p>'
      }
    ],
    questions: [
      {
        id: 'w6f1', type: 'mcq', marks: 2,
        prompt: 'In the formula FV = PMT × [((1 + <span class="math">i</span>)<sup>n</sup> − 1) ÷ <span class="math">i</span>], what does <b>n</b> count?',
        options: [
          'The number of payments made',
          'The number of years in the term',
          'The number of payments per year',
          'The number of Rand in each payment'
        ],
        answer: 0,
        solution: [
          { lab: 'Simple annuity', val: 'One payment per interest period' },
          { lab: 'So n is both', val: 'The number of periods AND the number of payments' },
          { lab: 'Answer', val: 'The number of payments', final: true }
        ],
        why: 'For a term in years, n = years × m. A 5-year annuity paid monthly has n = 60, not 5.'
      },
      {
        id: 'w6f2', type: 'numeric', marks: 4,
        prompt: 'R1 000 is paid into an account at the end of each year for 5 years at 10% per annum compounded annually. Use the annuity formula to find the accumulated amount, to two decimal places.',
        pre: 'R', answer: 6105.10, tol: 1,
        solution: [
          { lab: 'Identify', val: 'PMT = R1 000, i = 0.10, n = 5' },
          { lab: 'Formula', val: 'FV = PMT × [((1 + i)ⁿ − 1) ÷ i]' },
          { lab: 'The bracket', val: '((1.10)⁵ − 1) ÷ 0.10 = 0.61051 ÷ 0.10 = 6.10510' },
          { lab: 'Answer', val: 'R1 000 × 6.10510 = R6 105.10', final: true }
        ],
        why: 'The same R6 105.10 the five separate calculations gave. If the two ever disagree for you, it is almost always n − 1 creeping in somewhere it should not.'
      },
      {
        id: 'w6f3', type: 'numeric', marks: 4,
        prompt: 'An employee deposits R500 at the end of each month into an account earning 8% per annum compounded monthly. What has accumulated after 12 months? (Round to the nearest Rand.)',
        pre: 'R', answer: 6225, tol: 3,
        solution: [
          { lab: 'Rate per period', val: '8% ÷ 12 = 0.0066667' },
          { lab: 'Periods', val: 'n = 12' },
          { lab: 'The bracket', val: '((1.0066667)¹² − 1) ÷ 0.0066667 = 12.44993' },
          { lab: 'Answer', val: 'R500 × 12.44993 = R6 225', final: true }
        ],
        why: 'R6 000 went in over the year, so R225 is interest. Compare that to R6 000 deposited as one lump sum at the start, which would have earned R498 — the instalments are only in the account for part of the year.'
      },
      {
        id: 'w6f4', type: 'numeric', marks: 4,
        prompt: 'A client invests <b>R2 500 monthly</b> for 5 years into an account earning 7.25% per year compounded monthly. Calculate the accumulated value at the end of the term, to two decimal places.',
        pre: 'R', answer: 180145.19, tol: 3,
        solution: [
          { lab: 'Rate per period', val: '7.25% ÷ 12 = 0.00604167' },
          { lab: 'Periods', val: '5 × 12 = 60' },
          { lab: 'The bracket', val: '((1.00604167)⁶⁰ − 1) ÷ 0.00604167 = 72.058078' },
          { lab: 'Answer', val: 'R2 500 × 72.058078 = R180 145.19', final: true }
        ],
        why: 'R150 000 of payments, R30 145.19 of interest. Reasonability check: the bracket, 72.06, is only slightly more than the 60 payments themselves — which is what a modest rate over five years should look like.'
      },
      {
        id: 'w6f5', type: 'numeric', marks: 4,
        prompt: 'A client invests <b>R1 800 half-yearly</b> for 4 years into an account earning 7.25% per year compounded half-yearly. Calculate the accumulated value, to two decimal places.',
        pre: 'R', answer: 16365.64, tol: 3,
        solution: [
          { lab: 'Rate per period', val: '7.25% ÷ 2 = 0.03625' },
          { lab: 'Periods', val: '4 × 2 = 8' },
          { lab: 'The bracket', val: '((1.03625)⁸ − 1) ÷ 0.03625 = 9.09202' },
          { lab: 'Answer', val: 'R1 800 × 9.09202 = R16 365.64', final: true }
        ],
        why: 'Note the periodic rate is 3.625%, not 7.25%. Halving the compounding frequency halves the rate per period and halves n — both have to change together.'
      },
      {
        id: 'w6f6', type: 'numeric', marks: 4,
        prompt: 'A client invests <b>R3 500 quarterly</b> for 8 years into an account earning 8.50% per year compounded quarterly. Calculate the accumulated value, to two decimal places.',
        pre: 'R', answer: 158095.46, tol: 4,
        solution: [
          { lab: 'Rate per period', val: '8.5% ÷ 4 = 0.02125' },
          { lab: 'Periods', val: '8 × 4 = 32' },
          { lab: 'The bracket', val: '((1.02125)³² − 1) ÷ 0.02125 = 45.170132' },
          { lab: 'Answer', val: 'R3 500 × 45.170132 = R158 095.46', final: true }
        ],
        why: 'R112 000 of payments turned into R158 095.46. The bracket is 45.17 against 32 payments — over eight years the interest is doing real work.'
      },
      {
        id: 'w6f7', type: 'steps', marks: 5,
        scenario: 'A client invests R1 500 monthly for 3 years into an account earning 4.80% per year compounded monthly.',
        prompt: 'Work out the accumulated value at the end of the term.',
        steps: [
          {
            q: 'What is the interest rate per period, as a decimal?',
            answer: 0.004, tol: 0.0001,
            explain: '4.8% ÷ 12 = 0.4% per month, which as a decimal is 0.004.'
          },
          {
            q: 'How many payments are there?',
            answer: 36, tol: 0.01,
            explain: '3 years × 12 payments a year = 36.'
          },
          {
            q: 'Calculate the bracket ((1 + i)ⁿ − 1) ÷ i, to four decimal places.',
            answer: 38.6381, tol: 0.01,
            explain: '((1.004)³⁶ − 1) ÷ 0.004 = 0.154552 ÷ 0.004 = 38.6381.'
          },
          {
            q: 'Now find the accumulated value, to two decimal places.',
            pre: 'R', answer: 57957.16, tol: 3,
            explain: 'R1 500 × 38.6381 = R57 957.16.'
          }
        ],
        solution: [
          { lab: 'i, n', val: '0.004, 36' },
          { lab: 'Formula', val: 'FV = PMT × [((1 + i)ⁿ − 1) ÷ i]' },
          { lab: 'The bracket', val: '38.6381' },
          { lab: 'Answer', val: 'R1 500 × 38.6381 = R57 957.16', final: true }
        ],
        why: 'R54 000 of payments, R3 957.16 of interest. At 4.8% the bracket (38.64) sits close to the number of payments (36), which is the signature of a low rate over a short term.'
      }
    ]
  },

  /* ═══════════════════════ ON THE CALCULATOR ═══════════════════════ */
  {
    id: 'w6-anncalc',
    title: 'Annuities on the Calculator',
    emoji: '🧮',
    summary: 'The PMT key, and the two registers that go wrong if you forget them.',
    notes: [
      {
        heading: 'One more key than last week',
        emoji: '⌨️',
        html:
          '<p>Weeks 4 and 5 used N, I/YR, PV and FV. An annuity adds <b>PMT</b>, and the process is the one you ' +
          'already know: clear the registers, put in everything you know, press the key for the thing you do not.</p>' +
          '<div class="tablewrap"><table class="dtable">' +
          '<tr><th>Step</th><th>Keys</th><th>What it does</th></tr>' +
          '<tr><td>1</td><td>Clear all</td><td>Wipes every register, so nothing from the last question survives</td></tr>' +
          '<tr><td>2</td><td>1 → P/YR</td><td>Payments per year. Compounded annually here, so 1</td></tr>' +
          '<tr><td>3</td><td>1 000 +/− → PMT</td><td>The payment, negative — it leaves her hands</td></tr>' +
          '<tr><td>4</td><td>0 → PV</td><td><b>Not optional.</b> See below</td></tr>' +
          '<tr><td>5</td><td>5 → xP/YR</td><td>Turns 5 years into n = 5</td></tr>' +
          '<tr><td>6</td><td>10 → I/YR</td><td>The nominal annual rate</td></tr>' +
          '<tr><td>7</td><td>FV</td><td>Displays 6 105.10</td></tr>' +
          '</table></div>' +
          '<div class="watchout"><b>PMT is pressed straight after the number.</b> Unlike P/YR, it does not need the ' +
          'orange shift key first.</div>'
      },
      {
        heading: 'The two registers people forget',
        emoji: '⚠️',
        html:
          '<p>Nearly every wrong annuity answer comes from one of these two.</p>' +
          '<div class="keybox"><b>Set PV to 0</b> when nothing is paid in on day one. Leave an old PV in there and the ' +
          'calculator treats it as an opening deposit, and quietly adds its growth to your answer.<br><br>' +
          '<b>Set FV to 0</b> when solving a loan. Leave one in and the calculator treats it as a final lump sum still ' +
          'owing, which changes the instalment and the rate.</div>' +
          '<p>Clearing all the registers at step 1 does both — which is why it is step 1 and not an afterthought.</p>'
      },
      {
        heading: 'Signs, and why the answer comes back negative',
        emoji: '➖',
        html:
          '<p>Same convention as Week 5: money you <b>receive</b> is positive, money you <b>pay out</b> is negative. ' +
          'Saving R1 000 a year means the payments leave you, so PMT goes in as <b>−1 000</b> and the FV comes back ' +
          'positive — the balance is yours.</p>' +
          '<p>Solve for PMT on a loan and the calculator returns a negative number. It is not an error. It is telling ' +
          'you the instalment is money going out.</p>' +
          '<div class="watchout">Enter PMT positive <i>and</i> PV positive and the calculator has money flowing one ' +
          'way only. It will either error or hand back something meaningless.</div>'
      }
    ],
    questions: [
      {
        id: 'w6c1', type: 'mcq', marks: 2,
        prompt: 'You are finding the future value of an annuity where nothing is deposited on day one. Why must <b>PV be set to 0</b>?',
        options: [
          'Otherwise a value left in the PV register is treated as an opening deposit and its growth is added to the answer',
          'Because the present value of an annuity is always zero',
          'Because the calculator cannot solve for FV unless PV is zero',
          'Because PV and PMT cannot both hold a value at once'
        ],
        answer: 0,
        solution: [
          { lab: 'The registers keep their contents', val: 'Between one calculation and the next' },
          { lab: 'A leftover PV', val: 'Is read as money in the account from the start' },
          { lab: 'Answer', val: 'Its growth is silently added to your answer', final: true }
        ],
        why: 'The failure is quiet: no error, just a number that is too big by however much the stale value happened to grow. Clearing all the registers first is the habit that prevents it.'
      },
      {
        id: 'w6c2', type: 'mcq', marks: 2,
        prompt: 'You are finding the interest rate on a loan that is fully repaid by its instalments. Why must <b>FV be set to 0</b>?',
        options: [
          'A value left in FV is treated as a lump sum still owing at the end, which changes the rate',
          'Because loans have no future value',
          'Because the rate can only be found when FV is empty',
          'Because FV is only used for savings, never for loans'
        ],
        answer: 0,
        solution: [
          { lab: 'Fully repaid means', val: 'Nothing is left owing at the end' },
          { lab: 'A leftover FV', val: 'Says a final payment is still due' },
          { lab: 'And so', val: 'The instalments have less to cover, and the rate comes out wrong' },
          { lab: 'Answer', val: 'It is read as a lump sum still owing', final: true }
        ],
        why: 'A genuine final lump sum has a name — a balloon payment — and it does go in FV. But only when the agreement actually has one.'
      },
      {
        id: 'w6c3', type: 'mcq', marks: 2,
        prompt: 'Saving R500 a month, you enter PMT as <b>−500</b>. Why negative?',
        options: [
          'It is money paid out, and the calculator needs money moving in both directions',
          'Because savings are always negative',
          'Because the answer is required as a positive number',
          'Because PMT is subtracted from PV'
        ],
        answer: 0,
        solution: [
          { lab: 'Sign convention', val: 'Received is positive, paid out is negative' },
          { lab: 'A monthly deposit', val: 'Leaves your hands' },
          { lab: 'Answer', val: 'An outflow, so negative', final: true }
        ],
        why: 'The balance then comes back positive, which reads correctly: you paid money out and the account holds it for you.'
      },
      {
        id: 'w6c4', type: 'mcq', marks: 2,
        prompt: 'With P/YR set to 12, what does pressing <b>5 xP/YR</b> store?',
        options: ['n = 60', 'n = 5', 'i = 5%', 'PMT = 5'],
        answer: 0,
        solution: [
          { lab: 'P/YR is 12', val: 'Twelve periods in a year' },
          { lab: 'xP/YR multiplies years by P/YR', val: '5 × 12' },
          { lab: 'Answer', val: 'n = 60', final: true }
        ],
        why: 'Same shortcut as Week 5. If you would rather not trust it, enter 60 into N yourself — but never enter 5.'
      },
      {
        id: 'w6c5', type: 'numeric', marks: 3,
        prompt: 'Using a financial calculator: PMT = −R1 000 a year, PV = 0, n = 5, I/YR = 10, P/YR = 1. What does FV return, to two decimal places?',
        pre: 'R', answer: 6105.10, tol: 1,
        solution: [
          { lab: 'These are the tablet figures', val: 'R1 000 a year for 5 years at 10%' },
          { lab: 'The calculator does', val: 'PMT × [((1 + i)ⁿ − 1) ÷ i]' },
          { lab: 'Answer', val: 'R6 105.10', final: true }
        ],
        why: 'Identical to both the long way and the formula. Three routes, one answer — which is the point of learning all three.'
      },
      {
        id: 'w6c6', type: 'mcq', marks: 2,
        prompt: 'Which is the correct first step in <b>every</b> calculator TVM calculation?',
        options: [
          'Clear all the registers',
          'Enter the interest rate',
          'Set the number of periods',
          'Enter the payment amount'
        ],
        answer: 0,
        solution: [
          { lab: 'Registers keep their values', val: 'Until something overwrites them' },
          { lab: 'A stale PV or FV', val: 'Changes the answer without any warning' },
          { lab: 'Answer', val: 'Clear all first, every time', final: true }
        ],
        why: 'It costs one keystroke and removes the single most common source of wrong answers in this whole module.'
      }
    ]
  },

  /* ═══════════════════════ FINDING THE PAYMENT ═══════════════════════ */
  {
    id: 'w6-annpmt',
    title: 'Finding the Payment',
    emoji: '💰',
    summary: 'Working backwards from a target, or from a loan, to the instalment it needs.',
    notes: [
      {
        heading: 'The more useful question',
        emoji: '🎯',
        html:
          '<p>"What will my savings grow to?" is interesting. "<b>How much must I put away to reach R10 000?</b>" is ' +
          'the one people actually ask — and it is the same formula with PMT as the unknown.</p>' +
          '<div class="keybox"><b>PMT = FV ÷ [ ((1 + <span class="math">i</span>)<sup>n</sup> − 1) ÷ ' +
          '<span class="math">i</span> ]</b> &nbsp;— saving towards a target<br><br>' +
          '<b>PMT = PV ÷ [ (1 − (1 + <span class="math">i</span>)<sup>−n</sup>) ÷ <span class="math">i</span> ]</b> ' +
          '&nbsp;— repaying a loan</div>' +
          '<p>Two brackets, and which one you need depends on where the known amount sits. A savings <b>target</b> is ' +
          'at the end, so use the FV bracket. A <b>loan</b> is handed over at the start, so use the PV one.</p>' +
          '<div class="watchout">On a calculator there is no such choice — put the known amount in FV or in PV as ' +
          'appropriate, set the other to 0, and press PMT.</div>'
      },
      {
        heading: 'Worked example — saving for the replacement tablet',
        emoji: '📱',
        html:
          '<p>The replacement tablet will cost about <b>R10 000 in five years</b>. How much must go into the account at ' +
          'the end of each year, at 10% per annum compounded annually?</p>' +
          '<div class="worked"><div class="worked-title">Solution</div>' +
          '<div class="solstep"><div class="solstep-lab">Known</div>' +
          '<div class="solstep-val">FV = R10 000, <span class="math">i</span> = 0.10, n = 5, PV = 0</div></div>' +
          '<div class="solstep"><div class="solstep-lab">The bracket</div>' +
          '<div class="solstep-val">((1.10)<sup>5</sup> − 1) ÷ 0.10 = 6.10510</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Payment</div>' +
          '<div class="solstep-val">R10 000 ÷ 6.10510 = R1 638</div></div></div>' +
          '<p>R1 638 a year for five years is R8 190 of her own money; interest finds the last R1 810.</p>'
      },
      {
        heading: 'Exercise — R10 000 in a year, monthly',
        emoji: '🎯',
        html:
          '<p><i>How much must an employee save at the end of each month for 12 months to have R10 000, at 8% per annum ' +
          'compounded monthly?</i></p>' +
          '<div class="worked"><div class="worked-title">Solution</div>' +
          '<div class="solstep"><div class="solstep-lab">Rate per period</div>' +
          '<div class="solstep-val">8% ÷ 12 = 0.0066667, n = 12</div></div>' +
          '<div class="solstep"><div class="solstep-lab">The bracket</div>' +
          '<div class="solstep-val">((1.0066667)<sup>12</sup> − 1) ÷ 0.0066667 = 12.44993</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Payment</div>' +
          '<div class="solstep-val">R10 000 ÷ 12.44993 = R803</div></div></div>' +
          '<p>R803 × 12 = R9 636 of deposits. The account finds the other R364.</p>'
      }
    ],
    questions: [
      {
        id: 'w6p1', type: 'numeric', marks: 4,
        prompt: 'How much must be paid into an account at the <b>end of each year</b> for 5 years, at 10% per annum compounded annually, to have R10 000 at the end? (Round to the nearest Rand.)',
        pre: 'R', answer: 1638, tol: 2,
        solution: [
          { lab: 'Known', val: 'FV = R10 000, i = 0.10, n = 5' },
          { lab: 'Formula', val: 'PMT = FV ÷ [((1 + i)ⁿ − 1) ÷ i]' },
          { lab: 'The bracket', val: '6.10510' },
          { lab: 'Answer', val: 'R10 000 ÷ 6.10510 = R1 638', final: true }
        ],
        why: 'Check it forwards: R1 638 × 6.10510 = R10 000.16. Working an answer back through the formula you came from is the cheapest check there is.'
      },
      {
        id: 'w6p2', type: 'numeric', marks: 4,
        prompt: 'How much must be saved at the <b>end of each month</b> for 12 months to have R10 000, at 8% per annum compounded monthly? (Round to the nearest Rand.)',
        pre: 'R', answer: 803, tol: 2,
        solution: [
          { lab: 'Rate per period', val: '8% ÷ 12 = 0.0066667' },
          { lab: 'Periods', val: 'n = 12' },
          { lab: 'The bracket', val: '12.44993' },
          { lab: 'Answer', val: 'R10 000 ÷ 12.44993 = R803', final: true }
        ],
        why: 'Compare with the R500 a month that grew to R6 225 in the last topic: R803 is about 1.6 times R500, and R10 000 is about 1.6 times R6 225. The relationship between PMT and FV is a straight line.'
      },
      {
        id: 'w6p3', type: 'mcq', marks: 2,
        prompt: 'A client <b>borrows</b> R35 000 and repays it in equal monthly instalments. Which bracket do you divide by to find the instalment?',
        options: [
          'The present-value bracket, (1 − (1 + i)⁻ⁿ) ÷ i',
          'The future-value bracket, ((1 + i)ⁿ − 1) ÷ i',
          'Either — they give the same answer',
          'Neither — divide the loan by the number of payments'
        ],
        answer: 0,
        solution: [
          { lab: 'The known amount', val: 'R35 000, handed over at the START' },
          { lab: 'An amount at the start', val: 'Is a present value' },
          { lab: 'Answer', val: 'The present-value bracket', final: true }
        ],
        why: 'Deciding this is just asking where the known amount sits in time. Dividing the loan by the number of payments would ignore interest entirely and always come out too low.'
      },
      {
        id: 'w6p4', type: 'numeric', marks: 4,
        prompt: 'A client borrows R35 000 at 15.00% per annum compounded monthly, repayable in <b>8 equal monthly instalments</b>. Calculate each instalment, to two decimal places.',
        pre: 'R', answer: 4624.66, tol: 2,
        solution: [
          { lab: 'Rate per period', val: '15% ÷ 12 = 0.0125' },
          { lab: 'Periods', val: 'n = 8' },
          { lab: 'The bracket', val: '(1 − (1.0125)⁻⁸) ÷ 0.0125 = 7.568124' },
          { lab: 'Answer', val: 'R35 000 ÷ 7.568124 = R4 624.66', final: true }
        ],
        why: '8 × R4 624.66 = R36 997.28, so about R1 997 of interest on a R35 000 loan held for well under a year. That is the right order of magnitude for 15%.'
      },
      {
        id: 'w6p5', type: 'numeric', marks: 4,
        prompt: 'A client borrows R52 500 at 9.00% per annum compounded monthly, repayable in <b>12 equal monthly payments</b>. Calculate each payment, to two decimal places.',
        pre: 'R', answer: 4591.20, tol: 2,
        solution: [
          { lab: 'Rate per period', val: '9% ÷ 12 = 0.0075' },
          { lab: 'Periods', val: 'n = 12' },
          { lab: 'The bracket', val: '(1 − (1.0075)⁻¹²) ÷ 0.0075 = 11.434913' },
          { lab: 'Answer', val: 'R52 500 ÷ 11.434913 = R4 591.20', final: true }
        ],
        why: 'The bracket 11.43 against 12 payments says the instalments are worth slightly less than their face value once discounted — which is exactly what interest means.'
      },
      {
        id: 'w6p6', type: 'numeric', marks: 4,
        prompt: 'A client borrows R60 000 at 8.50% per annum compounded quarterly, repayable in <b>9 equal quarterly payments</b>. Calculate each payment, to two decimal places.',
        pre: 'R', answer: 7394.85, tol: 2,
        solution: [
          { lab: 'Rate per period', val: '8.5% ÷ 4 = 0.02125' },
          { lab: 'Periods', val: 'n = 9 quarters' },
          { lab: 'The bracket', val: '(1 − (1.02125)⁻⁹) ÷ 0.02125 = 8.113758' },
          { lab: 'Answer', val: 'R60 000 ÷ 8.113758 = R7 394.85', final: true }
        ],
        why: 'The question gives the number of payments directly, so there is no term to convert. When it does give years, remember to multiply.'
      },
      {
        id: 'w6p7', type: 'numeric', marks: 4,
        prompt: 'A client borrows R72 000 at 13.20% per annum compounded quarterly, repayable in <b>14 equal quarterly payments</b>. Calculate each payment, to two decimal places.',
        pre: 'R', answer: 6504.95, tol: 2,
        solution: [
          { lab: 'Rate per period', val: '13.2% ÷ 4 = 0.033' },
          { lab: 'Periods', val: 'n = 14 quarters' },
          { lab: 'The bracket', val: '(1 − (1.033)⁻¹⁴) ÷ 0.033 = 11.068501' },
          { lab: 'Answer', val: 'R72 000 ÷ 11.068501 = R6 504.95', final: true }
        ],
        why: '14 payments of R6 504.95 is R91 069.30 for a R72 000 loan — R19 069 of interest over three and a half years at 13.2%.'
      }
    ]
  },

  /* ═══════════════════════ RATE AND TERM ═══════════════════════ */
  {
    id: 'w6-annrate',
    title: 'Finding the Rate and the Term',
    emoji: '🔎',
    summary: 'The two unknowns the formula cannot be rearranged for, and what to do instead.',
    notes: [
      {
        heading: 'Why these two are different',
        emoji: '🧩',
        html:
          '<p>FV and PMT come out of the formula by simple rearranging. <span class="math">i</span> and n do not.</p>' +
          '<p><b>n</b> is stuck in an exponent, so freeing it takes logarithms. <b><span class="math">i</span></b> is in ' +
          'three places at once and cannot be freed at all — there is no formula for it, only trial and improvement.</p>' +
          '<div class="keybox">This is where the financial calculator stops being a convenience and becomes the ' +
          'method. Enter every value you know, press the key for the one you do not, and it does the searching.</div>' +
          '<p>The process is identical to every other TVM calculation in this module:</p>' +
          '<ul class="tickly">' +
          '<li>Clear all the registers.</li>' +
          '<li>Set P/YR to the number of payments a year.</li>' +
          '<li>Enter PMT (negative), and PV and FV — <b>including the one that is zero</b>.</li>' +
          '<li>Enter whichever of n or I/YR you know.</li>' +
          '<li>Press the key for the one you do not.</li>' +
          '</ul>'
      },
      {
        heading: 'Worked example — what rate do I need?',
        emoji: '📈',
        html:
          '<p><i>An employee can save R750 at the end of each month for 12 months. She wants at least R9 500 in the ' +
          'account at the end. What nominal annual rate, compounded monthly, does she need?</i></p>' +
          '<div class="worked"><div class="worked-title">On the calculator</div>' +
          '<div class="solstep"><div class="solstep-lab">P/YR</div><div class="solstep-val">12</div></div>' +
          '<div class="solstep"><div class="solstep-lab">PMT</div><div class="solstep-val">−750</div></div>' +
          '<div class="solstep"><div class="solstep-lab">PV</div><div class="solstep-val">0 — nothing is deposited on day one</div></div>' +
          '<div class="solstep"><div class="solstep-lab">n</div><div class="solstep-val">1 xP/YR = 12</div></div>' +
          '<div class="solstep"><div class="solstep-lab">FV</div><div class="solstep-val">9 500</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">I/YR</div>' +
          '<div class="solstep-val">11.73% per annum, compounded monthly</div></div></div>' +
          '<p>The effective monthly rate is 11.73% ÷ 12 = 0.9775% per month.</p>' +
          '<div class="watchout"><b>"At least" decides which way you round.</b> If this question asked for whole ' +
          'percent, the answer is <b>12%</b>, not 11% — rounding down would leave her short of the R9 500 she said she ' +
          'needed. Read the wording before you round.</div>'
      },
      {
        heading: 'Finding n',
        emoji: '📅',
        html:
          '<p>Same idea the other way round: enter PV, PMT and I/YR, then press N. The answer comes back as a number of ' +
          '<b>periods</b>, not years — divide by P/YR if the question wants years.</p>' +
          '<div class="watchout">A real n almost always lands on a whole number or a whisker off one (71.9998 is 72). ' +
          'If yours comes out at 43.7, something is wrong — usually a rate entered as the periodic rate when the ' +
          'calculator wanted the annual one.</div>'
      }
    ],
    questions: [
      {
        id: 'w6r1', type: 'mcq', marks: 2,
        prompt: 'Why can the annuity formula not simply be rearranged to make <b><span class="math">i</span></b> the subject?',
        options: [
          'Because i appears in several places at once, including inside a power',
          'Because i is always unknown',
          'Because the formula only works forwards',
          'Because i is a percentage rather than a decimal'
        ],
        answer: 0,
        solution: [
          { lab: 'Look at the formula', val: 'i is in the bracket twice and inside an exponent' },
          { lab: 'No amount of algebra', val: 'Gets it onto one side by itself' },
          { lab: 'Answer', val: 'It appears in several places, one of them a power', final: true }
        ],
        why: 'The calculator does not solve it either — it guesses, checks, and improves until it is close enough. That is why finding i takes it a noticeable moment.'
      },
      {
        id: 'w6r2', type: 'numeric', marks: 4,
        prompt: 'An employee saves R750 at the end of each month for 12 months and wants at least R9 500 in the account. What nominal annual rate compounded monthly is needed? Give your answer as a percentage to two decimal places.',
        suf: '%', answer: 11.73, tol: 0.05,
        solution: [
          { lab: 'Known', val: 'PMT = −750, PV = 0, n = 12, FV = 9 500, P/YR = 12' },
          { lab: 'Press', val: 'I/YR' },
          { lab: 'Answer', val: '11.73% per annum compounded monthly', final: true }
        ],
        why: 'The effective monthly rate is 11.73 ÷ 12 = 0.9775%. If the question had asked for whole percent the answer would be 12% — "at least R9 500" means you round up, not to nearest.'
      },
      {
        id: 'w6r3', type: 'numeric', marks: 4,
        prompt: 'A client invests R1 500.00 monthly for 3 years. The accumulated value at the end is R62 403.85. Calculate the annual interest rate, compounded monthly. Give your answer as a percentage to two decimal places.',
        suf: '%', answer: 9.72, tol: 0.05,
        solution: [
          { lab: 'Known', val: 'PMT = −1 500, PV = 0, n = 36, FV = 62 403.85, P/YR = 12' },
          { lab: 'Press', val: 'I/YR' },
          { lab: 'Answer', val: '9.72% per annum compounded monthly', final: true }
        ],
        why: 'Sanity check first: R54 000 of payments grew to R62 403.85, so about R8 400 of interest. A rate somewhere near 10% is exactly what you would expect, and an answer of 0.81% or 97% would be a decimal place gone astray.'
      },
      {
        id: 'w6r4', type: 'numeric', marks: 4,
        prompt: 'A client invests R6 500.00 quarterly for 7 years. The accumulated value at the end is R236 540.30. Calculate the annual interest rate, compounded quarterly. Give your answer as a percentage to two decimal places.',
        suf: '%', answer: 7.50, tol: 0.05,
        solution: [
          { lab: 'Known', val: 'PMT = −6 500, PV = 0, n = 28, FV = 236 540.30, P/YR = 4' },
          { lab: 'Press', val: 'I/YR' },
          { lab: 'Answer', val: '7.50% per annum compounded quarterly', final: true }
        ],
        why: 'A clean 7.50% is a good sign the question was built from that rate. n = 7 × 4 = 28, not 7 — getting the periods wrong here is the difference between 7.5% and a nonsense answer.'
      },
      {
        id: 'w6r5', type: 'numeric', marks: 4,
        prompt: 'A client invests R11 500.00 yearly for 11 years. The accumulated value at the end is R203 804.35. Calculate the annual interest rate, compounded yearly. Give your answer as a percentage to two decimal places.',
        suf: '%', answer: 9.17, tol: 0.05,
        solution: [
          { lab: 'Known', val: 'PMT = −11 500, PV = 0, n = 11, FV = 203 804.35, P/YR = 1' },
          { lab: 'Press', val: 'I/YR' },
          { lab: 'Answer', val: '9.17% per annum compounded yearly', final: true }
        ],
        why: 'Compounded yearly, so P/YR = 1 and the annual rate IS the periodic rate. This is the one case where those two numbers are the same, and it is worth noticing rather than assuming.'
      },
      {
        id: 'w6r6', type: 'numeric', marks: 4,
        prompt: 'A client borrows R250 000.00 at 6.70% per annum compounded monthly, repayable in monthly instalments of R7 685.03. How many monthly payments will they make?',
        answer: 36, tol: 0.6,
        solution: [
          { lab: 'Known', val: 'PV = 250 000, PMT = −7 685.03, FV = 0, I/YR = 6.7, P/YR = 12' },
          { lab: 'Press', val: 'N' },
          { lab: 'Answer', val: '36 payments — three years', final: true }
        ],
        why: 'FV = 0 matters here: the loan is fully repaid by the instalments. Leave a value in FV and the calculator thinks a lump sum is still owing and asks for fewer payments.'
      },
      {
        id: 'w6r7', type: 'numeric', marks: 4,
        prompt: 'A client borrows R2 400 000.00 at 10.50% per annum compounded monthly, repayable in monthly instalments of R23 961.12. How many monthly payments will they make?',
        answer: 240, tol: 1,
        solution: [
          { lab: 'Known', val: 'PV = 2 400 000, PMT = −23 961.12, FV = 0, I/YR = 10.5, P/YR = 12' },
          { lab: 'Press', val: 'N' },
          { lab: 'Answer', val: '240 payments — twenty years', final: true }
        ],
        why: '240 payments of R23 961.12 is R5 750 669 on a R2 400 000 loan. Over twenty years the interest more than doubles what was borrowed, which is worth seeing written down at least once.'
      },
      {
        id: 'w6r8', type: 'numeric', marks: 4,
        prompt: 'A client borrows R230 000.00 at 13.10% per annum compounded half-yearly, repayable in half-yearly instalments of R37 848.58. How many half-yearly payments will they make?',
        answer: 8, tol: 0.3,
        solution: [
          { lab: 'Rate per period', val: '13.1% ÷ 2 = 6.55%' },
          { lab: 'Known', val: 'PV = 230 000, PMT = −37 848.58, FV = 0, I/YR = 13.1, P/YR = 2' },
          { lab: 'Press', val: 'N' },
          { lab: 'Answer', val: '8 payments — four years', final: true }
        ],
        why: 'The answer is 8 PAYMENTS, which is 4 years. The calculator always returns periods; converting to years is yours to do, and only if the question asks for it.'
      }
    ]
  },

  /* ═══════════════════════ WHAT A LOAN COSTS ═══════════════════════ */
  {
    id: 'w6-loancost',
    title: 'What a Loan Really Costs',
    emoji: '🚚',
    summary: 'Reading a financing offer: what you pay in total, how much of it is interest, and the rate hiding behind it.',
    notes: [
      {
        heading: 'The offer on the table',
        emoji: '📄',
        html:
          '<p>E-Bike SA wants a branded pickup truck for events. The cash price is <b>R499 950</b>, which the business ' +
          'does not have. The dealership will finance it: <b>R9 262 a month for 72 months</b>.</p>' +
          '<p>Is that a good deal? You cannot tell. The advert gives you a price and a payment and no rate at all — ' +
          'which is exactly why it is worth knowing how to find one.</p>' +
          '<div class="keybox">Repaying a loan with regular equal payments, each covering some interest and some of ' +
          'the capital, is called the <b>amortisation method</b>. By the last payment both the capital and all the ' +
          'interest are gone, so <b>FV = 0</b>.</div>'
      },
      {
        heading: 'Three questions, three answers',
        emoji: '🔢',
        html:
          '<div class="worked"><div class="worked-title">1 — What will it cost in total?</div>' +
          '<div class="solstep"><div class="solstep-lab">No TVM needed</div>' +
          '<div class="solstep-val">Just add up the payments</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Total paid</div>' +
          '<div class="solstep-val">R9 262 × 72 = R666 864</div></div></div>' +
          '<div class="worked"><div class="worked-title">2 — How much of that is interest?</div>' +
          '<div class="solstep"><div class="solstep-lab">The only extra cost</div>' +
          '<div class="solstep-val">Is the interest the dealership charges</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Interest</div>' +
          '<div class="solstep-val">R666 864 − R499 950 = R166 914</div></div></div>' +
          '<div class="worked"><div class="worked-title">3 — What rate is that?</div>' +
          '<div class="solstep"><div class="solstep-lab">P/YR</div><div class="solstep-val">12</div></div>' +
          '<div class="solstep"><div class="solstep-lab">PV</div><div class="solstep-val">499 950</div></div>' +
          '<div class="solstep"><div class="solstep-lab">PMT</div><div class="solstep-val">−9 262</div></div>' +
          '<div class="solstep"><div class="solstep-lab">FV</div><div class="solstep-val">0 — fully repaid</div></div>' +
          '<div class="solstep"><div class="solstep-lab">n</div><div class="solstep-val">6 xP/YR = 72</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">I/YR</div>' +
          '<div class="solstep-val">10% per annum compounded monthly</div></div></div>' +
          '<p>Now the offer means something. R166 914 is the price of not paying cash, and 10% is a number you can ' +
          'take to a bank and ask them to beat.</p>'
      },
      {
        heading: 'Why the total and the interest need no TVM at all',
        emoji: '💡',
        html:
          '<p>Questions 1 and 2 are arithmetic. Multiply the payment by the number of payments; subtract what was ' +
          'borrowed. No formula, no calculator functions.</p>' +
          '<div class="watchout">This only works because <b>every payment is the same size and nothing else moves</b> — ' +
          'no extra fees, no missed months, no lump sums. Add any of those and the arithmetic stops being enough.</div>'
      }
    ],
    questions: [
      {
        id: 'w6l1', type: 'numeric', marks: 2,
        prompt: 'A pickup truck is financed at R9 262 a month for 72 months. What is the total amount paid over the term?',
        pre: 'R', answer: 666864, tol: 2,
        solution: [
          { lab: 'Every payment is the same', val: 'So no TVM is needed' },
          { lab: 'Multiply', val: 'R9 262 × 72' },
          { lab: 'Answer', val: 'R666 864', final: true }
        ],
        why: 'The simplest calculation in the week, and worth doing first — it frames everything else. R666 864 for a R499 950 vehicle is the number a buyer should see before signing.'
      },
      {
        id: 'w6l2', type: 'numeric', marks: 2,
        prompt: 'The cash price of that truck is R499 950 and the total paid under the finance agreement is R666 864. How much interest is charged over the 72 months?',
        pre: 'R', answer: 166914, tol: 2,
        solution: [
          { lab: 'The only extra cost', val: 'Is interest' },
          { lab: 'Subtract', val: 'R666 864 − R499 950' },
          { lab: 'Answer', val: 'R166 914', final: true }
        ],
        why: 'A third of the cash price again, for the privilege of paying over six years. Whether that is worth it is a business decision — but it should be a decision, not a surprise.'
      },
      {
        id: 'w6l3', type: 'numeric', marks: 4,
        prompt: 'A loan of R499 950 is repaid with 72 monthly instalments of R9 262, with nothing owing at the end. Calculate the nominal annual interest rate compounded monthly, to two decimal places.',
        suf: '%', answer: 10.00, tol: 0.05,
        solution: [
          { lab: 'Known', val: 'PV = 499 950, PMT = −9 262, FV = 0, n = 72, P/YR = 12' },
          { lab: 'Press', val: 'I/YR' },
          { lab: 'Answer', val: '10.00% per annum compounded monthly', final: true }
        ],
        why: 'A clean 10% — the scenario was built from it. If you got something wild, check that FV is 0 and that n is 72 rather than 6.'
      },
      {
        id: 'w6l4', type: 'mcq', marks: 2,
        prompt: 'What is the <b>amortisation method</b>?',
        options: [
          'Repaying a loan with regular equal payments, each covering some interest and some capital',
          'Paying only the interest each period and the capital at the end',
          'Charging interest on the original amount for the whole term',
          'Reducing the interest rate as the loan is repaid'
        ],
        answer: 0,
        solution: [
          { lab: 'Each payment', val: 'Pays the interest due, then chips at the capital' },
          { lab: 'By the last one', val: 'Both are gone, so FV = 0' },
          { lab: 'Answer', val: 'Regular equal payments covering interest and capital', final: true }
        ],
        why: 'It is why FV must be set to 0 on the calculator. "Fully amortised" and "nothing owing at the end" are the same statement.'
      },
      {
        id: 'w6l5', type: 'mcq', marks: 2,
        prompt: 'Why can the total amount paid on a loan be found <b>without</b> any time value of money calculation?',
        options: [
          'Every payment is the same size, so it is just payment × number of payments',
          'Because interest is ignored when totalling payments',
          'Because the total always equals the amount borrowed',
          'Because the calculator cannot total payments'
        ],
        answer: 0,
        solution: [
          { lab: 'The question asks', val: 'How much money changes hands, not what it is worth' },
          { lab: 'Equal payments', val: 'Make that a multiplication' },
          { lab: 'Answer', val: 'Payment × number of payments', final: true }
        ],
        why: 'The distinction matters. R666 864 is what leaves the bank account; its VALUE today is R499 950. Both are true, and TVM is what connects them.'
      },
      {
        id: 'w6l6', type: 'steps', marks: 5,
        scenario: 'A vehicle with a cash price of R499 950 is financed at R9 262 a month for 72 months, with nothing owing at the end.',
        prompt: 'Work out what the finance costs and the rate behind it.',
        steps: [
          {
            q: 'What is the total amount paid over the term?',
            pre: 'R', answer: 666864, tol: 2,
            explain: 'R9 262 × 72 = R666 864.'
          },
          {
            q: 'How much of that is interest?',
            pre: 'R', answer: 166914, tol: 2,
            explain: 'R666 864 − R499 950 = R166 914.'
          },
          {
            q: 'What value goes into FV on the calculator?',
            answer: 0, tol: 0.01,
            explain: 'Nothing is owing at the end, so FV = 0. Leaving an old value there would give the wrong rate.'
          },
          {
            q: 'Calculate the nominal annual rate compounded monthly, as a percentage to two decimal places.',
            suf: '%', answer: 10.00, tol: 0.05,
            explain: 'With PV = 499 950, PMT = −9 262, FV = 0, n = 72 and P/YR = 12, I/YR returns 10.00%.'
          }
        ],
        solution: [
          { lab: 'Total paid', val: 'R9 262 × 72 = R666 864' },
          { lab: 'Interest', val: 'R666 864 − R499 950 = R166 914' },
          { lab: 'FV', val: '0 — the loan is fully amortised' },
          { lab: 'Rate', val: '10.00% per annum compounded monthly', final: true }
        ],
        why: 'Step 3 is the one that catches people. Every other value comes straight from the question; FV = 0 is something you have to know to supply.'
      }
    ]
  },

  /* ═══════════════════════ THE REPAYMENT SCHEDULE ═══════════════════════ */
  {
    id: 'w6-schedule',
    title: 'The Repayment Schedule',
    emoji: '📋',
    summary: 'Turning a timeline into a table, and reading the outstanding balance straight off it.',
    notes: [
      {
        heading: 'A simpler loan first',
        emoji: '🧾',
        html:
          '<p>Before a loan with 72 instalments, take one with a single repayment. <b>R5 000 borrowed at 10% per annum ' +
          'compounded annually for 5 years</b>, paid back in one go at the end.</p>' +
          '<div class="worked"><div class="worked-title">Year by year</div>' +
          '<div class="solstep"><div class="solstep-lab">Year 1</div>' +
          '<div class="solstep-val">R5 000 + R500 interest = R5 500</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Year 2</div>' +
          '<div class="solstep-val">R5 500 + R550 = R6 050</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Year 3</div>' +
          '<div class="solstep-val">R6 050 + R605 = R6 655</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Year 4</div>' +
          '<div class="solstep-val">R6 655 + R665.50 = R7 320.50</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Year 5</div>' +
          '<div class="solstep-val">R7 320.50 + R732.05 = R8 052.55</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Repay</div>' +
          '<div class="solstep-val">R8 052.55 — of which R5 000 is capital and R3 052.55 interest</div></div></div>' +
          '<p>The shortcut agrees: R5 000 × (1.10)<sup>5</sup> = R8 052.55.</p>'
      },
      {
        heading: 'The same thing as a table',
        emoji: '📊',
        html:
          '<p>A timeline is easy to read and hard to use. The same figures as a <b>repayment schedule</b> can be filed, ' +
          'audited and looked things up in.</p>' +
          '<div class="tablewrap"><table class="dtable">' +
          '<tr><th>End of year</th><th>Balance at start</th><th>Interest at 10%</th><th>Payment</th><th>Balance at end</th></tr>' +
          '<tr><td>1</td><td>5 000.00</td><td>500.00</td><td>—</td><td>5 500.00</td></tr>' +
          '<tr><td>2</td><td>5 500.00</td><td>550.00</td><td>—</td><td>6 050.00</td></tr>' +
          '<tr><td>3</td><td>6 050.00</td><td>605.00</td><td>—</td><td>6 655.00</td></tr>' +
          '<tr><td>4</td><td>6 655.00</td><td>665.50</td><td>—</td><td>7 320.50</td></tr>' +
          '<tr><td>5</td><td>7 320.50</td><td>732.05</td><td>8 052.55</td><td>—</td></tr>' +
          '<tr><td></td><td></td><td><b>3 052.55</b></td><td><b>8 052.55</b></td><td></td></tr>' +
          '</table></div>' +
          '<p>Each row is one interest period. The closing balance of one row is the opening balance of the next, ' +
          'which is what makes a schedule self-checking: if they ever fail to line up, the error is in that row.</p>'
      },
      {
        heading: 'Settling early',
        emoji: '🏁',
        html:
          '<p><i>What would it take to settle this loan at the end of year 3?</i></p>' +
          '<p>Read it off the table: the closing balance of row 3 is <b>R6 655</b>. No calculation at all — which is ' +
          'the whole reason for building the schedule.</p>' +
          '<div class="keybox">The <b>outstanding balance</b> at any point is the closing balance of that row. For a ' +
          'loan repaid by instalments it is also the present value of the payments <b>still to come</b>:<br><br>' +
          '<b>Balance = PMT × [ (1 − (1 + <span class="math">i</span>)<sup>−k</sup>) ÷ ' +
          '<span class="math">i</span> ]</b> &nbsp;where k is the number of payments left</div>' +
          '<p>That second form is the one you need when there are 72 rows and nobody is drawing the table.</p>' +
          '<div class="watchout">Count the payments <b>remaining</b>, not the ones made. After 2 of 8 instalments, ' +
          'k = 6.</div>'
      }
    ],
    questions: [
      {
        id: 'w6s1', type: 'numeric', marks: 3,
        prompt: 'R5 000 is borrowed at 10% per annum compounded annually and repaid in a single payment after 5 years. What is the repayment, to two decimal places?',
        pre: 'R', answer: 8052.55, tol: 1,
        solution: [
          { lab: 'Compound interest', val: 'FV = PV(1 + i)ⁿ' },
          { lab: 'Substitute', val: 'R5 000 × (1.10)⁵' },
          { lab: 'Apply the power', val: 'R5 000 × 1.61051' },
          { lab: 'Answer', val: 'R8 052.55', final: true }
        ],
        why: 'The schedule built year by year gives exactly the same figure. The table is not a different method — it is the same one with its working shown.'
      },
      {
        id: 'w6s2', type: 'numeric', marks: 3,
        prompt: 'On that same loan, what would it cost to settle it in full at the <b>end of year 3</b>? Give your answer to two decimal places.',
        pre: 'R', answer: 6655.00, tol: 1,
        solution: [
          { lab: 'Three years of growth', val: 'R5 000 × (1.10)³' },
          { lab: 'Apply the power', val: 'R5 000 × 1.331' },
          { lab: 'Answer', val: 'R6 655.00', final: true }
        ],
        why: 'On the schedule this is the closing balance of row 3 — read, not calculated. That is what the table buys you.'
      },
      {
        id: 'w6s3', type: 'mcq', marks: 2,
        prompt: 'In a repayment schedule, what should the <b>closing</b> balance of one row equal?',
        options: [
          'The opening balance of the next row',
          'The interest charged in the next row',
          'The original amount borrowed',
          'The total of all the payments'
        ],
        answer: 0,
        solution: [
          { lab: 'A row is one interest period', val: 'It ends where the next begins' },
          { lab: 'So', val: 'Closing balance = next opening balance' },
          { lab: 'Answer', val: 'The opening balance of the next row', final: true }
        ],
        why: 'This is what makes a schedule self-checking. Where two rows fail to line up, the mistake is in the row above — no need to check the rest.'
      },
      {
        id: 'w6s4', type: 'mcq', marks: 2,
        prompt: 'A loan is repaid in 8 equal instalments. After the <b>second</b> instalment, how many payments do you discount to find the outstanding balance?',
        options: ['6', '2', '8', '7'],
        answer: 0,
        solution: [
          { lab: 'What is still owed', val: 'Is the value of the payments still to come' },
          { lab: '8 payments, 2 made', val: '6 remain' },
          { lab: 'Answer', val: 'k = 6', final: true }
        ],
        why: 'Using the payments already made instead is the standard mistake, and it gives an answer that grows as the loan is repaid — which should be a warning in itself.'
      },
      {
        id: 'w6s5', type: 'numeric', marks: 4,
        prompt: 'A client borrows R180 000.00 at 15.00% per annum compounded quarterly, repayable in <b>8 equal quarterly payments of R26 459.71</b>. Calculate the outstanding balance after the <b>first</b> instalment, to two decimal places.',
        pre: 'R', answer: 160290.29, tol: 3,
        solution: [
          { lab: 'Rate per period', val: '15% ÷ 4 = 0.0375' },
          { lab: 'Payments remaining', val: '8 − 1 = 7' },
          { lab: 'The bracket', val: '(1 − (1.0375)⁻⁷) ÷ 0.0375 = 6.0579' },
          { lab: 'Answer', val: 'R26 459.71 × 6.0579 = R160 290.29', final: true }
        ],
        why: 'Check it the other way: R180 000 × 1.0375 = R186 750 owing just before the payment, less R26 459.71 = R160 290.29. Same answer, and worth doing once to see that the two views agree.'
      },
      {
        id: 'w6s6', type: 'numeric', marks: 4,
        prompt: 'On that same loan, calculate the outstanding balance after the <b>second</b> instalment, to two decimal places.',
        pre: 'R', answer: 139841.46, tol: 3,
        solution: [
          { lab: 'Payments remaining', val: '8 − 2 = 6' },
          { lab: 'The bracket', val: '(1 − (1.0375)⁻⁶) ÷ 0.0375 = 5.285072' },
          { lab: 'Answer', val: 'R26 459.71 × 5.285072 = R139 841.46', final: true }
        ],
        why: 'The balance fell R20 448.83 this quarter against R19 709.71 last quarter. Each payment is the same size but clears more capital than the one before, because there is less interest to cover first.'
      },
      {
        id: 'w6s7', type: 'numeric', marks: 4,
        prompt: 'A client borrows R200 000.00 at 9.50% per annum compounded yearly, repayable in <b>4 equal yearly payments of R62 412.60</b>. Calculate the outstanding balance after the <b>second</b> payment, to two decimal places.',
        pre: 'R', answer: 109050.60, tol: 3,
        solution: [
          { lab: 'Rate per period', val: 'Compounded yearly, so i = 0.095' },
          { lab: 'Payments remaining', val: '4 − 2 = 2' },
          { lab: 'The bracket', val: '(1 − (1.095)⁻²) ÷ 0.095 = 1.747253' },
          { lab: 'Answer', val: 'R62 412.60 × 1.747253 = R109 050.60', final: true }
        ],
        why: 'Halfway through the term, more than half the debt is still there — R109 050.60 of R200 000. Early instalments are mostly interest, and that is true of every amortised loan.'
      }
    ]
  }

  ]
});
