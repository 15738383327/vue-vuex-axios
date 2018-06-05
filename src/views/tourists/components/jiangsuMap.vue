<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
// import { debounce } from '@/utils'
import 'echarts/map/js/province/jiangsu'

export default {
  props: {
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
      default: '100%'
    },
    touristName: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => [{ name: '南京市', value: 100 }, { name: '徐州市', value: 10 }]
    }
  },
  data() {
    return {
      // chart: undefined
    }
  },
  watch: {
    data() {
      this.setOption()
    }
  },
  mounted() {
    this.initChart()
    this.setOption()
    // this.__resizeHanlder = debounce(() => {
    //   if (this.chart) {
    //     this.chart.resize()
    //   }
    // }, 100)
    // window.addEventListener('resize', this.__resizeHanlder)
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons') // 初始化
    },
    setOption() {
      this.chart.setOption({
        title: {
          text: this.touristName,
          x: 'center',
          y: '5%',
          textStyle: {
            color: '#000',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: ({c}%)'
        },
        dataRange: {
          min: 0,
          max: 5,
          x: '5%',
          y: '80%',
          splitList: [
            {
              start: 50,
              end: 100,
              label: '>50%',
              color: '#ff4401'
            },
            {
              start: 10,
              end: 50,
              label: '10%~50%',
              color: '#fe9e02'
            },
            {
              start: 5,
              end: 10,
              label: '5%~10%',
              color: '#ffff00'
            },
            {
              start: 1,
              end: 5,
              label: '1%~5%',
              color: '#c3e77c'
            },
            {
              start: 0,
              end: 1,
              label: '1%以下',
              color: '#87cffb'
            }
          ]
        },
        series: [
          {
            type: 'map',
            map: '江苏',
            selectedMode: 'single',
            left: 'center',
            top: '15%',
            zoom: 0.9,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  textStyle: { color: '#292421', fontSize: 12 }
                }
              },
              emphasis: {
                label: {
                  show: true
                }
              }
            },
            data: this.data
          }
        ]
      })
    }
  }
}
</script>
