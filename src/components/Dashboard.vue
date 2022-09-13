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


  <el-row class="mb-4">
    <el-button type="success" round @click="addBit">add</el-button>
  </el-row>

</template>

<style scoped lang="scss">

</style>
