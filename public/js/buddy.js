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
    app: 'Hallo! Ask me anything — about the maths, or about how this place works.',
    notes: 'Reading through? Ask me about any bit that will not stick.',
    practise: 'I can talk you through how to approach this one. Just not the actual sum.',
    test: 'Test time! I can only nudge you here — where to start, what it is really asking.',
    exam: 'Exam question. I will help you find your first move, but the rest is yours.'
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

  /* Drawn rather than an emoji so she can blink, and so she looks like she
     belongs to this site rather than to whichever phone is showing her. */
  function face() {
    return '<svg viewBox="0 0 64 64" class="pip-face" aria-hidden="true">' +
      '<defs><linearGradient id="pipSkin" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#E9E0FF"/><stop offset="1" stop-color="#FFC9E0"/>' +
      '</linearGradient></defs>' +
      '<path class="pip-body" fill="url(#pipSkin)" d="M32 4l6.2 12.8L52 12l-4.2 14.2L60 32' +
        'l-12.2 5.8L52 52l-13.8-4.8L32 60l-6.2-12.8L12 52l4.2-14.2L4 32l12.2-5.8L12 12' +
        'l13.8 4.8z"/>' +
      '<g class="pip-eyes">' +
        '<ellipse cx="26" cy="30" rx="3" ry="3.6" fill="#4A3457"/>' +
        '<ellipse cx="38" cy="30" rx="3" ry="3.6" fill="#4A3457"/>' +
      '</g>' +
      '<path class="pip-smile" d="M27 38 Q32 42.5 37 38" stroke="#4A3457" stroke-width="2.2" ' +
        'fill="none" stroke-linecap="round"/>' +
      '<circle cx="21" cy="36" r="2.6" fill="#FF9EC4" opacity=".55"/>' +
      '<circle cx="43" cy="36" r="2.6" fill="#FF9EC4" opacity=".55"/>' +
    '</svg>';
  }

  function mount() {
    if (!hosted) return;

    root = document.createElement('div');
    root.className = 'pip';
    root.innerHTML =
      '<div class="pip-panel" id="pipPanel" hidden>' +
        '<div class="pip-panel-head">' +
          '<span class="pip-name">Pip</span>' +
          '<button class="pip-close" type="button" id="pipClose" aria-label="Close">×</button>' +
        '</div>' +
        '<div class="pip-thread" id="pipThread"></div>' +
        '<form class="pip-ask" id="pipForm">' +
          '<input id="pipInput" type="text" autocomplete="off" placeholder="Ask me anything…">' +
          '<button type="submit" id="pipSend" aria-label="Send">➤</button>' +
        '</form>' +
      '</div>' +
      '<button class="pip-button" id="pipButton" type="button" aria-label="Ask Pip">' +
        face() +
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
      if (!thread.childNodes.length) say(HELLOS[context.mode] || HELLOS.app);
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
