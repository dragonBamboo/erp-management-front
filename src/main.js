// import Vue, { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import VueCookies from 'vue-cookies'
// import echarts from 'echarts'
//
// createApp(App).use(router).use(ElementPlus).use(VueCookies).mount('#app')
//
// app.config.globalProperties.$echarts = echarts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueCookies from 'vue-cookies'
import * as echarts from 'echarts'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(VueCookies)

// 将 echarts 挂载到 Vue 原型上，这样在组件中就可以通过 this.$echarts 访问 echarts 对象
app.config.globalProperties.$echarts = echarts

app.mount('#app')