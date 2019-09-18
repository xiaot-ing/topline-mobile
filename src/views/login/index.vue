<template>
  <div class="login-wrap">
    <van-nav-bar
      title="黑马头条"
    />
    <van-cell-group>
  <van-field
    name="mobile"
    v-validate="'required|digits:11'"
    v-model="user.mobile"
    label="手机号"
    placeholder="请输入手机号"
    left-icon="contact"
    clearable
    :error-message="errors.first('mobile')"
  />
  <van-field
    name="code"
    v-validate="'required|digits:6'"
    v-model="user.code"
    label="验证码"
    placeholder="请输入验证码"
    left-icon="gem-o"
     clearable
     :error-message="errors.first('code')"
  >
   <van-button slot="button" size="small" type="default">发送验证码</van-button>
  </van-field>
  <div class="login-btn">
      <van-button type="info" class="btn" @click="handleLogin">登录</van-button>
  </div>
</van-cell-group>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {

  created () {
    // 配置自定义错误信息
    const dict = {
      custom: {
        mobile: {
          required: '手机号不能为空',
          digits: '手机号必须为11位数字'
        },
        code: {
          required: '验证码不能为空',
          digits: '验证码必须为6位数字'
        }
      }
    }
    // or use the instance method
    this.$validator.localize('zh_CN', dict)
  },
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    async  handleLogin () {
      try {
        // 登录状态----token
        const data = await login(this.user)
        console.log(data)
        // 跳转之前保持登录状态
        this.$store.commit('setUser', data)
        // 跳转到home
        this.$router.push({
          name: 'home'
        })
      } catch (err) {
        console.log('登录失败' + err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
 .login-btn{
     padding:10px;
     .btn{
         width:100%;
     }
 }
</style>>ya
