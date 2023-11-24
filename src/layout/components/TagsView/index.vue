<script setup>
import ScrollPane from './ScrollPane.vue'
import path from 'path'
import { constantRoutes } from '@/router'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'

const store = useStore()
const route = useRoute()
const router = useRouter()
const visible = ref(false)
const top = ref(0)
const left = ref(0)
const selectedTag = ref({})
const affixTags = ref([])
const tags = ref(null)
const scrollPane = ref(null)

const visitedViews = computed(() => {
  return store.state.tagsView.visitedViews
})

watch(route, () => {
  addTags()
  moveToCurrentTag()
})

watch(visible, (value, _) => {
  if (value) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})

onMounted(() => {
  initTags()
  addTags()
})

const isActive = (router) => {
  return router.path === route.path
}

const isAffix = (tag) => {
  return tag.meta && tag.meta.affix
}

const filterAffixTags = (routes, basePath = '/') => {
  let tags = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

const initTags = () => {
  const affixTag = filterAffixTags(constantRoutes)
  for (const tag of affixTag) {
    if (tag.name) {
      store.dispatch('tagsView/addVisitedView', tag)
    }
  }
  affixTags.value = affixTag
}

const addTags = () => {
  const { name } = route
  if (name) {
    store.dispatch('tagsView/addView', route)
  }
}

const moveToCurrentTag = () => {
  nextTick(() => {
    for (const tag of tags) {
      if (tag.to.path === route.path) {
        scrollPane.moveToTarget(tag)
        if (tag.to.fullPath !== route.fullPath) {
          store.dispatch('tagsView/updateVisitedView', route)
        }
        break
      }
    }
  })
}

const refreshSelectedTag = (view) => {
  store.dispatch('tagsView/delCachedView', view).then(() => {
    const { fullPath } = view
    nextTick(() => {
      router.replace({
        path: '/redirect' + fullPath
      })
    })
  })
}

const closeSelectedTag = (view) => {
  store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view)
    }
  })
}

const closeOthersTags = () => {
  router.push(selectedTag.value)
  store.dispatch('tagsView/delOthersViews', selectedTag.value).then(() => {
    moveToCurrentTag()
  })
}

const closeAllTags = (view) => {
  store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
    if (affixTags.some((tag) => tag.path === view.path)) {
      return
    }
    toLastView(visitedViews, view)
  })
}

const openMenu = (tag, event) => {
  event.preventDefault()
  selectedTag.value = tag
  top.value = event.clientY
  left.value = event.clientX
  visible.value = true
}

const closeMenu = () => {
  visible.value = false
}

const handleScroll = () => {
  closeMenu()
}

const toLastView = (visitedViews, view) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.fullPath)
  } else {
    if (view.name === 'Dashboard') {
      router.replace({ path: '/redirect' + view.fullPath })
    } else {
      router.push('/')
    }
  }
}
</script>

<template>
  <div id="tags-view-container" class="tags-view-container">
    <ScrollPane
      ref="scrollPane"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </ScrollPane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        Close
      </li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
