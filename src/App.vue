<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const locale = zhCn


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
