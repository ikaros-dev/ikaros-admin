<script setup lang="ts">
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'

defineProps(['menuItems'])

</script>

<template >
    <template v-for="item in menuItems" :key="item.path">
        <el-sub-menu class="sub-menu-item" v-if="item.children && item.children.length > 0" :index="item.path">
            <template #title>
                <el-icon :class="item.meta.icon">
                    <location />
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <menu-item :menuItems="item.children" />
        </el-sub-menu>

        <el-menu-item class="menu-item" v-else :index="item.path" >
            <el-icon :class="item.meta.icon">
                <icon-menu />
            </el-icon>
            <template #title>{{ item.meta.title }}</template>
        </el-menu-item>
    </template>
</template>

<style lang='scss' scoped>
.sub-menu-item {
    width: auto;
}

.menu-item {
    width: auto;
}


</style>