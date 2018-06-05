<template>
  <div :class="className" style="width: 100%;height: 100%;">
  </div>
</template>

<script>
  import echarts from 'echarts'

  // require('echarts/theme/macarons')
  // import { debounce } from '@/utils'

  var labelBottom = {
    normal: {
      label: {
        show: true,
        position: 'center',
        formatter: '{c}',
        textStyle: {
          baseline: 'bottom'
        }
      },
      labelLine: {
        show: false
      }
    }
  }
  var labelTop = {
    normal: {
      color: '#ccc',
      label: {
        show: true,
        position: 'center',
        formatter: '{b}',
        textStyle: {
          baseline: 'bottom',
          color: '#000'
        }
      },
      labelLine: {
        show: false
      }
    },
    emphasis: {
      color: 'rgba(0,0,0,0)'
    }
  }
  var pieColor = ['#fc7950', '#d9b8c5', '#1ca395', '#5ebdf8', '#fee34e']
  var radius = [[30, 45], [30, 45], [30, 55], [30, 45], [30, 45]]
  var comfortName = ['拥挤', '较拥挤', '舒适', '较舒适', '一般']
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
        default: '380px'
      },
      // 饼图传递的数值
      FivepieName: {
        require: false,
        type: String
      },
      FivePieBarData: {
        type: Array,
        default: null
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.initChart()
    },
    watch: {
      FivePieBarData(newVal, oldVal) {
        this.redrawChart()
      }
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.redrawChart()
      },
      redrawChart() {
        this.chart && this.chart.setOption({
          title: {
            text: '旅游舒适度',
            textStyle: {
              fontSize: 14,
              color: '#000'
            },
            x: 'left',
            padding: [10, 0, 100, 20]
          },
          grid: {
            left: '0',
            bottom: '0%',
            containLabel: true
          },
          series: this.getSeriesList(this.FivePieBarData)
        })
      },
      getSeriesList(arr) {
        arr.length || (arr = [[1, 2], [1, 2], [1, 2], [1, 2], [1, 2]])
        var seriesList = []
        for (var i = 0; i < arr.length; i++) {
          var params = {
            type: 'pie',
            center: ['10%', '60%'],
            radius: [30, 45],
            x: '0%', // for funnel
            itemStyle: {
              normal: {
                label: {
                  formatter: function(params) {
                    return params.value
                  },
                  textStyle: {
                    baseline: 'top'
                  }
                },
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'red' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#ccc' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            data: [
              { name: 'other', value: 75, itemStyle: labelBottom },
              { name: '剧情', value: 25, itemStyle: labelTop }
            ]
          }
          params.data[0].value = arr[i][0]
          params.data[1].value = arr[i][1]
          params.radius = radius[i]
          params.data[1].name = comfortName[i]
          params.itemStyle.normal.color.colorStops[0].color = pieColor[i]
          var left = 10 + i * 20 + '%'
          params.center = [left, '60%']
          seriesList.push(params)
        }
        return seriesList
      }
    }
  }
</script>
