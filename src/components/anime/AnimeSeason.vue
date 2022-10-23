<template>
  <a-form-model :model="season" labelAlign="left" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-model-item label="季度ID">
      <a-input v-model="season.id" disabled />
    </a-form-model-item>
    <a-form-model-item label="季度类型">
      <a-select v-model="season.type" placeholder="请选择季度类型">
        <!-- seasonTypes -->
        <a-select-option v-for="type in seasonTypes" :key="type" :value="type">
          {{ type | seasonTypeFilter }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="季度标题" >
      <a-input v-model="season.title" placeholder="请输入标题"/>
    </a-form-model-item>
    <a-form-model-item label="季度原始标题" >
      <a-input v-model="season.originalTitle" placeholder="请输入原始标题，建议罗马音或者英文，Ikaros可能根据这个标题去互联网查询元数据"/>
    </a-form-model-item>
    <a-form-model-item label="简述">
      <a-textarea
        v-model="season.overview"
        placeholder="请输入季度介绍"
        :auto-size="{ minRows: 3, maxRows: 10 }"/>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="noLabelItemWrapperCol">
      <a-button type="primary" @click="handleSaveClick">
        保存季度信息
      </a-button>
    </a-form-model-item>
    <!-- 剧集信息 -->
    <a-collapse :bordered="false">
      <template #expandIcon="props">
        <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
      </template>
      <a-collapse-panel header="剧集信息" style="background: #f7f7f7;border-radius: 4px;border: 0;overflow: hidden">
        <a-form-model-item :wrapper-col="noLabelItemWrapperCol">
          <a-button type="dashed" style="width: 50%" @click="addEpisodeItem">
            <a-icon type="plus" /> 添加剧集
          </a-button>
          <a-button type="dashed" style="width: 50%" @click="deleActiveTabEpisodeItem">
            <a-icon type="delete" /> 移除选中剧集
          </a-button>
        </a-form-model-item>
        <a-tabs
          :default-active-key="0"
          :activeKey="episodeTabsActiveKey"
          tab-position="top"
          size="large"
          @change="handleTabChange"
          @edit="onEdit">

          <a-tab-pane :closable="tabClosable" v-for="(episode, index) in episodes" :key="index" :tab="`第${ episode.seq === undefined ? '' : episode.seq }集`">
            <AnimeEpisode
              :receiveSeasonId="new String(season.id)"
              :receiveEepisode="episode"
              @updateEpisode="newEpisode => episode = newEpisode"/>
          </a-tab-pane>

          <!-- <a-tab-pane v-for="i in 24" :key="i" :tab="`第${i}集`">
            <AnimeEpisode />
          </a-tab-pane> -->
        </a-tabs>
      </a-collapse-panel>
    </a-collapse>
  </a-form-model>
</template>

<script>
import { saveSeasonWithAnimeId, findSeasonTypes, removeSeasonEpisode } from '@/api/anime'
import { ANIME_SEASON_TYPE_MAP } from '@/store/mutation-types'
import AnimeEpisode from '@/components/anime/AnimeEpisode.vue'

export default {
  name: 'AnimeSeason',
  components: { AnimeEpisode },
  props: {
    animeId: {
      type: String,
      default: -1
    },
    receiveSeason: {
      type: Object,
      default: () => ({})
    }
  },
  filters: {
    seasonTypeFilter (value) {
      if (ANIME_SEASON_TYPE_MAP.get(value)) {
        return ANIME_SEASON_TYPE_MAP.get(value)
      } else {
        return value
      }
    }
  },
  beforeMount () {
    if (this.receiveSeason) {
      this.$set(this, 'season', this.receiveSeason)
      this.$set(this, 'episodes', this.receiveSeason.episodes)
    } else {
      this.$set(this, 'episodes', [])
    }
  },
  created () {
    this.findAnimeSeasonTypes()
  },
  data () {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 24 },
          md: { span: 24 },
          lg: { span: 24 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 24 },
          md: { span: 24 },
          lg: { span: 24 }
        },
        labelItemWrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 24, offset: 0 },
          md: { span: 16, offset: 4 },
          lg: { span: 20, offset: 2 }
        },
        noLabelItemWrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 24, offset: 0 },
          md: { span: 24, offset: 0 },
          lg: { span: 24, offset: 0 }
        },
        seasonTypes: [],
        season: {},
        episodes: [],
        episodeTabsActiveKey: 0,
        tabClosable: true
      }
    },
    methods: {
      publishSeasonUpdatedEvent (data) {
        this.$emit('updateSeason', data)
      },
      handleSaveClick () {
        // todo save season
        saveSeasonWithAnimeId(this.season, this.animeId)
          .then(res => {
            // this.$message.success('保存季度成功')
            this.publishSeasonUpdatedEvent(res.result)
          })
          .catch(err => {
            this.$log.error('save season fail, err: ', err)
            this.$message.error('保存季度失败')
          })
      },
      findAnimeSeasonTypes () {
        findSeasonTypes()
          .then(res => {
            this.seasonTypes = res.result
          })
          .catch(err => {
            this.$log.error('find season types fail, err: ', err)
            this.$message.error('查询季度类型失败')
          })
      },
      handleTabChange (activeKey) {
        this.episodeTabsActiveKey = activeKey
      },
      addEpisodeItem () {
        // this.$log.debug('episodes', this.episodes)
        if (this.episodes === undefined) {
          this.episodes = []
        }
        const newEpItem = {
          key: new Date().getTime()
        }
        this.episodes.push(newEpItem)
        this.episodeTabsActiveKey = this.episodes.indexOf(newEpItem)
        this.$forceUpdate()
      },
      onEdit (targetKey, action) {
        this.$log.debug('targetKey', targetKey)
        this.$log.debug('action', action)
      },
      deleActiveTabEpisodeItem () {
        // this.episodes.splice(this.episodeTabsActiveKey, 1)
        const _log = this.$log
        const _message = this.$message
        const _episodeTabsActiveKey = this.episodeTabsActiveKey
        // if (_episodeTabsActiveKey === 0) {
        //   _message.warning('请选中一个剧集')
        //   return
        // }
        const _episodes = this.episodes
        const seasonId = this.season.id
        // _log.debug('episodes', this.episodes)
        // _log.debug('episodeTabsActiveKey', this.episodeTabsActiveKey)
        const currentEpisode = this.episodes[_episodeTabsActiveKey]
        const episodeId = currentEpisode.id
        // _log.debug('currentEpisode', currentEpisode)
        this.$confirm({
          title: '您确认要移除这个剧集吗？',
          content: '当你点击确认按钮，这个剧集的信息会被移除！！！当前剧集序列为：' + currentEpisode.seq,
          onOk () {
            removeSeasonEpisode(seasonId, episodeId)
              .then((res) => {
                _episodes.splice(_episodeTabsActiveKey, 1)
              })
              .catch((err) => {
                _log.error('remove season episode fail, err: ', err)
                _message.error('移除季度剧集失败')
              })
          },
          onCancel () {}
        })
      }
    }
}
</script>

<style lang="less" scoped>

</style>
