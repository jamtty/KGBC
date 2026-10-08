import dataImg from '../assets/images/data.jpg'
import farmJygImg from '../assets/images/farm-jyg.jpg'
import sireImg from '../assets/images/sire.jpg'
import unionImg from '../assets/images/union-hanwoo.jpg'

/**
 * 홍보자료(공지사항 · 자료실) 목록.
 * 서브페이지(`pages/promo/Notice.tsx` · `Archive.tsx`)와 메인 마지막 섹션(`pages/Home.tsx`)이
 * **같은 목록을 함께** 씁니다. 실제 내용으로 바꿀 때는 이 파일만 고치면 두 곳 모두 반영됩니다.
 *
 * ⚠️ 지금 들어 있는 내용은 화면 확인용 **더미 3건씩**입니다.
 */

/** 게시판 목록 경로 — 상세 주소도 여기서 만듭니다(`/promo/notice/3`). */
export const NOTICE_PATH = '/promo/notice'
export const ARCHIVE_PATH = '/promo/archive'

/** 공지사항 상세 경로 */
export const noticePath = (id: number) => `${NOTICE_PATH}/${id}`

/** 자료실 상세 경로 */
export const archivePath = (id: number) => `${ARCHIVE_PATH}/${id}`

/** 공지사항 한 건. 최신 글을 배열 **맨 위**에 넣으면 그대로 위에서부터 표시됩니다. */
export type Notice = {
  /** 목록 왼쪽에 표시할 번호 */
  id: number
  title: string
  /** 등록일 — 'YYYY.MM.DD' 형식으로 적으면 그대로 표시됩니다. */
  date: string
  /** 내용 — 줄바꿈(빈 줄 포함)은 그대로 살아납니다. */
  body: string
}

/** 공지사항 — 더미 3건 (최신 → 과거) */
export const NOTICES: Notice[] = [
  {
    id: 3,
    title: 'KGBC0001 종모우 유전능력 검정 결과 공개',
    date: '2026.10.06',
    body: `농장형 연구소에서 직접 사양하며 확보한 현장 데이터를 바탕으로 KGBC0001 종모우의 유전능력 검정 결과를 공개합니다.

도체중·등지방두께·근내지방도 등 주요 형질의 육종가와 정확도를 정리했으며, 자세한 내용은 'KGBC 사업 > KGBC0001 종모우' 페이지에서도 확인하실 수 있습니다.`,
  },
  {
    id: 2,
    title: '2026년 하반기 정액·수정란 공급 일정 안내',
    date: '2026.09.22',
    body: `2026년 하반기 정액·수정란 공급 일정을 안내드립니다.

농가별 신청 물량과 지역 배송 일정에 따라 순차 공급되며, 구체적인 일정은 '정액·수정란 구입처' 페이지를 참고하시기 바랍니다.`,
  },
  {
    id: 1,
    title: '홈페이지 리뉴얼 오픈 안내',
    date: '2026.09.08',
    body: `KGBC 홈페이지가 새로워졌습니다.

사업 소개와 유전능력 데이터, 정액·수정란 구입 안내를 한곳에서 보실 수 있도록 메뉴를 정리했습니다. 이용 중 불편한 점은 문의처로 알려주시면 반영하겠습니다.`,
  },
]

/**
 * 자료실 한 건.
 * 첨부 파일은 `apps/public/files/` 폴더에 올리고 **파일명만** 적으면 다운로드 링크가 됩니다.
 * (예: `apps/public/files/2026-회사소개서.pdf` → `file: '2026-회사소개서.pdf'`)
 */
export type ArchiveItem = {
  /** 썸네일 아래에 표시할 번호 */
  id: number
  title: string
  /** `apps/public/files/` 안의 파일명 */
  file: string
  /** 표시용 용량 (선택) — 예: '2.4MB' */
  size?: string
  /** 등록일 — 'YYYY.MM.DD' */
  date: string
  /** 갤러리 썸네일 이미지 (지금은 KGBC 실제 촬영본을 임시로 씁니다) */
  thumb: string
  /** 상세 페이지에 보여 줄 설명 (선택) */
  desc?: string
}

/** 자료실 — 더미 4건 (최신 → 과거). 썸네일은 `src/assets/images/` 의 실제 촬영본입니다. */
export const ARCHIVE_ITEMS: ArchiveItem[] = [
  {
    id: 4,
    title: 'KGBC 브랜드 이미지 자료',
    file: 'kgbc-brand-assets.zip',
    size: '8.6MB',
    date: '2026.10.08',
    thumb: unionImg,
    desc: '로고와 브랜드 컴러, 사업 소개 이미지를 묶은 압축 파일입니다. 인쇄물·보도자료 등에 사용하실 수 있습니다.',
  },
  {
    id: 3,
    title: 'KGBC 회사 소개서 (2026)',
    file: 'kgbc-company-profile.pdf',
    size: '2.4MB',
    date: '2026.10.02',
    thumb: dataImg,
    desc: 'KGBC 의 사업 영역과 연구 현황, 주요 종모우 정보를 한 장에 정리한 회사 소개서입니다.',
  },
  {
    id: 2,
    title: '2026 우수 종모우 카탈로그',
    file: '2026-sire-catalog.pdf',
    size: '5.1MB',
    date: '2026.09.18',
    thumb: sireImg,
    desc: '혈통과 유전능력을 검정한 대표 종모우의 능력치를 정리한 카탈로그입니다.',
  },
  {
    id: 1,
    title: '설국농장 브로슈어',
    file: 'seolguk-brochure.pdf',
    size: '3.2MB',
    date: '2026.09.05',
    thumb: farmJygImg,
    desc: '해발 500m 청정 고지대에서 우수 혈통을 키우는 설국농장의 사육·개량 체계를 소개합니다.',
  },
]

/** `public/files/` 아래 파일을 가리키는 URL (배포 경로가 바뀌어도 안전하도록 BASE_URL 을 씁니다) */
export const fileUrl = (name: string) => `${import.meta.env.BASE_URL}files/${encodeURIComponent(name)}`

/** 파일명에서 확장자만 뽑아 배지에 씁니다. (예: `kgbc-intro.pdf` → `PDF`) */
export const fileExt = (name: string) => (name.split('.').pop() ?? '').toUpperCase()
