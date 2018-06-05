import { oAuthPermissions } from '../utils/auth'

const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  customerConfiguration: state => state.user.customerConfiguration,
  menuTree: state => state.user.menuTree,
  searchInfo: state => state.search,
  menuShow: state => state.menuShow,
  authInfo: state => oAuthPermissions(state.user.userInfo.role),
  permissions: state => {
    // 如果搜索组件不为空，则返回搜索条件
    if (state.search.searchinfo.permissions) {
      return state.search.searchinfo
    }
    // 否则返回根据角色信息返回的结果
    return oAuthPermissions(state.user.userInfo.role)
  }
}
export default getters
