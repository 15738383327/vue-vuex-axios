/**
 * Created by tangyanan
 * Created on 2018/01/23
 */
import Api from '../api/senicList'
import CityData from '../../static/json/cityInfo.json'
import StaticConfig from '../../static/json/config.json'
import CountyData from '../../static/json/county.json'

export default {
  /**
   * 获取江苏省城市列表
   * @param
   * @returns
   */
  getCityList(pid) {
    const cityIds = []
    const provinceId = StaticConfig.provinceId
    for (let i = 0; i < CityData.length; i++) {
      if (CityData[i].provinceId === provinceId) {
        cityIds.push(CityData[i])
      }
    }
    return cityIds
  },
  /**
   * 根据城市ID获取城市名称
   * @param
   * @returns
   */
  getCityNameById(cityId) {
    // 城市名称
    var cityName = ''
    if (cityId > 0) {
      for (var i = 0; i < CityData.length; i++) {
        if (CityData[i].cityId === cityId) {
          cityName = CityData[i].cityName
        }
      }
    }
    return cityName
  },
  /**
   * 根据城市ID获取区县列表
   * @param
   * @returns
   */
  getCountyList(cityId) {
    const county = []
    for (let i = 0; i < CountyData.length; i++) {
      if (CountyData[i].cityId === cityId) {
        county.push(CountyData[i])
      }
    }
    return county
  },
  /**
   * 根据id返回查找到的景区列表-- 搜索景区
   * @param
   * @returns
   */
  getScenicListById(params) {
    return new Promise((resolve) => {
      Api.getScenicListDataById(params).then((res) => {
        resolve(res)
      })
    })
  },
  /**
   * 根据系统ID，获取景区列表
   * @param
   * @returns
   */
  findScenicListBySysId(table, sysId) {
    const scenicList = []
    for (let i = 0; i < table.length; i++) {
      if (table[i].sysId === sysId) {
        scenicList.push(table[i])
      }
    }
    return scenicList
  },
  /**
   * 根据城市ID获取区县列表
   * @param
   * @returns
   */
  getSysIdByCityId(cityId) {
    var sysId = ''
    for (let i = 0; i < CityData.length; i++) {
      if (CityData[i].cityId === cityId) {
        sysId = CityData[i].sysId
        break
      }
    }
    return sysId
  },
  /**
   * 根据sysId获取cityId
   * @param
   * @returns
   */
  getCityIdBySysId(sysId) {
    return CityData.find(item => item.sysId === sysId).cityId
  }
}
