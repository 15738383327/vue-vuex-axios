<template>
  <div :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  // import { debounce } from '@/utils'
  
  export default {
    props: {
      chartsId: '',
      xAxis: {
        type: Array,
        default: null
      },
      yAxis: {
        type: Array,
        default: null
      },
      title: {
        type: String,
        default: null
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '300px'
      }
    },
    data() {
      return {
        chart: null
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
        var posList = [
          'left', 'right', 'top', 'bottom',
          'inside',
          'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
          'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
        ]
        /* eslint-disable */
        app.configParameters = {
          rotate: {
            min: -90,
            max: 90
          },
          align: {
            options: {
              left: 'left',
              center: 'center',
              right: 'right'
            }
          },
          verticalAlign: {
            options: {
              top: 'top',
              middle: 'middle',
              bottom: 'bottom'
            }
          },
          position: {
            options: echarts.util.reduce(posList, function(map, pos) {
              map[pos] = pos
              return map
            }, {})
          },
          distance: {
            min: 0,
            max: 100
          }
        }
        /* eslint-disable */
        app.config = {
          rotate: 90,
          align: 'left',
          verticalAlign: 'middle',
          position: 'insideBottom',
          distance: 15,
          onChange: function() {
            var labelOption = {
              normal: {
                rotate: app.config.rotate,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                position: app.config.position,
                distance: app.config.distance
              }
            }
            this.chart.setOption({
              series: [{
                label: labelOption
              }, {
                label: labelOption
              }, {
                label: labelOption
              }, {
                label: labelOption
              }]
            })
          }
        }

        var labelOption = {
          normal: {
            show: true,
            position: app.config.position,
            distance: app.config.distance,
            align: app.config.align,
            verticalAlign: app.config.verticalAlign,
            rotate: app.config.rotate,
            formatter: '{c}  {name|{a}}',
            fontSize: 16,
            rich: {
              name: {
                textBorderColor: '#fff'
              }
            }
          }
        }
        this.chart.setOption({
          color: ['#3898be', '#29c2bd', '#d6b0bf'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['11', '22', '33']
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              axisTick: { show: false },
              data: this.xAxis
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '11',
              type: 'bar',
              barGap: 0,
              label: labelOption,
              data: this.yAxis
            },
            {
              name: '22',
              type: 'bar',
              label: labelOption,
              data: this.yAxis
            },
            {
              name: '33',
              type: 'bar',
              label: labelOption,
              data: this.yAxis
            }
          ]
        })
      }
    }
  }
</script>
