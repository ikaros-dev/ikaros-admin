<template>
  <page-header-wrapper :title="false">
    <h2>动漫详情</h2>
    <p>{{ anime }}</p>
  </page-header-wrapper>

</template>

<script>
import moment from 'moment'
import { findAnimeDTOById } from '@/api/anime'

export default {
  name: 'AnimeDetail',
  data () {
    return {
      anime: {}
    }
  },
  beforeMount () {
    if (this.$router.currentRoute.params.id) {
      const animeId = this.$router.currentRoute.params.id
      this.$log.debug('animeId', animeId)
      findAnimeDTOById(animeId)
        .then((rsp) => {
          const anime = rsp.result
          anime.airTime = moment(anime.airTime)
          this.$set(this, 'anime', anime)
        })
        .catch((err) => {
          this.$log.error('find animeDTO fail, err: ', err)
          this.$message.error('查询番剧详情失败, ID=' + animeId)
        })
    } else {
      this.$set(this, 'anime', {})
    }
  }

}
</script>

<style lang="less" scoped>

</style>
