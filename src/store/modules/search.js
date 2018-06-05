const searchObj = {
  state: {
    searchinfo: {},
    menuShow: true
  },
  mutations: {
    SET_SEARCH_INFO: (state, searchinfo) => {
      state.searchinfo = searchinfo
    },
    UPDATE_SEARCH_SHOW_STATE: (state, ishow) => {
      state.menuShow = ishow
    }
  }
}

export default searchObj
