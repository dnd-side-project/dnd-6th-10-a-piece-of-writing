import axios from 'axios'

// 백엔드로 보내는 axios
const baxios = axios.create({
  baseURL: 'https://www.pieceofwriting.kro.kr:8080/api/v1/',
  timeout: 5000,
  headers: {},
})

baxios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

export default baxios
