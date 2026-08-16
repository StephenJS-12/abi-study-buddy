/* Abi's Study Buddy — talking to Pip.
 *
 * Transport only: builds the request, streams the reply back a piece at a
 * time, and turns failures into something worth reading. The character and
 * the panel live in buddy.js.
 */

var Tutor = (function () {

  var ENDPOINT = '/api/tutor';
  var hosted = location.protocol === 'http:' || location.protocol === 'https:';

  function available() { return hosted; }

  /* Everything that gets sent, built in one place and by naming each field
     rather than spreading the context object.

     That is the whole point: the caller in quiz.js holds the live question,
     its answer and its worked solution together. Listing the fields by hand
     means a future change there cannot accidentally widen what travels — a
     tutor that was never told the answer cannot let it slip, however it is
     asked, which is a guarantee no prompt wording can give. */
  function payload(context, question, past) {
    return {
      topicId: context.id,
      topicTitle: context.title,
      mode: context.mode || 'notes',
      notes: context.notes || '',
      questionText: context.questionText || '',
      question: question,
      history: past
    };
  }

  function friendlyError(code) {
    switch (code) {
      case 'daily_limit_reached':
        return 'That is all my questions for today, sorry! I will be back in the ' +
               'morning. Your notes and the worked solutions are all still here.';
      case 'no_credit':
        return 'I have run out of credit and cannot think until Stephen tops it up. ' +
               'Show him this and he will know what it means.';
      case 'tutor_not_configured':
      case 'bad_api_key':
        return 'I am not plugged in properly yet — tell Stephen and he will sort it.';
      case 'rate_limited':
        return 'Ooh, a bit fast for me. Give me a few seconds and ask again.';
      case 'not_signed_in':
        return 'You have been signed out. Reload the page to sign back in.';
      default:
        return 'I could not reach my brain just then. Check your internet and try again.';
    }
  }

  /* Reads one server-sent-event stream, handing each new piece of text to
     `onText`. A chunk can end mid-line, so the remainder waits in a buffer
     until the rest of it arrives. */
  function consume(response, onText, done) {
    var reader = response.body.getReader();
    var decoder = new TextDecoder();
    var buffer = '';

    function step() {
      return reader.read().then(function (chunk) {
        if (chunk.done) { done(null); return; }

        buffer += decoder.decode(chunk.value, { stream: true });

        var lines = buffer.split('\n');
        buffer = lines.pop();

        for (var i = 0; i < lines.length; i++) {
          if (lines[i].indexOf('data: ') !== 0) continue;
          try {
            var event = JSON.parse(lines[i].slice(6));
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

  /* ask(context, question, history, onText, onDone)
     onDone receives null on success, or a message worth showing her. */
  function ask(context, question, history, onText, onDone) {
    if (!hosted) { onDone(friendlyError()); return; }

    fetch(ENDPOINT, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload(context, question, history))
    }).then(function (response) {
      if (response.ok && response.body) {
        var sawText = false;
        consume(response, function (piece) { sawText = true; onText(piece); },
          function (error) {
            onDone(error && !sawText ? friendlyError() : null);
          });
        return;
      }

      return response.json().then(null, function () { return {}; })
        .then(function (body) {
          /* Logged so the real reason is one console away. The bubble stays
             friendly; a stack of upstream jargon would only worry her. */
          if (window.console && body && body.error) {
            console.log('tutor error:', body.error, body.status || '', body.message || '');
          }
          onDone(friendlyError(body && body.error));
        });
    }).then(null, function () { onDone(friendlyError()); });
  }

  return {
    available: available,
    payload: payload,
    ask: ask
  };
})();
