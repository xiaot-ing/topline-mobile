<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar fixed title="黑马头条" />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 标签栏 频道列表 -->
      <van-tabs v-model="activeTabIndex">
        <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
          <!-- 文章列表----自带上拉加载更多 注意嵌套关系-->
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <!-- 展示文章列表 -->
            <van-cell v-for="item in channel.articles" :key="item.art_id" :title="item.title">
              <div slot="label">
                <template v-if="item.cover.type">
                  <van-grid :border="false" :column-num="3">
                    <van-grid-item v-for="(item,index) in item.cover.images" :key = "index">
                      <van-image :src="item" lazy-load/>
                    </van-grid-item>
                  </van-grid>
                </template>
                <p>
                  <span>{{item.aut_name}}</span>&nbsp;
                  <span>{{item.comm_count}}</span>&nbsp;
                  <span>{{item.pubdate | fmtDate}}</span>&nbsp;
                  <van-icon name="close"  class="close"/>
                </p>
              </div>
            </van-cell>
          </van-list>
        </van-tab>
      </van-tabs>
    </van-pull-refresh>
    <!-- MoreAction -->
    <!-- v-model="showAction"相当于：
     @value="showAction"
   @input="show=$event" -->
    <more-action v-model="showAction" ></more-action>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channels'
import { getUserArticles } from '@/api/article'
import MoreAction from './components/MoreAction'
export default {
  name: 'Home',
  components: {
    MoreAction
  },
  data () {
    return {
      // list 需要的数据
      list: [],
      loading: false,
      finished: false,
      // 下拉刷新需要的数据
      isLoading: false,
      // 存储频道数据
      channels: [],
      // 激活的频道的tab的索引
      activeTabIndex: 0,
      timestamp: Date.now(),
      // 控制Action显示或者隐藏
      showAction: false
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
          this.channels =
            JSON.parse(window.localStorage.getItem('channels')) || []
          // 如果本地存储中没有数据，调用getUserChannels获取数据
          if (this.channels.length === 0) {
            const data = await getUserChannels()
            // console.log(data)
            this.channels = data.channels
            window.localStorage.setItem(
              'channels',
              JSON.stringify(this.channels)
            )
          }
        }
        // 无论用户有没有登录，当if语句执行完以后，频道列表已经加载好了
        // this.channels === > [{id:1,name:'xx';}]
        // 我们希望每个channels保存自己的文章列表
        // 所以：给每一个频道对象添加一个属性  文章列表 articles
        this.channels.forEach(item => {
          // item.articles = []
          // 通过$set动态给对象，增加一个响应式数据
          this.$set(item, 'articles', [])
          // 设置每个频道具有自己的事件戳
          item.timestamp = Date.now()
        })
      } catch (err) {
        console.log(err)
        this.$toast.fail('获取频道列表失败')
      }
    },
    // list组件的方法
    async onLoad () {
      // 写一行代码，延时800毫秒，在执行后续的代码
      await this.$sleep(2000)
      // 获取当前频道的ID
      const activeChannel = this.channels[this.activeTabIndex]
      const id = activeChannel.id
      const data = await getUserArticles({
        channelId: id,
        timestamp: activeChannel.timestamp
      })
      // 把 文章列表存储到channel的articles属性中
      // activeChannel.articles = data.articles
      activeChannel.articles.push(...data.results)
      //  保存data中的时间戳  pre_timestamp
      this.timestamp = data.pre_timestamp
      this.loading = false
      // 判断是否加载完所有数据
      if (data.results.length === 0) {
        this.finished = true
      }
      // console.log(data)
      // // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }
      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
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
  margin-bottom: 100px;
  margin-top: 92px;
}
.close{
  float:right;
  font-size:30px;
}
</style>
