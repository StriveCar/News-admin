<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
})
const isSvg = computed(() => {
  if (props.icon.includes('el-icon')) {
    return true
  } else {
    return false
  }
})
</script>

<template>
  <i v-if="isSvg" :class="[props.icon, 'sub-el-icon']"></i>
  <svg-icon :icon-class="props.icon"></svg-icon>
  <span v-if="props.title">{{ props.title }}</span>
</template>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
