import axios from 'axios'
import { BACKEND_URL } from '@/constant'
import * as https from 'https'

// 백엔드로 보내는 axios
const baxios = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  timeout: 5000,
  headers: {},
  httpsAgent: new https.Agent({
    keepAlive: true,
    rejectUnauthorized: false,
  }),
})

baxios.interceptors.request.use(
  function (config) {
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
