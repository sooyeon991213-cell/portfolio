(() => {
  const data = window.PORTFOLIO;
  const byId = (id) => document.getElementById(id);
  // 가운뎃점(·) 앞뒤에서는 줄이 바뀌지 않게 보이지 않는 연결 문자(U+2060)를 붙임 ("조회·작성"이 "조회· / 작성"으로 끊기는 문제)
  const joinDots = (text) => text.replace(/·/g, "⁠·⁠");
  const escapeHTML = (value) => joinDots(String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]));
  const optionalText = (element, value) => {
    if (!value) return;
    element.textContent = joinDots(value);
    element.hidden = false;
  };
  // content.js에서 **굵게** 로 감싼 부분을 강조해서 보여줌
  const rich = (value) => escapeHTML(value).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const optionalRich = (element, value) => {
    if (!value) return;
    element.innerHTML = rich(value);
    element.hidden = false;
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // 숫자 부분만 0부터 목표값까지 올라가게 (월 6억, -42.7%, +4.3%p 처럼 앞뒤 글자는 그대로)
  const countUp = (element) => {
    const text = element.textContent;
    const match = text.match(/\d+(?:\.\d+)?/);
    if (!match || reduceMotion) return;
    const before = text.slice(0, match.index);
    const after = text.slice(match.index + match[0].length);
    const target = Number(match[0]);
    const decimals = (match[0].split(".")[1] || "").length;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / 1100, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = before + (target * eased).toFixed(decimals) + after;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    // 탭이 백그라운드라 애니메이션이 멈춰도 최종 숫자는 꼭 보이게
    setTimeout(() => { element.textContent = text; }, 1400);
  };

  optionalText(byId("hero-name"), data.hero.name);
  optionalText(byId("hero-intro"), data.hero.intro);
  if (data.hero.title) {
    const title = byId("hero-title");
    title.innerHTML = data.hero.title.map(rich).join("<br />");
    title.classList.add("results");
    // 글자 수가 많은 제목은 조금 작게
    if (data.hero.title.some((line) => line.replace(/\*\*/g, "").length > 14)) title.classList.add("long");
  }
  // 제목 아래: campaigns(회사별 업종 캠페인 표) → story(경력 단계 카드) → stats(숫자 카드) 순서로 있는 것을 그림
  const projectColor = (id) => (data.projects.find((project) => project.id === id) || {}).color;
  if (data.hero.campaigns) {
    if (byId("hero-story-label")) optionalText(byId("hero-story-label"), data.hero.storyLabel);
    const holder = byId("hero-stats");
    holder.classList.add("campaign-mode");
    holder.setAttribute("aria-label", "업종별 캠페인");
    holder.innerHTML = `
      <div class="campaign-table" role="table">
        <div class="campaign-row campaign-head" role="row"><span>업종</span><span>광고주</span><span>KPI</span></div>
        ${data.hero.campaigns.map((group) => `
        <div class="campaign-group" role="row"><b>${escapeHTML(group.company)}${group.formerly ? ` <small class="formerly">(${escapeHTML(group.formerly)})</small>` : ""}</b><span>${escapeHTML(group.period)} · ${escapeHTML(group.role)}</span></div>
        ${group.rows.map((row) => {
          const color = projectColor(row.project);
          return `
        <div class="campaign-row" role="row"${color ? ` style="--brand:${color[0]};--brand-dark:${color[1]}"` : ""}>
          <span class="c-industry"><i aria-hidden="true"></i>${escapeHTML(row.industry)}</span>
          <span class="c-brand">${escapeHTML(row.brand)}</span>
          <span class="c-kpi">${escapeHTML(row.kpi)}</span>
        </div>`;
        }).join("")}`).join("")}
      </div>
      ${data.hero.campaignNote ? `<p class="campaign-note">${escapeHTML(data.hero.campaignNote)}</p>` : ""}`;
  } else if (data.hero.story) {
    if (byId("hero-story-label")) optionalText(byId("hero-story-label"), data.hero.storyLabel);
    byId("hero-stats").classList.add("story-grid");
    byId("hero-stats").innerHTML = data.hero.story.map((step) => `
    <article class="stat-card story-card">
      <span class="story-period"><i aria-hidden="true"></i>${escapeHTML(step.period)}</span>
      <span class="story-company">${escapeHTML(step.company)}</span>
      <span class="story-title">${escapeHTML(step.title)}</span>
      <strong class="stat-value">${escapeHTML(step.value)}</strong>
      <span class="stat-label">${escapeHTML(step.label)}</span>
    </article>`).join("");
  } else {
    byId("hero-stats").innerHTML = data.hero.stats.map((stat) => {
      const color = (data.projects.find((project) => project.id === stat.project) || {}).color;
      return `
      <article class="stat-card"${color ? ` style="--brand:${color[0]};--brand-dark:${color[1]}"` : ""}>
        ${stat.tag ? `<span class="stat-tag"><i aria-hidden="true"></i>${escapeHTML(stat.tag)}</span>` : ""}
        <strong class="stat-value">${escapeHTML(stat.value)}</strong>
        <span class="stat-label">${escapeHTML(stat.label)}</span>
      </article>`;
    }).join("");
  }
  byId("hero-stats").querySelectorAll(".stat-value").forEach(countUp);

  if (data.about.badge) byId("about-badge").textContent = data.about.badge;
  else byId("about-badge").closest(".proof-badge").hidden = true;
  optionalRich(byId("about-copy"), data.about.copy);
  // 핵심 역량 카드: 제목 · 설명(줄바꿈 유지) · 근거 숫자
  const competencies = data.about.competencies || [];
  if (competencies.length && byId("competencies")) {
    const grid = byId("competencies");
    grid.innerHTML = competencies.map((item, index) => `
      <article class="competency-card">
        <p class="competency-index">0${index + 1}</p>
        <h3>${escapeHTML(item.title)}</h3>
        ${item.items ? `<ul class="competency-items">${item.items.map((row) => `
          <li><span>${escapeHTML(row.did)}</span>${row.result ? `<b>${escapeHTML(row.result)}</b>` : ""}</li>`).join("")}</ul>` : `
        <p class="competency-desc">${escapeHTML(item.desc)}</p>
        <div class="competency-proofs">${(item.proofs || []).map((proof) => `
          <div class="competency-proof"><strong>${escapeHTML(proof.value)}</strong><span>${escapeHTML(proof.label)}</span></div>`).join("")}</div>`}
      </article>`).join("");
    grid.hidden = false;
  }
  if (data.about.capabilities.length) {
    const list = byId("capabilities");
    // "매체: Meta · ..." 처럼 앞에 이름이 있으면 그 이름만 굵게
    list.innerHTML = data.about.capabilities.map((item) => {
      const cut = item.indexOf(": ");
      return cut > 0 ? `<li><b>${escapeHTML(item.slice(0, cut))}</b>${escapeHTML(item.slice(cut + 1))}</li>` : `<li>${escapeHTML(item)}</li>`;
    }).join("");
    list.hidden = false;
  }

  // 프로젝트: 유형(퍼포먼스/브랜딩)별 카드 → 누르면 그 자리에서 한 화면짜리 케이스 카드(팝업)로 열림
  const projects = data.projects;
  const brandStyle = (project) => project.color ? `--brand:${project.color[0]};--brand-dark:${project.color[1]}` : "";
  const budgetText = (budget) => budget ? (/^(예산|광고비)/.test(budget) ? budget : `광고비 ${budget}`) : "";
  const groups = data.projectGroups || [{ type: "", title: "" }];
  // 카드: 업종 · 소속 → 광고주(제목) → 캠페인(소제목) → 대표 숫자 → 기간 · 광고비. 높이는 그리드에서 같은 줄끼리 맞춤
  byId("project-list").innerHTML = groups.map((group) => {
    const items = projects.filter((project) => !group.type || project.type === group.type);
    return `
    <div class="project-group">
      ${group.title ? `<div class="project-group-head"><h3>${escapeHTML(group.title)}<span>${items.length}</span></h3>${group.note ? `<p>${escapeHTML(group.note)}</p>` : ""}</div>` : ""}
      <div class="project-grid">${items.map((project) => `
        <button class="project-card" type="button" data-index="${projects.indexOf(project)}" style="${brandStyle(project)}" aria-haspopup="dialog">
          <span class="project-card-top">
            <span class="project-brand"><i aria-hidden="true"></i>${escapeHTML(project.industry || "")}</span>
            <span class="project-tag">${escapeHTML(project.company || "")}${project.current ? " · 진행 중" : ""}</span>
          </span>
          <span class="project-title">${escapeHTML(project.brand)}</span>
          <span class="project-sub">${escapeHTML(project.campaign || "")}</span>
          ${project.highlight ? `<span class="project-highlight"><strong>${escapeHTML(project.highlight.value)}</strong><span>${escapeHTML(project.highlight.label)}</span></span>` : ""}
          <span class="project-card-bottom">
            <span class="project-period">${escapeHTML(project.period)}${project.budget ? `<b class="project-budget">${escapeHTML(budgetText(project.budget))}</b>` : ""}</span>
            <span class="project-open">자세히 보기 <b aria-hidden="true">→</b></span>
          </span>
        </button>`).join("")}</div>
    </div>`;
  }).join("");

  // 대표 소재: 설명 없이 이미지만. ratio가 있으면 그 비율(9 / 16 등)로
  const imageMarkup = (project) => {
    const images = project.images || [];
    return images.length ? `<div class="creative-grid">${images.map((image) => `
      <figure class="creative${image.ratio && !image.span ? " tall" : ""}"${image.span ? ` style="grid-column:span ${Number(image.span)}"` : ""}>
        <a href="${escapeHTML(image.src)}" target="_blank" rel="noopener"><img src="${escapeHTML(image.src)}" alt="${escapeHTML(image.alt || project.brand)}" loading="lazy"${image.ratio ? ` style="aspect-ratio:${escapeHTML(image.ratio)}"` : ""} /></a>
      </figure>`).join("")}</div>` : "";
  };

  // 그래프: 막대 끝에 값, 마우스를 올리면 data-tip 말풍선. 색은 legend 순서(s0 회색, s1 브랜드 색)
  const formatValue = (value, unit = "") => `${Number.isInteger(value) ? value.toLocaleString("ko-KR") : value.toFixed(1)}${unit}`;
  const chartHead = (chart) => `<figcaption class="chart-head"><strong>${escapeHTML(chart.title)}</strong>${chart.note ? `<span>${escapeHTML(chart.note)}</span>` : ""}</figcaption>`;
  const legendMarkup = (names) => names ? `<div class="chart-legend">${names.map((name, index) => `<span><i class="swatch s${index}"></i>${escapeHTML(name)}</span>`).join("")}</div>` : "";
  const columnChart = (chart, unit) => {
    const max = Math.max(chart.target || 0, ...chart.items.map((item) => item.value)) * 1.15;
    const pct = (value) => `${(value / max) * 100}%`;
    return `
      <div class="col-plot">
        ${chart.target ? `<span class="target-line" style="bottom:${pct(chart.target)}"></span>` : ""}
        ${chart.items.map((item) => `<div class="col-slot"><span class="bar col ${chart.target && item.value < chart.target ? "s0" : "s1"}" style="height:${pct(item.value)}" data-tip="${escapeHTML(`${item.label} ${formatValue(item.value, unit)}`)}"><b>${formatValue(item.value, unit)}</b></span></div>`).join("")}
      </div>
      <div class="col-labels">${chart.items.map((item) => `<span>${escapeHTML(item.label)}</span>`).join("")}</div>`;
  };
  const barChart = (chart, unit) => {
    const pairs = chart.type === "pairs";
    const values = chart.items.flatMap((item) => pairs ? [item.before, item.after] : [item.value]);
    const max = Math.max(chart.target || 0, ...values) * 1.18;
    const pct = (value) => `${(value / max) * 100}%`;
    const bar = (value, tone, tip) => `<span class="bar hbar s${tone}" style="width:${pct(value)}" data-tip="${escapeHTML(tip)}"><b>${formatValue(value, unit)}</b></span>`;
    return `<div class="hbar-rows">${chart.items.map((item) => `
      <div class="hbar-row">
        <span class="hbar-label">${escapeHTML(item.label)}</span>
        <div class="hbar-track">
          ${chart.target ? `<i class="target-tick" style="left:${pct(chart.target)}"></i>` : ""}
          ${pairs
            ? bar(item.before, 0, `${chart.legend[0]} ${formatValue(item.before, unit)}`) + bar(item.after, 1, `${chart.legend[1]} ${formatValue(item.after, unit)}`)
            : bar(item.value, item.group ?? 1, `${item.label} ${formatValue(item.value, unit)}`)}
        </div>
      </div>`).join("")}</div>`;
  };
  // 국가별 카드: KPI 달성률 막대 + 브랜드 리프트(벤치마크 vs 캠페인) 한 줄
  const countryChart = (chart) => `
    <p class="chart-sub">KPI 달성률 <span>세로선 = 100%</span></p>
    ${barChart({ ...chart, type: "bars" }, chart.unit || "%")}
    ${chart.lift ? `<p class="chart-sub">${escapeHTML(chart.lift.label)}</p>${legendMarkup(chart.lift.legend)}${barChart({ type: "pairs", legend: chart.lift.legend, items: [{ label: "", before: chart.lift.before, after: chart.lift.after }] }, "%p")}` : ""}`;
  const chartMarkup = (chart) => `
    <figure class="chart">
      ${chartHead(chart)}${chart.type === "country" ? "" : legendMarkup(chart.legend)}
      ${chart.type === "columns" ? columnChart(chart, chart.unit || "") : chart.type === "country" ? countryChart(chart) : barChart(chart, chart.unit || "")}
    </figure>`;
  const tags = (items, kind) => items && items.length ? `<span class="tag-list ${kind}">${items.map((item) => `<span class="tag">${escapeHTML(item)}</span>`).join("")}</span>` : "";
  const circled = (n) => "①②③④⑤⑥⑦⑧⑨"[n - 1] || String(n);

  // 도식: split(비중 막대 여러 줄) · funnel(퍼널 단계별 Before → After 이벤트)
  const SPLIT_TONES = ["t0", "t1", "t2", "t3", "t4", "t5"];
  const diagramMarkup = (d) => {
    if (!d) return "";
    const head = `<figcaption class="chart-head"><strong>${escapeHTML(d.title)}</strong>${d.note ? `<span>${escapeHTML(d.note)}</span>` : ""}</figcaption>`;
    if (d.type === "split") {
      return `<figure class="chart diagram split">${head}${d.rows.map((row) => {
        const total = row.parts.reduce((sum, part) => sum + part.value, 0);
        // 좁은 칸은 이름을 빼고(아주 좁으면 숫자도 빼고) 막대 아래 범례로 표시
        const narrow = row.parts.map((part) => part.value / total < 0.14);
        const seg = (part, i) => {
          const share = part.value / total;
          const inner = !narrow[i] ? `<b>${escapeHTML(part.name)}</b><em>${part.value}%</em>` : share >= 0.06 ? `<em>${part.value}%</em>` : "";
          return `<span class="split-seg ${SPLIT_TONES[i % 6]}${narrow[i] ? " narrow" : ""}" style="flex:${share}" title="${escapeHTML(`${part.name} ${part.value}%`)}">${inner}</span>`;
        };
        const legend = narrow.some(Boolean) ? `<div class="split-legend">${row.parts.map((part, i) => narrow[i] ? `<span><i class="split-seg ${SPLIT_TONES[i % 6]}"></i>${escapeHTML(part.name)} ${part.value}%</span>` : "").join("")}</div>` : "";
        return `<div class="split-row"><span class="split-label">${escapeHTML(row.label)}</span><div class="split-bar">${row.parts.map(seg).join("")}</div>${legend}</div>`;
      }).join("")}</figure>`;
    }
    if (d.type === "funnel") {
      const box = (item, isNew) => `<span class="ev${isNew ? " new" : ""}">${escapeHTML(item)}</span>`;
      return `<figure class="chart diagram funnel">${head}
        <div class="funnel-grid">
          <span class="fh">퍼널 단계</span><span class="fh">Before</span><span></span><span class="fh">After</span>
          ${d.stages.map((stage, i) => `
            <span class="stage s${i}">${escapeHTML(stage.name)}</span>
            <div class="evs">${stage.before.map((item) => box(item)).join("")}</div>
            <span class="arrow" aria-hidden="true">${i === 1 ? "»" : ""}</span>
            <div class="evs">${stage.after.map((item) => box(item.name, item.isNew)).join("")}</div>`).join("")}
        </div>
        <div class="funnel-legend"><span><i class="ev-swatch"></i>기존에 설치된 이벤트</span><span><i class="ev-swatch new"></i>신규 설치한 이벤트</span></div>
      </figure>`;
    }
    return "";
  };

  // 케이스 카드 (제안서 Success Case 형식): 왼쪽 KPI → Approach → Results, 오른쪽 해시태그 · 핵심 숫자 원형 · 도식 · 그래프 · 대표 소재
  const caseModal = document.createElement("div");
  caseModal.className = "case-backdrop";
  caseModal.hidden = true;
  document.body.appendChild(caseModal);
  let openIndex = -1;
  let lastFocus = null;
  const caseMarkup = (project, index) => {
    const charts = (project.charts || []).slice(0, 2);
    const insight = project.insight || [];
    const images = imageMarkup(project);
    const approach = project.approach || [];
    const results = project.results || [];
    const keys = results.filter((item) => item.key).slice(0, 3);
    return `
    <article class="case-panel" role="dialog" aria-modal="true" aria-labelledby="case-title" style="${brandStyle(project)}">
      <header class="case-head">
        <div>
          <p class="case-eyebrow">Success Case · ${escapeHTML(project.company || "")} · ${escapeHTML(project.period)}${project.current ? " · 진행 중" : ""}</p>
          <h3 id="case-title">${escapeHTML(project.brand)} <span class="case-campaign">${escapeHTML(project.campaign || "")}</span></h3>
          ${project.headline ? `<p class="case-headline">${escapeHTML(project.headline)}</p>` : ""}
        </div>
        <div class="case-nav">
          <button type="button" class="case-step" data-step="-1" aria-label="이전 프로젝트">←</button>
          <span>${index + 1} / ${projects.length}</span>
          <button type="button" class="case-step" data-step="1" aria-label="다음 프로젝트">→</button>
          <button type="button" class="case-close" aria-label="닫기">×</button>
        </div>
      </header>
      <div class="case-body">
        <div class="case-left">
          <dl class="case-facts">
            <div><dt>업종</dt><dd>${escapeHTML(project.industry || "")}</dd></div>
            ${project.budget ? `<div><dt>${/^예산/.test(project.budget) ? "예산" : "광고비"}</dt><dd>${escapeHTML(project.budget.replace(/^예산\s*/, ""))}</dd></div>` : ""}
            ${project.contribution ? `<div><dt>기여도</dt><dd>${escapeHTML(project.contributionLabel || `${project.contribution}%`)}<span class="fact-bar" aria-hidden="true"><i style="width:${Number(project.contribution)}%"></i></span></dd></div>` : ""}
            <div class="wide"><dt>매체</dt><dd>${tags(project.media, "media")}</dd></div>
          </dl>
          <section class="case-block">
            <h4>KPI</h4>
            ${project.goal ? `<p class="case-goal">${rich(project.goal)}</p>` : ""}
            ${tags(project.kpis, "kpi")}
          </section>
          <section class="case-block">
            <h4>Approach</h4>
            <ol class="approach-list">${approach.map((step, i) => `
              <li><span class="approach-no">${circled(i + 1)}</span><div><b>${escapeHTML(step.t)}</b><span>${rich(step.d)}</span></div></li>`).join("")}</ol>
          </section>
          <section class="case-block">
            <h4>Results</h4>
            <ul class="result-list">${results.map((item) => `
              <li><b>${escapeHTML(item.value)}</b><span>${escapeHTML(item.label)}${item.ref && approach[item.ref - 1] ? ` <em class="result-ref">${circled(item.ref)}</em>` : ""}</span></li>`).join("")}</ul>
          </section>
          ${insight.length ? `<section class="case-block insight"><h4>Insight</h4>${insight.map((line) => `<p>${rich(line)}</p>`).join("")}</section>` : ""}
        </div>
        <div class="case-right">
          ${(project.hashtags || []).length ? `<div class="case-hashtags">${project.hashtags.map((tag) => `<span>#${escapeHTML(tag)}</span>`).join("")}</div>` : ""}
          ${keys.length ? `<div class="key-stats count-${keys.length}">${keys.map((item) => `
            <div class="key-stat"><strong>${escapeHTML(item.value)}</strong><span>${escapeHTML(item.key)}</span></div>`).join("")}</div>` : ""}
          ${diagramMarkup(project.diagram)}
          ${charts.length ? `<div class="case-charts count-${charts.length}">${charts.map(chartMarkup).join("")}</div>` : ""}
          ${images ? `<div class="case-creatives"><h4>대표 소재</h4>${images}</div>` : ""}
        </div>
      </div>
    </article>`;
  };
  const openCase = (index) => {
    openIndex = (index + projects.length) % projects.length;
    caseModal.innerHTML = caseMarkup(projects[openIndex], openIndex);
    caseModal.hidden = false;
    document.documentElement.classList.add("case-open");
    history.replaceState(null, "", `#case-${projects[openIndex].id}`);
    caseModal.querySelector(".case-close").focus({ preventScroll: true });
  };
  const closeCase = () => {
    caseModal.hidden = true;
    caseModal.innerHTML = "";
    openIndex = -1;
    document.documentElement.classList.remove("case-open");
    history.replaceState(null, "", "#projects");
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  };
  byId("project-list").addEventListener("click", (event) => {
    const card = event.target.closest(".project-card");
    if (!card) return;
    lastFocus = card;
    openCase(Number(card.dataset.index));
  });
  caseModal.addEventListener("click", (event) => {
    if (event.target === caseModal || event.target.closest(".case-close")) return closeCase();
    const step = event.target.closest(".case-step");
    if (step) openCase(openIndex + Number(step.dataset.step));
  });
  document.addEventListener("keydown", (event) => {
    if (caseModal.hidden) return;
    if (event.key === "Escape") closeCase();
    if (event.key === "ArrowRight") openCase(openIndex + 1);
    if (event.key === "ArrowLeft") openCase(openIndex - 1);
  });
  // #case-lxhausys 처럼 링크로 들어오면 그 프로젝트를 바로 연다
  const linked = projects.findIndex((project) => location.hash === `#case-${project.id}`);
  if (linked >= 0) openCase(linked);

  byId("career-list").innerHTML = data.career.map((entry) => `
    <article class="timeline-item">
      <span class="timeline-dot" aria-hidden="true"></span>
      <h3>${escapeHTML(entry.company)}${entry.formerly ? ` <small class="formerly">(${escapeHTML(entry.formerly)})*</small>` : ""}</h3>
      <div class="timeline-meta"><span class="timeline-period">${escapeHTML(entry.period)}</span>${entry.detail ? `<span class="timeline-detail">${escapeHTML(entry.detail)}</span>` : ""}</div>
      ${entry.numbers.length ? `<div class="timeline-numbers">${entry.numbers.map((item) => `<span class="timeline-number"><span>${escapeHTML(item.label)}</span>${item.value ? `<strong>${escapeHTML(item.value)}</strong>` : ""}</span>`).join("")}</div>` : ""}
      ${entry.footnote ? `<p class="timeline-footnote">${escapeHTML(entry.footnote)}</p>` : ""}
    </article>`).join("");

  optionalRich(byId("automation-summary"), data.automation.summary);
  const listOrText = (value) => Array.isArray(value)
    ? `<ul class="tool-built">${value.map((item) => `<li>${rich(item)}</li>`).join("")}</ul>`
    : rich(value);
  byId("tool-list").innerHTML = data.automation.tools.map((tool, index) => `
    <article class="tool-card">
      <p class="tool-index">0${index + 1} / ${escapeHTML(tool.stack)}</p>
      <h3>${escapeHTML(tool.name)}</h3>
      ${tool.image ? `<figure class="tool-figure">${tool.demo ? `<a href="${escapeHTML(tool.demo.href)}" target="_blank" rel="noopener">` : ""}<img src="${escapeHTML(tool.image)}" alt="${escapeHTML(tool.name)} 화면" loading="lazy" />${tool.demo ? "</a>" : ""}${tool.caption ? `<figcaption>${escapeHTML(tool.caption)}</figcaption>` : ""}</figure>` : ""}
      ${tool.demo ? `<a class="tool-demo" href="${escapeHTML(tool.demo.href)}" target="_blank" rel="noopener">${escapeHTML(tool.demo.label)} ↗</a>${tool.demo.printNote ? `<p class="tool-demo-note print-only">${escapeHTML(tool.demo.printNote)}</p>` : ""}` : ""}
      ${tool.flowLabel ? `<p class="tool-flow-label">${escapeHTML(tool.flowLabel)}</p>` : ""}
      ${tool.steps ? `<ol class="tool-steps${tool.image ? "" : " tool-flow"}">${tool.steps.map((step) => typeof step === "string"
        ? `<li>${escapeHTML(step)}</li>`
        : `<li><span class="step-text"><b>${escapeHTML(step.t)}</b>${step.d ? `<small>${escapeHTML(step.d)}</small>` : ""}</span></li>`).join("")}</ol>` : ""}
      <dl class="tool-facts">
        <div><dt>업무 과제</dt><dd>${listOrText(tool.problem)}</dd></div>
        <div><dt>구현 방식</dt><dd>${listOrText(tool.built)}</dd></div>
        <div><dt>운영 효과</dt><dd>${listOrText(tool.effect)}</dd></div>
      </dl>
    </article>`).join("");
  if (data.contact.email) {
    const email = escapeHTML(data.contact.email);
    byId("contact-email").innerHTML = `<a href="mailto:${email}">${email} ↗</a>`;
  }

  const themeToggle = document.querySelector(".theme-toggle");
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    root.dataset.theme = "dark";
  }
  themeToggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    if (nextTheme === "light") delete root.dataset.theme;
    else root.dataset.theme = nextTheme;
    localStorage.setItem("portfolio-theme", nextTheme);
  });
})();
