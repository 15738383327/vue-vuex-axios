/**
 * Created by zhutt
 * Created on 2017/11/29
 */
import Vue from 'vue'
import ErrorException from './exception'

export default {
  /**
   * 获取用户列表
   * @param param 入参
   * @returns {Promise}
   */
  queryUserList(param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post('shopApi/queryAllUser', param, '').then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 用户注册
   * @param param 入参
   * @returns {Promise}
   */
  registerInfo(param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post('shopApi/register', param, '').then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 新增/编辑-保存用户信息
   * @param param 入参
   * @returns {Promise}
   */
  persistUserInfo(param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post('shopApi/saveUser', param).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 删除
   * @param param 入参
   * @returns {Promise}
   */
  deleteUserList(param) {
    var url = 'shopApi/deleteUser/' + param.id
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(url).then((res) => {
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
  queryUserListByParams(param) {
    var url = 'shopApi/queryUserByCondition/' + param
    return new Promise((resolve) => {
      Vue.$api.xHttp.post(url, '').then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 分页查询
   * @param {Object} pagination
   * @returns {Promise}
   */
  handleTableChange(pagination) {
    return Vue.$api.xHttp.post('shopApi/userList', pagination)
  },
  /**
   * 修改密码
   * @param param 入参
   * @returns {Promise}
   */
  modifyPwd(param) {
    var url = 'shopApi/changePwd/'
    return new Promise((resolve) => {
      Vue.$api.xHttp.post(url, param, '').then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  }
}
