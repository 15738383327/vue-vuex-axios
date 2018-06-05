/**
 * Created by tangyanan
 * Created on 2018/01/17
 */
import { loginByUsername } from '@/api/login'
import { setToken, removeToken } from '@/utils/auth'
import CustomerConfigBll from '../../api/CustomerConfiguration'
import MenuBll from '../../api/Menu'

const user = {
  state: {
    userInfo: {},
    status: '',
    code: '',
    token: '',
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    customerConfiguration: null,
    menuTree: null
  },

  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    INIT_SYS_CONFIG: (state, customerConfiguration) => {
      state.customerConfiguration = customerConfiguration
    },
    INIT_MENU_TREE: (state, menuTree) => {
      state.menuTree = menuTree
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit, dispatch }, userInfo) {
      userInfo.account = userInfo.account.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo).then(response => {
          if (response.status === 200) {
            const data = response.data
            setToken(data.token)
            commit('SET_TOKEN', data.token)
            commit('SET_USER_INFO', {
              roleId: response.data.roleIds,
              userId: response.data.id,
              ...response.data
            })
            dispatch('loadUserInterface').then(() => {
              resolve(response.data.role.homePageId) // 页面跳转
            })
          } else {
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    loadUserInterface({ state, commit }) {
      // 初始化系统配置
      // 查询用户的菜单权限
      return Promise.all([CustomerConfigBll.queryByPaginationOrCriteria({ id: state.userInfo.role.customerConfigurationId }), MenuBll.queryMenuTreeByRoleId()]).then(([res1, res2]) => {
        commit('INIT_SYS_CONFIG', res1.data[0])
        commit('INIT_MENU_TREE', res2.data)
      })
    },
    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', null)
        commit('SET_USER_INFO', null)
        removeToken()
        resolve()
      })
    }
  }
}

export default user
