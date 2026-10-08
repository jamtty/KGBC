/**
 * KGBC 파비콘 래스터 생성기 (favicon.ico / apple-touch-icon.png)
 * ------------------------------------------------------------------
 * public/favicon.svg 와 동일한 도형(브랜드 레드 라운드 사각형 + 흰색 K)을
 * 코드로 다시 그려서 래스터(PNG/ICO)로 굽습니다. 외부 라이브러리 없이
 * Node 내장 모듈(zlib)만 사용합니다.
 *
 *   node scripts/make-favicon.cjs public
 *
 * favicon.svg 의 좌표/색을 바꾸면 이 파일의 상수도 같이 바꾸고 다시 실행하세요.
 */
'use strict'

const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

const outDir = process.argv[2]
if (!outDir) {
  console.error('usage: node scripts/make-favicon.cjs <output-dir>')
  process.exit(1)
}

/* ---------------------------------- 도형 ---------------------------------- */
// 디자인 좌표계(0~64) — favicon.svg 와 동일
const DESIGN = 64
const CORNER_RADIUS = 14
const STROKE = 7.5
const HALF = STROKE / 2
const STROKES = [
  [
    [21.5, 16],
    [21.5, 48],
  ],
  [
    [24, 33],
    [43, 17],
  ],
  [
    [25.5, 31],
    [43, 47],
  ],
]
const BG_TOP = [0xb0, 0x0d, 0x16]
const BG_BOTTOM = [0x8a, 0x07, 0x10]
const FG = [0xff, 0xff, 0xff]

const lerp = (a, b, t) => a + (b - a) * t
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)

function insideRoundedRect(x, y, w, h, r) {
  const cx = Math.abs(x - w / 2)
  const cy = Math.abs(y - h / 2)
  if (cx > w / 2 || cy > h / 2) return false
  if (r <= 0) return true
  const dx = cx - (w / 2 - r)
  const dy = cy - (h / 2 - r)
  if (dx <= 0 || dy <= 0) return true
  return dx * dx + dy * dy <= r * r
}

function distToSegment(x, y, a, b) {
  const vx = b[0] - a[0]
  const vy = b[1] - a[1]
  const wx = x - a[0]
  const wy = y - a[1]
  const len2 = vx * vx + vy * vy
  const t = len2 === 0 ? 0 : clamp01((wx * vx + wy * vy) / len2)
  const px = a[0] + t * vx
  const py = a[1] + t * vy
  return Math.hypot(x - px, y - py)
}

/* --------------------------------- 렌더링 --------------------------------- */
const SS = 4 // 픽셀당 4x4 슈퍼샘플링(안티에일리어싱)

function render(size, cornerRadius) {
  const scale = size / DESIGN
  const radius = cornerRadius * (size / DESIGN)
  const buf = Buffer.alloc(size * size * 4)

  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      let bgHits = 0
      let fgHits = 0

      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const dx = (px + (sx + 0.5) / SS) / scale
          const dy = (py + (sy + 0.5) / SS) / scale
          if (insideRoundedRect(dx, dy, DESIGN, DESIGN, cornerRadius)) bgHits++
          for (const s of STROKES) {
            if (distToSegment(dx, dy, s[0], s[1]) <= HALF) {
              fgHits++
              break
            }
          }
        }
      }

      const total = SS * SS
      const bgCov = bgHits / total
      const fgCov = Math.min(fgHits / total, bgCov)

      const t = (py + 0.5) / size
      const i = (py * size + px) * 4
      for (let c = 0; c < 3; c++) {
        const base = lerp(BG_TOP[c], BG_BOTTOM[c], t)
        buf[i + c] = Math.round(lerp(base, FG[c], fgCov))
      }
      buf[i + 3] = Math.round(bgCov * 255)
    }
  }
  return buf
}

/* --------------------------------- PNG/ICO -------------------------------- */
const CRC_TABLE = (() => {
  const table = new Int32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c
  }
  return table
})()

function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function pngChunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body), 0)
  return Buffer.concat([len, body, crc])
}

function encodePng(size, rgba) {
  const stride = size * 4
  const raw = Buffer.alloc((stride + 1) * size)
  for (let y = 0; y < size; y++) {
    raw[y * (stride + 1)] = 0 // filter: none
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride)
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    pngChunk('IEND', Buffer.alloc(0)),
  ])
}

function buildIco(entries) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2) // 1 = icon
  header.writeUInt16LE(entries.length, 4)

  const dir = Buffer.alloc(16 * entries.length)
  const blobs = []
  let offset = 6 + 16 * entries.length

  entries.forEach((entry, index) => {
    const p = index * 16
    dir[p] = entry.size >= 256 ? 0 : entry.size
    dir[p + 1] = entry.size >= 256 ? 0 : entry.size
    dir.writeUInt16LE(1, p + 4) // color planes
    dir.writeUInt16LE(32, p + 6) // bits per pixel
    dir.writeUInt32LE(entry.png.length, p + 8)
    dir.writeUInt32LE(offset, p + 12)
    offset += entry.png.length
    blobs.push(entry.png)
  })

  return Buffer.concat([header, dir, ...blobs])
}

/* ---------------------------------- 출력 ---------------------------------- */
const targets = [
  { file: 'favicon.ico', sizes: [16, 32, 48], cornerRadius: CORNER_RADIUS },
  // iOS 홈 화면 아이콘은 OS가 모서리를 깎으므로 정사각(모서리 0)으로 굽습니다.
  { file: 'apple-touch-icon.png', sizes: [180], cornerRadius: 0 },
]

for (const target of targets) {
  const outPath = path.join(outDir, target.file)
  if (target.file.endsWith('.ico')) {
    fs.writeFileSync(
      outPath,
      buildIco(
        target.sizes.map((size) => ({ size, png: encodePng(size, render(size, target.cornerRadius)) })),
      ),
    )
  } else {
    const size = target.sizes[0]
    fs.writeFileSync(outPath, encodePng(size, render(size, target.cornerRadius)))
  }
  console.log('written: ' + outPath)
}
