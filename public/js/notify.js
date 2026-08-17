/* Abi's Study Buddy — telling Stephen something.
 *
 * Two callers: the feedback box in Settings, and claiming a reward. Both go
 * to the same endpoint, which keeps a copy before attempting the email — a
 * message she took the trouble to write should not depend on a mail provider
 * being reachable.
 */

var Notify = (function () {

  var ENDPOINT = '/api/notify';
  var hosted = location.protocol === 'http:' || location.protocol === 'https:';

  /* send(kind, message, context, done)
     `done` receives true when the message was safely kept. Whether the email
     itself got out is Stephen's problem, not hers — she is told it arrived
     because, as far as she is concerned, it has. */
  function send(kind, message, context, done) {
    if (!hosted) { if (done) done(false); return; }

    fetch(ENDPOINT, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: kind, message: message, context: context || '' })
    }).then(function (response) {
      return response.json().then(null, function () { return {}; });
    }).then(function (body) {
      /* Surfaced to the console rather than the page: if the email failed but
         the record was kept, that is worth knowing when debugging and worth
         nothing to her. */
      if (body && body.emailProblem && window.console) {
        console.log('notify: stored, but email failed —', body.emailProblem);
      }
      if (done) done(!!(body && body.ok));
    }).then(null, function () {
      if (done) done(false);
    });
  }

  return { send: send };
})();
