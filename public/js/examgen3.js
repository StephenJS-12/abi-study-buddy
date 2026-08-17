/* Abi's Study Buddy — Exam Questions generators, Week 3.
   Single-answer, matching the paper's length. Quartile and percentile positions follow the
   module's own convention: k(n+1)/4, averaging the neighbours when the position is not whole. */

(function () {
  var R = Rand;

  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a || 1; }
  function round2(x) { return Math.round(x * 100) / 100; }
  function sortNum(a) { var b = a.slice(); b.sort(function (x, y) { return x - y; }); return b; }
  function sum(a) { var s = 0; for (var i = 0; i < a.length; i++) s += a[i]; return s; }
  function mean(a) { return sum(a) / a.length; }
  function posValue(s, pos) {
    if (pos === Math.floor(pos)) return s[pos - 1];
    var lo = Math.floor(pos);
    return (s[lo - 1] + s[lo]) / 2;
  }
  function variance(a) {
    var m = mean(a), acc = 0;
    for (var i = 0; i < a.length; i++) acc += (a[i] - m) * (a[i] - m);
    return acc / (a.length - 1);
  }
  function fracStr(n, d) { var g = gcd(n, d); return (n / g) + '/' + (d / g); }
  function fracHtml(n, d) { var g = gcd(n, d); return R.frac(n / g, d / g); }

  function table(headers, rows) {
    var h = '<tr>';
    for (var i = 0; i < headers.length; i++) h += '<th>' + headers[i] + '</th>';
    h += '</tr>';
    var b = '';
    for (var r = 0; r < rows.length; r++) {
      b += '<tr>';
      for (var c = 0; c < rows[r].length; c++) b += '<td>' + rows[r][c] + '</td>';
      b += '</tr>';
    }
    return '<div class="tablewrap"><table class="dtable">' + h + b + '</table></div>';
  }

  /* ═══════════════ Q1 : grouped frequency estimates ═══════════════ */

  function buildGrouped() {
    var width = R.pick([10, 20, 25, 50]);
    var start = R.pick([0, 10, 20, 100]);
    var classes = R.int(5, 6);
    var freqs = [];
    for (var i = 0; i < classes; i++) freqs.push(R.int(2, 9));

    // one clear modal class, with neighbours strictly smaller
    var mi = R.int(1, classes - 2);
    freqs[mi] = Math.max(freqs[mi], Math.max(freqs[mi - 1], freqs[mi + 1]) + R.int(2, 4));
    for (var j = 0; j < classes; j++) {
      if (j !== mi && freqs[j] === freqs[mi]) return null;
    }

    var mids = [], cum = [], running = 0;
    for (var k = 0; k < classes; k++) {
      mids.push(start + width * k + width / 2);
      running += freqs[k];
      cum.push(running);
    }
    return { width: width, start: start, classes: classes, freqs: freqs, mids: mids,
             cum: cum, n: running, modalIdx: mi };
  }

  function groupedRows(g) {
    var rows = [];
    for (var i = 0; i < g.classes; i++) {
      rows.push([(g.start + g.width * i) + ' – &lt; ' + (g.start + g.width * (i + 1)), String(g.freqs[i])]);
    }
    rows.push(['<b>Total</b>', '<b>' + g.n + '</b>']);
    return rows;
  }

  GEN.add('ex3-grouped', [
    // 1.1 arithmetic mean
    function () {
      var g = buildGrouped();
      if (!g) return null;
      var fx = 0, terms = [];
      for (var i = 0; i < g.classes; i++) {
        fx += g.mids[i] * g.freqs[i];
        terms.push('(' + g.mids[i] + ' × ' + g.freqs[i] + ')');
      }
      var ans = round2(fx / g.n);
      return {
        type: 'numeric', marks: 5,
        scenario: table(['Class interval', 'Frequency'], groupedRows(g)),
        prompt: 'Estimate the <b>arithmetic mean</b> of this grouped data.',
        answer: ans, tol: 0.02,
        note: 'Give your answer to two decimal places.',
        solution: [
          { lab: 'Midpoints', val: g.mids.join(', ') },
          { lab: 'Σ(f × x)', val: terms.join(' + ') },
          { lab: 'Which totals', val: String(fx) },
          { lab: 'Divide by Σf', val: fx + ' ÷ ' + g.n },
          { lab: 'Answer', val: String(ans), final: true }
        ],
        why: 'With grouped data you never see the individual values, so each class midpoint stands in for ' +
             'everything in that class. The midpoint is the average of the two class limits.'
      };
    },

    // 1.2 modal value, histogram / formula method
    function () {
      var g = buildGrouped();
      if (!g) return null;
      var i = g.modalIdx;
      var L = g.start + g.width * i, f1 = g.freqs[i], f0 = g.freqs[i - 1], f2 = g.freqs[i + 1];
      var denom = 2 * f1 - f0 - f2;
      if (denom <= 0) return null;
      var ans = round2(L + ((f1 - f0) / denom) * g.width);
      return {
        type: 'numeric', marks: 5,
        scenario: table(['Class interval', 'Frequency'], groupedRows(g)),
        prompt: 'Estimate the <b>modal value</b> of this grouped data.',
        answer: ans, tol: 0.05,
        note: 'Give your answer to two decimal places.',
        solution: [
          { lab: 'Modal class', val: L + ' – &lt; ' + (L + g.width) + ', the tallest bar with ' + f1 },
          { lab: 'Formula', val: 'Mode = L + [(f₁ − f₀) ÷ (2f₁ − f₀ − f₂)] × h' },
          { lab: 'Values', val: 'L = ' + L + ', f₁ = ' + f1 + ', f₀ = ' + f0 + ', f₂ = ' + f2 + ', h = ' + g.width },
          { lab: 'Substitute', val: L + ' + [(' + f1 + ' − ' + f0 + ') ÷ ' + denom + '] × ' + g.width },
          { lab: 'Answer', val: String(ans), final: true }
        ],
        why: 'On a histogram you would draw the cross inside the tallest bar and read down. The formula does ' +
             'the same thing arithmetically, leaning toward whichever neighbouring class is busier.'
      };
    },

    // 1.3 median by interpolation
    function () {
      var g = buildGrouped();
      if (!g) return null;
      var half = g.n / 2;
      var idx = -1;
      for (var i = 0; i < g.classes; i++) { if (g.cum[i] >= half) { idx = i; break; } }
      if (idx <= 0 || g.freqs[idx] === 0) return null;
      var L = g.start + g.width * idx;
      var before = g.cum[idx - 1];
      var ans = round2(L + ((half - before) / g.freqs[idx]) * g.width);
      var cumRows = [];
      for (var c = 0; c < g.classes; c++) {
        cumRows.push([(g.start + g.width * c) + ' – &lt; ' + (g.start + g.width * (c + 1)),
                      String(g.freqs[c]), String(g.cum[c])]);
      }
      return {
        type: 'numeric', marks: 5,
        scenario: table(['Class interval', 'Frequency', 'Cumulative'], cumRows),
        prompt: 'Estimate the <b>median</b> of this grouped data.',
        answer: ans, tol: 0.05,
        note: 'Give your answer to two decimal places.',
        solution: [
          { lab: 'Half the total', val: 'n ÷ 2 = ' + g.n + ' ÷ 2 = ' + half },
          { lab: 'Median class', val: L + ' – &lt; ' + (L + g.width) + ', where the cumulative total passes ' + half },
          { lab: 'Formula', val: 'Median = L + [(n/2 − CF) ÷ f] × h' },
          { lab: 'Substitute', val: L + ' + [(' + half + ' − ' + before + ') ÷ ' + g.freqs[idx] + '] × ' + g.width },
          { lab: 'Answer', val: String(ans), final: true }
        ],
        why: 'Find the class the middle value lands in using the cumulative column, then step the right ' +
             'fraction of the way into that class. CF is the cumulative frequency BEFORE the median class.'
      };
    }
  ]);

  /* ═══════════════ Q2, Q3 : summarising a dataset ═══════════════ */

  var MEASURES = ['mean', 'median', 'mode', 'q1', 'q3', 'iqr', 'range', 'sd', 'variance', 'percentile'];

  GEN.add('ex3-summary', [
    function () {
      var n = R.pick([10, 11, 12]);
      var vals = R.list(n - 3, 1, 22);
      var repeated = R.int(1, 9);                 // guarantee a single clear mode
      vals = vals.concat([repeated, repeated, repeated]);
      var counts = {}, best = 0, bestVal = null, tie = false;
      vals.forEach(function (v) {
        counts[v] = (counts[v] || 0) + 1;
        if (counts[v] > best) { best = counts[v]; bestVal = v; tie = false; }
        else if (counts[v] === best && v !== bestVal) tie = true;
      });
      if (tie || best < 3) return null;
      vals = R.shuffle(vals);

      var s = sortNum(vals);
      var measure = R.pick(MEASURES);
      var p = R.pick([20, 30, 35, 40, 60, 65, 70, 80]);

      var q1pos = (n + 1) / 4, q2pos = 2 * (n + 1) / 4, q3pos = 3 * (n + 1) / 4;
      var Q1 = posValue(s, q1pos), Q3 = posValue(s, q3pos);
      var ppos = (p / 100) * (n + 1);
      if (ppos < 1 || ppos > n) return null;

      var ans, label, rows, note = 'Give your answer to two decimal places where needed.';
      switch (measure) {
        case 'mean':
          ans = round2(mean(vals)); label = 'the <b>mean</b>';
          rows = [{ lab: 'Σx', val: vals.join(' + ') + ' = ' + sum(vals) },
                  { lab: 'n', val: String(n) },
                  { lab: 'Mean', val: sum(vals) + ' ÷ ' + n }];
          break;
        case 'median':
          ans = round2(posValue(s, q2pos)); label = 'the <b>median</b>';
          rows = [{ lab: 'Sorted', val: s.join(', ') },
                  { lab: 'Position', val: '(' + n + ' + 1) ÷ 2 = ' + q2pos },
                  { lab: 'Value there', val: String(ans) }];
          break;
        case 'mode':
          ans = bestVal; label = 'the <b>mode</b>';
          rows = [{ lab: 'Sorted', val: s.join(', ') },
                  { lab: 'Most frequent', val: bestVal + ' appears ' + best + ' times' }];
          break;
        case 'q1':
          ans = round2(Q1); label = 'the <b>lower quartile (Q1)</b>';
          rows = [{ lab: 'Sorted', val: s.join(', ') },
                  { lab: 'Position', val: '(n + 1) ÷ 4 = ' + q1pos },
                  { lab: 'Value there', val: String(round2(Q1)) }];
          break;
        case 'q3':
          ans = round2(Q3); label = 'the <b>upper quartile (Q3)</b>';
          rows = [{ lab: 'Sorted', val: s.join(', ') },
                  { lab: 'Position', val: '3(n + 1) ÷ 4 = ' + q3pos },
                  { lab: 'Value there', val: String(round2(Q3)) }];
          break;
        case 'iqr':
          ans = round2(Q3 - Q1); label = 'the <b>interquartile range</b>';
          rows = [{ lab: 'Sorted', val: s.join(', ') },
                  { lab: 'Q1', val: 'position ' + q1pos + ' → ' + round2(Q1) },
                  { lab: 'Q3', val: 'position ' + q3pos + ' → ' + round2(Q3) },
                  { lab: 'IQR', val: round2(Q3) + ' − ' + round2(Q1) }];
          break;
        case 'range':
          ans = s[n - 1] - s[0]; label = 'the <b>range</b>';
          rows = [{ lab: 'Maximum', val: String(s[n - 1]) },
                  { lab: 'Minimum', val: String(s[0]) },
                  { lab: 'Range', val: s[n - 1] + ' − ' + s[0] }];
          break;
        case 'sd':
          ans = round2(Math.sqrt(variance(vals))); label = 'the <b>standard deviation</b>';
          rows = [{ lab: 'Mean', val: String(round2(mean(vals))) },
                  { lab: 'Σ(x − x̄)²', val: String(round2(variance(vals) * (n - 1))) },
                  { lab: 'Variance', val: round2(variance(vals) * (n - 1)) + ' ÷ ' + (n - 1) + ' = ' + round2(variance(vals)) },
                  { lab: 'Standard deviation', val: '√' + round2(variance(vals)) }];
          break;
        case 'variance':
          ans = round2(variance(vals)); label = 'the <b>variance</b>';
          rows = [{ lab: 'Mean', val: String(round2(mean(vals))) },
                  { lab: 'Σ(x − x̄)²', val: String(round2(variance(vals) * (n - 1))) },
                  { lab: 'Variance', val: round2(variance(vals) * (n - 1)) + ' ÷ (' + n + ' − 1)' }];
          break;
        default:
          ans = round2(posValue(s, ppos)); label = 'the <b>' + p + 'th percentile</b>';
          rows = [{ lab: 'Sorted', val: s.join(', ') },
                  { lab: 'Position', val: '(' + p + ' ÷ 100) × (' + n + ' + 1) = ' + round2(ppos) },
                  { lab: 'Value there', val: String(round2(posValue(s, ppos))) }];
          break;
      }
      rows.push({ lab: 'Answer', val: String(ans), final: true });

      var firm = R.pick(['ABC Stores', 'a household goods retailer', 'a cleaning products supplier']);
      return {
        type: 'numeric', marks: 5,
        scenario: firm + ' is conducting research on how many of its products are used. A random sample of ' +
                  n + ' consumers was selected and the following dataset was recorded:' +
                  '<div class="dataset"><span>' + vals.join('</span><span>') + '</span></div>',
        prompt: 'State ' + label + ' of this dataset.',
        answer: ans, tol: 0.02, note: note,
        solution: rows,
        why: measure === 'variance' || measure === 'sd'
          ? 'Divide by n − 1, not n — this is a sample. Note the variance is the square of the standard ' +
            'deviation, so square the UNROUNDED value if you go that way round.'
          : 'Sort the data before doing anything else. Quartile and percentile positions use (n + 1), and when ' +
            'the position is not a whole number you average the values either side of it.'
      };
    }
  ]);

  /* ═══════════════ Q4 : probability from a frequency table ═══════════════ */

  GEN.add('ex3-freqprob', [
    function () {
      var width = R.pick([5, 10]);
      var start = R.pick([15, 20, 25]);
      var bands = 5;
      var freqs = [];
      for (var i = 0; i < bands; i++) freqs.push(R.int(1, 8));
      freqs.push(R.int(2, 6));                       // the open-ended top band
      var total = sum(freqs);
      if (total < 15 || total > 40) return null;

      var rows = [];
      for (var b = 0; b < bands; b++) {
        rows.push([(start + width * b) + ' – &lt; ' + (start + width * (b + 1)), String(freqs[b])]);
      }
      rows.push([(start + width * bands) + '+', String(freqs[bands])]);
      rows.push(['<b>Total</b>', '<b>' + total + '</b>']);

      var kind = R.pick(['single', 'over', 'below', 'either']);
      var count, phrase;
      if (kind === 'single') {
        var b1 = R.int(0, bands - 1);
        count = freqs[b1];
        phrase = 'in the age group ' + (start + width * b1) + ' – &lt; ' + (start + width * (b1 + 1));
      } else if (kind === 'over') {
        var cut = R.int(2, bands);
        count = 0;
        for (var o = cut; o <= bands; o++) count += freqs[o];
        phrase = (start + width * cut) + ' years and over';
      } else if (kind === 'below') {
        var cutB = R.int(2, bands);
        count = 0;
        for (var u = 0; u < cutB; u++) count += freqs[u];
        phrase = 'below ' + (start + width * cutB) + ' years of age';
      } else {
        var lowCut = R.int(1, 2);
        count = freqs[bands];
        for (var e = 0; e < lowCut; e++) count += freqs[e];
        phrase = 'below ' + (start + width * lowCut) + ' or ' + (start + width * bands) + '+';
      }
      if (count === 0 || count === total) return null;

      return {
        type: 'mcq', marks: 4,
        scenario: 'The table below shows the age groups of people who entered a competition.' +
                  table(['Age group', 'No. of people'], rows),
        prompt: 'If a person is chosen at random from the group, determine the probability that they are ' +
                phrase + '.',
        options: R.options(fracHtml(count, total),
                           [fracHtml(total - count, total), fracHtml(count, total - count),
                            fracHtml(count + 1, total)]),
        answer: 0,
        solution: [
          { lab: 'People who qualify', val: String(count) },
          { lab: 'Total people', val: String(total) },
          { lab: 'Probability', val: count + '/' + total },
          { lab: 'Answer', val: fracStr(count, total), final: true }
        ],
        why: 'Count the rows the description covers, then divide by the overall total. ' +
             (kind === 'either'
               ? 'These two groups cannot overlap, so their counts simply add.'
               : 'The total row is the denominator every time.')
      };
    }
  ]);

  /* ═══════════════ Q5 : probability from a two-way table ═══════════════ */

  GEN.add('ex3-contingency', [
    function () {
      var brands = R.shuffle(['Canon', 'Nikon', 'Pentax', 'Sony', 'Fujifilm']).slice(0, 3);
      var rowNames = ['Professional', 'Personal'];
      var cells = [[], []];
      for (var r = 0; r < 2; r++) {
        for (var c = 0; c < 3; c++) cells[r].push(R.step(15, 95, 1));
      }
      var rowTot = [sum(cells[0]), sum(cells[1])];
      var colTot = [cells[0][0] + cells[1][0], cells[0][1] + cells[1][1], cells[0][2] + cells[1][2]];
      var grand = rowTot[0] + rowTot[1];

      var rows = [
        [rowNames[0], cells[0][0], cells[0][1], cells[0][2], '<b>' + rowTot[0] + '</b>'],
        [rowNames[1], cells[1][0], cells[1][1], cells[1][2], '<b>' + rowTot[1] + '</b>'],
        ['<b>Total</b>', '<b>' + colTot[0] + '</b>', '<b>' + colTot[1] + '</b>', '<b>' + colTot[2] + '</b>',
         '<b>' + grand + '</b>']
      ];

      var kind = R.pick(['marginalRow', 'marginalCol', 'conditional', 'joint', 'union']);
      var ri = R.int(0, 1), ci = R.int(0, 2);
      var num, den, phrase, why, steps;

      if (kind === 'marginalRow') {
        num = rowTot[ri]; den = grand;
        phrase = 'a ' + rowNames[ri].toLowerCase() + ' user';
        steps = [{ lab: rowNames[ri] + ' total', val: String(num) }, { lab: 'Grand total', val: String(den) }];
        why = 'A row total over the grand total — the simplest kind to read off.';
      } else if (kind === 'marginalCol') {
        num = colTot[ci]; den = grand;
        phrase = 'one who prefers the ' + brands[ci] + ' brand';
        steps = [{ lab: brands[ci] + ' total', val: String(num) }, { lab: 'Grand total', val: String(den) }];
        why = 'A column total over the grand total.';
      } else if (kind === 'conditional') {
        num = cells[ri][ci]; den = rowTot[ri];
        phrase = 'one who prefers ' + brands[ci] + ', given that they are a ' + rowNames[ri].toLowerCase() + ' user';
        steps = [{ lab: rowNames[ri] + ' AND ' + brands[ci], val: String(num) },
                 { lab: 'Denominator', val: '"given that" restricts us to the ' + rowNames[ri].toLowerCase() +
                        ' row, so ' + den + ' — NOT the grand total' }];
        why = '"Given that" narrows the whole sample space down to that one row. That is what makes it a ' +
              'conditional probability rather than a joint one.';
      } else if (kind === 'joint') {
        num = cells[ri][ci]; den = grand;
        phrase = 'a ' + rowNames[ri].toLowerCase() + ' user who prefers the ' + brands[ci] + ' brand';
        steps = [{ lab: 'In that cell', val: String(num) }, { lab: 'Grand total', val: String(den) }];
        why = 'This one is joint, not conditional — nothing has been "given", so the denominator stays the ' +
              'grand total of ' + den + '. Dividing by the column total instead is the classic slip here.';
      } else {
        num = rowTot[ri] + colTot[ci] - cells[ri][ci]; den = grand;
        phrase = 'a ' + rowNames[ri].toLowerCase() + ' user, or one who prefers ' + brands[ci];
        steps = [{ lab: 'P(' + rowNames[ri] + ')', val: rowTot[ri] + '/' + grand },
                 { lab: 'P(' + brands[ci] + ')', val: colTot[ci] + '/' + grand },
                 { lab: 'P(both)', val: cells[ri][ci] + '/' + grand },
                 { lab: 'Addition rule', val: rowTot[ri] + '/' + grand + ' + ' + colTot[ci] + '/' + grand +
                        ' − ' + cells[ri][ci] + '/' + grand }];
        why = 'These are not mutually exclusive — the ' + cells[ri][ci] + ' people in that cell are both — so ' +
              'the overlap must be subtracted once.';
      }
      if (num === 0 || num === den) return null;

      steps.push({ lab: 'Answer', val: fracStr(num, den), final: true });

      return {
        type: 'mcq', marks: 5,
        scenario: '<div class="tablewrap"><table class="dtable">' +
                  '<tr><th>Usage</th><th colspan="4">Digital camera</th></tr>' +
                  '<tr><th></th><th>' + brands.join('</th><th>') + '</th><th>Total</th></tr>' +
                  '<tr><td>' + rows[0].join('</td><td>') + '</td></tr>' +
                  '<tr><td>' + rows[1].join('</td><td>') + '</td></tr>' +
                  '<tr><td>' + rows[2].join('</td><td>') + '</td></tr>' +
                  '</table></div>',
        prompt: 'If a person is picked at random, determine the probability of selecting ' + phrase + '.',
        options: R.options(fracHtml(num, den),
                           [fracHtml(num, kind === 'conditional' ? grand : (rowTot[ri] || den)),
                            fracHtml(den - num, den), fracHtml(num, colTot[ci] || den)]),
        answer: 0,
        solution: steps,
        why: why
      };
    }
  ]);

  /* ═══════════════ Q6, Q8 : probability problems ═══════════════ */

  GEN.add('ex3-problems', [
    // Q6(a) / Q8 style: two picked without replacement
    function () {
      var target = R.int(4, 8), other1 = R.int(3, 7), other2 = R.int(1, 4);
      var total = target + other1 + other2;
      var num = target * (target - 1), den = total * (total - 1);
      var kit = R.pick([
        { unit: 'marbles', a: 'red', b: 'blue', c: 'green', vessel: 'An urn' },
        { unit: 'bulbs', a: 'working', b: 'dim', c: 'blown', vessel: 'A box' },
        { unit: 'fuses', a: 'good', b: 'defective', c: 'untested', vessel: 'A drawer' }
      ]);
      return {
        type: 'mcq', marks: 5,
        scenario: kit.vessel + ' contains ' + target + ' ' + kit.a + ', ' + other1 + ' ' + kit.b + ' and ' +
                  other2 + ' ' + kit.c + ' ' + kit.unit + '. Two are picked at random <b>without replacement</b>.',
        prompt: 'What is the probability that both are ' + kit.a + '?',
        options: R.options(fracHtml(num, den),
                           [fracHtml(target * target, total * total),
                            fracHtml(target, total),
                            fracHtml(target + target - 1, total + total - 1)]),
        answer: 0,
        solution: [
          { lab: 'Type', val: 'conditional — the first pick is not replaced' },
          { lab: 'P(first is ' + kit.a + ')', val: target + '/' + total },
          { lab: 'P(second | first)', val: (target - 1) + '/' + (total - 1) + ', since one has been removed from both counts' },
          { lab: 'Multiply', val: target + '/' + total + ' × ' + (target - 1) + '/' + (total - 1) + ' = ' + num + '/' + den },
          { lab: 'Answer', val: fracStr(num, den), final: true }
        ],
        why: 'Both the numerator and the denominator drop by one on the second pick. Using ' + target + '/' +
             total + ' twice would be the WITH-replacement answer.'
      };
    },

    // Q6(b) style: independent events across two devices
    function () {
      var faces = 6;
      var pickKind = R.pick(['odd', 'even', 'greater']);
      var threshold = R.int(2, 4);
      var count = pickKind === 'odd' ? 3 : (pickKind === 'even' ? 3 : faces - threshold);
      var desc = pickKind === 'greater' ? 'a number greater than ' + threshold : 'an ' + pickKind + ' number';
      var coin = R.pick(['head', 'tail']);
      var num = count, den = faces * 2;
      return {
        type: 'mcq', marks: 4,
        prompt: 'A die is rolled and a coin is tossed. Find the probability that the die shows ' + desc +
                ' and the coin shows a ' + coin + '.',
        options: R.options(fracHtml(num, den),
                           [fracHtml(count, faces), fracHtml(count + 1, den), fracHtml(1, den)]),
        answer: 0,
        solution: [
          { lab: 'Type', val: 'independent — the coin cannot affect the die' },
          { lab: 'P(die shows ' + desc + ')', val: count + '/' + faces },
          { lab: 'P(coin shows a ' + coin + ')', val: '1/2' },
          { lab: 'Multiply', val: count + '/' + faces + ' × 1/2' },
          { lab: 'Answer', val: fracStr(num, den), final: true }
        ],
        why: '"And" means multiply, and because the two are independent no conditional adjustment is needed.'
      };
    },

    // Q6(c) style: neither one suit nor one rank, via the complement
    function () {
      var suit = R.pick(['spade', 'heart', 'diamond', 'club']);
      var rank = R.pick(['jack', 'queen', 'king', 'ace', 'ten']);
      var either = 13 + 4 - 1;
      var neither = 52 - either;
      return {
        type: 'mcq', marks: 5,
        prompt: 'A card is drawn at random from a pack of 52 cards. What is the probability that it is ' +
                '<b>neither</b> a ' + suit + ' <b>nor</b> a ' + rank + '?',
        options: R.options(fracHtml(neither, 52),
                           [fracHtml(either, 52), fracHtml(52 - 13 - 4, 52), fracHtml(13 + 4, 52)]),
        answer: 0,
        solution: [
          { lab: suit + 's', val: '13 cards' },
          { lab: rank + 's', val: '4 cards' },
          { lab: 'Counted twice', val: 'the ' + rank + ' of ' + suit + 's, so subtract 1' },
          { lab: 'Either one', val: '13 + 4 − 1 = ' + either },
          { lab: 'Neither', val: '52 − ' + either + ' = ' + neither },
          { lab: 'Answer', val: fracStr(neither, 52), final: true }
        ],
        why: 'Work out "either" first and take it off 52. The two are NOT mutually exclusive — the ' + rank +
             ' of ' + suit + 's is both — so the overlap has to be removed before subtracting.'
      };
    },

    // Q6(e) style: the three conditional formulas
    function () {
      var pa = R.pick([2, 3, 4]), pb = R.pick([2, 3, 4]), pba = R.pick([2, 3, 4, 5]);
      var which = R.pick(['and', 'or', 'given']);
      var andNum = 1, andDen = pa * pba;                 // P(A) x P(B|A) = (1/pa)(1/pba)
      var num, den, prompt, steps, why;

      if (which === 'and') {
        num = andNum; den = andDen;
        prompt = 'find P(A and B).';
        steps = [{ lab: 'Multiplication rule', val: 'P(A and B) = P(A) × P(B|A)' },
                 { lab: 'Substitute', val: '(1/' + pa + ') × (1/' + pba + ')' }];
        why = 'P(B|A) is already the conditional probability, so it slots straight into the multiplication rule.';
      } else if (which === 'or') {
        var lcd = pa * pb * andDen;
        num = (lcd / pa) + (lcd / pb) - (lcd / andDen);
        den = lcd;
        if (num <= 0) return null;
        prompt = 'find P(A or B).';
        steps = [{ lab: 'P(A and B)', val: '(1/' + pa + ') × (1/' + pba + ') = 1/' + andDen },
                 { lab: 'Addition rule', val: 'P(A or B) = P(A) + P(B) − P(A and B)' },
                 { lab: 'Substitute', val: '1/' + pa + ' + 1/' + pb + ' − 1/' + andDen }];
        why = 'These are non-mutually exclusive, so the overlap P(A and B) is subtracted once. You have to ' +
              'work that out first from the multiplication rule.';
      } else {
        num = pb; den = andDen;
        prompt = 'find P(A|B).';
        steps = [{ lab: 'P(A and B)', val: '(1/' + pa + ') × (1/' + pba + ') = 1/' + andDen },
                 { lab: 'Conditional formula', val: 'P(A|B) = P(A and B) ÷ P(B)' },
                 { lab: 'Substitute', val: '(1/' + andDen + ') ÷ (1/' + pb + ')' }];
        why = 'Dividing by a fraction means multiplying by its reciprocal — the Week 1 rule turning up again.';
      }
      steps.push({ lab: 'Answer', val: fracStr(num, den), final: true });

      return {
        type: 'mcq', marks: 5,
        prompt: 'If P(A) = ' + R.frac(1, pa) + ', P(B) = ' + R.frac(1, pb) + ' and P(B|A) = ' +
                R.frac(1, pba) + ', ' + prompt,
        options: R.options(fracHtml(num, den),
                           [fracHtml(1, pa * pb), fracHtml(num + 1, den), fracHtml(den, num)]),
        answer: 0,
        solution: steps,
        why: why
      };
    },

    // Q6(d) style: all different on n dice
    function () {
      var dice = R.pick([2, 3]);
      var num = 1, den = 1;
      for (var i = 0; i < dice; i++) { num *= (6 - i); den *= 6; }
      return {
        type: 'mcq', marks: 4,
        prompt: 'What is the probability of rolling ' + (dice === 2 ? 'two' : 'three') +
                ' six-sided dice and getting a <b>different</b> number on each die?',
        options: R.options(fracHtml(num, den),
                           [fracHtml(den - num, den), fracHtml(1, den), fracHtml(6, den)]),
        answer: 0,
        solution: [
          { lab: 'First die', val: 'anything at all — 6/6' },
          { lab: 'Second die', val: 'must avoid the first — 5/6' },
          (dice === 3 ? { lab: 'Third die', val: 'must avoid both — 4/6' } : { lab: 'So', val: 'two dice only' }),
          { lab: 'Multiply', val: num + '/' + den },
          { lab: 'Answer', val: fracStr(num, den), final: true }
        ],
        why: 'The first die is free; each one after it has one fewer allowed face. That is why the numerator ' +
             'counts down 6, 5' + (dice === 3 ? ', 4' : '') + '.'
      };
    }
  ]);

  /* ═══════════════ Q7 : types of events ═══════════════ */

  var EVENT_FACTS = [
    { term: 'Mutually exclusive events',
      def: 'events that cannot happen together in a single trial — the outcome of one hinders the other',
      rule: 'the addition rule' },
    { term: 'Non-mutually exclusive events',
      def: 'events that can happen together in a single trial',
      rule: 'the addition rule' },
    { term: 'Independent events',
      def: 'events where the outcome of one has no effect on the outcome of the other',
      rule: 'the multiplication rule' },
    { term: 'Dependent (conditional) events',
      def: 'events where the outcome of one affects the outcome of the other',
      rule: 'the multiplication rule' }
  ];

  /* Situations to classify. Two questions to ask of any pair of events: can they
     both happen at once (mutually exclusive or not), and does one change the
     odds of the other (independent or dependent). Every `term` below must match
     one in EVENT_FACTS exactly, since the wrong answers are drawn from there. */
  var SCENARIOS = [
    { text: 'A coin is tossed and a die is rolled.',
      term: 'Independent events',
      tell: 'Does the first outcome change the second? The coin cannot affect the die.',
      why: 'Two separate objects with nothing connecting them. The die has the same six faces whatever the coin did.' },

    { text: 'A card is drawn from a deck and kept, then a second card is drawn.',
      term: 'Dependent (conditional) events',
      tell: 'The first card is not replaced, so the second draw is from 51 cards.',
      why: 'Keeping the card changes both how many cards remain and how many of them are the one you want.' },

    { text: 'A card is drawn from a deck, recorded, put back, and a second card is drawn.',
      term: 'Independent events',
      tell: 'The card goes back, so the deck is identical for the second draw.',
      why: 'Replacement restores the original situation. This is the single word that separates this from the dependent case.' },

    { text: 'One card is drawn, and you consider whether it is a heart or a spade.',
      term: 'Mutually exclusive events',
      tell: 'Could one card be both? No card has two suits.',
      why: 'No overlap at all, so nothing gets counted twice and P(A or B) is simply P(A) + P(B).' },

    { text: 'One card is drawn, and you consider whether it is a heart or a face card.',
      term: 'Non-mutually exclusive events',
      tell: 'Could one card be both? The jack, queen and king of hearts are both.',
      why: 'Three cards satisfy both descriptions, so adding the two probabilities counts them twice and the overlap must be subtracted.' },

    { text: 'A die is rolled once, and you consider whether it shows an even number or shows a five.',
      term: 'Mutually exclusive events',
      tell: 'Could one roll be both? Five is not even, so no.',
      why: 'The two sets of faces do not touch, so there is nothing to subtract.' },

    { text: 'A die is rolled once, and you consider whether it shows an even number or a number greater than three.',
      term: 'Non-mutually exclusive events',
      tell: 'Could one roll be both? Four and six are even and greater than three.',
      why: 'Two faces belong to both descriptions, so the overlap has to come off the total.' },

    { text: 'Two counters are taken from a bag one after the other, and the first is not put back.',
      term: 'Dependent (conditional) events',
      tell: 'The bag is smaller for the second pick.',
      why: 'Both the favourable count and the total drop by one, which is exactly what P(B given A) accounts for.' },

    { text: 'A customer at a showroom buys an e-bike, or buys accessories — some customers do both.',
      term: 'Non-mutually exclusive events',
      tell: 'The sentence says outright that some customers do both.',
      why: 'Anyone who bought both is in each group, so adding the groups counts them twice.' },

    { text: 'Every customer signs up for exactly one package, and you consider whether a customer chose Basic or Premium.',
      term: 'Mutually exclusive events',
      tell: '"Exactly one" means no customer can be in both groups.',
      why: 'That phrase is doing all the work — without it you would need to know the overlap before you could answer.' },

    { text: 'Two unrelated machines each undergo their own annual safety check.',
      term: 'Independent events',
      tell: 'Does one machine passing change the other\'s chances? They are unrelated.',
      why: '"Unrelated" is the examiner telling you to multiply without any conditional adjustment.' },

    { text: 'Two different employees are chosen from a team for two roles, and nobody can hold both roles.',
      term: 'Dependent (conditional) events',
      tell: 'Once someone takes the first role, they are out of the running for the second.',
      why: 'The pool shrinks between the two choices, which is the same structure as drawing without replacement.' },

    { text: 'A card is drawn, and you consider whether it is red or whether it is a king.',
      term: 'Non-mutually exclusive events',
      tell: 'Could one card be both? The king of hearts and the king of diamonds are.',
      why: 'Two cards are in both groups. Adding twenty-six and four without subtracting them counts those kings twice.' },

    { text: 'Two coins are tossed at the same time.',
      term: 'Independent events',
      tell: 'Neither coin can influence the other.',
      why: 'Each coin still has two equally likely faces regardless of what the other one does.' },

    { text: 'Two names are drawn from a hat for a prize, and the first name is not returned.',
      term: 'Dependent (conditional) events',
      tell: 'The first name is gone, so the second draw has one fewer entry.',
      why: 'Anyone already drawn cannot be drawn again, so the second probability depends on the first.' },

    { text: 'A single delivery is either on time or late.',
      term: 'Mutually exclusive events',
      tell: 'One delivery cannot be both on time and late.',
      why: 'These are complements as well as mutually exclusive: between them they cover every possibility, so they add to one.' },

    { text: 'A counter is taken from a bag and put back, then another counter is taken.',
      term: 'Independent events',
      tell: 'The bag is back to its original contents before the second pick.',
      why: 'Replacing it means the second pick faces exactly the same bag as the first.' },

    { text: 'A quality inspector takes two items from a batch and does not return the first.',
      term: 'Dependent (conditional) events',
      tell: 'The batch is one item smaller for the second inspection.',
      why: 'Both the number of faulty items and the batch size can change between the two picks.' },

    { text: 'One employee is selected, and you consider whether they work in sales or in finance — nobody works in both.',
      term: 'Mutually exclusive events',
      tell: 'The sentence rules out anyone being in both departments.',
      why: 'With no one in both groups the two probabilities simply add.' },

    { text: 'One employee is selected, and you consider whether they hold a driving licence or speak French.',
      term: 'Non-mutually exclusive events',
      tell: 'Could one person be both? Plenty of people drive and speak French.',
      why: 'Anyone who does both is in each group, so the overlap must be subtracted.' },

    { text: 'A spinner is spun twice.',
      term: 'Independent events',
      tell: 'The spinner has no memory of the first spin.',
      why: 'Every section is available again on the second spin, exactly as before.' },

    { text: 'One student is picked, and you consider whether they passed or failed the exam.',
      term: 'Mutually exclusive events',
      tell: 'A student cannot both pass and fail the same exam.',
      why: 'These cover every outcome between them, so they are complements as well.' },

    { text: 'Two cards are dealt from the same deck to two different players.',
      term: 'Dependent (conditional) events',
      tell: 'The first card dealt is no longer in the deck for the second.',
      why: 'Dealing is drawing without replacement, whatever it is called at the table.' },

    { text: 'One customer is chosen, and you consider whether they paid by card or ordered online.',
      term: 'Non-mutually exclusive events',
      tell: 'Could one customer be both? Ordering online and paying by card go together often.',
      why: 'The two descriptions overlap heavily, so adding them without subtracting would badly overcount.' },

    { text: 'A die is rolled twice in a row.',
      term: 'Independent events',
      tell: 'The die is unchanged by the first roll.',
      why: 'A run of sixes does not make the next six any less likely — the die does not keep score.' },

    { text: 'Three raffle tickets are drawn one after another and none are put back.',
      term: 'Dependent (conditional) events',
      tell: 'Each draw leaves fewer tickets in the drum.',
      why: 'Every draw changes the pool for the next one, so each probability is conditional on what came before.' },

    { text: 'One product is inspected, and you consider whether it is faulty or passes inspection.',
      term: 'Mutually exclusive events',
      tell: 'A product cannot both fail and pass the same inspection.',
      why: 'No overlap is possible, so P(A or B) is just P(A) + P(B) — and here it comes to one.' },

    { text: 'One person is surveyed, and you consider whether they own a car or own a bicycle.',
      term: 'Non-mutually exclusive events',
      tell: 'Could one person be both? Owning a car does not stop you owning a bicycle.',
      why: 'People who own both appear in each group, which is precisely what the subtraction removes.' },

    { text: 'A machine is inspected on Monday and again on Tuesday, and how it performed on Monday has no bearing on Tuesday.',
      term: 'Independent events',
      tell: 'The sentence states outright that the first result does not affect the second.',
      why: 'When the question tells you the two are unconnected, the probabilities multiply with no adjustment.' },

    { text: 'Two items are taken from a shelf for inspection and neither is put back.',
      term: 'Dependent (conditional) events',
      tell: 'The shelf has one fewer item when the second is chosen.',
      why: 'The second probability has to be worked out from what is left after the first was removed.' },

    { text: 'One invoice is selected, and you consider whether it was paid early or paid late.',
      term: 'Mutually exclusive events',
      tell: 'One invoice cannot have been paid both early and late.',
      why: 'The two groups cannot overlap, so their probabilities simply add.' },

    { text: 'One invoice is selected, and you consider whether it is for more than R10 000 or was paid late.',
      term: 'Non-mutually exclusive events',
      tell: 'Could one invoice be both? A large invoice can certainly also be a late one.',
      why: 'Size and timing are unrelated descriptions, so plenty of invoices satisfy both and would be counted twice.' },

    { text: 'The traffic light is red when you arrive, and you are late for work that morning.',
      term: 'Dependent (conditional) events',
      tell: 'Being held at the light makes arriving late more likely.',
      why: 'One genuinely affects the chances of the other, so the second probability is conditional on the first.' },

    { text: 'One job applicant is chosen, and you consider whether they hold a degree or have five years of experience.',
      term: 'Non-mutually exclusive events',
      tell: 'Could one applicant be both? Many people have a degree and years of experience.',
      why: 'The strongest applicants sit in both groups, so adding the two counts them twice over.' }
  ];

  GEN.add('ex3-theory', [
    function () {
      var i = R.int(0, EVENT_FACTS.length - 1);
      var f = EVENT_FACTS[i];
      var askRule = R.int(0, 1) === 0;
      var others = [];
      for (var j = 0; j < EVENT_FACTS.length; j++) if (j !== i) others.push(EVENT_FACTS[j]);

      if (askRule) {
        return {
          type: 'mcq', marks: 3,
          prompt: 'Which rule applies to <b>' + f.term.toLowerCase() + '</b>?',
          options: R.options(f.rule,
                             [f.rule === 'the addition rule' ? 'the multiplication rule' : 'the addition rule',
                              'the complement rule', 'both rules equally']),
          answer: 0,
          solution: [
            { lab: f.term, val: f.def },
            { lab: 'Governed by', val: f.rule },
            { lab: 'Answer', val: f.rule, final: true }
          ],
          why: 'Mutually exclusive and non-mutually exclusive events are the two addition-rule cases ("or"); ' +
               'independent and dependent events are the two multiplication-rule cases ("and").'
        };
      }
      return {
        type: 'mcq', marks: 3,
        prompt: 'Which term describes ' + f.def + '?',
        options: R.options(f.term, [others[0].term, others[1].term, others[2].term]),
        answer: 0,
        solution: [
          { lab: 'Definition', val: f.def },
          { lab: 'Term', val: f.term },
          { lab: 'Rule that applies', val: f.rule },
          { lab: 'Answer', val: f.term, final: true }
        ],
        why: 'There are four possibilities for any two events, two under each rule. Knowing which pair you are ' +
             'in tells you immediately whether to add or to multiply.'
      };
    },

    /* Classifying a described situation, which is what the exam actually asks —
       naming the definition is easy, spotting it in a sentence is the skill.
       One question per scenario, so the topic stops being four facts on a loop. */
    function () {
      var s = R.pick(SCENARIOS);
      var wrong = [];
      for (var j = 0; j < EVENT_FACTS.length; j++) {
        if (EVENT_FACTS[j].term !== s.term) wrong.push(EVENT_FACTS[j].term);
      }
      return {
        type: 'mcq', marks: 3,
        prompt: 'How would you describe these two events? ' + s.text,
        options: R.options(s.term, R.shuffle(wrong)),
        answer: 0,
        solution: [
          { lab: 'What happens', val: s.text },
          { lab: 'The test', val: s.tell },
          { lab: 'Answer', val: s.term, final: true }
        ],
        why: s.why
      };
    },

    /* The keywords, on their own. These are what turn a wordy question into a
       decision about which rule to reach for. */
    function () {
      var cue = R.pick([
        { word: '"and"', means: 'multiply the probabilities',
          other: ['add the probabilities', 'subtract the probabilities', 'divide the probabilities'],
          note: '"And" asks for both things to happen, which narrows the outcomes down — so the answer gets smaller.' },
        { word: '"or"', means: 'add the probabilities',
          other: ['multiply the probabilities', 'subtract the probabilities', 'divide the probabilities'],
          note: '"Or" accepts either thing, which widens the outcomes — so the answer gets larger.' },
        { word: '"without replacement"', means: 'the events are dependent',
          other: ['the events are independent', 'the events are mutually exclusive', 'the events cannot happen'],
          note: 'The first item is not put back, so the second probability is calculated from a smaller pool.' },
        { word: '"with replacement"', means: 'the events are independent',
          other: ['the events are dependent', 'the events are mutually exclusive', 'the totals change each time'],
          note: 'Putting it back restores the original situation, so the second draw is unaffected by the first.' }
      ]);
      return {
        type: 'mcq', marks: 2,
        prompt: 'In a probability question, ' + cue.word + ' tells you that:',
        options: R.options(cue.means, cue.other),
        answer: 0,
        solution: [
          { lab: 'Keyword', val: cue.word },
          { lab: 'Tells you', val: cue.means },
          { lab: 'Answer', val: cue.means, final: true }
        ],
        why: cue.note
      };
    },

    /* What a probability is allowed to be. A negative or above-one answer is a
       signal to go back and check, not a result to write down. */
    function () {
      var bad = R.pick([1.4, 1.05, -0.2, 2.5, -1, 3]);
      var ok = R.shuffle([0, 0.15, 0.5, 0.78, 1]);
      return {
        type: 'mcq', marks: 2,
        prompt: 'Which of these <b>cannot</b> be a probability?',
        options: R.options(String(bad), [String(ok[0]), String(ok[1]), String(ok[2])]),
        answer: 0,
        solution: [
          { lab: 'Every probability sits', val: 'between 0 and 1 inclusive' },
          { lab: '0 means', val: 'impossible; 1 means certain' },
          { lab: 'Answer', val: String(bad) + ' is outside that range', final: true }
        ],
        why: 'A probability is a share of the possible outcomes, so it can never be negative and never exceed ' +
             'the whole. Getting ' + bad + ' means something went wrong in the working.'
      };
    },

    /* The notation itself. A question can be entirely doable and still be lost
       at the point where P(A | B) is read as a division. */
    function () {
      var sym = R.pick([
        { shown: 'P(A &cap; B)', means: 'the probability that A and B both happen',
          other: ['the probability that A or B happens', 'the probability of A given B', 'the probability that neither happens'],
          note: 'The ∩ symbol is the "and" case, which is the multiplication rule.' },
        { shown: 'P(A &cup; B)', means: 'the probability that A or B happens',
          other: ['the probability that A and B both happen', 'the probability of A given B', 'the probability that both fail'],
          note: 'The ∪ symbol is the "or" case, which is the addition rule.' },
        { shown: 'P(B | A)', means: 'the probability of B given that A has already happened',
          other: ['the probability of B divided by A', 'the probability that B and A both happen', 'the probability of B or A'],
          note: 'The bar is not a division sign. It is the conditional probability used in the dependent multiplication rule.' },
        { shown: 'P(E<sup>c</sup>)', means: 'the probability that E does not happen',
          other: ['the probability that E happens twice', 'the probability of E multiplied by itself', 'the certainty of E'],
          note: 'The c stands for complement — everything outside E. It is why P(Eᶜ) = 1 − P(E).' }
      ]);
      return {
        type: 'mcq', marks: 2,
        prompt: 'What does <b>' + sym.shown + '</b> mean?',
        options: R.options(sym.means, sym.other),
        answer: 0,
        solution: [
          { lab: 'Notation', val: sym.shown },
          { lab: 'Read as', val: sym.means },
          { lab: 'Answer', val: sym.means, final: true }
        ],
        why: sym.note
      };
    },

    /* Picking the right formula for the situation, which is the decision every
       one of these questions really comes down to. */
    function () {
      var law = R.pick([
        { situation: 'two mutually exclusive events, asking for A or B',
          formula: 'P(A) + P(B)',
          other: ['P(A) + P(B) − P(A and B)', 'P(A) × P(B)', 'P(A) × P(B | A)'],
          note: 'Nothing overlaps, so there is nothing to subtract.' },
        { situation: 'two non-mutually exclusive events, asking for A or B',
          formula: 'P(A) + P(B) − P(A and B)',
          other: ['P(A) + P(B)', 'P(A) × P(B)', 'P(A) × P(B | A)'],
          note: 'The overlap would otherwise be counted in both P(A) and P(B).' },
        { situation: 'two independent events, asking for A and B',
          formula: 'P(A) × P(B)',
          other: ['P(A) × P(B | A)', 'P(A) + P(B)', 'P(A) + P(B) − P(A and B)'],
          note: 'Independent means the second probability needs no adjustment.' },
        { situation: 'two dependent events, asking for A and B',
          formula: 'P(A) × P(B | A)',
          other: ['P(A) × P(B)', 'P(A) + P(B)', 'P(A) + P(B) − P(A and B)'],
          note: 'The second probability is worked out after the first event has already happened.' }
      ]);
      return {
        type: 'mcq', marks: 3,
        prompt: 'Which formula applies to ' + law.situation + '?',
        options: R.options(law.formula, law.other),
        answer: 0,
        solution: [
          { lab: 'Situation', val: law.situation },
          { lab: 'Formula', val: law.formula },
          { lab: 'Answer', val: law.formula, final: true }
        ],
        why: law.note
      };
    },

    /* What the extreme values actually mean. */
    function () {
      var v = R.pick([
        { val: 'P(E) = 0', means: 'the event is impossible',
          other: ['the event is certain', 'the event is equally likely to happen or not', 'the event has not been observed yet'],
          note: 'None of the possible outcomes satisfy it.' },
        { val: 'P(E) = 1', means: 'the event is certain',
          other: ['the event is impossible', 'the event happens once', 'the event is equally likely to happen or not'],
          note: 'Every possible outcome satisfies it.' },
        { val: 'P(E) = 0.5', means: 'the event is as likely to happen as not',
          other: ['the event is certain', 'the event is impossible', 'the event happens every second trial'],
          note: 'Half the outcomes satisfy it — though that does not mean it alternates.' }
      ]);
      return {
        type: 'mcq', marks: 2,
        prompt: 'If <b>' + v.val + '</b>, what does that tell you?',
        options: R.options(v.means, v.other),
        answer: 0,
        solution: [
          { lab: 'Value', val: v.val },
          { lab: 'Meaning', val: v.means },
          { lab: 'Answer', val: v.means, final: true }
        ],
        why: v.note + ' Probabilities run from 0 to 1, with everything else somewhere in between.'
      };
    },

    /* Where the number came from — a counted symmetry, or a record of what
       has happened before. */
    function () {
      var kind = R.pick([
        { text: 'working out that a fair die shows a four one time in six, because it has six identical faces',
          term: 'theoretical (classical) probability',
          other: ['empirical (relative frequency) probability', 'subjective probability', 'conditional probability'],
          note: 'It comes from the structure of the object itself, with nothing needing to be observed.' },
        { text: 'estimating that a delivery will be late one time in eight, because forty of the last three hundred and twenty were',
          term: 'empirical (relative frequency) probability',
          other: ['theoretical (classical) probability', 'subjective probability', 'mutually exclusive probability'],
          note: 'There is no symmetry to reason from, so the past record is the best estimate available.' }
      ]);
      return {
        type: 'mcq', marks: 2,
        prompt: 'What kind of probability is being used when ' + kind.text + '?',
        options: R.options(kind.term, kind.other),
        answer: 0,
        solution: [
          { lab: 'Situation', val: kind.text },
          { lab: 'Answer', val: kind.term, final: true }
        ],
        why: kind.note
      };
    },

    /* The complement, stated rather than calculated. */
    function () {
      return {
        type: 'mcq', marks: 2,
        prompt: 'For any event E, what does P(E) + P(E<sup>c</sup>) equal?',
        options: R.options('1', ['0', '0.5', 'it depends on the event']),
        answer: 0,
        solution: [
          { lab: 'E and its complement', val: 'between them cover every possible outcome' },
          { lab: 'So together they are', val: 'certain' },
          { lab: 'Answer', val: '1', final: true }
        ],
        why: 'This is why the complement rule is written P(Eᶜ) = 1 − P(E). It is often far quicker to work out ' +
             'the thing you do not want and subtract.'
      };
    }
  ]);
})();
