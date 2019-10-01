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
       <div slot="title" v-html="highlight(item)"></div>
      </van-cell>
    </van-cell-group>
    <!-- 搜索历史 -->
    <van-cell-group v-show="!suggestionList.length">
      <van-cell
        title="历史记录">
         <van-icon
         v-show="!showClose"
         slot="right-icon"
         name="delete"
         @click="showClose=true"
        style="line-height: inherit;"
      />
      <div v-show="showClose">
        <span>全部删除</span> &nbsp;
        <span @click="showClose=false">完成</span>
      </div>
      </van-cell>
        <van-cell
        v-for="item in  histories"
        :key="item"
        title="item">
         <van-icon
         slot="right-icon"
         name="close"
         v-show="showClose"
        style="line-height: inherit;"
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
      suggestionList: '',
      // 控制删除按钮的显示隐藏
      showClose: false,
      // 历史记录
      histories: JSON.parse(window.localStorage.getItem('history')) || []
    }
  },
  methods: {
    onSearch (value) {
      // 搜索文本框按回车，不传值  this.value_
      // 点击  搜索建议传值  value
      value = value || this.vulue
      //  记录历史  重复的历史记录不要添加
      if (!this.histories.includes(this.value)) {
        this.histories.push(this.value)
        // 将所有历史纪录存储到本地存储
        window.localStorage.setItem('history', JSON.stringify(this.histories))
      }
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
      return text.toLocalLowerCase()
        .split(this.value)
        .join(`<span style="color:red">${this.value}</span>`)
    }
  }
}
</script>

<style>

</style>
