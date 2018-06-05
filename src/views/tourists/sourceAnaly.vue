<template>
  <div class="mainBody">
    <div class="containBody">
      <div class="containLeft">
        <div class="echartMain">
          <div class="sourceMap">
            <div class="dataTabsPanel">
              <!--<p>-->
                <!--<el-radio-group v-model="isOutsideProvince">-->
                  <!--<el-radio-button :label="true">省外</el-radio-button>-->
                  <!--<el-radio-button :label="false">省内</el-radio-button>-->
                <!--</el-radio-group>-->
              <!--</p>-->
              <div class="mapTabsPanes" style="width: 8rem;">
                <el-menu :default-active="activeIndex"  class="el-menu-demo" mode="horizontal" @select="handleSelect" >
                  <el-menu-item index="0" @click="isOutsideProvince = true" style="float: left;width: 4rem;">省外</el-menu-item>
                  <el-menu-item index="1" @click="isOutsideProvince = false" style="float: left;width: 4rem;">省内</el-menu-item>
                </el-menu>
              </div>
              <!-- <p>
                <el-radio-group v-model="timeDate">
                  <el-radio-button label="昨日"></el-radio-button>
                  <el-radio-button label="今日" disabled ></el-radio-button>
                </el-radio-group>
              </p> -->
            </div>
            <transition name="left-chart" mode="out-in">
              <tsa v-if="isOutsideProvince" touristName="省外客流来源分析" :touristData="touristData"></tsa>
              <js v-else touristName="省内客流来源分析" :data="jsMapData"></js>
            </transition>
          </div>
        </div>
      </div>
      <div class="containRight">
        <i-table :tableData="isOutsideProvince ? touristTableData : jsMapTableData" :columns="isOutsideProvince ? provinceColumns : cityColumns" :otherHeight="otherHeight" :showPagination="showPagination">
        </i-table>
      </div>
    </div>
  </div>
</template>
<script>
import tsa from './components/TouristSourceAna.vue'
import js from './components/jiangsuMap.vue'
import IndexBll from '../../service/IndexBll'
import { mapGetters } from 'vuex'
import ITable from '@/components/iTable'
import moment from 'moment'

export default {
  name: 'sourceAnaly',
  components: {
    tsa,
    js,
    ITable
  },
  data() {
    return {
      isOutsideProvince: true,
      // timeDate: '昨日',
      touristData: undefined,
      activeIndex: '0',
      jsMapData: undefined,
      touristTableData: undefined,
      jsMapTableData: undefined,
      cityColumns: [
        {
          prop: 'cityName',
          label: '城市'
        },
        {
          prop: 'fCount',
          label: '客流总量(人)'
        },
        {
          prop: 'per',
          label: '占比（%）'
        }
      ],
      provinceColumns: [
        {
          prop: 'provinceName',
          label: '省份'
        },
        {
          prop: 'fCount',
          label: '客流总量(人)'
        },
        {
          prop: 'per',
          label: '占比（%）'
        }
      ],
      otherHeight: 280,
      showPagination: false
      // userInfo: '',
      // userPermission: ''
    }
  },
  computed: {
    ...mapGetters(['authInfo', 'permissions'])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getTouristSourceData()
    })
  },
  beforeRouteUpdate() {
    // 每次点击搜索会push当前route，因此每次均会触发
    this.getTouristSourceData()
  },
  methods: {
    getTouristSourceData() {
      const yesterday = moment()
        .subtract(1, 'd')
        .format('YYYYMMDD')
      const params = {
        ...this.permissions,
        startDate: yesterday,
        endDate: yesterday
      }
      // 省外
      params.uri = 'flowProvDay'
      IndexBll.getTouristSource({ ...params }).then(res => {
        if (res.status === 200) {
          this.touristData = res.data.map(item => {
            return { name: item.provinceName, value: item.per }
          })
          this.touristTableData = res.data
        }
      })
      // 省内
      if (params.provinceId) {
        // 省级省内不存在，改为市级省内
        delete params.provinceId
        params.sysId = this.authInfo.sysId
      }
      params.uri = 'flowCityDay'
      IndexBll.getTouristSource(params).then(res => {
        if (res.status === 200) {
          this.jsMapData = res.data.map(item => {
            return { name: item.cityName, value: item.per }
          })
          this.jsMapTableData = res.data
        }
      })
    },
    handleSelect(key) {
      this.activeIndex = key
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/mainBody';

.echartMain {
  width: 100%;
  height: 100%;
  display: flex;
  .sourceMap {
    flex: 1;
    position: relative;
    .dataTabsPanel {
      position: absolute;
      z-index: 10;
      left: 5%;
      top: 5%;
    }
    .sourceEchart {
      width: 100%;
      height: 50%;
    }
  }
}
.mapTabsPanes {
  /* transform: translate3d(-50%, 0, 0); */
  margin: 15px auto;
  .el-menu-demo {
    background: #f3f4f8;
    border-radius: 35px !important;
  }
  .el-menu--horizontal {
    border: none;
    .el-menu-item {
      float: none;
      display: inline-block;
      background: #f3f4f8;
      border-radius: 20px;
      // padding:0 30px;
      height: 25px;
      line-height: 25px;
      font-size: 12px;
      &.is-active {
        border: none;
        background: #29c2bd;
        color: #fff;
      }
    }
  }
}

.left-chart-enter-active,
.left-chart-leave-active {
  transition: all 0.5s;
}

.left-chart-enter,
.left-chart-leave-to {
  opacity: 0;
}

.left-chart-enter {
  transform: translateX(31px);
}

.left-chart-leave-active {
  transform: translateX(-31px);
}

.el-radio-button--medium .el-radio-button__inner {
  padding: 8px 20px !important;
}
</style>
