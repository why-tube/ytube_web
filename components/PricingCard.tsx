import React, { useState } from 'react';
import { Plan, Region } from '../types';

interface PricingCardProps {
  plan: Plan;
  onSelect: (plan: Plan, region: Region) => void;
  themeColor: string;
  toggleLabels: {
    left: string;
    right: string;
  };
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelect, themeColor, toggleLabels }) => {
  const [region, setRegion] = useState<Region>('KOREA');
  
  // If INDIA option doesn't exist, we fallback to KOREA (Family/Primary) and don't allow toggling
  const hasMultipleOptions = !!plan.options.INDIA;
  const currentOption = plan.options[region] || plan.options.KOREA;
  
  const discount = Math.round(
    ((currentOption.originalPrice - currentOption.price) / currentOption.originalPrice) * 100
  );

  // Dynamic style for theme color
  const themeStyle = {
    '--theme-color': themeColor,
  } as React.CSSProperties;

  return (
    <div 
      className={`relative p-1 rounded-2xl transition-all duration-500 ${
        plan.bestValue 
          ? 'bg-gradient-to-b from-[var(--theme-color)] to-transparent shadow-2xl md:-translate-y-6 md:scale-105 z-10' 
          : 'bg-white/5 hover:scale-[1.02] hover:bg-white/10 hover:shadow-lg'
      }`}
      style={{
        ...themeStyle,
        boxShadow: plan.bestValue ? `0 25px 50px -12px ${themeColor}66` : undefined
      }}
    >
      <div className="relative h-full bg-[#111] rounded-xl p-6 flex flex-col gap-5 border border-white/10 overflow-hidden">
        {plan.bestValue && (
          <div 
            className="absolute top-0 right-0 text-white text-xs font-bold px-3 py-1 rounded-bl-xl shadow-lg"
            style={{ backgroundColor: themeColor }}
          >
            BEST CHOICE
          </div>
        )}
        
        {/* Header */}
        <div>
          <div className="flex justify-between items-start">
             <h3 className={`text-lg font-medium ${plan.bestValue ? 'text-white' : 'text-gray-400'}`}>{plan.name}</h3>
             {plan.bestValue && <i className="fa-solid fa-crown" style={{ color: themeColor }}></i>}
          </div>
          
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-black text-white tracking-tight">
              {currentOption.price.toLocaleString()}
              <span className="text-2xl font-bold">원</span>
            </span>
            <span className="text-sm text-gray-600 line-through">
              {currentOption.originalPrice.toLocaleString()}원
            </span>
          </div>
          <div 
            className="mt-2 inline-block px-2 py-0.5 rounded bg-white/10 border border-white/20 font-bold text-sm"
            style={{ color: themeColor, borderColor: themeColor }}
          >
            {discount}% SAVE
          </div>
        </div>

        {/* Region Toggle - Only show if multiple options exist */}
        {hasMultipleOptions ? (
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
              {toggleLabels.left}
            </button>
            <button
              onClick={() => setRegion('INDIA')}
              className={`relative flex-1 py-2 text-sm font-medium rounded-md transition-colors z-10 flex items-center justify-center gap-2 ${
                region === 'INDIA' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {toggleLabels.right}
            </button>
          </div>
        ) : (
          // Single option badge
          <div className="flex">
             <span className="text-sm font-medium text-white bg-white/10 px-3 py-1 rounded-md border border-white/5">
                {currentOption.label}
             </span>
          </div>
        )}

        {/* Features */}
        <div className="flex-1 py-2">
          <ul className="space-y-4">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                <div 
                  className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-white/5"
                  style={{ color: themeColor }}
                >
                  <i className="fa-solid fa-check text-[10px]"></i>
                </div>
                <span className="leading-tight">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onSelect(plan, region)}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-95 text-white shadow-lg hover:brightness-110 flex items-center justify-center gap-2 group`}
          style={{ 
            backgroundColor: themeColor,
            boxShadow: plan.bestValue ? `0 10px 30px -5px ${themeColor}80` : 'none'
          }}
        >
          {region === 'KOREA' 
            ? `${toggleLabels.left}로 시작` 
            : `${toggleLabels.right}로 시작`}
            <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
        </button>
      </div>
    </div>
  );
};