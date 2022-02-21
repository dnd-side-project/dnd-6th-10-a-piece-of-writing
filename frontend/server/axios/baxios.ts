import axios from 'axios'
import * as https from 'https'

import {
  BACKEND_URL,
  KEY_ACCESS_TOKEN,
  KEY_HEADER_ACCESS_TOKEN,
  KEY_HEADER_REFRESH_TOKEN,
  KEY_REFRESH_TOKEN,
} from '@/constant'

// 백엔드로 보내는 axios
const baxios = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  httpsAgent: new https.Agent({
    keepAlive: true,
    rejectUnauthorized: false,
  }),
})

baxios.interceptors.request.use(
  function (config) {
    if (config?.headers?.[KEY_HEADER_ACCESS_TOKEN]) return config
    const accessToken = window.sessionStorage.getItem(KEY_ACCESS_TOKEN)
    const refreshToken = window.sessionStorage.getItem(KEY_REFRESH_TOKEN)
    if (config.headers) config.headers[KEY_HEADER_ACCESS_TOKEN] = accessToken ?? ''
    if (config.headers) config.headers[KEY_HEADER_REFRESH_TOKEN] = refreshToken ?? ''
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

baxios.interceptors.response.use(
  function (config) {
    return config
  },
  function (error) {
    if (error.response && error.response.status === 403) {
      alert('로그인이 필요합니다!')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default baxios

export type RESPONSE_TYPE<T = any> = {
  success: boolean
  message: string
  data?: T
}
