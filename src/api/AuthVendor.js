import http from '../http/xHttp'
import ErrorException from './exception'

export default {
  /**
   * 查询所有（可分页）
   * @param {any} page
   */
  findByPagination(page) {
    return http.get('shopApi/sys/authVendor', page).then(res => {
      if (res.status === 200) {
        return res
      } else {
        ErrorException.ErrorMsgNotification(res.status, res.msg)
      }
    }).catch(err => {
      ErrorException.ErrorMsgNotification(err.status)
    })
  },
  /**
   * 新增或修改
   * @param {any} vendor
   */
  persist(vendor) {
    return http.post('shopApi/sys/authVendor', vendor).then(res => {
      if (res.status === 200) {
        return res
      } else {
        ErrorException.ErrorMsgNotification(res.status, res.msg)
      }
    }).catch(err => {
      ErrorException.ErrorMsgNotification(err.status)
    })
  },
  /**
   * 删除
   * @param {int} id
   */
  delete(id) {
    return http.delete('shopApi/sys/authVendor', id).then(res => {
      if (res.status === 200) {
        return res
      } else {
        ErrorException.ErrorMsgNotification(res.status, res.msg)
      }
    }).catch(err => {
      ErrorException.ErrorMsgNotification(err.status)
    })
  }
}
