/**
 * Created by zhutt
 * Created on 2017/11/29
 */
import Api from '../api/User'
import Error from '../api/exception'

export default {
  /**
   * 获取角色列表
   * @returns {Promise}
   */
  queryUserList(param) {
    return new Promise(resolve => {
      Api.queryUserList(param).then(res => {
        if (res.status === 200) {
          resolve(res)
        } else {
          Error.ErrorMsgNotification(res.status, res.msg)
        }
      })
    })
  },
  /**
   * 用户注册
   * @param param 入参
   * @returns {Promise}
   */
  registerInfo(param) {
    return Api.registerInfo(param)
  },
  /**
   * 新增/编辑-持久化
   * @returns {Promise}
   */
  persistUserInfo(param) {
    return new Promise(resolve => {
      Api.persistUserInfo(param).then(res => {
        if (res.status === 200) {
          resolve(res)
        } else {
          Error.ErrorMsgNotification(res.status, res.msg)
        }
      })
    })
  },
  /**
   * 删除角色
   * @param param 入参
   * @returns {Promise}
   */
  deleteUserList(param) {
    return new Promise(resolve => {
      Api.deleteUserList(param).then(res => {
        if (res.status === 200) {
          resolve(res)
        } else {
          Error.ErrorMsgNotification(res.status, res.msg)
        }
      })
    })
  },
  /**
   * 分页查询/条件查询
   * @param {Object} pagination
   * @returns {Promise}
   */
  handleTableChange(pagination) {
    return Api.handleTableChange(pagination).then(res => {
      if (res.status === 200) {
        return res
      } else {
        Error.ErrorMsgNotification(res.status, res.msg)
      }
    })
  },
  /**
   * 修改密码
   * @param param 入参
   * @returns {Promise}
   */
  modifyMessageForm(param) {
    return Api.modifyPwd(param)
  }
}
