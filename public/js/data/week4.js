/* Week 4 — Theory of interest: simple and compound
   Every figure below was calculated independently and checked against the Week 4 notes. */

window.WEEK_DATA = window.WEEK_DATA || [];

window.WEEK_DATA.push({
  id: 'week4',
  number: 4,
  title: 'Theory of Interest',
  emoji: '🏦',
  accent: 4,
  blurb: 'Time value of money, simple interest, compound interest and the financial calculator.',
  topics: [

  /* ═══════════════════════ TERMINOLOGY ═══════════════════════ */
  {
    id: 'w4-terms',
    title: 'Time Value of Money',
    emoji: '⏳',
    summary: 'The vocabulary you need before any interest calculation makes sense.',
    notes: [
      {
        heading: 'Why money has a time value',
        emoji: '💡',
        html:
          '<p>Money has earning potential — but only if it is invested. A delayed investment is a lost opportunity. ' +
          'Money invested today earns money as time passes.</p>' +
          '<p>That link between <b>time</b> and the <b>value of money</b> is where the phrase "time value of money" ' +
          'comes from. R100 today is worth more than R100 in ten years, because today\'s R100 could be earning interest ' +
          'in the meantime.</p>'
      },
      {
        heading: 'The key terms and their notation',
        emoji: '📖',
        html:
          '<div class="tablewrap"><table class="dtable">' +
          '<tr><th>Term</th><th>Notation</th><th>Meaning</th></tr>' +
          '<tr><td>Present value</td><td>PV</td><td>The amount of money we invest (or borrow) <b>now</b></td></tr>' +
          '<tr><td>Term</td><td>—</td><td>The total time frame the money is invested (or borrowed) for</td></tr>' +
          '<tr><td>Interest rate</td><td><span class="math">i</span></td><td>The rate at which the present value grows over time</td></tr>' +
          '<tr><td>Future value</td><td>FV</td><td>The value of that money at a certain point in the <b>future</b></td></tr>' +
          '<tr><td>Interest amount</td><td>—</td><td>The <b>difference</b> between the future value and the present value</td></tr>' +
          '<tr><td>Interest period</td><td>—</td><td>The regular interval after which interest is accumulated</td></tr>' +
          '<tr><td>Number of interest periods</td><td><span class="math">n</span></td><td>How many interest periods there are in the term</td></tr>' +
          '</table></div>' +
          '<div class="watchout"><b>Term is not the same as n.</b> A 5-year term with quarterly compounding has ' +
          'n = 20 interest periods. Confusing these two is the most common mistake in this whole week.</div>'
      },
      {
        heading: 'The two foundation formulas',
        emoji: '🧱',
        html:
          '<div class="keybox">' +
          '<b>Interest amount = PV × <span class="math">i</span></b> &nbsp;(for one interest period)<br><br>' +
          '<b>FV = PV + accumulated interest</b></div>' +
          '<div class="worked"><div class="worked-title">Worked example — the prize money</div>' +
          '<div class="solstep"><div class="solstep-lab">Present value (PV)</div><div class="solstep-val">R1 000 000 deposited today</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Interest rate (<span class="math">i</span>)</div><div class="solstep-val">8.5% per annum</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Term</div><div class="solstep-val">1 year, so n = 1</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Interest amount</div><div class="solstep-val">R1 000 000 × 0.085 = R85 000</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Future value (FV)</div>' +
          '<div class="solstep-val">R1 000 000 + R85 000 = R1 085 000</div></div></div>' +
          '<p>Rearranging that last line is genuinely useful: if you know FV and PV, the ' +
          '<b>interest amount = FV − PV</b>. You never have to build up the interest year by year.</p>' +
          '<div class="watchout"><b>Careful</b> — that shortcut only works if there were <b>no other movements</b> in ' +
          'the account: no withdrawals and no additional deposits.</div>'
      },
      {
        heading: 'Reading a quoted interest rate',
        emoji: '🔎',
        html:
          '<p>An interest rate quoted as <b>"10% per annum compounded quarterly"</b> is a <b>nominal annual interest ' +
          'rate</b>. It is written <span class="math">i</span><sup>(m)</sup>, where <span class="math">m</span> is the ' +
          'number of times interest is compounded during a year.</p>' +
          '<div class="math-block"><span class="math">i</span><sup>(4)</sup> = 10% p.a. &nbsp;→&nbsp; 10% per annum, compounded 4 times a year</div>' +
          '<ul class="tickly">' +
          '<li>Compounded <b>annually</b> → m = 1</li>' +
          '<li>Compounded <b>half-yearly</b> (twice a year) → m = 2</li>' +
          '<li>Compounded <b>quarterly</b> → m = 4</li>' +
          '<li>Compounded <b>monthly</b> → m = 12</li>' +
          '</ul>'
      }
    ],
    questions: [
      {
        id: 'w4t1', type: 'mcq', marks: 1,
        prompt: 'What does <b>PV</b> represent in time value of money calculations?',
        options: [
          'The amount of money we invest or borrow now',
          'The value of the money at the end of the term',
          'The percentage rate at which the money grows',
          'The number of interest periods in the term'
        ],
        answer: 0,
        solution: [
          { lab: 'PV', val: 'Present value — the money you have today' },
          { lab: 'Also called', val: 'The principal or capital amount' },
          { lab: 'Answer', val: 'The amount invested or borrowed now', final: true }
        ],
        why: 'The other options describe FV, i and n respectively. Getting these four straight makes every formula in this week readable.'
      },
      {
        id: 'w4t2', type: 'mcq', marks: 1,
        prompt: 'Which statement correctly expresses the relationship between present value and future value?',
        options: [
          'FV = PV + accumulated interest',
          'FV = PV − accumulated interest',
          'PV = FV + accumulated interest',
          'FV = PV × n'
        ],
        answer: 0,
        solution: [
          { lab: 'Future value', val: 'What you started with, plus what it earned' },
          { lab: 'Rearranged', val: 'Interest amount = FV − PV' },
          { lab: 'Answer', val: 'FV = PV + accumulated interest', final: true }
        ],
        why: 'The rearranged version is a genuine shortcut — it saves you from adding up interest period by period.'
      },
      {
        id: 'w4t3', type: 'mcq', marks: 2,
        prompt: 'An investment has a term of 5 years with interest compounded quarterly. What is <span class="math">n</span>?',
        options: ['20', '5', '4', '60'],
        answer: 0,
        solution: [
          { lab: 'Interest periods per year', val: '4 (quarterly)' },
          { lab: 'Number of years', val: '5' },
          { lab: 'Calculate', val: '5 × 4' },
          { lab: 'Answer', val: 'n = 20 interest periods', final: true }
        ],
        why: 'n counts interest periods, not years. 5 would be the answer only if interest were compounded annually, and 60 would be for monthly compounding.'
      },
      {
        id: 'w4t4', type: 'numeric', marks: 2,
        prompt: 'An investment of R250 000 grows to R271 250 over one year with no withdrawals or additional deposits. Calculate the interest amount earned.',
        pre: 'R', answer: 21250, tol: 1,
        solution: [
          { lab: 'Formula', val: 'Interest amount = FV − PV' },
          { lab: 'Substitute', val: 'R271 250 − R250 000' },
          { lab: 'Answer', val: 'R21 250', final: true }
        ],
        why: 'Because there were no other movements in the account, the entire growth must be interest.'
      },
      {
        id: 'w4t5', type: 'mcq', marks: 2,
        prompt: 'An interest rate is quoted as "5% per annum compounded monthly". How is this written in notation?',
        options: [
          '<span class="math">i</span><sup>(12)</sup> = 5% p.a.',
          '<span class="math">i</span><sup>(5)</sup> = 12% p.a.',
          '<span class="math">i</span><sup>(1)</sup> = 5% p.a.',
          '<span class="math">i</span> = 5% per month'
        ],
        answer: 0,
        solution: [
          { lab: 'The superscript', val: 'm = how many times a year interest is compounded' },
          { lab: 'Monthly', val: 'm = 12' },
          { lab: 'The rate itself', val: 'Stays as the quoted annual 5%' },
          { lab: 'Answer', val: 'i⁽¹²⁾ = 5% p.a.', final: true }
        ],
        why: 'The quoted rate is always the annual one. It is emphatically <b>not</b> 5% per month — that would be a wildly different investment.'
      }
    ]
  },

  /* ═══════════════════════ SIMPLE INTEREST ═══════════════════════ */
  {
    id: 'w4-simple',
    title: 'Simple Interest',
    emoji: '➕',
    summary: 'Interest earned on the original amount only, every single period.',
    notes: [
      {
        heading: 'How simple interest works',
        emoji: '💡',
        html:
          '<p>As the name suggests, simple interest is the simplest form. At the end of <b>each</b> interest period, ' +
          'interest is earned on the <b>original capital amount</b> — the present value — at the given rate.</p>' +
          '<p>The key consequence: because it is always calculated on the same original amount, <b>the interest is ' +
          'identical every period</b>. It never grows.</p>' +
          '<div class="math-block">Simple interest after 1 interest period = PV × <span class="math">i</span></div>' +
          '<p>So after 2 periods it is 2(PV × <span class="math">i</span>), after 3 periods 3(PV × <span class="math">i</span>), ' +
          'and the pattern gives us:</p>' +
          '<div class="keybox"><b>Accumulated simple interest after n periods</b><br>' +
          '= <span class="math">n</span>(PV × <span class="math">i</span>)</div>'
      },
      {
        heading: 'Deriving the future value formula',
        emoji: '🧮',
        html:
          '<p>Future value is the original capital plus all the interest, so:</p>' +
          '<div class="worked"><div class="worked-title">The derivation</div>' +
          '<div class="solstep"><div class="solstep-lab">Start</div>' +
          '<div class="solstep-val">FV = PV + (<span class="math">n</span> × PV × <span class="math">i</span>)</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Group the terms</div>' +
          '<div class="solstep-val">FV = PV + PV(<span class="math">n</span> × <span class="math">i</span>)</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Take PV out as a common factor</div>' +
          '<div class="solstep-val">FV = PV(1 + <span class="math">ni</span>)</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Simple interest formula</div>' +
          '<div class="solstep-val">FV = PV(1 + <span class="math">ni</span>)</div></div></div>' +
          '<div class="worked"><div class="worked-title">Worked example — R100 at 10% for 5 years</div>' +
          '<div class="solstep"><div class="solstep-lab">Substitute</div>' +
          '<div class="solstep-val">FV = R100(1 + (5)(0.1))</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Simplify the bracket</div>' +
          '<div class="solstep-val">= R100(1 + 0.5) = R100(1.5)</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Future value</div>' +
          '<div class="solstep-val">R150</div></div></div>' +
          '<p>Check it against the timeline: R10 interest every year for 5 years is R50 interest, and R100 + R50 = R150. ✓</p>' +
          '<div class="watchout">Simple interest is convenient to calculate but is <b>very seldom used in practice</b>. ' +
          'It is worth understanding mainly as a reference point for compound interest.</div>'
      }
    ],
    questions: [
      {
        id: 'w4s1', type: 'numeric', marks: 3,
        prompt: 'R8 000 is deposited into a savings account earning <b>simple interest</b> at 9% per annum for 6 years. Calculate the future value.',
        pre: 'R', answer: 12320, tol: 1,
        solution: [
          { lab: 'Formula', val: 'FV = PV(1 + ni)' },
          { lab: 'Substitute', val: 'R8 000(1 + (6)(0.09))' },
          { lab: 'Simplify', val: 'R8 000(1 + 0.54) = R8 000(1.54)' },
          { lab: 'Answer', val: 'R12 320', final: true }
        ],
        why: 'Convert the rate to a decimal (9% = 0.09) before multiplying. Working the bracket out fully before multiplying by PV keeps things tidy.'
      },
      {
        id: 'w4s2', type: 'numeric', marks: 2,
        prompt: 'Using the same investment (R8 000 at 9% simple interest for 6 years), calculate the total interest earned.',
        pre: 'R', answer: 4320, tol: 1,
        solution: [
          { lab: 'Formula', val: 'Accumulated simple interest = n(PV × i)' },
          { lab: 'Substitute', val: '6 × (R8 000 × 0.09) = 6 × R720' },
          { lab: 'Answer', val: 'R4 320', final: true }
        ],
        why: 'You could also do FV − PV = R12 320 − R8 000 = R4 320. Both routes work, and agreeing answers is a good reasonability check.'
      },
      {
        id: 'w4s3', type: 'numeric', marks: 3,
        prompt: 'R12 000 is invested at 7.5% per annum <b>simple interest</b> for 4 years. Calculate the future value.',
        pre: 'R', answer: 15600, tol: 1,
        solution: [
          { lab: 'Formula', val: 'FV = PV(1 + ni)' },
          { lab: 'Substitute', val: 'R12 000(1 + (4)(0.075))' },
          { lab: 'Simplify', val: 'R12 000(1 + 0.3) = R12 000(1.3)' },
          { lab: 'Answer', val: 'R15 600', final: true }
        ],
        why: 'Reasonability check: 7.5% of R12 000 is R900 a year, and R900 × 4 = R3 600 interest. R12 000 + R3 600 = R15 600. ✓'
      },
      {
        id: 'w4s4', type: 'steps', marks: 5,
        scenario: 'E-Bike SA deposits R450 000 into an account earning 6.5% per annum <b>simple interest</b> for 5 years.',
        prompt: 'Calculate the interest earned and the future value.',
        steps: [
          {
            q: 'Calculate the interest earned in one year (PV × i).',
            pre: 'R', answer: 29250, tol: 1,
            explain: 'R450 000 × 0.065 = R29 250. With simple interest this is the same every single year.'
          },
          {
            q: 'Calculate the total interest accumulated over 5 years.',
            pre: 'R', answer: 146250, tol: 1,
            explain: '5 × R29 250 = R146 250, using n(PV × i).'
          },
          {
            q: 'Now calculate the future value.',
            pre: 'R', answer: 596250, tol: 1,
            explain: 'FV = PV + accumulated interest = R450 000 + R146 250 = R596 250. Check with the formula: R450 000(1 + 5 × 0.065) = R450 000(1.325) = R596 250. ✓'
          }
        ],
        solution: [
          { lab: 'Interest per year', val: 'R450 000 × 0.065 = R29 250' },
          { lab: 'Over 5 years', val: '5 × R29 250 = R146 250' },
          { lab: 'FV = PV(1 + ni)', val: 'R450 000(1 + 5 × 0.065) = R450 000(1.325)' },
          { lab: 'Answer', val: 'R596 250', final: true }
        ],
        why: 'Because the interest is calculated on the original R450 000 every year, each year contributes exactly the same R29 250.'
      },
      {
        id: 'w4s5', type: 'mcq', marks: 2,
        prompt: 'With <b>simple</b> interest, the interest for each period is calculated on:',
        options: [
          'The original capital amount only',
          'The original capital plus all accumulated interest',
          'The future value at the end of the term',
          'A different amount chosen by the bank each year'
        ],
        answer: 0,
        solution: [
          { lab: 'Simple interest', val: 'Always calculated on the PV' },
          { lab: 'Consequence', val: 'The interest amount is identical every period' },
          { lab: 'Answer', val: 'The original capital amount only', final: true }
        ],
        why: '"The original capital plus all accumulated interest" describes compound interest. That single difference is what makes compound interest grow faster over time.'
      }
    ]
  },

  /* ═══════════════════════ COMPOUND INTEREST ═══════════════════════ */
  {
    id: 'w4-compound',
    title: 'Compound Interest',
    emoji: '📈',
    summary: 'Interest earned on your interest — the reason money snowballs.',
    notes: [
      {
        heading: 'The one thing that changes',
        emoji: '💡',
        html:
          '<p>In most real cases, businesses and financial institutions use <b>compound interest</b>. At the end of each ' +
          'interest period, interest is earned on the original capital <b>and on the interest accumulated so far</b>.</p>' +
          '<p>In other words: <b>interest is also earned on interest.</b></p>' +
          '<div class="tablewrap"><table class="dtable">' +
          '<tr><th>Year</th><th>Simple: balance</th><th>Simple: interest</th><th>Compound: balance</th><th>Compound: interest</th></tr>' +
          '<tr><td>Start</td><td>R100.00</td><td>—</td><td>R100.00</td><td>—</td></tr>' +
          '<tr><td>1</td><td>R110.00</td><td>R10.00</td><td>R110.00</td><td>R10.00</td></tr>' +
          '<tr><td>2</td><td>R120.00</td><td>R10.00</td><td>R121.00</td><td>R11.00</td></tr>' +
          '<tr><td>3</td><td>R130.00</td><td>R10.00</td><td>R133.10</td><td>R12.10</td></tr>' +
          '<tr><td>4</td><td>R140.00</td><td>R10.00</td><td>R146.41</td><td>R13.31</td></tr>' +
          '<tr><td>5</td><td>R150.00</td><td>R10.00</td><td>R161.05</td><td>R14.64</td></tr>' +
          '</table></div>' +
          '<p>Both start at R100 at 10% p.a. After year 1 they are <b>identical</b> — R110 either way. From year 2 the ' +
          'compound interest amounts start climbing while the simple ones stay flat.</p>' +
          '<p>Total interest: <b>R50 simple</b> versus <b>R61.05 compound</b>. Choosing wrongly would have cost R11.05, ' +
          'which is 22.1% more earnings just from knowing the difference.</p>'
      },
      {
        heading: 'Building the formula',
        emoji: '🧱',
        html:
          '<p>The pattern is worth seeing, because it is where the formula comes from:</p>' +
          '<div class="worked"><div class="worked-title">Period by period</div>' +
          '<div class="solstep"><div class="solstep-lab">After 1 period</div>' +
          '<div class="solstep-val">FV₁ = PV + (PV × <span class="math">i</span>) = PV(1 + <span class="math">i</span>)<sup>1</sup></div></div>' +
          '<div class="solstep"><div class="solstep-lab">After 2 periods</div>' +
          '<div class="solstep-val">FV₂ = FV₁ + (FV₁ × <span class="math">i</span>) = PV(1 + <span class="math">i</span>)<sup>2</sup></div></div>' +
          '<div class="solstep"><div class="solstep-lab">After 3 periods</div>' +
          '<div class="solstep-val">FV₃ = PV(1 + <span class="math">i</span>)<sup>3</sup></div></div>' +
          '<div class="solstep final"><div class="solstep-lab">The pattern</div>' +
          '<div class="solstep-val">FV<sub>n</sub> = PV(1 + <span class="math">i</span>)<sup>n</sup></div></div></div>' +
          '<div class="keybox"><b>Compound interest formula</b><br>' +
          'FV = PV(1 + <span class="math">i</span>)<sup><span class="math">n</span></sup></div>' +
          '<div class="worked"><div class="worked-title">Worked example — R100 at 10% for 5 years</div>' +
          '<div class="solstep"><div class="solstep-lab">Substitute</div>' +
          '<div class="solstep-val">FV = R100(1 + 0.1)<sup>5</sup></div></div>' +
          '<div class="solstep"><div class="solstep-lab">Simplify the bracket</div>' +
          '<div class="solstep-val">= R100(1.1)<sup>5</sup></div></div>' +
          '<div class="solstep"><div class="solstep-lab">Work out the power</div>' +
          '<div class="solstep-val">= R100 × 1.6105</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Future value</div>' +
          '<div class="solstep-val">R161.05</div></div></div>' +
          '<p>Interest earned = R161.05 − R100 = <b>R61.05</b>, which matches the timeline exactly.</p>' +
          '<div class="watchout"><b>Order of operations.</b> Work out the bracket first, then apply the power, and only ' +
          'then multiply by PV. Multiplying PV by (1 + i) before applying the power gives a completely wrong answer.</div>'
      }
    ],
    questions: [
      {
        id: 'w4c1', type: 'numeric', marks: 3,
        prompt: 'R15 000 is deposited into a savings account earning <b>compound interest</b> at 8% per annum for 6 years. Calculate the future value, to two decimal places.',
        pre: 'R', answer: 23803.11, tol: 1,
        solution: [
          { lab: 'Formula', val: 'FV = PV(1 + i)ⁿ' },
          { lab: 'Substitute', val: 'R15 000(1 + 0.08)⁶' },
          { lab: 'Simplify the bracket', val: 'R15 000(1.08)⁶' },
          { lab: 'Apply the power', val: 'R15 000 × 1.586874' },
          { lab: 'Answer', val: 'R23 803.11', final: true }
        ],
        why: 'Compare this to simple interest on the same deposit: R15 000(1 + 6 × 0.08) = R22 200. The extra R1 603.11 is purely interest earned on interest.'
      },
      {
        id: 'w4c2', type: 'numeric', marks: 2,
        prompt: 'Using that same investment (FV = R23 803.11, PV = R15 000, no withdrawals or deposits), calculate the total interest earned.',
        pre: 'R', answer: 8803.11, tol: 1,
        solution: [
          { lab: 'Shortcut', val: 'Interest amount = FV − PV' },
          { lab: 'Substitute', val: 'R23 803.11 − R15 000' },
          { lab: 'Answer', val: 'R8 803.11', final: true }
        ],
        why: 'For compound interest there is no simple formula for the total interest, so this subtraction shortcut is the practical way to get it.'
      },
      {
        id: 'w4c3', type: 'numeric', marks: 4,
        prompt: 'E-Bike SA invests R1 000 000 in a 36-month fixed-term savings account at 9.5% per annum <b>compounded annually</b>. Calculate the future value, to two decimal places.',
        pre: 'R', answer: 1312932.38, tol: 1,
        solution: [
          { lab: 'Identify', val: 'PV = R1 000 000, i = 0.095, n = 3 years' },
          { lab: 'Formula', val: 'FV = PV(1 + i)ⁿ' },
          { lab: 'Substitute', val: 'R1 000 000(1.095)³' },
          { lab: 'Apply the power', val: '(1.095)³ = 1.312932…' },
          { lab: 'Answer', val: 'R1 312 932.38', final: true }
        ],
        why: '36 months is 3 years, and because it is compounded annually, n = 3. Reasonability check: simple interest would have given R1 285 000, so a slightly higher figure is exactly what we expect.'
      },
      {
        id: 'w4c4', type: 'steps', marks: 5,
        scenario: 'R50 000 is invested at 6% per annum <b>compounded annually</b> for 4 years.',
        prompt: 'Calculate the future value and the interest earned.',
        steps: [
          {
            q: 'What is n, the number of interest periods?',
            answer: 4, tol: 0.01,
            explain: 'Interest is compounded annually over a 4-year term, so there are 4 interest periods.'
          },
          {
            q: 'Calculate (1 + i)ⁿ, to four decimal places.',
            answer: 1.2625, tol: 0.0015,
            explain: '(1 + 0.06)⁴ = (1.06)⁴ = 1.26247696, which rounds to 1.2625.'
          },
          {
            q: 'Now calculate the future value, to two decimal places.',
            pre: 'R', answer: 63123.85, tol: 1,
            explain: 'R50 000 × 1.26247696 = R63 123.85.'
          },
          {
            q: 'Finally, calculate the interest earned.',
            pre: 'R', answer: 13123.85, tol: 1,
            explain: 'Interest = FV − PV = R63 123.85 − R50 000 = R13 123.85.'
          }
        ],
        solution: [
          { lab: 'PV, i, n', val: 'R50 000, 0.06, 4' },
          { lab: 'Formula', val: 'FV = PV(1 + i)ⁿ' },
          { lab: 'Substitute', val: 'R50 000(1.06)⁴ = R50 000 × 1.26248' },
          { lab: 'Future value', val: 'R63 123.85' },
          { lab: 'Interest earned', val: 'R63 123.85 − R50 000 = R13 123.85', final: true }
        ],
        why: 'Work the power out to at least four decimal places before multiplying — rounding (1.06)⁴ to 1.26 would cost you about R124 in the final answer.'
      },
      {
        id: 'w4c5', type: 'mcq', marks: 2,
        prompt: 'Why does compound interest produce a larger future value than simple interest over the same term?',
        options: [
          'Because interest is earned on previously accumulated interest, not just the original capital',
          'Because banks charge a higher rate for compound interest',
          'Because compound interest is calculated more times per year',
          'Because the term is always longer with compound interest'
        ],
        answer: 0,
        solution: [
          { lab: 'Simple interest base', val: 'Always the original PV' },
          { lab: 'Compound interest base', val: 'PV plus all interest accumulated so far' },
          { lab: 'So the base grows', val: 'And each period earns more than the last' },
          { lab: 'Answer', val: 'Interest is earned on interest', final: true }
        ],
        why: 'In the R100 example the rate (10%) and term (5 years) were identical for both. Only the base being used changed — and that produced R11.05 more.'
      }
    ]
  },

  /* ═══════════════════════ COMPOUNDING FREQUENCY ═══════════════════════ */
  {
    id: 'w4-freq',
    title: 'Compounding More Than Once a Year',
    emoji: '🔄',
    summary: 'Nominal versus effective rates, and getting n and i to match.',
    notes: [
      {
        heading: 'The problem quarterly compounding creates',
        emoji: '🤔',
        html:
          '<p>When interest is <b>compounded annually</b>, you do one interest calculation per year. When it is ' +
          '<b>compounded quarterly</b>, you must do a calculation at the end of every quarter — four times more work.</p>' +
          '<p>Over a 5-year term that is 20 separate calculations instead of 5. The formula saves you from that, but ' +
          'only if you feed it the <b>right rate</b> and the <b>right number of periods</b>.</p>'
      },
      {
        heading: 'Nominal versus effective periodic rate',
        emoji: '🔑',
        html:
          '<p>The <b>nominal annual interest rate</b> is the quoted rate — <span class="math">i</span><sup>(m)</sup>. ' +
          'That is the headline figure, e.g. "10% p.a. compounded quarterly".</p>' +
          '<p>The <b>effective periodic interest rate</b> is what is actually earned on R1 during <b>one interest ' +
          'period</b>. That is the rate the formula needs.</p>' +
          '<div class="keybox"><b>Effective periodic interest rate</b><br>' +
          '<span class="math">i</span> = <span class="frac"><span><span class="math">i</span><sup>(m)</sup></span><span><span class="math">m</span></span></span> ' +
          '&nbsp;&nbsp;— divide the nominal annual rate by the number of periods in a year</div>' +
          '<div class="worked"><div class="worked-title">Examples</div>' +
          '<div class="solstep"><div class="solstep-lab">10% p.a. compounded quarterly</div>' +
          '<div class="solstep-val">10% ÷ 4 = <b>2.5% per quarter</b></div></div>' +
          '<div class="solstep"><div class="solstep-lab">5% p.a. compounded monthly</div>' +
          '<div class="solstep-val">5% ÷ 12 = <b>0.4167% per month</b></div></div>' +
          '<div class="solstep final"><div class="solstep-lab">5% p.a. compounded half-yearly</div>' +
          '<div class="solstep-val">5% ÷ 2 = <b>2.5% every six months</b></div></div></div>' +
          '<div class="watchout"><b>Never use the annual rate for a quarterly calculation.</b> If you apply 10% at the ' +
          'end of each of 20 quarters, you would be adding 10% to the balance twenty times and grossly overstate the ' +
          'accumulated interest.</div>'
      },
      {
        heading: 'Putting it together',
        emoji: '🧩',
        html:
          '<p>The formula does not change at all. You just have to make <span class="math">i</span> and ' +
          '<span class="math">n</span> agree with each other — both must be in the <b>same time unit</b>.</p>' +
          '<div class="math-block">FV<sub>n</sub> = PV(1 + effective periodic rate)<sup>number of interest periods</sup></div>' +
          '<div class="worked"><div class="worked-title">Worked example — R100 at 10% p.a. compounded quarterly, 5 years</div>' +
          '<div class="solstep"><div class="solstep-lab">Number of periods</div>' +
          '<div class="solstep-val"><span class="math">n</span> = 5 years × 4 quarters = 20</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Effective quarterly rate</div>' +
          '<div class="solstep-val"><span class="math">i</span> = 10% ÷ 4 = 2.5% = 0.025</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Substitute</div>' +
          '<div class="solstep-val">FV = R100(1 + 0.025)<sup>20</sup></div></div>' +
          '<div class="solstep"><div class="solstep-lab">Apply the power</div>' +
          '<div class="solstep-val">= R100 × 1.6386</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Future value</div>' +
          '<div class="solstep-val">R163.86</div></div></div>' +
          '<p>Compare: compounded <b>annually</b> the same R100 grew to R161.05. Compounded <b>quarterly</b> it reaches ' +
          'R163.86 — R2.81 more, from exactly the same quoted rate.</p>' +
          '<div class="keybox"><b>Does that make sense?</b> Yes. The more often interest is calculated and added, the ' +
          'more often you earn interest on interest, and the larger the base becomes for each following calculation.</div>'
      }
    ],
    questions: [
      {
        id: 'w4f1', type: 'numeric', marks: 2,
        prompt: 'An interest rate is quoted as 9% per annum <b>compounded quarterly</b>. Calculate the effective periodic interest rate.',
        suf: '% per quarter', answer: 2.25, tol: 0.01,
        solution: [
          { lab: 'Formula', val: 'i = i⁽ᵐ⁾ ÷ m' },
          { lab: 'Substitute', val: '9% ÷ 4 quarters' },
          { lab: 'Answer', val: '2.25% per quarter', final: true }
        ],
        why: 'This is the rate that will actually be applied at the end of each quarter — not the headline 10%.'
      },
      {
        id: 'w4f2', type: 'numeric', marks: 2,
        prompt: 'An interest rate is quoted as 6% per annum <b>compounded monthly</b>. Calculate the effective periodic interest rate.',
        suf: '% per month', answer: 0.5, tol: 0.001,
        solution: [
          { lab: 'Formula', val: 'i = i⁽ᵐ⁾ ÷ m' },
          { lab: 'Substitute', val: '6% ÷ 12 months' },
          { lab: 'Answer', val: '0.5% per month', final: true }
        ],
        why: 'This one divides exactly. When it does not — 5% ÷ 12, say — keep four decimal places, because rounding compounds twelve times a year.'
      },
      {
        id: 'w4f3', type: 'numeric', marks: 4,
        prompt: 'R30 000 is deposited into an account earning 12% per annum <b>compounded quarterly</b> for 4 years. Calculate the future value, to two decimal places.',
        pre: 'R', answer: 48141.19, tol: 1,
        solution: [
          { lab: 'Number of periods', val: 'n = 4 × 4 = 16 quarters' },
          { lab: 'Effective quarterly rate', val: 'i = 12% ÷ 4 = 3% = 0.03' },
          { lab: 'Formula', val: 'FV = PV(1 + i)ⁿ' },
          { lab: 'Substitute', val: 'R30 000(1.03)¹⁶ = R30 000 × 1.604706' },
          { lab: 'Answer', val: 'R48 141.19', final: true }
        ],
        why: 'Both n and i had to change together — 16 periods paired with the 3% quarterly rate. Using 16 with 12%, or 4 with 3%, would both be wrong.'
      },
      {
        id: 'w4f4', type: 'steps', marks: 6,
        scenario: 'R20 000 is invested at 8% per annum <b>compounded half-yearly</b> for 3 years.',
        prompt: 'Calculate the future value.',
        steps: [
          {
            q: 'Calculate the effective periodic interest rate, as a percentage.',
            suf: '%', answer: 4, tol: 0.01,
            explain: 'Half-yearly means m = 2, so i = 8% ÷ 2 = 4% every six months.'
          },
          {
            q: 'Calculate n, the number of interest periods.',
            answer: 6, tol: 0.01,
            explain: '3 years × 2 periods per year = 6 interest periods.'
          },
          {
            q: 'Now calculate the future value, to two decimal places.',
            pre: 'R', answer: 25306.38, tol: 1,
            explain: 'FV = R20 000(1.04)⁶ = R20 000 × 1.265319 = R25 306.38.'
          }
        ],
        solution: [
          { lab: 'Effective periodic rate', val: '8% ÷ 2 = 4% = 0.04' },
          { lab: 'Number of periods', val: '3 × 2 = 6' },
          { lab: 'Formula', val: 'FV = PV(1 + i)ⁿ' },
          { lab: 'Substitute', val: 'R20 000(1.04)⁶ = R20 000 × 1.265319' },
          { lab: 'Answer', val: 'R25 306.38', final: true }
        ],
        why: 'Both adjustments come from the same fact: m = 2. It halves the rate and doubles the number of periods.'
      },
      {
        id: 'w4f5', type: 'mcq', marks: 2,
        prompt: 'The same nominal annual rate compounded <b>more often</b> during the year will result in:',
        options: [
          'More accumulated interest',
          'Less accumulated interest',
          'Exactly the same accumulated interest',
          'No interest at all'
        ],
        answer: 0,
        solution: [
          { lab: 'More compounding', val: 'Interest is calculated and added more often' },
          { lab: 'So the base grows', val: 'More frequently, earning interest on interest sooner' },
          { lab: 'Evidence', val: 'R100 at 10%: annually → R161.05, quarterly → R163.86' },
          { lab: 'Answer', val: 'More accumulated interest', final: true }
        ],
        why: 'This matters when comparing loan or investment offers — two products quoting the same headline rate are not equivalent if they compound at different frequencies.'
      }
    ]
  },

  /* ═══════════════════════ FINANCIAL CALCULATOR ═══════════════════════ */
  {
    id: 'w4-calc',
    title: 'The HP10bII+ Calculator',
    emoji: '🧮',
    summary: 'Doing the same calculations in six keystrokes instead of twenty.',
    notes: [
      {
        heading: 'Why the signs matter',
        emoji: '➕',
        html:
          '<p>The calculator requires at least <b>one inflow</b> (positive cash flow) and <b>one outflow</b> (negative ' +
          'cash flow). Think about the direction the money moves:</p>' +
          '<ul class="tickly">' +
          '<li><b>If you invest</b> — you pay cash out at the start, and receive it back at the end. So PV is ' +
          '<b>negative</b> and FV is <b>positive</b>.</li>' +
          '<li><b>If you borrow</b> — you receive cash at the start and pay it back at the end. So PV is ' +
          '<b>positive</b> and FV is <b>negative</b>.</li>' +
          '</ul>' +
          '<div class="watchout">If you enter both as positive, the calculator will return an error. The +/− key is not ' +
          'optional.</div>'
      },
      {
        heading: 'The keystrokes',
        emoji: '⌨️',
        html:
          '<p>The calculator is built on the same formula you already know:</p>' +
          '<div class="math-block">FV<sub>n</sub> = PV(1 + effective periodic rate)<sup>number of periods</sup></div>' +
          '<p><b>Example: R100 deposited at 10% p.a. compounded annually for 5 years.</b></p>' +
          '<div class="tablewrap"><table class="dtable">' +
          '<tr><th>Step</th><th>Keys</th><th>Display</th><th>What it does</th></tr>' +
          '<tr><td>1</td><td>▼ C ALL</td><td>0</td><td>Clears all registers</td></tr>' +
          '<tr><td>2</td><td>1 ▼ P/YR</td><td>1</td><td>Sets periods per year to 1 (annual)</td></tr>' +
          '<tr><td>3</td><td>1 0 0 +/− PV</td><td>−100</td><td>Stores the deposit as an outflow</td></tr>' +
          '<tr><td>4</td><td>5 N</td><td>5</td><td>Stores the number of periods</td></tr>' +
          '<tr><td>5</td><td>1 0 I/YR</td><td>10</td><td>Stores the annual interest rate</td></tr>' +
          '<tr><td>6</td><td>FV</td><td>161.051</td><td>Calculates the future value</td></tr>' +
          '</table></div>'
      },
      {
        heading: 'When compounding is more frequent',
        emoji: '🔄',
        html:
          '<p>For the same R100 at 10% p.a. but <b>compounded quarterly</b>, only two steps change:</p>' +
          '<ul class="tickly">' +
          '<li><b>Step 2</b> — enter <b>4</b> ▼ P/YR, because there are 4 interest periods per year.</li>' +
          '<li><b>Step 4</b> — enter <b>5</b> ▼ xP/YR. The xP/YR function automatically converts the term in ' +
          '<b>years</b> into the number of interest periods, and displays n afterwards.</li>' +
          '</ul>' +
          '<p>The result is <b>163.86</b> — matching the formula answer exactly.</p>' +
          '<div class="keybox"><b>You do not calculate the effective periodic rate yourself.</b> Because you told the ' +
          'calculator how many times a year interest compounds in step 2, you enter the <b>nominal annual rate</b> in ' +
          'step 5 and it works out the effective rate for you.</div>'
      },
      {
        heading: 'Why still learn the formulas?',
        emoji: '🎓',
        html:
          '<p>Two reasons the notes give:</p>' +
          '<ul class="tickly">' +
          '<li>You may need to make an investment or financing decision quickly without a financial calculator to hand.</li>' +
          '<li>The formula gives you a <b>reasonability check</b> that your calculator entry was correct — remember, ' +
          'a calculator answer is only perfect if every key was pressed correctly.</li>' +
          '</ul>'
      }
    ],
    questions: [
      {
        id: 'w4k1', type: 'mcq', marks: 2,
        prompt: 'You are <b>investing</b> money into a savings account. On the HP10bII+, the PV should be entered as:',
        options: [
          'A negative value, because it is a cash outflow',
          'A positive value, because it is money you own',
          'Zero, because it has not earned interest yet',
          'Either sign — it makes no difference'
        ],
        answer: 0,
        solution: [
          { lab: 'Investing', val: 'You pay cash into the account at the start' },
          { lab: 'That is', val: 'A cash outflow' },
          { lab: 'Answer', val: 'Negative PV', final: true }
        ],
        why: 'If you were borrowing it would be the reverse — you receive cash at the start, so PV would be positive and FV negative.'
      },
      {
        id: 'w4k2', type: 'mcq', marks: 2,
        prompt: 'Interest is compounded <b>quarterly</b>. What value should be stored using the P/YR function?',
        options: ['4', '1', '12', '20'],
        answer: 0,
        solution: [
          { lab: 'P/YR', val: 'Number of interest periods per year' },
          { lab: 'Quarterly', val: '4 quarters in a year' },
          { lab: 'Answer', val: '4', final: true }
        ],
        why: '12 would be monthly and 1 annually. 20 is the total number of periods over a 5-year term — that belongs in N, not P/YR.'
      },
      {
        id: 'w4k3', type: 'mcq', marks: 1,
        prompt: 'Which key is used to store the nominal annual interest rate?',
        options: ['I/YR', 'PV', 'N', 'PMT'],
        answer: 0,
        solution: [
          { lab: 'I/YR', val: 'Interest per year — the nominal annual rate' },
          { lab: 'PV', val: 'Present value' },
          { lab: 'N', val: 'Number of interest periods' },
          { lab: 'Answer', val: 'I/YR', final: true }
        ],
        why: 'Note it takes the <b>annual</b> rate. You do not divide it down yourself — P/YR has already told the calculator how to handle that.'
      },
      {
        id: 'w4k4', type: 'mcq', marks: 2,
        prompt: 'What does the <b>xP/YR</b> function do?',
        options: [
          'Converts a term given in years into the total number of interest periods',
          'Calculates the effective periodic interest rate',
          'Multiplies the present value by the number of years',
          'Clears the calculator\'s stored registers'
        ],
        answer: 0,
        solution: [
          { lab: 'You enter', val: 'The number of years' },
          { lab: 'xP/YR', val: 'Multiplies it by the periods per year already stored' },
          { lab: 'Result', val: 'The value of n, which it then displays' },
          { lab: 'Answer', val: 'Converts years into interest periods', final: true }
        ],
        why: 'It saves you doing 5 × 4 = 20 in your head, and stops you accidentally entering the term in years when the calculator needs periods.'
      },
      {
        id: 'w4k5', type: 'mcq', marks: 1,
        prompt: 'For a TVM calculation to work on the HP10bII+, there must be at least:',
        options: [
          'One inflow and one outflow',
          'Two inflows',
          'Three stored values',
          'One payment per year'
        ],
        answer: 0,
        solution: [
          { lab: 'Requirement', val: 'At least one positive and one negative cash flow' },
          { lab: 'In our examples', val: 'PV at the beginning and FV at the end of the term' },
          { lab: 'Answer', val: 'One inflow and one outflow', final: true }
        ],
        why: 'Money has to move in both directions for there to be a meaningful investment or loan to calculate.'
      }
    ]
  }

  ]
});
