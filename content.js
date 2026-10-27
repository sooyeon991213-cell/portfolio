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
    name: "석수연 · 퍼포먼스 마케터",
    title: ["상담신청 단가 **80%** 절감", "광고비 **32억** 운영"],
    intro: "와이즈버즈에서 4개 광고주, 광고비 약 32억 원을 운영했습니다.\n모든 캠페인을 PM으로 맡아 미디어믹스부터 매체 운영, 리포트까지 담당했습니다.\n매체·소재별 성과를 분석해 예산 비중을 조정하며 운영을 안정화했습니다.\nLX하우시스에서는 반복 업무를 Python과 Claude Code로 직접 자동화했습니다.",
    // 업종마다 대표 성과 하나씩 · tag: 업종, project: 그 프로젝트 브랜드 색으로 점을 칠함
    stats: [
      { tag: "인테리어", project: "lxhausys", value: "+177%", label: "LX하우시스 지인페스타 상담신청 · 전년 하반기 대비" },
      { tag: "여행 결제 앱", project: "travelwallet", value: "-80.9%", label: "트래블월렛 게시글당 비용 · 소재 A/B 테스트" },
      { tag: "식품 · 국내", project: "sobaba", value: "+6.3%p", label: "CJ제일제당 소바바 비보조 인지도 · APAC 벤치마크의 약 4배" },
      { tag: "식품 · 글로벌", project: "jinramen", value: "224%", label: "오뚜기 진라면 인도네시아 TikTok 도달 KPI 달성" }
    ]
  },
  about: {
    copy: "와이즈버즈에서 대리로 LX하우시스, 트래블월렛, CJ제일제당, 오뚜기 캠페인을 PM으로 운영했습니다.\n인테리어 상담신청, 앱 참여, 식품 브랜딩까지 KPI가 다른 캠페인을 함께 맡았습니다.\n\n데이위즈(구 엔포니)에서는 한 패션 쇼핑몰의 장바구니 → 결제 이탈률이 경쟁사보다 높은 원인을 GA4로 분석했습니다.\n아이폰으로 구매 과정을 직접 점검해 iOS에서 앱 혜택과 첫 구매 할인이 빠지는 오류를 발견했습니다.\n오류를 바로잡은 뒤 이탈률이 **36%에서 20%**로 내려갔습니다.\n\n와이즈버즈 대리 (2025.07 – 현재) · 총 경력 2021.08 – 현재",
    badge: "",
    capabilities: [
      "앱 퍼포먼스: Meta · Google · Naver GFA · Apple Search Ads · TikTok",
      "이커머스·자사몰 그로스: GA4 퍼널 분석 · Cafe24 · 메이크샵 · 스마트스토어",
      "A/B 테스트: 소재 수 · 실사 vs AI 소재 · 매체별 소재 테스트 구조",
      "CRM: 세그먼트별 앱 푸시 설계",
      "글로벌 캠페인: 멕시코 · 인도네시아 · TOEIC Speaking AL",
      "소재 기획: 숏폼 브랜드필름 · 스틸컷 · AI 생성 소재",
      "측정 설계: GA4 · 에어브릿지 · SKAN 4.0 · Brand Lift Study",
      "AI 업무 자동화: Python · Claude Code"
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
      name: "LX하우시스 지인페스타 · 취향의발견 캠페인",
      period: "2026.01 — 현재",
      highlight: { value: "+177%", label: "하반기 지인페스타 상담신청 · 전년 하반기 대비" },
      role: "실무 PM · 운영 · 자동화 개발",
      goal: "상 · 하반기 지인페스타와 취향의발견(큰손 노희영)으로 인테리어 상담신청 늘리기 · 세 캠페인 광고비 합계 7.32억",
      facts: [
        { label: "업종", value: "인테리어 · 건자재" },
        { label: "기여도", value: "80%", bar: 80 },
        { label: "광고비", value: "상반기 지인페스타 3.86억 · 하반기 지인페스타 1.65억 · 취향의발견 1.81억 (9월) / 2026년 1~9월 전체 19.3억", wide: true },
        { label: "최적화 기준", value: "GA 데이터 기준 · 유입 캠페인은 세션 수 최대화, 전환 캠페인은 전환 수 최대화", wide: true },
        { label: "매체", value: "검색: 네이버 파워링크 · 브랜드검색 · 플레이스, Google SA / 디스플레이: Meta · Google Demand Gen · PMax · 네이버 GFA · 카카오 비즈보드 · TikTok · DV360 · 당근", wide: true }
      ],
      work: [
        "**상반기 지인페스타 (3/4~4/5)** 전년 대비 예산 3~4배, 전환 캠페인 비중 76%. 소재 제작 92개 → 231개, 런칭 초기 효율이 낮던 Demand Gen은 2주 만에 종료",
        "**하반기 지인페스타 (8/29~10/5)** 트래픽 : 전환 31 : 69 → 55 : 45. 상반기에 효율이 확인된 매체로 좁히고 PMax는 상반기 캠페인을 이어 운영. TikTok 신규 투입 후 지면 분리",
        "**하반기 소재 테스트** 벽지 소재를 이미지에서 영상으로 바꿔 Meta 상담신청 3건 → 61건. USP 3종 vs 헤리티지 3종은 51건 : 2건, 헤리티지 OFF",
        "**취향의발견 · 큰손 노희영 (9월)** 10일간 트래픽 단독으로 인지도 확보 → 노희영 소재 투입과 함께 전환 캠페인 오픈 (트래픽 63 : 전환 37)",
        "**취향의발견 소재 대응** 부정 댓글로 <런드리룸> OFF 뒤 세션 단가 4배 이상 상승. '광고 게재 집중'으로 리타겟 · 유사 타겟 비중 4.8% → 38.4%, 세션 절반 확보"
      ],
      metrics: [
        { value: "-71%", label: "상반기 지인페스타 유입 세션 단가 · 전년 지인페스타 대비" },
        { value: "-57%", label: "하반기 지인페스타 전환 CPA · 상반기 대비, 광고비 56% 줄이고 세션 +39%" },
        { value: "+177%", label: "하반기 지인페스타 상담신청 · 전년 하반기 대비, 전환 CPA -80%" },
        { value: "-21%", label: "취향의발견 트래픽 세션 단가 · 노희영 소재 투입 후, 9월 상담신청 75건" }
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
        "상반기에는 티징 기간 CPA가 가장 낮고 기간이 지날수록 CPA가 올라서, 런칭 초기 예산 집중과 티징 정규화를 제안했습니다. 하반기 티징은 전환 예산을 68% 줄였는데 상담신청은 92건 → 115건이었습니다.",
        "세션 단가만 보면 TikTok 애드네트워크가 가장 쌌지만 평균 참여시간이 0.9초였습니다. 단가가 아니라 **참여시간 기준**으로 매체를 다시 골랐습니다."
      ]
    },
    {
      id: "travelwallet",
      type: "퍼포먼스",
      brand: "트래블월렛",
      color: ["#1D6FE8", "#7AB0FF"],
      company: "와이즈버즈",
      name: "트래블월렛 소셜 부스팅 캠페인",
      period: "2025.07 — 2025.10",
      highlight: { value: "-80.9%", label: "게시글당 비용(CPA) · 스틸컷 vs AI 인물" },
      role: "미디어믹스 · 운영 · 소재 기획 · 월간 보고",
      goal: "앱에 새로 생긴 소셜(여행 동행) 기능, 게시글 하루 100건 만들기",
      facts: [
        { label: "업종", value: "여행 결제 앱" },
        { label: "광고비", value: "월 3.9억~6억 (7~9월 미디어믹스)" },
        { label: "기여도", value: "70%", bar: 70 },
        { label: "매체", value: "앱: Meta · Google · TikTok · Apple Search Ads / 네이버: GFA · 브랜드검색 / 그 외: Threads · 마이리얼트립 · 트리플 · 데이블 · 키로뷰(인천공항) / 테스트: X · 사람인 · 에브리타임", wide: true }
      ],
      work: [
        "**측정 재설계** iOS SKAN 4.0 전환값을 게시글 작성·소셜 탭 조회 중심으로 재매핑, 에어브릿지 소셜 이벤트 3개 신설\n→ 재참여 캠페인 소셜 조회당 비용 90.3% 절감",
        "**브랜드필름** 도시별 숏폼 4편(뉴욕·상하이·오사카·싱가포르) 기획, 숏폼 지면 집중 운영\n→ 광고 기여 게시글 69% 증가, 일 100건 목표 달성",
        "**스틸컷 소재** 브랜드필름 스틸컷 10종을 퍼포먼스 소재로 재활용, 잘 된 소재는 변형해 재투입\n→ AI 인물 소재 대비 게시글당 비용 80.9% 절감",
        "**타겟·매체** MMP 오디언스(소셜 조회·앱 설치 유사 타겟)로 전환, 데이블·X·사람인·에브리타임 테스트\n→ 피드 지면 소진 109% 확대에도 조회 단가 상승은 7%",
        "**운영 전반** 미디어믹스, 세팅, 광고주 커뮤니케이션, 월간 보고"
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
        "같은 브랜드필름인데 매체마다 반응한 에피소드가 달랐습니다. 인스타그램은 오사카, 틱톡은 상하이였고 둘 다 맛집과 가벼운 술자리 장면이었습니다.",
        "AI 인물 소재와 실사 스틸컷을 붙여 보니, 요즘 사진 트렌드는 스틸컷이 훨씬 잘 담았습니다. 게시글당 비용이 **80.9%** 낮았습니다."
      ]
    },
    {
      id: "blackfriday",
      type: "퍼포먼스",
      brand: "블랙업",
      color: ["#222222", "#E5E5E5"],
      company: "데이위즈 (구 엔포니)",
      name: "블랙업(BLACKUP) 블랙프라이데이 통합 프로모션",
      period: "2024.10 — 2024.11",
      highlight: { value: "767%", label: "Google ROAS · 자사 최고 매출" },
      role: "미디어믹스 설계 · 전 매체 운영",
      goal: "1년 중 가장 큰 행사에서 매출 최대화, 같은 시기 일본 오프라인 팝업 홍보",
      facts: [
        { label: "업종", value: "패션 이커머스 (에이블리 1위 브랜드)" },
        { label: "역할", value: "미디어믹스 설계, 전 매체 직접 운영" },
        { label: "기여도", value: "60–70%", bar: 65 },
        { label: "매체", value: "Meta · Google · 카카오 · 네이버 GFA · 타겟팅게이츠 · 앱 푸시", wide: true }
      ],
      work: [
        "**Meta** 전환 캠페인 비중을 유입 대비 9 : 1까지 확대, 미도달 타겟은 예약(도달·빈도) 캠페인으로 분리 운영\n→ Meta ROAS 525%",
        "**Google** PMax·영상·검색·Demand Gen 구성, Demand Gen은 신규 고객 확보에만 사용\n→ Google ROAS 767%, Demand Gen 새 사용자 비중 98%",
        "**CRM** '장바구니 이탈'·'구매 1회 고객' 등 세그먼트별 앱 푸시 타겟 제안, 앱 전용 혜택 공동 구성\n→ 앱 푸시 참여율 92%, 새 사용자율 64%",
        "**일본 팝업** 인스타그램 팔로워 캠페인으로 오프라인 팝업 홍보",
        "**블프 이후** 구매 고객은 재구매, 방문 고객은 첫 구매로 이어지게 리타겟 설계"
      ],
      metrics: [
        { value: "자사 최고", label: "블랙프라이데이 브랜드 매출" },
        { value: "767%", label: "Google ROAS · Demand Gen 새 사용자 비중 98%" },
        { value: "525%", label: "Meta ROAS" },
        { value: "92%", label: "CRM 앱 푸시 참여율 · 새 사용자율 64%" }
      ],
      charts: [
        {
          type: "bars",
          title: "블랙프라이데이 매체별 ROAS",
          unit: "%",
          items: [
            { label: "Google", value: 767 },
            { label: "Meta", value: 525 }
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
      name: "CJ제일제당 소바바 세계관 캠페인",
      period: "2026.07 — 2026.08",
      highlight: { value: "+6.3%p", label: "비보조 인지도 · APAC 벤치마크의 약 4배" },
      role: "7~8월 운영 전담 · Instagram · TVING",
      goal: "실사 · 애니 두 세계관 숏폼으로 도달과 조회 KPI를 채우고, 소바바치킨 인지도 올리기",
      facts: [
        { label: "업종", value: "식품 · CJ제일제당 소바바치킨" },
        { label: "광고비", value: "캠페인 전체 7.1억 (67일)" },
        { label: "역할", value: "6월 런칭은 선임, 7~8월 운영 · 리포트 전담" },
        { label: "기여도", value: "50%", bar: 50 },
        { label: "매체", value: "직접 운영: Instagram (Shorts · 피드 · 트래픽), TVING (KBO 노출 보장 패키지 · CTV 프리롤) / 런칭 주간: YouTube VVC", wide: true }
      ],
      work: [
        "**운영 전담** 7~8월 Instagram·TVING 매체 운영과 데일리 리포트\n→ Instagram 비보조 인지도 +6.3%p, 광고 회상도 +8.2%p",
        "**소재 로테이션** 일자별 성과를 보고 저효율 숏폼은 끄고 신규 소재 투입 (캠페인 전체 36종 투입·18종 중단, 동시 8~18종 유지)\n→ IG Shorts CPV 44.2% 절감, VTR 48.5% → 56.2% (첫 주 → 마지막 주)",
        "**효율 최적화 구간 (7/18~8/17)** 3단 Wave 중 마지막 구간 운영\n→ 캠페인 중 CPV·CPM 최저",
        "**TVING** 7월 노출 보장 패키지로 단가를 낮추며 물량 유지, 무상 물량까지 확보\n→ 실집행 계약 대비 153%"
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
        "Instagram은 실사 소재가 CPV · VTR이 조금 더 좋았는데, 소진은 애니 소재에 더 몰렸습니다 (실사 43% : 애니 57%).",
        "피드는 완주율이 릴스의 1.8배였고, 공유는 91%가 릴스에서 나왔습니다. 완주는 피드, 확산은 릴스가 맡은 셈입니다."
      ]
    },
    {
      id: "jinramen",
      type: "브랜딩",
      brand: "오뚜기 진라면",
      color: ["#D9480F", "#FF9A5C"],
      company: "와이즈버즈",
      name: "오뚜기 진라면 글로벌 [Jinjja Love] 캠페인",
      period: "2025.12 — 2026.01",
      highlight: { value: "224%", label: "인도네시아 TikTok 도달 KPI" },
      role: "인도네시아 전담 · 멕시코 서포트",
      goal: "5개국 글로벌 캠페인 중 인도네시아 전담: 18–34세 도달, 영상 조회, 구매 전환까지",
      facts: [
        { label: "업종", value: "식품 · 글로벌 브랜딩" },
        { label: "광고비", value: "인도네시아 약 1억 원" },
        { label: "역할", value: "인도네시아 전담, 멕시코 서포트" },
        { label: "기여도", value: "60%", bar: 60 },
        { label: "매체", value: "Meta · TikTok (도달 · 영상 조회 · 장바구니 · 구매 최적화 캠페인)", wide: true }
      ],
      work: [
        "**캠페인 구조** 인도네시아 Reach : View : Conversion = 56 : 24 : 20, 전환 단계까지 커버\n→ TikTok 도달 KPI 224%, 2초 조회 KPI 219%",
        "**도달 최적화** 빈도 하루 1회 제한, 캠페인 조회자 제외, 운영 중 지역 타겟팅 해제로 신규 도달 확대\n→ 타겟 도달 90%, 목표 40%를 2주차에 달성",
        "**소재 테스트** Meta는 소재마다 개별 예산, TikTok은 8개 이하로 묶어 운영, 구매전환은 가격 강조·모델 강조 두 템플릿\n→ 구매전환 베스트 소재는 가격 강조 템플릿",
        "**분석·보고** 영상 길이별 이탈 곡선, 인플루언서별 반응 분석, 중간·최종 보고와 국가별 Brand Lift Study 취합\n→ 인도네시아 비보조 인지도 +4.3%p (APAC 벤치마크의 약 3배)",
        "**멕시코 서포트** Reach : View 65 : 35 구조 운영 서포트\n→ 진 소재 참여율 13.55%, 5개국 중 최고"
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
        "인도네시아는 테스트 없이 소재를 한 번에 넣었다가, 효율 낮은 소재 몇 개 때문에 첫 주 성과가 흔들렸습니다. 그래서 1주차에는 소재를 더 짧은 주기로 나눠 넣자고 제안했습니다.",
        "소리를 켜든 끄든 바로 이해되는 인플루언서 영상 **하나가** 인도네시아 인플루언서 Reach 캠페인 도달의 **44%**를 만들었습니다."
      ]
    }
  ],
  career: [
    {
      company: "와이즈버즈",
      period: "2025.07 — 현재",
      detail: "디지털 광고대행사 · 대리 · 4개 광고주 캠페인 PM (LX하우시스, 트래블월렛, CJ제일제당 소바바, 오뚜기 진라면)",
      numbers: [
        { value: "32억", label: "운영 광고비 · LX하우시스 19.3억, 트래블월렛 8.35억, 소바바 3.73억, 오뚜기 1.0억" },
        { value: "-80%", label: "LX하우시스 지인페스타 전환 CPA · 전년 하반기 대비" },
        { value: "-80.9%", label: "트래블월렛 게시글당 비용 · 소재 A/B 테스트" }
      ]
    },
    {
      company: "엔포니 → 데이위즈",
      period: "2022.07 — 2024.12",
      detail: "SMB 위주 광고대행사 · 창립 멤버 · 마케팅팀 매니저 · 2024년 크리마 자회사로 편입되며 이름이 바뀐 같은 회사 · 월 4억 원 규모, 8개 업체, 10개 매체 동시 운영",
      numbers: [
        { value: "500%+", label: "평균 ROAS · GA4 기반 5개 업체 구글 광고" },
        { value: "36% → 20%", label: "장바구니 → 결제 이탈률 · iOS 혜택 누락 오류를 찾아 개선" },
        { value: "+30%", label: "T사 쇼핑몰 2030 회원가입률 (6개월 평균, ROAS 1.2배)" },
        { value: "+50%↑", label: "V사 쇼핑몰 객단가 · 시간대별 예산 운영, '셋업' 카테고리 신설" },
        { value: "770%", label: "네이버 파워링크 ROAS (평균 노출순위 2.71위)" }
      ]
    },
    {
      company: "애드인텔리전스",
      period: "2021.08 — 2022.07",
      detail: "광고 솔루션사 BIZ팀 매니저",
      numbers: [
        { value: "90%+", label: "스마트스토어 판매 중 광고로 들어온 비중 · 배송·컴플레인 프로세스 정립" },
        { value: "ADVisor", label: "광고 분석 솔루션 대시보드 기획 · 1차 와이어프레임에 반영, 매뉴얼은 전사 가이드로 쓰임" }
      ]
    }
  ],
  automation: {
    summary: "LX하우시스를 담당하며 반복 업무를 Python과 Claude Code로 직접 자동화했습니다.",
    tools: [
      {
        name: "통합 성과 대시보드 · 월간 리포트 자동화",
        stack: "Python · Chart.js · Google Sheets API",
        image: "./assets/lx-dashboard.jpg",
        caption: "광고주 데이터 보호를 위해 수치 블러 처리",
        problem: "매일 데일리 리포트를 만들어 보내고, 월말에는 리포트와 차트를 손으로 만들었습니다.",
        built: "DA, SA, 키워드, 소재, 미디어믹스를 한 화면에서 보는 대시보드. 원본 파일 5개를 넣으면 엑셀 리포트(11개 시트)와 HTML 대시보드가 같이 나옵니다.",
        effect: "데일리 리포트 수작업 **0건**, 월간 리포트 **3분**. CPC 50%↑ · CTR 30%↓ · 비용 80%↑ 같은 이상치와 예산 소진 속도는 자동으로 경고가 뜹니다."
      },
      {
        name: "네이버 광고 모니터링 자동화",
        stack: "Playwright · Google Sheets API",
        image: "./assets/naver-monitoring.jpg",
        caption: "경쟁사 광고를 주차별로 쌓고, 같은 소재는 자동으로 표시",
        problem: "매주 경쟁사 키워드를 하나씩 검색해서 광고를 캡처하고 시트에 붙여 넣었습니다.",
        built: "경쟁사 5개 브랜드, 키워드 9개의 PC · 모바일 광고를 자동으로 캡처해 구글시트에 주차별로 쌓습니다. 이미지를 비교해서 '몇 주차와 같은 소재'인지도 표시합니다.",
        effect: "**명령어 한 줄**로 캡처부터 업로드까지 끝납니다. 몇 주 쉬었다가 다시 나온 소재도 잡아냅니다."
      },
      {
        name: "AI 일일 리포트 파이프라인",
        stack: "Claude Code · 서브에이전트",
        steps: ["/daily-all", "사전 점검", "생성", "검증", "리포트 3종"],
        problem: "SA, AdCode SA, DA 리포트 3종을 매일 따로 만들고 숫자를 하나씩 검수했습니다.",
        built: "Claude Code 명령 하나로 리포트 3종을 순서대로 만듭니다. 점검, 생성, 검증은 서브에이전트가 나눠 맡습니다.",
        effect: "만들고 검수하는 일이 **한 번에** 끝납니다."
      }
    ]
  },
  contact: { email: "sooyeon991213@gmail.com" }
};
