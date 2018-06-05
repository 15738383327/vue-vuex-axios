/**
 * Created by zhutt
 * Created on 2018/1/15
 */
import Vue from 'vue'
import ErrorException from './exception'
import StaticConfig from '../../static/json/config.json'

export default {
  /**
   * 实时客流分析--折线版本
   * @returns {Promise}
   */
  getFLDataAPIs(params) {
    let url = ''
    const num = 50
    var postParam = {}
    // 景区数据权限
    if (params.permissions === 'SCENIC') {
      postParam.areaId = params.areaId
      postParam.key = StaticConfig.locationAuthKey
      postParam.num = num
      url = 'locationAPI/interface/areaAnalysis/areaFlow'
      // 城市&区县数据权限
    } else if (params.permissions === 'CITY' || params.permissions === 'COUNTY') {
      postParam.sysId = params.sysId
      postParam.key = StaticConfig.locationAuthKey
      postParam.num = num
      url = 'locationAPI/interface/areaAnalysis/realFlowBySysId'
      // 省份数据权限
    } else {
      postParam.key = StaticConfig.locationAuthKey
      postParam.num = num
      url = 'locationAPI/interface/areaAnalysis/realFlowBySysId'
    }
    if (params.endDate !== undefined && params.startDate !== undefined) {
      postParam.startDate = params.startDate
      postParam.endDate = params.endDate
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
