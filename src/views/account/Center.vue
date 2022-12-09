<template>
  <page-header-wrapper :title="false" class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card :bordered="false">
          <div class="account-center-avatarHolder">
            <div class="avatar" @click="openAvatarChangeModal">
              <img v-if="userInfo.avatar" :src="userInfo.avatar"/>
            </div>
            <div class="username">{{ userInfo.nickname }}</div>
            <div class="bio">{{ userInfo.introduce }}</div>
          </div>
          <!-- <a-divider :dashed="true"/> -->
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17"> 右边的内容 </a-col>
    </a-row>
  </page-header-wrapper>
</template>

<script>
import { PageView, RouteView } from '@/layouts'

import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  components: {
    RouteView,
    PageView
  },
  data () {
    return {
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
      this.$log.debug('avatar')
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
