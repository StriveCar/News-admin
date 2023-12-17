<script setup>
import { onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue'
import * as echarts from 'echarts'
import 'echarts/theme/macarons'
// import resize from './mixins/resize'

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
    initChart();
  }
});

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
  chart.value = echarts.init(chartRef.value, 'macarons')
  setOptions(props.chartData)
}

const setOptions = ({ name, newsCount, viewsSum, likeSum }) => {
  chart.value.setOption({
    title: {
      text: '热门编辑数据',
      textStyle: {
        fontWeight: 'normal',
        fontSize: 18,
        color: '#909399'
      }
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#409EFF'
        }
      },
      data: name
    },
    grid: {
      top: 60,
      left: '2%',
      right: '2%',
      bottom: '3%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#57617B'
        }
      }
    },
    legend: {
      legend: {
        top: 5,
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 13,
        data: ['点赞总数', '浏览总数', '新闻总数'],
        textStyle: {
          fontSize: 12
        }
      }
    },
    series: [
      {
        name: '浏览总数',
        type: 'bar',
        data: viewsSum
      },
      {
        name: '点赞总数',
        type: 'bar',
        data: likeSum
      },
      {
        name: '新闻总数',
        type: 'bar',
        data: newsCount
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

<style lang="scss" scoped></style>
