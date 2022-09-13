<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue'
import { ref } from 'vue';


const isCollapse = ref(false)
const isCollapseEmit = defineEmits(['isCollapse'])

function buttonClick() {
    console.log('current var isCollapse=' + isCollapse.value)
    console.log('old value is ' + isCollapse.value)
    isCollapse.value = !isCollapse.value
    console.log('new value is ' + isCollapse.value)
    console.log('new var isCollapse=' + isCollapse.value)
    isCollapseEmit("isCollapse", isCollapse.value)
}

</script>

<template>
    <el-button size="large" v-if="isCollapse" class="menu-control-button" :icon="Expand" @click="buttonClick"/>
    <el-button size="large" v-else class="menu-control-button" :icon="Fold" @click="buttonClick"/>
</template>

<style lang='scss' scoped>
.menu-control-button {
    font-size: 20px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
    height: 64px;
    border: 0;
}
</style>