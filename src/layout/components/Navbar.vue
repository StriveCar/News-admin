<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'
import { useRoute, useRouter } from 'vue-router'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { ElMessageBox } from 'element-plus'
import config from '@/common/sys-config'

const appStore = useAppStore()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const userInfo = computed(() => userStore.state.userInfo)

const toggleSideBar = () => {
  appStore.toggleSidebar()
}

const logout = () => {
  ElMessageBox.confirm(
    '您确认要退出登录吗?该操作会导致您其他端的登录状态同时失效.',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      userStore.Logout().then(() => {
        router.replace(`/login?redirect=${route.fullPath}`)
      })
    })
    .catch(() => {})
}
</script>

<template>
  <div class="navbar">
    <hamburger
      :is-active="appStore.sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="appStore.device !== 'mobile'">
        <div  class="right-menu-item hover-effect">
          更新<svg-icon icon-class="fullscreen" />
        </div>
      </template>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="config.avatar" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <template #dropdown>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {

      .avatar-wrapper {
        margin-top: 5px;
        width: 70px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: 10px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
