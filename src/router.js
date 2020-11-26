import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router ({
    mode: 'history',
    scrollBehavior: function(to) {
        if (to.hash) {
            return {selector: to.hash}
        } else {
            return { x: 0, y: 0 }
        }
    },
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