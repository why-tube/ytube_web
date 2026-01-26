import React, { useState, useEffect } from 'react';
import { SplineHero } from './components/SplineHero';
import { PricingCard } from './components/PricingCard';
import { FAQItem } from './components/FAQItem';
import { Plan, Region } from './types';

// Updated Spline URL to the Airbnb Icons scene
const SPLINE_URL = "https://my.spline.design/airbnbicons-C39idtijswecON1TrtxnF89Y/";

const PLANS: Plan[] = [
  {
    id: 'monthly',
    name: '1개월 이용권',
    period: '월',
    bestValue: true,
    options: {
      INDIA: {
        price: 4000,
        originalPrice: 14900,
        label: '인도'
      },
      KOREA: {
        price: 5000,
        originalPrice: 14900,
        label: '한국'
      }
    },
    features: [
      'YouTube Premium 100% 동일 혜택',
      '광고 없는 쾌적한 영상 시청',
      '백그라운드 재생 및 오프라인 저장',
      'YouTube Music 무료 이용 포함',
      '입금 즉시 빠른 활성화'
    ]
  },
  {
    id: 'yearly',
    name: '1년 이용권',
    period: '년',
    options: {
      INDIA: {
        price: 40000,
        originalPrice: 178800,
        label: '인도'
      },
      KOREA: {
        price: 50000,
        originalPrice: 178800,
        label: '한국'
      }
    },
    features: [
      '월간 이용권의 모든 혜택 포함',
      '1년 동안 갱신 걱정 없는 편안함',
      '장기 구독 시 추가 할인 혜택',
      '가격 인상 걱정 없는 고정 요금',
      '프리미엄 전용 고객 지원'
    ]
  }
];

const FAQS = [
  {
    q: "기존에 사용하던 계정을 그대로 쓸 수 있나요?",
    a: "네, 가능합니다. 다만 개인정보 보호와 안전한 알고리즘 관리를 위해 '신규 계정' 생성을 강력히 권장드립니다. 기존 계정 사용 시 발생하는 계정 정지, 본인 인증 요구 등의 문제나 사후 관리에 대해서는 별도의 책임을 지지 않으므로, 가급적 유튜브 전용 계정을 새로 만들어 이용해 주시기 바랍니다."
  },
  {
    q: "결제 후 이용까지 얼마나 걸리나요?",
    a: "입금 확인 후 평균 30분 내로 처리가 완료되며, 계정 안정성 확보를 위해 일일 가입자 10명내로 제한하고 있습니다. 일일 가입자 한도 초과시 대기가 발생할 수 있다는 점 양해바랍니다. 카카오톡 상담 채널을 통해 실시간으로 안내해 드리고 있습니다."
  },
  {
    q: "도중에 해지되거나 문제가 생기면 어떡하나요?",
    a: "서비스 이용 중 문제가 발생할 경우 남은 기간에 대해 100% 환불을 보장해 드립니다."
  },
  {
    q: "인도 계정과 한국 계정의 차이는 무엇인가요?",
    a: "유튜브 영상 시청 및 광고 제거 기능은 전 세계 동일하게 적용됩니다. 다만 인도 계정의 경우 유튜브 뮤직 등 일부 부가 기능에서 차이가 있을 수 있습니다. 가장 안정적이고 편리한 사용을 원하신다면 한국 계정을 추천드립니다."
  },
  {
    q: "아이폰, 안드로이드 모두 사용 가능한가요?",
    a: "네, 기기 종류와 상관없이 모든 스마트폰(아이폰, 갤럭시 등), 태블릿, PC, 스마트 TV에서 동일하게 이용하실 수 있습니다."
  },
  {
    q: "이미 다른 가족 그룹에 속해 있는 경우 어떻게 하나요?",
    a: "‘구글 가족 그룹 탈퇴’를 검색하신 후 기존 그룹에서 먼저 탈퇴해주세요. 탈퇴가 완료되어야 새로운 초대를 수락할 수 있습니다."
  },
  {
    q: "“동일한 국가에 있지 않습니다”라는 안내가 나오면 어떻게 하죠?",
    a: "구글 결제 설정(https://payments.google.com/gp/w/u/0/home/settings)에 접속하여 대한민국 외의 타 국가 결제 프로필을 모두 삭제하신 뒤 다시 시도해 주시기 바랍니다."
  },
  {
    q: "“12개월 동안 가족 그룹 가입이 불가능합니다” 메시지가 뜹니다.",
    a: "최근 가족 그룹 탈퇴 이력이 있는 계정의 정책적 제한입니다. 이 경우 다른 Gmail 계정이나 신규 계정을 생성하여 초대를 받으시면 즉시 정상 이용이 가능합니다."
  },
  {
    q: "가족 그룹 초대 및 이용 방식이 궁금합니다.",
    a: "본 서비스는 가족 초대 수락 방식으로 진행됩니다. 결제 후 댓글로 계정을 남겨주시면 운영진 확인 후 초대를 보내드리며, 이메일로 발송된 초대 링크를 수락하시면 활성화됩니다."
  },
  {
    q: "로그인 오류나 계정 전환이 잘 안 될 때는 어떻게 하나요?",
    a: "여러 계정이 동시에 로그인된 브라우저에서는 충돌이 발생할 수 있습니다. '시크릿 모드'를 실행하거나 다른 브라우저를 사용하여 진행하시면 가장 원활하게 처리됩니다."
  }
];


export const App: React.FC = () => {
  const [showStickyBtn, setShowStickyBtn] = useState(false);

  const handlePlanSelect = (plan: Plan, region: Region) => {
    // Construct message based on selection
    const message = `안녕하세요! 와이튜브입니다.\n[${plan.name} - ${region === 'INDIA' ? '인도' : '한국'} 계정] 문의드립니다.`;
    // Encode for URL
    // Since we are just opening the chat, we can't easily pre-fill message in all Kakao links, 
    // but the intention is to direct them to chat.
    window.open('https://pf.kakao.com/_yxbeyn/chat', '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 200px
      setShowStickyBtn(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen font-sans text-white bg-black selection:bg-brand-red selection:text-white">
      {/* 3D Background */}
      <SplineHero url={SPLINE_URL} />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
        <div className="flex items-center gap-2">
          <i className="fa-brands fa-youtube text-brand-red text-2xl"></i>
          <span className="font-bold text-lg tracking-tight">와이튜브</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center w-full max-w-2xl mx-auto px-6 pt-32 pb-24 space-y-24">
        
        {/* Hero Section */}
        <section className="text-center space-y-6 animate-float">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-brand-red bg-brand-red/10 border border-brand-red/20 rounded-full mb-2">
            🚀 70% 한정 할인 진행중
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight">
            YouTube Premium<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              더 현명하게 즐기세요
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-sm mx-auto">
            광고 없이, 끊김 없이. <br/>
            공식 가격의 부담은 줄이고 혜택은 그대로.
          </p>
          <div className="pt-4">
            <a 
              href="https://pf.kakao.com/_yxbeyn/chat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-brand-red text-white font-bold text-lg px-8 py-4 rounded-full shadow-[0_0_30px_rgba(255,0,0,0.4)] hover:scale-105 transition-transform"
            >
              지금 시작하기
            </a>
          </div>
        </section>

        {/* Features Grid */}
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: 'fa-ban', title: '광고 제거', desc: '영상을 끊김 없이 감상하세요' },
            { icon: 'fa-download', title: '오프라인 저장', desc: '데이터 걱정 없이 즐기세요' },
            { icon: 'fa-music', title: 'YouTube Music', desc: '8천만 곡 이상의 음악 스트리밍' },
            { icon: 'fa-mobile-screen', title: '백그라운드 재생', desc: '다른 앱을 쓰면서도 계속 재생' },
          ].map((feature, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/5 p-6 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-red to-red-900 flex items-center justify-center text-white text-xl shadow-lg">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PLANS.map(plan => (
              <PricingCard key={plan.id} plan={plan} onSelect={handlePlanSelect} />
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
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
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
        <p>본 서비스는 YouTube의 공식 서비스가 아닌 리셀러 서비스입니다.</p>
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
          className="pointer-events-auto bg-brand-red text-white font-bold text-lg px-10 py-3 rounded-full shadow-[0_4px_30px_rgba(255,0,0,0.5)] hover:bg-red-600 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-white/10 backdrop-blur-md"
        >
          <i className="fa-brands fa-youtube"></i>
          구독하기
        </a>
      </div>
    </div>
  );
};