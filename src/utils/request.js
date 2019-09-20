import axios from 'axios'
// 如果想使用store，只需将它导入即可
import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

// Add a request interceptor
// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 判断用户是否登录，如果用户登陆了，设置请求头中的Authorization
  if (store.state.user) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default request
