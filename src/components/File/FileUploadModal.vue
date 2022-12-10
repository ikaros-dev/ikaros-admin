<template>
  <a-modal v-model="modalVisible" :afterClose="onModalClose" :footer="null" destroyOnClose title="上传文件">
    <FilePondUpload
      ref="filePondUploadRef"
      :uploadHandler="uploadHandler"
      :enableChunkForce="true"
      :enableChunkUploads="true"
      :multiple="allowMultiple"
    />
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
    },
    allowMultiple: {
      type: Boolean,
      default: true
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
      const firstFile = this.$refs.filePondUploadRef.getFirstFile()
      this.$refs.filePondUploadRef.handleClearFileList()
      this.$emit('fileUploadModalClose', firstFile)
    }
  }
}
</script>
