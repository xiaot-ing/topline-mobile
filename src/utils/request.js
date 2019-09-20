import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

// Add a request interceptor
// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 判断用户是否登录，如果用户登录，设置请求头中的Authorization
  if (store.state.user) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
// 响应拦截器
request.interceptors.response.use(function (response) {
  // console.log(response)
  // 更方便的让外面获取到响应中的数据
  // Do something with response data
  return response.data.data || response.data
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default request
