<template>
  <div>
    <div class="tableTShi" v-if="isShow">
      <el-table
        :data="lengthTimeTableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="areaName"
          label="景区名称">
        </el-table-column>
        <el-table-column
          prop="allLengthTime"
          label="总平均停留时长(h)">
        </el-table-column>
        <el-table-column
          prop="perLengthTime"
          label="省内客流平均停留时长(h)">
        </el-table-column>
        <el-table-column
          prop="perOutLengthTime"
          label="省外客流平均停留时长(h)">
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
    <div class="tableTShi" v-else>
      <el-table
        :data="lengthTimeTableData2"
        style="width: 100%">
        <el-table-column
          prop="scenicDate"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="scenicAllLengthTime"
          label="总平均停留时长(h)">
        </el-table-column>
        <el-table-column
          prop="scenicPerLengthTime"
          label="省内客流平均停留时长(h)">
        </el-table-column>
        <el-table-column
          prop="scenicPerOutLengthTime"
          label="省外客流平均停留时长(h)">
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
  </div>
</template>

<script>
// import { oAuthPermissions } from '@/utils/auth'
export default {
  props: {
    flowAnalysis: {
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
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      currentPage2: 1,
      pageSize2: 10,
      permissions: '',
      userInfo: '',
      userPermission: ''
    }
  },
  computed: {
    lengthTimeTableData() {
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
    },
    lengthTimeTableData2() {
      return this.flowAnalysis.slice(this.startIndex2, this.endIndex2)
    },
    startIndex2() {
      return this.currentPage2 * this.pageSize2 - this.pageSize2
    },
    endIndex2() {
      return this.startIndex2 + this.pageSize2
    },
    allTotal2() {
      return Math.ceil(parseFloat(this.flowAnalysis2.length / this.pageSize2)) * 10
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
  .tableTShi{
    /*padding-top:2rem;*/
  }
  .tableTShi th{
    background:#fafbff
  }
</style>
