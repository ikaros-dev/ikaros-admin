<template>
  <page-header-wrapper :title="false">
    <a-form-model :model="torrent" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-alert
        message="只支持添加单个种子磁力链接，前缀：magnet:"
        banner
        closable
      />
      <a-form-model-item label="类型">
        <a-radio-group v-model="torrent.type">
          <a-radio value="SINGLE">
            单个文件
          </a-radio>
          <a-radio value="COLLECTION">
            多个文件
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="内容">
        <a-input v-model="torrent.content" autoSize type="textarea" />
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary">
          提交
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </page-header-wrapper>
</template>

<script>
export default {
  data () {
    return {
      torrent: {
        type: 'COLLECTION'
      }
    }
  }
}
</script>
