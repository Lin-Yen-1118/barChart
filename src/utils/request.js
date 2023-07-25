import axios from 'axios'

// create an axios instance
// 集中設定 Request Config
// 支援攔截器，可在 then/catch 前做額外處理
// 封裝 API 易於管理
// baseURL是你API的主要Domain，之後發請求時只要填相對路徑就可以了
// 官方網站: https://github.com/axios/axios#request-config
const service = axios.create({
  baseURL: window.apiConfig.baseURL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
})

// request 的攔截器
service.interceptors.request.use(
  //第一個函式會在 request 送出前攔截到此次的 config，讓你可以做最後的處理。
  function (config) {
    // Do something before request is sent
    return config
  },
  //第二個函式可以讓你在 request 發生錯誤時做一些額外的處理。
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

// response 的攔截器
// 這邊要著墨的部分就在於攔截到 response 發生錯誤時的 error 處理。
service.interceptors.response.use(
  (response) => {
    const code = response.data.code

    if (code === 200) {
      return response.data
    }
    if (code !== 200) {
      return response.data
    } else {
      return response.data
    }
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          console.log('你要找的頁面不存在')
          break
        case 500:
          console.log('程式發生問題')
          break
        default:
          console.log(error.message)
      }
    }
    return Promise.reject(error)
  },
)

export default service
