<template>
  <div>
    <!-- 导航头-搜索框 -->
    <van-search
      placeholder="请输入搜索关键词"
      v-model="value"
      show-action
      @input="handleSuggestion"
      @search="onSearch"
      @cancel="$router.push('/')"
    />

    <!-- 智能提示 -->
    <van-cell-group v-show="suggestionList.length">
      <van-cell
        @click="onSearch(item)"
        v-for="item in suggestionList"
        :key="item"
        icon="search">
        <div slot="title" v-html="hightlight(item)"></div>
      </van-cell>

    </van-cell-group>
    <!-- 搜索历史 -->
    <van-cell-group v-show="!suggestionList.length">
      <van-cell
        title="历史记录"
        >
        <van-icon
          v-show="!showClose"
          slot="right-icon"
          name="delete"
          style="line-height: inherit;"
          @click="showClose = true"
        />
        <div v-show="showClose">
          <span>全部删除</span>&nbsp;
          <span @click="showClose = false">完成</span>
        </div>
      </van-cell>
      <van-cell
        @click="onSearch(item)"
        v-for="item in histories"
        :key="item"
        :title="item"
      >
        <van-icon
          slot="right-icon"
          name="close"
          style="line-height: inherit;"
          v-show="showClose"
        />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
import _ from 'lodash'
export default {
  data () {
    return {
      value: '',
      suggestionList: [],
      // 控制删除按钮的显示和隐藏
      showClose: false,
      // 历史记录
      histories: JSON.parse(window.localStorage.getItem('history')) || []
    }
  },
  methods: {
    onSearch (value) {
      // 历史记录的操作
      // 判断用户是否登录，如果登录从服务器上获取数据
      // 如果没有登录在本地存储中存储数据

      // 搜索文本框按回车，不传值  this.value
      // 点击搜索建议的时候会传值  value
      value = value || this.value
      // 记录历史
      if (!this.histories.includes(value)) {
        this.histories.push(value)
        window.localStorage.setItem('history', JSON.stringify(this.histories))
      }

      // 跳转到搜索结果页面
      this.$router.push({
        name: 'search-result',
        params: {
          q: value
        }
      })
    },
    // 搜索建议
    handleSuggestion: _.debounce(async function () {
      try {
        if (this.value.trim() === '') {
          this.suggestionList = []
          return
        }

        const data = await getSuggestions(this.value)
        this.suggestionList = data.options
      } catch (err) {
        console.log(err)
      }
    }, 500),
    hightlight (text) {
      return text.toLocaleLowerCase()
        .split(this.value)
        .join(`<span style="color: red">${this.value}</span>`)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
