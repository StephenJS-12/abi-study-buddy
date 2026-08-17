/* Abi's Study Buddy — the reward ladder.
   Points are earned in Test mode (1 per correct answer) and Exam mode (2 per correct
   answer, since those questions are much longer). The bar caps at 1000.

   ONE ladder for every module. Points from any module feed the same bar, so what
   Stephen owes stays the same however many modules she is studying — rather than
   multiplying by four. The cap was raised from 500 to 1000 when the second module
   arrived, by doubling every threshold: the same 24 rewards in the same order,
   each simply twice as far away. No rewards were added to fill the wider gaps.

   Rewards start tiny and easy and grow gradually. Stephen honours these, so keep them
   genuinely doable — the early ones should be claimable on any ordinary evening. */

/* Two kinds of reward.

   MILESTONES are the real ladder: gaps of 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 110,
   120, 120 that never narrow and sum to exactly 1000, so the climb keeps getting steeper
   to the end.

   BOOSTERS sit between the milestones. They are deliberately tiny and near-zero effort, so
   there is always something close enough to be worth pushing for — never more than about
   sixty points away. */

var REWARDS = [
  { at: 20,   kind: 'milestone', emoji: '💋', title: 'A kiss',
    note: 'Claim it whenever. No conditions.' },

  { at: 50,   kind: 'milestone', emoji: '🫂', title: 'A proper long hug',
    note: 'The kind that lasts longer than you expect.' },

  { at: 70,   kind: 'booster',   emoji: '😘', title: 'Three kisses, whenever you want them',
    note: 'Bankable. Use them all at once if you like.' },

  { at: 90,   kind: 'milestone', emoji: '📺', title: 'You pick what we watch',
    note: 'Tonight. No negotiating, no sighing.' },

  { at: 114, kind: 'booster',   emoji: '🤗', title: 'Hugs on demand, all day',
    note: 'Any time you ask, for a whole day.' },

  { at: 140, kind: 'milestone', emoji: '🫖', title: 'Tea or hot chocolate, brought to you',
    note: 'Made exactly how you like it and delivered while you study.' },

  { at: 170, kind: 'booster',   emoji: '💬', title: 'A compliment, written down',
    note: 'Stephen has to actually think about this one.' },

  { at: 200, kind: 'milestone', emoji: '💆', title: 'A fifteen-minute back rub',
    note: 'Timed. Properly fifteen minutes.' },

  { at: 234, kind: 'booster',   emoji: '🍫', title: 'Your favourite snack, fetched',
    note: 'You say the word, it appears.' },

  { at: 270, kind: 'milestone', emoji: '🛌', title: 'A lie-in — Stephen handles the morning',
    note: 'Sleep as late as you want. Everything is dealt with.' },

  { at: 310, kind: 'booster',   emoji: '🎶', title: 'You control the music all evening',
    note: 'Every song. No skipping allowed.' },

  { at: 350, kind: 'milestone', emoji: '🥞', title: 'Breakfast in bed',
    note: 'A weekend morning of your choosing.' },

  { at: 394, kind: 'booster',   emoji: '💅', title: 'Stephen does your nails',
    note: 'Badly, probably. But he does them.' },

  { at: 440, kind: 'milestone', emoji: '🥡', title: 'Takeaway of your choosing',
    note: 'Whatever you fancy, zero debate about it.' },

  { at: 490, kind: 'booster',   emoji: '🥤', title: 'A cold drink brought to you, unasked',
    note: 'It just turns up while you are working.' },

  { at: 540, kind: 'milestone', emoji: '🍽️', title: 'A home-cooked dinner, your choice',
    note: 'You name it, Stephen cooks it and does the washing up.' },

  { at: 594, kind: 'booster',   emoji: '😴', title: 'An undisturbed twenty-minute nap',
    note: 'Phone on silent, no interruptions, door shut.' },

  { at: 650, kind: 'milestone', emoji: '🛁', title: 'A run bath and a pamper night',
    note: 'Candles, face masks, snacks, and your film on.' },

  { at: 704, kind: 'booster',   emoji: '📵', title: 'A phone-free hour together',
    note: 'Both phones away, properly.' },

  { at: 760, kind: 'milestone', emoji: '🧺', title: 'A picnic date',
    note: 'Somewhere nice, with the food packed for you.' },

  { at: 820, kind: 'booster',   emoji: '🚶', title: 'You choose where we walk',
    note: 'Anywhere you fancy. Stephen drives.' },

  { at: 880, kind: 'milestone', emoji: '🌹', title: 'A proper day out, your choice',
    note: 'A whole day somewhere you pick. Dressed up, phones away.' },

  { at: 940, kind: 'booster',   emoji: '🍰', title: 'Something nice from the bakery',
    note: 'Your pick, fetched the same day.' },

  { at: 1000, kind: 'milestone', emoji: '💎', title: 'A small piece of jewellery',
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
