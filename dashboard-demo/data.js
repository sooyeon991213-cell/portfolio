/* 가상 데이터 생성기 — 실제 광고주 데이터는 하나도 쓰지 않았습니다. 시드 고정이라 열 때마다 같은 숫자가 나옵니다. */
window.DEMO = (() => {
  let seed = 51;
  const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const J = (v, p) => v * (1 + (rnd() * 2 - 1) * p);
  const pad = (n) => String(n).padStart(2, "0");
  const key = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parse = (k) => { const [y, m, d] = k.split("-").map(Number); return new Date(y, m - 1, d); };
  const shift = (k, n) => { const d = parse(k); d.setDate(d.getDate() + n); return key(d); };
  const FIRST = "2026-09-01", TODAY = "2026-10-18";
  const days = []; for (let k = FIRST; k <= TODAY; k = shift(k, 1)) days.push(k);
  const dayIdx = Object.fromEntries(days.map((d, i) => [d, i]));

  const MEDIA = {
    "Meta": { type: "DA", cpm: 10500, ctr: 1.25, vr: .5, sr: .62 },
    "Google Demand Gen": { type: "DA", cpm: 2200, ctr: 3.4, vr: .4, sr: .58 },
    "Google PMAX": { type: "DA", cpm: 2050, ctr: 1.6, vr: .03, sr: .74 },
    "Naver": { type: "DA", cpm: 290, ctr: .31, vr: 0, sr: .44 },
    "Kakao": { type: "DA", cpm: 420, ctr: .29, vr: 0, sr: .57 },
    "DV360": { type: "DA", cpm: 830, ctr: 8.8, vr: 0, sr: .27 },
    "Daangn": { type: "DA", cpm: 2700, ctr: .47, vr: 0, sr: .52 },
    "TikTok": { type: "DA", cpm: 3100, ctr: .85, vr: .62, sr: .31 },
    "Naver SA": { type: "SA" }, "Naver Brand SA": { type: "SA" }, "Google SA": { type: "SA" }, "Naver Place": { type: "SA" }
  };
  const OBJ_MOD = { Traffic: { cpm: .85, ctr: 1.1, lead: .00035, sign: .00025 }, Counsel: { cpm: 1.7, ctr: .75, lead: .0065, sign: .0007 }, Etc: { cpm: 1, ctr: .8, lead: 0, sign: 0 } };

  // 소재 썸네일 팔레트 · 문구
  const THEMES = [
    ["#2f3a4a,#8a97a8", "창 하나로 달라지는 거실"], ["#b23a3a,#f28b6b", "가을 시즌 최대 20%"], ["#3e5c4a,#9cc3a2", "쇼룸 투어 예약"], ["#5a4632,#d6b48c", "주방 리모델링 상담"],
    ["#28324f,#6f86c9", "시공 전후 비교"], ["#6b3d6e,#d59ad8", "우리 집 맞춤 견적"], ["#1f5560,#69c0c9", "단열 · 방음 체크"], ["#7a5b14,#f2cf62", "무료 실측 이벤트"],
    ["#404040,#a3a3a3", "프리미엄 시스템창"], ["#5c2a2a,#e07a5f", "이번 주만 혜택"], ["#2b4b3c,#7fb79a", "고객 후기 모음"], ["#3a3355,#9f8fe0", "인테리어 Q&A"]
  ];
  let ti = 0;
  const cr = (name, form, w, q) => ({ name, form, w, q, theme: THEMES[ti++ % THEMES.length], on: rnd() > .25 });

  // ---------- 미디어믹스 (월별 계획) ----------
  const plan = [];
  const add = (month, camp, obj, ct, media, product, budget, start, end, creatives) => plan.push({ month, camp, obj, ct, media, mtype: MEDIA[media].type, product, budget, start, end, creatives: creatives || [] });
  // 10월
  add("2026-10", "BAU", "Search", "Search", "Naver SA", "파워링크_PC", 5200000, "2026-10-01", "2026-10-31");
  add("2026-10", "BAU", "Search", "Search", "Naver SA", "파워링크_MO", 12600000, "2026-10-01", "2026-10-31");
  add("2026-10", "BAU", "Search", "Search", "Naver Brand SA", "브랜드 검색_MO", 7800000, "2026-10-01", "2026-10-31");
  add("2026-10", "BAU", "Search", "Search", "Naver Place", "플레이스", 200000, "2026-10-01", "2026-10-31");
  add("2026-10", "BAU", "Search", "Search", "Google SA", "Brand", 2600000, "2026-10-01", "2026-10-31");
  add("2026-10", "BAU", "Search", "Search", "Google SA", "Non-Brand", 3400000, "2026-10-01", "2026-10-31");
  add("2026-10", "BAU", "Search", "Search", "Google SA", "Sub", 400000, "2026-10-01", "2026-10-31");
  add("2026-10", "BAU", "Traffic", "브랜드 캠페인 트래픽", "Google Demand Gen", "Youtube Traffic Opt.", 31000000, "2026-10-01", "2026-10-31", [cr("Teaser-Tile", "video", 5, 1.1), cr("Teaser-Swipe", "video", 4, .95)]);
  add("2026-10", "BAU", "Traffic", "브랜드 캠페인 트래픽", "Naver", "GFA Traffic Opt.", 9200000, "2026-10-01", "2026-10-31", [cr("Keyvisual", "image", 1, 1)]);
  add("2026-10", "BAU", "Traffic", "브랜드 캠페인 트래픽", "Meta", "Landing Page View Opt.", 11800000, "2026-10-01", "2026-10-31", [cr("Brand-KV-A", "image", 3, 1.05), cr("Brand-KV-B", "image", 2, .9)]);
  add("2026-10", "BAU", "Traffic", "브랜드 캠페인 트래픽", "Google PMAX", "Performance MAX", 7600000, "2026-10-01", "2026-10-31", [cr("브랜드 캠페인 Pmax", "image", 1, 1)]);
  add("2026-10", "BAU", "Traffic", "브랜드 캠페인 트래픽", "Kakao", "Bizboard Traffic Opt.", 4300000, "2026-10-01", "2026-10-31", [cr("Bizboard-A", "image", 1, 1)]);
  add("2026-10", "BAU", "Traffic", "파트너 모집", "Meta", "Link Click Opt.", 350000, "2026-10-01", "2026-10-13", [cr("Partner-Recruit", "image", 1, 1)]);
  add("2026-10", "BAU", "Counsel", "브랜드 캠페인 전환", "Meta", "Conversion Opt.", 42000000, "2026-10-01", "2026-10-31", [cr("Showroom-Tour-A", "video", 3, 1.2), cr("Showroom-Tour-B", "video", 2, .85), cr("Room-Makeover-A", "video", 3, 1.05), cr("Kitchen-Story", "video", 2, 1.3), cr("Window-Closeup", "image", 2, .7)]);
  add("2026-10", "BAU", "Counsel", "브랜드 캠페인 전환", "Google Demand Gen", "Conversion Opt.", 14500000, "2026-10-01", "2026-10-31", [cr("Showroom-Tour-A", "video", 3, .9), cr("Room-Makeover-B", "video", 2, 1.1)]);
  add("2026-10", "BAU", "Counsel", "시즌 페스타 전환", "Meta", "Conversion Opt.", 8400000, "2026-10-01", "2026-10-05", [cr("Festa-KV", "image", 3, 1.25), cr("USP-Glass", "image", 2, .8), cr("USP-Frame", "image", 2, 1)]);
  add("2026-10", "BAU", "Counsel", "시즌 페스타 전환", "Google PMAX", "Conversion Opt.", 2900000, "2026-10-01", "2026-10-05", [cr("시즌 페스타 Pmax", "image", 1, 1.15)]);
  add("2026-10", "BAU", "Counsel", "시즌 페스타 전환", "Daangn", "Lead Generation", 1600000, "2026-10-01", "2026-10-05", [cr("Festa-Local", "image", 1, .9)]);
  add("2026-10", "BAU", "Etc", "체험관 A 홍보", "Meta", "Link Click Opt.", 420000, "2026-10-19", "2026-10-31", [cr("Showroom-A-Open", "image", 1, 1)]);
  add("2026-10", "BAU", "Etc", "체험관 A 홍보", "Daangn", "Link Click Opt.", 560000, "2026-10-19", "2026-10-31", [cr("Showroom-A-Local", "image", 1, 1)]);
  add("2026-10", "BAU", "Etc", "체험관 B 홍보", "Meta", "Link Click Opt.", 60000, "2026-10-01", "2026-10-01", [cr("Showroom-B", "image", 1, 1)]);
  add("2026-10", "D2C", "Traffic", "D2C 제품A", "Naver", "GFA", 3100000, "2026-10-01", "2026-10-31", [cr("D2C-A-Banner", "image", 1, 1)]);
  add("2026-10", "D2C", "Traffic", "D2C 제품A", "DV360", "DV360", 4200000, "2026-10-01", "2026-10-31", [cr("D2C-A-Display", "image", 1, 1)]);
  add("2026-10", "D2C", "Traffic", "D2C 제품A", "Kakao", "Kakao", 3300000, "2026-10-01", "2026-10-31", [cr("D2C-A-Bizboard", "image", 1, 1)]);
  add("2026-10", "D2C", "Counsel", "D2C 제품A", "Meta", "META", 7400000, "2026-10-01", "2026-10-31", [cr("Viewframe", "image", 2, 1.1), cr("D2C-A-Story", "video", 1, .9)]);
  add("2026-10", "D2C", "Counsel", "D2C 제품A", "Google PMAX", "Pmax", 8200000, "2026-10-01", "2026-10-31", [cr("D2C 제품A Pmax", "image", 1, 1.2)]);
  add("2026-10", "D2C", "Counsel", "D2C 제품B", "Meta", "META", 3900000, "2026-10-01", "2026-10-31", [cr("Full-Kitchen", "image", 1, 1.15)]);
  add("2026-10", "D2C", "Counsel", "D2C 제품B", "Google PMAX", "Pmax", 3500000, "2026-10-01", "2026-10-31", [cr("D2C 제품B Pmax", "image", 1, 1)]);
  // 9월
  add("2026-09", "BAU", "Search", "Search", "Naver SA", "파워링크_PC", 7400000, "2026-09-01", "2026-09-30");
  add("2026-09", "BAU", "Search", "Search", "Naver SA", "파워링크_MO", 17800000, "2026-09-01", "2026-09-30");
  add("2026-09", "BAU", "Search", "Search", "Naver Brand SA", "브랜드 검색_MO", 9100000, "2026-09-01", "2026-09-30");
  add("2026-09", "BAU", "Search", "Search", "Naver Place", "플레이스", 200000, "2026-09-01", "2026-09-30");
  add("2026-09", "BAU", "Search", "Search", "Google SA", "Brand", 3800000, "2026-09-01", "2026-09-30");
  add("2026-09", "BAU", "Search", "Search", "Google SA", "Non-Brand", 5600000, "2026-09-01", "2026-09-30");
  add("2026-09", "BAU", "Traffic", "브랜드 캠페인 트래픽", "Google Demand Gen", "Youtube Traffic Opt.", 44000000, "2026-09-01", "2026-09-30", [cr("Teaser-Tile", "video", 5, 1.05), cr("Teaser-Swipe", "video", 4, 1)]);
  add("2026-09", "BAU", "Traffic", "브랜드 캠페인 트래픽", "Naver", "GFA Traffic Opt.", 9800000, "2026-09-01", "2026-09-30", [cr("Keyvisual", "image", 1, 1)]);
  add("2026-09", "BAU", "Traffic", "브랜드 캠페인 트래픽", "Meta", "Landing Page View Opt.", 36000000, "2026-09-01", "2026-09-30", [cr("Brand-KV-A", "image", 3, 1), cr("Brand-KV-B", "image", 2, .9)]);
  add("2026-09", "BAU", "Traffic", "브랜드 캠페인 트래픽", "Google PMAX", "Performance MAX", 13200000, "2026-09-01", "2026-09-30", [cr("브랜드 캠페인 Pmax", "image", 1, 1)]);
  add("2026-09", "BAU", "Traffic", "브랜드 캠페인 트래픽", "Kakao", "Bizboard Traffic Opt.", 7700000, "2026-09-01", "2026-09-30", [cr("Bizboard-A", "image", 1, 1)]);
  add("2026-09", "BAU", "Traffic", "시즌 페스타 트래픽", "Meta", "Landing Page View Opt.", 19500000, "2026-09-05", "2026-09-30", [cr("Festa-Teaser", "video", 1, 1.1)]);
  add("2026-09", "BAU", "Traffic", "시즌 페스타 트래픽", "Google Demand Gen", "Youtube Traffic Opt.", 15200000, "2026-09-05", "2026-09-30", [cr("Festa-Teaser", "video", 1, 1)]);
  add("2026-09", "BAU", "Traffic", "시즌 페스타 트래픽", "TikTok", "Traffic Opt.", 9600000, "2026-09-05", "2026-09-30", [cr("Festa-Short", "video", 1, .8)]);
  add("2026-09", "BAU", "Traffic", "시즌 페스타 트래픽", "DV360", "DV360", 8300000, "2026-09-05", "2026-09-30", [cr("Festa-Display", "image", 1, 1)]);
  add("2026-09", "BAU", "Counsel", "시즌 페스타 전환", "Meta", "Conversion Opt.", 26500000, "2026-09-05", "2026-09-30", [cr("Festa-KV", "image", 3, 1.2), cr("USP-Glass", "image", 2, .85), cr("USP-Frame", "image", 2, 1)]);
  add("2026-09", "BAU", "Counsel", "시즌 페스타 전환", "Google PMAX", "Conversion Opt.", 11000000, "2026-09-05", "2026-09-30", [cr("시즌 페스타 Pmax", "image", 1, 1.1)]);
  add("2026-09", "BAU", "Counsel", "시즌 페스타 전환", "Daangn", "Lead Generation", 6200000, "2026-09-05", "2026-09-30", [cr("Festa-Local", "image", 1, .9)]);
  add("2026-09", "BAU", "Counsel", "브랜드 캠페인 전환", "Meta", "Conversion Opt.", 31000000, "2026-09-01", "2026-09-30", [cr("Showroom-Tour-A", "video", 3, 1.1), cr("Room-Makeover-A", "video", 3, 1)]);
  add("2026-09", "BAU", "Counsel", "브랜드 캠페인 전환", "Daangn", "Lead Generation", 6400000, "2026-09-01", "2026-09-30", [cr("Showroom-Local", "image", 1, .8)]);
  add("2026-09", "BAU", "Etc", "체험관 B 홍보", "Meta", "Link Click Opt.", 900000, "2026-09-01", "2026-09-30", [cr("Showroom-B", "image", 1, 1)]);
  add("2026-09", "D2C", "Traffic", "D2C 제품A", "Naver", "GFA", 3600000, "2026-09-01", "2026-09-30", [cr("D2C-A-Banner", "image", 1, 1)]);
  add("2026-09", "D2C", "Traffic", "D2C 제품A", "DV360", "DV360", 5900000, "2026-09-01", "2026-09-30", [cr("D2C-A-Display", "image", 1, 1)]);
  add("2026-09", "D2C", "Traffic", "D2C 제품A", "Kakao", "Kakao", 2800000, "2026-09-01", "2026-09-30", [cr("D2C-A-Bizboard", "image", 1, 1)]);
  add("2026-09", "D2C", "Counsel", "D2C 제품A", "Meta", "META", 8800000, "2026-09-01", "2026-09-30", [cr("Viewframe", "image", 2, 1.05)]);
  add("2026-09", "D2C", "Counsel", "D2C 제품A", "Google PMAX", "Pmax", 7300000, "2026-09-01", "2026-09-30", [cr("D2C 제품A Pmax", "image", 1, 1.1)]);
  add("2026-09", "D2C", "Counsel", "D2C 제품B", "Meta", "META", 1200000, "2026-09-01", "2026-09-30", [cr("Full-Kitchen", "image", 1, 1)]);
  add("2026-09", "D2C", "Counsel", "D2C 제품B", "Google PMAX", "Pmax", 1000000, "2026-09-01", "2026-09-30", [cr("D2C 제품B Pmax", "image", 1, 1)]);
  plan.forEach((p) => { const a = parse(p.start), b = parse(p.end); p.days = Math.round((b - a) / 864e5) + 1; p.on = p.start <= TODAY && p.end >= TODAY; });

  // ---------- DA 일별 (소재 단위) ----------
  const da = [];
  plan.filter((p) => p.mtype === "DA").forEach((p) => {
    const m = MEDIA[p.media], o = OBJ_MOD[p.obj], wsum = p.creatives.reduce((a, c) => a + c.w, 0) || 1, pace = J(1.04, .06);
    days.forEach((d) => {
      if (d < p.start || d > p.end) return;
      const dow = parse(d).getDay(), wk = dow === 0 || dow === 6 ? .86 : 1.04;
      p.creatives.forEach((c) => {
        const cost = Math.round(p.budget / p.days * pace * wk * J(1, .14) * c.w / wsum);
        const imp = Math.round(cost / (m.cpm * o.cpm * J(1, .1)) * 1000);
        const clicks = Math.round(imp * m.ctr * o.ctr * J(c.q, .15) / 100);
        const views = c.form === "video" ? Math.round(imp * m.vr * J(1, .2)) : 0;
        const sessions = Math.round(clicks * m.sr * J(1, .12));
        const leads = Math.round(sessions * o.lead * c.q * J(1, .55) + (rnd() < .08 && o.lead ? 1 : 0));
        const signups = Math.round(sessions * o.sign * J(1, .8));
        da.push({ date: d, camp: p.camp, obj: p.obj, ct: p.ct, media: p.media, mtype: "DA", product: p.product, creative: c.name, form: c.form, theme: c.theme, on: p.on && c.on, cost, imp, clicks, views, sessions, leads, signups });
      });
    });
  });

  // ---------- SA 일별 (키워드 단위) ----------
  const KW = {
    "Product": ["창호 교체", "샷시 교체", "샷시 교체 비용", "시스템창호", "이중창 교체", "PVC 창호"],
    "Brand": ["샘플창호", "샘플 인테리어", "샘플 하우스", "샘플창호 가격", "샘플 샷시"],
    "Construction": ["아파트 샷시 교체", "베란다 샷시", "창호 시공", "샷시 시공업체"],
    "Showroom": ["창호 전시장", "인테리어 쇼룸"],
    "Remodeling": ["아파트 리모델링", "주방 리모델링", "욕실 리모델링", "인테리어 견적"],
    "Region": ["강남 인테리어", "분당 샷시", "일산 인테리어", "수원 창호"],
    "Compare": ["창호 브랜드 비교", "샷시 브랜드 순위"],
    "Festa": ["인테리어 할인", "창호 이벤트"],
    "Kitchen": ["주방 인테리어", "싱크대 교체"]
  };
  const CIDX_W = { Product: 6, Brand: 2.4, Construction: 1.6, Showroom: .3, Remodeling: 1.2, Region: .25, Compare: .2, Festa: .15, Kitchen: .2 };
  const GKW = { "Brand": ["샘플창호", "샘플 인테리어", "샘플창호 가격", "샘플 샷시"], "Non-Brand": ["창호 교체", "샷시 교체 비용", "아파트 인테리어", "인테리어 업체", "베란다 확장", "이중창"], "Sub": ["창호 견적 문의"] };
  const keywords = [];
  const n = days.length;
  const mkKw = (media, product, cidx, kw, device, w) => {
    const r = rnd(); let s = 0, e = n - 1;
    if (r < .1) s = n - 1 - Math.floor(rnd() * 5); else if (r < .2) e = n - 9 - Math.floor(rnd() * 6);
    keywords.push({ media, product, cidx, kw, device, w: w * J(1, .7), s, e, cpc: J(cidx === "Brand" ? 420 : 900, .45), cvr: J(cidx === "Brand" ? .055 : .018, .8) * (rnd() < .15 ? 0 : 1), ctr: J(cidx === "Brand" ? 9 : 2.6, .5) });
  };
  ["파워링크_PC", "파워링크_MO"].forEach((prod) => Object.entries(KW).forEach(([ci, list]) => list.forEach((kw, i) => mkKw("Naver SA", prod, ci, kw, prod.endsWith("PC") ? "PC" : "MO", CIDX_W[ci] / list.length * (1 + (list.length - i) * .25)))));
  Object.entries(GKW).forEach(([ci, list]) => list.forEach((kw, i) => mkKw("Google SA", ci, ci, kw, "ALL", 1 / list.length * (1 + (list.length - i) * .3))));
  ["샘플창호", "샘플", "샘플 인테리어", "샘플 샷시", "샘플 하우스", "샘플창호 가격"].forEach((kw, i) => mkKw("Naver Brand SA", "브랜드 검색_MO", "BSA", kw, "MO", 1 / (i + 1)));
  mkKw("Naver Place", "플레이스", "Place", "플레이스", "MO", 1);
  const sa = [];
  plan.filter((p) => p.mtype === "SA").forEach((p) => {
    const ks = keywords.filter((k) => k.media === p.media && k.product === p.product), pace = J(1.02, .05);
    days.forEach((d, di) => {
      if (d < p.start || d > p.end) return;
      const live = ks.filter((k) => di >= k.s && di <= k.e), wsum = live.reduce((a, k) => a + k.w, 0) || 1;
      const dow = parse(d).getDay(), wk = dow === 0 || dow === 6 ? .8 : 1.06, dayCost = p.budget / p.days * pace * wk * J(1, .12);
      live.forEach((k) => {
        const cost = Math.round(dayCost * k.w / wsum * J(1, .3));
        const clicks = Math.max(0, Math.round(cost / (k.cpc * J(1, .15))));
        const imp = Math.round(clicks / (k.ctr * J(1, .2) / 100));
        const sessions = Math.round(clicks * J(.86, .08));
        const leadsGA = Math.round(sessions * k.cvr * J(1, .6));
        const signGA = Math.round(sessions * k.cvr * .35 * J(1, .8));
        sa.push({ date: d, camp: "BAU", obj: "Search", ct: "Search", media: p.media, mtype: "SA", product: p.product, cidx: k.cidx, kw: k.kw, device: k.device, on: true, cost, contract: p.media === "Naver Brand SA" ? cost : 0, imp, clicks, views: 0, sessions, leads: leadsGA, signups: signGA, mleads: Math.round(leadsGA * J(.9, .2)), msign: Math.round(signGA * J(1.3, .3)) });
      });
    });
  });

  // ---------- 월별 추이 (2024.10 ~ 2026.10) ----------
  const months = []; for (let y = 2024, m = 10; y < 2026 || (y === 2026 && m <= 10); m++) { if (m > 12) { m = 1; y++; } if (y === 2026 && m > 10) break; months.push(`${y}-${pad(m)}`); }
  const TREND_MEDIA = { "Naver SA": [0, 24, 27e6, 520000], "Meta": [0, 24, 60e6, 420000], "Naver Brand SA": [0, 24, 9e6, 60000], "Naver": [0, 24, 10e6, 4e6], "Google SA": [0, 24, 8e6, 210000], "Google DG": [7, 24, 30e6, 1.1e6], "DV360": [2, 24, 6e6, 5e6], "Google PMAX": [3, 24, 9e6, 650000], "Daangn": [6, 24, 4e6, 260000], "Kakao": [5, 24, 5e6, 2.4e6], "TikTok": [11, 21, 8e6, 3.5e6], "Toss": [4, 7, 3e6, 5e6], "Buzzvil": [19, 22, 1.5e6, 300000], "Mobon": [2, 11, 2.5e6, 4e6] };
  const monthly = [];
  months.forEach((mo, i) => {
    const season = 1 + .35 * Math.sin((i + 2) / 12 * Math.PI * 2) + ([5, 17].includes(i) ? .9 : 0) + ([11, 23].includes(i) ? .55 : 0);
    Object.entries(TREND_MEDIA).forEach(([media, [s, e, base, cpa]]) => {
      if (i < s || i > e) return;
      const cost = Math.round(base * season * J(1, .25));
      const leads = Math.max(0, Math.round(cost / (cpa * J(1, .45))));
      const imp = Math.round(cost / J(2200, .6) * 1000), clicks = Math.round(imp * J(.015, .5)), sessions = Math.round(clicks * J(.7, .2));
      monthly.push({ month: mo, media, cost, leads, imp, clicks, sessions });
    });
  });

  // ---------- 운영 히스토리 · 업로드 파일 ----------
  const history = [
    ["10/02", "브랜드 캠페인 전환", "Meta 신규 영상 소재 3종 추가 (Room-Makeover · Kitchen-Story)"],
    ["10/05", "시즌 페스타 전환", "행사 종료 · 캠페인 OFF, 잔여 예산 브랜드 캠페인 전환으로 이관"],
    ["10/07", "Naver SA", "누수 키워드 6개 입찰가 하향 (상담 0 · 소진 5만 원 이상)"],
    ["10/08", "브랜드 캠페인 트래픽", "Demand Gen 입찰 전략 클릭수 최대화 → 전환수 최대화 테스트"],
    ["10/12", "D2C 제품B", "Meta 예산 +20% (CPA 목표 대비 우수)"],
    ["10/13", "파트너 모집", "모집 마감 · 캠페인 OFF"],
    ["10/15", "미디어믹스", "10월 2차 믹스 업로드 · 체험관 A 홍보 신규 편성"],
    ["10/17", "Google SA", "Non-Brand 검색어 제외 키워드 12개 추가"]
  ];
  const uploads = { raw: [], mix: [] };
  ["2026-10", "2026-09", "2026-08", "2026-07", "2026-06", "2026-05", "2026-04", "2026-03", "2026-02"].forEach((m, i) => {
    uploads.raw.push({ month: m, files: [["D2C", `raw_D2C_${m}.xlsx`, Math.round(J(450, .3)), (J(1.4, .3)).toFixed(1) + " MB"], ["BAU", `raw_BAU_${m}.xlsx`, Math.round(J(2400, .5)), (J(3.6, .35)).toFixed(1) + " MB"]] });
    uploads.mix.push({ month: m, files: [["D2C", `mix_D2C_${m}.xlsx`, Math.round(J(7, .3)) + "개 항목", Math.round(J(3.3e7, .2))], ["BAU", `mix_BAU_${m}.xlsx`, Math.round(J(28, .2)) + "개 항목", Math.round(J(2.1e8, .3))]] });
  });

  return { FIRST, TODAY, days, dayIdx, MEDIA, plan, da, sa, keywords, months, monthly, history, uploads, key, parse, shift };
})();
