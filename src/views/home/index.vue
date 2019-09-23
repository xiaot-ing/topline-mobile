<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar
      fixed
      title="黑马头条"
    />
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

      <!-- 频道列表 -->
      <van-tabs @change="handleChange" v-model="activeTabIndex">
        <div slot="nav-right">
          <van-icon class="wap-nav" name="wap-nav" @click="showChannel=true" />
        </div>
        <van-tab
          v-for="channel in channels"
          :title="channel.name"
          :key="channel.id">
          <!-- 文章列表-自带上拉加载更多 -->
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
          <!-- 展示文章列表 -->
            <van-cell
              v-for="item in channel.articles"
              :key="item.art_id.toString()"
              :title="item.title"
            >
              <div slot="label">
                <template v-if="item.cover.type">
                  <van-grid :border="false" :column-num="3">
                    <van-grid-item v-for="(item, index) in item.cover.images" :key="index">
                      <van-image lazy-load :src="item" />
                    </van-grid-item>
                  </van-grid>
                </template>
                <p>
                  <span>{{ item.aut_name }}</span>&nbsp;
                  <span>{{ item.comm_count }}条评论</span>&nbsp;
                  <span>{{ item.pubdate | fmtDate }}</span>&nbsp;

                  <van-icon class="close" name="close" @click="hanleActionShow(item)" />
                </p>
              </div>
            </van-cell>
          </van-list>
        </van-tab>
      </van-tabs>

    </van-pull-refresh>
    <!-- MoreAction
      :value="showAction"
      @input="showAction = $event"
    -->
    <more-action @handleSuccess="handleSuccess" :currentArticle="currentArticle" v-model="showAction"></more-action>
    <!-- 频道管理 -->
    <home-channel v-model="showChannel" :channels="channels" ></home-channel>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channels'
import { getUserArticles } from '@/api/article'
import MoreAction from './components/MoreAction'
import HomeChannel from './components/HomeChannel'
export default {
  name: 'Home',
  components: {
    MoreAction,
    HomeChannel
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
      // 控制action显示或者隐藏
      showAction: false,
      // 点击x按钮的时候，记录当前要操作的文章对象
      currentArticle: {},
      // 点击按钮，显示频道列表
      showChannel: false
    }
  },
  created () {
    // 加载用户的频道数据
    this.loadChannels()
  },
  methods: {
    handleChange () {
      this.timestamp = Date.now()
    },
    // 加载频道数据
    async loadChannels () {
      try {
        // 判断用户是否登录
        // 如果用户登录，调用getUserChannels获取频道数据
        if (this.$store.state.user) {
          const data = await getUserChannels()
          this.channels = data.channels
        } else {
          // 如果用户没有登录
          //    从本地存储中获取数据
          //    如果本地存储中没有数据，调用getUserChannels获取频道数据
          //    把获取到的频道数据，存储到本地存储中
          this.channels = JSON.parse(window.localStorage.getItem('channels')) || []
          if (this.channels.length === 0) {
            const data = await getUserChannels()
            this.channels = data.channels
            window.localStorage.setItem('channels', JSON.stringify(this.channels))
          }
        }

        // this.channels ===> [{id:1,name:'xx'}]
        // 希望 this.channels ===> [{id:1,name:'xx',articles:[]}]
        // 给每一个频道对象，添加一个属性 文章列表 articles
        this.channels.forEach((item) => {
          // 动态增加的属性默认不是响应式的
          // item.articles = []
          // 通过$set 动态给对象，增加一个响应式数据
          this.$set(item, 'articles', [])
          // 设置每个频道具有自己的时间戳
          item.timestamp = Date.now()
        })
      } catch (err) {
        this.$toast.fail('获取频道数据失败' + err)
      }
    },
    // list 组件的
    async onLoad () {
      // 写一行代码，延时 800 毫秒，再执行后续的代码
      await this.$sleep(2000)

      // 当list组件的load事件触发，会把loading设置为true
      // 获取当前频道的id
      const activeChannel = this.channels[this.activeTabIndex]
      const id = activeChannel.id
      const data = await getUserArticles({ channelId: id, timestamp: activeChannel.timestamp })

      // 把文章列表存储到 channel的articles属性中
      // activeChannel.articles = data.results
      // [{},{}, {}]
      activeChannel.articles.push(...data.results)

      // 保存data中的pre_timestamp
      this.timestamp = data.pre_timestamp
      this.loading = false

      // 判断是否加载完所有数据
      if (data.results.length === 0) {
        this.finished = true
      }
    },
    // 下拉刷新组件的
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 1000)
    },
    // 点击x按钮的时候
    // 弹出MoreAction组件
    // 记录当前要操作的文章
    hanleActionShow (item) {
      this.showAction = true
      this.currentArticle = item
    },
    // moreaction操作成功执行
    handleSuccess () {
      // 如果成功，告诉home组件--》隐藏moreaction，移除不感兴趣的文章
      this.showAction = false
      // 获取当前频道的文章
      const articles = this.channels[this.activeTabIndex].articles
      // 要删除的文章 currentArticle

      const index = articles.findIndex((item) => {
        // findIndex会返回，返回true时候的那条数据的索引
        return item.art_id === this.currentArticle.art_id
      })

      articles.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  margin-bottom: 100px;
  margin-top: 92px;
}
.close {
  float: right;
  font-size: 30px;
}
.wap-nav {
  position: fixed;
  right: 0;
  line-height: 88px;
}
// 在scoped里面，动态生成的内容，对应的样式不起作用
// .van-tabs /deep/ .van-tabs__content {
//   margin-top: 300px;
//   color: red;
// }
</style>
