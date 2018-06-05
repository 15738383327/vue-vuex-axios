/**
 * Created by tangyn
 * Created on 2018/2/28
 * 景区停留时长接口
 */
import Api from '../api/lengthStay'

export default {

  /**
   * 停留时长分析
   * @returns {Promise}
   */
  queryLengthStay(params) {
    return new Promise((resolve) => {
      Api.queryLengthStay(params).then((res) => {
        if (res.status === 200) {
          const lineChartData = {
            xAxis: [],
            f_duration: [],
            f_duration_inpro: [],
            f_duration_outpro: [],
            f_duration_local: [],
            tableData: []
          }
          // var unit = '小时'
          // 景区权限数据格式化
          if (params.permissions === 'SCENIC') {
            var dataAry = res.data.sort((a, b) => {
              return a.fDate.replace(/(^\s*)|(\s*$)/g, '') - b.fDate.replace(/(^\s*)|(\s*$)/g, '')
            })
            for (var s = 0; s < dataAry.length; s++) {
              var sitem = dataAry[s]
              if (s < 10) {
                lineChartData.xAxis.push(sitem.fDate.replace(/(^\s*)|(\s*$)/g, ''))
                lineChartData.f_duration.push(sitem.fDuration)
                lineChartData.f_duration_inpro.push(sitem.fDurationInpro)
                lineChartData.f_duration_outpro.push(sitem.fDurationOutpro)
                lineChartData.f_duration_local.push(sitem.fDurationLocal)
              }
              // 报表另取30个显示数据
              if (s < 30) {
                const ls = {
                  name: sitem.fDate,
                  staytime: sitem.fDuration,
                  staytimeinner: sitem.fDurationInpro,
                  staytimeouter: sitem.fDurationOutpro,
                  staytimelocal: sitem.fDurationLocal
                }
                lineChartData.tableData.push(ls)
              }
            }
            // 省份&城市权限数据格式化
          } else {
            for (var p = 0; p < res.data.length; p++) {
              var pitem = res.data[p]
              if (p < 10) {
                lineChartData.xAxis.push(pitem.area_name.replace(/(^\s*)|(\s*$)/g, ''))
                lineChartData.f_duration.push(pitem.f_duration)
                lineChartData.f_duration_inpro.push(pitem.f_duration_inpro)
                lineChartData.f_duration_outpro.push(pitem.f_duration_outpro)
              }
              // 报表另取30个显示数据
              if (p < 30) {
                const ls = {
                  name: pitem.area_name,
                  staytime: pitem.f_duration,
                  staytimeinner: pitem.f_duration_inpro,
                  staytimeouter: pitem.f_duration_outpro
                }
                lineChartData.tableData.push(ls)
              }
            }
          }
          resolve(lineChartData)
        }
      })
    })
  }
}
