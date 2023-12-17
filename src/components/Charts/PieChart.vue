<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as echarts from 'echarts'
import 'echarts/theme/macarons'
// import resize from './mixins/resize'

const animationDuration = 6000

const props = defineProps({
  className: {
    type: String,
    default: 'chart'
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '400px'
  },
  chartData: {
    type: Object,
    default: () => ({})
  }
})

const chartRef = ref(null)
const chart = ref(null)

onMounted(() => {
  if (chartRef.value) {
    initChart()
  }
})

onBeforeUnmount(() => {
  if (chart.value) {
    chart.value.dispose()
    chart.value = null
  }
})

watch(
  () => props.chartData,
  (val) => {
    if (chart.value && val) {
      setOptions(val)
    }
  },
  { deep: true }
)

const initChart = () => {
  chart.value = echarts.init(chartRef.value, 'macarons',)
  setOptions(props.chartData)
}

const setOptions = ({ roleCount } = {}) => {
  chart.value.setOption({
    grid: {
      right:50,
      containLabel: true
    },
    title: {
      text: '系统角色分布',
      textStyle: {
        fontWeight: 'normal',
        fontSize: 18,
        color: '#909399'
      }
    },
    
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      show: false,
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '系统角色',
        type: 'pie',
        radius: [10, 120],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5
        },
        emphasis: {
          label: {
            show: true
          }
        },
        data: [
          {
            value: roleCount ? roleCount[0] : 0,
            name: '普通用户'
          },
          {
            value: roleCount ? roleCount[1] : 0,
            name: '新闻编辑'
          },
          {
            value: roleCount ? roleCount[2] : 0,
            name: '管理员'
          },
          {
            value: roleCount ? roleCount[3] : 0,
            name: '超级管理员'
          }
        ]
      }
    ]
  })
}
</script>

<template>
  <div
    :class="className"
    ref="chartRef"
    :style="{ height: props.height, width: props.width }"
  />
</template>

<style lang="scss" scoped>

</style>
