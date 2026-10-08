import type { ComponentType } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MENU, findPage } from '../data/menu'
import { ARCHIVE_PATH, NOTICE_PATH } from '../data/promo'
import AboutBranding from './about/Branding'
import BusinessSire from './business/Sire'
import FarmBranding from './farm/Branding'
import LocationContact from './location/Contact'
import ArchiveDetail from './promo/ArchiveDetail'
import NoticeDetail from './promo/NoticeDetail'
import PromoArchive from './promo/Archive'
import PromoNotice from './promo/Notice'
import UnionAbout from './union/About'

/**
 * 경로별 본문 컴포넌트.
 * 페이지 파일은 GNB 그룹(id) 이름의 폴더에 넣습니다(`pages/about`, `pages/business` …).
 * 여기에 없는 경로는 "콘텐츠 준비 중" 안내를 보여줍니다.
 */
const SUB_CONTENT: Record<string, ComponentType> = {
  '/about/branding': AboutBranding,
  '/business/sire': BusinessSire,
  '/farm/branding': FarmBranding,
  '/location/contact': LocationContact,
  '/promo/notice': PromoNotice,
  '/promo/archive': PromoArchive,
  '/union/about': UnionAbout,
}

/**
 * 목록 페이지에 딸린 **상세 페이지**.
 * `/promo/notice/3` 처럼 목록 경로 뒤에 번호가 붙으면,
 * 배너·LNB 는 목록(`base`) 기준으로 그리고 본문만 상세 컴포넌트로 바꿉니다.
 */
const DETAIL_CONTENT: { base: string; content: ComponentType }[] = [
  { base: NOTICE_PATH, content: NoticeDetail },
  { base: ARCHIVE_PATH, content: ArchiveDetail },
]

/** Sub page chrome (banner + LNB) with per-route body content. */
export default function SubPage() {
  const { pathname } = useLocation()
  /** 상세 경로면 목록 경로를 기준으로 배너·LNB·본문을 고릅니다(`/promo/notice/3` → `/promo/notice`). */
  const detail = DETAIL_CONTENT.find((entry) => pathname.startsWith(`${entry.base}/`))
  const basePath = detail ? detail.base : pathname
  const page = findPage(basePath)
  const group = MENU.find((item) => item.path === page?.groupPath)
  // LNB = 해당 그룹의 하위 페이지 목록만. GNB 그룹 메뉴(그룹 랜딩)는 앞에 넣지 않습니다.
  const lnbItems = group?.children ?? []
  const Content = detail ? detail.content : SUB_CONTENT[pathname]

  return (
    <div className="sub">
      {/*
        서브비주얼(배너 + LNB)은 한 덩어리로 화면 상단에 고정되고,
        아래 본문(.sub__content)이 그 위를 덮으며 스크롤됩니다.
      */}
      <div className={`sub-visual sub-visual--${group?.id ?? 'default'}`}>
        {/* 배너 사진 + 그룹명 */}
        <div className="sub-visual__hero">
          <div className="container">
            <h2 className="sub-visual__title">{page?.group ?? 'KGBC'}</h2>
          </div>
        </div>

        {/* LNB(서브메뉴) — 배너와 함께 고정됩니다. */}
        <div className="lnb-wrap">
          <div className="container">
            <nav className="lnb" aria-label={group ? `${group.label} 서브메뉴` : '서브메뉴'}>
              <ul>
                {lnbItems.map((item) => {
                  // 상세 페이지(/promo/notice/3)에서도 목록 탭이 활성으로 남도록 목록 경로와 비교합니다.
                  const isActive = item.path === basePath
                  return (
                    <li key={item.path} className={isActive ? 'is-active' : undefined}>
                      <Link to={item.path} aria-current={isActive ? 'page' : undefined}>
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className="container sub__content">
        {Content ? (
          <Content />
        ) : (
          <div className="sub__body">
            <p className="sub__empty">콘텐츠 준비 중입니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}
