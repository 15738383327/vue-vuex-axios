<template>
   <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
// import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      required: false,
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      chart: null,
      eOptions: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          x: 'center',
          y: '300',
          data: ['星期一', '星期二', '12', '555', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
        },
        series: [
          {
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
            label: {
              normal: {
                position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '星期一' },
              { value: 679, name: '星期二' },
              { value: 1548, name: '12', selected: true }
            ]
          },
          {
            type: 'pie',
            radius: ['45%', '60%'],
            label: {
              normal: {
              }
            },
            data: [
              { value: 335, name: '直达' },
              { value: 310, name: '星期二' },
              { value: 234, name: '555' },
              { value: 135, name: '视频广告' },
              { value: 1048, name: '百度' },
              { value: 251, name: '谷歌' },
              { value: 147, name: '必应' },
              { value: 102, name: '其他' }
            ]
          }
        ]
      }
    }
  },
  mounted() {
    this.initChart()
    // this.__resizeHanlder = debounce(() => {
    //   if (this.chart) {
    //     this.chart.resize()
    //   }
    // }, 100)
    // window.addEventListener('resize', this.__resizeHanlder)
  },
  methods: {
    initChart() {
      this.$nextTick(() => {
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption(this.eOptions)
      })
    }
  }
}
</script>

