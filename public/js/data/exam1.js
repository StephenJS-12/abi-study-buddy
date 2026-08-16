/* Abi's Study Buddy — Exam Questions bank, Week 1.

   These are modelled on the Milpark "Additional exercises: Week 1" practice paper and
   its guideline answers. They are deliberately SEPARATE from the practise/test bank:
   nothing here appears in the other modes, and nothing from the other modes appears here.

   The six topics mirror the six question families in the real paper:
     Q1–Q3   adding mixed numbers          -> ex1-mixedadd
     Q4–Q6   dividing with mixed numbers   -> ex1-mixeddiv
     Q7–Q9   approximating decimal products-> ex1-approxmul
     Q10–Q12 approximating decimal quotients-> ex1-approxdiv
     Q13–Q15 growth/decline over n years   -> ex1-growth
     Q16–Q18 business equations            -> ex1-equations

   Every question is generated (see js/examgen.js), so the paper is never the same twice. */

window.EXAM_DATA = window.EXAM_DATA || [];

window.EXAM_DATA.push({
  id: 'exam-week1',
  weekId: 'week1',
  number: 1,
  title: 'Week 1 Exam Questions',
  emoji: '📝',
  accent: 1,
  blurb: 'Exam-style questions on fractions, decimals, approximation and business equations.',
  topics: [
    {
      id: 'ex1-mixedadd',
      title: 'Adding Mixed Numbers',
      emoji: '🛢️',
      summary: 'Totalling quantities written as mixed numbers, like Questions 1–3.',
      questions: []
    },
    {
      id: 'ex1-mixeddiv',
      title: 'Dividing with Mixed Numbers',
      emoji: '💧',
      summary: 'How many times something fits into something else, like Questions 4–6.',
      questions: []
    },
    {
      id: 'ex1-approxmul',
      title: 'Approximating Products',
      emoji: '✖️',
      summary: 'Closest approximation of a decimal multiplication, like Questions 7–9.',
      questions: []
    },
    {
      id: 'ex1-approxdiv',
      title: 'Approximating Quotients',
      emoji: '➗',
      summary: 'Closest approximation of a decimal division, like Questions 10–12.',
      questions: []
    },
    {
      id: 'ex1-growth',
      title: 'Growth & Decline Over Years',
      emoji: '📈',
      summary: 'Cost or capacity after n years, relative to today, like Questions 13–15.',
      questions: []
    },
    {
      id: 'ex1-equations',
      title: 'Business Equations',
      emoji: '🧾',
      summary: 'Define the variables, build the equation, solve it — like Questions 16–18.',
      questions: []
    }
  ]
});
