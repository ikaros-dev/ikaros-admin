<template>
  <page-header-wrapper :title="false">
    <a-form-model :model="anime" labelAlign="right" :label-col="labelCol" :wrapper-col="wrapperCol">
      <!-- <a-form-model-item :wrapper-col="labelItemWrapperCol">
        <a-button type="primary" @click="handlerQuickFill">
          快速填充
        </a-button>
      </a-form-model-item> -->
      <a-form-model-item label="番剧ID">
        <a-input v-model="anime.id" disabled >
          <a-icon slot="addonAfter" type="search" @click="openFileSelectModal"/>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="中文标题" >
        <a-input v-model="anime.titleCn" placeholder="请输入中文标题"/>
      </a-form-model-item>
      <a-form-model-item label="标题" >
        <a-input v-model="anime.title" placeholder="请输入标题，建议输入bgmtv能检索到的原始标题，Ikaros可能根据这个标题去互联网查询元数据"/>
      </a-form-model-item>
      <!-- <a-form-model-item label="bgmtvId" >
        <a-input v-model="anime.bgmtvId" placeholder="请输入bgm.tv对应的番剧ID"/>
      </a-form-model-item> -->
      <a-form-model-item label="简述">
        <a-textarea
          v-model="anime.overview"
          placeholder="请输入番剧介绍"
          :auto-size="{ minRows: 3, maxRows: 10 }"/>
      </a-form-model-item>
      <a-form-model-item label="制作组">
        <a-input v-model="anime.producer" placeholder="请输入制作组"/>
      </a-form-model-item>
      <a-form-model-item label="工作人员">
        <a-textarea
          v-model="anime.staffs"
          placeholder="请输入工作人员： 一行一个， 职位 : 姓名"
          :auto-size="{ minRows: 3, maxRows: 10 }"/>
      </a-form-model-item>
      <a-form-model-item label="首次放送日期">
        <a-date-picker
          v-model="anime.airTime"
          show-time
          type="date"
          placeholder="选择日期"
          style="width: 100%;"
        />
      </a-form-model-item>
      <a-form-model-item label="海报图URL" >
        <a-input v-model="anime.coverUrl" placeholder="点击右边按钮，可快速获取已存在文件URL或者上传新的图片">
          <a-icon slot="addonAfter" type="search" @click="openFileSelectModal"/>
        </a-input>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="labelItemWrapperCol">
        <a-button type="primary" @click="handleSaveAnimeClick">
          保存番剧信息
        </a-button>
      </a-form-model-item>

      <hr>

      <!-- 季度区域 -->
      <!-- 静态的季度&剧集表单
      <a-form-model-item :wrapper-col="noLabelItemWrapperCol">
        <a-collapse :bordered="false">
          <template #expandIcon="props">
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          <a-collapse-panel header="季度类型" style="background: #f7f7f7;border-radius: 4px;border: 0;overflow: hidden">
            <AnimeSeason />
            <a-collapse :bordered="false">
              <template #expandIcon="props">
                <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
              </template>
              <a-collapse-panel header="剧集信息" style="background: #f7f7f7;border-radius: 4px;border: 0;overflow: hidden">
                <a-tabs
                  :default-active-key="1"
                  tab-position="top"
                  @change="handleTabChange"
                >
                  <a-tab-pane v-for="i in 24" :key="i" :tab="`第${i}集`">
                    <AnimeEpisode />
                  </a-tab-pane>
                </a-tabs>
              </a-collapse-panel>
            </a-collapse>

          </a-collapse-panel>
        </a-collapse>
      </a-form-model-item> -->

      <a-form-model-item
        :wrapper-col="noLabelItemWrapperCol"
        v-for="(season, index) in seasons"
        :key="index"
      >
        <a-collapse :bordered="false">
          <template #expandIcon="props">
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          <a-collapse-panel :header="season.title" style="background: #f7f7f7;border-radius: 4px;border: 0;overflow: hidden">
            <!-- 季度信息 -->
            <AnimeSeason :receiveSeason="season" :animeId="new String(anime.id)" @updateSeason="(newSeason) => {season = newSeason}"/>
            <a-icon
              slot="extra"
              class="dynamic-delete-button"
              type="minus-circle-o"
              @click="removeSeason(season)" />
          </a-collapse-panel>
        </a-collapse>
      </a-form-model-item>
      <!-- 动态添加季度 -->
      <a-form-model-item :wrapper-col="noLabelItemWrapperCol">
        <a-button type="dashed" style="width: 100%" @click="addSeasonItem">
          <a-icon type="plus" /> 添加季度
        </a-button>
      </a-form-model-item>

    </a-form-model>

    <FileSelectModal
      :visible.sync="fileSelectModalVisible"
      @sendSelectedFileFieldValue="handSelectedFileFieldValue"
      :disableCopySelectedFileIdButton="true" />
  </page-header-wrapper>

</template>

<script>
import FileSelectModal from '@/components/File/FileSelectModal.vue'
import AnimeSeason from '@/components/Anime/AnimeSeason.vue'
import { saveAnime } from '@/api/anime'
import moment from 'moment'
import { removeSeason } from '@/api/season'

export default {
  name: 'AnimeSave',
  components: { FileSelectModal, AnimeSeason },
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 4 },
        lg: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 16 },
        lg: { span: 20 }
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
      fileSelectModalVisible: false,
      anime: {
        id: '',
        title: '',
        bgmtvId: '',
        originalTitle: '',
        overview: '',
        producer: '',
        coverUrl: '',
        staffs: '',
        airTime: ''
      },
      seasons: []
    }
  },
  beforeMount () {
    if (this.$router.currentRoute.params.anime) {
      const anime = this.$router.currentRoute.params.anime
      this.$log.debug('anime', anime)
      anime.airTime = moment(anime.airTime)
      this.$set(this, 'anime', anime)
      this.$set(this, 'seasons', anime.seasons)
    }
  },
  methods: {
    openFileSelectModal () {
      this.fileSelectModalVisible = true
    },
    handSelectedFileFieldValue (value) {
      this.anime.coverUrl = value
    },
    handlerQuickFill () {
      if (this.anime.bgmtvId === '' && this.anime.originalTitle === '') {
        this.$notification.warning({
          message: '请在下方输入 bgmTvId 或者 原始文件名称，Ikaros需要根据这两项去互联网匹配番剧元数据'
        })
      } else {
        this.$notification.info({
            message: 'Ikaros努力查询中，请耐心等待'
        })
        if (this.anime.bgmtvId !== '') {
          this.$log.debug('request server to quick fill by bgmTvId', this.anime.bgmtvId)
        } else {
          this.$log.debug('request server to quick fill by originalTitle', this.anime.originalTitle)
        }
      }
    },
    removeSeason (season) {
      const _seasons = this.seasons
      const _animeId = this.anime.id
      const _log = this.$log
      const _message = this.$message
      this.$confirm({
        title: '您确认要移除这个季度信息吗？',
        content: '当你点击确认按钮，这个季度的信息会被移除！！！',
        onOk () {
          const index = _seasons.indexOf(season)
          if (index !== -1) {
            _seasons.splice(index, 1)
          }
          if (_animeId && season.id) {
            // 请求server 移除 季度
            _log.debug('will remove season', season)
            removeSeason(season.id)
              .catch((err) => {
                _log.error('remove season fail, err: ', err)
                _message.error('移除季度失败')
              })
          }
        },
        onCancel () {}
      })
    },
    addSeasonItem () {
      this.$log.debug('id', this.anime.id)
      this.$log.debug('seasons', this.seasons)
      this.seasons.push({
        value: '',
        key: new Date().getTime()
      })
      this.$forceUpdate()
    },
    handleSaveAnimeClick () {
      const idMsg = this.anime.id ? ', ID=' + this.anime.id : ''
      saveAnime(this.anime)
        .then((res) => {
          this.$message.success('保存番剧成功' + idMsg)
          // this.$log.debug('res', res)
          this.anime = res.result
          this.anime.airTime = moment(this.anime.airTime)
        })
        .catch((err) => {
          this.$log.error('save anime fail, err: ', err)
          this.$message.error('保存番剧失败' + idMsg)
        })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
