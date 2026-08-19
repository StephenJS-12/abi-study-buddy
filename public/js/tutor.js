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
  /* Modes in which she is entitled to see the material. In a test or an exam
     the notes are hidden on purpose, and fetching them for her because she
     named a topic in a question to Pip would walk straight around that. */
  var MAY_LOOK_UP = { notes: true, practise: true, app: true };

  function payload(context, question, past) {
    var mode = context.mode || 'notes';
    var notes = context.notes || '';
    var title = context.title;
    var notesOpen = !!notes;

    /* Pip could only ever discuss the page Abi was standing on, because the
       page was the only thing that sent her any material. Ask about standard
       deviation from the home screen and she had nothing to work from.
       So: if the question names a topic and Abi is somewhere she is allowed to
       read, that topic's notes travel too. */
    if (!notes && MAY_LOOK_UP[mode]) {
      var found = Content.findByQuestion(question);
      if (found) {
        notes = Content.notesText(found);
        title = found.title;
      }
    }

    return {
      topicId: context.id,
      topicTitle: title,
      /* Which module she is in, so the tutor is briefed on the right subject.
         Empty on the home screen, where she has not picked one. */
      moduleId: context.moduleId || '',
      mode: mode,
      notes: notes,
      /* False when the notes were looked up because she named the topic, so
         Pip does not talk about "the box above" when there isn't one. */
      notesOpen: notesOpen,
      /* The course contents — week, lesson and topic names, no content. Sent
         always, so Pip knows what is actually in the module and can talk about
         any of it, point Abi at where it lives, and say plainly when something
         she has asked about is not on the syllabus. Titles are not answers, so
         this is safe in a test; it also sits inside the cached part of the
         prompt, so it is paid for roughly once. */
      outline: Content.outline(),
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
