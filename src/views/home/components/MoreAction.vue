<template>
<!-- 点击遮罩层，隐藏dialog -->
    <!-- v-model="show" 在自定义组件中相当于
      :value="show"
      @input="show = $event"
     -->
  <van-dialog
    :showConfirmButton="false"
    :value="value"
    @input="$emit('input', $event)"
    closeOnClickOverlay
  >
    <van-cell-group v-show="!isReportShow">
      <van-cell title="不感兴趣" icon="location-o" @click="handle('dislike')"/>
      <van-cell title="反馈垃圾内容" icon="location-o" is-link @click="isReportShow=true" />
      <van-cell title="拉黑作者" icon="location-o" @click="handle('blacklist')" />
    </van-cell-group>

    <van-cell-group v-show="isReportShow">
      <van-cell icon="arrow-left" @click="isReportShow=false"/>
  <!-- // 举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权' -->

      <van-cell
        v-for="item in list"
        :title="item.title"
        :key="item.type"
        icon="location-o"
        @click="handle('report', item.type)" />
      <!-- <van-cell title="低俗色情" icon="location-o" @click="handle('report', 2)" />
      <van-cell title="错别字多" icon="location-o" @click="handle('report', 3)" /> -->
    </van-cell-group>
  </van-dialog>
</template>

<script>
import { dislikeArticle, reportArticle } from '@/api/article'
import { blackUserList } from '@/api/user'

export default {
  name: 'MoreAction',
  props: ['value', 'currentArticle'],
  data () {
    return {
      // 控制反馈内容是否显示
      isReportShow: false,
      // 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权
      list: [
        { title: '标题夸张', type: 1 },
        { title: '低俗色情', type: 2 },
        { title: '错别字多', type: 3 },
        { title: '旧闻重复', type: 4 },
        { title: '广告软文', type: 5 },
        { title: '内容不实', type: 6 },
        { title: '涉嫌违法犯罪', type: 7 },
        { title: '侵权', type: 8 },
        { title: '其他问题', type: 0 },
      ]
    }
  },
  methods: {
    // 点击cell的时候执行
    handle (type, reportType) {
      switch (type) {
        case 'dislike':
          this.dislike()
          break
        case 'blacklist':
          this.blacklist()
          break
        case 'report':
          this.report(reportType)
          break
      }
    },
    // 不感兴趣
    async dislike () {
      // console.log(this.currentArticle)
      try {
        const id = this.currentArticle.art_id
        // 发送请求
        await dislikeArticle(id)
        // 提示成功还是失败
        // 如果成功，告诉home组件--》隐藏moreaction，移除不感兴趣的文章
        // 触发一个成功的事件，告诉home组件
        this.$emit('handleSuccess')
        this.$toast.success('操作成功')
      } catch (err) {
        this.$toast.fail('操作失败' + err)
      }
    },
    // 拉黑作者
    async blacklist () {
      try {
        // 作者的id
        const id = this.currentArticle.aut_id
        // 发送请求
        await blackUserList(id)
        // 根据成功失败，做提示
        this.$toast.success('操作成功')
        // 成功--->通知home组件，隐藏MoreAction，屏蔽作者
        this.$emit('handleSuccess')
      } catch (err) {
        this.$toast.fail('操作失败' + err)
      }
    },
    // 反馈文章
    async report (reportType) {
      try {
        // 获取文章id
        const id = this.currentArticle.art_id
        // 发送请求
        await reportArticle({
          id,
          type: reportType
        })
        // 提示成功、失败
        // 隐藏MoreAction
        this.$emit('input', false)
        this.$toast.success('操作成功')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style>

</style>
