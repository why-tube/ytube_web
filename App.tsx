import React, { useState, useEffect } from 'react';
import { SplineHero } from './components/SplineHero';
import { PricingCard } from './components/PricingCard';
import { FAQItem } from './components/FAQItem';
import { Plan, Region, ServiceData } from './types';

const SPLINE_URL = "https://my.spline.design/airbnbicons-C39idtijswecON1TrtxnF89Y/";

// --- DATA DEFINITIONS ---

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
    title: <>YouTube Premium<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">더 현명하게 즐기세요</span></>,
    subtitle: <>광고 없이, 끊김 없이. <br/>공식 가격의 부담은 줄이고 혜택은 그대로.</>
  },
  features: [
    { icon: 'fa-ban', title: '광고 제거', desc: '영상을 끊김 없이 감상하세요' },
    { icon: 'fa-download', title: '오프라인 저장', desc: '데이터 걱정 없이 즐기세요' },
    { icon: 'fa-music', title: 'YouTube Music', desc: '8천만 곡 이상의 음악 스트리밍' },
    { icon: 'fa-mobile-screen', title: '백그라운드 재생', desc: '다른 앱을 쓰면서도 계속 재생' },
  ],
  plans: [
    {
      id: 'monthly',
      name: '1개월 이용권',
      period: '월',
      bestValue: true,
      options: {
        INDIA: { price: 4000, originalPrice: 14900, label: '인도' },
        KOREA: { price: 5000, originalPrice: 14900, label: '한국' }
      },
      features: ['YouTube Premium 100% 동일 혜택', '광고 없는 쾌적한 영상 시청', '백그라운드 재생 및 오프라인 저장', 'YouTube Music 무료 이용 포함', '입금 즉시 빠른 활성화']
    },
    {
      id: 'yearly',
      name: '1년 이용권',
      period: '년',
      options: {
        INDIA: { price: 40000, originalPrice: 178800, label: '인도' },
        KOREA: { price: 50000, originalPrice: 178800, label: '한국' }
      },
      features: ['월간 이용권의 모든 혜택 포함', '1년 동안 갱신 걱정 없는 편안함', '장기 구독 시 추가 할인 혜택', '가격 인상 걱정 없는 고정 요금', '프리미엄 전용 고객 지원']
    }
  ],
  faqs: [
    { q: "기존에 사용하던 계정을 그대로 쓸 수 있나요?", a: "네, 가능합니다. 사용하시던 구글 계정 그대로 유튜브 프리미엄 혜택만 적용해 드립니다. 시청 기록, 구독 채널, 알고리즘 추천 등 모든 데이터가 그대로 유지됩니다." },
    { q: "결제 후 이용까지 얼마나 걸리나요?", a: "입금 확인 후 평균 10분 내로 처리가 완료됩니다. 카카오톡 상담 채널을 통해 실시간으로 안내해 드리고 있습니다." },
    { q: "도중에 해지되거나 문제가 생기면 어떡하나요?", a: "서비스 이용 중 문제가 발생할 경우 남은 기간에 대해 100% 환불을 보장해 드립니다. 또한, 문제 발생 시 즉시 새로운 계정으로 복구해 드리는 AS 정책을 운영하고 있습니다." },
    { q: "인도 계정과 한국 계정의 차이는 무엇인가요?", a: "유튜브 영상 시청 및 광고 제거 기능은 전 세계 동일하게 적용됩니다. 다만 인도 계정의 경우 유튜브 뮤직 등 일부 부가 기능에서 차이가 있을 수 있습니다. 가장 안정적이고 편리한 사용을 원하신다면 한국 계정을 추천드립니다." },
    { q: "아이폰, 안드로이드 모두 사용 가능한가요?", a: "네, 기기 종류와 상관없이 모든 스마트폰(아이폰, 갤럭시 등), 태블릿, PC, 스마트 TV에서 동일하게 이용하실 수 있습니다." }
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
    subtitle: <>하트 무제한, 광고 제거, 오답 노트. <br/>가장 빠른 언어 습득을 위한 현명한 선택.</>
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

  // --- LANDING SCREEN (SERVICE SELECTION) ---
  if (!currentData) {
    return (
      <div className="relative min-h-screen font-sans text-white bg-black selection:bg-brand-red selection:text-white flex flex-col items-center justify-center p-6 overflow-hidden">
        <SplineHero url={SPLINE_URL} />
        
        <div className="relative z-10 text-center space-y-12 max-w-4xl w-full animate-float">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              Choose Your Platform
            </h1>
            <p className="text-gray-400 text-lg">
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
                <h2 className="text-2xl font-bold mb-2 text-white">YouTube Premium</h2>
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
                <h2 className="text-2xl font-bold mb-2 text-white">Super Duolingo</h2>
                <p className="text-gray-400 text-sm">무제한 하트로 배우는 가장 빠른 언어 학습</p>
              </div>
              <div className="mt-auto flex items-center text-[#58CC02] font-bold text-sm">
                선택하기 <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </button>
          </div>
        </div>
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
      <main className="relative z-10 flex flex-col items-center w-full max-w-2xl mx-auto px-6 pt-32 pb-24 space-y-24">
        
        {/* Hero Section */}
        <section className="text-center space-y-6 animate-float">
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
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
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

        {/* Pricing Section */}
        <section id="pricing" className="w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">합리적인 가격</h2>
            <p className="text-gray-400 text-sm">커피 한 잔 값으로 한 달을 즐겁게</p>
          </div>
          
          <div className={`grid grid-cols-1 ${currentData.plans.length > 1 ? 'md:grid-cols-2' : 'max-w-sm mx-auto'} gap-6`}>
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
        <section className="w-full space-y-8">
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
        <section className="w-full bg-[#111] rounded-3xl p-8 text-center space-y-6 border border-white/5">
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
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-black py-10 border-t border-white/10 text-center text-gray-600 text-xs">
        <p className="mb-2">© 2025 와이튜브. All rights reserved.</p>
        <p>본 서비스는 공식 서비스가 아닌 리셀러 서비스입니다.</p>
        <div className="mt-4 flex justify-center gap-4">
          <a href="#" className="hover:text-white transition">이용약관</a>
          <a href="#" className="hover:text-white transition">개인정보처리방침</a>
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