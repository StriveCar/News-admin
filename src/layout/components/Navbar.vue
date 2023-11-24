<script setup>
import { computed } from 'vue'
import { mapGetters, useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import Breadcrumb from '@/components/Breadcrumb.vue'
import Hamburger from '@/components/Hamburger.vue'
import { useConfirm } from 'element-plus'
import config from '@/common/sys-config'

const store = useStore()
const route = useRoute()
const router = useRouter()

const config = config

const userInfo = computed(() => store.getters.userInfo)
const sidebar = computed(() => store.getters.sidebar)

const toggleSideBar = () => {
  store.dispatch('app/toggleSideBar')
}

const logout = () => {
  const confirm = useConfirm()
  confirm(
    '您确认要退出登录吗?该操作会导致您其他端的登录状态同时失效.',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      store.dispatch('user/logout').then(() => {
        router.replace(`/login?redirect=${route.fullPath}`)
      })
    })
    .catch(() => {})
}

</script>

<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!--          <span v-if="userInfo" style="font-size: 13px;">{{userInfo.nickname}}</span>-->
          <img :src="config.avatar" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
