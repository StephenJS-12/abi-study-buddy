/* Abi's Study Buddy — content registry
   Turns the raw week data files into lookups the rest of the app uses. */

var Content = (function () {

  /* Whichever module she is working on. Everything below this line is written
     against these three variables, so switching module is one call rather than
     a change threaded through every screen. */
  var moduleId = null;
  var weeks = [];
  var exams = [];
  var topicIndex = {};   // topicId -> { topic, week }  (covers lesson AND exam topics)

  function byNumber(a, b) { return a.number - b.number; }

  /* Points the app at one module's content. Safe to call repeatedly with the
     same id — it simply rebuilds the same index. */
  function use(id) {
    var bucket = Modules.contentFor(id);

    moduleId = id;
    weeks = (bucket.weeks || []).slice().sort(byNumber);

    /* Exam papers are a separate bank entirely — nothing crosses between them
       and the practise/test questions in either direction. */
    exams = (bucket.exams || []).slice().sort(byNumber);

    topicIndex = {};
    weeks.forEach(function (w) {
      (w.topics || []).forEach(function (t) { topicIndex[t.id] = { topic: t, week: w }; });
    });
    exams.forEach(function (e) {
      (e.topics || []).forEach(function (t) { topicIndex[t.id] = { topic: t, week: e }; });
    });
  }

  function questionCount(topic) {
    return (topic.questions || []).length;
  }

  return {
    use: use,
    moduleId: function () { return moduleId; },
    module: function () { return moduleId ? Modules.get(moduleId) : null; },

    weeks: function () { return weeks; },

    week: function (id) {
      for (var i = 0; i < weeks.length; i++) {
        if (weeks[i].id === id) return weeks[i];
      }
      return null;
    },

    topic: function (id) {
      return topicIndex[id] ? topicIndex[id].topic : null;
    },

    weekOfTopic: function (id) {
      return topicIndex[id] ? topicIndex[id].week : null;
    },

    allTopics: function () {
      var out = [];
      weeks.forEach(function (w) {
        (w.topics || []).forEach(function (t) { out.push(t); });
      });
      return out;
    },

    questionCount: questionCount,

    /* Total questions available across a set of topic ids */
    poolSize: function (topicIds) {
      var n = 0;
      topicIds.forEach(function (id) {
        var t = topicIndex[id];
        if (t) n += questionCount(t.topic);
      });
      return n;
    },

    /* The exam paper for a given lesson week, or null if it has none yet. */
    examFor: function (weekId) {
      for (var i = 0; i < exams.length; i++) {
        if (exams[i].weekId === weekId) return exams[i];
      }
      return null;
    },

    hasExam: function (weekId) {
      var e = null;
      for (var i = 0; i < exams.length; i++) if (exams[i].weekId === weekId) e = exams[i];
      return !!(e && (e.topics || []).length);
    },

    /* True if every chosen topic can generate fresh questions on demand. */
    isUnlimited: function (topicIds) {
      if (!topicIds.length) return false;
      for (var i = 0; i < topicIds.length; i++) {
        if (!GEN.has(topicIds[i])) return false;
      }
      return true;
    },

    anyGenerators: function (topicIds) {
      for (var i = 0; i < topicIds.length; i++) {
        if (GEN.has(topicIds[i])) return true;
      }
      return false;
    },

    /* Gathers questions from the chosen topics, tagged with their topic.
       Hand-written questions always go in; generators then top the pool up so
       that a single topic can still fill a 30-question test. */
    gather: function (topicIds, needed) {
      var out = [];

      function tag(q, topic) {
        var copy = {};
        for (var k in q) {
          if (Object.prototype.hasOwnProperty.call(q, k)) copy[k] = q[k];
        }
        copy._topicId = topic.id;
        copy._topicTitle = topic.title;
        copy._topicEmoji = topic.emoji;
        return copy;
      }

      topicIds.forEach(function (id) {
        var entry = topicIndex[id];
        if (!entry) return;
        (entry.topic.questions || []).forEach(function (q) {
          out.push(tag(q, entry.topic));
        });
      });

      if (needed && needed > 0) {
        // Enough generated questions that the shuffle has real choice, even for one topic
        var perTopic = Math.ceil(needed / topicIds.length) + 4;
        topicIds.forEach(function (id) {
          var entry = topicIndex[id];
          if (!entry || !GEN.has(id)) return;
          GEN.make(id, perTopic).forEach(function (q) {
            out.push(tag(q, entry.topic));
          });
        });
      }

      return out;
    },

    readyWeeks: function () {
      return weeks.filter(function (w) { return !w.comingSoon && (w.topics || []).length; });
    },

    totalQuestions: function () {
      var n = 0;
      weeks.forEach(function (w) {
        (w.topics || []).forEach(function (t) { n += questionCount(t); });
      });
      return n;
    }
  };
})();
