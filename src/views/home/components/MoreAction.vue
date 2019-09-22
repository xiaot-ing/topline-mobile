<template>
<!-- 点击遮罩层隐藏dialog -->
<!-- v-model="show"相当于下面两句话
    @value="show"
   @input="show=$event"
-->
  <van-dialog
  :value="value"
  @input="$emit('input', $event)"
  :showConfirmButton="false"
  closeOnClickOverlay
>
<van-cell-group v-show="!isReportShow">
  <van-cell title="不感兴趣"  icon="location-o" />
  <van-cell title="反馈垃圾内容" icon="location-o" is-link @click="isReportShow=true" />
    <van-cell title="拉黑作者" icon="location-o" />
</van-cell-group>
<van-cell-group v-show="isReportShow">
  <van-cell icon="arrow-left" @click="isReportShow=false" />
   <van-cell title="标题夸张" icon="location-o"  />
    <van-cell title="低俗色情" icon="location-o" />
    <van-cell title=错别字多 icon="location-o" />
</van-cell-group>
</van-dialog>
</template>

<script>
export default {
  name: 'MoreAction',
  props: ['value', currentArticle],
  data () {
    return {
      // 控制反馈内容是否显示
      isReportShow: false
    }
  }
}
</script>

<style>

</style>
