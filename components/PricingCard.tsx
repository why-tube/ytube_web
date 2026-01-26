import React, { useState } from 'react';
import { Plan, Region } from '../types';

interface PricingCardProps {
  plan: Plan;
  onSelect: (plan: Plan, region: Region) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelect }) => {
  const [region, setRegion] = useState<Region>('KOREA');
  const currentOption = plan.options[region];
  
  const discount = Math.round(
    ((currentOption.originalPrice - currentOption.price) / currentOption.originalPrice) * 100
  );

  return (
    <div 
      className={`relative p-1 rounded-2xl transition-transform duration-300 hover:scale-[1.02] ${
        plan.bestValue 
          ? 'bg-gradient-to-b from-brand-red/50 to-transparent shadow-[0_0_40px_rgba(255,0,0,0.2)]' 
          : 'bg-white/5'
      }`}
    >
      <div className="relative h-full bg-[#111] rounded-xl p-6 flex flex-col gap-5 border border-white/10 overflow-hidden">
        {plan.bestValue && (
          <div className="absolute top-0 right-0 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-bl-xl shadow-lg">
            BEST CHOICE
          </div>
        )}
        
        {/* Header */}
        <div>
          <h3 className="text-lg font-medium text-gray-400">{plan.name}</h3>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-black text-white tracking-tight">
              {currentOption.price.toLocaleString()}
              <span className="text-2xl font-bold">원</span>
            </span>
            <span className="text-sm text-gray-600 line-through">
              {currentOption.originalPrice.toLocaleString()}원
            </span>
          </div>
          <div className="mt-1 inline-block px-2 py-0.5 rounded bg-brand-red/10 border border-brand-red/20 text-brand-red font-bold text-sm">
            {discount}% SAVE
          </div>
        </div>

        {/* Region Toggle */}
        <div className="bg-white/5 p-1 rounded-lg flex relative">
          {/* Animated Background Pill */}
          <div 
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white/10 rounded-md transition-all duration-300 ease-out ${
              region === 'INDIA' ? 'translate-x-[calc(100%+4px)]' : 'translate-x-0'
            }`}
          />
          
          <button
            onClick={() => setRegion('KOREA')}
            className={`relative flex-1 py-2 text-sm font-medium rounded-md transition-colors z-10 flex items-center justify-center gap-2 ${
              region === 'KOREA' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span>🇰🇷</span> 한국
          </button>
          <button
            onClick={() => setRegion('INDIA')}
            className={`relative flex-1 py-2 text-sm font-medium rounded-md transition-colors z-10 flex items-center justify-center gap-2 ${
              region === 'INDIA' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span>🇮🇳</span> 인도
          </button>
        </div>

        {/* Features */}
        <div className="flex-1">
          <ul className="space-y-3">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                <i className="fa-solid fa-check text-brand-red mt-1"></i>
                <span className="leading-tight">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onSelect(plan, region)}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-95 ${
            plan.bestValue
              ? 'bg-brand-red text-white hover:bg-red-600 shadow-lg shadow-red-900/30'
              : 'bg-white text-black hover:bg-gray-200'
          }`}
        >
          {region === 'KOREA' ? '한국 계정으로 시작' : '인도 계정으로 시작'}
        </button>
      </div>
    </div>
  );
};