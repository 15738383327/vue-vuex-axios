/**
 * Created by zhutt
 * Created on 2017/11/29
 */
import Vue from 'vue'
import ErrorException from './exception'
import CityInfoBll from '@/service/CityInfoBll'
import StaticConfig from '../../static/json/config.json'

export default {
  /**
   * 查询客流量分析历史数据
   * @param param 入参
   * @returns {Promise}
   */
  queryDataHistory(params) {
    let url = ''
    var postParam = {}
    // 景区数据权限
    if (params.permissions === 'SCENIC') {
      postParam.areaId = params.areaId
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
      postParam.key = StaticConfig.locationAuthKey
      url = 'locationAPI/interface/areaAnalysis/flowAllDay'
      // 城市&区县数据权限
    } else if (params.permissions === 'CITY' || params.permissions === 'COUNTY') {
      postParam.sysId = params.sysId
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
      postParam.key = StaticConfig.locationAuthKey
      url = 'locationAPI/interface/areaAnalysis/areaFlowAllData'
      // 省份数据权限
    } else {
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
      postParam.key = StaticConfig.locationAuthKey
      url = 'locationAPI/interface/areaAnalysis/areaFlowAllData'
    }
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(url, postParam).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 查询All客流来源分析历史数据
   * @param param 入参
   * @returns {Promise}
   */
  queryAllAnalysisSource(params) {
    var url = 'locationAPI/interface/areaAnalysis/getFlowAllDay'
    var postParam = {}
    if (params.permissions === 'SCENIC') {
      postParam.areaId = params.areaId
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
      postParam.key = StaticConfig.locationAuthKey
      // 城市&区县数据权限
    } else if (params.permissions === 'CITY' || params.permissions === 'COUNTY') {
      postParam.sysId = params.sysId
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
      postParam.key = StaticConfig.locationAuthKey
      // 省份数据权限
    } else {
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
      postParam.key = StaticConfig.locationAuthKey
    }
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(url, postParam).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 查询全国客流来源分析历史数据
   * @param param 入参
   * @returns {Promise}
   */
  queryCountryAnalysisSource(params) {
    var url = 'locationAPI/interface/areaAnalysis/flowProvDay'
    var postParam = {}
    if (params.permissions === 'SCENIC') {
      postParam.areaId = params.areaId
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
      postParam.key = StaticConfig.locationAuthKey
      // 城市&区县数据权限
    } else if (params.permissions === 'CITY' || params.permissions === 'COUNTY') {
      postParam.sysId = params.sysId
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
      postParam.key = StaticConfig.locationAuthKey
      // 省份数据权限
    } else {
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
      postParam.key = StaticConfig.locationAuthKey
    }
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(url, postParam).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 查询省客流来源分析历史数据
   * @param param 入参
   * @returns {Promise}
   */
  queryProvinceAnalysisSource(params) {
    var url = 'locationAPI/interface/areaAnalysis/flowCityDay'
    var postParam = {}
    if (params.permissions === 'SCENIC') {
      postParam.areaId = params.areaId
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
      postParam.key = StaticConfig.locationAuthKey
      // 城市&区县数据权限
    } else if (params.permissions === 'CITY' || params.permissions === 'COUNTY') {
      postParam.sysId = params.sysId
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
      postParam.key = StaticConfig.locationAuthKey
      // 省份数据权限
    } else {
      postParam.sysId = CityInfoBll.getSysIdByCityId(11)
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
      postParam.key = StaticConfig.locationAuthKey
    }
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(url, postParam).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 查询客流属性分析历史数据 （城市）
   * @param param 入参
   * @returns {Promise}
   */
  queryPassengerAttrCity(params) {
    var url = 'locationAPI/interface/areaAnalysis/areaFlowProperty'
    var postParam = {}
    if (params.permissions === 'SCENIC') {
      url = 'locationAPI/interface/areaAnalysis/areaFlowPropertyByAreaId'
      postParam.areaId = params.areaId
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
      postParam.key = StaticConfig.locationAuthKey
      // 城市&区县数据权限
    } else if (params.permissions === 'CITY' || params.permissions === 'COUNTY') {
      postParam.sysId = params.sysId
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
      postParam.key = StaticConfig.locationAuthKey
      // 省份数据权限
    } else {
      postParam.sysId = 1 // CityInfoBll.getSysIdByCityId(11)
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
      postParam.key = StaticConfig.locationAuthKey
    }
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(url, postParam).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 查询客流属性分析历史数据 （性别）
   * @param param 入参
   * @returns {Promise}
   */
  queryPassengerAttrGender(params) {
    var url = 'locationAPI/interface/areaAnalysis/sexDay'
    var postParam = {}
    if (params.permissions === 'SCENIC') {
      postParam.areaId = params.areaId
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
      postParam.key = StaticConfig.locationAuthKey
      // 城市&区县数据权限
    } else if (params.permissions === 'CITY' || params.permissions === 'COUNTY') {
      postParam.sysId = params.sysId
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
      postParam.key = StaticConfig.locationAuthKey
      // 省份数据权限
    } else {
      postParam.sysId = CityInfoBll.getSysIdByCityId(11)
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
      postParam.key = StaticConfig.locationAuthKey
    }
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(url, postParam).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 查询客流属性分析历史数据 （年龄）
   * @param param 入参
   * @returns {Promise}
   */
  queryPassengerAttrAge(params) {
    var url = 'locationAPI/interface/areaAnalysis/ageDay'
    var postParam = {}
    if (params.permissions === 'SCENIC') {
      postParam.areaId = params.areaId
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
      postParam.key = StaticConfig.locationAuthKey
      // 城市&区县数据权限
    } else if (params.permissions === 'CITY' || params.permissions === 'COUNTY') {
      postParam.sysId = params.sysId
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
      postParam.key = StaticConfig.locationAuthKey
      // 省份数据权限
    } else {
      postParam.sysId = CityInfoBll.getSysIdByCityId(11)
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
      postParam.key = StaticConfig.locationAuthKey
    }
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(url, postParam).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 查询景区停留时长
   * @param param 入参
   * @returns {Promise}
   */
  queryScenicStayTime(params) {
    var url = ''
    var postParam = {}
    if (params.permissions === 'SCENIC') {
      postParam.areaId = params.areaId
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
      postParam.key = StaticConfig.locationAuthKey
      url = 'locationAPI/interface/areaAnalysis/durationDay'
      // 城市&区县数据权限
    } else if (params.permissions === 'CITY' || params.permissions === 'COUNTY') {
      postParam.sysId = params.sysId
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
      postParam.key = StaticConfig.locationAuthKey
      url = 'locationAPI/interface/areaAnalysis/durationDayBySysId'
      // 省份数据权限
    } else {
      postParam.sysId = 2
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
      postParam.key = StaticConfig.locationAuthKey
      url = 'locationAPI/interface/areaAnalysis/durationDayBySysId'
    }
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(url, postParam).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 下载
   * @param param 入参
   * @returns {Promise}
   */
  downAll(params) {
    var url = 'locationAPI/interface/areaAnalysis/exportExcel'
    var postParam = {}
    postParam.areaId = params.areaId
    postParam.startDate = params.startDate
    postParam.endDate = params.endDate
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(url, postParam).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  }
}
