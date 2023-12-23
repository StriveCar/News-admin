<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default {
  setup() {
    const locale = zhCn
    return {
      locale
    }
  }
}

const debounce = (fn, delay) => {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

const _ResizeObserver = window.ResizeObserver

window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 16)
    super(callback)
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
}
html {
  padding: 0;
  margin: 0;
}
</style>
