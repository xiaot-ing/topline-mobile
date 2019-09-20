import { request } from '@/utils/request.js'

// 如果想使用request必须先导入
/**
 * 获取频道的api
 * 获取用户频道数据
 * 需要判断用户是否登录
 * 如果没有登录，获取匿名用户默认的频道数据
 * 如果登陆了， 需要设置请求头中的Authorization，获取用户设置的频道数据
*/
export const getUserChannels = () => {
  return request.get('/app/v1_0/user/channels')
}
