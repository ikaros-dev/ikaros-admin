<script setup lang="ts">
import { reactive, ref } from 'vue'

import MenuItem from './MenuItem.vue';


let menuItems = reactive([
    {
        path: "/document",
        component: "/system/config/a",
        alwayShow: false,
        name: "http://1.1.1.1:8080/test/a",
        meta: {
            title: "接口文档",
            icon: "el-icon-document",
            roles: ["sys:document"],
            parentId: 33
        }
    },
    {
        path: "/document2",
        component: "/system/config/a2",
        alwayShow: true,
        name: "http://1.1.1.1:8080/test/a2",
        meta: {
            title: "接口文档2",
            icon: "el-icon-document",
            roles: ["sys:document"],
            parentId: 34
        },
        children: [
            {
                path: "/sub1",
                component: "/system/config/asub1",
                alwayShow: false,
                name: "http://1.1.1.1:8080/test/asub1",
                meta: {
                    title: "接口文档SUB1",
                    icon: "el-icon-document",
                    roles: ["sys:document"],
                    parentId: 35
                }
            },
            {
                path: "/sub2",
                component: "/system/config/asub2",
                alwayShow: false,
                name: "http://1.1.1.1:8080/test/asub2",
                meta: {
                    title: "接口文档SUB2",
                    icon: "el-icon-document",
                    roles: ["sys:document"],
                    parentId: 38
                }
            }
        ]
    }
])

defineProps(['isCollapse'])

</script>

<template>
    <el-menu :collapse-transition="false" class="menu-bar"  :collapse="isCollapse">
        <MenuItem :menuItems="menuItems" />
    </el-menu>
</template>

<style lang='scss' scoped>
</style>