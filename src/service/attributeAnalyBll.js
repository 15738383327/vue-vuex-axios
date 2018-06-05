/**
 * Created by tangyanan
 * Created on 2018/03/02
 */
import Api from '../api/attributeAnaly'

var AgeRangeConfig = [{ key: 'cnt_00_22', value: '22岁及以下' }, { key: 'cnt_23_35', value: '23~35岁' }, {
  key: 'cnt_36_45',
  value: '36~45岁'
}, {
  key: 'cnt_46_55',
  value: '46~55岁'
}, { key: 'cnt_56_00', value: '56岁及以上' }]
var SexConfig = [{ key: 'man', value: '男' }, { key: 'woman', value: '女' }]
export default {
  /**
   * 获取客流属性分析
   * @param params 用户的数据权限入参数
   * @returns {Promise}
   */
  getCityTouristAttr(params) {
    return new Promise((resolve) => {
      Api.getCityTouristAttrData(params).then((res) => {
        if (res.status === 200) {
          // 定义返回实体对象
          var resultArr = []
          var ageArr = res.data.ageList
          var sexArr = res.data.sexList
          for (var i = 0; i < ageArr.length; i++) {
            // 定义返回实体属性
            var data = {
              time: '',
              tableDate: [],
              sexdate: []
            }
            if (params.permissions === 'SCENIC') {
              data.time = ageArr[i].fDate
            } else {
              data.time = ageArr[i].f_date
            }
            // 年龄属性
            for (var a = 0; a < AgeRangeConfig.length; a++) {
              var ageObj = { age: '', num: '', percent: '' }
              ageObj.age = AgeRangeConfig[a].value
              var num = ageArr[i][AgeRangeConfig[a].key]
              var cntAll = ageArr[i].cnt_all
              ageObj.num = num
              ageObj.percent = (num / cntAll).toFixed(4)
              data.tableDate.push(ageObj)
            }
            // 性别属性
            for (var g = 0; g < SexConfig.length; g++) {
              var sexObj = { sex: '', num: '', percent: '' }
              sexObj.sex = SexConfig[g].value
              var num_sex = sexArr[i][SexConfig[g].key]
              var cntAll_sex = sexArr[i].cnt_all
              sexObj.num = num_sex
              sexObj.percent = (num_sex / cntAll_sex).toFixed(4)
              data.sexdate.push(sexObj)
            }
            resultArr.push(data)
          }
          resolve(resultArr)
        }
      })
    })
  }
}
