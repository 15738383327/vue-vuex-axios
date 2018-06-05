import Vue from 'vue'
import ErrorException from './exception'
import UtilDate from '../utils/date'
import StaticConfig from '../../static/json/config.json'

export default {
  /**
   * 省内个城市游客来源地排名
   * @param params 用户的数据权限入参数
   * @returns {Promise}
   */
  getGBTopList(params) {
    var provinceId = StaticConfig.provinceId
    let url = ''
    if (params.permissions === 'PROVINCE') {
      url = 'locationAPI/interface/user/report/custom/flowSource?provinceId=' + provinceId
    } else {
      url = 'locationAPI/interface/user/report/custom/flowSource?cityId=' + params.cityId
    }
    return new Promise((resolve) => {
      Vue.$api.xHttp.post(url).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 获取景区TOP排行
   * @param param 入参
   * @returns {Promise}
   */
  getScenicTopGroupByFlowDataInfo(params) {
    const url = 'locationAPI/interface/areaAnalysis/getFlowAllDay'
    const postParams = {}
    if (params.permissions === 'SCENIC') {
      postParams.areaId = params.areaId
      // 获取前8天日期
      postParams.startDate = UtilDate.add(new Date(), -8, 'day', 'yyyyMMdd')
      // 获取前1天日期
      postParams.endDate = UtilDate.add(new Date(), -1, 'day', 'yyyyMMdd')
    } else if (params.permissions === 'CITY') {
      postParams.sysId = params.sysId
      // 获取前1天日期
      postParams.startDate = UtilDate.add(new Date(), -1, 'day', 'yyyyMMdd')
      // 获取前1天日期
      postParams.endDate = UtilDate.add(new Date(), -1, 'day', 'yyyyMMdd')
    } else if (params.permissions === 'COUNTY') {
      postParams.countyId = params.countyId
      // 获取前1天日期
      postParams.startDate = UtilDate.add(new Date(), -1, 'day', 'yyyyMMdd')
      // 获取前1天日期
      postParams.endDate = UtilDate.add(new Date(), -1, 'day', 'yyyyMMdd')
    } else {
      postParams.provinceId = params.provinceId
      // 获取前1天日期
      postParams.startDate = UtilDate.add(new Date(), -1, 'day', 'yyyyMMdd')
      // 获取前1天日期
      postParams.endDate = UtilDate.add(new Date(), -1, 'day', 'yyyyMMdd')
    }
    postParams.key = StaticConfig.locationAuthKey
    return new Promise((resolve) => {
      Vue.$api.xHttp.post(url, postParams).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 昨日省内客流来源
   * @param param 入参
   * @returns {Promise}
   */
  queryPassengerSourceData(params) {
    const startDate = UtilDate.add(new Date(), -1, 'day', 'yyyyMMdd')
    const url = 'locationAPI/interface/areaAnalysis/flowCityDay?sysId=1&startDate=' + startDate + '&endDate=' + startDate + '&key=' + StaticConfig.locationAuthKey
    return new Promise((resolve) => {
      Vue.$api.xHttp.post(url).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 旅游舒适度
   * @param param 入参
   * @returns {Promise}
   */
  TravelComfortData(params) {
    // const key = '751ad75f9c8148fd88f1915e3d6badda'
    let url = ''
    if (params.permissions === 'SCENIC') {
      url = 'locationAPI/interface/areaAnalysis/comfortable?areaId=' + params.areaId + '&key=' + StaticConfig.locationAuthKey
    } else if (params.permissions === 'CITY') {
      url = 'locationAPI/interface/areaAnalysis/comfortableBySysId?sysId=' + params.sysId + '&key=' + StaticConfig.locationAuthKey
    } else {
      url = 'locationAPI/interface/areaAnalysis/comfortableBySysId?key=' + StaticConfig.locationAuthKey
    }
    return new Promise((resolve) => {
      Vue.$api.xHttp.post(url).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 省内/外客流来源分析
   * @param param 入参
   * @returns {Promise}
   */
  getTouristSourceData(params) {
    const url = `locationAPI/interface/areaAnalysis/${params.uri}`
    params.key = StaticConfig.locationAuthKey
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(url, params).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  }
}
