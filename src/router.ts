// vue-router
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from '@/components/Dashboard.vue'


const routes:Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'HelloWorld',
        component: Dashboard
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router