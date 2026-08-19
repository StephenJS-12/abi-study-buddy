/* Abi's Study Buddy — Pip.
 *
 * A small creature in the bottom-right corner of every screen. Tap her and she
 * opens a chat panel; the rest of the time she blinks, bobs, and reacts to how
 * the revision is going.
 *
 * What Pip is allowed to say depends entirely on where Abi is. The screens set
 * that with setContext(); Pip herself never decides. In a test she may nudge
 * and nothing more — see src/tutor.js for the rules each mode carries.
 */

var Buddy = (function () {

  var hosted = location.protocol === 'http:' || location.protocol === 'https:';

  var context = { mode: 'app', id: 'app', title: 'Abi\'s Study Buddy' };
  var history = [];
  var thread = null;
  var panel = null;
  var root = null;
  var open = false;
  var busy = false;

  /* Openers, so she is not greeted by an empty box. Kept short — the point is
     to make starting easy, not to fill the panel with chatter. */
  var HELLOS = {
    /* Deliberately does not name a subject. This started as a maths site and
       the greeting said so, which was quietly wrong from the day the business
       module went in — and would be wrong again for whatever comes next. */
    app: 'Hallo hallo! 🥑 Ask me anything — whatever you are studying, or how this whole place works.',
    notes: 'Ooh, reading time. Poke me about any bit that refuses to stick.',
    practise: 'I can talk you through how to tackle this one. Not the actual answer though — that bit is yours.',
    test: 'Test mode! I can only nudge here. Where to start, what it is really asking. Go on then.',
    exam: 'Exam question — the proper stuff. I will help you find your first move and then get out of your way.'
  };

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* Paragraphs and **bold** only. Deliberately not a markdown renderer: this
     is model output, and the less of it that becomes markup the better. */
  function render(plain) {
    return esc(plain)
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .split(/\n{2,}/)
      .map(function (para) { return '<p>' + para.replace(/\n/g, '<br>') + '</p>'; })
      .join('');
  }

  /* ── the character ─────────────────────────────────────────────── */

  /* Pip is an avocado. Drawn rather than an emoji so the parts can move
     separately — she blinks, her leaf sways, and the stone bounces on its own
     when she is pleased. An emoji can only ever sit there.

     Everything animated carries its own class, so the CSS can move one piece
     without disturbing the rest. */
  /* `tag` keeps the gradient ids unique per copy of her.
     Pip is drawn twice — once on the button, once in the panel header — and an
     id may only exist once on a page. With both copies calling their gradient
     "pipSkin", every fill resolved to whichever came first in the document:
     the one inside the panel, which is hidden until she is opened. So her skin,
     flesh and stone painted with nothing, and she sat in the corner as a leaf
     and a floating face until you clicked her. The parts that stayed visible
     were exactly the ones drawn with a plain colour rather than a gradient. */
  function face(tag) {
    var skin = 'pipSkin-' + tag, flesh = 'pipFlesh-' + tag, stone = 'pipStone-' + tag;
    return '<svg viewBox="0 0 64 64" class="pip-face" aria-hidden="true">' +
      '<defs>' +
        '<linearGradient id="' + skin + '" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#5E8C3E"/><stop offset="1" stop-color="#416B2A"/>' +
        '</linearGradient>' +
        '<linearGradient id="' + flesh + '" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#E4F3B8"/><stop offset="1" stop-color="#C7E48C"/>' +
        '</linearGradient>' +
        '<linearGradient id="' + stone + '" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#B87A4A"/><stop offset="1" stop-color="#96552F"/>' +
        '</linearGradient>' +
      '</defs>' +

      '<g class="pip-whole">' +
        /* Stalk and leaf, sitting above the fruit so the sway reads clearly. */
        '<g class="pip-leaf">' +
          '<path d="M32 11 C32 7 33 5 34 3" stroke="#6B4A2A" stroke-width="2" ' +
            'fill="none" stroke-linecap="round"/>' +
          '<path d="M34 6 C40 2 46 4 46 8 C46 12 39 13 34 9 Z" fill="#7FBF4F"/>' +
        '</g>' +

        /* Skin, then flesh inset from it — the dark rim is what makes it read
           as an avocado rather than a pear. */
        '<path class="pip-skin" fill="url(#' + skin + ')" d="M32 10 C21 10 15 21 15 31 ' +
          'C15 46 22 59 32 59 C42 59 49 46 49 31 C49 21 43 10 32 10 Z"/>' +
        '<path fill="url(#' + flesh + ')" d="M32 14 C24 14 19 23 19 31 ' +
          'C19 44 25 55 32 55 C39 55 45 44 45 31 C45 23 40 14 32 14 Z"/>' +

        '<g class="pip-stone">' +
          '<circle cx="32" cy="37" r="11.5" fill="url(#' + stone + ')"/>' +
          '<ellipse cx="28" cy="32" rx="3" ry="2" fill="#D89A6A" opacity=".45"/>' +

          '<g class="pip-eyes">' +
            '<ellipse cx="27.5" cy="35" rx="1.9" ry="2.4" fill="#3B2415"/>' +
            '<ellipse cx="36.5" cy="35" rx="1.9" ry="2.4" fill="#3B2415"/>' +
            '<circle cx="28.2" cy="34.2" r=".7" fill="#fff"/>' +
            '<circle cx="37.2" cy="34.2" r=".7" fill="#fff"/>' +
          '</g>' +

          '<path class="pip-smile" d="M28.5 40.5 Q32 43.6 35.5 40.5" stroke="#3B2415" ' +
            'stroke-width="1.7" fill="none" stroke-linecap="round"/>' +
          '<circle cx="23.5" cy="39" r="2.1" fill="#FF9EC4" opacity=".5"/>' +
          '<circle cx="40.5" cy="39" r="2.1" fill="#FF9EC4" opacity=".5"/>' +
        '</g>' +
      '</g>' +
    '</svg>';
  }

  function mount() {
    if (!hosted) return;

    root = document.createElement('div');
    root.className = 'pip';
    root.innerHTML =
      '<div class="pip-panel" id="pipPanel" hidden>' +
        '<div class="pip-panel-head">' +
          '<span class="pip-head-face">' + face('head') + '</span>' +
          '<span class="pip-head-text">' +
            '<span class="pip-name">Pip</span>' +
            '<span class="pip-status" id="pipStatus">here to help 💚</span>' +
          '</span>' +
          '<button class="pip-close" type="button" id="pipClose" aria-label="Close">×</button>' +
        '</div>' +
        '<div class="pip-thread" id="pipThread"></div>' +
        '<form class="pip-ask" id="pipForm">' +
          '<input id="pipInput" type="text" autocomplete="off" placeholder="Ask me anything…">' +
          '<button type="submit" id="pipSend" aria-label="Send">' +
            '<span class="pip-send-icon">🚀</span></button>' +
        '</form>' +
        /* The little point at the bottom, aimed at Pip herself, so the panel
           reads as her talking rather than as a widget that appeared. */
        '<span class="pip-tail" aria-hidden="true"></span>' +
      '</div>' +
      '<button class="pip-button" id="pipButton" type="button" aria-label="Ask Pip">' +
        face('button') +
        '<span class="pip-ping" id="pipPing" hidden></span>' +
      '</button>';

    document.body.appendChild(root);

    panel = document.getElementById('pipPanel');
    thread = document.getElementById('pipThread');

    document.getElementById('pipButton').addEventListener('click', toggle);
    document.getElementById('pipClose').addEventListener('click', function () { toggle(false); });
    document.getElementById('pipForm').addEventListener('submit', onAsk);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && open) toggle(false);
    });
  }

  function toggle(force) {
    open = typeof force === 'boolean' ? force : !open;
    panel.hidden = !open;
    root.classList.toggle('is-open', open);
    document.getElementById('pipPing').hidden = true;

    if (open) {
      if (!thread.childNodes.length) {
        say(HELLOS[context.mode] || HELLOS.app);
      }
      setTimeout(function () { document.getElementById('pipInput').focus(); }, 60);
    }
  }

  function bubble(who, html) {
    var el = document.createElement('div');
    el.className = 'pip-msg is-' + who;
    el.innerHTML = html;
    thread.appendChild(el);
    thread.scrollTop = thread.scrollHeight;
    return el;
  }

  function say(text) { return bubble('pip', '<p>' + esc(text) + '</p>'); }

  function setStatus(text) {
    var el = document.getElementById('pipStatus');
    if (el) el.textContent = text;
  }

  function onAsk(event) {
    event.preventDefault();
    if (busy) return;

    var input = document.getElementById('pipInput');
    var question = input.value.trim();
    if (!question) return;

    busy = true;
    input.value = '';
    document.getElementById('pipSend').disabled = true;
    root.classList.add('is-thinking');
    setStatus('thinking…');

    bubble('her', '<p>' + esc(question) + '</p>');
    var reply = bubble('pip', '<span class="pip-dots"><i></i><i></i><i></i></span>');
    var answer = '';

    Tutor.ask(context, question, history,
      function (piece) {
        answer += piece;
        reply.innerHTML = render(answer);
        thread.scrollTop = thread.scrollHeight;
      },
      function (problem) {
        if (problem && !answer) {
          reply.innerHTML = '<p>' + esc(problem) + '</p>';
          reply.className = 'pip-msg is-pip is-sorry';
        } else if (answer) {
          history.push({ role: 'user', content: question });
          history.push({ role: 'assistant', content: answer });
        }
        busy = false;
        document.getElementById('pipSend').disabled = false;
        root.classList.remove('is-thinking');
        setStatus('here to help 💚');
        input.focus();
      });
  }

  /* ── what the screens tell her ─────────────────────────────────── */

  /* Called whenever the screen changes. A new question is a new problem, so
     the conversation starts over rather than carrying old hints into it —
     otherwise Pip would keep nudging about something Abi has moved past. */
  function setContext(next) {
    if (!hosted) return;

    var previous = context;
    context = next || { mode: 'app', id: 'app', title: 'Abi\'s Study Buddy' };

    var wasOn = previous.id + '|' + (previous.questionText || '');
    var nowOn = context.id + '|' + (context.questionText || '');
    if (wasOn !== nowOn) {
      history = [];
      if (thread) thread.innerHTML = '';
    }
  }

  /* A small cheer when she gets one right. Pip should feel like she is
     watching, not like a button that happens to be there. */
  function cheer() {
    if (!root) return;
    root.classList.remove('is-happy');
    void root.offsetWidth;
    root.classList.add('is-happy');
  }

  return {
    mount: mount,
    setContext: setContext,
    cheer: cheer,
    open: function () { if (root) toggle(true); }
  };
})();
