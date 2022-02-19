import axios from 'axios'
import * as https from 'https'

import { BACKEND_URL, SESSION_STORAGE_KEY_ACCESS_TOKEN, SESSION_STORAGE_KEY_REFRESH_TOKEN } from '@/constant'

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
    const accessToken = window.sessionStorage.getItem(SESSION_STORAGE_KEY_ACCESS_TOKEN)
    const refreshToken = window.sessionStorage.getItem(SESSION_STORAGE_KEY_REFRESH_TOKEN)
    if (config.headers) config.headers['X-AUTH_TOKEN'] = accessToken ?? ''
    if (config.headers) config.headers['X-AUTH-REFRESH_TOKEN'] = refreshToken ?? ''
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
