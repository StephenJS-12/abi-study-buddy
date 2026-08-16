/* Abi's Study Buddy — Exam Questions generators, Week 4.

   Single-answer, matching the paper's length. Where the question solves for a rate or a
   term, the values are constructed FORWARDS from a chosen clean answer, so the figure in
   the question is always exactly consistent with the answer we expect back.              */

(function () {
  var R = Rand;

  function round2(x) { return Math.round(x * 100) / 100; }
  function money2(x) { return R.money(round2(x)); }

  var FREQ = [
    { word: 'monthly',                            m: 12, per: 'per month' },
    { word: 'quarterly',                          m: 4,  per: 'per quarter' },
    { word: 'semi-annually (or half-yearly)',     m: 2,  per: 'per half-year' }
  ];

  /* ═══════════════ Q1–Q2 : simple interest future value ═══════════════ */

  GEN.add('ex4-simplefv', [
    function () {
      var pv = R.step(10000, 90000, 5000);
      var rate = round2(R.int(30, 120) / 10);        // 3.0% to 12.0%
      var years = R.int(3, 9);
      var fv = round2(pv * (1 + years * rate / 100));
      return {
        type: 'numeric', marks: 4,
        prompt: 'You invested R' + R.num(pv) + ' in an interest-bearing investment that earns an <b>annual ' +
                'simple interest rate</b> of return of ' + rate + '%. Calculate the value of the investment after ' +
                years + ' years.',
        pre: 'R', answer: fv, tol: 0.05,
        solution: [
          { lab: 'Formula', val: 'FV = PV(1 + ni)' },
          { lab: 'Substitute', val: 'R' + R.num(pv) + '(1 + (' + years + ')(' + round2(rate / 100) + '))' },
          { lab: 'Simplify the bracket', val: 'R' + R.num(pv) + '(1 + ' + round2(years * rate / 100) + ')' },
          { lab: 'Answer', val: 'R' + money2(fv), final: true }
        ],
        why: 'Simple interest is charged on the original capital every year, so the total interest is just ' +
             years + ' × ' + rate + '% = ' + round2(years * rate) + '% of the opening amount.'
      };
    }
  ]);

  /* ═══════════════ Q3–Q4 : solving for the simple rate ═══════════════ */

  GEN.add('ex4-simplerate', [
    function () {
      var pv = R.step(10000, 90000, 5000);
      var rate = round2(R.int(30, 120) / 10);
      var years = R.int(3, 8);
      var fv = pv * (1 + years * rate / 100);
      if (Math.round(fv) !== fv) return null;         // keep the figure in the question tidy
      return {
        type: 'numeric', marks: 5,
        prompt: 'You invested R' + R.num(pv) + ' in an interest-bearing investment. After ' + years +
                ' years, the value of the investment has grown to R' + R.num(fv) +
                '. Calculate the <b>annual simple interest rate</b> that you have earned on your investment.',
        suf: '%', answer: rate, tol: 0.02,
        note: 'Give your answer as a percentage.',
        solution: [
          { lab: 'Formula', val: 'FV = PV(1 + ni)' },
          { lab: 'Substitute', val: R.num(fv) + ' = ' + R.num(pv) + '(1 + ' + years + 'i)' },
          { lab: 'Divide both sides by PV', val: R.num(fv) + ' ÷ ' + R.num(pv) + ' = ' + round2(fv / pv) + ' = 1 + ' + years + 'i' },
          { lab: 'Subtract 1', val: years + 'i = ' + round2(fv / pv - 1) },
          { lab: 'Divide by n', val: 'i = ' + round2(fv / pv - 1) + ' ÷ ' + years },
          { lab: 'Answer', val: rate + '%', final: true }
        ],
        why: 'Rearranging is easier than it looks: divide by the opening amount, take off the 1, then divide by ' +
             'the number of years. No roots needed — that only happens with compound interest.'
      };
    }
  ]);

  /* ═══════════════ Q5–Q6 : compound interest future value ═══════════════ */

  GEN.add('ex4-compoundfv', [
    function () {
      var pv = R.step(10000, 90000, 5000);
      var rate = round2(R.int(30, 110) / 10);
      var years = R.int(3, 8);
      var factor = Math.pow(1 + rate / 100, years);
      var fv = round2(pv * factor);
      return {
        type: 'numeric', marks: 5,
        prompt: 'You invested R' + R.num(pv) + ' in an interest-bearing investment that earns an interest rate ' +
                'of return of ' + rate + '% <b>compounded annually</b>. Calculate the value of the investment after ' +
                years + ' years.',
        pre: 'R', answer: fv, tol: 0.05,
        note: 'Give your answer to two decimal places.',
        solution: [
          { lab: 'Formula', val: 'FV = PV(1 + i)ⁿ' },
          { lab: 'Substitute', val: 'R' + R.num(pv) + '(1 + ' + round2(rate / 100) + ')^' + years },
          { lab: 'Work out the power', val: '(' + round2(1 + rate / 100) + ')^' + years + ' = ' +
                 (Math.round(factor * 1000000) / 1000000) },
          { lab: 'Answer', val: 'R' + money2(fv), final: true }
        ],
        why: 'Simple interest on the same investment would give R' + money2(pv * (1 + years * rate / 100)) +
             '. The extra R' + money2(fv - pv * (1 + years * rate / 100)) + ' is interest earned on interest.'
      };
    }
  ]);

  /* ═══════════════ Q7–Q8 : solving for the annual compound rate ═══════════════ */

  GEN.add('ex4-compoundrate', [
    function () {
      /* The paper quotes a round future value (R27 200, R59 600) and asks for the rate that
         produced it. Compound growth from a round rate almost never lands on a round rand
         amount, so we pick the round FV first and solve for whatever rate it implies. */
      var pv = R.step(10000, 90000, 5000);
      var years = R.int(3, 8);
      var aim = R.int(40, 120) / 10;                      // aiming for roughly 4% - 12%
      var fv = Math.round(pv * Math.pow(1 + aim / 100, years) / 400) * 400;
      if (fv <= pv) return null;
      var ratio = fv / pv;
      var recovered = round2((Math.pow(ratio, 1 / years) - 1) * 100);
      if (recovered < 2 || recovered > 20) return null;
      return {
        type: 'numeric', marks: 6,
        prompt: 'You invested R' + R.num(pv) + ' in an interest-bearing investment. After ' + years +
                ' years, the value of the investment has grown to R' + R.num(fv) +
                '. Calculate the <b>annual compounded interest rate</b> that you have earned on your investment.',
        suf: '%', answer: recovered, tol: 0.03,
        note: 'Give your answer as a percentage to two decimal places.',
        solution: [
          { lab: 'Formula', val: 'FV = PV(1 + i)ⁿ' },
          { lab: 'Substitute', val: R.num(fv) + ' = ' + R.num(pv) + '(1 + i)^' + years },
          { lab: 'Divide both sides by PV', val: '(1 + i)^' + years + ' = ' + R.num(fv) + ' ÷ ' + R.num(pv) +
                 ' = ' + (Math.round(ratio * 1000000) / 1000000) },
          { lab: 'Take the ' + years + 'th root', val: '1 + i = ' + (Math.round(ratio * 1000000) / 1000000) +
                 '^(1/' + years + ')' },
          { lab: 'Subtract 1', val: 'i = ' + (Math.round((Math.pow(ratio, 1 / years) - 1) * 1000000) / 1000000) },
          { lab: 'Answer', val: recovered + '%', final: true }
        ],
        why: 'The compound version needs a ROOT where the simple version needed a division. On a calculator ' +
             'that is the x√y key, or raise to the power of 1 ÷ ' + years + '.'
      };
    }
  ]);

  /* ═══════════════ Q9–Q11 : effective periodic rate from a quoted rate ═══════════════ */

  GEN.add('ex4-effective', [
    function () {
      var f = R.pick(FREQ);
      var nominal = round2(R.int(30, 140) / 10);
      var eff = nominal / f.m;
      var rounded = Math.round(eff * 10000) / 10000;
      return {
        type: 'numeric', marks: 4,
        prompt: 'The quoted interest rate on a fixed deposit is ' + nominal + '% per annum <b>compounded ' +
                f.word + '</b>. Calculate the effective periodic interest rate that is equivalent to the quoted rate.',
        suf: '% ' + f.per, answer: rounded, tol: 0.0005,
        note: 'Give your answer to four decimal places if it does not divide exactly.',
        solution: [
          { lab: 'Formula', val: 'i = i⁽ᵐ⁾ ÷ m' },
          { lab: 'Compounding periods per year', val: 'm = ' + f.m + ' (' + f.word + ')' },
          { lab: 'Substitute', val: nominal + '% ÷ ' + f.m },
          { lab: 'Answer', val: rounded + '% ' + f.per, final: true }
        ],
        why: 'The quoted rate is a NOMINAL annual rate — it is never the rate actually applied at the end of ' +
             'each period. Dividing by ' + f.m + ' gives the one that is.'
      };
    }
  ]);

  /* ═══════════════ Q12–Q14 : effective periodic rate from actual growth ═══════════════ */

  GEN.add('ex4-periodicgrowth', [
    function () {
      var f = R.pick(FREQ);
      var years = R.int(3, 8);
      var n = years * f.m;
      // choose a clean periodic rate, then build the question forwards from it
      var periodic = f.m === 12 ? round2(R.int(4, 12) / 10)      // 0.4% - 1.2% monthly
                   : f.m === 4  ? round2(R.int(10, 25) / 10)     // 1.0% - 2.5% quarterly
                                : round2(R.int(20, 45) / 10);    // 2.0% - 4.5% half-yearly
      var pv = R.step(15000, 90000, 1000);
      var fv = round2(pv * Math.pow(1 + periodic / 100, n));
      var ratio = fv / pv;
      var recovered = Math.round((Math.pow(ratio, 1 / n) - 1) * 1000000) / 10000;
      var yearsWord = { 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six', 7: 'Seven', 8: 'Eight' }[years];

      return {
        type: 'numeric', marks: 6,
        prompt: yearsWord + ' years ago, you invested R' + money2(pv) + ' in a fixed-term savings account. ' +
                'The value of the investment has grown to R' + money2(fv) +
                '. Calculate the <b>effective periodic interest rate</b> if the interest was compounded ' +
                f.word + '.',
        suf: '% ' + f.per, answer: recovered, tol: 0.02,
        note: 'Give your answer as a percentage to two decimal places.',
        solution: [
          { lab: 'Number of periods', val: years + ' years × ' + f.m + ' = ' + n },
          { lab: 'Formula', val: 'FV = PV(1 + i)ⁿ' },
          { lab: 'Divide by PV', val: '(1 + i)^' + n + ' = ' + money2(fv) + ' ÷ ' + money2(pv) +
                 ' = ' + (Math.round(ratio * 1000000) / 1000000) },
          { lab: 'Take the ' + n + 'th root', val: '1 + i = ' + (Math.round(ratio * 1000000) / 1000000) +
                 '^(1/' + n + ')' },
          { lab: 'Answer', val: recovered + '% ' + f.per, final: true }
        ],
        why: 'The root must use the number of PERIODS (' + n + '), not the number of years (' + years +
             '). Using ' + years + ' would give the annual rate instead of the periodic one.'
      };
    }
  ]);

  /* ═══════════════ Q15–Q17 : solving for the number of years ═══════════════ */

  GEN.add('ex4-term', [
    function () {
      var f = R.pick(FREQ);
      var nominal = R.pick([6, 8, 9, 10, 12, 15, 18]);
      var pv = R.step(20000, 120000, 10000);
      var multiple = R.pick([1.5, 2, 2.5, 3]);
      var fv = pv * multiple;
      var i = nominal / 100 / f.m;
      var periods = Math.log(fv / pv) / Math.log(1 + i);
      var years = periods / f.m;
      if (years < 1.5 || years > 30) return null;
      var yearsR = Math.round(years * 100) / 100;

      return {
        type: 'numeric', marks: 6,
        prompt: 'Calculate the number of <b>years</b> that it will take for an investment of R' + R.num(pv) +
                ' to grow to R' + R.num(fv) + ' if the investment can earn a nominal interest rate of ' +
                nominal + '% per year compounded ' + f.word + '.',
        suf: 'years', answer: yearsR, tol: 0.03,
        note: 'Give your answer in years, to two decimal places.',
        solution: [
          { lab: 'Effective periodic rate', val: nominal + '% ÷ ' + f.m + ' = ' +
                 (Math.round(i * 1000000) / 10000) + '%' },
          { lab: 'Formula', val: 'FV = PV(1 + i)ⁿ' },
          { lab: 'Divide by PV', val: '(1 + i)ⁿ = ' + R.num(fv) + ' ÷ ' + R.num(pv) + ' = ' + multiple },
          { lab: 'Take logs', val: 'n = ln(' + multiple + ') ÷ ln(' + (Math.round((1 + i) * 1000000) / 1000000) + ')' },
          { lab: 'Number of periods', val: String(Math.round(periods * 100) / 100) + ' ' +
                 f.per.replace('per ', '') + 's' },
          { lab: 'Convert to years', val: (Math.round(periods * 100) / 100) + ' ÷ ' + f.m },
          { lab: 'Answer', val: yearsR + ' years', final: true }
        ],
        why: 'Solving for n needs logarithms, because n is the exponent. The answer comes out in PERIODS ' +
             'first — divide by ' + f.m + ' at the end to turn it into years, which is what the question asks for.'
      };
    }
  ]);
})();
