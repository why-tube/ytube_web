import React, { useState, useEffect } from 'react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  themeColor: string;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, onConfirm, themeColor }) => {
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false
  });

  // Reset agreements when modal opens
  useEffect(() => {
    if (isOpen) {
      setAgreements({ terms: false, privacy: false });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const allChecked = agreements.terms && agreements.privacy;

  const handleAllCheck = () => {
    const newState = !allChecked;
    setAgreements({ terms: newState, privacy: newState });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[#1a1a1a] rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-white/10 flex flex-col transform transition-all scale-100">
        <div className="p-6 pb-4">
          <h3 className="text-xl font-bold text-white mb-2">약관 동의</h3>
          <p className="text-gray-400 text-sm break-keep">
            원활한 상담 및 서비스 이용을 위해 아래 필수 약관에 동의해주세요.
          </p>
        </div>

        <div className="px-6 space-y-3 mb-6">
          {/* All Agree Button */}
          <div 
            onClick={handleAllCheck}
            className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
          >
            <div 
              className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${allChecked ? 'border-transparent' : 'border-gray-500'}`}
              style={{ backgroundColor: allChecked ? themeColor : 'transparent' }}
            >
              {allChecked && <i className="fa-solid fa-check text-white text-xs"></i>}
            </div>
            <span className="font-bold text-white text-sm">약관 전체 동의</span>
          </div>
          
          <div className="h-px bg-white/10 my-2" />

          {/* Individual Checks */}
          <div className="space-y-3 pl-1">
             <div className="flex items-center justify-between">
                <div 
                  className="flex items-center gap-3 cursor-pointer group flex-1"
                  onClick={() => setAgreements(prev => ({ ...prev, terms: !prev.terms }))}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${agreements.terms ? 'border-transparent' : 'border-gray-600'}`}
                     style={{ backgroundColor: agreements.terms ? themeColor : 'transparent' }}
                  >
                     {agreements.terms && <i className="fa-solid fa-check text-white text-[10px]"></i>}
                  </div>
                  <span className="text-gray-300 text-sm group-hover:text-white transition-colors">[필수] 이용약관 동의</span>
                </div>
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-xs underline hover:text-gray-300 p-1">보기</a>
             </div>

             <div className="flex items-center justify-between">
                <div 
                  className="flex items-center gap-3 cursor-pointer group flex-1"
                  onClick={() => setAgreements(prev => ({ ...prev, privacy: !prev.privacy }))}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${agreements.privacy ? 'border-transparent' : 'border-gray-600'}`}
                     style={{ backgroundColor: agreements.privacy ? themeColor : 'transparent' }}
                  >
                     {agreements.privacy && <i className="fa-solid fa-check text-white text-[10px]"></i>}
                  </div>
                  <span className="text-gray-300 text-sm group-hover:text-white transition-colors">[필수] 개인정보 수집 및 이용</span>
                </div>
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-xs underline hover:text-gray-300 p-1">보기</a>
             </div>
          </div>
        </div>

        <div className="p-4 bg-white/5 flex gap-3 border-t border-white/5">
          <button 
            onClick={onClose}
            className="flex-1 py-3 rounded-xl font-bold text-gray-400 bg-transparent hover:bg-white/5 transition-colors text-sm"
          >
            취소
          </button>
          <button 
            onClick={onConfirm}
            disabled={!allChecked}
            className={`flex-1 py-3 rounded-xl font-bold text-white transition-all text-sm shadow-lg ${!allChecked ? 'opacity-50 cursor-not-allowed bg-gray-700' : 'hover:brightness-110 active:scale-95'}`}
            style={{ backgroundColor: allChecked ? themeColor : undefined }}
          >
            동의하고 상담하기
          </button>
        </div>
      </div>
    </div>
  );
};