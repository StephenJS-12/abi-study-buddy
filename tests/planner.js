// Checks events, to-dos and the dashboard numbers.
//
// The numbers are the part that can be wrong without looking wrong. "Upcoming
// 3" is believable whatever it counts, and an overdue assignment that quietly
// falls out of the count is the exact failure this feature exists to prevent.
// So the window boundaries are tested at the day, not in the middle.

var REPO = (function () {
    var f = new ActiveXObject("Scripting.FileSystemObject");
    return f.GetParentFolderName(f.GetParentFolderName(WScript.ScriptFullName));
})();

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, t) { for (var i = 0; i < this.length; i++) fn.call(t, this[i], i, this); };
}
if (!Array.prototype.filter) {
    Array.prototype.filter = function (fn, t) { var o = []; for (var i = 0; i < this.length; i++) if (fn.call(t, this[i], i, this)) o.push(this[i]); return o; };
}
if (!Object.keys) {
    Object.keys = function (o) { var k = [], n; for (n in o) if (Object.prototype.hasOwnProperty.call(o, n)) k.push(n); return k; };
}

var fso = new ActiveXObject("Scripting.FileSystemObject");
var problems = [];

function read(p) {
    var f = fso.OpenTextFile(p, 1);
    var s = f.AtEndOfStream ? "" : f.ReadAll();
    f.Close();
    return s;
}
function fail(m) { problems.push(m); }
function ok(c, m) { if (!c) fail(m); }

// ── stubs ────────────────────────────────────────────────────────

if (typeof JSON === 'undefined') {
    JSON = {
        parse: function (s) { return eval('(' + s + ')'); },
        stringify: function (v) {
            if (v === null || v === undefined) return 'null';
            var t = typeof v;
            if (t === 'number' || t === 'boolean') return String(v);
            if (t === 'string') return '"' + v + '"';
            if (Object.prototype.toString.call(v) === '[object Array]') {
                var a = [];
                for (var i = 0; i < v.length; i++) a.push(JSON.stringify(v[i]));
                return '[' + a.join(',') + ']';
            }
            var o = [], k;
            for (k in v) {
                if (!Object.prototype.hasOwnProperty.call(v, k)) continue;
                if (typeof v[k] === 'function') continue;
                o.push('"' + String(k) + '":' + JSON.stringify(v[k]));
            }
            return '{' + o.join(',') + '}';
        }
    };
}

var saved = { events: [], todos: [], schedule: null, badges: {} };
var saveCount = 0;

var Store = {
    get: function () { return saved; },
    saveNow: function () { saveCount++; },
    setSchedule: function (c) { saved.schedule = c; },
    hasBadge: function () { return false; }
};
var Modules = {
    ready: function () { return [{ id: 'aaa', code: 'AAA01', title: 'A', accent: 1 }]; },
    contentFor: function () { return { weeks: [] }; },
    get: function (id) { return id === 'aaa' ? { id: 'aaa', code: 'AAA01' } : null; }
};

// Planner leans on Schedule for its date arithmetic, so the real one is used.
eval(read(REPO + "\\public\\js\\schedule.js"));
eval(read(REPO + "\\public\\js\\planner.js"));

function reset() { saved.events = []; saved.todos = []; }
function day(n) { return Schedule.ymd(Schedule.addDays(new Date(), n)); }

// ── 1. adding, and refusing to ───────────────────────────────────

reset();
var ev = Planner.addEvent({ name: 'Assignment 2', date: day(3), time: '14:00', type: 'assignment', moduleId: 'aaa' });
ok(ev !== null, "add: a good event was refused");
ok(saved.events.length === 1, "add: the event was not stored");
ok(saveCount > 0, "add: adding an event did not save");

ok(Planner.addEvent({ name: '   ', date: day(1) }) === null, "add: an event with no name should be refused");
ok(Planner.addEvent({ name: 'x', date: 'nonsense' }) === null, "add: an event with a bad date should be refused");
ok(Planner.addEvent({ name: 'x', date: '2025-02-31' }) === null,
   "add: 31 February should be refused, not rolled into March");
ok(saved.events.length === 1, "add: a refused event was stored anyway");

// An unknown type falls back rather than leaving the calendar unable to draw it.
var odd = Planner.addEvent({ name: 'Mystery', date: day(1), type: 'wat' });
ok(odd && odd.type === 'other', "add: an unknown type should fall back to Other, got " + (odd && odd.type));

// A bad time is dropped, not kept — an all-day event is a real thing.
var noTime = Planner.addEvent({ name: 'All day', date: day(1), time: '99:99' });
ok(noTime && noTime.time === '', "add: a nonsense time should be dropped");

// Ids must be unique even when several are added in the same millisecond.
reset();
var ids = {};
for (var i = 0; i < 50; i++) {
    var e = Planner.addEvent({ name: 'E' + i, date: day(1) });
    if (ids[e.id]) { fail("add: two events were given the same id"); break; }
    ids[e.id] = 1;
}

// ── 2. the KPI window ────────────────────────────────────────────
// "Current day up to two weeks ahead", inclusive. Tested exactly at the edges,
// because an off-by-one here silently loses the assignment due on the last day.

reset();
Planner.addEvent({ name: 'Yesterday', date: day(-1) });          // overdue
Planner.addEvent({ name: 'Last week', date: day(-7) });          // overdue
Planner.addEvent({ name: 'Today', date: day(0) });               // upcoming
Planner.addEvent({ name: 'Day 13', date: day(13) });             // upcoming, last day in
Planner.addEvent({ name: 'Day 14', date: day(14) });             // just outside
Planner.addEvent({ name: 'Next month', date: day(30) });         // outside

var k = Planner.kpis(null);
ok(k.upcoming === 2, "kpi: expected 2 upcoming (today and day 13), got " + k.upcoming);
ok(k.overdue === 2, "kpi: expected 2 overdue, got " + k.overdue);
ok(k.completed === 0, "kpi: nothing is completed yet, got " + k.completed);

// Completing one moves it out of both live counts and into completed.
var todayEv = Planner.events(null, { from: day(0), to: day(0) })[0];
Planner.setEventDone(todayEv.id, true);
k = Planner.kpis(null);
ok(k.upcoming === 1, "kpi: ticking an event did not take it out of upcoming, got " + k.upcoming);
ok(k.completed === 1, "kpi: ticking an event did not add it to completed, got " + k.completed);

// An overdue event that gets ticked stops being overdue.
var late = Planner.events(null, { to: day(-1) })[0];
Planner.setEventDone(late.id, true);
k = Planner.kpis(null);
ok(k.overdue === 1, "kpi: ticking an overdue event did not clear it, got " + k.overdue);
ok(k.completed === 2, "kpi: completed did not rise, got " + k.completed);

// Unticking puts it back.
Planner.setEventDone(late.id, false);
k = Planner.kpis(null);
ok(k.overdue === 2, "kpi: unticking did not restore the overdue count, got " + k.overdue);

// Completed counts everything ever, not just the window.
reset();
Planner.addEvent({ name: 'Long ago', date: day(-200), done: day(-200) });
ok(Planner.kpis(null).completed === 1,
   "kpi: completed should count all time, not just the window");

// ── 3. scope ─────────────────────────────────────────────────────
// null means everything; a module id means only that module. An event whose
// own moduleId is '' belongs to no subject, which is NOT the same as null.

reset();
Planner.addEvent({ name: 'Maths thing', date: day(2), moduleId: 'aaa' });
Planner.addEvent({ name: 'Pay fees', date: day(2), moduleId: '' });

ok(Planner.events(null).length === 2, "scope: the home view should show everything");
ok(Planner.events('aaa').length === 1, "scope: a module should show only its own events");
ok(Planner.events('aaa')[0].name === 'Maths thing', "scope: the wrong event was shown for the module");
ok(Planner.events('').length === 1, "scope: '' should mean the unattached events, not all of them");
ok(Planner.events('')[0].name === 'Pay fees', "scope: '' returned the wrong event");

ok(Planner.kpis('aaa').upcoming === 1, "scope: module KPIs counted another module's events");
ok(Planner.kpis(null).upcoming === 2, "scope: home KPIs missed an event");

// ── 4. what the dashboard shows ──────────────────────────────────

reset();
Planner.addEvent({ name: 'Open', date: day(1) });
var doneOne = Planner.addEvent({ name: 'Finished', date: day(1) });
Planner.setEventDone(doneOne.id, true);

ok(Planner.events(null).length === 1, "view: a completed event should be hidden by default");
ok(Planner.events(null, { includeDone: true }).length === 2,
   "view: 'view completed' should bring it back");

// The seven-day strip asks for a range and must get only that range.
reset();
Planner.addEvent({ name: 'In range', date: day(6) });
Planner.addEvent({ name: 'Out of range', date: day(7) });
var strip = Planner.events(null, { from: day(0), to: day(6) });
ok(strip.length === 1 && strip[0].name === 'In range',
   "view: the seven-day range let something else in");

// ── 5. ordering ──────────────────────────────────────────────────

reset();
Planner.addEvent({ name: 'Later that day', date: day(1), time: '16:00' });
Planner.addEvent({ name: 'All day', date: day(1), time: '' });
Planner.addEvent({ name: 'Morning', date: day(1), time: '09:00' });
Planner.addEvent({ name: 'Tomorrow', date: day(2), time: '08:00' });

var ordered = Planner.events(null);
ok(ordered[0].name === 'All day',
   "order: an event with no time belongs to the whole day and should lead it, got " + ordered[0].name);
ok(ordered[1].name === 'Morning' && ordered[2].name === 'Later that day',
   "order: timed events are out of order");
ok(ordered[3].name === 'Tomorrow', "order: a later date came first");

// ── 6. to-dos ────────────────────────────────────────────────────

reset();
ok(Planner.addTodo('   ') === null, "todo: an empty note should be refused");

var t1 = Planner.addTodo('Print the notes', 'aaa');
var t2 = Planner.addTodo('Buy a folder', '');
ok(saved.todos.length === 2, "todo: notes were not stored");

ok(Planner.todos(null).length === 2, "todo: the home list should show everything");
ok(Planner.todos('aaa').length === 1, "todo: a module list should show only its own");
ok(Planner.todos('aaa')[0].text === 'Print the notes', "todo: the wrong note was shown");

Planner.setTodoDone(t1.id, true);
ok(Planner.todos(null).length === 1, "todo: a completed note should be hidden by default");
ok(Planner.todos(null, true).length === 2, "todo: 'view completed' should bring it back");
ok(Planner.todoDoneCount(null) === 1, "todo: the completed count is wrong");
ok(Planner.todoDoneCount('aaa') === 1, "todo: the completed count ignores scope");
ok(Planner.todoDoneCount('') === 0, "todo: the completed count counted another scope's note");

/* Completed notes sink, so the list she is working through stays at the top. */
Planner.setTodoDone(t2.id, false);
var withDone = Planner.todos(null, true);
ok(!withDone[0].done && withDone[withDone.length - 1].done,
   "todo: completed notes should sink to the bottom");

Planner.removeTodo(t1.id);
ok(Planner.todos(null, true).length === 1, "todo: removing a note did not remove it");

// ── 7. removing an event ─────────────────────────────────────────

reset();
var gone = Planner.addEvent({ name: 'Cancelled', date: day(1) });
ok(Planner.removeEvent(gone.id) === true, "remove: an event that exists should be removable");
ok(saved.events.length === 0, "remove: the event is still there");
ok(Planner.removeEvent('not-a-real-id') === false, "remove: removing nothing should report nothing");

// ── 8. every type is usable ──────────────────────────────────────

ok(Planner.TYPES.length >= 6, "types: expected at least six, got " + Planner.TYPES.length);
var seenType = {};
for (i = 0; i < Planner.TYPES.length; i++) {
    var ty = Planner.TYPES[i];
    if (seenType[ty.id]) fail("types: duplicate type id '" + ty.id + "'");
    seenType[ty.id] = 1;
    if (!ty.name || !ty.emoji) fail("types: '" + ty.id + "' is missing a name or an icon");
    if (Planner.typeOf(ty.id).id !== ty.id) fail("types: typeOf lost '" + ty.id + "'");
}

// ── 9. the add box ───────────────────────────────────────────────
// Driven through a stubbed modal, because two things went wrong here that the
// model alone cannot catch: the box offered a module picker even when she was
// already inside a module, and its confirm handler read fields that the modal
// had already destroyed, so pressing "Add it" did nothing at all and said
// nothing about why.

var fields = {};
var document = {
    getElementById: function (id) { return fields[id] || null; }
};
var lastModal = null;
var App = { modal: function (cfg) { lastModal = cfg; } };

eval(read(REPO + "\\public\\js\\dashboard.js"));

function fillForm(name, date, time, type, mod) {
    fields = {
        evName: { value: name, addEventListener: function () {} },
        evDate: { value: date, addEventListener: function () {} },
        evTime: { value: time },
        evType: { value: type }
    };
    if (mod !== null) fields.evMod = { value: mod };
}

// Opened from inside a module: no picker, and the event lands on that module.
reset();
Dashboard.openAdd('aaa', function () {});
ok(lastModal !== null, "addbox: the dialog was never opened");
ok(String(lastModal.body).indexOf('id="evMod"') < 0,
   "addbox: a module picker is offered even though she is already inside a module");
ok(String(lastModal.body).indexOf('AAA01') >= 0,
   "addbox: the module she is in is not shown at all");

fillForm('Assignment 2', day(4), '14:00', 'assignment', null);
lastModal.onConfirm();
ok(saved.events.length === 1, "addbox: pressing Add it created nothing");
ok(saved.events[0].moduleId === 'aaa',
   "addbox: the event did not land on the module she was in, got '" + saved.events[0].moduleId + "'");
ok(saved.events[0].name === 'Assignment 2', "addbox: the name was not read");
ok(saved.events[0].time === '14:00', "addbox: the time was not read");

// Opened from the home screen: the picker is there, and it is obeyed.
reset();
Dashboard.openAdd(null, function () {});
ok(String(lastModal.body).indexOf('id="evMod"') >= 0,
   "addbox: the home screen must offer a module picker");
ok(String(lastModal.body).indexOf('No module') >= 0,
   "addbox: the home picker must allow an event that belongs to no module");

fillForm('Pay fees', day(2), '', 'deadline', '');
lastModal.onConfirm();
ok(saved.events.length === 1 && saved.events[0].moduleId === '',
   "addbox: 'No module' was not honoured");

reset();
Dashboard.openAdd(null, function () {});
fillForm('Class test', day(5), '09:00', 'test', 'aaa');
lastModal.onConfirm();
ok(saved.events.length === 1 && saved.events[0].moduleId === 'aaa',
   "addbox: the chosen module was not used");

/* The confirm handler must be given a form it can still read. This is the
   shape of the bug that made the button do nothing: if it ever reads a field
   after the modal has been emptied, every value comes back null. */
reset();
Dashboard.openAdd('aaa', function () {});
fields = {};
var threw = false;
try { lastModal.onConfirm(); } catch (e) { threw = true; }
ok(threw || saved.events.length === 0,
   "addbox: confirming with no form should fail loudly or do nothing, not save junk");

// ── 10. editing an event ─────────────────────────────────────────
// Tapping an event opens it. Everything about it can be changed, including
// which module it is filed against — an event on the wrong subject is exactly
// what editing is for, so the picker is offered here even inside a module.

reset();
var toEdit = Planner.addEvent({ name: 'Draft title', date: day(3), time: '09:00', type: 'test', moduleId: 'aaa' });

Dashboard.openEdit(toEdit.id, function () {});
ok(lastModal !== null, "edit: the editor did not open");
ok(String(lastModal.body).indexOf('id="evMod"') >= 0,
   "edit: the module must be changeable when editing — that is what editing is for");
ok(String(lastModal.body).indexOf('value="Draft title"') >= 0,
   "edit: the form did not come up filled in with the event's name");
ok(String(lastModal.body).indexOf('value="' + day(3) + '"') >= 0,
   "edit: the form did not come up filled in with the event's date");
ok(String(lastModal.body).indexOf('value="09:00"') >= 0,
   "edit: the form did not come up filled in with the event's time");
ok(/value="test"\s+selected|value="test" selected/.test(String(lastModal.body)),
   "edit: the event's type was not pre-selected");

fillForm('Final title', day(6), '', 'assignment', '');
lastModal.onConfirm();
ok(saved.events.length === 1, "edit: editing created a second event instead of changing the first");
var after = saved.events[0];
ok(after.id === toEdit.id, "edit: the event lost its identity");
ok(after.name === 'Final title', "edit: the name was not changed");
ok(after.date === day(6), "edit: the date was not changed");
ok(after.time === '', "edit: clearing the time did not take");
ok(after.type === 'assignment', "edit: the type was not changed");
ok(after.moduleId === '', "edit: moving it off a module did not take");

/* Editing must not disturb whether it is done. */
reset();
var dun = Planner.addEvent({ name: 'Handed in', date: day(1) });
Planner.setEventDone(dun.id, true);
Dashboard.openEdit(dun.id, function () {});
fillForm('Handed in late', day(1), '', 'assignment', '');
lastModal.onConfirm();
ok(saved.events[0].done !== '', "edit: editing a completed event marked it undone");

/* An event that no longer exists must not open an editor at all. */
lastModal = null;
Dashboard.openEdit('gone-forever', function () {});
ok(lastModal === null, "edit: opened an editor for an event that does not exist");

// ── report ───────────────────────────────────────────────────────

WScript.Echo("Dashboard model checked:");
WScript.Echo("  adding and refusing, the two-week window at its exact edges, scope,");
WScript.Echo("  completed events, ordering, to-dos and removal.");
WScript.Echo("");

if (problems.length === 0) {
    WScript.Echo("No problems found.");
} else {
    WScript.Echo(problems.length + " PROBLEM(S):");
    for (var q = 0; q < problems.length; q++) WScript.Echo("  - " + problems[q]);
}
WScript.Quit(problems.length);
