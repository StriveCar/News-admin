<template>
  <JsonEditor
    :total="10"
    :page="page"
    :limit="limit"
    @pagination="getRoomList"
  />
</template>

<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const locale = zhCn

import JsonEditor from '@/components/Pagination'
import { ref } from "vue";
const page = ref(1)
const limit = ref(10)
const getRoomList = () => {
  console.log('111')
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2d3a4b;
  width: 100%;
  height: 100%;
}
</style>
