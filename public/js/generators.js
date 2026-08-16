/* Abi's Study Buddy — question generators.
   Each generator returns a fresh question with randomised values, and builds its own
   worked solution from those same values, so the answer and the working can never
   disagree. Registered by topic id, so the week data files stay untouched.  */

var GEN = (function () {
  var R = Rand;
  var reg = {};

  function add(topicId, fns) {
    reg[topicId] = (reg[topicId] || []).concat(fns);
  }

  /* Produces up to n distinct questions for a topic. Distinctness is judged on the
     rendered prompt, so two rolls that happen to land on the same numbers collapse. */
  function make(topicId, n) {
    var fns = reg[topicId] || [];
    if (!fns.length || n <= 0) return [];
    var out = [], seen = {}, attempts = 0, maxAttempts = n * 12;
    while (out.length < n && attempts < maxAttempts) {
      attempts++;
      var q;
      try { q = fns[attempts % fns.length](); } catch (e) { continue; }
      if (!q) continue;
      var key = (q.scenario || '') + '|' + q.prompt;
      if (seen[key]) continue;
      seen[key] = true;
      q.id = topicId + '-g' + out.length + '-' + attempts;
      q.generated = true;
      out.push(q);
    }
    return out;
  }

  function has(topicId) { return !!(reg[topicId] && reg[topicId].length); }

  /* ══════════════════════════════════════════════════════════════
     WEEK 1 — FRACTIONS
     ══════════════════════════════════════════════════════════════ */

  add('w1-basics', [
    function () {
      var d = R.int(4, 12), nu = R.int(1, d - 1);
      var askDen = R.int(0, 1) === 0;
      return {
        type: 'mcq', marks: 1,
        prompt: 'In the fraction ' + R.frac(nu, d) + ', which number is the <b>' +
                (askDen ? 'denominator' : 'numerator') + '</b>?',
        options: R.options(askDen ? d : nu, [askDen ? nu : d, nu + d, Math.abs(d - nu)]),
        answer: 0,
        solution: [
          { lab: 'Numerator', val: 'the top number — ' + nu + ', how many parts we refer to' },
          { lab: 'Denominator', val: 'the bottom number — ' + d + ', the total equal parts' },
          { lab: 'Answer', val: String(askDen ? d : nu), final: true }
        ],
        why: 'The whole was divided into ' + d + ' equal parts and we are referring to ' + nu +
             ' of them. The total always sits underneath.'
      };
    },
    function () {
      var d = R.int(3, 9), nu = d + R.int(1, 5);
      var p1 = R.int(2, 9), p2 = p1 + R.int(1, 4);
      var p3 = R.int(2, 7), p4 = p3 + R.int(1, 5);
      return {
        type: 'mcq', marks: 2,
        prompt: 'Which of the following is an <b>improper</b> fraction?',
        options: R.options(R.frac(nu, d), [R.frac(p1, p2), R.frac(p3, p4), R.frac(1, d)]),
        answer: 0,
        solution: [
          { lab: 'Improper fraction', val: 'numerator larger than the denominator' },
          { lab: 'Check', val: nu + ' > ' + d + ' ✓' },
          { lab: 'Answer', val: nu + '/' + d, final: true }
        ],
        why: nu + '/' + d + ' refers to more than one whole — ' + d + ' ' + d +
             'ths make one whole, with ' + (nu - d) + ' left over.'
      };
    },
    function () {
      var days = R.pick([12, 15, 18, 20, 24, 30, 36]);
      var months = R.pick([2, 3, 4, 6, 8, 9, 10]);
      var ans = (months / 12) * days;
      if (Math.round(ans * 100) !== ans * 100) return null;     // keep it tidy
      var g = R.gcd(months, 12);
      return {
        type: 'numeric', marks: 3,
        scenario: 'Company policy entitles each employee to ' + days +
                  ' leave days per year, accumulated evenly over the 12 months.',
        prompt: 'An employee has worked ' + months + ' of the 12 months. How many leave days have they earned?',
        suf: 'days', answer: R.round(ans, 4), tol: 0.02,
        solution: [
          { lab: 'Portion of the year worked', val: months + '/12' },
          { lab: 'Simplify', val: months + '/12 = ' + (months / g) + '/' + (12 / g) },
          { lab: 'Apply to the entitlement', val: (months / g) + '/' + (12 / g) + ' × ' + days },
          { lab: 'Answer', val: R.round(ans, 2) + ' days', final: true }
        ],
        why: 'Leave accrues month by month, so the employee earns the same fraction of the ' +
             days + ' days as the fraction of the year they have worked.'
      };
    },
    function () {
      var w = R.int(2, 6), d = R.int(3, 9), nu = R.int(1, d - 1);
      return {
        type: 'steps', marks: 4,
        prompt: 'Convert the mixed number ' + w + R.frac(nu, d) + ' into an improper fraction.',
        steps: [
          {
            q: 'First write the whole number ' + w + ' as a fraction with a denominator of ' + d +
               '. What is its numerator?',
            answer: w * d, tol: 0.01,
            explain: 'One whole is ' + d + '/' + d + ', so ' + w + ' wholes are ' + (w * d) + '/' + d + '.'
          },
          {
            q: 'Now add the numerators. What is the numerator of the improper fraction?',
            answer: w * d + nu, tol: 0.01,
            explain: (w * d) + '/' + d + ' + ' + nu + '/' + d + ' = ' + (w * d + nu) + '/' + d +
                     '. Only the numerators are added — the denominator stays ' + d + '.'
          }
        ],
        solution: [
          { lab: 'Whole number as a fraction', val: w + ' = ' + (w * d) + '/' + d },
          { lab: 'Add the numerators', val: '(' + (w * d) + ' + ' + nu + ')/' + d },
          { lab: 'Answer', val: (w * d + nu) + '/' + d, final: true }
        ],
        why: 'Every whole contains ' + d + ' parts, so ' + w + ' wholes contain ' + (w * d) + '.'
      };
    }
  ]);

  add('w1-simplify', [
    function () {
      var a = R.int(2, 7), b = a + R.int(1, 6), k = R.int(2, 6);
      if (R.gcd(a, b) !== 1) return null;
      return {
        type: 'mcq', marks: 2,
        prompt: 'Simplify ' + R.frac(a * k, b * k) + ' to its lowest terms.',
        options: R.options(R.frac(a, b), [R.frac(b, a), R.frac(a * k, b), R.frac(a, b * k)]),
        answer: 0,
        solution: [
          { lab: 'Largest number dividing both', val: String(k) },
          { lab: 'Divide both', val: '(' + (a * k) + ' ÷ ' + k + ') / (' + (b * k) + ' ÷ ' + k + ')' },
          { lab: 'Answer', val: a + '/' + b, final: true }
        ],
        why: a + ' and ' + b + ' share no common factor, so ' + a + '/' + b + ' is fully simplified.'
      };
    },
    function () {
      var g = R.int(4, 15), a = R.int(2, 6), b = a + R.int(1, 5);
      if (R.gcd(a, b) !== 1) return null;
      return {
        type: 'numeric', marks: 2,
        prompt: 'What is the <b>largest</b> number that divides exactly into both ' +
                (a * g) + ' and ' + (b * g) + '?',
        answer: g, tol: 0.01,
        solution: [
          { lab: 'Both numbers', val: (a * g) + ' = ' + a + ' × ' + g + ', and ' + (b * g) + ' = ' + b + ' × ' + g },
          { lab: 'Shared factor', val: String(g) },
          { lab: 'Answer', val: String(g), final: true }
        ],
        why: 'Finding this lets you simplify ' + (a * g) + '/' + (b * g) + ' to ' + a + '/' + b + ' in one step.'
      };
    },
    function () {
      var a = R.int(2, 6), b = a + R.int(1, 5), k = R.int(2, 5);
      if (R.gcd(a, b) !== 1) return null;
      return {
        type: 'mcq', marks: 2,
        prompt: 'Which of the following is <b>equivalent</b> to ' + R.frac(a, b) + '?',
        options: R.options(R.frac(a * k, b * k), [R.frac(a + k, b + k), R.frac(a * k, b), R.frac(b, a)]),
        answer: 0,
        solution: [
          { lab: 'Multiply top and bottom by ' + k, val: '(' + a + ' × ' + k + ') / (' + b + ' × ' + k + ')' },
          { lab: 'Answer', val: (a * k) + '/' + (b * k), final: true }
        ],
        why: 'Adding the same number to top and bottom does NOT keep the value — only multiplying or dividing does.'
      };
    },
    function () {
      var a = R.int(2, 7), b = a + R.int(1, 6), k = R.int(3, 8);
      if (R.gcd(a, b) !== 1) return null;
      return {
        type: 'steps', marks: 4,
        prompt: 'Simplify ' + R.frac(a * k, b * k) + ' to its lowest terms.',
        steps: [
          { q: 'What is the largest number that divides exactly into both ' + (a * k) + ' and ' + (b * k) + '?',
            answer: k, tol: 0.01,
            explain: k + ' divides into ' + (a * k) + ' ' + a + ' times and into ' + (b * k) + ' ' + b + ' times.' },
          { q: 'Divide the numerator by it. What is the new numerator?',
            answer: a, tol: 0.01, explain: (a * k) + ' ÷ ' + k + ' = ' + a + '.' },
          { q: 'Now divide the denominator by the same number.',
            answer: b, tol: 0.01, explain: (b * k) + ' ÷ ' + k + ' = ' + b + ', giving ' + a + '/' + b + '.' }
        ],
        solution: [
          { lab: 'Largest common divisor', val: String(k) },
          { lab: 'Divide both', val: '(' + (a * k) + ' ÷ ' + k + ') / (' + (b * k) + ' ÷ ' + k + ')' },
          { lab: 'Answer', val: a + '/' + b, final: true }
        ],
        why: 'Dividing top and bottom by the same number changes how it is written, never what it is worth.'
      };
    }
  ]);

  add('w1-multiply', [
    function () {
      var a = R.int(1, 6), b = R.int(2, 9), c = R.int(1, 6), d = R.int(2, 9);
      if (a >= b || c >= d) return null;
      return {
        type: 'mcq', marks: 2,
        prompt: 'Calculate ' + R.frac(a, b) + ' × ' + R.frac(c, d) + '.',
        options: R.options(R.frac(a * c, b * d), [R.frac(a + c, b + d), R.frac(a * d, b * c), R.frac(a + c, b * d)]),
        answer: 0,
        solution: [
          { lab: 'Multiply the numerators', val: a + ' × ' + c + ' = ' + (a * c) },
          { lab: 'Multiply the denominators', val: b + ' × ' + d + ' = ' + (b * d) },
          { lab: 'Answer', val: (a * c) + '/' + (b * d), final: true }
        ],
        why: 'You never add when multiplying fractions — straight across, top and bottom.'
      };
    },
    function () {
      var d = R.pick([4, 5, 6, 8, 10]), nu = R.int(1, d - 1);
      var total = R.step(2000, 20000, d * 100);
      var ans = total * nu / d;
      return {
        type: 'numeric', marks: 3,
        prompt: 'E-Bike SA allocates ' + R.frac(nu, d) + ' of its R' + R.num(total) +
                ' marketing budget to online advertising. How much is that?',
        pre: 'R', answer: ans, tol: 1,
        solution: [
          { lab: 'A fraction of an amount', val: 'means multiply' },
          { lab: 'One ' + d + 'th of the budget', val: 'R' + R.num(total) + ' ÷ ' + d + ' = R' + R.num(total / d) },
          { lab: 'So ' + nu + ' of them', val: 'R' + R.num(total / d) + ' × ' + nu },
          { lab: 'Answer', val: 'R' + R.num(ans), final: true }
        ],
        why: 'Dividing by the denominator first keeps the numbers small and easy to check mentally.'
      };
    },
    function () {
      var a = R.int(2, 6), b = R.int(3, 9), c = R.int(2, 8), d = R.int(3, 9);
      var n = a * c, m = b * d, g = R.gcd(n, m);
      if (g === 1) return null;                          // want one that actually simplifies
      return {
        type: 'steps', marks: 5,
        prompt: 'Calculate ' + R.frac(a, b) + ' × ' + R.frac(c, d) + ', giving your answer in its lowest terms.',
        steps: [
          { q: 'Multiply the numerators. What do you get?', answer: n, tol: 0.01,
            explain: a + ' × ' + c + ' = ' + n + '.' },
          { q: 'Multiply the denominators. What do you get?', answer: m, tol: 0.01,
            explain: b + ' × ' + d + ' = ' + m + ', so the unsimplified answer is ' + n + '/' + m + '.' },
          { q: 'Now simplify ' + n + '/' + m + '. What is the numerator of the simplified fraction?',
            answer: n / g, tol: 0.01,
            explain: g + ' divides into both: ' + n + ' ÷ ' + g + ' = ' + (n / g) + ' and ' +
                     m + ' ÷ ' + g + ' = ' + (m / g) + '.' }
        ],
        solution: [
          { lab: 'Multiply straight across', val: '(' + a + ' × ' + c + ')/(' + b + ' × ' + d + ') = ' + n + '/' + m },
          { lab: 'Largest common divisor', val: String(g) },
          { lab: 'Answer', val: (n / g) + '/' + (m / g), final: true }
        ],
        why: 'Always check whether the result simplifies — a correct value left in higher terms is still not in lowest terms.'
      };
    }
  ]);

  add('w1-divide', [
    function () {
      var a = R.int(2, 9), b = R.int(2, 9);
      if (a === b) return null;
      return {
        type: 'mcq', marks: 1,
        prompt: 'What is the <b>reciprocal</b> of ' + R.frac(a, b) + '?',
        options: R.options(R.frac(b, a), [R.frac(a, b), R.frac(1, a), R.frac(1, b)]),
        answer: 0,
        solution: [
          { lab: 'Reciprocal', val: 'swap the numerator and the denominator' },
          { lab: 'Answer', val: b + '/' + a, final: true }
        ],
        why: 'The reciprocal is just the fraction upside down — the only new idea division needs.'
      };
    },
    function () {
      var a = R.int(1, 7), b = R.int(2, 9), c = R.int(1, 6), d = R.int(2, 9);
      if (a >= b || c >= d) return null;
      var n = a * d, m = b * c, g = R.gcd(n, m);
      return {
        type: 'mcq', marks: 3,
        prompt: 'Calculate ' + R.frac(a, b) + ' ÷ ' + R.frac(c, d) + '.',
        options: R.options(R.frac(n / g, m / g), [R.frac(a * c, b * d), R.frac(m / g, n / g), R.frac(a, b)]),
        answer: 0,
        solution: [
          { lab: 'Flip the second fraction', val: c + '/' + d + ' becomes ' + d + '/' + c },
          { lab: 'Multiply', val: '(' + a + ' × ' + d + ')/(' + b + ' × ' + c + ') = ' + n + '/' + m },
          { lab: 'Answer', val: (n / g) + '/' + (m / g), final: true }
        ],
        why: 'Multiplying instead of flipping gives ' + (a * c) + '/' + (b * d) + ' — the classic slip on these.'
      };
    },
    function () {
      var slotDen = R.pick([2, 3, 4, 6]);
      var wholes = R.int(1, 4), extraNum = R.int(1, slotDen - 1);
      var hours = wholes + extraNum / slotDen;
      var ans = hours * slotDen;
      if (Math.round(ans) !== ans) return null;
      return {
        type: 'numeric', marks: 3,
        prompt: 'A workshop has ' + wholes + R.frac(extraNum, slotDen) + ' hours available. Each service booking takes ' +
                R.frac(1, slotDen) + ' of an hour. How many bookings fit into the available time?',
        suf: 'bookings', answer: ans, tol: 0.01,
        solution: [
          { lab: 'Write the mixed number as an improper fraction',
            val: wholes + ' ' + extraNum + '/' + slotDen + ' = ' + (wholes * slotDen + extraNum) + '/' + slotDen },
          { lab: 'The problem', val: (wholes * slotDen + extraNum) + '/' + slotDen + ' ÷ 1/' + slotDen },
          { lab: 'Flip and multiply', val: (wholes * slotDen + extraNum) + '/' + slotDen + ' × ' + slotDen + '/1' },
          { lab: 'Answer', val: ans + ' bookings', final: true }
        ],
        why: '"How many of these fit into that" is always a division. Convert the mixed number first.'
      };
    }
  ]);

  add('w1-addsub', [
    function () {
      var b = R.pick([3, 4, 5, 6, 8, 9, 10]), d = R.pick([3, 4, 5, 6, 8, 9, 10]);
      if (b === d) return null;
      var a = R.int(1, b - 1), c = R.int(1, d - 1);
      var m = b * d / R.gcd(b, d);
      var n = a * (m / b) + c * (m / d);
      if (n >= m) return null;                        // keep the answer a proper fraction
      var g = R.gcd(n, m);
      return {
        type: 'mcq', marks: 3,
        prompt: 'Calculate ' + R.frac(a, b) + ' + ' + R.frac(c, d) + ', in its lowest terms.',
        options: R.options(R.frac(n / g, m / g), [R.frac(a + c, b + d), R.frac(a + c, m), R.frac(n, b * d)]),
        answer: 0,
        solution: [
          { lab: 'Common denominator', val: String(m) },
          { lab: 'Rescale', val: a + '/' + b + ' = ' + (a * (m / b)) + '/' + m + ' and ' +
                                 c + '/' + d + ' = ' + (c * (m / d)) + '/' + m },
          { lab: 'Add the numerators', val: '(' + (a * (m / b)) + ' + ' + (c * (m / d)) + ')/' + m + ' = ' + n + '/' + m },
          { lab: 'Answer', val: (n / g) + '/' + (m / g), final: true }
        ],
        why: 'Adding tops and bottoms gives ' + (a + c) + '/' + (b + d) + ', which is never how addition works.'
      };
    },
    function () {
      var b = R.pick([3, 4, 6, 8, 9, 10, 12]), d = R.pick([3, 4, 6, 8, 9, 10, 12]);
      if (b === d) return null;
      var m = b * d / R.gcd(b, d);
      return {
        type: 'numeric', marks: 2,
        prompt: 'What is the <b>smallest</b> common denominator for ' + R.frac(1, b) + ' and ' + R.frac(1, d) + '?',
        answer: m, tol: 0.01,
        solution: [
          { lab: 'Start with the higher denominator', val: String(Math.max(b, d)) },
          { lab: 'Walk up its multiples', val: 'until one divides by ' + Math.min(b, d) },
          { lab: 'Answer', val: String(m), final: true }
        ],
        why: 'Multiplying the denominators gives ' + (b * d) + ', which also works but is not always the smallest.'
      };
    },
    function () {
      var b = R.pick([3, 4, 5, 6, 8, 10, 12]), d = R.pick([3, 4, 5, 6, 8, 10, 12]);
      if (b === d) return null;
      var m = b * d / R.gcd(b, d);
      var a = R.int(1, b - 1), c = R.int(1, d - 1);
      var n = a * (m / b) - c * (m / d);
      if (n <= 0) return null;
      var g = R.gcd(n, m);
      return {
        type: 'mcq', marks: 3,
        prompt: 'Calculate ' + R.frac(a, b) + ' − ' + R.frac(c, d) + ', in its lowest terms.',
        options: R.options(R.frac(n / g, m / g), [R.frac(Math.abs(a - c), Math.abs(b - d) || 1), R.frac(n, b * d), R.frac(a - c + m, m)]),
        answer: 0,
        solution: [
          { lab: 'Smallest common denominator', val: String(m) },
          { lab: 'Rescale', val: a + '/' + b + ' = ' + (a * (m / b)) + '/' + m + ' and ' +
                                 c + '/' + d + ' = ' + (c * (m / d)) + '/' + m },
          { lab: 'Subtract the numerators', val: '(' + (a * (m / b)) + ' − ' + (c * (m / d)) + ')/' + m },
          { lab: 'Answer', val: (n / g) + '/' + (m / g), final: true }
        ],
        why: 'Subtraction needs exactly the same preparation as addition — only the last step changes.'
      };
    },
    function () {
      var b = R.pick([3, 4, 5, 6, 7, 8]), k = R.int(2, 5), a = R.int(1, b - 1);
      return {
        type: 'numeric', marks: 2,
        prompt: 'Rewrite ' + R.frac(a, b) + ' as an equivalent fraction with a denominator of ' + (b * k) +
                '. What is the new numerator?',
        answer: a * k, tol: 0.01,
        solution: [
          { lab: 'What did the denominator do?', val: b + ' × ' + k + ' = ' + (b * k) },
          { lab: 'Do the same to the numerator', val: a + ' × ' + k },
          { lab: 'Answer', val: (a * k) + ', giving ' + (a * k) + '/' + (b * k), final: true }
        ],
        why: 'This rescaling step is the heart of adding and subtracting fractions.'
      };
    }
  ]);

  /* ══════════════════════════════════════════════════════════════
     WEEK 1 — DECIMALS, ROUNDING, EXPONENTS
     ══════════════════════════════════════════════════════════════ */

  var PLACES = [
    { name: 'tenths', idx: 0 }, { name: 'hundredths', idx: 1 }, { name: 'thousandths', idx: 2 }
  ];

  add('w1-decimals', [
    function () {
      var digits = R.distinct(3, 1, 9);   // distinct so the distractors never collapse
      var whole = R.int(11, 99);
      var place = R.pick(PLACES);
      var numStr = whole + '.' + digits.join('');
      return {
        type: 'mcq', marks: 2,
        prompt: 'In the number ' + numStr + ', which digit is in the <b>' + place.name + '</b> place?',
        options: R.options(digits[place.idx], [digits[(place.idx + 1) % 3], digits[(place.idx + 2) % 3],
                                               Number(String(whole).charAt(0))]),
        answer: 0,
        solution: [
          { lab: 'Right of the point', val: digits[0] + ' = tenths, ' + digits[1] + ' = hundredths, ' + digits[2] + ' = thousandths' },
          { lab: 'Answer', val: String(digits[place.idx]), final: true }
        ],
        why: 'Count places to the right of the point — the first is tenths, not "oneths".'
      };
    },
    function () {
      var d = R.pick([2, 4, 5, 8, 10, 16, 20, 25]), nu = R.int(1, d - 1);
      var val = nu / d;
      if (String(val).replace('0.', '').length > 4) return null;   // keep it terminating and short
      return {
        type: 'numeric', marks: 2,
        prompt: 'Convert ' + R.frac(nu, d) + ' to a decimal.',
        answer: val, tol: 0.0005,
        solution: [
          { lab: 'A fraction is a division', val: nu + ' ÷ ' + d },
          { lab: 'Answer', val: String(val), final: true }
        ],
        why: 'Divide the top by the bottom — the same first step you use to turn a fraction into a percentage.'
      };
    },
    function () {
      var digits = R.distinct(4, 1, 9);
      var numStr = digits[0] + ' ' + digits[1] + digits[2] + digits[3];
      var pos = R.int(0, 3);
      var names = ['thousands', 'hundreds', 'tens', 'ones'];
      var values = [1000, 100, 10, 1];
      return {
        type: 'mcq', marks: 1,
        prompt: 'In the number ' + numStr + ', what does the digit <b>' + digits[pos] + '</b> represent?',
        options: R.options(digits[pos] + ' ' + names[pos],
                           [digits[pos] + ' ' + names[(pos + 1) % 4],
                            digits[pos] + ' ' + names[(pos + 2) % 4],
                            digits[pos] + ' tenths']),
        answer: 0,
        solution: [
          { lab: 'Reading left from the point', val: names.slice().reverse().join(', then ') },
          { lab: 'Answer', val: digits[pos] + ' ' + names[pos] + ', that is ' + (digits[pos] * values[pos]), final: true }
        ],
        why: 'A digit\'s value comes entirely from its position.'
      };
    }
  ]);

  add('w1-rounding', [
    function () {
      var whole = R.int(10, 99);
      var digits = R.list(4, 1, 9);
      var place = R.pick([{ n: 'tenth', p: 1 }, { n: 'hundredth', p: 2 }]);
      var value = Number(whole + '.' + digits.join(''));
      var ans = R.round(value, place.p);
      var nextDigit = digits[place.p];
      return {
        type: 'numeric', marks: 2,
        prompt: 'Round <b>off</b> ' + value + ' to the nearest ' + place.n + '.',
        answer: ans, tol: 0.0005,
        solution: [
          { lab: 'The ' + place.n + 's digit', val: String(digits[place.p - 1]) },
          { lab: 'Next digit along', val: nextDigit + ', which is ' + (nextDigit >= 5 ? '5 or more, so round up' : 'less than 5, so round down') },
          { lab: 'Answer', val: String(ans), final: true }
        ],
        why: 'Only the digit immediately after the rounding place decides it — nothing beyond that.'
      };
    },
    function () {
      var whole = R.int(10, 80), frac = R.int(1, 49) / 100;
      var value = R.round(whole + frac, 2);
      return {
        type: 'mcq', marks: 2,
        prompt: 'Rounding ' + value + ' <b>up</b> to the nearest whole number gives:',
        options: R.options(whole + 1, [whole, R.round(value, 1), whole + 2]),
        answer: 0,
        solution: [
          { lab: 'Rounding up', val: 'any fraction of a whole becomes a whole' },
          { lab: 'Answer', val: String(whole + 1), final: true }
        ],
        why: 'Rounding *off* would give ' + whole + ', because the decimal part is under a half. Rounding *up* takes the next whole regardless.'
      };
    },
    function () {
      var weight = R.int(100, 500) + R.pick([0.4, 0.6, 0.7, 0.3, 0.8]);
      weight = R.round(weight, 1);
      var rate = R.pick([4, 5, 6, 8, 9, 12]);
      var rounded = Math.round(weight);
      var ans = rounded * rate;
      return {
        type: 'numeric', marks: 3,
        prompt: 'A consignment weighs ' + weight + ' kg and the courier charges R' + rate +
                ' per kilogram. Rounding the weight <b>off</b> to the nearest whole kilogram, what is the transport cost?',
        pre: 'R', answer: ans, tol: 1,
        solution: [
          { lab: 'Round the weight', val: weight + ' → ' + rounded + ' kg' },
          { lab: 'Multiply by the rate', val: rounded + ' × R' + rate },
          { lab: 'Answer', val: 'R' + R.num(ans), final: true }
        ],
        why: 'Reasonability check: ' + rounded + ' × ' + rate + ' should be near ' + rounded + ' × ' +
             (rate < 10 ? 10 : 10) + ' = ' + R.num(rounded * 10) + '. If your calculator gave something wildly different, you would spot it.'
      };
    }
  ]);

  add('w1-powers', [
    function () {
      var base = R.int(2, 9), exp = R.int(3, 6);
      var parts = [];
      for (var i = 0; i < exp; i++) parts.push(base);
      return {
        type: 'mcq', marks: 1,
        prompt: 'Written in power notation, ' + parts.join(' × ') + ' is:',
        options: R.options(base + '<sup>' + exp + '</sup>',
                           [exp + '<sup>' + base + '</sup>', base + ' × ' + exp, base + '<sup>' + (exp - 1) + '</sup>']),
        answer: 0,
        solution: [
          { lab: 'The base', val: String(base) + ' — the number being multiplied' },
          { lab: 'The exponent', val: String(exp) + ' — how many times it appears' },
          { lab: 'Answer', val: base + '^' + exp, final: true }
        ],
        why: exp + '^' + base + ' would be a completely different number. The base goes large, the count goes raised.'
      };
    },
    function () {
      var base = R.int(2, 7), exp = R.int(2, 5);
      var ans = Math.pow(base, exp);
      if (ans > 5000) return null;
      var chain = [], run = 1, seq = [];
      for (var i = 0; i < exp; i++) { run *= base; seq.push(run); chain.push(base); }
      return {
        type: 'numeric', marks: 2,
        prompt: 'Calculate ' + base + '<sup>' + exp + '</sup>.',
        answer: ans, tol: 0.01,
        solution: [
          { lab: 'Expand', val: chain.join(' × ') },
          { lab: 'Work through it', val: seq.join(', ') },
          { lab: 'Answer', val: String(ans), final: true }
        ],
        why: 'The exponent counts how many ' + base + 's are multiplied, not how many multiplications you do.'
      };
    },
    function () {
      var root = R.int(4, 20), sq = root * root;
      return {
        type: 'numeric', marks: 2,
        prompt: 'Calculate √' + sq + '.',
        answer: root, tol: 0.01,
        solution: [
          { lab: 'What we need', val: 'a number that multiplied by itself gives ' + sq },
          { lab: 'Test', val: root + ' × ' + root + ' = ' + sq },
          { lab: 'Answer', val: String(root), final: true }
        ],
        why: 'No number to the left of the root sign means a square root, so you need the value that appears twice.'
      };
    },
    function () {
      var root = R.int(2, 8), cube = root * root * root;
      return {
        type: 'numeric', marks: 2,
        prompt: 'Calculate <sup>3</sup>√' + cube + ', the cube root of ' + cube + '.',
        answer: root, tol: 0.01,
        solution: [
          { lab: 'What we need', val: 'a number appearing three times that gives ' + cube },
          { lab: 'Test', val: root + ' × ' + root + ' × ' + root + ' = ' + cube },
          { lab: 'Answer', val: String(root), final: true }
        ],
        why: 'The small 3 on the root sign tells you the value must appear three times, not two.'
      };
    }
  ]);

  add('w1-exprules', [
    function () {
      var base = R.int(2, 6), a = R.int(2, 4), b = R.int(2, 4);
      var ans = Math.pow(base, a + b);
      if (ans > 200000) return null;
      return {
        type: 'numeric', marks: 3,
        prompt: 'Simplify and calculate ' + base + '<sup>' + a + '</sup> × ' + base + '<sup>' + b + '</sup>.',
        answer: ans, tol: 0.01,
        solution: [
          { lab: 'Same base multiplied', val: 'add the exponents: ' + a + ' + ' + b + ' = ' + (a + b) },
          { lab: 'So', val: base + '^' + (a + b) },
          { lab: 'Answer', val: R.num(ans), final: true }
        ],
        why: 'Adding the exponents first is quicker and far less error-prone than expanding both powers.'
      };
    },
    function () {
      var base = R.int(2, 7), b = R.int(2, 4), a = b + R.int(1, 3);
      var ans = Math.pow(base, a - b);
      return {
        type: 'numeric', marks: 3,
        prompt: 'Simplify and calculate ' + R.frac(base + '<sup>' + a + '</sup>', base + '<sup>' + b + '</sup>') + '.',
        answer: ans, tol: 0.01,
        solution: [
          { lab: 'Same base divided', val: 'subtract the exponents: ' + a + ' − ' + b + ' = ' + (a - b) },
          { lab: 'So', val: base + '^' + (a - b) },
          { lab: 'Answer', val: R.num(ans), final: true }
        ],
        why: 'Simplifying first saves you from dividing ' + R.num(Math.pow(base, a)) + ' by ' + R.num(Math.pow(base, b)) + ' by hand.'
      };
    },
    function () {
      var a = R.int(2, 6), b = R.int(2, 6);
      return {
        type: 'mcq', marks: 2,
        prompt: 'Simplify (x<sup>' + a + '</sup>)<sup>' + b + '</sup>.',
        options: R.options('x<sup>' + (a * b) + '</sup>',
                           ['x<sup>' + (a + b) + '</sup>', 'x<sup>' + Math.pow(a, b) + '</sup>', a + 'x<sup>' + b + '</sup>']),
        answer: 0,
        solution: [
          { lab: 'Power raised to a power', val: 'multiply the exponents' },
          { lab: 'Calculate', val: a + ' × ' + b + ' = ' + (a * b) },
          { lab: 'Answer', val: 'x^' + (a * b), final: true }
        ],
        why: 'x^' + (a + b) + ' comes from adding — but adding is the rule for multiplying two powers, not raising one to another.'
      };
    }
  ]);

  add('w1-decay', [
    function () {
      var r = R.pick([2, 3, 4, 5, 6, 7, 8, 10, 12, 15]);
      var mult = R.round(1 - r / 100, 4);
      return {
        type: 'numeric', marks: 2,
        prompt: 'A battery loses ' + r + '% of its charge each month. What number must you multiply by each month?',
        answer: mult, tol: 0.0005,
        solution: [
          { lab: 'Losing ' + r + '%', val: 'means ' + (100 - r) + '% remains' },
          { lab: 'As a decimal', val: '1 − ' + (r / 100) },
          { lab: 'Answer', val: String(mult), final: true }
        ],
        why: 'The multiplier is what is left, not what is lost. Multiplying by ' + (r / 100) + ' would give the amount lost.'
      };
    },
    function () {
      var r = R.pick([3, 4, 5, 6, 8, 10, 12]), n = R.int(2, 6);
      var mult = R.round(1 - r / 100, 4);
      var remaining = R.round(100 * Math.pow(mult, n), 2);
      return {
        type: 'steps', marks: 5,
        scenario: 'A stored battery starts fully charged at 100% and self-discharges at ' + r + '% per month for ' + n + ' months.',
        prompt: 'Calculate the percentage of charge remaining.',
        steps: [
          { q: 'What is the monthly multiplier?', answer: mult, tol: 0.0005,
            explain: 'Losing ' + r + '% leaves ' + (100 - r) + '%, so the multiplier is 1 − ' + (r / 100) + ' = ' + mult + '.' },
          { q: 'What power must the multiplier be raised to?', answer: n, tol: 0.01,
            explain: n + ' months have passed, so it is raised to the power of ' + n + '.' },
          { q: 'Calculate the percentage of charge remaining, to two decimal places.',
            suf: '%', answer: remaining, tol: 0.05,
            explain: '(' + mult + ')^' + n + ' = ' + R.round(Math.pow(mult, n), 6) + ', so ' + remaining + '% remains.' }
        ],
        solution: [
          { lab: 'Monthly multiplier', val: '1 − ' + (r / 100) + ' = ' + mult },
          { lab: 'Number of periods', val: n + ' months' },
          { lab: 'Apply', val: '100% × (' + mult + ')^' + n },
          { lab: 'Answer', val: remaining + '% remaining', final: true }
        ],
        why: 'Subtracting ' + r + '% ' + n + ' times would suggest ' + (100 - r * n) +
             '% left. The real answer is higher, because each month\'s ' + r + '% comes off a smaller amount.'
      };
    },
    function () {
      var r = R.pick([3, 4, 5, 6, 7, 8, 10]), n = R.int(3, 6);
      var start = R.step(200000, 900000, 50000);
      var ans = R.round(start * Math.pow(1 + r / 100, n), 2);
      return {
        type: 'numeric', marks: 4,
        prompt: 'E-Bike SA\'s annual sales are R' + R.num(start) + ' and are expected to grow by ' + r +
                '% each year. What will annual sales be after ' + n + ' years, to the nearest rand?',
        pre: 'R', answer: Math.round(ans), tol: 2,
        solution: [
          { lab: 'Growth multiplier', val: '1 + ' + (r / 100) + ' = ' + R.round(1 + r / 100, 4) },
          { lab: 'Number of periods', val: n + ' years' },
          { lab: 'Apply', val: 'R' + R.num(start) + ' × (' + R.round(1 + r / 100, 4) + ')^' + n },
          { lab: 'Answer', val: 'R' + R.money(Math.round(ans), 0), final: true }
        ],
        why: 'Growth uses 1 + rate rather than 1 − rate. This is structurally identical to the compound interest formula in Week 4.'
      };
    }
  ]);

  /* ══════════════════════════════════════════════════════════════
     WEEK 2 — PERCENTAGES
     ══════════════════════════════════════════════════════════════ */

  add('w2-convert', [
    function () {
      var d = R.int(7, 40), n = R.int(2, d - 1);
      var pct = R.round((n / d) * 100, 2);
      return {
        type: 'numeric', marks: 2,
        prompt: 'Express ' + R.frac(n, d) + ' as a percentage, correct to two decimal places.',
        suf: '%', answer: pct, tol: 0.02,
        note: 'Round to 2 decimal places.',
        solution: [
          { lab: 'Convert to a decimal', val: n + ' ÷ ' + d + ' = ' + R.round(n / d, 6) + '…' },
          { lab: 'Multiply by 100', val: R.round(n / d, 6) + ' × 100' },
          { lab: 'Answer', val: pct + '%', final: true }
        ],
        why: 'A fraction is a division. Do the division first, then multiply by 100 to express it out of a hundred.'
      };
    },
    function () {
      var dec = R.round(R.int(5, 95) / 100, 2);
      var pct = R.round(dec * 100, 2);
      return {
        type: 'mcq', marks: 1,
        prompt: 'A decimal of ' + dec + ' expressed as a percentage is:',
        options: R.options(pct + '%', [R.round(dec * 10, 2) + '%', dec + '%', R.round(dec * 1000, 2) + '%']),
        answer: 0,
        solution: [
          { lab: 'Rule', val: 'decimal → percentage: move the point 2 places right' },
          { lab: 'Apply', val: dec + ' × 100 = ' + pct },
          { lab: 'Answer', val: pct + '%', final: true }
        ],
        why: 'Multiplying by 100 restates the number as parts per hundred, which is what "percent" means.'
      };
    },
    function () {
      var pct = R.int(5, 95);
      return {
        type: 'mcq', marks: 1,
        prompt: 'A trade discount is quoted as ' + pct + '%. Written as a decimal this is:',
        options: R.options(R.round(pct / 100, 4), [R.round(pct / 10, 4), R.round(pct / 1000, 4), pct]),
        answer: 0,
        solution: [
          { lab: 'Rule', val: 'percentage → decimal: move the point 2 places left' },
          { lab: 'Apply', val: pct + ' ÷ 100' },
          { lab: 'Answer', val: String(R.round(pct / 100, 4)), final: true }
        ],
        why: 'You need the decimal form before you can multiply it by a rand amount.'
      };
    }
  ]);

  add('w2-rbp', [
    function () {
      var base = R.step(40, 400, 10), part = R.step(10, base - 10, 5);
      var pct = R.round((part / base) * 100, 2);
      if (pct !== R.round(pct, 2)) return null;
      return {
        type: 'numeric', marks: 2,
        scenario: 'You take the R' + base + ' petty cash from your office and spend R' + part + ' of it on supplies.',
        prompt: 'What percentage of the petty cash did you spend?',
        suf: '%', answer: pct, tol: 0.02,
        solution: [
          { lab: 'Identify the base', val: 'B = R' + base + ' (the whole petty cash)' },
          { lab: 'Identify the percentage value', val: 'P = R' + part + ' (the part spent)' },
          { lab: 'Apply R = P ÷ B', val: part + ' ÷ ' + base + ' = ' + R.round(part / base, 4) },
          { lab: 'Answer', val: pct + '%', final: true }
        ],
        why: 'The base is always the whole amount you started with — the petty cash float, not what you bought.'
      };
    },
    function () {
      var rate = R.pick([5, 8, 10, 12, 15, 20, 25]), base = R.step(1200, 9000, 100);
      var ans = R.round(base * rate / 100, 2);
      return {
        type: 'numeric', marks: 2,
        prompt: 'E-Bike SA budgets ' + rate + '% of its R' + R.num(base) +
                ' monthly stationery spend for printing. How much is budgeted for printing?',
        pre: 'R', answer: ans, tol: 0.02,
        solution: [
          { lab: 'Known', val: 'R = ' + rate + '% = ' + (rate / 100) + ', B = R' + R.num(base) },
          { lab: 'Apply P = R × B', val: (rate / 100) + ' × ' + R.num(base) },
          { lab: 'Answer', val: 'R' + R.num(ans), final: true }
        ],
        why: 'The whole is given, so you are finding the part — multiply the rate by the base.'
      };
    },
    function () {
      var rate = R.pick([2, 4, 5, 6, 8, 10]), base = R.step(400000, 3000000, 100000);
      var part = R.round(base * rate / 100, 2);
      return {
        type: 'steps', marks: 4,
        scenario: 'A company paid all employees a bonus of ' + rate +
                  '% of their yearly salary. The total paid out in bonuses was R' + R.num(part) + '.',
        prompt: 'Calculate the total amount paid in salaries for the year, before bonuses.',
        steps: [
          { q: 'What is the percentage value (P) — the part we already know?',
            pre: 'R', answer: part, tol: 1,
            explain: 'The R' + R.num(part) + ' bonus total is the part produced after the rate was applied.' },
          { q: 'Write the rate of ' + rate + '% as a decimal.',
            answer: R.round(rate / 100, 4), tol: 0.0005,
            explain: rate + ' ÷ 100 = ' + (rate / 100) + '. Always convert before dividing.' },
          { q: 'Now calculate the base value: B = P ÷ R',
            pre: 'R', answer: base, tol: 1,
            explain: R.num(part) + ' ÷ ' + (rate / 100) + ' = ' + R.num(base) + '. Check it: ' + rate +
                     '% of R' + R.num(base) + ' is R' + R.num(part) + '.' }
        ],
        solution: [
          { lab: 'Formula', val: 'R = P ÷ B, so B = P ÷ R' },
          { lab: 'Substitute', val: 'B = R' + R.num(part) + ' ÷ ' + (rate / 100) },
          { lab: 'Total salaries', val: 'R' + R.num(base), final: true }
        ],
        why: 'Given the part and the rate and asked for the whole, you divide rather than multiply.'
      };
    },
    function () {
      var rate = R.pick([4, 5, 6, 8, 10, 12, 15]), base = R.step(20000, 200000, 5000);
      var part = R.round(base * rate / 100, 2);
      return {
        type: 'numeric', marks: 3,
        prompt: 'Commission of R' + R.num(part) + ' was paid at a rate of ' + rate +
                '% of sales. What were the total sales?',
        pre: 'R', answer: base, tol: 1,
        solution: [
          { lab: 'Known', val: 'P = R' + R.num(part) + ', R = ' + rate + '% = ' + (rate / 100) },
          { lab: 'Apply B = P ÷ R', val: R.num(part) + ' ÷ ' + (rate / 100) },
          { lab: 'Total sales', val: 'R' + R.num(base), final: true }
        ],
        why: 'Sales is the whole that the commission rate was applied to, so sales is the base.'
      };
    }
  ]);

  add('w2-change', [
    function () {
      var oldV = R.step(8, 200, 4), pct = R.pick([10, 20, 25, 40, 50, 75, 100, 150]);
      var newV = R.round(oldV * (1 + pct / 100), 4);
      if (Math.round(newV) !== newV) return null;
      return {
        type: 'numeric', marks: 2,
        prompt: 'Monthly unit sales rose from ' + oldV + ' units to ' + newV +
                ' units. Calculate the percentage increase.',
        suf: '%', answer: pct, tol: 0.05,
        solution: [
          { lab: 'Change', val: newV + ' − ' + oldV + ' = ' + (newV - oldV) + ' units' },
          { lab: 'Divide by the old value', val: (newV - oldV) + ' ÷ ' + oldV + ' = ' + R.round((newV - oldV) / oldV, 4) },
          { lab: 'Answer', val: pct + '% increase', final: true }
        ],
        why: 'The base is always where the change started from — the earlier figure.'
      };
    },
    function () {
      var oldV = R.step(20000, 90000, 500), pct = R.pick([4, 5, 8, 10, 12, 15, 20, 25]);
      var newV = R.round(oldV * (1 - pct / 100), 2);
      return {
        type: 'numeric', marks: 2,
        prompt: 'Monthly overhead expenses dropped from R' + R.num(oldV) + ' to R' + R.num(newV) +
                '. Calculate the percentage change.',
        suf: '%', answer: -pct, tol: 0.05,
        note: 'Include the minus sign if it is a decrease.',
        solution: [
          { lab: 'Change', val: 'R' + R.num(newV) + ' − R' + R.num(oldV) + ' = −R' + R.num(R.round(oldV - newV, 2)) },
          { lab: 'Divide by the old value', val: '−' + R.num(R.round(oldV - newV, 2)) + ' ÷ ' + R.num(oldV) },
          { lab: 'Answer', val: '−' + pct + '% (a decrease)', final: true }
        ],
        why: 'A negative answer means a decrease. The minus sign carries real meaning — do not drop it.'
      };
    },
    function () {
      var oldV = R.step(100, 400, 20), pct = R.pick([10, 20, 25, 50]);
      var newV = oldV * (1 - pct / 100);
      if (Math.round(newV) !== newV) return null;
      return {
        type: 'mcq', marks: 2,
        prompt: 'A product\'s monthly sales fell from ' + oldV + ' units to ' + newV +
                ' units. The percentage change is:',
        options: R.options('−' + pct + '%',
                           ['−' + R.round(((oldV - newV) / newV) * 100, 2) + '%', '+' + pct + '%',
                            '−' + R.round(pct / 2, 2) + '%']),
        answer: 0,
        solution: [
          { lab: 'Change', val: newV + ' − ' + oldV + ' = −' + (oldV - newV) + ' units' },
          { lab: 'Divide by the OLD value', val: '−' + (oldV - newV) + ' ÷ ' + oldV },
          { lab: 'Answer', val: '−' + pct + '% (a decrease)', final: true }
        ],
        why: 'Dividing by ' + newV + ' would be wrong — that is where you ended up, not where you started.'
      };
    }
  ]);

  add('w2-overhead', [
    function () {
      var total = R.pick([120, 150, 180, 200, 240, 300]);
      var pct = R.pick([10, 15, 20, 25, 30, 35, 40]);
      var area = total * pct / 100;
      if (Math.round(area) !== area) return null;
      return {
        type: 'numeric', marks: 2,
        prompt: 'A department occupies ' + area + ' m² of a branch\'s total ' + total +
                ' m² floorspace. What percentage of the floorspace is this?',
        suf: '%', answer: pct, tol: 0.05,
        solution: [
          { lab: 'Proxy portion', val: area + ' ÷ ' + total },
          { lab: 'As a decimal', val: String(R.round(area / total, 4)) },
          { lab: 'Answer', val: pct + '%', final: true }
        ],
        why: 'The total floorspace is the base — the whole you are taking a portion of.'
      };
    },
    function () {
      var pct = R.pick([10, 15, 20, 25, 30, 35, 40]);
      var bill = R.step(6000, 30000, 200);
      var ans = R.round(bill * pct / 100, 2);
      var kind = R.pick(['electricity', 'security', 'cleaning', 'rates and taxes', 'insurance']);
      return {
        type: 'numeric', marks: 2,
        prompt: 'The ' + kind + ' bill is R' + R.num(bill) + '. How much should be allocated to an area that occupies ' +
                pct + '% of the floorspace?',
        pre: 'R', answer: ans, tol: 0.05,
        solution: [
          { lab: 'Apply P = R × B', val: (pct / 100) + ' × R' + R.num(bill) },
          { lab: 'Answer', val: 'R' + R.money(ans), final: true }
        ],
        why: 'Step 3 of the allocation process: percentage × total expense.'
      };
    },
    function () {
      var total = R.pick([150, 180, 200, 240, 300]);
      var pct = R.pick([10, 15, 20, 25, 30, 35]);
      var area = total * pct / 100;
      if (Math.round(area) !== area) return null;
      var bill = R.step(8000, 30000, 500);
      var ans = R.round(bill * pct / 100, 2);
      return {
        type: 'steps', marks: 4,
        scenario: 'A business occupies ' + total + ' m² in total. The storeroom takes up ' + area +
                  ' m². The monthly rates and taxes bill is R' + R.num(bill) + '.',
        prompt: 'Calculate the amount that should be allocated to the storeroom.',
        steps: [
          { q: 'What percentage of the total floorspace does the storeroom occupy?',
            suf: '%', answer: pct, tol: 0.05,
            explain: area + ' ÷ ' + total + ' = ' + R.round(area / total, 4) + ', which is ' + pct + '%.' },
          { q: 'Now allocate the bill to the storeroom.',
            pre: 'R', answer: ans, tol: 1,
            explain: (pct / 100) + ' × R' + R.num(bill) + ' = R' + R.money(ans) + '.' }
        ],
        solution: [
          { lab: 'Storeroom portion', val: area + ' ÷ ' + total + ' = ' + pct + '%' },
          { lab: 'Allocate', val: (pct / 100) + ' × R' + R.num(bill) },
          { lab: 'Answer', val: 'R' + R.money(ans), final: true }
        ],
        why: 'Floorspace is the proxy. Find the portion first, then apply it to the bill.'
      };
    }
  ]);

  add('w2-discount', [
    function () {
      var list = R.step(800, 6000, 50) / 100;
      var disc = R.pick([5, 10, 12, 15, 20, 25]);
      var net = R.round(list * (1 - disc / 100), 2);
      var item = R.pick(['inner tubes', 'brake pads', 'helmets', 'bike lights', 'chain lubricant']);
      return {
        type: 'numeric', marks: 2,
        scenario: 'A supplier sells ' + item + ' at a list price of R' + list.toFixed(2) +
                  ' each. E-bike South Africa qualifies for a ' + disc + '% trade discount.',
        prompt: 'Calculate the net price per unit.',
        pre: 'R', answer: net, tol: 0.005,
        solution: [
          { lab: 'Effective rate', val: '100% − ' + disc + '% = ' + (100 - disc) + '%' },
          { lab: 'Net price', val: R.round(1 - disc / 100, 4) + ' × R' + list.toFixed(2) },
          { lab: 'Answer', val: 'R' + net.toFixed(2) + ' each', final: true }
        ],
        why: 'You are paying ' + (100 - disc) + '% of the list price, so one multiplication gets you there.'
      };
    },
    function () {
      var unit = R.step(500, 4000, 25) / 100;
      var qty = R.step(500, 8000, 500);
      var ans = R.round(unit * qty, 2);
      return {
        type: 'numeric', marks: 2,
        prompt: 'E-bike South Africa orders ' + R.num(qty) + ' units at a net unit price of R' +
                unit.toFixed(2) + '. What is the invoice total?',
        pre: 'R', answer: ans, tol: 1,
        solution: [
          { lab: 'Calculate', val: R.num(qty) + ' × R' + unit.toFixed(2) },
          { lab: 'Answer', val: 'R' + R.money(ans), final: true }
        ],
        why: 'The invoice total uses the net price, after the trade discount has already been deducted.'
      };
    },
    function () {
      var invoice = R.step(20000, 90000, 100);
      var early = R.pick([5, 8, 10]), earlyDays = R.pick([5, 7, 10]);
      var late = R.pick([2, 2.5, 3]), lateDays = R.pick([20, 25, 30]);
      var payDay = R.int(1, earlyDays - 1);
      var discAmt = R.round(invoice * early / 100, 2);
      var paid = R.round(invoice - discAmt, 2);
      return {
        type: 'steps', marks: 4,
        scenario: 'The supplier\'s invoice totals R' + R.num(invoice) + '. Payment terms are: within ' +
                  earlyDays + ' days = ' + early + '% discount, within ' + lateDays + ' days = ' + late + '% discount.',
        prompt: 'The invoice is paid ' + payDay + ' days after the invoice date. Calculate the amount actually paid.',
        steps: [
          { q: 'Which cash discount rate applies?', suf: '%', answer: early, tol: 0.01,
            explain: payDay + ' days is within the ' + earlyDays + '-day window, so the full ' + early + '% applies.' },
          { q: 'Calculate the cash discount amount.', pre: 'R', answer: discAmt, tol: 1,
            explain: (early / 100) + ' × R' + R.num(invoice) + ' = R' + R.money(discAmt) + '.' },
          { q: 'Calculate the amount actually paid.', pre: 'R', answer: paid, tol: 1,
            explain: 'R' + R.num(invoice) + ' − R' + R.money(discAmt) + ' = R' + R.money(paid) + '.' }
        ],
        solution: [
          { lab: 'Applicable rate', val: 'paid on day ' + payDay + ' → within ' + earlyDays + ' days → ' + early + '%' },
          { lab: 'Discount amount', val: (early / 100) + ' × R' + R.num(invoice) + ' = R' + R.money(discAmt) },
          { lab: 'Amount paid', val: 'R' + R.num(invoice) + ' − R' + R.money(discAmt) },
          { lab: 'Answer', val: 'R' + R.money(paid), final: true }
        ],
        why: 'The cash discount is applied to the invoice total, which already reflects the trade discount.'
      };
    }
  ]);

  add('w2-margin', [
    function () {
      var cost = R.step(2000, 30000, 100) / 100;
      var gp = R.step(500, 6000, 50) / 100;
      var sell = R.round(cost + gp, 2);
      var item = R.pick(['cycling helmet', 'pannier bag', 'bike lock', 'repair kit', 'phone mount']);
      return {
        type: 'numeric', marks: 2,
        scenario: 'The cost price of a ' + item + ' is R' + cost.toFixed(2) +
                  '. E-bike South Africa sells it for R' + sell.toFixed(2) + '.',
        prompt: 'Calculate the gross profit per unit.',
        pre: 'R', answer: R.round(gp, 2), tol: 0.005,
        solution: [
          { lab: 'Formula', val: 'Gross profit = Selling price − Cost price' },
          { lab: 'Substitute', val: 'R' + sell.toFixed(2) + ' − R' + cost.toFixed(2) },
          { lab: 'Answer', val: 'R' + gp.toFixed(2), final: true }
        ],
        why: 'Gross profit is the gap between what you paid and what you charged.'
      };
    },
    function () {
      var cost = R.step(2000, 20000, 400) / 100;
      var pct = R.pick([10, 20, 25, 40, 50]);
      var gp = R.round(cost * pct / 100, 2);
      var onCost = R.int(0, 1) === 0;
      var sell = R.round(cost + gp, 2);
      var ans = onCost ? pct : R.round((gp / sell) * 100, 2);
      return {
        type: 'numeric', marks: 2,
        prompt: 'The gross profit is R' + gp.toFixed(2) + ', the cost price is R' + cost.toFixed(2) +
                ' and the selling price is R' + sell.toFixed(2) +
                '. Calculate the gross profit margin <b>on ' + (onCost ? 'cost' : 'selling') +
                ' price</b>, to two decimal places.',
        suf: '%', answer: ans, tol: 0.05,
        solution: [
          { lab: 'Formula', val: 'Gross profit ÷ ' + (onCost ? 'Cost' : 'Selling') + ' price' },
          { lab: 'Substitute', val: 'R' + gp.toFixed(2) + ' ÷ R' + (onCost ? cost.toFixed(2) : sell.toFixed(2)) },
          { lab: 'Answer', val: ans + '%', final: true }
        ],
        why: 'Same profit, different base. The margin on cost price is always the larger of the two, because the cost price is the smaller denominator.'
      };
    },
    function () {
      var cost = R.step(40, 400, 20);
      var pct = R.pick([15, 20, 25, 30, 40, 50]);
      var gp = R.round(cost * pct / 100, 2);
      var sell = R.round(cost + gp, 2);
      return {
        type: 'steps', marks: 4,
        scenario: 'An item costs E-Bike SA R' + cost + '. The business wants a gross profit margin of ' +
                  pct + '% on cost price.',
        prompt: 'Determine the selling price.',
        steps: [
          { q: 'Calculate the gross profit required. (' + pct + '% of the cost price)',
            pre: 'R', answer: gp, tol: 0.05,
            explain: (pct / 100) + ' × R' + cost + ' = R' + gp.toFixed(2) + '. The margin is on cost price, so R' +
                     cost + ' is the base.' },
          { q: 'Now calculate the selling price.', pre: 'R', answer: sell, tol: 0.05,
            explain: 'Selling price = Cost price + Gross profit = R' + cost + ' + R' + gp.toFixed(2) + ' = R' + sell.toFixed(2) + '.' }
        ],
        solution: [
          { lab: 'Required gross profit', val: (pct / 100) + ' × R' + cost + ' = R' + gp.toFixed(2) },
          { lab: 'Rearrange', val: 'Selling price = Cost price + Gross profit' },
          { lab: 'Answer', val: 'R' + sell.toFixed(2), final: true }
        ],
        why: 'Because the margin is on cost price, you apply the percentage to the cost. On selling price you would need a different approach, since the base would be the unknown.'
      };
    }
  ]);

  /* ══════════════════════════════════════════════════════════════
     WEEK 3 — STATISTICS & PROBABILITY
     These follow the module's own conventions: quartile/percentile positions use
     (n+1), a non-whole position averages its neighbours, and variance divides by n−1.
     ══════════════════════════════════════════════════════════════ */

  function sortNum(a) { var b = a.slice(); b.sort(function (x, y) { return x - y; }); return b; }
  function sum(a) { var s = 0; for (var i = 0; i < a.length; i++) s += a[i]; return s; }
  function mean(a) { return sum(a) / a.length; }
  function posValue(s, pos) {
    if (pos === Math.floor(pos)) return s[pos - 1];
    var lo = Math.floor(pos);
    return (s[lo - 1] + s[lo]) / 2;
  }
  function medianOf(a) { var s = sortNum(a); return posValue(s, (s.length + 1) / 2); }
  function quartile(a, k) { var s = sortNum(a); return posValue(s, (k / 4) * (s.length + 1)); }
  function variance(a) {
    var m = mean(a), acc = 0;
    for (var i = 0; i < a.length; i++) acc += (a[i] - m) * (a[i] - m);
    return acc / (a.length - 1);
  }

  add('w3-mean', [
    function () {
      var n = R.pick([5, 6, 7, 8]);
      var vals = R.list(n, 6, 40);
      var m = R.round(mean(vals), 2);
      var thing = R.pick(['bikes hired', 'services completed', 'online bookings', 'test rides booked']);
      return {
        type: 'numeric', marks: 2,
        prompt: 'E-Bike SA records the number of ' + thing + ' over ' + n + ' days: ' + vals.join(', ') +
                '. Calculate the mean, to two decimal places.',
        answer: m, tol: 0.02,
        solution: [
          { lab: 'Add them up (Σx)', val: vals.join(' + ') + ' = ' + sum(vals) },
          { lab: 'Count them (n)', val: String(n) },
          { lab: 'Divide', val: sum(vals) + ' ÷ ' + n + ' = ' + R.round(mean(vals), 4) },
          { lab: 'Answer', val: String(m), final: true }
        ],
        why: 'Sum, then divide by how many. The mean need not be a whole number even when the data is.'
      };
    },
    function () {
      var lower = R.pick([100, 200, 300, 400, 500]), width = R.pick([10, 20, 25]);
      var freqs = R.list(4, 2, 9);
      var mids = [], fx = 0;
      for (var i = 0; i < 4; i++) {
        var mid = lower + width * i + width / 2;
        mids.push(mid);
        fx += mid * freqs[i];
      }
      var total = sum(freqs);
      var m = R.round(fx / total, 2);
      var rows = '';
      for (var j = 0; j < 4; j++) {
        rows += '<tr><td>' + (lower + width * j) + ' – under ' + (lower + width * (j + 1)) +
                '</td><td>' + freqs[j] + '</td></tr>';
      }
      return {
        type: 'numeric', marks: 4,
        scenario: 'The output levels of a product were recorded as follows:' +
                  '<div class="tablewrap"><table class="dtable"><tr><th>Output (kg)</th><th>Number of days</th></tr>' +
                  rows + '</table></div>',
        prompt: 'Calculate the mean output, to two decimal places.',
        suf: 'kg', answer: m, tol: 0.02,
        solution: [
          { lab: 'Midpoints', val: mids.join(', ') },
          { lab: 'Σ(f × x)', val: String(fx) },
          { lab: 'Σf', val: String(total) },
          { lab: 'Answer', val: fx + ' ÷ ' + total + ' = ' + m + ' kg', final: true }
        ],
        why: 'With grouped data you never see the individual values, so each class midpoint stands in for everything in that class.'
      };
    },
    function () {
      var n = 6;
      var vals = [];
      for (var i = 0; i < n; i++) vals.push(R.step(6000, 14000, 50));
      var total = sum(vals), m = total / n;
      if (Math.round(m * 100) !== m * 100) return null;
      return {
        type: 'steps', marks: 4,
        scenario: 'A workshop\'s monthly service revenue for six months was: R' +
                  vals.map(function (v) { return R.num(v); }).join(', R') + '.',
        prompt: 'Calculate the mean monthly revenue.',
        steps: [
          { q: 'First, find Σx — the sum of all the values.', pre: 'R', answer: total, tol: 1,
            explain: vals.join(' + ') + ' = ' + total + '.' },
          { q: 'What is n, the number of values?', answer: n, tol: 0.01,
            explain: 'Six months of revenue were recorded.' },
          { q: 'Now calculate the mean.', pre: 'R', answer: R.round(m, 2), tol: 1,
            explain: 'R' + R.num(total) + ' ÷ ' + n + ' = R' + R.money(m) + '.' }
        ],
        solution: [
          { lab: 'Formula', val: 'x̄ = Σx ÷ n' },
          { lab: 'Σx', val: 'R' + R.num(total) },
          { lab: 'n', val: String(n) },
          { lab: 'Mean monthly revenue', val: 'R' + R.money(m), final: true }
        ],
        why: 'A manager would want this to judge what a typical month looks like before committing to costs.'
      };
    }
  ]);

  add('w3-median', [
    function () {
      var n = R.pick([5, 7, 9]);
      var vals = R.distinct(n, 10, 70);
      var med = medianOf(vals);
      return {
        type: 'numeric', marks: 3,
        prompt: 'Find the median of the following data: ' + vals.join(', ') + '.',
        answer: med, tol: 0.01,
        solution: [
          { lab: 'Sort ascending', val: sortNum(vals).join(', ') + ' (n = ' + n + ')' },
          { lab: 'Median position', val: '(' + n + ' + 1) ÷ 2 = ' + ((n + 1) / 2) },
          { lab: 'Answer', val: 'the ' + ((n + 1) / 2) + 'th value = ' + med, final: true }
        ],
        why: 'With an odd number of values the position formula lands on a whole number, so the median is simply that value. Sorting first is not optional.'
      };
    },
    function () {
      var n = R.pick([6, 8, 10]);
      var vals = R.distinct(n, 5, 40);
      var med = medianOf(vals);
      var s = sortNum(vals), lo = n / 2;
      return {
        type: 'numeric', marks: 3,
        prompt: 'The time taken (in minutes) to complete ' + n + ' e-bike services was: ' + vals.join(', ') +
                '. Calculate the median.',
        answer: med, tol: 0.01,
        solution: [
          { lab: 'Sort ascending', val: s.join(', ') },
          { lab: 'Median position', val: '(' + n + ' + 1) ÷ 2 = ' + ((n + 1) / 2) },
          { lab: 'Average the ' + lo + 'th and ' + (lo + 1) + 'th', val: '(' + s[lo - 1] + ' + ' + s[lo] + ') ÷ 2' },
          { lab: 'Answer', val: med + ' minutes', final: true }
        ],
        why: 'A position of ' + ((n + 1) / 2) + ' means halfway between two values, so you average them.'
      };
    }
  ]);

  add('w3-mode', [
    function () {
      var modeVal = R.int(2, 9);
      var others = R.distinct(4, 10, 20);
      var vals = R.shuffle([modeVal, modeVal, modeVal].concat(others));
      return {
        type: 'mcq', marks: 1,
        prompt: 'What is the mode of the following data: ' + vals.join(', ') + '?',
        options: R.options(modeVal, [others[0], others[1], 'There is no mode']),
        answer: 0,
        solution: [
          { lab: 'Count each value', val: modeVal + ' appears three times; every other value appears once' },
          { lab: 'Answer', val: String(modeVal), final: true }
        ],
        why: 'The mode is about frequency, not size — what matters is which value repeats most.'
      };
    },
    function () {
      var L = R.step(600, 3000, 100), h = R.pick([50, 100, 200]);
      var f0 = R.int(3, 20), f1 = f0 + R.int(4, 20), f2 = R.int(2, f1 - 1);
      var denom = 2 * f1 - f0 - f2;
      if (denom <= 0) return null;
      var modeVal = R.round(L + ((f1 - f0) / denom) * h, 2);
      return {
        type: 'numeric', marks: 4,
        scenario: 'For a daily takings distribution: the modal class is R' + R.num(L) + ' – R' + R.num(L + h) +
                  ' with ' + f1 + ' days. The preceding class has ' + f0 + ' days and the following class has ' +
                  f2 + '. The class interval size is R' + h + '.',
        prompt: 'Calculate the mode using the grouped mode formula, to two decimal places.',
        pre: 'R', answer: modeVal, tol: 0.05,
        solution: [
          { lab: 'Formula', val: 'Mode = L + [(f₁ − f₀) ÷ (2f₁ − f₀ − f₂)] × h' },
          { lab: 'Values', val: 'L = ' + L + ', f₁ = ' + f1 + ', f₀ = ' + f0 + ', f₂ = ' + f2 + ', h = ' + h },
          { lab: 'Numerator', val: f1 + ' − ' + f0 + ' = ' + (f1 - f0) },
          { lab: 'Denominator', val: '2(' + f1 + ') − ' + f0 + ' − ' + f2 + ' = ' + denom },
          { lab: 'Answer', val: 'R' + R.money(modeVal), final: true }
        ],
        why: 'Identify the modal class first, then read the frequency directly before it (f₀) and directly after it (f₂). Swapping those two is the usual slip.'
      };
    },
    function () {
      var L = R.step(1000, 2000, 100), h = 100;
      var freqs = R.list(4, 3, 12);
      var maxIdx = 0;
      for (var i = 1; i < 4; i++) if (freqs[i] > freqs[maxIdx]) maxIdx = i;
      for (var j = 0; j < 4; j++) if (j !== maxIdx && freqs[j] === freqs[maxIdx]) return null;
      var rows = '';
      for (var k = 0; k < 4; k++) {
        rows += '<tr><td>' + R.num(L + h * k) + ' – under ' + R.num(L + h * (k + 1)) + '</td><td>' + freqs[k] + '</td></tr>';
      }
      var correct = 'R' + R.num(L + h * maxIdx) + ' – R' + R.num(L + h * (maxIdx + 1));
      var wrong1 = 'R' + R.num(L) + ' – R' + R.num(L + h);
      var wrong2 = 'R' + R.num(L + h * 2) + ' – R' + R.num(L + h * 3);
      return {
        type: 'mcq', marks: 2,
        scenario: '<div class="tablewrap"><table class="dtable"><tr><th>Daily takings (R)</th><th>Number of days</th></tr>' +
                  rows + '</table></div>',
        prompt: 'Which is the modal class?',
        options: R.options(correct, [wrong1, wrong2, String(freqs[maxIdx])]),
        answer: 0,
        solution: [
          { lab: 'Modal class', val: 'the class interval with the highest frequency' },
          { lab: 'Highest frequency', val: freqs[maxIdx] + ' days' },
          { lab: 'Answer', val: correct, final: true }
        ],
        why: 'The frequency is not the class. The question asks which class, so your answer must be a range.'
      };
    }
  ]);

  add('w3-spread', [
    function () {
      var vals = R.distinct(R.int(6, 9), 2, 40);
      var s = sortNum(vals);
      return {
        type: 'numeric', marks: 2,
        prompt: 'Calculate the range of the following data: ' + vals.join(', ') + '.',
        answer: s[s.length - 1] - s[0], tol: 0.01,
        solution: [
          { lab: 'Maximum', val: String(s[s.length - 1]) },
          { lab: 'Minimum', val: String(s[0]) },
          { lab: 'Range', val: s[s.length - 1] + ' − ' + s[0] },
          { lab: 'Answer', val: String(s[s.length - 1] - s[0]), final: true }
        ],
        why: 'The range only ever uses two numbers — the biggest and the smallest. Everything between is ignored.'
      };
    },
    function () {
      var vals = R.distinct(6, 5, 40);
      var s = sortNum(vals);
      var Q1 = quartile(vals, 1), Q3 = quartile(vals, 3);
      return {
        type: 'numeric', marks: 5,
        prompt: 'Calculate the interquartile range of the dataset: ' + vals.join(', ') + '.',
        answer: R.round(Q3 - Q1, 4), tol: 0.02,
        solution: [
          { lab: 'Order the data', val: s.join(', ') + ' (n = 6)' },
          { lab: 'Q1 position', val: '¼(7) = 1.75 → between the 1st (' + s[0] + ') and 2nd (' + s[1] + ')' },
          { lab: 'Q1', val: '(' + s[0] + ' + ' + s[1] + ') ÷ 2 = ' + Q1 },
          { lab: 'Q3 position', val: '¾(7) = 5.25 → between the 5th (' + s[4] + ') and 6th (' + s[5] + ')' },
          { lab: 'Q3', val: '(' + s[4] + ' + ' + s[5] + ') ÷ 2 = ' + Q3 },
          { lab: 'IQR', val: Q3 + ' − ' + Q1 + ' = ' + R.round(Q3 - Q1, 4), final: true }
        ],
        why: 'Both positions land on non-whole numbers, so both quartiles are the average of the two values either side.'
      };
    },
    function () {
      var vals = R.distinct(11, 3, 60);
      var s = sortNum(vals);
      var Q1 = quartile(vals, 1), Q3 = quartile(vals, 3);
      return {
        type: 'numeric', marks: 5,
        scenario: 'Monthly service jobs completed by a workshop, already in ascending order:' +
                  '<div class="dataset"><span>' + s.join('</span><span>') + '</span></div>',
        prompt: 'Calculate the interquartile range.',
        answer: R.round(Q3 - Q1, 4), tol: 0.02,
        solution: [
          { lab: 'n', val: '11 values' },
          { lab: 'Q1 position', val: '¼(11 + 1) = 3 — a whole number' },
          { lab: 'Q1', val: 'the 3rd value = ' + Q1 },
          { lab: 'Q3 position', val: '¾(12) = 9 — a whole number' },
          { lab: 'Q3', val: 'the 9th value = ' + Q3 },
          { lab: 'IQR', val: Q3 + ' − ' + Q1 + ' = ' + R.round(Q3 - Q1, 4), final: true }
        ],
        why: 'When the position lands on a whole number you simply read off the value at that position — no averaging needed.'
      };
    }
  ]);

  add('w3-percentile', [
    function () {
      var vals = R.distinct(6, 4, 40);
      var s = sortNum(vals);
      var p = R.pick([20, 30, 40, 60, 70, 80]);
      var pos = (p / 100) * 7;
      if (pos === Math.floor(pos)) return null;
      var lo = Math.floor(pos), frac = R.round(pos - lo, 4);
      var ans = R.round(s[lo - 1] + frac * (s[lo] - s[lo - 1]), 4);
      return {
        type: 'numeric', marks: 4,
        prompt: 'Using the dataset ' + s.join(', ') + ', calculate the ' + p + 'th percentile.',
        answer: ans, tol: 0.02,
        solution: [
          { lab: 'Position formula', val: '(p ÷ 100) × (n + 1)' },
          { lab: 'Substitute', val: '(' + p + ' ÷ 100) × 7 = ' + R.round(pos, 4) },
          { lab: 'Which values?', val: 'between the ' + lo + 'th (' + s[lo - 1] + ') and ' + (lo + 1) + 'th (' + s[lo] + ')' },
          { lab: 'Interpolate', val: s[lo - 1] + ' + ' + frac + ' × (' + s[lo] + ' − ' + s[lo - 1] + ')' },
          { lab: 'Answer', val: String(ans), final: true }
        ],
        why: 'The whole-number part of the position tells you where to start; the decimal part tells you how far to step toward the next value.'
      };
    },
    function () {
      var k = R.pick([1, 2, 3]);
      var names = { 1: 'lower quartile (Q1)', 2: 'middle quartile (Q2, the median)', 3: 'upper quartile (Q3)' };
      return {
        type: 'mcq', marks: 1,
        prompt: 'The ' + names[k] + ' is the same as which percentile?',
        options: R.options('the ' + (k * 25) + 'th percentile',
                           ['the ' + (((k % 3) + 1) * 25) + 'th percentile',
                            'the ' + k + 'th percentile',
                            'the ' + (100 - k * 25) + 'th percentile']),
        answer: 0,
        solution: [
          { lab: 'Quartiles cut into four', val: 'Q1 = 25th, Q2 = 50th, Q3 = 75th' },
          { lab: 'Answer', val: 'the ' + (k * 25) + 'th percentile', final: true }
        ],
        why: 'Quartiles and percentiles are the same idea at different resolutions.'
      };
    }
  ]);

  /* Builds a small sample whose mean is a whole number, so the working stays readable.
     The last value is chosen to complete the sum rather than rolled and rejected. */
  function wholeMeanSample(n, lo, hi) {
    var vals = R.list(n - 1, lo, hi), s = sum(vals);
    var candidates = [];
    for (var v = lo; v <= hi; v++) if ((s + v) % n === 0) candidates.push(v);
    if (!candidates.length) return null;
    vals.push(R.pick(candidates));
    var allSame = true;
    for (var i = 1; i < vals.length; i++) if (vals[i] !== vals[0]) allSame = false;
    return allSame ? null : R.shuffle(vals);
  }

  add('w3-sd', [
    function () {
      var n = R.pick([4, 5]);
      var vals = wholeMeanSample(n, 2, 20);
      if (!vals) return null;
      var m = mean(vals);
      var v = variance(vals), sdv = Math.sqrt(v);
      var sq = vals.map(function (x) { return (x - m) * (x - m); });
      return {
        type: 'numeric', marks: 4,
        prompt: 'Calculate the standard deviation of the sample: ' + vals.join(', ') +
                '. Give your answer to two decimal places.',
        answer: R.round(sdv, 2), tol: 0.02,
        solution: [
          { lab: 'Mean', val: sum(vals) + ' ÷ ' + n + ' = ' + m },
          { lab: 'Squared differences', val: sq.join(', ') },
          { lab: 'Σ(x − x̄)²', val: String(sum(sq)) },
          { lab: 'Variance', val: sum(sq) + ' ÷ (' + n + ' − 1) = ' + R.round(v, 4) },
          { lab: 'Standard deviation', val: '√' + R.round(v, 4) + ' ≈ ' + R.round(sdv, 2), final: true }
        ],
        why: 'Squaring makes every difference positive, which is the whole point — otherwise values below the mean would cancel those above it.'
      };
    },
    function () {
      var n = 4;
      var vals = wholeMeanSample(n, 2, 16);
      if (!vals) return null;
      var m = mean(vals);
      var v = variance(vals), sdv = Math.sqrt(v);
      var sq = vals.map(function (x) { return (x - m) * (x - m); });
      return {
        type: 'steps', marks: 6,
        prompt: 'Calculate the standard deviation of the dataset: ' + vals.join(', ') + '.',
        steps: [
          { q: 'First calculate the mean.', answer: m, tol: 0.01,
            explain: '(' + vals.join(' + ') + ') ÷ ' + n + ' = ' + sum(vals) + ' ÷ ' + n + ' = ' + m + '.' },
          { q: 'Now find the sum of the squared differences from the mean, Σ(x − x̄)².',
            answer: sum(sq), tol: 0.01,
            explain: 'The squared differences are ' + sq.join(', ') + ', which add to ' + sum(sq) + '.' },
          { q: 'Calculate the sample variance, to two decimal places.', answer: R.round(v, 2), tol: 0.02,
            explain: 'Divide by n − 1: ' + sum(sq) + ' ÷ ' + (n - 1) + ' ≈ ' + R.round(v, 2) + '.' },
          { q: 'Finally, calculate the standard deviation, to two decimal places.',
            answer: R.round(sdv, 2), tol: 0.02,
            explain: 'The standard deviation is the square root of the variance: √' + R.round(v, 2) + ' ≈ ' + R.round(sdv, 2) + '.' }
        ],
        solution: [
          { lab: 'Mean', val: sum(vals) + ' ÷ ' + n + ' = ' + m },
          { lab: 'Σ(x − x̄)²', val: String(sum(sq)) },
          { lab: 'Variance', val: sum(sq) + ' ÷ ' + (n - 1) + ' ≈ ' + R.round(v, 2) },
          { lab: 'Standard deviation', val: '≈ ' + R.round(sdv, 2), final: true }
        ],
        why: 'The mean must come first — every squared difference is measured from it.'
      };
    }
  ]);

  add('w3-skew', [
    function () {
      var positive = R.int(0, 1) === 0;
      var mode = R.int(3, 12), median = mode + (positive ? R.int(0, 2) : -R.int(0, 2));
      var mn = R.round(median + (positive ? R.int(1, 4) + 0.3 : -(R.int(1, 4) + 0.3)), 2);
      return {
        type: 'mcq', marks: 3,
        scenario: 'For a dataset the measures were calculated as: mean = ' + mn + ', median = ' + median +
                  ', mode = ' + mode + '.',
        prompt: 'Comment on the skewness of this data.',
        options: R.options(
          (positive ? 'Positively' : 'Negatively') + ' skewed — the mean is ' + (positive ? 'higher' : 'lower') + ' than the median and mode',
          [(positive ? 'Negatively' : 'Positively') + ' skewed — the mean is ' + (positive ? 'higher' : 'lower') + ' than the median and mode',
           'Normally distributed — all three measures are equal',
           'Not possible to determine without a box plot']),
        answer: 0,
        solution: [
          { lab: 'Compare the measures', val: 'mode = ' + mode + ', median = ' + median + ', mean = ' + mn },
          { lab: 'The mean sits', val: positive ? 'above the others, pulled up by high values' : 'below the others, pulled down by low values' },
          { lab: 'Tail direction', val: positive ? 'stretches to the right' : 'stretches to the left' },
          { lab: 'Answer', val: (positive ? 'Positively' : 'Negatively') + ' skewed', final: true }
        ],
        why: 'The mean is the measure most affected by extreme values, so it always ends up furthest in the direction the tail points.'
      };
    }
  ]);

  add('w3-prob', [
    function () {
      var threshold = R.int(1, 5);
      var greater = R.int(0, 1) === 0;
      var count = greater ? 6 - threshold : threshold;
      if (count === 0 || count === 6) return null;
      var g = R.gcd(count, 6);
      return {
        type: 'mcq', marks: 2,
        prompt: 'When rolling a standard six-sided die, what is the probability of rolling a number <b>' +
                (greater ? 'greater than ' : 'less than or equal to ') + threshold + '</b>?',
        options: R.options(R.frac(count / g, 6 / g),
                           [R.frac(6 - count, 6), R.frac(1, 6), R.frac(threshold, 6)]),
        answer: 0,
        solution: [
          { lab: 'Desired outcomes', val: count + ' of the six faces' },
          { lab: 'Total possible outcomes', val: '6' },
          { lab: 'Probability', val: count + '/6' },
          { lab: 'Answer', val: (count / g) + '/' + (6 / g), final: true }
        ],
        why: 'Count the outcomes that satisfy the condition, not the number in the condition itself.'
      };
    },
    function () {
      var p = R.round(R.int(5, 95) / 100, 2);
      return {
        type: 'numeric', marks: 2,
        prompt: 'If P(E) = ' + p + ', calculate P(E<sup>c</sup>), the probability of the complement.',
        answer: R.round(1 - p, 2), tol: 0.005,
        solution: [
          { lab: 'Complement rule', val: 'P(Eᶜ) = 1 − P(E)' },
          { lab: 'Substitute', val: '1 − ' + p },
          { lab: 'Answer', val: String(R.round(1 - p, 2)), final: true }
        ],
        why: 'An event and its complement must add to 1, because between them they cover every possible outcome.'
      };
    },
    function () {
      var suit = R.pick(['heart', 'spade', 'diamond', 'club']);
      var isNot = R.int(0, 1) === 0;
      return {
        type: 'mcq', marks: 2,
        prompt: 'A card is drawn at random from a deck of 52. What is the probability that it is ' +
                (isNot ? '<b>not</b> a ' : 'a ') + suit + '?',
        options: R.options(isNot ? R.frac(3, 4) : R.frac(1, 4),
                           [isNot ? R.frac(1, 4) : R.frac(3, 4), R.frac(1, 2), R.frac(13, 52)]),
        answer: 0,
        solution: [
          { lab: 'P(' + suit + ')', val: '13 of the 52 cards → 13/52 = 1/4' },
          { lab: isNot ? 'Complement rule' : 'Simplify', val: isNot ? '1 − 1/4' : '13/52' },
          { lab: 'Answer', val: isNot ? '3/4' : '1/4', final: true }
        ],
        why: 'Each of the four suits holds 13 of the 52 cards, so any single suit is exactly a quarter of the deck.'
      };
    }
  ]);

  add('w3-add', [
    function () {
      var ranks = R.shuffle(['7', '8', '9', '10', 'jack', 'queen', 'king', 'ace']);
      return {
        type: 'mcq', marks: 3,
        prompt: 'Determine the probability of obtaining either a ' + ranks[0] + ' or a ' + ranks[1] +
                ' when one card is picked at random from a deck of 52.',
        options: R.options(R.frac(2, 13), [R.frac(1, 13), R.frac(4, 13), R.frac(1, 169)]),
        answer: 0,
        solution: [
          { lab: 'Mutually exclusive?', val: 'yes — one card cannot be both' },
          { lab: 'Apply P(A) + P(B)', val: '4/52 + 4/52 = 8/52' },
          { lab: 'Answer', val: '2/13', final: true }
        ],
        why: 'There are four of each rank, one per suit. Drawing one prevents drawing the other, which is what makes them mutually exclusive.'
      };
    },
    function () {
      var total = R.pick([40, 50, 60, 80, 100]);
      var a = R.int(Math.round(total * 0.3), Math.round(total * 0.5));
      var b = R.int(Math.round(total * 0.2), Math.round(total * 0.4));
      var both = R.int(2, Math.min(a, b) - 1);
      var either = a + b - both;
      if (either > total) return null;
      var g = R.gcd(either, total);
      return {
        type: 'mcq', marks: 3,
        scenario: 'Of ' + total + ' customers who visited the E-Bike SA showroom on a Saturday, ' + a +
                  ' bought an e-bike, ' + b + ' bought accessories, and ' + both + ' of them bought both.',
        prompt: 'One of the ' + total + ' customers is selected at random. What is the probability that they bought an e-bike or accessories?',
        options: R.options(R.frac(either / g, total / g),
                           [R.frac(a + b, total), R.frac(both, total), R.frac(a, total)]),
        answer: 0,
        solution: [
          { lab: 'Mutually exclusive?', val: 'no — ' + both + ' customers did both' },
          { lab: 'P(e-bike)', val: a + '/' + total },
          { lab: 'P(accessories)', val: b + '/' + total },
          { lab: 'P(both)', val: both + '/' + total },
          { lab: 'Apply', val: a + '/' + total + ' + ' + b + '/' + total + ' − ' + both + '/' + total },
          { lab: 'Answer', val: (either / g) + '/' + (total / g), final: true }
        ],
        why: 'Without subtracting the overlap you would get ' + (a + b) + '/' + total +
             ' — the ' + both + ' customers who did both would be counted twice.'
      };
    }
  ]);

  add('w3-mult', [
    function () {
      var p = R.round(R.int(30, 90) / 100, 2), q = R.round(R.int(30, 90) / 100, 2);
      var ans = R.round(p * q, 4);
      return {
        type: 'numeric', marks: 3,
        scenario: 'Past data shows the probability of a machine passing its annual safety check is ' + p +
                  ', and the probability of an unrelated second machine passing is ' + q + '.',
        prompt: 'Calculate the probability that <b>both</b> machines pass.',
        answer: ans, tol: 0.0005,
        note: 'Give your answer as a decimal to four places.',
        solution: [
          { lab: 'Independent events', val: 'one machine\'s result does not affect the other' },
          { lab: 'Apply P(A) × P(B)', val: p + ' × ' + q },
          { lab: 'Answer', val: String(ans), final: true }
        ],
        why: '"And" means multiply. Because these are unrelated, no conditional adjustment is needed.'
      };
    },
    function () {
      var rank = R.pick(['kings', 'queens', 'jacks', 'aces', 'tens']);
      return {
        type: 'mcq', marks: 3,
        prompt: 'From a pack of 52 cards, two cards are drawn at random, one at a time, <b>without replacement</b>. ' +
                'What is the probability that both are ' + rank + '?',
        options: R.options(R.frac(1, 221), [R.frac(1, 169), R.frac(2, 13), R.frac(1, '2 652')]),
        answer: 0,
        solution: [
          { lab: 'Dependent — "without replacement"', val: 'use P(A) × P(B | A)' },
          { lab: 'P(first)', val: '4/52' },
          { lab: 'P(second | first)', val: '3/51 — one card of that rank and one card overall are gone' },
          { lab: 'Multiply', val: '4/52 × 3/51 = 12/2 652' },
          { lab: 'Answer', val: '1/221', final: true }
        ],
        why: '1/169 is the answer *with* replacement. The phrase "without replacement" is the whole question.'
      };
    }
  ]);

  add('w3-ev', [
    function () {
      var vals = [R.step(100, 400, 50), R.step(500, 900, 50), R.step(1000, 1600, 50)];
      var p1 = R.pick([0.1, 0.2, 0.3]), p2 = R.pick([0.3, 0.4, 0.5]);
      var p3 = R.round(1 - p1 - p2, 2);
      if (p3 <= 0) return null;
      var ev = R.round(vals[0] * p1 + vals[1] * p2 + vals[2] * p3, 2);
      return {
        type: 'numeric', marks: 3,
        scenario: 'A project has three possible payoffs:' +
                  '<div class="tablewrap"><table class="dtable"><tr><th>Payoff (R)</th><td>' +
                  vals.join('</td><td>') + '</td></tr><tr><th>Probability</th><td>' +
                  [p1, p2, p3].join('</td><td>') + '</td></tr></table></div>',
        prompt: 'Calculate the expected value.',
        pre: 'R', answer: ev, tol: 0.5,
        solution: [
          { lab: 'Formula', val: 'EV = Σ [P(x) × Payoff(x)]' },
          { lab: 'Substitute', val: '(' + vals[0] + ' × ' + p1 + ') + (' + vals[1] + ' × ' + p2 + ') + (' + vals[2] + ' × ' + p3 + ')' },
          { lab: 'Calculate', val: R.round(vals[0] * p1, 2) + ' + ' + R.round(vals[1] * p2, 2) + ' + ' + R.round(vals[2] * p3, 2) },
          { lab: 'Answer', val: 'R' + R.money(ev), final: true }
        ],
        why: 'Check the probabilities add to 1 before you start — ' + p1 + ' + ' + p2 + ' + ' + p3 + ' = 1.'
      };
    },
    function () {
      var gain = R.step(40000, 150000, 5000), loss = R.step(10000, 40000, 5000);
      var pg = R.pick([0.25, 0.3, 0.35, 0.4, 0.45]);
      var pl = R.round(1 - pg, 2);
      var ev = R.round(gain * pg - loss * pl, 2);
      return {
        type: 'numeric', marks: 4,
        scenario: 'E-Bike SA is considering a marketing campaign. There is a ' + Math.round(pg * 100) +
                  '% chance it generates R' + R.num(gain) + ' additional profit, and a ' + Math.round(pl * 100) +
                  '% chance it results in a R' + R.num(loss) + ' loss.',
        prompt: 'Calculate the expected value of the campaign.',
        pre: 'R', answer: ev, tol: 1,
        note: 'Enter a negative number if the expected value is a loss.',
        solution: [
          { lab: 'Formula', val: 'EV = Σ [P(x) × Payoff(x)]' },
          { lab: 'Profit outcome', val: 'R' + R.num(gain) + ' × ' + pg + ' = R' + R.money(gain * pg) },
          { lab: 'Loss outcome', val: '−R' + R.num(loss) + ' × ' + pl + ' = −R' + R.money(loss * pl) },
          { lab: 'Add them', val: 'R' + R.money(gain * pg) + ' − R' + R.money(loss * pl) },
          { lab: 'Answer', val: 'R' + R.money(ev) + ' — a ' + (ev >= 0 ? 'positive EV, so accept' : 'negative EV, so reject'), final: true }
        ],
        why: 'The loss must be entered as a negative payoff. A positive expected value means the project pays off on average, even if failure is the more likely single outcome.'
      };
    }
  ]);

  /* ══════════════════════════════════════════════════════════════
     WEEK 4 — THEORY OF INTEREST
     ══════════════════════════════════════════════════════════════ */

  var FREQ = [
    { word: 'annually', m: 1 }, { word: 'half-yearly', m: 2 },
    { word: 'quarterly', m: 4 }, { word: 'monthly', m: 12 }
  ];

  add('w4-terms', [
    function () {
      var pv = R.step(50000, 900000, 10000);
      var rate = R.pick([5, 6, 7, 8, 9, 10]);
      var fv = R.round(pv * (1 + rate / 100), 2);
      return {
        type: 'numeric', marks: 2,
        prompt: 'An investment of R' + R.num(pv) + ' grows to R' + R.num(fv) +
                ' over one year with no withdrawals or additional deposits. Calculate the interest amount earned.',
        pre: 'R', answer: R.round(fv - pv, 2), tol: 1,
        solution: [
          { lab: 'Formula', val: 'Interest amount = FV − PV' },
          { lab: 'Substitute', val: 'R' + R.num(fv) + ' − R' + R.num(pv) },
          { lab: 'Answer', val: 'R' + R.money(fv - pv), final: true }
        ],
        why: 'Because there were no other movements in the account, the entire growth must be interest.'
      };
    },
    function () {
      var f = R.pick(FREQ.slice(1)), years = R.int(2, 8);
      return {
        type: 'mcq', marks: 2,
        prompt: 'An investment has a term of ' + years + ' years with interest compounded ' + f.word +
                '. What is <span class="math">n</span>?',
        options: R.options(years * f.m, [years, f.m, years + f.m]),
        answer: 0,
        solution: [
          { lab: 'Interest periods per year', val: String(f.m) + ' (' + f.word + ')' },
          { lab: 'Number of years', val: String(years) },
          { lab: 'Calculate', val: years + ' × ' + f.m },
          { lab: 'Answer', val: 'n = ' + (years * f.m) + ' interest periods', final: true }
        ],
        why: 'n counts interest periods, not years. Mixing these up is the most common mistake in this week.'
      };
    }
  ]);

  add('w4-simple', [
    function () {
      var pv = R.step(4000, 60000, 500);
      var rate = R.pick([5, 6, 7.5, 8, 9, 10, 12]);
      var n = R.int(2, 8);
      var fv = R.round(pv * (1 + n * rate / 100), 2);
      return {
        type: 'numeric', marks: 3,
        prompt: 'R' + R.num(pv) + ' is deposited into a savings account earning <b>simple interest</b> at ' +
                rate + '% per annum for ' + n + ' years. Calculate the future value.',
        pre: 'R', answer: fv, tol: 1,
        solution: [
          { lab: 'Formula', val: 'FV = PV(1 + ni)' },
          { lab: 'Substitute', val: 'R' + R.num(pv) + '(1 + (' + n + ')(' + (rate / 100) + '))' },
          { lab: 'Simplify', val: 'R' + R.num(pv) + '(' + R.round(1 + n * rate / 100, 4) + ')' },
          { lab: 'Answer', val: 'R' + R.money(fv), final: true }
        ],
        why: 'Convert the rate to a decimal before multiplying, and work the bracket out fully before applying it to PV.'
      };
    },
    function () {
      var pv = R.step(100000, 900000, 25000);
      var rate = R.pick([5, 6, 6.5, 7, 8, 8.5, 9]);
      var n = R.int(3, 8);
      var annual = R.round(pv * rate / 100, 2);
      var totalInt = R.round(annual * n, 2);
      var fv = R.round(pv + totalInt, 2);
      return {
        type: 'steps', marks: 5,
        scenario: 'E-Bike SA deposits R' + R.num(pv) + ' into an account earning ' + rate +
                  '% per annum <b>simple interest</b> for ' + n + ' years.',
        prompt: 'Calculate the interest earned and the future value.',
        steps: [
          { q: 'Calculate the interest earned in one year (PV × i).', pre: 'R', answer: annual, tol: 1,
            explain: 'R' + R.num(pv) + ' × ' + (rate / 100) + ' = R' + R.money(annual) +
                     '. With simple interest this is the same every year.' },
          { q: 'Calculate the total interest accumulated over ' + n + ' years.', pre: 'R', answer: totalInt, tol: 1,
            explain: n + ' × R' + R.money(annual) + ' = R' + R.money(totalInt) + ', using n(PV × i).' },
          { q: 'Now calculate the future value.', pre: 'R', answer: fv, tol: 1,
            explain: 'FV = PV + accumulated interest = R' + R.num(pv) + ' + R' + R.money(totalInt) + ' = R' + R.money(fv) + '.' }
        ],
        solution: [
          { lab: 'Interest per year', val: 'R' + R.num(pv) + ' × ' + (rate / 100) + ' = R' + R.money(annual) },
          { lab: 'Over ' + n + ' years', val: n + ' × R' + R.money(annual) + ' = R' + R.money(totalInt) },
          { lab: 'FV = PV(1 + ni)', val: 'R' + R.num(pv) + '(' + R.round(1 + n * rate / 100, 4) + ')' },
          { lab: 'Answer', val: 'R' + R.money(fv), final: true }
        ],
        why: 'Because interest is always calculated on the original capital, every year contributes exactly the same amount.'
      };
    }
  ]);

  add('w4-compound', [
    function () {
      var pv = R.step(5000, 80000, 1000);
      var rate = R.pick([4, 5, 6, 7, 8, 9, 10]);
      var n = R.int(3, 8);
      var fv = R.round(pv * Math.pow(1 + rate / 100, n), 2);
      return {
        type: 'numeric', marks: 3,
        prompt: 'R' + R.num(pv) + ' is deposited into a savings account earning <b>compound interest</b> at ' +
                rate + '% per annum for ' + n + ' years. Calculate the future value, to two decimal places.',
        pre: 'R', answer: fv, tol: 1,
        solution: [
          { lab: 'Formula', val: 'FV = PV(1 + i)ⁿ' },
          { lab: 'Substitute', val: 'R' + R.num(pv) + '(1 + ' + (rate / 100) + ')^' + n },
          { lab: 'Apply the power', val: '(' + R.round(1 + rate / 100, 4) + ')^' + n + ' = ' + R.round(Math.pow(1 + rate / 100, n), 6) },
          { lab: 'Answer', val: 'R' + R.money(fv), final: true }
        ],
        why: 'Simple interest on the same deposit would give R' + R.money(pv * (1 + n * rate / 100)) +
             '. The difference is interest earned on interest.'
      };
    },
    function () {
      var pv = R.step(10000, 90000, 5000);
      var rate = R.pick([4, 5, 6, 7, 8]);
      var n = R.int(3, 6);
      var factor = R.round(Math.pow(1 + rate / 100, n), 6);
      var fv = R.round(pv * Math.pow(1 + rate / 100, n), 2);
      return {
        type: 'steps', marks: 5,
        scenario: 'R' + R.num(pv) + ' is invested at ' + rate + '% per annum <b>compounded annually</b> for ' +
                  n + ' years.',
        prompt: 'Calculate the future value and the interest earned.',
        steps: [
          { q: 'What is n, the number of interest periods?', answer: n, tol: 0.01,
            explain: 'Interest is compounded annually over a ' + n + '-year term, so there are ' + n + ' periods.' },
          { q: 'Calculate (1 + i)ⁿ, to four decimal places.', answer: R.round(factor, 4), tol: 0.0015,
            explain: '(1 + ' + (rate / 100) + ')^' + n + ' = ' + factor + ', which rounds to ' + R.round(factor, 4) + '.' },
          { q: 'Now calculate the future value, to two decimal places.', pre: 'R', answer: fv, tol: 1,
            explain: 'R' + R.num(pv) + ' × ' + factor + ' = R' + R.money(fv) + '.' },
          { q: 'Finally, calculate the interest earned.', pre: 'R', answer: R.round(fv - pv, 2), tol: 1,
            explain: 'Interest = FV − PV = R' + R.money(fv) + ' − R' + R.num(pv) + ' = R' + R.money(fv - pv) + '.' }
        ],
        solution: [
          { lab: 'PV, i, n', val: 'R' + R.num(pv) + ', ' + (rate / 100) + ', ' + n },
          { lab: 'Substitute', val: 'R' + R.num(pv) + '(' + R.round(1 + rate / 100, 4) + ')^' + n },
          { lab: 'Future value', val: 'R' + R.money(fv) },
          { lab: 'Interest earned', val: 'R' + R.money(fv - pv), final: true }
        ],
        why: 'Work the power out to at least four decimal places before multiplying — rounding it early can cost you hundreds of rand.'
      };
    }
  ]);

  add('w4-freq', [
    function () {
      var f = R.pick(FREQ.slice(1));
      var rate = R.pick([4, 6, 8, 9, 10, 12]);
      var eff = R.round(rate / f.m, 4);
      var per = { 2: 'per half-year', 4: 'per quarter', 12: 'per month' };
      return {
        type: 'numeric', marks: 2,
        prompt: 'An interest rate is quoted as ' + rate + '% per annum <b>compounded ' + f.word +
                '</b>. Calculate the effective periodic interest rate.',
        suf: '% ' + per[f.m], answer: eff, tol: 0.0005,
        solution: [
          { lab: 'Formula', val: 'i = i⁽ᵐ⁾ ÷ m' },
          { lab: 'Substitute', val: rate + '% ÷ ' + f.m },
          { lab: 'Answer', val: eff + '% ' + per[f.m], final: true }
        ],
        why: 'This is the rate actually applied at the end of each period — not the headline annual rate.'
      };
    },
    function () {
      var f = R.pick(FREQ.slice(1));
      var rate = R.pick([4, 6, 8, 10, 12]);
      var years = R.int(2, 6);
      var pv = R.step(10000, 90000, 5000);
      var i = rate / 100 / f.m, n = years * f.m;
      var fv = R.round(pv * Math.pow(1 + i, n), 2);
      return {
        type: 'steps', marks: 6,
        scenario: 'R' + R.num(pv) + ' is invested at ' + rate + '% per annum <b>compounded ' + f.word +
                  '</b> for ' + years + ' years.',
        prompt: 'Calculate the future value.',
        steps: [
          { q: 'Calculate the effective periodic interest rate, as a percentage.',
            suf: '%', answer: R.round(rate / f.m, 4), tol: 0.0005,
            explain: f.word.charAt(0).toUpperCase() + f.word.slice(1) + ' means m = ' + f.m + ', so i = ' +
                     rate + '% ÷ ' + f.m + ' = ' + R.round(rate / f.m, 4) + '%.' },
          { q: 'Calculate n, the number of interest periods.', answer: n, tol: 0.01,
            explain: years + ' years × ' + f.m + ' periods per year = ' + n + '.' },
          { q: 'Now calculate the future value, to two decimal places.', pre: 'R', answer: fv, tol: 2,
            explain: 'FV = R' + R.num(pv) + '(1 + ' + R.round(i, 6) + ')^' + n + ' = R' + R.money(fv) + '.' }
        ],
        solution: [
          { lab: 'Effective periodic rate', val: rate + '% ÷ ' + f.m + ' = ' + R.round(rate / f.m, 4) + '%' },
          { lab: 'Number of periods', val: years + ' × ' + f.m + ' = ' + n },
          { lab: 'Formula', val: 'FV = PV(1 + i)ⁿ' },
          { lab: 'Answer', val: 'R' + R.money(fv), final: true }
        ],
        why: 'Both n and i change together. Using the annual rate with the period count, or vice versa, would both be wrong.'
      };
    }
  ]);

  add('w4-calc', [
    function () {
      var f = R.pick(FREQ);
      return {
        type: 'mcq', marks: 2,
        prompt: 'Interest is compounded <b>' + f.word + '</b>. What value should be stored using the P/YR function?',
        options: R.options(f.m, [f.m === 1 ? 12 : 1, f.m === 4 ? 12 : 4, f.m * 5]),
        answer: 0,
        solution: [
          { lab: 'P/YR', val: 'the number of interest periods per year' },
          { lab: f.word, val: f.m + ' per year' },
          { lab: 'Answer', val: String(f.m), final: true }
        ],
        why: 'P/YR is periods per *year*. The total number of periods over the whole term belongs in N, not P/YR.'
      };
    }
  ]);

  return { add: add, make: make, has: has, registered: function () { return reg; } };
})();
