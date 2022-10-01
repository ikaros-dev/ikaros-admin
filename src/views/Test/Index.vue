<template>
  <page-header-wrapper :title="false">
    <H2>Test</H2>
    <br>

    <div>
      <h2>FileUpload.vue</h2>
      <button @click="upload.visible = true">展示</button>
      <FileUpload :visible.sync="upload.visible" />
    </div>
    <br>

    <div>
      <h2>FilePondUpload.vue</h2>
      <FilePondUpload :ref="upload" :uploadHandler="uploadHandler"></FilePondUpload>
    </div>
  </page-header-wrapper>
</template>

<script>
import FileUpload from '@/components/File/FileUpload.vue'
import FilePondUpload from '@/components/Upload/FilePondUpload.vue'

export default {
  name: 'Test',
  components: { FileUpload, FilePondUpload },
  data () {
    return {
      upload: {
        visible: false
      },
      uploadHandler: (file, options) => {
        // todo call api to upload file
      }
    }
  },
  method: {

  }
}
</script>
