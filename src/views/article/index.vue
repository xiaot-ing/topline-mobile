<template>
  <div>
       <van-nav-bar
      title="文章详情"
      left-text="返回"
      fixed
      @click-left="$router.back()"
    />
    <div class="article" v-if="article">
      <!-- 文章标题 -->
      <h2 class="article-title">{{ article.title }}</h2>
      <!-- 作者信息 -->
      <auth-info :article="article"></auth-info>
      <!-- 文章内容 -->
      <div class="article-content" v-html="article.content">
      </div>
      <!-- 点赞和取消 -->
      <more-action></more-action>
  </div>
  </div>
</template>

<script>
import AuthorInfo from './components/AuthorInfo'
import MoreAction from './components/MoreAction'
export default {
  name: 'Artivle',
  comments: {
    AuthorInfo,
    MoreAction
  }
}
</script>

<style lang="less" scoped>
.article {
  margin-top: 92px;
  padding: 0px 20px;
  .article-title {
    font-size: 40px;
    font-weight: bold;
  }
  .article-content {
    font-size: 26px;
  }
}
</style>
