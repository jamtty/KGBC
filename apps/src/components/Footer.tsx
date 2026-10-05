import { Link } from 'react-router-dom'
import logoUrl from '../assets/images/logo.svg'
import { MENU, groupEntryPath } from '../data/menu'
import { SITE } from '../data/site'

export default function Footer() {
  return (
    <footer className="ft">
      <div className="container ft__inner">
        <div className="ft__brand">
          <p className="ft__logo">
            <img className="ft__logo-img" src={logoUrl} alt={SITE.nameKo} />
          </p>
          <p className="ft__desc">{SITE.tagline}</p>
        </div>
        <nav className="ft__nav" aria-label="하단 메뉴">
          <ul>
            {MENU.map((group) => (
              <li key={group.id}>
                <Link to={groupEntryPath(group)}>{group.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container">
        <p className="ft__copy">{SITE.copyright}</p>
      </div>
    </footer>
  )
}
