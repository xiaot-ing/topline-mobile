<template>
  <div>
      搜索页面
  </div>
</template>

<script>
export default {
  props: ['q'],
  created () {
    console.log(this.q)
  }
}
</script>

<style>

</style>
