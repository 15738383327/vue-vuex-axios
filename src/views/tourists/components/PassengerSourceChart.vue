<template>
  <div style="width: 100%;height: 100%;">
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    props: {
      PassengerSourceData: {
        type: Array,
        default: null
      }
    },
    data() {
      return {
        PassengerSourceCityName: [],
        PassengerSourceFCount: []
      }
    },
    mounted() {
      this.initChart()
    },
    watch: {
      PassengerSourceData(newVal, oldVal) {
        this.redrawChart()
      }
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.redrawChart()
      },
      redrawChart() {
        if (this.PassengerSourceData && this.PassengerSourceData.length) {
          this.PassengerSourceCityName = this.PassengerSourceData.map(item => item.cityName)
          this.PassengerSourceFCount = this.PassengerSourceData.map(item => item.fCount)
        } else {
          this.PassengerSourceCityName = []
          this.PassengerSourceFCount = []
        }
        this.chart && this.chart.setOption({
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          title: {
            text: '昨日省内各城市游客来源地排名',
            textStyle: {
              fontSize: 14,
              color: '#000'
            },
            x: 'left',
            padding: [10, 0, 100, 20]
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: this.PassengerSourceCityName,
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#000'
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#000'
                }
              },
              name: '(人)',
              nameTextStyle: {
                color: '#000'
              }
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              itemStyle: {
                normal: {
                  show: true,
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: 'skyblue' // 0% 处的颜色
                    }, {
                      offset: 1, color: '#6c6fc0' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                  },
                  barBorderRadius: 150,
                  borderWidth: 0,
                  borderColor: '#333'
                }
              },
              barWidth: '60%',
              data: this.PassengerSourceFCount
            }
          ]
        })
      }
    }
  }
</script>
