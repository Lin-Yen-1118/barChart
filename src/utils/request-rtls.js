// import store from '@/store'
import axios from 'axios'

const { BASE_URL } = window.apiConfig

const service = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error),
)

service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => Promise.reject(error.response.data),
)

export default service
