<template>
  <page-header-wrapper :title="false">
    <h2>联网检索</h2>
    <a-input-search placeholder="请输入动画名称" enter-button @search="onSearch" />
  </page-header-wrapper>

</template>

<script>
import { searchAnime } from '@/api/metadata'

export default {
  methods: {
    onSearch (keyword) {
      this.$log.debug('keyword', keyword)
      searchAnime(keyword)
        .then(rsp => {
          this.$log.debug('rsp', rsp)
        })
        .catch(error => {
          this.$log.error('search metadata anime fail', error)
        })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
