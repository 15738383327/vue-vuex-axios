/**
 * Created by tangyanan
 * Created on 2017/12/7
 */
import Vue from 'vue'
import ErrorException from './exception'
import StaticConfig from '../../static/json/config.json'
export default {

  /**
   * 根据RoleId 获取栏目树形结构
   * @returns {Promise}
   */
  queryMenuTreeByRoleId() {
    return new Promise((resolve) => {
      var url = 'shopApi/menuTreeForCurrentUser?productVersionType=' + StaticConfig.systemConfigId
      Vue.$api.xHttp.get(url).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 获取栏目树形结构
   * @param param 入参
   * @returns {Promise}
   */
  queryMenuTree(param) {
    return new Promise((resolve) => {
      var url = 'shopApi/menuTree?productVersionType=' + StaticConfig.systemConfigId
      Vue.$api.xHttp.get(url).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 获取栏目列表
   * @param param 入参
   * @returns {Promise}
   */
  queryAllMenu(param) {
    return new Promise((resolve) => {
      var url = 'shopApi/menuList?productVersionType=' + StaticConfig.systemConfigId
      Vue.$api.xHttp.get(url).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 创建&编辑栏目
   * @param param 入参
   * @returns {Promise}
   */
  createMenu(param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post('shopApi/saveMenu', param).then((res) => {
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
      Vue.$api.xHttp.post('shopApi/menus', pagination).then((res) => {
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
  deletePageInfo(param) {
    var url = 'shopApi/deleteMenu/' + param.id
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(url).then((res) => {
        resolve(res)
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  }
}
