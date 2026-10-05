import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function RootLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className={`app${isHome ? ' app--home' : ''}`}>
      <Header />
      <main className="app__main">
        <Outlet />
      </main>
      {/* The home page renders the footer inside FullPage as its last screen. */}
      {!isHome && <Footer />}
    </div>
  )
}
