/**
 * Created by tangyn
 * Created on 2018/3/2
 */
import Api from '../api/passenger'
import UtilsData from '../utils/date'
import moment from 'moment'

export default {
  /**
   * 客流分析--折线版本
   * @returns {Promise}
   */
  getFLDataAPI(params) {
    return new Promise(resolve => {
      Api.getFLDataAPIs(params).then(res => {
        const datas = {
          xAixsTime: [], // 时间
          totalCount: [], // 总量
          localCount: [], // 本地
          localCity: [], // 省内跨城市
          provOuter: [], // 省外
          tableData: [] // 表格数据
        }
        if (res.data && res.data.length > 0) {
          // 数据排序并遍历
          // 显示 8：00 - 20：00 客流分析数据
          const filteredData = res.data
            .filter(item => {
              const hours = moment(item.time, 'YYYY-MM-DD HH:mm:ss').hour()
              return hours >= 8 && hours <= 20
            })
            .sort((a, b) => {
              return (
                parseInt(a.time.replace(/^\d{4}-\d{2}-\d{2} (\d{2}):\d+:\d+$/, '$1')) -
                parseInt(b.time.replace(/^\d{4}-\d{2}-\d{2} (\d{2}):\d+:\d+$/, '$1'))
              )
            })
          // 景区权限数据格式化
          if (params.permissions === 'SCENIC') {
            filteredData.forEach(item => {
              const ls = {
                times: UtilsData.format(item.time, 'hh:mm'),
                counts: item.flow.total,
                snCity: item.flow.city_total,
                outerProvin: item.flow.province_total
              }
              datas.xAixsTime.push(ls.times)
              datas.totalCount.push(ls.counts)
              datas.localCity.push(ls.snCity)
              datas.provOuter.push(ls.outerProvin)
              datas.tableData.push(ls)
            })
          } else {
            filteredData.forEach(item => {
              const ls = {
                times: UtilsData.format(item.time, 'hh:mm'),
                counts: item.total, // 总量
                locals: item.in_city, // 本地
                snCity: item.out_city, // 省内跨地市
                outerProvin: item.out_province // 省外
              }
              datas.xAixsTime.push(ls.times)
              datas.totalCount.push(ls.counts)
              datas.localCity.push(ls.snCity)
              datas.provOuter.push(ls.outerProvin)
              datas.localCount.push(ls.locals)
              datas.tableData.push(ls)
            })
          }
        }
        resolve(datas)
      })
    })
  }
}
