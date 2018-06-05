import Vue from 'vue'
import { RSA } from '../utils/rsa'

export function loginByUsername(param) {
  param.password = RSA.encrypt(param.password)
  return Vue.$api.xHttp.post('shopApi/login', param)
}

