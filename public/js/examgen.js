/* Abi's Study Buddy — Exam Questions generators, Week 1.

   Modelled on the Milpark "Additional exercises: Week 1" paper. Two rules drive the
   shape of everything here:

   1. ONE question, ONE answer. The paper does not walk you through it — it states the
      problem and expects the finished result. So these are single-answer questions, not
      guided steps. The full worked solution appears only after she answers, which is
      where the memo's method gets shown.
   2. Same length and weight as the real thing: a scenario to read, several operations to
      carry out, and a final value.                                                        */

(function () {
  var R = Rand;

  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a || 1; }
  function lcm(a, b) { return a * b / gcd(a, b); }
  function mixed(w, n, d) { return w + R.frac(n, d); }
  function mixedText(w, n, d) { return w + ' ' + n + '/' + d; }

  /* Formats a small decimal without exponent notation, trimming the trailing zeros the
     paper's method leaves behind (0.000050 -> 0.00005). */
  function dec(x, places) {
    var s = x.toFixed(places);
    if (s.indexOf('.') > -1) s = s.replace(/0+$/, '').replace(/\.$/, '');
    return s;
  }

  /* ═══════════════ Q1–Q3 : adding mixed numbers ═══════════════ */

  var ADD_SCENES = [
    { unit: 'litres', what: 'diesel',
      lead: 'Due to increased power outages, you had to run your diesel generator frequently.',
      ask: 'Calculate how much diesel was used in total.',
      periods: ['the first week', 'the second week', 'the third week'] },
    { unit: 'litres', what: 'paint',
      lead: 'A part-time painter was contracted to repaint the storeroom.',
      ask: 'Calculate how much paint was used to repaint the storeroom.',
      periods: ['the first day', 'the second day', 'the final day'] },
    { unit: 'bottles', what: 'dishwashing soap',
      lead: 'You decided to keep track of how much dishwashing soap the shop uses.',
      ask: 'Calculate how much dishwashing soap was used over the period.',
      periods: ['the first week', 'the second week', 'the third week'] },
    { unit: 'litres', what: 'coolant',
      lead: 'The delivery van needed topping up with coolant more often than usual.',
      ask: 'Calculate how much coolant was used in total.',
      periods: ['the first month', 'the second month', 'the third month'] },
    { unit: 'kilograms', what: 'degreaser',
      lead: 'The workshop got through more degreaser than expected this quarter.',
      ask: 'Calculate how much degreaser was used in total.',
      periods: ['the first week', 'the second week', 'the third week'] }
  ];

  GEN.add('ex1-mixedadd', [
    function () {
      var scene = R.pick(ADD_SCENES);
      var terms = R.int(2, 3);
      var dens = [], nums = [], wholes = [];
      for (var i = 0; i < terms; i++) {
        var den = R.pick([2, 3, 4, 5, 6, 8]);
        dens.push(den);
        nums.push(R.int(1, den - 1));
        wholes.push(R.int(2, 14));
      }
      var L = dens[0];
      for (var j = 1; j < terms; j++) L = lcm(L, dens[j]);
      if (L > 60) return null;

      var wholeSum = 0, fracNum = 0, parts = [], scaled = [];
      for (var k = 0; k < terms; k++) {
        wholeSum += wholes[k];
        var sc = nums[k] * (L / dens[k]);
        scaled.push(sc);
        fracNum += sc;
        parts.push(mixed(wholes[k], nums[k], dens[k]));
      }
      var improperTotal = wholeSum * L + fracNum;
      var wholeAns = Math.floor(improperTotal / L);
      var rem = improperTotal - wholeAns * L;
      if (rem === 0) return null;                    // a whole answer defeats the exercise
      var g = gcd(rem, L);
      var remN = rem / g, remD = L / g;

      // Distractors encode the mistakes the memo warns about
      var naiveNum = 0, naiveDen = 0;
      for (var m = 0; m < terms; m++) { naiveNum += nums[m]; naiveDen += dens[m]; }
      var wrongCarry = wholeSum + '&nbsp;' + R.frac(fracNum, L);          // forgot to carry the whole
      var wrongNaive = wholeSum + '&nbsp;' + R.frac(naiveNum, naiveDen);  // added tops and bottoms
      var wrongOff   = (wholeAns + 1) + '&nbsp;' + R.frac(remN, remD);    // carried one too many

      var lines = [];
      for (var p = 0; p < terms; p++) lines.push('in ' + scene.periods[p] + ' ' + parts[p] + ' ' + scene.unit);

      return {
        type: 'mcq', marks: 5,
        scenario: scene.lead + ' The shop recorded that ' + lines.join(', ') + ' of ' + scene.what + ' was used.',
        prompt: scene.ask,
        options: R.options(wholeAns + '&nbsp;' + R.frac(remN, remD) + ' ' + scene.unit,
                           [wrongCarry + ' ' + scene.unit,
                            wrongNaive + ' ' + scene.unit,
                            wrongOff + ' ' + scene.unit]),
        answer: 0,
        solution: [
          { lab: 'The sum', val: parts.join(' + ') },
          { lab: 'Add the whole numbers', val: wholes.join(' + ') + ' = ' + wholeSum },
          { lab: 'Common denominator', val: 'the denominators are ' + dens.join(', ') + ', so use ' + L },
          { lab: 'Add the fractions', val: scaled.join('/' + L + ' + ') + '/' + L + ' = ' + fracNum + '/' + L },
          { lab: 'Combine', val: wholeSum + ' + ' + fracNum + '/' + L +
                 (fracNum >= L ? ', and ' + fracNum + '/' + L + ' is more than one whole' : '') },
          { lab: 'Answer', val: mixedText(wholeAns, remN, remD) + ' ' + scene.unit, final: true }
        ],
        why: 'Either method in the memo works — convert everything to improper fractions, or add the whole ' +
             'numbers and the fractions separately. The second is quicker here.' +
             (fracNum >= L ? ' Watch the carry: ' + fracNum + '/' + L + ' is more than a whole, so it adds to the whole-number part.' : '')
      };
    }
  ]);

  /* ═══════════════ Q4–Q6 : dividing with mixed numbers ═══════════════ */

  GEN.add('ex1-mixeddiv', [
    // Q4 style: a full container divided by a mixed-number capacity
    function () {
      var den = R.pick([2, 3, 4, 5, 8]);
      var w = R.int(2, 9), n = R.int(1, den - 1);
      var improper = w * den + n;
      var container = R.pick([20, 25, 30, 40, 50]);
      var prodN = container * den;
      var whole = Math.floor(prodN / improper);
      var rem = prodN - whole * improper;
      if (rem === 0 || whole < 2) return null;
      var g = gcd(rem, improper);
      var vessel = R.pick([
        { thing: 'water cooler', liquid: 'water' },
        { thing: 'coolant tank', liquid: 'coolant' },
        { thing: 'washer bottle', liquid: 'screen wash' }
      ]);
      return {
        type: 'mcq', marks: 5,
        scenario: 'A ' + vessel.thing + ' can take ' + mixed(w, n, den) + ' litres of ' + vessel.liquid +
                  ', and ' + vessel.liquid + ' is delivered in containers of ' + container + ' litres each.',
        prompt: 'Calculate how many times the ' + vessel.thing + ' can be filled from a full container.',
        options: R.options(whole + '&nbsp;' + R.frac(rem / g, improper / g) + ' times',
                           [(whole + 1) + '&nbsp;' + R.frac(rem / g, improper / g) + ' times',
                            R.frac(prodN, improper) + ' times',
                            Math.floor(container / (w + 1)) + ' times']),
        answer: 0,
        solution: [
          { lab: 'Times filled', val: container + '/1 ÷ ' + mixedText(w, n, den) },
          { lab: 'Convert the mixed number', val: '(' + w + ' × ' + den + ') + ' + n + ' = ' + improper +
                 ', so ' + container + '/1 ÷ ' + improper + '/' + den },
          { lab: 'Multiply by the reciprocal', val: container + '/1 × ' + den + '/' + improper + ' = ' + prodN + '/' + improper },
          { lab: 'As a mixed number', val: improper + ' goes into ' + prodN + ' ' + whole + ' times, remainder ' + rem },
          { lab: 'Answer', val: mixedText(whole, rem / g, improper / g) + ' times', final: true }
        ],
        why: 'Turn the mixed number into an improper fraction first, then flip and multiply — exactly the route the memo takes in Question 4.'
      };
    },

    // Q5 style: answer must be rounded DOWN to something you can actually do
    function () {
      var perUse = R.pick([3, 4, 5, 8]);
      var w = R.int(2, 6), n = R.int(1, perUse - 1);
      var improper = w * perUse + n;
      var task = R.pick([
        { verb: 'clean the coffee machine', stuff: 'cleaning solution' },
        { verb: 'service a bike', stuff: 'chain degreaser' },
        { verb: 'valet the delivery van', stuff: 'interior cleaner' }
      ]);
      return {
        type: 'numeric', marks: 5,
        scenario: 'You require ' + R.frac(1, perUse) + ' of a bottle of ' + task.stuff + ' each time you ' +
                  task.verb + ', and you have ' + mixed(w, n, perUse) + ' bottles of ' + task.stuff + ' left.',
        prompt: 'How many complete times can you ' + task.verb + '?',
        suf: 'times', answer: improper, tol: 0.01,
        note: 'Give a whole number — you cannot do the job a fraction of a time.',
        solution: [
          { lab: 'Times possible', val: mixedText(w, n, perUse) + ' ÷ 1/' + perUse },
          { lab: 'Convert the mixed number', val: '(' + w + ' × ' + perUse + ') + ' + n + ' = ' + improper +
                 ', so ' + improper + '/' + perUse },
          { lab: 'Multiply by the reciprocal', val: improper + '/' + perUse + ' × ' + perUse + '/1 = ' + improper },
          { lab: 'Answer', val: improper + ' complete times', final: true }
        ],
        why: 'Where the division does not come out whole, the memo rounds DOWN — you cannot half-clean a machine, ' +
             'so you keep whatever is left over.'
      };
    },

    // Q6 style: mixed divided by mixed, cancelling to a simple fraction
    function () {
      var k = R.pick([2, 3, 4, 5]);
      var den = R.pick([4, 8, 16]);
      if (den % k !== 0) return null;
      var bigDen = den / k;
      var smallW = R.int(2, 6), smallN = R.int(1, den - 1);
      var improper = smallW * den + smallN;
      var bigW = Math.floor(improper / bigDen), bigN = improper - bigW * bigDen;
      if (bigN === 0) return null;
      return {
        type: 'mcq', marks: 5,
        scenario: 'You buy special oil for e-bikes in large containers and pour it into smaller bottles to sell in the shop. ' +
                  'You were able to fill ' + mixed(bigW, bigN, bigDen) + ' bottles from a container that had ' +
                  mixed(smallW, smallN, den) + ' litres of oil left.',
        prompt: 'How much oil does each full bottle contain?',
        options: R.options(R.frac(1, k) + ' litres',
                           [R.frac(1, k + 1) + ' litres', R.frac(2, k) + ' litres', R.frac(k, 1) + ' litres']),
        answer: 0,
        solution: [
          { lab: 'Oil per bottle', val: mixedText(smallW, smallN, den) + ' ÷ ' + mixedText(bigW, bigN, bigDen) },
          { lab: 'Convert both', val: improper + '/' + den + ' ÷ ' + improper + '/' + bigDen },
          { lab: 'Multiply by the reciprocal', val: improper + '/' + den + ' × ' + bigDen + '/' + improper },
          { lab: 'Cancel', val: improper + ' appears top and bottom, leaving ' + bigDen + '/' + den },
          { lab: 'Answer', val: '1/' + k + ' litres', final: true }
        ],
        why: 'Spotting that ' + improper + ' cancels top and bottom saves all the arithmetic — the shortcut the memo points out in Question 6.'
      };
    }
  ]);

  /* ═══════════════ Q7–Q9 : approximating decimal products ═══════════════ */

  GEN.add('ex1-approxmul', [
    function () {
      var dA = R.int(11, 99), zerosA = R.int(0, 2);
      var oneDigitB = R.int(0, 1) === 0;
      var dB = oneDigitB ? R.int(2, 9) : R.int(11, 49);
      var zerosB = oneDigitB ? R.int(1, 2) : R.int(0, 1);

      var placesA = zerosA + String(dA).length;
      var placesB = zerosB + String(dB).length;
      var total = placesA + placesB;
      if (total > 7) return null;

      var product = dA * dB;
      if (product < 15) return null;
      var rounded = Math.round(product / 10) * 10;
      if (rounded === 0) return null;

      var strA = '0.' + new Array(zerosA + 1).join('0') + dA;
      var strB = '0.' + new Array(zerosB + 1).join('0') + dB;
      if (strA === strB) return null;                     // never ask for X x X
      var padded = String(rounded);
      while (padded.length < total) padded = '0' + padded;
      var ans = rounded / Math.pow(10, total);

      return {
        type: 'numeric', marks: 5,
        prompt: 'Calculate the closest approximation of ' + strA + ' × ' + strB + '.',
        answer: ans, tol: Math.pow(10, -(total + 1)),
        note: 'Use the approximation method — you are not being asked for the exact product.',
        solution: [
          { lab: 'Step 1', val: 'Number of digits after the decimal point = ' + placesA + ' + ' + placesB + ' = ' + total },
          { lab: 'Step 2', val: 'Ignore the decimal points and multiply: ' + dA + ' × ' + dB + ' = ' + product },
          { lab: 'Step 3', val: 'Round to the closest 10: ' + product + ' ≈ ' + rounded },
          { lab: 'Step 4', val: 'Add the decimal point back with ' + total + ' decimal digits: 0.' + padded },
          { lab: 'Answer', val: dec(ans, total), final: true }
        ],
        why: 'This is the five-step method from the memo. It is meant to be a fast sanity figure you can reach without a calculator, not an exact product.'
      };
    }
  ]);

  /* ═══════════════ Q10–Q12 : approximating decimal quotients ═══════════════ */

  GEN.add('ex1-approxdiv', [
    function () {
      var bWhole = R.int(2, 12);

      // Shapes that give a tidy approximation. A ratio of 1 is excluded: "X ÷ X" is
      // degenerate and tells her nothing.
      var shapes = [];
      for (var k = 2; k <= 5; k++) if (bWhole * k <= 40) shapes.push(bWhole * k);
      if (bWhole % 2 === 0) shapes.push(bWhole / 2);
      if (bWhole % 2 === 0) shapes.push(bWhole * 3 / 2);
      if (bWhole % 4 === 0) shapes.push(bWhole / 4);
      var aWhole = R.pick(shapes);
      if (!aWhole || aWhole < 1 || aWhole === bWhole) return null;

      // Nudge each value so it still rounds back to the whole number we chose
      function jitter(whole) {
        var off = R.int(-45, 45) / 100;
        var v = Math.round((whole + off) * 100) / 100;
        if (Math.round(v) !== whole || v <= 0) return null;
        return v;
      }
      var a = jitter(aWhole), b = jitter(bWhole);
      if (a === null || b === null || a === b) return null;

      var approx = Math.round((aWhole / bWhole) * 1000) / 1000;
      var exact = Math.round((a / b) * 100) / 100;

      return {
        type: 'numeric', marks: 4,
        prompt: 'Calculate the closest approximation of ' + a + ' ÷ ' + b + '.',
        answer: approx, tol: 0.005,
        note: 'Round each number first — you are not being asked for the exact answer.',
        solution: [
          { lab: 'Step 1', val: 'Round both to the closest whole numbers: ' + a + ' ≈ ' + aWhole + ' and ' + b + ' ≈ ' + bWhole },
          { lab: 'Step 2', val: 'Calculate: ' + aWhole + ' ÷ ' + bWhole + ' = ' + approx },
          { lab: 'Answer', val: a + ' ÷ ' + b + ' ≈ ' + approx, final: true },
          { lab: 'Compare', val: 'the exact answer is ' + exact }
        ],
        why: 'The approximation (' + approx + ') sits close to the exact value (' + exact +
             '), which is all it needs to do — it is there to tell you instantly whether a calculator answer looks wrong.'
      };
    }
  ]);

  /* ═══════════════ Q13–Q15 : growth and decline over n years ═══════════════ */

  var GROWTH_SCENES = [
    { up: true,  thing: 'the cost of electricity', ask: 'Calculate the estimated cost of electricity' },
    { up: true,  thing: 'the cost of imported parts', ask: 'Calculate the estimated cost of imported parts' },
    { up: true,  thing: 'the shop rental', ask: 'Calculate the estimated rental' },
    { up: true,  thing: 'the insurance premium on the delivery van', ask: 'Calculate the estimated premium' },
    { up: false, thing: 'the usable capacity of an e-bike battery', ask: 'Calculate the estimated usable capacity' },
    { up: false, thing: 'the resale value of the delivery van', ask: 'Calculate the estimated resale value' },
    { up: false, thing: 'the remaining tread on a set of tyres', ask: 'Calculate the estimated remaining tread' }
  ];

  GEN.add('ex1-growth', [
    function () {
      var scene = R.pick(GROWTH_SCENES);
      var rising = scene.up;
      var rate = R.pick([3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 18, 20]);
      var years = R.int(3, 8);
      var factor = rising ? (1 + rate / 100) : (1 - rate / 100);
      var pct = Math.round(Math.pow(factor, years) * 10000) / 100;
      var verb = rising ? 'increase' : 'decline';
      var sign = rising ? '+' : '−';

      return {
        type: 'numeric', marks: 4,
        prompt: 'It is expected that ' + scene.thing + ' will ' + verb + ' by ' + rate +
                '% per year over the next ' + years + ' years. ' + scene.ask + ' in ' + years +
                ' years’ time, relative to today.',
        suf: '%', answer: pct, tol: 0.02,
        note: 'Give your answer as a percentage of today’s value, to two decimal places.',
        solution: [
          { lab: 'Today', val: 'can be defined as 100%' },
          { lab: 'After one year', val: '(100% ' + sign + ' ' + rate + '%)¹' },
          { lab: 'After two years', val: '(100% ' + sign + ' ' + rate + '%)²' },
          { lab: 'So after ' + years + ' years', val: '(100% ' + sign + ' ' + rate + '%)^' + years },
          { lab: 'Answer', val: pct + '%', final: true }
        ],
        why: 'Each year applies the percentage to the previous year’s figure, not to today’s — which is why it is a power and not simply ' +
             rate + ' × ' + years + ' = ' + (rate * years) + '%.'
      };
    }
  ]);

  /* ═══════════════ Q16–Q18 : business equations ═══════════════ */

  GEN.add('ex1-equations', [
    // Q16 style: find the profit
    function () {
      var n = R.int(4, 12);
      var cost = R.step(15000, 30000, 1000);
      var delivery = R.step(1000, 6000, 500);
      var acc = R.step(500, 3000, 250);
      var profit = R.step(15000, 60000, 1000);
      var revenue = n * cost + delivery + n * acc + profit;
      var outlay = n * cost + delivery + n * acc;
      return {
        type: 'numeric', marks: 6,
        scenario: 'You purchased ' + n + ' e-bikes for R' + R.num(cost) + ' each and paid R' + R.num(delivery) +
                  ' to have them delivered to your store. Furthermore, you installed accessories to the value of R' +
                  R.num(acc) + ' on each of the e-bikes. You sold all ' + n + ' e-bikes for a total of R' +
                  R.num(revenue) + '.',
        prompt: 'Calculate the profit that you have made.',
        pre: 'R', answer: profit, tol: 1,
        solution: [
          { lab: 'Define the variables', val: 'Cost, Delivery, Accessories, Revenue and Profit' },
          { lab: 'Set up the equation', val: '(' + n + ' × Cost) + Delivery + (' + n + ' × Accessories) + Profit = Revenue' },
          { lab: 'Substitute', val: '(' + n + ' × ' + R.num(cost) + ') + ' + R.num(delivery) + ' + (' + n + ' × ' +
                 R.num(acc) + ') + Profit = ' + R.num(revenue) },
          { lab: 'Simplify', val: R.num(n * cost) + ' + ' + R.num(delivery) + ' + ' + R.num(n * acc) +
                 ' + Profit = ' + R.num(revenue) },
          { lab: 'Collect', val: R.num(outlay) + ' + Profit = ' + R.num(revenue) },
          { lab: 'Answer', val: 'Profit = R' + R.num(profit), final: true }
        ],
        why: 'Define the variables, write the equation, then substitute. The accessories are per bike, so they are ' +
             'multiplied by ' + n + ' — the delivery fee is a single charge and is not.'
      };
    },

    // Q17 style: break-even quantity, rounded UP
    function () {
      var containerL = R.pick([5, 10, 20]);
      var bottleMl = R.pick([200, 250, 500]);
      var count = containerL * 1000 / bottleMl;
      if (count !== Math.round(count)) return null;
      var containerCost = R.step(600, 2400, 100);
      var bottleCost = R.pick([4, 5, 6, 8, 10]);
      var sell = R.pick([50, 60, 75, 80, 90, 100]);
      var totalCost = containerCost + count * bottleCost;
      var exact = totalCost / sell;
      var needed = Math.ceil(exact);
      if (exact === needed) return null;              // the interesting case does not divide evenly
      return {
        type: 'numeric', marks: 6,
        scenario: 'A ' + containerL + 'ℓ container of chain oil costs R' + R.num(containerCost) +
                  '. A ' + bottleMl + 'mℓ bottle, which you fill with chain oil, costs R' + bottleCost +
                  ' each, and you sell each filled bottle for R' + sell +
                  '. Assume that you fill all the bottles when you purchase a new container of chain oil.',
        prompt: 'Calculate the number of bottles that you have to sell in order to break even.',
        suf: 'bottles', answer: needed, tol: 0.01,
        note: 'Give a whole number of bottles.',
        solution: [
          { lab: 'Define the variables', val: 'Container, Bottle, Sell and Quantity' },
          { lab: 'Bottles per container', val: (containerL * 1000) + 'mℓ ÷ ' + bottleMl + 'mℓ = ' + count },
          { lab: 'Set up the equation', val: 'Container + (' + count + ' × Bottle) − (Quantity × Sell) = 0' },
          { lab: 'Substitute', val: R.num(containerCost) + ' + (' + count + ' × ' + bottleCost + ') − (Quantity × ' + sell + ') = 0' },
          { lab: 'Simplify', val: R.num(totalCost) + ' = Quantity × ' + sell },
          { lab: 'Solve', val: 'Quantity = ' + R.num(totalCost) + ' ÷ ' + sell + ' = ' + (Math.round(exact * 100) / 100) },
          { lab: 'Answer', val: needed + ' bottles', final: true }
        ],
        why: 'Break-even is where costs and income cancel, so the equation is set equal to zero. The answer must be rounded UP — at ' +
             Math.floor(exact) + ' bottles you are still short.'
      };
    },

    // Q18 style: selling price needed for a target profit across two batches
    function () {
      var n1 = R.int(4, 10), n2 = R.int(4, 12);
      var c1 = R.step(18000, 26000, 1000), c2 = R.step(20000, 30000, 1000);
      if (c1 === c2) return null;
      var delivery = R.step(2000, 8000, 500);
      var total = n1 + n2;
      var sp = R.step(28000, 42000, 1000);
      var outlay = n1 * c1 + n2 * c2 + delivery;
      var profit = total * sp - outlay;
      if (profit <= 0) return null;
      return {
        type: 'numeric', marks: 6,
        scenario: 'You purchased ' + n1 + ' e-bikes for R' + R.num(c1) + ' each and, on a second occasion, purchased ' +
                  n2 + ' more e-bikes for R' + R.num(c2) + ' each. Delivery charges amounted to R' + R.num(delivery) + '.',
        prompt: 'Calculate the price at which each of the e-bikes should be sold to earn a profit of R' + R.num(profit) + '.',
        pre: 'R', answer: sp, tol: 1,
        solution: [
          { lab: 'Define the variables', val: 'Selling Price, e-Bike1, e-Bike2, Delivery and Profit' },
          { lab: 'Set up the equation', val: 'Profit = (' + total + ' × Selling Price) − (' + n1 + ' × e-Bike1) − (' +
                 n2 + ' × e-Bike2) − Delivery' },
          { lab: 'Substitute', val: R.num(profit) + ' = (' + total + ' × SP) − ' + R.num(n1 * c1) + ' − ' +
                 R.num(n2 * c2) + ' − ' + R.num(delivery) },
          { lab: 'Collect', val: R.num(profit) + ' = (' + total + ' × SP) − ' + R.num(outlay) },
          { lab: 'Rearrange', val: total + ' × SP = ' + R.num(profit) + ' + ' + R.num(outlay) + ' = ' + R.num(outlay + profit) },
          { lab: 'Answer', val: 'Selling Price = R' + R.num(sp), final: true }
        ],
        why: 'The two batches cost different amounts, but every bike sells for the same price — so all ' + total +
             ' multiply the selling price while the two costs stay separate.'
      };
    }
  ]);
})();
