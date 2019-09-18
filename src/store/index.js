import Vue from 'vue'
import Vuex from 'vuex'
import { getUser, setUser } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //  初始化的时候，直接从本地存储中获取登录状态
    user: getUser()
  },
  mutations: {
    setUser (state, user) {
      // 赋值
      state.user = user
      // 存储到本地存储中
      setUser(user)
    }
  },
  actions: {

  }
})
