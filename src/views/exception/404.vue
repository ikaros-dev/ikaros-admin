<template>
  <a-result status="404" :title="$t('result.exception.404.title')" :sub-title="$t('result.exception.404.subtitle')">
    <template #extra>
      <a-button type="primary" @click="toHome">
        {{ $t('result.exception.backhome') }}
      </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: 'Exception404',
  methods: {
    toHome () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
