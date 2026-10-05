import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
// 전역 CSS: 공통(리셋·폰트) → 디자인 시스템(프로젝트 전체 디자인) 순서로 로드합니다.
import './assets/css/common.css'
import './assets/css/style.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
