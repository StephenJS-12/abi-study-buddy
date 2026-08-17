/* Abi's Study Buddy — the things the site says to her.
 *
 * Stephen built this for his girlfriend, and it should sound like it. The
 * wording used to read like a product: correct, neutral, and written by
 * nobody in particular. These are the lines that make it sound like it came
 * from him.
 *
 * Kept warm and ordinary — the sort of thing you say in passing, not a
 * declaration. Anything that would make her wince if a friend read it over
 * her shoulder does not belong here.
 */

var Copy = (function () {

  /* Picked at random, but never the same one twice running — repetition is
     what makes a canned line feel canned. */
  var lastPicked = {};

  function pick(key, list) {
    if (list.length < 2) return list[0] || '';
    var choice;
    do {
      choice = list[Math.floor(Math.random() * list.length)];
    } while (choice === lastPicked[key]);
    lastPicked[key] = choice;
    return choice;
  }

  var MORNING = [
    'Goood morning, sunshine 😘',
    'Morning, gorgeous ☀️',
    'Morning you 💛',
    'Hey sleepyhead ☕',
    'Up early, look at you 🌻',
    'Morning, beautiful ✨'
  ];

  var AFTERNOON = [
    'Afternoon, gorgeous 💕',
    'Hey you ☀️',
    'Hallo, beautiful 💛',
    'Afternoon, lovely 🌼',
    'Hey trouble 😄',
    'Look who it is 💜'
  ];

  var EVENING = [
    'Evening, gorgeous ❤️',
    'Hey beautiful 🌙',
    'Evening you 💜',
    'Hallo, lovely 🌸',
    'Evening, my clever one ✨',
    'Hey gorgeous 💗'
  ];

  var LATE = [
    'Still up? 🌙',
    'Late one tonight, hey 💛',
    'Burning the midnight oil 🕯️',
    'You should be asleep 😘',
    'Night owl 🦉'
  ];

  /* Shown on a module's own home screen, under its emoji. */
  var MODULE_HELLOS = [
    'Right then — what are we doing? 💛',
    'Okay, let\'s get into it ✨',
    'You\'ve got this, you know 💗',
    'Ready when you are 🌸',
    'Let\'s do a bit then 💜',
    'Come on, one round 😊',
    'Look at you, being all organised ✨'
  ];

  function greeting() {
    var h = new Date().getHours();
    if (h < 5) return pick('greeting', LATE);
    if (h < 12) return pick('greeting', MORNING);
    if (h < 17) return pick('greeting', AFTERNOON);
    if (h < 23) return pick('greeting', EVENING);
    return pick('greeting', LATE);
  }

  function moduleHello() {
    return pick('moduleHello', MODULE_HELLOS);
  }

  return {
    greeting: greeting,
    moduleHello: moduleHello,

    /* Exposed so the pools can be checked by the tests rather than only by
       reading them. */
    pools: function () {
      return {
        morning: MORNING, afternoon: AFTERNOON, evening: EVENING,
        late: LATE, moduleHello: MODULE_HELLOS
      };
    }
  };
})();
