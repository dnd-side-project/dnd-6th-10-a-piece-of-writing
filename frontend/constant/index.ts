export const BACKEND_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://www.pieceofwriting.kro.kr:8080'
    : 'http://www.pieceofwriting.kro.kr:8080'

export const SESSION_STORAGE_KEY_ACCESS_TOKEN = 'apowa'
export const SESSION_STORAGE_KEY_REFRESH_TOKEN = 'apowr'
