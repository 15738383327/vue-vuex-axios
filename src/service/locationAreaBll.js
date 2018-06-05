/**
 * Created by tangyanan
 * Created on 2017/11/24
 */
import Api from '../api/locationArea'
import Error from '../api/exception'

export default {
  /**
   * 翻页查询
   * @param param 入参
   * @returns {Promise}
   */
  handleTableChange(pagination) {
    return new Promise((resolve) => {
      Api.handleTableChange(pagination).then((res) => {
        if (res.status === 200) {
          resolve(res)
        } else {
          Error.ErrorMsgNotification(res.status, res.msg)
        }
      })
    })
  }
}
