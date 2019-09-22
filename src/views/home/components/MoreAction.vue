<template>
<!-- 点击遮罩层隐藏dialog -->
<!-- v-model="show"相当于下面两句话
    @value="show"
   @input="show=$event"
-->
  <van-dialog
   @value="show"
   @input="show=$event"
  :showConfirmButton="false"
  closeOnClickOverlay
>
</van-dialog>
</template>

<script>
export default {
  name: 'MoreAction',
  data () {
    return {
      show: true
    }
  }
}
</script>

<style>

</style>
