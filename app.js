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

  optionalText(byId("hero-name"), data.hero.name);
  optionalText(byId("hero-intro"), data.hero.intro);
  byId("hero-stats").innerHTML = data.hero.stats.map((stat) => `
    <article class="stat-card">
      <strong class="stat-value">${escapeHTML(stat.value)}</strong>
      <span class="stat-label">${escapeHTML(stat.label)}</span>
    </article>`).join("");

  byId("about-badge").textContent = data.about.badge;
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
    <button class="project-card" type="button" data-project="${escapeHTML(project.id)}" aria-expanded="false" aria-controls="project-detail">
      <span class="project-card-top">
        <span class="project-number">0${index + 1} / CASE STUDY</span>
        ${project.previousCompany ? '<span class="project-tag previous">이전 회사</span>' : '<span class="project-tag">PROJECT</span>'}
      </span>
      ${project.highlight ? `<span class="project-highlight"><strong>${escapeHTML(project.highlight.value)}</strong><span>${escapeHTML(project.highlight.label)}</span></span>` : ""}
      <span class="project-title">${escapeHTML(project.name)}</span>
      <span class="project-card-bottom">
        <span class="project-period">${escapeHTML(project.period)}</span>
        <span class="project-role">역할 <span class="project-role-value">${escapeHTML(project.role)}</span></span>
        <span class="project-open" aria-hidden="true">＋</span>
      </span>
    </button>`).join("");

  const imageMarkup = (project) => project.image ? `
    <figure class="detail-figure">
      <img class="detail-image" src="${escapeHTML(project.image)}" alt="${escapeHTML(project.name)} 프로젝트 대시보드" />
      ${project.imageCaption ? `<figcaption class="detail-caption">${escapeHTML(project.imageCaption)}</figcaption>` : ""}
    </figure>` : "";
  const metricMarkup = (metrics) => {
    const cards = metrics.length ? `<div class="metric-grid">${metrics.map((metric) => `
      <article class="metric-card"><strong class="metric-value">${escapeHTML(metric.value)}</strong><span class="metric-label">${escapeHTML(metric.label)}</span></article>`).join("")}</div>` : "";
    const rows = metrics.filter((metric) => metric.before || metric.after).map((metric) => `
      <tr><td>${escapeHTML(metric.label)}</td><td>${escapeHTML(metric.before)}</td><td>${escapeHTML(metric.after || metric.value)}</td></tr>`).join("");
    const table = rows ? `<div class="metric-table-wrap"><table class="metric-table"><thead><tr><th>지표</th><th>변경 전</th><th>변경 후</th></tr></thead><tbody>${rows}</tbody></table></div>` : "";
    return cards + table;
  };
  const renderDetail = (project) => {
    detailPanel.innerHTML = `
      <div class="detail-header">
        <div><p class="eyebrow">${escapeHTML(project.period)}${project.previousCompany ? " · 이전 회사" : ""}</p><h3>${escapeHTML(project.name)}</h3>${project.role ? `<p class="detail-role">역할 · ${escapeHTML(project.role)}</p>` : ""}</div>
        <button class="detail-close" type="button" aria-label="프로젝트 상세 닫기">×</button>
      </div>
      <div class="detail-sections">
        <section class="detail-block"><h4>과제</h4><p class="detail-copy">${rich(project.task)}</p></section>
        <section class="detail-block"><h4>한 일</h4><p class="detail-copy">${rich(project.work)}</p></section>
        <section class="detail-block"><h4>성과</h4>${metricMarkup(project.metrics)}${imageMarkup(project)}</section>
        ${project.insight ? `<section class="detail-block"><h4>배운 점</h4><p class="detail-copy">${rich(project.insight)}</p></section>` : ""}
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
