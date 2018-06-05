// import codes from '../codes/apiResultCodes'
import { Notification } from 'element-ui'
import { removeToken } from '@/utils/auth'
import router from '../router'

export default {
  ErrorMsgNotification(code, msg) {
    switch (code) {
      case 401:
        // 权限过期
        removeToken()
        router.push({ path: '/login' })
        Notification.error({ title: '登录超时', message: (msg && msg.Message) || '您的权限已过期，请重新登录！' })
        break
      case 400:
        // 请求参数错误
        Notification.error({ title: '错误', message: (msg && msg.Message) || '提交的数据有错误！' })
        break
      case 500:
        // 系统错误
        Notification.error({ title: '错误', message: (msg && msg.Message) || '系统报错啦，请联系管理员！' })
        break
      default:
        // 其它
        Notification.error({ title: '错误', message: (msg && msg.Message) || '传输异常，请稍后再试！' })
    }
  }
}
