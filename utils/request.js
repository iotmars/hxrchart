import axios from 'axios'
// create an axios instance
const service = axios.create({
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 不传递默认开启loading
    if (!config.hideloading) {
      // loading
    }
    // 根据是否有token进行跳转
    // if (store.getters.token) {
    // config.headers['Mars-Token'] = 'eyJhbGciOiJSUzI1NiJ9.eyJtYW5hZ2VySWQiOjEwMDAxLCJpYXQiOjE1OTk1NDM2ODQsImV4cCI6MTYwMjEzNTY4NH0.SvJhm3PbHG0PGq2wk8Vro2SV8U6lklo_3tR4JC_-9Q_q4liwi02GOQ7EoJQVQMpGBqGfWuj2EnbPT3hxMECKIG92K6gkGzHCXtyPOrkehmryF4mdd2l-aRGSP_-0dxTRln8Kabm91g8pyQ14ZKfcZE8EoGBBtXCevHyuI9OiEkvSBMUCjUoNqUg3sXEIQQWzr98jjHmzWuasKbwBzP2QcwXzwVGp9p79SGo-RSDRL_njwhw3904A4vKqNN3qe9Pc8dRt7W9t8ZpjN5piLMZqLH8k8SEf1uFrAz5OadXzv1fYC9rUMZVnsZFrRhx_PyY4xSRqnuHb8mAEogK4uacrDQ'
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status && res.status !== 200) {
      // 登录超时,重新登录
      if (res.status === 401) {
        // const _href = window.location.href
        // window.location.href = '/api/login/wxwork?redirect=' + encodeURIComponent(_href)
      }
      // return Promise.reject(res || 'error')
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
