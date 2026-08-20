/* Week 1 — Basic mathematical elements in business
   Lesson 1: Basic mathematical rules and notation of fractions.
   Built from the recovered Week 1 slides (Downloads\Claude notes\Week1-pages).
   Every question value was chosen to differ from the lecturer's worked examples,
   and every answer was recomputed independently. */

window.WEEK_DATA = window.WEEK_DATA || [];

window.WEEK_DATA.push({
  id: 'week1',
  number: 1,
  title: 'Basic Maths in Business',
  emoji: '🧮',
  accent: 1,
  blurb: 'Fractions, mixed numbers, and the four operations that go with them.',
  topics: [

  /* ═══════════════════════ WHAT A FRACTION IS ═══════════════════════ */
  {
    id: 'w1-basics',
    title: 'Fractions & Mixed Numbers',
    emoji: '🍫',
    summary: 'Reading a fraction, and telling proper, improper and mixed numbers apart.',
    notes: [
      {
        heading: 'The energy bar idea',
        emoji: '💡',
        html:
          '<p>You are out testing a demo e-bike and realise you forgot a snack. A friend offers to share her ' +
          'energy bar, and you say you only need <i>a fraction</i> of it. But how much is that? It could be almost ' +
          'the whole bar, or a tiny piece.</p>' +
          '<p>Fractions exist to say <b>exactly</b> which portion of a whole you mean.</p>' +
          '<div class="keybox"><b>When a whole is divided into equal parts</b><br>' +
          'the <b>top</b> number counts how many parts you are referring to — the <b>numerator</b><br>' +
          'the <b>bottom</b> number is the total number of equal parts — the <b>denominator</b></div>' +
          '<p>So <span class="frac"><span>1</span><span>8</span></span> is read "one-eighth": the whole was cut ' +
          'into 8 equal parts and you are referring to 1 of them. ' +
          '<span class="frac"><span>4</span><span>8</span></span> is "four-eighths" — 4 of those same 8 parts.</p>'
      },
      {
        heading: 'Fractions turn up constantly in business',
        emoji: '💼',
        html:
          '<p>Say you approve leave for your team, and company policy gives each employee 15 leave days a year. ' +
          'An employee who has only worked <b>four months</b> has not earned the full year\'s leave.</p>' +
          '<p>The 15 days accumulate over 12 months, so after 4 months they are entitled to ' +
          '<span class="frac"><span>4</span><span>12</span></span> of the 15 days.</p>' +
          '<div class="math-block"><span class="frac"><span>4</span><span>12</span></span> × 15 = 5 leave days</div>' +
          '<p>Without fractions you could not work that out fairly.</p>'
      },
      {
        heading: 'Proper, improper and mixed',
        emoji: '🔢',
        html:
          '<ul class="tickly">' +
          '<li><b>Proper fraction</b> — the numerator is <b>smaller</b> than the denominator, e.g. ' +
          '<span class="frac"><span>4</span><span>8</span></span>. It is less than one whole.</li>' +
          '<li><b>Improper fraction</b> — the numerator is <b>larger</b> than the denominator, e.g. ' +
          '<span class="frac"><span>11</span><span>8</span></span>. You are referring to <i>more than one whole</i>.</li>' +
          '<li><b>Mixed number</b> — a whole number written alongside a proper fraction, e.g. 1<span class="frac"><span>3</span><span>8</span></span>.</li>' +
          '</ul>' +
          '<p><span class="frac"><span>11</span><span>8</span></span> and 1<span class="frac"><span>3</span><span>8</span></span> ' +
          'are the same quantity written two ways — one full bar of 8 parts, plus 3 more parts.</p>' +
          '<div class="worked"><div class="worked-title">Converting a mixed number to an improper fraction</div>' +
          '<div class="solstep"><div class="solstep-lab">Start</div>' +
          '<div class="solstep-val">1<span class="frac"><span>3</span><span>8</span></span></div></div>' +
          '<div class="solstep"><div class="solstep-lab">Write the whole number with the same denominator</div>' +
          '<div class="solstep-val">1 = <span class="frac"><span>8</span><span>8</span></span></div></div>' +
          '<div class="solstep"><div class="solstep-lab">Add the numerators</div>' +
          '<div class="solstep-val"><span class="frac"><span>8</span><span>8</span></span> + ' +
          '<span class="frac"><span>3</span><span>8</span></span> = ' +
          '<span class="frac"><span>8 + 3</span><span>8</span></span></div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Improper fraction</div>' +
          '<div class="solstep-val"><span class="frac"><span>11</span><span>8</span></span></div></div></div>' +
          '<div class="watchout"><b>Watch out</b> — the denominator never changes when you do this. Only the ' +
          'numerator grows.</div>'
      }
    ],
    questions: [
      {
        id: 'w1b1', type: 'mcq', marks: 1,
        prompt: 'In the fraction <span class="frac"><span>5</span><span>9</span></span>, which number is the <b>denominator</b>?',
        options: ['9', '5', 'Both 5 and 9', 'Neither'],
        answer: 0,
        solution: [
          { lab: 'Denominator', val: 'The bottom number — the total number of equal parts' },
          { lab: 'Numerator', val: 'The top number — how many parts we refer to' },
          { lab: 'Answer', val: '9', final: true }
        ],
        why: 'The whole was divided into 9 equal parts, and we are referring to 5 of them. The total always sits underneath.'
      },
      {
        id: 'w1b2', type: 'mcq', marks: 2,
        prompt: 'Which of the following is an <b>improper</b> fraction?',
        options: [
          '<span class="frac"><span>7</span><span>5</span></span>',
          '<span class="frac"><span>3</span><span>7</span></span>',
          '<span class="frac"><span>2</span><span>9</span></span>',
          '<span class="frac"><span>4</span><span>11</span></span>'
        ],
        answer: 0,
        solution: [
          { lab: 'Improper fraction', val: 'Numerator larger than the denominator' },
          { lab: 'Check each', val: '7 > 5 ✓, but 3 < 7, 2 < 9 and 4 < 11' },
          { lab: 'Answer', val: '7/5', final: true }
        ],
        why: '7/5 refers to more than one whole — five fifths make one whole, and there are two fifths left over.'
      },
      {
        id: 'w1b3', type: 'steps', marks: 4,
        prompt: 'Convert the mixed number 2<span class="frac"><span>3</span><span>5</span></span> into an improper fraction.',
        steps: [
          {
            q: 'First write the whole number 2 as a fraction with a denominator of 5. What is its numerator?',
            answer: 10, tol: 0.01,
            explain: 'One whole is 5/5, so two wholes are 10/5. The numerator is 10.'
          },
          {
            q: 'Now add the numerators together. What is the numerator of the improper fraction?',
            answer: 13, tol: 0.01,
            explain: '10/5 + 3/5 = 13/5. Add only the numerators — the denominator stays 5.'
          }
        ],
        solution: [
          { lab: 'Whole number as a fraction', val: '2 = 10/5' },
          { lab: 'Add the numerators', val: '10/5 + 3/5 = (10 + 3)/5' },
          { lab: 'Answer', val: '13/5', final: true }
        ],
        why: 'Every whole contains 5 fifths, so 2 wholes contain 10. Adding the extra 3 fifths gives 13 fifths in total.'
      },
      {
        id: 'w1b4', type: 'numeric', marks: 3,
        scenario: 'Company policy entitles each employee to 24 leave days per year, accumulated evenly over the 12 months.',
        prompt: 'An employee has worked 9 of the 12 months. How many leave days are they entitled to?',
        suf: 'days', answer: 18, tol: 0.05,
        solution: [
          { lab: 'Portion of the year worked', val: '9/12' },
          { lab: 'Apply it to the full entitlement', val: '9/12 × 24' },
          { lab: 'Simplify first', val: '9/12 = 3/4, and 3/4 × 24 = 18' },
          { lab: 'Answer', val: '18 days', final: true }
        ],
        why: 'Simplifying 9/12 to 3/4 before multiplying keeps the numbers small. Three quarters of 24 is 18.'
      },
      {
        id: 'w1b5', type: 'mcq', marks: 1,
        prompt: 'The fraction <span class="frac"><span>5</span><span>5</span></span> is equal to:',
        options: ['1', '5', '0', '<span class="frac"><span>1</span><span>5</span></span>'],
        answer: 0,
        solution: [
          { lab: 'The whole', val: 'Was divided into 5 equal parts' },
          { lab: 'We are referring to', val: 'All 5 of them' },
          { lab: 'Answer', val: 'That is one whole, so 1', final: true }
        ],
        why: 'Any fraction whose numerator equals its denominator is exactly one whole. This is the fact that makes mixed-number conversion work.'
      }
    ]
  },

  /* ═══════════════════════ SIMPLIFYING ═══════════════════════ */
  {
    id: 'w1-simplify',
    title: 'Equivalent & Simplified Fractions',
    emoji: '✂️',
    summary: 'Different-looking fractions that are worth exactly the same.',
    notes: [
      {
        heading: 'Two fractions, one quantity',
        emoji: '⚖️',
        html:
          '<p>Draw <span class="frac"><span>4</span><span>8</span></span> and ' +
          '<span class="frac"><span>1</span><span>2</span></span> as shaded bars of the same size, and the shaded ' +
          'areas are identical. These are <b>equivalent fractions</b> — the same portion written differently.</p>' +
          '<p><span class="frac"><span>4</span><span>8</span></span> is in <b>higher terms</b>, and ' +
          '<span class="frac"><span>1</span><span>2</span></span> is in <b>lower terms</b>. ' +
          '<span class="frac"><span>1</span><span>2</span></span> is in the <b>lowest possible terms</b>, because ' +
          'the denominator 2 cannot be reduced any further.</p>'
      },
      {
        heading: 'How to simplify',
        emoji: '🪄',
        html:
          '<div class="keybox"><b>The rule</b><br>Divide the numerator <b>and</b> the denominator by the ' +
          '<b>same number</b>. The value does not change — only the way it is written.</div>' +
          '<div class="worked"><div class="worked-title">Worked example — simplifying <span class="frac"><span>4</span><span>8</span></span></div>' +
          '<div class="solstep"><div class="solstep-lab">Divide both by 2</div>' +
          '<div class="solstep-val"><span class="frac"><span>4 ÷ 2</span><span>8 ÷ 2</span></span> = ' +
          '<span class="frac"><span>2</span><span>4</span></span></div></div>' +
          '<div class="solstep"><div class="solstep-lab">Divide both by 2 again</div>' +
          '<div class="solstep-val"><span class="frac"><span>2 ÷ 2</span><span>4 ÷ 2</span></span> = ' +
          '<span class="frac"><span>1</span><span>2</span></span></div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Or do it in one step, dividing both by 4</div>' +
          '<div class="solstep-val"><span class="frac"><span>4 ÷ 4</span><span>8 ÷ 4</span></span> = ' +
          '<span class="frac"><span>1</span><span>2</span></span></div></div></div>' +
          '<p>Both routes reach the same place. Dividing by the <b>largest</b> number that goes into both gets ' +
          'you there in one move.</p>' +
          '<div class="watchout"><b>Watch out</b> — you must divide the top and the bottom by the same number. ' +
          'Dividing only one of them changes the value of the fraction.</div>'
      }
    ],
    questions: [
      {
        id: 'w1s1', type: 'mcq', marks: 2,
        prompt: 'Simplify <span class="frac"><span>6</span><span>9</span></span> to its lowest terms.',
        options: [
          '<span class="frac"><span>2</span><span>3</span></span>',
          '<span class="frac"><span>3</span><span>2</span></span>',
          '<span class="frac"><span>1</span><span>3</span></span>',
          '<span class="frac"><span>6</span><span>9</span></span> is already simplest'
        ],
        answer: 0,
        solution: [
          { lab: 'Largest number dividing both', val: '3 goes into 6 and into 9' },
          { lab: 'Divide both', val: '(6 ÷ 3) / (9 ÷ 3)' },
          { lab: 'Answer', val: '2/3', final: true }
        ],
        why: '2 and 3 share no common factor, so 2/3 is fully simplified.'
      },
      {
        id: 'w1s2', type: 'mcq', marks: 2,
        prompt: 'Simplify <span class="frac"><span>15</span><span>20</span></span> to its lowest terms.',
        options: [
          '<span class="frac"><span>3</span><span>4</span></span>',
          '<span class="frac"><span>5</span><span>10</span></span>',
          '<span class="frac"><span>4</span><span>3</span></span>',
          '<span class="frac"><span>1</span><span>5</span></span>'
        ],
        answer: 0,
        solution: [
          { lab: 'Largest number dividing both', val: '5 goes into 15 and into 20' },
          { lab: 'Divide both', val: '(15 ÷ 5) / (20 ÷ 5)' },
          { lab: 'Answer', val: '3/4', final: true }
        ],
        why: 'Dividing by 5 gets there in one step. Dividing by a smaller common factor would work too, it would just take more moves.'
      },
      {
        id: 'w1s3', type: 'numeric', marks: 2,
        prompt: 'What is the <b>largest</b> number that divides exactly into both 24 and 36?',
        answer: 12, tol: 0.01,
        solution: [
          { lab: 'Numbers dividing 24', val: '1, 2, 3, 4, 6, 8, 12, 24' },
          { lab: 'Numbers dividing 36', val: '1, 2, 3, 4, 6, 9, 12, 18, 36' },
          { lab: 'Largest shared', val: '12' },
          { lab: 'Answer', val: '12', final: true }
        ],
        why: 'Finding this number lets you simplify 24/36 to 2/3 in a single step instead of several.'
      },
      {
        id: 'w1s4', type: 'steps', marks: 4,
        prompt: 'Simplify <span class="frac"><span>18</span><span>24</span></span> to its lowest terms.',
        steps: [
          {
            q: 'What is the largest number that divides exactly into both 18 and 24?',
            answer: 6, tol: 0.01,
            explain: '6 divides into 18 three times and into 24 four times. Nothing larger divides into both.'
          },
          {
            q: 'Divide the numerator by that number. What is the new numerator?',
            answer: 3, tol: 0.01,
            explain: '18 ÷ 6 = 3.'
          },
          {
            q: 'Now divide the denominator by the same number. What is the new denominator?',
            answer: 4, tol: 0.01,
            explain: '24 ÷ 6 = 4, giving the simplified fraction 3/4.'
          }
        ],
        solution: [
          { lab: 'Largest common divisor', val: '6' },
          { lab: 'Divide both', val: '(18 ÷ 6) / (24 ÷ 6)' },
          { lab: 'Answer', val: '3/4', final: true }
        ],
        why: 'You must divide top and bottom by the same number, which is why the answer is still worth exactly what 18/24 was worth.'
      },
      {
        id: 'w1s5', type: 'mcq', marks: 2,
        prompt: 'Which of the following is <b>equivalent</b> to <span class="frac"><span>3</span><span>5</span></span>?',
        options: [
          '<span class="frac"><span>9</span><span>15</span></span>',
          '<span class="frac"><span>6</span><span>15</span></span>',
          '<span class="frac"><span>8</span><span>10</span></span>',
          '<span class="frac"><span>5</span><span>3</span></span>'
        ],
        answer: 0,
        solution: [
          { lab: 'Multiply top and bottom by 3', val: '(3 × 3) / (5 × 3) = 9/15' },
          { lab: 'Check the others', val: '6/15 = 2/5, and 8/10 = 4/5' },
          { lab: 'Answer', val: '9/15', final: true }
        ],
        why: 'Equivalence works in both directions — multiplying top and bottom by the same number raises the terms, dividing lowers them.'
      }
    ]
  },

  /* ═══════════════════════ MULTIPLICATION ═══════════════════════ */
  {
    id: 'w1-multiply',
    title: 'Multiplying Fractions',
    emoji: '✖️',
    summary: 'The easiest of the four rules — straight across the top and bottom.',
    notes: [
      {
        heading: 'The floor plan',
        emoji: '🏬',
        html:
          '<p>Here is the first floor plan drafted for the E-Bike South Africa retail space. The floorspace was ' +
          'divided <b>vertically into three</b> equal parts, and <b>horizontally into four</b>.</p>' +
          '<p>The kitchen sits in the strip that is a <b>third</b> of the shop, and takes up a <b>quarter</b> of ' +
          'that strip. So what fraction of the whole shop is the kitchen?</p>' +
          '<div class="svgfig">' +
          '<svg viewBox="0 0 300 260" role="img" aria-label="Grid of twelve equal parts with one part shaded">' +
          '<g stroke="#8B6DD9" stroke-width="2" fill="none">' +
          '<rect x="30" y="20" width="240" height="220"/>' +
          '<line x1="110" y1="20" x2="110" y2="240"/><line x1="190" y1="20" x2="190" y2="240"/>' +
          '<line x1="30" y1="75" x2="270" y2="75"/><line x1="30" y1="130" x2="270" y2="130"/>' +
          '<line x1="30" y1="185" x2="270" y2="185"/></g>' +
          '<rect x="31" y="186" width="78" height="53" fill="#FF9EC4" opacity=".75"/>' +
          '<text x="70" y="218" text-anchor="middle" font-size="12" font-weight="700" fill="#4A3457">kitchen</text>' +
          '<text x="150" y="256" text-anchor="middle" font-size="12" fill="#6E5C7C">12 equal parts in total</text>' +
          '</svg><figcaption>Thirds one way, quarters the other — 12 equal parts</figcaption></div>' +
          '<div class="math-block">kitchen = <span class="frac"><span>1</span><span>4</span></span> × ' +
          '<span class="frac"><span>1</span><span>3</span></span> = ' +
          '<span class="frac"><span>1 × 1</span><span>4 × 3</span></span> = ' +
          '<span class="frac"><span>1</span><span>12</span></span> of the total floorspace</div>' +
          '<p>Look at the grid: dividing into thirds one way and quarters the other creates <b>12</b> equal parts, ' +
          'and the kitchen is exactly one of them. The maths and the picture agree.</p>'
      },
      {
        heading: 'The multiplication rule',
        emoji: '📐',
        html:
          '<div class="keybox"><b>Multiply the numerators together, and the denominators together.</b><br><br>' +
          '<span class="frac"><span>c</span><span>a</span></span> × ' +
          '<span class="frac"><span>d</span><span>b</span></span> = ' +
          '<span class="frac"><span>c × d</span><span>a × b</span></span> = ' +
          '<span class="frac"><span>cd</span><span>ab</span></span></div>' +
          '<p>No common denominators needed, no rearranging. This is why "a fraction <b>of</b> a fraction" always ' +
          'means multiply.</p>' +
          '<div class="watchout"><b>Tip</b> — simplify at the end (or cancel before you multiply) so you are not ' +
          'left wrestling with large numbers.</div>'
      }
    ],
    questions: [
      {
        id: 'w1m1', type: 'mcq', marks: 2,
        prompt: 'Calculate <span class="frac"><span>2</span><span>5</span></span> × <span class="frac"><span>3</span><span>7</span></span>.',
        options: [
          '<span class="frac"><span>6</span><span>35</span></span>',
          '<span class="frac"><span>5</span><span>12</span></span>',
          '<span class="frac"><span>6</span><span>12</span></span>',
          '<span class="frac"><span>14</span><span>15</span></span>'
        ],
        answer: 0,
        solution: [
          { lab: 'Multiply the numerators', val: '2 × 3 = 6' },
          { lab: 'Multiply the denominators', val: '5 × 7 = 35' },
          { lab: 'Answer', val: '6/35', final: true }
        ],
        why: 'You never add when multiplying fractions. 5/12 is what you get by wrongly adding both top and bottom.'
      },
      {
        id: 'w1m2', type: 'mcq', marks: 2,
        scenario: 'A storeroom takes up <span class="frac"><span>1</span><span>5</span></span> of a floor, and that floor is <span class="frac"><span>1</span><span>4</span></span> of the whole building.',
        prompt: 'What fraction of the whole building is the storeroom?',
        options: [
          '<span class="frac"><span>1</span><span>20</span></span>',
          '<span class="frac"><span>2</span><span>9</span></span>',
          '<span class="frac"><span>1</span><span>9</span></span>',
          '<span class="frac"><span>5</span><span>4</span></span>'
        ],
        answer: 0,
        solution: [
          { lab: 'A fraction OF a fraction', val: 'means multiply' },
          { lab: 'Calculate', val: '1/5 × 1/4 = (1 × 1)/(5 × 4)' },
          { lab: 'Answer', val: '1/20', final: true }
        ],
        why: 'The word "of" is the signal. Because you are taking a part of a part, the result is smaller than either fraction on its own.'
      },
      {
        id: 'w1m3', type: 'steps', marks: 5,
        prompt: 'Calculate <span class="frac"><span>3</span><span>4</span></span> × <span class="frac"><span>8</span><span>9</span></span>, giving your answer in its lowest terms.',
        steps: [
          {
            q: 'Multiply the numerators. What do you get?',
            answer: 24, tol: 0.01,
            explain: '3 × 8 = 24.'
          },
          {
            q: 'Multiply the denominators. What do you get?',
            answer: 36, tol: 0.01,
            explain: '4 × 9 = 36, so the unsimplified answer is 24/36.'
          },
          {
            q: 'Now simplify 24/36. What is the numerator of the simplified fraction?',
            answer: 2, tol: 0.01,
            explain: '12 divides into both: 24 ÷ 12 = 2 and 36 ÷ 12 = 3, giving 2/3.'
          }
        ],
        solution: [
          { lab: 'Multiply straight across', val: '(3 × 8)/(4 × 9) = 24/36' },
          { lab: 'Largest common divisor', val: '12' },
          { lab: 'Simplify', val: '(24 ÷ 12)/(36 ÷ 12)' },
          { lab: 'Answer', val: '2/3', final: true }
        ],
        why: 'Always check whether the result simplifies. An answer left as 24/36 is correct in value but not in its lowest terms.'
      },
      {
        id: 'w1m4', type: 'numeric', marks: 3,
        prompt: 'E-Bike SA allocates <span class="frac"><span>3</span><span>8</span></span> of its R4 800 marketing budget to social media. How much is that?',
        pre: 'R', answer: 1800, tol: 1,
        solution: [
          { lab: 'A fraction of an amount', val: 'means multiply' },
          { lab: 'Calculate', val: '3/8 × 4 800' },
          { lab: 'Work it out', val: '4 800 ÷ 8 = 600, then 600 × 3' },
          { lab: 'Answer', val: 'R1 800', final: true }
        ],
        why: 'Dividing by the denominator first keeps the numbers manageable — one eighth is R600, so three eighths is R1 800.'
      },
      {
        id: 'w1m5', type: 'mcq', marks: 1,
        prompt: 'What is the rule for multiplying two fractions?',
        options: [
          'Multiply the numerators together, and the denominators together',
          'Find a common denominator first, then multiply the numerators',
          'Multiply by the reciprocal of the second fraction',
          'Add the numerators and multiply the denominators'
        ],
        answer: 0,
        solution: [
          { lab: 'Multiplication', val: 'Straight across, top and bottom' },
          { lab: 'Common denominators', val: 'Needed for addition and subtraction, not multiplication' },
          { lab: 'Reciprocal', val: 'That is the division rule' },
          { lab: 'Answer', val: 'Multiply numerators and denominators', final: true }
        ],
        why: 'Multiplication is the one operation that needs no preparation at all — which is why the notes call it the most straightforward.'
      }
    ]
  },

  /* ═══════════════════════ DIVISION ═══════════════════════ */
  {
    id: 'w1-divide',
    title: 'Dividing Fractions',
    emoji: '➗',
    summary: 'Flip the second fraction and multiply — and why that actually works.',
    notes: [
      {
        heading: 'What dividing by a fraction really asks',
        emoji: '🤔',
        html:
          '<p>Back to the shop floor plan. Suppose you ask:</p>' +
          '<p><i>"How many smaller areas equal to <span class="frac"><span>1</span><span>4</span></span> of the ' +
          'floorspace can I fit into an area equal to <span class="frac"><span>2</span><span>3</span></span> of ' +
          'the floorspace?"</i></p>' +
          '<p>That question is a division: <span class="frac"><span>2</span><span>3</span></span> ÷ ' +
          '<span class="frac"><span>1</span><span>4</span></span>.</p>' +
          '<p>Working it out on the 12-part grid: ' +
          '<span class="frac"><span>2</span><span>3</span></span> of the shop is <b>8</b> of the 12 units, and ' +
          '<span class="frac"><span>1</span><span>4</span></span> of the shop is <b>3</b> of the 12 units. ' +
          'How many groups of 3 fit into 8? Two full groups, and two-thirds of another.</p>' +
          '<div class="math-block">Answer: 2<span class="frac"><span>2</span><span>3</span></span> areas</div>' +
          '<p>Counting grid squares works, but it is slow. There is a rule that gets you there directly.</p>'
      },
      {
        heading: 'The division rule',
        emoji: '🔄',
        html:
          '<div class="keybox"><b>Dividing by a fraction is the same as multiplying by its reciprocal.</b><br><br>' +
          'The <b>reciprocal</b> is the fraction turned upside down — numerator and denominator swapped.<br><br>' +
          '<span class="frac"><span>c</span><span>a</span></span> ÷ ' +
          '<span class="frac"><span>d</span><span>b</span></span> = ' +
          '<span class="frac"><span>c</span><span>a</span></span> × ' +
          '<span class="frac"><span>b</span><span>d</span></span> = ' +
          '<span class="frac"><span>cb</span><span>ad</span></span></div>' +
          '<div class="worked"><div class="worked-title">Testing the rule against the grid answer</div>' +
          '<div class="solstep"><div class="solstep-lab">The problem</div>' +
          '<div class="solstep-val"><span class="frac"><span>2</span><span>3</span></span> ÷ ' +
          '<span class="frac"><span>1</span><span>4</span></span></div></div>' +
          '<div class="solstep"><div class="solstep-lab">Flip the second fraction</div>' +
          '<div class="solstep-val"><span class="frac"><span>2</span><span>3</span></span> × ' +
          '<span class="frac"><span>4</span><span>1</span></span></div></div>' +
          '<div class="solstep"><div class="solstep-lab">Multiply straight across</div>' +
          '<div class="solstep-val"><span class="frac"><span>2 × 4</span><span>3 × 1</span></span> = ' +
          '<span class="frac"><span>8</span><span>3</span></span></div></div>' +
          '<div class="solstep final"><div class="solstep-lab">As a mixed number</div>' +
          '<div class="solstep-val">2<span class="frac"><span>2</span><span>3</span></span> — the same answer the grid gave</div></div></div>' +
          '<div class="watchout"><b>Watch out</b> — flip the <b>second</b> fraction only, the one you are dividing ' +
          'by. Flipping the first gives a completely different answer.</div>'
      }
    ],
    questions: [
      {
        id: 'w1d1', type: 'mcq', marks: 1,
        prompt: 'What is the <b>reciprocal</b> of <span class="frac"><span>3</span><span>7</span></span>?',
        options: [
          '<span class="frac"><span>7</span><span>3</span></span>',
          '<span class="frac"><span>3</span><span>7</span></span>',
          '<span class="frac"><span>1</span><span>3</span></span>',
          '−<span class="frac"><span>3</span><span>7</span></span>'
        ],
        answer: 0,
        solution: [
          { lab: 'Reciprocal', val: 'Swap the numerator and the denominator' },
          { lab: 'Apply', val: '3/7 becomes 7/3' },
          { lab: 'Answer', val: '7/3', final: true }
        ],
        why: 'The reciprocal is just the fraction upside down. It is the only new idea you need for division.'
      },
      {
        id: 'w1d2', type: 'mcq', marks: 3,
        prompt: 'Calculate <span class="frac"><span>3</span><span>4</span></span> ÷ <span class="frac"><span>1</span><span>2</span></span>.',
        options: [
          '<span class="frac"><span>3</span><span>2</span></span>',
          '<span class="frac"><span>3</span><span>8</span></span>',
          '<span class="frac"><span>2</span><span>3</span></span>',
          '<span class="frac"><span>4</span><span>6</span></span>'
        ],
        answer: 0,
        solution: [
          { lab: 'Flip the second fraction', val: '1/2 becomes 2/1' },
          { lab: 'Multiply', val: '3/4 × 2/1 = 6/4' },
          { lab: 'Simplify', val: '6/4 = 3/2' },
          { lab: 'Answer', val: '3/2, or 1½', final: true }
        ],
        why: '3/8 is what you get by multiplying instead of dividing. Notice the answer is bigger than 3/4 — dividing by a number less than 1 always increases the result.'
      },
      {
        id: 'w1d3', type: 'steps', marks: 5,
        prompt: 'Calculate <span class="frac"><span>5</span><span>6</span></span> ÷ <span class="frac"><span>2</span><span>3</span></span>, giving your answer in its lowest terms.',
        steps: [
          {
            q: 'After flipping the second fraction, multiply the numerators. What do you get?',
            answer: 15, tol: 0.01,
            explain: '5/6 ÷ 2/3 becomes 5/6 × 3/2. The numerators give 5 × 3 = 15.'
          },
          {
            q: 'Now multiply the denominators. What do you get?',
            answer: 12, tol: 0.01,
            explain: '6 × 2 = 12, so the unsimplified answer is 15/12.'
          },
          {
            q: 'Simplify 15/12. What is the numerator of the simplified fraction?',
            answer: 5, tol: 0.01,
            explain: '3 divides into both: 15 ÷ 3 = 5 and 12 ÷ 3 = 4, giving 5/4.'
          }
        ],
        solution: [
          { lab: 'Flip the second fraction', val: '2/3 becomes 3/2' },
          { lab: 'Multiply straight across', val: '(5 × 3)/(6 × 2) = 15/12' },
          { lab: 'Simplify by 3', val: '(15 ÷ 3)/(12 ÷ 3)' },
          { lab: 'Answer', val: '5/4, or 1¼', final: true }
        ],
        why: 'Once you have flipped the second fraction, it is an ordinary multiplication — the same rule you already know.'
      },
      {
        id: 'w1d4', type: 'numeric', marks: 3,
        prompt: 'A workshop has 1<span class="frac"><span>1</span><span>2</span></span> hours available. Each service booking takes <span class="frac"><span>1</span><span>4</span></span> of an hour. How many bookings fit into the available time?',
        suf: 'bookings', answer: 6, tol: 0.01,
        solution: [
          { lab: 'Write the mixed number as an improper fraction', val: '1½ = 3/2' },
          { lab: 'The problem', val: '3/2 ÷ 1/4' },
          { lab: 'Flip and multiply', val: '3/2 × 4/1 = 12/2' },
          { lab: 'Answer', val: '6 bookings', final: true }
        ],
        why: '"How many of these fit into that" is always a division. Convert any mixed number to an improper fraction before you start.'
      },
      {
        id: 'w1d5', type: 'mcq', marks: 1,
        prompt: 'Dividing by a fraction is the same as:',
        options: [
          'Multiplying by its reciprocal',
          'Multiplying by the same fraction',
          'Finding a common denominator and subtracting',
          'Dividing the numerators and the denominators separately'
        ],
        answer: 0,
        solution: [
          { lab: 'The rule', val: 'Flip the second fraction, then multiply' },
          { lab: 'Reciprocal', val: 'The fraction with numerator and denominator swapped' },
          { lab: 'Answer', val: 'Multiplying by its reciprocal', final: true }
        ],
        why: 'This is the single fact that turns every fraction division into a multiplication you already know how to do.'
      }
    ]
  },

  /* ═══════════════════════ ADDITION & SUBTRACTION ═══════════════════════ */
  {
    id: 'w1-addsub',
    title: 'Adding & Subtracting Fractions',
    emoji: '➕',
    summary: 'Why you need a common denominator, and how to find one.',
    notes: [
      {
        heading: 'You can only add parts of the same size',
        emoji: '🍫',
        html:
          '<p>Two friends offer you some of their energy bars. One can spare a <b>quarter</b> of hers, the other a ' +
          '<b>half</b>. How much of a whole bar do you end up with?</p>' +
          '<p>You cannot just add the numbers, because a quarter and a half are different-sized pieces. ' +
          '<b>We can only add parts of a whole if those parts are the same size.</b></p>' +
          '<p>So rewrite the half as <b>two quarters</b>. Now everything is in quarters:</p>' +
          '<div class="math-block"><span class="frac"><span>1</span><span>4</span></span> + ' +
          '<span class="frac"><span>1</span><span>2</span></span> = ' +
          '<span class="frac"><span>1</span><span>4</span></span> + ' +
          '<span class="frac"><span>2</span><span>4</span></span> = ' +
          '<span class="frac"><span>3</span><span>4</span></span></div>' +
          '<div class="watchout"><b>Watch out</b> — once the denominators match, you add <b>only the numerators</b>. ' +
          'The denominator stays as it is. It is still quarters, you just have more of them.</div>'
      },
      {
        heading: 'Finding a common denominator',
        emoji: '🔍',
        html:
          '<p>That one was easy because 4 is a multiple of 2. But what about ' +
          '<span class="frac"><span>3</span><span>8</span></span> + ' +
          '<span class="frac"><span>1</span><span>3</span></span>, where neither denominator is a multiple of the other?</p>' +
          '<p><b>Method 1 — walk up the multiples.</b> Start with the higher denominator, 8:</p>' +
          '<ul class="tickly">' +
          '<li>16 (8 × 2) — can 16 be divided by 3? No.</li>' +
          '<li>24 (8 × 3) — can 24 be divided by 3? Yes!</li>' +
          '</ul>' +
          '<p>So <b>24 is the smallest common denominator</b>.</p>' +
          '<p><b>Method 2 — multiply each fraction by the other\'s denominator</b>, top and bottom:</p>' +
          '<div class="worked"><div class="worked-title">Worked example — <span class="frac"><span>3</span><span>8</span></span> + <span class="frac"><span>1</span><span>3</span></span></div>' +
          '<div class="solstep"><div class="solstep-lab">Scale each fraction</div>' +
          '<div class="solstep-val">(<span class="frac"><span>3</span><span>8</span></span> × ' +
          '<span class="frac"><span>3</span><span>3</span></span>) + ' +
          '(<span class="frac"><span>1</span><span>3</span></span> × ' +
          '<span class="frac"><span>8</span><span>8</span></span>)</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Which gives</div>' +
          '<div class="solstep-val"><span class="frac"><span>9</span><span>24</span></span> + ' +
          '<span class="frac"><span>8</span><span>24</span></span></div></div>' +
          '<div class="solstep"><div class="solstep-lab">Add the numerators</div>' +
          '<div class="solstep-val"><span class="frac"><span>9 + 8</span><span>24</span></span></div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Answer</div>' +
          '<div class="solstep-val"><span class="frac"><span>17</span><span>24</span></span></div></div></div>' +
          '<p>Method 2 always works, but be aware it does <b>not</b> always give the <i>smallest</i> common ' +
          'denominator — you may need to simplify afterwards.</p>'
      },
      {
        heading: 'The rules in general terms',
        emoji: '📋',
        html:
          '<div class="keybox"><b>Addition</b><br>' +
          '<span class="frac"><span>1</span><span>a</span></span> + ' +
          '<span class="frac"><span>1</span><span>b</span></span> = ' +
          '<span class="frac"><span>b</span><span>ab</span></span> + ' +
          '<span class="frac"><span>a</span><span>ab</span></span> = ' +
          '<span class="frac"><span>a + b</span><span>ab</span></span><br><br>' +
          '<b>Subtraction</b><br>' +
          '<span class="frac"><span>1</span><span>a</span></span> − ' +
          '<span class="frac"><span>1</span><span>b</span></span> = ' +
          '<span class="frac"><span>b</span><span>ab</span></span> − ' +
          '<span class="frac"><span>a</span><span>ab</span></span> = ' +
          '<span class="frac"><span>b − a</span><span>ab</span></span></div>' +
          '<p>Subtraction works in exactly the same way as addition — find the common denominator first, then ' +
          'subtract the numerators instead of adding them.</p>'
      }
    ],
    questions: [
      {
        id: 'w1a1', type: 'mcq', marks: 2,
        prompt: 'Calculate <span class="frac"><span>1</span><span>6</span></span> + <span class="frac"><span>1</span><span>3</span></span>, in its lowest terms.',
        options: [
          '<span class="frac"><span>1</span><span>2</span></span>',
          '<span class="frac"><span>2</span><span>9</span></span>',
          '<span class="frac"><span>2</span><span>6</span></span>',
          '<span class="frac"><span>1</span><span>9</span></span>'
        ],
        answer: 0,
        solution: [
          { lab: 'Common denominator', val: '6 — because 3 divides into 6' },
          { lab: 'Rewrite', val: '1/3 = 2/6' },
          { lab: 'Add the numerators', val: '1/6 + 2/6 = 3/6' },
          { lab: 'Simplify', val: '3/6 = 1/2', final: true }
        ],
        why: '2/9 comes from adding the tops and the bottoms, which is never how addition works. Only the numerators get added.'
      },
      {
        id: 'w1a2', type: 'numeric', marks: 2,
        prompt: 'What is the <b>smallest</b> common denominator for <span class="frac"><span>1</span><span>6</span></span> and <span class="frac"><span>1</span><span>4</span></span>?',
        answer: 12, tol: 0.01,
        solution: [
          { lab: 'Start with the higher denominator', val: '6' },
          { lab: 'Next multiple', val: '12 — can 12 be divided by 4? Yes' },
          { lab: 'Answer', val: '12', final: true }
        ],
        why: 'Multiplying 6 × 4 would give 24, which also works but is not the smallest. Walking up the multiples finds the smallest one.'
      },
      {
        id: 'w1a3', type: 'steps', marks: 5,
        prompt: 'Calculate <span class="frac"><span>2</span><span>5</span></span> + <span class="frac"><span>1</span><span>4</span></span>.',
        steps: [
          {
            q: 'What common denominator will you use?',
            answer: 20, tol: 0.01,
            explain: 'Neither 5 nor 4 divides into the other, so multiply them: 5 × 4 = 20.'
          },
          {
            q: 'Rewrite both fractions over 20 and add the numerators. What is the numerator of the answer?',
            answer: 13, tol: 0.01,
            explain: '2/5 becomes 8/20 and 1/4 becomes 5/20. Adding the numerators: 8 + 5 = 13, giving 13/20.'
          }
        ],
        solution: [
          { lab: 'Common denominator', val: '5 × 4 = 20' },
          { lab: 'Rescale', val: '2/5 = 8/20 and 1/4 = 5/20' },
          { lab: 'Add the numerators', val: '(8 + 5)/20' },
          { lab: 'Answer', val: '13/20', final: true }
        ],
        why: '13 and 20 share no common factor, so 13/20 is already in its lowest terms.'
      },
      {
        id: 'w1a4', type: 'mcq', marks: 3,
        prompt: 'Calculate <span class="frac"><span>5</span><span>6</span></span> − <span class="frac"><span>1</span><span>4</span></span>.',
        options: [
          '<span class="frac"><span>7</span><span>12</span></span>',
          '<span class="frac"><span>4</span><span>2</span></span>',
          '<span class="frac"><span>1</span><span>3</span></span>',
          '<span class="frac"><span>4</span><span>24</span></span>'
        ],
        answer: 0,
        solution: [
          { lab: 'Smallest common denominator', val: '12' },
          { lab: 'Rescale', val: '5/6 = 10/12 and 1/4 = 3/12' },
          { lab: 'Subtract the numerators', val: '(10 − 3)/12' },
          { lab: 'Answer', val: '7/12', final: true }
        ],
        why: 'Subtraction follows exactly the same preparation as addition. Only the final step changes from adding to subtracting.'
      },
      {
        id: 'w1a5', type: 'numeric', marks: 2,
        prompt: 'Rewrite <span class="frac"><span>5</span><span>6</span></span> as an equivalent fraction with a denominator of 18. What is the new numerator?',
        answer: 15, tol: 0.01,
        solution: [
          { lab: 'What did the denominator do?', val: '6 × 3 = 18' },
          { lab: 'Do the same to the numerator', val: '5 × 3' },
          { lab: 'Answer', val: '15, giving 15/18', final: true }
        ],
        why: 'This rescaling step is the heart of adding and subtracting fractions — you change how it is written without changing what it is worth.'
      }
    ]
  },

  /* ═══════════════════════ DECIMAL NOTATION ═══════════════════════ */
  {
    id: 'w1-decimals',
    title: 'Decimal Numbers & Place Value',
    emoji: '🔟',
    summary: 'Why the base-10 system makes big awkward numbers readable.',
    notes: [
      {
        heading: 'The courier\'s scale',
        emoji: '🚚',
        html:
          '<p>A client orders 15 e-bikes. Your courier charges by weight, and his scale is extremely precise. ' +
          'Once the bikes are loaded he announces the reading as:</p>' +
          '<p style="text-align:center"><i>"six hundred seven thousand, one hundred ninety-four and thirty-five ' +
          'thousand eight hundred twenty-four hundred-thousandths grams"</i></p>' +
          '<p>Could you follow that? Written out with whole numbers and fractions it is no better:</p>' +
          '<div class="math-block">(6 × 100 000) + (0 × 10 000) + (7 × 1 000) + (1 × 100) + (9 × 10) + (4 × 1) + ' +
          '(1 × <span class="frac"><span>3</span><span>10</span></span>) + (1 × <span class="frac"><span>5</span><span>100</span></span>) + …</div>' +
          '<p>In <b>decimal notation</b> the same number is simply:</p>' +
          '<div class="math-block" style="text-align:center;font-size:1.3rem">607 194.358 24 grams</div>' +
          '<p>That is the whole point of the <b>decimal (base-10) counting system</b> — it is built from blocks of ' +
          '10, and it makes numbers readable.</p>'
      },
      {
        heading: 'Place values',
        emoji: '📍',
        html:
          '<p>Each digit\'s <b>position</b> tells you what it is worth. Moving left, each place is ten times bigger; ' +
          'moving right, each place is ten times smaller.</p>' +
          '<div class="tablewrap"><table class="dtable">' +
          '<tr><th>Left of the point</th><th>Right of the point</th></tr>' +
          '<tr><td>ones</td><td>tenths</td></tr>' +
          '<tr><td>tens</td><td>hundredths</td></tr>' +
          '<tr><td>hundreds</td><td>thousandths</td></tr>' +
          '<tr><td>thousands</td><td>ten-thousandths</td></tr>' +
          '<tr><td>ten thousands</td><td>hundred-thousandths</td></tr>' +
          '</table></div>' +
          '<div class="watchout"><b>Watch out</b> — there is no "oneths". The place immediately right of the decimal ' +
          'point is <b>tenths</b>, and the names on the right all end in "-ths".</div>' +
          '<p>A fraction can always be turned into a decimal by dividing the numerator by the denominator. ' +
          '<span class="frac"><span>3</span><span>4</span></span> is 3 ÷ 4 = <b>0.75</b>.</p>'
      }
    ],
    questions: [
      {
        id: 'w1dc1', type: 'mcq', marks: 2,
        prompt: 'In the number 52.847, which digit is in the <b>hundredths</b> place?',
        options: ['4', '8', '7', '2'],
        answer: 0,
        solution: [
          { lab: 'Right of the point', val: '8 = tenths, 4 = hundredths, 7 = thousandths' },
          { lab: 'Answer', val: '4', final: true }
        ],
        why: 'Count places to the right of the point: first is tenths, second is hundredths. The 8 is a common wrong answer because it is the first digit you see.'
      },
      {
        id: 'w1dc2', type: 'mcq', marks: 2,
        prompt: 'Written as a decimal, <span class="frac"><span>7</span><span>10</span></span> + <span class="frac"><span>3</span><span>100</span></span> is:',
        options: ['0.73', '0.703', '7.3', '0.10'],
        answer: 0,
        solution: [
          { lab: '7 tenths', val: 'goes in the first place after the point' },
          { lab: '3 hundredths', val: 'goes in the second place' },
          { lab: 'Answer', val: '0.73', final: true }
        ],
        why: 'Each fraction slots straight into its matching place value. That correspondence is what makes decimal notation work.'
      },
      {
        id: 'w1dc3', type: 'numeric', marks: 2,
        prompt: 'Write "four hundred and six point zero five" as a decimal number.',
        answer: 406.05, tol: 0.001,
        solution: [
          { lab: 'Whole number part', val: '406' },
          { lab: 'Zero tenths, five hundredths', val: '.05' },
          { lab: 'Answer', val: '406.05', final: true }
        ],
        why: 'The zero is doing real work — it holds the tenths place open so the 5 lands in hundredths. Writing 406.5 would be ten times too big.'
      },
      {
        id: 'w1dc4', type: 'mcq', marks: 1,
        prompt: 'In the number 1 293.6, what does the digit <b>9</b> represent?',
        options: ['9 tens', '9 ones', '9 hundreds', '9 tenths'],
        answer: 0,
        solution: [
          { lab: 'Reading left from the point', val: '3 = ones, 9 = tens, 2 = hundreds, 1 = thousands' },
          { lab: 'Answer', val: '9 tens, that is 90', final: true }
        ],
        why: 'A digit\'s value comes entirely from its position, which is why 9 here is worth 90 and not 9.'
      },
      {
        id: 'w1dc5', type: 'numeric', marks: 2,
        prompt: 'Convert <span class="frac"><span>5</span><span>8</span></span> to a decimal.',
        answer: 0.625, tol: 0.001,
        solution: [
          { lab: 'A fraction is a division', val: '5 ÷ 8' },
          { lab: 'Calculate', val: '0.625' },
          { lab: 'Answer', val: '0.625', final: true }
        ],
        why: 'Divide the top by the bottom. This is the same first step you use to turn a fraction into a percentage.'
      }
    ]
  },

  /* ═══════════════════════ ROUNDING ═══════════════════════ */
  {
    id: 'w1-rounding',
    title: 'Rounding & Reasonability',
    emoji: '🎯',
    summary: 'Rounding off, rounding up, and why you should always sanity-check a calculator.',
    notes: [
      {
        heading: 'When precision stops being useful',
        emoji: '⚖️',
        html:
          '<p>The 15 e-bikes weigh 607.194 358 24 kilograms and the courier charges <b>R6 per kilogram</b>. ' +
          'Does all that detail matter?</p>' +
          '<div class="worked"><div class="worked-title">What each part of the weight actually costs</div>' +
          '<div class="solstep"><div class="solstep-lab">The decimal part</div>' +
          '<div class="solstep-val">0.194 358 24 × R6 = <b>R1.16</b></div></div>' +
          '<div class="solstep final"><div class="solstep-lab">The whole-number part</div>' +
          '<div class="solstep-val">607 × R6 = <b>R3 642</b></div></div></div>' +
          '<p>R1.16 will not change any decision you make about the courier. So we <b>round</b> — replacing an ' +
          'unwieldy number with a simpler one that is close enough to be useful.</p>'
      },
      {
        heading: 'Rounding off versus rounding up',
        emoji: '🔀',
        html:
          '<p><b>Rounding off</b> (normal rounding) looks at the next digit along: if it is 5 or more you round up, ' +
          'otherwise you round down.</p>' +
          '<div class="tablewrap"><table class="dtable">' +
          '<tr><th>607.194 358 24 rounded off to the nearest…</th><th>gives</th></tr>' +
          '<tr><td>whole number</td><td>607</td></tr>' +
          '<tr><td>tenth</td><td>607.20</td></tr>' +
          '<tr><td>hundredth</td><td>607.19</td></tr>' +
          '<tr><td>thousandth</td><td>607.194</td></tr>' +
          '</table></div>' +
          '<p><b>Rounding up</b> is different, and sometimes more prudent in business: <b>any</b> fraction of a whole ' +
          'becomes a whole, not only those above a half.</p>' +
          '<div class="tablewrap"><table class="dtable">' +
          '<tr><th>607.194 358 24 rounded up to the nearest…</th><th>gives</th></tr>' +
          '<tr><td>whole number</td><td>608</td></tr>' +
          '<tr><td>tenth</td><td>607.2</td></tr>' +
          '<tr><td>hundredth</td><td>607.20</td></tr>' +
          '<tr><td>thousandth</td><td>607.195</td></tr>' +
          '</table></div>' +
          '<div class="watchout"><b>Read the question.</b> "Round off" and "round up" give different answers. ' +
          'If you are ordering stock or costing a job, rounding up protects you from coming up short.</div>'
      },
      {
        heading: 'Reasonability checks',
        emoji: '🧠',
        html:
          '<p>Calculators do the arithmetic — so why learn the logic at all?</p>' +
          '<div class="keybox"><b>Because the answer your calculator gives is only correct if every single key was ' +
          'pressed correctly.</b></div>' +
          '<p>If you understand the logic, you can <b>pre-empt roughly what the answer should look like</b>. Then a ' +
          'mistyped digit stands out immediately instead of ending up in a report.</p>' +
          '<p>This is one of the most essential skills in business, and it costs you a couple of seconds. Estimate ' +
          'first, calculate second, compare.</p>'
      }
    ],
    questions: [
      {
        id: 'w1r1', type: 'numeric', marks: 2,
        prompt: 'Round <b>off</b> 84.6472 to the nearest hundredth.',
        answer: 84.65, tol: 0.001,
        solution: [
          { lab: 'Hundredths digit', val: '84.64|72 — the 4 is in hundredths' },
          { lab: 'Next digit along', val: '7, which is 5 or more, so round up' },
          { lab: 'Answer', val: '84.65', final: true }
        ],
        why: 'You look at the digit immediately after the place you are rounding to — the 7 — and nothing beyond it.'
      },
      {
        id: 'w1r2', type: 'numeric', marks: 2,
        prompt: 'Round <b>off</b> 84.6472 to the nearest tenth.',
        answer: 84.6, tol: 0.001,
        solution: [
          { lab: 'Tenths digit', val: '84.6|472 — the 6 is in tenths' },
          { lab: 'Next digit along', val: '4, which is less than 5, so round down' },
          { lab: 'Answer', val: '84.6', final: true }
        ],
        why: 'Only the very next digit decides it. Do not be tempted by the 72 further along — 84.65 rounded to a tenth would be wrong.'
      },
      {
        id: 'w1r3', type: 'mcq', marks: 2,
        prompt: 'Rounding 12.301 <b>up</b> to the nearest whole number gives:',
        options: ['13', '12', '12.3', '12.4'],
        answer: 0,
        solution: [
          { lab: 'Rounding up', val: 'Any fraction of a whole becomes a whole' },
          { lab: 'So 12.301', val: 'Becomes the next whole number' },
          { lab: 'Answer', val: '13', final: true }
        ],
        why: 'Rounding *off* would give 12, because 0.301 is less than a half. Rounding *up* ignores that and takes the next whole regardless.'
      },
      {
        id: 'w1r4', type: 'numeric', marks: 3,
        prompt: 'A consignment weighs 249.7 kg and the courier charges R8 per kilogram. Rounding the weight <b>off</b> to the nearest whole kilogram, what is the transport cost?',
        pre: 'R', answer: 2000, tol: 1,
        solution: [
          { lab: 'Round the weight', val: '249.7 → 250 kg (7 is 5 or more)' },
          { lab: 'Multiply by the rate', val: '250 × R8' },
          { lab: 'Answer', val: 'R2 000', final: true }
        ],
        why: 'Reasonability check: 250 × 8 should be close to 250 × 10 = 2 500, but a bit less. R2 000 fits — if your calculator had said R20 000 you would spot it instantly.'
      },
      {
        id: 'w1r5', type: 'mcq', marks: 2,
        prompt: 'Why does the module insist you understand the logic behind a calculation, even though a calculator can do it?',
        options: [
          'Because a calculator\'s answer is only correct if every key was pressed correctly',
          'Because calculators are not allowed in business',
          'Because calculators cannot handle decimals',
          'Because the logic gives a more precise answer than a calculator'
        ],
        answer: 0,
        solution: [
          { lab: 'The risk', val: 'A mistyped key produces a confident but wrong answer' },
          { lab: 'The defence', val: 'Knowing roughly what the answer should look like' },
          { lab: 'Answer', val: 'Calculators are only as correct as your keystrokes', final: true }
        ],
        why: 'Calculators are built on the decimal system and handle decimals perfectly well. The weak link is the person pressing the keys.'
      }
    ]
  },

  /* ═══════════════════════ POWERS & ROOTS ═══════════════════════ */
  {
    id: 'w1-powers',
    title: 'Powers & Roots',
    emoji: '⚡',
    summary: 'Shorthand for repeated multiplication — and how to undo it.',
    notes: [
      {
        heading: 'Powers are shorthand',
        emoji: '💡',
        html:
          '<p>You own E-Bike SA and read that a stored battery self-discharges about <b>5% per month</b>. You have ' +
          'bikes that arrived fully charged <b>6 months ago</b>. How much charge is left?</p>' +
          '<p>To work that out you would multiply by 0.95, month after month after month. Doing it one month at a ' +
          'time is inefficient — so mathematics gives us a shorthand for repeated multiplication.</p>' +
          '<div class="keybox"><b>Writing in powers</b><br>' +
          '10 × 10 × 10 = 10<sup>3</sup> &nbsp;(read as "10 to the power of 3")<br>' +
          '5 × 5 × 5 × 5 × 5 × 5 = 5<sup>6</sup> &nbsp;(read as "5 to the power of 6")</div>' +
          '<p>The small raised number counts <b>how many times the base is multiplied by itself</b>.</p>' +
          '<div class="keybox" style="background:var(--mint-100);border-left-color:var(--mint-600)">' +
          '<b>Did you know?</b> Exponents are also called <b>indices</b> or <b>powers</b> — three names for the same thing.</div>'
      },
      {
        heading: 'Roots undo powers',
        emoji: '🌱',
        html:
          '<p>The opposite of a power is a <b>root</b> — the inverse operation.</p>' +
          '<p>Finding the <b>square root</b> of a number means finding the value that, multiplied by itself, gives ' +
          'the original number.</p>' +
          '<div class="math-block"><sup>2</sup>√16 = √16 = √(4 × 4) = 4</div>' +
          '<p>Read as "the square root of 16 is 4". If there is <b>no number to the left of the root sign</b>, it is ' +
          'assumed to be a square root.</p>' +
          '<div class="math-block"><sup>3</sup>√8 = <sup>3</sup>√(2 × 2 × 2) = 2</div>' +
          '<p>Read as "the cube root of 8 is 2" — the value that appears three times.</p>' +
          '<p>In business the numbers are rarely tidy whole numbers: prices carry cents, staff spend fractions of a ' +
          'day on a project, budgets get split across products. Being comfortable with fractions, decimals, powers ' +
          'and roots is what makes those calculations routine.</p>'
      }
    ],
    questions: [
      {
        id: 'w1p1', type: 'mcq', marks: 1,
        prompt: 'Written in power notation, 4 × 4 × 4 × 4 × 4 is:',
        options: ['4<sup>5</sup>', '5<sup>4</sup>', '4 × 5', '4<sup>4</sup>'],
        answer: 0,
        solution: [
          { lab: 'The base', val: '4 — the number being multiplied' },
          { lab: 'The exponent', val: '5 — how many times it appears' },
          { lab: 'Answer', val: '4⁵', final: true }
        ],
        why: '5⁴ would mean 5 × 5 × 5 × 5, which is a completely different number. The base goes big, the count goes small and raised.'
      },
      {
        id: 'w1p2', type: 'numeric', marks: 2,
        prompt: 'Calculate 2<sup>6</sup>.',
        answer: 64, tol: 0.01,
        solution: [
          { lab: 'Expand', val: '2 × 2 × 2 × 2 × 2 × 2' },
          { lab: 'Work through it', val: '2, 4, 8, 16, 32, 64' },
          { lab: 'Answer', val: '64', final: true }
        ],
        why: 'The exponent counts the 2s, not the multiplications. Six 2s multiplied together gives 64.'
      },
      {
        id: 'w1p3', type: 'numeric', marks: 2,
        prompt: 'Calculate √81.',
        answer: 9, tol: 0.01,
        solution: [
          { lab: 'What we need', val: 'A number that multiplied by itself gives 81' },
          { lab: 'Test', val: '9 × 9 = 81' },
          { lab: 'Answer', val: '9', final: true }
        ],
        why: 'No number to the left of the root sign means it is a square root, so you need the value that appears twice.'
      },
      {
        id: 'w1p4', type: 'numeric', marks: 2,
        prompt: 'Calculate <sup>3</sup>√27, the cube root of 27.',
        answer: 3, tol: 0.01,
        solution: [
          { lab: 'What we need', val: 'A number appearing three times that gives 27' },
          { lab: 'Test', val: '3 × 3 × 3 = 27' },
          { lab: 'Answer', val: '3', final: true }
        ],
        why: 'The small 3 on the root sign tells you how many times the value must appear — three, not two.'
      },
      {
        id: 'w1p5', type: 'mcq', marks: 1,
        prompt: 'Exponents are also referred to as:',
        options: ['Indices or powers', 'Roots or radicals', 'Numerators', 'Multiples'],
        answer: 0,
        solution: [
          { lab: 'Three names', val: 'exponent, index, power' },
          { lab: 'Roots', val: 'Are the opposite operation, not another name' },
          { lab: 'Answer', val: 'Indices or powers', final: true }
        ],
        why: 'Worth knowing all three, because exam questions and textbooks use them interchangeably.'
      }
    ]
  },

  /* ═══════════════════════ LAWS OF EXPONENTS ═══════════════════════ */
  {
    id: 'w1-exprules',
    title: 'Laws of Exponents',
    emoji: '📜',
    summary: 'The shortcuts for multiplying and dividing powers.',
    notes: [
      {
        heading: 'Two special instances',
        emoji: '⭐',
        html:
          '<div class="keybox"><b>x<sup>1</sup> = x</b> — anything to the power of 1 is just itself<br><br>' +
          '<b>x<sup>0</sup> = 1</b> — anything to the power of 0 is 1</div>' +
          '<p>The second one looks odd but falls out of the division rule: any number divided by itself is 1, and ' +
          'dividing subtracts the exponents, giving x<sup>0</sup>.</p>'
      },
      {
        heading: 'Multiplication laws',
        emoji: '✖️',
        html:
          '<div class="keybox">' +
          '<b>x<sup>a</sup> · x<sup>b</sup> = x<sup>a+b</sup></b><br>' +
          'same base multiplied → <b>add</b> the exponents<br><br>' +
          '<b>(x<sup>a</sup>)<sup>b</sup> = x<sup>ab</sup></b><br>' +
          'a power raised to a power → <b>multiply</b> the exponents<br><br>' +
          '<b>(xy)<sup>a</sup> = x<sup>a</sup> y<sup>a</sup></b><br>' +
          'a product raised to a power → each factor gets the power</div>' +
          '<div class="watchout"><b>Watch out</b> — these only work when the <b>base is the same</b>. ' +
          '2<sup>3</sup> × 5<sup>4</sup> cannot be simplified this way.</div>'
      },
      {
        heading: 'Division laws',
        emoji: '➗',
        html:
          '<div class="keybox">' +
          '<b><span class="frac"><span>1</span><span>x<sup>a</sup></span></span> = x<sup>−a</sup></b><br>' +
          'a negative exponent means "one over"<br><br>' +
          '<b><span class="frac"><span>x<sup>a</sup></span><span>x<sup>b</sup></span></span> = x<sup>a−b</sup></b><br>' +
          'same base divided → <b>subtract</b> the exponents<br><br>' +
          '<b>(<span class="frac"><span>x</span><span>y</span></span>)<sup>a</sup> = ' +
          '<span class="frac"><span>x<sup>a</sup></span><span>y<sup>a</sup></span></span></b><br>' +
          'a fraction raised to a power → top and bottom each get the power</div>' +
          '<p>Multiply → add. Divide → subtract. Power of a power → multiply. Those three cover almost everything ' +
          'you will meet.</p>'
      }
    ],
    questions: [
      {
        id: 'w1e1', type: 'mcq', marks: 1,
        prompt: 'What does x<sup>0</sup> equal?',
        options: ['1', '0', 'x', 'Undefined'],
        answer: 0,
        solution: [
          { lab: 'Special instance', val: 'Anything to the power of 0 is 1' },
          { lab: 'Answer', val: '1', final: true }
        ],
        why: 'It follows from the division law: xᵃ ÷ xᵃ = x⁰, and any number divided by itself is 1.'
      },
      {
        id: 'w1e2', type: 'numeric', marks: 3,
        prompt: 'Simplify and calculate 3<sup>2</sup> × 3<sup>4</sup>.',
        answer: 729, tol: 0.01,
        solution: [
          { lab: 'Same base multiplied', val: 'Add the exponents: 2 + 4 = 6' },
          { lab: 'So', val: '3⁶' },
          { lab: 'Calculate', val: '3 × 3 × 3 × 3 × 3 × 3' },
          { lab: 'Answer', val: '729', final: true }
        ],
        why: 'You could also work out 9 × 81 = 729 the long way. Adding the exponents first is quicker and less error-prone.'
      },
      {
        id: 'w1e3', type: 'mcq', marks: 2,
        prompt: 'Simplify (x<sup>3</sup>)<sup>4</sup>.',
        options: ['x<sup>12</sup>', 'x<sup>7</sup>', 'x<sup>81</sup>', '3x<sup>4</sup>'],
        answer: 0,
        solution: [
          { lab: 'Power raised to a power', val: 'Multiply the exponents' },
          { lab: 'Calculate', val: '3 × 4 = 12' },
          { lab: 'Answer', val: 'x¹²', final: true }
        ],
        why: 'x⁷ is what you get by adding — but adding is the rule for *multiplying* two powers, not for raising one to another.'
      },
      {
        id: 'w1e4', type: 'numeric', marks: 3,
        prompt: 'Simplify and calculate <span class="frac"><span>5<sup>7</sup></span><span>5<sup>4</sup></span></span>.',
        answer: 125, tol: 0.01,
        solution: [
          { lab: 'Same base divided', val: 'Subtract the exponents: 7 − 4 = 3' },
          { lab: 'So', val: '5³' },
          { lab: 'Calculate', val: '5 × 5 × 5' },
          { lab: 'Answer', val: '125', final: true }
        ],
        why: 'Simplifying first saves you from calculating 78 125 ÷ 625 by hand.'
      },
      {
        id: 'w1e5', type: 'mcq', marks: 2,
        prompt: 'Which of the following is equal to <span class="frac"><span>1</span><span>x<sup>a</sup></span></span>?',
        options: ['x<sup>−a</sup>', 'x<sup>a</sup>', '−x<sup>a</sup>', 'x<sup>1−a</sup>'],
        answer: 0,
        solution: [
          { lab: 'Division law', val: '1 ÷ xᵃ = x⁻ᵃ' },
          { lab: 'Meaning', val: 'A negative exponent signals "one over"' },
          { lab: 'Answer', val: 'x⁻ᵃ', final: true }
        ],
        why: 'A negative exponent does not make the number negative — it flips it into a fraction.'
      }
    ]
  },

  /* ═══════════════════════ GROWTH & DECAY ═══════════════════════ */
  {
    id: 'w1-decay',
    title: 'Exponential Growth & Decay',
    emoji: '🔋',
    summary: 'Using powers when something rises or falls by the same percentage every period.',
    notes: [
      {
        heading: 'The battery problem',
        emoji: '🔋',
        html:
          '<p>The e-bikes in your storeroom arrived <b>fully charged</b>. The batteries self-discharge at roughly ' +
          '<b>5% per month</b>, and they have been sitting for <b>6 months</b>. How much charge is left?</p>' +
          '<p>Losing 5% means <b>95% remains</b> at the end of each month. So each month you multiply by ' +
          '<b>0.95</b> — and doing that six times is exactly what a power is for.</p>' +
          '<div class="math-block">Charge remaining = 100% × (0.95)<sup>6</sup></div>' +
          '<p>Problems where something <b>reduces</b> at a constant rate are called <b>exponential decay</b>. ' +
          'The opposite — something <b>increasing</b> at a constant rate — is <b>exponential growth</b>.</p>'
      },
      {
        heading: 'Finding the multiplier',
        emoji: '🔑',
        html:
          '<p>Everything hinges on getting the multiplier right.</p>' +
          '<div class="keybox">' +
          '<b>Decay</b> at r% per period → multiplier = 1 − <span class="frac"><span>r</span><span>100</span></span><br>' +
          'losing 5% → 1 − 0.05 = <b>0.95</b><br><br>' +
          '<b>Growth</b> at r% per period → multiplier = 1 + <span class="frac"><span>r</span><span>100</span></span><br>' +
          'gaining 5% → 1 + 0.05 = <b>1.05</b></div>' +
          '<p>Then raise the multiplier to the power of <b>how many periods have passed</b>.</p>' +
          '<div class="watchout"><b>Watch out</b> — you multiply by 0.95 <i>repeatedly</i>, you do not subtract 5% ' +
          'six times. Losing 5% of a smaller amount each month is not the same as losing 30% overall.</div>'
      },
      {
        heading: 'Where you will see this again',
        emoji: '🔗',
        html:
          '<p>Exponential growth is everywhere in business: you expect sales to rise a certain percentage each year, ' +
          'and you would want your salary to grow year on year by at least some minimum percentage.</p>' +
          '<p>This is also exactly the shape of the <b>compound interest</b> formula you meet in Week 4:</p>' +
          '<div class="math-block">FV = PV(1 + <span class="math">i</span>)<sup><span class="math">n</span></sup></div>' +
          '<p>Same idea — a multiplier raised to the number of periods. Learn it once here and Week 4 becomes much ' +
          'less frightening.</p>'
      }
    ],
    questions: [
      {
        id: 'w1x1', type: 'mcq', marks: 1,
        prompt: 'A quantity that reduces by the same percentage every period is an example of:',
        options: ['Exponential decay', 'Exponential growth', 'Simple interest', 'A proper fraction'],
        answer: 0,
        solution: [
          { lab: 'Reducing at a set rate', val: 'Exponential decay' },
          { lab: 'Increasing at a set rate', val: 'Exponential growth' },
          { lab: 'Answer', val: 'Exponential decay', final: true }
        ],
        why: 'The battery losing charge in the storeroom is the module\'s example of decay.'
      },
      {
        id: 'w1x2', type: 'numeric', marks: 2,
        prompt: 'A battery loses 4% of its charge each month. What number must you multiply by each month?',
        answer: 0.96, tol: 0.005,
        solution: [
          { lab: 'Losing 4%', val: 'means 96% remains' },
          { lab: 'As a decimal', val: '1 − 0.04' },
          { lab: 'Answer', val: '0.96', final: true }
        ],
        why: 'The multiplier is what is *left*, not what is lost. Multiplying by 0.04 would give you the amount lost instead.'
      },
      {
        id: 'w1x3', type: 'steps', marks: 5,
        scenario: 'A stored battery starts fully charged at 100% and self-discharges at 8% per month for 3 months.',
        prompt: 'Calculate the percentage of charge remaining.',
        steps: [
          {
            q: 'What is the monthly multiplier?',
            answer: 0.92, tol: 0.005,
            explain: 'Losing 8% leaves 92%, so the multiplier is 1 − 0.08 = 0.92.'
          },
          {
            q: 'What power must the multiplier be raised to?',
            answer: 3, tol: 0.01,
            explain: 'Three months have passed, so it is raised to the power of 3.'
          },
          {
            q: 'Calculate the percentage of charge remaining, to two decimal places.',
            suf: '%', answer: 77.87, tol: 0.05,
            explain: '(0.92)³ = 0.778688, so 100% × 0.778688 = 77.87% remains.'
          }
        ],
        solution: [
          { lab: 'Monthly multiplier', val: '1 − 0.08 = 0.92' },
          { lab: 'Number of periods', val: '3 months' },
          { lab: 'Apply', val: '100% × (0.92)³ = 100% × 0.778688' },
          { lab: 'Answer', val: '77.87% remaining', final: true }
        ],
        why: 'Subtracting 8% three times would suggest 76% left. The real answer is higher, because each month\'s 8% is taken from a smaller amount than the month before.'
      },
      {
        id: 'w1x4', type: 'numeric', marks: 4,
        prompt: 'E-Bike SA\'s annual sales are R500 000 and are expected to grow by 6% each year. What will annual sales be after 4 years, to the nearest rand?',
        pre: 'R', answer: 631238, tol: 2,
        solution: [
          { lab: 'Growth multiplier', val: '1 + 0.06 = 1.06' },
          { lab: 'Number of periods', val: '4 years' },
          { lab: 'Apply', val: 'R500 000 × (1.06)⁴ = R500 000 × 1.262477' },
          { lab: 'Answer', val: 'R631 238', final: true }
        ],
        why: 'Growth uses 1 + rate rather than 1 − rate. Notice this is identical in structure to the compound interest formula in Week 4.'
      },
      {
        id: 'w1x5', type: 'mcq', marks: 2,
        prompt: 'Which of the following is an example of <b>exponential growth</b>?',
        options: [
          'Sales increasing by 7% every year',
          'A battery losing 5% of its charge every month',
          'Paying a fixed R500 per month off a loan',
          'Stock reducing by 20 units every week'
        ],
        answer: 0,
        solution: [
          { lab: 'Exponential', val: 'The change is a constant *percentage*, not a constant amount' },
          { lab: 'Growth', val: 'The quantity increases' },
          { lab: 'Answer', val: 'Sales increasing by 7% every year', final: true }
        ],
        why: 'Fixed rand or unit amounts change by the same size every period — that is linear, not exponential. The battery is exponential, but it is decay.'
      }
    ]
  },

  /* ═══════════════════════ REASONABILITY CHECKS ═══════════════════════ */
  {
    id: 'w1-reason',
    title: 'Reasonability Checks',
    emoji: '🧠',
    summary: 'Approximating an answer in your head, so a misplaced decimal point cannot get past you.',
    notes: [
      {
        heading: 'What a reasonability check is for',
        emoji: '🎯',
        html:
          '<p>A calculator does exactly what it is told. If the decimal point goes in the wrong place, it will hand ' +
          'back a confident answer ten times too big and say nothing about it.</p>' +
          '<div class="keybox">A <b>reasonability check</b> is a rough answer worked out with simpler numbers. ' +
          'Compare it to the answer you were given: they should be close. If they are not, something needs ' +
          'investigating.</div>' +
          '<p>You already do the easy half of this — rounding to check an addition. Multiplication and division are ' +
          'where decimals genuinely trip people up, so those are what this topic covers.</p>'
      },
      {
        heading: 'Checking a multiplication',
        emoji: '✖️',
        html:
          '<div class="keybox"><b>1.</b> Round each number to its <b>first non-zero digit</b> from the left.<br>' +
          '<b>2.</b> Multiply the two rounded numbers, ignoring the decimals for now.<br>' +
          '<b>3.</b> Put the decimal point back — count the decimal places in the rounded numbers.</div>' +
          '<div class="worked"><div class="worked-title">Worked example — painting a wall</div>' +
          '<div class="solstep"><div class="solstep-lab">The job</div>' +
          '<div class="solstep-val">A wall 7.4 m long and 3.764 m high. How many square metres?</div></div>' +
          '<div class="solstep"><div class="solstep-lab">The calculator says</div>' +
          '<div class="solstep-val">278.536 m² — which feels like far too much</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Round both</div>' +
          '<div class="solstep-val">7.4 → 7 &nbsp;and&nbsp; 3.764 → 4</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Multiply</div>' +
          '<div class="solstep-val">7 × 4 = 28</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Decimal point</div>' +
          '<div class="solstep-val">Neither rounded number had decimals, so nothing to move</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">So the answer should be near</div>' +
          '<div class="solstep-val">28 m² — not 278.536. Redoing it carefully gives <b>27.8536 m²</b></div></div></div>' +
          '<div class="watchout"><b>That check was worth real money.</b> Ordering paint for 278.536 m² would have ' +
          'bought ten times what the wall needs.</div>'
      },
      {
        heading: 'When the rounded numbers do have decimals',
        emoji: '📍',
        html:
          '<p>Step 3 earns its place as soon as one of the numbers is small.</p>' +
          '<div class="worked"><div class="worked-title">Worked example — 0.089 × 61.18</div>' +
          '<div class="solstep"><div class="solstep-lab">Round both</div>' +
          '<div class="solstep-val">0.089 → 0.09 &nbsp;and&nbsp; 61.18 → 60, which is 6 × 10</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Multiply, decimals ignored</div>' +
          '<div class="solstep-val">9 × 6 × 10 = 54 × 10 = 540</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Put the point back</div>' +
          '<div class="solstep-val">0.09 × 60 has 2 decimal places, so move 2 places into 540</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Approximation</div>' +
          '<div class="solstep-val">5.40</div></div></div>' +
          '<p>The exact answer is <b>5.44502</b> — within one percent of the approximation, which is all a ' +
          'reasonability check is ever asked to be.</p>'
      },
      {
        heading: 'Checking a division',
        emoji: '➗',
        html:
          '<div class="keybox"><b>1.</b> Write the division as a fraction.<br>' +
          '<b>2.</b> Multiply top and bottom by a power of ten, until the <b>bottom</b> has at least one digit to ' +
          'the left of the decimal point.<br>' +
          '<b>3.</b> Round the bottom to its first non-zero digit.<br>' +
          '<b>4.</b> Round the top to something that divides neatly by the new bottom.<br>' +
          '<b>5.</b> Divide.</div>' +
          '<div class="worked"><div class="worked-title">Worked example — filling lubricant bottles</div>' +
          '<div class="solstep"><div class="solstep-lab">The job</div>' +
          '<div class="solstep-val">61.18 litres in the tank, 0.089 litres into each bottle. How many bottles?</div></div>' +
          '<div class="solstep"><div class="solstep-lab">The calculator says</div>' +
          '<div class="solstep-val">687.41 — so about 687 bottles. Is that plausible?</div></div>' +
          '<div class="solstep"><div class="solstep-lab">As a fraction</div>' +
          '<div class="solstep-val">61.18 ÷ 0.089</div></div>' +
          '<div class="solstep"><div class="solstep-lab">× 100 top and bottom</div>' +
          '<div class="solstep-val">6118 ÷ 8.9</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Round the bottom</div>' +
          '<div class="solstep-val">8.9 → 9</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Round the top to suit</div>' +
          '<div class="solstep-val">6118 → 6300, because 9 divides into 63</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Divide</div>' +
          '<div class="solstep-val">6300 ÷ 9 = <b>700</b></div></div></div>' +
          '<p>700 against 687 is thirteen bottles apart, so the original calculation was fine. This time the check ' +
          'confirmed the answer rather than catching a mistake — which is the more common outcome, and still worth ' +
          'the thirty seconds.</p>' +
          '<div class="watchout"><b>A misprint in the notes.</b> Step 2 of this example is printed as ' +
          '"61.81 × 100". It is <b>61.18</b> — the digits are transposed. Their own answer of 687.41 comes from ' +
          '61.18; 61.81 ÷ 0.089 would be 694.49.</div>'
      }
    ],
    questions: [
      {
        id: 'w1rc1', type: 'mcq', marks: 2,
        prompt: 'What is a <b>reasonability check</b>?',
        options: [
          'A rough answer worked out from simpler numbers, to compare against the real one',
          'Working the calculation out a second time on the calculator',
          'Rounding the final answer to a sensible number of decimal places',
          'Checking that the answer has the right units'
        ],
        answer: 0,
        solution: [
          { lab: 'Simplify the numbers', val: 'So the sum can be done in your head' },
          { lab: 'Compare', val: 'The approximation against the answer given' },
          { lab: 'Answer', val: 'A rough answer from simpler numbers', final: true }
        ],
        why: 'Redoing it on the calculator is not a check — the same wrong keystroke usually happens twice. The point of approximating is that it uses a different method.'
      },
      {
        id: 'w1rc2', type: 'numeric', marks: 3,
        prompt: 'Approximate <b>8.6 × 4.13</b> by rounding each number to its first non-zero digit from the left.',
        answer: 36, tol: 0.01,
        solution: [
          { lab: 'Round', val: '8.6 → 9 and 4.13 → 4' },
          { lab: 'Multiply', val: '9 × 4' },
          { lab: 'Answer', val: '36', final: true }
        ],
        why: 'The real answer is 35.518, so the approximation is within half a unit. Its job is not to be exact — it is to tell you whether the figure on your screen is even the right size.'
      },
      {
        id: 'w1rc3', type: 'numeric', marks: 3,
        prompt: 'Now calculate <b>8.6 × 4.13</b> exactly, to three decimal places.',
        answer: 35.518, tol: 0.0005,
        solution: [
          { lab: 'Multiply', val: '8.6 × 4.13' },
          { lab: 'Answer', val: '35.518', final: true }
        ],
        why: 'Against the approximation of 36, this is clearly right. An answer of 355.18 would be ten times too big — the decimal point one place out, which is the easiest mistake to make and the hardest to spot without a check.'
      },
      {
        id: 'w1rc4', type: 'steps', marks: 5,
        scenario: 'You need a quick check on 0.062 × 47.5.',
        prompt: 'Approximate it using the three steps.',
        steps: [
          {
            q: 'Round 0.062 to its first non-zero digit from the left.',
            answer: 0.06, tol: 0.001,
            explain: 'The first non-zero digit is the 6, in the hundredths place. 0.062 rounds to 0.06.'
          },
          {
            q: 'Round 47.5 to its first non-zero digit from the left.',
            answer: 50, tol: 0.5,
            explain: 'The first non-zero digit is the 4, in the tens place. 47.5 rounds up to 50.'
          },
          {
            q: 'Multiply the two rounded numbers. Give the approximation to two decimal places.',
            answer: 3.00, tol: 0.02,
            explain: 'Ignoring decimals: 6 × 5 × 10 = 300. There are 2 decimal places in 0.06 × 50, so move 2 places: 3.00.'
          }
        ],
        solution: [
          { lab: 'Round', val: '0.062 → 0.06, 47.5 → 50' },
          { lab: 'Multiply', val: '6 × 5 × 10 = 300' },
          { lab: 'Replace the point', val: '2 decimal places → 3.00' },
          { lab: 'Approximation', val: '3.00', final: true }
        ],
        why: 'The exact answer is 2.945, so the approximation is out by under two percent. Where a check like this earns its keep is when the screen says 29.45 or 0.2945.'
      },
      {
        id: 'w1rc5', type: 'numeric', marks: 4,
        prompt: 'A drum holds 48.36 litres and each container takes 0.079 litres. Approximate the number of containers, using the five steps.',
        answer: 600, tol: 1,
        solution: [
          { lab: 'As a fraction', val: '48.36 ÷ 0.079' },
          { lab: '× 100 top and bottom', val: '4836 ÷ 7.9' },
          { lab: 'Round the bottom', val: '7.9 → 8' },
          { lab: 'Round the top to suit', val: '4836 → 4800, since 8 divides 48' },
          { lab: 'Answer', val: '4800 ÷ 8 = 600 containers', final: true }
        ],
        why: 'The exact answer is 612.15, so 612 whole containers. Twelve apart from the approximation, which confirms the calculation rather than catching an error — the more usual outcome, and still worth the thirty seconds.'
      },
      {
        id: 'w1rc6', type: 'mcq', marks: 2,
        prompt: 'Why do you multiply top and bottom by a power of ten before approximating a division?',
        options: [
          'To get at least one digit to the left of the decimal point in the bottom, so it can be rounded sensibly',
          'To make the answer bigger and easier to read',
          'Because dividing by a decimal is not allowed',
          'To remove the decimal from the top of the fraction'
        ],
        answer: 0,
        solution: [
          { lab: 'A denominator like 0.089', val: 'Has nothing to the left of the point to round to' },
          { lab: '× 100', val: 'Makes it 8.9, which rounds cleanly to 9' },
          { lab: 'Answer', val: 'So the bottom can be rounded sensibly', final: true }
        ],
        why: 'Multiplying top and bottom by the same number leaves the fraction unchanged, so nothing is lost. It just moves the numbers somewhere the rounding rule works.'
      },
      {
        id: 'w1rc7', type: 'mcq', marks: 2,
        prompt: 'Your approximation is 45 and the calculator says 4 512.8. What has most likely happened?',
        options: [
          'The decimal point is two places out',
          'The approximation was rounded the wrong way',
          'The calculator has rounded its answer',
          'Nothing — an approximation can be that far out'
        ],
        answer: 0,
        solution: [
          { lab: 'The two differ by', val: 'A factor of very nearly a hundred' },
          { lab: 'A factor of a hundred', val: 'Is two decimal places' },
          { lab: 'Answer', val: 'The point is two places out', final: true }
        ],
        why: 'An approximation should land within a few percent. Out by a factor of ten, a hundred, a thousand — that is always a decimal point, not rounding.'
      }
    ]
  }

  ]
});
