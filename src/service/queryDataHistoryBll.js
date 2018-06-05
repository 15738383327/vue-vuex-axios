/**
 * Created by zhutt
 * Created on 2017/11/29
 */
import Api from '../api/queryDataHistory'
import config from '../../config/index'

// const ageSection = [{
//   name: '22岁以下',
//   value: 'cnt_00_22'
// }, {
//   name: '23-34岁',
//   value: 'cnt_23_35'
// }, {
//   name: '35-44岁',
//   value: 'cnt_36_45'
// }, {
//   name: '45-55岁',
//   value: 'cnt_46_55'
// }, {
//   name: '55岁以上',
//   value: 'cnt_56_00'
// }, {
//   name: '总人数',
//   value: 'cnt_all'
// }]
export default {

  /**
   * 查询客流量分析历史数据
   * @returns {Promise}
   */
  queryDataHistory(param) {
    var data = []
    return new Promise((resolve) => {
      Api.queryDataHistory(param).then((res) => {
        if (param.permissions === 'SCENIC') {
          for (var i = 0, p; i < res.data.length; i++) {
            var val = {}
            p = res.data[i]
            val.fDate = p.fDate
            val.fCountAll = p.fCountAll
            val.fCountLive = p.fCountLocal
            val.fCountLocal = p.fCountInpro
            val.fCountAllCt = p.fCountOutpro
            data.push(val)
          }
        } else {
          for (var c = 0; c < res.data.length; c++) {
            var cVal = {}
            var o = res.data[c]
            cVal.fDate = o.f_date
            cVal.fCountAll = o.f_count_all
            cVal.fCountLive = o.f_count_local
            cVal.fCountLocal = o.f_count_inpro
            cVal.fCountAllCt = o.f_count_outpro
            data.push(cVal)
          }
        }
        // console.log(data)
        resolve(data)
      })
    })
  },
  /**
   * 查询All客流来源分析历史数据
   * @returns {Promise}
   */
  queryAllAnalysisSource(param) {
    return new Promise((resolve) => {
      Api.queryAllAnalysisSource(param).then((res) => {
        var analysisData = []
        if (param.permissions === 'SCENIC') {
          for (var i = 0, p; i < res.data.length; i++) {
            var val = {}
            p = res.data[i]
            val.f_date = p.fDate
            val.f_count_all = p.fCountAll
            val.f_count_all_ct = p.fCountAllCt
            val.f_count_inpro = p.fCountInpro
            val.f_count_inpro_ct = p.fCountInproCt
            val.f_count_live = p.fCountLive
            val.f_count_local = p.fCountLocal
            val.f_count_local_ct = p.fCountLocalCt
            val.f_count_no_local = p.fCountNolocal
            val.f_count_no_local_ct = p.fCountNolocalCt
            val.f_count_outpro = p.fCountOutpro
            val.f_count_outpro_ct = p.fCountOutproCt
            val.f_count_overnight = p.fCountOvernight
            val.f_count_overnight_ct = p.fCountOvernightCt
            val.f_count_work = p.fCountWork
            val.area_name = p.cfgArea.areaName
            analysisData.push(val)
          }
        } else {
          for (var c = 0, o; c < res.data.length; c++) {
            var cVal = {}
            o = res.data[c]
            cVal.f_date = o.fDate
            cVal.f_count_all = o.fCountAll
            cVal.f_count_all_ct = o.fCountAllCt
            cVal.f_count_inpro = o.fCountInpro
            cVal.f_count_inpro_ct = o.fCountInproCt
            cVal.f_count_live = o.fCountLive
            cVal.f_count_local = o.fCountLocal
            cVal.f_count_local_ct = o.fCountLocalCt
            cVal.f_count_no_local = o.fCountNolocal
            cVal.f_count_no_local_ct = o.fCountNolocalCt
            cVal.f_count_outpro = o.fCountOutpro
            cVal.f_count_outpro_ct = o.fCountOutproCt
            cVal.f_count_overnight = o.fCountOvernight
            cVal.f_count_overnight_ct = o.fCountOvernightCt
            cVal.f_count_work = o.fCountWork
            cVal.area_name = o.cfgArea.areaName
            analysisData.push(cVal)
          }
        }
        resolve(analysisData)
      })
    })
  },
  /**
   * 查询全国客流来源分析历史数据
   * @returns {Promise}
   */
  queryCountryAnalysisSource(param) { // 缺占比
    return new Promise((resolve) => {
      Api.queryCountryAnalysisSource(param).then((res) => {
        var analysisData = []
        if (param.permissions === 'SCENIC') {
          for (var i = 0, p; i < res.data.length; i++) {
            var val = {}
            p = res.data[i]
            val.fDate = p.fDate
            val.provinceName = p.provinceName
            val.fCount = p.fCount
            val.fCountCt = p.per
            analysisData.push(val)
          }
        } else {
          for (var c = 0, o; c < res.data.length; c++) {
            var cVal = {}
            o = res.data[c]
            cVal.fDate = o.fDate
            cVal.provinceName = o.provinceName
            cVal.fCount = o.fCount
            cVal.fCountCt = o.per
            analysisData.push(cVal)
          }
        }
        resolve(analysisData)
      })
    })
  },
  /**
   * 查询省客流来源分析历史数据
   * @returns {Promise}
   */
  queryProvinceAnalysisSource(param) { // 缺占比
    return new Promise((resolve) => {
      Api.queryProvinceAnalysisSource(param).then((res) => {
        var analysisPreData = []
        if (param.permissions === 'SCENIC') {
          for (var i = 0, p; i < res.data.length; i++) {
            var val = {}
            p = res.data[i]
            val.cDate = p.fDate
            val.cCity = p.cityName
            val.cPassengerFlow = p.fCount
            val.cProportion = p.per
            analysisPreData.push(val)
          }
        } else {
          for (var c = 0, o; c < res.data.length; c++) {
            var cVal = {}
            o = res.data[c]
            cVal.cDate = o.fDate
            cVal.cCity = o.cityName
            cVal.cPassengerFlow = o.fCount
            cVal.cProportion = o.per
            analysisPreData.push(cVal)
          }
        }
        resolve(analysisPreData)
      })
    })
  },
  /**
   * 查询客流属性分析历史数据 （城市）
   * @returns {Promise}
   */
  queryPassengerAttrCity(param) {
    return new Promise((resolve) => {
      Api.queryPassengerAttrCity(param).then((res) => {
        var analysisData = {
          ageList: [],
          sexList: []
        }
        // debugger
        if (param.permissions === 'SCENIC') {
          for (var c = 0; c < res.data.ageList.length; c++) {
            var cVal = {}
            var o = res.data.ageList[c]
            cVal.allDate = o.fDate
            cVal.allLevelAge22 = o.cnt_00_22
            cVal.allLevelAge23 = o.cnt_23_35
            cVal.allLevelAge35 = o.cnt_36_45
            cVal.allLevelAge45 = o.cnt_46_55
            cVal.allLevelAge55 = o.cnt_56_00
            cVal.allCount = o.cnt_all
            analysisData.ageList.push(cVal)
          }
          for (var q = 0; q < res.data.sexList.length; q++) {
            var gVal = {}
            var e = res.data.sexList[q]
            gVal.allDate = e.fDate
            gVal.allLevelAge22 = e.woman
            gVal.allLevelAge23 = e.man
            gVal.allLevelAge35 = e.cnt_all
            analysisData.sexList.push(gVal)
          }
        } else {
          for (var d = 0; d < res.data.ageList.length; d++) {
            var dVal = {}
            var f = res.data.ageList[d]
            dVal.allDate = f.f_date
            dVal.allLevelAge22 = f.cnt_00_22
            dVal.allLevelAge23 = f.cnt_23_35
            dVal.allLevelAge35 = f.cnt_36_45
            dVal.allLevelAge45 = f.cnt_46_55
            dVal.allLevelAge55 = f.cnt_56_00
            dVal.allCount = f.cnt_all
            analysisData.ageList.push(dVal)
          }
          for (var n = 0; n < res.data.sexList.length; n++) {
            var nVal = {}
            var x = res.data.sexList[n]
            nVal.allDate = x.f_date
            nVal.allLevelAge22 = x.woman
            nVal.allLevelAge23 = x.man
            nVal.allLevelAge35 = x.cnt_all
            analysisData.sexList.push(nVal)
          }
        }
        resolve(analysisData)
      })
    })
  },
  /**
   * 查询客流属性分析历史数据 （性别）
   * @returns {Promise}
   */
  queryPassengerAttrGender(param) {
    return new Promise((resolve) => {
      Api.queryPassengerAttrGender(param).then((res) => {
        var analysisData = []
        // if (param.permissions === 'SCENIC') {
        //   for (var i = 0, p; i < res.data.length; i++) {
        //     var val = {}
        //     p = res.data[i]
        //     val.fDate = p.fDate
        //     val.provinceName = p.provinceName
        //     val.fCount = p.fCount
        //     val.fCountCt = p.fCountCt
        //     analysisData.push(val)
        //   }
        // } else {
        //   for (var c = 0, o; c < res.data.length; c++) {
        //     var cVal = {}
        //     o = res.data[c]
        //     cVal.fDate = o.fDate
        //     cVal.provinceName = o.provinceName
        //     cVal.fCount = o.fCount
        //     cVal.fCountCt = o.fCountCt
        //     analysisData.push(cVal)
        //   }
        // }
        resolve(analysisData)
      })
    })
  },
  /**
   * 查询客流属性分析历史数据 （年龄）
   * @returns {Promise}
   */
  queryPassengerAttrAge(param) {
    return new Promise((resolve) => {
      Api.queryPassengerAttrAge(param).then((res) => {
        var analysisData = []
        // if (param.permissions === 'SCENIC') {
        //   for (var i = 0, p; i < res.data.length; i++) {
        //     var val = {}
        //     p = res.data[i]
        //     val.fDate = p.fDate
        //     val.provinceName = p.provinceName
        //     val.fCount = p.fCount
        //     val.fCountCt = p.fCountCt
        //     analysisData.push(val)
        //   }
        // } else {
        //   for (var c = 0, o; c < res.data.length; c++) {
        //     var cVal = {}
        //     o = res.data[c]
        //     cVal.fDate = o.fDate
        //     cVal.provinceName = o.provinceName
        //     cVal.fCount = o.fCount
        //     cVal.fCountCt = o.fCountCt
        //     analysisData.push(cVal)
        //   }
        // }
        resolve(analysisData)
      })
    })
  },
  /**
   * 查询景区停留时长历史数据
   * @returns {Promise}
   */
  queryScenicStayTime(param) {
    var data = []
    return new Promise((resolve) => {
      Api.queryScenicStayTime(param).then((res) => {
        if (param.permissions === 'SCENIC') {
          for (var i = res.data.length - 1, p; i >= 0; i--) {
            var val = {}
            p = res.data[i]
            val.scenicDate = p.fDate
            val.scenicAllLengthTime = p.fDuration
            val.scenicPerLengthTime = p.fDurationInpro
            val.scenicPerOutLengthTime = p.fDurationOutpro
            // val.date = p.fDate
            // val.allLengthTime = p.fCountAll
            // val.perLengthTime = p.fCountLive
            // val.perOutLengthTime = p.fCountLocal
            data.push(val)
          }
        } else {
          for (var c = res.data.length - 1, o; c >= 0; c--) {
            var cVal = {}
            o = res.data[c]
            cVal.date = o.f_date
            cVal.areaName = o.area_name
            cVal.allLengthTime = o.f_duration
            cVal.perLengthTime = o.f_duration_inpro
            cVal.perOutLengthTime = o.f_duration_outpro
            data.push(cVal)
          }
        }
        // console.log(data)
        resolve(data)
      })
    })
  },
  /**
   * 下载
   * @returns {Promise}
   */
  getLocationAPIURI() {
    return config.build.locationAPI
  }
}
