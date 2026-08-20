/* Week 3 — Statistics and probability
   Every figure below was worked out independently and checked against the Week 3
   lecture notes. Where the notes contain a typo, the corrected version is used. */

window.WEEK_DATA = window.WEEK_DATA || [];

window.WEEK_DATA.push({
  id: 'week3',
  number: 3,
  title: 'Statistics & Probability',
  emoji: '📊',
  accent: 3,
  blurb: 'Averages, spread, skewness, probability laws and expected values.',
  topics: [

  /* ═══════════════════════ MEAN ═══════════════════════ */
  {
    id: 'w3-mean',
    title: 'The Mean',
    emoji: '⚖️',
    summary: 'The everyday "average" — add them all up and share out equally.',
    notes: [
      {
        heading: 'What the mean really is',
        emoji: '💡',
        html:
          '<p>How would you know if your sales for a month were good or bad? You would compare them to the ' +
          '<b>average</b>. Most people understand average as adding up all the values and dividing by how many ' +
          'there are. In statistics that is the <b>arithmetic mean</b>.</p>' +
          '<p>Think of it as <b>total shared out equally</b>. If six weeks of takings were pooled together and split ' +
          'evenly, the mean is what each week would get.</p>' +
          '<div class="keybox"><b>Mean of ungrouped data</b><br>' +
          '<span class="math">x̄</span> = <span class="frac"><span>Σx</span><span>n</span></span><br><br>' +
          '<span class="math">x̄</span> is the sample mean &nbsp;•&nbsp; Σ (sigma) means "add them all up" &nbsp;•&nbsp; ' +
          '<span class="math">x</span> is each individual value &nbsp;•&nbsp; <span class="math">n</span> is how many values there are</div>'
      },
      {
        heading: 'Worked example — the shopkeeper\'s takings',
        emoji: '🏪',
        html:
          '<p>A shopkeeper wants to sell his shop and records the weekly takings for the past six weeks:</p>' +
          '<div class="dataset"><span>R11 200</span><span>R9 900</span><span>R10 400</span>' +
          '<span>R10 300</span><span>R11 050</span><span>R10 150</span></div>' +
          '<div class="worked"><div class="worked-title">Finding the mean</div>' +
          '<div class="solstep"><div class="solstep-lab">Add them all up (Σx)</div>' +
          '<div class="solstep-val">11 200 + 9 900 + 10 400 + 10 300 + 11 050 + 10 150 = 63 000</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Count them (n)</div><div class="solstep-val">6 weeks</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Divide</div>' +
          '<div class="solstep-val">63 000 ÷ 6</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Mean weekly takings</div>' +
          '<div class="solstep-val">R10 500</div></div></div>'
      },
      {
        heading: 'Grouped data — when you only have a table',
        emoji: '📋',
        html:
          '<p>Sometimes the data is already grouped into class intervals and you never see the individual values. ' +
          'You then <b>estimate</b> the mean using the <b>midpoint</b> of each class as a stand-in for everything in it.</p>' +
          '<div class="keybox"><b>Mean of grouped data</b><br>' +
          '<span class="math">x̄</span> = <span class="frac"><span>Σ(f × x)</span><span>Σf</span></span> ' +
          '&nbsp;&nbsp;where <span class="math">x</span> is the class midpoint and <span class="math">f</span> is the frequency</div>' +
          '<p><b>Finding a midpoint:</b> add the lower and upper class limits and divide by 2. ' +
          'For the class 350–under 360 the midpoint is (350 + 360) ÷ 2 = <b>355</b>.</p>' +
          '<div class="tablewrap"><table class="dtable">' +
          '<tr><th>Output of Q (kg)</th><th>Midpoint (x)</th><th>Days (f)</th><th>f × x</th></tr>' +
          '<tr><td>350 – under 360</td><td>355</td><td>4</td><td>1 420</td></tr>' +
          '<tr><td>360 – 370</td><td>365</td><td>6</td><td>2 190</td></tr>' +
          '<tr><td>370 – 380</td><td>375</td><td>5</td><td>1 875</td></tr>' +
          '<tr><td>380 – 390</td><td>385</td><td>4</td><td>1 540</td></tr>' +
          '<tr><td>390 – 400</td><td>395</td><td>3</td><td>1 185</td></tr>' +
          '<tr><td><b>Total</b></td><td></td><td><b>22</b></td><td><b>8 210</b></td></tr>' +
          '</table></div>' +
          '<div class="math-block">Mean = 8 210 ÷ 22 = 373.18 kg</div>'
      },
      {
        heading: 'Strengths and weaknesses',
        emoji: '⚖️',
        html:
          '<p><b>Advantages:</b> easy to calculate, widely understood, uses every data point, and suits further ' +
          'statistical analysis.</p>' +
          '<p><b>Disadvantages:</b> it gets dragged badly by extremely high or low values (outliers), and the ' +
          'answer may not be a realistic value — a mean of 3.7 bikes sold is not a thing that can happen.</p>'
      }
    ],
    questions: [
      {
        id: 'w3mn1', type: 'numeric', marks: 2,
        prompt: 'E-Bike SA records the number of bikes hired over six days: 14, 9, 12, 15, 11, 13. Calculate the mean, to two decimal places.',
        answer: 12.33, tol: 0.02,
        solution: [
          { lab: 'Add them up (Σx)', val: '14 + 9 + 12 + 15 + 11 + 13 = 74' },
          { lab: 'Count them (n)', val: '6' },
          { lab: 'Divide', val: '74 ÷ 6 = 12.333…' },
          { lab: 'Answer', val: '12.33 bikes', final: true }
        ],
        why: 'Sum, then divide by how many. Note the mean is not a whole number — that is normal, even though you cannot hire a third of a bike.'
      },
      {
        id: 'w3mn2', type: 'mcq', marks: 1,
        prompt: 'Which formula is used to calculate the mean of <b>ungrouped</b> data?',
        options: [
          '<span class="math">x̄</span> = <span class="frac"><span>Σx</span><span>n</span></span>',
          '<span class="math">x̄</span> = <span class="frac"><span>Σ(f × x)</span><span>Σf</span></span>',
          '<span class="frac"><span>n + 1</span><span>2</span></span>',
          '<span class="frac"><span>Σ(x − x̄)²</span><span>n − 1</span></span>'
        ],
        answer: 0,
        solution: [
          { lab: 'Σ(f × x) ÷ Σf is', val: 'the grouped-data mean (it uses frequencies)' },
          { lab: '(n + 1) ÷ 2 is', val: 'the median position formula' },
          { lab: 'Σ(x − x̄)² ÷ (n − 1) is', val: 'the sample variance formula' },
          { lab: 'Answer', val: 'Σx ÷ n', final: true }
        ],
        why: 'For ungrouped data you have every individual value, so you just add them and divide by the count.'
      },
      {
        id: 'w3mn3', type: 'numeric', marks: 4,
        scenario:
          'The output levels of product Q were recorded as follows:' +
          '<div class="tablewrap"><table class="dtable"><tr><th>Output (kg)</th><th>Number of days</th></tr>' +
          '<tr><td>100 – under 110</td><td>3</td></tr><tr><td>110 – 120</td><td>7</td></tr>' +
          '<tr><td>120 – 130</td><td>6</td></tr><tr><td>130 – 140</td><td>4</td></tr></table></div>',
        prompt: 'Calculate the mean output.',
        suf: 'kg', answer: 120.5, tol: 0.05,
        solution: [
          { lab: 'Midpoints', val: '105, 115, 125, 135' },
          { lab: 'f × x', val: '(105×3) + (115×7) + (125×6) + (135×4)' },
          { lab: 'Σfx', val: '315 + 805 + 750 + 540 = 2 410' },
          { lab: 'Σf', val: '3 + 7 + 6 + 4 = 20' },
          { lab: 'Answer', val: '2 410 ÷ 20 = 120.5 kg', final: true }
        ],
        why: 'With grouped data you never see the individual outputs, so each class midpoint represents everything in that class.'
      },
      {
        id: 'w3mn4', type: 'steps', marks: 4,
        scenario: 'A workshop\'s monthly service revenue for six months was: R8 400, R9 150, R7 900, R8 650, R9 300, R8 200.',
        prompt: 'Calculate the mean monthly revenue.',
        steps: [
          {
            q: 'First, find Σx — the sum of all the values.',
            pre: 'R', answer: 51600, tol: 1,
            explain: '8 400 + 9 150 + 7 900 + 8 650 + 9 300 + 8 200 = 51 600.'
          },
          {
            q: 'What is n, the number of values?',
            answer: 6, tol: 0.01,
            explain: 'Six months of revenue were recorded.'
          },
          {
            q: 'Now calculate the mean.',
            pre: 'R', answer: 8600, tol: 1,
            explain: 'R51 600 ÷ 6 = R8 600.'
          }
        ],
        solution: [
          { lab: 'Formula', val: 'x̄ = Σx ÷ n' },
          { lab: 'Σx', val: 'R51 600' },
          { lab: 'n', val: '6' },
          { lab: 'Mean monthly revenue', val: 'R8 600', final: true }
        ],
        why: 'A manager would want this figure to judge what a typical month looks like before committing to costs.'
      },
      {
        id: 'w3mn5', type: 'mcq', marks: 2,
        prompt: 'Which of the following is a <b>disadvantage</b> of using the mean?',
        options: [
          'It can be heavily distorted by extreme values (outliers)',
          'It ignores most of the data',
          'It cannot be used for further statistical analysis',
          'It can only be used with non-numeric data'
        ],
        answer: 0,
        solution: [
          { lab: 'The mean uses every value', val: 'So one very large value pulls it upward' },
          { lab: 'Example', val: 'Shop B: a single R21 150 week lifts the whole mean' },
          { lab: 'Answer', val: 'Distorted by outliers', final: true }
        ],
        why: 'Ignoring most of the data is a criticism of the mode and median, not the mean. The mean\'s weakness is the opposite — it feels every value, including the freakish ones.'
      }
    ]
  },

  /* ═══════════════════════ MEDIAN ═══════════════════════ */
  {
    id: 'w3-median',
    title: 'The Median',
    emoji: '🎯',
    summary: 'The value sitting exactly in the middle once everything is in order.',
    notes: [
      {
        heading: 'The middle value',
        emoji: '💡',
        html:
          '<p>The <b>median</b> is the value that sits exactly in the middle of a dataset <b>after it has been ' +
          'arranged in order</b>. Half the values are below it and half are above it.</p>' +
          '<div class="watchout"><b>Sort first, always.</b> The single most common mistake is finding the middle of ' +
          'the list as it was given to you, rather than sorting it into ascending order first.</div>' +
          '<div class="keybox"><b>Median position</b><br>' +
          'Position = <span class="frac"><span>n + 1</span><span>2</span></span></div>' +
          '<p>Notice this gives you a <b>position</b>, not the answer. You then go and look up the value sitting at ' +
          'that position.</p>'
      },
      {
        heading: 'Odd and even numbers of values',
        emoji: '🔢',
        html:
          '<p><b>Odd number of values</b> — the position formula lands on a whole number, and the median is simply the ' +
          'value in that position.</p>' +
          '<div class="worked"><div class="worked-title">Example: 18, 25, 27, 43, 52 (n = 5)</div>' +
          '<div class="solstep"><div class="solstep-lab">Position</div>' +
          '<div class="solstep-val">(5 + 1) ÷ 2 = 3</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Median</div>' +
          '<div class="solstep-val">The 3rd value = 27</div></div></div>' +
          '<p><b>Even number of values</b> — the position lands halfway between two values, so you average the two ' +
          'either side of it.</p>' +
          '<div class="worked"><div class="worked-title">Example: the shopkeeper\'s six weeks</div>' +
          '<div class="solstep"><div class="solstep-lab">Sorted</div>' +
          '<div class="solstep-val">9 900 · 10 150 · 10 300 · 10 400 · 11 050 · 11 200</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Position</div>' +
          '<div class="solstep-val">(6 + 1) ÷ 2 = 3.5</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Average the 3rd and 4th</div>' +
          '<div class="solstep-val">(10 300 + 10 400) ÷ 2</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Median</div>' +
          '<div class="solstep-val">R10 350</div></div></div>' +
          '<p>Note the mean for that same data was R10 500. The mean was pulled up by the two high weeks; a buyer ' +
          'might find the median more representative of a typical week.</p>'
      },
      {
        heading: 'Median from a frequency distribution',
        emoji: '📋',
        html:
          '<p>When data comes as a frequency table, use <b>cumulative frequencies</b> to find which value the median ' +
          'position lands in. The cumulative frequency is a running total.</p>' +
          '<div class="tablewrap"><table class="dtable">' +
          '<tr><th>Employees absent</th><th>Days (f)</th><th>Cumulative frequency</th></tr>' +
          '<tr><td>2</td><td>2</td><td>2</td></tr>' +
          '<tr><td>3</td><td>4</td><td>6</td></tr>' +
          '<tr><td>4</td><td>3</td><td>9</td></tr>' +
          '<tr><td>5</td><td>4</td><td>13</td></tr>' +
          '<tr><td>6</td><td>3</td><td>16</td></tr>' +
          '<tr><td>7</td><td>3</td><td>19</td></tr>' +
          '<tr><td>8</td><td>3</td><td>22</td></tr>' +
          '</table></div>' +
          '<p>Total frequency n = 22, so the median position is (22 + 1) ÷ 2 = <b>11.5</b> — we need the values at ' +
          'positions 11 and 12.</p>' +
          '<p>Reading the cumulative column: observations up to 9 have a value of 4, and observations 10 to 13 have a ' +
          'value of 5. So both the 11th and 12th observations are 5.</p>' +
          '<div class="math-block">Median = 5 absences</div>'
      },
      {
        heading: 'Strengths and weaknesses',
        emoji: '⚖️',
        html:
          '<p><b>Advantages:</b> easy to understand, completely unaffected by extreme values, and represents an actual ' +
          'central value.</p>' +
          '<p><b>Disadvantages:</b> it ignores most of the data, requires sorting first, and is less useful for further ' +
          'statistical analysis.</p>'
      }
    ],
    questions: [
      {
        id: 'w3md1', type: 'numeric', marks: 2,
        prompt: 'Find the median of the following data: 22, 31, 35, 47, 58.',
        answer: 35, tol: 0.01,
        solution: [
          { lab: 'Already in order', val: '22, 31, 35, 47, 58 (n = 5)' },
          { lab: 'Median position', val: '(5 + 1) ÷ 2 = 3' },
          { lab: 'Answer', val: 'The 3rd value = 35', final: true }
        ],
        why: 'With an odd number of values the position formula gives a whole number, so the median is simply that value.'
      },
      {
        id: 'w3md2', type: 'numeric', marks: 3,
        prompt: 'The time taken (in minutes) to complete six e-bike services was: 12, 7, 9, 15, 10, 8. Calculate the median.',
        answer: 9.5, tol: 0.01,
        solution: [
          { lab: 'Sort ascending', val: '7, 8, 9, 10, 12, 15' },
          { lab: 'Median position', val: '(6 + 1) ÷ 2 = 3.5' },
          { lab: 'Average the 3rd and 4th', val: '(9 + 10) ÷ 2' },
          { lab: 'Answer', val: '9.5 minutes', final: true }
        ],
        why: 'The unsorted list would have given you 9 and 15 in the middle — completely wrong. Sorting is not optional.'
      },
      {
        id: 'w3md3', type: 'steps', marks: 4,
        prompt: 'Calculate the median of: 4, 11, 6, 3, 9, 7, 5, 8.',
        steps: [
          {
            q: 'How many values are there (n)?',
            answer: 8, tol: 0.01,
            explain: 'Count them: 4, 11, 6, 3, 9, 7, 5, 8 — that is 8 values.'
          },
          {
            q: 'Calculate the median position using (n + 1) ÷ 2.',
            answer: 4.5, tol: 0.01,
            explain: '(8 + 1) ÷ 2 = 4.5, so the median falls between the 4th and 5th values.'
          },
          {
            q: 'Now sort the data and find the median.',
            answer: 6.5, tol: 0.01,
            explain: 'Sorted: 3, 4, 5, 6, 7, 8, 9, 11. The 4th value is 6 and the 5th is 7, so the median is (6 + 7) ÷ 2 = 6.5.'
          }
        ],
        solution: [
          { lab: 'Sorted', val: '3, 4, 5, 6, 7, 8, 9, 11' },
          { lab: 'n', val: '8' },
          { lab: 'Position', val: '(8 + 1) ÷ 2 = 4.5' },
          { lab: 'Average 4th and 5th', val: '(6 + 7) ÷ 2' },
          { lab: 'Answer', val: '6.5', final: true }
        ],
        why: 'A position of 4.5 means "halfway between the 4th and 5th", so you take the average of those two values.'
      },
      {
        id: 'w3md4', type: 'mcq', marks: 3,
        scenario:
          'The number of bikes serviced per day was recorded as follows:' +
          '<div class="tablewrap"><table class="dtable"><tr><th>Bikes serviced</th><th>Days (f)</th><th>Cumulative</th></tr>' +
          '<tr><td>1</td><td>3</td><td>3</td></tr><tr><td>2</td><td>5</td><td>8</td></tr>' +
          '<tr><td>3</td><td>6</td><td>14</td></tr><tr><td>4</td><td>4</td><td>18</td></tr>' +
          '<tr><td>5</td><td>2</td><td>20</td></tr></table></div>',
        prompt: 'What is the median number of bikes serviced per day?',
        options: ['3', '2', '10.5', '4'],
        answer: 0,
        solution: [
          { lab: 'Total frequency', val: 'n = 20' },
          { lab: 'Median position', val: '(20 + 1) ÷ 2 = 10.5' },
          { lab: 'Read the cumulative column', val: 'Observations 9–14 all have the value 3' },
          { lab: 'So positions 10 and 11', val: 'Are both 3' },
          { lab: 'Answer', val: 'Median = 3 bikes', final: true }
        ],
        why: '11.5 is the position, not the answer. You have to look up which value sits at that position using the cumulative frequency.'
      },
      {
        id: 'w3md5', type: 'mcq', marks: 2,
        prompt: 'For which type of data is the median usually a better choice than the mean?',
        options: [
          'Skewed data, or data containing outliers',
          'Perfectly symmetrical data',
          'Non-numeric data such as bike colours',
          'Data with no repeated values'
        ],
        answer: 0,
        solution: [
          { lab: 'The median', val: 'Only cares about position, not size' },
          { lab: 'So an extreme value', val: 'Cannot drag it up or down' },
          { lab: 'Answer', val: 'Skewed data or data with outliers', final: true }
        ],
        why: 'Non-numeric data is the mode\'s territory. For symmetrical data the mean, median and mode are all much the same anyway.'
      }
    ]
  },

  /* ═══════════════════════ MODE ═══════════════════════ */
  {
    id: 'w3-mode',
    title: 'The Mode',
    emoji: '🔁',
    summary: 'The value that appears most often — the most popular answer.',
    notes: [
      {
        heading: 'The most common value',
        emoji: '💡',
        html:
          '<p>Think about E-Bike SA deciding which colour e-bikes to stock. They look at every bike sold so far and ' +
          'find which colour sold the most. That colour is the <b>mode</b>.</p>' +
          '<p>The mode is simply the value that appears <b>most often</b> in a dataset.</p>' +
          '<ul class="tickly">' +
          '<li>A dataset can have <b>more than one mode</b> (bimodal, trimodal) if several values tie for the highest frequency.</li>' +
          '<li>If every value appears only once, there is <b>no mode</b>.</li>' +
          '</ul>' +
          '<p>The mode is the only average that works with <b>non-numeric</b> data — you cannot take the mean of a colour.</p>'
      },
      {
        heading: 'The modal class in grouped data',
        emoji: '📋',
        html:
          '<p>With grouped data you first find the <b>modal class</b> — the class interval with the highest frequency.</p>' +
          '<div class="tablewrap"><table class="dtable">' +
          '<tr><th>Weekly wage (R)</th><th>Employees</th></tr>' +
          '<tr><td>1 800 – under 1 850</td><td>41</td></tr>' +
          '<tr><td>1 850 – 1 900</td><td>57 ← highest</td></tr>' +
          '<tr><td>1 900 – 1 950</td><td>27</td></tr>' +
          '<tr><td>1 950 – 2 000</td><td>23</td></tr>' +
          '<tr><td>2 000 – 2 050</td><td>15</td></tr>' +
          '<tr><td>2 050 – 2 100</td><td>7</td></tr>' +
          '</table></div>' +
          '<p>The modal class is <b>R1 850 – R1 900</b>, with 57 employees.</p>'
      },
      {
        heading: 'The grouped mode formula',
        emoji: '🧮',
        html:
          '<p>The modal class gives you a range. To pin down a single value inside it, use the formula:</p>' +
          '<div class="keybox"><b>Mode</b> = L + <span class="frac"><span>f₁ − f₀</span><span>2f₁ − f₀ − f₂</span></span> × h<br><br>' +
          '<b>L</b> = lower limit of the modal class<br>' +
          '<b>h</b> = size of the class interval<br>' +
          '<b>f₁</b> = frequency of the modal class<br>' +
          '<b>f₀</b> = frequency of the class <i>before</i> the modal class<br>' +
          '<b>f₂</b> = frequency of the class <i>after</i> the modal class</div>' +
          '<div class="worked"><div class="worked-title">Worked example — the weekly wages</div>' +
          '<div class="solstep"><div class="solstep-lab">Values</div>' +
          '<div class="solstep-val">L = 1 850 &nbsp; f₁ = 57 &nbsp; f₀ = 41 &nbsp; f₂ = 27 &nbsp; h = 50</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Substitute</div>' +
          '<div class="solstep-val">1 850 + [(57 − 41) ÷ (2(57) − 41 − 27)] × 50</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Simplify the bracket</div>' +
          '<div class="solstep-val">1 850 + (16 ÷ (114 − 41 − 27)) × 50 = 1 850 + (16 ÷ 46) × 50</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Calculate</div>' +
          '<div class="solstep-val">1 850 + 17.39</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Mode</div>' +
          '<div class="solstep-val">R1 867.39</div></div></div>' +
          '<p>This is the single wage that occurs most frequently across all the employees.</p>'
      },
      {
        heading: 'Strengths and weaknesses',
        emoji: '⚖️',
        html:
          '<p><b>Advantages:</b> easy to find, not affected by extreme values, works with non-numeric data, and it is ' +
          'an actual value from the dataset.</p>' +
          '<p><b>Disadvantages:</b> ignores most of the data, may not be representative if the most frequent value is ' +
          'extreme, there can be several modes or none, and it is unstable — a little new data can move it a lot.</p>'
      }
    ],
    questions: [
      {
        id: 'w3mo1', type: 'mcq', marks: 1,
        prompt: 'What is the mode of the following data: 3, 7, 4, 7, 2, 7, 5?',
        options: ['7', '3', '5', 'There is no mode'],
        answer: 0,
        solution: [
          { lab: 'Count each value', val: '7 appears three times; every other value appears once' },
          { lab: 'Answer', val: 'Mode = 7', final: true }
        ],
        why: 'The mode is about frequency, not size. It does not matter that 7 is a large value — what matters is that it repeats most.'
      },
      {
        id: 'w3mo2', type: 'mcq', marks: 2,
        scenario:
          '<div class="tablewrap"><table class="dtable"><tr><th>Daily takings (R)</th><th>Number of days</th></tr>' +
          '<tr><td>1 200 – under 1 300</td><td>6</td></tr><tr><td>1 300 – 1 400</td><td>14</td></tr>' +
          '<tr><td>1 400 – 1 500</td><td>9</td></tr><tr><td>1 500 – 1 600</td><td>4</td></tr></table></div>',
        prompt: 'Which is the modal class?',
        options: ['R1 300 – R1 400', 'R1 200 – under R1 300', 'R1 400 – R1 500', '14'],
        answer: 0,
        solution: [
          { lab: 'Modal class', val: 'The class interval with the highest frequency' },
          { lab: 'Highest frequency', val: '14 days' },
          { lab: 'Answer', val: 'R1 300 – R1 400', final: true }
        ],
        why: '14 is the frequency, not the class. The question asks which class, so your answer must be a range.'
      },
      {
        id: 'w3mo3', type: 'numeric', marks: 4,
        scenario:
          'For the daily takings distribution: modal class R1 300 – R1 400 with 14 days. ' +
          'The preceding class has 6 days and the following class has 9. The class interval size is R100.',
        prompt: 'Calculate the mode using the grouped mode formula, to two decimal places.',
        pre: 'R', answer: 1361.54, tol: 0.05,
        solution: [
          { lab: 'Formula', val: 'Mode = L + [(f₁ − f₀) ÷ (2f₁ − f₀ − f₂)] × h' },
          { lab: 'Values', val: 'L = 1 300, f₁ = 14, f₀ = 6, f₂ = 9, h = 100' },
          { lab: 'Numerator', val: '14 − 6 = 8' },
          { lab: 'Denominator', val: '2(14) − 6 − 9 = 28 − 15 = 13' },
          { lab: 'Substitute', val: '1 300 + (8 ÷ 13) × 100 = 1 300 + 61.54' },
          { lab: 'Answer', val: 'R1 361.54', final: true }
        ],
        why: 'The formula nudges you from the bottom of the modal class toward whichever neighbouring class is busier. Here the class above (9) is busier than the class below (6), so the mode sits past the middle of the interval.'
      },
      {
        id: 'w3mo4', type: 'numeric', marks: 4,
        scenario:
          '<div class="tablewrap"><table class="dtable"><tr><th>Class</th><th>Frequency</th></tr>' +
          '<tr><td>20 – 30</td><td>5</td></tr><tr><td>30 – 40</td><td>18</td></tr>' +
          '<tr><td>40 – 50</td><td>11</td></tr><tr><td>50 – 60</td><td>3</td></tr></table></div>',
        prompt: 'Calculate the mode of this grouped distribution.',
        answer: 36.5, tol: 0.05,
        solution: [
          { lab: 'Modal class', val: '30 – 40 (highest frequency, 18)' },
          { lab: 'Values', val: 'L = 30, f₁ = 18, f₀ = 5, f₂ = 11, h = 10' },
          { lab: 'Numerator', val: '18 − 5 = 13' },
          { lab: 'Denominator', val: '2(18) − 5 − 11 = 36 − 16 = 20' },
          { lab: 'Substitute', val: '30 + (13 ÷ 20) × 10 = 30 + 6.5' },
          { lab: 'Answer', val: '36.5', final: true }
        ],
        why: 'Identify the modal class first, then read off the frequency directly before it (f₀) and directly after it (f₂). Getting those two the wrong way round is the usual slip.'
      },
      {
        id: 'w3mo5', type: 'mcq', marks: 1,
        prompt: 'A dataset where every value appears exactly once has:',
        options: ['No mode', 'A mode equal to the mean', 'One mode', 'As many modes as there are values'],
        answer: 0,
        solution: [
          { lab: 'The mode', val: 'Is the value appearing most often' },
          { lab: 'If nothing repeats', val: 'No value appears more often than any other' },
          { lab: 'Answer', val: 'There is no mode', final: true }
        ],
        why: 'This is one of the mode\'s real weaknesses — sometimes it simply does not exist, whereas a mean and a median always do.'
      }
    ]
  },

  /* ═══════════════════════ RANGE, QUARTILES, IQR ═══════════════════════ */
  {
    id: 'w3-spread',
    title: 'Range, Quartiles & IQR',
    emoji: '📏',
    summary: 'Measuring how spread out the data is, not just where its centre sits.',
    notes: [
      {
        heading: 'Why the average is not enough',
        emoji: '🔋',
        html:
          '<p>A battery supplier tells you their battery lasts "approximately 5 hours of riding". On investigation you ' +
          'find it actually lasts anything from <b>30 minutes to 9.5 hours</b> depending on heat, speed and rider weight.</p>' +
          '<p>The average was true, and completely useless. You needed to know the <b>spread</b>.</p>' +
          '<div class="keybox"><b>Range</b> = Maximum value − Minimum value</div>' +
          '<p><b>Properties of the range:</b> easy to calculate and understand, but highly affected by outliers, it only ' +
          'looks at two values and ignores everything in between, and it is generally not suitable for further analysis.</p>'
      },
      {
        heading: 'Quartiles — cutting the data into four',
        emoji: '🍰',
        html:
          '<p><b>Quartiles</b> divide an ordered dataset into four equal parts. Think of them as milestones along the data.</p>' +
          '<ul class="tickly">' +
          '<li><b>Lower quartile (Q1)</b> — 25% of the data lies below it. The median of the lower half.</li>' +
          '<li><b>Middle quartile (Q2)</b> — this is simply the <b>median</b>. 50% lies below it.</li>' +
          '<li><b>Upper quartile (Q3)</b> — 75% of the data lies below it. The median of the upper half.</li>' +
          '</ul>' +
          '<div class="keybox"><b>Quartile positions</b><br>' +
          'Q1 position = <span class="frac"><span>1</span><span>4</span></span>(n + 1)<br>' +
          'Q2 position = <span class="frac"><span>1</span><span>2</span></span>(n + 1)<br>' +
          'Q3 position = <span class="frac"><span>3</span><span>4</span></span>(n + 1)</div>' +
          '<div class="watchout"><b>Important rule</b> — if a position is <b>not</b> a whole number (e.g. 2.5, 3.25, 5.75), ' +
          'the quartile is the <b>average of the values immediately below and above it</b>. If the position <i>is</i> a whole ' +
          'number, the quartile is simply the value at that position.</div>'
      },
      {
        heading: 'Interquartile range',
        emoji: '📐',
        html:
          '<p>The <b>IQR</b> measures the spread of the <b>middle 50%</b> of the data. Because it throws away the top ' +
          'and bottom quarters, it is far less sensitive to outliers than the range.</p>' +
          '<div class="keybox"><b>IQR = Q3 − Q1</b></div>' +
          '<div class="worked"><div class="worked-title">Worked example — dataset 1, 4, 11, 7, 8, 6</div>' +
          '<div class="solstep"><div class="solstep-lab">1. Order it</div>' +
          '<div class="solstep-val">1, 4, 6, 7, 8, 11 &nbsp;(n = 6)</div></div>' +
          '<div class="solstep"><div class="solstep-lab">2. Q2 position</div>' +
          '<div class="solstep-val">(6 + 1) ÷ 2 = 3.5 → (6 + 7) ÷ 2 = <b>6.5</b></div></div>' +
          '<div class="solstep"><div class="solstep-lab">3. Q1 position</div>' +
          '<div class="solstep-val">¼(6 + 1) = 1.75 → between the 1st (1) and 2nd (4) → (1 + 4) ÷ 2 = <b>2.5</b></div></div>' +
          '<div class="solstep"><div class="solstep-lab">4. Q3 position</div>' +
          '<div class="solstep-val">¾(6 + 1) = 5.25 → between the 5th (8) and 6th (11) → (8 + 11) ÷ 2 = <b>9.5</b></div></div>' +
          '<div class="solstep final"><div class="solstep-lab">5. IQR</div>' +
          '<div class="solstep-val">9.5 − 2.5 = 7</div></div></div>' +
          '<p>The middle half of this data spans a range of 7 units.</p>'
      }
    ],
    questions: [
      {
        id: 'w3sp1', type: 'numeric', marks: 2,
        prompt: 'Calculate the range of the following data: 5, 2, 16, 9, 13, 7, 10.',
        answer: 14, tol: 0.01,
        solution: [
          { lab: 'Maximum', val: '16' },
          { lab: 'Minimum', val: '2' },
          { lab: 'Range', val: '16 − 2' },
          { lab: 'Answer', val: '14', final: true }
        ],
        why: 'The range only ever needs two numbers — the biggest and the smallest. Everything in between is ignored.'
      },
      {
        id: 'w3sp2', type: 'steps', marks: 6,
        scenario:
          'The time taken (in minutes) by customers to complete an online booking request on the E-bike website:' +
          '<div class="dataset"><span>2</span><span>3</span><span>4</span><span>3</span><span>3</span><span>4</span>' +
          '<span>3</span><span>2</span><span>7</span><span>9</span><span>11</span><span>1</span></div>',
        prompt: 'Calculate the interquartile range.',
        steps: [
          {
            q: 'Calculate the position of Q1 using ¼(n + 1). There are 12 values.',
            answer: 3.25, tol: 0.01,
            explain: '¼ × (12 + 1) = ¼ × 13 = 3.25. Not a whole number, so we will average two values.'
          },
          {
            q: 'Sort the data, then find the value of Q1.',
            answer: 2.5, tol: 0.01,
            explain: 'Sorted: 1, 2, 2, 3, 3, 3, 3, 4, 4, 7, 9, 11. Position 3.25 sits between the 3rd value (2) and the 4th value (3), so Q1 = (2 + 3) ÷ 2 = 2.5.'
          },
          {
            q: 'Calculate the position of Q3 using ¾(n + 1), then find its value.',
            answer: 5.5, tol: 0.01,
            explain: '¾ × 13 = 9.75, which sits between the 9th value (4) and the 10th value (7). So Q3 = (4 + 7) ÷ 2 = 5.5.'
          },
          {
            q: 'Now calculate the IQR.',
            answer: 3, tol: 0.01,
            explain: 'IQR = Q3 − Q1 = 5.5 − 2.5 = 3 minutes.'
          }
        ],
        solution: [
          { lab: 'Sorted data', val: '1, 2, 2, 3, 3, 3, 3, 4, 4, 7, 9, 11 (n = 12)' },
          { lab: 'Q1 position', val: '¼(13) = 3.25 → between 3rd (2) and 4th (3)' },
          { lab: 'Q1', val: '(2 + 3) ÷ 2 = 2.5' },
          { lab: 'Q3 position', val: '¾(13) = 9.75 → between 9th (4) and 10th (7)' },
          { lab: 'Q3', val: '(4 + 7) ÷ 2 = 5.5' },
          { lab: 'IQR', val: '5.5 − 2.5 = 3 minutes', final: true }
        ],
        why: 'Notice how the IQR of 3 ignores the extreme 11-minute booking entirely, while the range for this data would be 10. That is exactly why the IQR is preferred when there are outliers.'
      },
      {
        id: 'w3sp3', type: 'numeric', marks: 5,
        prompt: 'Calculate the interquartile range of the dataset: 14, 9, 21, 12, 17, 11.',
        answer: 9, tol: 0.01,
        solution: [
          { lab: 'Order the data', val: '9, 11, 12, 14, 17, 21 (n = 6)' },
          { lab: 'Q1 position', val: '¼(7) = 1.75 → between 1st (9) and 2nd (11)' },
          { lab: 'Q1', val: '(9 + 11) ÷ 2 = 10' },
          { lab: 'Q3 position', val: '¾(7) = 5.25 → between 5th (17) and 6th (21)' },
          { lab: 'Q3', val: '(17 + 21) ÷ 2 = 19' },
          { lab: 'IQR', val: '19 − 10 = 9', final: true }
        ],
        why: 'Both positions landed on non-whole numbers, so both quartiles are averages of the two values either side.'
      },
      {
        id: 'w3sp4', type: 'mcq', marks: 2,
        prompt: 'The interquartile range measures the spread of:',
        options: [
          'The middle 50% of the data',
          'The entire dataset from lowest to highest',
          'The top 25% of the data',
          'The distance of each value from the mean'
        ],
        answer: 0,
        solution: [
          { lab: 'Q1', val: 'Cuts off the bottom 25%' },
          { lab: 'Q3', val: 'Cuts off the top 25%' },
          { lab: 'What remains', val: 'The middle 50%' },
          { lab: 'Answer', val: 'The middle 50%', final: true }
        ],
        why: 'The whole dataset is the range; distance from the mean is the standard deviation. The IQR deliberately discards the extremes.'
      },
      {
        id: 'w3sp5', type: 'numeric', marks: 5,
        scenario:
          'Monthly service jobs completed by a workshop, already in ascending order:' +
          '<div class="dataset"><span>3</span><span>5</span><span>6</span><span>8</span><span>9</span><span>11</span>' +
          '<span>12</span><span>14</span><span>15</span><span>17</span><span>18</span><span>20</span><span>22</span>' +
          '<span>25</span><span>30</span></div>',
        prompt: 'Calculate the interquartile range.',
        answer: 12, tol: 0.01,
        solution: [
          { lab: 'n', val: '15 values' },
          { lab: 'Q1 position', val: '¼(15 + 1) = ¼(16) = 4 — a whole number' },
          { lab: 'Q1', val: 'The 4th value = 8' },
          { lab: 'Q3 position', val: '¾(16) = 12 — a whole number' },
          { lab: 'Q3', val: 'The 12th value = 20' },
          { lab: 'IQR', val: '20 − 8 = 12', final: true }
        ],
        why: 'When the position lands on a whole number you do not average anything — you simply read off the value at that position.'
      }
    ]
  },

  /* ═══════════════════════ PERCENTILES ═══════════════════════ */
  {
    id: 'w3-percentile',
    title: 'Percentiles',
    emoji: '💯',
    summary: 'Quartiles cut the data into four; percentiles cut it into a hundred.',
    notes: [
      {
        heading: 'The same idea, finer slices',
        emoji: '💡',
        html:
          '<p>While quartiles divide data into four parts, <b>percentiles</b> divide it into 100 equal parts. ' +
          'The <span class="math">p</span>th percentile is the value below which <span class="math">p</span>% of the data falls.</p>' +
          '<ul class="tickly">' +
          '<li>Q1 is the <b>25th</b> percentile</li>' +
          '<li>Q2 (the median) is the <b>50th</b> percentile</li>' +
          '<li>Q3 is the <b>75th</b> percentile</li>' +
          '</ul>' +
          '<p>Imagine E-Bike SA rewarding its top 10% of employees with bonuses. Only employees in the <b>90th ' +
          'percentile</b> qualify — so you need to find the exact performance score that acts as the cut-off.</p>' +
          '<div class="keybox"><b>Percentile position</b><br>' +
          'Position = <span class="frac"><span>p</span><span>100</span></span> × (n + 1)</div>'
      },
      {
        heading: 'Interpolating between two values',
        emoji: '📍',
        html:
          '<p>When the position is not a whole number, you <b>interpolate</b> — you step the appropriate fraction of ' +
          'the way from the lower value toward the upper one.</p>' +
          '<div class="math-block">Value = lower value + (decimal part × [upper value − lower value])</div>' +
          '<div class="worked"><div class="worked-title">Worked example — the 45th percentile of 1, 4, 6, 7, 8, 11</div>' +
          '<div class="solstep"><div class="solstep-lab">Position</div>' +
          '<div class="solstep-val">(45 ÷ 100) × (6 + 1) = 0.45 × 7 = 3.15</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Which values?</div>' +
          '<div class="solstep-val">Between the 3rd value (6) and the 4th value (7)</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Interpolate</div>' +
          '<div class="solstep-val">6 + 0.15 × (7 − 6) = 6 + 0.15</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">45th percentile</div>' +
          '<div class="solstep-val">6.15</div></div></div>' +
          '<p>The <b>0.15</b> is the decimal part of the position 3.15 — it tells you how far to travel between the ' +
          'two neighbouring values.</p>'
      }
    ],
    questions: [
      {
        id: 'w3pc1', type: 'numeric', marks: 4,
        prompt: 'Using the dataset 5, 9, 14, 18, 22, 27, calculate the 40th percentile.',
        answer: 13, tol: 0.02,
        solution: [
          { lab: 'Position formula', val: '(p ÷ 100) × (n + 1)' },
          { lab: 'Substitute', val: '(40 ÷ 100) × 7 = 0.40 × 7 = 2.8' },
          { lab: 'Which values?', val: 'Between the 2nd (9) and 3rd (14)' },
          { lab: 'Interpolate', val: '9 + 0.8 × (14 − 9) = 9 + 4' },
          { lab: 'Answer', val: '13', final: true }
        ],
        why: 'The whole number part of 2.8 tells you where to start; the decimal part 0.8 tells you how far to step toward the next value.'
      },
      {
        id: 'w3pc2', type: 'mcq', marks: 1,
        prompt: 'The upper quartile (Q3) is the same as which percentile?',
        options: ['The 75th percentile', 'The 25th percentile', 'The 50th percentile', 'The 3rd percentile'],
        answer: 0,
        solution: [
          { lab: 'Q3', val: '75% of the data lies below it' },
          { lab: 'Percentile definition', val: 'The pth percentile has p% of data below it' },
          { lab: 'Answer', val: 'The 75th percentile', final: true }
        ],
        why: 'Quartiles and percentiles are the same idea at different resolutions. Q1 = 25th, Q2 = 50th, Q3 = 75th.'
      },
      {
        id: 'w3pc3', type: 'numeric', marks: 4,
        prompt: 'A dataset of seven values is: 4, 8, 11, 15, 19, 23, 28. Calculate the 30th percentile.',
        answer: 9.2, tol: 0.02,
        solution: [
          { lab: 'Position', val: '(30 ÷ 100) × (7 + 1) = 0.30 × 8 = 2.4' },
          { lab: 'Which values?', val: 'Between the 2nd (8) and 3rd (11)' },
          { lab: 'Interpolate', val: '8 + 0.4 × (11 − 8) = 8 + 0.4 × 3 = 8 + 1.2' },
          { lab: 'Answer', val: '9.2', final: true }
        ],
        why: 'The gap between the two values here is 3, so the 0.4 decimal part means you travel 0.4 × 3 = 1.2 of the way up from 8.'
      },
      {
        id: 'w3pc4', type: 'mcq', marks: 2,
        prompt: 'An employee\'s sales performance is described as being "in the 90th percentile". This means:',
        options: [
          '90% of employees performed worse than they did',
          'They achieved 90% of their sales target',
          '90% of employees performed better than they did',
          'They scored 90 out of 100'
        ],
        answer: 0,
        solution: [
          { lab: 'Definition', val: 'The pth percentile is the value below which p% of the data falls' },
          { lab: 'So at the 90th', val: '90% of the data sits below this employee' },
          { lab: 'Answer', val: '90% of employees performed worse', final: true }
        ],
        why: 'A percentile is about ranking against everyone else, not about scoring a percentage. This is why only the top 10% qualify for the bonus.'
      },
      {
        id: 'w3pc5', type: 'numeric', marks: 3,
        prompt: 'For a dataset of nine values (12, 15, 18, 21, 24, 27, 30, 33, 36), calculate the 60th percentile.',
        answer: 27, tol: 0.02,
        solution: [
          { lab: 'Position', val: '(60 ÷ 100) × (9 + 1) = 0.60 × 10 = 6' },
          { lab: 'A whole number', val: 'So no interpolation is needed' },
          { lab: 'Answer', val: 'The 6th value = 27', final: true }
        ],
        why: 'Just like with quartiles, a whole-number position means you simply read off the value sitting there.'
      }
    ]
  },

  /* ═══════════════════════ VARIANCE & SD ═══════════════════════ */
  {
    id: 'w3-sd',
    title: 'Variance & Standard Deviation',
    emoji: '📉',
    summary: 'How far, on average, each value sits from the mean.',
    notes: [
      {
        heading: 'Why we need it',
        emoji: '💡',
        html:
          '<p>The range only looks at two extreme values. The IQR ignores the outer quarters. <b>Variance</b> and ' +
          '<b>standard deviation</b> use <i>every single data point</i> to measure how much values typically differ ' +
          'from the mean.</p>' +
          '<p>E-Bike SA might compare December sales to the average monthly sales and be very impressed — but if ' +
          'December is <i>always</i> higher than average, that impression is misleading. Knowing the spread stops you ' +
          'drawing the wrong conclusion.</p>'
      },
      {
        heading: 'Variance (s²)',
        emoji: '🧮',
        html:
          '<p>Variance is found by calculating the <b>squared difference</b> between the mean and each value, then ' +
          'averaging those squares.</p>' +
          '<div class="keybox"><b>Sample variance</b><br>' +
          's² = <span class="frac"><span>Σ(x − x̄)²</span><span>n − 1</span></span></div>' +
          '<p>We square the differences so that values below the mean (negative) do not cancel out values above it ' +
          '(positive).</p>' +
          '<div class="watchout"><b>Why n − 1?</b> This is the <b>sample</b> variance formula, and it is the one this ' +
          'module uses. For a whole <b>population</b> you would divide by n instead. The sample version is the most ' +
          'commonly used because it is the most unbiased estimator.</div>'
      },
      {
        heading: 'Standard deviation (s)',
        emoji: '√',
        html:
          '<p>Variance is measured in <b>squared units</b> (rands squared), which is not intuitive. Taking the square ' +
          'root brings it back into the original units.</p>' +
          '<div class="keybox"><b>Standard deviation = √variance</b><br><br>' +
          's = √s² = √<span class="frac"><span>Σ(x − x̄)²</span><span>n − 1</span></span></div>' +
          '<p>A <b>low</b> standard deviation means the data points cluster close to the mean — low variability, more ' +
          'consistency. A <b>high</b> standard deviation means they are spread over a wider range — less consistency.</p>' +
          '<div class="worked"><div class="worked-title">Worked example — dataset 1, 4, 5, 6</div>' +
          '<div class="solstep"><div class="solstep-lab">1. Mean</div>' +
          '<div class="solstep-val">(1 + 4 + 5 + 6) ÷ 4 = 16 ÷ 4 = 4</div></div>' +
          '<div class="solstep"><div class="solstep-lab">2. Squared differences</div>' +
          '<div class="solstep-val">(1−4)² = 9 &nbsp; (4−4)² = 0 &nbsp; (5−4)² = 1 &nbsp; (6−4)² = 4</div></div>' +
          '<div class="solstep"><div class="solstep-lab">3. Sum them</div>' +
          '<div class="solstep-val">9 + 0 + 1 + 4 = 14</div></div>' +
          '<div class="solstep"><div class="solstep-lab">4. Variance</div>' +
          '<div class="solstep-val">14 ÷ (4 − 1) = 14 ÷ 3 ≈ 4.67</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">5. Standard deviation</div>' +
          '<div class="solstep-val">√4.67 ≈ 2.16</div></div></div>'
      },
      {
        heading: 'Which measure of spread should you use?',
        emoji: '🤔',
        html:
          '<ul class="tickly">' +
          '<li>For <b>normally distributed (symmetric)</b> data without significant outliers — the standard deviation, ' +
          'paired with the mean.</li>' +
          '<li>For <b>skewed</b> data, data with outliers, or open-ended intervals — the IQR, paired with the median.</li>' +
          '<li>The <b>range</b> is fine for a quick first look, but use it cautiously.</li>' +
          '</ul>' +
          '<p>Always interpret these in context and in the original units. Saying "the standard deviation is 515" means ' +
          'nothing; saying "R515" tells the story.</p>'
      }
    ],
    questions: [
      {
        id: 'w3sd1', type: 'steps', marks: 6,
        prompt: 'Calculate the standard deviation of the dataset: 3, 6, 8, 11.',
        steps: [
          {
            q: 'First calculate the mean.',
            answer: 7, tol: 0.01,
            explain: '(3 + 6 + 8 + 11) ÷ 4 = 28 ÷ 4 = 7.'
          },
          {
            q: 'Now find the sum of the squared differences from the mean, Σ(x − x̄)².',
            answer: 34, tol: 0.01,
            explain: '(3−7)² = 16, (6−7)² = 1, (8−7)² = 1, (11−7)² = 16. Adding: 16 + 1 + 1 + 16 = 34.'
          },
          {
            q: 'Calculate the sample variance, to two decimal places.',
            answer: 11.33, tol: 0.02,
            explain: 'Divide by n − 1: 34 ÷ (4 − 1) = 34 ÷ 3 ≈ 11.33.'
          },
          {
            q: 'Finally, calculate the standard deviation, to two decimal places.',
            answer: 3.37, tol: 0.02,
            explain: 'The standard deviation is the square root of the variance: √11.33 ≈ 3.37.'
          }
        ],
        solution: [
          { lab: 'Mean', val: '28 ÷ 4 = 7' },
          { lab: 'Squared differences', val: '16, 1, 1, 16' },
          { lab: 'Σ(x − x̄)²', val: '34' },
          { lab: 'Variance', val: '34 ÷ 3 ≈ 11.33' },
          { lab: 'Standard deviation', val: '√11.33 ≈ 3.37', final: true }
        ],
        why: 'The mean must come first — every squared difference is measured from it. Then square, sum, divide by n − 1, and square root.'
      },
      {
        id: 'w3sd2', type: 'numeric', marks: 4,
        prompt: 'Calculate the standard deviation of the sample: 2, 4, 4, 6, 9. Give your answer to two decimal places.',
        answer: 2.65, tol: 0.02,
        solution: [
          { lab: 'Mean', val: '(2 + 4 + 4 + 6 + 9) ÷ 5 = 25 ÷ 5 = 5' },
          { lab: 'Squared differences', val: '9, 1, 1, 1, 16' },
          { lab: 'Σ(x − x̄)²', val: '28' },
          { lab: 'Variance', val: '28 ÷ (5 − 1) = 7' },
          { lab: 'Standard deviation', val: '√7 ≈ 2.65', final: true }
        ],
        why: 'Careful with the signs: (2 − 5)² = (−3)² = 9. Squaring makes every difference positive, which is exactly the point.'
      },
      {
        id: 'w3sd3', type: 'mcq', marks: 2,
        prompt: 'In the sample variance formula, why do we divide by <span class="math">n − 1</span> rather than <span class="math">n</span>?',
        options: [
          'Because we are working with a sample, and it gives the most unbiased estimate',
          'Because one value is always discarded as an outlier',
          'Because the mean has already used up one value',
          'It is an arbitrary convention with no real reason'
        ],
        answer: 0,
        solution: [
          { lab: 'Sample variance', val: 'Divides by n − 1' },
          { lab: 'Population variance', val: 'Divides by n' },
          { lab: 'Reason', val: 'The sample version is the most unbiased estimator' },
          { lab: 'Answer', val: 'Because it is a sample', final: true }
        ],
        why: 'In business you almost always have a sample rather than the entire population, which is why the n − 1 version is the one you will use.'
      },
      {
        id: 'w3sd4', type: 'mcq', marks: 2,
        prompt: 'Workshop A has a standard deviation of R420 on weekly revenue. Workshop B\'s is R5 800. What does this tell you?',
        options: [
          'Workshop A\'s weekly revenue is far more consistent than Workshop B\'s',
          'Workshop A earns more money than Workshop B',
          'Workshop B has a higher mean than Workshop A',
          'Workshop A has more customers than Workshop B'
        ],
        answer: 0,
        solution: [
          { lab: 'Low standard deviation', val: 'Values cluster close to the mean — consistent' },
          { lab: 'High standard deviation', val: 'Values spread widely — unpredictable' },
          { lab: 'Answer', val: 'Workshop A is far more consistent', final: true }
        ],
        why: 'Standard deviation says nothing about how much a business earns — only about how much its earnings vary. A shop with unpredictable income is much harder to plan stock and staffing for.'
      },
      {
        id: 'w3sd5', type: 'numeric', marks: 4,
        prompt: 'Calculate the standard deviation of the sample: 10, 12, 14, 16, 18. Give your answer to two decimal places.',
        answer: 3.16, tol: 0.02,
        solution: [
          { lab: 'Mean', val: '70 ÷ 5 = 14' },
          { lab: 'Squared differences', val: '16, 4, 0, 4, 16' },
          { lab: 'Σ(x − x̄)²', val: '40' },
          { lab: 'Variance', val: '40 ÷ 4 = 10' },
          { lab: 'Standard deviation', val: '√10 ≈ 3.16', final: true }
        ],
        why: 'This data is perfectly evenly spaced and symmetrical around 14, which is why the squared differences mirror each other.'
      }
    ]
  },

  /* ═══════════════════════ SKEWNESS & BOX PLOTS ═══════════════════════ */
  {
    id: 'w3-skew',
    title: 'Skewness & Box Plots',
    emoji: '📐',
    summary: 'The shape of the data, and how to picture it.',
    notes: [
      {
        heading: 'Why shape matters',
        emoji: '💡',
        html:
          '<p>E-Bike SA sold 600 e-bikes over 12 months. That does <b>not</b> mean they sold 50 per month. Maybe bikes ' +
          'only sell in spring and summer. Maybe 500 of the 600 sold in November before the holidays.</p>' +
          '<p>Spread tells you how varied the data is. <b>Skewness</b> tells you whether it is symmetrical or bunched ' +
          'up at one end.</p>' +
          '<p>A distribution is <b>skewed</b> if one of its tails is longer than the other.</p>'
      },
      {
        heading: 'The three shapes',
        emoji: '🎨',
        html:
          '<p><b>Positively skewed (skewed right)</b></p>' +
          '<ul class="tickly">' +
          '<li>The tail stretches to the <b>right</b> of the graph</li>' +
          '<li>Mean, median and mode all have different values</li>' +
          '<li><b>mode &lt; median &lt; mean</b></li>' +
          '<li>The two halves are not mirror images</li>' +
          '</ul>' +
          '<p><b>Negatively skewed (skewed left)</b></p>' +
          '<ul class="tickly">' +
          '<li>The tail stretches to the <b>left</b> of the graph</li>' +
          '<li>Mean, median and mode all have different values</li>' +
          '<li><b>mean &lt; median &lt; mode</b></li>' +
          '<li>The two halves are not mirror images</li>' +
          '</ul>' +
          '<p><b>Normal distribution</b></p>' +
          '<ul class="tickly">' +
          '<li>Mean, median and mode all have the <b>same</b> value</li>' +
          '<li>The two halves are mirror images of each other</li>' +
          '</ul>' +
          '<div class="svgfig">' +
          '<svg viewBox="0 0 560 190" role="img" aria-label="Three distribution shapes: negatively skewed, normal, positively skewed">' +
          '<path d="M20,150 C60,148 90,140 115,110 C135,85 145,40 160,40 C172,40 178,80 188,110 C196,134 200,150 200,150 Z" fill="#EBE0FF" stroke="#8B6DD9" stroke-width="2.5"/>' +
          '<text x="110" y="177" text-anchor="middle" font-size="13" font-weight="700" fill="#4A3457">Negative skew</text>' +
          '<text x="110" y="20" text-anchor="middle" font-size="11" fill="#6E5C7C">tail to the left</text>' +
          '<path d="M200,150 C230,150 250,140 268,110 C280,88 285,40 300,40 C315,40 320,88 332,110 C350,140 370,150 400,150 Z" fill="#D7F6EB" stroke="#34A98A" stroke-width="2.5"/>' +
          '<text x="300" y="177" text-anchor="middle" font-size="13" font-weight="700" fill="#4A3457">Normal</text>' +
          '<text x="300" y="20" text-anchor="middle" font-size="11" fill="#6E5C7C">symmetrical</text>' +
          '<path d="M400,150 C400,150 404,134 412,110 C422,80 428,40 440,40 C455,40 465,85 485,110 C510,140 540,148 580,150 Z" fill="#FFE1EE" stroke="#F0669F" stroke-width="2.5" transform="translate(-20,0)"/>' +
          '<text x="470" y="177" text-anchor="middle" font-size="13" font-weight="700" fill="#4A3457">Positive skew</text>' +
          '<text x="470" y="20" text-anchor="middle" font-size="11" fill="#6E5C7C">tail to the right</text>' +
          '</svg><figcaption>The direction of the long tail names the skew</figcaption></div>' +
          '<div class="keybox"><b>Memory hook</b> — the skew is named after where the <b>tail</b> points, not where the ' +
          'bulk of the data sits. A right-hand tail means positive skew, even though most of the data is on the left.</div>'
      },
      {
        heading: 'Box plots (box-and-whisker diagrams)',
        emoji: '📦',
        html:
          '<p>A box plot displays the shape of a distribution using the values you already know how to calculate:</p>' +
          '<ul class="tickly">' +
          '<li>Minimum value (the lower whisker tip)</li>' +
          '<li>Lower quartile Q1 (the left edge of the box)</li>' +
          '<li>Median Q2 (the line inside the box)</li>' +
          '<li>Upper quartile Q3 (the right edge of the box)</li>' +
          '<li>Maximum value (the upper whisker tip)</li>' +
          '</ul>' +
          '<div class="svgfig">' +
          '<svg viewBox="0 0 520 150" role="img" aria-label="Labelled box and whisker diagram">' +
          '<line x1="60" y1="70" x2="440" y2="70" stroke="#8B6DD9" stroke-width="2"/>' +
          '<line x1="60" y1="52" x2="60" y2="88" stroke="#8B6DD9" stroke-width="3"/>' +
          '<line x1="440" y1="52" x2="440" y2="88" stroke="#8B6DD9" stroke-width="3"/>' +
          '<rect x="150" y="42" width="200" height="56" fill="#D7F6EB" stroke="#34A98A" stroke-width="2.5" rx="3"/>' +
          '<line x1="230" y1="42" x2="230" y2="98" stroke="#F0669F" stroke-width="3.5"/>' +
          '<text x="60"  y="120" text-anchor="middle" font-size="12" fill="#4A3457">Min</text>' +
          '<text x="150" y="120" text-anchor="middle" font-size="12" fill="#4A3457">Q1</text>' +
          '<text x="230" y="132" text-anchor="middle" font-size="12" font-weight="700" fill="#F0669F">Median</text>' +
          '<text x="350" y="120" text-anchor="middle" font-size="12" fill="#4A3457">Q3</text>' +
          '<text x="440" y="120" text-anchor="middle" font-size="12" fill="#4A3457">Max</text>' +
          '<text x="250" y="28" text-anchor="middle" font-size="11" fill="#6E5C7C">the box holds the middle 50% (the IQR)</text>' +
          '</svg><figcaption>The five values a box plot is built from</figcaption></div>' +
          '<p><b>Reading skewness from a box plot:</b> if the median line sits <b>left of centre</b> in the box and the ' +
          'right whisker is longer, the data is positively skewed. If the median sits <b>right of centre</b> with a ' +
          'longer left whisker, it is negatively skewed. A median dead-centre with even whiskers means symmetry.</p>'
      }
    ],
    questions: [
      {
        id: 'w3sk1', type: 'mcq', marks: 2,
        prompt: 'For a <b>positively skewed</b> distribution, which of the following is true?',
        options: [
          'mode &lt; median &lt; mean, with the tail stretching to the right',
          'mean &lt; median &lt; mode, with the tail stretching to the left',
          'mean = median = mode',
          'mode &lt; median &lt; mean, with the tail stretching to the left'
        ],
        answer: 0,
        solution: [
          { lab: 'Positive skew', val: 'Tail stretches to the right-hand side' },
          { lab: 'The long right tail', val: 'Drags the mean upward, above the median' },
          { lab: 'Order', val: 'mode < median < mean', final: true }
        ],
        why: 'The mean is the measure most affected by the extreme values in the tail, so it always ends up furthest in the direction the tail points.'
      },
      {
        id: 'w3sk2', type: 'mcq', marks: 1,
        prompt: 'In a normal distribution, the mean, median and mode:',
        options: [
          'All have the same value',
          'Are all different values',
          'Are in the order mode &lt; median &lt; mean',
          'Cannot be calculated'
        ],
        answer: 0,
        solution: [
          { lab: 'Normal distribution', val: 'Perfectly symmetrical — halves are mirror images' },
          { lab: 'Therefore', val: 'The peak, the middle and the balance point coincide' },
          { lab: 'Answer', val: 'All three are equal', final: true }
        ],
        why: 'Symmetry is what forces them together. As soon as one tail gets longer, they separate.'
      },
      {
        id: 'w3sk3', type: 'mcq', marks: 3,
        scenario:
          'For the online booking dataset (1, 2, 2, 3, 3, 3, 3, 4, 4, 7, 9, 11) the measures were calculated as: ' +
          'mean = 4.33, median = 3, mode = 3.',
        prompt: 'Comment on the skewness of this data.',
        options: [
          'Positively skewed — the mean is higher than the median and mode',
          'Negatively skewed — the mean is higher than the median and mode',
          'Normally distributed — the median and mode are equal',
          'Not possible to determine without a box plot'
        ],
        answer: 0,
        solution: [
          { lab: 'Compare the measures', val: 'mode = 3, median = 3, mean = 4.33' },
          { lab: 'The mean sits above', val: 'Pulled up by the values 7, 9 and 11' },
          { lab: 'Tail direction', val: 'Stretches to the right' },
          { lab: 'Answer', val: 'Positively skewed', final: true }
        ],
        why: 'Most bookings took 1–4 minutes, but a few took much longer. Those few long bookings form the right-hand tail and drag the mean above the median.'
      },
      {
        id: 'w3sk4', type: 'mcq', marks: 2,
        prompt: 'Which set of values is represented by a box-and-whisker diagram?',
        options: [
          'Minimum, Q1, median, Q3, maximum',
          'Mean, variance and standard deviation',
          'Only the mean and the range',
          'Every individual value in the dataset'
        ],
        answer: 0,
        solution: [
          { lab: 'Whisker tips', val: 'Minimum and maximum' },
          { lab: 'Box edges', val: 'Q1 and Q3' },
          { lab: 'Line inside the box', val: 'The median' },
          { lab: 'Answer', val: 'Min, Q1, median, Q3, max', final: true }
        ],
        why: 'This is why quartiles are worth learning properly — the box plot is built entirely out of them.'
      },
      {
        id: 'w3sk5', type: 'mcq', marks: 2,
        prompt: 'On a box plot, the median line sits noticeably to the <b>right</b> of centre within the box, and the left whisker is much longer than the right. The data is:',
        options: [
          'Negatively skewed',
          'Positively skewed',
          'Symmetrical',
          'Bimodal'
        ],
        answer: 0,
        solution: [
          { lab: 'Longer whisker', val: 'On the left-hand side' },
          { lab: 'The tail', val: 'Therefore stretches left' },
          { lab: 'Answer', val: 'Negatively skewed', final: true }
        ],
        why: 'Follow the long whisker — that is the tail. A long left tail is a negative skew, and it also pushes the mean below the median.'
      }
    ]
  },

  /* ═══════════════════════ PROBABILITY BASICS ═══════════════════════ */
  {
    id: 'w3-prob',
    title: 'Probability Basics',
    emoji: '🎲',
    summary: 'Measuring how likely something is, on a scale from 0 to 1.',
    notes: [
      {
        heading: 'What probability is',
        emoji: '💡',
        html:
          '<p><b>Probability</b> is simply the likelihood of a certain event happening. You use it every day without ' +
          'doing the maths — "What\'s the chance of rain? I\'d better take a jacket."</p>' +
          '<p>In business it is everywhere: whether a new employee will fit in, whether an investment will return well, ' +
          'whether a customer you sold on credit will actually repay you.</p>' +
          '<div class="keybox"><b>The basic calculation</b><br>' +
          'Probability = <span class="frac"><span>Number of desired outcomes</span><span>Total number of possible outcomes</span></span></div>' +
          '<p>Rolling a standard six-sided die, the probability of rolling a 4 is ' +
          '<span class="frac"><span>1</span><span>6</span></span> — one desired outcome out of six possible ones.</p>'
      },
      {
        heading: 'The general rules',
        emoji: '📏',
        html:
          '<p>In business and statistics, probability is expressed as a number between 0 and 1:</p>' +
          '<ul class="tickly">' +
          '<li><b>P(E) = 0</b> means the event is <b>impossible</b>.</li>' +
          '<li><b>P(E) = 1</b> means the event is <b>certain</b> to happen.</li>' +
          '<li><b>0 ≤ P(E) ≤ 1</b> — no probability can be less than zero or more than one. Even 1.1 is out of scope.</li>' +
          '<li>A probability of <b>0.5</b> is a 50/50 chance, like tossing a coin.</li>' +
          '</ul>' +
          '<p>Probabilities are more commonly expressed as proportions than as percentages, and they can be assessed ' +
          'with mathematical certainty, from an analysis of past experience, or from research and surveys.</p>'
      },
      {
        heading: 'Complementary events',
        emoji: '🔀',
        html:
          '<p>The <b>complement</b> of an event is everything else that does not happen. It is written P(A<sup>c</sup>) ' +
          'or P(A′).</p>' +
          '<div class="keybox"><b>P(A<sup>c</sup>) = 1 − P(A)</b></div>' +
          '<div class="worked"><div class="worked-title">Worked example — the die</div>' +
          '<div class="solstep"><div class="solstep-lab">P(rolling a 4)</div>' +
          '<div class="solstep-val"><span class="frac"><span>1</span><span>6</span></span></div></div>' +
          '<div class="solstep"><div class="solstep-lab">P(not rolling a 4)</div>' +
          '<div class="solstep-val">1 − <span class="frac"><span>1</span><span>6</span></span> = ' +
          '<span class="frac"><span>5</span><span>6</span></span></div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Sense check</div>' +
          '<div class="solstep-val">The other 5 outcomes are 1, 2, 3, 5, 6 ✓</div></div></div>' +
          '<p>This is often the quickest route to an answer. Working out "at least one" directly can be a nightmare; ' +
          'working out "none" and subtracting from 1 is usually easy.</p>' +
          '<div class="keybox"><b>Useful deck facts</b> — a deck has 52 cards (no jokers), in 4 suits (spades, clubs, ' +
          'diamonds, hearts) of 13 cards each: ace, 2–10, jack, queen, king. So there are 4 of each rank and 13 of each suit.</div>'
      }
    ],
    questions: [
      {
        id: 'w3pb1', type: 'mcq', marks: 1,
        prompt: 'When rolling a standard six-sided die, what is the probability of rolling a number <b>greater than 4</b>?',
        options: [
          '<span class="frac"><span>1</span><span>3</span></span>',
          '<span class="frac"><span>1</span><span>6</span></span>',
          '<span class="frac"><span>1</span><span>2</span></span>',
          '<span class="frac"><span>2</span><span>3</span></span>'
        ],
        answer: 0,
        solution: [
          { lab: 'Desired outcomes', val: '{5, 6} — that is 2 outcomes' },
          { lab: 'Total possible outcomes', val: '6 (the numbers 1, 2, 3, 4, 5, 6)' },
          { lab: 'Probability', val: '2/6' },
          { lab: 'Answer', val: '1/3', final: true }
        ],
        why: 'Count the outcomes that satisfy the condition, not the number in the condition. "Greater than 4" means 5 and 6 only — it does not include 4 itself.'
      },
      {
        id: 'w3pb2', type: 'mcq', marks: 2,
        prompt: 'A card is drawn at random from a deck of 52. What is the probability that it is <b>not</b> a heart?',
        options: [
          '<span class="frac"><span>3</span><span>4</span></span>',
          '<span class="frac"><span>1</span><span>4</span></span>',
          '<span class="frac"><span>1</span><span>2</span></span>',
          '<span class="frac"><span>13</span><span>52</span></span>'
        ],
        answer: 0,
        solution: [
          { lab: 'P(heart)', val: '13 hearts out of 52 → 13/52 = 1/4' },
          { lab: 'Complement rule', val: 'P(Aᶜ) = 1 − P(A)' },
          { lab: 'Calculate', val: '1 − 1/4' },
          { lab: 'Answer', val: '3/4', final: true }
        ],
        why: 'You could also count directly: the other three suits give 39 cards out of 52, which is also 3/4. Same answer, and a good check.'
      },
      {
        id: 'w3pb3', type: 'mcq', marks: 1,
        prompt: 'If P(E) = 0, this means the event E is:',
        options: ['Impossible', 'Certain to happen', 'A 50/50 chance', 'Very likely'],
        answer: 0,
        solution: [
          { lab: 'The scale', val: '0 ≤ P(E) ≤ 1' },
          { lab: 'At the bottom', val: 'P(E) = 0' },
          { lab: 'Answer', val: 'The event is impossible', final: true }
        ],
        why: 'P(E) = 1 is the opposite end — certainty. Everything real sits somewhere between the two.'
      },
      {
        id: 'w3pb4', type: 'numeric', marks: 2,
        prompt: 'If P(E) = 0.35, calculate P(E<sup>c</sup>), the probability of the complement.',
        answer: 0.65, tol: 0.005,
        solution: [
          { lab: 'Complement rule', val: 'P(Eᶜ) = 1 − P(E)' },
          { lab: 'Substitute', val: '1 − 0.35' },
          { lab: 'Answer', val: '0.65', final: true }
        ],
        why: 'The event and its complement must always add to 1, because between them they cover every possible outcome.'
      },
      {
        id: 'w3pb5', type: 'mcq', marks: 2,
        prompt: 'A card is drawn at random from a deck of 52. What is the probability that it is a red card?',
        options: [
          '<span class="frac"><span>1</span><span>2</span></span>',
          '<span class="frac"><span>1</span><span>4</span></span>',
          '<span class="frac"><span>13</span><span>52</span></span>',
          '<span class="frac"><span>1</span><span>13</span></span>'
        ],
        answer: 0,
        solution: [
          { lab: 'Red suits', val: 'Diamonds and hearts, 13 cards each' },
          { lab: 'Desired outcomes', val: '13 + 13 = 26' },
          { lab: 'Probability', val: '26/52' },
          { lab: 'Answer', val: '1/2', final: true }
        ],
        why: 'Two of the four suits are red, so exactly half the deck is red. 13/52 would be the answer for one specific suit only.'
      }
    ]
  },

  /* ═══════════════════════ VENN DIAGRAMS ═══════════════════════ */
  {
    id: 'w3-venn',
    title: 'Venn Diagrams',
    emoji: '⭕',
    summary: 'Drawing the sample space, so "or" and "and" stop being words and become areas.',
    notes: [
      {
        heading: 'A picture of the sample space',
        emoji: '🖼️',
        html:
          '<p>A <b>Venn diagram</b> is a simple visual tool for showing how sets or events relate to each other. ' +
          'The whole picture is just two things:</p>' +
          '<ul class="tickly">' +
          '<li>The <b>rectangle</b> is the sample space — every possible outcome. It is usually labelled S or E.</li>' +
          '<li>A <b>circle</b> inside it is one event — the outcomes you are interested in.</li>' +
          '</ul>' +
          '<p>Which leaves one more region for free: everything inside the rectangle but <b>outside</b> the circle. ' +
          'That is the <b>complement</b> — "not A".</p>' +
          '<div class="svgfig">' +
          '<svg viewBox="0 0 420 200" role="img" aria-label="A rectangle labelled S containing one circle labelled A; the area outside the circle is not A">' +
          '<rect x="20" y="20" width="380" height="160" rx="8" fill="#EBE0FF" stroke="#8B6DD9" stroke-width="2.5"/>' +
          '<text x="34" y="42" font-size="15" font-weight="700" fill="#4A3457">S</text>' +
          '<circle cx="160" cy="100" r="66" fill="#FFE1EE" stroke="#F0669F" stroke-width="2.5"/>' +
          '<text x="160" y="107" text-anchor="middle" font-size="20" font-weight="700" fill="#4A3457">A</text>' +
          '<text x="320" y="100" text-anchor="middle" font-size="14" font-weight="700" fill="#6E5C7C">not A</text>' +
          '<text x="320" y="120" text-anchor="middle" font-size="12" fill="#6E5C7C">the complement</text>' +
          '</svg><figcaption>One event, and everything that is not it</figcaption></div>' +
          '<p>Because those two regions together are the whole rectangle, ' +
          '<b>P(A) + P(not A) = 1</b> — which is the complement rule you already know, now visible.</p>'
      },
      {
        heading: 'Two events, and the three questions',
        emoji: '🔗',
        html:
          '<p>One circle is a definition. <b>Two</b> circles are where a Venn diagram starts earning its keep, because ' +
          'the picture answers the questions the words make confusing.</p>' +
          '<div class="svgfig">' +
          '<svg viewBox="0 0 420 210" role="img" aria-label="Two overlapping circles A and B inside a rectangle, with the overlap labelled A and B">' +
          '<rect x="15" y="15" width="390" height="180" rx="8" fill="#EBE0FF" stroke="#8B6DD9" stroke-width="2.5"/>' +
          '<text x="29" y="37" font-size="15" font-weight="700" fill="#4A3457">S</text>' +
          '<circle cx="165" cy="105" r="72" fill="#FFE1EE" stroke="#F0669F" stroke-width="2.5" opacity=".75"/>' +
          '<circle cx="255" cy="105" r="72" fill="#D7F6EB" stroke="#34A98A" stroke-width="2.5" opacity=".75"/>' +
          '<text x="112" y="112" text-anchor="middle" font-size="20" font-weight="700" fill="#4A3457">A</text>' +
          '<text x="308" y="112" text-anchor="middle" font-size="20" font-weight="700" fill="#4A3457">B</text>' +
          '<text x="210" y="102" text-anchor="middle" font-size="12" font-weight="700" fill="#4A3457">A and B</text>' +
          '<text x="210" y="120" text-anchor="middle" font-size="11" fill="#6E5C7C">the overlap</text>' +
          '</svg><figcaption>The overlap is the outcomes that are in both events at once</figcaption></div>' +
          '<div class="tablewrap"><table class="dtable">' +
          '<tr><th>In words</th><th>On the diagram</th></tr>' +
          '<tr><td><b>A and B</b></td><td>Only the overlap — outcomes in both circles</td></tr>' +
          '<tr><td><b>A or B</b></td><td>Everything inside either circle, counting the overlap <b>once</b></td></tr>' +
          '<tr><td><b>not A</b></td><td>Everything in the rectangle outside circle A</td></tr>' +
          '</table></div>' +
          '<div class="keybox"><b>Mutually exclusive</b> events are the ones whose circles <b>do not touch</b>. ' +
          'There is no overlap, so P(A and B) = 0 and there is nothing to subtract.</div>' +
          '<p>That last row is the whole reason the addition law has a "− P(A and B)" on the end, and why it ' +
          'disappears when events are mutually exclusive. The next two topics are those laws; this is the picture ' +
          'they are describing.</p>'
      },
      {
        heading: 'Drawing one for a real question',
        emoji: '✏️',
        html:
          '<p><i>Of 100 cyclists at an E-Bike SA event, 62 own a road bike, 45 own a mountain bike, and 21 own both.</i></p>' +
          '<p>Fill the overlap <b>first</b>, then work outwards — the number given for each circle is the whole ' +
          'circle, overlap included.</p>' +
          '<div class="worked"><div class="worked-title">Filling the regions</div>' +
          '<div class="solstep"><div class="solstep-lab">Both</div>' +
          '<div class="solstep-val">21 — straight into the overlap</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Road bike only</div>' +
          '<div class="solstep-val">62 − 21 = 41</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Mountain bike only</div>' +
          '<div class="solstep-val">45 − 21 = 24</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Inside a circle at all</div>' +
          '<div class="solstep-val">41 + 21 + 24 = 86</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Neither — outside both</div>' +
          '<div class="solstep-val">100 − 86 = 14</div></div></div>' +
          '<div class="watchout"><b>Do not put 62 in the road-bike-only region.</b> The 62 already includes the 21 who ' +
          'own both. Filling the overlap first and subtracting is what stops those 21 being counted twice.</div>'
      }
    ],
    questions: [
      {
        id: 'w3v1', type: 'mcq', marks: 2,
        prompt: 'On a Venn diagram, what does the <b>rectangle</b> around the circles represent?',
        options: [
          'The sample space — every possible outcome',
          'The event you are interested in',
          'The complement of the event',
          'The probability of the event'
        ],
        answer: 0,
        solution: [
          { lab: 'The rectangle', val: 'Bounds everything that could happen' },
          { lab: 'The circles inside it', val: 'Are the events' },
          { lab: 'Answer', val: 'The sample space', final: true }
        ],
        why: 'Which is why the areas inside the rectangle must add to 1 — nothing can happen that is outside it.'
      },
      {
        id: 'w3v2', type: 'mcq', marks: 2,
        prompt: 'What does the area <b>inside the rectangle but outside circle A</b> represent?',
        options: [
          'The complement of A — everything that is not A',
          'The overlap between A and another event',
          'Nothing; it is empty space',
          'The sample space'
        ],
        answer: 0,
        solution: [
          { lab: 'Inside A', val: 'The event happens' },
          { lab: 'Inside the box but outside A', val: 'The event does not happen' },
          { lab: 'Answer', val: 'The complement, "not A"', final: true }
        ],
        why: 'Those two regions are the whole rectangle between them, so P(A) + P(not A) = 1. The complement rule is just this picture written down.'
      },
      {
        id: 'w3v3', type: 'mcq', marks: 2,
        prompt: 'Two circles on a Venn diagram <b>do not overlap at all</b>. What does that tell you about the events?',
        options: [
          'They are mutually exclusive — they cannot both happen',
          'They are independent of each other',
          'They are equally likely',
          'One of them is certain to happen'
        ],
        answer: 0,
        solution: [
          { lab: 'No overlap', val: 'No outcome is in both events' },
          { lab: 'So they cannot both happen', val: 'P(A and B) = 0' },
          { lab: 'Answer', val: 'Mutually exclusive', final: true }
        ],
        why: 'Mutually exclusive and independent are different ideas that are easy to confuse. This one is about whether the circles touch; independence is about whether one event changes the odds of the other.'
      },
      {
        id: 'w3v4', type: 'numeric', marks: 3,
        prompt: 'Of 75 members at a club, 47 take a spinning class, 38 take a strength class and 19 take both. How many take <b>only</b> the spinning class?',
        answer: 28, tol: 0.01,
        solution: [
          { lab: 'The 47 includes', val: 'The 19 who take both' },
          { lab: 'Subtract the overlap', val: '47 − 19' },
          { lab: 'Answer', val: '28', final: true }
        ],
        why: 'Fill the overlap first, then work outwards. Reading 47 as "spinning only" is the single most common mistake with these, and it double-counts 19 people.'
      },
      {
        id: 'w3v5', type: 'numeric', marks: 3,
        prompt: 'Same club: 75 members, 47 take spinning, 38 take strength, 19 take both. How many take <b>neither</b> class?',
        answer: 9, tol: 0.01,
        solution: [
          { lab: 'Spinning only', val: '47 − 19 = 28' },
          { lab: 'Strength only', val: '38 − 19 = 19' },
          { lab: 'Inside a circle at all', val: '28 + 19 + 19 = 66' },
          { lab: 'Answer', val: '75 − 66 = 9', final: true }
        ],
        why: '47 + 38 = 85, which is more members than the club has — because the 19 have been counted twice. Subtracting the overlap once brings it back to 66.'
      },
      {
        id: 'w3v6', type: 'mcq', marks: 2,
        prompt: 'Which region of a two-circle Venn diagram represents <b>A or B</b>?',
        options: [
          'Everything inside either circle, with the overlap counted once',
          'Only the overlap where the circles meet',
          'Everything outside both circles',
          'The two circles added together, overlap counted twice'
        ],
        answer: 0,
        solution: [
          { lab: '"Or" means', val: 'A happens, or B does, or both' },
          { lab: 'That is', val: 'The whole shaded area of both circles' },
          { lab: 'Counted once', val: 'Because a person in the overlap is still one person' },
          { lab: 'Answer', val: 'Either circle, overlap once', final: true }
        ],
        why: 'The last option is exactly the mistake the addition law\'s "− P(A and B)" exists to correct. Adding the two circles counts the overlap twice; subtracting it once puts that right.'
      }
    ]
  },

  /* ═══════════════════════ ADDITION LAWS ═══════════════════════ */
  {
    id: 'w3-add',
    title: 'The Addition Law (OR)',
    emoji: '➕',
    summary: 'When the question says "or" — and whether you need to subtract an overlap.',
    notes: [
      {
        heading: 'Mutually exclusive events',
        emoji: '🚦',
        html:
          '<p>Events are <b>mutually exclusive</b> when only one or the other can happen — both cannot happen at the ' +
          'same time. The occurrence of A stops or hinders the occurrence of B.</p>' +
          '<p>Turning left and turning right at the same moment. Picking a yellow marble and a green marble in a single ' +
          'pick. A customer walking into the showroom either buys an e-bike or does not.</p>' +
          '<div class="keybox"><b>Simple addition law</b> (mutually exclusive)<br>' +
          'P(A or B) = P(A ∪ B) = <b>P(A) + P(B)</b></div>' +
          '<div class="worked"><div class="worked-title">Worked example — a jack or a queen</div>' +
          '<div class="solstep"><div class="solstep-lab">P(jack)</div>' +
          '<div class="solstep-val">4 jacks in the deck → 4/52</div></div>' +
          '<div class="solstep"><div class="solstep-lab">P(queen)</div>' +
          '<div class="solstep-val">4 queens in the deck → 4/52</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Add them</div>' +
          '<div class="solstep-val">4/52 + 4/52 = 8/52</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Simplify</div>' +
          '<div class="solstep-val">2/13</div></div></div>' +
          '<p>A single card cannot be both a jack and a queen, so there is no overlap to worry about.</p>'
      },
      {
        heading: 'Non-mutually exclusive events',
        emoji: '🔗',
        html:
          '<p>Many business events are <b>not</b> mutually exclusive — both characteristics can appear in a single trial. ' +
          'Selecting someone who is tall <i>or</i> dark-haired: one person can be both.</p>' +
          '<p>If you just add the two probabilities, anything with <b>both</b> characteristics gets counted twice. So you ' +
          'subtract the overlap once to correct it.</p>' +
          '<div class="keybox"><b>General addition law</b> (not mutually exclusive)<br>' +
          'P(A or B) = P(A) + P(B) − <b>P(A and B)</b></div>' +
          '<div class="worked"><div class="worked-title">Worked example — a jack or a spade</div>' +
          '<div class="solstep"><div class="solstep-lab">P(jack)</div><div class="solstep-val">4/52</div></div>' +
          '<div class="solstep"><div class="solstep-lab">P(spade)</div><div class="solstep-val">13/52</div></div>' +
          '<div class="solstep"><div class="solstep-lab">P(jack and spade)</div>' +
          '<div class="solstep-val">1/52 — there is exactly one jack of spades</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Apply</div>' +
          '<div class="solstep-val">4/52 + 13/52 − 1/52 = 16/52</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Simplify</div>' +
          '<div class="solstep-val">4/13</div></div></div>' +
          '<div class="watchout"><b>How to spot which one</b> — ask yourself: <i>can one single outcome satisfy both ' +
          'conditions at once?</i> If yes, you must subtract the overlap. If no, simply add.</div>'
      }
    ],
    questions: [
      {
        id: 'w3ad1', type: 'mcq', marks: 3,
        prompt: 'Determine the probability of obtaining either a 7 or an 8 when one card is picked at random from a deck of 52.',
        options: [
          '<span class="frac"><span>2</span><span>13</span></span>',
          '<span class="frac"><span>1</span><span>13</span></span>',
          '<span class="frac"><span>4</span><span>13</span></span>',
          '<span class="frac"><span>1</span><span>169</span></span>'
        ],
        answer: 0,
        solution: [
          { lab: 'Mutually exclusive?', val: 'Yes — one card cannot be both a 7 and an 8' },
          { lab: 'Apply P(A) + P(B)', val: '4/52 + 4/52' },
          { lab: 'Add', val: '8/52' },
          { lab: 'Answer', val: '2/13', final: true }
        ],
        why: 'There are four 7s and four 8s, one in each suit. Because you only pick one card, drawing a 7 prevents drawing an 8 — that is what makes these events mutually exclusive.'
      },
      {
        id: 'w3ad2', type: 'mcq', marks: 2,
        prompt: 'Determine the probability of obtaining either a diamond or a club when a card is chosen at random.',
        options: [
          '<span class="frac"><span>1</span><span>2</span></span>',
          '<span class="frac"><span>1</span><span>4</span></span>',
          '<span class="frac"><span>13</span><span>52</span></span>',
          '<span class="frac"><span>1</span><span>13</span></span>'
        ],
        answer: 0,
        solution: [
          { lab: 'Mutually exclusive?', val: 'Yes — a card belongs to exactly one suit' },
          { lab: 'Apply', val: '13/52 + 13/52 = 26/52' },
          { lab: 'Answer', val: '1/2 — a 50% chance', final: true }
        ],
        why: 'Two suits out of four is half the deck. No card is both a diamond and a club, so nothing needs subtracting.'
      },
      {
        id: 'w3ad3', type: 'mcq', marks: 3,
        scenario:
          'Of 60 customers who visited the E-Bike SA showroom on a Saturday, 25 bought an e-bike, ' +
          '20 bought accessories, and 8 of them bought both.',
        prompt: 'One of the 60 customers is selected at random. What is the probability that they bought an e-bike or accessories?',
        options: [
          '<span class="frac"><span>37</span><span>60</span></span>',
          '<span class="frac"><span>45</span><span>60</span></span>',
          '<span class="frac"><span>3</span><span>4</span></span>',
          '<span class="frac"><span>8</span><span>60</span></span>'
        ],
        answer: 0,
        solution: [
          { lab: 'Mutually exclusive?', val: 'No — 8 customers did both' },
          { lab: 'P(e-bike)', val: '25/60' },
          { lab: 'P(accessories)', val: '20/60' },
          { lab: 'P(both)', val: '8/60' },
          { lab: 'Apply', val: '25/60 + 20/60 − 8/60' },
          { lab: 'Answer', val: '37/60', final: true }
        ],
        why: '45/60 is what you get by forgetting to subtract the overlap — the 8 customers who bought both would be counted twice.'
      },
      {
        id: 'w3ad4', type: 'mcq', marks: 2,
        prompt: 'Which formula applies when two events are <b>not</b> mutually exclusive?',
        options: [
          'P(A or B) = P(A) + P(B) − P(A and B)',
          'P(A or B) = P(A) + P(B)',
          'P(A and B) = P(A) × P(B)',
          'P(Aᶜ) = 1 − P(A)'
        ],
        answer: 0,
        solution: [
          { lab: 'Not mutually exclusive', val: 'Both events can occur together' },
          { lab: 'So some outcomes', val: 'Would be double-counted by simple addition' },
          { lab: 'Answer', val: 'Subtract P(A and B) once', final: true }
        ],
        why: 'P(A) + P(B) on its own is the mutually exclusive version, P(A) × P(B) is the multiplication law, and 1 − P(A) is the complement rule.'
      },
      {
        id: 'w3ad5', type: 'mcq', marks: 3,
        prompt: 'What is the probability of obtaining an even number or a number greater than four when a six-sided die is rolled?',
        options: [
          '<span class="frac"><span>2</span><span>3</span></span>',
          '<span class="frac"><span>5</span><span>6</span></span>',
          '<span class="frac"><span>1</span><span>2</span></span>',
          '<span class="frac"><span>1</span><span>3</span></span>'
        ],
        answer: 0,
        solution: [
          { lab: 'Even numbers', val: '{2, 4, 6} → 3/6' },
          { lab: 'Greater than four', val: '{5, 6} → 2/6' },
          { lab: 'Both at once', val: '{6} → 1/6' },
          { lab: 'Apply', val: '3/6 + 2/6 − 1/6 = 4/6' },
          { lab: 'Answer', val: '2/3', final: true }
        ],
        why: 'The number 6 is both even and greater than four, so it exhibits both characteristics and must be subtracted once. Answering 5/6 means you forgot that overlap.'
      }
    ]
  },

  /* ═══════════════════════ MULTIPLICATION LAWS ═══════════════════════ */
  {
    id: 'w3-mult',
    title: 'The Multiplication Law (AND)',
    emoji: '✖️',
    summary: 'When the question says "and" — and whether the first event changes the second.',
    notes: [
      {
        heading: 'Independent events',
        emoji: '🎲',
        html:
          '<p>Events are <b>independent</b> when the occurrence of A does not affect the occurrence of B. Tossing a coin ' +
          'and throwing a die: getting heads tells you nothing about what the die will do.</p>' +
          '<div class="keybox"><b>Simple multiplication law</b> (independent)<br>' +
          'P(A and B) = P(A ∩ B) = <b>P(A) × P(B)</b></div>' +
          '<div class="worked"><div class="worked-title">Worked example — a king of diamonds and a queen</div>' +
          '<div class="solstep"><div class="solstep-lab">Setup</div>' +
          '<div class="solstep-val">Pick one card, record it, <b>put it back</b>, pick again</div></div>' +
          '<div class="solstep"><div class="solstep-lab">P(king of diamonds)</div>' +
          '<div class="solstep-val">1/52 — there is only one</div></div>' +
          '<div class="solstep"><div class="solstep-lab">P(queen)</div>' +
          '<div class="solstep-val">4/52</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Multiply</div>' +
          '<div class="solstep-val">1/52 × 4/52 = 1/676</div></div></div>' +
          '<p>Because the card went back, the deck is identical for the second pick. Nothing changed.</p>'
      },
      {
        heading: 'Dependent (conditional) events',
        emoji: '🔗',
        html:
          '<p>Events are <b>dependent</b> when the outcome of one depends on the outcome of the other. The keyword to ' +
          'look for is <b>"without replacement"</b> — the sample size is always reduced after each trial.</p>' +
          '<div class="keybox"><b>General multiplication law</b> (dependent)<br>' +
          'P(A and B) = <b>P(A) × P(B | A)</b><br><br>' +
          'P(B | A) is read as "the probability of B <b>given that</b> A has already happened".</div>' +
          '<div class="worked"><div class="worked-title">Worked example — two kings without replacement</div>' +
          '<div class="solstep"><div class="solstep-lab">P(first king)</div>' +
          '<div class="solstep-val">4 kings out of 52 cards → 4/52</div></div>' +
          '<div class="solstep"><div class="solstep-lab">P(second king | first was a king)</div>' +
          '<div class="solstep-val">Only 3 kings left, and only 51 cards → 3/51</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Multiply</div>' +
          '<div class="solstep-val">4/52 × 3/51 = 12/2 652</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">Simplify</div>' +
          '<div class="solstep-val">1/221</div></div></div>' +
          '<div class="watchout"><b>Both numbers change.</b> After removing a card you have one fewer of that type ' +
          '<i>and</i> one fewer card in total. Forgetting to reduce the denominator is the classic error.</div>'
      },
      {
        heading: 'Conditional probability in business',
        emoji: '💼',
        html:
          '<p>Dependence is everywhere in business. You believe there is a 70% chance you will fall asleep <i>if</i> the ' +
          'exam hall becomes hot and stuffy, and a 25% chance the air conditioning breaks down.</p>' +
          '<div class="worked"><div class="worked-title">Worked example — falling asleep in the exam</div>' +
          '<div class="solstep"><div class="solstep-lab">P(stuffy)</div><div class="solstep-val">0.25</div></div>' +
          '<div class="solstep"><div class="solstep-lab">P(fall asleep | stuffy)</div><div class="solstep-val">0.70</div></div>' +
          '<div class="solstep"><div class="solstep-lab">Multiply</div><div class="solstep-val">0.25 × 0.70</div></div>' +
          '<div class="solstep final"><div class="solstep-lab">P(too hot AND you fall asleep)</div>' +
          '<div class="solstep-val">0.175, or 17.5%</div></div></div>' +
          '<div class="watchout"><b>Read the direction carefully.</b> If a question gives you the probability of ' +
          '<i>agreeing</i> to improve productivity but asks about the factory <i>closing</i> (which happens if they fail ' +
          'to improve), you must use the complement first.</div>'
      }
    ],
    questions: [
      {
        id: 'w3mu1', type: 'mcq', marks: 2,
        prompt: 'What is the probability of getting a 2 and an odd number when two dice are rolled at once?',
        options: [
          '<span class="frac"><span>1</span><span>12</span></span>',
          '<span class="frac"><span>1</span><span>6</span></span>',
          '<span class="frac"><span>4</span><span>6</span></span>',
          '<span class="frac"><span>1</span><span>36</span></span>'
        ],
        answer: 0,
        solution: [
          { lab: 'Independent?', val: 'Yes — two separate dice, neither affects the other' },
          { lab: 'P(two)', val: '1/6' },
          { lab: 'P(odd)', val: '{1, 3, 5} → 3/6' },
          { lab: 'Multiply', val: '1/6 × 3/6 = 3/36' },
          { lab: 'Answer', val: '1/12', final: true }
        ],
        why: 'Two separate dice cannot influence each other, so this is the simple multiplication law — no conditional probability needed.'
      },
      {
        id: 'w3mu2', type: 'mcq', marks: 3,
        prompt: 'From a pack of 52 cards, two cards are drawn at random, one at a time, <b>without replacement</b>. What is the probability that both of them are red?',
        options: [
          '<span class="frac"><span>25</span><span>102</span></span>',
          '<span class="frac"><span>1</span><span>4</span></span>',
          '<span class="frac"><span>1</span><span>2</span></span>',
          '<span class="frac"><span>13</span><span>51</span></span>'
        ],
        answer: 0,
        solution: [
          { lab: 'Dependent — "without replacement"', val: 'Use P(A) × P(B | A)' },
          { lab: 'P(first red)', val: '26/52 = 1/2' },
          { lab: 'P(second red | first red)', val: '25/51 — one red card and one card gone' },
          { lab: 'Multiply', val: '26/52 × 25/51 = 650/2 652' },
          { lab: 'Answer', val: '25/102', final: true }
        ],
        why: '1/4 is what you would get from 26/52 × 26/52 — that is the answer <i>with</i> replacement. The phrase "without replacement" is the whole question.'
      },
      {
        id: 'w3mu3', type: 'numeric', marks: 3,
        scenario:
          'Past data from a research company shows that the probability of a married woman aged 32 being alive in 30 years\' ' +
          'time is 0.69, and the probability of a married man aged 35 being alive in 30 years\' time is 0.51.',
        prompt: 'Calculate the probability that, in 30 years\' time, both are still alive.',
        answer: 0.3519, tol: 0.0005,
        note: 'Give your answer as a decimal to four places.',
        solution: [
          { lab: 'Independent events', val: 'One person\'s survival does not affect the other\'s' },
          { lab: 'Apply P(A) × P(B)', val: '0.69 × 0.51' },
          { lab: 'Answer', val: '0.3519', final: true }
        ],
        why: '"And" means multiply. Because these two probabilities are unrelated to each other, no conditional adjustment is needed.'
      },
      {
        id: 'w3mu4', type: 'steps', marks: 5,
        scenario: 'From a pack of 52 cards, you draw three cards in succession, <b>without replacing</b> any of the cards you picked.',
        prompt: 'What is the probability that the first is an ace, the second is a queen, and the third is a jack?',
        steps: [
          {
            q: 'What is the probability that the first card is an ace? Enter the denominator (the total cards available).',
            answer: 52, tol: 0.01,
            explain: 'There are 4 aces in a full deck of 52 cards, so P(ace) = 4/52.'
          },
          {
            q: 'The ace is not replaced. How many cards remain for the second draw?',
            answer: 51, tol: 0.01,
            explain: 'One card has been removed, so 51 remain. All 4 queens are still there, so P(queen | ace) = 4/51.'
          },
          {
            q: 'How many cards remain for the third draw?',
            answer: 50, tol: 0.01,
            explain: 'Two cards have now been removed, leaving 50. All 4 jacks remain, so P(jack | ace, queen) = 4/50.'
          },
          {
            q: 'Multiply the three probabilities. Enter the numerator of 4 × 4 × 4.',
            answer: 64, tol: 0.01,
            explain: '4 × 4 × 4 = 64, over 52 × 51 × 50 = 132 600. So the probability is 64/132 600, which simplifies to 8/16 575.'
          }
        ],
        solution: [
          { lab: 'P(ace)', val: '4/52' },
          { lab: 'P(queen | ace)', val: '4/51 — one card gone, all queens remain' },
          { lab: 'P(jack | ace, queen)', val: '4/50 — two cards gone, all jacks remain' },
          { lab: 'Multiply', val: '(4 × 4 × 4) ÷ (52 × 51 × 50) = 64/132 600' },
          { lab: 'Answer', val: '8/16 575', final: true }
        ],
        why: 'The numerators stay at 4 each time because removing an ace does not remove any queens or jacks. Only the denominator shrinks — 52, then 51, then 50.'
      },
      {
        id: 'w3mu5', type: 'mcq', marks: 1,
        prompt: 'Which phrase in a question tells you that events are <b>dependent</b>?',
        options: [
          '"without replacement"',
          '"at random"',
          '"mutually exclusive"',
          '"either or"'
        ],
        answer: 0,
        solution: [
          { lab: 'Without replacement', val: 'The item is not put back' },
          { lab: 'So the sample space', val: 'Is reduced for the next trial' },
          { lab: 'Answer', val: '"without replacement"', final: true }
        ],
        why: 'It is the single most reliable signal in these questions. Spot it, and you know your denominators must shrink.'
      }
    ]
  },

  /* ═══════════════════════ EXPECTED VALUE ═══════════════════════ */
  {
    id: 'w3-ev',
    title: 'Expected Values & Payoff Tables',
    emoji: '🎰',
    summary: 'Weighing up options when you cannot know which outcome you will get.',
    notes: [
      {
        heading: 'What an expected value is',
        emoji: '💡',
        html:
          '<p>E-Bike SA has spare cash and must decide what to do with it. Investing in new product development might ' +
          'return large profits — or fail miserably. How do you decide?</p>' +
          '<p>An <b>expected value (EV)</b> is a <b>weighted average</b> of all possible outcomes, with each outcome ' +
          'weighted by its probability of happening.</p>' +
          '<div class="keybox"><b>EV = Σ [P(x) × Payoff(x)]</b><br><br>' +
          'That is: (probability of outcome 1 × payoff 1) + (probability of outcome 2 × payoff 2) + …</div>' +
          '<div class="watchout"><b>It is not what you expect to get.</b> It is the average payoff you would receive if ' +
          'you ran the scenario hundreds or thousands of times. On any single occasion you will get one of the actual ' +
          'outcomes, not the EV.</div>' +
          '<p>As a decision rule: a project with a <b>positive</b> EV should generally be accepted; one with a ' +
          '<b>negative</b> EV should be rejected.</p>'
      },
      {
        heading: 'Payoff tables',
        emoji: '📋',
        html:
          '<p>A <b>payoff table</b> is a grid for organising your options under uncertainty:</p>' +
          '<ul class="tickly">' +
          '<li><b>Actions (columns)</b> — the choices you can make (print 500 vs print 1 000 programmes).</li>' +
          '<li><b>Circumstances (rows)</b> — the states of the world you cannot control (low vs high demand).</li>' +
          '<li><b>Payoffs (cells)</b> — the profit or cost for each combination of action and circumstance.</li>' +
          '</ul>' +
          '<p>Once the table is built, assign a probability to each circumstance and calculate the expected value ' +
          '<b>for each action</b>. Pick the action with the highest EV.</p>' +
          '<p>Payoff tables are used when a decision must be made, each action has consequences, and those consequences ' +
          'depend on circumstances that are not known at the time the decision is taken.</p>'
      },
      {
        heading: 'Limitations, risk and uncertainty',
        emoji: '⚠️',
        html:
          '<p>Expected value is powerful but not perfect:</p>' +
          '<ul class="tickly">' +
          '<li><b>Probability estimates</b> — these are often just estimates based on past experience. Wrong estimates, wrong EV.</li>' +
          '<li><b>Long-term average</b> — it tells you nothing about a single, once-off decision.</li>' +
          '<li><b>Risk attitude</b> — a start-up may accept a high-risk, high-reward bet that a large stable company would refuse, even at a lower EV.</li>' +
          '<li><b>Time value of money</b> — R100 now is worth more than R100 in ten years, and basic EV ignores that.</li>' +
          '</ul>' +
          '<div class="keybox"><b>Risk vs uncertainty</b><br>' +
          '<b>Risk</b> involves events that may not occur, but whose probability <b>can be calculated statistically</b> ' +
          'and frequency predicted. Calculating an expected value is a way of managing risk.<br><br>' +
          '<b>Uncertainty</b> involves events whose outcome <b>cannot be predicted</b> with statistical confidence — ' +
          'a completely new market, or a brand-new technology.</div>'
      }
    ],
    questions: [
      {
        id: 'w3ev1', type: 'steps', marks: 8,
        scenario:
          'E-bike SA charges customers an hourly rate of R150. It has collected the following probability distribution ' +
          'for rental duration on a typical workday:' +
          '<div class="tablewrap"><table class="dtable">' +
          '<tr><th>Rental duration (hours)</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>' +
          '<tr><th>Probability</th><td>0.10</td><td>0.25</td><td>0.40</td><td>0.20</td><td>0.05</td></tr>' +
          '</table></div>',
        prompt: 'The company wants to know whether it will meet a daily target of R28 800 if 80 customers rent bikes that day.',
        steps: [
          {
            q: 'Calculate the expected rental duration for a customer.',
            suf: 'hours', answer: 2.85, tol: 0.01,
            explain: 'EV = (1×0.10) + (2×0.25) + (3×0.40) + (4×0.20) + (5×0.05) = 0.10 + 0.50 + 1.20 + 0.80 + 0.25 = 2.85 hours.'
          },
          {
            q: 'Calculate the expected revenue for each rental.',
            pre: 'R', answer: 427.50, tol: 0.05,
            explain: 'Expected duration × hourly rate = 2.85 × R150 = R427.50.'
          },
          {
            q: 'Calculate the expected total revenue for that day (80 customers).',
            pre: 'R', answer: 34200, tol: 1,
            explain: 'R427.50 × 80 customers = R34 200.'
          }
        ],
        solution: [
          { lab: 'Expected duration', val: '(1×0.10)+(2×0.25)+(3×0.40)+(4×0.20)+(5×0.05) = 2.85 hours' },
          { lab: 'Expected revenue per rental', val: '2.85 × R150 = R427.50' },
          { lab: 'Expected total revenue', val: 'R427.50 × 80 = R34 200' },
          { lab: 'Target', val: 'R28 800' },
          { lab: 'Conclusion', val: 'Yes — the target is exceeded by R5 400', final: true }
        ],
        why: 'Each duration is weighted by how likely it is, which is why the answer (2.85) sits closest to 3 hours — the most probable outcome at 0.40.'
      },
      {
        id: 'w3ev2', type: 'numeric', marks: 3,
        scenario:
          'A project has three possible payoffs:' +
          '<div class="tablewrap"><table class="dtable">' +
          '<tr><th>Payoff (R)</th><td>100</td><td>200</td><td>300</td></tr>' +
          '<tr><th>Probability</th><td>0.2</td><td>0.5</td><td>0.3</td></tr>' +
          '</table></div>',
        prompt: 'Calculate the expected value.',
        pre: 'R', answer: 210, tol: 0.5,
        solution: [
          { lab: 'Formula', val: 'EV = Σ [P(x) × Payoff(x)]' },
          { lab: 'Substitute', val: '(100 × 0.2) + (200 × 0.5) + (300 × 0.3)' },
          { lab: 'Calculate', val: '20 + 100 + 90' },
          { lab: 'Answer', val: 'R210', final: true }
        ],
        why: 'Check your probabilities add to 1 (0.2 + 0.5 + 0.3 = 1.0) before you start. If they do not, something is missing.'
      },
      {
        id: 'w3ev3', type: 'mcq', marks: 1,
        prompt: 'As a general decision rule, a project with a <b>positive</b> expected value should be:',
        options: ['Accepted', 'Rejected', 'Delayed indefinitely', 'Split into smaller projects'],
        answer: 0,
        solution: [
          { lab: 'Positive EV', val: 'On average the project makes money' },
          { lab: 'Negative EV', val: 'On average it loses money' },
          { lab: 'Answer', val: 'Accept it', final: true }
        ],
        why: 'It is a general rule rather than an absolute one — a decision-maker\'s attitude to risk can still override it.'
      },
      {
        id: 'w3ev4', type: 'numeric', marks: 4,
        scenario:
          'E-Bike SA is considering a marketing campaign. There is a 35% chance it generates R80 000 additional profit, ' +
          'and a 65% chance it results in a R20 000 loss.',
        prompt: 'Calculate the expected value of the campaign.',
        pre: 'R', answer: 15000, tol: 1,
        note: 'Enter a negative number if the expected value is a loss.',
        solution: [
          { lab: 'Formula', val: 'EV = Σ [P(x) × Payoff(x)]' },
          { lab: 'Profit outcome', val: 'R80 000 × 0.35 = R28 000' },
          { lab: 'Loss outcome', val: '−R20 000 × 0.65 = −R13 000' },
          { lab: 'Add them', val: 'R28 000 − R13 000' },
          { lab: 'Answer', val: 'R15 000 — a positive EV, so accept', final: true }
        ],
        why: 'The loss must be entered as a negative payoff. Even though failure is more likely than success, the size of the potential gain makes the expected value positive.'
      },
      {
        id: 'w3ev5', type: 'mcq', marks: 2,
        prompt: 'Which of the following is a genuine <b>limitation</b> of using expected values?',
        options: [
          'It is a long-term average and says nothing about a single once-off decision',
          'It cannot be calculated when probabilities are known',
          'It always overstates the profit of a project',
          'It can only be used for projects with two possible outcomes'
        ],
        answer: 0,
        solution: [
          { lab: 'EV', val: 'The average payoff over many repetitions' },
          { lab: 'A once-off decision', val: 'Gives you one actual outcome, not the average' },
          { lab: 'Answer', val: 'It is a long-term average', final: true }
        ],
        why: 'You might back an EV of R1 650, but if demand turns out to be the 10%-likely low case, you actually only make R850. The EV never promised otherwise.'
      }
    ]
  }

  ]
});
