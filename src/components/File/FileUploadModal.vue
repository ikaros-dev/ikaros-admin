<template>
  <a-modal v-model="modalVisible" :afterClose="onClose" :footer="null" destroyOnClose title="上传文件">
    <FilePondUpload ref="filePondUploadRef" :uploadHandler="uploadHandler"></FilePondUpload>
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
      uploadHandler: (file, options) => upload(file, options)
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
    onClose () {
      this.$refs.filePondUploadRef.handleClearFileList()
      this.$emit('close')
    }
  }
}
</script>
