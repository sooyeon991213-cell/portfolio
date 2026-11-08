/* 성과 대시보드 데모 — 화면 구성은 실제 운영 대시보드를 따르고, 숫자는 data.js의 가상 데이터입니다. */
(() => {
  window.addEventListener("error", (e) => { const d = document.createElement("div"); d.className = "err"; d.textContent = "오류: " + e.message; document.body.appendChild(d); });
  const { FIRST, TODAY, days, MEDIA, plan, da, sa, keywords, months, monthly, history, uploads, parse, shift } = window.DEMO;
  const $ = (s) => document.querySelector(s);
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const fin = (v) => (isFinite(v) && !isNaN(v) ? v : null);
  const N = (v, d = 0) => fin(v) === null ? "-" : v.toLocaleString("ko-KR", { maximumFractionDigits: d, minimumFractionDigits: d });
  const W = (v) => fin(v) === null || v === 0 && false ? "-" : "₩" + N(v);
  const P = (v, d = 2) => fin(v) === null ? "-" : N(v, d) + "%";
  const sum = (a, f) => a.reduce((s, r) => s + (r[f] || 0), 0);
  const AGG = (a) => {
    const o = { cost: sum(a, "cost"), imp: sum(a, "imp"), clicks: sum(a, "clicks"), views: sum(a, "views"), sessions: sum(a, "sessions"), leads: sum(a, "leads"), signups: sum(a, "signups"), mleads: sum(a, "mleads"), msign: sum(a, "msign"), contract: sum(a, "contract") };
    o.cpm = o.cost / o.imp * 1000; o.cpc = o.cost / o.clicks; o.ctr = o.clicks / o.imp * 100; o.cps = o.cost / o.sessions;
    o.cpaL = o.leads ? o.cost / o.leads : NaN; o.cpaS = o.signups ? o.cost / o.signups : NaN; o.cvrL = o.leads / o.sessions * 100; o.cvrS = o.signups / o.sessions * 100; return o;
  };
  const groupBy = (a, fn) => { const m = new Map(); a.forEach((r) => { const k = typeof fn === "function" ? fn(r) : r[fn]; if (!m.has(k)) m.set(k, []); m.get(k).push(r); }); return m; };
  const chg = (a, b) => (b ? (a / b - 1) * 100 : NaN);
  const arrow = (v, inverse) => fin(v) === null ? "-" : `<span class="${(inverse ? v < 0 : v > 0) ? "pos" : "neg"}">${v > 0 ? "▲" : "▼"} ${N(Math.abs(v), 1)}%</span>`;
  const OBJ_ORDER = { Search: 0, Traffic: 1, Counsel: 2, Etc: 3 };
  const monthOf = (k) => k.slice(0, 7);
  const monthDays = (m) => { const [y, mm] = m.split("-").map(Number); return new Date(y, mm, 0).getDate(); };
  const prevMonth = (m) => { const [y, mm] = m.split("-").map(Number); return mm === 1 ? `${y - 1}-12` : `${y}-${String(mm - 1).padStart(2, "0")}`; };
  const toast = (t) => { const el = $("#toast"); el.textContent = t; el.classList.add("show"); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("show"), 1800); };

  // ---------- 상태 ----------
  const S = { from: "2026-10-01", to: TODAY, preset: "mtd", camp: "", obj: "", media: "", ct: "", tab: "summary", sort: {}, chips: {}, page: {}, q: {}, open: false, review: "sum" };
  const CSV = {};
  const inRange = (r) => r.date >= S.from && r.date <= S.to;
  const passF = (r) => (!S.camp || r.camp === S.camp) && (!S.obj || r.obj === S.obj) && (!S.media || r.media === S.media) && (!S.ct || r.ct === S.ct);
  const ALL = da.concat(sa);
  const rowsAll = () => ALL.filter((r) => inRange(r) && passF(r));
  const rangeMonths = () => { const s = new Set(); for (let k = S.from; k <= S.to; k = shift(k, 1)) s.add(monthOf(k)); return [...s]; };
  const budgetOf = (pred) => { const ms = rangeMonths(); return plan.filter((p) => ms.includes(p.month) && pred(p)).reduce((s, p) => s + p.budget, 0); };
  const onOf = (pred) => plan.some((p) => p.month === monthOf(TODAY) && pred(p) && p.on);

  // ---------- 표 ----------
  const prog = (cost, budget) => {
    if (!budget) return { bar: "", pct: "-" };
    const r = cost / budget * 100, cls = r >= 99.5 ? "full" : "";
    return { bar: `<span class="prog">${W(budget)} <i><b class="${cls}" style="width:${Math.min(100, r)}%"></b></i></span>`, pct: `<span class="pct ${cls} ${r === 0 ? "zero" : ""}">${N(r, 1)}%</span>` };
  };
  const onBadge = (on) => `<span class="badge ${on ? "on" : "off"}">${on ? "ON" : "OFF"}</span>`;
  const M_DA = [["cost", "소진금액", W], ["imp", "노출", N], ["clicks", "클릭", N], ["views", "영상조회", N], ["cpm", "CPM", W], ["cpc", "CPC", W], ["ctr", "CTR", P], ["sessions", "세션수", N], ["leads", "상담신청", N], ["signups", "회원가입", N], ["cps", "CPA(세션)", W], ["cpaL", "CPA(상담신청)", W], ["cpaS", "CPA(회원가입)", W], ["cvrL", "CVR(상담신청)", P], ["cvrS", "CVR(회원가입)", P]];
  const metricCells = (a, set = M_DA) => set.map(([k, , f]) => f(a[k]));
  function table(id, head, rows, opt = {}) {
    // rows: [{cells:[...], cls, sort:{k:v}}]
    const st = S.sort[id];
    let body = rows;
    if (opt.sortable && st) {
      const i = st.i;
      body = rows.slice().sort((a, b) => { const x = a.sv ? a.sv[i] : 0, y = b.sv ? b.sv[i] : 0; return (typeof x === "string" ? x.localeCompare(y) : (x ?? -Infinity) - (y ?? -Infinity)) * (st.dir === "asc" ? 1 : -1); });
    }
    const pageSize = opt.page;
    let pager = "";
    if (pageSize && body.length > pageSize) {
      const pages = Math.ceil(body.length / pageSize), cur = Math.min(S.page[id] || 1, pages);
      body = body.slice((cur - 1) * pageSize, cur * pageSize);
      pager = `<div class="pager"><span>전체 ${rows.length}개</span><span class="pages">${Array.from({ length: pages }, (_, i) => `<button data-page="${id}" data-p="${i + 1}" class="${i + 1 === cur ? "on" : ""}">${i + 1}</button>`).join("")}</span><span>${cur} / ${pages} 페이지</span></div>`;
    }
    CSV[id] = { head: head.map((h) => h.replace(/<[^>]+>/g, "")), rows: rows.concat(opt.foot ? [opt.foot] : []).map((r) => r.cells.map((c) => String(c).replace(/<[^>]+>/g, "").trim())) };
    const th = head.map((h, i) => {
      const l = opt.left && opt.left.includes(i) ? " l" : "";
      const s = opt.sortable && (!opt.noSort || !opt.noSort.includes(i)) ? ` sortable${st && st.i === i ? " " + st.dir : ""}" data-sort="${id}" data-i="${i}` : "";
      return `<th class="${l}${s}">${h}</th>`;
    }).join("");
    const tr = (r) => `<tr class="${r.cls || ""}">${r.cells.map((c, i) => `<td class="${opt.left && opt.left.includes(i) ? "l" : ""}">${c}</td>`).join("")}</tr>`;
    return `<div class="tw ${opt.free ? "free" : ""}"><table><thead><tr>${th}</tr></thead><tbody>${body.map(tr).join("")}${opt.foot ? tr(opt.foot) : ""}</tbody></table></div>${pager}`;
  }
  const card = (title, sub, body, opt = {}) => `<section class="card"${opt.id ? ` id="${opt.id}"` : ""}><div class="card-head"><h3>${title}${sub ? `<small>${sub}</small>` : ""}</h3><div class="tools">${opt.extra || ""}${opt.search ? `<input class="search" data-q="${opt.search}" placeholder="검색" value="${esc(S.q[opt.search] || "")}" />` : ""}${opt.csv ? `<button class="tool" data-snap title="캡처">📷</button><button class="tool" data-csv="${opt.csv}" title="CSV 다운로드">⤓</button>` : ""}</div></div>${body}</section>`;
  const chips = (group, items, multi, def) => items.map(([v, label]) => { const cur = S.chips[group]; const on = multi ? (cur || items.map((x) => x[0])).includes(v) : (cur ?? def ?? items[0][0]) === v; return `<button class="chip ${on ? "on" : ""}" data-chip="${group}" data-v="${v}" ${multi ? "data-multi" : ""}>${label}</button>`; }).join("");
  const chipVal = (group, def) => S.chips[group] ?? def;
  const insight = (title, meta, body, right) => `<div class="insight"><div class="ih"><span><b>오늘의 인사이트</b>${meta}</span><span>${right || ""}</span></div>${body}</div>`;

  // ---------- 차트 ----------
  const charts = {};
  const dark = () => document.documentElement.classList.contains("dark");
  function draw(id, cfg) {
    const el = document.getElementById(id); if (!el || !window.Chart) return;
    Chart.defaults.color = dark() ? "#9aa3b2" : "#6b7280"; Chart.defaults.borderColor = dark() ? "#2b313c" : "#eef0f3"; Chart.defaults.font.family = "Pretendard, 'Malgun Gothic', sans-serif"; Chart.defaults.font.size = 10;
    if (charts[id]) charts[id].destroy();
    charts[id] = new Chart(el, cfg);
  }
  const combo = (labels, bars, line, color, lineColor, bl, ll) => ({ data: { labels, datasets: [
    { type: "bar", label: bl, data: bars, backgroundColor: color, borderRadius: 2, yAxisID: "y", order: 2 },
    { type: "line", label: ll, data: line, borderColor: lineColor, backgroundColor: lineColor, borderWidth: 1.5, pointRadius: 0, tension: .35, yAxisID: "y1", order: 1 }] },
    options: { maintainAspectRatio: false, interaction: { mode: "index", intersect: false }, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { maxTicksLimit: 6 } }, y: { ticks: { maxTicksLimit: 5 } }, y1: { position: "right", grid: { display: false }, ticks: { maxTicksLimit: 5 } } } } });

  // ---------- 공통: 그룹 표 행 ----------
  const metricRow = (labels, a, budget, extra = [], cls = "") => { const pr = prog(a.cost, budget); return { cells: [...labels, ...extra, pr.bar || "-", pr.pct, ...metricCells(a)], cls, sv: [...labels, ...extra.map(() => 0), budget, budget ? a.cost / budget : 0, ...M_DA.map(([k]) => fin(a[k]))] }; };
  const headDA = (labels, extra = []) => [...labels, ...extra, "Budget(Gross)", "진척률", ...M_DA.map((m) => m[1])];

  // ---------- Summary ----------
  function renderSummary() {
    const rows = rowsAll(), A = AGG(rows), mo = monthOf(S.to), md = monthDays(mo), el = Math.min(md, parse(S.to).getDate());
    const k = [["경과일 (" + mo.slice(5) + "/1 ~ " + S.to.slice(5).replace("-", "/") + " / " + md + "일)", `${el}일 · ${N(el / md * 100, 1)}%`], ["소진금액", W(A.cost)], ["노출", N(A.imp)], ["클릭", N(A.clicks)], ["영상조회", N(A.views)], ["CPM", W(A.cpm)], ["CPC", W(A.cpc)], ["CTR", P(A.ctr)],
      ["세션수", N(A.sessions)], ["상담신청", N(A.leads)], ["회원가입", N(A.signups)], ["CPA(세션)", W(A.cps)], ["CPA(상담신청)", W(A.cpaL)], ["CPA(회원가입)", W(A.cpaS)], ["CVR(상담신청)", P(A.cvrL)], ["CVR(회원가입)", P(A.cvrS)]];
    const w1 = AGG(ALL.filter((r) => passF(r) && r.date > shift(S.to, -7) && r.date <= S.to)), w0 = AGG(ALL.filter((r) => passF(r) && r.date > shift(S.to, -14) && r.date <= shift(S.to, -7)));
    const bau = AGG(ALL.filter((r) => r.camp === "BAU" && monthOf(r.date) === mo && r.date <= S.to)), bauB = plan.filter((p) => p.camp === "BAU" && p.month === mo).reduce((s, p) => s + p.budget, 0);
    const proj = bau.cost / el * md, pr = proj / bauB * 100;
    const ins = insight("", ` 최신일 ${S.to} 기준 · 활성 Objective만`, `<ul>
      <li>WoW(최근 7일 vs 직전 7일) — 상담 <b>${N(chg(w1.leads, w0.leads), 1)}%</b>, CPA(상담) <b>${N(chg(w1.cpaL, w0.cpaL), 1)}%</b>.</li>
      <li><b>BAU 월말 예산 예측</b> — 현재 페이스로 <b>${N(pr, 0)}%</b> 소진 예상 (${W(proj)} / 예산 ${W(bauB)}, 소진 ${N(bau.cost / bauB * 100, 1)}% · 경과 ${N(el / md * 100, 1)}%). ${pr > 102 ? "예산보다 빠른 페이스." : pr < 95 ? "예산보다 느린 페이스." : "예산 범위 안."}</li></ul>`);
    const hist = `<section class="card"><div class="history"><h3>운영 히스토리<span class="cnt">${mo.slice(5).replace(/^0/, "")}월 ${history.length}건</span></h3><div class="tools"><button class="btn" data-hist>${S.open ? "접기 ▴" : "펼치기 ▾"}</button><button class="btn" data-toast="데모에서는 기록을 추가할 수 없어요">+ 기록 추가</button></div></div>${S.open ? `<ul class="history-list">${history.map(([d, c, t]) => `<li><span>${d}</span><span>${c}</span><b style="font-weight:500">${t}</b></li>`).join("")}</ul>` : ""}</section>`;
    const charts3 = `<div class="grid3"><div class="card"><p class="chart-title">비용 / 클릭수</p><div class="chart"><canvas id="c1"></canvas></div></div><div class="card"><p class="chart-title">세션수 / CPA(세션수)</p><div class="chart"><canvas id="c2"></canvas></div></div><div class="card"><p class="chart-title">상담신청 / CPA(상담신청)</p><div class="chart"><canvas id="c3"></canvas></div></div></div>`;
    const campTable = (camp) => {
      const r = rows.filter((x) => x.camp === camp), g = groupBy(r, (x) => x.obj + "|" + x.ct);
      const keys = [...new Set(plan.filter((p) => p.camp === camp && rangeMonths().includes(p.month) && passF({ camp, obj: p.obj, ct: p.ct, media: p.media })).map((p) => p.obj + "|" + p.ct))];
      keys.sort((a, b) => OBJ_ORDER[a.split("|")[0]] - OBJ_ORDER[b.split("|")[0]]);
      const body = keys.map((kk) => { const [o, c] = kk.split("|"); return metricRow([o, c], AGG(g.get(kk) || []), budgetOf((p) => p.camp === camp && p.obj === o && p.ct === c)); });
      const tot = metricRow(["총합계", ""], AGG(r), budgetOf((p) => p.camp === camp), [], "total");
      return card(`${camp} Campaign 성과 (Objective × Content Type)`, "", table("t-" + camp, headDA(["Objective", "Content Type"]), body, { sortable: true, left: [0, 1], foot: tot }), { csv: "t-" + camp });
    };
    const gm = groupBy(rows, "media");
    const mediaRows = [...gm.entries()].sort((a, b) => MEDIA[a[0]].type.localeCompare(MEDIA[b[0]].type) || sum(b[1], "cost") - sum(a[1], "cost")).map(([m, v]) => metricRow([`<span class="badge ${MEDIA[m].type.toLowerCase()}">${MEDIA[m].type}</span>`, m], AGG(v), budgetOf((p) => p.media === m)));
    const mediaT = card("Media 성과", "", table("t-media", headDA(["Media Type", "Media"]), mediaRows, { sortable: true, left: [0, 1], foot: metricRow(["", "총합계"], A, budgetOf(() => true), [], "total") }), { csv: "t-media" });
    $("#view").innerHTML = `<div class="kpis">${k.map(([l, v]) => `<div class="kpi"><span title="${esc(l)}">${l}</span><b>${v}</b></div>`).join("")}</div>${ins}${hist}${charts3}${campTable("BAU")}${campTable("D2C")}${mediaT}`;
    const byD = groupBy(rows, "date"), labels = [...byD.keys()].sort(), D = labels.map((d) => AGG(byD.get(d))), L = labels.map((d) => d.slice(5));
    draw("c1", combo(L, D.map((x) => x.cost), D.map((x) => x.clicks), "#2f63e6", "#f59e0b", "비용", "클릭수"));
    draw("c2", combo(L, D.map((x) => x.sessions), D.map((x) => Math.round(x.cps)), "#22c55e", "#ef4444", "세션수", "CPA(세션)"));
    draw("c3", combo(L, D.map((x) => x.leads), D.map((x) => fin(x.cpaL) ? Math.round(x.cpaL) : null), "#8b5cf6", "#ef4444", "상담신청", "CPA(상담신청)"));
  }

  // ---------- DA Performance ----------
  function renderDA() {
    const rows = rowsAll().filter((r) => r.mtype === "DA");
    const camps = chipVal("da-camp", ["BAU", "D2C"]);
    const lines = ["BAU", "D2C"].map((c) => { const g = groupBy(rows.filter((r) => r.camp === c && r.cost > 0), "ct"); if (!g.size) return ""; return `<p class="grp">${c}</p>` + [...g.entries()].slice(0, 3).map(([ct, v]) => { const a = AGG(v); return `<div class="sub">&lt;${esc(ct)}&gt;</div><ul><li>기간 평균 CPC <b>${W(a.cpc)}</b>, 세션 단가 <b>${W(a.cps)}</b>, 상담신청 CPA <b>${W(a.cpaL)}</b>입니다.</li></ul>`; }).join(""); }).join("");
    let html = insight("", ` DA 한정 · 활성 ${S.to} 기준`, lines, "상세보기");
    // Objective × Content Type
    const objRows = [];
    camps.forEach((c) => {
      const rc = rows.filter((r) => r.camp === c); if (!rc.length && !plan.some((p) => p.camp === c && p.mtype === "DA")) return;
      const objs = [...new Set(plan.filter((p) => p.camp === c && p.mtype === "DA" && rangeMonths().includes(p.month)).map((p) => p.obj))].sort((a, b) => OBJ_ORDER[a] - OBJ_ORDER[b]);
      let first = true;
      objs.forEach((o) => {
        const cts = [...new Set(plan.filter((p) => p.camp === c && p.mtype === "DA" && p.obj === o && rangeMonths().includes(p.month)).map((p) => p.ct))];
        cts.forEach((ct, i) => { const v = rc.filter((r) => r.obj === o && r.ct === ct); objRows.push(metricRow([first ? c : "", i === 0 ? o : "", ct], AGG(v), budgetOf((p) => p.camp === c && p.mtype === "DA" && p.obj === o && p.ct === ct), [onBadge(onOf((p) => p.camp === c && p.ct === ct && p.mtype === "DA"))])); first = false; });
        objRows.push(metricRow(["", `${o} 소계`, ""], AGG(rc.filter((r) => r.obj === o)), budgetOf((p) => p.camp === c && p.mtype === "DA" && p.obj === o), [""], "subtotal"));
      });
      objRows.push(metricRow([`${c} 소계`, "", ""], AGG(rc), budgetOf((p) => p.camp === c && p.mtype === "DA"), [""], "total"));
    });
    html += card("DA Objective × Content Type 성과", "", `<div class="chips">${chips("da-camp", [["BAU", "BAU"], ["D2C", "D2C"]], true)}</div>` + table("t-da-obj", headDA(["Campaign", "Objective", "Content Type"], ["ON/OFF"]), objRows, { left: [0, 1, 2] }), { csv: "t-da-obj" });
    // Content Type × Media
    const ctRows = [], gct = groupBy(rows.filter((r) => camps.includes(r.camp)), "ct");
    [...gct.entries()].forEach(([ct, v]) => {
      const gm = groupBy(v, "media"); let i = 0;
      gm.forEach((mv, m) => { ctRows.push(metricRow([i++ === 0 ? ct : "", m], AGG(mv), budgetOf((p) => p.ct === ct && p.media === m && p.mtype === "DA"), [onBadge(onOf((p) => p.ct === ct && p.media === m))])); });
      ctRows.push(metricRow([`${ct} 소계`, ""], AGG(v), budgetOf((p) => p.ct === ct && p.mtype === "DA"), [""], "subtotal"));
    });
    html += card("DA Media 성과 (Content Type × Media)", "", table("t-da-ctm", headDA(["Content Type", "Media"], ["ON/OFF"]), ctRows, { left: [0, 1] }), { csv: "t-da-ctm" });
    // Creative Name
    const q = (S.q["da-cr"] || "").toLowerCase(), crRows = [];
    groupBy(rows.filter((r) => camps.includes(r.camp) && (!q || r.creative.toLowerCase().includes(q))), "ct").forEach((v, ct) => {
      let i = 0; groupBy(v, "creative").forEach((cv, c) => { const a = AGG(cv); crRows.push({ cells: [i++ === 0 ? ct : "", c, onBadge(cv[0].on), ...metricCells(a)] }); });
      crRows.push({ cells: [`${ct} 소계`, "", "", ...metricCells(AGG(v))], cls: "subtotal" });
    });
    html += card("DA Creative Name 성과 (Content Type × Creative Name)", "", table("t-da-cr", ["Content Type", "Creative Name", "ON/OFF", ...M_DA.map((m) => m[1])], crRows, { left: [0, 1] }), { csv: "t-da-cr", search: "da-cr" });
    // Date × Media pivot
    const mt = chipVal("da-pivot", "cost"), metric = M_DA.find((m) => m[0] === mt), mediaList = [...new Set(rows.map((r) => r.media))];
    const byDate = groupBy(rows, "date"), dates = [...byDate.keys()].sort();
    const pv = dates.map((d) => { const gm = groupBy(byDate.get(d), "media"); return { cells: [d, ...mediaList.map((m) => metric[2](AGG(gm.get(m) || [])[mt])), `<b>${metric[2](AGG(byDate.get(d))[mt])}</b>`] }; });
    html += card("DA Media 성과 (Date × Media)", "", `<div class="chips"><span class="lbl">소진</span>${chips("da-pivot", [["cost", "소진금액"]], 0, "cost")}<span class="lbl">볼륨</span>${chips("da-pivot", [["imp", "노출"], ["clicks", "클릭"], ["views", "영상조회"]], 0, "cost")}<span class="lbl">효율</span>${chips("da-pivot", [["ctr", "CTR"], ["cpc", "CPC"], ["cpm", "CPM"]], 0, "cost")}<span class="lbl">전환</span>${chips("da-pivot", [["sessions", "세션수"], ["leads", "상담신청"], ["signups", "회원가입"], ["cpaL", "CPA(상담신청)"], ["cpaS", "CPA(회원가입)"]], 0, "cost")}</div>` + table("t-da-pv", ["날짜", ...mediaList, "합계"], pv, { left: [0] }), { csv: "t-da-pv" });
    // Daily
    const objs = chipVal("da-daily", ["Traffic", "Counsel"]), dRows = [...groupBy(rows.filter((r) => objs.includes(r.obj)), "date").entries()].sort().map(([d, v]) => { const a = AGG(v); return { cells: [d, W(a.cost), N(a.imp), N(a.clicks), N(a.views), W(a.cpm), W(a.cpc), P(a.ctr), N(a.sessions), N(a.leads), N(a.signups), W(a.cps), W(a.cpaL), W(a.cpaS), P(a.cvrL), P(a.cvrS)], sv: [d, a.cost, a.imp, a.clicks, a.views, a.cpm, a.cpc, a.ctr, a.sessions, a.leads, a.signups, a.cps, fin(a.cpaL), fin(a.cpaS), a.cvrL, a.cvrS] }; });
    html += card("DA 일별 성과", "", `<div class="chips">${chips("da-daily", [["Traffic", "Traffic"], ["Counsel", "Counsel"]], true)}</div>` + table("t-da-day", ["날짜", ...M_DA.map((m) => m[1])], dRows, { sortable: true, left: [0] }), { csv: "t-da-day" });
    $("#view").innerHTML = html;
  }

  // ---------- SA Performance ----------
  const M_SA = (a) => [W(a.cost), N(a.imp), N(a.clicks), W(a.cpc), P(a.ctr), N(a.leads), N(a.signups), N(a.mleads), N(a.msign), W(a.cpaL), W(a.cpaS), W(a.mleads ? a.cost / a.mleads : NaN), W(a.msign ? a.cost / a.msign : NaN)];
  const H_SA = ["소진금액", "노출", "클릭", "CPC", "CTR", "GA 상담신청", "GA 회원가입", "매체 상담신청", "매체 회원가입", "CPA(GA 상담)", "CPA(GA 회원)", "CPA(매체 상담)", "CPA(매체 회원)"];
  function renderSA() {
    const rows = ALL.filter((r) => r.mtype === "SA" && inRange(r) && (!S.media || r.media === S.media));
    const bsa = AGG(rows.filter((r) => r.media === "Naver Brand SA")), pl = AGG(rows.filter((r) => r.media === "Naver SA")), go = AGG(rows.filter((r) => r.media === "Google SA"));
    let html = insight("", ` ${S.from} ~ ${S.to}`, `<div class="sub">&lt;네이버 브랜드검색&gt;</div><ul><li>기간 평균 CTR <b>${P(bsa.ctr)}</b>, CPC(계약 환산) <b>${W(bsa.contract / bsa.clicks)}</b>로 기록 중입니다.</li></ul><div class="sub">&lt;네이버 파워링크&gt;</div><ul><li>기간 평균 CTR <b>${P(pl.ctr)}</b>, CPC <b>${W(pl.cpc)}</b>로 기록 중입니다.</li></ul><div class="sub">&lt;구글&gt;</div><ul><li>기간 평균 CTR <b>${P(go.ctr)}</b>, CPC <b>${W(go.cpc)}</b>로 기록 중입니다.</li></ul>`, "상세보기");
    const grp = { Naver: ["Naver SA", "Naver Brand SA", "Naver Place"], Google: ["Google SA"] }, mpRows = [];
    Object.entries(grp).forEach(([g, ms]) => {
      let first = true;
      ms.forEach((m) => { groupBy(rows.filter((r) => r.media === m), "product").forEach((v, prod) => { const b = budgetOf((p) => p.media === m && p.product === prod), a = AGG(v), pr = prog(a.cost || a.contract, b); mpRows.push({ cells: [first ? g : "", m, prod, onBadge(true), pr.bar, pr.pct, ...M_SA(a)] }); first = false; }); });
      const v = rows.filter((r) => ms.includes(r.media)), a = AGG(v), b = budgetOf((p) => ms.includes(p.media)), pr = prog(a.cost + a.contract, b);
      mpRows.push({ cells: [`${g} 소계`, "", "", "", pr.bar, pr.pct, ...M_SA(a)], cls: "subtotal" });
    });
    const T = AGG(rows), tb = budgetOf((p) => p.mtype === "SA"), tp = prog(T.cost + T.contract, tb);
    html += card("SA 매체별 성과 (Media · Product)", "", table("t-sa-mp", ["그룹", "Media", "Product", "ON/OFF", "Budget(Gross)", "진척률", ...H_SA], mpRows, { left: [0, 1, 2], foot: { cells: ["", "총합계", "", "", tp.bar, tp.pct, ...M_SA(T)], cls: "total" } }), { csv: "t-sa-mp" });
    const campT = (media, id, title) => { const v = rows.filter((r) => r.media === media), g = groupBy(v, "cidx"); const body = [...g.entries()].sort((a, b) => sum(b[1], "cost") - sum(a[1], "cost")).map(([c, cv]) => { const a = AGG(cv); return { cells: [c, onBadge(c !== "Festa"), ...M_SA(a)], sv: [c, 0, a.cost, a.imp, a.clicks, a.cpc, a.ctr, a.leads, a.signups, a.mleads, a.msign, fin(a.cpaL), fin(a.cpaS), 0, 0] }; }); return card(title, "", table(id, ["Campaign Index", "ON/OFF", ...H_SA], body, { sortable: true, left: [0], foot: { cells: ["", "", ...M_SA(AGG(v))], cls: "total" } }), { csv: id }); };
    html += campT("Naver SA", "t-sa-n", "Naver SA Campaign 성과") + campT("Google SA", "t-sa-g", "Google SA Campaign 성과");
    const dRows = [...groupBy(rows.filter((r) => r.media !== "Naver Brand SA"), "date").entries()].sort().map(([d, v]) => { const a = AGG(v); return { cells: [d, ...M_SA(a)], sv: [d, a.cost, a.imp, a.clicks, a.cpc, a.ctr, a.leads, a.signups, a.mleads, a.msign, fin(a.cpaL), fin(a.cpaS), 0, 0] }; });
    html += card("SA 일별 성과", "", table("t-sa-day", ["날짜", ...H_SA], dRows, { sortable: true, left: [0] }), { csv: "t-sa-day" });
    $("#view").innerHTML = html;
  }

  // ---------- Keyword Insights ----------
  function kwAgg(from, to, media) { const m = new Map(); sa.forEach((r) => { if (r.date < from || r.date > to || (media && !media.includes(r.media))) return; const k = r.media + "|" + r.device + "|" + r.cidx + "|" + r.kw; const o = m.get(k) || { media: r.media, device: r.device, cidx: r.cidx, kw: r.kw, cost: 0, imp: 0, clicks: 0, leads: 0, sessions: 0 }; o.cost += r.cost; o.imp += r.imp; o.clicks += r.clicks; o.leads += r.leads; o.sessions += r.sessions; m.set(k, o); }); return m; }
  function renderKeyword() {
    const cur = kwAgg(S.from, S.to, ["Naver SA", "Google SA"]), list = [...cur.values()];
    const worst = list.filter((k) => k.leads > 0).sort((a, b) => b.cost / b.leads - a.cost / a.leads)[0];
    const leak = list.filter((k) => k.cost >= 50000 && k.leads === 0).sort((a, b) => b.cost - a.cost);
    let html = insight("", ` ${S.from} ~ ${S.to}`, `<ul>${worst ? `<li>비싼 CPA 1위 키워드: <b>[${worst.media} ${worst.device}] ${esc(worst.kw)}</b> (${worst.cidx}) — CPA(상담) <b>${W(worst.cost / worst.leads)}</b> (상담 ${worst.leads}, 소진 ${W(worst.cost)}).</li>` : ""}<li>누수 키워드 <b>${leak.length}개</b> (₩50,000+ · 상담 0) · 합계 <b>${W(sum(leak, "cost"))}</b>${leak[0] ? ` — 최대: <b>[${leak[0].media}] ${esc(leak[0].kw)}</b> (${W(leak[0].cost)})` : ""}.</li></ul>`);
    const win = chipVal("kw-win", "7") === "30" ? 30 : 7, a1 = kwAgg(shift(S.to, -win + 1), S.to, ["Naver SA", "Google SA"]), a0 = kwAgg(shift(S.to, -2 * win + 1), shift(S.to, -win), ["Naver SA", "Google SA"]);
    const byKw = (m) => { const o = new Map(); m.forEach((v) => { const k = v.media + "|" + v.device + "|" + v.kw; const x = o.get(k) || { media: v.media, device: v.device, kw: v.kw, cost: 0, leads: 0 }; x.cost += v.cost; x.leads += v.leads; o.set(k, x); }); return o; };
    const k1 = byKw(a1), k0 = byKw(a0);
    const top = [...k1.values()].sort((a, b) => b.cost - a.cost).slice(0, 10);
    const neu = [...k1.values()].filter((v) => v.cost > 0 && !(k0.get(v.media + "|" + v.device + "|" + v.kw) || {}).cost).sort((a, b) => b.cost - a.cost).slice(0, 10);
    const gone = [...k0.values()].filter((v) => v.cost > 0 && !(k1.get(v.media + "|" + v.device + "|" + v.kw) || {}).cost).sort((a, b) => b.cost - a.cost).slice(0, 10);
    const tag = (m) => `<span class="mini ${m.startsWith("Naver") ? "naver" : "google"}">${m.startsWith("Naver") ? "Naver" : "Google"}</span>`;
    const li = (arr, withDelta) => arr.length ? arr.map((v, i) => { const p = (k0.get(v.media + "|" + v.device + "|" + v.kw) || {}).cost; return `<li><span class="n">${i + 1}</span>${tag(v.media)}<span>${esc(v.kw)}${v.device !== "ALL" ? ` <small class="muted">${v.device}</small>` : ""}</span><b>${W(v.cost)}</b><span class="${withDelta && p ? (v.cost > p ? "pos" : "neg") : "muted"}" style="text-align:right">${withDelta && p ? (v.cost > p ? "+" : "") + N(chg(v.cost, p), 0) + "%" : ""}</span></li>`; }).join("") : `<li><span></span><span></span><span class="muted">해당 없음</span></li>`;
    const upC = list.filter((k) => k.leads >= 1 && k.cost / k.leads < 60000).length, dnC = leak.length + list.filter((k) => k.cost >= 30000 && k.cost < 50000 && k.leads === 0).length;
    html += card("키워드 트렌드 · 최근 " + win + "일", "", `<div class="trend3"><div><h4>소진 Top 10<small>${top.length}</small></h4><ol>${li(top, true)}</ol></div><div><h4>신규 진입<small>${neu.length}</small></h4><ol>${li(neu)}</ol></div><div><h4>이탈<small>${gone.length}</small></h4><ol>${li(gone)}</ol></div></div><div class="trend-foot"><span>입찰 조정 후보 (${win}일 데이터 기준 · 최대 100개)</span><span class="tools"><button class="btn up" data-toast="상향 후보: 상담 1건 이상 · CPA 6만 원 미만 키워드">↑ 입찰 상향 후보 (${upC})</button><button class="btn down" data-toast="하향 후보: 소진 3만 원 이상 · 상담 0 키워드">↓ 입찰 하향 후보 (${dnC})</button></span></div>`, { extra: `<span class="chips" style="margin:0"><span class="lbl">비교</span>${chips("kw-win", [["7", "7일"], ["30", "30일"]])}</span>` });
    const kwTable = (media, id, title, campItems) => {
      const camp = chipVal(id + "-c", "all"), flt = S.chips[id + "-f"] || "", cmp = S.chips[id + "-cmp"] || "", q = (S.q[id] || "").toLowerCase();
      let arr = list.filter((k) => k.media === media && (camp === "all" || k.cidx === camp) && (!q || k.kw.toLowerCase().includes(q)));
      if (flt === "l1") arr = arr.filter((k) => k.leads >= 1); if (flt === "c10") arr = arr.filter((k) => k.clicks >= 10 && k.leads === 0);
      const cw = cmp === "mom" ? 30 : 7, b1 = kwAgg(shift(S.to, -cw + 1), S.to, [media]), b0 = kwAgg(shift(S.to, -2 * cw + 1), shift(S.to, -cw), [media]);
      const head = ["Media", "기기", "Campaign Index", "키워드", "소진금액", "노출", "클릭", "CTR", "CPC", "상담신청", "CPA(상담신청)", ...(cmp ? ["Δ소진", "Δ클릭", "Δ상담"] : [])];
      const body = arr.sort((a, b) => b.cost - a.cost).map((k) => { const kk = k.media + "|" + k.device + "|" + k.cidx + "|" + k.kw, x1 = b1.get(kk) || {}, x0 = b0.get(kk) || {}; return { cells: [k.media, k.device, k.cidx, esc(k.kw), W(k.cost), N(k.imp), N(k.clicks), P(k.clicks / k.imp * 100), W(k.cost / k.clicks), N(k.leads), k.leads ? W(k.cost / k.leads) : "-", ...(cmp ? [arrow(chg(x1.cost, x0.cost)), arrow(chg(x1.clicks, x0.clicks)), arrow(chg(x1.leads, x0.leads))] : [])], sv: [k.media, k.device, k.cidx, k.kw, k.cost, k.imp, k.clicks, k.clicks / k.imp, k.cost / k.clicks, k.leads, k.leads ? k.cost / k.leads : null] }; });
      return card(title, "", `<div class="chips"><span class="lbl">캠페인</span>${chips(id + "-c", [["all", "전체"], ...campItems.map((c) => [c, c])])}</div><div class="chips"><span class="lbl">필터</span>${chips(id + "-f", [["", "전체"], ["l1", "상담 ≥ 1"], ["c10", "클릭 ≥ 10 · 상담 0"]])}<span class="lbl" style="margin-left:8px">비교</span>${chips(id + "-cmp", [["", "없음"], ["wow", "WoW (7일)"], ["mom", "MoM (30일)"]])}</div>` + table(id, head, body, { sortable: true, left: [0, 1, 2, 3], page: 20 }), { csv: id, search: id });
    };
    html += kwTable("Naver SA", "t-kw-n", "Naver SA 키워드 성과", ["Product", "Brand", "Construction", "Showroom", "Remodeling", "Region", "Compare", "Festa", "Kitchen"]);
    html += kwTable("Google SA", "t-kw-g", "Google 키워드 성과", ["Brand", "Non-Brand", "Sub"]);
    const bsa = [...kwAgg(S.from, S.to, ["Naver Brand SA"]).values()].sort((a, b) => b.clicks - a.clicks).map((k) => ({ cells: ["Naver Brand SA", k.device, esc(k.kw), N(k.imp), N(k.clicks), P(k.clicks / k.imp * 100), N(k.leads), P(k.leads / k.clicks * 100)], sv: ["", "", k.kw, k.imp, k.clicks, k.clicks / k.imp, k.leads, k.leads / k.clicks] }));
    html += card("Naver BSA 키워드 성과", "BSA는 정액 계약이라 키워드별 소진금액이 없어 노출 · 클릭 · 상담 기준으로 표시합니다", table("t-kw-b", ["Media", "기기", "키워드", "노출", "클릭", "CTR", "상담신청", "CVR(상담신청)"], bsa, { sortable: true, left: [0, 1, 2] }), { csv: "t-kw-b" });
    $("#view").innerHTML = html;
  }

  // ---------- Creative Asset ----------
  const thumbHTML = (c, big) => { const [g, copy] = c.theme; const [a, b] = g.split(","); return big ? `<div class="thumb ${c.form}" style="background:linear-gradient(150deg,${a},${b})"><span class="brand">SAMPLE</span><span class="copy">${esc(copy)}</span>${c.form === "video" ? `<span class="play"><i>▶</i></span><span class="vtag">VIDEO</span>` : ""}</div>` : `<span class="tmini" style="background:linear-gradient(150deg,${a},${b})"></span>`; };
  function creativeList(rows) {
    const g = groupBy(rows, (r) => r.ct + "|" + r.media + "|" + r.creative);
    return [...g.values()].map((v) => { const a = AGG(v), f = v[0]; return { ...a, ct: f.ct, obj: f.obj, camp: f.camp, media: f.media, name: f.creative, form: f.form, theme: f.theme, on: f.on }; });
  }
  function renderCreative() {
    const rows = rowsAll().filter((r) => r.mtype === "DA"), list = creativeList(rows);
    const cs = list.filter((c) => c.obj === "Counsel" && c.cost > 0), tr = list.filter((c) => c.obj === "Traffic" && c.cost > 0);
    const cAvg = AGG(rows.filter((r) => r.obj === "Counsel")).ctr, lowC = cs.slice().sort((a, b) => a.ctr - b.ctr)[0];
    const zero = cs.filter((c) => c.leads === 0 && c.cost >= 200000).sort((a, b) => b.cost - a.cost);
    let html = insight("", ` 활성 Creative Name ${S.to} 기준`, `<ul>${lowC ? `<li><b>Counsel</b> CTR 하위 Creative Name: <b>${esc(lowC.name)}</b> — ${P(lowC.ctr)} (Counsel 평균 ${P(cAvg)} 대비 ${N(chg(lowC.ctr, cAvg), 1)}%).</li>` : ""}<li><b>Counsel</b> 0 전환 고비용 Creative Name <b>${zero.length}개</b> (₩200K+ · 상담 0) · 합계 ${W(sum(zero, "cost"))}${zero[0] ? ` — 최대: <b>${esc(zero[0].name)}</b> (${W(zero[0].cost)})` : ""}.</li></ul>`);
    const nd = Math.max(1, Math.round((parse(S.to) - parse(S.from)) / 864e5) + 1);
    const quadBox = (arr, xk, yk) => { const xs = arr.map((c) => c[xk]).filter(fin).sort((a, b) => a - b), ys = arr.map((c) => c[yk]).sort((a, b) => a - b); const mx = xs[Math.floor(xs.length / 2)] || 0, my = ys[Math.floor(ys.length / 2)] || 0; const q = { q1: [], q2: [], q3: [], q4: [] }; arr.forEach((c) => { const x = fin(c[xk]) ?? Infinity, y = c[yk]; q[x <= mx ? (y >= my ? "q1" : "q3") : (y >= my ? "q2" : "q4")].push(c); }); return { mx, my, q }; };
    const qc = quadBox(cs, "cpaL", "cvrL"), qt = quadBox(tr, "cps", "ctr");
    const quadHTML = (qq) => `<div class="quad"><div><span class="q1">우수</span><b>${qq.q.q1.length}</b><br>CPA↓ 성과↑</div><div><span class="q2">고비용-고전환</span><b>${qq.q.q2.length}</b><br>CPA↑ 성과↑</div><div><span class="q3">저비용-저전환</span><b>${qq.q.q3.length}</b><br>CPA↓ 성과↓</div><div><span class="q4">위험</span><b>${qq.q.q4.length}</b><br>CPA↑ 성과↓</div></div><p class="note" style="margin:6px 0 0;color:var(--muted);font-size:10.5px">위험 즉시 차단 시 일평균 <b style="color:var(--red)">${W(sum(qq.q.q4, "cost") / nd)}</b> 절감 가능</p>`;
    html += `<div class="grid2"><div class="card"><p class="chart-title"><b style="color:var(--ink)">Counsel — CVR(상담) × CPA(상담)</b> · 버블=비용 · 점선=중앙값</p><div class="chart bubble"><canvas id="b1"></canvas></div>${quadHTML(qc)}</div><div class="card"><p class="chart-title"><b style="color:var(--ink)">Traffic — CTR × CPA(세션)</b> · 버블=비용 · 점선=중앙값</p><div class="chart bubble"><canvas id="b2"></canvas></div>${quadHTML(qt)}</div></div>`;
    // 갤러리
    const gObj = chipVal("cr-obj", "Counsel"), states = chipVal("cr-st", ["on", "off"]), forms = chipVal("cr-form", ["image", "video"]), sk = chipVal("cr-sort", "cps"), q = (S.q["cr-g"] || "").toLowerCase(), per = Number(chipVal("cr-per", "8"));
    const cnt = (o) => list.filter((c) => c.obj === o).length;
    let gl = list.filter((c) => c.obj === gObj && states.includes(c.on ? "on" : "off") && forms.includes(c.form) && (!q || c.name.toLowerCase().includes(q)));
    gl.sort((a, b) => ["cps", "cpaL", "cpc"].includes(sk) ? (fin(a[sk]) ?? Infinity) - (fin(b[sk]) ?? Infinity) : b[sk] - a[sk]);
    const pages = Math.max(1, Math.ceil(gl.length / per)), cur = Math.min(S.page["cr-g"] || 1, pages), pageItems = gl.slice((cur - 1) * per, cur * per);
    const cardHTML = (c) => `<div class="cr">${thumbHTML(c, true)}<div class="cr-body"><div class="nm"><span class="dot ${c.on ? "" : "off"}"></span>${c.on ? "ON" : "OFF"} · ${esc(c.name)}</div><div class="meta">${c.media} · ${c.camp} · ${esc(c.ct)}</div><div class="m2"><span>CTR <b>${P(c.ctr)}</b></span><span>CPC <b>${W(c.cpc)}</b></span><span class="hl">CPA·세션 <b>${W(c.cps)}</b></span><span class="cpa">CPA·상담 <b>${c.leads ? W(c.cpaL) : "-"}</b></span></div><div class="tot">소진금액 ${W(c.cost)}<br>노출 ${N(c.imp)} · 클릭 ${N(c.clicks)}<br>세션 ${N(c.sessions)} · 상담 ${N(c.leads)}</div></div></div>`;
    html += card("Creative Name 갤러리", "", `<div class="chips">${chips("cr-obj", [["Counsel", `전환 · Counsel ${cnt("Counsel")}`], ["Traffic", `트래픽 · Traffic ${cnt("Traffic")}`], ["Etc", `Etc ${cnt("Etc")}`]])}</div>
      <div class="chips"><span class="lbl">상태</span>${chips("cr-st", [["on", "ON"], ["off", "OFF"]], true)}<span class="lbl" style="margin-left:8px">형태</span>${chips("cr-form", [["image", "이미지"], ["video", "비디오"]], true)}<span class="lbl" style="margin-left:8px">페이지당</span>${chips("cr-per", [["8", "8"], ["16", "16"], ["40", "40"]])}<span style="margin-left:auto" class="muted">Drive 동기화 ${S.to} 08:41 <button class="btn" data-toast="데모에서는 Drive 동기화가 꺼져 있어요">⟳ Drive 동기화</button></span></div>
      <div class="chips"><span class="lbl">정렬</span>${chips("cr-sort", [["cost", "소진금액"], ["imp", "노출수"], ["clicks", "클릭수"], ["ctr", "CTR"], ["sessions", "세션수"], ["leads", "상담신청"], ["cpc", "CPC"], ["cps", "CPA(세션)"], ["cpaL", "CPA(상담)"]])}<span style="margin-left:auto" class="muted">전체 ${gl.length}개</span></div>
      <div class="gallery">${pageItems.map(cardHTML).join("") || `<p class="muted">조건에 맞는 소재가 없어요</p>`}</div>${pages > 1 ? `<div class="pager"><span></span><span class="pages">${Array.from({ length: pages }, (_, i) => `<button data-page="cr-g" data-p="${i + 1}" class="${i + 1 === cur ? "on" : ""}">${i + 1}</button>`).join("")}</span><span>${cur} / ${pages} 페이지</span></div>` : ""}`, { search: "cr-g" });
    // Creative Name 성과 표
    const q2 = (S.q["t-cr"] || "").toLowerCase(), body = list.filter((c) => !q2 || c.name.toLowerCase().includes(q2)).map((c) => ({ cells: [thumbHTML(c), esc(c.ct), c.media, esc(c.name), onBadge(c.on), W(c.cost), N(c.imp), N(c.clicks), N(c.views), W(c.cpm), W(c.cpc), P(c.ctr), N(c.sessions), N(c.leads), N(c.signups), W(c.cps), c.leads ? W(c.cpaL) : "-"], sv: [0, c.ct, c.media, c.name, c.on ? 1 : 0, c.cost, c.imp, c.clicks, c.views, c.cpm, c.cpc, c.ctr, c.sessions, c.leads, c.signups, c.cps, fin(c.cpaL)] }));
    if (!S.sort["t-cr"]) S.sort["t-cr"] = { i: 5, dir: "desc" };
    html += card("Creative Name 성과", "", table("t-cr", ["이미지", "Content Type", "Media", "Creative Name", "ON/OFF", "소진금액", "노출", "클릭", "영상조회", "CPM", "CPC", "CTR", "세션수", "상담신청", "회원가입", "CPA(세션)", "CPA(상담)"], body, { sortable: true, left: [0, 1, 2, 3], noSort: [0], page: 12 }), { csv: "t-cr", search: "t-cr" });
    $("#view").innerHTML = html;
    const colors = { q1: "#22c55e", q2: "#3b82f6", q3: "#a855f7", q4: "#ef4444" };
    const bubble = (id, arr, qq, xk, yk, xl, yl) => {
      const xmax = Math.max(...arr.map((c) => fin(c[xk]) || 0)) * 1.08 || 1, maxC = Math.max(...arr.map((c) => c.cost)) || 1;
      const ds = Object.entries(qq.q).map(([qn, items]) => ({ label: qn, data: items.map((c) => ({ x: fin(c[xk]) ?? xmax, y: c[yk], r: 4 + Math.sqrt(c.cost / maxC) * 13, n: c.name })), backgroundColor: colors[qn] + "aa", borderColor: colors[qn] }));
      const medLines = { id: "med" + id, afterDraw(ch) { const { ctx, chartArea: a, scales: { x, y } } = ch; ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = "#9ca3af"; ctx.beginPath(); const px = x.getPixelForValue(qq.mx), py = y.getPixelForValue(qq.my); ctx.moveTo(px, a.top); ctx.lineTo(px, a.bottom); ctx.moveTo(a.left, py); ctx.lineTo(a.right, py); ctx.stroke(); ctx.restore(); } };
      draw(id, { type: "bubble", data: { datasets: ds }, plugins: [medLines], options: { maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => `${c.raw.n} · ${xl} ${W(c.raw.x)} · ${yl} ${N(c.raw.y, 2)}%` } } }, scales: { x: { title: { display: true, text: xl + " →" }, ticks: { callback: (v) => "₩" + N(v) } }, y: { title: { display: true, text: yl + " (%)" } } } } });
    };
    bubble("b1", cs, qc, "cpaL", "cvrL", "CPA(상담)", "CVR(상담)");
    bubble("b2", tr, qt, "cps", "ctr", "CPA(세션)", "CTR");
  }

  // ---------- Media Mix ----------
  const expect = (p) => { if (p.mtype === "SA") { const clicks = p.budget / 820, imp = clicks / .035, sessions = clicks * .86, leads = sessions * .021; return { imp, clicks, sessions, leads }; } const m = MEDIA[p.media], o = { Traffic: [.85, 1.1, .00035], Counsel: [1.7, .75, .0065], Etc: [1, .8, 0] }[p.obj]; const imp = p.budget / (m.cpm * o[0]) * 1000, clicks = imp * m.ctr * o[1] / 100, sessions = clicks * m.sr, leads = sessions * o[2]; return { imp, clicks, sessions, leads }; };
  function renderMix() {
    const mo = monthOf(S.to), pm = prevMonth(mo), fc = chipVal("mix-c", ""), ft = chipVal("mix-t", ""), fo = chipVal("mix-o", "");
    const pass = (p) => (!fc || p.camp === fc) && (!ft || p.mtype === ft) && (!fo || p.obj === fo);
    const cur = plan.filter((p) => p.month === mo && pass(p)), prv = plan.filter((p) => p.month === pm && pass(p));
    const tot = (arr) => { const o = { budget: 0, imp: 0, clicks: 0, sessions: 0, leads: 0 }; arr.forEach((p) => { const e = expect(p); o.budget += p.budget; o.imp += e.imp; o.clicks += e.clicks; o.sessions += e.sessions; o.leads += e.leads; }); o.cpc = o.budget / o.clicks; o.ctr = o.clicks / o.imp * 100; o.cpa = o.budget / o.leads; return o; };
    const A = tot(cur), B = tot(prv);
    const kp = [["총 예산", W(A.budget), W(B.budget), chg(A.budget, B.budget)], ["예상 노출", N(A.imp), N(B.imp), chg(A.imp, B.imp)], ["예상 클릭", N(A.clicks), N(B.clicks), chg(A.clicks, B.clicks)], ["예상 상담신청", N(A.leads) + "건", N(B.leads) + "건", chg(A.leads, B.leads)], ["예상 세션", N(A.sessions), N(B.sessions), chg(A.sessions, B.sessions)], ["CPC", W(A.cpc), W(B.cpc), chg(A.cpc, B.cpc), 1], ["CTR", P(A.ctr), P(B.ctr), chg(A.ctr, B.ctr)], ["CPA(상담)", W(A.cpa), W(B.cpa), chg(A.cpa, B.cpa), 1]];
    const keyOf = (p) => [p.camp, p.mtype, p.obj, p.ct, p.media].join("|"), map = new Map();
    cur.forEach((p) => { const k = keyOf(p), o = map.get(k) || { p, cur: 0, prv: 0, ec: { imp: 0, clicks: 0, leads: 0 }, ep: { imp: 0, clicks: 0, leads: 0 } }; o.cur += p.budget; const e = expect(p); o.ec.imp += e.imp; o.ec.clicks += e.clicks; o.ec.leads += e.leads; map.set(k, o); });
    prv.forEach((p) => { const k = keyOf(p), o = map.get(k) || { p, cur: 0, prv: 0, ec: { imp: 0, clicks: 0, leads: 0 }, ep: { imp: 0, clicks: 0, leads: 0 } }; o.prv += p.budget; const e = expect(p); o.ep.imp += e.imp; o.ep.clicks += e.clicks; o.ep.leads += e.leads; map.set(k, o); });
    const items = [...map.values()].sort((a, b) => (b.cur > 0) - (a.cur > 0) || (a.p.camp > b.p.camp ? 1 : -1) || (a.p.mtype < b.p.mtype ? 1 : -1) || OBJ_ORDER[a.p.obj] - OBJ_ORDER[b.p.obj]);
    const pctTxt = (v) => fin(v) === null ? "n/a" : `<span class="${v > 0 ? "pos" : v < 0 ? "neg" : ""}">${v > 0 ? "+" : ""}${N(v, 0)}%</span>`;
    let last = "";
    const rows = items.map((o) => { const p = o.p, g = p.camp + p.mtype + p.obj, show = g !== last; last = g; return { cells: [show ? p.camp : "", show ? `<span class="badge ${p.mtype.toLowerCase()}">${p.mtype}</span>` : "", show ? p.obj : "", esc(p.ct), p.media, o.prv ? W(o.prv) : "-", o.cur ? W(o.cur) : "-", pctTxt(o.prv ? chg(o.cur, o.prv) : NaN), o.cur ? P(o.cur / A.budget * 100, 1) : "-", pctTxt(o.ep.imp ? chg(o.ec.imp, o.ep.imp) : NaN), pctTxt(o.ep.clicks ? chg(o.ec.clicks, o.ep.clicks) : NaN), pctTxt(o.ep.leads ? chg(o.ec.leads, o.ep.leads) : NaN), o.ec.leads ? W(o.cur / o.ec.leads) : "-"], cls: o.cur ? "" : "subtotal" }; });
    const stopMedia = [...new Set(prv.map((p) => p.media))].filter((m) => !cur.some((p) => p.media === m)), newCT = [...new Set(cur.map((p) => p.ct))].filter((c) => !prv.some((p) => p.ct === c)), stopCT = [...new Set(prv.map((p) => p.ct))].filter((c) => !cur.some((p) => p.ct === c));
    const byM = (arr) => { const m = {}; arr.forEach((p) => { m[p.media] = (m[p.media] || 0) + p.budget; }); return m; }, mc = byM(cur), mp = byM(prv);
    const drop = Object.keys(mp).filter((m) => mc[m]).map((m) => [m, chg(mc[m], mp[m])]).sort((a, b) => a[1] - b[1])[0];
    const camp = (arr, c) => arr.filter((p) => p.camp === c).reduce((s, p) => s + p.budget, 0);
    const bullets = [`총 예산 <b>${N(chg(A.budget, B.budget), 1)}%</b> (지난달 ${W(B.budget)} → 이번달 ${W(A.budget)}).`, `Campaign 비중 — BAU ${N(chg(camp(cur, "BAU"), camp(prv, "BAU")), 1)}% (${W(camp(prv, "BAU"))} → ${W(camp(cur, "BAU"))}), D2C ${N(chg(camp(cur, "D2C"), camp(prv, "D2C")), 1)}% (${W(camp(prv, "D2C"))} → ${W(camp(cur, "D2C"))}).`, `예상 상담신청 <b>${N(chg(A.leads, B.leads), 1)}%</b> (${N(B.leads)}건 → ${N(A.leads)}건), CPA(상담) ${N(chg(A.cpa, B.cpa), 1)}%.`, `예상 노출 ${N(chg(A.imp, B.imp), 1)}%, 클릭 ${N(chg(A.clicks, B.clicks), 1)}%, CPC ${N(chg(A.cpc, B.cpc), 1)}%, CTR ${N(chg(A.ctr, B.ctr), 1)}%.`, stopMedia.length ? `🟦 중단 Media ${stopMedia.length}개: <b>${stopMedia.join(", ")}</b> (지난달 ${W(stopMedia.reduce((s, m) => s + mp[m], 0))}).` : "", newCT.length ? `🟩 신규 Content Type ${newCT.length}개: <b>${newCT.join(", ")}</b>.` : "", stopCT.length ? `🟥 중단 Content Type ${stopCT.length}개: <b>${stopCT.join(", ")}</b>.` : "", drop ? `예산 감소 1위 Media: <b>${drop[0]}</b> ${N(drop[1], 1)}% (${W(mp[drop[0]])} → ${W(mc[drop[0]])}).` : ""].filter(Boolean);
    let html = `<section class="card"><div class="card-head"><h3><span class="badge" style="background:var(--soft);color:var(--muted)">MOM 비교</span> 지난 달 vs 이번 달 미디어 믹스 <small>(Plan · ${pm} → ${mo})</small></h3></div>
      <div class="chips"><span class="lbl">CAMPAIGN</span>${chips("mix-c", [["", "전체"], ["BAU", "BAU"], ["D2C", "D2C"]]).replace(/chip /g, "chip amber ")}<span class="lbl" style="margin-left:8px">MEDIA TYPE</span>${chips("mix-t", [["", "전체"], ["SA", "SA"], ["DA", "DA"]]).replace(/chip /g, "chip amber ")}<span class="lbl" style="margin-left:8px">OBJECTIVE</span>${chips("mix-o", [["", "전체"], ["Traffic", "Traffic"], ["Counsel", "Counsel"]]).replace(/chip /g, "chip amber ")}</div>
      <div class="kpis">${kp.map(([l, a, b, d, inv]) => `<div class="kpi"><span>${l}</span><b>${a}</b><em>지난달 ${b} ${arrow(d, inv)}</em></div>`).join("")}</div>
      <ul style="margin:0 0 10px;padding-left:16px;line-height:1.8">${bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
      ${table("t-mix-mom", ["Campaign", "Media Type", "Objective", "Content Type", "Media", "지난달 예산", "이번달 예산", "Δ%", "비중", "노출 Δ", "클릭 Δ", "상담 Δ", "이번달 CPA(상담)"], rows, { left: [0, 1, 2, 3, 4], free: true })}</section>`;
    const bauB = camp(plan.filter((p) => p.month === mo), "BAU"), d2cB = camp(plan.filter((p) => p.month === mo), "D2C");
    html += insight("", " 이번 달 plan 구성", `<ul><li>이번 달 미디어 믹스 — 총 예산 ${W(bauB + d2cB)} (BAU <b>${N(bauB / (bauB + d2cB) * 100, 0)}%</b> (${W(bauB)}) · D2C <b>${N(d2cB / (bauB + d2cB) * 100, 0)}%</b> (${W(d2cB)})).</li></ul>`);
    const planTable = (c) => {
      const arr = plan.filter((p) => p.month === mo && p.camp === c), total = arr.reduce((s, p) => s + p.budget, 0), out = [];
      const line = (labels, budget, e, cls) => ({ cells: [...labels, W(budget), P(budget / total * 100), ...(cls ? [""] : []), N(e.imp), N(e.clicks), N(e.leads), N(e.sessions), W(budget / e.imp * 1000), W(budget / e.clicks), P(e.clicks / e.imp * 100), e.leads >= 1 ? W(budget / e.leads) : "-"], cls });
      const sumE = (ps) => ps.reduce((o, p) => { const e = expect(p); o.imp += e.imp; o.clicks += e.clicks; o.leads += e.leads; o.sessions += e.sessions; return o; }, { imp: 0, clicks: 0, leads: 0, sessions: 0 });
      ["SA", "DA"].forEach((mt) => { const am = arr.filter((p) => p.mtype === mt); if (!am.length) return; let firstT = true;
        ["Search", "Traffic", "Counsel", "Etc"].forEach((o) => { const ao = am.filter((p) => p.obj === o); if (!ao.length) return; let firstO = true, lastCT = "";
          ao.forEach((p) => { const e = expect(p); out.push({ cells: [firstT ? `<span class="badge ${mt.toLowerCase()}">${mt}</span>` : "", firstO ? o : "", p.ct !== lastCT ? esc(p.ct) : "", p.media, esc(p.product), W(p.budget), P(p.budget / total * 100), `${p.start.slice(5).replace("-", "/").replace(/^0/, "")}~${p.end.slice(5).replace("-", "/").replace(/^0/, "")}`, N(e.imp), N(e.clicks), N(e.leads), N(e.sessions), W(p.budget / e.imp * 1000), W(p.budget / e.clicks), P(e.clicks / e.imp * 100), e.leads >= 1 ? W(p.budget / e.leads) : "-"] }); firstT = false; firstO = false; lastCT = p.ct; });
          const b = ao.reduce((s, p) => s + p.budget, 0), e = sumE(ao); out.push({ cells: ["", `${o} 소계`, "", "", "", W(b), P(b / total * 100), "", N(e.imp), N(e.clicks), N(e.leads), N(e.sessions), W(b / e.imp * 1000), W(b / e.clicks), P(e.clicks / e.imp * 100), e.leads >= 1 ? W(b / e.leads) : "-"], cls: "subtotal" }); });
        const b = am.reduce((s, p) => s + p.budget, 0), e = sumE(am); out.push({ cells: [`${mt} 소계`, "", "", "", "", W(b), P(b / total * 100), "", N(e.imp), N(e.clicks), N(e.leads), N(e.sessions), W(b / e.imp * 1000), W(b / e.clicks), P(e.clicks / e.imp * 100), e.leads >= 1 ? W(b / e.leads) : "-"], cls: "total" }); });
      const e = sumE(arr); out.push({ cells: ["", "총합계", "", "", "", W(total), "100.00%", "", N(e.imp), N(e.clicks), N(e.leads), N(e.sessions), W(total / e.imp * 1000), W(total / e.clicks), P(e.clicks / e.imp * 100), e.leads >= 1 ? W(total / e.leads) : "-"], cls: "grand" });
      return card(`${c} Campaign Plan (Media Type × Objective × Content Type × Media)`, "", table("t-plan-" + c, ["Media Type", "Objective", "Content Type", "Media", "Product", "Budget(Gross)", "예산비중", "기간", "노출", "클릭", "상담신청", "세션수", "CPM", "CPC", "CTR", "CPA(상담신청)"], out, { left: [0, 1, 2, 3, 4], free: true }), { csv: "t-plan-" + c });
    };
    html += planTable("BAU") + planTable("D2C");
    $("#view").innerHTML = html;
  }

  // ---------- Campaign Trend ----------
  function renderTrend() {
    const camp = chipVal("tr-camp", "BAU"), byMo = groupBy(monthly, "month"), labels = months.map((m) => Number(m.slice(5)) + "월");
    const tm = months.map((m) => { const v = byMo.get(m) || []; const c = sum(v, "cost"), l = sum(v, "leads"); return { c, l, cpa: l ? c / l : null }; });
    const mo = monthOf(S.to), pm = prevMonth(mo);
    const block = (m) => { const v = ALL.filter((r) => monthOf(r.date) === m && r.date <= TODAY && r.camp === camp), A = AGG(v), out = [{ cells: [`${m.slice(2, 4)}년 ${Number(m.slice(5))}월 합계`, N(A.imp), W(A.cpm), N(A.clicks), P(A.ctr), W(A.cpc), W(A.cost), N(A.sessions), W(A.cps), N(A.leads), W(A.cpaL), "100.00%"], cls: "total" }];
      [...groupBy(v, "ct").entries()].sort((a, b) => sum(b[1], "cost") - sum(a[1], "cost")).forEach(([ct, cv]) => { const a = AGG(cv); out.push({ cells: [esc(ct), N(a.imp), W(a.cpm), N(a.clicks), P(a.ctr), W(a.cpc), W(a.cost), N(a.sessions), W(a.cps), N(a.leads), W(a.cpaL), P(a.cost / A.cost * 100)] }); }); return out; };
    const pmt = chipVal("tr-pv", "cpaL"), mList = [...new Set(monthly.map((r) => r.media))];
    const fmtPV = { cost: W, imp: N, clicks: N, ctr: P, cpc: W, cpm: W, sessions: N, leads: N, cpaL: W };
    const pvRows = mList.map((md) => ({ cells: [md, ...months.map((m) => { const r = monthly.find((x) => x.month === m && x.media === md); if (!r) return "-"; const v = { cost: r.cost, imp: r.imp, clicks: r.clicks, ctr: r.clicks / r.imp * 100, cpc: r.cost / r.clicks, cpm: r.cost / r.imp * 1000, sessions: r.sessions, leads: r.leads, cpaL: r.leads ? r.cost / r.leads : NaN }[pmt]; return fmtPV[pmt](v); })] }));
    $("#view").innerHTML = `<section class="card"><div class="card-head"><h3>Campaign Trend</h3><div class="chips" style="margin:0">${chips("tr-camp", [["BAU", "BAU"], ["D2C", "D2C"]])}</div></div><p class="note" style="margin:0;color:var(--muted)">매체 자체 집계(리드폼) 상담신청/CPA 데이터는 원본에 없어 GA 기준 상담신청/CPA만 제공합니다.</p></section>
      <div class="grid2"><div class="card"><p class="chart-title"><b style="color:var(--ink)">월별 추이 — 광고비 · CPA</b></p><div class="chart tall"><canvas id="t1"></canvas></div></div><div class="card"><p class="chart-title"><b style="color:var(--ink)">월별 추이 — 상담신청(GA) · CPA</b></p><div class="chart tall"><canvas id="t2"></canvas></div></div></div>
      ${card("월별 캠페인 변동 추이", `${camp}`, table("t-tr", ["구분", "노출수", "CPM", "클릭수", "CTR", "CPC", "광고비", "세션수(GA)", "CPS", "상담신청(GA)", "CPA(GA상담)", "비중"], [...block(mo), ...block(pm)], { left: [0], free: true }), { csv: "t-tr" })}
      ${card("CPA월별 추이 — 매체 × 월", "", `<div class="chips"><span class="lbl">소진</span>${chips("tr-pv", [["cost", "소진금액"]], 0, "cpaL")}<span class="lbl">볼륨</span>${chips("tr-pv", [["imp", "노출"], ["clicks", "클릭"]], 0, "cpaL")}<span class="lbl">효율</span>${chips("tr-pv", [["ctr", "CTR"], ["cpc", "CPC"], ["cpm", "CPM"]], 0, "cpaL")}<span class="lbl">전환</span>${chips("tr-pv", [["sessions", "세션수"], ["leads", "상담신청(GA)"], ["cpaL", "CPA(GA 상담신청)"]], 0, "cpaL")}</div>` + table("t-tr-pv", ["매체", ...months.map((m) => m.slice(2).replace("-", "."))], pvRows, { left: [0], free: true }), { csv: "t-tr-pv" })}`;
    draw("t1", combo(labels, tm.map((x) => x.c), tm.map((x) => x.cpa && Math.round(x.cpa)), "#374151", "#2f63e6", "광고비", "CPA(상담신청)"));
    draw("t2", combo(labels, tm.map((x) => x.l), tm.map((x) => x.cpa && Math.round(x.cpa)), "#374151", "#2f63e6", "상담신청(GA)", "CPA(상담신청)"));
  }

  // ---------- Admin (월간리뷰) ----------
  function renderAdmin() {
    const mo = S.reviewMonth || monthOf(TODAY), pm = prevMonth(mo);
    const tabs = [["sum", "SA X DA Summary"], ["sacamp", "SA 캠페인 성과 요약"], ["pl", "네이버 파워링크"], ["gsa", "구글 SA"], ["dasum", "DA 성과 요약"], ["content", "콘텐츠 캠페인"], ["lead", "상담신청"], ["leadcr", "상담신청 소재별"], ["etc", "기타 캠페인"], ["d2c", "D2C 전월비교"]];
    const seg = (m) => { const v = ALL.filter((r) => monthOf(r.date) === m); return [["SA(공통)", v.filter((r) => r.mtype === "SA")], ["DA(일반)", v.filter((r) => r.mtype === "DA" && r.camp === "BAU")], ["DA(D2C)", v.filter((r) => r.camp === "D2C")]].map(([n, a]) => [n, AGG(a)]).concat([["합계", AGG(v)]]); };
    const line = (n, a, cls) => ({ cells: [n, W(a.cost), N(a.imp), N(a.clicks), P(a.ctr), W(a.cpc), W(a.cpm), N(a.sessions), P(a.sessions / a.clicks * 100), W(a.cps), N(a.signups), P(a.cvrS), W(a.cpaS), N(a.leads), P(a.cvrL)], cls });
    let body = "";
    if (S.review === "sum") {
      const s1 = seg(pm), s2 = seg(mo), t1 = s1[3][1], t2 = s2[3][1], d = (k, inv) => arrow(chg(t2[k], t1[k]), inv);
      const rows = [line(`${pm.slice(0, 4)}년 ${Number(pm.slice(5))}월`, t1, "mh"), ...s1.slice(0, 3).map(([n, a]) => line(n, a)), line(`${mo.slice(0, 4)}년 ${Number(mo.slice(5))}월`, t2, "mh"), ...s2.slice(0, 3).map(([n, a]) => line(n, a)),
        { cells: ["증감 데이터", d("cost"), d("imp"), d("clicks"), d("ctr"), d("cpc", 1), d("cpm", 1), d("sessions"), "-", d("cps", 1), d("signups"), d("cvrS"), d("cpaS", 1), d("leads"), d("cvrL")], cls: "chg" }];
      body = `<div class="grid3"><div class="card"><p class="chart-title"><b style="color:var(--ink)">■ 광고비</b></p><div class="chart tall"><canvas id="r1"></canvas></div></div><div class="card"><p class="chart-title"><b style="color:var(--ink)">■ 유입성과</b></p><div class="chart tall"><canvas id="r2"></canvas></div></div><div class="card"><p class="chart-title"><b style="color:var(--ink)">■ 전환성과</b></p><div class="chart tall"><canvas id="r3"></canvas></div></div></div>
        <p style="font-weight:700;margin:4px 0 8px">■ ${pm.slice(0, 4)}년 ${Number(pm.slice(5))}월 vs ${mo.slice(0, 4)}년 ${Number(mo.slice(5))}월 캠페인 성과</p><div class="rv-table">${table("t-rv", ["구분", "광고비", "노출수", "클릭수", "CTR", "CPC", "CPM", "GA_세션", "GA_세션율", "GA_세션단가", "GA_회원가입", "GA_회원가입 CVR", "GA_회원가입 단가", "GA_상담신청", "GA_상담신청 CVR"], rows, { free: true })}</div>`;
    } else if (S.review === "sacamp" || S.review === "pl" || S.review === "gsa") {
      const media = S.review === "gsa" ? ["Google SA"] : S.review === "pl" ? ["Naver SA"] : ["Naver SA", "Google SA"];
      const rows = []; [pm, mo].forEach((m) => { const v = sa.filter((r) => monthOf(r.date) === m && media.includes(r.media)); rows.push({ cells: [`${Number(m.slice(5))}월 합계`, ...M_SA(AGG(v))], cls: "mh" }); groupBy(v, "cidx").forEach((cv, c) => rows.push({ cells: [c, ...M_SA(AGG(cv))] })); });
      body = `<div class="rv-table">${table("t-rv2", ["캠페인", ...H_SA], rows, { free: true })}</div>`;
    } else if (S.review === "dasum" || S.review === "d2c") {
      const rows = []; [pm, mo].forEach((m) => { const v = da.filter((r) => monthOf(r.date) === m && (S.review === "d2c" ? r.camp === "D2C" : r.camp === "BAU")); rows.push({ cells: [`${Number(m.slice(5))}월 합계`, ...metricCells(AGG(v))], cls: "mh" }); groupBy(v, S.review === "d2c" ? (r) => r.ct + " · " + r.media : "ct").forEach((cv, c) => rows.push({ cells: [esc(c), ...metricCells(AGG(cv))] })); });
      body = `<div class="rv-table">${table("t-rv3", ["구분", ...M_DA.map((m) => m[1])], rows, { free: true })}</div>`;
    } else body = `<p class="muted" style="padding:40px;text-align:center">데모에서는 이 슬라이드를 생략했어요. SA X DA Summary · SA 캠페인 · 파워링크 · 구글 SA · DA 성과 요약 · D2C 전월비교에서 구조를 볼 수 있어요.</p>`;
    $("#view").innerHTML = `<section class="card"><div class="card-head"><h3>월간리뷰</h3><div class="tools"><input type="month" class="dd" id="rv-month" value="${mo}" min="2026-09" max="2026-10" /><span class="seg"><button class="on">전월 대비</button><button data-toast="데모에는 전년 데이터가 없어요">전년 동월 대비</button></span><button class="btn dark" data-toast="실제 대시보드에서는 슬라이드 전체를 PDF로 내려받아요">PDF 다운로드</button></div></div><p class="note" style="margin:0;color:var(--muted)">아래 탭에서 슬라이드를 하나씩 골라 화면을 스크린샷한 뒤 PPT에 붙여넣어 쓰거나, "PDF 다운로드"로 전체를 PDF로 받을 수 있습니다. (실제 대시보드는 관리자 비밀번호로 보호)</p></section>
      <div class="review-tabs">${tabs.map(([k, l]) => `<button data-review="${k}" class="${S.review === k ? "on" : ""}">${l}</button>`).join("")}</div><section class="card">${body}</section>`;
    if (S.review === "sum") {
      const ml = months.slice(-16), byMo = groupBy(monthly, "month"), saM = ["Naver SA", "Naver Brand SA", "Google SA"];
      const vals = ml.map((m) => { const v = byMo.get(m) || [], s = v.filter((r) => saM.includes(r.media)), d = v.filter((r) => !saM.includes(r.media)); const a = { c: sum(v, "cost"), cl: sum(v, "clicks"), im: sum(v, "imp"), se: sum(v, "sessions"), le: sum(v, "leads") }; return { sa: sum(s, "cost"), da: sum(d, "cost"), cpc: a.c / a.cl, cps: a.c / a.se, ctr: a.cl / a.im * 100, sr: a.se / a.cl * 100, cpa: a.le ? a.c / a.le : null, cpaS: a.le ? a.c / (a.le * .4) : null, cvr: a.le / a.se * 100, cvrS: a.le * .4 / a.se * 100 }; });
      const L = ml.map((m) => Number(m.slice(5)) + "월"), base = { maintainAspectRatio: false, interaction: { mode: "index", intersect: false }, plugins: { legend: { position: "bottom", labels: { boxWidth: 10 } } }, scales: { x: { grid: { display: false } }, y1: { position: "right", grid: { display: false } } } };
      draw("r1", { type: "bar", data: { labels: L, datasets: [{ label: "SA", data: vals.map((v) => v.sa), backgroundColor: "#374151" }, { label: "DA", data: vals.map((v) => v.da), backgroundColor: "#cbd0d8" }] }, options: { ...base, scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true } } } });
      draw("r2", { data: { labels: L, datasets: [{ type: "bar", label: "CPC", data: vals.map((v) => v.cpc), backgroundColor: "#374151", yAxisID: "y" }, { type: "bar", label: "GA_세션단가", data: vals.map((v) => v.cps), backgroundColor: "#cbd0d8", yAxisID: "y" }, { type: "line", label: "CTR", data: vals.map((v) => v.ctr), borderColor: "#2f63e6", pointRadius: 0, yAxisID: "y1" }, { type: "line", label: "GA_세션율", data: vals.map((v) => v.sr), borderColor: "#f59e0b", pointRadius: 0, yAxisID: "y1" }] }, options: base });
      draw("r3", { data: { labels: L, datasets: [{ type: "bar", label: "회원가입 단가", data: vals.map((v) => v.cpaS), backgroundColor: "#374151", yAxisID: "y" }, { type: "bar", label: "상담신청 단가", data: vals.map((v) => v.cpa), backgroundColor: "#cbd0d8", yAxisID: "y" }, { type: "line", label: "회원가입 CVR", data: vals.map((v) => v.cvrS), borderColor: "#2f63e6", pointRadius: 0, yAxisID: "y1" }, { type: "line", label: "상담신청 CVR", data: vals.map((v) => v.cvr), borderColor: "#f59e0b", pointRadius: 0, yAxisID: "y1" }] }, options: base });
    }
  }

  // ---------- Data Upload ----------
  function renderUpload() {
    const kind = chipVal("up-kind", "DA"), pr = S.page["up-r"] || 1, pmx = S.page["up-m"] || 1;
    const list = (arr, page, id, mix) => { const pages = Math.ceil(arr.length / 3), items = arr.slice((page - 1) * 3, page * 3); return `<div class="files">${items.map((m) => `<div class="mon"><div class="mh">${m.month}<span>BAU + D2C 반영됨</span></div>${m.files.map(([c, f, a, b]) => `<div class="fr"><span class="badge ${c.toLowerCase()}">${c}</span><code>${f}</code><span>${mix ? a : N(a) + "행"}<small>${mix ? W(b) : b}</small></span></div>`).join("")}</div>`).join("")}</div><div class="pager"><span>${arr.length}개월 · ${page}/${pages} 페이지</span><span class="pages"><button data-page="${id}" data-p="${Math.max(1, page - 1)}">‹ 이전</button><button data-page="${id}" data-p="${Math.min(pages, page + 1)}">다음 ›</button></span></div>`; };
    $("#view").innerHTML = `<div class="grid2"><section class="card"><div class="card-head"><h3>Raw 데이터 업로드</h3><div class="chips" style="margin:0">${chips("up-kind", [["DA", "DA"], ["SA", "SA"]])}</div></div><div class="drop" data-toast="데모에서는 업로드되지 않아요"><span class="up">⇪</span><b>파일을 드래그하거나 클릭하여 선택</b><span>.xlsx · "BAU_raw_*" / "D2C_raw_*" 시트 · 여러 파일 동시 가능</span><button class="btn">파일 선택</button></div><ul class="notes"><li>엑셀 파일에 "Raw" 시트가 포함되어야 합니다.</li><li>월 단위로 관리 — BAU/D2C 시트명 자동 구분.</li><li>같은 월 재업로드 시 신규 행이 있으면 자동 교체됩니다.</li><li>평일 오전에는 데일리 리포트가 끝나면 자동으로 업로드됩니다.</li></ul><div class="card-head"><h3 style="font-size:12px">저장된 월별 ${kind} Raw 데이터</h3><button class="btn" data-toast="최신 목록을 불러왔어요">새로고침</button></div>${list(uploads.raw, pr, "up-r")}</section>
      <section class="card"><div class="card-head"><h3>미디어믹스 업로드</h3></div><div class="drop" data-toast="데모에서는 업로드되지 않아요"><span class="up">⇪</span><b>파일을 드래그하거나 클릭하여 선택</b><span>.xlsx · "Media Mix_*" 시트 · 여러 파일 동시 가능</span><button class="btn">파일 선택</button></div><ul class="notes"><li>"Media Mix_*" 시트가 포함된 파일이어야 합니다.</li><li>월 단위로 관리 — BAU/D2C 자동 구분 (시트명 · 파일명 기준).</li><li>같은 월 재업로드 시 파일 내용이 변경된 경우에만 교체됩니다.</li></ul><div class="card-head"><h3 style="font-size:12px">저장된 월별 미디어믹스</h3><button class="btn" data-toast="최신 목록을 불러왔어요">새로고침</button></div>${list(uploads.mix, pmx, "up-m", true)}</section></div>`;
  }

  // ---------- 라우팅 · 이벤트 ----------
  const R = { summary: renderSummary, da: renderDA, sa: renderSA, keyword: renderKeyword, creative: renderCreative, mix: renderMix, trend: renderTrend, admin: renderAdmin, upload: renderUpload };
  function render() {
    $("#from").value = S.from; $("#to").value = S.to;
    document.querySelectorAll("#preset button").forEach((b) => b.classList.toggle("on", b.dataset.p === S.preset));
    document.querySelectorAll("#tabs button").forEach((b) => b.classList.toggle("on", b.dataset.t === S.tab));
    $("#flt-sa").hidden = !["sa", "keyword"].includes(S.tab); $("#flt-da").hidden = ["sa", "keyword"].includes(S.tab);
    Object.keys(charts).forEach((k) => { charts[k].destroy(); delete charts[k]; });
    R[S.tab]();
  }
  const PRESET = { "7": () => [shift(TODAY, -6), TODAY], "14": () => [shift(TODAY, -13), TODAY], last: () => ["2026-09-01", "2026-09-30"], mtd: () => ["2026-10-01", TODAY], all: () => [FIRST, TODAY] };
  // 필터 옵션
  const opt = (sel, vals) => { sel.innerHTML = vals.map(([v, l]) => `<option value="${esc(v)}">${esc(l)}</option>`).join(""); };
  opt($("#f-camp"), [["", "Campaign"], ["BAU", "BAU"], ["D2C", "D2C"]]);
  opt($("#f-obj"), [["", "Objective"], ["Search", "Search"], ["Traffic", "Traffic"], ["Counsel", "Counsel"], ["Etc", "Etc"]]);
  opt($("#f-media"), [["", "Media"], ...Object.keys(MEDIA).filter((m) => MEDIA[m].type === "DA").map((m) => [m, m]), ...Object.keys(MEDIA).filter((m) => MEDIA[m].type === "SA").map((m) => [m, m])]);
  opt($("#f-ct"), [["", "Content Type"], ...[...new Set(plan.map((p) => p.ct))].map((c) => [c, c])]);
  opt($("#f-sam"), [["", "Media"], ["Naver SA", "Naver SA"], ["Naver Brand SA", "Naver Brand SA"], ["Google SA", "Google SA"], ["Naver Place", "Naver Place"]]);
  $("#from").min = $("#to").min = FIRST; $("#from").max = $("#to").max = TODAY;
  $("#stamp").textContent = `Raw ${TODAY} 08:41 · Mix 2026-10-15 15:18`;

  document.addEventListener("click", (e) => {
    const t = e.target.closest("button, th, [data-toast], .drop");
    if (!t) return;
    if (t.dataset.toast) { toast(t.dataset.toast); return; }
    if (t.matches("#preset button")) { S.preset = t.dataset.p; [S.from, S.to] = PRESET[t.dataset.p](); render(); return; }
    if (t.matches("#tabs button")) { S.tab = t.dataset.t; history.replaceState(null, "", "#" + S.tab); render(); window.scrollTo({ top: 0 }); return; }
    if (t.dataset.sort) { const id = t.dataset.sort, i = Number(t.dataset.i), cur = S.sort[id]; S.sort[id] = { i, dir: cur && cur.i === i && cur.dir === "desc" ? "asc" : "desc" }; render(); return; }
    if (t.dataset.page) { S.page[t.dataset.page] = Number(t.dataset.p); render(); return; }
    if (t.dataset.chip) { const g = t.dataset.chip, v = t.dataset.v; if (t.hasAttribute("data-multi")) { const all = [...document.querySelectorAll(`[data-chip="${g}"]`)].map((b) => b.dataset.v); let cur = S.chips[g] || all.slice(); cur = cur.includes(v) ? cur.filter((x) => x !== v) : cur.concat(v); S.chips[g] = cur.length ? cur : all; } else S.chips[g] = v; S.page["cr-g"] = 1; S.page[g.replace(/-[a-z]+$/, "")] = 1; render(); return; }
    if (t.dataset.csv !== undefined && t.dataset.csv) { const c = CSV[t.dataset.csv]; if (!c) return; const csv = "﻿" + [c.head, ...c.rows].map((r) => r.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(",")).join("\n"); const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); a.download = t.dataset.csv + ".csv"; a.click(); return; }
    if (t.hasAttribute("data-snap")) { toast("실제 대시보드에서는 표를 이미지로 복사해요"); return; }
    if (t.hasAttribute("data-hist")) { S.open = !S.open; render(); return; }
    if (t.dataset.review) { S.review = t.dataset.review; render(); return; }
    if (t.id === "refresh") { toast("최신 데이터를 다시 불러왔어요 (데모)"); render(); return; }
    if (t.id === "theme") { document.documentElement.classList.toggle("dark"); render(); return; }
  });
  document.addEventListener("change", (e) => {
    const t = e.target;
    if (t.id === "from" || t.id === "to") { S[t.id] = t.value < FIRST ? FIRST : t.value > TODAY ? TODAY : t.value; if (S.from > S.to) [S.from, S.to] = [S.to, S.from]; S.preset = ""; render(); }
    if (t.id === "f-camp") { S.camp = t.value; render(); } if (t.id === "f-obj") { S.obj = t.value; render(); } if (t.id === "f-ct") { S.ct = t.value; render(); }
    if (t.id === "f-media" || t.id === "f-sam") { S.media = t.value; document.getElementById(t.id === "f-media" ? "f-sam" : "f-media").value = ""; render(); }
    if (t.id === "rv-month") { S.reviewMonth = t.value; render(); }
  });
  let qt;
  document.addEventListener("input", (e) => { const q = e.target.dataset && e.target.dataset.q; if (!q) return; S.q[q] = e.target.value; S.page[q] = 1; clearTimeout(qt); qt = setTimeout(() => { render(); const el = document.querySelector(`[data-q="${q}"]`); if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); } }, 250); });
  if (location.hash && R[location.hash.slice(1)]) S.tab = location.hash.slice(1);
  render();
})();
