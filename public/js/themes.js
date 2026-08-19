/* Abi's Study Buddy — a colour per module.
 *
 * Every module can wear its own colour. Open maths and the whole thing goes
 * green; open business and it goes navy. Nothing else changes — same layout,
 * same pastel weight, same everything. Only the hue moves.
 *
 * HOW IT WORKS
 *
 *   The site is built almost entirely out of two colour ramps, --lilac-* and
 *   --pink-*, referenced in a couple of hundred places. A theme is nothing
 *   but a class on <body> that redefines those variables (see
 *   css/modthemes.css, which is generated). No rule anywhere has to know.
 *
 * WHERE IT APPLIES
 *
 *   Only inside a module — its home, its notes and its questions. The module
 *   picker, the schedule and the progress screen all span every module at
 *   once, so a single module's colour would be meaningless there and they
 *   stay the default lilac and pink.
 */

var Themes = (function () {

  /* The swatch values here are the generated ramp's own colours, so a swatch
     can never drift from the theme it represents. Regenerate both together
     with tests/_gentheme.js. */
  var LIST = [
    { id: '',         name: 'Default',      ink: '#8B6DD9', tint: '#EBE0FF', accent: '#FF9EC4' },
    { id: 'navy',     name: 'Dark blue',    ink: '#597AD4', tint: '#E0E9FF', accent: '#9EE5FF' },
    { id: 'sky',      name: 'Light blue',   ink: '#2F85B6', tint: '#E0F4FF', accent: '#A1FDF0' },
    { id: 'forest',   name: 'Dark green',   ink: '#2F8E65', tint: '#E3FDF1', accent: '#C6FAA3' },
    { id: 'meadow',   name: 'Light green',  ink: '#30913D', tint: '#E3FDE6', accent: '#E1FDA1' },
    { id: 'maroon',   name: 'Maroon',       ink: '#C55E6F', tint: '#FCE3E8', accent: '#FDBFA1' },
    { id: 'coral',    name: 'Light red',    ink: '#D15A4D', tint: '#FFE3E0', accent: '#FF9EC2' },
    { id: 'sunshine', name: 'Yellow',       ink: '#9A7C28', tint: '#FFF7E0', accent: '#FFCB9E' },
    { id: 'grape',    name: 'Dark purple',  ink: '#AD5FCE', tint: '#F5E2FD', accent: '#FDA1E4' },
    { id: 'lavender', name: 'Light purple', ink: '#946EBF', tint: '#EFE6FA', accent: '#F0ADF0' },
    { id: 'rose',     name: 'Pink',         ink: '#D25184', tint: '#FFE0ED', accent: '#E5A5F8' },
    { id: 'ocean',    name: 'Ocean green',  ink: '#2B8D86', tint: '#E2FDFC', accent: '#A1DBFD' },
    { id: 'davy',     name: 'Davy grey',    ink: '#847C92', tint: '#EFEDF2', accent: '#CCC4D9' }
  ];

  function all() { return LIST; }

  function valid(id) {
    for (var i = 0; i < LIST.length; i++) if (LIST[i].id === id) return true;
    return false;
  }

  function get(moduleId) {
    var map = Store.get().moduleThemes || {};
    var id = map[moduleId];
    return valid(id) ? id : '';
  }

  function set(moduleId, id) {
    if (!valid(id)) id = '';
    Store.setModuleTheme(moduleId, id);
  }

  function swatch(id) {
    for (var i = 0; i < LIST.length; i++) if (LIST[i].id === id) return LIST[i];
    return LIST[0];
  }

  /* Puts the right class on <body>, or clears it. Called on every draw, so a
     screen that is not inside a module simply passes nothing.

     Every theme class is removed first rather than tracking which one is on:
     switching module used to be the obvious place for two of them to end up
     stacked, and the second would silently win. */
  function apply(moduleId) {
    var id = moduleId ? get(moduleId) : '';
    var cl = document.body.className.split(/\s+/), keep = [];
    for (var i = 0; i < cl.length; i++) {
      if (cl[i] && cl[i].indexOf('mtheme-') !== 0) keep.push(cl[i]);
    }
    if (id) keep.push('mtheme-' + id);
    document.body.className = keep.join(' ');
  }

  return {
    all: all,
    get: get,
    set: set,
    valid: valid,
    swatch: swatch,
    apply: apply
  };
})();
