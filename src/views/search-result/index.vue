<template>
  <div>
    <van-nav-bar
      title="搜索结果"
      left-text="返回"
      left-arrow
      fixed
      @click-left="$router.back()"
    />

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
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
          </p>
          <van-grid :column-num="3">
            <van-grid-item
              text="评论"
            />
            <van-grid-item
              text="点赞"
            />
            <van-grid-item
              text="分享"
            />
          </van-grid>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  props: ['q'],
  created () {
    console.log(this.q)
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      // 分页数据
      // 页码
      page: 1,
      // 每页获取多少条
      perPage: 10,
      // 总共多少页
      pageCount: 0
    }
  },

  methods: {
    async onLoad () {
      // 延迟加载
      await this.$sleep(1000)

      try {
        const data = await getSearchResults({
          page: this.page,
          perPage: this.perPage,
          q: this.q
        })

        this.list.push(...data.results)

        this.loading = false
        // 是否加载完毕？
        this.pageCount = Math.ceil(data.total_count / this.perPage)
        // 如果当前页码，等于总页数
        if (this.page >= this.pageCount) {
          this.finished = true
        }

        this.page++
      } catch (err) {
        console.log(err)
      }
    }
  }
// 获取动态路由参数
// this.$route.params.id
}
</script>

<style lang="less" scoped>
.van-list {
  margin-top: 92px;
}
</style>
