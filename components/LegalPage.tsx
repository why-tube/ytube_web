import React, { useEffect, useMemo } from 'react';

interface LegalPageProps {
  title: string;
  content: string;
  onBack: () => void;
  themeColor: string;
}

export const LegalPage: React.FC<LegalPageProps> = ({ title, content, onBack, themeColor }) => {
  // Scroll to top when mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Parse text to apply formatting (Headers, Lists, Paragraphs)
  const formattedContent = useMemo(() => {
    return content.split('\n').map((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={index} className="h-4" />; // Spacer for empty lines

      // 1. Check for Section Headers (e.g., "제1조", "1.", "[부칙]")
      const isArticleHeader = /^제\s*\d+\s*조/.test(trimmed);
      const isNumHeader = /^\d+\.\s/.test(trimmed); // "1. "
      const isBracketHeader = /^\[.*?\]/.test(trimmed);
      const isMainTitle = trimmed.includes("서비스 이용약관") || trimmed.includes("개인정보처리방침");

      if (isMainTitle) {
        return (
          <h2 key={index} className="text-2xl font-black text-white mt-2 mb-6 text-center border-b border-white/10 pb-4">
            {trimmed}
          </h2>
        );
      }

      if (isArticleHeader || isNumHeader || isBracketHeader) {
        return (
          <h3 key={index} className="text-white font-bold text-lg mt-8 mb-3 flex items-center gap-2">
            {trimmed}
          </h3>
        );
      }
      
      // 2. Check for List Items (starts with "- " or "•")
      if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
        return (
          <div key={index} className="flex gap-3 mb-2 pl-2">
            <span className="text-gray-500 mt-1.5 w-1 h-1 rounded-full bg-gray-500 shrink-0 block" />
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              {trimmed.replace(/^[-•]\s*/, '')}
            </p>
          </div>
        );
      }

      // 3. Highlight specific key-value pairs (e.g., "Label: Value")
      if (trimmed.includes(':') && trimmed.length < 100 && !trimmed.endsWith('.')) {
         const parts = trimmed.split(':');
         if (parts.length === 2) {
             return (
                 <p key={index} className="text-gray-300 text-sm md:text-base leading-relaxed mb-1 pl-1">
                     <span className="text-gray-400 font-semibold mr-2">{parts[0]}:</span>
                     {parts[1]}
                 </p>
             )
         }
      }

      // 4. Normal Paragraph
      return (
        <p key={index} className="text-gray-400 text-sm md:text-base leading-relaxed mb-2 pl-1 break-keep">
          {trimmed}
        </p>
      );
    });
  }, [content]);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:text-white selection:bg-[var(--theme-color)]"
         style={{ '--theme-color': themeColor } as React.CSSProperties}>
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex items-center bg-black/80 backdrop-blur-md border-b border-white/10">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
            <i className="fa-solid fa-arrow-left text-sm"></i>
          </div>
          <span className="font-medium text-sm">돌아가기</span>
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 font-bold text-lg">{title}</h1>
      </nav>

      {/* Content */}
      <main className="pt-24 pb-20 px-4 md:px-6 max-w-3xl mx-auto">
        <div className="bg-[#111] rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Decorative background blur */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--theme-color)] opacity-5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 flex flex-col">
            {formattedContent}
          </div>
        </div>
      </main>

      {/* Footer Simple */}
      <footer className="py-10 text-center text-gray-600 text-xs">
        <p>© 2025 와이튜브. All rights reserved.</p>
      </footer>
    </div>
  );
};