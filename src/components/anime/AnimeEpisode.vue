<template>
  <a-form-model :model="episode" labelAlign="left" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-model-item label="剧集ID">
      <a-input disabled v-model="episode.id" />
    </a-form-model-item>
    <a-form-model-item label="时长" >
      <a-input disabled v-model="episode.duration" />
    </a-form-model-item>
    <a-form-model-item label="剧集关联文件ID" >
      <a-input disabled v-model="episode.fileId" placeholder="点击右边按钮，可快速获取已存在文件ID或者上传新的文件">
        <a-icon slot="addonAfter" type="search" @click="openFileSelectModal"/>
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="标题" >
      <a-input v-model="episode.title" placeholder="请输入标题"/>
    </a-form-model-item>
    <a-form-model-item label="原始标题" >
      <a-input v-model="episode.originalTitle" placeholder="请输入原始标题，建议罗马音或者英文，Ikaros可能根据这个标题去互联网查询元数据"/>
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
        <a-button type="primary">
          保存剧集信息
        </a-button>
      </a-form-model-item>
    </a-form-model-item>

    <FileSelectModal
      :visible.sync="fileSelectModalVisible"
      @sendSelectedFileFieldValue="handSelectedFileFieldValue"
      :disableCopySelectedFileUrlButton="true" />
  </a-form-model>
</template>

<script>
import FileSelectModal from '@/components/File/FileSelectModal.vue'
export default {
  components: { FileSelectModal },
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
      episode: {},
      fileSelectModalVisible: false
    }
  },

  methods: {
    openFileSelectModal () {
      this.fileSelectModalVisible = true
    },
    handSelectedFileFieldValue (value) {
      this.episode.fileId = value
    }
  }
}
</script>

<style lang="less" scoped>

</style>
