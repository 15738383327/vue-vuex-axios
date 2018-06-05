/**
 * Created by zhutt
 * Created on 2017/11/29
 */
import Vue from 'vue'
import ErrorException from './exception'

export default {
  /**
   * 根据ID获取角色权限
   * @param param 入参
   * @returns {Promise}
   */
  queryRoleById(param) {
    return new Promise((resolve) => {
      var url = `shopApi/role/` + param.id
      Vue.$api.xHttp.get(url).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 获取角色列表
   * @param param 入参
   * @returns {Promise}
   */
  queryRoleList(param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post(`shopApi/queryAllRole`, param).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 获取queryAllRoleWithMenu
   * @param param 入参
   * @returns {Promise}
   */
  queryAllRoleWithMenu(param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post(`shopApi/queryAllRoleWithMenu`, param).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 新增和修改角色
   * @param param 入参
   * @returns {Promise}
   */
  createRoleInfo(param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post('shopApi/saveRole', param).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 删除单页模版
   * @param param 入参
   * @returns {Promise}
   */
  deleteRoleList(param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(`shopApi/deleteRole/${param.id}`).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 搜索列表
   * @param param 入参
   * @returns {Promise}
   */
  queryRoleListByParams(param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post('shopApi/queryRoleByCondition/', param, '').then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 翻页查询
   * @param param 入参
   * @returns {Promise}
   */
  handleTableChange(pagination) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post('shopApi/roleList', pagination).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  }
}

