import Vue from 'vue'
import Vuex from 'vuex'
import localStorage from '../utils/localStorage'
import creatPersistedstate from 'vuex-persistedstate'
import config from '../../config'
import app from './modules/app'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'
import search from './modules/search'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    contextPath: process.env.NODE_ENV === 'production' ? config.build.onlineApiUrl : config.build.offlineApiUrl
  },
  modules: {
    app,
    tagsView,
    user,
    search
  },
  getters,
  // 状态持久化插件
  plugins: [creatPersistedstate({
    key: config.build.assetsPublicPath + 'vuex',
    paths: ['user'], // 缓存的模块
    getState: (key) => localStorage.get(key),
    setState: (key, state) => localStorage.set(key, state)
  })]
})

export default store
