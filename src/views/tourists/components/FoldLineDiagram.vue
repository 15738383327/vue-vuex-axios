<template>
  <div :class="className" :style="{height:height,width:width}" id="BARCHARTHJTIOOVF"></div>
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
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    fldData: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {
      eOptions: {
        title: {
          text: '实时客流分析', // this.fldData.chartName
          left: 'center',
          top: '0',
          textStyle: {
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: '15px',
          left: 'center',
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          padding: [20, 10, 20, 10],
          data: this.fldData.legends
        },
        xAxis: [{
          name: '时间',
          show: true,
          type: 'category',
          align: 'center',
          boundaryGap: false,
          data: this.fldData.axisTime,
          axisLabel: {
            color: '#000',
            rotate: 0
          }
        }],
        yAxis: [{
          name: '客流量(人)',
          type: 'value',
          axisLabel: {
            color: '#000'
          }
        }],
        series: [
          {
            name: '总量',
            type: 'line',
            symbol: 'diamond',
            areaStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#28b4b6' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#fff' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            symbolSize: 10,
            data: this.fldData.totalCount
          },
          {
            name: '',
            type: 'line',
            symbol: 'circle',
            symbolSize: 10,
            data: this.fldData.localCount | []
          },
          {
            name: '省内跨地市',
            type: 'line',
            symbol: 'triangle',
            symbolSize: 10,
            data: this.fldData.localCity
          },
          {
            name: '省外',
            type: 'line',
            symbol: 'roundRect',
            symbolSize: 10,
            data: this.fldData.provOuter
          }
        ]
      }
    }
  },
  mounted() {
    this.initBarChart()
    // this.__resizeHanlder = debounce(() => {
    //   if (this.chart) {
    //     this.chart.resize()
    //   }
    // }, 100)
    // window.addEventListener('resize', this.__resizeHanlder)
  },
  // beforeDestroy() {
  //   if (!this.chart) {
  //     return
  //   }
  //   window.removeEventListener('resize', this.__resizeHanlder)
  //   this.chart.dispose()
  //   this.chart = null
  // },
  watch: {
    'fldData': {
      handler(val, oldval) {
        this.eOptions.legend.data = val.legends
        this.eOptions.xAxis[0].data = val.axisTime
        this.eOptions.series[0].data = val.totalCount
        if (val.localCount.length !== 0) {
          this.eOptions.series[1].name = '本地'
          this.eOptions.series[1].data = val.localCount
        }
        this.eOptions.series[2].data = val.localCity
        this.eOptions.series[3].data = val.provOuter
        this.chart.setOption(this.eOptions)
      }
    }
  },
  methods: {
    initBarChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption(this.eOptions)
    }
  }
}
</script>

