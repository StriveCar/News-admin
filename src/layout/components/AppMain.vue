<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useStore()

const cachedViews = computed(() => store.state.tagsView.cachedViews)

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
