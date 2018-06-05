<template>
  <div style="height: 82vh;margin: 1%;background: #ffffff;">
    <div>
      <el-row>
        <div class="scenic_content">
          <el-row :gutter="18">
            <el-col :span="14" style="height:26rem;">
              <div class="grid-content bg-purpl dashboard-echarts" style="width:56%;margin-top:3rem;position: absolute;height: 100%;">
                <line-chart :legends="legends" :lineChartData="lineChartData" ref="iLineChartLengthStay" style="height: 79vh;"></line-chart>
              </div>
            </el-col>
            <el-col :span="10" style="margin-top:1rem;">
              <i-table v-if="this.permissions.permissions === 'SCENIC'" :tableData="tableData" :columns="columnsDate" :showPagination="showPagination" :otherHeight="otherHeight">
              </i-table>
              <i-table v-else :tableData="tableData" :columns="columnsScenic" :showPagination="showPagination" :otherHeight="otherHeight">
              </i-table>
            </el-col>
          </el-row>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import LineChart from './components/LineChart'
import lengthStay from '@/service/lengthStayBll'
import { mapGetters } from 'vuex'
import ITable from '@/components/iTable'

export default {
  name: 'lengthStay',
  components: {
    LineChart,
    ITable
  },
  data() {
    return {
      legends: ['总平均停留时长', '省内停留时长', '省外停留时长'],
      inputVal: '',
      tableData: [],
      lineChartData: {},
      columnsScenic: [
        {
          prop: 'name',
          label: '景区名称'
        },
        {
          prop: 'staytime',
          label: '总平均停留时长(h)'
        },
        {
          prop: 'staytimeinner',
          label: '省内停留时长(h)'
        },
        {
          prop: 'staytimeouter',
          label: '省外停留时长(h)'
        }
      ],
      columnsDate: [
        {
          prop: 'name',
          label: '日期'
        },
        {
          prop: 'staytimelocal',
          label: '景区停留时长(h)'
        },
        {
          prop: 'staytime',
          label: '总平均停留时长(h)'
        },
        {
          prop: 'staytimeinner',
          label: '省内停留时长(h)'
        },
        {
          prop: 'staytimeouter',
          label: '省外停留时长(h)'
        }
      ],
      showPagination: false,
      otherHeight: 0
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
      vm.getLengthStay()
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
      this.getLengthStay()
    },
    getLengthStay() {
      lengthStay.queryLengthStay(this.permissions).then(res => {
        if (res != null) {
          this.lineChartData = res
          this.tableData = res.tableData
          res.tableData.length >= 16 ? (this.otherHeight = 280) : (this.otherHeight = 0)
          this.$refs.iLineChartLengthStay.initChart()
        }
      })
    }
  }
}
</script>

<style scoped>
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
}
</style>
