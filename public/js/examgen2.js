/* Abi's Study Buddy — Exam Questions generators, Week 2.
   Single-answer, same length and weight as the real paper. The working shown afterwards
   follows the memo's own layout.                                                        */

(function () {
  var R = Rand;

  function money2(x) { return R.money(Math.round(x * 100) / 100); }
  function round2(x) { return Math.round(x * 100) / 100; }

  function table(headers, rows, highlightNone) {
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

  /* ═══════════════ Q1–Q3 : percentage change read off a table ═══════════════ */

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
  var QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];

  GEN.add('ex2-pctchange', [
    // Monthly running cost, six columns, two of them picked out
    function () {
      var start = R.int(0, 6);
      var months = MONTHS.slice(start, start + 6);
      var base = R.step(150000, 350000, 500) / 100;
      var vals = [];
      for (var i = 0; i < 6; i++) {
        vals.push(round2(base * (1 + R.int(-12, 18) / 100)));
        base = vals[i];
      }
      var a = R.int(0, 3), b = a + R.int(2, 5 - a);
      if (b > 5 || vals[a] <= 0) return null;
      var pct = round2(((vals[b] - vals[a]) / vals[a]) * 100);
      if (Math.abs(pct) < 2) return null;                   // too small to be an interesting question

      var thing = R.pick(['electricity', 'water and refuse', 'security monitoring', 'internet and telephone']);
      var cells = [];
      for (var c = 0; c < 6; c++) cells.push('R' + money2(vals[c]));

      return {
        type: 'numeric', marks: 4,
        scenario: 'The following table provides a summary of the monthly cost of ' + thing + ':' +
                  table(months, [cells]),
        prompt: 'Calculate the percentage change in the cost of ' + thing + ' from ' +
                months[a] + ' to ' + months[b] + '.',
        suf: '%', answer: pct, tol: 0.03,
        note: 'Give your answer to two decimal places. Use a minus sign if it is a decrease.',
        solution: [
          { lab: months[a], val: 'R' + money2(vals[a]) },
          { lab: months[b], val: 'R' + money2(vals[b]) },
          { lab: 'Percentage change', val: '(R' + money2(vals[b]) + ' − R' + money2(vals[a]) + ') ÷ R' + money2(vals[a]) },
          { lab: 'Answer', val: pct + '%', final: true }
        ],
        why: 'The table gives six months, but only the two named in the question matter. The earlier month is ' +
             'always the base — it goes on the bottom of the fraction.'
      };
    },

    // Consumer price index, one row per year
    function () {
      var startYear = R.int(2016, 2020);
      var idx = [round2(R.int(880, 940) / 10)];
      for (var i = 1; i < 4; i++) idx.push(round2(idx[i - 1] * (1 + R.int(2, 9) / 100)));
      var a = R.int(0, 1), b = a + R.int(1, 3 - a);
      if (b > 3) return null;
      var pct = round2(((idx[b] - idx[a]) / idx[a]) * 100);
      if (pct < 2) return null;

      var rows = [];
      for (var y = 0; y < 4; y++) rows.push([String(startYear + y), idx[y].toFixed(1)]);

      return {
        type: 'numeric', marks: 4,
        scenario: 'Operating expenses generally increase in line with inflation. The following table provides ' +
                  'the consumer price index (CPI) at the end of each year:' +
                  table(['Year', 'CPI'], rows),
        prompt: 'Calculate the percentage change in CPI from ' + (startYear + a) + ' to ' + (startYear + b) + '.',
        suf: '%', answer: pct, tol: 0.03,
        note: 'Give your answer to two decimal places.',
        solution: [
          { lab: (startYear + a) + ' CPI', val: idx[a].toFixed(1) },
          { lab: (startYear + b) + ' CPI', val: idx[b].toFixed(1) },
          { lab: 'Percentage change', val: '(' + idx[b].toFixed(1) + ' − ' + idx[a].toFixed(1) + ') ÷ ' + idx[a].toFixed(1) },
          { lab: 'Answer', val: pct + '%', final: true }
        ],
        why: 'CPI is already an index, so no rand values are involved — the calculation is the same either way.'
      };
    },

    // Rand/dollar exchange rate, where a fall is the interesting case
    function () {
      var year = R.int(2017, 2022);
      var rates = [round2(R.int(1250, 1600) / 100)];
      for (var i = 1; i < 5; i++) {
        rates.push(Math.round(rates[i - 1] * (1 + R.int(-14, 20) / 100) * 10000) / 10000);
      }
      var a = R.int(0, 2), b = a + R.int(1, 4 - a);
      if (b > 4) return null;
      var pct = round2(((rates[b] - rates[a]) / rates[a]) * 100);
      if (Math.abs(pct) < 3) return null;

      var labels = ['Q4 ' + (year - 1), 'Q1 ' + year, 'Q2 ' + year, 'Q3 ' + year, 'Q4 ' + year];
      var rows = [];
      for (var r = 0; r < 5; r++) rows.push([labels[r], rates[r].toFixed(4)]);

      var weaker = pct > 0;
      return {
        type: 'numeric', marks: 5,
        scenario: 'The cost of imported goods depends on the exchange rate of the rand. The following table ' +
                  'provides the rand/dollar exchange rate at the end of each quarter:' +
                  table(['Quarter', 'Rand/dollar exchange rate'], rows),
        prompt: 'Calculate the percentage change in the exchange rate from the end of ' + labels[a] +
                ' to the end of ' + labels[b] + '.',
        suf: '%', answer: pct, tol: 0.03,
        note: 'Give your answer to two decimal places. Use a minus sign if it is a decrease.',
        solution: [
          { lab: labels[a], val: rates[a].toFixed(4) },
          { lab: labels[b], val: rates[b].toFixed(4) },
          { lab: 'Percentage change', val: '(' + rates[b].toFixed(4) + ' − ' + rates[a].toFixed(4) + ') ÷ ' + rates[a].toFixed(4) },
          { lab: 'Answer', val: pct + '%', final: true }
        ],
        why: 'This is the cost of buying one dollar. It went ' + (weaker ? 'up' : 'down') + ', so the rand ' +
             (weaker ? 'depreciated' : 'appreciated') + ' by ' + Math.abs(pct) + '% against the dollar over the period.'
      };
    }
  ]);

  /* ═══════════════ Q4–Q6 : applying and reversing a percentage ═══════════════ */

  GEN.add('ex2-applypct', [
    // Q4 style: apply an increase to the most recent figure in a table
    function () {
      var startYear = R.int(2019, 2023);
      var rents = [R.step(15000, 25000, 100)];
      for (var i = 1; i < 3; i++) rents.push(Math.round(rents[i - 1] * (1 + R.int(3, 8) / 100) / 25) * 25);
      var rate = R.pick([5, 6, 7, 7.5, 8, 8.5, 9, 10]);
      var ans = round2(rents[2] * (1 + rate / 100));
      var rows = [];
      for (var y = 0; y < 3; y++) rows.push([String(startYear + y), R.num(rents[y])]);

      return {
        type: 'numeric', marks: 4,
        scenario: 'The monthly rent of your premises for the last three years is given below:' +
                  table(['Year', 'Monthly Rent'], rows) +
                  'The lease contract is up for renewal and the landlord has proposed an increase of ' +
                  rate + '% for ' + (startYear + 3) + '.',
        prompt: 'Calculate the monthly rent for ' + (startYear + 3) + '.',
        pre: 'R', answer: ans, tol: 0.05,
        solution: [
          { lab: 'Rent for ' + (startYear + 3), val: 'Rent for ' + (startYear + 2) + ' + ' + rate + '% of it' },
          { lab: 'As a single multiplier', val: (1 + rate / 100) + ' × ' + R.num(rents[2]) },
          { lab: 'Answer', val: 'R' + money2(ans), final: true }
        ],
        why: 'Only the most recent year matters — the earlier rows are there to be read past. ' +
             'Multiplying by ' + (1 + rate / 100) + ' adds the increase in one step.'
      };
    },

    // Q6 style: inflation-linked salary increase
    function () {
      var rate = round2(R.int(35, 95) / 10);
      var salary = R.step(9000, 32000, 500);
      var ans = round2(salary * (1 + rate / 100));
      return {
        type: 'numeric', marks: 4,
        scenario: 'Statistics South Africa has announced that the consumer price index increased by ' + rate +
                  '% year-on-year. You have agreed to pay your workers an inflation-related increase.',
        prompt: 'Calculate the new monthly salary for an employee that earns R' + R.num(salary) + ' per month.',
        pre: 'R', answer: ans, tol: 0.05,
        solution: [
          { lab: 'New salary', val: 'Old salary + ' + rate + '% of old salary' },
          { lab: 'As a single multiplier', val: (1 + rate / 100) + ' × ' + R.num(salary) },
          { lab: 'Answer', val: 'R' + money2(ans), final: true }
        ],
        why: 'Adding ' + rate + '% is the same as multiplying by ' + (1 + rate / 100) + ' — one step instead of two.'
      };
    },

    // Q5 style: work BACKWARDS to the price before the increase
    function () {
      var rate = R.pick([5, 6, 7, 8, 9, 10, 12, 15]);
      var newPrice = R.step(80000, 400000, 2500) / 100;
      var ans = round2(newPrice / (1 + rate / 100));
      var item = R.pick(['a replacement battery', 'a set of brake pads', 'a replacement motor', 'a charger unit']);
      return {
        type: 'numeric', marks: 5,
        scenario: 'The cost of ' + item + ' is R' + money2(newPrice) +
                  '. The supplier notified you that, due to a depreciation of the rand/dollar exchange rate, ' +
                  'they had to increase their prices by ' + rate + '%.',
        prompt: 'Calculate the cost of ' + item + ' <b>before</b> the price increase.',
        pre: 'R', answer: ans, tol: 0.05,
        note: 'Give your answer to two decimal places.',
        solution: [
          { lab: 'New price', val: 'Old price + ' + rate + '% of old price' },
          { lab: 'So', val: 'R' + money2(newPrice) + ' = ' + (1 + rate / 100) + ' × Old price' },
          { lab: 'Rearrange', val: 'Old price = R' + money2(newPrice) + ' ÷ ' + (1 + rate / 100) },
          { lab: 'Answer', val: 'R' + money2(ans), final: true }
        ],
        why: 'You must DIVIDE by ' + (1 + rate / 100) + ', not subtract ' + rate +
             '%. Taking ' + rate + '% off R' + money2(newPrice) + ' would give R' +
             money2(newPrice * (1 - rate / 100)) + ', which is wrong — the increase was applied to the smaller original figure.'
      };
    }
  ]);

  /* ═══════════════ Q7–Q9 : proportional allocation ═══════════════ */

  GEN.add('ex2-allocate', [
    // Q7 style: a bonus pool split in proportion to salaries
    function () {
      var roles = ['Manager', 'Sales assistant', 'Technician', 'Bookkeeper'];
      var n = R.int(3, 4);
      var salaries = [];
      for (var i = 0; i < n; i++) salaries.push(R.step(11000, 32000, 1000));
      var total = 0;
      for (var s = 0; s < n; s++) total += salaries[s];
      var pool = R.step(15000, 60000, 1000);
      var who = R.int(0, n - 1);
      var ans = round2(salaries[who] / total * pool);
      var rows = [];
      for (var r = 0; r < n; r++) rows.push([roles[r], 'R' + R.num(salaries[r])]);

      return {
        type: 'numeric', marks: 5,
        scenario: 'You want to allocate R' + R.num(pool) + ' of your annual profit to pay a bonus to your ' +
                  'employees, and want to pay it proportional to their salaries. The table below provides the ' +
                  'monthly salary of your employees:' +
                  table(['Employee', 'Monthly Salary'], rows),
        prompt: 'Calculate the bonus that the ' + roles[who].toLowerCase() + ' will receive.',
        pre: 'R', answer: ans, tol: 0.05,
        solution: [
          { lab: 'Total monthly salaries', val: 'R' + R.num(total) },
          { lab: roles[who] + '’s share', val: R.num(salaries[who]) + ' ÷ ' + R.num(total) },
          { lab: 'Apply to the pool', val: '(' + R.num(salaries[who]) + ' ÷ ' + R.num(total) + ') × R' + R.num(pool) },
          { lab: 'Answer', val: 'R' + money2(ans), final: true }
        ],
        why: 'Every allocation question has the same shape: this one’s share ÷ the total, then multiply by the pool. ' +
             'The whole table is needed for the denominator.'
      };
    },

    // Q8 style: depreciation by distance travelled
    function () {
      var life = R.pick([150000, 180000, 200000, 240000, 250000]);
      var dists = [];
      for (var i = 0; i < 3; i++) dists.push(R.step(28000, 62000, 1000));
      var cost = R.step(180000, 420000, 10000);
      var year = R.int(0, 2);
      var ans = round2(dists[year] / life * cost);
      var rows = [];
      for (var r = 0; r < 3; r++) rows.push(['Year ' + (r + 1), R.num(dists[r]) + 'km']);

      return {
        type: 'numeric', marks: 4,
        scenario: 'A delivery van has an estimated useful life of ' + R.num(life) +
                  'km, and you calculate annual depreciation based on the distance the vehicle travelled that ' +
                  'year. The following table summarises the distance travelled over three years:' +
                  table(['Year', 'Distance Travelled'], rows) +
                  'The delivery van was purchased for R' + R.num(cost) + '.',
        prompt: 'Calculate the amount of depreciation that should be expensed in Year ' + (year + 1) + '.',
        pre: 'R', answer: ans, tol: 0.05,
        solution: [
          { lab: 'Distance in Year ' + (year + 1), val: R.num(dists[year]) + 'km' },
          { lab: 'Useful life', val: R.num(life) + 'km' },
          { lab: 'Depreciation', val: '(' + R.num(dists[year]) + ' ÷ ' + R.num(life) + ') × R' + R.num(cost) },
          { lab: 'Answer', val: 'R' + money2(ans), final: true }
        ],
        why: 'The proxy here is distance rather than salary, but the method is identical. The other two years ' +
             'are not part of the calculation — the denominator is the van’s whole useful life.'
      };
    },

    // Q9 style: allocate only the portion actually USED
    function () {
      var spend = R.step(4000, 12000, 500);
      var leftPct = R.pick([8, 10, 12, 15, 20, 25]);
      var months = ['January', 'February', 'March', 'April'];
      var hours = [];
      for (var i = 0; i < 4; i++) hours.push(R.int(18, 40));
      var totalHours = 0;
      for (var h = 0; h < 4; h++) totalHours += hours[h];
      var used = round2(spend * (1 - leftPct / 100));
      var which = R.int(0, 3);
      var ans = round2(hours[which] / totalHours * used);
      var rows = [];
      for (var r = 0; r < 4; r++) rows.push([months[r], String(hours[r])]);

      return {
        type: 'numeric', marks: 6,
        scenario: 'At the beginning of January you purchased R' + R.num(spend) +
                  ' worth of diesel for the generator to keep the lights on during load shedding. At the end of ' +
                  'April you estimate that there is still ' + leftPct + '% of the diesel left, and you want to ' +
                  'allocate the cost proportionally based on the number of hours the generator was used each month.' +
                  table(['Month', 'Hours'], rows),
        prompt: 'Calculate the cost of diesel for ' + months[which] + '.',
        pre: 'R', answer: ans, tol: 0.05,
        note: 'Give your answer to two decimal places.',
        solution: [
          { lab: 'Total hours', val: hours.join(' + ') + ' = ' + totalHours + ' hours' },
          { lab: 'Diesel actually used', val: '(100% − ' + leftPct + '%) × R' + R.num(spend) + ' = R' + money2(used) },
          { lab: months[which] + '’s share', val: hours[which] + ' ÷ ' + totalHours },
          { lab: 'Allocate', val: '(' + hours[which] + ' ÷ ' + totalHours + ') × R' + money2(used) },
          { lab: 'Answer', val: 'R' + money2(ans), final: true }
        ],
        why: 'The trap is allocating the full R' + R.num(spend) + '. Only the ' + (100 - leftPct) +
             '% actually burned gets shared out — the ' + leftPct + '% still in the tank has not been used up yet.'
      };
    }
  ]);

  /* ═══════════════ Q10–Q12 : bulk and settlement discounts ═══════════════ */

  function bracketTable(brackets) {
    var rows = [];
    for (var i = 0; i < brackets.length; i++) rows.push([brackets[i].label, brackets[i].pct + '%']);
    return table(['Number of units', 'Discount'], rows);
  }

  function makeBrackets() {
    var a = R.pick([100, 200, 500]);
    var b = a * R.pick([2, 4, 5]);
    var mid = R.pick([2, 2.5, 3, 4]);
    var top = mid + R.pick([1.5, 2, 2.5, 3]);
    return [
      { label: '1 to ' + R.num(a), pct: 0, upTo: a },
      { label: R.num(a + 1) + ' to ' + R.num(b), pct: mid, upTo: b },
      { label: R.num(b + 1) + ' and more', pct: top, upTo: Infinity }
    ];
  }

  function bracketFor(brackets, qty) {
    for (var i = 0; i < brackets.length; i++) if (qty <= brackets[i].upTo) return brackets[i];
    return brackets[brackets.length - 1];
  }

  GEN.add('ex2-discounts', [
    // Q10 style: bulk bracket only
    function () {
      var brackets = makeBrackets();
      var band = R.pick([0, 1, 2]);
      var lo = band === 0 ? 1 : (band === 1 ? brackets[0].upTo + 1 : brackets[1].upTo + 1);
      var hi = band === 2 ? brackets[1].upTo * 2 : brackets[band].upTo;
      var qty = R.int(lo, hi);
      var chosen = bracketFor(brackets, qty);
      if (chosen.pct === 0) return null;                 // no discount is a dull question
      var list = R.step(4000, 30000, 500) / 100;
      var net = round2(list * (1 - chosen.pct / 100));
      var totalPrice = round2(net * qty);
      var item = R.pick(['tires', 'inner tubes', 'brake pads', 'helmets', 'bicycle chains']);

      return {
        type: 'numeric', marks: 5,
        scenario: 'A supplier gives discount on bulk orders, depending on the size of the order. The applicable ' +
                  'discount rates are given in the following table:' + bracketTable(brackets) +
                  'You placed an order for ' + R.num(qty) + ' ' + item + ' and each one sells for R' +
                  money2(list) + '.',
        prompt: 'Calculate the total purchase price.',
        pre: 'R', answer: totalPrice, tol: 0.05,
        solution: [
          { lab: 'Order quantity', val: R.num(qty) + ' falls in the "' + chosen.label + '" bracket → ' + chosen.pct + '%' },
          { lab: 'Net price each', val: 'R' + money2(list) + ' × (100% − ' + chosen.pct + '%) = R' + money2(net) },
          { lab: 'Total', val: R.num(qty) + ' × R' + money2(net) },
          { lab: 'Answer', val: 'R' + money2(totalPrice), final: true }
        ],
        why: 'Read the bracket off the table carefully before doing any arithmetic — landing one row out is the ' +
             'easiest way to lose every mark on this question.'
      };
    },

    // Q11 style: settlement discount decided by the payment date
    function () {
      var immediate = R.pick([8, 10, 12]);
      var withinPct = R.pick([3, 4, 5, 6]);
      var withinDays = R.pick([7, 14, 21, 30]);
      var orderDay = R.int(1, 10);
      var payDay = orderDay + R.int(2, withinDays - 1);
      var qty = R.step(50, 400, 10);
      var list = R.step(4000, 20000, 500) / 100;
      var gross = round2(qty * list);
      var ans = round2(gross * (1 - withinPct / 100));
      var month = R.pick(['April', 'May', 'June', 'July', 'August']);
      var item = R.pick(['tires', 'helmets', 'batteries', 'pannier bags']);

      return {
        type: 'numeric', marks: 5,
        scenario: 'A supplier gives a discount of ' + immediate + '% on invoices that are paid immediately and ' +
                  withinPct + '% on invoices that are settled within ' + withinDays + ' days. You ordered ' +
                  R.num(qty) + ' ' + item + ' at a cost of R' + money2(list) + ' each on ' + orderDay + ' ' +
                  month + ' and settled the invoice in full on ' + payDay + ' ' + month + '.',
        prompt: 'Calculate the total purchase price.',
        pre: 'R', answer: ans, tol: 0.05,
        solution: [
          { lab: 'Days taken to pay', val: payDay + ' ' + month + ' − ' + orderDay + ' ' + month + ' = ' +
                 (payDay - orderDay) + ' days' },
          { lab: 'Which discount?', val: 'not immediate, but within ' + withinDays + ' days → ' + withinPct + '%' },
          { lab: 'Gross', val: R.num(qty) + ' × R' + money2(list) + ' = R' + money2(gross) },
          { lab: 'Apply the discount', val: 'R' + money2(gross) + ' × (100% − ' + withinPct + '%)' },
          { lab: 'Answer', val: 'R' + money2(ans), final: true }
        ],
        why: 'The invoice was settled ' + (payDay - orderDay) + ' days later, not immediately, so the ' +
             immediate + '% rate does not apply. Work out the gap between the two dates before choosing a rate.'
      };
    },

    // Q12 style: bulk bracket AND settlement discount together
    function () {
      var brackets = makeBrackets();
      var qty = R.step(brackets[1].upTo + 100, brackets[1].upTo * 3, 100);
      var chosen = bracketFor(brackets, qty);
      var immediate = R.pick([5, 6, 7, 8]);
      var withinPct = R.pick([2, 3, 4]);
      var withinDays = R.pick([7, 10, 14]);
      var list = R.step(800, 3000, 50) / 100;
      var net = round2(list * (1 - chosen.pct / 100));
      var gross = round2(net * qty);
      var ans = round2(gross * (1 - immediate / 100));
      var item = R.pick(['cooldrinks', 'energy bars', 'water bottles', 'inner tubes']);

      return {
        type: 'numeric', marks: 6,
        scenario: 'A supplier gives discount on bulk orders, depending on the size of the order. Furthermore, the ' +
                  'supplier gives ' + immediate + '% discount on invoices settled immediately and ' + withinPct +
                  '% on invoices settled within ' + withinDays + ' days of the invoice date. The applicable bulk ' +
                  'discount rates are given in the following table:' + bracketTable(brackets) +
                  'You placed an order for ' + R.num(qty) + ' ' + item + ' with a list price of R' + money2(list) +
                  ' each. The invoice was paid immediately upon receipt.',
        prompt: 'Calculate the total amount that you will pay on the invoice.',
        pre: 'R', answer: ans, tol: 0.05,
        solution: [
          { lab: 'Bulk bracket', val: R.num(qty) + ' falls in "' + chosen.label + '" → ' + chosen.pct + '%' },
          { lab: 'Net price each', val: 'R' + money2(list) + ' × (100% − ' + chosen.pct + '%) = R' + money2(net) },
          { lab: 'Total purchase price', val: 'R' + money2(net) + ' × ' + R.num(qty) + ' = R' + money2(gross) },
          { lab: 'Settled immediately', val: 'so a further ' + immediate + '% comes off' },
          { lab: 'Amount due', val: 'R' + money2(gross) + ' × (100% − ' + immediate + '%)' },
          { lab: 'Answer', val: 'R' + money2(ans), final: true }
        ],
        why: 'Two discounts, applied in order: the bulk discount reduces the price per unit, then the settlement ' +
             'discount comes off the invoice total. They are not added together and applied once.'
      };
    }
  ]);

  /* ═══════════════ Q13–Q16 : gross profit margins ═══════════════ */

  GEN.add('ex2-margins', [
    // Q13/Q14 style: given cost and selling price, find one of the two margins
    function () {
      var cp = R.step(4000, 40000, 500) / 100;
      var gp = R.step(1000, 20000, 500) / 100;
      var sp = round2(cp + gp);
      var onCost = R.int(0, 1) === 0;
      var ans = round2((gp / (onCost ? cp : sp)) * 100);
      var item = R.pick(['a tire', 'a helmet', 'an inner tube', 'a bicycle pump', 'a chain']);
      return {
        type: 'numeric', marks: 4,
        scenario: 'The cost price of ' + item + ' is R' + money2(cp) + ' and you sell it for R' + money2(sp) + '.',
        prompt: 'Calculate the gross profit margin on the <b>' + (onCost ? 'cost price' : 'selling price') + '</b>.',
        suf: '%', answer: ans, tol: 0.03,
        note: 'Give your answer to two decimal places.',
        solution: [
          { lab: 'Formula', val: 'GP% = GP ÷ ' + (onCost ? 'CP' : 'SP') + ' = (SP − CP) ÷ ' + (onCost ? 'CP' : 'SP') },
          { lab: 'Gross profit', val: 'R' + money2(sp) + ' − R' + money2(cp) + ' = R' + money2(gp) },
          { lab: 'Divide', val: money2(gp) + ' ÷ ' + money2(onCost ? cp : sp) },
          { lab: 'Answer', val: ans + '%', final: true }
        ],
        why: 'Same gross profit, different base. On cost price it would be ' +
             round2((gp / cp) * 100) + '% and on selling price ' + round2((gp / sp) * 100) +
             '% — always check which one the question asks for.'
      };
    },

    // Q15 style: given cost price and margin on cost, find the selling price
    function () {
      var cp = R.step(5000, 60000, 500) / 100;
      var pct = R.pick([10, 15, 20, 25, 30, 40, 50]);
      var ans = round2(cp * (1 + pct / 100));
      return {
        type: 'numeric', marks: 5,
        scenario: 'The cost price of an item is R' + money2(cp) + ' and the gross profit margin on cost price is ' +
                  pct + '%.',
        prompt: 'Calculate the item’s selling price.',
        pre: 'R', answer: ans, tol: 0.05,
        solution: [
          { lab: 'Formula', val: 'GP% = (SP − CP) ÷ CP' },
          { lab: 'Substitute', val: pct + '% = (SP − ' + money2(cp) + ') ÷ ' + money2(cp) },
          { lab: 'Rearrange', val: 'SP = ' + pct + '% × ' + money2(cp) + ' + ' + money2(cp) },
          { lab: 'Answer', val: 'R' + money2(ans), final: true }
        ],
        why: 'Because the margin is on COST price, the percentage is added to the cost — the selling price ends up ' +
             (100 + pct) + '% of the cost.'
      };
    },

    // Q16 style: given selling price and margin on selling, find the cost price
    function () {
      var sp = R.step(10000, 90000, 500) / 100;
      var pct = R.pick([15, 20, 25, 30, 35, 40, 45]);
      var ans = round2(sp * (1 - pct / 100));
      return {
        type: 'numeric', marks: 5,
        scenario: 'The selling price of an item is R' + money2(sp) +
                  ' and the gross profit margin on selling price is ' + pct + '%.',
        prompt: 'Calculate the item’s cost price.',
        pre: 'R', answer: ans, tol: 0.05,
        solution: [
          { lab: 'Formula', val: 'GP% = (SP − CP) ÷ SP' },
          { lab: 'Substitute', val: pct + '% = (' + money2(sp) + ' − CP) ÷ ' + money2(sp) },
          { lab: 'Rearrange', val: 'CP = ' + money2(sp) + ' − ' + pct + '% × ' + money2(sp) },
          { lab: 'Answer', val: 'R' + money2(ans), final: true }
        ],
        why: 'Because the margin is on SELLING price this time, the percentage comes OFF the selling price. ' +
             'Watch the direction — it is the mirror image of the cost-price version.'
      };
    }
  ]);
})();
