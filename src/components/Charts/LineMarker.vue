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
  chart.value = echarts.init(chartRef.value, 'macarons')
  setOptions(props.chartData)
}

const setOptions = ({ name, newsCount, viewsSum, likeSum }) => {
  chart.value.setOption({
    title: {
      text: '栏目总数据',
      textStyle: {
        fontWeight: 'normal',
        fontSize: 18,
        color: '#909399'
      }
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
      top: 5,
      icon: 'rect',
      itemWidth: 14,
      itemHeight: 5,
      itemGap: 13,
      data: ['浏览总数', '点赞总数', '新闻总数'],
      right: '2%',
      textStyle: {
        fontSize: 12
      }
    },
    grid: {
      top: 80,
      left: '2%',
      right: '2%',
      bottom: '2%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#409EFF'
          }
        },
        data: name
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#409EFF'
          }
        },
        axisLabel: {
          margin: 10,
          textStyle: {
            fontSize: 14
          }
        },
        splitLine: {
          lineStyle: {
            color: '#C0C4CC'
          }
        }
      }
    ],
    series: [
      {
        name: '浏览总数',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          width: 1
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(0, 136, 212, 0.3)'
              },
              {
                offset: 0.8,
                color: 'rgba(0, 136, 212, 0)'
              }
            ],
            false
          ),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        },
        itemStyle: {
          color: 'rgb(0,136,212)',
          borderColor: 'rgba(0,136,212,0.2)',
          borderWidth: 12
        },
        data: viewsSum
      },
      {
        name: '点赞总数',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          width: 1
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(219, 50, 51, 0.3)'
              },
              {
                offset: 0.8,
                color: 'rgba(219, 50, 51, 0)'
              }
            ],
            false
          ),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        },
        itemStyle: {
          color: 'rgb(219,50,51)',
          borderColor: 'rgba(219,50,51,0.2)',
          borderWidth: 12
        },
        data: likeSum
      },
      {
        name: '新闻总数',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          width: 1
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(137, 189, 27, 0.3)'
              },
              {
                offset: 0.8,
                color: 'rgba(137, 189, 27, 0)'
              }
            ],
            false
          ),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        },
        itemStyle: {
          color: 'rgb(137,189,27)',
          borderColor: 'rgba(137,189,2,0.27)',
          borderWidth: 12
        },
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
