import Vue from 'vue'
import ErrorException from './exception'

export default {
  /**
   * 分页或条件查询
   * @param {*} param
   */
  queryByPaginationOrCriteria(param) {
    return Vue.$api.xHttp.post('shopApi/sys/customerConfiguration/list', param).then((res) => {
      if (res.status === 200) {
        return res
      } else {
        ErrorException.ErrorMsgNotification(res.status, res.msg)
      }
    }).catch(reason => {
      ErrorException.ErrorMsgNotification(reason.code)
    })
  },
  /**
   * 新增/编辑-持久化
   * @param {*} param
   */
  persistCustomerConfig(param) {
    return Vue.$api.xHttp.post('shopApi/sys/customerConfiguration/persist', param).then((res) => {
      if (res.status === 200) {
        return res
      } else {
        ErrorException.ErrorMsgNotification(res.status, res.msg)
      }
    }).catch(reason => {
      ErrorException.ErrorMsgNotification(reason.code)
    })
  },
  /**
   * 删除
   * @param {*} param
   */
  deleteCustomerConfig(param) {
    return Vue.$api.xHttp.post('shopApi/sys/customerConfiguration/delete', param).then((res) => {
      if (res.status === 200) {
        return res
      } else {
        ErrorException.ErrorMsgNotification(res.status, res.msg)
      }
    }).catch(reason => {
      ErrorException.ErrorMsgNotification(reason.code)
    })
  }
}
