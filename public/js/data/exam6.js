/* Abi's Study Buddy — Exam Questions bank, Week 6.
 *
 * THE PAPER, VERBATIM. Same rule as exam5.js: this is Milpark's "Additional
 * exercises: Week 6" as written, all forty-three of them, in the paper's own
 * order and wording. Nothing reworded, split, combined or invented.
 *
 * Questions 20 to 22 ask for TWO figures — the balance after the first
 * instalment and after the second. They are `steps` rather than `numeric` for
 * that reason: the question is unchanged, the app just needs somewhere to put
 * both answers.
 *
 * The paper has no memo. Every answer was computed from scratch and checked a
 * second time by rolling the loan forward payment by payment; tests/maths.js
 * recomputes all of them. The five "how many payments" questions come back as
 * whole numbers — 36, 72, 240, 6, 8 — which is a good sign the method is right.
 *
 * The worked solutions and "why" lines are mine, since the paper has none. They
 * change no question; they are what the app shows after she answers.
 *
 * As with Week 5, these questions also appear in the Week 6 topics, because the
 * topics were written from this paper. Deliberate — Abi asked for the paper in
 * the exam section as well.
 */

window.EXAM_DATA = window.EXAM_DATA || [];

window.EXAM_DATA.push({
  id: 'exam-week6',
  weekId: 'week6',
  number: 6,
  title: 'Week 6 Exam Questions',
  emoji: '📝',
  accent: 6,
  blurb: 'The Milpark Week 6 practice paper — annuities, instalments, balances, deposits and balloons.',
  topics: [

    {
      id: 'ex6-fv',
      title: 'Accumulating an Annuity',
      emoji: '📈',
      summary: 'Questions 1 to 4 of the paper — what regular payments grow to.',
      questions: [
        {
          id: 'x6q1', type: 'numeric', marks: 5,
          prompt: 'A client invests R2 500 monthly into an account for 5 years. The account earns interest at 7.25% per year, compounded monthly. Calculate the accumulated value in the account at the end of the term.',
          pre: 'R', answer: 180145.19, tol: 3,
          solution: [
            { lab: 'Rate per period', val: '7.25% ÷ 12 = 0.00604167, n = 60' },
            { lab: 'The bracket', val: '((1.00604167)⁶⁰ − 1) ÷ 0.00604167 = 72.058078' },
            { lab: 'Answer', val: 'R2 500 × 72.058078 = R180 145.19', final: true }
          ],
          why: 'R150 000 of payments, R30 145.19 of interest. The bracket (72.06) sits only a little above the 60 payments themselves, which is what a modest rate over five years looks like.'
        },
        {
          id: 'x6q2', type: 'numeric', marks: 5,
          prompt: 'A client invests R1 800 half-yearly into an account for 4 years. The account earns interest at 7.25% per year, compounded half-yearly. Calculate the accumulated value in the account at the end of the term.',
          pre: 'R', answer: 16365.64, tol: 3,
          solution: [
            { lab: 'Rate per period', val: '7.25% ÷ 2 = 0.03625, n = 8' },
            { lab: 'The bracket', val: '((1.03625)⁸ − 1) ÷ 0.03625 = 9.09202' },
            { lab: 'Answer', val: 'R1 800 × 9.09202 = R16 365.64', final: true }
          ],
          why: 'The periodic rate is 3.625%, not 7.25%. Halving the compounding frequency halves the rate per period and halves n — both change together.'
        },
        {
          id: 'x6q3', type: 'numeric', marks: 5,
          prompt: 'A client invests R3 500 quarterly into an account for 8 years. The account earns interest at 8.50% per year, compounded quarterly. Calculate the accumulated value in the account at the end of the term.',
          pre: 'R', answer: 158095.46, tol: 4,
          solution: [
            { lab: 'Rate per period', val: '8.5% ÷ 4 = 0.02125, n = 32' },
            { lab: 'The bracket', val: '((1.02125)³² − 1) ÷ 0.02125 = 45.170132' },
            { lab: 'Answer', val: 'R3 500 × 45.170132 = R158 095.46', final: true }
          ],
          why: 'R112 000 of payments became R158 095.46. The bracket is 45.17 against 32 payments — over eight years the interest is doing real work.'
        },
        {
          id: 'x6q4', type: 'numeric', marks: 5,
          prompt: 'A client invests R1 500 monthly into an account for 3 years. The account earns interest at 4.80% per year, compounded monthly. Calculate the accumulated value in the account at the end of the term.',
          pre: 'R', answer: 57957.16, tol: 3,
          solution: [
            { lab: 'Rate per period', val: '4.8% ÷ 12 = 0.004, n = 36' },
            { lab: 'The bracket', val: '((1.004)³⁶ − 1) ÷ 0.004 = 38.6381' },
            { lab: 'Answer', val: 'R1 500 × 38.6381 = R57 957.16', final: true }
          ],
          why: 'R54 000 in, R3 957.16 of interest. At 4.8% the bracket (38.64) sits close to the number of payments (36) — the signature of a low rate over a short term.'
        }
      ]
    },

    {
      id: 'ex6-rate',
      title: 'Finding the Rate',
      emoji: '🔎',
      summary: 'Questions 5 to 10 — the rate that turns the payments into the balance.',
      questions: [
        {
          id: 'x6q5', type: 'numeric', marks: 6,
          prompt: 'A client invests a monthly amount of R1 500.00 into an account for 3 years. The accumulated value in the account at the end of the term is R62 403.85. Calculate the annual interest rate, compounded monthly, that the client earned. Round your answer to two decimals.',
          suf: '%', answer: 9.72, tol: 0.05,
          solution: [
            { lab: 'Known', val: 'PMT = −1 500, PV = 0, n = 36, FV = 62 403.85, P/YR = 12' },
            { lab: 'Press', val: 'I/YR' },
            { lab: 'Answer', val: '9.72% per annum compounded monthly', final: true }
          ],
          why: 'Sanity check first: R54 000 of payments grew to R62 403.85, so about R8 400 of interest. A rate near 10% is what you would expect; 0.81% or 97% would be a decimal place astray.'
        },
        {
          id: 'x6q6', type: 'numeric', marks: 6,
          prompt: 'A client invests a monthly amount of R3 000.00 into an account for 4 years. The accumulated value in the account at the end of the term is R169 403.25. Calculate the annual interest rate, compounded monthly, that the client earned. Round your answer to two decimals.',
          suf: '%', answer: 8.10, tol: 0.05,
          solution: [
            { lab: 'Known', val: 'PMT = −3 000, PV = 0, n = 48, FV = 169 403.25, P/YR = 12' },
            { lab: 'Press', val: 'I/YR' },
            { lab: 'Answer', val: '8.10% per annum compounded monthly', final: true }
          ],
          why: 'There is no formula for the rate — it appears in three places at once in the annuity bracket. The calculator guesses and improves, which is why it takes a noticeable moment.'
        },
        {
          id: 'x6q7', type: 'numeric', marks: 6,
          prompt: 'A client invests a quarterly amount of R2 500.00 into an account for 4 years. The accumulated value in the account at the end of the term is R54 301.00. Calculate the annual interest rate, compounded quarterly, that the client earned. Round your answer to two decimals.',
          suf: '%', answer: 15.76, tol: 0.05,
          solution: [
            { lab: 'Known', val: 'PMT = −2 500, PV = 0, n = 16, FV = 54 301.00, P/YR = 4' },
            { lab: 'Press', val: 'I/YR' },
            { lab: 'Answer', val: '15.76% per annum compounded quarterly', final: true }
          ],
          why: 'n = 4 × 4 = 16, not 4. R40 000 of payments grew to R54 301, so a rate in the mid-teens is the right order of magnitude.'
        },
        {
          id: 'x6q8', type: 'numeric', marks: 6,
          prompt: 'A client invests a quarterly amount of R6 500.00 into an account for 7 years. The accumulated value in the account at the end of the term is R236 540.30. Calculate the annual interest rate, compounded quarterly, that the client earned. Round your answer to two decimals.',
          suf: '%', answer: 7.50, tol: 0.05,
          solution: [
            { lab: 'Known', val: 'PMT = −6 500, PV = 0, n = 28, FV = 236 540.30, P/YR = 4' },
            { lab: 'Press', val: 'I/YR' },
            { lab: 'Answer', val: '7.50% per annum compounded quarterly', final: true }
          ],
          why: 'A clean 7.50% is a good sign the question was built from that rate. n = 7 × 4 = 28 — getting the periods wrong is the difference between this and nonsense.'
        },
        {
          id: 'x6q9', type: 'numeric', marks: 6,
          prompt: 'A client invests a half-yearly amount of R7 000.00 into an account for 6 years. The accumulated value in the account at the end of the term is R126 570.40. Calculate the annual interest rate, compounded half-yearly, that the client earned. Round your answer to two decimals.',
          suf: '%', answer: 14.36, tol: 0.05,
          solution: [
            { lab: 'Known', val: 'PMT = −7 000, PV = 0, n = 12, FV = 126 570.40, P/YR = 2' },
            { lab: 'Press', val: 'I/YR' },
            { lab: 'Answer', val: '14.36% per annum compounded half-yearly', final: true }
          ],
          why: 'R84 000 of payments and R42 570 of interest over six years — a high rate, and the answer says so.'
        },
        {
          id: 'x6q10', type: 'numeric', marks: 6,
          prompt: 'A client invests a yearly amount of R11 500.00 into an account for 11 years. The accumulated value in the account at the end of the term is R203 804.35. Calculate the annual interest rate, compounded yearly, that the client earned. Round your answer to two decimals.',
          suf: '%', answer: 9.17, tol: 0.05,
          solution: [
            { lab: 'Known', val: 'PMT = −11 500, PV = 0, n = 11, FV = 203 804.35, P/YR = 1' },
            { lab: 'Press', val: 'I/YR' },
            { lab: 'Answer', val: '9.17% per annum compounded yearly', final: true }
          ],
          why: 'Compounded yearly, so P/YR = 1 and the annual rate IS the periodic rate. The one case where those two numbers are the same, and worth noticing rather than assuming.'
        }
      ]
    },

    {
      id: 'ex6-pmt',
      title: 'Finding the Instalment',
      emoji: '💰',
      summary: 'Questions 11 to 14 — the payment that clears a loan.',
      questions: [
        {
          id: 'x6q11', type: 'numeric', marks: 5,
          prompt: 'A client enters into a loan agreement to borrow R35 000.00 at an annual interest rate of 15.00% compounded monthly. The loan is repayable in 8 equal monthly instalments. Calculate the value of each instalment.',
          pre: 'R', answer: 4624.66, tol: 2,
          solution: [
            { lab: 'Rate per period', val: '15% ÷ 12 = 0.0125, n = 8' },
            { lab: 'The bracket', val: '(1 − (1.0125)⁻⁸) ÷ 0.0125 = 7.568124' },
            { lab: 'Answer', val: 'R35 000 ÷ 7.568124 = R4 624.66', final: true }
          ],
          why: 'The known amount is at the START, so this is the present-value bracket, not the future-value one. 8 × R4 624.66 = R36 997.28, so about R1 997 of interest.'
        },
        {
          id: 'x6q12', type: 'numeric', marks: 5,
          prompt: 'A client enters into a loan agreement to borrow R52 500.00 at an annual interest rate of 9.00% compounded monthly. The loan is repayable in 12 equal monthly payments. Calculate the value of each instalment.',
          pre: 'R', answer: 4591.20, tol: 2,
          solution: [
            { lab: 'Rate per period', val: '9% ÷ 12 = 0.0075, n = 12' },
            { lab: 'The bracket', val: '(1 − (1.0075)⁻¹²) ÷ 0.0075 = 11.434913' },
            { lab: 'Answer', val: 'R52 500 ÷ 11.434913 = R4 591.20', final: true }
          ],
          why: 'The bracket 11.43 against 12 payments says the instalments are worth slightly less than their face value once discounted — which is exactly what interest means.'
        },
        {
          id: 'x6q13', type: 'numeric', marks: 5,
          prompt: 'A client enters into a loan agreement to borrow R60 000.00 at an annual interest rate of 8.50% compounded quarterly. The loan is repayable in 9 equal quarterly payments. Calculate the value of each instalment.',
          pre: 'R', answer: 7394.85, tol: 2,
          solution: [
            { lab: 'Rate per period', val: '8.5% ÷ 4 = 0.02125, n = 9 quarters' },
            { lab: 'The bracket', val: '(1 − (1.02125)⁻⁹) ÷ 0.02125 = 8.113758' },
            { lab: 'Answer', val: 'R60 000 ÷ 8.113758 = R7 394.85', final: true }
          ],
          why: 'The question gives the number of payments directly, so there is no term to convert. When it gives years instead, remember to multiply.'
        },
        {
          id: 'x6q14', type: 'numeric', marks: 5,
          prompt: 'A client enters into a loan agreement to borrow R72 000.00 at an annual interest rate of 13.20% compounded quarterly. The loan is repayable in 14 equal quarterly payments. Calculate the value of each instalment.',
          pre: 'R', answer: 6504.95, tol: 2,
          solution: [
            { lab: 'Rate per period', val: '13.2% ÷ 4 = 0.033, n = 14 quarters' },
            { lab: 'The bracket', val: '(1 − (1.033)⁻¹⁴) ÷ 0.033 = 11.068501' },
            { lab: 'Answer', val: 'R72 000 ÷ 11.068501 = R6 504.95', final: true }
          ],
          why: '14 payments of R6 504.95 is R91 069.30 for a R72 000 loan — R19 069 of interest over three and a half years at 13.2%.'
        }
      ]
    },

    {
      id: 'ex6-term',
      title: 'Finding the Number of Payments',
      emoji: '📅',
      summary: 'Questions 15 to 19 — how long the loan runs.',
      questions: [
        {
          id: 'x6q15', type: 'numeric', marks: 5,
          prompt: 'A client enters into a loan agreement to borrow R250 000.00 at an annual interest rate of 6.70% compounded monthly. The loan is repayable in monthly instalments of R7 685.03. Calculate the number of monthly payments that the client will make.',
          answer: 36, tol: 0.6,
          solution: [
            { lab: 'Known', val: 'PV = 250 000, PMT = −7 685.03, FV = 0, I/YR = 6.7, P/YR = 12' },
            { lab: 'Press', val: 'N' },
            { lab: 'Answer', val: '36 payments — three years', final: true }
          ],
          why: 'FV = 0 matters: the loan is fully repaid by the instalments. Leave a value in FV and the calculator thinks a lump sum is still owing and asks for fewer payments.'
        },
        {
          id: 'x6q16', type: 'numeric', marks: 5,
          prompt: 'A client enters into a loan agreement to borrow R380 000.00 at an annual interest rate of 9.20% compounded monthly. The loan is repayable in monthly instalments of R6 887.48. Calculate the number of monthly payments that the client will make.',
          answer: 72, tol: 0.6,
          solution: [
            { lab: 'Known', val: 'PV = 380 000, PMT = −6 887.48, FV = 0, I/YR = 9.2, P/YR = 12' },
            { lab: 'Press', val: 'N' },
            { lab: 'Answer', val: '72 payments — six years', final: true }
          ],
          why: 'A real n lands on a whole number or a whisker off one. If yours comes out at 43.7, check that the rate went in as the annual one and not the monthly one.'
        },
        {
          id: 'x6q17', type: 'numeric', marks: 5,
          prompt: 'A client enters into a loan agreement to borrow R2 400 000.00 at an annual interest rate of 10.50% compounded monthly. The loan is repayable in monthly instalments of R23 961.12. Calculate the number of monthly payments that the client will make.',
          answer: 240, tol: 1,
          solution: [
            { lab: 'Known', val: 'PV = 2 400 000, PMT = −23 961.12, FV = 0, I/YR = 10.5, P/YR = 12' },
            { lab: 'Press', val: 'N' },
            { lab: 'Answer', val: '240 payments — twenty years', final: true }
          ],
          why: '240 payments of R23 961.12 is R5 750 669 on a R2 400 000 loan. Over twenty years the interest more than doubles what was borrowed.'
        },
        {
          id: 'x6q18', type: 'numeric', marks: 5,
          prompt: 'A client enters into a loan agreement to borrow R120 000.00 at an annual interest rate of 14.50% compounded quarterly. The loan is repayable in quarterly instalments of R22 612.74. Calculate the number of quarterly payments that the client will make.',
          answer: 6, tol: 0.3,
          solution: [
            { lab: 'Known', val: 'PV = 120 000, PMT = −22 612.74, FV = 0, I/YR = 14.5, P/YR = 4' },
            { lab: 'Press', val: 'N' },
            { lab: 'Answer', val: '6 payments — a year and a half', final: true }
          ],
          why: 'The answer is 6 PAYMENTS, which is 1.5 years. The calculator always returns periods; converting to years is yours to do, and only if the question asks.'
        },
        {
          id: 'x6q19', type: 'numeric', marks: 5,
          prompt: 'A client enters into a loan agreement to borrow R230 000.00 at an annual interest rate of 13.10% compounded half-yearly. The loan is repayable in half-yearly instalments of R37 848.58. Calculate the number of half-yearly payments that the client will make.',
          answer: 8, tol: 0.3,
          solution: [
            { lab: 'Rate per period', val: '13.1% ÷ 2 = 6.55%' },
            { lab: 'Known', val: 'PV = 230 000, PMT = −37 848.58, FV = 0, I/YR = 13.1, P/YR = 2' },
            { lab: 'Answer', val: '8 payments — four years', final: true }
          ],
          why: 'Enter 13.1 into I/YR, not 6.55. With P/YR set to 2 the calculator halves it for you; halving it yourself as well would double-count.'
        }
      ]
    },

    {
      id: 'ex6-balance',
      title: 'Outstanding Balances',
      emoji: '⚙️',
      summary: 'Questions 20 to 27 — what is still owed partway through.',
      questions: [
        {
          id: 'x6q20', type: 'steps', marks: 8,
          scenario: 'A client enters into a loan agreement to borrow R180 000.00 at an annual interest rate of 15.00% compounded quarterly. The loan is repayable in 8 equal quarterly payments of R26 459.71.',
          prompt: 'Calculate the outstanding value of the loan after the payment of the first and second instalments.',
          steps: [
            {
              q: 'After the FIRST instalment, to two decimal places.',
              pre: 'R', answer: 160290.29, tol: 3,
              explain: 'i = 15% ÷ 4 = 0.0375, 7 payments left. R26 459.71 × 6.0579 = R160 290.29. The long way agrees: R180 000 × 1.0375 − R26 459.71 = R160 290.29.'
            },
            {
              q: 'After the SECOND instalment, to two decimal places.',
              pre: 'R', answer: 139841.46, tol: 3,
              explain: '6 payments left. R26 459.71 × 5.285072 = R139 841.46.'
            }
          ],
          solution: [
            { lab: 'Rate per period', val: '15% ÷ 4 = 0.0375' },
            { lab: 'After 1 payment', val: '7 left, R26 459.71 × 6.0579 = R160 290.29' },
            { lab: 'After 2 payments', val: '6 left, R26 459.71 × 5.285072 = R139 841.46', final: true }
          ],
          why: 'Count the payments REMAINING, not the ones made. The balance fell R20 448.83 in the second quarter against R19 709.71 in the first — same payment, more capital, because there is less interest to cover first.'
        },
        {
          id: 'x6q21', type: 'steps', marks: 8,
          scenario: 'A client enters into a loan agreement to borrow R200 000.00 at an annual interest rate of 9.50% compounded yearly. The loan is repayable in 4 equal yearly payments of R62 412.60.',
          prompt: 'Calculate the outstanding value of the loan after the payment of the first and second instalments.',
          steps: [
            {
              q: 'After the FIRST instalment, to two decimal places.',
              pre: 'R', answer: 156587.40, tol: 3,
              explain: 'Compounded yearly, so i = 0.095 and 3 payments remain. R62 412.60 × 2.508907 = R156 587.40.'
            },
            {
              q: 'After the SECOND instalment, to two decimal places.',
              pre: 'R', answer: 109050.60, tol: 3,
              explain: '2 payments left. R62 412.60 × 1.747253 = R109 050.60.'
            }
          ],
          solution: [
            { lab: 'Rate per period', val: 'Compounded yearly, so i = 0.095' },
            { lab: 'After 1 payment', val: '3 left, R62 412.60 × 2.508907 = R156 587.40' },
            { lab: 'After 2 payments', val: '2 left, R62 412.60 × 1.747253 = R109 050.60', final: true }
          ],
          why: 'Halfway through the term and more than half the debt is still there — R109 050.60 of R200 000. Early instalments are mostly interest, and that is true of every amortised loan.'
        },
        {
          id: 'x6q22', type: 'steps', marks: 8,
          scenario: 'A client enters into a loan agreement to borrow R12 000.00 at an annual interest rate of 14.00% compounded monthly. The loan is repayable in 6 equal monthly payments of R2 082.46.',
          prompt: 'Calculate the outstanding value of the loan after the payment of the first and second instalments.',
          steps: [
            {
              q: 'After the FIRST instalment, to two decimal places.',
              pre: 'R', answer: 10057.56, tol: 3,
              explain: 'i = 14% ÷ 12 = 0.0116667, 5 payments left. R2 082.46 × 4.829655 = R10 057.56.'
            },
            {
              q: 'After the SECOND instalment, to two decimal places.',
              pre: 'R', answer: 8092.44, tol: 3,
              explain: '4 payments left. R2 082.46 × 3.886001 = R8 092.44.'
            }
          ],
          solution: [
            { lab: 'Rate per period', val: '14% ÷ 12 = 0.0116667' },
            { lab: 'After 1 payment', val: '5 left, R2 082.46 × 4.829655 = R10 057.56' },
            { lab: 'After 2 payments', val: '4 left, R2 082.46 × 3.886001 = R8 092.44', final: true }
          ],
          why: 'The instalment given is rounded to the cent, so the roll-forward route lands about 2c away from the factor route. On a six-month loan that is nothing; on a twenty-year one it matters, which is why AMORT rolls forward.'
        },
        {
          id: 'x6q23', type: 'numeric', marks: 6,
          prompt: 'A client enters into a loan agreement to borrow R150 000.00 at an annual interest rate of 8.5% compounded monthly. The loan is repayable in equal monthly payments over 6 years, payable at the end of each month. Calculate the outstanding value of the loan after 3 years.',
          pre: 'R', answer: 84477.85, tol: 4,
          solution: [
            { lab: 'Rate per period', val: '8.5% ÷ 12 = 0.00708333, n = 72' },
            { lab: 'The instalment', val: 'R150 000 ÷ 46.99422 = R2 666.76' },
            { lab: 'Payments left', val: '72 − 36 = 36' },
            { lab: 'Answer', val: 'R2 666.76 × 31.67723 = R84 477.85', final: true }
          ],
          why: 'Two steps every time: find the instalment from the whole loan, then discount only the payments that are left. Halfway through and R84 477.85 of R150 000 is still owing.'
        },
        {
          id: 'x6q24', type: 'numeric', marks: 6,
          prompt: 'A client enters into a loan agreement to borrow R300 000.00 at an annual interest rate of 9.4% compounded monthly. The loan is repayable in equal monthly payments over 7 years, payable at the end of each month. Calculate the outstanding value of the loan after 5 years.',
          pre: 'R', answer: 106562.16, tol: 5,
          solution: [
            { lab: 'Rate per period', val: '9.4% ÷ 12 = 0.00783333, n = 84' },
            { lab: 'The instalment', val: 'R300 000 over 84 months = R4 887.85' },
            { lab: 'Payments left', val: '84 − 60 = 24' },
            { lab: 'Answer', val: 'R4 887.85 × 21.80 = R106 562.16', final: true }
          ],
          why: 'Skipping the first step — trying to discount the original R300 000 — is the usual reason this comes out wrong. You need the instalment before you can value what is left of it.'
        },
        {
          id: 'x6q25', type: 'numeric', marks: 6,
          prompt: 'A client enters into a loan agreement to borrow R1 500 000.00 at an annual interest rate of 11.5% compounded monthly. The loan is repayable in equal monthly payments over 20 years, payable at the end of each month. Calculate the outstanding value of the loan after 10 years.',
          pre: 'R', answer: 1137764.07, tol: 12,
          solution: [
            { lab: 'Rate per period', val: '11.5% ÷ 12 = 0.00958333, n = 240' },
            { lab: 'The instalment', val: 'R1 500 000 over 240 months = R15 996.44' },
            { lab: 'Payments left', val: '240 − 120 = 120' },
            { lab: 'Answer', val: 'R15 996.44 × 71.12867 = R1 137 764.07', final: true }
          ],
          why: 'Ten years of payments — R1 919 572 of them — and the debt has fallen by R362 236. Not a mistake: at 11.5% almost the whole of an early instalment is interest. The most important thing anyone can know before signing a bond.'
        },
        {
          id: 'x6q26', type: 'numeric', marks: 6,
          prompt: 'A client enters into a loan agreement to borrow R2 000 000.00 at an annual interest rate of 10.5% compounded monthly. The loan is repayable in equal monthly payments over 20 years, payable at the end of each month. Calculate the outstanding value of the loan after 15 years.',
          pre: 'R', answer: 928989.03, tol: 10,
          solution: [
            { lab: 'Rate per period', val: '10.5% ÷ 12 = 0.00875, n = 240' },
            { lab: 'The instalment', val: 'R2 000 000 over 240 months = R19 967.60' },
            { lab: 'Payments left', val: '240 − 180 = 60' },
            { lab: 'Answer', val: 'R928 989.03', final: true }
          ],
          why: 'Three quarters of the way through the term and 46% of the loan is still owing. The last five years clear more capital than the first fifteen did.'
        },
        {
          id: 'x6q27', type: 'numeric', marks: 6,
          prompt: 'A client enters into a loan agreement to borrow R1 200 000.00 at an annual interest rate of 10.5% compounded quarterly. The loan is repayable in equal quarterly payments over 10 years, payable at the end of each quarter. Calculate the outstanding value of the loan after 8 years.',
          pre: 'R', answer: 348153.96, tol: 6,
          solution: [
            { lab: 'Rate per period', val: '10.5% ÷ 4 = 0.02625' },
            { lab: 'Periods', val: '10 × 4 = 40 quarters' },
            { lab: 'The instalment', val: 'R1 200 000 over 40 quarters = R48 815.25' },
            { lab: 'Payments left', val: '40 − 32 = 8 quarters' },
            { lab: 'Answer', val: 'R48 815.25 × 7.13210 = R348 153.96', final: true }
          ],
          why: 'Quarterly, so everything counts in quarters: 40 periods and 8 left, not 10 and 2. Getting that conversion right is most of the work here.'
        }
      ]
    },

    {
      id: 'ex6-change',
      title: 'Rate Changes and Payments in Advance',
      emoji: '📉',
      summary: 'Questions 28 to 35 — a rate that moves, and instalments paid at the start.',
      questions: [
        {
          id: 'x6q28', type: 'numeric', marks: 8,
          prompt: 'A client enters into a loan agreement to borrow R500 000.00 at an annual interest rate of 11.5% compounded monthly. The loan is repayable in equal payments over 5 years, payable at the end of each month. If the interest rate changes to 11.0% after 2 years, calculate the new monthly payments for the remaining period.',
          pre: 'R', answer: 10917.18, tol: 4,
          solution: [
            { lab: 'Original instalment', val: 'R500 000 over 60 months at 11.5% = R10 996.30' },
            { lab: 'Balance after 24', val: '36 payments left, R333 463.78' },
            { lab: 'New instalment', val: 'R333 463.78 over 36 months at 11.0%' },
            { lab: 'Answer', val: 'R10 917.18', final: true }
          ],
          why: 'The rate FELL here, so the instalment falls too — by R79.12 a month. Everything works the same way in both directions; only the sign of the news changes.'
        },
        {
          id: 'x6q29', type: 'numeric', marks: 8,
          prompt: 'A client enters into a loan agreement to borrow R250 000.00 at an annual interest rate of 9.0% compounded monthly. The loan is repayable in equal payments over 6 years, payable at the end of each month. If the interest rate changes to 10.5% after 4 years, calculate the new monthly payments for the remaining period.',
          pre: 'R', answer: 4574.57, tol: 3,
          solution: [
            { lab: 'Original instalment', val: 'R250 000 over 72 months at 9.0% = R4 506.38' },
            { lab: 'Balance after 48', val: '24 payments left, R98 640.90' },
            { lab: 'New instalment', val: 'R98 640.90 over 24 months at 10.5%' },
            { lab: 'Answer', val: 'R4 574.57', final: true }
          ],
          why: 'Clear the calculator between the two steps. If the old PMT of R4 506.38 is still in the register when you solve the second, it is treated as part of the new loan and the answer is wrong.'
        },
        {
          id: 'x6q30', type: 'numeric', marks: 8,
          prompt: 'A client enters into a loan agreement to borrow R1 200 000.00 at an annual interest rate of 12.0% compounded monthly. The loan is repayable in equal payments over 10 years, payable at the end of each month. If the interest rate changes to 9.0% after 6 years, calculate the new monthly payments for the remaining period.',
          pre: 'R', answer: 16269.32, tol: 6,
          solution: [
            { lab: 'Original instalment', val: 'R1 200 000 over 120 months at 12% = R17 216.51' },
            { lab: 'Balance after 72', val: '48 payments left, R653 779.20' },
            { lab: 'New instalment', val: 'R653 779.20 over 48 months at 9.0%' },
            { lab: 'Answer', val: 'R16 269.32', final: true }
          ],
          why: 'A three-point drop and the instalment falls only R947.19 — about 5.5%. Late in a loan most of each payment is capital, and no interest rate can discount capital.'
        },
        {
          id: 'x6q31', type: 'numeric', marks: 8,
          prompt: 'A client enters into a loan agreement to borrow R1 600 000.00 at an annual interest rate of 12.0% compounded monthly. The loan is repayable in equal payments over 20 years, payable at the end of each month. If the interest rate changes to 8.0% after 5 years, calculate the new monthly payments for the remaining period.',
          pre: 'R', answer: 14028.11, tol: 8,
          solution: [
            { lab: 'Original instalment', val: 'R1 600 000 over 240 months at 12% = R17 617.38' },
            { lab: 'Balance after 60', val: '180 payments left, R1 467 909.26' },
            { lab: 'New instalment', val: 'R1 467 909.26 over 180 months at 8.0%' },
            { lab: 'Answer', val: 'R14 028.11', final: true }
          ],
          why: 'Five years of paying R17 617.38 a month — over a million Rand — and the debt has fallen by R132 091. Early in a long loan at a high rate, the capital barely moves.'
        },
        {
          id: 'x6q32', type: 'numeric', marks: 6,
          prompt: 'A client enters into a loan agreement to borrow R1 000 000.00 at an annual interest rate of 8.0% compounded monthly. The loan is repayable in equal payments over 5 years, payable at the beginning of each month. The first instalment is payable immediately. Calculate the value of each instalment.',
          pre: 'R', answer: 20142.11, tol: 4,
          solution: [
            { lab: 'Rate per period', val: '8% ÷ 12 = 0.00666667, n = 60' },
            { lab: 'Paid at the end it would be', val: 'R1 000 000 over 60 months = R20 276.39' },
            { lab: 'Answer', val: 'R20 276.39 ÷ 1.00666667 = R20 142.11', final: true }
          ],
          why: '"The first instalment is payable immediately" is the phrase that makes this an annuity due. Look for it — it is the only thing separating this from an ordinary question.'
        },
        {
          id: 'x6q33', type: 'numeric', marks: 6,
          prompt: 'A client enters into a loan agreement to borrow R400 000.00 at an annual interest rate of 9.0% compounded monthly. The loan is repayable in equal payments over 3 years, payable at the beginning of each month. The first instalment is payable immediately. Calculate the value of each instalment.',
          pre: 'R', answer: 12625.20, tol: 3,
          solution: [
            { lab: 'Rate per period', val: '9% ÷ 12 = 0.0075, n = 36' },
            { lab: 'Paid at the end it would be', val: 'R400 000 over 36 months = R12 719.89' },
            { lab: 'Answer', val: 'R12 719.89 ÷ 1.0075 = R12 625.20', final: true }
          ],
          why: 'R94.69 a month, purely from paying on the 1st rather than the 31st. Over 36 months that is R3 408.84 for a change that costs nothing.'
        },
        {
          id: 'x6q34', type: 'numeric', marks: 6,
          prompt: 'A client enters into a loan agreement to borrow R350 000.00 at an annual interest rate of 11.0% compounded monthly. The loan is repayable in equal payments over 6 years, payable at the beginning of each month. The first instalment is payable immediately. Calculate the value of each instalment.',
          pre: 'R', answer: 6601.41, tol: 3,
          solution: [
            { lab: 'Rate per period', val: '11% ÷ 12 = 0.00916667, n = 72' },
            { lab: 'Paid at the end it would be', val: 'R350 000 over 72 months = R6 661.93' },
            { lab: 'Answer', val: 'R6 661.93 ÷ 1.00916667 = R6 601.41', final: true }
          ],
          why: 'The higher the rate, the more a period of timing is worth: 11% saves 0.91% of the instalment where 8% saved 0.66%.'
        },
        {
          id: 'x6q35', type: 'numeric', marks: 6,
          prompt: 'A client enters into a loan agreement to borrow R140 000.00 at an annual interest rate of 8.0% compounded monthly. The loan is repayable in equal payments over 3 years, payable at the beginning of each month. The first instalment is payable immediately. Calculate the value of each instalment.',
          pre: 'R', answer: 4358.04, tol: 3,
          solution: [
            { lab: 'Rate per period', val: '8% ÷ 12 = 0.00666667, n = 36' },
            { lab: 'Paid at the end it would be', val: 'R140 000 over 36 months = R4 387.09' },
            { lab: 'Answer', val: 'R4 387.09 ÷ 1.00666667 = R4 358.04', final: true }
          ],
          why: 'On the calculator this is BEG mode rather than END. It stays where you left it, so check the mode before trusting the next answer too.'
        }
      ]
    },

    {
      id: 'ex6-extras',
      title: 'Deposits and Balloon Payments',
      emoji: '🎈',
      summary: 'Questions 36 to 43 — money paid at the start, and money left to the end.',
      questions: [
        {
          id: 'x6q36', type: 'numeric', marks: 6,
          prompt: 'A client enters into a finance agreement to purchase an item with a cost price of R400 000.00. The client can pay a deposit of R50 000.00 and needs to finance the remainder at an annual interest rate of 10.0% compounded monthly. The loan is repayable in equal payments over 5 years, payable at the end of each month. Calculate the value of each instalment.',
          pre: 'R', answer: 7436.47, tol: 3,
          solution: [
            { lab: 'Financed', val: 'R400 000 − R50 000 = R350 000' },
            { lab: 'Rate and periods', val: '10% ÷ 12 = 0.008333, n = 60' },
            { lab: 'Answer', val: 'R350 000 ÷ 47.06537 = R7 436.47', final: true }
          ],
          why: 'The deposit is paid on day one, so it is never borrowed. Using the full R400 000 inflates every instalment by about 14%.'
        },
        {
          id: 'x6q37', type: 'numeric', marks: 6,
          prompt: 'A client enters into a finance agreement to purchase an item with a cost price of R250 000.00. The client can pay a deposit of R25 000.00 and needs to finance the remainder at an annual interest rate of 8.0% compounded monthly. The loan is repayable in equal payments over 4 years, payable at the end of each month. Calculate the value of each instalment.',
          pre: 'R', answer: 5492.91, tol: 3,
          solution: [
            { lab: 'Financed', val: 'R250 000 − R25 000 = R225 000' },
            { lab: 'Rate and periods', val: '8% ÷ 12 = 0.00666667, n = 48' },
            { lab: 'Answer', val: 'R225 000 ÷ 40.96191 = R5 492.91', final: true }
          ],
          why: 'A 10% deposit cut the instalment by about 10% too. Over a short term at a modest rate the two move almost together — over twenty years they do not.'
        },
        {
          id: 'x6q38', type: 'numeric', marks: 6,
          prompt: 'A client enters into a finance agreement to purchase an item with a cost price of R1 500 000.00. The client can pay a deposit of R200 000.00 and needs to finance the remainder at an annual interest rate of 9.0% compounded monthly. The loan is repayable in equal payments over 20 years, payable at the end of each month. Calculate the value of each instalment.',
          pre: 'R', answer: 11696.44, tol: 5,
          solution: [
            { lab: 'Financed', val: 'R1 500 000 − R200 000 = R1 300 000' },
            { lab: 'Rate and periods', val: '9% ÷ 12 = 0.0075, n = 240' },
            { lab: 'Answer', val: 'R1 300 000 ÷ 111.14495 = R11 696.44', final: true }
          ],
          why: '240 instalments of R11 696.44 is R2 807 145, plus the deposit, for a R1 500 000 item. Over twenty years the interest costs almost as much as the thing itself.'
        },
        {
          id: 'x6q39', type: 'numeric', marks: 6,
          prompt: 'A client enters into a finance agreement to purchase an item with a cost price of R2 000 000.00. The client can pay a deposit of R250 000.00 and needs to finance the remainder at an annual interest rate of 10.5% compounded monthly. The loan is repayable in equal payments over 20 years, payable at the end of each month. Calculate the value of each instalment.',
          pre: 'R', answer: 17471.65, tol: 6,
          solution: [
            { lab: 'Financed', val: 'R2 000 000 − R250 000 = R1 750 000' },
            { lab: 'Rate and periods', val: '10.5% ÷ 12 = 0.00875, n = 240' },
            { lab: 'Answer', val: 'R17 471.65', final: true }
          ],
          why: 'A 12.5% deposit on a twenty-year loan. Reasonability: R17 471.65 × 240 is R4 193 196 plus the deposit, which is what a fifth of a percentage point extra over two decades does.'
        },
        {
          id: 'x6q40', type: 'numeric', marks: 7,
          prompt: 'A client enters into an agreement to finance the purchase of equipment with a cost price of R400 000.00 at an annual interest rate of 8.0% compounded monthly. The loan is repayable in equal payments over 5 years, payable at the end of each month, and a final settlement of R50 000.00. Calculate the value of each instalment.',
          pre: 'R', answer: 7430.07, tol: 3,
          solution: [
            { lab: 'Rate and periods', val: '8% ÷ 12 = 0.00666667, n = 60' },
            { lab: 'Balloon discounted back', val: 'R50 000 ÷ (1.00666667)⁶⁰ = R33 560.52' },
            { lab: 'Covered by instalments', val: 'R400 000 − R33 560.52 = R366 439.48' },
            { lab: 'Answer', val: 'R366 439.48 ÷ 49.31843 = R7 430.07', final: true }
          ],
          why: 'The final settlement is a balloon: it goes in FV, not off the price. Check it by rolling the loan forward 60 months at R7 430.07 — the balance left is exactly R50 000.'
        },
        {
          id: 'x6q41', type: 'numeric', marks: 7,
          prompt: 'A client enters into an agreement to finance the purchase of equipment with a cost price of R350 000.00 at an annual interest rate of 8.0% compounded monthly. The loan is repayable in equal payments over 5 years, payable at the end of each month, and a final settlement of R25 000.00. Calculate the value of each instalment.',
          pre: 'R', answer: 6756.49, tol: 3,
          solution: [
            { lab: 'Rate and periods', val: '0.00666667, n = 60' },
            { lab: 'Balloon discounted back', val: 'R25 000 ÷ (1.00666667)⁶⁰ = R16 780.26' },
            { lab: 'Covered by instalments', val: 'R350 000 − R16 780.26 = R333 219.74' },
            { lab: 'Answer', val: 'R333 219.74 ÷ 49.31843 = R6 756.49', final: true }
          ],
          why: 'Half the balloon of the last question on a smaller loan, so a smaller saving. A balloon is worth exactly what it is worth TODAY — R16 780.26 — and nothing more.'
        },
        {
          id: 'x6q42', type: 'numeric', marks: 7,
          prompt: 'A client enters into an agreement to finance the purchase of equipment with a cost price of R600 000.00 at an annual interest rate of 13.0% compounded monthly. The loan is repayable in equal payments over 5 years, payable at the end of each month, and a final settlement of R200 000.00. Calculate the value of each instalment.',
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
          id: 'x6q43', type: 'numeric', marks: 7,
          prompt: 'A client enters into an agreement to finance the purchase of equipment with a cost price of R1 200 000.00 at an annual interest rate of 9.5% compounded monthly. The loan is repayable in equal payments over 5 years, payable at the end of each month, and a final settlement of R500 000.00. Calculate the value of each instalment.',
          pre: 'R', answer: 18659.64, tol: 6,
          solution: [
            { lab: 'Rate and periods', val: '9.5% ÷ 12 = 0.00791667, n = 60' },
            { lab: 'Balloon discounted back', val: 'R500 000 ÷ (1.00791667)⁶⁰ = R311 524.64' },
            { lab: 'Covered by instalments', val: 'R1 200 000 − R311 524.64 = R888 475.36' },
            { lab: 'Answer', val: 'R888 475.36 ÷ 47.61553 = R18 659.64', final: true }
          ],
          why: 'The balloon is R500 000 of a R1 200 000 machine — and in five years it still has to be found. That is the risk the low instalment is hiding.'
        }
      ]
    }

  ]
});
