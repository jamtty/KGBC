import { Route, Routes } from 'react-router-dom'
import { MENU } from './data/menu'
import { ARCHIVE_PATH, NOTICE_PATH } from './data/promo'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import SubPage from './pages/SubPage'

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        {MENU.map((group) => (
          <Route key={group.path} path={group.path} element={<SubPage />} />
        ))}
        {MENU.flatMap((group) =>
          group.children.map((child) => <Route key={child.path} path={child.path} element={<SubPage />} />),
        )}
        {/* 게시판 상세 — 목록 경로 뒤에 번호가 붙습니다. (`/promo/notice/3`)
            배너·LNB 와 본문 선택은 SubPage 가 목록 경로를 기준으로 처리합니다. */}
        <Route path={`${NOTICE_PATH}/:id`} element={<SubPage />} />
        <Route path={`${ARCHIVE_PATH}/:id`} element={<SubPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

