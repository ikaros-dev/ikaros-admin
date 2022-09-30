<template>
  <a-result status="500" :title="$t('result.exception.500.title')" :sub-title="$t('result.exception.500.subtitle')">
    <template #extra>
      <a-button type="primary" @click="toHome">
        {{ $t('result.exception.backhome') }}
      </a-button>
    </template>
  </a-result>
</template>

<script>
  export default {
    name: 'Exception500',
    methods: {
      toHome () {
        this.$router.push({ path: '/' })
      }
    }
  }
</script>
