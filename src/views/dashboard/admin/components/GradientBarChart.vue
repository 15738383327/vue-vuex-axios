<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'

  // const animationDuration = 6000

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
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.initChart()
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    },
    // beforeDestroy() {
    //   if (!this.chart) {
    //     return
    //   }
    //   window.removeEventListener('resize', this.__resizeHanlder)
    //   this.chart.dispose()
    //   this.chart = null
    // },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')

        this.chart.setOption({
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'value',
              axisLine: {
                show: false
              },
              axisLabel: {
                show: false
              },
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              splitArea: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              type: 'category',
              show: 'false',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisTick: {
                show: false
              },
              axisLine: {
                show: false
              },
              splitLine: {
                show: false
              }
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              itemStyle: {
                normal: {
                  show: true,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#00FFE6'
                  }, {
                    offset: 1,
                    color: '#007CC6'
                  }]),
                  barBorderRadius: 50,
                  borderWidth: 0,
                  borderColor: '#333'
                }
              },
              data: [10, 52, 200, 334, 390, 330, 220]
            }
          ]
        })
      }
    }
  }
</script>
