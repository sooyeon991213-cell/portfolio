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
    name: "석수연 · 5년차 퍼포먼스 마케터",
    // 2026-11-08: 한 프로젝트 숫자 대신 강점(획득 운영 → 퍼널 → 자동화)을 제목으로. 아임웹 주요업무 순서와 같음
    title: ["SA · DA 운영부터 **퍼널 개선**", "리포트 **완전 자동화**까지"],
    intro: "광고대행사 5년 동안 이커머스 · 앱 · 리드 · 브랜딩 캠페인을 직접 운영했습니다.",
    // 제목 아래: 회사별로 묶은 업종별 캠페인 표 (5년 흐름 + 캠페인 KPI + 광고비). 2026-11-08 수연이가 정리해 준 KPI 기준
    storyLabel: "업종별 캠페인",
    campaignNote: "광고비는 담당 기간 집행액 기준 (오뚜기는 미디어믹스, 데이위즈는 구글 · 메타 합계)",
    campaigns: [
      {
        company: "와이즈버즈", period: "2025.07 – 현재", role: "대리 · 캠페인 PM",
        rows: [
          { industry: "인테리어", project: "lxhausys", brand: "LX하우시스", kpi: "세션 · 상담신청 DB", how: "SA · DA 12개 매체, 지인페스타 · 취향의발견", budget: "19.3억" },
          { industry: "여행 결제 앱", project: "travelwallet", brand: "트래블월렛", kpi: "여행 게시글 조회 · 작성", how: "브랜드필름 촬영 · 8월 집중 운영, 신규 매체 테스트", budget: "8.35억" },
          { industry: "식품", project: "sobaba", brand: "CJ제일제당 소바바", kpi: "조회수", how: "실사 · 애니 두 세계관 숏폼, Instagram · TVING", budget: "3.73억" },
          { industry: "식품 · 글로벌", project: "jinramen", brand: "오뚜기 진라면", kpi: "도달 · 조회", how: "인도네시아 · 멕시코, 현지 인플루언서 · 진 모델 소재", budget: "약 1억" },
          { industry: "업무 자동화", brand: "LX하우시스 담당", kpi: "리포트 · 모니터링", how: "SA · DA 데일리 리포트, 리포트 대시보드, 네이버 경쟁사 모니터링 직접 개발", budget: "" }
        ]
      },
      {
        company: "데이위즈 (구 엔포니)", period: "2022.07 – 2024.12", role: "마케팅팀 매니저",
        rows: [
          { industry: "여성 패션 쇼핑몰", project: "blackfriday", brand: "블랙업 · 슬로우앤드 · 더무드 등 SMB 8곳", kpi: "ROAS · 매출", how: "구글 · 메타 · 네이버, 매출 대비 예산 설계, 호스팅사(Cafe24 · 메이크샵) 데이터 분석", budget: "약 30억" }
        ]
      },
      {
        company: "애드인텔리전스", period: "2021.08 – 2022.07", role: "광고 솔루션사 BIZ팀",
        rows: [
          { industry: "이커머스", brand: "수산물 스마트스토어", kpi: "판매", how: "검색광고 운영, 광고 분석 솔루션 ADVisor 기획", budget: "" }
        ]
      }
    ]
  },
  about: {
    copy: "",
    badge: "",
    // 핵심 역량 카드 4개 (아임웹 주요업무 4개와 같은 순서) · proofs는 회사가 다른 근거를 섞어서
    competencies: [
      {
        title: "검색 · 디스플레이 광고 운영",
        items: [
          { did: "LX하우시스 지인페스타 트래픽 : 전환 예산 비중 재설계", result: "전환 CPA -80%" },
          { did: "네이버 확장검색 · 구글 Non-Brand 입찰전략 테스트", result: "상담신청 +108.6%" },
          { did: "SMB 쇼핑몰 8곳 구글 · 메타 운영, 매출 대비 광고비로 예산 설계", result: "ROAS 약 600%" }
        ]
      },
      {
        title: "소재 기획 · A/B 테스트",
        items: [
          { did: "트래블월렛 브랜드필름 스틸컷 vs AI 인물 소재 테스트", result: "게시글당 비용 -80.9%" },
          { did: "LX하우시스 벽지 소재 이미지 → 영상 전환", result: "상담신청 3 → 61건" },
          { did: "소바바 실사 · 애니 숏폼 일자별 로테이션", result: "CPV -44.2%" }
        ]
      },
      {
        title: "퍼널 · 측정 설계",
        items: [
          { did: "트래블월렛 에어브릿지 소셜 이벤트 신설 · iOS SKAN 전환값 재설계", result: "조회당 비용 -90.3%" },
          { did: "LX하우시스 GA 기준 유입은 세션 수 · 전환은 전환 수 최대화로 운영", result: "" },
          { did: "GA4 장바구니 → 결제 이탈 분석 중 iOS 결제 오류 발견", result: "이탈률 36 → 20%" }
        ]
      },
      {
        title: "운영 자동화 · AI",
        items: [
          { did: "매체 RAW 다운로드부터 SA · DA 데일리 리포트까지 자동화", result: "평일 08:30 자동 생성" },
          { did: "리포트 대시보드화 · 월간 리포트 자동 생성", result: "월간 리포트 3분" },
          { did: "네이버 경쟁사 광고 주차별 자동 수집", result: "5개 브랜드 · 키워드 9개" }
        ]
      }
    ],
    // 카드 아래 도구 칩 (앞의 '이름:'은 굵게 보임)
    capabilities: [
      "매체: Meta · Google Ads · 네이버 SA/GFA · 카카오 · TikTok · DV360 · Apple Search Ads · 당근",
      "측정: GA4 · 에어브릿지 · SKAN 4.0 · Brand Lift Study",
      "커머스: Cafe24 · 메이크샵 · 스마트스토어",
      "자동화: Python · Claude Code · Playwright · Google Sheets API",
      "글로벌: 멕시코 · 인도네시아 캠페인"
    ]
  },
  projectGroups: [
    { type: "퍼포먼스", title: "퍼포먼스 캠페인", note: "상담신청 · 게시글 · 매출 같은 전환 KPI" },
    { type: "브랜딩", title: "브랜딩 캠페인", note: "도달 · 조회 · 브랜드 리프트 KPI" }
  ],
  projects: [
    {
      id: "lxhausys",
      type: "퍼포먼스",
      brand: "LX하우시스",
      color: ["#C8102E", "#FF6B7F"],
      company: "와이즈버즈",
      current: true,
      name: "LX하우시스 세션 · 상담신청 DB 확보 캠페인",
      period: "2026.01 — 현재",
      budget: "광고비 19.3억",
      highlight: { value: "-80%", label: "지인페스타 전환 CPA · 전년 하반기 대비" },
      role: "실무 PM · 운영 · 자동화 개발",
      goal: "인테리어 상담신청(DB) 확보 · 상 · 하반기 지인페스타와 취향의발견(큰손 노희영) 중심",
      facts: [
        { label: "업종", value: "인테리어 · 건자재" },
        { label: "기여도", value: "80%", bar: 80 },
        { label: "광고비", value: "19.3억 (2026.01~09 집행) · 지인페스타 · 취향의발견 7.32억 포함", wide: true },
        { label: "매체", value: "네이버 파워링크 · 브랜드검색 · 플레이스, Google SA / Meta · Demand Gen · PMax · GFA · 카카오 · TikTok · DV360 · 당근", wide: true }
      ],
      work: [
        "**지인페스타** 상반기 결과로 하반기 트래픽 : 전환을 31 : 69 → 55 : 45로 조정, GA 기준 세션 · 전환 수 최대화\n→ 전환 CPA 상반기 대비 57%, 전년 하반기 대비 80% 절감",
        "**소재 테스트** 벽지 소재 이미지 → 영상 전환, USP vs 헤리티지 영상 비교\n→ 벽지 상담신청 3건 → 61건, USP 51건 : 헤리티지 2건",
        "**검색광고** 네이버 확장검색, 구글 Non-Brand 입찰전략을 전환수 최대화로 변경\n→ 비용 19%로 전환 59% 확보, 상담신청 +108.6%"
      ],
      metrics: [
        { value: "-71%", label: "상반기 지인페스타 유입 세션 단가 · 전년 지인페스타 대비" },
        { value: "-57%", label: "하반기 지인페스타 전환 CPA · 상반기 대비, 광고비 56% 줄이고 세션 +39%" },
        { value: "+177%", label: "하반기 지인페스타 상담신청 · 전년 하반기 대비, 전환 CPA -80%" },
        { value: "+108.6%", label: "구글 SA Non-Brand 상담신청 · 입찰전략 변경 후, CPA 약 59% 개선" }
      ],
      charts: [
        {
          type: "columns",
          title: "지인페스타 회차별 전환 CPA",
          note: "25년 하반기(담당 전) = 100 · 낮을수록 좋음",
          items: [
            { label: "25년 하반기", value: 100 },
            { label: "26년 상반기", value: 47.6 },
            { label: "26년 하반기", value: 20.3 }
          ]
        },
        {
          type: "bars",
          title: "세션 단가",
          note: "바꾸기 전 = 100 · 짧을수록 좋음",
          target: 100,
          items: [
            { label: "DV360 · 지인페스타 상반기 → 하반기", value: 24.6 },
            { label: "상반기 지인페스타 유입 · 전년 대비", value: 29.3 },
            { label: "지인페스타 전체 · 상반기 → 하반기", value: 31.3 },
            { label: "지인페스타 트래픽 · 상반기 → 하반기", value: 47 },
            { label: "취향의발견 트래픽 · 노희영 소재 투입 후", value: 78.9 }
          ]
        }
      ],
      images: [
        { src: "./assets/lx-spring-kv.jpg", result: "Meta 상담신청 최다 소재군", caption: "상반기 지인페스타 키비주얼" },
        { src: "./assets/lx-top-keyvisual.jpg", result: "9월 상담신청 1위", caption: "하반기 지인페스타 키비주얼" },
        { src: "./assets/lx-top-diamant.jpg", result: "9월 상담신청 2위", caption: "디아망 포티스 후기형 (벽지 영상)" },
        { src: "./assets/lx-top-kvmotion.jpg", result: "4위 · 단가 2번째로 낮음", caption: "하반기 키비주얼 모션그래픽" },
        { src: "./assets/lx-top-noh.jpg", result: "9월 상담신청 3위", caption: "취향의발견 큰손 노희영 주방 편" }
      ],
      imagesNote: "상반기는 3월 월간리뷰 Meta 전환 기준 · 나머지는 2026년 9월 DA 소재 270개 기준",
      insight: [
        "세션 단가만 보면 TikTok 애드네트워크가 가장 쌌지만 평균 참여시간이 0.9초였습니다. 단가가 아니라 **참여시간 기준**으로 매체를 다시 골랐습니다."
      ]
    },
    {
      id: "travelwallet",
      type: "퍼포먼스",
      brand: "트래블월렛",
      color: ["#1D6FE8", "#7AB0FF"],
      company: "와이즈버즈",
      name: "트래블월렛 여행 게시글 조회 · 작성 캠페인",
      period: "2025.07 — 2025.10",
      budget: "광고비 8.35억",
      highlight: { value: "-80.9%", label: "게시글당 비용(CPA) · 스틸컷 vs AI 인물" },
      role: "미디어믹스 · 운영 · 소재 기획 · 월간 보고",
      goal: "앱 소셜(여행 동행) 기능 활성화 · 여행 게시글 하루 100건",
      facts: [
        { label: "업종", value: "여행 결제 앱" },
        { label: "기여도", value: "70%", bar: 70 },
        { label: "광고비", value: "8.35억 (담당 기간 집행, 8월 메인)", wide: true },
        { label: "매체", value: "Meta · Google · TikTok · Apple Search Ads · 네이버 GFA · 브랜드검색 · Threads · 마이리얼트립 · 트리플 등 14개", wide: true }
      ],
      work: [
        "**브랜드필름** 도시별 숏폼 4편 촬영 · 8월 집중 운영, 스틸컷은 퍼포먼스 소재로 재활용\n→ 광고 기여 게시글 +69%, 일 100건 목표 달성",
        "**A/B 테스트** 브랜드필름 스틸컷 vs AI 인물 소재\n→ 게시글당 비용 80.9% 절감",
        "**측정 재설계** iOS SKAN 4.0 전환값 재매핑, 에어브릿지 소셜 이벤트 3개 신설\n→ 재참여 캠페인 소셜 조회당 비용 90.3% 절감",
        "**신규 매체 발굴** 데이블 · X · 사람인 · 에브리타임 테스트, 마이리얼트립 · 트리플 · 키로뷰(인천공항) · Threads까지 14개 매체 운영"
      ],
      metrics: [
        { value: "-80.9%", label: "게시글당 비용 · 스틸컷 vs AI 인물 소재 A/B 테스트" },
        { value: "-90.3%", label: "소셜 조회당 비용 · 이벤트 재설계 후 재참여 캠페인" },
        { value: "+69%", label: "광고 기여 게시글 · 브랜드필름 투입 후 일 100건 목표 달성" },
        { value: "+113%", label: "게시글 수 · Meta 소재 운영 변경, CPA 상승은 7%에서 막음" }
      ],
      charts: [
        {
          type: "columns",
          title: "광고 기여 게시글 수",
          note: "캠페인 단계별",
          unit: "건",
          items: [
            { label: "초반 안정화", value: 526 },
            { label: "예산 확대 (+41%)", value: 741 },
            { label: "브랜드필름 (+69%)", value: 1249 }
          ]
        },
        {
          type: "pairs",
          title: "바꾸기 전과 후의 비용",
          note: "바꾸기 전 = 100 · 짧을수록 좋음",
          legend: ["바꾸기 전", "바꾼 후"],
          items: [
            { label: "게시글당 비용 · AI 인물 → 스틸컷", before: 100, after: 19.1 },
            { label: "소셜 조회당 비용 · 이벤트 재설계", before: 100, after: 9.7 },
            { label: "게시글당 비용 · 이벤트 재설계", before: 100, after: 27.4 }
          ]
        }
      ],
      images: [
        { src: "./assets/travelwallet-still.jpg", result: "Events 캠페인 최다 소진", caption: "브랜드필름 항공샷" },
        { src: "./assets/tw-ad-osaka.jpg", result: "인스타그램 1위 에피소드", caption: "오사카 편 스틸컷" },
        { src: "./assets/tw-ad-shanghai.jpg", result: "틱톡 1위 에피소드", caption: "상하이 편 영상" }
      ],
      insight: [
        "같은 브랜드필름인데 인스타그램은 오사카, 틱톡은 상하이 편 반응이 가장 좋았습니다. 둘 다 맛집과 가벼운 술자리 장면이었습니다."
      ]
    },
    {
      id: "blackfriday",
      type: "퍼포먼스",
      brand: "블랙업",
      color: ["#222222", "#E5E5E5"],
      company: "데이위즈 (구 엔포니)",
      name: "블랙업(BLACKUP) 블랙프라이데이 매출 · 신규 고객 캠페인",
      period: "2024.10 — 2024.11",
      budget: "예산 8,800만 원",
      highlight: { value: "601%", label: "Google ROAS · 자사 최고 매출" },
      role: "미디어믹스 설계 · 전 매체 운영",
      goal: "SMB 여성 패션 쇼핑몰의 1년 중 가장 큰 행사 · 매출과 ROAS 최대화, 신규 고객 확보",
      facts: [
        { label: "업종", value: "여성 패션 쇼핑몰 SMB (에이블리 1위 브랜드)" },
        { label: "기여도", value: "60–70%", bar: 65 },
        { label: "매체", value: "Meta · Google · 카카오 · 네이버 GFA · 타겟팅게이츠 · 앱 푸시", wide: true }
      ],
      work: [
        "**예산 설계** 전년 블프 매출 10.6억 기준 예상 매출 11억 × 광고비 비중 8%(평소 6%) = 8,800만 원, 6개 매체에 배분\n→ 메타 50 · 구글 25 · 네이버 검색 9 · GFA 8 · 카카오 5 · 타게팅게이츠 3 (%)",
        "**Meta** 유입 : 전환 9 : 1까지 전환 비중 확대, 미도달 타겟은 예약 캠페인으로 분리\n→ 8일 광고비 약 3,600만 원, Meta ROAS 528%",
        "**Google** PMax · 영상 · 검색 · Demand Gen 구성, Demand Gen은 신규 고객 전용\n→ 8일 광고비 약 1,270만 원, Google ROAS 601%, 새 사용자 비중 98%",
        "**CRM** '장바구니 이탈' · '구매 1회 고객' 세그먼트 앱 푸시, 앱 전용 혜택 구성\n→ 앱 푸시 참여율 92%"
      ],
      metrics: [
        { value: "자사 최고", label: "블랙프라이데이 브랜드 매출" },
        { value: "601%", label: "Google ROAS · Demand Gen 새 사용자 비중 98%" },
        { value: "528%", label: "Meta ROAS · 8일 광고비 약 3,600만 원" },
        { value: "92%", label: "CRM 앱 푸시 참여율 · 새 사용자율 64%" }
      ],
      charts: [
        {
          type: "bars",
          title: "블랙프라이데이 매체별 ROAS",
          unit: "%",
          items: [
            { label: "Google", value: 601 },
            { label: "Meta", value: 528 }
          ]
        }
      ],
      insight: []
    },
    {
      id: "sobaba",
      type: "브랜딩",
      brand: "CJ제일제당 소바바치킨",
      color: ["#7B3FE4", "#B49BFF"],
      company: "와이즈버즈",
      name: "CJ제일제당 소바바 숏폼 조회수 확보 캠페인",
      period: "2026.07 — 2026.08",
      budget: "광고비 3.73억",
      highlight: { value: "+6.3%p", label: "비보조 인지도 · APAC 벤치마크의 약 4배" },
      role: "7~8월 운영 전담 · Instagram · TVING",
      goal: "실사(황민현) · 애니 두 세계관 숏폼으로 조회수 확보, 소바바치킨 인지도 올리기",
      facts: [
        { label: "업종", value: "식품 · CJ제일제당 소바바치킨" },
        { label: "기여도", value: "50%", bar: 50 },
        { label: "광고비", value: "3.73억 (7~8월 담당분) · 캠페인 전체 7.1억", wide: true },
        { label: "매체", value: "Instagram 숏폼(스토리 · 릴스) · 피드 · 트래픽, TVING 노출 보장 패키지 · CTV", wide: true }
      ],
      work: [
        "**숏폼 로테이션** 실사 · 애니 숏폼을 일자별 성과로 교체, 동시 8~18종 유지\n→ IG Shorts CPV 44.2% 절감, VTR 48.5% → 56.2%",
        "**TVING** 7월 노출 보장 패키지로 바꿔 단가를 낮추고 물량 유지\n→ 실집행 계약 대비 153%",
        "**운영 · 리포트 전담** 7~8월 Instagram · TVING 운영과 데일리 리포트\n→ 비보조 인지도 +6.3%p, 광고 회상도 +8.2%p"
      ],
      metrics: [
        { value: "+6.3%p", label: "Instagram 비보조 인지도 · APAC 벤치마크 1.5%p의 약 4배" },
        { value: "+8.2%p", label: "광고 회상도 · APAC 벤치마크 3.9%p의 2배 이상" },
        { value: "-44.2%", label: "IG Shorts CPV · 첫 주 → 마지막 주, VTR 48.5% → 56.2%" },
        { value: "151%", label: "노출 KPI 달성률 · 조회 129% (캠페인 전체)" }
      ],
      charts: [
        {
          type: "bars",
          title: "캠페인 KPI 달성률",
          note: "세로선 = KPI 100% · 클릭은 미달",
          unit: "%",
          target: 100,
          items: [
            { label: "노출", value: 151 },
            { label: "조회", value: 129 },
            { label: "소진", value: 100 },
            { label: "클릭", value: 78, group: 0 }
          ]
        },
        {
          type: "pairs",
          title: "Instagram 브랜드 리프트",
          note: "오른 폭 · Meta BLS",
          unit: "%p",
          legend: ["APAC 벤치마크", "캠페인"],
          items: [
            { label: "광고 회상도", before: 3.9, after: 8.2 },
            { label: "비보조 인지도", before: 1.5, after: 6.3 },
            { label: "브랜드 호감도", before: 0.5, after: 5.6 }
          ]
        }
      ],
      images: [
        { src: "./assets/sobaba-kv.jpg", caption: "세계관 키비주얼 (애니)" }
      ],
      insight: [
        "피드는 완주율이 릴스의 1.8배였고, 공유는 91%가 릴스에서 나왔습니다. 완주는 피드, 확산은 릴스가 맡은 셈입니다."
      ]
    },
    {
      id: "jinramen",
      type: "브랜딩",
      brand: "오뚜기 진라면",
      color: ["#D9480F", "#FF9A5C"],
      company: "와이즈버즈",
      name: "오뚜기 진라면 글로벌 도달 · 조회 캠페인",
      period: "2025.12 — 2026.01",
      budget: "광고비 약 1억",
      highlight: { value: "224%", label: "인도네시아 TikTok 도달 KPI" },
      role: "인도네시아 전담 · 멕시코 서포트",
      goal: "[Jinjja Love] 5개국 캠페인 중 인도네시아 전담 · 18–34세 도달과 영상 조회",
      facts: [
        { label: "업종", value: "식품 · 글로벌" },
        { label: "기여도", value: "60%", bar: 60 },
        { label: "광고비", value: "인도네시아 약 1억 (미디어믹스 기준)", wide: true },
        { label: "매체", value: "Meta · TikTok (도달 · 영상 조회 · 장바구니 · 구매)", wide: true }
      ],
      work: [
        "**소재** 현지 인플루언서 영상과 진 모델 소재를 함께 운영, Meta는 소재별 예산 · TikTok은 8개 이하로 묶어 테스트\n→ 인플루언서 영상 하나가 인플루언서 Reach 도달의 44%",
        "**도달 최적화** 빈도 하루 1회 제한, 조회자 제외, 운영 중 지역 타겟 해제\n→ 타겟 도달 90% (목표 40%), 2주차 조기 달성",
        "**캠페인 구조** Reach : View : Conversion = 56 : 24 : 20, 국가별 Brand Lift Study 취합\n→ TikTok 도달 KPI 224%, 비보조 인지도 +4.3%p"
      ],
      metrics: [
        { value: "224%", label: "인도네시아 TikTok 도달 KPI · 2초 조회 KPI 219%" },
        { value: "90%", label: "인도네시아 타겟 도달 · 목표 40%를 2주차에 넘김" },
        { value: "+4.3%p", label: "인도네시아 비보조 인지도 · APAC 벤치마크 1.4%p의 약 3배" },
        { value: "13.55%", label: "멕시코(서포트) 진 소재 참여율 · 5개국 중 최고" }
      ],
      charts: [
        {
          type: "bars",
          title: "KPI 달성률",
          note: "세로선 = KPI 100%",
          unit: "%",
          target: 100,
          legend: ["멕시코 (서포트)", "인도네시아 (전담)"],
          items: [
            { label: "인도네시아 · TikTok 도달", value: 224, group: 1 },
            { label: "인도네시아 · TikTok 2초 조회", value: 219, group: 1 },
            { label: "멕시코 · Meta 3초 조회", value: 204, group: 0 },
            { label: "멕시코 · TikTok 2초 조회", value: 130, group: 0 },
            { label: "멕시코 · Meta 도달", value: 123, group: 0 }
          ]
        },
        {
          type: "pairs",
          title: "Meta 브랜드 리프트 · 비보조 인지도",
          note: "캠페인으로 오른 폭",
          unit: "%p",
          legend: ["벤치마크", "캠페인"],
          items: [
            { label: "인도네시아", before: 1.4, after: 4.3 },
            { label: "멕시코", before: 2.3, after: 3.3 }
          ]
        }
      ],
      images: [
        { src: "./assets/jinramen-indonesia.jpg", result: "TikTok 2초 VTR 1위", caption: "Jin Hero 6초" },
        { src: "./assets/jin-midnight.jpg", result: "Meta 3초 VTR 1위", caption: "Jin Midnight" },
        { src: "./assets/jin-conv-a.jpg", result: "구매전환 베스트", caption: "가격 강조 템플릿" }
      ],
      insight: [
        "인도네시아는 테스트 없이 소재를 한 번에 넣었다가 첫 주 성과가 흔들려서, 1주차에는 소재를 더 짧은 주기로 나눠 넣자고 제안했습니다."
      ]
    }
  ],
  career: [
    {
      company: "와이즈버즈",
      period: "2025.07 — 현재",
      detail: "디지털 광고대행사 · 대리 · 4개 광고주 캠페인 PM (LX하우시스, 트래블월렛, CJ제일제당 소바바, 오뚜기 진라면)",
      numbers: [
        { label: "4개 광고주 미디어믹스 설계 · 매체 운영 · 소재 기획 · 리포트", value: "광고비 32억" },
        { label: "LX하우시스 지인페스타 트래픽 : 전환 예산 비중 재설계", value: "전환 CPA -80%" },
        { label: "트래블월렛 소재 A/B 테스트 · 신규 매체 테스트", value: "게시글당 비용 -80.9%" },
        { label: "SA · DA 데일리 리포트, 리포트 대시보드, 네이버 경쟁사 모니터링 직접 개발 (LX하우시스)", value: "" }
      ]
    },
    {
      company: "데이위즈 (구 엔포니)",
      period: "2022.07 — 2024.12",
      detail: "광고대행사 마케팅팀 매니저 · SMB 인터넷 여성 패션 쇼핑몰 8곳 담당 · 구글 · 메타 누적 광고비 약 30억 원, 10개 매체 운영 · 2024년 크리마 자회사로 편입되며 엔포니에서 이름이 바뀐 같은 회사",
      numbers: [
        { label: "블랙업 블랙프라이데이 예산 설계(8,800만 원) · 6개 매체 운영, 자사 최고 매출", value: "ROAS 601% · 528%" },
        { label: "SMB 쇼핑몰 8곳 구글 · 메타 운영 (2022.09 – 2024.11, 누적 약 30억)", value: "합산 ROAS 약 600%" },
        { label: "비바루비 네이버 파워링크 운영 (평균 노출순위 2.71위)", value: "ROAS 770%" },
        { label: "T사 연령대별 가입 · 매출 분석 후 2030 캠페인 분리", value: "가입률 +30%, ROAS 1.2배" },
        { label: "7개 쇼핑몰 신상 등록 수 × 매출 관계 분석, 광고 · 컨설팅 제안에 활용", value: "" },
        { label: "호스팅사 매출 · 방문 데이터 수집 자동화 (개발자와 빅쿼리 → 구글 시트)", value: "" },
        { label: "GA4 결제 이탈 분석 중 iOS 결제 오류 발견", value: "이탈률 36 → 20%" }
      ]
    },
    {
      company: "애드인텔리전스",
      period: "2021.08 — 2022.07",
      detail: "광고 솔루션사 BIZ팀 매니저",
      numbers: [
        { label: "수산물 스마트스토어 운영 · 검색광고, 배송 · 컴플레인 프로세스 정립", value: "판매 90%+ 광고 유입" },
        { label: "광고 분석 솔루션 ADVisor 대시보드 기획, 1차 와이어프레임 반영 · 매뉴얼 전사 가이드화", value: "" }
      ]
    }
  ],
  automation: {
    summary: "LX하우시스를 담당하며 SA · DA 데일리 리포트를 매체 RAW 다운로드부터 완전 자동화했습니다.\n리포트 대시보드와 네이버 경쟁사 모니터링도 직접 만들었습니다.",
    tools: [
      {
        name: "SA · DA 데일리 리포트 자동화",
        stack: "Python · Playwright · Excel · Claude Code",
        steps: ["평일 08:30 자동 실행", "매체 RAW 다운로드 (DA 8 · SA 6)", "RAW 가공 · 매체 통합", "SA · DA 리포트 생성", "대시보드 업로드 · 점검"],
        problem: "매일 아침 매체마다 RAW를 받아 엑셀로 가공하고 SA · DA 리포트를 따로 만들었습니다.",
        built: "매체 RAW 다운로드부터 가공, 리포트 생성, 대시보드 업로드까지 직접 만들었습니다. DA와 SA를 동시에 돌리고, 한쪽이 멈춰도 다른 쪽은 끝까지 갑니다.",
        effect: "평일 08:30에 리포트가 **자동으로** 만들어집니다. 내 PC가 꺼진 날은 팀원 PC가 대신 실행합니다."
      },
      {
        name: "리포트 대시보드화",
        stack: "Python · Chart.js · Google Sheets API",
        image: "./assets/lx-dashboard.jpg",
        caption: "광고주 데이터 보호를 위해 수치 블러 처리",
        problem: "성과를 보려면 엑셀 리포트를 열어야 했고, 월말에는 리포트와 차트를 손으로 만들었습니다.",
        built: "DA, SA, 키워드, 소재, 미디어믹스를 한 화면에서 보는 대시보드. 원본 파일 5개를 넣으면 월간 엑셀 리포트(11개 시트)도 같이 나옵니다.",
        effect: "팀과 광고주는 대시보드에서 바로 성과를 확인합니다. 월간 리포트 **3분**, 이상치와 예산 소진 속도는 자동 경고."
      },
      {
        name: "네이버 경쟁사 모니터링",
        stack: "Playwright · Google Sheets API",
        image: "./assets/naver-monitoring.jpg",
        caption: "경쟁사 광고를 주차별로 쌓고, 같은 소재는 자동으로 표시",
        problem: "매주 경쟁사 키워드를 하나씩 검색해서 광고를 캡처하고 시트에 붙여 넣었습니다.",
        built: "경쟁사 5개 브랜드, 키워드 9개의 PC · 모바일 광고를 자동으로 캡처해 구글시트에 주차별로 쌓습니다. 이미지를 비교해서 '몇 주차와 같은 소재'인지도 표시합니다.",
        effect: "**명령어 한 줄**로 캡처부터 업로드까지 끝납니다. 몇 주 쉬었다가 다시 나온 소재도 잡아냅니다."
      }
    ]
  },
  contact: { email: "sooyeon991213@gmail.com" }
};
