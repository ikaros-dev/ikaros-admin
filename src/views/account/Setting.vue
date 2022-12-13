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
            <div class="mail"> {{ currentUser.email }}</div>
            <div class="username">{{ currentUser.nickname }}</div>
            <div class="bio">{{ currentUser.introduce }}</div>
          </div>
          <!-- <a-divider :dashed="true"/> -->
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17" class="userInfoProfile">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1">
            <span slot="tab">
              <a-icon type="idcard" />
              基本信息
            </span>
            <a-form-model :model="currentUser">
              <a-form-model-item label="用户名" required>
                <a-input v-model="currentUser.username"/>
              </a-form-model-item>
              <a-form-model-item label="昵称" required>
                <a-input v-model="currentUser.nickname"/>
              </a-form-model-item>
              <!-- <a-form-model-item label="邮箱" required>-->
              <!--   <a-input v-model="currentUser.email"/>-->
              <!-- </a-form-model-item>-->
              <a-form-model-item label="个人介绍">
                <a-textarea placeholder="这里是XXX" v-model="currentUser.introduce" :rows="4" />
              </a-form-model-item>
              <a-form-model-item>
                <a-button type="primary" @click="updateUser">
                  保存
                </a-button>
              </a-form-model-item>
              <br />
            </a-form-model>
          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab">
              <a-icon type="lock" />
              密码
            </span>
            <a-form-model :model="passwordUpdate">
              <a-form-model-item label="旧密码" required>
                <a-input-password v-model="passwordUpdate.oldPassword" placeholder="请输入当前密码"/>
              </a-form-model-item>
              <a-form-model-item label="新密码" required>
                <a-input-password v-model="passwordUpdate.newPassword" placeholder="请输入新密码" />
              </a-form-model-item>
              <a-form-model-item label="确认密码" required>
                <a-input-password v-model="passwordUpdate.confirmPassword" placeholder="请再次输入新密码确认"/>
              </a-form-model-item>
              <a-form-model-item>
                <a-button type="primary" @click="updateUserPassword">
                  更新
                </a-button>
              </a-form-model-item>
              <br />
            </a-form-model>
          </a-tab-pane>
          <!-- <a-tab-pane key="3">-->
          <!--   <span slot="tab">-->
          <!--     <a-icon type="mail" />-->
          <!--     邮箱-->
          <!--   </span>-->
          <!--   Tab 3-->
          <!-- </a-tab-pane>-->
        </a-tabs>
      </a-col>
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
import { updateUser, updateUserPassword } from '@/api/user'
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
        size: 8
      },
      passwordUpdate: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
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
      // this.$log.debug('handSelectedFileFieldValue', 'value', value)
      this.currentUser.avatar = value
      this.updateUser()
    },
    updateUser () {
      updateUser(this.currentUser)
        .then(rsp => {
          const newUserInfo = rsp.result
          store.commit('SET_INFO', newUserInfo)
          this.$message.success('更新用户信息成功')
        })
        .catch(err => {
          const msg = '更新信息失败，错误消息：' + err
          this.$log.error(msg)
          this.$message.error(msg)
        })
    },
    updateUserPassword () {
      if (!this.passwordUpdate.oldPassword) {
        this.$message.warn('请输入旧密码')
        return
      }
      if (!this.passwordUpdate.newPassword) {
        this.$message.warn('请输入新密码')
        return
      }
      if (!this.passwordUpdate.confirmPassword) {
        this.$message.warn('请输入确认密码')
        return
      }
      if (this.passwordUpdate.newPassword !== this.passwordUpdate.confirmPassword) {
        this.$message.warn('两次密码不一致')
        return
      }
      updateUserPassword(this.passwordUpdate.oldPassword, this.passwordUpdate.newPassword)
        .then(rsp => {
          this.$message.success('更新用户密码成功')
        })
        .catch(err => {
          const msg = '更新用户密码失败，错误消息：' + err
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

  .userInfoProfile {
    background: #ffffff;

  }
}
</style>
