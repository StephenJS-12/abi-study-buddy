/* Abi's Study Buddy — Exam Questions bank, Week 3.

   Modelled on the Milpark "Week 3 Practice questions" paper and its solutions.

   Topics mirror the paper's question families:
     Q1      grouped frequency estimates      -> ex3-grouped
     Q2, Q3  full summary of a dataset        -> ex3-summary
     Q4      probability from a frequency table -> ex3-freqprob
     Q5      probability from a two-way table -> ex3-contingency
     Q6, Q8  probability problems             -> ex3-problems
     Q7      types of events and their rules  -> ex3-theory

   ERRORS IN THAT MEMO (we use the corrected values):
     Q6(a) gives 5/6 for two red marbles from 6 red / 5 blue / 2 green without
           replacement. It is 6/13 x 5/12 = 5/26. (5/6 is the answer to Q6 e(ii).)
     Q1.3  gives a median of ~145. Cumulative frequency is 5, 11, 13, 17, 25, 30, so the
           15th value falls in the 150-200 class and interpolation gives 175.
     Q5.4  is left uncertain as "48/280 (48/78?)". The question asks for a professional
           user WHO PREFERS Canon - a joint probability - so 48/280 = 6/35.
     Q3.9  substitutes 8.33 for the mean 11.833 in several terms and labels a standard
           deviation formula "Variance". Its final answer of 7.358 is nonetheless correct.
     Q2    reports variance as 3.61 by squaring the rounded SD of 1.90. It is 3.60.        */

window.EXAM_DATA = window.EXAM_DATA || [];

window.EXAM_DATA.push({
  id: 'exam-week3',
  weekId: 'week3',
  number: 3,
  title: 'Week 3 Exam Questions',
  emoji: '📝',
  accent: 3,
  blurb: 'Exam-style questions on averages, spread and probability.',
  topics: [
    {
      id: 'ex3-grouped',
      title: 'Grouped Frequency Estimates',
      emoji: '📊',
      summary: 'Estimate the mean, mode and median from a class-interval table, like Question 1.',
      questions: []
    },
    {
      id: 'ex3-summary',
      title: 'Summarising a Dataset',
      emoji: '📋',
      summary: 'Mean, median, mode, quartiles, IQR, range, percentiles and spread, like Questions 2 and 3.',
      questions: []
    },
    {
      id: 'ex3-freqprob',
      title: 'Probability from a Frequency Table',
      emoji: '🎯',
      summary: 'Read a category table and work out the chances, like Question 4.',
      questions: []
    },
    {
      id: 'ex3-contingency',
      title: 'Probability from a Two-Way Table',
      emoji: '🔀',
      summary: 'Joint, marginal and conditional probabilities off a cross-tabulation, like Question 5.',
      questions: []
    },
    {
      id: 'ex3-problems',
      title: 'Probability Problems',
      emoji: '🎲',
      summary: 'Marbles, dice, cards and conditional probability, like Questions 6 and 8.',
      questions: []
    },
    {
      id: 'ex3-theory',
      title: 'Types of Events',
      emoji: '📚',
      summary: 'Which rule applies to which kind of event, like Question 7.',
      questions: []
    }
  ]
});
