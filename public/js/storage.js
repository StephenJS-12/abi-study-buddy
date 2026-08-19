/* Abi's Study Buddy — localStorage layer
   Everything persistent lives here. One key, one JSON blob. */

var Store = (function () {
  var KEY = 'sparkleStudy.v1';
  var POINT_CAP = 1000;      // the reward ladder runs to 1000, shared across every module
  /* Correct answers in a topic to unlock its badge.
     Raised from 5 to 30 so a badge means she has genuinely worked a topic
     rather than answered a handful of its questions. Badges already earned at
     the old threshold are untouched — recordAnswer only ever adds one that is
     missing, so nothing she has already unlocked is taken away. */
  var BADGE_AT = 30;
  /* Practise is listed explicitly at 0 so the rule is visible rather than implied by
     absence: practise mode never scores, no matter how many she gets right. */
  var POINTS_PER = { practise: 0, test: 1, exam: 2 };

  var blank = {
    points: 0,
    bestStreak: 0,
    totalCorrect: 0,
    totalAnswered: 0,
    topicCorrect: {},        // topicId -> count of correct answers
    badges: {},              // topicId -> ISO date earned
    lastSetup: {},           // weekId -> { topics: [], mode, count }
    lastModule: null,        // so returning to the site resumes where she was
    lastSaved: null,         // ISO of the last successful write, for the health check
    claimed: {},             // reward threshold -> ISO date claimed
    /* When she studies, what she has covered, and when the exams are.
       Shape and defaults live in schedule.js — this only has to keep it. */
    schedule: null,
    /* Celebrations are the point of this site, so they default ON even when Windows
       has animations switched off system-wide. She can still turn them off here. */
    settings: { motion: true }
  };

  var PROBE_KEY = KEY + '.probe';

  var state = load();

  /* What was actually on disk when this window opened. If the app has been used
     before and this is still null, nothing is surviving between sessions — which
     is the one failure that looks completely fine until the window is closed. */
  var loadedAt = state.lastSaved || null;

  var writeError = null;
  var canWrite = probe();

  /* A real write-read-delete round trip. Browsers do not report blocked storage by
     failing quietly — they throw — but only at the moment of writing, which is long
     after the point where we could still tell her something useful. */
  function probe() {
    try {
      localStorage.setItem(PROBE_KEY, 'x');
      var back = localStorage.getItem(PROBE_KEY);
      localStorage.removeItem(PROBE_KEY);
      if (back === 'x') return true;
      writeError = 'silent';        // accepted the write, gave back nothing
      return false;
    } catch (e) {
      writeError = (e && e.name) ? e.name : 'blocked';
      return false;
    }
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return JSON.parse(JSON.stringify(blank));
      var parsed = JSON.parse(raw);
      // Merge onto blank so older saves gain new fields safely
      var out = JSON.parse(JSON.stringify(blank));
      for (var k in parsed) {
        if (Object.prototype.hasOwnProperty.call(parsed, k)) out[k] = parsed[k];
      }
      return out;
    } catch (e) {
      return JSON.parse(JSON.stringify(blank));
    }
  }

  /* ── restore helpers ──
     These exist so a restored snapshot is rebuilt field by field rather than
     trusted wholesale. See `restore` below. */

  function whole(v, max) {
    var n = Math.floor(Number(v));
    if (!isFinite(n) || n < 0) return 0;
    return Math.min(n, max);
  }

  /* topicId -> count. Drops anything that is not a sane non-negative number. */
  function countMap(src) {
    var out = {};
    if (!src || typeof src !== 'object') return out;
    for (var k in src) {
      if (!Object.prototype.hasOwnProperty.call(src, k)) continue;
      var n = Math.floor(Number(src[k]));
      if (isFinite(n) && n > 0) out[k] = n;
    }
    return out;
  }

  /* key -> ISO date string. Used for badges and claimed rewards, where the value
     is only ever displayed, never computed with. */
  function stringMap(src) {
    var out = {};
    if (!src || typeof src !== 'object') return out;
    for (var k in src) {
      if (!Object.prototype.hasOwnProperty.call(src, k)) continue;
      if (src[k]) out[k] = String(src[k]);
    }
    return out;
  }

  function save() {
    state.lastSaved = new Date().toISOString();

    /* Mirrored to her account when the site is hosted. Looked up late rather
       than imported, because this file also has to work opened from a folder,
       where there is no server and no Cloud at all. */
    if (typeof Cloud !== 'undefined' && Cloud.enabled()) {
      Cloud.push(JSON.parse(JSON.stringify(state)));
    }

    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      writeError = null;
      canWrite = true;
    } catch (e) {
      /* Never swallowed. A refused save costs a whole evening's work the moment the
         window closes, and until this was surfaced the app looked perfectly healthy
         right up to that point. `health()` drives the warning she sees. */
      writeError = (e && e.name) ? e.name : 'blocked';
      canWrite = false;
    }
  }

  return {
    POINT_CAP: POINT_CAP,
    BADGE_AT: BADGE_AT,

    get: function () { return state; },

    /* Can this browser actually keep anything, and did it keep anything last time?
       `lastSaved` is deliberately the value read off disk at start-up, not the live
       one — it answers "did the previous session survive?", which is the question. */
    health: function () {
      return {
        ok: canWrite && !writeError,
        why: writeError,
        lastSaved: loadedAt,
        everSaved: !!loadedAt
      };
    },

    points: function () { return state.points; },

    POINTS_PER: POINTS_PER,

    /* Awards points for a correct answer in a scoring mode. Returns how many
       actually landed, which is less than the full amount at the cap. */
    addPoints: function (mode) {
      var worth = POINTS_PER[mode] || 0;
      if (!worth || state.points >= POINT_CAP) return 0;
      var granted = Math.min(worth, POINT_CAP - state.points);
      state.points += granted;
      save();
      return granted;
    },

    isFull: function () { return state.points >= POINT_CAP; },

    /* Records an answer. Returns array of topicIds whose badge just unlocked. */
    recordAnswer: function (topicId, wasCorrect) {
      state.totalAnswered += 1;
      var unlocked = [];
      if (wasCorrect) {
        state.totalCorrect += 1;
        var n = (state.topicCorrect[topicId] || 0) + 1;
        state.topicCorrect[topicId] = n;
        if (n >= BADGE_AT && !state.badges[topicId]) {
          state.badges[topicId] = new Date().toISOString();
          unlocked.push(topicId);
        }
      }
      save();
      return unlocked;
    },

    noteStreak: function (streak) {
      if (streak > state.bestStreak) {
        state.bestStreak = streak;
        save();
      }
    },

    topicCorrect: function (topicId) { return state.topicCorrect[topicId] || 0; },
    hasBadge: function (topicId) { return !!state.badges[topicId]; },
    badgeCount: function () { return Object.keys(state.badges).length; },

    rememberSetup: function (weekId, setup) {
      state.lastSetup[weekId] = setup;
      save();
    },
    recallSetup: function (weekId) { return state.lastSetup[weekId] || null; },

    rememberModule: function (id) {
      if (state.lastModule === id) return;
      state.lastModule = id;
      save();
    },

    hasClaimed: function (threshold) { return !!(state.claimed && state.claimed[threshold]); },

    claim: function (threshold) {
      if (!state.claimed) state.claimed = {};
      if (state.claimed[threshold]) return false;
      state.claimed[threshold] = new Date().toISOString();
      save();
      return true;
    },

    claimedCount: function () {
      return state.claimed ? Object.keys(state.claimed).length : 0;
    },

    /* The schedule is stored as one blob because it is only ever read and
       written whole. Schedule.settings() is what validates its contents; this
       keeps it, nothing more. */
    setSchedule: function (cfg) {
      state.schedule = cfg;
      save();
    },

    motionOn: function () {
      return !state.settings || state.settings.motion !== false;
    },

    setMotion: function (on) {
      if (!state.settings) state.settings = {};
      state.settings.motion = !!on;
      save();
    },

    accuracy: function () {
      if (!state.totalAnswered) return 0;
      return Math.round((state.totalCorrect / state.totalAnswered) * 100);
    },

    /* A copy of everything, for moving to another computer. Deliberately a deep
       copy: the caller must not be able to reach in and mutate live state. */
    snapshot: function () {
      return JSON.parse(JSON.stringify(state));
    },

    /* Replaces everything with a restored snapshot.

       Every field is rebuilt onto `blank` with its type checked, so a corrupted or
       hand-edited code can never leave the app holding a shape it cannot render —
       the worst case is that a bad field silently falls back to its default. */
    restore: function (data) {
      if (!data || typeof data !== 'object') return false;
      var out = JSON.parse(JSON.stringify(blank));

      out.points       = whole(data.points, POINT_CAP);
      out.bestStreak   = whole(data.bestStreak, 1e9);
      out.totalCorrect = whole(data.totalCorrect, 1e9);
      out.totalAnswered= whole(data.totalAnswered, 1e9);

      out.topicCorrect = countMap(data.topicCorrect);
      out.badges       = stringMap(data.badges);
      out.claimed      = stringMap(data.claimed);

      /* Carried across as-is. Every field inside it is re-validated by
         Schedule.settings() on the way out, so a corrupted schedule degrades
         to the defaults rather than to a broken calendar. */
      if (data.schedule && typeof data.schedule === 'object') out.schedule = data.schedule;

      if (data.lastSetup && typeof data.lastSetup === 'object') out.lastSetup = data.lastSetup;
      if (typeof data.lastModule === 'string') out.lastModule = data.lastModule;
      if (data.settings && typeof data.settings === 'object') {
        out.settings = { motion: data.settings.motion !== false };
      }

      /* An answered count below the correct count would render a >100% accuracy. */
      if (out.totalAnswered < out.totalCorrect) out.totalAnswered = out.totalCorrect;

      state = out;
      save();
      return true;
    },

    wipe: function () {
      try { localStorage.removeItem(KEY); } catch (e) {}
      state = JSON.parse(JSON.stringify(blank));
    }
  };
})();
