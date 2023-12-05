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
