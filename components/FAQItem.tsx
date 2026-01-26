import React, { useState, useRef } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
  themeColor: string;
}

export const FAQItem: React.FC<FAQItemProps> = ({ question, answer, themeColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-white/5 last:border-none">
      <button
        className="w-full py-5 flex justify-between items-center text-left group bg-transparent hover:bg-white/5 px-4 -mx-4 rounded-lg transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span 
          className={`font-medium text-base transition-colors ${isOpen ? '' : 'text-gray-200 group-hover:text-white'}`}
          style={{ color: isOpen ? themeColor : undefined }}
        >
          <span className="mr-2" style={{ color: themeColor }}>Q.</span>{question}
        </span>
        <div 
          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${isOpen ? 'text-white rotate-180' : 'bg-white/5 text-gray-500'}`}
          style={{ backgroundColor: isOpen ? themeColor : undefined }}
        >
            <i className="fa-solid fa-chevron-down text-[10px]"></i>
        </div>
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight: isOpen ? contentRef.current?.scrollHeight : 0 }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div className="pb-5 px-4 text-sm text-gray-400 leading-relaxed">
          <p className="bg-white/5 p-4 rounded-lg border border-white/5">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};