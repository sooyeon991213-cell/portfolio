/*
 * 사이트에 보이는 글과 숫자는 모두 이 파일에서 고친다.
 * 숫자와 사실은 ../01_포트폴리오_원고.md에 있는 것만 쓴다. 문장은 이 파일이 최종본이다.
 * **굵게** 로 감싸면 화면에서 강조된다.
 * 프로젝트 상세: goal(목표 한 줄) → facts(업종·매체·팀·기여도) → work(한 일, 개조식) → metrics(결과) → insight(돌아보면)
 */
window.PORTFOLIO = {
  hero: {
    name: "석수연",
    intro: "앱, 이커머스, 글로벌 광고를 5년째 운영하고 있는 퍼포먼스 마케터입니다.",
    stats: [
      { value: "월 4억", label: "데이위즈 시절 운영한 광고비 · 8개 광고주 동시 운영" },
      { value: "767%", label: "블랙업 블랙프라이데이 Google ROAS" },
      { value: "-80.9%", label: "트래블월렛 게시글당 비용 · 소재 A/B 테스트" },
      { value: "0건", label: "LX하우시스 데일리 리포트 수작업 · 직접 자동화" }
    ]
  },
  about: {
    copy: "광고대행사에서 앱, 이커머스, 글로벌 캠페인을 운영해 왔습니다. 데이위즈에서는 광고주 8곳의 광고비 **월 4억 원**을 맡았고, 지금은 와이즈버즈에서 LX하우시스 Z:IN을 실무 PM으로 맡고 있습니다.\n\n성과가 안 나오면 광고 밖도 봅니다. 한 쇼핑몰의 장바구니 이탈률이 경쟁사보다 높아서 아이폰으로 직접 결제를 해 봤더니, iOS에서 앱 혜택과 첫 구매 할인이 빠지고 있었습니다. 이 오류를 바로잡고 장바구니 → 결제 이탈률이 **36%에서 20%**로 내려갔습니다.\n\n와이즈버즈 (2025.07 – 현재) · 총 경력 2021.08 – 현재",
    badge: "Meta 웨비나 공식 사례 선정",
    capabilities: [
      "앱 퍼포먼스: Meta · Google · Naver GFA · Apple Search Ads · TikTok",
      "이커머스·자사몰 그로스: GA4 퍼널 분석 · Cafe24 · 메이크샵 · 스마트스토어",
      "A/B 테스트: Meta 웨비나 공식 사례",
      "CRM: 세그먼트별 앱 푸시 설계",
      "글로벌 캠페인: 멕시코 · 인도네시아 · TOEIC Speaking AL",
      "소재 기획: 숏폼 브랜드필름 · 스틸컷 · AI 생성 소재",
      "측정 설계: GA4 · 에어브릿지 · SKAN 4.0 · Brand Lift Study",
      "AI 업무 자동화: Python · Claude Code"
    ]
  },
  projects: [
    {
      id: "blackfriday",
      name: "블랙업(BLACKUP) 블랙프라이데이 통합 프로모션",
      period: "2024.10 — 2024.11",
      previousCompany: true,
      highlight: { value: "767%", label: "Google ROAS · 자사 최고 매출" },
      role: "미디어믹스 설계 · 전 매체 운영",
      goal: "1년 중 가장 큰 행사에서 매출 최대화, 같은 시기 일본 오프라인 팝업 홍보",
      facts: [
        { label: "업종", value: "패션 이커머스 (에이블리 1위 브랜드)" },
        { label: "매체", value: "Meta · Google · 카카오 · 네이버 GFA · 타겟팅게이츠 · 앱 푸시" },
        { label: "역할", value: "미디어믹스 설계, 전 매체 직접 운영" },
        { label: "기여도", value: "60–70%", bar: 65 }
      ],
      work: [
        "Meta 전환 캠페인 비중을 유입 대비 **9 : 1**까지 확대",
        "아직 도달하지 못한 타겟은 예약(도달·빈도) 캠페인으로 따로 운영",
        "일본 팝업 홍보용 인스타그램 팔로워 캠페인 운영",
        "Google은 PMax, 영상, 검색, Demand Gen으로 구성. Demand Gen은 신규 고객 확보에만 사용",
        "'장바구니 이탈', '구매 1회 고객' 등 세그먼트별 앱 푸시 타겟 제안, 앱 전용 혜택을 광고주와 함께 구성",
        "블프 이후 리타겟 설계: 구매 고객은 재구매로, 방문만 한 고객은 첫 구매로"
      ],
      metrics: [
        { value: "자사 최고", label: "블랙프라이데이 브랜드 매출" },
        { value: "525%", label: "Meta ROAS" },
        { value: "767%", label: "Google ROAS" },
        { value: "92%", label: "CRM 앱 푸시 참여율 · 새 사용자율 64%" },
        { value: "98%", label: "Google Demand Gen 새 사용자 비중" },
        { value: "+303명", label: "일본 팝업 캠페인, 하루 만에 늘어난 팔로워" }
      ],
      insight: [],
      image: "",
      imageCaption: ""
    },
    {
      id: "travelwallet",
      name: "트래블월렛 소셜 부스팅 캠페인",
      period: "2025.07 — 2025.10",
      previousCompany: false,
      highlight: { value: "-80.9%", label: "게시글당 비용(CPA)" },
      role: "미디어믹스 · 운영 · 소재 기획 · 월간 보고",
      goal: "앱에 새로 생긴 소셜(여행 동행) 기능, 게시글 하루 100건 만들기",
      facts: [
        { label: "업종", value: "여행 결제 앱" },
        { label: "매체", value: "Meta · Google · TikTok + 신규 매체 테스트" },
        { label: "팀", value: "3명 (팀장 · 본인 · 매니저)" },
        { label: "기여도", value: "70%", bar: 70 }
      ],
      work: [
        "iOS SKAN 4.0 전환값 다시 매핑: 게시글 작성과 소셜 탭 조회를 가장 높은 값으로",
        "에어브릿지 소셜 이벤트 3개 새로 설계 (탭 조회, 게시글 조회, 동행 참여)",
        "도시별 숏폼 브랜드필름 기획 (뉴욕 · 상하이 · 오사카 · 싱가포르), 숏폼 지면에 집중 운영",
        "브랜드필름 스틸컷 10종을 퍼포먼스 소재로 재활용. 두 번에 나눠 넣고, 잘 된 소재는 변형해서 다시 투입",
        "타겟을 MMP 오디언스(소셜 조회 · 앱 설치 유사 타겟)로 전환",
        "데이블, X, 사람인, 에브리타임 신규 매체 테스트",
        "미디어믹스, 세팅, 광고주 커뮤니케이션, 월간 보고까지 실무 담당"
      ],
      metrics: [
        { value: "+69%", label: "광고 기여 게시글 · 브랜드필름 투입 후 일 100건 목표 달성" },
        { value: "-80.9%", label: "게시글당 비용 · 스틸컷 vs AI 인물 소재 A/B 테스트" },
        { value: "-90.3%", label: "소셜 조회당 비용 · 이벤트 재설계 후 재참여 캠페인" },
        { value: "+113%", label: "게시글 수 · Meta 소재 운영 변경, CPA 상승은 7%에서 막음" }
      ],
      insight: [
        "같은 브랜드필름인데 매체마다 반응한 에피소드가 달랐습니다. 인스타그램은 오사카, 틱톡은 상하이였고 둘 다 맛집과 가벼운 술자리 장면이었습니다.",
        "인스타그램과 구글 모두 짧은 영상보다 **긴 영상**에서 소셜 액션이 더 많이 나왔습니다.",
        "AI 인물 소재와 실사 스틸컷을 붙여 보니, 요즘 사진 트렌드는 스틸컷이 훨씬 잘 담았습니다. 게시글당 비용이 **80.9%** 낮았습니다."
      ],
      image: "./assets/travelwallet-still.jpg",
      imageCaption: "브랜드필름 스틸컷 퍼포먼스 소재"
    },
    {
      id: "jinramen",
      name: "오뚜기 진라면 글로벌 [Jinjja Love] 캠페인",
      period: "2025.12 — 2026.01",
      previousCompany: false,
      highlight: { value: "224%", label: "인도네시아 TikTok 도달 KPI" },
      role: "인도네시아 전담 · 멕시코 서포트",
      goal: "5개국 글로벌 캠페인 중 인도네시아 전담: 18–34세 도달, 영상 조회, 구매 전환까지",
      facts: [
        { label: "업종", value: "식품 · 글로벌 브랜딩" },
        { label: "매체", value: "Meta · TikTok" },
        { label: "팀", value: "3명 (본부장 · 본인 · 대리)" },
        { label: "역할", value: "인도네시아 전담, 멕시코 서포트" }
      ],
      work: [
        "인도네시아 캠페인 구조 설계: Reach : View : Conversion = **56 : 24 : 20**, 전환 단계까지 커버",
        "멕시코 Reach : View 65 : 35 구조 운영 서포트",
        "빈도 하루 1회 제한, 캠페인 조회자 제외. 운영 중 지역 타겟팅을 풀어 신규 도달 확대",
        "매체별로 소재 테스트 방식 분리: Meta는 소재마다 개별 예산, TikTok은 8개 이하로 묶어 운영",
        "영상 길이별 이탈 곡선, 인플루언서 소재별 반응 분석",
        "중간 · 최종 성과보고서 작성, 국가별 Brand Lift Study 결과 취합"
      ],
      metrics: [
        { value: "224%", label: "인도네시아 TikTok 도달 KPI · 2초 조회 KPI 219%" },
        { value: "90%", label: "인도네시아 타겟 도달 · 목표 40%를 2주차에 넘김" },
        { value: "+4.3%p", label: "인도네시아 비보조 인지도 · APAC 벤치마크 1.4%p의 약 3배" },
        { value: "13.55%", label: "멕시코(서포트) 진 소재 참여율 · 5개국 중 최고" }
      ],
      insight: [
        "인도네시아는 테스트 없이 소재를 한 번에 넣었다가, 효율 낮은 소재 몇 개 때문에 첫 주 성과가 흔들렸습니다. 그래서 1주차에는 소재를 더 짧은 주기로 나눠 넣자고 제안했습니다.",
        "소리를 켜든 끄든 바로 이해되는 인플루언서 영상 **하나가** 인도네시아 인플루언서 Reach 캠페인 도달의 **44%**를 만들었습니다.",
        "멕시코에서는 컵라면을 보여 준 소재의 2초 VTR이 **61%**로 가장 높았습니다."
      ],
      image: "./assets/jinramen-indonesia.jpg",
      imageCaption: "인도네시아 집행 소재 · Jin Hero 6초 영상 장면"
    },
    {
      id: "lxhausys",
      name: "LX하우시스 Z:IN 퍼포먼스 운영과 자동화",
      period: "2026.01 — 현재",
      previousCompany: false,
      highlight: { value: "258%", label: "상담신청 목표 달성률 · 6~9월 연속 초과" },
      role: "실무 PM · 운영 · 자동화 개발",
      goal: "검색(SA)과 디스플레이(DA) 광고로 인테리어 상담신청 늘리기",
      facts: [
        { label: "업종", value: "인테리어 · 건자재" },
        { label: "매체", value: "SA (Google · 네이버) · DA" },
        { label: "팀", value: "3명 (본부장 · 본인 · 매니저)" },
        { label: "기여도", value: "80%", bar: 80 }
      ],
      work: [
        "실무 PM으로 미디어믹스 설계, 매체 운영, 소재 기획, 성과 리포트 담당",
        "매일 만들던 데일리 리포트를 대시보드로 대체: DA · SA · 키워드 · 소재 · 미디어믹스를 한 화면에",
        "월간 리포트 자동화: 원본 파일 5개를 넣으면 엑셀 리포트(11개 시트)와 HTML 대시보드가 같이 생성",
        "네이버 경쟁사 광고 모니터링 자동화: 5개 브랜드, 키워드 9개의 PC · 모바일 광고 주간 캡처",
        "도구는 Python, Playwright, Google Sheets API, Chart.js, Claude Code로 직접 개발 (아래 AI · Automation 참고)"
      ],
      metrics: [
        { value: "258%", label: "DA 상담신청 목표 달성률(8월) · 6~9월 4개월 연속 초과" },
        { value: "-42.7%", label: "SA 상담신청 CPA · 1월→9월, 예산이 44% 줄어도 상담신청 수 유지" },
        { value: "-41.5%", label: "DA 상담신청 CPA · 5월→6월" },
        { value: "0건", label: "데일리 리포트 작성·발송 · 직접 만든 자동화로 대체" }
      ],
      insight: [
        "데일리 리포트를 만들어 보내는 일이 없어졌습니다. 광고주와 팀은 대시보드에서 바로 숫자를 봅니다.",
        "차트와 표는 자동으로 나오니, 리포트 시간에는 숫자를 해석하고 다음에 뭘 바꿀지만 정합니다."
      ],
      image: "./assets/lx-creative.jpg",
      imageCaption: "광고주 데이터 보호를 위해 수치 블러 처리"
    }
  ],
  career: [
    {
      company: "와이즈버즈",
      period: "2025.07 — 현재",
      detail: "디지털 광고대행사 · 트래블월렛, 오뚜기 진라면, LX하우시스 Z:IN",
      numbers: []
    },
    {
      company: "엔포니 → 데이위즈",
      period: "2022.07 — 2024.12",
      detail: "광고대행사 마케팅팀 매니저 · 2024년 크리마 자회사로 편입되며 이름이 바뀐 같은 회사 · 월 4억 원 규모, 8개 업체, 10개 매체 동시 운영",
      numbers: [
        { value: "-9%", label: "CPA · Meta 웨비나 공식 사례 (카탈로그 소재 수 A/B 테스트)" },
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
    summary: "LX하우시스 Z:IN을 맡으면서 반복 업무를 **Python과 Claude Code로 직접 자동화**했습니다. 셋 다 지금 매일, 매주 쓰고 있는 도구입니다.",
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
