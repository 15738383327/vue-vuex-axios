/**
 * Created by zhutt
 * Created on 2017/11/29
 */
import Api from '../api/Role'
import Error from '../api/exception'

var industryList = [
  { label: '所有行业', value: '200' },
  { label: '旅游大数据', value: '0' },
  { label: '活动赛事大数据', value: '1' },
  {
    label: '公安大数据',
    value: '2'
  },
  { label: '园区大数据', value: '3' },
  { label: '文化大数据', value: '4' },
  { label: '商业地产大数据', value: '5' },
  {
    label: '精准广告（点点通）',
    value: '6'
  }
]
export default {
  /**
   * 根据ID获取角色权限
   * @returns {Promise}
   */
  queryRoleById(param) {
    return new Promise(resolve => {
      Api.queryRoleById(param).then(res => {
        if (res.status === 200) {
          resolve(res)
        } else {
          Error.ErrorMsgNotification(res.status, res.msg)
        }
      })
    })
  },
  /**
   * 获取角色列表
   * @returns {Promise}
   */
  queryRoleList(param) {
    return new Promise(resolve => {
      Api.queryRoleList(param).then(res => {
        if (res.status === 200) {
          resolve(res)
        } else {
          Error.ErrorMsgNotification(res.status, res.msg)
        }
      })
    })
  },
  /**
   * 获取归属行业
   * @returns {Promise}
   */
  queryIndustryList() {
    return industryList
  },
  /**
   * 根据行业类型获取角色列表
   * @returns {Promise}
   */
  queryRoleListByIndustry(roleList, industry) {
    var objList = []
    for (var i = 0; i < roleList.length; i++) {
      if (roleList[i].industry.toString() === industry) {
        objList.push(roleList[i])
      }
    }
    return objList
  },
  /**
   * 根据行角色ID,获取归属行业
   * @returns {Promise}
   */
  queryIndustryByRoleId(roleList, industry) {
    var objList = []
    for (var i = 0; i < roleList.length; i++) {
      if (roleList[i].industry === industry) {
        objList.push(roleList[i])
      }
    }
    return objList
  },
  /**
   * 获取queryAllRoleWithMenu
   * @param param 入参
   * @returns {Promise}
   */
  queryAllRoleWithMenu(param) {
    return new Promise(resolve => {
      Api.queryAllRoleWithMenu(param).then(res => {
        if (res.status === 200) {
          resolve(res)
        } else {
          Error.ErrorMsgNotification(res.status, res.msg)
        }
      })
    })
  },
  /**
   * 新增和修改角色
   * @returns {Promise}
   */
  createRoleInfo(param) {
    return new Promise(resolve => {
      Api.createRoleInfo(param).then(res => {
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
  deleteRoleList(param) {
    return new Promise(resolve => {
      Api.deleteRoleList(param).then(res => {
        if (res.status === 200) {
          resolve(res)
        } else {
          Error.ErrorMsgNotification(res.status, res.msg)
        }
      })
    })
  },
  /**
   * 搜索角色
   * @param param 入参
   * @returns {Promise}
   */
  queryRoleListByParams(param) {
    return new Promise(resolve => {
      Api.queryRoleListByParams(param).then(res => {
        if (res.status === 200) {
          resolve(res)
        } else {
          Error.ErrorMsgNotification(res.status, res.msg)
        }
      })
    })
  },
  /**
   * 翻页查询
   * @param param 入参
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
  permissionConfigData() {
    var config = [
      { name: '查询', id: '1', type: 'primary' },
      { name: '新增', id: '2', type: 'success' },
      { name: '编辑', id: '3', type: 'warning' },
      { name: '删除', id: '4', type: 'danger' },
      { name: '审核', id: '5', type: 'warning' }
    ]
    return config
  },
  /**
   * 获取数据Type
   * @param id
   * @returns string
   */
  getPermissionTypeById(param) {
    var type
    var config = this.permissionConfigData
    for (var i = 0; i < config.length; i++) {
      if (param === config[i].id.toString()) {
        type = config[i].type
        break
      }
    }
    return type
  },
  /**
   * 获取数据Type
   * @param id
   * @returns string
   */
  authPermission(param) {
    var result = false
    var permissionData = param.permissionData.split(',')
    param.type = ''
    for (var i = 0; i < permissionData.length; i++) {
      if (param.type === this.getPermissionTypeById(permissionData[i])) {
        result === true
      }
    }
    return result
  }
}
