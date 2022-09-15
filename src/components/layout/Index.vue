<script setup lang="ts">
import { ref } from 'vue';
import MenuBar from './aside/MenuBar.vue';
import Header from './Header.vue';
import { ElNotification as notify } from 'element-plus'

const isCollapse = ref(false)
const receiveIsCollapseFromHeader = (e: boolean) => {
    isCollapse.value = e
}


const onBack = () => {
    notify('Back')
}

</script>

<template>
    <el-container class="admin-layout">
        <el-aside class="aside" :width="isCollapse ? '64px' : '280px'">
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

                <div class="up">
                    <el-page-header @back="onBack" title="返回">
                        <template #breadcrumb>
                            <el-breadcrumb separator="/">
                                <el-breadcrumb-item :to="{ path: './page-header.html' }">
                                    首页
                                </el-breadcrumb-item>
                                <el-breadcrumb-item><a href="./page-header.html">路由1</a></el-breadcrumb-item>
                                <el-breadcrumb-item>路由2</el-breadcrumb-item>
                            </el-breadcrumb>
                        </template>
                        <template #content>
                            <div class="flex items-center">
                                <span class="text-large font-600 mr-3"> 标题 </span>
                                <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">
                                    副标题
                                </span>
                            </div>
                        </template>
                        <template #extra>
                            <div class="flex items-center">
                                <el-button>操作1</el-button>
                                <el-button type="primary" class="ml-2">操作2</el-button>
                            </div>
                        </template>

                    </el-page-header>
                </div>

                <div class="middle">
                    <RouterView />
                </div>
            </el-main>
            <el-footer style="background-color: #f0f2f5;" align="center" height="30px" class="down">
                Proudly power by <a href="https://github.com/li-guohao/ikaros" target="_blank">Ikaros</a>
            </el-footer>
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
        margin: 0;
        padding: 10px 0 0 0;


        .up {
            padding: 6px 20px;
            text-align: center;

            .title {
                margin-top: 15px;
            }
        }

        .middle {
            margin: 0;
            height: 100%;
            min-height: 80%;
            background-color: #f0f2f5;
            padding: 20px;
        }

        .down {
            // height: auto;
            // position: fixed;
            // left: 0;
            // bottom: 0;
            // width: 80%;
            background-color: #f0f2f5;
            // color: rgb(24, 6, 6);
            text-align: center;
        }
    }
}
</style>