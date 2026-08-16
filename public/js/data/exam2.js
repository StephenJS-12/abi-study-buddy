/* Abi's Study Buddy — Exam Questions bank, Week 2.

   Modelled on the Milpark "Additional exercises: Week 2" practice paper and its guideline
   answers. Separate from the practise/test bank, like all exam content.

   The five topics mirror the paper's question families:
     Q1–Q3   percentage change read off a table  -> ex2-pctchange
     Q4–Q6   applying and reversing a percentage -> ex2-applypct
     Q7–Q9   proportional allocation             -> ex2-allocate
     Q10–Q12 bulk and settlement discounts       -> ex2-discounts
     Q13–Q16 gross profit margins                -> ex2-margins

   NOTE ON THE MEMO: the guideline answer to Question 12 applies a 4% bulk discount to an
   order of 2 000 units, but the table in that question puts "1 001 and more" at 6%. The
   memo used the wrong bracket. These generators read the bracket correctly.              */

window.EXAM_DATA = window.EXAM_DATA || [];

window.EXAM_DATA.push({
  id: 'exam-week2',
  weekId: 'week2',
  number: 2,
  title: 'Week 2 Exam Questions',
  emoji: '📝',
  accent: 2,
  blurb: 'Exam-style questions on percentage change, allocation, discounts and margins.',
  topics: [
    {
      id: 'ex2-pctchange',
      title: 'Percentage Change from a Table',
      emoji: '📉',
      summary: 'Pick the right two figures out of a table and calculate the change, like Questions 1–3.',
      questions: []
    },
    {
      id: 'ex2-applypct',
      title: 'Applying & Reversing a Percentage',
      emoji: '📊',
      summary: 'Increase a figure by a percentage, or work back to what it was before, like Questions 4–6.',
      questions: []
    },
    {
      id: 'ex2-allocate',
      title: 'Proportional Allocation',
      emoji: '⚖️',
      summary: 'Split a pool of money in proportion to salaries, distance or hours, like Questions 7–9.',
      questions: []
    },
    {
      id: 'ex2-discounts',
      title: 'Bulk & Settlement Discounts',
      emoji: '🏷️',
      summary: 'Read the discount bracket, then apply the early-payment discount, like Questions 10–12.',
      questions: []
    },
    {
      id: 'ex2-margins',
      title: 'Gross Profit Margins',
      emoji: '💰',
      summary: 'Margins on cost and on selling price, and working backwards from either, like Questions 13–16.',
      questions: []
    }
  ]
});
