<script setup>
import dataApi from '@/api/data'
import { ref, computed } from 'vue'
import PanelGroup from '@/views/dashboard/PanelGroup'
import PieChart from '@/components/Charts/PieChart'
import BarChart from '@/components/Charts/BarChart'
import LineChart from '@/components/Charts/LineChart'
import LineMarker from '@/components/Charts/LineMarker'

const loading = ref(false)
const countLoading = ref(false)
const countData = ref({})
const pulisherData = ref({})
const roleData = ref({})
const sectionData = ref({})

const getSystemCount = () => {
  countLoading.value = true
  dataApi
    .getSystemCount()
    .then((data) => {
      countData.value = data
      countLoading.value = false
    })
    .catch((e) => {
      countLoading.value = false
    })
}

const getPulisherData = () => {
  loading.value = true
  dataApi.getPulisherData().then((data) => {
    pulisherData.value = data
  })
}
const getRoleData = () => {
  dataApi.getRoleData().then((data) => {
    roleData.value = data
  })
}
const getSectionData = () => {
  dataApi.getSectionData().then((data) => {
    sectionData.value = data
    loading.value = false
  })
}
getSystemCount()
getPulisherData()
getRoleData()
getSectionData()
</script>

<template>
  <div class="home-container">
    <div>
      <PanelGroup :loading="countLoading" :count-data="countData" />
    </div>
    <div class="chart">
      <div v-loading="loading" class="chart-wrapper2">
        <PieChart
          :class-name="'pie-chart'"
          :chartData="roleData"
          :width="'500px'"
          :height="'400px'"
        ></PieChart>
      </div>
      <div v-loading="loading" class="chart-wrapper">
        <BarChart
          :class-name="'bar-chart'"
          :chartData="pulisherData"
          :height="'600px'"
        ></BarChart>
      </div>
      <div v-loading="loading" class="chart-wrapper">
        <LineMarker :class-name="'line-chart'"
          :chartData="sectionData"
          :height="'400px'"></LineMarker>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-container {
  padding: 10px;
  background-color: #f1f1f1;
  position: relative;
}
.chart {
  padding: 30px;
}
.chart-wrapper {
  border-radius: 10px;
  background: #fff;
  padding: 32px;
  margin-bottom: 32px;
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
.pie-chart {
  border-radius: 10px;
  background: #fff;
  padding: 18px;
  margin-bottom: 32px;
}
</style>
