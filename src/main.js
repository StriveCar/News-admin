import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import installElementPlus from './plugins/element.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import lang from 'element-plus/lib/locale/lang/zh-cn' // 导入中文语言包
import 'dayjs/locale/zh-cn' // 如果您使用了 dayjs，请导入对应的中文语言包
import { locale } from 'element-plus' // 导入 locale 对象

locale(lang) // 设置 Element Plus 组件库的全局语言

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App).use(createPinia())
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
installElementPlus(app)
app.use(router).mount('#app')
