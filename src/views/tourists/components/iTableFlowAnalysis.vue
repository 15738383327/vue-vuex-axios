<template>
  <div class="tableTShi">
    <el-table
      :data="flowAnalysisTableData"
      style="width: 100%">
      <el-table-column
        prop="fDate"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="fCountAll"
        label="总客流量(人)">
      </el-table-column>
      <el-table-column
        prop="fCountLive"
        label="本地总客流量(人)">
      </el-table-column>
      <el-table-column
        prop="fCountLocal"
        label="省内跨地市客流量(人)">
      </el-table-column>
      <el-table-column
        prop="fCountAllCt"
        label="省外客流量(人)">
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

</template>

<script>

export default {
  props: {
    flowAnalysis: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      tableData: [],
      pageSize: 10,
      currentPage: 1
    }
  },
  computed: {
    flowAnalysisTableData() {
      return this.flowAnalysis.slice(this.startIndex, this.endIndex)
    },
    startIndex() {
      return this.currentPage * this.pageSize - this.pageSize
    },
    endIndex() {
      return this.startIndex + this.pageSize
    },
    allTotal() {
      return Math.ceil(parseFloat(this.flowAnalysis.length / this.pageSize)) * 10
    }
  },
  methods: {
    // 点击页码
    handleCurrentChange(val) {
      // console.log(parseInt(`${val}`))
      this.currentPage = parseInt(`${val}`)
    }
  }
}
</script>
<style>
  .tableTShi{
    /*padding-top:2rem;*/
  }
  .tableTShi th{
    background:#fafbff;
  }
</style>
