/**
 * Created by zhutt
 * Created on 2017/11/29
 */
import Api from '../api/passengerContrastAnalysis'

export default {

  /**
   * 客流对比分析
   * @returns {Promise}
   */
  queryContrastAnalysis(param, festival) {
    return new Promise((resolve) => {
      Api.queryContrastAnalysis(param, festival).then((res) => {
        resolve(res)
      })
    })
  },
  /**
   * 客流对比分析
   * @returns {Promise}
   */
  queryContrastAnalysisNew(param, festival) {
    return new Promise((resolve) => {
      Api.queryContrastAnalysisNew(param, festival).then((res) => {
        var dataArr = []
        if (res.status === 200) {
          // const data = {
          //   xAxis: [],
          //   f_duration: [],
          //   f_duration_inpro: [],
          //   f_duration_outpro: [],
          //   f_duration_local: [],
          //   tableData: []
          // }
          // 景区权限数据格式化
          if (param.permissions === 'SCENIC') {
            for (var s = 0; s < res.data.length; s++) {
              var sitem = res.data[s]
              dataArr.push(sitem)
            }
            // 省份&城市权限数据格式化
          } else {
            for (var p = 0; p < res.data.length; p++) {
              var pitem = res.data[p]
              dataArr.push(pitem)
            }
          }
          resolve(dataArr)
        }
      })
    })
  }
}
