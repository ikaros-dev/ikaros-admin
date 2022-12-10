<template>
  <page-header-wrapper :title="false" class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card :bordered="false">
          <div class="account-center-avatarHolder">
            <div class="avatar" @click="openAvatarChangeModal">
              <img v-if="currentUser.avatar" :src="currentUser.avatar" alt="Failure"/>
              <span v-else>NotSet</span>
            </div>
            <div class="username">{{ currentUser.nickname }}</div>
            <div class="bio">{{ currentUser.introduce }}</div>
          </div>
          <!-- <a-divider :dashed="true"/> -->
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17"> 右边的内容 </a-col>
    </a-row>

    <FileUploadModal
      :visible.sync="avatarUploadVisible"
      :allow-multiple="false"
      @fileUploadModalClose="onFileUploadModalClose" />

    <FileSelectModal
      :visible.sync="fileSelectModalVisible"
      @sendSelectedFileFieldValue="handSelectedFileFieldValue"
      :disableCopySelectedFileIdButton="true" />

  </page-header-wrapper>
</template>

<script>
import { PageView, RouteView } from '@/layouts'

import { mapGetters } from 'vuex'
import store from '@/store'
import FileUploadModal from '@/components/File/FileUploadModal.vue'
import { listByName } from '@/api/file'
import { updateUser } from '@/api/user'
import FileSelectModal from '@/components/File/FileSelectModal.vue'

export default {
  components: {
    FileSelectModal,
    FileUploadModal,
    RouteView,
    PageView
  },
  data () {
    return {
      avatarUploadVisible: false,
      fileSelectModalVisible: false,
      currentUser: {},
      params: {
        page: 1,
        size: 8,
        keyword: undefined,
        type: undefined,
        place: undefined
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted () {
    this.currentUser = store.getters.userInfo
  },
  methods: {
    openAvatarChangeModal () {
      this.fileSelectModalVisible = true
    },
    onFileUploadModalClose (firstFile) {
      this.$log.debug('firstFile', firstFile)
      if (!firstFile) {
        return
      }
      const fileName = firstFile.source.name
      this.$log.debug('fileName', fileName)
      listByName(fileName)
        .then(rsp => {
          const fileList = rsp.result
          if (fileList.length <= 0) {
            this.$message.error('更新头像失败')
          }
          const avatarFile = fileList[0]
          // this.$log.debug('avatarFile', avatarFile)
          this.updateUser(avatarFile.url)
        })
        .catch(err => {
          const msg = '更新头像失败，错误消息：' + err
          this.$log.error(msg)
          this.$message.error(msg)
        })
    },
    handSelectedFileFieldValue (value) {
      this.$log.debug('handSelectedFileFieldValue', 'value', value)
      this.updateUser(value)
    },
    updateUser (newAvatarUrl) {
      this.currentUser.avatar = newAvatarUrl
      updateUser(this.currentUser)
        .then(rsp => {
          const newUserInfo = rsp.result
          store.commit('SET_INFO', newUserInfo)
          this.$message.success('更新用户头像成功')
        })
        .catch(err => {
          const msg = '更新头像失败，错误消息：' + err
          this.$log.error(msg)
          this.$message.error(msg)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page-header-wrapper-grid-content-main {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;

  .account-center-avatarHolder {
    text-align: center;
    margin-bottom: 24px;

    &>.avatar {
      margin: 0 auto;
      width: 104px;
      height: 104px;
      margin-bottom: 20px;
      border-radius: 50%;
      background-color: whitesmoke;
      overflow: hidden;
      cursor: pointer;

      img {
        height: 100%;
        width: 100%;
      }
    }

    .username {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 4px;
    }
  }
}
</style>
