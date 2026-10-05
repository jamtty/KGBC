import { Route, Routes } from 'react-router-dom'
import { MENU } from './data/menu'
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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
