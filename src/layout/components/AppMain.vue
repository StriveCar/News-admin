<script setup>
import { computed } from 'vue'
import { useTagsViewStore } from '@/store/tagsView'
import { useRoute } from 'vue-router'

const route = useRoute()
const tagsView = useTagsViewStore()

const cachedViews = computed(() => tagsView.cachedViews)

const key = computed(() => route.path)
</script>

<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>