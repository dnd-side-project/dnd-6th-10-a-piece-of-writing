export const BACKEND_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://www.pieceofwriting.kro.kr:8080'
    : 'http://www.pieceofwriting.kro.kr:8080'

export const KEY_HEADER_ACCESS_TOKEN = 'X-AUTH_TOKEN'
export const KEY_HEADER_REFRESH_TOKEN = 'X-AUTH-REFRESH_TOKEN'

export const KEY_ACCESS_TOKEN = 'apowa'
export const KEY_REFRESH_TOKEN = 'apowr'
