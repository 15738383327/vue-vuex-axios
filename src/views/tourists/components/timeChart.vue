<template>
  <div :id="chartsId" :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons')
  // import { debounce } from '@/utils'
  import UUID from '../../../utils/uuid'
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
      tChartDataName: {
        type: String,
        default: ''
      },
      TLegendData: {
        type: Array,
        default: () => {
          return []
        }
      },
      tChartData: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        chart: null,
        eOptions: {
          legend: {
            show: false,
            orient: 'vertical',
            x: 'right',
            data: this.TLegendData,
            formatter: name => {
              const oa = this.eOptions.series[0].data
              const num = oa[0].value + oa[1].value + oa[2].value + oa[3].value
              for (var i = 0; i < this.eOptions.series[0].data.length; i++) {
                if (name === oa[i].name) {
                  return name + '' + oa[i].value + '' + (oa[i].value / num * 100).toFixed(2) + '%'
                }
              }
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          calculable: true,
          series: [
            {
              name: this.tChartDataName,
              type: 'pie',
              radius: ['25%', '65%'],
              center: ['50%', '50%'],
              color: ['#4c6e78', '#d6b0bf', '#1aa294', '#96bebd', '#ff6434'],
              roseType: 'radius',
              data: this.tChartData,
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    fontSize: 16,
                    formatter: '{b} \n{d}%'
                  }
                },
                labelLine: {
                  normal: {
                    length: 0,
                    length2: 10
                  }
                },
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        },
        chartsId: ''
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
    // beforeDestroy() {
    //   if (!this.chart) {
    //     return
    //   }
    //   window.removeEventListener('resize', this.__resizeHanlder)
    //   this.chart.dispose()
    //   this.chart = null
    // },
    watch: {
      'tChartData': {
        handler(val, oldVal) {
          this.eOptions.series[0].data = val
          this.initChart()
        }
      }
    },
    methods: {
      initChart() {
        this.chartsId = 'TIMECHAR' + UUID.getUID(8, 16)
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption(this.eOptions)
      }
    }
  }
</script>
