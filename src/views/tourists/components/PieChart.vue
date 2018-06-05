<template>
  <div :class="className"  :style="{height:height,width:width}">
  </div>
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
    },
    // 饼图传递的数值
    pieName: {
      require: false,
      type: String
    },
    pieBarData: {
      require: false,
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
        title: {
          text: this.pieName,
          x: 'left',
          padding: ['10', '0', '50', '20'],
          textStyle: {
            fontSize: '14',
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        calculable: true,
        series: [
          {
            name: this.pieName,
            type: 'pie',
            roseType: 'radius',
            radius: ['30%', '60%'],
            center: ['50%', '50%'],
            color: ['#4c6e78', '#d6b0bf', '#1aa294', '#96bebd', '#ff6434'],
            data: [],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  fontSize: 12,
                  formatter: '{b} \n {d}%'
                }
              },
              labelLine: {
                normal: {
                  length: 0,
                  length2: 5
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            labelLine: {
              normal: {
                length: 0,
                length2: 10
              }
            },
            animationEasing: 'CubicInOut',
            animationDuration: 2000
          }
        ]
      }
    }
  },
  watch: {
    'pieBarData': {
      deep: true,
      handler(val, oldVal) {
        const ary = []
        for (const i in val) {
          ary.push(val[i].name)
        }
        // this.eOptions.legend = { data: ary, x: 'center', y: '300' }
        this.eOptions.series[0].data = val
        this.chart.setOption(this.eOptions)
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
  // beforeDestroy() {
  //   if (!this.chart) { return }
  //   window.removeEventListener('resize', this.__resizeHanlder)
  //   this.chart.dispose()
  //   this.chart = null
  // },
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
