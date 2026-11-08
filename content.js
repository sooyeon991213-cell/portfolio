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
    intro: "광고대행사에서 5년간 이커머스·앱·리드젠·브랜딩 캠페인을 운영하며 누적 약 62억 원의 광고비를 집행했습니다.",
    // 제목 아래: 회사별로 묶은 업종별 캠페인 표 (5년 흐름 + 캠페인 KPI + 광고비). 2026-11-08 수연이가 정리해 준 KPI 기준
    storyLabel: "업종별 캠페인",
    campaignNote: "",
    campaigns: [
      {
        company: "와이즈버즈", period: "2025.07 – 현재", role: "대리, 캠페인 PM",
        rows: [
          { industry: "인테리어", project: "lxhausys", brand: "LX하우시스", kpi: "상담신청 DB·세션", how: "SA·DA 12개 매체, 지인페스타·취향의발견", budget: "19.3억" },
          { industry: "여행 결제 앱", project: "travelwallet", brand: "트래블월렛", kpi: "여행 게시글 조회·작성", how: "브랜드필름 촬영, 8월 집중 운영, 신규 매체 테스트", budget: "8.35억" },
          { industry: "식품", project: "sobaba", brand: "CJ제일제당 소바바", kpi: "조회수", how: "실사·애니 두 세계관 숏폼, Instagram·TVING", budget: "3.73억" },
          { industry: "식품·글로벌", project: "jinramen", brand: "오뚜기 진라면", kpi: "도달·조회", how: "인도네시아·멕시코, 현지 인플루언서·진 모델 소재", budget: "약 1억" },
          { industry: "업무 자동화", brand: "LX하우시스 담당", kpi: "리포트·모니터링", how: "SA·DA 데일리 리포트, 리포트 대시보드, 네이버 경쟁사 모니터링 직접 개발", budget: "" }
        ]
      },
      {
        company: "데이위즈", formerly: "구 엔포니", period: "2022.07 – 2024.12", role: "마케팅팀 매니저",
        rows: [
          { industry: "여성 패션 쇼핑몰", project: "blackfriday", brand: "블랙업, 슬로우앤드, 더무드 등 SMB 8곳", kpi: "ROAS·매출", how: "구글, 메타, 네이버, 매출 대비 예산 설계, 호스팅사(Cafe24·메이크샵) 데이터 분석", budget: "약 30억" }
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
    // 핵심 역량 카드 4개 (11/08 수연이: 리포팅 자동화를 퍼널 분석 앞으로) · proofs는 회사가 다른 근거를 섞어서
    competencies: [
      {
        title: "SA·DA 운영·최적화",
        items: [
          { did: "LX하우시스 지인페스타 트래픽과 전환 예산 비중 재설계", result: "전환 CPA -80%" },
          { did: "네이버 확장검색, 구글 Non-Brand 입찰전략 테스트", result: "상담신청 +108.6%" },
          { did: "SMB 쇼핑몰 8곳 구글·메타 운영, 매출 대비 광고비로 예산 설계", result: "합산 ROAS 약 600%" }
        ]
      },
      {
        title: "리포팅 자동화·AI 활용",
        items: [
          { did: "매체 RAW 수집부터 리포트·대시보드 반영까지 자동화", result: "1~2시간 → 약 10분" },
          { did: "리포트 대시보드화, 월간 리포트 자동 생성", result: "월간 리포트 3분" },
          { did: "네이버 경쟁사 검색광고 주차별 자동 수집", result: "5개 브랜드, 키워드 9개" }
        ]
      },
      {
        title: "퍼널 분석·측정 고도화",
        items: [
          { did: "트래블월렛 에어브릿지 이벤트와 iOS SKAN 전환값 기준 기획", result: "조회당 비용 -90.3%" },
          { did: "LX하우시스 GA 기준 세션 수·전환 수 최대화로 운영", result: "" },
          { did: "GA4 장바구니→결제 이탈 분석 중 iOS 결제 오류 발견", result: "이탈률 36 → 20%" }
        ]
      },
      {
        title: "크리에이티브 기획",
        items: [
          { did: "트래블월렛 브랜드필름 스틸컷 vs AI 인물 소재 테스트", result: "게시글당 비용 -80.9%" },
          { did: "LX하우시스 벽지 소재를 이미지에서 영상으로 전환", result: "상담신청 3 → 61건" },
          { did: "소바바 실사와 애니 숏폼 일자별 로테이션", result: "CPV -44.2%" }
        ]
      }
    ],
    // 카드 아래 도구 칩 (앞의 '이름:'은 굵게 보임)
    capabilities: [
      "매체: Meta, Google Ads, 네이버 SA/GFA, 카카오, TikTok, DV360, Apple Search Ads, 당근",
      "측정: GA4, 에어브릿지, SKAN 4.0, Brand Lift Study",
      "커머스: Cafe24, 메이크샵, 스마트스토어",
      "자동화: Python, Claude Code, Playwright, Google Sheets API",
      "글로벌: 멕시코·인도네시아 캠페인"
    ]
  },
  // 2026-11-08 프로젝트 구조: 제목 = 광고주, 소제목 = 캠페인. 케이스는 KPI → Approach → Results.
  //   results[].ref = 그 결과를 만든 approach 번호(1부터). media = 매체 이름만, kpis = KPI만.
  //   순서: LX → 트래블월렛 → 오뚜기 → 소바바 → 블랙업 (수연이 지정). images는 설명 없이.
  projectGroups: null,
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
      highlight: { value: "-80%", label: "지인페스타 전환 CPA, 전년 하반기 대비" },
      headline: "상시·시즌 캠페인 재편과 SA 구조 정리로 상담신청 효율 개선",
      hashtags: ["풀퍼널 운영", "시즌 캠페인", "SA 구조 개선"],
      diagram: { type: "split", title: "지인페스타 트래픽 : 전환 예산 비중", note: "상반기 결과를 분석해 하반기 재편", rows: [
        { label: "상반기", parts: [{ name: "트래픽", value: 31 }, { name: "전환", value: 69 }] },
        { label: "하반기", parts: [{ name: "트래픽", value: 55 }, { name: "전환", value: 45 }] }
      ] },
      goal: "인테리어 업체를 고르는 긴 탐색 과정(정보 탐색 → 업체 비교 → 상담신청)에서 LX하우시스를 상담 고려 업체로 올리고, 상담신청 DB로 연결",
      kpis: ["상담신청 DB", "GA 세션", "상담신청 CPA"],
      media: ["네이버 파워링크", "네이버 브랜드검색", "네이버 플레이스", "Google SA", "Meta", "Google Demand Gen", "Google PMax", "네이버 GFA", "카카오", "TikTok", "DV360", "당근"],
      approach: [
        { t: "BAU 상시 운영", d: "트래픽은 시공사례 소재로 세션을 확보하고, 전환은 상담신청 이벤트 소재로 상시 운영 (GA 기준 세션 수·전환 수 최대화)" },
        { t: "D2C 직계약 캠페인", d: "본사 직계약(창호·주방) 캠페인을 따로 편성하고, 매체별 참여시간을 보고 예산 조정" },
        { t: "성수기 지인페스타", d: "3~4월·9~10월 티징 → 본 캠페인 → 리드젠으로 운영, 상반기 결과를 분석해 하반기 트래픽 : 전환을 31 : 69 → 55 : 45로 재편" },
        { t: "취향의발견", d: "하반기 인플루언서 큰손 노희영 소재로 사전 인지 → 전환 캠페인 순서로 운영" },
        { t: "SA 구조·입찰", d: "파워링크는 PC·MO와 검색 의도별(제품·브랜드·시공·지역·쇼룸·이벤트) 캠페인, 구글 SA는 Brand·Non-Brand로 분리. 전환 키워드 기준 데일리 입찰 조정, 확장검색으로 신규 키워드 발굴, 비효율 키워드 하향·OFF" },
        { t: "고단가 Only 캠페인 정리", d: "네이버 SA 예산 12%를 쓰고 상담 기여는 4.2%였던 샷시·창호·벽지 등 고단가 키워드 캠페인 OFF" }
      ],
      results: [
        { value: "-80%", label: "하반기 지인페스타 전환 CPA, 전년 하반기 대비 (상담신청 163 → 452건)", ref: 3, key: "지인페스타 전환 CPA" },
        { value: "258%", label: "BAU 상담신청 목표 달성률 (8월), 6~9월 4개월 연속 초과", ref: 1, key: "BAU 상담신청 목표 달성" },
        { value: "-38%", label: "하반기 리드젠 리드 CPA, 역대 지인페스타 최저", ref: 3 },
        { value: "-21%", label: "취향의발견 트래픽 세션 단가, 노희영 소재 투입 후", ref: 4 },
        { value: "-37%", label: "네이버 SA CPC, Only 캠페인 OFF 후 (CPA 18만 → 10만 원대)", ref: 6 },
        { value: "-42.7%", label: "SA 상담신청 CPA, 1월 → 9월 (비용 -44%에도 상담신청 유지)", ref: 5, key: "SA 상담신청 CPA" }
      ],
      charts: [
        {
          type: "columns",
          title: "지인페스타 회차별 전환 CPA",
          note: "25년 하반기(담당 전) = 100, 낮을수록 좋음",
          items: [
            { label: "25년 하반기", value: 100 },
            { label: "26년 상반기", value: 47.6 },
            { label: "26년 하반기", value: 20.3 }
          ]
        },
        {
          type: "bars",
          title: "세션 단가",
          note: "바꾸기 전 = 100, 짧을수록 좋음",
          target: 100,
          items: [
            { label: "DV360, 지인페스타 상반기 → 하반기", value: 24.6 },
            { label: "상반기 지인페스타 유입, 전년 대비", value: 29.3 },
            { label: "지인페스타 전체, 상반기 → 하반기", value: 31.3 },
            { label: "지인페스타 트래픽, 상반기 → 하반기", value: 47 },
            { label: "취향의발견 트래픽, 노희영 소재 투입 후", value: 78.9 }
          ]
        }
      ],
      images: [
        { src: "./assets/lx-spring-kv.jpg", alt: "상반기 지인페스타 키비주얼" },
        { src: "./assets/lx-top-keyvisual.jpg", alt: "하반기 지인페스타 키비주얼" },
        { src: "./assets/lx-top-diamant.jpg", alt: "디아망 포티스 후기형 영상" },
        { src: "./assets/lx-top-kvmotion.jpg", alt: "하반기 키비주얼 모션그래픽" },
        { src: "./assets/lx-top-noh.jpg", alt: "취향의발견 큰손 노희영 주방 편" }
      ],
      insight: [
        "세션 단가만 보면 TikTok 애드네트워크가 가장 쌌지만 평균 참여시간이 0.9초였습니다. 단가가 아니라 **참여시간 기준**으로 매체를 다시 골랐습니다."
      ]
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
      headline: "Attribution 신규 이벤트 설계·최적화와 브랜드필름 소재로 게시글 작성 비용 절감",
      hashtags: ["퍼널 재설계", "이벤트 기반 최적화", "브랜드필름"],
      diagram: { type: "funnel", title: "이벤트 신규 설계", note: "최종 액션과 연결된 Upper·Mid 퍼널 신규 이벤트 설치", stages: [
        { name: "Upper Funnel", before: ["소셜 탭 조회"], after: [{ name: "소셜 탭 조회", isNew: true }, { name: "소셜 게시글 조회", isNew: true }] },
        { name: "Mid Funnel", before: ["소셜 게시글 내 댓글 작성", "소셜 게시글 내 대댓글 작성"], after: [{ name: "소셜 게시글 내 댓글 작성" }, { name: "소셜 게시글 내 대댓글 작성" }, { name: "소셜 게시글 참여 버튼 클릭", isNew: true }] },
        { name: "Low Funnel", before: ["소셜 게시글 작성"], after: [{ name: "소셜 게시글 작성" }] }
      ] },
      goal: "최종 액션인 [소셜 게시글 작성] 이벤트당 비용을 낮추고 캠페인 효율 개선, 여행 게시글 하루 100건",
      kpis: ["여행 게시글 작성", "소셜 조회", "게시글당 비용"],
      media: ["Meta", "Google", "TikTok", "Apple Search Ads", "네이버 GFA", "네이버 브랜드검색", "Threads", "데이블", "X", "마이리얼트립", "트리플", "키로뷰"],
      approach: [
        { t: "초기 론칭", d: "쓸 수 있는 이미지가 없어 생성형 AI로 여행지·동행 유형별 인물 소재를 만들고, 게시글 작성 최적화 중심으로 운영" },
        { t: "측정 설계", d: "[소셜 게시글 작성] 하나로만 최적화하니 전환 수가 적어 CAC 변동이 크고, 중간 퍼널 이벤트가 없어 흐름 분석이 어려웠음 → Upper·Mid 퍼널 신규 이벤트(소셜 탭·게시글 조회, 참여 버튼 클릭)와 iOS SKAN 4.0 전환값 기준을 기획해 개발 요청" },
        { t: "이벤트별 최적화", d: "캠페인 목적에 맞춰 신규 이벤트별 최적화 전략을 나눠 운영 (In-App Action / App Retargeting)" },
        { t: "브랜드필름", d: "뉴욕·상하이·오사카·싱가포르 숏폼 4편 촬영·8월 집중 운영, 스틸컷은 퍼포먼스 소재로 재활용" },
        { t: "신규 매체 발굴", d: "데이블, X, 사람인, 에브리타임 테스트 → 마이리얼트립, 트리플, 키로뷰(인천공항), Threads까지 14개 매체 운영" }
      ],
      results: [
        { value: "-54%", label: "Meta In-App Action 캠페인 게시글 작성당 비용", ref: 3, key: "In-App Action 게시글 작성당 비용" },
        { value: "-72%", label: "Meta App Retargeting 캠페인 게시글 작성당 비용", ref: 3, key: "App Retargeting 게시글 작성당 비용" },
        { value: "7배", label: "소셜 조회, 같은 타겟·소진에서 게시글 작성 최적화 대비 (게시글 3배)", ref: 2 },
        { value: "+69%", label: "광고 기여 게시글, 브랜드필름 투입 후 (일 100건 목표 달성)", ref: 4 },
        { value: "-80.9%", label: "게시글당 비용, AI 인물 → 브랜드필름 스틸컷 소재", ref: 4, key: "스틸컷 소재 게시글당 비용" }
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
          note: "바꾸기 전 = 100, 짧을수록 좋음",
          legend: ["바꾸기 전", "바꾼 후"],
          items: [
            { label: "게시글당 비용, AI 인물 → 스틸컷", before: 100, after: 19.1 },
            { label: "소셜 조회당 비용, 이벤트 재설계", before: 100, after: 9.7 },
            { label: "게시글당 비용, 이벤트 재설계", before: 100, after: 27.4 }
          ]
        }
      ],
      images: [
        { src: "./assets/travelwallet-still.jpg", alt: "브랜드필름 항공샷" },
        { src: "./assets/tw-ad-osaka.jpg", alt: "오사카 편 스틸컷" },
        { src: "./assets/tw-ad-shanghai.jpg", alt: "상하이 편 영상" }
      ],
      insight: [
        "같은 브랜드필름인데 인스타그램은 오사카, 틱톡은 상하이 편 반응이 가장 좋았습니다. 둘 다 맛집과 가벼운 술자리 장면이었습니다."
      ]
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
      headline: "국가별 캠페인 구조와 도달 최적화로 인도네시아 도달 KPI 2배 이상 달성",
      hashtags: ["글로벌 캠페인", "도달 최적화", "브랜드 리프트"],
      diagram: { type: "split", title: "국가별 캠페인 구조", note: "예산 비중 (%)", rows: [
        { label: "인도네시아", parts: [{ name: "Reach", value: 56 }, { name: "View", value: 24 }, { name: "Conversion", value: 20 }] },
        { label: "멕시코", parts: [{ name: "Reach", value: 65 }, { name: "View", value: 35 }] }
      ] },
      goal: "[Jinjja Love] 5개국 캠페인 중 인도네시아 전담·멕시코 서포트. 18–34세 도달과 영상 조회로 진라면 인지도 확보",
      kpis: ["도달", "영상 조회", "브랜드 리프트"],
      media: ["Meta", "TikTok"],
      approach: [
        { t: "국가별 캠페인 구조", d: "인도네시아는 Reach : View : Conversion = 56 : 24 : 20, 멕시코는 Reach : View = 65 : 35로 편성" },
        { t: "도달 최적화", d: "빈도 하루 1회 제한, 캠페인 조회자 제외, 운영 중 지역 타겟 해제로 신규 도달 확대" },
        { t: "소재 운영", d: "현지 인플루언서 영상과 진 모델 소재를 함께 운영, Meta는 소재별 예산, TikTok은 8개 이하로 묶어 테스트" },
        { t: "성과 보고", d: "중간·최종 리포트 작성, 국가별 Brand Lift Study 결과 취합" }
      ],
      results: [
        { value: "224%", label: "인도네시아 TikTok 도달 KPI (2초 조회 KPI 219%)", ref: 2, key: "인도네시아 TikTok 도달 KPI" },
        { value: "90%", label: "인도네시아 타겟 도달, 목표 40%를 2주차에 넘김", ref: 2 },
        { value: "44%", label: "인플루언서 Reach 도달 중 영상 1개가 만든 비중", ref: 3 },
        { value: "+4.3%p", label: "인도네시아 비보조 인지도, APAC 벤치마크 1.4%p의 약 3배", ref: 4, key: "인도네시아 비보조 인지도" }
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
      images: [
        { src: "./assets/jinramen-indonesia.jpg", alt: "Jin Hero 6초" },
        { src: "./assets/jin-midnight.jpg", alt: "Jin Midnight" },
        { src: "./assets/jin-conv-a.jpg", alt: "가격 강조 템플릿" }
      ],
      insight: [
        "인도네시아는 테스트 없이 소재를 한 번에 넣었다가 첫 주 성과가 흔들려서, 1주차에는 소재를 더 짧은 주기로 나눠 넣자고 제안했습니다."
      ]
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
      headline: "9:16 숏폼 상시 로테이션으로 CPV를 낮추며 조회수 확보",
      hashtags: ["숏폼 로테이션", "CPV 최적화", "브랜드 리프트"],
      diagram: { type: "split", title: "3단 Wave 예산 배분과 구간 CPV", note: "캠페인 전체", rows: [
        { label: "예산", parts: [{ name: "런칭 · CPV 14.5원", value: 26 }, { name: "확산 · CPV 12.6원", value: 57 }, { name: "최적화 · CPV 8.2원", value: 17 }] }
      ] },
      goal: "실사·애니 두 세계관의 9:16 숏폼으로 조회수를 확보하고, 소바바치킨 인지도 높이기",
      kpis: ["조회수", "CPV", "브랜드 리프트"],
      media: ["Instagram", "TVING"],
      approach: [
        { t: "9:16 숏폼 중심 편성", d: "세로형 Shorts(스토리·릴스)에 Instagram 예산의 92%를 두고, 실사·애니 광고 세트를 나눠 운영" },
        { t: "숏폼 상시 로테이션", d: "일자별 CPV·VTR로 소재를 교체, 총 36종 투입·18종 중단, 동시 8~18종 유지" },
        { t: "승자 소재 집중", d: "애니 '얘들아 이거 나만 보여?'(Shorts 소진 25%)와 실사 '황민현 우산씬'(19%)이 한동안 Shorts를 이끌었고, 트래픽은 우산씬 1종에 90% 집중" },
        { t: "TVING 패키지 전환", d: "1주 집중 패키지로 런칭 물량을 확보한 뒤 7월 노출 보장 패키지로 바꿔 단가를 낮추고 물량 유지" }
      ],
      results: [
        { value: "-44.2%", label: "Instagram 숏폼 CPV, 첫 주 13원 → 마지막 주 7원 (VTR 48.5% → 56.2%)", ref: 2, key: "Instagram 숏폼 CPV" },
        { value: "12원", label: "Instagram 평균 CPV, 제안 14원 대비 -17%", ref: 1 },
        { value: "-52%", label: "트래픽 CPC, 승자 소재 집중 후 248원 → 119원", ref: 3 },
        { value: "-47%", label: "TVING CPV 24원 (제안 대비), VTR 93.8%", ref: 4, key: "TVING CPV" },
        { value: "+6.3%p", label: "Instagram 비보조 인지도, APAC 벤치마크 1.5%p의 약 4배", ref: 1, key: "비보조 인지도" }
      ],
      charts: [
        {
          type: "pairs",
          title: "Instagram 브랜드 리프트",
          note: "오른 폭, Meta BLS",
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
        { src: "./assets/sobaba-real-b2.jpg", alt: "실사 숏폼 '황민현 우산씬'", ratio: "9 / 16" },
        { src: "./assets/sobaba-c3.jpg", alt: "애니 숏폼 '얘들아 이거 나만 보여?'", ratio: "9 / 16" },
        { src: "./assets/sobaba-real-c2.jpg", alt: "실사 숏폼 '최애 황민현은?'", ratio: "9 / 16" },
        { src: "./assets/sobaba-kv.jpg", alt: "세계관 키비주얼 (애니)" }
      ],
      insight: [
        "피드는 완주율이 릴스의 1.8배였고, 공유는 91%가 릴스에서 나왔습니다. 완주는 피드, 확산은 릴스가 맡은 셈입니다."
      ]
    },
    {
      id: "blackfriday",
      brand: "블랙업",
      campaign: "블랙프라이데이 매출·신규 고객 캠페인",
      industry: "여성 패션 쇼핑몰",
      color: ["#222222", "#E5E5E5"],
      company: "데이위즈",
      period: "2024.10 — 2024.11",
      budget: "예산 8,800만 원",
      contribution: 65,
      contributionLabel: "60–70%",
      highlight: { value: "601%", label: "Google ROAS, 자사 최고 매출" },
      headline: "매출 기반 예산 설계와 매체별 역할 분리로 블랙프라이데이 자사 최고 매출",
      hashtags: ["예산 설계", "신규 고객", "블랙프라이데이"],
      diagram: { type: "split", title: "블프 예산 8,800만 원 배분", note: "예상 매출 11억 × 광고비 비중 8%", rows: [
        { label: "매체", parts: [{ name: "Meta", value: 50 }, { name: "Google", value: 25 }, { name: "네이버 검색", value: 9 }, { name: "네이버 GFA", value: 8 }, { name: "카카오", value: 5 }, { name: "기타", value: 3 }] }
      ] },
      goal: "1년 중 가장 큰 행사인 블랙프라이데이에 매출과 ROAS를 최대로 끌어올리고 신규 고객 확보",
      kpis: ["매출", "ROAS", "신규 고객"],
      media: ["Meta", "Google PMax", "Google Demand Gen", "Google SA", "네이버 GFA"],
      approach: [
        { t: "예산 설계", d: "전년 블프 매출 10.6억 기준 예상 매출 11억 × 광고비 비중 8%(평소 6%) = 8,800만 원, 매체별로 배분 (메타 50%, 구글 25% 등)" },
        { t: "사전 유입 → 리타겟", d: "블프 1주 전부터 유입을 모은 뒤 기간 중에는 리타겟, 이후엔 구매자 재구매·방문자 첫 구매 캠페인으로 분리" },
        { t: "Meta", d: "유입 : 전환을 9 : 1까지 전환 쪽으로 옮기고, 아직 도달하지 못한 타겟은 예약(도달·빈도) 캠페인으로 분리" },
        { t: "Google", d: "PMax·Demand Gen·검색으로 구성하고, Demand Gen은 신규 고객 전용으로 운영" }
      ],
      results: [
        { value: "자사 최고", label: "블랙프라이데이 브랜드 매출", ref: 1 },
        { value: "601%", label: "Google ROAS, 8일 광고비 약 1,270만 원 (Demand Gen 새 사용자 98%)", ref: 4, key: "Google ROAS" },
        { value: "528%", label: "Meta ROAS, 8일 광고비 약 3,600만 원", ref: 3, key: "Meta ROAS" }
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
      images: [
        { src: "./assets/blackup-meta.jpg", alt: "블랙프라이데이 Meta 소재", ratio: "1200 / 815", span: 2 },
        { src: "./assets/blackup-google.jpg", alt: "블랙프라이데이 Google 소재", ratio: "1200 / 765", span: 2 }
      ],
      insight: []
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
        { label: "LX하우시스 SA 구조 정리, 전환 키워드 기준 데일리 입찰, 고단가 Only 캠페인 OFF", value: "" },
        { label: "트래블월렛 소재 A/B 테스트·신규 매체 테스트", value: "" },
        { label: "SA·DA 데일리 리포트, 리포트 대시보드, 네이버 경쟁사 모니터링 직접 개발 (LX하우시스)", value: "" }
      ]
    },
    {
      company: "데이위즈",
      formerly: "구 엔포니",
      footnote: "*2024년 크리마 자회사로 편입되며 엔포니에서 이름이 바뀐 같은 회사",
      period: "2022.07 — 2024.12",
      detail: "광고대행사 마케팅팀 매니저. SMB 인터넷 여성 패션 쇼핑몰 8곳 담당, 10개 매체 운영.",
      numbers: [
        { label: "블랙업 블랙프라이데이 예산 설계, 6개 매체 운영", value: "" },
        { label: "SMB 쇼핑몰 8곳 구글·메타 운영 (2022.09 – 2024.11)", value: "" },
        { label: "비바루비 네이버 파워링크 운영", value: "" },
        { label: "T사 연령대별 가입·매출 분석 후 2030 캠페인 분리", value: "" },
        { label: "7개 쇼핑몰 신상 등록 수 × 매출 관계 분석, 광고·컨설팅 제안에 활용", value: "" },
        { label: "호스팅사 매출·방문 데이터 수집 자동화 (개발자와 빅쿼리 → 구글 시트)", value: "" },
        { label: "GA4 결제 이탈 분석 중 iOS 결제 오류 발견", value: "" }
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
