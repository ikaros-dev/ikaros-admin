<template>
  <page-header-wrapper :title="false">
    <H2>Test</H2>
    <div>
      <FileUpload :visible.sync="upload.visible" />
    </div>
  </page-header-wrapper>
</template>

<script>
import FileUpload from '@/components/File/FileUpload.vue'

export default {
  name: 'Test',
  components: { FileUpload },
  data () {
    return {
      upload: {
        visible: true
      }
    }
  },
  method: {

  }
}
</script>
