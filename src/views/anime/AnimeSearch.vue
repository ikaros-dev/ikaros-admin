<template>
  <page-header-wrapper :title="false">
    <h2>联网检索</h2>
    <a-input-search placeholder="请输入动画名称" enter-button @search="onSearch" />
    <br>
    <br>
    <br>
    <h2>查询结果</h2>
    <a-spin :spinning="list.loading">
      <a-row :gutter="12" type="flex" v-if="list.data.length > 0">
        <a-col
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          :xl="6"
          v-for="(anime, index) in list.data"
          :key="index">
          <a-card :bordered="false" :title="anime.nameCn === '' ? anime.name : anime.nameCn">
            <a slot="extra" href="#" >选中</a>
            <img
              slot="cover"
              :alt="anime.description"
              :src="anime.image"
            />
          </a-card>
        </a-col>
      </a-row>
      <div v-else>未查询到结果</div>
    </a-spin>

  </page-header-wrapper>

</template>

<script>
import { searchAnime } from '@/api/metadata'

export default {
  data () {
    return {
      list: {
        loading: false,
        data: []
      }
    }
  },
  methods: {
    async onSearch (keyword) {
      if (keyword !== '') {
        this.$log.debug('keyword', keyword)
        try {
          this.list.loading = true
          const response = await searchAnime(keyword)
          this.list.data = response.result
        } catch (error) {
          this.$log.error(error)
        } finally {
          this.list.loading = false
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
