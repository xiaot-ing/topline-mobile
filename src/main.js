import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, {
  Lazyload
} from 'vant'
import 'vant/lib/index.css'
import '@/styles/index.less'

import 'amfe-flexible'
// 导入过滤器
import '@/filters'

// 表单验证插件
import VeeValidate, {
  Validator
} from 'vee-validate'
// 汉化文件
import zhCN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate)
// 本地化
Validator.localize('zh_CN', zhCN)

Vue.use(Vant)
Vue.use(Lazyload)

//  给所有vue的实例增加一个$sleep的方法，延时执行
Vue.prototype.$sleep = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
