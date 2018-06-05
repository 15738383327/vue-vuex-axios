<template>
  <div class="dashboard-editor-container" style="height: 83vh;background: #f8f8f8;">
    <el-row class="panel-group" :gutter="40" style="height: 48%;">
      <!--客流量信息-->
      <el-col :span="10" class="card-panel-col" style="height: 100%;padding-right: 0;">
        <el-row class="card-panel-top" style="height: 47%;margin-bottom: 3%;">
          <el-col :span="24" style="height: 100%;">
            <div class="grid-content bg-green" style="height: 100%;">
              <p>实时客流量</p>
              <div class="grid-right-message">
                <count-to :startVal="0" :endVal="parseInt(PassengerTraffic[PassengerTraffic.length-1] | 0)" :duration="delayTime"></count-to>
                <small>人</small>
                <div class="Scenic-comfort" style="text-align: center;height: 4rem;width: 100%;">{{scenicComfort}}</div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="card-panel-bottom" style="height: 48%;">
          <el-col :span="12" style="height: 100%;">
            <div class="grid-content bg-blue" style="height: 100%;">
              <p>今日客流量</p>
              <p class="clearFloat">
                <count-to :startVal="0" :endVal="parseInt(TodayPassengerTraffic | 0)" :duration="delayTime"></count-to>
                <small>人</small>
              </p>
            </div>
          </el-col>
          <el-col :span="12" style="height: 100%;">
            <div class="grid-content bg-purple" style="height: 100%;">
              <p>昨日客流量</p>
              <p class="clearFloat">
                <count-to :startVal="0" :endVal="parseInt(YesterdayPassengerTraffic | 0)" :duration="delayTime"></count-to>
                <small>人</small>
              </p>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <!--昨日各区域接待游客排名-->
      <el-col :span="14" class="card-panel-col" style="height: 100%;">
        <div class="card-panel" style="height: 100%;">
          <bar-chart :echartsTitle="echartsTitle" :echartsLegend="echartsLegend" :echartsXAxis="echartsXAxis" :echartsYAxis="echartsYAxis" :echartSeries="echartSeries" ref="iBarChartScenie"></bar-chart>
        </div>
      </el-col>
      <!--END   客流量柱形图-->
    </el-row>
    <el-row :gutter="10" class="chart-box dashboard-editor-container-bottom" style="height: 48%;background: #f8f8f8;margin-left: 0;">
      <el-col :span="6" style="height: 100%;padding: 0;width: 24% ;background: #ffffff;">
        <div class="grid-content" style="height: 100%;">
          <pie-chart :pieName="pieName" :pieBarData="pieBarDataAge" style="height: 100%;"></pie-chart>
        </div>
      </el-col>
      <el-col :span="6" style="height: 100%;padding: 0;margin-right: 2%;width: 22%;background: #ffffff;">
        <div class="grid-content" style="height: 100%;padding: 0;">
          <pie-chart :pieBarData="pieBarDataGender" style="height: 100%;"></pie-chart>
        </div>
      </el-col>
      <el-col :span="6" style="height: 100%;width: 23%;margin-right: 2%;padding: 0;">
        <div class="grid-content" style="height: 100%;">
          <GradientBar-Chart :GBarName="GBarCity" :GBarData="GBarDataCity" style="height: 100%;"></GradientBar-Chart>
        </div>
      </el-col>
      <el-col :span="6" style="height: 100%;padding: 0;width: 26.5%;">
        <div class="grid-content" style="height: 100%;">
          <GradientBar-Chart :GBarName="GBarScenic" :GBarData="GBarDataScenic" style="height: 100%;"></GradientBar-Chart>
        </div>
      </el-col>
    </el-row>
  </div>
  <!--1-->
</template>

<script>
import LineChart from './components/LineChart'
import CountTo from 'vue-count-to'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
import GradientBarChart from './components/GradientBarChart'
import IndexBll from '@/service/IndexBll'
import AttributeAnalyBll from '../../service/attributeAnalyBll'
import moment from 'moment'
import dataHistoryValue from '../../service/queryDataHistoryBll'
import passengerBll from '@/service/passengerBll'

export default {
  name: 'sz-index',
  data() {
    return {
      pieBarDataAge: [
        {
          name: '22岁及以下',
          value: 0
        },
        {
          name: '23~34岁',
          value: 0
        },
        {
          name: '35~44岁',
          value: 0
        },
        {
          name: '45~54岁',
          value: 0
        },
        {
          name: '55岁及以上',
          value: 0
        }
      ],
      scenicComfort: '',
      PassengerTraffic: [],
      TodayPassengerTraffic: '',
      YesterdayPassengerTraffic: [],
      pieBarDataGender: [
        {
          name: '男',
          value: 0
        },
        {
          name: '女',
          value: 0
        }
      ],
      PassengerFlow: {},
      GBarDataCity: {},
      GBarDataScenic: {},
      // 饼图传递的数值
      pieName: '昨日游客构成',
      GBarCity: '昨日省外游客来源地TOP5省份',
      GBarScenic: '',
      // 实时客流
      delayTime: 2100,
      PassengerAttrCityData: {
        ageList: [],
        sexList: []
      },
      // 图表传值
      echartsTitle: {
        text: '昨日各区域接待游客量排名',
        padding: ['10', '0', '20', '20'],
        textStyle: {
          fontSize: '14',
          color: '#000'
        }
      },
      echartsLegend: {
        data: ['总量', '本市', '省内', '省外'],
        x: 'right',
        y: 'top'
      },
      echartsXAxis: [
        {
          data: [],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#000'
            },
            rotate: 20
          },
          z: 10
        }
      ],
      echartsYAxis: [
        {
          type: 'value',
          name: '(人)',
          nameTextStyle: {
            color: '#000',
            fontSize: 12
          },
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
      ]
    }
  },
  computed: {
    permissions() {
      return this.$store.getters.permissions
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.goPermissionsIndex()
      // 获取省客流量
      vm.getScenicTopGroupByFlow()
      // 游客年龄性别
      vm.queryPassengerAttr()
      // 获取TOP数据
      vm.getGBTopData()
      vm.getPassengerTraffic()
      vm.getDataHistory()
      vm.getTravelComfortData()
    })
  },
  beforeRouteUpdate() {
    // var searchInfo = this.$store.getters.searchInfo
    // if (searchInfo.searchinfo.permissions) {
    this.userSearch()
    // }
  },
  methods: {
    // 根据权限跳转到对应的首页
    goPermissionsIndex() {
      if (this.permissions.permissions !== 'SCENIC') {
        this.$router.push({ path: '/homePage' })
      }
    },
    userSearch() {
      // this.permissions = this.$store.getters.searchInfo.searchinfo
      this.getScenicTopGroupByFlow()
      this.queryPassengerAttr()
      this.getGBTopData()
      this.getTravelComfortData()
      this.getPassengerTraffic()
      this.getDataHistory()
    },
    // 旅游舒适度
    getTravelComfortData() {
      IndexBll.getTravelComfort(this.permissions).then(res => {
        var a = 0 // 拥挤
        var b = 0 // 较拥挤
        var c = 0 // 舒适
        var d = 0 // 较舒适
        var e = 0 // 一般
        if (res.data !== undefined) {
          var f = res.data.length
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].comfort === 1) {
              a++
            } else if (res.data[i].comfort === 2) {
              b++
            } else if (res.data[i].comfort === 5) {
              c++
            } else if (res.data[i].comfort === 4) {
              d++
            } else {
              e++
            }
          }
          if (this.permissions.permissions === 'SCENIC') {
            if (res.data.comfort === 1) {
              this.scenicComfort = '拥挤'
            } else if (res.data.comfort === 2) {
              this.scenicComfort = '较拥挤'
            } else if (res.data.comfort === 5) {
              this.scenicComfort = '舒适'
            } else if (res.data.comfort === 4) {
              this.scenicComfort = '较舒适'
            } else {
              this.scenicComfort = '一般'
            }
            this.$refs.iBarChartScenie.initBarChart()
          }
        }
        this.FivePieBarData = [[a, f - a], [b, f - b], [c, f - c], [d, f - d], [e, f - e]]
      })
    },
    // 今日客流
    getPassengerTraffic() {
      const today = moment().format('YYYYMMDD')
      passengerBll.getFLDataAPI({ ...this.permissions, startDate: today, endDate: today }).then(res => {
        this.TodayPassengerTraffic = res.totalCount.reduce((accumulate, currentVal) => accumulate + currentVal, 0)
        this.PassengerTraffic = res.totalCount
      })
    },
    // 昨日客流
    getDataHistory() {
      const yesterday = moment()
        .subtract(1, 'd')
        .format('YYYYMMDD')
      this.permissions.startDate = yesterday
      this.permissions.endDate = yesterday
      dataHistoryValue.queryDataHistory(this.permissions).then(res => {
        this.YesterdayPassengerTraffic = res[0].fCountAll
      })
    },
    // 昨日各区域接待游客量排名
    getScenicTopGroupByFlow() {
      IndexBll.getScenicTopGroupByFlowData(this.permissions).then(res => {
        // 初始化数数组
        this.echartsXAxis[0].data = []
        this.echartSeries[0].data = []
        this.echartSeries[1].data = []
        this.echartSeries[2].data = []
        this.echartSeries[3].data = []
        if (res.status === 200) {
          if (this.permissions.permissions === 'SCENIC') {
            res.data.sort((a, b) => {
              return parseInt(a.fDate) - parseInt(b.fDate)
            })
          }
          var length = 8
          if (res.data.length < length) {
            length = res.data.length
          }
          for (var i = 0; i < length; i++) {
            var item = res.data[i]
            // 根据权限控制xAxis轴的数据
            if (this.permissions.permissions === 'SCENIC') {
              this.echartsTitle.text = '景区每日接待游客量'
              this.echartsXAxis[0].data.push(item.fDate)
            } else {
              this.echartsTitle.text = '昨日各景区接待游客量排名'
              this.echartsXAxis[0].data.push(item.cfgArea.areaName.replace(/(^\s*)|(\s*$)/g, ''))
            }
            this.echartSeries[0].data.push(item.fCountAll)
            this.echartSeries[3].data.push(item.fCountLocal) // 本市
            this.echartSeries[2].data.push(item.fCountOutpro) // 外省
            this.echartSeries[1].data.push(item.fCountInpro - item.fCountLocal) // 本省 - 本市 (省内)
            this.$refs.iBarChartScenie.initBarChart()
          }
        }
      })
    },
    // 客流属性分析数据接口
    queryPassengerAttr() {
      const yesterday = moment()
        .subtract(1, 'd')
        .format('YYYYMMDD')
      this.permissions.startDate = yesterday
      this.permissions.endDate = yesterday
      this.PassengerAttrCityData.ageList = []
      this.PassengerAttrCityData.sexList = []
      // debugger
      AttributeAnalyBll.getCityTouristAttr(this.permissions).then(res => {
        // debugger
        // 获取年龄
        for (var i = 0; i < res[0].tableDate.length; i++) {
          this.pieBarDataAge[i].value = res[0].tableDate[i].num
        }
        // 获取性别
        for (var j = 0; j < res[0].sexdate.length; j++) {
          this.pieBarDataGender[j].value = res[0].sexdate[j].num
        }
      })
    },
    getGBTopData() {
      if (this.permissions.permissions === 'PROVINCE') {
        this.GBarScenic = '昨日省外游客来源地TOP10城市'
      } else {
        this.GBarScenic = '昨日省内游客来源地TOP10城市'
      }
      IndexBll.getGBTopListData(this.permissions).then(res => {
        this.GBarDataCity = {
          cityNames: res.cityNames,
          cityPercents: res.cityPercents
        }
        this.GBarDataScenic = {
          cityNames: res.scenicNames,
          cityPercents: res.scenicPercents
        }
      })
    }
  },
  components: {
    LineChart,
    PieChart,
    BarChart,
    GradientBarChart,
    CountTo
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
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
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
  background: #34bfa3 url(tourists_img/indexBarIcon2.png) no-repeat 1rem 4.6rem;
  background-size: 58% 55%;
  background-position: 10% 90%;
}

.bg-blue {
  background: #36a3f7 url(tourists_img/indexBarIcon3.png) no-repeat 1rem 6.5rem;
  background-size: 88% 38%;
  background-position: 50% 90%;
}

.bg-purple {
  background: #6c6fc0 url(tourists_img/indexBarIcon3.png) no-repeat 1rem 6.5rem;
  background-size: 88% 38%;
  background-position: 50% 90%;
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
  height: 11rem;
  margin: 0;
  .grid-right-message {
    float: right;
    margin: 0 40px 0 0;
    line-height: 4rem;
    font-size: 2rem;
    color: #fff;
  }
}

.card-panel-bottom div {
  height: 11rem;
  margin: 0;
}

small {
  font-size: 16px;
}
.dashboard-editor-container {
  padding: 10px 32px;
  // background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
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

.chart-box {
  background: #fff;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
