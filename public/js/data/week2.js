/* Week 2 — Percentages in business
   Every figure below was verified independently against the Week 2 lecture notes. */

window.WEEK_DATA = window.WEEK_DATA || [];

window.WEEK_DATA.push({
  id: 'week2',
  number: 2,
  title: 'Percentages in Business',
  emoji: '💸',
  accent: 2,
  blurb: 'Rate, base and percentage value, trends, overheads, discounts and margins.',
  topics: [

  /* ───────────────────────────────────────────────────────── */
  {
    id: 'w2-convert',
    title: 'Fractions, Decimals & Percentages',
    emoji: '🔄',
    summary: 'Moving between the three ways of writing the same portion.',
    notes: [
      {
        heading: 'What a percentage actually is',
        emoji: '💡',
        html:
          '<p>One percent means <b>one out of a hundred</b>. Written as a fraction that is ' +
          '<span class="frac"><span>1</span><span>100</span></span>, and in decimal place values one-hundredth is ' +
          '<b>0.01</b>.</p>' +
          '<p>So <b>1% = 0.01</b>. That single fact is where both conversion shortcuts come from.</p>' +
          '<div class="keybox"><b>The two shortcuts</b><br>' +
          'Percentage → decimal: move the decimal point <b>two places left</b> (same as ÷ 100).<br>' +
          'Decimal → percentage: move the decimal point <b>two places right</b> (same as × 100).</div>' +
          '<p>These shortcuts work because decimals and percentages are both built out of powers of 10.</p>'
      },
      {
        heading: 'Fraction → percentage in two moves',
        emoji: '🪄',
        html:
          '<p>A fraction is just a division waiting to happen. Divide the top by the bottom to get a decimal, ' +
          'then move the point two places right.</p>' +
          '<div class="worked"><div class="worked-title">Worked example — comparing two test scores</div>' +
          '<div class="solstep"><div class="solstep-lab">First assessment</div>' +
          '<div class="solstep-val">17 ÷ 21 = 0.809523… ≈ 0.81 → <b>81%</b></div></div>' +
          '<div class="solstep"><div class="solstep-lab">Second assessment</div>' +
          '<div class="solstep-val">11 ÷ 14 = 0.785714… ≈ 0.79 → <b>79%</b></div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Conclusion</div>' +
          '<div class="solstep-val">She did 2 percentage points better in the first</div></div></div>' +
          '<p>Percentages make the comparison instant — far easier than staring at ' +
          '<span class="frac"><span>17</span><span>21</span></span> and ' +
          '<span class="frac"><span>11</span><span>14</span></span>.</p>'
      }
    ],
    questions: [
      {
        id: 'w2c1', type: 'numeric', marks: 2,
        prompt: 'A technician passed <span class="frac"><span>23</span><span>28</span></span> of the safety checks on a service inspection. Express this as a percentage, correct to two decimal places.',
        suf: '%', answer: 82.14, tol: 0.02,
        note: 'Round to 2 decimal places.',
        solution: [
          { lab: 'Convert to a decimal', val: '23 ÷ 28 = 0.8214285…' },
          { lab: 'Move the point 2 places right', val: '0.8214285 × 100' },
          { lab: 'Answer', val: '82.14%', final: true }
        ],
        why: 'A fraction is a division. Do the division first, then multiply by 100 to express it out of a hundred.'
      },
      {
        id: 'w2c2', type: 'mcq', marks: 1,
        prompt: 'A decimal of 0.68 expressed as a percentage is:',
        options: ['68%', '6.8%', '0.68%', '680%'],
        answer: 0,
        solution: [
          { lab: 'Rule', val: 'Decimal → percentage: move the point 2 places right' },
          { lab: 'Apply', val: '0.68 × 100 = 68' },
          { lab: 'Answer', val: '68%', final: true }
        ],
        why: 'Multiplying by 100 restates the number as parts per hundred, which is exactly what "percent" means.'
      },
      {
        id: 'w2c3', type: 'numeric', marks: 2,
        prompt: 'Express <span class="frac"><span>9</span><span>16</span></span> as a percentage.',
        suf: '%', answer: 56.25, tol: 0.02,
        solution: [
          { lab: 'Convert to a decimal', val: '9 ÷ 16 = 0.5625' },
          { lab: 'Multiply by 100', val: '0.5625 × 100' },
          { lab: 'Answer', val: '56.25%', final: true }
        ],
        why: 'Same two moves every time: divide, then shift the decimal point two places right.'
      },
      {
        id: 'w2c4', type: 'mcq', marks: 1,
        prompt: 'A trade discount is quoted as 45%. Written as a decimal this is:',
        options: ['0.45', '4.5', '0.045', '45.0'],
        answer: 0,
        solution: [
          { lab: 'Rule', val: 'Percentage → decimal: move the point 2 places left' },
          { lab: 'Apply', val: '45 ÷ 100' },
          { lab: 'Answer', val: '0.45', final: true }
        ],
        why: 'You need the decimal form before you can multiply it by a rand amount.'
      },
      {
        id: 'w2c5', type: 'numeric', marks: 2,
        prompt: 'Express <span class="frac"><span>3</span><span>8</span></span> as a percentage.',
        suf: '%', answer: 37.5, tol: 0.01,
        solution: [
          { lab: 'Convert to a decimal', val: '3 ÷ 8 = 0.375' },
          { lab: 'Multiply by 100', val: '0.375 × 100' },
          { lab: 'Answer', val: '37.5%', final: true }
        ],
        why: 'This one divides exactly, so there is no rounding to worry about.'
      }
    ]
  },

  /* ───────────────────────────────────────────────────────── */
  {
    id: 'w2-rbp',
    title: 'Rate, Base & Percentage Value',
    emoji: '⚖️',
    summary: 'The one formula that unlocks every percentage question in this module.',
    notes: [
      {
        heading: 'The three parts of any percentage statement',
        emoji: '🧩',
        html:
          '<p>Take the sentence <i>"I spent 80% of my R50 petty cash, which was R40."</i> Every percentage ' +
          'statement in business has these same three pieces:</p>' +
          '<ul class="tickly">' +
          '<li><b>Rate (R)</b> — the percentage itself. Here, <b>80%</b>.</li>' +
          '<li><b>Base value (B)</b> — the <i>whole</i> you are taking a portion of. Here, <b>R50</b>.</li>' +
          '<li><b>Percentage value (P)</b> — the <i>part</i> you ended up with. Here, <b>R40</b>.</li>' +
          '</ul>' +
          '<div class="keybox"><b>The formula</b><br>' +
          'RATE = <span class="frac"><span>PERCENTAGE-value</span><span>BASE-value</span></span> &nbsp;&nbsp; that is &nbsp;&nbsp; ' +
          'R = <span class="frac"><span>P</span><span>B</span></span></div>' +
          '<p>The base and percentage values always share the same unit (rands with rands, metres with metres). ' +
          'The rate is the only one written as a %.</p>'
      },
      {
        heading: 'Rearranging it for the other two',
        emoji: '🔧',
        html:
          '<p>Because it is just an equation, you can solve for whichever piece is missing. Only one is ever unknown.</p>' +
          '<div class="math-block">R = P ÷ B &nbsp;&nbsp;•&nbsp;&nbsp; P = R × B &nbsp;&nbsp;•&nbsp;&nbsp; B = P ÷ R</div>' +
          '<div class="watchout"><b>Watch out</b> — always convert the rate to a decimal before multiplying or ' +
          'dividing with it. 5% is 0.05, not 5.</div>' +
          '<p>The trick to these questions is not the maths, it is <b>correctly labelling which number is which</b>. ' +
          'Find the whole first — that is always the base.</p>'
      },
      {
        heading: 'Working backwards to find the base',
        emoji: '🔍',
        html:
          '<p>The hardest version is when you are given the part and the rate, and asked for the whole.</p>' +
          '<div class="worked"><div class="worked-title">Worked example — the overheard bonus</div>' +
          '<div class="solstep"><div class="solstep-lab">What we know</div>' +
          '<div class="solstep-val">Bonuses were 5% of yearly salaries (R), totalling R85 000 (P)</div></div>' +
          '<div class="solstep"><div class="solstep-lab">What we want</div>' +
          '<div class="solstep-val">Total salaries — the base (B)</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Rearrange</div>' +
          '<div class="solstep-val">B = P ÷ R</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Substitute</div>' +
          '<div class="solstep-val">B = R85 000 ÷ 0.05</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Total salaries</div>' +
          '<div class="solstep-val">R1 700 000</div></div></div>' +
          '<p><b>Reasonability check:</b> 5% of R1 700 000 is R85 000. ✓</p>'
      }
    ],
    questions: [
      {
        id: 'w2r1', type: 'numeric', marks: 2,
        scenario: 'You take the R60 petty cash from your office and spend R45 of it on printer paper.',
        prompt: 'What percentage of the petty cash did you spend?',
        suf: '%', answer: 75, tol: 0.01,
        solution: [
          { lab: 'Identify the base', val: 'B = R60 (the whole petty cash)' },
          { lab: 'Identify the percentage value', val: 'P = R45 (the part spent)' },
          { lab: 'Apply R = P ÷ B', val: '45 ÷ 60 = 0.75' },
          { lab: 'Answer', val: '75%', final: true }
        ],
        why: 'The base is always the whole amount you started with — the petty cash float, not the marker.'
      },
      {
        id: 'w2r2', type: 'numeric', marks: 2,
        prompt: 'E-Bike SA budgets 15% of its R2 400 monthly stationery spend for printing. How much is budgeted for printing?',
        pre: 'R', answer: 360, tol: 0.01,
        solution: [
          { lab: 'Known', val: 'R = 15% = 0.15, B = R2 400' },
          { lab: 'Apply P = R × B', val: '0.15 × 2 400' },
          { lab: 'Answer', val: 'R360', final: true }
        ],
        why: 'Here the whole (R2 400) is given, so you are finding the part — multiply the rate by the base.'
      },
      {
        id: 'w2r3', type: 'steps', marks: 4,
        scenario: 'A company paid all employees a bonus of 6% of their yearly salary. The total paid out in bonuses was R96 000.',
        prompt: 'Calculate the total amount paid in salaries for the year, before bonuses.',
        steps: [
          {
            q: 'What is the percentage value (P) — the part we already know?',
            pre: 'R', answer: 96000, tol: 1,
            explain: 'The R96 000 is the bonus total, which is the part produced after the rate was applied.'
          },
          {
            q: 'Write the rate of 6% as a decimal.',
            answer: 0.06, tol: 0.001,
            explain: '6 ÷ 100 = 0.06. Always convert before dividing.'
          },
          {
            q: 'Now calculate the base value: B = P ÷ R',
            pre: 'R', answer: 1600000, tol: 1,
            explain: '96 000 ÷ 0.06 = 1 600 000. Check it: 6% of R1 600 000 is indeed R96 000.'
          }
        ],
        solution: [
          { lab: 'Formula', val: 'R = P ÷ B, so B = P ÷ R' },
          { lab: 'Substitute', val: 'B = R96 000 ÷ 0.06' },
          { lab: 'Total salaries', val: 'R1 600 000', final: true }
        ],
        why: 'When the question gives you the part and the rate and asks for the whole, you divide rather than multiply.'
      },
      {
        id: 'w2r4', type: 'mcq', marks: 1,
        prompt: 'In the statement "75% of R60 = R45", which value is the <b>base value</b>?',
        options: ['R60', 'R45', '75%', '0.75'],
        answer: 0,
        solution: [
          { lab: 'Base value', val: 'The whole that the portion is taken from' },
          { lab: 'In this statement', val: 'The whole petty cash amount' },
          { lab: 'Answer', val: 'R60', final: true }
        ],
        why: 'The base is the denominator of the ratio — the bottom of the fraction, the full amount.'
      },
      {
        id: 'w2r5', type: 'numeric', marks: 3,
        prompt: 'Commission of R7 200 was paid at a rate of 12% of sales. What were the total sales?',
        pre: 'R', answer: 60000, tol: 1,
        solution: [
          { lab: 'Known', val: 'P = R7 200, R = 12% = 0.12' },
          { lab: 'Apply B = P ÷ R', val: '7 200 ÷ 0.12' },
          { lab: 'Total sales', val: 'R60 000', final: true }
        ],
        why: 'Sales is the whole that the commission rate was applied to, so sales is the base.'
      }
    ]
  },

  /* ───────────────────────────────────────────────────────── */
  {
    id: 'w2-change',
    title: 'Percentage Change & Trends',
    emoji: '📈',
    summary: 'Measuring how big an increase or decrease really is.',
    notes: [
      {
        heading: 'Why a rand amount is not enough',
        emoji: '🤔',
        html:
          '<p>If sales went up by R50 000, is that good? You cannot say. If last month was R5 000, that is enormous. ' +
          'If last month was R500 000 000, it is nothing.</p>' +
          '<p>Percentages give the increase a <b>sense of scale</b>, which is why decision-makers always ask for them.</p>' +
          '<div class="keybox"><b>Rate of change</b><br>' +
          'RATE of change = <span class="frac"><span>Change</span><span>BASE from which it changed</span></span>' +
          '<br><br>or, in plain words:<br>' +
          'RATE of change = <span class="frac"><span>Value now − What value was</span><span>What value was</span></span></div>'
      },
      {
        heading: 'The base is always the OLD value',
        emoji: '⏮️',
        html:
          '<p>This is the single most common mistake. The denominator is always <b>where you started</b>, never where you ended up.</p>' +
          '<div class="worked"><div class="worked-title">Worked example — E-bike model 1 sales</div>' +
          '<div class="solstep"><div class="solstep-lab">Month 1</div><div class="solstep-val">2 units sold</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Month 3</div><div class="solstep-val">8 units sold</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Change</div><div class="solstep-val">8 − 2 = 6 units</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Divide by the old value</div>' +
          '<div class="solstep-val">6 ÷ 2 = 3</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Rate of change</div>' +
          '<div class="solstep-val">300% increase</div></div></div>' +
          '<div class="watchout"><b>Watch out</b> — a negative answer means a <b>decrease</b>. Do not drop the minus sign; ' +
          'it is carrying real meaning.</div>'
      }
    ],
    questions: [
      {
        id: 'w2ch1', type: 'numeric', marks: 2,
        prompt: 'Total monthly sales rose from 12 units in Month 1 to 15 units in Month 3. Calculate the percentage increase.',
        suf: '%', answer: 25, tol: 0.05,
        solution: [
          { lab: 'Change', val: '15 − 12 = 3 units' },
          { lab: 'Divide by the old value', val: '3 ÷ 12 = 0.25' },
          { lab: 'Answer', val: '25% increase', final: true }
        ],
        why: 'Month 1 is where the change started from, so 12 is the base.'
      },
      {
        id: 'w2ch2', type: 'numeric', marks: 2,
        prompt: 'Sales of a new accessory line grew from 5 units in Month 1 to 12 units in Month 3. Calculate the percentage increase.',
        suf: '%', answer: 140, tol: 0.1,
        solution: [
          { lab: 'Change', val: '12 − 5 = 7 units' },
          { lab: 'Divide by the old value', val: '7 ÷ 5 = 1.4' },
          { lab: 'Answer', val: '140% increase', final: true }
        ],
        why: 'An answer over 100% is perfectly normal — it just means the figure more than doubled.'
      },
      {
        id: 'w2ch3', type: 'steps', marks: 6,
        scenario:
          'E-bike SA is analysing its financials over two years.' +
          '<div class="tablewrap"><table class="dtable"><tr><th></th><th>Bikes sold</th><th>Production cost per bike (R)</th><th>Selling price per bike (R)</th></tr>' +
          '<tr><td>Year 1</td><td>1 200</td><td>9 360</td><td>13 500</td></tr>' +
          '<tr><td>Year 2</td><td>1 350</td><td>9 000</td><td>14 220</td></tr></table></div>',
        prompt: 'Calculate the percentage change in gross profit from Year 1 to Year 2.',
        steps: [
          {
            q: 'Calculate the gross profit for Year 1. (Revenue − production cost)',
            pre: 'R', answer: 4968000, tol: 100,
            explain: 'Revenue = 1 200 × R13 500 = R16 200 000. Cost = 1 200 × R9 360 = R11 232 000. Gross profit = R4 968 000.'
          },
          {
            q: 'Calculate the gross profit for Year 2.',
            pre: 'R', answer: 7047000, tol: 100,
            explain: 'Revenue = 1 350 × R14 220 = R19 197 000. Cost = 1 350 × R9 000 = R12 150 000. Gross profit = R7 047 000.'
          },
          {
            q: 'Now calculate the percentage change, to two decimal places.',
            suf: '%', answer: 41.85, tol: 0.1,
            explain: 'Change = R7 047 000 − R4 968 000 = R2 079 000. Divide by the Year 1 base: 2 079 000 ÷ 4 968 000 = 0.4185 = 41.85%.'
          }
        ],
        solution: [
          { lab: 'Year 1 gross profit', val: '(1 200 × 13 500) − (1 200 × 9 360) = R4 968 000' },
          { lab: 'Year 2 gross profit', val: '(1 350 × 14 220) − (1 350 × 9 000) = R7 047 000' },
          { lab: 'Change', val: 'R7 047 000 − R4 968 000 = R2 079 000' },
          { lab: 'Rate of change', val: '2 079 000 ÷ 4 968 000' },
          { lab: 'Answer', val: '41.85% increase', final: true }
        ],
        why: 'Gross profit per year comes first, then the change, then divide by the earlier year. Year 1 is the base because that is what changed.'
      },
      {
        id: 'w2ch4', type: 'mcq', marks: 2,
        prompt: 'A product\'s monthly sales fell from 200 units to 150 units. The percentage change is:',
        options: ['−25%', '−50%', '−33.33%', '+25%'],
        answer: 0,
        solution: [
          { lab: 'Change', val: '150 − 200 = −50 units' },
          { lab: 'Divide by the old value', val: '−50 ÷ 200 = −0.25' },
          { lab: 'Answer', val: '−25% (a decrease)', final: true }
        ],
        why: 'Dividing by 150 would give −33.33%, but 150 is where you ended, not where you started. The base is 200.'
      },
      {
        id: 'w2ch5', type: 'numeric', marks: 2,
        prompt: 'Monthly overhead expenses dropped from R45 000 to R41 400. Calculate the percentage change.',
        suf: '%', answer: -8, tol: 0.05,
        note: 'Include the minus sign if it is a decrease.',
        solution: [
          { lab: 'Change', val: 'R41 400 − R45 000 = −R3 600' },
          { lab: 'Divide by the old value', val: '−3 600 ÷ 45 000 = −0.08' },
          { lab: 'Answer', val: '−8% (a decrease)', final: true }
        ],
        why: 'For expenses a decrease is good news, but the maths is identical — the sign just tells you the direction.'
      }
    ]
  },

  /* ───────────────────────────────────────────────────────── */
  {
    id: 'w2-overhead',
    title: 'Allocating Overhead Expenses',
    emoji: '🏢',
    summary: 'Splitting one big bill fairly between departments using a proxy.',
    notes: [
      {
        heading: 'What overheads are, and the problem they cause',
        emoji: '🧾',
        html:
          '<p><b>Overhead expenses</b> are all the costs needed to produce or sell a product that are not part of ' +
          'the product itself — rent, electricity, security, rates and taxes, cleaners\' salaries.</p>' +
          '<p>The problem: the business receives <b>one invoice</b> for the whole building, but managers need to know ' +
          'how much of it belongs to each department so they can make decisions at that level.</p>' +
          '<p>The solution is a <b>proxy</b> — a sensible measure that stands in for "how much of this cost did you cause?" ' +
          'Common proxies are floorspace occupied, headcount of staff, or number of products stored.</p>'
      },
      {
        heading: 'The three steps',
        emoji: '📐',
        html:
          '<ul class="tickly">' +
          '<li><b>Step 1</b> — pick a suitable proxy.</li>' +
          '<li><b>Step 2</b> — work out each department\'s <b>percentage</b> of the total proxy value. ' +
          'Check they add up to 100%.</li>' +
          '<li><b>Step 3</b> — multiply each percentage by the total expense. Check the allocated amounts add up to the full bill.</li>' +
          '</ul>' +
          '<div class="worked"><div class="worked-title">Worked example — the electricity bill</div>' +
          '<div class="solstep"><div class="solstep-lab">Total floorspace</div><div class="solstep-val">144 m²</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Clothing display area</div><div class="solstep-val">36 m²</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Its portion</div><div class="solstep-val">36 ÷ 144 = 0.25 = 25%</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Electricity bill</div><div class="solstep-val">R12 530</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Allocated to clothing display</div>' +
          '<div class="solstep-val">25% × R12 530 = R3 132.50</div></div></div>' +
          '<div class="watchout"><b>Both checks matter.</b> If your percentages do not total 100%, or your allocated ' +
          'amounts do not total the bill, you have made an error somewhere.</div>'
      }
    ],
    questions: [
      {
        id: 'w2o1', type: 'numeric', marks: 2,
        prompt: 'The office occupies 27 m² of a branch\'s total 180 m² floorspace. What percentage of the floorspace is this?',
        suf: '%', answer: 15, tol: 0.05,
        solution: [
          { lab: 'Proxy portion', val: '27 ÷ 180' },
          { lab: 'As a decimal', val: '0.15' },
          { lab: 'Answer', val: '15%', final: true }
        ],
        why: 'The total floorspace is the base — the whole you are taking a portion of.'
      },
      {
        id: 'w2o2', type: 'numeric', marks: 2,
        prompt: 'The electricity bill is R14 400. How much should be allocated to an area that occupies 15% of the floorspace?',
        pre: 'R', answer: 2160, tol: 0.05,
        solution: [
          { lab: 'Apply P = R × B', val: '0.15 × R14 400' },
          { lab: 'Answer', val: 'R2 160', final: true }
        ],
        why: 'Step 3 of the allocation process: percentage × total expense.'
      },
      {
        id: 'w2o3', type: 'steps', marks: 4,
        scenario: 'A business occupies 180 m² in total. The storeroom takes up 54 m². The monthly rates and taxes bill is R18 000.',
        prompt: 'Calculate the amount that should be allocated to the storeroom.',
        steps: [
          {
            q: 'What percentage of the total floorspace does the storeroom occupy?',
            suf: '%', answer: 30, tol: 0.05,
            explain: '54 ÷ 180 = 0.30, which is 30%.'
          },
          {
            q: 'Now allocate the bill to the storeroom.',
            pre: 'R', answer: 5400, tol: 1,
            explain: '0.30 × R18 000 = R5 400.'
          }
        ],
        solution: [
          { lab: 'Storeroom portion', val: '54 ÷ 180 = 30%' },
          { lab: 'Allocate', val: '0.30 × R18 000' },
          { lab: 'Answer', val: 'R5 400', final: true }
        ],
        why: 'Floorspace is the proxy. Find the portion first, then apply it to the bill.'
      },
      {
        id: 'w2o4', type: 'mcq', marks: 1,
        prompt: 'After calculating each department\'s portion of the proxy, what must the percentages add up to?',
        options: ['100%', 'The total expense', 'The number of departments', 'It does not matter'],
        answer: 0,
        solution: [
          { lab: 'Rule', val: 'Every department\'s share is a portion of the same whole' },
          { lab: 'Therefore', val: 'The portions must account for all of it' },
          { lab: 'Answer', val: '100%', final: true }
        ],
        why: 'It is a built-in error check. If they do not total 100%, a portion has been miscalculated or a department left out.'
      },
      {
        id: 'w2o5', type: 'numeric', marks: 2,
        prompt: 'The security bill is R4 200. The bike display area occupies 63 m² of the total 180 m². How much of the security cost should be allocated to it?',
        pre: 'R', answer: 1470, tol: 0.05,
        solution: [
          { lab: 'Portion', val: '63 ÷ 180 = 0.35 = 35%' },
          { lab: 'Allocate', val: '0.35 × R4 200' },
          { lab: 'Answer', val: 'R1 470', final: true }
        ],
        why: 'The same proxy percentage can be reused for every overhead bill the business receives.'
      }
    ]
  },

  /* ───────────────────────────────────────────────────────── */
  {
    id: 'w2-variance',
    title: 'Expenses & Variances',
    emoji: '🧁',
    summary: 'Which costs move with output, and what to do when the actual bill is not the planned one.',
    notes: [
      {
        heading: 'What an overhead actually is',
        emoji: '💡',
        html:
          '<p>E-Bike SA is thinking about selling protein muffins next to the bikes. Making a muffin is not just ' +
          'mixing ingredients — there is electricity for the oven, rent for the kitchen, wages for whoever bakes ' +
          'them. Which raises the question the last topic assumed: what <i>is</i> an overhead?</p>' +
          '<div class="keybox"><b>Overhead expenses</b> are all the costs needed to produce or sell a product that ' +
          'are <b>not part of the product itself</b>.</div>' +
          '<ul class="tickly">' +
          '<li>Rent for the store or the baking area</li>' +
          '<li>Electricity for the ovens and the lights</li>' +
          '<li>Security costs</li>' +
          '<li>Salaries for cleaners and support staff</li>' +
          '</ul>' +
          '<p>The flour and the protein powder go <i>into</i> the muffin, so they are not overheads. The oven that ' +
          'bakes it is.</p>'
      },
      {
        heading: 'Fixed and variable',
        emoji: '⚖️',
        html:
          '<p>The second split is about what happens when output changes.</p>' +
          '<div class="tablewrap"><table class="dtable">' +
          '<tr><th></th><th>What it does</th><th>Examples</th></tr>' +
          '<tr><td><b>Fixed</b></td><td>Stays the same every month however many muffins you bake</td>' +
          '<td>Rent, insurance, salaries</td></tr>' +
          '<tr><td><b>Variable</b></td><td>Rises and falls with how much you produce</td>' +
          '<td>Ingredients, electricity, water</td></tr>' +
          '</table></div>' +
          '<div class="watchout">Bake twice as many muffins and the ingredients bill roughly doubles while the rent ' +
          'does not move. That is the whole distinction, and it is why doubling output never doubles total cost.</div>'
      },
      {
        heading: 'Recipes are ratios',
        emoji: '🥣',
        html:
          '<p>A baker explains that the recipes are ratios and they matter: the oil-to-water ratio for bread dough ' +
          'must be <b>1:5 litres</b>. Mistakes happen.</p>' +
          '<div class="worked"><div class="worked-title">One litre of oil too many</div>' +
          '<div class="solstep"><div class="solstep-lab">Planned</div>' +
          '<div class="solstep-val">1 litre of oil to 5 litres of water</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Actual</div>' +
          '<div class="solstep-val">2 litres of oil to 5 litres of water</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Oil used</div>' +
          '<div class="solstep-val">Double the plan — 200% of what the recipe called for</div></div></div>' +
          '<ul class="tickly">' +
          '<li>The texture of the bread changes</li>' +
          '<li>The batch costs more than budgeted</li>' +
          '<li>Wastage occurs and the profit shrinks</li>' +
          '</ul>'
      },
      {
        heading: 'Variances — planned against actual',
        emoji: '📊',
        html:
          '<div class="keybox">A <b>variance</b> is the difference between what you planned and what actually ' +
          'happened.</div>' +
          '<p>They turn up everywhere: in the ingredients used, in the electricity consumed, in the labour hours ' +
          'worked. And every one of them is one of two things.</p>' +
          '<div class="tablewrap"><table class="dtable">' +
          '<tr><th>Variance</th><th>Means</th><th>Looks like</th></tr>' +
          '<tr><td><b>Favourable</b></td><td>The difference is <b>good</b> for the business</td>' +
          '<td>Saved money · made more profit than expected · used fewer materials without losing quality</td></tr>' +
          '<tr><td><b>Unfavourable</b></td><td>The difference is <b>bad</b> for the business</td>' +
          '<td>Spent more than planned · made less profit · wasted materials or produced lower quality</td></tr>' +
          '</table></div>' +
          '<div class="watchout"><b>Favourable is not the same as "smaller".</b> A cost coming in under budget is ' +
          'favourable; revenue coming in under budget is not. Ask which direction is good for the business, not ' +
          'which number is bigger.</div>' +
          '<p>Catching a variance early helps control costs, prevents wastage and protects the profit margin. Small ' +
          'mistakes in a ratio — a little too much oil, a little extra electricity — add up quickly.</p>'
      }
    ],
    questions: [
      {
        id: 'w2v1', type: 'mcq', marks: 2,
        prompt: 'Which of these is an <b>overhead</b> expense for a muffin business?',
        options: [
          'Rent for the kitchen space',
          'The flour in the muffins',
          'The protein powder in the muffins',
          'The eggs in the muffins'
        ],
        answer: 0,
        solution: [
          { lab: 'An overhead', val: 'Is needed to produce or sell, but is not part of the product' },
          { lab: 'Flour, powder and eggs', val: 'Go into the muffin itself' },
          { lab: 'Answer', val: 'Rent for the kitchen', final: true }
        ],
        why: 'The test is simple: could you point to it in the finished product? If yes it is not an overhead. The oven that baked it is; the flour inside it is not.'
      },
      {
        id: 'w2v2', type: 'mcq', marks: 2,
        prompt: 'Which of these is a <b>fixed</b> expense?',
        options: [
          'Insurance',
          'Electricity for the ovens',
          'Ingredients',
          'Water'
        ],
        answer: 0,
        solution: [
          { lab: 'Fixed', val: 'Does not change with how much is produced' },
          { lab: 'Insurance', val: 'Is the same bill whether you bake 10 or 10 000' },
          { lab: 'Answer', val: 'Insurance', final: true }
        ],
        why: 'Electricity, ingredients and water all rise with output, so all three are variable. Rent and salaries are the other two the notes name as fixed.'
      },
      {
        id: 'w2v3', type: 'mcq', marks: 2,
        prompt: 'What is a <b>variance</b>?',
        options: [
          'The difference between what was planned and what actually happened',
          'The difference between fixed and variable costs',
          'The spread of a set of numbers around their mean',
          'The difference between the selling price and the cost price'
        ],
        answer: 0,
        solution: [
          { lab: 'Planned', val: 'What the budget or recipe said' },
          { lab: 'Actual', val: 'What really happened' },
          { lab: 'Answer', val: 'The difference between them', final: true }
        ],
        why: 'Careful — "variance" also means something quite different in Week 3, where it is a measure of spread. Same word, different subject; the context tells you which.'
      },
      {
        id: 'w2v4', type: 'mcq', marks: 2,
        prompt: 'A batch is baked using <b>fewer</b> ingredients than budgeted, with no drop in quality. What kind of variance is that?',
        options: [
          'Favourable — it is good for the business',
          'Unfavourable — less was produced',
          'Neither; only money counts as a variance',
          'It depends on how many muffins were sold'
        ],
        answer: 0,
        solution: [
          { lab: 'Fewer materials, same quality', val: 'Means lower cost for the same output' },
          { lab: 'Good for the business', val: 'So favourable' },
          { lab: 'Answer', val: 'Favourable', final: true }
        ],
        why: 'The "without affecting the quality" is doing real work here. Using less flour and producing worse muffins saves money and is still unfavourable.'
      },
      {
        id: 'w2v5', type: 'numeric', marks: 3,
        prompt: 'A muffin recipe budgets <b>4 kg</b> of flour per batch. The batch actually used <b>5 kg</b>. The flour used is what <b>percentage</b> of the flour planned?',
        suf: '%', answer: 125, tol: 0.5,
        solution: [
          { lab: 'Planned', val: '4 kg' },
          { lab: 'Actual', val: '5 kg' },
          { lab: 'As a percentage', val: '(5 ÷ 4) × 100' },
          { lab: 'Answer', val: '125% — a quarter more than planned', final: true }
        ],
        why: 'A 25% overspend on one ingredient, and an unfavourable variance. Reporting it as a percentage rather than "one kilo extra" is what makes it comparable to every other line in the budget.'
      },
      {
        id: 'w2v6', type: 'multi', marks: 3,
        prompt: 'Which of these describe an <b>unfavourable</b> variance? <b>Select all that apply.</b>',
        options: [
          'Spent more money than planned',
          'Made less profit than expected',
          'Wasted materials',
          'Used fewer materials without losing quality',
          'Made more profit than expected'
        ],
        answers: [0, 1, 2],
        solution: [
          { lab: 'Unfavourable', val: 'The difference is bad for the business' },
          { lab: 'Overspending, lost profit, waste', val: 'All bad' },
          { lab: 'The other two', val: 'Are favourable' },
          { lab: 'Answer', val: 'Overspent, less profit, wasted materials', final: true }
        ],
        why: 'Notice none of these is about the size of the number. It is always about the direction of the effect on the business.'
      },
      {
        id: 'w2v7', type: 'mcq', marks: 2,
        prompt: 'Why does catching a variance <b>early</b> matter?',
        options: [
          'It helps control costs, prevents wastage and protects profit margins',
          'It changes the budget that was originally set',
          'It removes the need to allocate overheads',
          'It converts a fixed expense into a variable one'
        ],
        answer: 0,
        solution: [
          { lab: 'A variance found late', val: 'Has already cost the business money' },
          { lab: 'Found early', val: 'The cause can be fixed before the next batch' },
          { lab: 'Answer', val: 'Control costs, prevent wastage, protect margins', final: true }
        ],
        why: 'Small mistakes in a ratio add up fast. A little too much oil per batch is trivial once and expensive over a year.'
      }
    ]
  },

  /* ───────────────────────────────────────────────────────── */
  {
    id: 'w2-discount',
    title: 'Trade & Cash Discounts',
    emoji: '🏷️',
    summary: 'Two different discounts, offered for two different reasons.',
    notes: [
      {
        heading: 'Trade discount — a reward for volume',
        emoji: '📦',
        html:
          '<p>Suppliers offer <b>trade discounts</b> to attract customers making recurring, large-volume or high-value ' +
          'purchases. They are agreed <b>before</b> the sale happens.</p>' +
          '<p>There are two equally correct methods to find the net price:</p>' +
          '<div class="keybox"><b>Method 1 — two steps</b><br>' +
          'Discount amount = Trade discount rate × List price<br>' +
          'Net price = List price − Discount amount<br><br>' +
          '<b>Method 2 — one step</b><br>' +
          'Effective rate you pay = 100% − Trade discount rate<br>' +
          'Net price = Effective rate × List price</div>' +
          '<div class="worked"><div class="worked-title">Worked example — energy drinks at 5% off</div>' +
          '<div class="solstep"><div class="solstep-lab">Method 1</div>' +
          '<div class="solstep-val">0.05 × R10 = R0.50 &nbsp;→&nbsp; R10 − R0.50 = R9.50</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Method 2</div>' +
          '<div class="solstep-val">100% − 5% = 95% &nbsp;→&nbsp; 0.95 × R10 = R9.50</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Net price per bottle</div>' +
          '<div class="solstep-val">R9.50 either way</div></div></div>'
      },
      {
        heading: 'Cash discount — a reward for paying early',
        emoji: '⏱️',
        html:
          '<p>Suppliers want their money quickly, so they offer a <b>cash discount</b> if you pay within a set time frame. ' +
          'The quicker you pay, the more discount you get. These are the <b>terms of payment</b> printed on the invoice.</p>' +
          '<p>Typical terms: <i>within 5 days = 10% discount, within 25 days = 2.5% discount, after that = no discount.</i></p>' +
          '<div class="svgfig">' +
          '<svg viewBox="0 0 520 120" role="img" aria-label="Timeline showing payment discount windows">' +
          '<line x1="30" y1="60" x2="490" y2="60" stroke="#B79CED" stroke-width="3"/>' +
          '<line x1="60" y1="42" x2="60" y2="78" stroke="#6E52B8" stroke-width="4"/>' +
          '<line x1="180" y1="42" x2="180" y2="78" stroke="#F0669F" stroke-width="4"/>' +
          '<line x1="400" y1="42" x2="400" y2="78" stroke="#F0669F" stroke-width="4"/>' +
          '<text x="60" y="30" text-anchor="middle" font-size="12" fill="#4A3457">Invoice date</text>' +
          '<text x="180" y="30" text-anchor="middle" font-size="12" fill="#4A3457">Day 5</text>' +
          '<text x="400" y="30" text-anchor="middle" font-size="12" fill="#4A3457">Day 25</text>' +
          '<text x="120" y="98" text-anchor="middle" font-size="14" font-weight="700" fill="#34A98A">10% off</text>' +
          '<text x="290" y="98" text-anchor="middle" font-size="14" font-weight="700" fill="#C9931B">2.5% off</text>' +
          '<text x="447" y="98" text-anchor="middle" font-size="14" font-weight="700" fill="#F0669F">0%</text>' +
          '</svg><figcaption>The earlier you pay, the bigger the discount</figcaption></div>' +
          '<div class="watchout"><b>Watch out</b> — the cash discount is calculated on the <b>invoice total</b>, ' +
          'which has already had the trade discount taken off. Do not apply both to the list price.</div>'
      }
    ],
    questions: [
      {
        id: 'w2d1', type: 'numeric', marks: 2,
        scenario: 'A supplier sells inner tubes at a list price of R24.00 each. E-bike South Africa qualifies for a 15% trade discount.',
        prompt: 'Calculate the net price per inner tube.',
        pre: 'R', answer: 20.40, tol: 0.005,
        solution: [
          { lab: 'Effective rate', val: '100% − 15% = 85%' },
          { lab: 'Net price', val: '0.85 × R24.00' },
          { lab: 'Answer', val: 'R20.40 each', final: true }
        ],
        why: 'You are paying 95% of the list price, so multiplying by 0.95 gets you there in one move.'
      },
      {
        id: 'w2d2', type: 'numeric', marks: 2,
        prompt: 'E-bike South Africa orders 3 000 inner tubes at a net unit price of R20.40. What is the invoice total?',
        pre: 'R', answer: 61200, tol: 1,
        solution: [
          { lab: 'Calculate', val: '3 000 × R20.40' },
          { lab: 'Answer', val: 'R61 200', final: true }
        ],
        why: 'The invoice total uses the net price, after the trade discount has already been deducted.'
      },
      {
        id: 'w2d3', type: 'numeric', marks: 2,
        prompt: 'The trade discount structure gives 25% off list price for orders over 20 000 units. If the list price is R24.00, what is the net price per unit at that volume?',
        pre: 'R', answer: 18.00, tol: 0.005,
        solution: [
          { lab: 'Effective rate', val: '100% − 25% = 75%' },
          { lab: 'Net price', val: '0.75 × R24.00' },
          { lab: 'Answer', val: 'R18.00 per unit', final: true }
        ],
        why: 'Higher volume unlocks a higher discount rate, but the method does not change.'
      },
      {
        id: 'w2d4', type: 'steps', marks: 4,
        scenario: 'The supplier\'s invoice totals R61 200. Payment terms are: within 7 days = 5% discount, within 30 days = 2% discount.',
        prompt: 'The invoice is paid 4 days after the invoice date. Calculate the amount actually paid.',
        steps: [
          {
            q: 'Which cash discount rate applies?',
            suf: '%', answer: 5, tol: 0.01,
            explain: 'Four days is within the 7-day window, so the full 5% discount applies.'
          },
          {
            q: 'Calculate the cash discount amount.',
            pre: 'R', answer: 3060, tol: 1,
            explain: '0.05 × R61 200 = R3 060.'
          },
          {
            q: 'Calculate the amount actually paid.',
            pre: 'R', answer: 58140, tol: 1,
            explain: 'R61 200 − R3 060 = R58 140. You could also do 0.95 × R61 200 in one step.'
          }
        ],
        solution: [
          { lab: 'Applicable rate', val: 'Paid on day 4 → within 7 days → 5%' },
          { lab: 'Discount amount', val: '0.05 × R61 200 = R3 060' },
          { lab: 'Amount paid', val: 'R61 200 − R3 060' },
          { lab: 'Answer', val: 'R58 140', final: true }
        ],
        why: 'The cash discount is applied to the invoice total, which already reflects the trade discount.'
      },
      {
        id: 'w2d5', type: 'mcq', marks: 1,
        prompt: 'Payment terms are: within 7 days = 5% discount, within 30 days = 2% discount. The invoice is paid 19 days after the invoice date. Which discount applies?',
        options: ['2%', '5%', '7%', 'No discount'],
        answer: 0,
        solution: [
          { lab: 'Day 19', val: 'Later than 7 days, but earlier than 30 days' },
          { lab: 'Therefore', val: 'Falls in the second window' },
          { lab: 'Answer', val: '2%', final: true }
        ],
        why: 'You missed the best window but still qualify for the smaller discount. Only after day 30 do you get nothing.'
      }
    ]
  },

  /* ───────────────────────────────────────────────────────── */
  {
    id: 'w2-margin',
    title: 'Gross Profit & Margins',
    emoji: '💰',
    summary: 'Two ways of expressing profit as a percentage — and why the base matters.',
    notes: [
      {
        heading: 'Getting the terminology right',
        emoji: '📖',
        html:
          '<ul class="tickly">' +
          '<li><b>Selling price</b> — the price at which an item is sold.</li>' +
          '<li><b>Cost price</b> — the cost allocated to the item up to the point it is ready for sale.</li>' +
          '<li><b>Gross profit</b> — the difference between selling price and cost price.</li>' +
          '<li><b>Gross profit margin</b> — that profit expressed as a percentage.</li>' +
          '</ul>' +
          '<div class="math-block">Gross profit = Selling price − Cost price</div>'
      },
      {
        heading: 'Two margins, two answers — both correct',
        emoji: '⚠️',
        html:
          '<p>The gross profit margin can be calculated in <b>two different ways</b>, and they give different numbers. ' +
          'The only difference is which value you use as the <b>base</b>.</p>' +
          '<div class="keybox">' +
          'Margin on <b>cost price</b> = <span class="frac"><span>Gross profit</span><span>Cost price</span></span><br><br>' +
          'Margin on <b>selling price</b> = <span class="frac"><span>Gross profit</span><span>Selling price</span></span></div>' +
          '<div class="worked"><div class="worked-title">Worked example — the energy drinks</div>' +
          '<div class="solstep"><div class="solstep-lab">Cost price</div><div class="solstep-val">R9.50</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Selling price</div><div class="solstep-val">R14.50</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Gross profit</div><div class="solstep-val">R14.50 − R9.50 = R5.00</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Margin on cost price</div>' +
          '<div class="solstep-val">5.00 ÷ 9.50 = 0.5263 = 52.63%</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Margin on selling price</div>' +
          '<div class="solstep-val">5.00 ÷ 14.50 = 0.3448 = 34.48%</div></div></div>' +
          '<div class="watchout"><b>Watch out</b> — the margin on cost price is always the <b>larger</b> number, ' +
          'because the cost price is the smaller base. Read the question carefully to see which one it wants.</div>'
      }
    ],
    questions: [
      {
        id: 'w2m1', type: 'numeric', marks: 2,
        scenario: 'The cost price of a cycling helmet is R64.00. E-bike South Africa sells it for R80.00.',
        prompt: 'Calculate the gross profit per helmet.',
        pre: 'R', answer: 16.00, tol: 0.005,
        solution: [
          { lab: 'Formula', val: 'Gross profit = Selling price − Cost price' },
          { lab: 'Substitute', val: 'R80.00 − R64.00' },
          { lab: 'Answer', val: 'R16.00 per helmet', final: true }
        ],
        why: 'Gross profit is just the gap between what you paid and what you charged.'
      },
      {
        id: 'w2m2', type: 'numeric', marks: 2,
        prompt: 'The gross profit is R16.00 and the cost price is R64.00. Calculate the gross profit margin <b>on cost price</b>.',
        suf: '%', answer: 25, tol: 0.05,
        solution: [
          { lab: 'Formula', val: 'Gross profit ÷ Cost price' },
          { lab: 'Substitute', val: 'R16.00 ÷ R64.00 = 0.25' },
          { lab: 'Answer', val: '25%', final: true }
        ],
        why: 'The cost price is the base here, so it goes on the bottom of the fraction.'
      },
      {
        id: 'w2m3', type: 'numeric', marks: 2,
        prompt: 'The gross profit is R16.00 and the selling price is R80.00. Calculate the gross profit margin <b>on selling price</b>.',
        suf: '%', answer: 20, tol: 0.05,
        solution: [
          { lab: 'Formula', val: 'Gross profit ÷ Selling price' },
          { lab: 'Substitute', val: 'R16.00 ÷ R80.00 = 0.20' },
          { lab: 'Answer', val: '20%', final: true }
        ],
        why: 'Same profit, bigger base, so a smaller percentage. Always check which base the question asks for.'
      },
      {
        id: 'w2m4', type: 'mcq', marks: 1,
        prompt: 'For the same item, which method always produces the <b>larger</b> gross profit margin percentage?',
        options: [
          'Margin on cost price',
          'Margin on selling price',
          'They are always equal',
          'It depends on the size of the profit'
        ],
        answer: 0,
        solution: [
          { lab: 'Cost price', val: 'Always smaller than the selling price (when there is a profit)' },
          { lab: 'Smaller base', val: 'Dividing by a smaller number gives a larger result' },
          { lab: 'Answer', val: 'Margin on cost price', final: true }
        ],
        why: 'The gross profit on top is identical in both. Only the denominator changes, and the smaller denominator wins.'
      },
      {
        id: 'w2m5', type: 'steps', marks: 4,
        scenario: 'An item costs E-Bike SA R120. The business wants a gross profit margin of 30% on cost price.',
        prompt: 'Determine the selling price.',
        steps: [
          {
            q: 'Calculate the gross profit required. (30% of the cost price)',
            pre: 'R', answer: 36, tol: 0.05,
            explain: '0.30 × R120 = R36. The margin is on cost price, so R120 is the base.'
          },
          {
            q: 'Now calculate the selling price.',
            pre: 'R', answer: 156, tol: 0.05,
            explain: 'Gross profit = Selling price − Cost price, so Selling price = R120 + R36 = R156.'
          }
        ],
        solution: [
          { lab: 'Required gross profit', val: '0.30 × R120 = R36' },
          { lab: 'Rearrange the formula', val: 'Selling price = Cost price + Gross profit' },
          { lab: 'Substitute', val: 'R120 + R36' },
          { lab: 'Answer', val: 'R156', final: true }
        ],
        why: 'Because the margin is on cost price, you apply the 25% to R80. If it had been on selling price you would need a different approach — the base would be the unknown.'
      }
    ]
  }

  ]
});
