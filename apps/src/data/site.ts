import mainMovie from '../assets/images/main_movie.mp4'

export const SITE = {
  name: 'KGBC',
  /** 정식 명칭 — 히어로 eyebrow 등에 사용합니다. */
  nameKo: '한국유전자종축센터',
  tagline: '종축개량으로 풍요로운 미래를',
  copyright: `© ${new Date().getFullYear()} KGBC. All rights reserved.`,
}

/**
 * 메인 비주얼(히어로) 배경 동영상 — `src/assets/images/main_movie.mp4`(KGBC 홍보 영상, 1280×720, 약 58초).
 * `src/assets` 의 파일이라 빌드하면 `dist/assets/main_movie-<해시>.mp4` 로 나오고,
 * 해시가 붙으므로 `.htaccess` 의 1년 immutable 캐시를 그대로 받습니다(교체 시 자동으로 새 URL).
 * ⚠️ 영상에 자막·자막성 문구가 포함되어 있어, 히어로의 흰 문구와 겹쳐 보일 수 있습니다.
 *    특정 구간만 반복시키거나(예: 0~12초) 자막 없는 편집본을 쓰려면 이 파일을 교체하면 됩니다.
 * 다른 파일로 바꿀 때도 같은 폴더에 넣고 아래 import 경로만 바꾸면 됩니다.
 */
export const HERO_VIDEO = mainMovie
