<template>
  <div>
    <div>
      <el-row>
        <div class="scenic_content" style="margin: 1%;width: 98%;height: 100%;padding: 1%;">
          <el-row>
            <el-col :span="24" style="min-height:30rem;">
              <div style="width:100%;margin-top:1rem;" id="queryData_con_top">
                <label style="color:#666">选择查询</label>
                <el-select v-model="selectValue" placeholder="请选择" size="small" @change="latitudeChange">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <div class="dateQuery">
                  <div class="block">
                    <el-date-picker v-model="dateValue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small" value-format="yyyyMMdd">
                    </el-date-picker>
                  </div>
                </div>
                <el-button type="primary" round style="margin-left:0.5rem;background:#29c2bd;border:0;" @click="querySearch" size="small">查询</el-button>
                <el-button type="primary" round style="float:right;margin-right:1.5rem;background:#29c2bd;border:0;" size="small" @click="downloadXSL">下载</el-button>
              </div>
              <div class="data_query_table" id="data_query_table">
                <i-tableAllSource :flowAnalysis="tableData" :flowAnalysisSource="analysisTableData"  :flowAnalysisSource2="analysisPreTableData" :flowAnalysisAll="PassengerAttrCityData"  :flowAnalysisStayTime="lengthTableData"  v-if="tableAllSource" :isShow="isShow"></i-tableAllSource>
                <i-tableAnalysis :flowAnalysis="tableData" v-if="tableAnalysis"></i-tableAnalysis>
                <i-tableSource :flowAnalysis="analysisTableData" :flowAnalysis2="analysisPreTableData" :flowAnalysis3="analysisAllTableData" v-if="tableSource"></i-tableSource>
                <i-tableAttrAnalysis :flowAnalysisAll="PassengerAttrCityData" v-if="tableAttrAnalysis"></i-tableAttrAnalysis>
                <i-tableLengthTime :flowAnalysis="lengthTableData" :isShow="isShow" v-if="this.tableLengthTime"></i-tableLengthTime>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
  // import dataHistory from './components/dataHistoryChild'
  import dataHistoryValue from '../../service/queryDataHistoryBll'
  import { oAuthPermissions } from '@/utils/auth'
  import UtilDate from '../../utils/date'
  import iTableAllSource from './components/iTableAllSource'
  import iTableAnalysis from './components/iTableFlowAnalysis'
  import iTableSource from './components/iTableAnalysisSource'
  import iTableAttrAnalysis from './components/iTableVistorAttributeAnalysis'
  import iTableLengthTime from './components/iTableTimeLengthAnalysis'
  import StaticConfig from '../../../static/json/config.json'
  // import { tableToExcel } from '../../utils/savetoExcel'
  export default {
    components: {
      iTableAllSource, iTableAnalysis, iTableSource, iTableAttrAnalysis, iTableLengthTime
    },
    data() {
      return {
        time: [],
        historyValue: {
          'startDate': '',
          'endDate': '',
          'key': StaticConfig.locationAuthKey
        },
        tableAllSource: true,
        tableAnalysis: false,
        tableSource: false,
        tableAttrAnalysis: false,
        tableLengthTime: false,
        tableData: [],
        lengthTableData: [],
        analysisTableData: [],
        analysisPreTableData: [],
        analysisAllTableData: [],
        PassengerAttrCityData: {
          ageList: [],
          sexList: []
        },
        PassengerAttrGenderData: [],
        PassengerAttrGenderAge: [],
        userInfo: '',
        permissions: '',
        value: '',
        dateValue: [],
        getPositionId: {},
        userPermission: '',
        options: [{
          value: '0',
          label: '总客流数据分析'
        }, {
          value: '1',
          label: '客流量分析'
        }, {
          value: '2',
          label: '客流来源分析'
        }, {
          value: '3',
          label: '客流属性分析'
        }, {
          value: '4',
          label: '停留时长分析'
        }],
        selectValue: '0',
        isShow: true
      }
    },
    created() {
      this.userInfo = this.$store.getters.userInfo
      var searchInfo = this.$store.getters.searchInfo
      if (searchInfo.searchinfo.permissions) {
        this.permissions = searchInfo.searchinfo
      } else {
        this.permissions = oAuthPermissions(this.userInfo.role)
      }
      this.permissions.startDate = UtilDate.add(new Date(), -8, 'day', 'yyyyMMdd')
      this.permissions.endDate = UtilDate.add(new Date(), -1, 'day', 'yyyyMMdd')
      this.getAllDataHistory(this.permissions)
    },
    beforeRouteUpdate() {
      var searchInfo = this.$store.getters.searchInfo
      if (searchInfo.searchinfo.permissions) {
        this.userSearch()
      }
    },
    methods: {
      // 下载excel表单
      downloadXSL() {
        if (this.permissions.permissions === 'SCENIC') {
          // dataHistoryValue.downAll(this.permissions).then(res => {
          //   // console.log(res)
          // })
          window.open(dataHistoryValue.getLocationAPIURI() + '/interface/areaAnalysis/exportExcel?areaId=' + this.permissions.areaId + '&startDate=' + this.permissions.startDate + '&endDate=' + this.permissions.endDate + '&key=' + StaticConfig.locationAuthKey)
        } else {
          this.$message.error('请先选择相应的景区')
        }
        // tableToExcel('data_query_table', '历史数据查询')
      },
      userSearch() {
        var searchParams = this.$store.getters.searchInfo
        this.permissions = searchParams.searchinfo
        this.permissions.startDate = this.dateValue[0]
        this.permissions.endDate = this.dateValue[1]
        if (this.permissions.startDate === undefined || this.permissions.endDate === undefined) {
          this.permissions.startDate = UtilDate.add(new Date(), -8, 'day', 'yyyyMMdd')
          this.permissions.endDate = UtilDate.add(new Date(), -1, 'day', 'yyyyMMdd')
        }
        if (this.selectValue === '1') {
          this.getDataHistory(this.permissions)
        } else if (this.selectValue === '0') {
          if (this.permissions.permissions === 'SCENIC') {
            this.isShow = false
          } else {
            this.isShow = true
          }
          this.getAllDataHistory(this.permissions)
        } else if (this.selectValue === '2') {
          this.getAnalysisSource(this.permissions)
        } else if (this.selectValue === '3') {
          this.queryPassengerAttr(this.permissions)
        } else if (this.selectValue === '4') {
          if (this.permissions.permissions === 'SCENIC') {
            this.isShow = false
          } else {
            this.isShow = true
          }
          this.getScenicStayTime(this.permissions)
        }
      },
      // 纬度改变
      latitudeChange() {
        if (this.selectValue === '0') {
          this.tableAllSource = true
          this.tableAnalysis = false
          this.tableSource = false
          this.tableAttrAnalysis = false
          this.tableLengthTime = false
        } else if (this.selectValue === '1') {
          this.tableAllSource = false
          this.tableAnalysis = true
          this.tableSource = false
          this.tableAttrAnalysis = false
          this.tableLengthTime = false
          this.getDataHistory(this.permissions)
        } else if (this.selectValue === '2') {
          this.tableAllSource = false
          this.tableAnalysis = false
          this.tableSource = true
          this.tableAttrAnalysis = false
          this.tableLengthTime = false
          this.getAnalysisSource(this.permissions)
        } else if (this.selectValue === '3') {
          this.tableAllSource = false
          this.tableAnalysis = false
          this.tableSource = false
          this.tableAttrAnalysis = true
          this.tableLengthTime = false
          this.queryPassengerAttr(this.permissions)
        } else if (this.selectValue === '4') {
          this.tableAllSource = false
          this.tableAnalysis = false
          this.tableSource = false
          this.tableAttrAnalysis = false
          this.tableLengthTime = true
          if (this.permissions.permissions === 'SCENIC') {
            this.isShow = false
          } else {
            this.isShow = true
          }
          this.getScenicStayTime(this.permissions)
        }
      },
      // 获取时间
      querySearch() {
        this.permissions.startDate = this.dateValue[0]
        this.permissions.endDate = this.dateValue[1]
        if (this.permissions.startDate === undefined || this.permissions.endDate === undefined) {
          this.permissions.startDate = UtilDate.add(new Date(), -8, 'day', 'yyyyMMdd')
          this.permissions.endDate = UtilDate.add(new Date(), -1, 'day', 'yyyyMMdd')
        }
        if (this.selectValue === '1') {
          this.getDataHistory(this.permissions)
        } else if (this.selectValue === '0') {
          this.getAllDataHistory(this.permissions)
        } else if (this.selectValue === '2') {
          this.getAnalysisSource(this.permissions)
        } else if (this.selectValue === '3') {
          this.queryPassengerAttr(this.permissions)
        } else if (this.selectValue === '4') {
          this.getScenicStayTime(this.permissions)
        }
      },
      // 总纬度
      getAllDataHistory(param) {
        // console.log(param)
        this.getDataHistory(param)
        this.getAnalysisSource(param)
        this.queryPassengerAttr(param)
        this.getScenicStayTime(param)
        // this.analysisAllTableData = []
        // dataHistoryValue.queryAllAnalysisSource(param).then(res => {
        //   res.sort(function(a, b) {
        //     return parseInt(b.f_date) - parseInt(a.f_date)
        //   })
        //   for (var i = 0, p; i < res.length; i++) {
        //     p = res[i]
        //     this.analysisAllTableData.push(p)
        //   }
        // })
      },
      // 客流量分析数据接口
      getDataHistory(param) {
        this.tableData = []
        dataHistoryValue.queryDataHistory(param).then(res => {
          for (var i = 0, p; i < res.length; i++) {
            p = res[i]
            p.per_inpro = (p.per_inpro * 100).toFixed(2) + '%'
            p.per_outpro = (p.per_outpro * 100).toFixed(2) + '%'
            this.tableData.push(p)
          }
        })
      },
      // 客流来源分析数据接口
      getAnalysisSource(param) {
        this.analysisTableData = []
        this.analysisPreTableData = []
        dataHistoryValue.queryCountryAnalysisSource(param).then(res => {
          for (var i = 0, p; i < res.length; i++) {
            p = res[i]
            this.analysisTableData.push(p)
          }
        })
        dataHistoryValue.queryProvinceAnalysisSource(param).then(res => {
          for (var i = 0, p; i < res.length; i++) {
            p = res[i]
            this.analysisPreTableData.push(p)
          }
        })
      },
      // 客流属性分析数据接口
      queryPassengerAttr(param) {
        this.PassengerAttrCityData.ageList = []
        this.PassengerAttrCityData.sexList = []
        // this.PassengerAttrGenderData = []
        // this.PassengerAttrGenderAge = []
        dataHistoryValue.queryPassengerAttrCity(param).then(res => {
          for (var i = 0, p; i < res.ageList.length; i++) {
            p = res.ageList[i]
            this.PassengerAttrCityData.ageList.push(p)
          }
          for (var b = 0, t; b < res.sexList.length; b++) {
            t = res.sexList[b]
            this.PassengerAttrCityData.sexList.push(t)
          }
        })
      },
      // 停留时长数据接口
      getScenicStayTime(param) {
        this.lengthTableData = []
        dataHistoryValue.queryScenicStayTime(param).then(res => {
          for (var i = 0, p; i < res.length; i++) {
            p = res[i]
            // p.per_inpro = (p.per_inpro * 100).toFixed(2) + '%'
            // p.per_outpro = (p.per_outpro * 100).toFixed(2) + '%'
            this.lengthTableData.push(p)
          }
        })
      }
    }
  }
</script>

<style scoped>
  /*.chart_box{*/
  /*width:100%;*/
  /*height:30rem;*/
  /*}*/
  #queryData_con_top .el-select .el-input__inner {
    background: #f3f4f8;
  }
  .el-date-editor .el-range-separator{
    padding: 0 5px;
    line-height: 32px;
    width: 6%;
    color: #303133;
  }
  .scenic_spot span {
    cursor: pointer;
    display: inline-block;
    color: #24aaa1;
    font-size: 1rem;
    margin: auto 1rem;
  }
  .block .el-date-editor .el-range-input{
    margin-left: 10px;
  }
  .scenic_content {
    width: 98%;
    background: #fff;
    margin: 0.3rem auto 0 auto;
  }
  .dateQuery {
    display: inline-block;
    background: #f3f4f8;
    padding: 0.3rem 1rem;
    margin-left: 1rem;
    border-radius: 30px;
  }
  .el-date-editor .el-range-separator{
    width:8% !important;
  }
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
</style>
