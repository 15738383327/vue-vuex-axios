<template>
  <div :id="chartsId" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons')
  // import { debounce } from '@/utils'

  export default {
    props: {
      chartsId: '',
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      },
      dtimeData: {
        require: false,
        type: Array,
        default: () => {
          return []
        }
      },
      jcountData: {
        require: false,
        type: Array,
        default: () => {
          return []
        }
      },
      dcountData: {
        require: false,
        type: Array,
        default: () => {
          return []
        }
      },
      holidayName: {
        require: false,
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {}
    },
    watch: {
      'legendData': {
        handler(val, oldval) {
          this.setOption()
        }
      },
      'dtimeData': {
        handler(val, oldval) {
          this.setOption()
        }
      },
      'jcountData': {
        handler(val, oldval) {
          this.setOption()
        }
      },
      'dcountData': {
        handler(val, oldval) {
          this.setOption()
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
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHanlder)
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOption()
      },
      setOption() {
        this.chart.setOption({
          backgroundColor: '#fff',
          title: {
            text: '客流量对比分析',
            show: false,
            textStyle: {
              fontWeight: 'normal',
              fontSize: 16,
              color: '#F1F1F3'
            },
            left: '6%'
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
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: this.holidayName,
            right: 'auto',
            textStyle: {
              fontSize: 12,
              color: '#000'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            top: '10%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#5ab1ef'
              }
            },
            axisLabel: {
              textStyle: {
                fontSize: 14,
                color: '#000'
              }
            },
            data: this.dtimeData
          }],
          yAxis: [{
            type: 'value',
            name: '客流量(人)',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#5ab1ef'
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 14,
                color: '#000'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#f5f5f5'
              }
            }
          }],
          series: [{
            name: this.holidayName[0],
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: true,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(219, 50, 51, 0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(219, 50, 51, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(219,50,51)',
                borderColor: 'rgba(219,50,51,0.2)',
                borderWidth: 12
              }
            },
            data: this.dcountData
          },
          {
            name: this.holidayName[1],
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: true,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0, 136, 212, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(0, 136, 212, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(0,136,212)',
                borderColor: 'rgba(0,136,212,0.2)',
                borderWidth: 12
              }
            },
            data: this.jcountData
          }]
        })
      }
    }
  }
</script>
