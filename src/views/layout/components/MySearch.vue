<template>
  <div class="search_main" style="background: #ffffff;">
    <el-form :inline="true">
      <el-form-item>
        <el-select  :disabled="cityDisabled" v-model="cityid" size="small" clearable placeholder="城市" @change="citySelectChange">
          <el-option  label="全省" value="0"></el-option>
          <el-option v-for="item in cityList" :key="item.cityId + 'c' + Math.random()" :label="item.cityName" :value="item.cityId">
          </el-option>
        </el-select>
        <!-- el-select-->
        <el-select :disabled="countyDisabled" v-model="countryid" size="small" clearable placeholder="区县" @change="clearArea">
          <el-option v-for="item in countryList" :key="item.countyId + 't' + Math.random()" :label="item.countyName" :value="item.countyId">
          </el-option>
        </el-select>
        <!-- el-select -->
        <!--END   位置：-->
        <el-select :disabled="scenicDisabled" v-model="areaId" size="small" placeholder="查找景区" clearable>
          <el-option v-for="item in areaAry" :key="item.cfgArea.areaId" :label="item.cfgArea.areaName" :value="item.cfgArea.areaId">
          </el-option>
        </el-select>
        <el-button @click="handlerRouter" size="small">查询</el-button>
      </el-form-item>
      <!--END  搜索景区-->
    </el-form>
  </div>
</template>

<script>
import CityInfoBll from '../../../service/CityInfoBll'
import { oAuthPermissions } from '@/utils/auth'

export default {
  name: 'mysearch',
  data() {
    return {
      // 菜单显示
      diStage: 0,
      province: [{ label: '江苏省', value: 1 }],
      // ID
      loadScenicId: 1, // 根据ID 搜索对应的景区
      provid: 1, // 省ID
      cityid: '',
      countryid: '',
      areaId: '',
      // 存储
      cityList: [],
      countryList: [],
      scenicList: [],
      areaAry: [],
      timeout: null,
      // 用户权限
      userInfo: '',
      permissions: '',
      cityDisabled: false,
      countyDisabled: true,
      scenicDisabled: false
    }
  },
  created() {
    this.getCityListData()
    this.userInfo = this.$store.getters.userInfo
    this.permissions = oAuthPermissions(this.userInfo.role)
    this.provid = this.permissions.provinceId
    this.cityid = this.permissions.cityId
    this.countryid = this.permissions.countyId
    this.areaId = this.permissions.areaId
    if (this.permissions.permissions === 'SCENIC') {
      this.cityDisabled = true
      this.scenicDisabled = true
    } else if (this.permissions.permissions === 'CITY') {
      this.cityDisabled = true
      this.scenicDisabled = false
    } else {
      this.scenicDisabled = true
    }
    this.loadAll()
  },
  methods: {
    // 对应地阶ID
    userRights() {
      const params = {}
      // {
      //   permissions: '', // 数据权限
      //   cityId: '', // 城市ID
      //   countyId: '', // 区县ID
      //   provinceId: '', // 省份ID
      //   areaId: [], // 区域IDS
      //   sysId: ''
      // }
      // 景区
      if (this.areaId !== undefined && this.areaId !== '') {
        params.permissions = 'SCENIC'
        params.areaId = this.areaId
        params.cityId = this.cityid
        params.sysId = this.areaId
        this.loadScenicId = params.sysId
        // 区县
      } else if (this.countryid !== undefined && this.countryid !== '') {
        params.permissions = 'COUNTY'
        params.countyId = this.countryid
        params.sysId = this.countryid
        this.loadScenicId = params.sysId
        // 城市
      } else if (this.cityid !== undefined && this.cityid !== '' && this.cityid !== '0') {
        params.permissions = 'CITY'
        params.cityId = this.cityid
        params.sysId = CityInfoBll.getSysIdByCityId(this.cityid)
        this.loadScenicId = params.sysId
      } else {
        // 全省
        params.permissions = 'PROVINCE'
        params.provinceId = 1
      }
      return params
    },
    // 获取对应的ID景区
    loadAll() {
      CityInfoBll.getScenicListById({ permissions: 'PROVINCE' }).then((res) => {
        this.scenicList = res.data
        if (this.permissions.permissions === 'CITY') {
          var cityId = this.permissions.cityId
          var sysId = CityInfoBll.getSysIdByCityId(cityId)
          // 景区数据
          this.areaAry = CityInfoBll.findScenicListBySysId(this.scenicList, sysId)
        } else {
          this.areaAry = this.scenicList
        }
      })
    },
    // 获取城市列表
    getCityListData() {
      this.cityList = CityInfoBll.getCityList(this.provid)
    },
    // 城市选择事件触发
    citySelectChange() {
      // 初始化
      // 获取县城、区域列表
      this.areaId = ''
      if (this.cityid !== '0') {
        this.countryList = CityInfoBll.getCountyList(this.cityid)
        this.loadScenicId = CityInfoBll.getSysIdByCityId(this.cityid)
        // 景区数据
        this.areaAry = CityInfoBll.findScenicListBySysId(this.scenicList, this.loadScenicId)
        this.scenicDisabled = false
      } else {
        this.scenicDisabled = true
      }
    },
    // 清除景区数据
    clearArea() {
      this.loadScenicId = this.countryid
    },
    // 处理路由
    handlerRouter() {
      var params = this.userRights()
      // 获取路由 参数
      this.$store.commit('SET_SEARCH_INFO', params)
      var routePath = this.$route.path
      if (routePath === '/homePage' && params.permissions === 'SCENIC') {
        const routePatams = '/?Pyedhid=' + Math.random() * 80000
        this.$router.push({ path: routePatams, query: { changeIndex: 'true' }})
      } else if (routePath === '/' && params.permissions === 'CITY') {
        const routePatams = '/homePage?Pyedhid=' + Math.random() * 80000
        this.$router.push({ path: routePatams, query: { changeIndex: 'true' }})
      } else {
        const routePatams = this.$route.path.substring(1) + '?Pyedhid=' + Math.random() * 80000
        this.$router.push({ path: routePatams, query: params })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.search_main {
  padding: 10px 0;
  border-bottom: 1px solid #d8dce5;
  .hiddenSel {
    display: none;
  }
  .el-form-item {
    margin-left: 15px;
    .el-menu-item {
      height: 36px !important;
      line-height: 36px !important;
      &.is-active {
        border-bottom: #34bfa3 2px solid !important;
      }
    }
    .el-submenu {
      & > .el-menu {
        top: 40px !important;
      }
      &.is-active {
        border-bottom: #34bfa3 2px solid !important;
      }
    }
    .subText {
      &:hover {
        color: #fff !important;
      }
      &.is-active {
        color: #fff !important;
      }
    }
  }
}
</style>

<style lang="css">
.el-form-item {
  margin-bottom: 0 !important;
}
.el-menu--horizontal .el-submenu .el-submenu__title {
  height: 36px !important;
  line-height: 36px !important;
}
.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  border-bottom: none;
}
</style>

