import Vue from 'vue'
import ErrorException from './exception'

export default {
  getScenicListDataById(params) {
    let url = ''
    if (params.permissions === 'SCENIC' || params.permissions === 'COUNTY' || params.permissions === 'CITY') {
      url = 'locationAPI/interface/areaAnalysis/relationAreaListData?sysId=' + params.sysId
    } else {
      url = 'locationAPI/interface/areaAnalysis/relationAreaListData'
    }
    return new Promise((resolve) => {
      Vue.$api.xHttp.post(url).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  }
}
