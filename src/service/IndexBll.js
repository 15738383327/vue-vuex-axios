/**
* Created by tangyanan
* Created on 2018/01/18
*/
import Api from '../api/homePage'

export default {
  /**
   * 获取旅游舒适度数据
   * @param params 用户的数据权限入参数
   * @returns {Promise}
   */
  getTravelComfort(params) {
    return new Promise((resolve) => {
      Api.TravelComfortData(params).then((res) => {
        resolve(res)
      })
    })
  },
  /**
  * 获取首页--TOP数据
  * @param params 用户的数据权限入参数
  * @returns {Promise}
  */
  getGBTopListData(params) {
    return new Promise((resolve) => {
      Api.getGBTopList(params).then((res) => {
        const listDatas = {
          cityNames: [],
          cityPercents: [],
          scenicNames: [],
          scenicPercents: []
        }
        // 总数
        if (res.data !== undefined && res.data !== '') {
          const provTotal = res.data.province_count
          const cityTotal = res.data.city_count
          res.data.province && res.data.province.map((v, i) => {
            if (i < 5) {
              const tempPercent = (v.count / provTotal) * 100
              const cname = v.province_name.trim()
              listDatas.cityNames.push(cname)
              listDatas.cityPercents.push(parseFloat(tempPercent).toFixed(2))
            }
          })
          res.data.province && res.data.city.map((v, i) => {
            if (i < 10) {
              const tempPercent = (v.count / cityTotal) * 100
              const sname = v.city_name.trim()
              listDatas.scenicNames.push(sname)
              listDatas.scenicPercents.push(parseFloat(tempPercent).toFixed(2))
            }
          })
        }
        resolve(listDatas)
      })
    })
  },
  /**
  * 获取景区TOP排行
  * @param params 用户的数据权限入参数
  * @returns {Promise}
  */
  getScenicTopGroupByFlowData(params) {
    return new Promise((resolve) => {
      Api.getScenicTopGroupByFlowDataInfo(params).then((res) => {
        resolve(res)
      })
    })
  },
  /**
  * 客流属性分析
  * @param params 用户的数据权限入参数
  * @returns {Promise}
  */
  // getTouristAttr(params) {
  //   return new Promise((resolve) => {
  //     Api.getTouristAttrData(params).then((res) => {
  //       resolve(res)
  //     })
  //   })
  // },
  /**
  * 省内客流来源
  * @param params 用户的数据权限入参数
  * @returns {Promise}
  */
  getTouristSource(params) {
    return new Promise((resolve) => {
      Api.getTouristSourceData(params).then((res) => {
        resolve(res)
      })
    })
  }

}
