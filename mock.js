/* RadioDx Physics Practice: papers from papers.json, questions from questions.json */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const KEY = 'radiodx.mock.v2', SK = 'radiodx.mock.sess.', NEG = 0.25, SEC_PER_Q = 36, MAX_Q = 50;  // MAX_Q = questions per test (random). Change 50 to 100 etc. if you want
  let Q = [], EX = [], P = [], cur = null, S = null, LAST = null, timer = null;

  const esc = t => String(t).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const jget = k => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
  const jset = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const load = () => jget(KEY) || [];
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const hms = s => [s / 3600, s / 60 % 60, s % 60].map(x => String(Math.floor(x)).padStart(2, '0')).join(':');
  const pQs = p => Q.filter(q => p.topics.includes(q.topic));
  const cnt = p => Math.min(pQs(p).length, MAX_Q);
  const mins = p => Math.ceil(cnt(p) * SEC_PER_Q / 60);
  const pct = r => r.total ? Math.round(100 * r.marks / r.total) : 0;
  const lastOf = p => load().filter(r => r.paper === p.id).slice(-1)[0];

  // marks = correct - 0.25 x wrong (only if negative marking is on)
  function score(qs, ans, neg) {
    let c = 0, w = 0, k = 0;
    qs.forEach((q, i) => { if (ans[i] == null) k++; else if (ans[i] === q.answer) c++; else w++; });
    return { correct: c, wrong: w, skipped: k, marks: c - (neg ? NEG * w : 0) };
  }

  /* ---------- sidebar, top progress, right panel ---------- */
  function nav() {
    const R = load(), done = P.filter(p => R.some(r => r.paper === p.id)).length;
    $('prog').innerHTML = `<b>${Math.round(100 * done / P.length)}% COMPLETE</b> &bull; ${done}/${P.length} Steps<div class="bar"><i style="width:${100 * done / P.length}%"></i></div>`;
    $('nav').innerHTML = `<div class="nh">RadioDx | Physics Practice</div>
      <button class="ni ${!cur ? 'on' : ''}" data-p="">How to use mock exams</button>` +
      EX.map(e => `<div class="eh">${esc(e.title)}</div>` + e.papers.map(p =>
        `<button class="ni ${cur && cur.id === p.id ? 'on' : ''}" data-p="${p.id}"><span class="dot ${R.some(r => r.paper === p.id) ? 'done' : ''}"></span>${esc(p.title)}<small>(${cnt(p)} questions / ${mins(p)} minutes)</small></button>`).join('')).join('');
    $('nav').querySelectorAll('[data-p]').forEach(b => b.onclick = () => { $('nav').classList.remove('open'); b.dataset.p ? openPaper(P.find(p => p.id === b.dataset.p)) : home(); });
  }
  function side(r) {
    const p = r ? pct(r) : 0, has = !!r;
    const [t, s] = p >= 80 ? ['Excellent!', 'Keep it up!'] : p >= 60 ? ['Good job!', 'Almost there.'] : ['Keep practising!', 'Review the explanations.'];
    $('side').innerHTML = `<div class="side"><h4>RadioDx Progress</h4><div class="ring" style="--p:${Math.max(p, 0)}"><span>${has ? p + '%' : '--'}</span></div>
      <div class="two"><div><small>Score</small><b>${has ? r.marks + '/' + r.total : '--'}</b></div><div><small>Accuracy</small><b>${has ? p + '%' : '--'}</b></div></div>
      ${has ? `<div class="msg"><b>${t}</b><small>${s}</small></div>` : '<div class="msg"><small>Complete this paper to see your score.</small></div>'}</div>`;
  }
  const crumb = (...x) => `<div class="crumb">Complete Physics Practice Paper Collection &rsaquo; ${x.map((y, i) => i == x.length - 1 ? `<b>${esc(y)}</b>` : esc(y)).join(' &rsaquo; ')}</div>`;

  /* ---------- home: how to use ---------- */
  function home() {
    stop(); cur = null; S = null; nav(); side(null);
    const R = load(), t = {};
    R.forEach(r => Object.entries(r.topics || {}).forEach(([k, v]) => { t[k] = t[k] || [0, 0]; t[k][0] += v[0]; t[k][1] += v[1]; }));
    const rows = Object.entries(t).sort((a, b) => a[1][0] / a[1][1] - b[1][0] / b[1][1]).map(([k, v]) => `<tr><td>${esc(k)}</td><td>${v[0]}/${v[1]}</td><td>${Math.round(100 * v[0] / v[1])}%</td></tr>`).join('');
    $('main').innerHTML = `<h1>How to use mock exams</h1>${crumb('How to use mock exams')}
      <div class="card"><ol><li>Choose a paper from the list on the left.</li><li>Press <b>Start Quiz</b>. The timer starts and your answers are saved automatically.</li>
      <li>Use the question numbers to jump around. <b>Review Question</b> marks a question to revisit.</li><li><b>Quiz Summary</b> shows answered, unanswered and marked questions, and lets you submit.</li>
      <li>After submitting you see your score, time, topic-wise results and an explanation for every question.</li></ol></div>
      <h2>Your topic accuracy</h2>${rows ? `<table><tr><th>Topic</th><th>Correct</th><th>Accuracy</th></tr>${rows}</table><div class="row"><button class="btn out" id="clr">Clear history</button></div>` : '<p class="muted">No attempts yet.</p>'}`;
    const c = $('clr'); if (c) c.onclick = () => { if (confirm('Delete all saved results?')) { try { localStorage.removeItem(KEY); } catch (e) {} home(); } };
  }

  /* ---------- paper start screen ---------- */
  function openPaper(p) {
    stop(); cur = p; S = null; nav();
    const r = lastOf(p), sv = jget(SK + p.id), n = cnt(p), bank = pQs(p).length;
    side(r);
    $('main').innerHTML = `<h1>${esc(p.title)} (${n} questions / ${mins(p)} minutes)</h1>${crumb('Radiology Physics Mock Exam 1', p.title)}
      <div class="card"><p>Questions: <b>${n}</b>${bank > n ? ` (random from ${bank} in the bank)` : ''} &nbsp; Time limit: <b>${hms(n * SEC_PER_Q)}</b>${r ? ` &nbsp; Last score: <b>${pct(r)}%</b>` : ''}</p>
      <label><input type="checkbox" id="neg" ${sv && sv.neg ? 'checked disabled' : ''}> Negative marking (-${NEG} per wrong answer)</label>
      <div class="row">${sv ? '<button class="btn" id="res">Resume Quiz</button><button class="btn out" id="go">Start fresh</button>' : '<button class="btn" id="go">Start Quiz</button>'}</div></div>`;
    $('go').onclick = () => begin(p, $('neg').checked);
    if (sv) $('res').onclick = () => { S = sv; timerOn(); quiz(); };
  }
  function begin(p, neg) {
    const qs = shuffle(pQs(p)).slice(0, MAX_Q).map(q => {   // shuffle MCQ options (not True/False) and remap the right answer
      if (q.options.length === 2) return q;
      const o = shuffle(q.options.map((_, i) => i));
      return Object.assign({}, q, { options: o.map(i => q.options[i]), answer: o.indexOf(q.answer) });
    });
    const total = qs.length * SEC_PER_Q;
    S = { paper: p.id, qs, ans: [], rv: [], i: 0, neg, total, left: total };
    keep(); timerOn(); quiz();
  }
  const keep = () => S && jset(SK + S.paper, S);
  const stop = () => clearInterval(timer);
  function timerOn() {
    stop();
    timer = setInterval(() => {
      S.left--; keep();
      const c = $('clk'), b = $('tbar');
      if (c) c.textContent = hms(Math.max(S.left, 0));
      if (b) b.style.width = Math.max(0, 100 * S.left / S.total) + '%';
      if (S.left <= 0) finish();
    }, 1000);
  }

  /* ---------- quiz screen ---------- */
  function quiz() {
    const q = S.qs[S.i], a = S.ans[S.i], last = S.i === S.qs.length - 1;
    const pal = S.qs.map((_, i) => `<button data-n="${i}" class="${i === S.i ? 'cur' : S.rv[i] ? 'rv' : S.ans[i] != null ? 'ans' : ''}">${i + 1}</button>`).join('');
    $('main').innerHTML = `<h1>${esc(cur.title)} (${S.qs.length} questions / ${mins(cur)} minutes)</h1>${crumb('Radiology Physics Mock Exam 1', cur.title)}
      <div class="timer"><b>&#9201; Time limit: <span id="clk">${hms(Math.max(S.left, 0))}</span></b><div class="bar"><i id="tbar" style="width:${100 * S.left / S.total}%"></i></div></div>
      <div class="pal">${pal}</div>
      <div class="leg"><span><i style="background:#dbe8fb;border:1px solid #2b5fb5"></i>Review</span><span><i style="background:#e4f6ec;border:1px solid var(--ok)"></i>Answered</span></div>
      <div class="row sp"><button class="btn out" id="rv">${S.rv[S.i] ? '&#9873; Unmark Review' : '&#9873; Review Question'}</button><button class="btn" id="sum">Quiz Summary</button></div>
      <div class="card"><p class="qn">${S.i + 1}. Question</p><p>${esc(q.q)}</p>
        ${q.options.map((o, k) => `<button class="opt ${k === a ? 'sel' : ''}" data-k="${k}"><span class="r"></span>${esc(o)}</button>`).join('')}
        <div class="row sp"><button class="btn out" id="prev" ${S.i ? '' : 'disabled'}>&larr; Previous</button><button class="btn" id="next">${last ? 'Quiz Summary' : 'Next Question &rarr;'}</button></div></div>
      <div class="foot"><i>&#10003;</i> Question ${S.i + 1} of ${S.qs.length} &bull; Autosaved</div>`;
    document.querySelectorAll('.opt').forEach(b => b.onclick = () => { S.ans[S.i] = +b.dataset.k; keep(); quiz(); });
    document.querySelectorAll('.pal [data-n]').forEach(b => b.onclick = () => { S.i = +b.dataset.n; keep(); quiz(); });
    $('rv').onclick = () => { S.rv[S.i] = !S.rv[S.i]; keep(); quiz(); };
    $('prev').onclick = () => { S.i--; keep(); quiz(); };
    $('next').onclick = () => last ? summary() : (S.i++, keep(), quiz());
    $('sum').onclick = summary;
    side(lastOf(cur));
  }
  function summary() {
    const n = S.qs.length, ans = S.qs.filter((_, i) => S.ans[i] != null).length, rv = S.rv.filter(Boolean).length;
    const d = document.createElement('div'); d.className = 'sum';
    d.innerHTML = `<div class="card"><h3>Quiz Summary</h3><p>Answered: <b>${ans}</b><br>Unanswered: <b>${n - ans}</b><br>Marked for review: <b>${rv}</b></p>
      <div class="row"><button class="btn out" id="back">Continue quiz</button><button class="btn" id="sub">Submit quiz</button></div></div>`;
    document.body.appendChild(d);
    $('back').onclick = () => d.remove();
    $('sub').onclick = () => { d.remove(); finish(); };
  }

  /* ---------- result screen ---------- */
  function finish() {
    if (!S) return;
    stop();
    const qs = S.qs, ans = qs.map((_, i) => S.ans[i] == null ? null : S.ans[i]), r = score(qs, ans, S.neg), tp = {};
    qs.forEach((q, i) => { tp[q.topic] = tp[q.topic] || [0, 0]; tp[q.topic][1]++; if (ans[i] === q.answer) tp[q.topic][0]++; });
    const rec = { paper: S.paper, date: Date.now(), total: qs.length, marks: r.marks, correct: r.correct, wrong: r.wrong, skipped: r.skipped, time: S.total - Math.max(S.left, 0), topics: tp };
    jset(KEY, load().concat(rec).slice(-100));
    try { localStorage.removeItem(SK + S.paper); } catch (e) {}
    LAST = { qs, ans, rec, neg: S.neg }; S = null;
    result();
  }
  function result() {
    const { rec: r, neg } = LAST, all = load().filter(x => x.paper === r.paper), avg = Math.round(all.reduce((a, x) => a + Math.max(pct(x), 0), 0) / all.length);
    const next = P[P.findIndex(p => p.id === r.paper) + 1];
    nav(); side(r);
    $('main').innerHTML = `<h1>${esc(cur.title)} (${r.total} questions / ${mins(cur)} minutes)</h1>${crumb('Radiology Physics Mock Exam 1', cur.title)}
      <h2>Results</h2><p>${r.correct} of ${r.total} Questions answered correctly</p><p><small><b>Your time: ${hms(r.time)}</b></small></p>
      <div class="rbox">You have reached ${r.marks} of ${r.total} point(s), (${pct(r)}%)${neg ? ' &middot; negative marking applied' : ''}</div>
      <div class="cmp"><div><b>Average score</b><i style="width:${Math.max(avg, 1) * 2.2}px;background:#6aa84f"></i><span>${avg}%</span></div>
      <div><b>Your score</b><i style="width:${Math.max(pct(r), 1) * 2.2}px;background:var(--org)"></i><span>${pct(r)}%</span></div></div>
      <p class="muted"><small>Average = average of your own attempts on this paper.</small></p>
      <h2>Categories</h2>${Object.entries(r.topics).map(([k, v]) => `<div class="cat"><span>${esc(k)}</span><u></u><b>${Math.round(100 * v[0] / v[1])}%</b></div>`).join('')}
      <div class="row" style="justify-content:center;margin-top:24px"><button class="btn dark" id="vq">View Questions</button><button class="btn dark" id="rs">Restart Quiz</button><button class="btn" id="ct">${next ? 'Continue' : 'Finish'}</button></div>`;
    $('vq').onclick = review; $('rs').onclick = () => openPaper(cur); $('ct').onclick = () => next ? openPaper(next) : home();
  }
  function review() {
    const { qs, ans } = LAST;
    $('main').innerHTML = `<h1>Review: ${esc(cur.title)}</h1>` + qs.map((q, i) => {
      const st = ans[i] == null ? '' : ans[i] === q.answer ? 'ok' : 'bad';
      return `<div class="rev ${st}"><b>${i + 1}. ${esc(q.q)}</b><br>Your answer: ${ans[i] == null ? 'Skipped' : esc(q.options[ans[i]])}<br>Correct answer: ${esc(q.options[q.answer])}<br><span class="muted">${esc(q.explain)}</span></div>`;
    }).join('') + '<div class="row"><button class="btn" id="bk">Back to results</button></div>';
    $('bk').onclick = result;
  }

  /* ---------- start ---------- */
  $('menu').onclick = () => $('nav').classList.toggle('open');
  Promise.all(['questions.json', 'papers.json'].map(f => fetch(f).then(r => { if (!r.ok) throw 0; return r.json(); })))
    .then(([q, p]) => { Q = q; EX = p.exams; P = EX.flatMap(e => e.papers); home(); })
    .catch(() => { $('main').innerHTML = '<div class="err"><b>Questions could not be loaded.</b><br>If you opened this file by double-clicking, the browser blocks the .json files. Open the live site, or use VS Code "Live Server".</div>'; });
})();
