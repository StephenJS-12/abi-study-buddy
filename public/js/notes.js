/* Abi's Study Buddy — interactive notes rendering
   Used both by the Notes section and by the hideable helper panel in Practise mode. */

var Notes = (function () {

  /* Full expandable note blocks for a topic (Notes section) */
  function renderBlocks(topic, openFirst) {
    var blocks = topic.notes || [];
    if (!blocks.length) {
      return '<div class="empty"><span class="em">🌸</span>Notes for this topic are on their way.</div>';
    }

    return blocks.map(function (b, i) {
      var open = (openFirst && i === 0) ? ' is-open' : '';
      return '' +
        '<section class="noteblock' + open + '" data-note="' + i + '">' +
          '<button class="noteblock-bar" type="button" data-noteToggle="' + i + '" ' +
                  'aria-expanded="' + (open ? 'true' : 'false') + '">' +
            '<span class="em">' + (b.emoji || '📘') + '</span>' +
            '<span>' + b.heading + '</span>' +
            '<span class="spin">▾</span>' +
          '</button>' +
          '<div class="noteblock-body"' + (open ? '' : ' hidden') + '>' + b.html + '</div>' +
        '</section>';
    }).join('');
  }

  /* Condensed helper used inside Practise mode — every block, stacked, no accordion */
  function renderHelper(topic) {
    var blocks = topic.notes || [];
    if (!blocks.length) return '<p>No notes available for this topic yet.</p>';
    return blocks.map(function (b) {
      return '<h4>' + (b.emoji || '📘') + ' ' + b.heading + '</h4>' + b.html;
    }).join('');
  }

  /* Wires up the accordion buttons inside a container */
  function bind(root) {
    var btns = root.querySelectorAll('[data-noteToggle]');
    Array.prototype.forEach.call(btns, function (btn) {
      btn.addEventListener('click', function () {
        var block = btn.closest('.noteblock');
        var body = block.querySelector('.noteblock-body');
        var isOpen = block.classList.toggle('is-open');
        body.hidden = !isOpen;
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    });
  }

  return {
    renderBlocks: renderBlocks,
    renderHelper: renderHelper,
    bind: bind
  };
})();
