<script setup lang="ts">
import { ref } from 'vue';
import MenuBar from './aside/MenuBar.vue';
import Header from './Header.vue';

const isCollapse = ref(false)
const receiveIsCollapseFromHeader = (e: boolean) => {
    isCollapse.value = e
}

</script>

<template>
    <el-container class="admin-layout">
        <el-aside class="aside" :width="isCollapse ? '64px' : '280px'" >
            <dev class="logo">
                Ikaros 
                <span v-if="!isCollapse">
                    Admin
                </span>
            </dev>
            <MenuBar :isCollapse="isCollapse" />
        </el-aside>
        <el-container>
            <el-header class="header">
                <Header @isCollapse="receiveIsCollapseFromHeader"></Header>
            </el-header>
            <el-main class="main">
                <dev>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
                    </el-breadcrumb>
                </dev>
                <dev class="content">
                    <RouterView />
                </dev>
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.admin-layout {
    height: 100%;


    .aside {

        .logo {
            padding-left: 5px;
            position: relative;
            text-align: center;
            height: 64px;
            overflow: hidden;
            line-height: 64px;
            // width: auto;
        }

        // width: auto;
        
        background-color: #d1e9ff;

    }

    .header {
        margin: 0;
        padding: 0;
        height: 64px;
        position: relative;
        background-color: #fff;
        box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    }

    .main {
        background-color: #fff;


    }
}
</style>