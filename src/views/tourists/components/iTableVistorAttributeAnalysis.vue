<template>
  <div>
    <el-tabs type="border-card" style="margin-top:1rem;">
      <el-tab-pane>
        <span slot="label">年龄</span>
        <div class="tableTShi">
          <el-table
            :data="ageAttrTableData"
            style="width: 100%">
            <el-table-column
              prop="allDate"
              label="日期">
            </el-table-column>
            <el-table-column
              prop="allLevelAge22"
              label="22岁及以下(人)">
            </el-table-column>
            <el-table-column
              prop="allLevelAge23"
              label="23~35岁(人)">
            </el-table-column>
            <el-table-column
              prop="allLevelAge35"
              label="36~45岁(人)">
            </el-table-column>
            <el-table-column
              prop="allLevelAge45"
              label="46~55岁(人)">
            </el-table-column>
            <el-table-column
              prop="allLevelAge55"
              label="56岁及以上(人)">
            </el-table-column>
            <el-table-column
              prop="allCount"
              label="客流量(人)">
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
        <span slot="label">性别</span>
        <div class="tableTShi">
          <el-table
            :data="sexAttrTableData"
            style="width: 100%">
            <el-table-column
              prop="allDate"
              label="日期">
            </el-table-column>
            <el-table-column
              prop="allLevelAge22"
              label="女(人)">
            </el-table-column>
            <el-table-column
              prop="allLevelAge23"
              label="男(人)">
            </el-table-column>
            <el-table-column
              prop="allLevelAge35"
              label="总数(人)">
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
    flowAnalysisAll: {
      type: Object
    }
  },
  data() {
    return {
      tableData: [],
      pageSize: 10,
      pageSize2: 10,
      currentPage: 1,
      currentPage2: 1
    }
  },
  computed: {
    ageAttrTableData() {
      return this.flowAnalysisAll.ageList.slice(this.startIndex, this.endIndex)
    },
    allTotal() {
      return Math.ceil(parseFloat(this.flowAnalysisAll.ageList.length / this.pageSize)) * 10
    },
    startIndex() {
      return (this.currentPage - 1) * this.pageSize
    },
    endIndex() {
      return this.startIndex + this.pageSize
    },
    sexAttrTableData() {
      return this.flowAnalysisAll.sexList.slice(this.startIndex2, this.endIndex2)
    },
    allTotal2() {
      return Math.ceil(parseFloat(this.flowAnalysisAll.sexList.length / this.pageSize2)) * 10
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
<style scoped>
  /* .tableTShi{
    padding-top:2rem;
  }*/
  .tableTShi th{
    background:#fafbff;
  }
  h3{
    text-align: center;
    line-height: 3rem;
    background:#fafbff;
    margin-bottom:0;
    border-bottom:1px solid #f3f3f3;
  }
</style>
