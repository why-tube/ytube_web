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

  // Calculate monthly price based on the current option price and plan duration
  const monthlyPrice = Math.floor(currentOption.price / plan.durationMonths);

  // Dynamic style for theme color
  const themeStyle = {
    '--theme-color': themeColor,
  } as React.CSSProperties;

  return (
    <div 
      className={`relative p-1 rounded-3xl transition-all duration-500 ${
        plan.bestValue 
          ? 'bg-gradient-to-b from-[var(--theme-color)] to-transparent shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] md:-translate-y-6 md:scale-105 z-10' 
          : 'bg-white/5 hover:scale-[1.02] hover:bg-white/10 hover:shadow-lg'
      }`}
      style={{
        ...themeStyle,
        boxShadow: plan.bestValue ? `0 25px 50px -12px ${themeColor}40` : undefined
      }}
    >
      <div className="relative h-full bg-[#111] rounded-[22px] p-6 flex flex-col gap-6 border border-white/10 overflow-hidden">
        {plan.bestValue && (
          <div 
            className="absolute top-0 right-0 text-white text-[11px] font-bold px-4 py-1.5 rounded-bl-2xl shadow-lg tracking-wide"
            style={{ backgroundColor: themeColor }}
          >
            BEST CHOICE
          </div>
        )}
        
        {/* Header */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
             <h3 className={`text-lg font-bold ${plan.bestValue ? 'text-gray-100' : 'text-gray-400'}`}>{plan.name}</h3>
             {plan.bestValue && <i className="fa-solid fa-crown text-sm" style={{ color: themeColor }}></i>}
          </div>
          
          {/* Main Price Display */}
          <div className="space-y-3">
            
            {/* Price Row: Original + Main */}
            <div className="flex items-end gap-2 flex-wrap">
              <span className="text-gray-500 line-through font-semibold text-lg decoration-2 decoration-gray-600/50 mb-1.5">
                {currentOption.originalPrice.toLocaleString()}원
              </span>
              <span className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
                {currentOption.price.toLocaleString()}
                <span className="text-2xl font-bold ml-1">원</span>
              </span>
            </div>

            {/* Badges Grid: Monthly Price & Discount (Equal Size) */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
               {/* Monthly Price Badge */}
               <div 
                className="flex flex-col items-center justify-center py-2 rounded-xl border bg-white/5 backdrop-blur-sm"
                style={{ borderColor: `${themeColor}20` }}
              >
                 <span className="text-xs text-gray-400 font-medium mb-0.5">월 환산 금액</span>
                 <span className="text-lg font-extrabold tracking-tight" style={{ color: themeColor }}>
                    {monthlyPrice.toLocaleString()}원
                 </span>
              </div>

              {/* Discount Badge */}
              <div 
                className="flex flex-col items-center justify-center py-2 rounded-xl border"
                style={{ 
                  backgroundColor: `${themeColor}10`, 
                  borderColor: `${themeColor}20`
                }}
              >
                 <span className="text-xs font-medium opacity-80 mb-0.5" style={{ color: themeColor }}>최대 할인율</span>
                 <span className="text-lg font-extrabold text-white tracking-tight">
                   {discount}% SAVE
                 </span>
              </div>
            </div>
          </div>
        </div>

        {/* Region Toggle - Only show if multiple options exist */}
        {hasMultipleOptions ? (
          <div className="bg-white/5 p-1 rounded-xl flex relative">
            {/* Animated Background Pill */}
            <div 
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white/10 rounded-lg transition-all duration-300 ease-out ${
                region === 'INDIA' ? 'translate-x-[calc(100%+4px)]' : 'translate-x-0'
              }`}
            />
            
            <button
              onClick={() => setRegion('KOREA')}
              className={`relative flex-1 py-2.5 text-sm font-bold rounded-lg transition-colors z-10 flex items-center justify-center gap-2 ${
                region === 'KOREA' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {toggleLabels.left}
            </button>
            <button
              onClick={() => setRegion('INDIA')}
              className={`relative flex-1 py-2.5 text-sm font-bold rounded-lg transition-colors z-10 flex items-center justify-center gap-2 ${
                region === 'INDIA' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {toggleLabels.right}
            </button>
          </div>
        ) : (
          // Single option badge
          <div className="flex flex-wrap gap-2">
             <span className="text-xs font-semibold text-gray-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                {currentOption.label}
             </span>
             {plan.id === 'yearly_individual' && (
               <span className="text-xs font-semibold text-gray-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                  구글 공식 제휴사
               </span>
             )}
          </div>
        )}

        {/* Divider */}
        <div className="h-px w-full bg-white/5"></div>

        {/* Features */}
        <div className="flex-1">
          <ul className="space-y-4">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                <div 
                  className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-white/5 text-[10px]"
                  style={{ color: themeColor }}
                >
                  <i className={feature.icon}></i>
                </div>
                <span className="leading-tight font-medium">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onSelect(plan, region)}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-95 text-white shadow-lg hover:brightness-110 flex items-center justify-center gap-2 group mt-auto`}
          style={{ 
            backgroundColor: themeColor,
            boxShadow: plan.bestValue ? `0 8px 25px -5px ${themeColor}66` : 'none'
          }}
        >
          {region === 'KOREA' 
            ? `${toggleLabels.left} 시작` 
            : `${toggleLabels.right} 시작`}
            <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform text-sm"></i>
        </button>
      </div>
    </div>
  );
};