/* Abi's Study Buddy — Exam Questions bank, Week 4.

   Modelled on the Milpark "Additional exercises: Week 4" practice paper.

   IMPORTANT: Milpark had not released a solution sheet for this paper when it was built,
   so every answer here was derived from scratch rather than checked against a memo. Each
   one is round-trip verified in tests/papers.js — the rate or term we solve for is fed
   back into the original formula and must reproduce the figure the question gives.
   Worth re-checking against the official solutions when they appear.

   Topics mirror the paper's question families:
     Q1–Q2   simple interest future value       -> ex4-simplefv
     Q3–Q4   solving for the simple rate        -> ex4-simplerate
     Q5–Q6   compound interest future value     -> ex4-compoundfv
     Q7–Q8   solving for the annual compound rate -> ex4-compoundrate
     Q9–Q11  effective periodic rate from a quoted rate -> ex4-effective
     Q12–Q14 effective periodic rate from growth -> ex4-periodicgrowth
     Q15–Q17 solving for the number of years    -> ex4-term                                */

window.EXAM_DATA = window.EXAM_DATA || [];

window.EXAM_DATA.push({
  id: 'exam-week4',
  weekId: 'week4',
  number: 4,
  title: 'Week 4 Exam Questions',
  emoji: '📝',
  accent: 4,
  blurb: 'Exam-style questions on simple interest, compound interest, effective rates and terms.',
  topics: [
    {
      id: 'ex4-simplefv',
      title: 'Simple Interest Future Value',
      emoji: '➕',
      summary: 'What an investment grows to under simple interest, like Questions 1–2.',
      questions: []
    },
    {
      id: 'ex4-simplerate',
      title: 'Solving for the Simple Rate',
      emoji: '🔍',
      summary: 'Work backwards from the growth to the simple interest rate, like Questions 3–4.',
      questions: []
    },
    {
      id: 'ex4-compoundfv',
      title: 'Compound Interest Future Value',
      emoji: '📈',
      summary: 'What an investment grows to under compound interest, like Questions 5–6.',
      questions: []
    },
    {
      id: 'ex4-compoundrate',
      title: 'Solving for the Compound Rate',
      emoji: '🧮',
      summary: 'Work backwards from the growth to the annual compound rate, like Questions 7–8.',
      questions: []
    },
    {
      id: 'ex4-effective',
      title: 'Effective Periodic Rate',
      emoji: '🔄',
      summary: 'Convert a quoted nominal rate into the rate actually applied each period, like Questions 9–11.',
      questions: []
    },
    {
      id: 'ex4-periodicgrowth',
      title: 'Periodic Rate from Growth',
      emoji: '⏱️',
      summary: 'Find the effective periodic rate from how much an investment actually grew, like Questions 12–14.',
      questions: []
    },
    {
      id: 'ex4-term',
      title: 'Solving for the Number of Years',
      emoji: '📆',
      summary: 'How long an investment takes to reach a target value, like Questions 15–17.',
      questions: []
    }
  ]
});
