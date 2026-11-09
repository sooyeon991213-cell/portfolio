/*
 * 사이트에 보이는 글과 숫자는 모두 이 파일에서 고친다.
 * 숫자와 사실은 ../01_포트폴리오_원고.md에 있는 것만 쓴다. 문장은 이 파일이 최종본이다.
 * 문장을 쓰거나 고치기 전에 ../말투_가이드.md를 먼저 본다.
 * **굵게** 로 감싸면 화면에서 강조된다. (히어로 제목에서는 형광펜)
 * 프로젝트는 카드를 누르면 한 화면짜리 케이스 카드(팝업)로 열린다. 한 화면에 들어가도록
 *   work(# 핵심 전략) 5개 · metrics 4개 · charts 2개 · images 5개 · insight 2개 안쪽으로 쓴다.
 * type: "퍼포먼스" | "브랜딩" (그룹으로 나뉨) · color: 브랜드 색 [라이트, 다크]
 * charts: type "columns"(세로 막대) · "pairs"(전/후 가로 막대) · "bars"(가로 막대, target이 있으면 기준선)
 *         색은 legend 순서대로 0번 회색, 1번 브랜드 색.
 */
window.PORTFOLIO = {
  hero: {
    // 2026-11-08 수연이가 준 첫 장 문구 그대로
    name: "석수연 · 5년 차 퍼포먼스 마케터",
    title: ["매체 운영·크리에이티브·데이터를", "하나의 **성과 흐름**으로 연결합니다"],
    intro: "광고대행사에서 5년간 이커머스·앱·리드젠·브랜딩 캠페인을 총괄하며, 누적 약 62억 원 규모의 마케팅 프로젝트를 리드했습니다.",
  },
  about: {
    copy: "",
    badge: "",
    // 핵심 역량 카드 4개 (11/08 수연이: 리포팅 자동화를 퍼널 분석 앞으로) · proofs는 회사가 다른 근거를 섞어서
    competencies: [
      // 11/09 수연이: 이력서 핵심 역량과 같은 내용으로, 성과 숫자는 빼고 한 일만
      {
        title: "SA·DA 운영·최적화",
        items: [
          { did: "캠페인 KPI에 따라 10개 이상 매체 미디어믹스 설계·운영, 주간·월간 미팅 진행" },
          { did: "SA는 브랜드·일반, PC·MO, 제품·시공·지역 등 검색 의도별 캠페인 구분, 유입·전환 기준 키워드 관리" },
          { did: "DA는 매체별 캠페인 구조와 타깃 구성, 예산·소재 최적화" }
        ]
      },
      {
        title: "리포팅 자동화·AI 활용",
        items: [
          { did: "Claude Code 바이브 코딩으로 SA·DA 데일리·월간 리포팅 자동화" },
          { did: "성과 대시보드와 네이버 경쟁사 광고 모니터링 직접 구축" }
        ]
      },
      {
        title: "퍼널 분석·측정 고도화",
        items: [
          { did: "GA4 매체별 참여율·참여 시간과 첫 유입 채널별 재방문 경로 분석, 세션 품질 기반 예산 배분" },
          { did: "GA4 마케팅 채널별 새 사용자·이탈률 분석, 잠재고객 Google Ads 연동" },
          { did: "Airbridge 이벤트 전환값 기준 기획 및 개발 요청" }
        ]
      },
      {
        title: "크리에이티브 기획",
        items: [
          { did: "경쟁사 소재, 업종 레퍼런스, 신규 광고 포맷을 매월 모니터링해 광고주에 공유" },
          { did: "캠페인 목표와 타깃, 매체 특성에 맞춘 콘셉트, 소구점, 카피, 포맷 기획" },
          { did: "실사·AI 인물, 영상, 모션그래픽 등 제작 방향 제안, 성과 기반 위닝소재 발굴" }
        ]
      }
    ],
    // 카드 아래 도구 칩 (앞의 '이름:'은 굵게 보임)
    capabilities: [
      "매체: Meta, Google Ads, 네이버 SA·GFA, 카카오, TikTok, DV360, Apple Search Ads, 당근",
      "측정·커머스: GA4, Looker Studio, 에어브릿지, Cafe24, 메이크샵, 스마트스토어 관리자",
      "자동화·AI: Python, Claude Code, Playwright, Google Sheets API"
    ]
  },
  // 2026-11-08 프로젝트 구조: 제목 = 광고주, 소제목 = 캠페인. 케이스는 KPI → Approach → Results.
  //   results[].ref = 그 결과를 만든 approach 번호(1부터). media = 매체 이름만, kpis = KPI만.
  //   순서: LX → 트래블월렛 → 오뚜기 → 소바바 → 블랙업 (수연이 지정). images는 설명 없이.
  projectGroups: null,
  // 2026-11-08 18차: 케이스 = 한 장짜리 슬라이드(수연이 레퍼런스 PPT 형식). 왼쪽 KPI · Approach · Results는 한 줄 글머리,
  // 오른쪽 slide 패널은 프로젝트마다 다르게(사진 · 숫자 원 · 소재 띠 · 도식/차트 중 이야기에 맞는 것만). 차트에 나온 숫자는 원으로 또 쓰지 않음.
  // results는 문장 배열(**굵게** = 숫자). slide.top.images의 w·h는 원본 비율(잘라내지 않고 그 비율대로 배치)
  projects: [
    {
      id: "lxhausys",
      brand: "LX하우시스",
      campaign: "상담신청 DB 확보 캠페인",
      industry: "인테리어·건자재",
      color: ["#C8102E", "#FF6B7F"],
      company: "와이즈버즈",
      current: true,
      period: "2026.01 — 현재",
      budget: "19.3억",
      contribution: 80,
      highlight: { value: "-80%", label: "지인페스타 상담신청 전환 CPA, 전년 하반기 대비" },
      goal: "풀퍼널(Full-Funnel) 마케팅 전략을 통한 잠재 고객 인지도 제고 및 고효율 상담신청 확보",
      kpis: ["상담신청 DB", "GA 세션", "상담신청 CPA"],
      // 11/09 2026년 2~10월 월별 미디어믹스(공유 드라이브 05. 미디어믹스) 기준
      media: { sa: ["네이버 파워링크", "네이버 브랜드검색", "네이버 플레이스", "Google SA"],
        da: ["Meta", "Google PMax", "Google Demand Gen", "네이버 GFA", "카카오 비즈보드", "TikTok Pangle", "DV360", "당근", "ADN", "OK캐쉬백", "KB Ads", "토스", "Pinterest"] },
      approach: [
        // 11/09 수연이: 주절주절 말고 보기 좋게 → 제목 + 짧은 줄(\n) 1~2개, 슬라이드에서 2×2 카드
        { t: "퍼널별 매체·소재 세분화", d: "트래픽(시공사례)·전환(이벤트) 소재로 BAU 분리 운영\nD2C 직계약 캠페인 별도 편성" },
        { t: "단계별 프로모션 빌드업", d: "지인페스타 티징 → 본편 → 리드젠으로 상담신청 극대화\n취향의발견: 노희영 인플루언서 소재로 브랜드 캠페인" },
        { t: "예산 재편", d: "상반기 성과 분석 후 하반기 재설계\n트래픽 : 전환 비중 31 : 69 → 55 : 45" },
        { t: "검색 의도 기반 SA 고도화", d: "파워링크·구글 SA 검색 의도별 캠페인 세분화\n전환 키워드 데일리 입찰, 롱테일 키워드 발굴" }
      ],
      results: [
        "하반기 지인페스타 상담신청 전환 CPA 전년 대비 **80% 절감** 및 DB 볼륨 대폭 확대 (163건 → 452건)",
        "상시(BAU) 성과 달성: 6~9월 4개월 연속 상담신청 목표 초과 달성 (8월 최대 **258%** 달성)",
        "리드젠 고도화: 리드젠 리드 CPA **38% 개선** (역대 지인페스타 캠페인 중 최저 단가 기록)",
        // 근거: 6월 월간리뷰 '26년 상반기 세션단가 & 상담신청 단가 트렌드'(D2C 제외) 6월 광고비 6,313만(5월 1억 2,391만), SA 비중 69%, 상담신청 972건, 상반기 월 970~1,150건
        "SA 성과: 총 광고비가 절반으로 줄어든 6월에도 SA 비중 **69%**로 상담신청 월 **970건대** 유지\n'창호'·'샷시' 등 고단가 키워드 OFF, 1~5월 대비 6~7월 네이버 SA CPC **37% 절감**, 상담신청 CPA **40.2% 개선**"
      ],
      diagram: { type: "journey", title: "고객 여정별 캠페인 역할", note: "제안서의 인테리어 업체 선택 여정 기준", stages: [
        { name: "정보·업체 탐색", items: [{ t: "BAU 트래픽", d: "시공사례 소재" }, { t: "지인페스타 티징", d: "3~4월, 9~10월" }, { t: "취향의발견", d: "노희영 소재 사전 인지" }] },
        { name: "업체 비교·평가", items: [{ t: "파워링크", d: "제품, 시공, 지역, 쇼룸" }, { t: "구글 SA", d: "Brand·Non-Brand" }, { t: "네이버 브랜드검색", d: "" }] },
        { name: "상담신청", items: [{ t: "BAU 전환", d: "상담신청 이벤트 소재" }, { t: "지인페스타 본·리드젠", d: "전환·리드 캠페인" }, { t: "D2C 직계약", d: "창호·주방" }] }
      ], goal: "LX하우시스를 상담 고려 업체로" },
      slide: {
        tone: "dark",
        signals: [{ label: "Signal", text: "상반기 결과 분석" }, { label: "Learning", text: "참여시간 기준 매체 선택" }],
        top: { kind: "side", stats: [{ value: "-80%", label: "지인페스타\n상담신청 전환 CPA\n전년 하반기 대비" }, { value: "258%", label: "BAU 상담신청\n목표 달성 (8월)" }],
          images: [{ src: "./assets/lx-top-keyvisual.jpg", alt: "하반기 지인페스타 키비주얼", w: 900, h: 900 }, { src: "./assets/lx-top-noh.jpg", alt: "취향의발견 큰손 노희영 주방 편", w: 900, h: 900 }] },
        visuals: ["diagram"]
      }
    },
    {
      id: "travelwallet",
      brand: "트래블월렛",
      campaign: "여행 게시글 조회·작성 캠페인",
      industry: "여행 결제 앱",
      color: ["#1D6FE8", "#7AB0FF"],
      company: "와이즈버즈",
      period: "2025.07 — 2025.10",
      budget: "8.35억",
      contribution: 70,
      highlight: { value: "-80.9%", label: "게시글당 비용, AI 인물 → 브랜드필름 스틸컷" },
      goal: "최종 액션인 [소셜 게시글 작성]의 비용을 낮추고, 여행 게시글 하루 100건 확보",
      kpis: ["여행 게시글 작성", "소셜 조회", "게시글당 비용"],
      media: { sa: ["Apple Search Ads", "네이버 브랜드검색"], da: ["Meta", "Google", "TikTok", "네이버 GFA", "Threads", "데이블", "X", "마이리얼트립", "트리플", "키로뷰"] },
      approach: [
        // 11/09 수연이: 주절주절 말고 보기 좋게 → 제목 + 짧은 줄(\n) 1~2개, 슬라이드에서 2×2 카드
        { t: "초기 론칭", d: "이미지 리소스 부족\n생성형 AI로 여행지·동행 유형별 인물 소재 제작" },
        { t: "측정 설계", d: "게시글 작성은 전환 수가 적어\nUpper·Mid 퍼널 이벤트 기획, 개발 요청" },
        { t: "이벤트별 최적화", d: "신규 이벤트 기준으로\nMeta In-App Action, App Retargeting 분리 운영" },
        { t: "브랜드필름·신규 매체", d: "4개 도시 숏폼 8월 집중, 스틸컷 재활용\n신규 매체 테스트로 14개 매체 운영" }
      ],
      results: [
        "In-App Action, App Retargeting 게시글 작성당 비용 **54%**·**72% 절감**",
        "소셜 조회 최적화가 게시글 작성 최적화 대비 조회 **7배**, 게시글 **3배**",
        "브랜드필름 투입 후 광고 기여 게시글 **+69%**, 일 100건 목표 달성",
        "스틸컷 소재 게시글당 비용, AI 인물 소재 대비 **80.9% 절감**"
      ],
      diagram: { type: "funnel", title: "이벤트 신규 설계", note: "최종 액션과 연결된 Upper·Mid 퍼널 이벤트 추가", stages: [
        { name: "Upper Funnel", before: ["소셜 탭 조회"], after: [{ name: "소셜 탭 조회", isNew: true }, { name: "소셜 게시글 조회", isNew: true }] },
        { name: "Mid Funnel", before: ["게시글 댓글 작성", "게시글 대댓글 작성"], after: [{ name: "게시글 댓글 작성" }, { name: "게시글 대댓글 작성" }, { name: "게시글 참여 버튼 클릭", isNew: true }] },
        { name: "Low Funnel", before: ["소셜 게시글 작성"], after: [{ name: "소셜 게시글 작성" }] }
      ] },
      slide: {
        tone: "light",
        signals: [{ label: "Signal", text: "상·중간 퍼널 행동" }, { label: "Learning", text: "이벤트 기반 최적화" }],
        top: { kind: "side", stats: [{ value: "-54%", label: "In-App Action\n게시글 작성당 비용" }, { value: "-72%", label: "App Retargeting\n게시글 작성당 비용" }],
          images: [{ src: "./assets/travelwallet-still.jpg", alt: "브랜드필름 항공샷", w: 1400, h: 1400 }, { src: "./assets/tw-ad-osaka.jpg", alt: "오사카 소재", w: 900, h: 900 }, { src: "./assets/tw-ad-shanghai.jpg", alt: "상하이 숏폼 소재", w: 506, h: 900 }] },
        visuals: ["diagram"]
      }
    },
    {
      id: "jinramen",
      brand: "오뚜기 진라면",
      campaign: "글로벌 도달·조회 캠페인",
      industry: "식품·글로벌",
      color: ["#D9480F", "#FF9A5C"],
      company: "와이즈버즈",
      period: "2025.12 — 2026.01",
      budget: "약 1억",
      contribution: 60,
      highlight: { value: "224%", label: "인도네시아 TikTok 도달 KPI" },
      goal: "[Jinjja Love] 5개국 캠페인 중 인도네시아 전담, 멕시코 서포트. 18–34세 도달과 영상 조회로 진라면 인지도 확보",
      kpis: ["도달", "영상 조회", "브랜드 리프트"],
      media: { da: ["Meta", "TikTok"] },
      approach: [
        // 11/09 수연이: 주절주절 말고 보기 좋게 → 제목 + 짧은 줄(\n) 1~2개, 슬라이드에서 2×2 카드
        { t: "국가별 구조", d: "인도네시아 도달·조회·전환 56 : 24 : 20\n멕시코 도달·조회 65 : 35" },
        { t: "도달 최적화", d: "빈도 하루 1회 제한, 캠페인 조회자 제외\n지역 타겟 해제로 신규 도달 확대" },
        { t: "소재 운영", d: "현지 인플루언서·진 모델 소재 병행\nMeta 소재별 예산, TikTok 8개 이하 테스트" },
        { t: "성과 보고", d: "중간·최종 리포트 작성\n국가별 Brand Lift Study 결과 취합" }
      ],
      results: [
        "인도네시아 TikTok 도달 KPI **224%**, 2초 조회 KPI **219%**",
        "인도네시아 타겟 도달 **90%**, 목표 40%를 2주차에 넘김",
        "인도네시아 비보조 인지도 **+4.3%p**, APAC 벤치마크 1.4%p의 약 3배"
      ],
      charts: [
        {
          type: "country",
          title: "인도네시아 (전담)",
          unit: "%",
          target: 100,
          items: [
            { label: "TikTok 도달 KPI", value: 224 },
            { label: "TikTok 2초 조회 KPI", value: 219 }
          ],
          lift: { label: "Meta BLS 비보조 인지도", before: 1.4, after: 4.3, legend: ["APAC 벤치마크", "캠페인"] }
        },
        {
          type: "country",
          title: "멕시코 (서포트)",
          unit: "%",
          target: 100,
          items: [
            { label: "Meta 3초 조회 KPI", value: 204 },
            { label: "TikTok 2초 조회 KPI", value: 130 },
            { label: "TikTok 도달 KPI", value: 129 },
            { label: "Meta 도달 KPI", value: 123 }
          ],
          lift: { label: "Meta BLS 비보조 인지도", before: 2.3, after: 3.3, legend: ["벤치마크", "캠페인"] }
        }
      ],
      slide: {
        tone: "light",
        signals: [{ label: "Signal", text: "국가별 퍼널 구조" }, { label: "Learning", text: "1주차 소재 분할 투입" }],
        top: { kind: "gallery", images: [
          { src: "./assets/jinramen-indonesia.jpg", alt: "Jin Hero 6초", w: 1276, h: 747 },
          { src: "./assets/jin-conv-a.jpg", alt: "가격 강조 템플릿", w: 900, h: 900 }
        ] },
        visuals: ["charts"]
      }
    },
    {
      id: "sobaba",
      brand: "CJ제일제당 소바바",
      campaign: "숏폼 조회수 확보 캠페인",
      industry: "식품",
      color: ["#7B3FE4", "#B49BFF"],
      company: "와이즈버즈",
      period: "2026.07 — 2026.08",
      budget: "3.73억",
      contribution: 50,
      highlight: { value: "-44.2%", label: "Instagram 숏폼 CPV, 첫 주 → 마지막 주" },
      goal: "실사·애니 두 세계관의 9:16 숏폼으로 조회수를 확보하고, 소바바치킨 인지도 높이기",
      kpis: ["조회수", "CPV", "브랜드 리프트"],
      media: { da: ["Instagram", "TVING"] },
      approach: [
        // 11/09 수연이: 주절주절 말고 보기 좋게 → 제목 + 짧은 줄(\n) 1~2개, 슬라이드에서 2×2 카드
        { t: "9:16 숏폼 중심", d: "Instagram 예산 92%를 Shorts(스토리·릴스)에\n실사·애니 세트 분리 운영" },
        { t: "상시 로테이션", d: "일자별 CPV·VTR 기준 소재 교체\n36종 투입·18종 중단, 동시 8~18종 유지" },
        { t: "승자 소재 집중", d: "애니 '얘들아 이거 나만 보여?', 실사 '황민현 우산씬'\n트래픽 예산 90%를 우산씬에 집중" },
        { t: "TVING 패키지 전환", d: "1주 집중 패키지로 런칭 물량 확보\n이후 노출 보장 패키지로 단가 절감" }
      ],
      results: [
        "Instagram 숏폼 CPV 13원 → 7원 **44.2% 개선**, VTR 48.5% → 56.2%",
        "트래픽 CPC 248원 → 119원 **52% 절감**, TVING CPV 제안 대비 **47% 절감**",
        "Instagram 비보조 인지도 **+6.3%p**, APAC 벤치마크 1.5%p의 약 4배"
      ],
      charts: [
        { type: "pairs", title: "Instagram 브랜드 리프트", note: "오른 폭, Meta BLS", unit: "%p", legend: ["APAC 벤치마크", "캠페인"],
          items: [{ label: "광고 회상도", before: 3.9, after: 8.2 }, { label: "비보조 인지도", before: 1.5, after: 6.3 }, { label: "브랜드 호감도", before: 0.5, after: 5.6 }] }
      ],
      diagram: { type: "split", title: "3단 Wave 예산 배분과 구간 CPV", note: "칸 너비 = 예산 비중, 금액 = 구간 CPV", rows: [
        { label: "예산", parts: [{ name: "런칭 · 14.5원", value: 26 }, { name: "확산 · 12.6원", value: 57 }, { name: "최적화 · 8.2원", value: 17 }] }
      ] },
      slide: {
        tone: "dark",
        signals: [{ label: "Signal", text: "일자별 CPV·VTR" }, { label: "Learning", text: "완주는 피드, 확산은 릴스" }],
        top: { kind: "side", statsAfter: true, stats: [{ value: "-44.2%", label: "Instagram\n숏폼 CPV" }, { value: "93.8%", label: "TVING\nVTR" }], images: [
          { src: "./assets/sobaba-real-b2.jpg", alt: "실사 숏폼 '황민현 우산씬'", w: 540, h: 972 },
          { src: "./assets/sobaba-c3.jpg", alt: "애니 숏폼 '얘들아 이거 나만 보여?'", w: 540, h: 963 },
          { src: "./assets/sobaba-real-c2.jpg", alt: "실사 숏폼 '최애 황민현은?'", w: 540, h: 996 }
        ] },
        visuals: ["diagram", "charts"]
      }
    },
    {
      id: "blackfriday",
      brand: "블랙업",
      campaign: "블랙프라이데이 매출·신규 고객 확보 캠페인",
      industry: "여성 패션 쇼핑몰",
      color: ["#222222", "#E5E5E5"],
      company: "데이위즈",
      period: "2024.10 — 2024.11",
      budget: "예산 8,800만 원",
      contribution: 65,
      contributionLabel: "60–70%",
      highlight: { value: "601%", label: "Google ROAS, 자사 최고 매출" },
      goal: "1년 중 가장 큰 행사인 블랙프라이데이에 매출과 ROAS를 최대로 끌어올리고 신규 고객 확보",
      kpis: ["매출", "ROAS", "신규 고객"],
      media: { sa: ["Google SA"], da: ["Meta", "Google PMax", "Google Demand Gen", "네이버 GFA"] },
      approach: [
        // 11/09 수연이: 주절주절 말고 보기 좋게 → 제목 + 짧은 줄(\n) 1~2개, 슬라이드에서 2×2 카드
        { t: "예산 설계", d: "전년 블프 매출 10.6억 → 예상 매출 11억\n× 광고비 비중 8%(평소 6%) = 8,800만 원" },
        { t: "사전 유입 → 리타겟", d: "1주 전부터 유입 확보, 기간 중 리타겟\n이후 재구매·첫 구매 캠페인 분리" },
        { t: "Meta", d: "유입 : 전환 = 9 : 1로 전환 집중\n미도달 타겟은 도달·빈도 예약 캠페인" },
        { t: "Google", d: "PMax, Demand Gen, 검색으로 구성\nDemand Gen은 신규 고객 전용" }
      ],
      results: [
        "블랙프라이데이 **자사 최고 매출**",
        "Google ROAS **601%**, 8일 광고비 약 1,270만 원 (Demand Gen 새 사용자 98%)",
        "Meta ROAS **528%**, 8일 광고비 약 3,600만 원"
      ],
      diagram: { type: "split", title: "블프 예산 8,800만 원 배분", note: "예상 매출 11억 × 광고비 비중 8%", rows: [
        { label: "매체", parts: [{ name: "Meta", value: 50 }, { name: "Google", value: 25 }, { name: "네이버 검색", value: 9 }, { name: "네이버 GFA", value: 8 }, { name: "카카오", value: 5 }, { name: "기타", value: 3 }] }
      ] },
      slide: {
        tone: "light",
        signals: [{ label: "Signal", text: "전년 블프 매출" }, { label: "Learning", text: "매체별 역할 분리" }],
        top: { kind: "gallery", images: [
          { src: "./assets/blackup-meta.jpg", alt: "블랙프라이데이 Meta 소재", w: 1200, h: 815 },
          { src: "./assets/blackup-google.jpg", alt: "블랙프라이데이 Google 소재", w: 1200, h: 765 }
        ] },
        numbers: [{ value: "601%", label: "Google ROAS" }, { value: "528%", label: "Meta ROAS" }, { value: "98%", label: "Demand Gen 새 사용자" }],
        visuals: ["numbers", "diagram"]
      }
    }
  ],
  career: [
    {
      company: "와이즈버즈",
      period: "2025.07 — 현재",
      detail: "디지털 광고대행사, 대리, 4개 광고주 캠페인 PM (LX하우시스, 트래블월렛, CJ제일제당 소바바, 오뚜기 진라면)",
      numbers: [
        { label: "4개 광고주 미디어믹스 설계, 매체 운영, 소재 기획, 리포트", value: "" },
        { label: "LX하우시스 BAU(시공사례 트래픽·상담신청 이벤트 전환)·D2C 직계약 상시 운영", value: "" },
        { label: "LX하우시스 성수기 지인페스타(티징·본 캠페인·리드젠)·하반기 취향의발견(노희영 소재) 운영", value: "" },
        { label: "LX하우시스 네이버·구글 SA 운영: 검색 의도별 캠페인, 전환 키워드 기준 데일리 입찰, 신규 키워드 발굴, '창호'·'샷시' 등 고단가 키워드 캠페인 OFF", value: "" },
        { label: "트래블월렛 소재 A/B 테스트·신규 매체 테스트", value: "" },
        { label: "SA·DA 데일리 리포트, 리포트 대시보드, 네이버 경쟁사 모니터링 직접 개발", value: "" }
      ]
    },
    {
      company: "데이위즈",
      formerly: "구 엔포니",
      note: "*2024년 크리마 자회사로 편입되며 엔포니에서 이름이 바뀐 같은 회사",
      period: "2022.07 — 2024.12",
      detail: "광고대행사 마케팅팀 매니저. SMB 인터넷 여성 패션 쇼핑몰 8곳 담당(블랙업, 슬로우앤드, 더무드 등), 구글·메타 중심 운영",
      // 11/08 이력서 데이위즈 4묶음(매출 기반 예산 운영 / 캠페인 운영 / 데이터 분석·제안 / 블랙프라이데이) 기준, 경력 칸이라 결과 숫자는 뺌
      numbers: [
        { label: "YOY, MOM, Weekly와 Cafe24 매출·방문 데이터로 익일 매출을 예상하고 브랜드별 매출 대비 광고비율로 일예산 조정", value: "" },
        { label: "데일리 유입·전환 비중 조정, 카탈로그 광고, 시간대별 예산, 연령대·목적별 캠페인 분리", value: "" },
        { label: "비바루비 네이버 파워링크 운영", value: "" },
        { label: "7개 쇼핑몰 신상 등록 수 × 매출 관계 분석, 호스팅사 매출·방문 데이터 수집", value: "" },
        { label: "고객·상품 데이터 기반 브랜드별 성장 전략 제안 (T사 2030 캠페인 분리, V사 ‘셋업’ 카테고리 신설)", value: "" },
        { label: "블랙업 블랙프라이데이 매출 기반 예산 설계, 매체별 역할 분리 운영", value: "" }
      ]
    },
    {
      company: "애드인텔리전스",
      period: "2021.08 — 2022.07",
      detail: "광고 솔루션사 BIZ팀 매니저",
      numbers: [
        { label: "수산물 스마트스토어 운영·검색광고, 배송·컴플레인 프로세스 정립", value: "" },
        { label: "광고 분석 솔루션 ADVisor 대시보드 기획, 1차 와이어프레임 반영, 매뉴얼 전사 가이드화", value: "" }
      ]
    }
  ],
  automation: {
    // 2026-11-08 수연이 피드백: 설명을 늘리고, '내가 자동화했다'가 보이게. 단계(steps)는 {t: 단계, d: 내가 만든 것}
    summary: "반복되던 SA·DA 리포트 제작과 경쟁사 검색광고 모니터링을 자동화하고, 성과 데이터를 한눈에 확인할 수 있는 통합 대시보드를 구축했습니다.\n매체 데이터 수집·가공, 리포트 생성, 성과 시각화, 경쟁사 소재 트래킹까지 각 업무를 하나의 프로세스로 연결해 반복 작업을 줄이고, 성과 분석·인사이트 발굴·개선안 수립에 집중할 수 있는 환경을 만들었습니다.",
    tools: [
      {
        name: "SA·DA 데일리 리포트 자동화",
        stack: "Python, Playwright, Excel, Claude Code",
        steps: [
          { t: "평일 오전 자동 실행", d: "작업 스케줄러를 통해 평일 오전 지정된 시간에 리포트 자동화 스크립트가 자동 실행" },
          { t: "매체 RAW 수집", d: "구글, 메타, 카카오, 네이버 광고 관리자에서 보고서를 자동으로 내려받음" },
          { t: "지표 통일·GA 결합", d: "매체마다 다른 지표 칼럼을 하나로 맞추고, GA 세션·상담신청 데이터를 붙임" },
          { t: "SA·DA 리포트 생성", d: "SA 리포트에는 네이버 키워드별 실시간 노출 순위까지 조회" },
          { t: "대시보드 반영·점검", d: "대시보드에 자동 업로드하고, 빠진 매체·날짜를 점검" }
        ],
        // 2026-11-08 수연이가 쓴 과제 · 구현 · 효과를 개조식으로 (1~2시간 → 약 10분은 수연이 제공 숫자)
        problem: [
          "매일 아침 DA·SA RAW를 매체별로 내려받아 엑셀 가공·리포트 작성에 1~2시간",
          "단독 PM 운영 → 오전 성과 점검·최적화 시간 확보 필요"
        ],
        built: [
          "Claude Code 바이브 코딩으로 매체 RAW 수집·가공 자동화",
          "매체별 지표 칼럼 통일 + GA 세션·상담신청 데이터 결합",
          "SA·DA 리포트·대시보드 자동 반영",
          "SA 리포트에 네이버 키워드별 실시간 노출 순위 조회 추가"
        ],
        effect: [
          "리포트 생성 → 대시보드 반영 **1~2시간 → 약 10분**",
          "출근 후엔 소진율·주요 성과만 점검",
          "담당자 출근과 관계없이 광고주도 이른 시간부터 최신 성과 확인",
          "인수인계 때 엑셀 가공법 대신 캠페인 구조·운영 포인트 설명에 집중"
        ]
      },
      {
        name: "리포트 대시보드화",
        stack: "Python, Chart.js, Google Sheets API",
        image: "./assets/lx-dashboard.jpg",
        demo: { href: "https://sooyeon991213-cell.github.io/portfolio/dashboard-demo/", label: "대시보드 데모 열기 (가상 데이터)", printNote: "※ PDF에서 위 버튼이나 화면 이미지를 누르면 웹에서 데모(가상 데이터)가 열립니다." },
        // 2026-11-08 수연이가 쓴 과제 · 구현 · 효과를 다듬은 것 (약 3분은 수연이 제공 숫자)
        problem: [
          "캠페인별 데일리 엑셀 파일을 하나씩 가공",
          "같은 데이터로 광고주 발송용·내부 관리용 리포트를 이중 제작",
          "광고주용 데일리 리포트를 매일 별도 발송",
          "월말 SA·DA·미디어믹스 데이터 취합, 차트·표 수작업"
        ],
        built: [
          "Google Sheets API로 데이터를 연결해 Chart.js 기반 통합 대시보드 구축",
          "Summary, SA/DA, 키워드, 소재, 미디어믹스, 캠페인 추이 탭 구성",
          "전주 대비 증감, 월말 예상 소진액, 비효율 키워드 자동 산출"
        ],
        effect: [
          "대용량 누적 엑셀을 열지 않고 과거 성과와 기간·캠페인별 추이 바로 확인",
          "최신 성과, 데일리 코멘트, 주요 이슈를 대시보드 한곳에서 제공",
          "광고주 데일리 리포트·코멘트 별도 발송 업무 제거",
          "월간 데이터 취합과 차트·표 업데이트 **약 3분**",
          "줄어든 반복 작업만큼 성과 해석·최적화 액션 도출에 집중"
        ]
      },
      {
        name: "네이버 경쟁사 검색광고 모니터링 자동화",
        stack: "Playwright, Google Sheets API, Claude Code",
        image: "./assets/naver-monitoring-kw.jpg",
        caption: "실제 시트 키워드 탭(PC): 자사·경쟁사 파워링크를 주차별로 쌓고, 동일 소재·미운영 여부를 자동 표기",
        demo: { href: "https://sooyeon991213-cell.github.io/portfolio/monitoring-demo/", label: "모니터링 시트 데모 열기 (가상 데이터)", printNote: "※ PDF에서 위 버튼이나 화면 이미지를 누르면 웹에서 데모(가상 데이터)가 열립니다." },
        problem: [
          "매주 경쟁사 핵심 키워드를 PC·모바일에서 하나씩 검색·캡처",
          "수집한 광고 이미지를 Google Sheets에 직접 정리",
          "소재가 바뀌었는지는 과거 캡처와 수작업 비교"
        ],
        built: [
          "반복 업무를 줄이려고 경쟁사 광고 자동 수집 방식을 직접 제안",
          "Claude Code 바이브 코딩과 Playwright로 수집 기능 구현",
          "경쟁사 5개 브랜드와 핵심 키워드의 PC·모바일 광고 자동 캡처",
          "캡처 결과를 Google Sheets에 주차별 자동 적재",
          "누적 이미지 비교로 동일·재등장 소재 자동 표시"
        ],
        effect: [
          "검색 → 캡처 → 시트 업로드를 **한 번의 실행**으로",
          "경쟁사별 소재 교체 시점·재집행 패턴을 주차별로 추적",
          "경쟁사 메시지·소재 변화 데이터를 쌓아 소재 기획 참고자료로 활용"
        ]
      }
    ]
  },
  contact: { email: "sooyeon991213@gmail.com" }
};
