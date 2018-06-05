<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
// import { debounce } from '@/utils'
import 'echarts/map/js/world'

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
      require: false,
      type: String,
      default: ''
    },
    timeLineData: {
      require: false,
      type: Array,
      default: () => {
        return []
      }
    },
    touristData: {
      require: false,
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      // chart: undefined
    }
  },
  watch: {
    touristData(val, oldVal) {
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
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    // window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons') // 初始化
    },
    setOption() {
      this.chart.setOption({
        backgroundColor: '#fff',
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
        roam: false,
        dataRange: {
          min: 0,
          max: 5,
          x: '5%',
          y: '70%',
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
        roamController: {
          show: false,
          x: 'right',
          mapTypeControl: {
            china: true
          }
        },
        series: [
          {
            name: this.touristName,
            type: 'map',
            mapType: 'china',
            zoom: 0.9,
            roam: false,
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
            data: this.touristData
          }
        ]
      })
    }
  }
}
</script>

