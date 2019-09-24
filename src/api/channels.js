import request from '@/utils/request'
/**
 * 获取用户频道数据
 * 如果没有登录，获取匿名用户默认的频道数据
 * 如果登录了，需要设置请求头中的Authorization，获取用户设置的频道数据
 */
export const getUserChannels = () => {
  return request.get('/app/v1_0/user/channels')
}

/**
 * 获取所有频道
*/
export const getAllChannels = () => {
  return request.get('/app/v1_0/channels')
}
/**
 * 删除指定频道
 * */
export const deleteUserChannel = (id) => {
  return request.delete(`/app/v1_0/user/channels/${id}`)
}
