/* Abi's Study Buddy — random helpers used by the question generators.
   Kept deliberately small: generators must stay easy to read and verify. */

var Rand = (function () {

  function int(min, max) {                 // inclusive both ends
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* A multiple of `step` between min and max, e.g. money(2000, 9000, 500) */
  function step(min, max, s) {
    var lo = Math.ceil(min / s), hi = Math.floor(max / s);
    return int(lo, hi) * s;
  }

  /* n distinct integers from the range */
  function distinct(n, min, max) {
    var pool = [], out = [];
    for (var v = min; v <= max; v++) pool.push(v);
    pool = shuffle(pool);
    for (var i = 0; i < n && i < pool.length; i++) out.push(pool[i]);
    return out;
  }

  /* n integers from the range, repeats allowed */
  function list(n, min, max) {
    var out = [];
    for (var i = 0; i < n; i++) out.push(int(min, max));
    return out;
  }

  function round(x, places) {
    var f = Math.pow(10, places == null ? 2 : places);
    return Math.round(x * f) / f;
  }

  /* South African thousands formatting: 1234567.5 -> "1 234 567.50" */
  function money(x, places) {
    var p = places == null ? 2 : places;
    var neg = x < 0;
    var s = Math.abs(x).toFixed(p);
    var parts = s.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return (neg ? '−' : '') + parts.join('.');
  }

  /* Plain number with thousands spacing, no forced decimals */
  function num(x) {
    var s = String(x);
    var parts = s.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  }

  function frac(n, d) {
    return '<span class="frac"><span>' + n + '</span><span>' + d + '</span></span>';
  }

  function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { var t = b; b = a % b; a = t; }
    return a || 1;
  }

  /* Builds an MCQ from a correct value plus distractor values.
     Any distractor equal to the answer (or duplicated) is dropped, so
     generators can offer more than they need and let this sort it out. */
  function options(correct, distractors, format) {
    var fmt = format || function (v) { return String(v); };
    var seen = {}, opts = [fmt(correct)];
    seen[opts[0]] = true;
    for (var i = 0; i < distractors.length && opts.length < 4; i++) {
      var t = fmt(distractors[i]);
      if (!seen[t]) { seen[t] = true; opts.push(t); }
    }
    return opts;                      // correct is always index 0; quiz.js shuffles
  }

  return {
    int: int, pick: pick, shuffle: shuffle, step: step,
    distinct: distinct, list: list, round: round,
    money: money, num: num, frac: frac, gcd: gcd, options: options
  };
})();
