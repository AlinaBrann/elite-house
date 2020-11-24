import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router ({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/details/:Pid',
            name: 'CatalogItemDetails',
            component: () => import('@/components/CatalogItemDetails/CatalogItemDetails.vue')
        }
    ]
})