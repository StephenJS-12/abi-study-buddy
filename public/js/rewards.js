/* Abi's Study Buddy — the reward ladder.
   Points are earned in Test mode (1 per correct answer) and Exam mode (2 per correct
   answer, since those questions are much longer). The bar caps at 500.

   Rewards start tiny and easy and grow gradually. Stephen honours these, so keep them
   genuinely doable — the early ones should be claimable on any ordinary evening. */

/* Two kinds of reward.

   MILESTONES are the real ladder: gaps of 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 55, 60, 60
   that never narrow and sum to exactly 500, so the climb keeps getting steeper to the end.

   BOOSTERS sit between the milestones. They are deliberately tiny and near-zero effort, so
   there is always something close enough to be worth pushing for — never more than about
   twenty points away. */

var REWARDS = [
  { at: 10,  kind: 'milestone', emoji: '💋', title: 'A kiss',
    note: 'Claim it whenever. No conditions.' },

  { at: 25,  kind: 'milestone', emoji: '🫂', title: 'A proper long hug',
    note: 'The kind that lasts longer than you expect.' },

  { at: 35,  kind: 'booster',   emoji: '😘', title: 'Three kisses, whenever you want them',
    note: 'Bankable. Use them all at once if you like.' },

  { at: 45,  kind: 'milestone', emoji: '📺', title: 'You pick what we watch',
    note: 'Tonight. No negotiating, no sighing.' },

  { at: 57,  kind: 'booster',   emoji: '🤗', title: 'Hugs on demand, all day',
    note: 'Any time you ask, for a whole day.' },

  { at: 70,  kind: 'milestone', emoji: '🫖', title: 'Tea or hot chocolate, brought to you',
    note: 'Made exactly how you like it and delivered while you study.' },

  { at: 85,  kind: 'booster',   emoji: '💬', title: 'A compliment, written down',
    note: 'Stephen has to actually think about this one.' },

  { at: 100, kind: 'milestone', emoji: '💆', title: 'A fifteen-minute back rub',
    note: 'Timed. Properly fifteen minutes.' },

  { at: 117, kind: 'booster',   emoji: '🍫', title: 'Your favourite snack, fetched',
    note: 'You say the word, it appears.' },

  { at: 135, kind: 'milestone', emoji: '🛌', title: 'A lie-in — Stephen handles the morning',
    note: 'Sleep as late as you want. Everything is dealt with.' },

  { at: 155, kind: 'booster',   emoji: '🎶', title: 'You control the music all evening',
    note: 'Every song. No skipping allowed.' },

  { at: 175, kind: 'milestone', emoji: '🥞', title: 'Breakfast in bed',
    note: 'A weekend morning of your choosing.' },

  { at: 197, kind: 'booster',   emoji: '💅', title: 'Stephen does your nails',
    note: 'Badly, probably. But he does them.' },

  { at: 220, kind: 'milestone', emoji: '🥡', title: 'Takeaway of your choosing',
    note: 'Whatever you fancy, zero debate about it.' },

  { at: 245, kind: 'booster',   emoji: '🥤', title: 'A cold drink brought to you, unasked',
    note: 'It just turns up while you are working.' },

  { at: 270, kind: 'milestone', emoji: '🍽️', title: 'A home-cooked dinner, your choice',
    note: 'You name it, Stephen cooks it and does the washing up.' },

  { at: 297, kind: 'booster',   emoji: '😴', title: 'An undisturbed twenty-minute nap',
    note: 'Phone on silent, no interruptions, door shut.' },

  { at: 325, kind: 'milestone', emoji: '🛁', title: 'A run bath and a pamper night',
    note: 'Candles, face masks, snacks, and your film on.' },

  { at: 352, kind: 'booster',   emoji: '📵', title: 'A phone-free hour together',
    note: 'Both phones away, properly.' },

  { at: 380, kind: 'milestone', emoji: '🧺', title: 'A picnic date',
    note: 'Somewhere nice, with the food packed for you.' },

  { at: 410, kind: 'booster',   emoji: '🚶', title: 'You choose where we walk',
    note: 'Anywhere you fancy. Stephen drives.' },

  { at: 440, kind: 'milestone', emoji: '🌹', title: 'A proper day out, your choice',
    note: 'A whole day somewhere you pick. Dressed up, phones away.' },

  { at: 470, kind: 'booster',   emoji: '🍰', title: 'Something nice from the bakery',
    note: 'Your pick, fetched the same day.' },

  { at: 500, kind: 'milestone', emoji: '💎', title: 'A small piece of jewellery',
    note: 'You made it to 500. Genuinely well done.' }
];

var Rewards = (function () {

  function all() { return REWARDS; }

  function state(reward, points) {
    if (Store.hasClaimed(reward.at)) return 'claimed';
    return points >= reward.at ? 'ready' : 'locked';
  }

  function readyCount(points) {
    var n = 0;
    for (var i = 0; i < REWARDS.length; i++) {
      if (state(REWARDS[i], points) === 'ready') n++;
    }
    return n;
  }

  /* The next reward she has not yet reached, for the nudge on the home screen. */
  function next(points) {
    for (var i = 0; i < REWARDS.length; i++) {
      if (points < REWARDS[i].at) return REWARDS[i];
    }
    return null;
  }

  /* Progress toward the NEXT reward, not toward 500.

     Measuring the bar against the full 500 made a single point worth 0.2% of its width,
     which rounds to nothing and looks broken. Between thresholds the gaps are 10–60, so
     every single point visibly moves the bar. */
  function progress(points) {
    var prev = 0, next = null;
    for (var i = 0; i < REWARDS.length; i++) {
      if (points < REWARDS[i].at) { next = REWARDS[i]; break; }
      prev = REWARDS[i].at;
    }
    if (!next) return { pct: 100, next: null, prev: prev, need: 0 };
    var span = next.at - prev;
    var into = points - prev;
    return {
      pct: Math.max(0, Math.min(100, Math.round((into / span) * 100))),
      next: next,
      prev: prev,
      need: next.at - points
    };
  }

  /* Any reward whose threshold sits in (before, after] — i.e. just unlocked. */
  function newlyUnlocked(before, after) {
    var out = [];
    for (var i = 0; i < REWARDS.length; i++) {
      if (REWARDS[i].at > before && REWARDS[i].at <= after) out.push(REWARDS[i]);
    }
    return out;
  }

  return { all: all, state: state, readyCount: readyCount, next: next,
           newlyUnlocked: newlyUnlocked, progress: progress };
})();
