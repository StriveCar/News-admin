<script setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/store/settings'
import { useUserStore } from '@/store/user'

const settingsStore = useSettingsStore()
const userStore = useUserStore()

const emit = defineEmits(['handleShowHelpClick'])
const fixedHeader = computed({
  get: () => settingsStore.state.fixedHeader,
  set: (val) => {
    settingsStore.changeSetting({
      key: 'fixedHeader',
      value: val
    })
  }
})

const roles = computed(() => userStore.state.roles)

const isSuperAdmin = computed(() => {
  return roles.value.some((v) => v === 'super-admin')
})

const tagsView = computed({
  get: () => settingsStore.state.tagsView,
  set: (val) => {
    settingsStore.changeSetting({
      key: 'tagsView',
      value: val
    })
  }
})

const sidebarLogo = computed({
  get: () => settingsStore.state.sidebarLogo,
  set: (val) => {
    settingsStore.changeSetting({
      key: 'sidebarLogo',
      value: val
    })
  }
})

const handleShowDashboardHelpClick = () => {
  emit('handleShowHelpClick', '/dashboard')
}

const handleShowRoomListHelpClick = () => {
  emit('handleShowHelpClick', '/room/list')
}

const handleShowConfigListHelpClick = () => {
  emit('handleShowHelpClick', '/config/index')
}
</script>

<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">系统布局设置与帮助</h3>

      <div class="drawer-item">
        <span>快捷导航标签</span>
        <el-switch v-model="tagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>固定顶部导航栏</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>显示logo与欢迎语</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </div>

      <div class="drawer-help-item">
        <div>首页图表说明与帮助</div>
        <div @click.stop="handleShowDashboardHelpClick" class="drawer-help-btn">
          查看
        </div>
      </div>

      <div class="drawer-help-item">
        <div>新闻管理说明与帮助</div>
        <div @click.stop="handleShowRoomListHelpClick" class="drawer-help-btn">
          查看
        </div>
      </div>

      <div v-if="isSuperAdmin" class="drawer-help-item">
        <div>配置管理说明与帮助</div>
        <div @click="handleShowConfigListHelpClick" class="drawer-help-btn">
          查看
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }

  .drawer-help-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
  }

  .drawer-help-btn,
  .drawer-help-btn:focus {
    color: #409eff;
    cursor: pointer;

    &:hover {
      color: #409eff;
    }
  }
}
</style>
