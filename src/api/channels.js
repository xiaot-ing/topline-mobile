import request from '@/utils/request'
/**
 * 获取用户频道数据
 * 如果没有登录，获取匿名用户默认的频道数据
 * 如果登录了，需要设置请求头中的Authorization，获取用户设置的频道数据
 */
export const getUserChannels = () => {
  return request.get('/app/v1_0/user/channels')
}
