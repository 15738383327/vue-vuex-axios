/**
 * Created by tangyanan
 * Created on 2017/11/24
 */

import Vue from 'vue'
import ErrorException from './exception'

export default {
  /**
   * 翻页查询
   * @param param 入参
   * @returns {Promise}
   */
  handleTableChange(pagination) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post('shopApi/report/userArea', pagination).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  }
}
