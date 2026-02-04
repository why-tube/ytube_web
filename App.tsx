import React, { useState, useEffect } from 'react';
import { SplineHero } from './components/SplineHero';
import { PricingCard } from './components/PricingCard';
import { FAQItem } from './components/FAQItem';
import { ReviewMarquee, Review } from './components/ReviewMarquee';
import { LegalPage } from './components/LegalPage';
import { Plan, Region, ServiceData } from './types';
import { TERMS_OF_SERVICE, PRIVACY_POLICY } from './data/legal';

const SPLINE_URL = "https://my.spline.design/airbnbicons-C39idtijswecON1TrtxnF89Y/";

// --- DATA GENERATION UTILS ---

const NAMES = ["김*수", "이*민", "박*영", "최*호", "정*우", "강*훈", "조*진", "윤*서", "장*혁", "임*재", "한*우", "오*석", "서*준", "신*아", "권*솔", "황*현", "안*기", "송*윤", "전*우", "홍*표", "유*진", "백*현", "고*훈", "문*석", "양*희", "손*민", "배*준", "조*원", "허*영", "남*우"];

const YOUTUBE_TEXTS = [
  "진작 알았으면 좋았을 텐데.. 커피 한 잔 값으로 유튜브 프리미엄이라니 대박입니다.",
  "입금하고 5분 만에 바로 적용됐어요. 속도 무엇? ㅋㅋㅋ 잘 쓰겠습니다.",
  "처음엔 반신반의했는데 상담도 너무 친절하시고 6개월째 문제없이 쓰는 중입니다.",
  "유튜브 뮤직까지 같이 되니까 멜론 해지했습니다. 돈 굳었네요.",
  "다른 곳 쓰다가 먹튀 당해서 여기로 옮겼는데 여긴 진짜 빠르고 확실하네요.",
  "가족들 거 다 해줬습니다. 다들 너무 좋아하네요 번창하세요!",
  "광고 없는 삶이 이렇게 편할 줄이야.. 신세계입니다.",
  "주말에 예능 몰아보는데 끊김 없어서 너무 좋아요.",
  "백그라운드 재생 기능 때문에 운동할 때 필수입니다.",
  "오프라인 저장해서 비행기에서 잘 봤습니다. 강추!",
  "친구 추천 받고 왔는데 역시 좋네요. 믿고 씁니다.",
  "가격이 너무 착해서 의심했는데 진짜 되네요 ㄷㄷ",
  "상담원분이 너무 친절하게 알려주셔서 쉽게 가입했어요.",
  "매달 결제되는 거 부담스러웠는데 1년치 끊으니 맘 편하네요.",
  "화질 설정 고정되는 것도 은근 꿀기능임.",
  "아이폰인데 PIP 모드 잘 됩니다. 굿굿",
  "인도 우회 막혀서 답답했는데 여기서 해결했네요.",
  "넷플보다 유튜브를 더 많이 봐서 이게 훨씬 이득인 듯.",
  "데이터 절약 모드 끄고 고화질로 맘껏 봅니다.",
  "부모님 해드렸는데 너무 좋아하시네요. 효도템 인정.",
  "유튜브 뮤직 알고리즘이 멜론보다 나은 듯?",
  "다운로드 속도도 빠르고 아주 만족스럽습니다.",
  "새벽에 문의했는데도 답장 빨라서 놀랐어요.",
  "이 가격에 이 혜택이라니.. 사장님 남는 게 있으신가요?",
  "재가입 귀찮아서 1년권 질렀습니다. 편안~",
  "끊김 없이 노래 듣는 게 제일 좋음.",
  "광고 스킵 버튼 누를 일 없어서 손가락이 편함 ㅋㅋ",
  "지하철 출퇴근길 필수품입니다.",
  "친구들한테 다 영업 중입니다. 적립금 없나요? ㅋㅋ",
  "확실히 프리미엄 쓰다가 안 쓰면 역체감 심함. 못 돌아감."
];

const DUOLINGO_TEXTS = [
  "하트 무제한 되니까 공부할 맛 나네요. 광고 없어서 집중도 잘 됨.",
  "패밀리 플랜이라 걱정했는데 개인 계정이랑 똑같네요! 싸게 잘 샀습니다.",
  "영어 공부 다시 시작하려고 끊었는데 가성비 최고입니다.",
  "결제하자마자 초대 링크 바로 오네요. 피드백 빨라서 좋습니다.",
  "친구 추천으로 왔습니다. 1년 동안 열공해보겠습니다 화이팅!",
  "오답 노트 기능이 진짜 도움 많이 됩니다.",
  "레전드 레벨 도전할 때 하트 걱정 없어서 너무 좋아요.",
  "출퇴근길에 잠깐씩 하는데 광고 없으니 흐름이 안 끊겨요.",
  "슈퍼 듀오링고 비싸서 망설였는데 여기서 싸게 득템!",
  "가족들이랑 같이 쓰려다가 여기서 제 것만 따로 샀어요.",
  "프랑스어 공부 중인데 확실히 슈퍼가 좋긴 하네요.",
  "무제한 하트 없으면 공부 못함.. 필수임.",
  "진도 쭉쭉 나가는 중입니다. 성취감 쩔어요.",
  "스페인어 기초 떼기 도전합니다. 아자아자!",
  "일본어 공부하는데 한자 쓰기 연습 무제한이라 좋음.",
  "중국어 성조 연습할 때 틀려도 안 깎이니 맘 편함.",
  "가격 대비 효율 최고입니다. 학원비 굳음.",
  "듀오링고 캐릭터들 옷 입히는 재미도 쏠쏠하네요 ㅋㅋ",
  "연속 학습 기록 깨질 뻔했는데 복구 기능 덕분에 살았음.",
  "확실히 돈을 내야 공부를 하게 됨.. 의지 박약 타파!",
  "영어 발음 교정 기능이 꽤 정확하네요.",
  "다른 언어도 같이 공부할 수 있어서 일석이조.",
  "초대 메일이 스팸함에 있었는데 상담원분이 잘 알려주심.",
  "기존 계정 그대로 쓸 수 있어서 기록 안 날리고 좋네요.",
  "1년 동안 뽕 뽑겠습니다. 감사해요~",
  "공부 습관 잡는 데는 듀오링고 만한 게 없는 듯.",
  "자기 전에 10분씩 하는데 실력이 느는 게 느껴짐.",
  "여행 가서 써먹으려고 급하게 샀는데 만족합니다.",
  "아이들 교육용으로 샀는데 게임처럼 좋아하네요.",
  "광고 보는 시간 아껴서 단어 하나 더 외웁니다."
];

function generateReviewData(texts: string[]): Review[] {
  // Use a predictable pseudo-random seed or just random for client-side
  const reviews: Review[] = [];
  const shuffledTexts = [...texts].sort(() => Math.random() - 0.5);
  
  shuffledTexts.forEach((text) => {
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    // Generate fake IP: e.g., 210.230.***.**
    const part1 = Math.floor(Math.random() * 223) + 1; // 1-223
    const part2 = Math.floor(Math.random() * 255);
    const ip = `${part1}.${part2}.***.**`;
    
    // Generate random date within last 3 days
    const timeDiff = Math.floor(Math.random() * 72); // 0-72 hours
    let date = "";
    if (timeDiff < 1) date = "방금 전";
    else if (timeDiff < 24) date = `${timeDiff}시간 전`;
    else date = `${Math.floor(timeDiff / 24)}일 전`;

    reviews.push({
      name,
      text,
      rating: 5,
      date,
      ip
    });
  });
  
  return reviews;
}

const YOUTUBE_REVIEWS = generateReviewData(YOUTUBE_TEXTS);
const DUOLINGO_REVIEWS = generateReviewData(DUOLINGO_TEXTS);

// --- SERVICE DATA ---

const YOUTUBE_DATA: ServiceData = {
  id: 'YOUTUBE',
  name: '와이튜브',
  themeColor: '#FF0000',
  toggleLabels: {
    left: '🇰🇷 한국',
    right: '🇮🇳 인도'
  },
  hero: {
    badge: '🚀 70% 한정 할인 진행중',
    title: <>YouTube Premium<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">VPN 없이 더 싸게</span></>,
    subtitle: <>광고 없이, 끊김 없이. <br/>인도/터키 우회 막힘 걱정 없이 안전하게.</>
  },
  features: [
    { icon: 'fa-ban', title: '광고 제거', desc: '모든 영상의 광고를 완벽하게 차단합니다' },
    { icon: 'fa-globe', title: 'VPN 불필요', desc: '번거로운 VPN 설치 없이 즉시 이용 가능' },
    { icon: 'fa-music', title: 'YouTube Music', desc: '8천만 곡 이상의 음악 무료 스트리밍' },
    { icon: 'fa-mobile-screen', title: '백그라운드 재생', desc: '화면을 꺼도 끊김 없는 영상 재생' },
  ],
  plans: [
    {
      id: 'yearly_individual',
      name: '1년 이용권 (개인)',
      period: '년',
      bestValue: true,
      options: {
        KOREA: { price: 73000, originalPrice: 178800, label: '개인' }
      },
      features: ['가족 그룹 가입 없는 단독 사용', '기존 내 계정 그대로 독립 사용', '프라이버시 완벽 보호', 'YouTube Premium 모든 혜택 동일', '12개월 일시불 특가 할인']
    },
    {
      id: 'monthly',
      name: '1개월 이용권(가족초대)',
      period: '월',
      bestValue: false,
      options: {
        INDIA: { price: 5500, originalPrice: 14900, label: '인도' },
        KOREA: { price: 6500, originalPrice: 14900, label: '한국' }
      },
      features: ['가족 그룹 공유형 (초대 방식)', '복잡한 VPN 우회 과정 없음', '백그라운드 재생 및 오프라인 저장', 'YouTube Music 무료 이용 포함', '입금 즉시 3분 내 빠른 활성화']
    },
    {
      id: 'yearly',
      name: '1년 이용권 (가족초대)',
      period: '년',
      options: {
        INDIA: { price: 55000, originalPrice: 178800, label: '인도' },
        KOREA: { price: 65000, originalPrice: 178800, label: '한국' }
      },
      features: ['가족 그룹 공유형 (초대 방식)', '1년 동안 갱신/결제 걱정 없음', '장기 구독 시 추가 할인 혜택', '가격 인상 걱정 없는 고정 요금', '문제 발생 시 100% AS 및 환불']
    }
  ],
  faqs: [
    { q: "기존에 사용하던 계정을 그대로 쓸 수 있나요?", a: "네, 가능합니다. 사용하시던 구글 계정 그대로 유튜브 프리미엄 혜택만 적용해 드립니다. 시청 기록, 구독 채널, 알고리즘 추천 등 모든 데이터가 그대로 유지됩니다." },
    { q: "VPN을 써서 우회해야 하나요?", a: "아니요, 와이튜브는 VPN이 전혀 필요 없습니다. 보내드리는 가족 초대 링크만 클릭하면 즉시 한국에서 사용하는 것처럼 편하게 이용하실 수 있습니다." },
    { q: "도중에 해지되거나 문제가 생기면 어떡하나요?", a: "서비스 이용 중 문제가 발생할 경우 남은 기간에 대해 100% 환불을 보장해 드립니다. 또한, 문제 발생 시 즉시 새로운 계정으로 복구해 드리는 AS 정책을 운영하고 있습니다." },
    { q: "인도 계정과 한국 계정의 차이는 무엇인가요?", a: "유튜브 영상 시청 및 광고 제거 기능은 전 세계 동일하게 적용됩니다. 다만 인도 계정의 경우 유튜브 뮤직 등 일부 부가 기능에서 차이가 있을 수 있습니다. 가장 안정적이고 편리한 사용을 원하신다면 한국 계정을 추천드립니다." },
    { q: "개인 이용권은 가족 공유형과 무엇이 다른가요?", a: "개인 이용권은 가족 그룹에 가입하지 않고 고객님의 계정 자체에 프리미엄 권한을 부여하는 방식입니다. 프라이버시를 중요하게 생각하시거나 가족 그룹 가입이 번거로우신 분들께 추천드립니다." }
  ]
};

const DUOLINGO_DATA: ServiceData = {
  id: 'DUOLINGO',
  name: '듀오링고',
  themeColor: '#58CC02',
  toggleLabels: {
    left: '패밀리',
    right: '개인'
  },
  hero: {
    badge: '🎓 평생 언어 학습 파트너',
    title: <>Super Duolingo<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#58CC02]">제한 없이 배우세요</span></>,
    subtitle: <>하트 무제한, 광고 제거, 오답 노트. <br/>슈퍼 패밀리 플랜 공유로 가장 저렴하게.</>
  },
  features: [
    { icon: 'fa-heart', title: '무제한 하트', desc: '실수해도 멈추지 않고 계속 학습' },
    { icon: 'fa-ban', title: '광고 제거', desc: '방해 없이 학습에만 집중하세요' },
    { icon: 'fa-book-open', title: '맞춤형 복습', desc: '틀린 문제를 다시 풀어보며 완벽 이해' },
    { icon: 'fa-trophy', title: '레전드 도전', desc: '제한 없이 레전드 레벨에 도전하세요' },
  ],
  plans: [
    {
      id: 'yearly_share',
      name: '1년 이용권',
      period: '년',
      bestValue: true,
      options: {
        // Removed INDIA (Individual) option
        KOREA: { price: 30000, originalPrice: 69000, label: '패밀리' } // Maps to 'Family Share'
      },
      features: ['Super Duolingo의 모든 혜택 적용', '무제한 하트로 끊김 없는 학습', '광고 없는 쾌적한 환경', '오프라인 코스 다운로드', '입금 즉시 빠른 활성화']
    }
  ],
  faqs: [
    { q: "기존 듀오링고 계정을 그대로 쓸 수 있나요?", a: "네, 기존 사용하시던 계정에 Super 혜택만 적용해드립니다. 학습 기록, XP, 친구 목록 등 모든 데이터가 안전하게 유지됩니다." },
    { q: "패밀리 플랜은 무엇인가요?", a: "Super Duolingo 패밀리 요금제에 초대되어 저렴하게 이용하는 방식입니다. 기능상 차이는 전혀 없으며, 개인 계정의 프라이버시는 완벽하게 보호됩니다." },
    { q: "언어 제한이 있나요?", a: "아니요, 영어, 일본어, 중국어, 스페인어 등 듀오링고가 제공하는 모든 언어를 제한 없이 학습하실 수 있습니다." },
    { q: "결제 후 언제부터 사용 가능한가요?", a: "결제 완료 후 상담 채널로 계정 정보를 알려주시면 평균 10분 이내로 활성화 처리가 완료됩니다." },
    { q: "사용 중 문제가 발생하면 환불 되나요?", a: "서비스 이용 중 계정에 문제가 발생하고 해결이 불가능할 경우, 남은 기간에 대해 100% 환불 또는 새 계정 교체를 보장해 드립니다." }
  ]
};

export const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [activeLegalDoc, setActiveLegalDoc] = useState<'TOS' | 'PRIVACY' | null>(null);
  const [showStickyBtn, setShowStickyBtn] = useState(false);

  // Define current data based on selection or default to null
  const currentData = selectedService;

  const handlePlanSelect = (plan: Plan, region: Region) => {
    if (!currentData) return;
    const optionName = region === 'KOREA' ? currentData.toggleLabels.left : currentData.toggleLabels.right;
    const message = `안녕하세요! ${currentData.name} 문의드립니다.\n[${plan.name} - ${optionName} 옵션]`;
    window.open('https://pf.kakao.com/_yxbeyn/chat', '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBtn(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- LEGAL PAGES RENDER ---
  if (activeLegalDoc) {
    // If a specific service is selected, use its theme. Otherwise default to a neutral theme.
    const themeColor = currentData ? currentData.themeColor : '#FF0000';
    const isTerms = activeLegalDoc === 'TOS';
    
    return (
      <LegalPage 
        title={isTerms ? '이용약관' : '개인정보처리방침'}
        content={isTerms ? TERMS_OF_SERVICE : PRIVACY_POLICY}
        onBack={() => setActiveLegalDoc(null)}
        themeColor={themeColor}
      />
    );
  }

  // --- LANDING SCREEN (SERVICE SELECTION) ---
  if (!currentData) {
    return (
      <div className="relative min-h-screen font-sans text-white bg-black selection:bg-brand-red selection:text-white flex flex-col justify-between p-6 overflow-x-hidden">
        <SplineHero url={SPLINE_URL} />
        
        {/* Top Left Brand Logo */}
        <nav className="absolute top-0 left-0 w-full p-6 z-20">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tighter text-white cursor-pointer">와이튜브</h1>
          </div>
        </nav>

        {/* Main Centered Content */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-grow w-full max-w-4xl mx-auto space-y-12 animate-float py-20">
          <div className="space-y-4 text-center">
            <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
              와이튜브
            </h2>
            <p className="text-xl md:text-2xl font-bold text-gray-200">
              유튜브 프리미엄 & 듀오링고 할인
            </p>
            <p className="text-gray-400 text-base md:text-lg">
              합리적인 가격으로 프리미엄 라이프를 시작하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* YouTube Option */}
            <button 
              onClick={() => setSelectedService(YOUTUBE_DATA)}
              className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 transition-all duration-300 hover:scale-[1.03] hover:border-brand-red/50 hover:shadow-[0_0_50px_rgba(255,0,0,0.2)] text-left flex flex-col gap-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-red/20 flex items-center justify-center text-3xl text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors">
                <i className="fa-brands fa-youtube"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-white">YouTube Premium</h3>
                <p className="text-gray-400 text-sm">월 4,000원부터 시작하는 광고 없는 영상</p>
              </div>
              <div className="mt-auto flex items-center text-brand-red font-bold text-sm">
                선택하기 <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </button>

            {/* Duolingo Option */}
            <button 
              onClick={() => setSelectedService(DUOLINGO_DATA)}
              className="group relative bg-[#111] border border-white/10 rounded-3xl p-8 transition-all duration-300 hover:scale-[1.03] hover:border-[#58CC02]/50 hover:shadow-[0_0_50px_rgba(88,204,2,0.2)] text-left flex flex-col gap-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#58CC02]/20 flex items-center justify-center text-3xl text-[#58CC02] group-hover:bg-[#58CC02] group-hover:text-white transition-colors">
                <i className="fa-solid fa-feather"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-white">Super Duolingo</h3>
                <p className="text-gray-400 text-sm">무제한 하트로 배우는 가장 빠른 언어 학습</p>
              </div>
              <div className="mt-auto flex items-center text-[#58CC02] font-bold text-sm">
                선택하기 <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </button>
          </div>
        </div>
        
        {/* Landing Page Footer */}
        <footer className="relative z-10 w-full text-center py-4">
          <div className="flex justify-center gap-6 text-xs text-gray-500 font-medium">
            <button onClick={() => setActiveLegalDoc('TOS')} className="hover:text-white hover:underline transition-all">이용약관</button>
            <button onClick={() => setActiveLegalDoc('PRIVACY')} className="hover:text-white hover:underline transition-all">개인정보처리방침</button>
          </div>
          <p className="mt-2 text-[10px] text-gray-600">© 2025 와이튜브. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  // --- MAIN SERVICE PAGE ---
  return (
    <div 
      className="relative min-h-screen font-sans text-white bg-black selection:text-white selection:bg-[var(--theme-color)]" 
      style={{ '--theme-color': currentData.themeColor } as React.CSSProperties}
    >
      {/* 3D Background - Keep it rendered but maybe we could change URL based on service if we wanted */}
      <SplineHero url={SPLINE_URL} />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedService(null)}>
          <i className="fa-solid fa-arrow-left text-gray-400 hover:text-white transition-colors mr-2"></i>
          {currentData.id === 'YOUTUBE' ? (
             <i className="fa-brands fa-youtube text-2xl" style={{ color: currentData.themeColor }}></i>
          ) : (
             <i className="fa-solid fa-feather text-2xl" style={{ color: currentData.themeColor }}></i>
          )}
          <span className="font-bold text-lg tracking-tight">{currentData.name}</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center w-full max-w-full overflow-hidden mx-auto pt-32 pb-24 space-y-24">
        
        {/* Hero Section */}
        <section className="text-center space-y-6 animate-float px-6 max-w-2xl">
          <span 
            className="inline-block px-3 py-1 text-xs font-semibold bg-white/10 border rounded-full mb-2"
            style={{ color: currentData.themeColor, borderColor: `${currentData.themeColor}33` }}
          >
            {currentData.hero.badge}
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight">
            {currentData.hero.title}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-sm mx-auto">
            {currentData.hero.subtitle}
          </p>
          <div className="pt-4">
            <a 
              href="#pricing"
              className="inline-block text-white font-bold text-lg px-8 py-4 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:scale-105 transition-transform"
              style={{ backgroundColor: currentData.themeColor, boxShadow: `0 0 30px ${currentData.themeColor}66` }}
            >
              지금 시작하기
            </a>
          </div>
        </section>

        {/* Features Grid */}
        <section className="w-full max-w-2xl px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentData.features.map((feature, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/5 p-6 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl shadow-lg"
                style={{ background: `linear-gradient(135deg, ${currentData.themeColor}, #000)` }}
              >
                <i className={`fa-solid ${feature.icon}`}></i>
              </div>
              <div>
                <h3 className="font-bold text-white">{feature.title}</h3>
                <p className="text-xs text-gray-400">{feature.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Review Marquee Section */}
        <section className="w-full">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold mb-2 text-gray-200">생생한 리얼 후기</h2>
            <p className="text-gray-500 text-xs">이미 수많은 분들이 혜택을 받고 계십니다</p>
          </div>
          <ReviewMarquee 
            reviews={currentData.id === 'YOUTUBE' ? YOUTUBE_REVIEWS : DUOLINGO_REVIEWS} 
            themeColor={currentData.themeColor} 
          />
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full max-w-7xl px-6 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">합리적인 가격</h2>
            <p className="text-gray-400 text-sm">커피 한 잔 값으로 한 달을 즐겁게</p>
          </div>
          
          {/* Responsive Grid: 1 col mobile, 2 cols tablet, 3 cols desktop if 3 items */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto`}>
            {currentData.plans.map(plan => (
              <PricingCard 
                key={plan.id} 
                plan={plan} 
                onSelect={handlePlanSelect} 
                themeColor={currentData.themeColor}
                toggleLabels={currentData.toggleLabels}
              />
            ))}
          </div>
          
          <div className="text-center text-xs text-gray-500 mt-4">
             * 모든 상품은 부가세가 포함된 가격입니다.
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full max-w-2xl px-6 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">자주 묻는 질문</h2>
            <p className="text-gray-400 text-sm">궁금한 점을 확인해보세요</p>
          </div>
          
          <div className="w-full">
            {currentData.faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} themeColor={currentData.themeColor} />
            ))}
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="w-full max-w-2xl px-6">
          <div className="w-full bg-[#111] rounded-3xl p-8 text-center space-y-6 border border-white/5">
            <div className="flex justify-center gap-8 text-3xl text-gray-600">
              <i className="fa-brands fa-apple"></i>
              <i className="fa-brands fa-android"></i>
              <i className="fa-brands fa-windows"></i>
            </div>
            <p className="text-gray-400 text-sm">
              모든 디바이스에서 완벽하게 호환됩니다.
              <br />
              구독 도중 계정 이상 발생 시 남은 기간 100% 환불 보장.
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-black py-10 border-t border-white/10 text-center text-gray-500 text-xs">
        <p className="mb-2">© 2025 와이튜브. All rights reserved.</p>
        <p>본 서비스는 공식 서비스가 아닌 리셀러 서비스입니다.</p>
        <div className="mt-4 flex justify-center gap-6 font-medium">
          <button onClick={() => setActiveLegalDoc('TOS')} className="hover:text-white hover:underline transition-all">이용약관</button>
          <button onClick={() => setActiveLegalDoc('PRIVACY')} className="hover:text-white hover:underline transition-all">개인정보처리방침</button>
        </div>
      </footer>

      {/* Sticky Floating CTA Button */}
      <div 
        className={`fixed bottom-8 left-0 w-full flex justify-center z-50 pointer-events-none transition-all duration-500 transform ${
          showStickyBtn ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
        }`}
      >
        <a
          href="https://pf.kakao.com/_yxbeyn/chat"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto text-white font-bold text-lg px-10 py-3 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-white/10 backdrop-blur-md"
          style={{ backgroundColor: currentData.themeColor, boxShadow: `0 4px 30px ${currentData.themeColor}80` }}
        >
          {currentData.id === 'YOUTUBE' ? <i className="fa-brands fa-youtube"></i> : <i className="fa-solid fa-feather"></i>}
          구독하기
        </a>
      </div>
    </div>
  );
};