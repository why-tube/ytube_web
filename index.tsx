import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { LegalPage } from './components/LegalPage'; 
import { TERMS_OF_SERVICE, PRIVACY_POLICY } from './data/legal';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// 핵심: 주소창의 경로를 가져옵니다.
const path = window.location.pathname;

const DEFAULT_THEME = '#FF0000';

root.render(
  <React.StrictMode>
    {/* 경로에 따라 보여줄 컴포넌트를 선택합니다 */}
    {path === '/terms' ? (
      <LegalPage 
        title="이용약관" 
        content={TERMS_OF_SERVICE}
        onBack={() => window.location.href = '/'}
        themeColor={DEFAULT_THEME}
      />
    ) : path === '/privacy' ? (
      <LegalPage 
        title="개인정보처리방침" 
        content={PRIVACY_POLICY}
        onBack={() => window.location.href = '/'}
        themeColor={DEFAULT_THEME}
      />
    ) : (
      <App />
    )}
  </React.StrictMode>
);