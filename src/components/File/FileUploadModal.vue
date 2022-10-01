<template>
  <a-modal v-model="modalVisible" :afterClose="onClose" :footer="null" destroyOnClose title="上传文件">
    <FilePondUpload ref="upload" :uploadHandler="uploadHandler"></FilePondUpload>
  </a-modal>
</template>
<script>
import FilePondUpload from '@/components/Upload/FilePondUpload.vue'
// todo import api

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
      uploadHandler: (file, options) => {
        // todo call api to upload file
      }
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
      this.$refs.upload.handleClearFileList()
      this.$emit('close')
    }
  }
}
</script>
