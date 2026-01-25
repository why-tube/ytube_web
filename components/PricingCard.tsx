import React from 'react';
import { Plan } from '../types';

interface PricingCardProps {
  plan: Plan;
  onSelect: (plan: Plan) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelect }) => {
  const isPriceNumber = typeof plan.price === 'number';
  
  // Calculate discount only if price is a number
  const discount = isPriceNumber
    ? Math.round(((plan.originalPrice - (plan.price as number)) / plan.originalPrice) * 100)
    : null;

  const priceDisplay = isPriceNumber 
    ? `${(plan.price as number).toLocaleString()}원` 
    : plan.price;

  return (
    <div 
      className={`relative p-6 rounded-2xl border ${
        plan.bestValue 
          ? 'border-brand-red bg-gradient-to-b from-[#1a1a1a] to-black shadow-[0_0_20px_rgba(255,0,0,0.3)]' 
          : 'border-white/10 bg-white/5 backdrop-blur-md'
      } flex flex-col gap-4 transform transition-transform hover:scale-105 duration-300`}
    >
      {plan.bestValue && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          추천 상품
        </div>
      )}
      
      <div>
        <h3 className="text-xl font-bold text-gray-200">{plan.name}</h3>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-3xl font-black text-white">{priceDisplay}</span>
          <span className="text-sm text-gray-500 line-through">{plan.originalPrice.toLocaleString()}원</span>
        </div>
        {discount !== null && (
          <div className="mt-1 text-brand-red font-semibold text-sm">
            {discount}% 할인
          </div>
        )}
      </div>

      <ul className="space-y-3 my-2">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
            <i className="fa-solid fa-check text-brand-red"></i>
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(plan)}
        className={`w-full py-3 rounded-xl font-bold transition-all ${
          plan.bestValue
            ? 'bg-brand-red text-white hover:bg-red-600 shadow-lg shadow-red-900/20'
            : 'bg-white text-black hover:bg-gray-200'
        }`}
      >
        선택하기
      </button>
    </div>
  );
};