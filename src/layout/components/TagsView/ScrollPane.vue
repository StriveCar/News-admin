<script setup>
import { ref, onMounted, onBeforeUnmount, computed,getCurrentInstance } from 'vue'

const tagAndTagSpacing = 4
const scrollContainer = ref(null)
const parentInstance = getCurrentInstance().parent
const emit = defineEmits(['scroll'])
const handleScroll = (e) => {
  const eventDelta = e.wheelDelta || -e.deltaY * 40
  const scrollWrapper = scrollContainer.value.$el.querySelector('.el-scrollbar__wrap')
  scrollWrapper.scrollLeft = scrollWrapper.scrollLeft + eventDelta / 4
}

const emitScroll = () => {
  emit('scroll')
}

const moveToTarget = (currentTag) => {
  const container = scrollContainer.value.$el
  const containerWidth = container.offsetWidth
  const scrollWrapper = scrollContainer.value.$el.querySelector('.el-scrollbar__wrap')
  const tagList = parentInstance.refs.tag

  let firstTag = null
  let lastTag = null

  // find first tag and last tag
  if (tagList.length > 0) {
    firstTag = tagList[0]
    lastTag = tagList[tagList.length - 1]
  }

  if (firstTag === currentTag) {
    scrollWrapper.scrollLeft = 0
  } else if (lastTag === currentTag) {
    scrollWrapper.scrollLeft = scrollWrapper.scrollWidth - containerWidth
  } else {
    // find preTag and nextTag
    const currentIndex = tagList.findIndex((item) => item === currentTag)
    const prevTag = tagList[currentIndex - 1]
    const nextTag = tagList[currentIndex + 1]

    // the tag's offsetLeft after of nextTag
    const afterNextTagOffsetLeft =
      nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

    // the tag's offsetLeft before of prevTag
    const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

    if (afterNextTagOffsetLeft > scrollWrapper.scrollLeft + containerWidth) {
      scrollWrapper.scrollLeft = afterNextTagOffsetLeft - containerWidth
    } else if (beforePrevTagOffsetLeft < scrollWrapper.scrollLeft) {
      scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
    }
  }
}


onMounted(() => {
  const scrollWrapper = scrollContainer.value.$el.querySelector('.el-scrollbar__wrap')
  scrollWrapper.addEventListener('scroll', emitScroll, true)
})

onBeforeUnmount(() => {
  const scrollWrapper = scrollContainer.value.$el.querySelector('.el-scrollbar__wrap')
  scrollWrapper.removeEventListener('scroll', emitScroll)
})
</script>

<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.native.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  ::v-deep {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
</style>
