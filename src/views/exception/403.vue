<template>
  <a-result status="403" :title="$t('result.exception.403.title')" :sub-title="$t('result.exception.403.subtitle')">
    <template #extra>
      <a-button type="primary" @click="toHome">
        {{ $t('result.exception.backhome') }}
      </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: 'Exception403',
  methods: {
    toHome () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
