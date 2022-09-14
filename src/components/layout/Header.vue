<script setup lang="ts">
import { Bell, Close, Expand, Fold, Link, Setting, User, UserFilled } from '@element-plus/icons-vue'
import { ref } from 'vue';


const isCollapse = ref(false)
const isCollapseEmit = defineEmits(['isCollapse'])

function buttonClick() {
    // console.log('current var isCollapse=' + isCollapse.value)
    // console.log('old value is ' + isCollapse.value)
    isCollapse.value = !isCollapse.value
    // console.log('new value is ' + isCollapse.value)
    // console.log('new var isCollapse=' + isCollapse.value)
    isCollapseEmit("isCollapse", isCollapse.value)
}

</script>

<template>
    <el-row :gutter="20">
        <el-col :span="1">
            <el-button size="large" v-if="isCollapse" class="menu-control-button" :icon="Expand" @click="buttonClick" />
            <el-button size="large" v-else class="menu-control-button" :icon="Fold" @click="buttonClick" />
        </el-col>
        <el-col :span="19">
            <el-menu default-active="1" class="header-menu" mode="horizontal">
                <el-menu-item index="1">系统</el-menu-item>
                <el-menu-item index="2">动画</el-menu-item>
                <el-menu-item index="3">漫画</el-menu-item>
                <el-menu-item index="4">游戏</el-menu-item>
                <el-menu-item index="5">音乐</el-menu-item>
                <el-menu-item index="6">小说</el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="4">
            <dev style="float:right;">
                <el-button size="large" class="header-button-right" :icon="Link" plain/>
                <el-button size="large" class="header-button-right" :icon="Setting" plain/>
                <el-button size="large" class="header-button-right" :icon="Bell" plain/>

                <el-dropdown trigger="hover">
                    <el-button size="large" class="header-button-right" :icon="UserFilled" plain/>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item :icon="User">个人资料</el-dropdown-item>
                            <el-dropdown-item :icon="Close">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </dev>
        </el-col>
    </el-row>
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
    float: left;
}

.header-menu {
    height: 64px;
    line-height: 64px;
    border: 0;
    width: 40%;
}


.header-button-right {
    font-size: 20px;
    line-height: 64px;
    padding: 0 16px;
    cursor: pointer;
    transition: color .3s;
    height: 64px;
    border: 0;
    text-align: center;
}

</style>