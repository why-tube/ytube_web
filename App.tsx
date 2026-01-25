import React from 'react';
import { SplineHero } from './components/SplineHero';
import { PricingCard } from './components/PricingCard';
import { Plan } from './types';

// Updated Spline URL to the specific scene provided
const SPLINE_URL = "https://my.spline.design/airbnbicons-C39idtijswecON1TrtxnF89Y/";

const PLANS: Plan[] = [
  {
    id: 'monthly',
    name: '월간 이용권',
    price: "4,000원 ~ 5,000원",
    originalPrice: 14900,
    period: '월',
    bestValue: true,
    features: [
      'YouTube Premium 혜택 100%',
      '광고 없는 영상 재생',
      '백그라운드 재생 및 저장',
      'YouTube Music 무료 이용',
      '즉시 활성화'
    ]
  },
  {
    id: 'yearly',
    name: '1년 이용권',
    price: 50000,
    originalPrice: 178800,
    period: '년',
    features: [
      '월간 이용권의 모든 혜택',
      '추가 할인 적용',
      '1년 동안 갱신 걱정 없음'
    ]
  }
];

export const App: React.FC = () => {
  const handlePlanSelect = (plan: Plan) => {
    window.open('http://pf.kakao.com/_yxbeyn/chat', '_blank');
  };

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
              href="http://pf.kakao.com/_yxbeyn/chat" 
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
          
          <div className="grid grid-cols-1 gap-6">
            {PLANS.map(plan => (
              <PricingCard key={plan.id} plan={plan} onSelect={handlePlanSelect} />
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
    </div>
  );
};