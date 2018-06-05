<template>
  <div>
    <div class="tableTShi" style="margin-top:2rem;">
      <el-collapse v-model="activeNames" accordion>
        <el-collapse-item title="客流量分析" name="1">
          <!--<el-table-->
            <!--:data="allTableData"-->
            <!--style="width: 100%">-->
            <!--<el-table-column-->
              <!--prop="f_date"-->
              <!--label="日期">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="area_name"-->
              <!--label="景区名称">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="f_count_all"-->
              <!--label="总游客量(人)">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="f_count_all_ct"-->
              <!--label="总游客量电信用户数据(人)">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="f_count_inpro"-->
              <!--label="省内客流量(人)">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="f_count_inpro_ct"-->
              <!--label="省内客流量电信用户数据(人)">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="f_count_outpro"-->
              <!--label="省外客流量(人)">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="f_count_outpro_ct"-->
              <!--label="省外客流量电信用户数据(人)">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="f_count_local"-->
              <!--label="本市客流量(人)">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="f_count_local_ct"-->
              <!--label="本市客流量电信用户数据(人)">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="f_count_no_local"-->
              <!--label="外地客流量(人)">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="f_count_no_local_ct"-->
              <!--label="外地客流量电信用户数据(人)">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="f_count_overnight"-->
              <!--label="过夜客流量(人)">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="f_count_overnight_ct"-->
              <!--label="过夜客流量电信用户数据(人)">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="f_count_work"-->
              <!--label="工作人数(人)">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="f_count_live"-->
              <!--label="居住人数(人)">-->
            <!--</el-table-column>-->
          <!--</el-table>-->
          <!--<div class="block" style="float:right">-->
            <!--<el-pagination-->
              <!--@current-change="handleCurrentChange3"-->
              <!--:current-page.sync="currentPage3"-->
              <!--layout="prev, pager, next"-->
              <!--:total="allTotal3">-->
            <!--</el-pagination>-->
          <!--</div>-->
          <i-tableAnalysis :flowAnalysis="flowAnalysis"></i-tableAnalysis>
        </el-collapse-item>
        <el-collapse-item title="客流来源分析" name="2">
          <i-tableSource :flowAnalysis="flowAnalysisSource" :flowAnalysis2="flowAnalysisSource2"></i-tableSource>
        </el-collapse-item>
        <el-collapse-item title="客流属性分析" name="3">
          <i-tableAttr :flowAnalysisAll="flowAnalysisAll"></i-tableAttr>
        </el-collapse-item>
        <el-collapse-item title="停留时长分析" name="4">
          <i-tableLengthTime :flowAnalysis="flowAnalysisStayTime" :isShow="isShow"></i-tableLengthTime>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import iTableAnalysis from '../components/iTableFlowAnalysis'
import iTableSource from '../components/iTableAnalysisSource'
import iTableAttr from '../components/iTableVistorAttributeAnalysis'
import iTableLengthTime from '../components/iTableTimeLengthAnalysis'
export default {
  components: {
    iTableAnalysis, iTableSource, iTableAttr, iTableLengthTime
  },
  props: {
    flowAnalysis: {
      type: Array,
      default: () => {
        return []
      }
    },
    flowAnalysisSource: {
      type: Array,
      default: () => {
        return []
      }
    },
    flowAnalysisSource2: {
      type: Array,
      default: () => {
        return []
      }
    },
    flowAnalysisAll: {
      type: Object
    },
    flowAnalysisStayTime: {
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
      pageSize3: 10,
      currentPage3: 1,
      activeNames: '1'
    }
  },
  mounted() {
    // this.getAllTotal()
    console.log(this.flowAnalysisSource2)
  },
  computed: {
    allTableData() {
      return this.flowAnalysis3.slice(this.startIndex3, this.endIndex3)
    },
    allTotal3() {
      return Math.ceil(parseFloat(this.flowAnalysis3.length / this.pageSize3)) * 10
    },
    startIndex3() {
      return (this.currentPage3 - 1) * this.pageSize3
    },
    endIndex3() {
      return this.startIndex3 + this.pageSize3
    }
  },
  methods: {
    // 点击页码
    handleCurrentChange3(val) {
      // console.log(parseInt(`${val}`))
      this.currentPage3 = parseInt(`${val}`)
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
