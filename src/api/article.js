import request from '@/utils/request'

/**
 * 获取文章
*/
export const getUserArticles = ({
  channelId,
  timestamp = Date.now(),
  withTop = 1
}) => {
  return request.get('/app/v1_1/articles', {
    params: {
      channel_id: channelId,
      timestamp: timestamp,
      with_top: withTop
    }
  })
}
