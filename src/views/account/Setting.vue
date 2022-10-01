<template>
  <page-header-wrapper :title="false" class="page-header-index-wide">
    <h1>Account Setting</h1>
    <p>{{ userInfo }}</p>
  </page-header-wrapper>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  }
}
</script>

<style lang="less" scoped>

</style>
