<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSettingsStore } from '@/store/settings'
import { useAppStore } from '@/store/app'
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.scss'

const settingsStore = useSettingsStore()
const appStore = useAppStore()
const route = useRoute()
const router = useRouter()
const showLogo = computed(() => settingsStore.state.sidebarLogo)
const sidebar = computed(() => appStore.sidebar)
const routes = computed(() => router.options.routes)

const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

const isCollapse = computed(() => !sidebar.value.opened)

</script>

<template>
  <div :class="{ 'has-logo': showLogo }">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
