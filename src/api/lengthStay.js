/**
 * Created by tangyn
 * Created on 2018/2/28
 */
import Vue from 'vue'
import ErrorException from './exception'
import UtilsDate from '../utils/date'
import StaticConfig from '../../static/json/config.json'

export default {
  /**
   * 停留时长
   * @param param 入参
   * @returns {Promise}
   */
  queryLengthStay(params) {
    const startDate = UtilsDate.add(new Date(), -11, 'day', 'yyyyMMdd')
    const endDate = UtilsDate.add(new Date(), -1, 'day', 'yyyyMMdd')
    let url = ''
    var postParam = {}
    // 景区数据权限
    if (params.permissions === 'SCENIC') {
      postParam.areaId = params.areaId
      postParam.startDate = startDate
      postParam.endDate = endDate
      postParam.key = StaticConfig.locationAuthKey
      url = 'locationAPI/interface/areaAnalysis/durationDay'
      // 城市&区县数据权限
    } else if (params.permissions === 'CITY' || params.permissions === 'COUNTY') {
      postParam.sysId = params.sysId
      postParam.startDate = startDate
      postParam.endDate = endDate
      postParam.key = StaticConfig.locationAuthKey
      url = 'locationAPI/interface/areaAnalysis/durationDayBySysId'
      // 省份数据权限
    } else {
      postParam.startDate = startDate
      postParam.endDate = endDate
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
  }
}
