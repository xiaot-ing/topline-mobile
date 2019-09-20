<template>
  <div>
      <!-- 导航头 -->
    <van-nav-bar
    title="黑马头条"
    fixed />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <!-- 标签栏 频道列表 -->
    <van-tabs>
   <van-tab
    v-for="channel in channels"
   :title="channel.name"
   :key="channel.id">
   <!-- 文章列表----自带上拉加载更多 注意嵌套关系-->
   <van-list
   v-model="loading"
   :finished="finished"
   finished-text="没有更多了"
   @load="onLoad"
    >
  <van-cell
    v-for="item in list"
    :key="item"
    :title="item"
  />
</van-list>
  </van-tab>

</van-tabs>
</van-pull-refresh>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channels'
export default {
  name: 'Home',
  data () {
    return {
      // list 需要的数据
      list: [],
      loading: false,
      finished: false,
      // 下拉刷新需要的数据
      isLoading: false,
      // 存储频道数据
      channels: []
    }
  },
  created () {
  // 加载用户的频道数据
    this.loadChannels()
  },
  methods: {
  // 加载频道数据
    async loadChannels () {
      try {
        // 判断用户是否登录
        // 如果用户登录，调用getUserChannels获取频道数据
        if (this.$store.state.user) {
          const data = await getUserChannels()
          // console.log(data)
          this.channels = data.channels
        } else {
          // 如果用户没有登录
          // 从本地存储中获取数据
          // 把获取到的频道数据，存储到本地存储中
          // 开始本地存储中是没有数据的，我们希望他返回一个空数组
          this.channels = JSON.parse(window.localStorage.getItem('channels')) || []
          // 如果本地存储中没有数据，调用getUserChannels获取数据
          if (this.channels.length === 0) {
            const data = await getUserChannels()
            // console.log(data)
            this.channels = data.channels
            window.localStorage.setItem('channels', JSON.stringify(this.channels))
          }
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('获取频道列表失败')
      }
    },
    // list组件的方法
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    // refresh下拉刷新组件
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 1000)
    }
  }
}

</script>

<style lang="less" scoped>
.van-tabs {
    margin-bottom:100px;
    margin-top:92px;
}
</style>
