/**
 * Created by tangyn
 * Created on 2018/3/2
 */
import Vue from 'vue'
import ErrorException from './exception'
import UtilsDate from '../utils/date'
import StaticConfig from '../../static/json/config.json'

export default {
  // 位置平台，标准化接口
  /**
   * 昨日城市区域客流属性分析
   * @param param 入参
   * @returns {Promise}
   */
  getCityTouristAttrData(params) {
    let url = ''
    var postParam = {}
    postParam.startDate = UtilsDate.add(new Date(), -1, 'day', 'yyyyMMdd')
    postParam.endDate = UtilsDate.add(new Date(), -1, 'day', 'yyyyMMdd')
    postParam.key = StaticConfig.locationAuthKey
    // 城市&区县数据权限
    if (params.permissions === 'SCENIC') {
      postParam.areaId = params.areaId
      url = 'locationAPI/interface/areaAnalysis/areaFlowPropertyByAreaId'
    } else if (params.permissions === 'CITY' || params.permissions === 'COUNTY') {
      postParam.sysId = params.sysId
      url = 'locationAPI/interface/areaAnalysis/areaFlowProperty'
      // 省份数据权限
    } else {
      postParam.sysId = 1
      url = 'locationAPI/interface/areaAnalysis/areaFlowProperty'
    }
    return new Promise((resolve) => {
      Vue.$api.xHttp.post(url, postParam).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  }
}
