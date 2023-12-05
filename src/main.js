import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import 'dayjs/locale/zh-cn'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import '@/styles/element-ui.scss'
import 'normalize.css/normalize.css'

import VueCookies from 'vue3-cookies'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App).use(createPinia()).use(VueCookies)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).use(ElementPlus, { zhCn }).mount('#app')
