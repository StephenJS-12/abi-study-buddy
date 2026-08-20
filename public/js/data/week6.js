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
  },

  /* ═══════════════════════ THE AMORTISATION TABLE ═══════════════════════ */
  {
    id: 'w6-amort',
    title: 'The Amortisation Table',
    emoji: '🧾',
    summary: 'Row by row through a real loan: what each instalment pays for, and what is left.',
    notes: [
      {
        heading: 'Four columns and a rule',
        emoji: '📐',
        html:
          '<p>An <b>amortisation table</b> is the repayment schedule for a loan repaid by instalments. One row per ' +
          'interest period, and the same three sums every row:</p>' +
          '<div class="keybox">' +
          '<b>1.</b> Interest for the period = opening balance × <span class="math">i</span><br>' +
          '<b>2.</b> Capital repaid = payment − interest<br>' +
          '<b>3.</b> Closing balance = opening + interest − payment</div>' +
          '<p>The closing balance of one row is the opening balance of the next, which is what makes the table ' +
          'self-checking — where two rows fail to line up, the mistake is in the row above.</p>' +
          '<div class="watchout">Use the <b>effective rate for the period</b>, not the quoted annual one. A loan at ' +
          '12.73% per annum compounded monthly charges 12.73 ÷ 12 = <b>1.0608% a month</b>, and that is the number ' +
          'every row multiplies by.</div>'
      },
      {
        heading: 'Worked example — the employee loan',
        emoji: '👩‍💼',
        html:
          '<p>E-Bike SA lends an employee <b>R7 500</b> at 12.73% per annum compounded monthly, repaid in ' +
          '<b>4 monthly instalments of R1 925</b> deducted from her salary at the end of each month.</p>' +
          '<p>Before any arithmetic: 4 × R1 925 = <b>R7 700</b>, so R200 of the total is interest.</p>' +
          '<div class="tablewrap"><table class="dtable">' +
          '<tr><th>End of month</th><th>Balance at start</th><th>Interest at 1.0608%</th>' +
          '<th>Payment</th><th>Interest paid</th><th>Capital paid</th><th>Balance at end</th></tr>' +
          '<tr><td>1</td><td>7 500.00</td><td>79.56</td><td>1 925.00</td><td>79.56</td><td>1 845.44</td><td>5 654.56</td></tr>' +
          '<tr><td>2</td><td>5 654.56</td><td>59.99</td><td>1 925.00</td><td>59.99</td><td>1 865.01</td><td>3 789.55</td></tr>' +
          '<tr><td>3</td><td>3 789.55</td><td>40.20</td><td>1 925.00</td><td>40.20</td><td>1 884.80</td><td>1 904.75</td></tr>' +
          '<tr><td>4</td><td>1 904.75</td><td>20.21</td><td>1 925.00</td><td>20.21</td><td>1 904.79</td><td>(0.05)</td></tr>' +
          '<tr><td></td><td></td><td><b>199.96</b></td><td><b>7 700.00</b></td><td><b>199.96</b></td><td><b>≈7 500</b></td><td></td></tr>' +
          '</table></div>' +
          '<p>Look down the interest column: R79.56, R59.99, R40.20, R20.21. It falls every month, because the ' +
          'balance it is charged on is falling. The payment never changes, so the capital column has to rise to ' +
          'match — R1 845.44, R1 865.01, R1 884.80, R1 904.79.</p>' +
          '<div class="watchout"><b>The last balance is −5c, not zero.</b> Every row was rounded to the cent, and ' +
          'four rows of that adds up to a few cents. The notes say to ignore it, and they are right — but do not go ' +
          'hunting for a mistake that is not there.</div>'
      },
      {
        heading: 'Three checks worth doing every time',
        emoji: '✅',
        html:
          '<ul class="tickly">' +
          '<li>The <b>capital paid</b> column should total back to the amount borrowed.</li>' +
          '<li>The <b>interest for the month</b> column and the <b>interest paid</b> column should agree.</li>' +
          '<li>The final <b>closing balance</b> should be R0, or a few cents either side of it.</li>' +
          '</ul>' +
          '<p>All three come free once the table is built, and any one of them failing tells you a row is wrong ' +
          'before anyone else finds out.</p>'
      },
      {
        heading: 'Exercise — a colleague\'s loan',
        emoji: '🎯',
        html:
          '<p><i>A bank offers a colleague R10 000 at 19.05% per annum compounded monthly, repayable in 4 equal ' +
          'monthly instalments of R2 600 at the end of each month. Build the table. If she settles at the end of ' +
          'the second month, what does she still owe after making that payment?</i></p>' +
          '<div class="worked"><div class="worked-title">Solution</div>' +
          '<div class="solstep"><div class="solstep-lab">Rate per period</div>' +
          '<div class="solstep-val">19.05% ÷ 12 = 1.5875% a month</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Month 1</div>' +
          '<div class="solstep-val">Interest R158.75, capital R2 441.25, balance R7 558.75</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Month 2</div>' +
          '<div class="solstep-val">Interest R120.00, capital R2 480.00, balance <b>R5 078.75</b></div></div></div>' +
          '<p>So settling after the second payment costs her another R5 078.75 — and saves the R121.26 of interest ' +
          'that months 3 and 4 would have charged.</p>'
      }
    ],
    questions: [
      {
        id: 'w6m1', type: 'mcq', marks: 2,
        prompt: 'In an amortisation table, how is the <b>capital repaid</b> in a row worked out?',
        options: [
          'Payment minus the interest for that period',
          'The payment divided by the number of periods',
          'Opening balance minus the payment',
          'The payment minus the closing balance'
        ],
        answer: 0,
        solution: [
          { lab: 'The payment does two jobs', val: 'It settles the period\'s interest first' },
          { lab: 'Whatever is left', val: 'Comes off the capital' },
          { lab: 'Answer', val: 'Payment − interest', final: true }
        ],
        why: 'Which is why the capital portion grows every period on a level instalment: the interest half shrinks as the balance falls, so more of the same payment is free to attack the debt.'
      },
      {
        id: 'w6m2', type: 'numeric', marks: 3,
        prompt: 'A loan of R7 500 is charged interest at 12.73% per annum compounded monthly. Calculate the interest for the <b>first</b> month, to two decimal places.',
        pre: 'R', answer: 79.56, tol: 0.5,
        solution: [
          { lab: 'Rate per period', val: '12.73% ÷ 12 = 1.0608% a month' },
          { lab: 'Charged on', val: 'The opening balance of R7 500' },
          { lab: 'Answer', val: 'R7 500 × 0.010608 = R79.56', final: true }
        ],
        why: 'Using 12.73% here would charge a year of interest in one month — R954.75 instead of R79.56. Converting the quoted rate to the period is the first thing every row does.'
      },
      {
        id: 'w6m3', type: 'numeric', marks: 3,
        prompt: 'That loan is repaid in 4 monthly instalments of R1 925. After the first payment, what is the outstanding balance? Give your answer to two decimal places.',
        pre: 'R', answer: 5654.56, tol: 1,
        solution: [
          { lab: 'Opening', val: 'R7 500.00' },
          { lab: 'Add the interest', val: '+ R79.56' },
          { lab: 'Subtract the payment', val: '− R1 925.00' },
          { lab: 'Answer', val: 'R5 654.56', final: true }
        ],
        why: 'The other route gives the same thing: capital repaid is R1 925 − R79.56 = R1 845.44, and R7 500 − R1 845.44 = R5 654.56. Use whichever you find easier and let the other check it.'
      },
      {
        id: 'w6m4', type: 'steps', marks: 5,
        scenario: 'Continuing that loan: the balance at the start of month 2 is R5 654.56, the rate is 1.0608% a month, and the payment is R1 925.',
        prompt: 'Complete the second row of the amortisation table.',
        steps: [
          {
            q: 'What is the interest for month 2, to two decimal places?',
            pre: 'R', answer: 59.99, tol: 0.5,
            explain: 'R5 654.56 × 0.010608 = R59.99. Less than month 1, because the balance is smaller.'
          },
          {
            q: 'How much capital does the payment repay, to two decimal places?',
            pre: 'R', answer: 1865.01, tol: 1,
            explain: 'R1 925.00 − R59.99 = R1 865.01 — more capital than month 1 repaid.'
          },
          {
            q: 'What is the balance at the end of month 2, to two decimal places?',
            pre: 'R', answer: 3789.55, tol: 1,
            explain: 'R5 654.56 + R59.99 − R1 925.00 = R3 789.55.'
          }
        ],
        solution: [
          { lab: 'Interest', val: 'R5 654.56 × 0.010608 = R59.99' },
          { lab: 'Capital', val: 'R1 925.00 − R59.99 = R1 865.01' },
          { lab: 'Closing', val: 'R5 654.56 − R1 865.01 = R3 789.55', final: true }
        ],
        why: 'Compare the two rows: interest fell from R79.56 to R59.99 and capital rose from R1 845.44 to R1 865.01. Every amortised loan does this, and it is why paying a little extra early is worth so much more than paying it late.'
      },
      {
        id: 'w6m5', type: 'numeric', marks: 4,
        prompt: 'A colleague borrows R10 000 at 19.05% per annum compounded monthly, repayable in 4 monthly instalments of R2 600. She settles at the end of the second month. How much does she still owe <b>after</b> making the second payment? Give your answer to two decimal places.',
        pre: 'R', answer: 5078.75, tol: 2,
        solution: [
          { lab: 'Rate per period', val: '19.05% ÷ 12 = 1.5875% a month' },
          { lab: 'Month 1', val: 'Interest R158.75, balance R10 000 + R158.75 − R2 600 = R7 558.75' },
          { lab: 'Month 2', val: 'Interest R120.00, balance R7 558.75 + R120.00 − R2 600 = R5 078.75' },
          { lab: 'Answer', val: 'R5 078.75', final: true }
        ],
        why: 'Two rows is quick enough by hand. Twenty-four would not be — which is exactly the problem the AMORT function in the next topic exists to solve.'
      },
      {
        id: 'w6m6', type: 'mcq', marks: 2,
        prompt: 'A completed amortisation table ends with a closing balance of <b>−R0.05</b> rather than exactly R0. What does that mean?',
        options: [
          'Nothing — it is rounding each row to the cent, accumulated over the table',
          'The instalment was too large and she has overpaid by 5c',
          'A row has been calculated wrongly',
          'The interest rate used was slightly too high'
        ],
        answer: 0,
        solution: [
          { lab: 'Every row', val: 'Is rounded to the nearest cent' },
          { lab: 'Four rows of that', val: 'Adds up to a few cents by the end' },
          { lab: 'Answer', val: 'Rounding, and safely ignored', final: true }
        ],
        why: 'Worth knowing so you do not spend twenty minutes hunting a mistake that is not there. A balance of −R50 would be a different matter entirely.'
      },
      {
        id: 'w6m7', type: 'mcq', marks: 2,
        prompt: 'Which of these is <b>not</b> one of the three reasonability checks on a completed amortisation table?',
        options: [
          'The payment column should total the amount borrowed',
          'The capital paid column should total the amount borrowed',
          'The two interest columns should agree',
          'The final closing balance should be R0 or close to it'
        ],
        answer: 0,
        solution: [
          { lab: 'The payments total', val: 'Capital AND interest together' },
          { lab: 'So they come to more', val: 'Than the amount borrowed' },
          { lab: 'Answer', val: 'The payment column totalling the loan is not a check', final: true }
        ],
        why: 'In the worked example the payments total R7 700 against R7 500 borrowed. The R200 gap is the interest — which is a useful number, just not a check.'
      }
    ]
  },

  /* ═══════════════════════ THE AMORT FUNCTION ═══════════════════════ */
  {
    id: 'w6-amortfn',
    title: 'The AMORT Function',
    emoji: '⚙️',
    summary: 'Reading any row of a 240-row table without building the 239 above it.',
    notes: [
      {
        heading: 'Why the table stops being an option',
        emoji: '📉',
        html:
          '<p>Four rows by hand is fine. Twenty-four is an afternoon. A twenty-year home loan is <b>240 rows</b>, and ' +
          'every one is a chance to make an arithmetic slip that quietly corrupts everything below it.</p>' +
          '<p>The calculator\'s <b>AMORT</b> function reads any row you ask for without building the ones above it.</p>' +
          '<div class="keybox">Enter the loan as usual — P/YR, PV, PMT, FV = 0, n, I/YR — then ask AMORT for a period. ' +
          'Pressing = steps through the values for that period: <b>principal paid</b>, <b>interest paid</b>, and the ' +
          '<b>balance</b> at the end of it.</div>' +
          '<div class="watchout">Everything must already be in the registers before you reach for AMORT. It reports on ' +
          'the loan the calculator is currently holding — if PMT or FV is stale, it will happily describe a loan that ' +
          'does not exist.</div>'
      },
      {
        heading: 'The outstanding balance, from the formula',
        emoji: '📐',
        html:
          '<p>Without a calculator the same figure comes from the payments still to come:</p>' +
          '<div class="keybox"><b>Balance after k payments = PMT × [ (1 − (1 + <span class="math">i</span>)<sup>−(n−k)</sup>) ÷ ' +
          '<span class="math">i</span> ]</b></div>' +
          '<div class="worked"><div class="worked-title">The pickup truck, two years in</div>' +
          '<div class="solstep"><div class="solstep-lab">The loan</div>' +
          '<div class="solstep-val">R499 950 over 72 months at 10% p.a. monthly, PMT R9 262</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Payments left after 24</div>' +
          '<div class="solstep-val">72 − 24 = 48</div></div>' +
          '<div class="solstep"><div class="solstep-lab">The bracket</div>' +
          '<div class="solstep-val">(1 − (1.008333)<sup>−48</sup>) ÷ 0.008333 = 39.42807</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Outstanding</div>' +
          '<div class="solstep-val">R9 262 × 39.42807 ≈ R365 183</div></div></div>' +
          '<div class="watchout"><b>The two routes differ by about 50c here, and AMORT is the one to trust.</b> ' +
          'R9 262 is a rounded instalment; the formula treats it as exact, while AMORT rolls the loan forward a month ' +
          'at a time exactly as the bank does. AMORT gives R365 183.13. On an exam answer either is accepted — but ' +
          'know which one the bank is using.</div>'
      }
    ],
    questions: [
      {
        id: 'w6x1', type: 'mcq', marks: 2,
        prompt: 'What does the <b>AMORT</b> function on a financial calculator give you?',
        options: [
          'The capital paid, interest paid and outstanding balance for a chosen period',
          'The total interest over the whole loan',
          'The instalment needed to repay a loan',
          'The number of payments still to come'
        ],
        answer: 0,
        solution: [
          { lab: 'You give it a period', val: 'Or a range of them' },
          { lab: 'It steps through', val: 'Principal, interest, then balance' },
          { lab: 'Answer', val: 'All three, for the period you asked about', final: true }
        ],
        why: 'It is the amortisation table on demand — any row, without the rows above it. On a 240-month loan that is the difference between a calculation and an afternoon.'
      },
      {
        id: 'w6x2', type: 'mcq', marks: 2,
        prompt: 'Before pressing AMORT, what must already be in the calculator?',
        options: [
          'The whole loan — P/YR, PV, PMT, FV and I/YR',
          'Only the period number you want to look at',
          'Only PV and the interest rate',
          'Nothing — AMORT asks for what it needs'
        ],
        answer: 0,
        solution: [
          { lab: 'AMORT reports on', val: 'The loan the calculator is holding' },
          { lab: 'A stale PMT or FV', val: 'Describes a loan that does not exist' },
          { lab: 'Answer', val: 'The whole loan must be entered first', final: true }
        ],
        why: 'And clear the registers before entering it, or a value from the last question is part of the loan without you knowing.'
      },
      {
        id: 'w6x3', type: 'numeric', marks: 4,
        prompt: 'A client borrows R150 000.00 at 8.5% per annum compounded monthly, repayable in equal monthly payments over <b>6 years</b>. Calculate the outstanding balance after <b>3 years</b>, to two decimal places.',
        pre: 'R', answer: 84477.85, tol: 4,
        solution: [
          { lab: 'Rate per period', val: '8.5% ÷ 12 = 0.00708333' },
          { lab: 'The instalment', val: 'R150 000 ÷ 46.99422 = R2 666.76' },
          { lab: 'Payments left', val: '72 − 36 = 36' },
          { lab: 'The bracket', val: '(1 − (1.00708333)⁻³⁶) ÷ 0.00708333 = 31.67723' },
          { lab: 'Answer', val: 'R2 666.76 × 31.67723 = R84 477.85', final: true }
        ],
        why: 'Halfway through the term and R84 477.85 of R150 000 is still owing — more than half. Early instalments are mostly interest, which is the single most useful fact about how a loan actually behaves.'
      },
      {
        id: 'w6x4', type: 'numeric', marks: 4,
        prompt: 'A client borrows R300 000.00 at 9.4% per annum compounded monthly over <b>7 years</b>. Calculate the outstanding balance after <b>5 years</b>, to two decimal places.',
        pre: 'R', answer: 106562.16, tol: 5,
        solution: [
          { lab: 'Rate per period', val: '9.4% ÷ 12 = 0.00783333' },
          { lab: 'The instalment', val: 'R300 000 over 84 months = R4 887.85' },
          { lab: 'Payments left', val: '84 − 60 = 24' },
          { lab: 'Answer', val: 'R4 887.85 × 21.80 = R106 562.16', final: true }
        ],
        why: 'Two steps every time: find the instalment from the whole loan, then discount only the payments that are left. Skipping the first step is the usual reason this comes out wrong.'
      },
      {
        id: 'w6x5', type: 'numeric', marks: 5,
        prompt: 'A client borrows R1 500 000.00 at 11.5% per annum compounded monthly over <b>20 years</b>. Calculate the outstanding balance after <b>10 years</b>, to two decimal places.',
        pre: 'R', answer: 1137764.07, tol: 12,
        solution: [
          { lab: 'Rate per period', val: '11.5% ÷ 12 = 0.00958333' },
          { lab: 'The instalment', val: 'R1 500 000 over 240 months = R15 996.44' },
          { lab: 'Payments left', val: '240 − 120 = 120' },
          { lab: 'Answer', val: 'R15 996.44 × 71.12867 = R1 137 764.07', final: true }
        ],
        why: 'Ten years of payments — R1 919 572 of them — and the debt has fallen by R362 236. That is not a mistake; at 11.5% almost the whole of an early instalment is interest. It is the most important thing anyone can know before signing a bond.'
      },
      {
        id: 'w6x6', type: 'numeric', marks: 5,
        prompt: 'A client borrows R1 200 000.00 at 10.5% per annum compounded <b>quarterly</b> over 10 years. Calculate the outstanding balance after <b>8 years</b>, to two decimal places.',
        pre: 'R', answer: 348153.96, tol: 6,
        solution: [
          { lab: 'Rate per period', val: '10.5% ÷ 4 = 0.02625' },
          { lab: 'Periods', val: '10 × 4 = 40 quarters' },
          { lab: 'The instalment', val: 'R1 200 000 over 40 quarters = R48 815.25' },
          { lab: 'Payments left', val: '40 − 32 = 8 quarters' },
          { lab: 'Answer', val: 'R48 815.25 × 7.13210 = R348 153.96', final: true }
        ],
        why: 'Quarterly, so everything is counted in quarters: 40 periods, not 10, and 8 left, not 2. Getting that conversion right is most of the work in these questions.'
      }
    ]
  },

  /* ═══════════════════════ WHEN THE RATE CHANGES ═══════════════════════ */
  {
    id: 'w6-ratechange',
    title: 'When the Rate Changes',
    emoji: '📉',
    summary: 'What happens to the instalment when the prime rate moves, and how to work out the new one.',
    notes: [
      {
        heading: 'Why a rate you agreed can change',
        emoji: '🏦',
        html:
          '<p>Long-term loan agreements in South Africa are usually written against the <b>prime lending rate</b> — ' +
          '"prime less 0.75%", or a fixed rate with a clause saying it moves with prime. When the Reserve Bank moves ' +
          'prime, your rate moves with it, by the same number of percentage points.</p>' +
          '<p>The capital does not change and neither does the term. What changes is the interest still to come, ' +
          'so the instalment has to be recalculated for the rest of the loan.</p>' +
          '<div class="keybox">Two steps, and they are the "mini-loan" idea from Week 5 again:<br><br>' +
          '<b>Step 1</b> — find the outstanding balance on the day the rate changes.<br>' +
          '<b>Step 2</b> — that balance is the PV of a fresh loan, over the periods that remain, at the new rate. ' +
          'Solve for PMT.</div>'
      },
      {
        heading: 'Worked example — the pickup truck, two years in',
        emoji: '🚚',
        html:
          '<p>R499 950 over 72 months at 10% per annum compounded monthly, instalments of R9 262. After <b>24 ' +
          'months</b> prime rises by 0.25%, so the rate becomes <b>10.25%</b>.</p>' +
          '<div class="worked"><div class="worked-title">Step 1 — where the loan stands</div>' +
          '<div class="solstep"><div class="solstep-lab">Use AMORT for period 24</div>' +
          '<div class="solstep-val">Or discount the 48 payments still to come</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Outstanding</div>' +
          '<div class="solstep-val">R365 183.13</div></div></div>' +
          '<div class="worked"><div class="worked-title">Step 2 — a fresh loan at the new rate</div>' +
          '<div class="solstep"><div class="solstep-lab">PV</div><div class="solstep-val">R365 183.13</div></div>' +
          '<div class="solstep"><div class="solstep-lab">n</div><div class="solstep-val">48 months left</div></div>' +
          '<div class="solstep"><div class="solstep-lab">I/YR</div><div class="solstep-val">10.25</div></div>' +
          '<div class="solstep"><div class="solstep-lab">FV</div><div class="solstep-val">0</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">New instalment</div>' +
          '<div class="solstep-val">R9 305.89</div></div></div>' +
          '<p>A quarter of a percent costs R43.89 a month — R2 106.72 over the remaining four years, on the same ' +
          'truck for the same term.</p>' +
          '<div class="watchout"><b>Clear the calculator between the two steps.</b> If the old PMT of R9 262 is still ' +
          'in the register when you solve step 2, it is treated as part of the new loan and the answer is wrong. The ' +
          'notes flag this, and it is the mistake people actually make.</div>'
      },
      {
        heading: 'Exercise — the home loan',
        emoji: '🎯',
        html:
          '<p><i>An employee bought a house for R1 000 000 ten years ago on a fifteen-year loan at prime less 1%, ' +
          'paying R10 442.25 a month. Prime was 10.5% and has not moved in those ten years. It has just risen by ' +
          '0.25%. What will the bank deduct for the 121st instalment?</i></p>' +
          '<div class="worked"><div class="worked-title">Solution</div>' +
          '<div class="solstep"><div class="solstep-lab">The old rate</div>' +
          '<div class="solstep-val">Prime 10.5% less 1% = 9.5% per annum compounded monthly</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Step 1 — balance after 120 months</div>' +
          '<div class="solstep-val">60 payments left, so R10 442.25 × 47.61 = R497 205.93</div></div>' +
          '<div class="solstep"><div class="solstep-lab">The new rate</div>' +
          '<div class="solstep-val">9.5% + 0.25% = 9.75%</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Step 2 — the new instalment</div>' +
          '<div class="solstep-val">R497 205.93 over 60 months at 9.75% = <b>R10 503.10</b></div></div></div>' +
          '<p>R60.85 a month more. Small on its own; R3 651 over the five years that remain.</p>' +
          '<div class="watchout"><b>"Prime less 1%" is a sum you have to do.</b> The rate in the calculation is 9.5%, ' +
          'never 10.5%. And when prime moves 0.25 points, the loan rate moves 0.25 points too — not by 0.25% of ' +
          'itself.</div>'
      }
    ],
    questions: [
      {
        id: 'w6k1', type: 'mcq', marks: 2,
        prompt: 'A loan is written at "prime less 1%" and prime is 10.5%. Prime then rises by 0.25 percentage points. What is the new rate on the loan?',
        options: ['9.75%', '10.75%', '9.5%', '9.52%'],
        answer: 0,
        solution: [
          { lab: 'The rate was', val: '10.5% − 1% = 9.5%' },
          { lab: 'Prime moves 0.25 points', val: 'So the loan moves 0.25 points' },
          { lab: 'Answer', val: '9.5% + 0.25% = 9.75%', final: true }
        ],
        why: '10.75% forgets the "less 1%". 9.52% treats the rise as 0.25% OF the rate rather than 0.25 percentage points — a different thing, and a much smaller one.'
      },
      {
        id: 'w6k2', type: 'mcq', marks: 2,
        prompt: 'When the rate changes partway through an amortised loan, what becomes the <b>present value</b> of the second calculation?',
        options: [
          'The outstanding balance on the day the rate changed',
          'The original amount borrowed',
          'The total of the payments still to come',
          'The original amount less everything paid so far'
        ],
        answer: 0,
        solution: [
          { lab: 'The rest of the loan', val: 'Is a fresh loan starting that day' },
          { lab: 'What is borrowed on that day', val: 'Is whatever is still owed' },
          { lab: 'Answer', val: 'The outstanding balance', final: true }
        ],
        why: 'The original amount less the payments made would be far too low — most of those payments were interest, not capital, and never touched the debt.'
      },
      {
        id: 'w6k3', type: 'numeric', marks: 5,
        prompt: 'R499 950 is borrowed over 72 months at 10% per annum compounded monthly, instalments of R9 262. After 24 months the rate rises to 10.25%. Calculate the new monthly instalment for the remaining term, to two decimal places.',
        pre: 'R', answer: 9305.89, tol: 3,
        solution: [
          { lab: 'Step 1 — balance after 24', val: 'R365 183.13' },
          { lab: 'Payments left', val: '72 − 24 = 48' },
          { lab: 'Step 2 — new PV, new rate', val: 'R365 183.13 over 48 months at 10.25%' },
          { lab: 'Answer', val: 'R9 305.89', final: true }
        ],
        why: 'R43.89 a month more for a quarter of a percent — R2 106.72 over the four years left. Worth knowing before signing something linked to prime.'
      },
      {
        id: 'w6k4', type: 'numeric', marks: 5,
        prompt: 'A home loan of R1 000 000 runs for 15 years at 9.5% per annum compounded monthly, with instalments of R10 442.25. After 10 years the rate rises to 9.75%. Calculate the new monthly instalment, to two decimal places.',
        pre: 'R', answer: 10503.10, tol: 3,
        solution: [
          { lab: 'Step 1 — balance after 120', val: '60 payments left, R10 442.25 × 47.61 = R497 205.93' },
          { lab: 'Step 2 — the new loan', val: 'R497 205.93 over 60 months at 9.75%' },
          { lab: 'Answer', val: 'R10 503.10', final: true }
        ],
        why: 'Ten years of payments totalling R1 253 070, and R497 205.93 of the original million is still owing. The instalment rise is the small news here.'
      },
      {
        id: 'w6k5', type: 'numeric', marks: 5,
        prompt: 'A client borrows R500 000.00 at 11.5% per annum compounded monthly over 5 years. After 2 years the rate changes to 11.0%. Calculate the new monthly payment for the remaining period, to two decimal places.',
        pre: 'R', answer: 10917.18, tol: 4,
        solution: [
          { lab: 'Original instalment', val: 'R500 000 over 60 months at 11.5% = R10 996.30' },
          { lab: 'Balance after 24', val: '36 payments left, R333 463.78' },
          { lab: 'New instalment', val: 'R333 463.78 over 36 months at 11.0%' },
          { lab: 'Answer', val: 'R10 917.18', final: true }
        ],
        why: 'The rate FELL here, so the instalment falls too — R79.12 a month. Everything works the same way in both directions; only the sign of the news changes.'
      },
      {
        id: 'w6k6', type: 'numeric', marks: 5,
        prompt: 'A client borrows R1 200 000.00 at 12.0% per annum compounded monthly over 10 years. After 6 years the rate changes to 9.0%. Calculate the new monthly payment for the remaining period, to two decimal places.',
        pre: 'R', answer: 16269.32, tol: 6,
        solution: [
          { lab: 'Original instalment', val: 'R1 200 000 over 120 months at 12% = R17 216.51' },
          { lab: 'Balance after 72', val: '48 payments left, R653 779.20' },
          { lab: 'New instalment', val: 'R653 779.20 over 48 months at 9.0%' },
          { lab: 'Answer', val: 'R16 269.32', final: true }
        ],
        why: 'A three-point drop and the instalment only falls R947.19 — about 5.5%. Late in a loan most of each payment is capital, and no interest rate can discount capital.'
      },
      {
        id: 'w6k7', type: 'numeric', marks: 5,
        prompt: 'A client borrows R1 600 000.00 at 12.0% per annum compounded monthly over 20 years. After 5 years the rate changes to 8.0%. Calculate the new monthly payment for the remaining period, to two decimal places.',
        pre: 'R', answer: 14028.11, tol: 8,
        solution: [
          { lab: 'Original instalment', val: 'R1 600 000 over 240 months at 12% = R17 617.38' },
          { lab: 'Balance after 60', val: '180 payments left, R1 467 909.26' },
          { lab: 'New instalment', val: 'R1 467 909.26 over 180 months at 8.0%' },
          { lab: 'Answer', val: 'R14 028.11', final: true }
        ],
        why: 'Five years of paying R17 617.38 a month — over a million Rand — and the debt has fallen by R132 091. Early in a long loan at a high rate, the capital barely moves.'
      }
    ]
  },

  /* ═══════════════════════ PAYING AT THE START ═══════════════════════ */
  {
    id: 'w6-due',
    title: 'Paying at the Start of the Period',
    emoji: '⏰',
    summary: 'An annuity due: the same loan, the same rate, a smaller instalment.',
    notes: [
      {
        heading: 'One day earlier, every time',
        emoji: '📅',
        html:
          '<p>Everything so far has assumed payments at the <b>end</b> of each period — an <b>ordinary annuity</b>. ' +
          'Move them to the <b>beginning</b> and it becomes an <b>annuity due</b>.</p>' +
          '<p>It sounds like a technicality. It is not. Every payment now arrives one full period earlier, so every ' +
          'payment has one more period to work — and the instalment needed to clear the same debt drops.</p>' +
          '<div class="keybox"><b>PMT<sub>due</sub> = PMT<sub>ordinary</sub> ÷ (1 + <span class="math">i</span>)</b>' +
          '<br><br>On the calculator: press <b>BEG</b> instead of END and enter everything exactly as before.</div>' +
          '<div class="watchout">The HP10bII defaults to <b>END</b>. It stays where you left it, so a calculation set ' +
          'to BEG for one question will still be in BEG for the next one — and nothing on the display shouts about ' +
          'it. Check the mode before you trust an answer.</div>'
      },
      {
        heading: 'Worked example — two scenarios, one loan',
        emoji: '⚖️',
        html:
          '<p><b>R10 000 at 10% per annum compounded annually, repaid in two equal annual payments.</b> Once with ' +
          'the payments at the end of each year, once at the beginning.</p>' +
          '<div class="tablewrap"><table class="dtable">' +
          '<tr><th></th><th>Paid at the END</th><th>Paid at the BEGINNING</th></tr>' +
          '<tr><td>Instalment</td><td>R5 761.90</td><td>R5 238.10</td></tr>' +
          '<tr><td>Total paid</td><td>R11 523.80</td><td>R10 476.20</td></tr>' +
          '<tr><td>Total interest</td><td>R1 523.81</td><td>R476.19</td></tr>' +
          '</table></div>' +
          '<p>Same loan, same rate, same number of payments. Paying at the start of each year cuts the instalment by ' +
          'R523.80 and the interest by <b>more than two thirds</b>.</p>' +
          '<p>The reason is plain once you look at the first payment. Paid at the end of year 1, it does nothing for ' +
          'twelve months while interest accrues on the whole R10 000. Paid on day one, it cuts the balance before a ' +
          'single day\'s interest is charged.</p>'
      },
      {
        heading: 'Exercise — the truck, paid in advance',
        emoji: '🚚',
        html:
          '<p><i>The dealership\'s second quote on the pickup truck keeps everything the same — R499 950 over 72 ' +
          'months at 10% per annum compounded monthly — but the instalments are payable at the <b>beginning</b> of ' +
          'each month. What is the new instalment?</i></p>' +
          '<div class="worked"><div class="worked-title">Solution</div>' +
          '<div class="solstep"><div class="solstep-lab">Ordinary instalment</div>' +
          '<div class="solstep-val">R9 262 (the first quote)</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Rate per period</div>' +
          '<div class="solstep-val">10% ÷ 12 = 0.008333</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Paid at the beginning</div>' +
          '<div class="solstep-val">R9 262 ÷ 1.008333 = <b>R9 185</b></div></div></div>' +
          '<p>R77 a month less, for paying on the 1st rather than the 31st. Over 72 months that is R5 511.</p>'
      }
    ],
    questions: [
      {
        id: 'w6d1', type: 'mcq', marks: 2,
        prompt: 'What is an <b>annuity due</b>?',
        options: [
          'An annuity whose payments are made at the beginning of each period',
          'An annuity that is overdue',
          'An annuity where the payments increase each period',
          'An annuity with a final lump sum'
        ],
        answer: 0,
        solution: [
          { lab: 'Ordinary', val: 'Paid at the end of each period' },
          { lab: 'Due', val: 'Paid at the beginning' },
          { lab: 'Answer', val: 'Payments at the beginning of each period', final: true }
        ],
        why: 'The name is unhelpful — nothing is late. It means the payment falls due at the start of the period rather than at its close.'
      },
      {
        id: 'w6d2', type: 'mcq', marks: 2,
        prompt: 'Two identical loans differ only in that one is paid at the beginning of each period and the other at the end. Which needs the <b>larger</b> instalment?',
        options: [
          'The one paid at the end',
          'The one paid at the beginning',
          'They are the same',
          'It depends on the interest rate'
        ],
        answer: 0,
        solution: [
          { lab: 'Paid at the beginning', val: 'Every payment works one period longer' },
          { lab: 'So each one does more', val: 'And fewer Rand are needed' },
          { lab: 'Answer', val: 'The one paid at the end', final: true }
        ],
        why: 'In the worked example: R5 761.90 at the end against R5 238.10 at the beginning. The rate matters to how big the gap is, never to which way round it goes.'
      },
      {
        id: 'w6d3', type: 'numeric', marks: 4,
        prompt: 'R10 000 is borrowed at 10% per annum compounded annually and repaid in <b>two equal annual payments made at the beginning</b> of each year. Calculate the payment, to two decimal places.',
        pre: 'R', answer: 5238.10, tol: 2,
        solution: [
          { lab: 'Paid at the end it would be', val: 'R10 000 ÷ 1.735537 = R5 761.90' },
          { lab: 'Paid at the beginning', val: 'Divide by one more period of growth' },
          { lab: 'Answer', val: 'R5 761.90 ÷ 1.10 = R5 238.10', final: true }
        ],
        why: 'Total interest falls from R1 523.81 to R476.19 — less than a third — for moving two payments twelve months earlier. Timing is worth more than most people expect.'
      },
      {
        id: 'w6d4', type: 'numeric', marks: 4,
        prompt: 'A client borrows R1 000 000.00 at 8.0% per annum compounded monthly over 5 years, payable at the <b>beginning</b> of each month with the first instalment payable immediately. Calculate each instalment, to two decimal places.',
        pre: 'R', answer: 20142.11, tol: 4,
        solution: [
          { lab: 'Rate per period', val: '8% ÷ 12 = 0.00666667' },
          { lab: 'Paid at the end it would be', val: 'R1 000 000 over 60 months = R20 276.39' },
          { lab: 'Answer', val: 'R20 276.39 ÷ 1.00666667 = R20 142.11', final: true }
        ],
        why: '"The first instalment is payable immediately" is the phrase that tells you it is an annuity due. Look for it — it is the only thing separating this from an ordinary question.'
      },
      {
        id: 'w6d5', type: 'numeric', marks: 4,
        prompt: 'A client borrows R400 000.00 at 9.0% per annum compounded monthly over 3 years, payable at the <b>beginning</b> of each month. Calculate each instalment, to two decimal places.',
        pre: 'R', answer: 12625.20, tol: 3,
        solution: [
          { lab: 'Rate per period', val: '9% ÷ 12 = 0.0075' },
          { lab: 'Paid at the end it would be', val: 'R400 000 over 36 months = R12 719.89' },
          { lab: 'Answer', val: 'R12 719.89 ÷ 1.0075 = R12 625.20', final: true }
        ],
        why: 'R94.69 a month, purely from paying on the 1st. Over 36 months that is R3 408.84 — real money for a change that costs nothing.'
      },
      {
        id: 'w6d6', type: 'numeric', marks: 4,
        prompt: 'A client borrows R350 000.00 at 11.0% per annum compounded monthly over 6 years, payable at the <b>beginning</b> of each month. Calculate each instalment, to two decimal places.',
        pre: 'R', answer: 6601.41, tol: 3,
        solution: [
          { lab: 'Rate per period', val: '11% ÷ 12 = 0.00916667' },
          { lab: 'Paid at the end it would be', val: 'R350 000 over 72 months = R6 661.93' },
          { lab: 'Answer', val: 'R6 661.93 ÷ 1.00916667 = R6 601.41', final: true }
        ],
        why: 'The higher the rate, the more a period of timing is worth: 11% here saves 0.91% of the instalment, where 8% saved only 0.66%.'
      },
      {
        id: 'w6d7', type: 'numeric', marks: 4,
        prompt: 'A pickup truck costing R499 950 is financed over 72 months at 10% per annum compounded monthly, with instalments payable at the <b>beginning</b> of each month. Calculate the instalment, to the nearest Rand.',
        pre: 'R', answer: 9185, tol: 3,
        solution: [
          { lab: 'Paid at the end', val: 'R9 262 — the dealership\'s first quote' },
          { lab: 'Rate per period', val: '10% ÷ 12 = 0.008333' },
          { lab: 'Answer', val: 'R9 262 ÷ 1.008333 = R9 185', final: true }
        ],
        why: 'The dealership\'s second quote, and the same truck at the same rate over the same term. R77 a month for paying at the start of the month instead of the end — R5 511 across the agreement.'
      }
    ]
  },

  /* ═══════════════════════ DEPOSITS ═══════════════════════ */
  {
    id: 'w6-deposit',
    title: 'Deposits Paid Upfront',
    emoji: '💵',
    summary: 'Money handed over on day one never gets financed, so it never earns the lender anything.',
    notes: [
      {
        heading: 'The deposit simply is not borrowed',
        emoji: '✂️',
        html:
          '<p>A deposit is paid on the day the agreement is signed, at the same moment the money for the purchase ' +
          'changes hands. So the net amount owing on day one is the price <b>less</b> the deposit — and that is the ' +
          'present value.</p>' +
          '<div class="keybox"><b>PV = cash price − deposit</b><br><br>Everything else is unchanged: same rate, same ' +
          'term, same method.</div>' +
          '<p>There is no new mathematics here at all. The only trap is reaching for the price when the question has ' +
          'already told you a deposit is being paid.</p>'
      },
      {
        heading: 'Worked example — the truck with a deposit',
        emoji: '🚚',
        html:
          '<p>The dealership\'s third quote: pay <b>R50 000</b> upfront on the R499 950 truck, finance the rest over ' +
          '72 months at 10% per annum compounded monthly.</p>' +
          '<div class="worked"><div class="worked-title">Solution</div>' +
          '<div class="solstep"><div class="solstep-lab">Financed</div>' +
          '<div class="solstep-val">R499 950 − R50 000 = R449 950</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Rate and periods</div>' +
          '<div class="solstep-val">0.008333 a month, n = 72</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Instalment</div>' +
          '<div class="solstep-val">R8 335.70</div></div></div>' +
          '<p>The quote said R8 336, which is the same figure rounded to the nearest Rand.</p>' +
          '<div class="keybox"><b>Reasonability first.</b> R8 336 against R9 262 for the same truck — lower, and it ' +
          'should be, because there is R50 000 less to finance and so less to charge interest on. A quote that came ' +
          'back <i>higher</i> after a deposit would be worth arguing about.</div>'
      },
      {
        heading: 'Exercise — working backwards to the deposit',
        emoji: '🎯',
        html:
          '<p><i>A friend is buying an apartment for R1 000 000. The bank offers a 15-year loan at 9.5% per annum ' +
          'compounded monthly, which works out at R10 442.25 a month. He wants to keep the payment <b>below ' +
          'R9 500</b>. How much must he put down?</i></p>' +
          '<p>This one runs backwards, and the trick is to notice which of the three numbers the calculator can find.</p>' +
          '<div class="worked"><div class="worked-title">Solution</div>' +
          '<div class="solstep"><div class="solstep-lab">Ask what R9 500 a month buys</div>' +
          '<div class="solstep-val">PMT = 9 500, n = 180, I/YR = 9.5, FV = 0 → solve for PV</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Most that can be financed</div>' +
          '<div class="solstep-val">R909 766</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Deposit needed</div>' +
          '<div class="solstep-val">R1 000 000 − R909 766 = <b>R90 234</b></div></div></div>' +
          '<div class="watchout">The calculator finds the <b>PV</b>. The deposit is what is left over when you take ' +
          'that away from the price — one subtraction the calculator will not do for you, and the step people ' +
          'forget.</div>'
      }
    ],
    questions: [
      {
        id: 'w6e1', type: 'mcq', marks: 2,
        prompt: 'An item costing R400 000 is bought with a R50 000 deposit and the rest financed. What is the <b>PV</b> of the loan?',
        options: ['R350 000', 'R400 000', 'R450 000', 'R50 000'],
        answer: 0,
        solution: [
          { lab: 'The deposit is paid', val: 'On day one, so it is never borrowed' },
          { lab: 'What is owing that day', val: 'R400 000 − R50 000' },
          { lab: 'Answer', val: 'R350 000', final: true }
        ],
        why: 'Using the full R400 000 is the whole mistake this topic exists to prevent, and it inflates every instalment by about 14%.'
      },
      {
        id: 'w6e2', type: 'numeric', marks: 4,
        prompt: 'A pickup truck with a cash price of R499 950 is bought with a R50 000 deposit, the balance financed over 72 months at 10% per annum compounded monthly. Calculate the monthly instalment, to two decimal places.',
        pre: 'R', answer: 8335.70, tol: 3,
        solution: [
          { lab: 'Financed', val: 'R499 950 − R50 000 = R449 950' },
          { lab: 'Rate per period', val: '10% ÷ 12 = 0.008333, n = 72' },
          { lab: 'Answer', val: 'R449 950 ÷ 53.97867 = R8 335.70', final: true }
        ],
        why: 'The dealership quoted R8 336, which is this rounded to the nearest Rand. Checking a quote yourself takes a minute and is the entire point of learning this.'
      },
      {
        id: 'w6e3', type: 'numeric', marks: 4,
        prompt: 'An item with a cost price of R400 000.00 is bought with a deposit of R50 000.00, the rest financed at 10.0% per annum compounded monthly over 5 years, payable at the end of each month. Calculate each instalment, to two decimal places.',
        pre: 'R', answer: 7436.47, tol: 3,
        solution: [
          { lab: 'Financed', val: 'R400 000 − R50 000 = R350 000' },
          { lab: 'Rate and periods', val: '10% ÷ 12 = 0.008333, n = 60' },
          { lab: 'Answer', val: 'R350 000 ÷ 47.06537 = R7 436.47', final: true }
        ],
        why: 'Reasonability: 60 × R7 436.47 is R446 188, plus the R50 000 deposit, for a R400 000 item. About R96 000 of interest over five years at 10% is the right shape.'
      },
      {
        id: 'w6e4', type: 'numeric', marks: 4,
        prompt: 'An item with a cost price of R250 000.00 is bought with a deposit of R25 000.00, the rest financed at 8.0% per annum compounded monthly over 4 years. Calculate each instalment, to two decimal places.',
        pre: 'R', answer: 5492.91, tol: 3,
        solution: [
          { lab: 'Financed', val: 'R250 000 − R25 000 = R225 000' },
          { lab: 'Rate and periods', val: '8% ÷ 12 = 0.00666667, n = 48' },
          { lab: 'Answer', val: 'R225 000 ÷ 40.96191 = R5 492.91', final: true }
        ],
        why: 'A 10% deposit cut the instalment by about 10% too. Over a short term at a modest rate the two move almost together — over twenty years they do not.'
      },
      {
        id: 'w6e5', type: 'numeric', marks: 5,
        prompt: 'An item with a cost price of R1 500 000.00 is bought with a deposit of R200 000.00, the rest financed at 9.0% per annum compounded monthly over <b>20 years</b>. Calculate each instalment, to two decimal places.',
        pre: 'R', answer: 11696.44, tol: 5,
        solution: [
          { lab: 'Financed', val: 'R1 500 000 − R200 000 = R1 300 000' },
          { lab: 'Rate and periods', val: '9% ÷ 12 = 0.0075, n = 240' },
          { lab: 'Answer', val: 'R1 300 000 ÷ 111.14495 = R11 696.44', final: true }
        ],
        why: '240 instalments of R11 696.44 is R2 807 145, plus the deposit, for a R1 500 000 item. Over twenty years the interest costs almost as much as the thing itself.'
      },
      {
        id: 'w6e6', type: 'numeric', marks: 5,
        prompt: 'A friend buying a R1 000 000 apartment wants his monthly payment to stay below R9 500. The bank offers 9.5% per annum compounded monthly over 15 years. How much must he pay as a deposit? Give your answer to the nearest Rand.',
        pre: 'R', answer: 90234, tol: 4,
        solution: [
          { lab: 'What R9 500 a month buys', val: 'PMT = 9 500, n = 180, I/YR = 9.5, FV = 0 → PV' },
          { lab: 'Most that can be financed', val: 'R909 766' },
          { lab: 'Answer', val: 'R1 000 000 − R909 766 = R90 234', final: true }
        ],
        why: 'The calculator gives you the PV; the subtraction at the end is yours. Stopping at R909 766 and calling it the deposit is the standard way to lose the marks here.'
      },
      {
        id: 'w6e7', type: 'mcq', marks: 2,
        prompt: 'You have worked out that R909 766 is the most that can be financed if the payment is to stay under R9 500. On a R1 000 000 apartment, what is that figure?',
        options: [
          'The present value of the loan — the deposit is the R90 234 left over',
          'The deposit he must pay',
          'The total he will repay over the term',
          'The outstanding balance after the first payment'
        ],
        answer: 0,
        solution: [
          { lab: 'The calculator solved for PV', val: 'The amount the payments can service' },
          { lab: 'Price − PV', val: 'Is what he must find himself' },
          { lab: 'Answer', val: 'The PV; the deposit is R90 234', final: true }
        ],
        why: 'Worth pausing on, because both numbers are plausible-looking answers to a question about a deposit. Only one of them is money he has to hand over.'
      }
    ]
  },

  /* ═══════════════════════ BALLOON PAYMENTS ═══════════════════════ */
  {
    id: 'w6-balloon',
    title: 'Balloon Payments',
    emoji: '🎈',
    summary: 'A lump sum left owing at the end — the lowest instalment, and the highest total cost.',
    notes: [
      {
        heading: 'A debt the instalments never clear',
        emoji: '🎈',
        html:
          '<p>Every loan so far has been fully amortised: the last instalment leaves nothing owing, so <b>FV = 0</b>. ' +
          'A <b>balloon payment</b> — sometimes called a residual — changes that. A lump sum is deliberately left ' +
          'owing at the end, and the instalments only have to cover the rest.</p>' +
          '<div class="keybox">The balloon is the <b>future value</b>. Enter it in FV instead of leaving FV at zero, ' +
          'and solve for PMT as usual.<br><br>By hand: <b>PMT = [ PV − balloon ÷ (1 + <span class="math">i</span>)<sup>n</sup> ] ' +
          '÷ annuity factor</b></div>' +
          '<p>The two are the same statement. Immediately after the last instalment the outstanding balance is the ' +
          'balloon; the balloon settles it; the balance goes to zero.</p>'
      },
      {
        heading: 'Worked example — the fourth quote',
        emoji: '🚚',
        html:
          '<p>The dealership\'s last offer on the R499 950 truck: 72 monthly instalments at 10% per annum compounded ' +
          'monthly, plus <b>R100 000</b> payable on settlement.</p>' +
          '<div class="worked"><div class="worked-title">Solution</div>' +
          '<div class="solstep"><div class="solstep-lab">PV</div><div class="solstep-val">R499 950</div></div>' +
          '<div class="solstep"><div class="solstep-lab">FV</div>' +
          '<div class="solstep-val">R100 000 — the balloon, still owing after instalment 72</div></div>' +
          '<div class="solstep"><div class="solstep-lab">n, I/YR</div><div class="solstep-val">72 months, 10%</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Instalment</div>' +
          '<div class="solstep-val">R8 242.72</div></div></div>' +
          '<p>The quote said R8 243. The lowest monthly payment of all four offers.</p>' +
          '<div class="watchout"><b>And the most expensive of the four.</b> 72 × R8 242.72 + R100 000 = R693 476, ' +
          'against R666 864 for the plain agreement. The R100 000 sits there accruing interest for six years, and ' +
          'that is what you are paying for.</div>'
      },
      {
        heading: 'Four quotes for one truck',
        emoji: '⚖️',
        html:
          '<p>The whole week, in one table. Same truck, same R499 950 cash price, same 10% per annum compounded ' +
          'monthly, same 72 months.</p>' +
          '<div class="tablewrap"><table class="dtable">' +
          '<tr><th>Quote</th><th>Monthly</th><th>Total paid</th></tr>' +
          '<tr><td>1 — plain, paid at month end</td><td>R9 262</td><td>R666 864</td></tr>' +
          '<tr><td>2 — paid at the start of the month</td><td>R9 185</td><td>R661 352</td></tr>' +
          '<tr><td>3 — R50 000 deposit</td><td>R8 336</td><td>R650 170</td></tr>' +
          '<tr><td>4 — R100 000 balloon</td><td>R8 243</td><td>R693 477</td></tr>' +
          '</table></div>' +
          '<p>Read the two columns against each other. The quote with the <b>lowest</b> monthly payment has the ' +
          '<b>highest</b> total cost, and the difference between best and worst is R43 307 — nearly nine percent of ' +
          'the truck.</p>' +
          '<div class="keybox">A monthly instalment on its own tells you what you can afford, not what something ' +
          'costs. Both questions matter, and they have different answers.</div>'
      }
    ],
    questions: [
      {
        id: 'w6b1', type: 'mcq', marks: 2,
        prompt: 'Where does a <b>balloon payment</b> go in a TVM calculation?',
        options: [
          'In FV — it is what is still owing after the last instalment',
          'In PV — it reduces the amount borrowed',
          'In PMT — it is added to each instalment',
          'Nowhere; it is handled separately afterwards'
        ],
        answer: 0,
        solution: [
          { lab: 'After the last instalment', val: 'The balloon is still owing' },
          { lab: 'An amount owing at the end', val: 'Is a future value' },
          { lab: 'Answer', val: 'FV', final: true }
        ],
        why: 'It is the exact opposite of a deposit. A deposit is paid at the start and comes off PV; a balloon is paid at the end and goes into FV.'
      },
      {
        id: 'w6b2', type: 'numeric', marks: 5,
        prompt: 'A truck costing R499 950 is financed over 72 months at 10% per annum compounded monthly, with a further R100 000 payable on settlement. Calculate the monthly instalment, to two decimal places.',
        pre: 'R', answer: 8242.72, tol: 4,
        solution: [
          { lab: 'PV', val: 'R499 950' },
          { lab: 'FV', val: 'R100 000 — the balloon' },
          { lab: 'Discount the balloon back', val: 'R100 000 ÷ (1.008333)⁷² = R54 848' },
          { lab: 'The instalments must cover', val: 'R499 950 − R54 848 = R445 102' },
          { lab: 'Answer', val: 'R445 102 ÷ 53.97867 = R8 242.72', final: true }
        ],
        why: 'Check it by rolling the loan forward 72 months at R8 242.72: the balance left is exactly R100 000, which the balloon then settles. That is the definition working.'
      },
      {
        id: 'w6b3', type: 'numeric', marks: 5,
        prompt: 'Equipment costing R400 000.00 is financed at 8.0% per annum compounded monthly over 5 years, payable at the end of each month, with a final settlement of R50 000.00. Calculate each instalment, to two decimal places.',
        pre: 'R', answer: 7430.07, tol: 3,
        solution: [
          { lab: 'Rate and periods', val: '8% ÷ 12 = 0.00666667, n = 60' },
          { lab: 'Balloon discounted back', val: 'R50 000 ÷ (1.00666667)⁶⁰ = R33 560.52' },
          { lab: 'Covered by instalments', val: 'R400 000 − R33 560.52 = R366 439.48' },
          { lab: 'Answer', val: 'R366 439.48 ÷ 49.31843 = R7 430.07', final: true }
        ],
        why: 'Without the balloon the instalment would be R8 111.64. The R50 000 left to the end saves R681.57 a month and costs R9 099 in extra interest overall.'
      },
      {
        id: 'w6b4', type: 'numeric', marks: 5,
        prompt: 'Equipment costing R350 000.00 is financed at 8.0% per annum compounded monthly over 5 years, with a final settlement of R25 000.00. Calculate each instalment, to two decimal places.',
        pre: 'R', answer: 6756.49, tol: 3,
        solution: [
          { lab: 'Rate and periods', val: '0.00666667, n = 60' },
          { lab: 'Balloon discounted back', val: 'R25 000 ÷ (1.00666667)⁶⁰ = R16 780.26' },
          { lab: 'Covered by instalments', val: 'R350 000 − R16 780.26 = R333 219.74' },
          { lab: 'Answer', val: 'R333 219.74 ÷ 49.31843 = R6 756.49', final: true }
        ],
        why: 'Half the balloon of the last question on a smaller loan, so a smaller saving. The balloon is worth exactly what it is worth TODAY — R16 780.26 — and nothing more.'
      },
      {
        id: 'w6b5', type: 'numeric', marks: 5,
        prompt: 'Equipment costing R600 000.00 is financed at 13.0% per annum compounded monthly over 5 years, with a final settlement of R200 000.00. Calculate each instalment, to two decimal places.',
        pre: 'R', answer: 11267.90, tol: 4,
        solution: [
          { lab: 'Rate and periods', val: '13% ÷ 12 = 0.01083333, n = 60' },
          { lab: 'Balloon discounted back', val: 'R200 000 ÷ (1.01083333)⁶⁰ = R104 774.77' },
          { lab: 'Covered by instalments', val: 'R600 000 − R104 774.77 = R495 225.23' },
          { lab: 'Answer', val: 'R495 225.23 ÷ 43.95094 = R11 267.90', final: true }
        ],
        why: 'A third of the price left to the end at 13%. The instalments total R676 074, and then R200 000 more is due — R876 074 for a R600 000 machine.'
      },
      {
        id: 'w6b6', type: 'numeric', marks: 5,
        prompt: 'Equipment costing R1 200 000.00 is financed at 9.5% per annum compounded monthly over 5 years, with a final settlement of R500 000.00. Calculate each instalment, to two decimal places.',
        pre: 'R', answer: 18659.64, tol: 6,
        solution: [
          { lab: 'Rate and periods', val: '9.5% ÷ 12 = 0.00791667, n = 60' },
          { lab: 'Balloon discounted back', val: 'R500 000 ÷ (1.00791667)⁶⁰ = R311 524.64' },
          { lab: 'Covered by instalments', val: 'R1 200 000 − R311 524.64 = R888 475.36' },
          { lab: 'Answer', val: 'R888 475.36 ÷ 47.61553 = R18 659.64', final: true }
        ],
        why: 'The balloon is R500 000 of a R1 200 000 machine — and in five years it still has to be found. That is the risk the low instalment is hiding.'
      },
      {
        id: 'w6b7', type: 'mcq', marks: 2,
        prompt: 'Four quotes for the same R499 950 truck at the same rate over the same term: R9 262 a month plain, R9 185 paid at month start, R8 336 after a R50 000 deposit, and R8 243 with a R100 000 balloon. Which costs the most in total?',
        options: [
          'The balloon quote, at R693 477',
          'The plain quote, at R666 864',
          'The deposit quote, at R650 170',
          'They all cost the same — only the timing differs'
        ],
        answer: 0,
        solution: [
          { lab: 'Lowest monthly', val: 'The balloon, at R8 243' },
          { lab: 'But R100 000', val: 'Accrues interest for the whole six years' },
          { lab: 'Total', val: '72 × R8 242.72 + R100 000 = R693 477' },
          { lab: 'Answer', val: 'The balloon quote', final: true }
        ],
        why: 'The cheapest month and the dearest deal are the same quote. Monthly affordability and total cost are different questions with different answers, and a quote that only advertises the first is telling you half the story.'
      }
    ]
  }

  ]
});
