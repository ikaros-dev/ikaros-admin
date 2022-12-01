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

        <div>
          <h2>我的订阅状态</h2>
          <p>暂未订阅</p>
          <!-- todo 实现番剧订阅-->
        </div>
      </a-col>
    </a-row>
    <br />
    <a-row>
      <a-col span="24">
        <div v-for="season in anime.seasons" :key="season.id">
          <h2> {{ season.type | seasonTypeFilter }}</h2>
          <span><strong>原始标题</strong>: {{ season.title }}</span>
          <br />
          <span><strong>中文标题</strong>: {{ season.titleCn }}</span>
          <br />
          <span><strong>当前集数</strong>: {{ season.episodes.length }}</span>
          <br />
          <span><strong>季度简介</strong>: {{ season.overview }}</span>
          <br />
          <!--          <h3>简介</h3>-->
          <!--          <h3>剧集</h3>-->
          <a-table
            bordered
            :columns="episodeTableColumns"
            :pagination="false"
            :data-source="season.episodes"
            :rowKey="record => record.seq"
          >
            <span slot="airTimeSlot" slot-scope="airTime">
              {{ airTime | moment }}
            </span>
            <span slot="resourceSlot" slot-scope="file">
              <span v-if="file">
                <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
                <a @click="openFileDetailModal(file)">{{ file.name }}</a>
              </span>
              <span v-else>
                <a-icon type="close-circle" theme="twoTone" two-tone-color="red"/>
              </span>
            </span>

            <span slot="customOperateTitleSlot" >
              <a-button type="dashed" @click="handleBatchMatchingButtonClick(season.id)">
                批量匹配
              </a-button>
            </span>
            <span slot="operationSlot" slot-scope="text, record">
              <a-button type="dashed" @click="handleSingleMatchingButtonClick(record)">
                单个匹配
              </a-button>
            </span>
          </a-table>
        </div>
      </a-col>
    </a-row>

    <FileDetailModal
      :addToPhoto="true"
      :file="file"
      :visible.sync="fileDetailVisible"
    ></FileDetailModal>

    <FileMatchingModal
      :key="fileMatchingModalKey"
      :receive-episode-id="currentEpisodeIdStr"
      :receive-season-id="currentSeasonIdStr"
      :visible.sync="fileMatchingModalVisible"
      @dataHasUpdated="reRenderTable(anime.id)"/>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { findAnimeDTOById } from '@/api/anime'
import FileDetailModal from '@/components/File/FileDetailModal.vue'
import FileMatchingModal from '@/components/File/FileMatchingModal.vue'

export default {
  name: 'AnimeDetail',
  components: { FileDetailModal, FileMatchingModal },
  data () {
    return {
      anime: {},
      episodes: [],
      currentEpisodeIdStr: '',
      currentSeasonIdStr: '',
      episodeTableColumns: [
        { title: '序号', dataIndex: 'seq', key: 'seq' },
        { title: '标题', dataIndex: 'title', key: 'title' },
        { title: '中文标题', dataIndex: 'titleCn', key: 'titleCn' },
        { title: '放送时间',
          dataIndex: 'airTime',
          key: 'airTime',
          scopedSlots: { customRender: 'airTimeSlot' } },
        { title: '资源', dataIndex: 'file', key: 'file', scopedSlots: { customRender: 'resourceSlot' } },
        {
          dataIndex: 'operate',
          key: 'operate',
          slots: { title: 'customOperateTitleSlot' },
          scopedSlots: { customRender: 'operationSlot' } }
      ],
      fileDetailVisible: false,
      fileMatchingModalVisible: false,
      fileMatchingModalKey: 0,
      file: {}
    }
  },
  beforeMount () {
    if (this.$router.currentRoute.params.id) {
      const animeId = this.$router.currentRoute.params.id
      this.getAnimeDtoById(animeId)
    } else {
      this.$set(this, 'anime', {})
    }
  },
  methods: {
    getAnimeDtoById (animeId) {
      // this.$log.debug('animeId', animeId)
      findAnimeDTOById(animeId)
        .then((rsp) => {
          const anime = rsp.result
          anime.airTime = moment(anime.airTime)
          // this.dataTableAdapter(anime.seasons)
          // this.$log.debug('anime', anime)
          this.$set(this, 'anime', anime)
        })
        .catch((err) => {
          this.$log.error('find animeDTO fail, err: ', err)
          this.$message.error('查询番剧详情失败, ID=' + animeId)
        })
    },
    dataTableAdapter (dataArr) {
      dataArr.forEach(data => {
        data.key = data.id
      })
    },
    openFileDetailModal (file) {
      this.file = file
      this.fileDetailVisible = true
    },
    handleSingleMatchingButtonClick (episode) {
      // this.$log.debug('episode', episode)
      this.currentEpisodeIdStr = episode.id.toString()
      this.currentSeasonIdStr = ''
      this.fileMatchingModalVisible = true
      this.fileMatchingModalKey += 1
    },
    handleBatchMatchingButtonClick (seasonId) {
      this.currentEpisodeIdStr = ''
      this.currentSeasonIdStr = seasonId.toString()
      this.fileMatchingModalVisible = true
      this.fileMatchingModalKey += 1
    },
    reRenderTable (animeId) {
      // this.$log.debug('animeId', animeId)
      this.getAnimeDtoById(animeId)
    }
  }

}
</script>

<style lang="less" scoped>

</style>
