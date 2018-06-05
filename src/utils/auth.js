/**
 * Created by tangyanan
 * Created on 2018/01/17
 */
import Cookies from 'js-cookie'
import CityInfoBll from '../service/CityInfoBll'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function oAuthPermissions(role) {
  const param = {}
  // {
  //   permissions: '', // 数据权限
  //   cityId: '', // 城市ID
  //   countyId: '', // 区县ID
  //   provinceId: '', // 省份ID
  //   areaId: [], // 区域IDS
  //   sysId: ''
  // }
  if (role.areaIds) {
    param.permissions = 'SCENIC'
    param.cityId = role.cityId
    param.areaId = role.areaIds
  } else if (role.cityId) {
    param.permissions = 'CITY'
    param.cityId = role.cityId
    param.sysId = CityInfoBll.getSysIdByCityId(role.cityId)
  } else if (role.countyId) {
    param.permissions = 'COUNTY'
    param.countyId = role.countyId
    param.sysId = role.countyId
  } else {
    param.permissions = 'PROVINCE'
    param.provinceId = role.provinceId
    param.sysId = 1
  }
  return param
}
