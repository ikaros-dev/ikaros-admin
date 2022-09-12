<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { ref } from 'vue'
import { useStore } from '@/store'

const store = useStore()
const count = ref(0)
const showCount = computed(()=>{
  return store.getters['getCount']
})
const addBit = ()=>{
  store.commit('setCount', ++count.value)
}


</script>

<template>
  <h1>showCount: {{ showCount }}</h1>
  <h1>count: {{ count }}</h1>

  <button type="button" @click="addBit">add</button>

  <el-row class="mb-4">
    <el-button round>Round</el-button>
    <el-button type="primary" round>Primary</el-button>
    <el-button type="success" round>Success</el-button>
    <el-button type="info" round>Info</el-button>
    <el-button type="warning" round>Warning</el-button>
    <el-button type="danger" round>Danger</el-button>
  </el-row>

</template>

<style scoped>

</style>
