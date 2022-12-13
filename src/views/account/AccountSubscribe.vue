<template>
  <page-header-wrapper :title="false" >
    <a-collapse v-model="activeKey">
      <a-collapse-panel key="ANIME" header="动漫">
        <account-subscribe-anime-list />
      </a-collapse-panel>
      <a-collapse-panel key="COMIC" header="漫画" disabled>
        <p>漫画</p>
      </a-collapse-panel>
      <a-collapse-panel key="GAME" header="游戏" disabled>
        <p>游戏</p>
      </a-collapse-panel>
      <a-collapse-panel key="MUSIC" header="音乐" disabled>
        <p>音乐</p>
      </a-collapse-panel>
      <a-collapse-panel key="NOVEL" header="小说" disabled>
        <p>小说</p>
      </a-collapse-panel>
      <a-collapse-panel key="OTHER" header="其它" disabled>
        <p>其它</p>
      </a-collapse-panel>
    </a-collapse>
  </page-header-wrapper>
</template>

<script>
import AccountSubscribeAnimeList from '@/components/Account/AccountSubscribeAnimeList.vue'

export default {
  name: 'AccountSubscribe',
  components: {
    AccountSubscribeAnimeList
  },
  data () {
    return {
      activeKey: ['ANIME']
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
</style>
