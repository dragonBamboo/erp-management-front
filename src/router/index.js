import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '@/views/login/LoginView.vue'

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
        children:[
            {
                path: '',
                name: 'goodsList',
                component:()=>import('../views/report_statistics/GoodsListView.vue')
            },
            {
                path: 'currentRepertorySearch',
                name: 'CurrentRepertorySearch',
                component:()=>import('../views/report_statistics/CurrentRepertorySearch.vue')
            },
            {
                path: 'relax',
                name:'RelaxView',
                component:()=>import('../views/RelaxView.vue')
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
