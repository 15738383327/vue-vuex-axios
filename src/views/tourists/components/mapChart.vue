<template>
  <div :class="className" :style="{height:height,width:width}" id="MAPCHARTHJTIOOVFHJKL"></div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons')
  import 'echarts/map/js/china'

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
      RealTimeTrafficName: {
        type: String,
        default: ''
      },
      polarCoordinates: {
        type: Array,
        default: null
      },
      visualData: {
        type: Array,
        default: null
      }
    },
    data() {
      return {
        chart: null,
        planePath: 'arrow'
      }
    },
    mounted() {
      this.initChart()
    },
    methods: {
      initChart() {
        const opt = {
          backgroundColor: '#fff',
          title: {
            text: this.RealTimeTrafficName,
            left: 'center',
            top: '10px',
            textStyle: {
              color: '#000'
            },
            itemStyle: {
              normal: {
                borderColor: '#fff',
                borderWidth: 0.5,
                areaStyle: {
                  color: '#fff'
                }
              }
            }
          },
          tooltip: {
            trigger: 'item'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '0%',
            containLabel: true
          },
          geo: {
            map: 'china',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            roam: false,
            silent: false,
            itemStyle: {
              normal: {
                show: true,
                areaColor: '#648EB4',
                borderColor: '#fff'
              },
              emphasis: {
                show: true,
                areaColor: '#648EB4'
              }
            }
          },
          series: [
            {
              type: 'lines',
              zlevel: 2,
              effect: {
                show: true,
                period: 10,
                trailLength: 0.1,
                color: '#79FFFC',
                symbol: this.planePath,
                symbolSize: 6
              },
              lineStyle: {
                normal: {
                  color: '#79FFFC',
                  width: 1,
                  opacity: 0.4,
                  curveness: 0.5
                }
              },
              data: this.polarCoordinates
            },
            {

              type: 'effectScatter',
              coordinateSystem: 'geo',
              zlevel: 2,
              rippleEffect: {
                period: 4,
                scale: 2.5,
                brushType: 'stroke'
              },
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  formatter: '{b}'
                }
              },
              symbolSize: 5,
              itemStyle: {
                normal: {
                  color: '#79FFFC',
                  borderColor: '#79FFFC'
                }
              },
              data: this.visualData
            }]
        }
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption(opt)
      }
    }
  }
</script>
