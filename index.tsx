import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { LegalPage } from './components/LegalPage'; // 약관 페이지 컴포넌트 임포트

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// 브라우저 주소창의 경로를 확인합니다 (예: /terms)
const path = window.location.pathname;

root.render(
  <React.StrictMode>
    {/* 주소가 /terms 이면 약관 페이지를, 아니면 메인 앱을 보여줍니다 */}
    {path === '/terms' ? (
      <LegalPage type="terms" /> 
    ) : (
      <App />
    )}
  </React.StrictMode>
);