import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { LegalPage } from './components/LegalPage'; // 약관 컴포넌트 추가

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// 핵심: 주소창의 경로를 가져옵니다.
const path = window.location.pathname;

root.render(
  <React.StrictMode>
    {/* 경로에 따라 보여줄 컴포넌트를 선택합니다 */}
    {path === '/terms' ? (
      <LegalPage type="terms" />
    ) : path === '/privacy' ? (
      <LegalPage type="privacy" />
    ) : (
      <App />
    )}
  </React.StrictMode>
);