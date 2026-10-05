export type SubMenu = {
  label: string
  path: string
}

export type MenuGroup = {
  id: string
  label: string
  path: string
  children: SubMenu[]
}

export const MENU: MenuGroup[] = [
  {
    id: 'about',
    label: '회사소개',
    path: '/about',
    children: [
      { label: '소개·브랜딩', path: '/about/branding' },
      { label: '가치체계·비전', path: '/about/vision' },
      { label: '인사말·연혁', path: '/about/greeting' },
      { label: '연구소 스토리', path: '/about/lab' },
      { label: '글로벌 사업', path: '/about/global' },
    ],
  },
  {
    id: 'business',
    label: 'KGBC 사업',
    path: '/business',
    children: [
      { label: 'KGBC0001 종모우', path: '/business/sire' },
      { label: '데이터', path: '/business/data' },
      { label: '구입처', path: '/business/store' },
    ],
  },
  {
    id: 'farm',
    label: '설국농장',
    path: '/farm',
    children: [
      { label: '소개·브랜딩', path: '/farm/branding' },
      { label: '설국한우 JYG', path: '/farm/jyg' },
      { label: '설국농장 수정란', path: '/farm/embryo' },
      { label: '설국후우', path: '/farm/huwoo' },
    ],
  },
  {
    id: 'union',
    label: '한우영농조합',
    path: '/union',
    children: [{ label: '소개', path: '/union/about' }],
  },
  {
    id: 'location',
    label: '찾아오시는 길',
    path: '/location',
    children: [{ label: '주소·연락처', path: '/location/contact' }],
  },
]

/** GNB·푸터·브래드크럼에서 그룹을 가리킬 때 이동할 경로 = LNB 첫 번째 페이지 */
export function groupEntryPath(group: MenuGroup): string {
  return group.children[0]?.path ?? group.path
}

export type PageMeta = {
  group: string
  groupPath: string
  label: string
  path: string
}

/** Every route path (menu title itself + its sub pages) with breadcrumb info. */
export const PAGES: PageMeta[] = [
  ...MENU.map((group) => ({
    group: group.label,
    groupPath: group.path,
    label: group.label,
    path: group.path,
  })),
  ...MENU.flatMap((group) =>
    group.children.map((child) => ({
      group: group.label,
      groupPath: group.path,
      label: child.label,
      path: child.path,
    })),
  ),
]

export function findPage(pathname: string): PageMeta | undefined {
  return PAGES.find((page) => page.path === pathname)
}
