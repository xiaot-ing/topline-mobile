
// 操作本地存储，把读写用户封装起来

export const setUser = (user) => {
  window.localStorage.setItem('user', JSON.stringify(user))
}

export const getUser = () => {
  return JSON.parse(window.localStorage.getItem('user'))
}

export const removeUser = () => {
  return window.localStorage.removeItem('user')
}
