<template>
  <div style="height: 84vh;background: #ffffff;margin: 1%;">
    <div class="scenic_content">
      <el-row :gutter="18">
        <el-col :span="14">
          <div class="grid-content dashboard-echarts">
            <div class="passengerTitle">
              <span>客流对比分析</span>
            </div>
            <div class="holiday-contian" style="text-align: center;width: 60%;">
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item style="width: 24%;" index="0">周末</el-menu-item>
                <el-menu-item style="width: 24%;" index="1">元旦</el-menu-item>
                <el-menu-item style="width: 24%;" index="2">春节</el-menu-item>
                <el-menu-item style="width: 24%;" index="3">清明节</el-menu-item>
              </el-menu>
            </div>
            <div class="lc-map" style="width: 100%;height: 100%;position: absolute;">
              <!-- <line-chart :chartsId="dataObj.chartsId" :xAxis="dataObj.xAxis" :yAxis="dataObj.yAxis" :zAxis="dataObj.zAxis" :title="dataObj.title" :dataColor="dataObj.dataColor" :lineColor="dataObj.lineColor" ref="iLineChart"></line-chart> -->
              <line-chart :dtimeData="dtimeData" :jcountData="jcountData" :holidayName="holidayName" :dcountData="dcountData" style="height: 70vh;"></line-chart>
            </div>
          </div>
        </el-col>
        <el-col :span="10" style="margin-top: 1rem;">
          <i-table :tableData="tableData" :columns="columns" :otherHeight="0" :showPagination="false">
          </i-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import LineChart from './components/LineChartM'
  import ITable from '@/components/iTable'
  import passengerContrastAnalysis from '../../service/passengerContrastAnalysisBll'
  import { mapGetters } from 'vuex'

  export default {
    name: 'passengerContrastAnalysis',
    components: {
      LineChart,
      ITable
    },
    data() {
      return {
        inputVal: '',
        activeIndex: '0',
        tableData: [],
        dtimeData: [],
        jcountData: [],
        dcountData: [],
        holidayName: ['当日客流', '周末客流'],
        columns: [
          {
            prop: 'ntime',
            label: '时间'
          },
          {
            prop: 'dcount',
            label: '当日客流 (人)'
          },
          {
            prop: 'jcount',
            label: '周末客流 (人)'
          }
        ]
      }
    },
    computed: {
      ...mapGetters(['authInfo', 'permissions'])
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
        vm.passengerComparison(vm.activeIndex) // 默认获取周末对比
      })
    },
    beforeRouteUpdate() {
      this.userSearch()
    },
    methods: {
      userSearch() {
        // this.permissions = this.$store.getters.searchInfo.searchinfo
        this.passengerComparison(this.activeIndex)
      },
      passengerComparison(festival) {
        passengerContrastAnalysis.queryContrastAnalysis(this.permissions, festival).then(res => {
          if (res.status === 200) {
            this.tableData = []
            this.dtimeData = []
            this.jcountData = []
            this.dcountData = []
            res.data
              .filter(item => {
                const hours = parseInt(item.ntime.replace(/^(\d+):00$/, '$1'))
                return hours >= 8 && hours <= 20
              })
              .sort((a, b) => {
                return a.ntime.replace(/^(\d+):00$/, '$1') - b.ntime.replace(/^(\d+):00$/, '$1')
              })
              .forEach(item => {
                const ntime = item.ntime
                const jcount = item.holidaydata && item.holidaydata.length && item.holidaydata[0].holiday_num
                const dcount = item.today_count
                this.dtimeData.push(ntime)
                this.jcountData.push(jcount)
                this.dcountData.push(dcount)
                this.tableData.push({ ntime, jcount, dcount })
              })
          }
        })
      },
      handleSelect(key) {
        this.activeIndex = key
        this.passengerComparison(this.activeIndex)
        if (key === '0') {
          this.columns[1].label = '当日客流 (人)'
          this.columns[2].label = '周末客流 (人)'
          this.holidayName = ['当日客流', '周末客流']
        } else if (key === '1') {
          this.columns[1].label = '当日客流 (人)'
          this.columns[2].label = '元旦客流 (人)'
          this.holidayName = ['当日客流', '元旦客流']
        } else if (key === '2') {
          this.columns[1].label = '当日客流 (人)'
          this.columns[2].label = '春节客流 (人)'
          this.holidayName = ['春节当日客流', '春节客流']
        } else if (key === '3') {
          this.columns[1].label = '当日客流 (人)'
          this.columns[2].label = '清明节客流 (人)'
          this.holidayName = ['当日客流', '清明客流']
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .scenic_top {
    background: #fff;
    margin: 0.5rem 0;
    padding: 0.5rem;
  }

  .search_val {
    width: 15rem;
    border-radius: 15px;
    margin-left: 2rem;
  }
  .dashboard-echarts {
    margin-top: 35px;
  }
  .scenic_spot {
    display: inline-block;
  }

  .scenic_spot span {
    cursor: pointer;
    display: inline-block;
    color: #24aaa1;
    font-size: 1rem;
    margin: auto 1rem;
  }

  .scenic_content {
    width: 98%;
    background: #fff;
    margin: 0.3rem auto 0 auto;
    .passengerTitle{
      font-size: 1.2rem;
      text-align: center;
      margin: 15px auto;
    }
  }
  .grid-content {
    position: relative;
    /*margin-top: 35px;*/
    .holiday-contian {
      position: absolute;
      z-index: 10;
      top: 2.5rem;
      left: 50%;
      height: 35px;
      transform: translate3d(-50%, 0, 0);
      .el-menu--horizontal {
        border: none;
        background: #f3f4f8;
        border-radius: 35px !important;
        .el-menu-item {
          float: none;
          display: inline-block;
          background: #f3f4f8;
          height: 35px !important;
          line-height: 35px !important;
          font-size: 16px !important;
          // padding: 0 20px !important;
          border-radius: 35px !important;
          &.is-active {
            border: none;
            background: #29c2bd;
            color: #fff;
          }
        }
      }
    }
    .lc-map {
      padding-top: 50px;
    }
  }
</style>
