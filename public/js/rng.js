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

  var MINUS = new RegExp('[' + String.fromCharCode(0x2212) + String.fromCharCode(0x2013) +
                         String.fromCharCode(0x2014) + ']', 'g');

  /* What an option means: the number it carries, and the wording around it.
     Both are needed. The number alone would call "5 thousands" and "5 hundreds"
     the same option, when the words are carrying the whole difference; the
     wording alone would miss that 12/2 652 and 1/221 are one number written
     twice. Two options only clash when the words match AND the number matches.

     Deliberately cautious — anything ambiguous returns a null number, because
     wrongly declaring two options equal would throw a legitimate one away. */
  function describe(text) {
    var s = String(text).replace(/&nbsp;/g, ' ');
    var part = null;

    var m = /<span class="frac"><span>([^<]*)<\/span><span>([^<]*)<\/span><\/span>/.exec(s);
    if (m) {
      var n = plain(m[1]), d = plain(m[2]);
      s = s.replace(m[0], ' # / # ');
      if (n === null || d === null || d === 0 || /<span class="frac">/.test(s)) {
        return { num: null, words: words(s) };
      }
      part = n / d;
    }

    s = s.replace(/<[^>]*>/g, ' ').replace(MINUS, '-');
    var prev;
    do { prev = s; s = s.replace(/(\d)\s+(\d{3})(?!\d)/g, '$1$2'); } while (s !== prev);

    var found = s.match(/-?\d+(?:\.\d+)?/g) || [];
    var shape = words(s);
    var out = { num: null, words: shape };

    if (found.length > 1) return out;
    if (part !== null) {
      if (!found.length) { out.num = part; return out; }
      var whole = parseFloat(found[0]);
      if (isFinite(whole)) out.num = whole < 0 ? whole - part : whole + part;  // 11 3/16
      return out;
    }
    if (found.length === 1) {
      var only = parseFloat(found[0]);
      if (isFinite(only)) out.num = only;
    }
    return out;
  }

  /* The option with its numbers blanked out, so "5 thousands" and "5 hundreds"
     are recognisably different kinds of answer. */
  function words(s) {
    return String(s)
      .replace(/<[^>]*>/g, ' ')
      .replace(/-?\d+(?:\.\d+)?/g, '#')
      .replace(/\s+/g, ' ')
      .replace(/^ | $/g, '')
      .toLowerCase();
  }

  /* Kept for callers and checks that only want the number. */
  function value(text) { return describe(text).num; }

  function plain(t) {
    var v = parseFloat(String(t).replace(/[\s,]/g, ''));
    return isFinite(v) ? v : null;
  }

  function same(a, b) {
    return Math.abs(a - b) <= Math.max(Math.abs(a), Math.abs(b), 1e-9) * 1e-9;
  }

  /* Builds an MCQ from a correct value plus distractor values.
     Any distractor equal to the answer (or duplicated) is dropped, so
     generators can offer more than they need and let this sort it out.

     "Equal" means equal in VALUE, not in spelling. 12/2 652 and 1/221 are
     different strings and the same number, and putting both on screen marks
     her wrong for choosing a correct answer. */
  function options(correct, distractors, format) {
    var fmt = format || function (v) { return String(v); };
    var seen = {}, taken = [], opts = [fmt(correct)];
    seen[opts[0]] = true;
    taken.push(describe(opts[0]));

    for (var i = 0; i < distractors.length && opts.length < 4; i++) {
      var t = fmt(distractors[i]);
      if (seen[t]) continue;
      var d = describe(t), clash = false;
      if (d.num !== null) {
        for (var j = 0; j < taken.length; j++) {
          if (taken[j].num !== null && taken[j].words === d.words && same(taken[j].num, d.num)) {
            clash = true; break;
          }
        }
      }
      if (clash) continue;
      seen[t] = true;
      taken.push(d);
      opts.push(t);
    }
    return opts;                      // correct is always index 0; quiz.js shuffles
  }

  return {
    int: int, pick: pick, shuffle: shuffle, step: step,
    distinct: distinct, list: list, round: round,
    money: money, num: num, frac: frac, gcd: gcd, options: options,
    value: value
  };
})();
