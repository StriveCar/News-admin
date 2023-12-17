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
import 'normalize.css/normalize.css'
import VueCookies from 'vue3-cookies'

import loadSvg from '@/icons'

import Permission from "@/directive/permission";
import Waves from '@/directive/waves'
import { parseTime } from "@/utils";

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App).use(createPinia()).use(VueCookies)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.config.globalProperties.$parseTime = parseTime
loadSvg(app)
// app.use(Permission).use(Waves)
app.directive("permission", Permission)
app.directive("waves",Waves)
app.use(router).use(ElementPlus, { zhCn }).mount('#app')
