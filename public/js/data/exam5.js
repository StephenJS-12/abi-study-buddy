/* Abi's Study Buddy — Exam Questions bank, Week 5.
 *
 * THE PAPER, VERBATIM.
 *
 *   This is Milpark's "Additional exercises: Week 5" reproduced as it is
 *   written. Abi asked for the paper itself, not questions modelled on it, so
 *   nothing here is reworded, reordered, split, combined or invented. The
 *   prompt of every question is the paper's own sentence, typos of spacing and
 *   all straightened only where the PDF extraction broke a word in half.
 *
 *   That makes this file different from exam1 to exam4, which are generated —
 *   a fresh variant of each question family every sitting. These fifteen are
 *   fixed, because a fixed paper is what was asked for.
 *
 * WHERE THE ANSWERS COME FROM
 *
 *   The paper ships with no memo. Every answer here was computed from scratch
 *   and checked a second time by an independent route, and tests/maths.js
 *   recomputes all fifteen. Two of them come back as exactly R7 500 and
 *   R25 000, which is a good sign the paper was built backwards from round
 *   principals.
 *
 *   The worked solutions and the "why" lines are mine — the paper has none.
 *   They do not change any question; they are what the app shows after she has
 *   answered, the same as everywhere else.
 *
 * THESE QUESTIONS ALSO APPEAR IN THE WEEK 5 TOPICS
 *
 *   Deliberately, and against the rule the other exam files follow. The Week 5
 *   topics were written from this paper, so every question here has a twin in
 *   the practise/test bank. Abi asked for the paper in the exam section anyway.
 */

window.EXAM_DATA = window.EXAM_DATA || [];

window.EXAM_DATA.push({
  id: 'exam-week5',
  weekId: 'week5',
  number: 5,
  title: 'Week 5 Exam Questions',
  emoji: '📝',
  accent: 5,
  blurb: 'The Milpark Week 5 practice paper — present values, rate changes and extra payments.',
  topics: [

    {
      id: 'ex5-pv',
      title: 'Finding the Present Value',
      emoji: '⏪',
      summary: 'Questions 1 to 3 of the paper — working back to a single lump sum.',
      questions: [
        {
          id: 'x5q1', type: 'numeric', marks: 5,
          prompt: 'You have a total amount of R33 581 available in a savings account today. The quoted nominal interest rate was 10% per year compounded quarterly (4 times per year). You first deposited a lumpsum into the account 5 years ago and have not since withdrawn or added money to the account. What was the value of the amount you deposited 5 years ago? (Round the answer to the nearest Rand.)',
          pre: 'R', answer: 20494, tol: 2,
          solution: [
            { lab: 'Identify', val: 'FV = R33 581, m = 4, term = 5 years' },
            { lab: 'Rate per period', val: '10% ÷ 4 = 2.5% = 0.025' },
            { lab: 'Periods', val: '5 × 4 = 20' },
            { lab: 'Apply the power', val: '(1.025)²⁰ = 1.638616' },
            { lab: 'Answer', val: 'R33 581 ÷ 1.638616 = R20 494', final: true }
          ],
          why: '"Have not since withdrawn or added money" is the phrase that tells you one PV calculation is enough. Any movement during the term and this becomes a two-step question.'
        },
        {
          id: 'x5q2', type: 'numeric', marks: 5,
          prompt: 'You have a total amount of R8 080 available in a savings account today. The quoted nominal interest rate was 15% per year compounded every month (monthly). You first deposited a lumpsum into the account 6 months ago and have not since withdrawn or added money to the account. What was the value of the amount you deposited 6 months ago? (Round the answer to the nearest Rand.)',
          pre: 'R', answer: 7500, tol: 2,
          solution: [
            { lab: 'Identify', val: 'FV = R8 080, m = 12, term = 6 months' },
            { lab: 'Rate per period', val: '15% ÷ 12 = 1.25% = 0.0125' },
            { lab: 'Periods', val: '6 months is 6 monthly periods, so n = 6' },
            { lab: 'Apply the power', val: '(1.0125)⁶ = 1.077383' },
            { lab: 'Answer', val: 'R8 080 ÷ 1.077383 = R7 500', final: true }
          ],
          why: 'The term is in months here, not years, so n is simply 6. A clean R7 500 is a good sign it is right.'
        },
        {
          id: 'x5q3', type: 'numeric', marks: 5,
          prompt: 'You have a total amount of R62 954 available in a savings account today. The quoted nominal interest rate was 8% per year compounded yearly. You first deposited a lumpsum into the account 12 years ago and have not since withdrawn or added money to the account. What was the value of the amount you deposited 12 years ago? (Round the answer to the nearest Rand.)',
          pre: 'R', answer: 25000, tol: 2,
          solution: [
            { lab: 'Identify', val: 'FV = R62 954, m = 1, term = 12 years' },
            { lab: 'Rate per period', val: '8% ÷ 1 = 0.08' },
            { lab: 'Periods', val: '12 × 1 = 12' },
            { lab: 'Apply the power', val: '(1.08)¹² = 2.51817' },
            { lab: 'Answer', val: 'R62 954 ÷ 2.51817 = R25 000', final: true }
          ],
          why: 'Check it forwards: R25 000 × 2.51817 = R62 954. Pushing an answer back through the formula you came from is the cheapest check there is.'
        }
      ]
    },

    {
      id: 'ex5-ratechange',
      title: 'A Rate Change During the Term',
      emoji: '🔀',
      summary: 'Questions 4 to 9 — two rates, forwards and backwards.',
      questions: [
        {
          id: 'x5q4', type: 'numeric', marks: 8,
          prompt: 'Suppose you deposited R200 000 today into a 20-year fixed deposit account. Your money will earn nominal interest of 12% per annum compounded yearly for the first eight years, and 10% per annum compounded twice a year for the remainder of the 20 years. How much money will you have accumulated in the account at the end of the 20-year term? (Round all your answers, interim and final, to the nearest Rand.)',
          pre: 'R', answer: 1597046, tol: 20,
          solution: [
            { lab: 'First 8 years', val: 'i = 0.12, n = 8, (1.12)⁸ = 2.475963' },
            { lab: 'FV interim', val: 'R200 000 × 2.475963 = R495 193' },
            { lab: 'Remaining 12 years', val: 'i = 10% ÷ 2 = 0.05, n = 12 × 2 = 24' },
            { lab: 'Apply the power', val: '(1.05)²⁴ = 3.2251' },
            { lab: 'Answer', val: 'R495 193 × 3.2251 = R1 597 047 (R1 597 046 unrounded)', final: true }
          ],
          why: 'The compounding frequency changes as well as the rate — yearly to twice a year — so both i and n have to be recalculated for the second piece, not just i.'
        },
        {
          id: 'x5q5', type: 'numeric', marks: 8,
          prompt: 'Suppose you deposited R10 000 today into a 6-year fixed deposit account. Your money will earn nominal interest of 15% per annum compounded yearly for the first three years, and 10% per annum compounded twice a year for the remainder of the 6 years. How much money will you have accumulated in the account at the end of the 6-year term? (Round all your answers, interim and final, to the nearest Rand.)',
          pre: 'R', answer: 20381, tol: 3,
          solution: [
            { lab: 'First 3 years', val: 'i = 0.15, n = 3, (1.15)³ = 1.520875' },
            { lab: 'FV interim', val: 'R10 000 × 1.520875 = R15 209' },
            { lab: 'Remaining 3 years', val: 'i = 10% ÷ 2 = 0.05, n = 3 × 2 = 6' },
            { lab: 'Apply the power', val: '(1.05)⁶ = 1.340096' },
            { lab: 'Answer', val: 'R15 209 × 1.340096 = R20 382 (R20 381 unrounded)', final: true }
          ],
          why: 'The paper says to round the interim as well, which gives R20 382; carrying full precision gives R20 381. Both are accepted here.'
        },
        {
          id: 'x5q6', type: 'numeric', marks: 8,
          prompt: 'Suppose you deposited R22 000 today into a 12-year fixed deposit account. Your money will earn nominal interest of 11% per annum compounded monthly for the first five years, and 12% per annum compounded quarterly a year for the remainder of the 12 years. How much money will you have accumulated in the account at the end of the 12-year term? (Round all your answers, interim and final, to the nearest Rand.)',
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
          id: 'x5q7', type: 'numeric', marks: 8,
          prompt: 'What was the principal amount you borrowed if you must pay an accumulated amount of R100 000 after 10 years, given that the interest was calculated at a nominal interest rate of 12% per annum compounded once a year for the first three years and after that at a nominal interest rate of 14% per annum compounded half-yearly? (Round all your answers, interim and final, to the nearest Rand.)',
          pre: 'R', answer: 27604, tol: 3,
          solution: [
            { lab: 'Start at the far end', val: 'The last 7 years: i₂ = 14% ÷ 2 = 0.07, n₂ = 14' },
            { lab: 'Growth factor', val: '(1.07)¹⁴ = 2.578534' },
            { lab: 'PV interim', val: 'R100 000 ÷ 2.578534 = R38 782' },
            { lab: 'First 3 years', val: 'i₁ = 0.12, n₁ = 3, (1.12)³ = 1.404928' },
            { lab: 'Answer', val: 'R38 782 ÷ 1.404928 = R27 604', final: true }
          ],
          why: 'Solving for PV means working backwards, so the SECOND piece of the term is calculated first. R38 782 is what would still be owing three years in — a real amount, not just an intermediate.'
        },
        {
          id: 'x5q8', type: 'numeric', marks: 8,
          prompt: 'What was the principal amount you borrowed if you must pay an accumulated amount of R55 000 after 6 years, given that the interest was calculated at a nominal interest rate of 13% per annum compounded once a year for the first two years and after that at a nominal interest rate of 12% per annum compounded half-yearly? (Round all your answers, interim and final, to the nearest Rand.)',
          pre: 'R', answer: 27025, tol: 3,
          solution: [
            { lab: 'Last 4 years', val: 'i₂ = 12% ÷ 2 = 0.06, n₂ = 8' },
            { lab: 'Growth factor', val: '(1.06)⁸ = 1.593848' },
            { lab: 'PV interim', val: 'R55 000 ÷ 1.593848 = R34 508' },
            { lab: 'First 2 years', val: 'i₁ = 0.13, n₁ = 2, (1.13)² = 1.2769' },
            { lab: 'Answer', val: 'R34 508 ÷ 1.2769 = R27 025', final: true }
          ],
          why: 'Reasonability check: R27 025 roughly doubles to R55 000 over six years, which is about right for rates in the 12–13% range.'
        },
        {
          id: 'x5q9', type: 'numeric', marks: 8,
          prompt: 'What was the principal amount you borrowed if you must pay an accumulated amount of R23 000 after 5 years, given that the interest was calculated at a nominal interest rate of 11% per annum compounded twice a year for the first three years and after that at a nominal interest rate of 12% per annum compounded quarterly? (Round all your answers, interim and final, to the nearest Rand.)',
          pre: 'R', answer: 13168, tol: 3,
          solution: [
            { lab: 'Last 2 years', val: 'i₂ = 12% ÷ 4 = 0.03, n₂ = 8' },
            { lab: 'Growth factor', val: '(1.03)⁸ = 1.26677' },
            { lab: 'PV interim', val: 'R23 000 ÷ 1.26677 = R18 156' },
            { lab: 'First 3 years', val: 'i₁ = 11% ÷ 2 = 0.055, n₁ = 6, (1.055)⁶ = 1.378843' },
            { lab: 'Answer', val: 'R18 156 ÷ 1.378843 = R13 168', final: true }
          ],
          why: 'Both the rate and the compounding frequency change here — twice a year becomes quarterly. Recalculate i and n separately for each piece rather than assuming one carries over.'
        }
      ]
    },

    {
      id: 'ex5-extra',
      title: 'Extra Amounts During the Term',
      emoji: '➕',
      summary: 'Questions 10 to 15 — a withdrawal partway through, and a cash price.',
      questions: [
        {
          id: 'x5q10', type: 'numeric', marks: 8,
          prompt: 'Eight years ago, you deposited R200 000 in an investment fund which earned interest at a nominal rate of 12% per annum compounded yearly. You only made one withdrawal from the fund during the 8 years. This withdrawal of R100 000 was made exactly six years ago. How much money should you have accumulated in the fund today? (Round all your answers, interim and final, to the nearest Rand.)',
          pre: 'R', answer: 297810, tol: 5,
          solution: [
            { lab: 'When was the withdrawal?', val: '8 − 6 = 2 years after the deposit' },
            { lab: 'First 2 years', val: 'i = 0.12, n = 2, (1.12)² = 1.2544' },
            { lab: 'FV interim', val: 'R200 000 × 1.2544 = R250 880' },
            { lab: 'Subtract the withdrawal', val: 'R250 880 − R100 000 = R150 880' },
            { lab: 'Remaining 6 years', val: '(1.12)⁶ = 1.973823' },
            { lab: 'Answer', val: 'R150 880 × 1.973823 = R297 810', final: true }
          ],
          why: 'The dates are given as "years ago", so convert them first: the withdrawal is 2 years into an 8-year term, leaving 6. Getting that subtraction the wrong way round is the trap.'
        },
        {
          id: 'x5q11', type: 'numeric', marks: 8,
          prompt: 'Ten years ago, you deposited R80 000 in an investment fund which earned interest at a nominal rate of 15% per annum compounded quarterly. You only made one withdrawal from the fund during the 10 years. This withdrawal of R80 000 was made exactly six and a half years ago. How much money should you have accumulated in the fund today? (Round all your answers, interim and final, to the nearest Rand.)',
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
          why: 'Half-years are fine here: 3.5 years at 4 periods a year is exactly 14 periods. A fractional term only causes trouble when it does not land on a whole period.'
        },
        {
          id: 'x5q12', type: 'numeric', marks: 8,
          prompt: 'Four years ago, you deposited R120 000 in an investment fund which earned interest at a nominal rate of 13% per annum compounded half-yearly. You only made one withdrawal from the fund during the 4 years. This withdrawal of R75 000 was made exactly three years ago. How much money should you have accumulated in the fund today? (Round all your answers, interim and final, to the nearest Rand.)',
          pre: 'R', answer: 89164, tol: 4,
          solution: [
            { lab: 'When was the withdrawal?', val: '4 − 3 = 1 year after the deposit' },
            { lab: 'First year', val: 'i = 13% ÷ 2 = 0.065, n = 2, (1.065)² = 1.134225' },
            { lab: 'FV interim', val: 'R120 000 × 1.134225 = R136 107' },
            { lab: 'Subtract the withdrawal', val: 'R136 107 − R75 000 = R61 107' },
            { lab: 'Remaining 3 years', val: 'n = 6, (1.065)⁶ = 1.459142' },
            { lab: 'Answer', val: 'R61 107 × 1.459142 = R89 164', final: true }
          ],
          why: 'R120 000 in and R75 000 out is R45 000 net, yet R89 164 is there today. Almost all of the difference is interest the R75 000 earned in the year it was still invested, plus six periods of growth on what stayed.'
        },
        {
          id: 'x5q13', type: 'numeric', marks: 8,
          prompt: 'You bought a delivery vehicle for which you paid a deposit of R50 000 on the day you purchased it, a further R100 000 three years later and a final amount of R150 000 six years after the purchase date. The vehicle dealership asked interest at a compounded interest rate of 14% per annum, compounded once a year. If you had enough cash to pay for the vehicle in full on the day you purchased it, how much would you pay for the vehicle on the day? (Thus, what was the cash price of the vehicle?) (Round all your answers, interim and final, to the nearest Rand.)',
          pre: 'R', answer: 185835, tol: 4,
          solution: [
            { lab: 'Deposit', val: 'R50 000, already paid today, so no discounting' },
            { lab: 'R100 000 in 3 years', val: '(1.14)³ = 1.481544, so R100 000 ÷ 1.481544 = R67 497' },
            { lab: 'R150 000 in 6 years', val: '(1.14)⁶ = 2.194973, so R150 000 ÷ 2.194973 = R68 338' },
            { lab: 'Answer', val: 'R50 000 + R67 497 + R68 338 = R185 835', final: true }
          ],
          why: 'R300 000 changes hands in total, but the cash price is R185 835 — the other R114 165 is interest for the privilege of paying late.'
        },
        {
          id: 'x5q14', type: 'numeric', marks: 8,
          prompt: 'You bought a delivery vehicle for which you paid a deposit of R80 000 on the day you purchased it, a further R100 000 two years later and a final amount of R150 000 eight years after the purchase date. The vehicle dealership asked interest at a compounded interest rate of 12% per annum, compounded quarterly. If you had enough cash to pay for the vehicle in full on the day you purchased it, how much would you pay for the vehicle on the day? (Thus, what was the cash price of the vehicle?) (Round all your answers, interim and final, to the nearest Rand.)',
          pre: 'R', answer: 217191, tol: 4,
          solution: [
            { lab: 'Rate per period', val: '12% ÷ 4 = 0.03' },
            { lab: 'Deposit', val: 'R80 000, paid today' },
            { lab: 'R100 000 in 2 years', val: 'n = 8, (1.03)⁸ = 1.26677, so R78 941' },
            { lab: 'R150 000 in 8 years', val: 'n = 32, (1.03)³² = 2.575083, so R58 251' },
            { lab: 'Answer', val: 'R80 000 + R78 941 + R58 251 = R217 192 (R217 191 unrounded)', final: true }
          ],
          why: 'Each payment gets its own n, counted from today to the day it is made. The R150 000 is discounted over 32 quarters and ends up worth barely more than a third of its face value.'
        },
        {
          id: 'x5q15', type: 'numeric', marks: 8,
          prompt: 'You bought a delivery vehicle for which you paid a deposit of R10 000 on the day you purchased it, a further R120 000 a year later and a final amount of R250 000 three years after the purchase date. The vehicle dealership asked interest at a compounded interest rate of 13% per annum, compounded half-yearly. If you had enough cash to pay for the vehicle in full on the day you purchased it, how much would you pay for the vehicle on the day? (Thus, what was the cash price of the vehicle?) (Round all your answers, interim and final, to the nearest Rand.)',
          pre: 'R', answer: 287133, tol: 4,
          solution: [
            { lab: 'Rate per period', val: '13% ÷ 2 = 0.065' },
            { lab: 'Deposit', val: 'R10 000, paid today' },
            { lab: 'R120 000 in 1 year', val: 'n = 2, (1.065)² = 1.134225, so R105 799' },
            { lab: 'R250 000 in 3 years', val: 'n = 6, (1.065)⁶ = 1.459142, so R171 334' },
            { lab: 'Answer', val: 'R10 000 + R105 799 + R171 334 = R287 133', final: true }
          ],
          why: 'A short term and a large final payment mean less discounting: R380 000 of payments comes back to R287 133, where the six-year deal in Question 13 shrank R300 000 to R185 835.'
        }
      ]
    }

  ]
});
