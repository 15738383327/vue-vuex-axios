<template>
  <el-row class="panel-group" :gutter="40" style="height: 18rem;">
    <el-col :span="10" class="card-panel-col" style="height: 18rem;">
      <el-row class="card-panel-top">
        <el-col :span="24">
          <div class="grid-content bg-green">
            <p>实时客流量</p>
            <div class="grid-right-message">
              <count-to :startVal="0" :endVal="parseInt(PassengerFlow.realSum | 0)" :duration="delayTime"></count-to>
              <small>人</small>
              <div class="Scenic-comfort" :disabled="comfortFlag" style="text-align: center;">{{ScenicComfort}}</div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="card-panel-bottom">
        <el-col :span="12">
          <div class="grid-content bg-blue">
            <p>今日客流量</p>
            <p class="clearFloat">
              <count-to :startVal="0" :endVal="parseInt(PassengerFlow.todaySum | 0)" :duration="delayTime"></count-to>
              <small>人</small>
            </p>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <p>昨日客流量</p>
            <p class="clearFloat">
              <count-to :startVal="0" :endVal="parseInt(PassengerFlow.yestodaySum | 0)"
                        :duration="delayTime"></count-to>
              <small>人</small>
            </p>
          </div>
        </el-col>
      </el-row>
    </el-col>
    <!--END   客流量信息-->
    <el-col :span="14" class="card-panel-col" style="height: 18rem;">
      <div class="card-panel" style="height: 18rem;">
        <bar-chart :echartsTitle="echartsTitle" :echartsLegend="echartsLegend" :echartsXAxis="echartsXAxis"
                   :echartsYAxis="echartsYAxis" :echartSeries="echartSeries" ref="barChart" style="height: 18rem;"></bar-chart>
      </div>
    </el-col>
    <!--END   客流量柱形图-->
  </el-row>
</template>

<script>
  import CountTo from 'vue-count-to'
  import BarChart from './BarChart'
  import { oAuthPermissions } from '@/utils/auth'
  import IndexBll from '@/service/IndexBll'

  export default {
    props: {
      PassengerFlow: {
        required: false,
        type: Object,
        default: () => {
          return 0
        }
      }
    },
    data() {
      return {
        delayTime: 2100,
        comfortFlag: false,
        ScenicComfort: '',
        // 图表传值
        echartsTitle: {
          text: '昨日各区域接待游客量排名',
          padding: ['10', '0', '10', '30'],
          textStyle: {
            fontSize: '16',
            color: '#000'
          }
        },
        echartsLegend: {
          data: ['总量', '本市', '省外', '省内'],
          x: 'right',
          y: 'top'
        },
        echartsXAxis: [
          {
            data: [],
            axisLabel: {
              show: true,
              rotate: -25,
              textStyle: {
                color: '#000'
              }
            }
          }
        ],
        echartsYAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              color: '#000'
            }
          }
        ],
        echartSeries: [
          {
            name: '总量',
            type: 'bar',
            data: [],
            barWidth: '25%',
            barMaxWidth: '30px',
            itemStyle: {
              normal: {
                color: '#29C2BD',
                barBorderRadius: [15, 15, 0, 0],
                shadowColor: 'rgba(0,0,0,0)',
                shadowBlur: 3,
                shadowOffsetY: 3
              }
            }
          },
          {
            name: '省外',
            type: 'bar',
            stack: '流量',
            data: [],
            barWidth: '25%',
            barMaxWidth: '30px',
            itemStyle: {
              normal: {
                color: '#6DAAE3',
                shadowColor: 'rgba(0,0,0,0)',
                shadowBlur: 3,
                shadowOffsetY: 3
              }
            }
          },
          {
            name: '省内',
            type: 'bar',
            stack: '流量',
            data: [],
            barWidth: '25%',
            barMaxWidth: '30px',
            itemStyle: {
              normal: {
                color: '#B1D9EC'
              }
            }
          },
          {
            name: '本市',
            type: 'bar',
            stack: '流量',
            data: [],
            barWidth: '25%',
            barMaxWidth: '30px',
            itemStyle: {
              normal: {
                color: '#D1B3C0',
                barBorderRadius: [15, 15, 0, 0]
              }
            }
          }
        ],
        userInfo: '',
        permissions: ''
      }
    },
    mounted() {
      this.userInfo = this.$store.getters.userInfo
      this.permissions = oAuthPermissions(this.userInfo.role)
      this.getScenicTopGroupByFlow()
    },
    beforeRouteUpdate() {
      this.userSearch()
    },
    methods: {
      userSearch() {
        var searchParams = this.$store.getters.searchInfo
        this.permissions = searchParams.searchinfo
        this.getScenicTopGroupByFlow()
        if (searchParams.searchinfo.permissions === 'SCENIC') {
          this.comfortFlag = true
          this.getScenicComfortData()
        }
      },
      // 获取景区舒适度
      getScenicComfortData() {
        IndexBll.getTravelComfort(this.permissions).then((res) => {
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].comfort === 1) {
              this.comfortFlag = '拥挤'
            } else if (res.data[i].comfort === 2) {
              this.comfortFlag = '较拥挤'
            } else if (res.data[i].comfort === 5) {
              this.comfortFlag = '舒适'
            } else if (res.data[i].comfort === 4) {
              this.comfortFlag = '较舒适'
            } else {
              this.comfortFlag = '一般'
            }
          }
        })
      },
      // 获取省客流量
      getScenicTopGroupByFlow() {
        IndexBll.getScenicTopGroupByFlowData(this.permissions).then((res) => {
          var permissions = this.permissions.permissions
          // 初始化数数组
          this.echartsXAxis[0].data = []
          this.echartSeries[0].data = []
          this.echartSeries[1].data = []
          this.echartSeries[2].data = []
          this.echartSeries[3].data = []
          if (res.status === 200) {
            var length = 8
            if (res.data.length < length) {
              length = res.data.length
            }
            for (var i = 0; i < length; i++) {
              var item = res.data[i]
              // 根据权限控制xAxis轴的数据
              if (permissions === 'SCENIC') {
                this.echartsXAxis[0].data.push(item.fDate)
              } else {
                this.echartsXAxis[0].data.push(item.cfgArea.areaName)
              }
              this.echartSeries[0].data.push(item.fCountAll)
              this.echartSeries[3].data.push(item.fCountLocal) // 本市
              this.echartSeries[2].data.push(item.fCountOutpro) // 外省
              this.echartSeries[1].data.push(item.fCountInpro - item.fCountLocal) // 本省 - 本市 (省内)
            }
          }
        })
      }
    },
    components: {
      CountTo,
      BarChart
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .panel-group {
    margin-top: 18px;
    .card-panel {
      cursor: pointer;
      height: 23.2rem;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
    }
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-green {
    background: #34bfa3 url(../tourists_img/indexBarIcon1.png) no-repeat 1rem 3rem;
    background-size: 58% 55%;
  }

  .bg-blue {
    background: #36a3f7 url(../tourists_img/indexBarIcon2.png) no-repeat 1rem 5.5rem;
    background-size: 50% 98%;
  }

  .bg-purple {
    background: #6c6fc0 url(../tourists_img/indexBarIcon3.png) no-repeat 1rem 5.5rem;
    background-size: 50% 98%;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    p {
      margin: 0;
      padding: 1rem 0 0 1.6rem;
      float: left;
      font-size: 16px;
      line-height: 1.6;
      color: #fff;
      &.clearFloat {
        clear: both;
        width: 100%;
        padding-left: 0;
        font-size: 2rem;
        text-align: center;
      }
    }
  }

  .card-panel-top div {
    height: 8rem;
    .grid-right-message {
      float: right;
      margin: 0 40px 0 0;
      line-height: 4rem;
      height: 4rem;
      font-size: 2rem;
      color: #fff;
    }
  }

  .card-panel-bottom div {
    height: 8rem;
    margin: 0;
  }

  small {
    font-size: 16px;
  }
</style>
