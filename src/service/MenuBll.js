/**
 * Created by tangyanan
 * Created on 2017/11/14
 */
import Api from '../api/Menu'
import Error from '../api/exception'

export default {
  /**
   * 根据roleId获取栏目列表
   * @param param 入参
   * @returns {Promise}
   */
  queryMenuTreeByRoleId(param) {
    return new Promise((resolve) => {
      Api.queryMenuTreeByRoleId(param).then((res) => {
        if (res.status === 200) {
          resolve(res)
        } else {
          Error.ErrorMsgNotification(res.status, res.msg)
        }
      })
    })
  },
  /**
   * 获取栏目列表
   * @param param 入参
   * @returns {Promise}
   */
  queryMenuTree(param) {
    return new Promise((resolve) => {
      Api.queryMenuTree(param).then((res) => {
        if (res.status === 200) {
          resolve(res)
        } else {
          Error.ErrorMsgNotification(res.status, res.msg)
        }
      })
    })
  },
  /**
   * 获取专题列表
   * @param param 入参
   * @returns {Promise}
   */
  queryAllMenu(param) {
    return new Promise((resolve) => {
      Api.queryAllMenu(param).then((res) => {
        if (res.status === 200) {
          resolve(res)
        } else {
          Error.ErrorMsgNotification(res.status, res.msg)
        }
      })
    })
  },
  createMenu(param) {
    return new Promise((resolve) => {
      Api.createMenu(param).then((res) => {
        if (res.status === 200) {
          resolve(res)
        } else {
          Error.ErrorMsgNotification(res.status, res.msg)
        }
      })
    })
  },
  handleTableChange(param) {
    return new Promise((resolve) => {
      Api.handleTableChange(param).then((res) => {
        if (res.status === 200) {
          resolve(res)
        } else {
          Error.ErrorMsgNotification(res.status, res.msg)
        }
      })
    })
  },
  deletePageInfo(param) {
    return new Promise((resolve) => {
      Api.deletePageInfo(param).then((res) => {
        if (res.status === 200) {
          resolve(res)
        } else {
          Error.ErrorMsgNotification(res.status, res.msg)
        }
      })
    })
  }
}
