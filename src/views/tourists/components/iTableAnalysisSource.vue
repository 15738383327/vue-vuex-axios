<template>
  <div>
    <el-tabs type="border-card" style="margin-top:1rem">
      <el-tab-pane>
        <span slot="label">省外</span>
        <div class="tableTShi">
          <el-table
            :data="countryTableData"
            style="width: 100%">
            <el-table-column
              prop="fDate"
              label="日期">
            </el-table-column>
            <el-table-column
              prop="provinceName"
              label="省份">
            </el-table-column>
            <el-table-column
              prop="fCount"
              label="客流量(人)">
            </el-table-column>
            <el-table-column
              prop="fCountCt"
              label="占比(%)">
            </el-table-column>
          </el-table>
          <div class="block" style="float:right">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              layout="prev, pager, next"
              :total="allTotal">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">省内</span>
        <div class="tableTShi">
          <el-table
            :data="provinceTableData"
            style="width: 100%">
            <el-table-column
              prop="cDate"
              label="日期">
            </el-table-column>
            <el-table-column
              prop="cCity"
              label="城市">
            </el-table-column>
            <el-table-column
              prop="cPassengerFlow"
              label="客流量(人)">
            </el-table-column>
            <el-table-column
              prop="cProportion"
              label="占比(%)">
            </el-table-column>
          </el-table>
          <div class="block" style="float:right">
            <el-pagination
              @current-change="handleCurrentChange2"
              :current-page.sync="currentPage2"
              layout="prev, pager, next"
              :total="allTotal2">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>

export default {
  props: {
    flowAnalysis3: {
      type: Array,
      default: () => {
        return []
      }
    },
    flowAnalysis2: {
      type: Array,
      default: () => {
        return []
      }
    },
    flowAnalysis: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      pageSize: 10,
      pageSize2: 10,
      currentPage: 1,
      currentPage2: 1,
      pageSize3: 10,
      currentPage3: 1
    }
  },
  mounted() {
    // this.getAllTotal()
  },
  computed: {
    countryTableData() {
      return this.flowAnalysis.slice(this.startIndex, this.endIndex)
    },
    allTotal() {
      return Math.ceil(parseFloat(this.flowAnalysis.length / this.pageSize)) * 10
    },
    startIndex() {
      return (this.currentPage - 1) * this.pageSize
    },
    endIndex() {
      return this.startIndex + this.pageSize
    },
    provinceTableData() {
      return this.flowAnalysis2.slice(this.startIndex2, this.endIndex2)
    },
    allTotal2() {
      return Math.ceil(parseFloat(this.flowAnalysis2.length / this.pageSize2)) * 10
    },
    startIndex2() {
      return (this.currentPage2 - 1) * this.pageSize2
    },
    endIndex2() {
      return this.startIndex2 + this.pageSize2
    }
  },
  methods: {
    // 点击页码
    handleCurrentChange(val) {
      // console.log(parseInt(`${val}`))
      this.currentPage = parseInt(`${val}`)
    },
    handleCurrentChange2(val) {
      // console.log(parseInt(`${val}`))
      this.currentPage2 = parseInt(`${val}`)
    }
  }
}
</script>
<style>
  h3{
    text-align: center;
    line-height: 3rem;
    background:#fafbff;
    margin-bottom:0;
    border-bottom:1px solid #f3f3f3;
  }
  .tableTShi{
    /*padding-top:2rem;*/
  }
  .tableTShi th{
    background:#fafbff
  }
</style>
