<template>
  <div class="login-wrap">
    <van-nav-bar
      title="黑马头条"
    />
    <van-cell-group>
  <van-field
    v-model="user.mobile"
    label="手机号"
    placeholder="请输入手机号"
    left-icon="contact"
    clearable
  />
  <van-field
    v-model="user.code"
    label="验证码"
    placeholder="请输入验证码"
    left-icon="gem-o"
     clearable
  >
   <van-button slot="button" size="small" type="default">发送验证码</van-button>
  </van-field>
  <div class="login-btn">
      <van-button type="info" class="btn">登录</van-button>
  </div>
</van-cell-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
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
</style>>
