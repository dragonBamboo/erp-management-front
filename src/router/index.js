import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '@/views/login/LoginView.vue'
import Vue from 'vue'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
        children: [
            {
                path: '',
                name: 'goodsList',
                component: () => import('../views/report_statistics/GoodsListView.vue')
            },
            {
                path: 'currentRepertorySearch',
                name: 'CurrentRepertorySearch',
                component: () => import('../views/report_statistics/CurrentRepertorySearch.vue')
            },
            {
                path: 'addGoods',
                name: 'AddGoodsView',
                component: () => import('../views/basic_setting/AddGoodsView.vue')
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt_token\s*\=\s*([^;]*).*$)|^.*$/, '$1')
    if (!token && to.path !== '/login') {
        next('/')
    } else {
        next()
    }
})

export default router
