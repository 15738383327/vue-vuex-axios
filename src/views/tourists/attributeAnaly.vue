<template>
  <div class="mainBody">
    <div class="containBody">
      <div class="containLeft">
        <div class="attributeTitle">
          <span>昨日客流属性分析</span>
        </div>
        <div class="tabsPane" style="width: 14rem;">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" >
              <el-menu-item index="0" style="float: left;width: 7rem;">年龄</el-menu-item>
              <el-menu-item index="1" style="float: left;width: 7rem;">性别</el-menu-item>
            </el-menu>
        </div>
        <time-chart :TLegendData="TLegendData" :tChartDataName="tChartDataName" :tChartData="tChartData" style="height: 100%;width: 100%;"></time-chart>
      </div>
      <div class="containRight">
        <i-table :tableData="tableData" :columns="columns" :otherHeight="otherHeight" :showPagination="showPagination">
        </i-table>
      </div>
    </div>
  </div>
</template>
<script>
import timeChart from './components/timeChart.vue'
import ITable from '../../components/iTable'
import AttributeAnalyBll from '../../service/attributeAnalyBll'
import { mapGetters } from 'vuex'

export default {
  name: 'attributeAnaly',
  components: {
    timeChart,
    ITable
  },
  data() {
    return {
      TLegendData: [],
      tChartDataName: '游客属性分析',
      tChartData: [], // 饼图数据
      tableData: [], // 表格数据
      columns: [], // 数据列
      otherHeight: 0,
      showPagination: false,
      activeIndex: '0'
    }
  },
  computed: {
    ...mapGetters(['authInfo', 'permissions'])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 获取游客客流量
      // vm.userInfo = vm.$store.getters.userInfo
      // var searchInfo = vm.$store.getters.searchInfo
      // if (searchInfo.searchinfo.permissions) {
      //   vm.permissions = searchInfo.searchinfo
      // } else {
      //   vm.permissions = oAuthPermissions(vm.userInfo.role)
      // }
      vm.getTouristData()
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
      // var searchParams = this.$store.getters.searchInfo
      // this.permissions = searchParams.searchinfo
      this.getTouristData()
    },
    getTouristData() {
      AttributeAnalyBll.getCityTouristAttr(this.permissions).then(response => {
        // 初始化数据
        this.TLegendData = []
        this.tableData = []
        this.tChartData = []
        const respData = response
        if (this.activeIndex === '0') {
          respData.map((v, i) => {
            const bry = [] // 存储当前时间下的对应数据
            // 获取年龄
            v.tableDate.map((vl, ix) => {
              this.TLegendData.push(vl.age)
              const ls = {
                name: vl.age,
                value: parseFloat(vl.num)
              }
              bry.push(ls)
              this.tableData.push({ time: v.time, age: vl.age, percent: (vl.percent * 100).toFixed(2) })
            })
            this.columns = [
              // { prop: 'time', label: '日期', width: '', type: '' },
              { prop: 'age', label: '年龄', width: '', type: '' },
              { prop: 'percent', label: '占比（%）', width: '', type: '' }
            ]
            // 修改后的版本
            this.tChartData = bry
          })
        } else {
          respData.map((v, i) => {
            const bry = [] // 存储当前时间下的对应数据
            // 获取性别
            v.sexdate.map((vl, ix) => {
              const ls = {
                name: vl.sex,
                value: parseFloat(vl.num)
              }
              this.tableData.push({ time: v.time, age: vl.sex, percent: (vl.percent * 100).toFixed(2) })
              bry.push(ls)
            })
            this.columns = [
              // { prop: 'time', label: '日期', width: '', type: '' },
              { prop: 'age', label: '性别', width: '', type: '' },
              { prop: 'percent', label: '占比（%）', width: '', type: '' }
            ]
            // 修改后的版本
            this.tChartData = bry
          })
        }
        this.tableData.length >= 16 ? (this.otherHeight = 280) : (this.otherHeight = 0)
      })
    },
    handleSelect(key) {
      this.activeIndex = key
      key === '0' ? (this.tChartDataName = '游客年龄分析饼图') : (this.tChartDataName = '游客性别分析饼图')
      this.getTouristData()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import '../../styles/mainBody';
.containBody {
  .containLeft {
    .attributeTitle {
      font-size: 1.2rem;
      text-align: center;
      margin: 15px auto;
     }
    .tabsPane {
      /* transform: translate3d(-50%, 0, 0); */
      margin: 15px auto;
      .el-menu-demo {
        background: #f3f4f8;
        border-radius: 35px !important;
      }
      .el-menu--horizontal {
        border: none;
        .el-menu-item {
          float: none;
          display: inline-block;
          background: #f3f4f8;
          border-radius: 20px;
          // padding:0 30px;
          height: 35px;
          line-height: 35px;
          font-size: 16px;
          &.is-active {
            border: none;
            background: #29c2bd;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
