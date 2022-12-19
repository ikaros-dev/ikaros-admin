<template>
  <page-header-wrapper :title="false">
    <a-form-model :model="torrent" >
      <a-alert
        message="只支持添加单个种子磁力链接，前缀：magnet:"
        banner
        closable
      />
      <a-form-model-item label="内容">
        <a-input v-model="torrent.url" autoSize type="textarea"/>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" @click="onSubmit" :loading="submitButtonLoading">
          提交
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </page-header-wrapper>
</template>

<script>
import { torrentAdd } from '@/api/torrent'

export default {
  data () {
    return {
      torrent: {
        url: ''
      },
      submitButtonLoading: false
    }
  },
  methods: {
    onSubmit () {
      if (!this.torrent.url) {
        this.$message.warn('请输入链接')
        return
      }
      this.submitButtonLoading = true
      torrentAdd(this.torrent.url)
        .then(rsp => {
          this.$message.success('添加成功')
        })
        .catch(err => {
          const msg = '添加失败，异常信息：' + err
          this.$message.error(msg)
          this.$log.error(msg)
        })
        .finally(() => {
          this.submitButtonLoading = false
        })
    }
  }
}
</script>
