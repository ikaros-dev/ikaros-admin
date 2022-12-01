<template>
  <page-header-wrapper :title="false">
    <a-row :gutter="12">
      <a-col
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="6">
        <img style="width: 100%;border-radius: 4px;" :src="anime.coverUrl" alt="anime.title">
      </a-col>
      <a-col
        :xs="24"
        :sm="12"
        :md="16"
        :lg="18"
        :xl="18">
        <h2>{{ anime.title }}</h2>
        <p v-if="anime.titleCn !== ''">中文名：{{ anime.titleCn }}</p>
        <p v-if="anime.platform !== ''">平台：{{ anime.platform }}</p>
        <p v-if="anime.bgmtvId !== ''">
          番组计划：
          <a :href="'https://bgm.tv/subject/' + anime.bgmtvId" target="_blank">{{ anime.bgmtvId }}</a>
        </p>
        <p>简介：{{ anime.overview }}</p>

      </a-col>
    </a-row>
    <br />
    <a-row>
      <a-col span="24">
        <div v-for="season in anime.seasons" :key="season.id">
          <h2> {{ season.type }}</h2>

          <h3>剧集</h3>
          <a-table
            :columns="episodeTableColumns"
            :pagination="false"
            :data-source="season.episodes"
            :rowKey="record => record.seq"
          >
            <!--            <span slot="airTime", slot-scope="airTime">-->
            <!--              123 {{ airTime }}-->
            <!--            </span>-->
            <span slot="operation">
              <a>匹配</a>
            </span>
          </a-table>
        </div>
      </a-col>
    </a-row>
  </page-header-wrapper>

</template>

<script>
import moment from 'moment'
import { findAnimeDTOById } from '@/api/anime'

export default {
  name: 'AnimeDetail',
  data () {
    return {
      anime: {},
      episodes: [],
      episodeTableColumns: [
        { title: '序号', dataIndex: 'seq', key: 'seq' },
        { title: '标题', dataIndex: 'title', key: 'title' },
        { title: '中文标题', dataIndex: 'titleCn', key: 'titleCn' },
        { title: '放送时间',
          dataIndex: 'airTime',
          key: 'airTime',
          scopedSlots: { customRender: 'airTime' } },
        { title: '资源', dataIndex: 'url', key: 'url' },
        { title: '操作', dataIndex: 'operate', key: 'operate', scopedSlots: { customRender: 'operation' } }
      ]
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
          // this.dataTableAdapter(anime.seasons)
          this.$log.debug('anime', anime)
          this.$set(this, 'anime', anime)
        })
        .catch((err) => {
          this.$log.error('find animeDTO fail, err: ', err)
          this.$message.error('查询番剧详情失败, ID=' + animeId)
        })
    } else {
      this.$set(this, 'anime', {})
    }
  },
  methods: {
    dataTableAdapter (dataArr) {
      dataArr.forEach(data => {
        data.key = data.id
      })
    }
  }

}
</script>

<style lang="less" scoped>

</style>
