<script setup>
import { ref, watch } from 'vue'
import { addClass, removeClass } from '@/utils'

const show = ref(false)
const tip = ref('点击查看帮助与设置')
const rightPanel=ref(null)
const props = defineProps({
  clickNotClose: {
    default: false,
    type: Boolean
  },
  buttonTop: {
    default: 250,
    type: Number
  }
})
watch(show, (newValue) => {
  if (newValue && !props.clickNotClose) {
    addEventClick()
  }
  if (newValue) {
    addClass(document.body, 'showRightPanel')
  } else {
    removeClass(document.body, 'showRightPanel')
  }
})

const closePanel = () => {
  show.value = false
  tip.value = '点击查看帮助与设置'
}
const openPanel = () => {
  show.value = true
  tip.value = '关闭'
}
const addEventClick = () => {
  window.addEventListener('click', closeSidebar)
}
const closeSidebar = (evt) => {
  const parent = evt.target.closest('.rightPanel')
  if (!parent) {
    show.value = false
    window.removeEventListener('click', closeSidebar)
  }
}
const insertToBody = () => {
  const elx = rightPanel.value
  const body = document.querySelector('body')
  body.insertBefore(elx, body.firstChild)
}
</script>

<template>
  <div ref="rightPanel" :class="{ show: show }" class="rightPanel-container">
    <div class="rightPanel-background" />
    <div class="rightPanel">
      <el-tooltip effect="light" :content="tip" placement="left">
        <div
          style="background: #1890ff"
          class="handle-button"
          :style="{ top: buttonTop + 'px' }"
          @click="show ? closePanel() : openPanel()"
        >
          <i :class="show ? 'el-icon-close' : 'el-icon-setting'" />
        </div>
      </el-tooltip>
      <div class="rightPanel-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
.showRightPanel {
  overflow: hidden;
  position: relative;
  width: calc(100% - 15px);
}
</style>

<style lang="scss" scoped>
.rightPanel-background {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  background: rgba(0, 0, 0, 0.2);
  z-index: -1;
}

.rightPanel {
  width: 100%;
  max-width: 260px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(100%);
  background: #fff;
  z-index: 40000;
}

.show {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

  .rightPanel-background {
    z-index: 20000;
    opacity: 1;
    width: 100%;
    height: 100%;
  }

  .rightPanel {
    transform: translate(0);
  }
}

.handle-button {
  width: 48px;
  height: 48px;
  position: absolute;
  left: -48px;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  line-height: 48px;
  i {
    font-size: 24px;
    line-height: 48px;
  }
}
</style>
