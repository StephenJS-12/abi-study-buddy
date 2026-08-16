/* Abi's Study Buddy — the study helper panel.
 *
 * Lives on the notes pages and nowhere else. Explaining a method belongs
 * beside the notes; it does not belong beside a question she is trying to
 * answer, where the temptation would be to ask it for the answer.
 *
 * The reply streams in, so she sees it being written rather than watching a
 * blank box. Server-sent events arrive as chunks of text that may split a
 * line anywhere, so a buffer holds the remainder between reads.
 */

var Tutor = (function () {

  var ENDPOINT = '/api/tutor';
  var hosted = location.protocol === 'http:' || location.protocol === 'https:';

  var history = [];
  var topicId = null;
  var busy = false;

  function available() { return hosted; }

  /* Each topic gets a fresh conversation. Carrying questions about percentages
     into a chat about standard deviation only confuses things. */
  function reset(id) {
    if (id !== topicId) { history = []; topicId = id; }
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* Paragraph breaks and **bold** only. Deliberately not a full markdown
     renderer: the reply is model output, and the less of it that becomes
     markup the smaller the surface for anything unexpected. */
  function render(plain) {
    return esc(plain)
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .split(/\n{2,}/)
      .map(function (para) { return '<p>' + para.replace(/\n/g, '<br>') + '</p>'; })
      .join('');
  }

  function friendlyError(code) {
    switch (code) {
      case 'daily_limit_reached':
        return 'That is all the questions for today — it resets tomorrow morning. ' +
               'Your notes and the worked solutions are still all here.';
      case 'tutor_not_configured':
      case 'bad_api_key':
        return 'The helper is not set up properly yet. Tell Stephen.';
      case 'rate_limited':
        return 'A bit too fast — give it a few seconds and ask again.';
      case 'not_signed_in':
        return 'You have been signed out. Reload the page to sign back in.';
      default:
        return 'Could not reach the helper just now. Check your internet and try again.';
    }
  }

  /* Reads one SSE stream, handing each new piece of text to `onText`.
     Only text deltas are of interest; every other event type is skipped. */
  function consume(response, onText, done) {
    var reader = response.body.getReader();
    var decoder = new TextDecoder();
    var buffer = '';

    function step() {
      return reader.read().then(function (chunk) {
        if (chunk.done) { done(null); return; }

        buffer += decoder.decode(chunk.value, { stream: true });

        /* A chunk can end mid-line, so the last fragment stays in the buffer
           until the rest of it arrives. */
        var lines = buffer.split('\n');
        buffer = lines.pop();

        for (var i = 0; i < lines.length; i++) {
          var line = lines[i];
          if (line.indexOf('data: ') !== 0) continue;

          try {
            var event = JSON.parse(line.slice(6));
            if (event.type === 'content_block_delta' &&
                event.delta && event.delta.type === 'text_delta') {
              onText(event.delta.text);
            }
          } catch (e) {
            /* A malformed line is not worth abandoning the answer over. */
          }
        }
        return step();
      });
    }

    return step().then(null, function (error) { done(error); });
  }

  /* ── the panel ─────────────────────────────────────────────────── */

  function card() {
    if (!hosted) return '';
    return '<div class="card tutor" id="tutorCard" style="margin-top:1.6rem">' +
      '<h3>💬 Stuck on this bit?</h3>' +
      '<p style="font-size:.9rem;color:var(--ink-soft)">Ask about anything on this page ' +
      'and it will explain it another way. It will not give you answers to the ' +
      'questions — that is the point of it.</p>' +
      '<div class="tutor-thread" id="tutorThread"></div>' +
      '<form class="tutor-ask" id="tutorForm">' +
        '<input class="field" id="tutorInput" type="text" autocomplete="off" ' +
               'placeholder="Why do we divide by n − 1?">' +
        '<button class="btn btn-primary" type="submit" id="tutorSend">Ask</button>' +
      '</form>' +
    '</div>';
  }

  function wire(topic, notesText) {
    if (!hosted) return;

    var form = document.getElementById('tutorForm');
    if (!form) return;

    var input = document.getElementById('tutorInput');
    var send = document.getElementById('tutorSend');
    var thread = document.getElementById('tutorThread');

    reset(topic.id);

    function bubble(who, html) {
      var el = document.createElement('div');
      el.className = 'tutor-msg is-' + who;
      el.innerHTML = html;
      thread.appendChild(el);
      thread.scrollTop = thread.scrollHeight;
      return el;
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (busy) return;

      var question = input.value.trim();
      if (!question) return;

      busy = true;
      send.disabled = true;
      input.value = '';
      bubble('her', '<p>' + esc(question) + '</p>');

      var reply = bubble('them', '<p class="tutor-wait">thinking…</p>');
      var answer = '';

      fetch(ENDPOINT, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicId: topic.id,
          topicTitle: topic.title,
          notes: notesText,
          question: question,
          history: history
        })
      }).then(function (response) {
        if (response.ok && response.body) {
          consume(response, function (piece) {
            answer += piece;
            reply.innerHTML = render(answer);
            thread.scrollTop = thread.scrollHeight;
          }, function (error) {
            if (error && !answer) reply.innerHTML = '<p>' + esc(friendlyError()) + '</p>';
            if (answer) {
              history.push({ role: 'user', content: question });
              history.push({ role: 'assistant', content: answer });
            }
            busy = false;
            send.disabled = false;
            input.focus();
          });
          return;
        }

        return response.json().then(null, function () { return {}; })
          .then(function (body) {
            reply.innerHTML = '<p>' + esc(friendlyError(body && body.error)) + '</p>';
            busy = false;
            send.disabled = false;
          });
      }).then(null, function () {
        reply.innerHTML = '<p>' + esc(friendlyError()) + '</p>';
        busy = false;
        send.disabled = false;
      });
    });
  }

  return {
    available: available,
    card: card,
    wire: wire
  };
})();
