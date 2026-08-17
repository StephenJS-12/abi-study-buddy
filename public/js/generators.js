/* Abi's Study Buddy — question generators.
   Each generator returns a fresh question with randomised values, and builds its own
   worked solution from those same values, so the answer and the working can never
   disagree. Registered by topic id, so the week data files stay untouched.  */

var GEN = (function () {
  var R = Rand;
  var reg = {};

  /* A fraction in its lowest terms. Distractors have to be built with this too,
     not just answers: a screen showing 7/13, 30/52, 2/52 and 26/52 tells you
     which one is correct without any probability being done, because only the
     right answer was simplified. */
  function sfrac(n, d) {
    var g = R.gcd(n, d);
    return R.frac(n / g, d / g);
  }

  function add(topicId, fns) {
    reg[topicId] = (reg[topicId] || []).concat(fns);
  }

  /* What a question actually asks, ignoring how it is worded: every number in
     it, plus the answer it wants back.

     Two questions matching on this are the same exercise however different they
     read, which is the whole problem. "Two queens are drawn from 52" and "two
     jacks are drawn from 52" both reduce to 52 => 1/221, and both used to land
     in the same round because the old check compared the sentences and the
     sentences plainly differed. So do "24 × 34" and "34 × 24", and the same
     dataset listed in a different order, and an overhead question about the
     electricity bill next to an identical one about the insurance bill. */
  function fingerprint(q) {
    var text = String(q.prompt || '') + ' ' + String(q.scenario || '');
    text = text.replace(/<[^>]*>/g, ' ');

    var nums = text.match(/\d+(?:[.,]\d+)?/g) || [], tidy = [];
    for (var i = 0; i < nums.length; i++) tidy.push(nums[i].replace(',', ''));
    tidy.sort();

    var wants;
    if (q.type === 'mcq') {
      wants = String((q.options || [])[q.answer] || '').replace(/<[^>]*>/g, ' ');
    } else if (q.type === 'steps') {
      wants = '';
      for (var s = 0; s < (q.steps || []).length; s++) wants += '~' + (q.steps[s].answer);
    } else {
      wants = String(q.answer);
    }
    wants = wants.replace(/\s+/g, '');

    /* A question with no numbers in it is a question about the ideas — "which
       rule applies to dependent events", "is this pair independent". There the
       words are the maths, and fingerprinting on numbers alone would reduce
       every one of them to its answer, leaving four possible questions in a
       whole topic. */
    if (!tidy.length) {
      return 'txt:' + text.replace(/\s+/g, ' ').replace(/^ | $/g, '').toLowerCase() + '=>' + wants;
    }
    return tidy.join('|') + '=>' + wants;
  }

  /* Produces up to n distinct questions for a topic.
     Distinctness is judged on the maths above, never on the wording. A generator
     can override with an explicit `shape` where the numbers alone do not capture
     what makes two of its questions the same. */
  function make(topicId, n) {
    var fns = reg[topicId] || [];
    if (!fns.length || n <= 0) return [];

    /* Take the generators in a different order each time. Walking them in the
       order they were written meant that once a topic had more generators than
       the round had room for, the ones at the end effectively did not exist —
       a round of six would be filled by the first six every single time, so
       adding a new kind of question changed almost nothing. */
    var order = [];
    for (var i = 0; i < fns.length; i++) order.push(i);
    for (i = order.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var swap = order[i]; order[i] = order[j]; order[j] = swap;
    }

    var out = [], seen = {}, attempts = 0, maxAttempts = n * 12;
    while (out.length < n && attempts < maxAttempts) {
      attempts++;
      var q;
      try { q = fns[order[attempts % order.length]](); } catch (e) { continue; }
      if (!q) continue;

      /* Both keys, always. An explicit shape is an extra way for two questions
         to be the same, never a licence to skip the maths check — keying on the
         shape alone put "Calculate 10⁴" and "What is 10⁴ written out in full?"
         in one round, because they were answering to different namespaces. */
      var print = fingerprint(q);
      var named = q.shape ? 's:' + q.shape : null;
      if (seen[print] || (named && seen[named])) continue;
      seen[print] = true;
      if (named) seen[named] = true;
      var key = print;
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
      var base = R.int(2, 12), exp = R.int(3, 7);
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
      var base = R.int(2, 12), exp = R.int(2, 6);
      var ans = Math.pow(base, exp);
      if (ans > 20000) return null;
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
      var root = R.int(4, 30), sq = root * root;
      return {
        type: 'numeric', marks: 2,
        prompt: 'Calculate √' + R.num(sq) + '.',
        answer: root, tol: 0.01,
        solution: [
          { lab: 'What we need', val: 'a number that multiplied by itself gives ' + R.num(sq) },
          { lab: 'Test', val: root + ' × ' + root + ' = ' + R.num(sq) },
          { lab: 'Answer', val: String(root), final: true }
        ],
        why: 'No number to the left of the root sign means a square root, so you need the value that appears twice.'
      };
    },
    function () {
      var root = R.int(2, 10), cube = root * root * root;
      return {
        type: 'numeric', marks: 2,
        prompt: 'Calculate <sup>3</sup>√' + R.num(cube) + ', the cube root of ' + R.num(cube) + '.',
        answer: root, tol: 0.01,
        solution: [
          { lab: 'What we need', val: 'a number appearing three times that gives ' + R.num(cube) },
          { lab: 'Test', val: root + ' × ' + root + ' × ' + root + ' = ' + R.num(cube) },
          { lab: 'Answer', val: String(root), final: true }
        ],
        why: 'The small 3 on the root sign tells you the value must appear three times, not two.'
      };
    },

    /* Powers of ten. Worth their own question: they are how every large money
       figure in the module gets read, and the pattern is easy to see. */
    function () {
      var n = R.int(2, 7);
      var val = Math.pow(10, n);
      var reverse = R.int(0, 1) === 0;
      var zeros = '';
      for (var z = 0; z < n; z++) zeros += '0';
      return {
        type: 'mcq', marks: 1,
        shape: 'pow10|' + n + '|' + (reverse ? 'r' : 'f'),
        prompt: reverse
          ? 'Written as a power of 10, ' + R.num(val) + ' is:'
          : 'What is 10<sup>' + n + '</sup> written out in full?',
        options: reverse
          ? R.options('10<sup>' + n + '</sup>', ['10<sup>' + (n + 1) + '</sup>',
                                                 '10<sup>' + (n - 1) + '</sup>', n + '<sup>10</sup>'])
          : R.options(R.num(val), [R.num(val * 10), R.num(val / 10), R.num(10 * n)]),
        answer: 0,
        solution: [
          { lab: 'The exponent counts', val: 'how many 10s are multiplied together' },
          { lab: 'Which means', val: 'a 1 followed by ' + n + ' zero' + (n === 1 ? '' : 's') },
          { lab: 'Answer', val: reverse ? '10^' + n : R.num(val), final: true }
        ],
        why: '10^' + n + ' is 1' + zeros + '. Counting the zeros is the quickest check — the exponent and the ' +
             'number of zeros always match.'
      };
    },

    /* A fourth root, so the small number on the sign is something she has to
       read rather than assume. */
    function () {
      var root = R.int(2, 5);
      var val = root * root * root * root;
      return {
        type: 'numeric', marks: 2,
        shape: 'root4|' + root,
        prompt: 'Calculate <sup>4</sup>√' + R.num(val) + '.',
        answer: root, tol: 0.01,
        solution: [
          { lab: 'The 4 on the sign means', val: 'find the value that appears four times' },
          { lab: 'Test', val: root + ' × ' + root + ' × ' + root + ' × ' + root + ' = ' + R.num(val) },
          { lab: 'Answer', val: String(root), final: true }
        ],
        why: 'Roots and powers undo each other whatever the number is. Since ' + root + '^4 = ' + R.num(val) +
             ', the fourth root of ' + R.num(val) + ' must be ' + root + '.'
      };
    },

    /* Comparing two powers — the order of base and exponent is not decoration,
       and seeing it fail once fixes it. */
    function () {
      var a = R.int(2, 5), b = R.int(2, 5);
      if (a === b) return null;
      var ab = Math.pow(a, b), ba = Math.pow(b, a);
      if (ab === ba) return null;                   // 2^4 and 4^2 are both 16
      var bigger = ab > ba ? a + '<sup>' + b + '</sup>' : b + '<sup>' + a + '</sup>';
      return {
        type: 'mcq', marks: 2,
        shape: 'compare|' + Math.min(a, b) + '|' + Math.max(a, b),
        prompt: 'Which is larger, ' + a + '<sup>' + b + '</sup> or ' + b + '<sup>' + a + '</sup>?',
        options: R.options(bigger, [
          ab > ba ? b + '<sup>' + a + '</sup>' : a + '<sup>' + b + '</sup>',
          'they are equal'
        ]),
        answer: 0,
        solution: [
          { lab: a + '^' + b, val: R.num(ab) },
          { lab: b + '^' + a, val: R.num(ba) },
          { lab: 'Answer', val: (ab > ba ? a + '^' + b : b + '^' + a) + ' is larger', final: true }
        ],
        why: 'Swapping the base and the exponent gives a completely different number — ' + R.num(ab) +
             ' against ' + R.num(ba) + '. Which one sits raised matters.'
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
        /* 3² × 3⁴ and 3⁴ × 3² are the same sum written back to front. */
        shape: 'expmul|' + base + '|' + (a + b),
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
        shape: 'expdiv|' + base + '|' + (a - b),
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
      var a = R.int(2, 8), b = R.int(2, 8);
      var v = R.pick(['x', 'y', 'a', 'm', 'p']);
      return {
        type: 'mcq', marks: 2,
        /* (x⁴)⁵ and (x⁵)⁴ are both x²⁰, and the letter is decoration. */
        shape: 'powpow|' + (a * b),
        prompt: 'Simplify (' + v + '<sup>' + a + '</sup>)<sup>' + b + '</sup>.',
        options: R.options(v + '<sup>' + (a * b) + '</sup>',
                           [v + '<sup>' + (a + b) + '</sup>', v + '<sup>' + Math.pow(a, b) + '</sup>',
                            a + v + '<sup>' + b + '</sup>', v + '<sup>' + Math.abs(a - b) + '</sup>']),
        answer: 0,
        solution: [
          { lab: 'Power raised to a power', val: 'multiply the exponents' },
          { lab: 'Calculate', val: a + ' × ' + b + ' = ' + (a * b) },
          { lab: 'Answer', val: v + '^' + (a * b), final: true }
        ],
        why: v + '^' + (a + b) + ' comes from adding — but adding is the rule for multiplying two powers, not raising one to another.'
      };
    },

    /* The two special instances. Small, but they are stated first in the notes
       and they turn up inside longer simplifications constantly. */
    function () {
      var v = R.pick(['x', 'y', 'b', 'k', 'n']);
      var base = R.int(2, 30);
      var zero = R.int(0, 1) === 0;
      return {
        type: 'mcq', marks: 1,
        shape: 'special|' + (zero ? 'zero' : 'one'),
        prompt: zero
          ? 'What is ' + base + '<sup>0</sup>?'
          : 'Simplify ' + v + '<sup>1</sup>.',
        options: zero
          ? R.options('1', ['0', String(base), R.frac(1, base)])
          : R.options(v, [v + '<sup>0</sup>', '1', '0']),
        answer: 0,
        solution: zero
          ? [
              { lab: 'Anything to the power of 0', val: 'is 1' },
              { lab: 'Why', val: base + '^n ÷ ' + base + '^n = 1, and dividing subtracts the exponents to give ' + base + '^0' },
              { lab: 'Answer', val: '1', final: true }
            ]
          : [
              { lab: 'Anything to the power of 1', val: 'is itself' },
              { lab: 'Answer', val: v, final: true }
            ],
        why: zero
          ? 'It looks wrong until you see where it comes from: it is forced by the division rule, not an arbitrary decision. Note ' + base + '^0 is 1, not 0.'
          : 'The exponent counts how many times the base appears. Once means just the base itself.'
      };
    },

    /* A product raised to a power — every factor gets it, which is the part
       most often dropped. */
    function () {
      var a = R.int(2, 5);
      var coef = R.int(2, 6);
      var v = R.pick(['x', 'y', 'm']), w = R.pick(['z', 'n', 'k']);
      var useCoef = R.int(0, 1) === 0;
      return {
        type: 'mcq', marks: 2,
        shape: 'product-pow|' + (useCoef ? 'coef' + coef : 'plain') + '|' + a,
        prompt: useCoef
          ? 'Simplify (' + coef + v + ')<sup>' + a + '</sup>.'
          : 'Simplify (' + v + w + ')<sup>' + a + '</sup>.',
        options: useCoef
          ? R.options(R.num(Math.pow(coef, a)) + v + '<sup>' + a + '</sup>',
                      [coef + v + '<sup>' + a + '</sup>', (coef * a) + v + '<sup>' + a + '</sup>',
                       R.num(Math.pow(coef, a)) + v])
          : R.options(v + '<sup>' + a + '</sup>' + w + '<sup>' + a + '</sup>',
                      [v + w + '<sup>' + a + '</sup>', v + '<sup>' + a + '</sup>' + w,
                       (v + w) + '<sup>' + (a * 2) + '</sup>']),
        answer: 0,
        solution: useCoef
          ? [
              { lab: 'Each factor gets the power', val: '(' + coef + v + ')^' + a + ' = ' + coef + '^' + a + ' × ' + v + '^' + a },
              { lab: 'The number too', val: coef + '^' + a + ' = ' + R.num(Math.pow(coef, a)) },
              { lab: 'Answer', val: R.num(Math.pow(coef, a)) + v + '^' + a, final: true }
            ]
          : [
              { lab: 'Each factor gets the power', val: '(' + v + w + ')^' + a + ' = ' + v + '^' + a + ' × ' + w + '^' + a },
              { lab: 'Answer', val: v + '^' + a + w + '^' + a, final: true }
            ],
        why: useCoef
          ? 'The ' + coef + ' is a factor like any other, so it is raised too — ' + coef + '^' + a + ', not left as ' + coef + '.'
          : 'Both letters are inside the bracket, so both are multiplied ' + a + ' times over.'
      };
    },

    /* Negative exponents, in both directions. */
    function () {
      var base = R.int(2, 6), a = R.int(2, 4);
      var toFraction = R.int(0, 1) === 0;
      var val = Math.pow(base, a);
      return {
        type: 'mcq', marks: 2,
        shape: 'negexp|' + (toFraction ? 'to-frac' : 'to-neg') + '|' + base + '|' + a,
        prompt: toFraction
          ? 'Rewrite ' + base + '<sup>−' + a + '</sup> without a negative exponent.'
          : 'Rewrite ' + R.frac(1, base + '<sup>' + a + '</sup>') + ' using a negative exponent.',
        options: toFraction
          ? R.options(R.frac(1, R.num(val)), [R.frac(1, base * a), '−' + R.num(val), R.frac(-1, R.num(val))])
          : R.options(base + '<sup>−' + a + '</sup>', ['−' + base + '<sup>' + a + '</sup>',
                                                       base + '<sup>' + a + '</sup>', '−' + base + '<sup>−' + a + '</sup>']),
        answer: 0,
        solution: [
          { lab: 'The rule', val: 'x^−a means 1 ÷ x^a' },
          { lab: 'Here', val: base + '^' + a + ' = ' + R.num(val) },
          { lab: 'Answer', val: toFraction ? '1/' + R.num(val) : base + '^−' + a, final: true }
        ],
        why: 'A negative exponent does not make the answer negative — it flips it to the bottom of a fraction. ' +
             base + '^−' + a + ' is 1/' + R.num(val) + ', a small positive number.'
      };
    },

    /* The watch-out the notes call out by name: the laws need the same base. */
    function () {
      var b1 = R.pick([2, 3, 5]), b2 = R.pick([4, 6, 7]);
      var e1 = R.int(2, 5), e2 = R.int(2, 5);
      return {
        type: 'mcq', marks: 2,
        shape: 'diffbase',
        prompt: 'Which of these <b>cannot</b> be simplified by adding exponents?',
        options: R.options(
          b1 + '<sup>' + e1 + '</sup> × ' + b2 + '<sup>' + e2 + '</sup>',
          [b1 + '<sup>' + e1 + '</sup> × ' + b1 + '<sup>' + e2 + '</sup>',
           'x<sup>' + e1 + '</sup> × x<sup>' + e2 + '</sup>',
           b2 + '<sup>' + e1 + '</sup> × ' + b2 + '<sup>' + e2 + '</sup>']),
        answer: 0,
        solution: [
          { lab: 'The rule needs', val: 'the same base on both sides' },
          { lab: 'Here', val: b1 + ' and ' + b2 + ' are different bases' },
          { lab: 'Answer', val: b1 + '^' + e1 + ' × ' + b2 + '^' + e2 + ' — work each one out separately', final: true }
        ],
        why: 'Adding exponents is really just counting how many copies of one base are being multiplied. ' +
             'With two different bases there is nothing to count.'
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
        /* Counting the faces is the whole exercise, so two rolls that land on the
           same count are the same question wearing a different sentence. */
        shape: 'die|' + count,
        prompt: 'When rolling a standard six-sided die, what is the probability of rolling a number <b>' +
                (greater ? 'greater than ' : 'less than or equal to ') + threshold + '</b>?',
        /* Every other face-count, simplified, offered in a random order. The old
           trio collapsed into the answer whenever count was 3 (3/6 and 6−3/6 are
           the same half), which left her choosing between two options. */
        options: R.options(R.frac(count / g, 6 / g), R.shuffle([1, 2, 3, 4, 5])
          .filter(function (k) { return k !== count; })
          .map(function (k) { var kg = R.gcd(k, 6); return R.frac(k / kg, 6 / kg); })),
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
    /* Cards. The criterion is what varies, not the flavour word: asking for a
       face card counts 12, an ace counts 4, a red card counts 26. Picking a
       different suit name only ever produced 13 again, which is how two
       identical questions ended up in the same round. */
    function () {
      var crit = R.pick([
        { text: 'a heart', n: 13, how: 'one suit of 13' },
        { text: 'a spade', n: 13, how: 'one suit of 13' },
        { text: 'a red card', n: 26, how: 'hearts and diamonds, 13 each' },
        { text: 'a face card (jack, queen or king)', n: 12, how: '3 face ranks × 4 suits' },
        { text: 'an ace', n: 4, how: 'one of each suit' },
        { text: 'a black face card', n: 6, how: '3 face ranks × 2 black suits' },
        { text: 'a ten or higher (10, J, Q, K, A)', n: 20, how: '5 ranks × 4 suits' }
      ]);
      var isNot = R.int(0, 1) === 0;
      var hits = isNot ? 52 - crit.n : crit.n;
      var g = R.gcd(hits, 52);
      var ans = R.frac(hits / g, 52 / g);
      return {
        type: 'mcq', marks: 2,
        shape: 'card-single|' + hits,
        prompt: 'A card is drawn at random from a deck of 52. What is the probability that it is ' +
                (isNot ? '<b>not</b> ' : '') + crit.text + '?',
        /* Other counts that plausibly come out of a deck, simplified. Offering
           the complement as a fixed distractor collapsed onto the answer for a
           red card, where the complement is also 26. */
        options: R.options(ans, R.shuffle([4, 6, 12, 13, 20, 26, 39, 40])
          .filter(function (k) { return k !== hits; })
          .map(function (k) { var kg = R.gcd(k, 52); return R.frac(k / kg, 52 / kg); })),
        answer: 0,
        solution: [
          { lab: 'Favourable cards', val: crit.text + ' — ' + crit.how + ' = ' + crit.n },
          isNot
            ? { lab: 'Complement', val: '52 − ' + crit.n + ' = ' + hits + ' cards are not ' + crit.text }
            : { lab: 'Out of', val: '52 cards in the deck' },
          { lab: 'Probability', val: hits + '/52' },
          { lab: 'Answer', val: (hits / g) + '/' + (52 / g), final: true }
        ],
        why: 'Everything here is counting. Work out how many of the 52 cards satisfy the description, ' +
             'put that over 52, then simplify.'
      };
    },

    /* A bag of counters. The totals move, so the arithmetic genuinely differs
       every time rather than dressing up the same fraction. */
    function () {
      var red = R.int(3, 11), blue = R.int(3, 11), green = R.int(2, 8);
      var total = red + blue + green;
      var want = R.pick([
        { lab: 'red', n: red }, { lab: 'blue', n: blue }, { lab: 'green', n: green }
      ]);
      var g = R.gcd(want.n, total);
      return {
        type: 'mcq', marks: 2,
        scenario: 'A bag holds ' + red + ' red counters, ' + blue + ' blue counters and ' +
                  green + ' green counters. One counter is taken out without looking.',
        prompt: 'What is the probability that it is <b>' + want.lab + '</b>?',
        /* Comparing the group to the rest instead of to the whole bag, the
           complement, and the other two colours — all genuine ways to go wrong.
           Filtered by value, so a bag that happens to be half red still fills up. */
        options: R.options(R.frac(want.n / g, total / g), (function () {
          var wrong = [{ n: want.n, d: total - want.n }, { n: total - want.n, d: total }];
          [red, blue, green].forEach(function (k) { if (k !== want.n) wrong.push({ n: k, d: total }); });
          return wrong.map(function (o) {
            var og = R.gcd(o.n, o.d);
            return R.frac(o.n / og, o.d / og);
          });
        })()),
        answer: 0,
        solution: [
          { lab: 'Favourable', val: want.n + ' ' + want.lab + ' counters' },
          { lab: 'Total', val: red + ' + ' + blue + ' + ' + green + ' = ' + total + ' counters' },
          { lab: 'Probability', val: want.n + '/' + total },
          { lab: 'Answer', val: (want.n / g) + '/' + (total / g), final: true }
        ],
        why: 'The denominator is every counter in the bag, not just the ones you are not interested in. ' +
             'A common slip is ' + want.n + '/' + (total - want.n) + ', which compares the two groups instead.'
      };
    },

    /* Empirical probability — estimating from what actually happened. Same
       single idea (favourable ÷ total) but arriving from data rather than
       from a symmetrical object. */
    function () {
      var total = R.pick([200, 250, 500]);
      /* Two tenses per event: the record already happened, the prediction has
         not. Reusing one phrase for both produced "the probability that the
         next one were resolved on the first call". */
      var event = R.pick([
        { noun: 'deliveries', past: 'arrived late', next: 'arrives late' },
        { noun: 'calls to the help desk', past: 'were resolved on the first call', next: 'is resolved on the first call' },
        { noun: 'items coming off the line', past: 'failed inspection', next: 'fails inspection' },
        { noun: 'website visits', past: 'ended in a purchase', next: 'ends in a purchase' }
      ]);
      var hits = R.int(Math.round(total * 0.06), Math.round(total * 0.34));
      var ans = R.round(hits / total, 3);
      return {
        type: 'numeric', marks: 2,
        shape: 'empirical|' + hits + '/' + total,
        scenario: 'A business recorded ' + R.num(total) + ' ' + event.noun + ' last month. Of those, ' +
                  R.num(hits) + ' ' + event.past + '.',
        prompt: 'Based on this record, estimate the probability that the next one ' + event.next + '.',
        answer: ans, tol: 0.0005,
        note: 'Give your answer as a decimal.',
        solution: [
          { lab: 'Relative frequency', val: 'P(event) ≈ times it happened ÷ times observed' },
          { lab: 'Substitute', val: R.num(hits) + ' ÷ ' + R.num(total) },
          { lab: 'Answer', val: String(ans), final: true }
        ],
        why: 'There is no symmetry to reason from here, so the past record is the best estimate available. ' +
             'The more observations behind it, the more you can trust it.'
      };
    },

    /* Raffle — the same counting idea with a deliberately awkward simplification. */
    function () {
      var total = R.pick([60, 80, 120, 150, 200, 250]);
      var bought = R.int(4, 25);
      var g = R.gcd(bought, total);
      return {
        type: 'mcq', marks: 2,
        shape: 'raffle|' + bought + '/' + total,
        prompt: 'A raffle sells ' + R.num(total) + ' tickets in total and Abi buys ' + bought +
                ' of them. One winning ticket is drawn at random. What is the probability that Abi wins?',
        options: R.options(sfrac(bought, total), [
          sfrac(1, total),
          sfrac(bought, total - bought),     /* compared to the tickets she does not hold */
          sfrac(1, bought)
        ]),
        answer: 0,
        solution: [
          { lab: 'Favourable', val: bought + ' tickets are hers' },
          { lab: 'Total', val: R.num(total) + ' tickets were sold' },
          { lab: 'Probability', val: bought + '/' + R.num(total) },
          { lab: 'Answer', val: (bought / g) + '/' + (total / g), final: true }
        ],
        why: 'Each ticket is equally likely to be drawn, so holding ' + bought + ' of them means ' +
             bought + ' of the ' + R.num(total) + ' equally likely outcomes are wins.'
      };
    }
  ]);

  add('w3-add', [
    /* Cards where the two events overlap, so the subtraction is the point.
       Naming two ranks only ever gave 4/52 + 4/52 again — the pair chosen here
       changes both the counts and whether anything is double-counted at all. */
    function () {
      var pair = R.pick([
        { a: 'a heart', na: 13, b: 'a face card (jack, queen or king)', nb: 12, both: 3, bothWhy: 'the jack, queen and king of hearts' },
        { a: 'a red card', na: 26, b: 'an ace', nb: 4, both: 2, bothWhy: 'the ace of hearts and the ace of diamonds' },
        { a: 'a spade', na: 13, b: 'a king', nb: 4, both: 1, bothWhy: 'the king of spades' },
        { a: 'a black card', na: 26, b: 'a queen', nb: 4, both: 2, bothWhy: 'the queen of spades and the queen of clubs' },
        { a: 'a face card (jack, queen or king)', na: 12, b: 'a red card', nb: 26, both: 6, bothWhy: 'the three face cards in each of the two red suits' },
        { a: 'a diamond', na: 13, b: 'a ten or higher (10, J, Q, K, A)', nb: 20, both: 5, bothWhy: 'the 10, J, Q, K and A of diamonds' }
      ]);
      var either = pair.na + pair.nb - pair.both;
      var g = R.gcd(either, 52);
      return {
        type: 'mcq', marks: 3,
        shape: 'card-or|' + either,
        prompt: 'One card is drawn at random from a deck of 52. What is the probability that it is <b>' +
                pair.a + ' or ' + pair.b + '</b>?',
        options: R.options(sfrac(either, 52), [
          sfrac(pair.na + pair.nb, 52),      /* forgot to subtract the overlap */
          sfrac(pair.both, 52),
          sfrac(pair.na, 52)
        ]),
        answer: 0,
        solution: [
          { lab: 'Mutually exclusive?', val: 'no — ' + pair.both + ' card' + (pair.both === 1 ? ' is' : 's are') + ' both (' + pair.bothWhy + ')' },
          { lab: 'P(' + pair.a + ')', val: pair.na + '/52' },
          { lab: 'P(' + pair.b + ')', val: pair.nb + '/52' },
          { lab: 'Subtract the overlap', val: pair.na + ' + ' + pair.nb + ' − ' + pair.both + ' = ' + either + ' cards' },
          { lab: 'Answer', val: (either / g) + '/' + (52 / g), final: true }
        ],
        why: 'Adding straight to ' + (pair.na + pair.nb) + '/52 counts ' + pair.bothWhy +
             ' twice. That is exactly what the −P(A and B) term exists to undo.'
      };
    },

    /* Die, two overlapping descriptions. Which two get picked changes the union
       every time, so the counting is never the same twice. */
    function () {
      var sets = [
        { text: 'even', faces: [2, 4, 6] },
        { text: 'odd', faces: [1, 3, 5] },
        { text: 'greater than 3', faces: [4, 5, 6] },
        { text: 'less than 3', faces: [1, 2] },
        { text: 'a multiple of 3', faces: [3, 6] },
        { text: 'at least 5', faces: [5, 6] },
        { text: 'a prime number', faces: [2, 3, 5] }
      ];
      var two = R.shuffle(sets).slice(0, 2);
      var A = two[0], B = two[1];

      var union = [], both = [];
      for (var f = 1; f <= 6; f++) {
        var inA = A.faces.indexOf(f) !== -1, inB = B.faces.indexOf(f) !== -1;
        if (inA || inB) union.push(f);
        if (inA && inB) both.push(f);
      }
      /* Certainty is not worth asking, and a union that is just one of the two
         sets makes the addition rule invisible. */
      if (union.length === 6 || union.length === A.faces.length || union.length === B.faces.length) return null;

      var g = R.gcd(union.length, 6);
      return {
        type: 'mcq', marks: 3,
        /* Keyed on how many faces qualify, not which ones: "odd or a multiple of
           3" and "even or at least 5" both come to 4 faces, and meeting both in
           one round is the same question twice. */
        shape: 'die-or|' + union.length,
        prompt: 'A standard six-sided die is rolled once. What is the probability that the result is <b>' +
                A.text + ' or ' + B.text + '</b>?',
        options: R.options(sfrac(union.length, 6), [
          sfrac(A.faces.length + B.faces.length, 6),
          sfrac(both.length || 1, 6),
          sfrac(A.faces.length, 6)
        ]),
        answer: 0,
        solution: [
          { lab: A.text, val: 'faces ' + A.faces.join(', ') },
          { lab: B.text, val: 'faces ' + B.faces.join(', ') },
          { lab: 'In both', val: both.length ? 'face ' + both.join(', ') + ' — counted twice if you just add' : 'none — these cannot happen together' },
          { lab: 'Either', val: 'faces ' + union.join(', ') + ' — that is ' + union.length + ' of 6' },
          { lab: 'Answer', val: (union.length / g) + '/' + (6 / g), final: true }
        ],
        why: both.length
          ? 'These overlap, so P(A) + P(B) alone would give ' + (A.faces.length + B.faces.length) +
            '/6. Listing the faces out is the safest way to see it.'
          : 'These two cannot happen at once, so here P(A or B) really is just P(A) + P(B).'
      };
    },

    /* Mutually exclusive, given as probabilities rather than counts — the same
       rule with nothing to subtract, so she has to notice that for herself. */
    function () {
      var plan = R.shuffle(['Basic', 'Standard', 'Premium', 'Business']);
      var pa = R.round(R.int(15, 40) / 100, 2);
      var pb = R.round(R.int(15, 40) / 100, 2);
      var pc = R.round(1 - pa - pb, 2);
      if (pc <= 0.05) return null;
      var ans = R.round(pa + pb, 2);
      return {
        type: 'numeric', marks: 3,
        shape: 'excl-plans|' + ans,
        scenario: 'Every customer signs up for exactly one package. P(' + plan[0] + ') = ' + pa +
                  ', P(' + plan[1] + ') = ' + pb + ' and P(' + plan[2] + ') = ' + pc + '.',
        prompt: 'Calculate the probability that a randomly chosen customer is on <b>' + plan[0] +
                ' or ' + plan[1] + '</b>.',
        answer: ans, tol: 0.005,
        solution: [
          { lab: 'Mutually exclusive?', val: 'yes — each customer is on exactly one package' },
          { lab: 'So nothing to subtract', val: 'P(A or B) = P(A) + P(B)' },
          { lab: 'Substitute', val: pa + ' + ' + pb },
          { lab: 'Answer', val: String(ans), final: true }
        ],
        why: '"Exactly one" is the phrase that rules out any overlap. Without it you would need ' +
             'P(A and B) before you could answer at all.'
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
        /* Reduced like the answer is, so the layout gives nothing away. */
        options: R.options(sfrac(either, total),
                           [sfrac(a + b, total), sfrac(both, total), sfrac(a, total)]),
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
    /* Two cards without replacement. Naming a different rank changed nothing —
       four of them exist either way, so the answer was 1/221 every single time.
       Varying the *group* changes both factors and the answer with them. */
    function () {
      var crit = R.pick([
        { text: 'both are kings', n: 4, how: '4 kings' },
        { text: 'both are hearts', n: 13, how: '13 hearts' },
        { text: 'both are red', n: 26, how: '26 red cards' },
        { text: 'both are face cards (jack, queen or king)', n: 12, how: '12 face cards' },
        { text: 'both are tens or higher (10, J, Q, K, A)', n: 20, how: '20 cards of rank 10 or above' }
      ]);
      var num = crit.n * (crit.n - 1);
      var den = 52 * 51;
      var g = R.gcd(num, den);
      return {
        type: 'mcq', marks: 3,
        shape: 'card-2-norepl|' + crit.n,
        prompt: 'From a pack of 52 cards, two cards are drawn at random, one at a time, <b>without replacement</b>. ' +
                'What is the probability that ' + crit.text + '?',
        /* Every distractor must be a different VALUE, not just a different
           string — offering the unsimplified form of the answer would quietly
           put two correct options on the screen. */
        options: R.options(sfrac(num, den), [
          /* the same question answered as though the card went back */
          sfrac(crit.n * crit.n, 2704),
          /* shrinking the rank but forgetting the deck shrinks too */
          sfrac(num, 2704),
          sfrac(crit.n, 52)
        ]),
        answer: 0,
        solution: [
          { lab: 'Dependent — "without replacement"', val: 'use P(A) × P(B | A)' },
          { lab: 'P(first)', val: crit.n + '/52 — ' + crit.how + ' in the deck' },
          { lab: 'P(second | first)', val: (crit.n - 1) + '/51 — one of them and one card overall are now gone' },
          { lab: 'Multiply', val: crit.n + '/52 × ' + (crit.n - 1) + '/51 = ' + num + '/' + R.num(den) },
          { lab: 'Answer', val: (num / g) + '/' + (den / g), final: true }
        ],
        why: 'Both numbers drop by one, not just the top one. Forgetting the 52 → 51 is the usual slip, ' +
             'and it is the entire difference between this and the with-replacement version.'
      };
    },

    /* The same deck, with the card put back. Deliberately the mirror image of
       the question above, because telling the two apart is the actual skill. */
    function () {
      var crit = R.pick([
        { text: 'both are hearts', n: 13, how: '13 hearts' },
        { text: 'both are aces', n: 4, how: '4 aces' },
        { text: 'both are black', n: 26, how: '26 black cards' },
        { text: 'both are face cards (jack, queen or king)', n: 12, how: '12 face cards' }
      ]);
      var num = crit.n * crit.n;
      var g = R.gcd(num, 2704);
      var dep = crit.n * (crit.n - 1);
      var dg = R.gcd(dep, 2652);
      return {
        type: 'mcq', marks: 3,
        shape: 'card-2-repl|' + crit.n,
        prompt: 'A card is drawn from a pack of 52, recorded, and <b>put back</b>. A second card is then drawn. ' +
                'What is the probability that ' + crit.text + '?',
        options: R.options(sfrac(num, 2704), [
          sfrac(dep, 2652),                  /* the without-replacement answer */
          sfrac(crit.n, 52),
          sfrac(2 * crit.n, 52)
        ]),
        answer: 0,
        solution: [
          { lab: 'Independent — the card went back', val: 'use P(A) × P(B)' },
          { lab: 'P(first)', val: crit.n + '/52 — ' + crit.how },
          { lab: 'P(second)', val: crit.n + '/52 — the deck is exactly as it was' },
          { lab: 'Multiply', val: crit.n + '/52 × ' + crit.n + '/52 = ' + num + '/' + R.num(2704) },
          { lab: 'Answer', val: (num / g) + '/' + (2704 / g), final: true }
        ],
        why: '"Put back" restores the deck, so nothing is conditional and both fractions stay identical. ' +
             'Without replacement the second one would have been ' + (crit.n - 1) + '/51 instead.'
      };
    },

    /* A bag, without replacement. The totals move every time, so the conditional
       step has to be worked out rather than remembered. */
    function () {
      var red = R.int(4, 10), blue = R.int(3, 9);
      var total = red + blue;
      var num = red * (red - 1);
      var den = total * (total - 1);
      var g = R.gcd(num, den);
      return {
        type: 'mcq', marks: 3,
        shape: 'bag-2-norepl|' + red + '/' + total,
        scenario: 'A box holds ' + red + ' red pens and ' + blue + ' blue pens. Two pens are taken out one after ' +
                  'the other, and the first is <b>not</b> put back.',
        prompt: 'What is the probability that <b>both pens are red</b>?',
        options: R.options(sfrac(num, den), [
          sfrac(red * red, total * total),   /* as though the pen went back */
          sfrac(num, total * total),         /* off the top but not the bottom */
          sfrac(red, total)
        ]),
        answer: 0,
        solution: [
          { lab: 'Total pens', val: red + ' + ' + blue + ' = ' + total },
          { lab: 'P(first red)', val: red + '/' + total },
          { lab: 'P(second red | first red)', val: (red - 1) + '/' + (total - 1) + ' — one red pen and one pen overall have gone' },
          { lab: 'Multiply', val: red + '/' + total + ' × ' + (red - 1) + '/' + (total - 1) + ' = ' + num + '/' + den },
          { lab: 'Answer', val: (num / g) + '/' + (den / g), final: true }
        ],
        why: 'After the first red pen there are ' + (red - 1) + ' red pens left in a box of ' + (total - 1) +
             '. Both parts of the fraction change, which is what "dependent" means.'
      };
    },

    /* Three independent events. Same rule, just applied one more time — the
       arithmetic is longer without any new idea being needed. */
    function () {
      var part = R.shuffle(['the motor', 'the battery', 'the controller', 'the display', 'the brake sensor']);
      var p1 = R.round(R.int(80, 99) / 100, 2);
      var p2 = R.round(R.int(80, 99) / 100, 2);
      var p3 = R.round(R.int(80, 99) / 100, 2);
      var ans = R.round(p1 * p2 * p3, 4);
      return {
        type: 'numeric', marks: 3,
        shape: 'indep-3|' + p1 + '|' + p2 + '|' + p3,
        scenario: 'An e-bike passes its final check only if three parts all work. The parts fail independently of ' +
                  'one another. P(' + part[0] + ' works) = ' + p1 + ', P(' + part[1] + ' works) = ' + p2 +
                  ', P(' + part[2] + ' works) = ' + p3 + '.',
        prompt: 'Calculate the probability that <b>all three</b> parts work.',
        answer: ans, tol: 0.00005,
        note: 'Give your answer as a decimal to four places.',
        solution: [
          { lab: 'Independent', val: 'one part failing tells you nothing about the others' },
          { lab: 'Apply P(A) × P(B) × P(C)', val: p1 + ' × ' + p2 + ' × ' + p3 },
          { lab: 'Answer', val: String(ans), final: true }
        ],
        why: 'The rule extends to as many independent events as you like — keep multiplying. Notice the answer ' +
             'is below every individual probability: asking for more things to go right can only make it less likely.'
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
        /* A short term compounded half-yearly made "years", "periods per year"
           and "years + periods" collide, leaving two options on the screen.
           Offering more wrong-but-tempting values keeps it at four. */
        options: R.options(years * f.m, [years, f.m, years + f.m, years * 12, years * f.m + 1, years * f.m - 1]),
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
        shape: 'pyr|' + f.m,
        prompt: 'Interest is compounded <b>' + f.word + '</b>. What value should be stored using the P/YR function?',
        options: R.options(f.m, [f.m === 1 ? 12 : 1, f.m === 4 ? 12 : 4, f.m * 5, f.m + 1]),
        answer: 0,
        solution: [
          { lab: 'P/YR', val: 'the number of interest periods per year' },
          { lab: f.word, val: f.m + ' per year' },
          { lab: 'Answer', val: String(f.m), final: true }
        ],
        why: 'P/YR is periods per *year*. The total number of periods over the whole term belongs in N, not P/YR.'
      };
    },

    /* The single most costly misconception on this calculator: dividing the rate
       by hand when P/YR has already told the machine to do exactly that. */
    function () {
      var f = R.pick(FREQ.slice(1));
      var rate = R.pick([6, 7.2, 8, 9, 10.5, 12, 15]);
      return {
        type: 'mcq', marks: 2,
        shape: 'iyr|' + rate + '|' + f.m,
        prompt: 'An investment earns <b>' + rate + '% per annum compounded ' + f.word + '</b>, and you have ' +
                'already stored ' + f.m + ' ▼ P/YR. What value should be entered for <span class="math">I/YR</span>?',
        options: R.options(rate, [
          R.round(rate / f.m, 4), R.round(rate / 100, 4), R.round(rate * f.m, 2), f.m
        ]),
        answer: 0,
        solution: [
          { lab: 'I/YR wants', val: 'the nominal annual rate, exactly as the question states it' },
          { lab: 'You already told it', val: f.m + ' periods per year, via P/YR' },
          { lab: 'So it works out', val: rate + '% ÷ ' + f.m + ' = ' + R.round(rate / f.m, 4) + '% per period, by itself' },
          { lab: 'Answer', val: rate, final: true }
        ],
        why: 'Dividing by ' + f.m + ' yourself and entering ' + R.round(rate / f.m, 4) +
             ' makes the calculator divide a second time. The whole point of setting P/YR is that you stop doing that step.'
      };
    },

    /* Sign convention, from both directions — investing and borrowing are
       mirror images and she has to be able to tell which she is looking at. */
    function () {
      var borrow = R.int(0, 1) === 0;
      var amount = R.step(5000, 90000, 500);
      var act = borrow
        ? { verb: 'You take out a loan of R' + R.num(amount) + ' from the bank.', pv: 'positive', fv: 'negative', why: 'the bank pays you now, and you pay it back later' }
        : { verb: 'You deposit R' + R.num(amount) + ' into a fixed savings account.', pv: 'negative', fv: 'positive', why: 'you pay the money out now, and receive it back later' };
      return {
        type: 'mcq', marks: 2,
        shape: 'signs|' + (borrow ? 'borrow' : 'invest'),
        scenario: act.verb,
        prompt: 'How should <span class="math">PV</span> and <span class="math">FV</span> be entered on the HP10bII+?',
        options: R.options(
          'PV ' + act.pv + ', FV ' + act.fv,
          ['PV ' + act.fv + ', FV ' + act.pv, 'both positive', 'both negative']
        ),
        answer: 0,
        solution: [
          { lab: 'Which way does the money move?', val: act.why },
          { lab: 'Cash out', val: 'entered as a negative' },
          { lab: 'Cash in', val: 'entered as a positive' },
          { lab: 'Answer', val: 'PV ' + act.pv + ', FV ' + act.fv, final: true }
        ],
        why: 'The calculator needs one inflow and one outflow. Entering both the same way returns an error — ' +
             'it is being asked about money that never actually moves.'
      };
    },

    /* What each register is for. Naming the wrong one is a silent error: the
       calculator answers happily, just not the question that was asked. */
    function () {
      var regs = [
        { key: 'N', holds: 'the total number of interest periods' },
        { key: 'I/YR', holds: 'the nominal annual interest rate' },
        { key: 'PV', holds: 'the amount at the start of the term' },
        { key: 'FV', holds: 'the amount at the end of the term' },
        { key: 'P/YR', holds: 'how many times a year interest is added' }
      ];
      var pickOne = R.pick(regs);
      var others = regs.filter(function (r) { return r.key !== pickOne.key; });
      return {
        type: 'mcq', marks: 1,
        shape: 'register|' + pickOne.key,
        prompt: 'On the HP10bII+, which register holds <b>' + pickOne.holds + '</b>?',
        options: R.options(pickOne.key, R.shuffle(others).map(function (r) { return r.key; })),
        answer: 0,
        solution: [
          { lab: pickOne.key, val: pickOne.holds },
          { lab: 'Answer', val: pickOne.key, final: true }
        ],
        why: 'Storing a value in the wrong register does not produce an error — it produces a confident, wrong answer.'
      };
    },

    /* N via the xP/YR shortcut. Same idea as w4-terms but reached through the
       keystroke the notes actually teach. */
    function () {
      var f = R.pick(FREQ.slice(1)), years = R.int(2, 9);
      return {
        type: 'mcq', marks: 2,
        shape: 'xpyr|' + years + '|' + f.m,
        prompt: 'A term of <b>' + years + ' years</b> is compounded ' + f.word + ', with ' + f.m +
                ' ▼ P/YR already stored. You press ' + years + ' ▼ xP/YR. What does the calculator display ' +
                'for <span class="math">N</span>?',
        options: R.options(years * f.m, [years, f.m, years + f.m, years * 12, years * f.m - f.m]),
        answer: 0,
        solution: [
          { lab: 'xP/YR converts', val: 'a term in years into interest periods' },
          { lab: 'Calculate', val: years + ' years × ' + f.m + ' periods per year' },
          { lab: 'Answer', val: 'N = ' + (years * f.m), final: true }
        ],
        why: 'xP/YR exists so you never enter N in years by mistake. It multiplies by whatever P/YR is holding, ' +
             'which is why P/YR has to be set first.'
      };
    },

    /* An actual run through the keystrokes. Longer, but no new concept —
       just the sequence the notes give, carried out. */
    function () {
      var f = R.pick(FREQ);
      var pv = R.step(2000, 50000, 500);
      var rate = R.pick([6, 8, 9, 10, 12]);
      var years = R.int(2, 8);
      var fv = R.round(pv * Math.pow(1 + rate / 100 / f.m, years * f.m), 2);
      return {
        type: 'numeric', marks: 4,
        shape: 'fv|' + pv + '|' + rate + '|' + years + '|' + f.m,
        scenario: 'R' + R.num(pv) + ' is invested for ' + years + ' years at ' + rate +
                  '% per annum compounded ' + f.word + '.',
        prompt: 'Using the HP10bII+, calculate the <b>future value</b>.',
        pre: 'R', answer: fv, tol: 1,
        note: 'Remember the sign convention — the deposit is money going out.',
        solution: [
          { lab: '▼ C ALL', val: 'clear every register first' },
          { lab: f.m + ' ▼ P/YR', val: f.word + ', so ' + f.m + ' period' + (f.m === 1 ? '' : 's') + ' per year' },
          { lab: R.num(pv) + ' +/− PV', val: 'the deposit is an outflow, so it goes in negative' },
          { lab: years + ' ▼ xP/YR', val: 'N = ' + (years * f.m) + ' interest periods' },
          { lab: rate + ' I/YR', val: 'the nominal annual rate — the calculator handles the rest' },
          { lab: 'FV', val: 'R' + R.money(fv), final: true }
        ],
        why: 'The formula check is FV = ' + R.num(pv) + '(1 + ' + rate + '%/' + f.m + ')^' + (years * f.m) +
             '. Worth doing once: a calculator answer is only right if every key was right.'
      };
    },

    /* Diagnosing the error message, rather than only avoiding it. */
    function () {
      return {
        type: 'mcq', marks: 2,
        shape: 'noflow',
        prompt: 'Someone enters PV as a positive number and FV as a positive number, then presses N. ' +
                'The calculator returns an error. Why?',
        options: R.options('It needs at least one cash inflow and one cash outflow', [
          'The interest rate has not been entered yet',
          'PV must always be negative on this calculator',
          'N must be entered before PV and FV'
        ]),
        answer: 0,
        solution: [
          { lab: 'What the machine assumes', val: 'money moves in one direction, then back the other' },
          { lab: 'Both positive means', val: 'money arriving twice and never leaving' },
          { lab: 'Answer', val: 'One value must be negative — it needs an inflow and an outflow', final: true }
        ],
        why: 'PV is not always negative: borrowing makes PV positive and FV negative. What matters is that the ' +
             'two disagree, not which one carries the sign.'
      };
    },

    /* The periodic rate the calculator derives internally. Knowing what it is
       doing is what makes the "do not divide it yourself" rule stick. */
    function () {
      var f = R.pick(FREQ.slice(1));
      var rate = R.pick([6, 7.2, 8, 9, 10.5, 12, 15]);
      var per = R.round(rate / f.m, 4);
      return {
        type: 'numeric', marks: 2,
        shape: 'effper|' + rate + '|' + f.m,
        prompt: 'Interest is quoted at <b>' + rate + '% per annum compounded ' + f.word + '</b>. What is the ' +
                'interest rate <b>per period</b> that the calculator works with internally?',
        suf: '%', answer: per, tol: 0.0005,
        note: 'Give your answer as a percentage.',
        solution: [
          { lab: 'Periods per year', val: String(f.m) + ' (' + f.word + ')' },
          { lab: 'Divide the annual rate', val: rate + '% ÷ ' + f.m },
          { lab: 'Answer', val: per + '%', final: true }
        ],
        why: 'This is the number you would use by hand in the compound interest formula. On the calculator you ' +
             'enter ' + rate + ' and let P/YR produce this — entering ' + per + ' yourself would apply the division twice.'
      };
    }
  ]);

  return { add: add, make: make, has: has, registered: function () { return reg; } };
})();
