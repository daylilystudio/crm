import { createApp } from 'vue'
import http from './utils/http'
import { AxiosKey } from './utils/symbols'
import { routes } from './router'
import { store, key } from './store/store'
import { createRouter, createWebHashHistory } from 'vue-router'
import './assets/scss/main.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
// import tw from './plugins/elementplus'
import App from './App.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior () {
    return { top: 0, behavior: 'smooth' }
  }
})

const app = createApp(App)

app.provide(AxiosKey, http)
  .use(store, key)
  .use(router)
  .use(ElementPlus) // Chinese: , { locale: tw }
  .mount('#app')
