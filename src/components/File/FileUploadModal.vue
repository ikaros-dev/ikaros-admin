<template>
  <a-modal v-model="modalVisible" :afterClose="onModalClose" :footer="null" destroyOnClose title="上传文件">
    <FilePondUpload ref="filePondUploadRef" :uploadHandler="uploadHandler" :enableChunkForce="true" :enableChunkUploads="true" />
  </a-modal>
</template>
<script>
import FilePondUpload from '@/components/Upload/FilePondUpload.vue'
import { upload } from '@/api/file'

export default {
  name: 'FileUploadModal',
  components: { FilePondUpload },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      uploadHandler: (file, onUploadProgress) => upload(file, onUploadProgress)
    }
  },
  computed: {
    modalVisible: {
      get () {
        return this.visible
      },
      set (value) {
        this.$emit('update:visible', value)
      }
    }
  },
  methods: {
    onModalClose () {
      this.$refs.filePondUploadRef.handleClearFileList()
      this.$emit('fileUploadModalClose')
    }
  }
}
</script>
