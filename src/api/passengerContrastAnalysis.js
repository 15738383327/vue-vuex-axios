/**
 * Created by zhutt
 * Created on 2017/11/29
 */
import Vue from 'vue'
import ErrorException from './exception'
import StaticConfig from '../../static/json/config.json'

export default {
  /**
   * 客流对比分析
   * @param param 入参
   * @returns {Promise}
   */
  queryContrastAnalysis(params, festival) {
    let url
    const parameters = { key: StaticConfig.locationAuthKey }
    if (params.permissions === 'SCENIC') {
      url = 'locationAPI/interface/areaAnalysis/areaFlowCompare'
      parameters.areaId = params.areaId
      parameters.holidayIds = festival
    } else if (params.permissions === 'COUNTY') {
      url = 'locationAPI/interface/areaAnalysis/areaFlowCompareBySysId'
      parameters.sysId = params.sysId
      parameters.holidayIds = festival
    } else if (params.permissions === 'CITY') {
      url = 'locationAPI/interface/areaAnalysis/areaFlowCompareBySysId'
      parameters.sysId = params.sysId
      parameters.holidayIds = festival
    } else {
      url = 'locationAPI/interface/areaAnalysis/areaFlowCompareBySysId'
      parameters.sysId = 1 // 全省查询，默认为查询南京
      parameters.holidayIds = festival
    }
    return new Promise(resolve => {
      Vue.$api.xHttp
        .get(url, parameters)
        .then(res => {
          resolve(res)
        })
        .catch(ex => {
          ErrorException.ErrorMsgNotification(ex.code)
        })
    })
  },
  /**
   * 客流对比分析
   * @param param 入参
   * @returns {Promise}
   */
  queryContrastAnalysisNew(params, festival) {
    let url = ''
    const postParams = {}
    postParams.key = '751ad75f9c8148fd88f1915e3d6badda'
    if (params.permissions === 'SCENIC') {
      postParams.areaId = params.areaId
      postParams.holidayIds = festival
      url = 'locationAPI/interface/areaAnalysis/areaFlowCompare'
    } else if (params.permissions === 'CITY') {
      postParams.sysId = params.sysId
      postParams.holidayIds = festival
      url = 'locationAPI/interface/areaAnalysis/areaFlowCompareBySysId'
    } else {
      postParams.holidayIds = festival
      url = 'locationAPI/interface/areaAnalysis/areaFlowCompareBySysId'
    }
    return new Promise(resolve => {
      Vue.$api.xHttp
        .get(url)
        .then(res => {
          resolve(res)
        })
        .catch(ex => {
          ErrorException.ErrorMsgNotification(ex.code)
        })
    })
  }
}
