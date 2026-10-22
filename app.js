(() => {
  const data = window.PORTFOLIO;
  const byId = (id) => document.getElementById(id);
  const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const optionalText = (element, value) => {
    if (!value) return;
    element.textContent = value;
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
  }
  byId("hero-stats").innerHTML = data.hero.stats.map((stat) => `
    <article class="stat-card">
      <strong class="stat-value">${escapeHTML(stat.value)}</strong>
      <span class="stat-label">${escapeHTML(stat.label)}</span>
    </article>`).join("");
  byId("hero-stats").querySelectorAll(".stat-value").forEach(countUp);

  if (data.about.badge) byId("about-badge").textContent = data.about.badge;
  else byId("about-badge").closest(".proof-badge").hidden = true;
  optionalRich(byId("about-copy"), data.about.copy);
  if (data.about.capabilities.length) {
    const list = byId("capabilities");
    list.innerHTML = data.about.capabilities.map((item) => `<li>${escapeHTML(item)}</li>`).join("");
    list.hidden = false;
  }

  const projectList = byId("project-list");
  const detailPanel = byId("project-detail");
  const projectById = (id) => data.projects.find((project) => project.id === id);
  projectList.innerHTML = data.projects.map((project, index) => `
    <button class="project-card${project.previousCompany ? " previous" : ""}" type="button" data-project="${escapeHTML(project.id)}" aria-expanded="false" aria-controls="project-detail">
      <span class="project-card-top">
        <span class="project-number">0${index + 1} / CASE STUDY</span>
        ${project.previousCompany ? '<span class="project-tag previous">이전 회사</span>' : `<span class="project-tag current">${project.current ? "와이즈버즈 · 진행 중" : "와이즈버즈"}</span>`}
      </span>
      ${project.highlight ? `<span class="project-highlight"><strong>${escapeHTML(project.highlight.value)}</strong><span>${escapeHTML(project.highlight.label)}</span></span>` : ""}
      <span class="project-title">${escapeHTML(project.name)}</span>
      <span class="project-card-bottom">
        <span class="project-period">${escapeHTML(project.period)}</span>
        <span class="project-role">역할 <span class="project-role-value">${escapeHTML(project.role)}</span></span>
        <span class="project-open" aria-hidden="true">＋</span>
      </span>
    </button>`).join("");

  const projectImages = (project) => project.images || (project.image ? [{ src: project.image, caption: project.imageCaption }] : []);
  // 소재는 눌러서 원본 크기로 볼 수 있게
  const imageMarkup = (project) => {
    const images = projectImages(project);
    return images.length ? `<div class="creative-grid count-${images.length}">${images.map((image) => `
      <figure class="creative">
        <a href="${escapeHTML(image.src)}" target="_blank" rel="noopener"><img src="${escapeHTML(image.src)}" alt="${escapeHTML(image.caption || project.name)}" loading="lazy" /></a>
        ${image.result || image.caption ? `<figcaption class="detail-caption">${image.result ? `<strong>${escapeHTML(image.result)}</strong>` : ""}${escapeHTML(image.caption || "")}</figcaption>` : ""}
      </figure>`).join("")}</div>` : "";
  };

  // 그래프: 막대 끝에 값, 마우스를 올리면 data-tip 말풍선. 색은 legend 순서(s0 회색, s1 초록)
  const formatValue = (value, unit = "") => `${Number.isInteger(value) ? value : value.toFixed(1)}${unit}`;
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
  const chartMarkup = (chart) => `
    <figure class="chart">
      ${chartHead(chart)}${legendMarkup(chart.legend)}
      ${chart.type === "columns" ? columnChart(chart, chart.unit || "") : barChart(chart, chart.unit || "")}
    </figure>`;
  const metricMarkup = (metrics) => {
    const cards = metrics.length ? `<div class="metric-grid">${metrics.map((metric) => `
      <article class="metric-card"><strong class="metric-value">${escapeHTML(metric.value)}</strong><span class="metric-label">${escapeHTML(metric.label)}</span></article>`).join("")}</div>` : "";
    const rows = metrics.filter((metric) => metric.before || metric.after).map((metric) => `
      <tr><td>${escapeHTML(metric.label)}</td><td>${escapeHTML(metric.before)}</td><td>${escapeHTML(metric.after || metric.value)}</td></tr>`).join("");
    const table = rows ? `<div class="metric-table-wrap"><table class="metric-table"><thead><tr><th>지표</th><th>변경 전</th><th>변경 후</th></tr></thead><tbody>${rows}</tbody></table></div>` : "";
    return cards + table;
  };
  const listMarkup = (items) => `<ul class="detail-list">${items.map((item) => `<li>${rich(item)}</li>`).join("")}</ul>`;
  // 업종·매체·팀·기여도를 한 줄로. bar가 있으면 기여도 막대를 그림
  const factMarkup = (facts) => facts.length ? `<dl class="detail-facts">${facts.map((fact) => `
    <div class="detail-fact"><dt>${escapeHTML(fact.label)}</dt><dd>${escapeHTML(fact.value)}${fact.bar ? `<span class="fact-bar" aria-hidden="true"><i style="width:${Number(fact.bar)}%"></i></span>` : ""}</dd></div>`).join("")}</dl>` : "";
  const renderDetail = (project) => {
    const insight = project.insight || [];
    const charts = project.charts || [];
    const hasImages = projectImages(project).length > 0;
    detailPanel.innerHTML = `
      <div class="detail-header">
        <div><p class="eyebrow">${escapeHTML(project.period)}${project.previousCompany ? " · 이전 회사" : ""}</p><h3>${escapeHTML(project.name)}</h3>${project.goal ? `<p class="detail-goal">${rich(project.goal)}</p>` : ""}</div>
        <button class="detail-close" type="button" aria-label="프로젝트 상세 닫기">×</button>
      </div>
      ${factMarkup(project.facts || [])}
      <div class="detail-sections${hasImages ? "" : " single"}">
        <section class="detail-block"><h4>한 일</h4>${listMarkup(project.work)}</section>
        ${hasImages ? `<section class="detail-block"><h4>소재</h4>${imageMarkup(project)}</section>` : ""}
        <section class="detail-block wide"><h4>결과</h4>${metricMarkup(project.metrics)}${charts.length ? `<div class="chart-grid">${charts.map(chartMarkup).join("")}</div>` : ""}</section>
        ${insight.length ? `<section class="detail-block wide"><h4>돌아보면</h4>${listMarkup(insight)}</section>` : ""}
      </div>`;
    detailPanel.hidden = false;
    detailPanel.querySelector(".detail-close").addEventListener("click", closeProject);
  };
  const closeProject = () => {
    projectList.querySelectorAll(".project-card").forEach((card) => {
      card.setAttribute("aria-expanded", "false");
    });
    detailPanel.hidden = true;
    detailPanel.innerHTML = "";
  };
  projectList.addEventListener("click", (event) => {
    const card = event.target.closest(".project-card");
    if (!card) return;
    const wasOpen = card.getAttribute("aria-expanded") === "true";
    closeProject();
    if (!wasOpen) {
      card.setAttribute("aria-expanded", "true");
      renderDetail(projectById(card.dataset.project));
      if (window.matchMedia("(max-width: 760px)").matches) {
        detailPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  });

  byId("career-list").innerHTML = data.career.map((entry) => `
    <article class="timeline-item">
      <span class="timeline-dot" aria-hidden="true"></span>
      <h3>${escapeHTML(entry.company)}</h3>
      <div class="timeline-meta"><span class="timeline-period">${escapeHTML(entry.period)}</span>${entry.detail ? `<span class="timeline-detail">${escapeHTML(entry.detail)}</span>` : ""}</div>
      ${entry.numbers.length ? `<div class="timeline-numbers">${entry.numbers.map((item) => `<span class="timeline-number"><strong>${escapeHTML(item.value)}</strong>${escapeHTML(item.label)}</span>`).join("")}</div>` : ""}
    </article>`).join("");

  optionalRich(byId("automation-summary"), data.automation.summary);
  byId("tool-list").innerHTML = data.automation.tools.map((tool, index) => `
    <article class="tool-card">
      <p class="tool-index">0${index + 1} / ${escapeHTML(tool.stack)}</p>
      <h3>${escapeHTML(tool.name)}</h3>
      ${tool.image ? `<figure class="tool-figure"><img src="${escapeHTML(tool.image)}" alt="${escapeHTML(tool.name)} 화면" loading="lazy" />${tool.caption ? `<figcaption>${escapeHTML(tool.caption)}</figcaption>` : ""}</figure>` : ""}
      ${tool.steps ? `<ol class="tool-steps">${tool.steps.map((step) => `<li>${escapeHTML(step)}</li>`).join("")}</ol>` : ""}
      <dl class="tool-facts">
        <div><dt>문제</dt><dd>${rich(tool.problem)}</dd></div>
        <div><dt>만든 것</dt><dd>${rich(tool.built)}</dd></div>
        <div><dt>효과</dt><dd>${rich(tool.effect)}</dd></div>
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
