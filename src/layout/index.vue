<script setup>
import { ref, computed, watch, onMounted, reactive } from 'vue'
import { useAppStore } from '@/store/app'
import { useSettingsStore } from '@/store/settings'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'

import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import AppMain from './components/AppMain.vue'
import TagsView from './components/TagsView/index'
import Settings from './components/Settings/index.vue'
import RightPanel from '@/components/RightPanel'
import ResizeHook from './hook/ResizeHandler'

import homeSteps from '@/layout/steps/home-steps'
import roomListStepsAdmin from '@/layout/steps/room-list-steps-admin'
import roomListStepsSuperAdmin from '@/layout/steps/room-list-steps-super-admin'
import configListSteps from '@/layout/steps/config-list-steps'

const appStore = useAppStore()
const settingsStore = useSettingsStore()
const route = useRoute()
const router = useRouter()

const rightPanel = ref(null)

const sidebar = computed(() => appStore.sidebar)
const device = computed(() => appStore.device)
ResizeHook()
const showSettings = computed(() => settingsStore.state.showSettings)
const needTagsView = computed(() => settingsStore.state.tagsView)
const fixedHeader = computed(() => settingsStore.state.fixedHeader)
const classObj = computed(() => {
  return {
    hideSidebar: !sidebar.opened,
    openSidebar: sidebar.opened,
    withoutAnimation: sidebar.withoutAnimation,
    mobile: device === 'mobile'
  }
})
const isSuperAdmin = ref(true)

let driver = reactive({})

onMounted(() => {
  driver = new Driver({
    doneBtnText: '明白了',
    closeBtnText: '不想看了',
    nextBtnText: '下一步',
    prevBtnText: '上一步'
  })
})

const handleClickOutside = () => {
  appStore.closeSidebar({ withoutAnimation: false })
}

const handleShowHelpClick = (toPath) => {
  const path = route.path
  if (path !== toPath) {
    ElMessage({
      message: '等待数据刷新完毕，1秒后开始帮助演示',
      type: 'success'
    })
    router.push(toPath)
  }
  rightPanel.closePanel()
  // 等待跳转dom刷新完毕
  nextTick(() => {
    // 开始引导操作
    switch (toPath) {
      case '/dashboard':
        setTimeout(() => {
          driver.defineSteps(homeSteps)
          driver.start()
        }, 1000)
        break
      case '/room/list':
        setTimeout(() => {
          if (isSuperAdmin.value) {
            driver.defineSteps(roomListStepsSuperAdmin)
          } else {
            driver.defineSteps(roomListStepsAdmin)
          }
          driver.start()
        }, 1000)
        break
      case '/config/index':
        setTimeout(() => {
          driver.defineSteps(configListSteps)
          driver.start()
        }, 1000)
        break
    }
  })
}
</script>

<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <Navbar />
        <TagsView v-if="needTagsView" />
      </div>
      <AppMain />
      <RightPanel ref="rightPanel" v-if="showSettings">
        <Settings @handleShowHelpClick="handleShowHelpClick" />
      </RightPanel>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
