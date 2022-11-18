<template>
  <a-form-model :model="episode" labelAlign="left" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-model-item label="ID">
      <a-input disabled v-model="episode.id" />
    </a-form-model-item>
    <a-form-model-item label="序列">
      <a-input v-model="episode.seq" placeholder="请输入第几集，要求数字"/>
    </a-form-model-item>
    <a-form-model-item label="时长" >
      <a-input disabled v-model="episode.duration" />
    </a-form-model-item>
    <a-form-model-item label="URL" >
      <a-input v-model="episode.url" placeholder="点击右边按钮，可快速获取已存在文件URL或者上传新的文件">
        <a-icon slot="addonAfter" type="search" @click="openFileSelectModal"/>
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="中文标题" >
      <a-input v-model="episode.titleCnn" placeholder="请输入中文标题"/>
    </a-form-model-item>
    <a-form-model-item label="标题" >
      <a-input v-model="episode.title" placeholder="请输入原始标题，建议罗马音或者英文，Ikaros可能根据这个标题去互联网查询元数据"/>
    </a-form-model-item>
    <a-form-model-item label="放送日期">
      <a-date-picker
        v-model="episode.airTime"
        show-time
        type="date"
        placeholder="选择日期"
        style="width: 100%;"
      />
      <a-form-model-item label="简述">
        <a-textarea
          v-model="episode.overview"
          placeholder="请输入剧集介绍"
          :auto-size="{ minRows: 3, maxRows: 10 }"/>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="noLabelItemWrapperCol">
        <a-button type="primary" @click="handleSaveEpClick">
          保存剧集信息
        </a-button>
      </a-form-model-item>
    </a-form-model-item>

    <FileSelectModal
      :visible.sync="fileSelectModalVisible"
      @sendSelectedFileFieldValue="handSelectedFileFieldValue"
      :disableCopySelectedFileIdButton="true" />
  </a-form-model>
</template>

<script>
import { saveEpisode } from '@/api/episode'
import FileSelectModal from '@/components/File/FileSelectModal.vue'
import moment from 'moment'

export default {
  components: { FileSelectModal },
  props: {
    receiveSeasonId: {
      type: String,
      default: -1
    },
    receiveEepisode: {
      type: Object,
      default: () => ({})
    }
  },
  beforeMount () {
    if (this.receiveSeasonId) {
      this.seasonId = this.receiveSeasonId
    }

    if (this.receiveEepisode) {
      this.receiveEepisode.airTime = moment(this.receiveEepisode.airTime)
      this.episode = this.receiveEepisode
    }
  },
  mounted () {
    // this.$log.debug('seasonId', this.seasonId)
    // this.$log.debug('episode', this.episode)
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
      fileSelectModalVisible: false,
      seasonId: -1,
      episode: {}
    }
  },

  methods: {
    fileterEpisode (episode) {
      episode.airTime = moment(episode.airTime)
      return episode
    },
    openFileSelectModal () {
      this.fileSelectModalVisible = true
    },
    handSelectedFileFieldValue (value) {
      this.episode.url = value
    },
    publishEpisodeUpdatedEvent (data) {
      this.$emit('updateEpisode', data)
    },
    handleSaveEpClick () {
      this.episode.seasonId = this.seasonId
      saveEpisode(this.episode)
        .then(res => {
            const episode = this.fileterEpisode(res.result)
            this.$set(this, 'episode', episode)
            this.$message.success('保存剧集成功，剧集ID=' + episode.id)
            this.publishEpisodeUpdatedEvent(episode)
        })
        .catch(err => {
          this.$log.error('save episode fail, err: ', err)
          this.$message.error('保存剧集失败')
        })
        .finally(() => {
        })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
