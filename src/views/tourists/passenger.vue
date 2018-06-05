<template>
  <div class="mainBody">
    <div class="containBody">
      <div class="containLeft">
        <!-- <map-chart :RealTimeTrafficName="RealTimeTrafficName" :polarCoordinates="polarCoordinates" :visualData = "visualData"></map-chart> -->
        <fld :fldData="fldData" ref="resetChart"></fld>
      </div>
      <div class="containRight" style="width: 50%;">
        <div class="peoNum">
          <div class="peoFlow">今日客流：
            <span>{{todayPassenger+'人'}}</span>
          </div>
          <div class="peoFlow">实时客流：
            <span>{{realTimePassenger+'人'}}</span>
          </div>
        </div>
        <i-table :tableData="tableData" :columns="columns" :showPagination="showPagination" :otherHeight="otherHeight">
        </i-table>
      </div>
    </div>
  </div>
</template>
<script>
import mapChart from './components/mapChart'
import fld from './components/FoldLineDiagram.vue'
import passengerBll from '../../service/passengerBll'
import getCityListBll from '@/service/CityInfoBll'
import { mapGetters } from 'vuex'
import ITable from '@/components/iTable'

export default {
  components: {
    mapChart,
    ITable,
    fld
  },
  data() {
    return {
      realCount: 0,
      dayCount: 0,
      todayPassenger: '',
      realTimePassenger: '',
      otherHeight: 0,
      RealTimeTrafficName: '苏州市实时客流量',
      geoCoordMap: {}, // 极坐标
      polarCoordinates: [],
      visualData: [],
      geoData: [],
      tableData: [],
      columns: [
        {
          prop: 'times',
          label: '时刻'
        },
        {
          prop: 'counts',
          label: '总量(人)'
        },
        {
          prop: 'snCity',
          label: '省内跨地市(人)'
        },
        {
          prop: 'outerProvin',
          label: '省外(人)'
        }
      ],
      fldData: {},
      showPagination: false
    }
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // this.userInfo = this.$store.getters.userInfo
      // var searchInfo = this.$store.getters.searchInfo
      // if (searchInfo.searchinfo.permissions) {
      //   this.permissions = searchInfo.searchinfo
      // } else {
      //   this.permissions = oAuthPermissions(this.userInfo.role)
      // }
      vm.getFLData()
    })
  },
  beforeRouteUpdate() {
    // var searchInfo = this.$store.getters.searchInfo
    // if (searchInfo.searchinfo.permissions) {
    this.userSearch()
    // }
  },
  methods: {
    userSearch() {
      // const searchParams = this.$store.getters.searchInfo
      // this.permissions = searchParams.searchinfo
      this.getFLData()
    },
    getFLData() {
      var areaId = ''
      var areaName = ''
      passengerBll.getFLDataAPI(this.permissions).then(res => {
        // totalCount求和
        this.todayPassenger = res.totalCount.reduce((accumulator, val) => accumulator + val, 0)
        this.realTimePassenger = res.totalCount && res.totalCount.length && res.totalCount[res.totalCount.length - 1]
        this.tableData = res.tableData
        let legends = ''
        if (this.tableData && this.tableData[0] && this.tableData[0].locals) {
          legends = ['总量', '本地', '省内跨地市', '省外']
          this.columns = [
            {
              prop: 'times',
              label: '时刻'
            },
            {
              prop: 'counts',
              label: '总量(人)'
            },
            {
              prop: 'locals',
              label: '本地(人)'
            },
            {
              prop: 'snCity',
              label: '省内跨地市(人)'
            },
            {
              prop: 'outerProvin',
              label: '省外(人)'
            }
          ]
        } else {
          legends = ['总量', '省内跨地市', '省外']
          this.columns = [
            {
              prop: 'times',
              label: '时刻'
            },
            {
              prop: 'counts',
              label: '总量(人)'
            },
            {
              prop: 'snCity',
              label: '省内跨地市(人)'
            },
            {
              prop: 'outerProvin',
              label: '省外(人)'
            }
          ]
        }
        areaName = getCityListBll.getCityNameById(parseInt(areaId))
        this.fldData = {
          legends: legends,
          axisTime: res.xAixsTime,
          totalCount: res.totalCount,
          localCount: res.localCount,
          localCity: res.localCity,
          provOuter: res.provOuter,
          chartName: areaName
        }
        this.$refs.resetChart.initBarChart()
      })
    },
    formtGCData(GCData, gdata, srcNam) {
      const tGeoDt = []
      for (var i = 0, len = gdata.length; i < len; i++) {
        if (srcNam !== gdata[i].name) {
          const ls = {
            coords: [GCData[gdata[i].name], GCData[srcNam]]
          }
          tGeoDt.push(ls)
        }
      }
      return tGeoDt
    },
    formtVData(geoData, data, srcNam) {
      const tGeoDt = []
      for (let i = 0, len = data.length; i < len; i++) {
        const tNam = data[i].name
        if (srcNam !== tNam) {
          tGeoDt.push({
            name: tNam,
            value: geoData[tNam]
          })
        }
      }
      tGeoDt.push({
        name: srcNam,
        value: geoData[srcNam],
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: '#FF6434',
            borderColor: '#FF6434'
          }
        }
      })
      return tGeoDt
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import '../../styles/mainBody';
table {
  border: 1px solid #ddd;
}
.tab {
  width: 100%;
}
.tab th {
  background: #ddd;
  line-height: 2rem;
}
.tab td {
  width: 50%;
  text-align: center;
  border: 1px solid #ddd;
  collapse: 0;
  line-height: 2rem;
}
.containLeft {
  padding-top: 50px;
}
</style>
