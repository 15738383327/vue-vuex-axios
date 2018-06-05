<template>
  <div id='main'>
    <div class="content">
      <!-- 查询 搜索 -->
      <div class="form_search_pane">
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="厂商名称">
            <el-input v-model="search.spName" size="small" placeholder="请输入厂商名称" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="handleSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" size="small" @click="handleCreate">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 创建 dialog -->
      <el-dialog :visible.sync="vendorFormVisible" title="新增厂商信息">
        <el-form ref="vendorForm" :model="vendorForm" :rules="vendorRules" label-width="120px">
          <el-form-item label="厂商名称" prop="spName">
            <el-input v-model="vendorForm.spName" size="small" placeholder="请输入厂商名称"></el-input>
          </el-form-item>
          <el-form-item label="授权IP" prop="authIp">
            <el-input v-model="vendorForm.authIp" size="small" placeholder="请输入授权Ip"></el-input>
          </el-form-item>
          <el-form-item label="授权Key" prop="authKey">
            <el-input v-model="vendorForm.authKey" size="small" placeholder="请输入授权Key"></el-input>
          </el-form-item>
          <el-form-item label="授权类型" prop="authType">
            <el-select v-model="vendorForm.authType" size="small" placeholder="选择权限类型" @change="handleAuthTypeChange" clearable>
              <el-option v-for="item in authTypeSet" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市权限" prop="cityId">
            <el-select v-model="vendorForm.cityId" size="small" placeholder="选择城市权限" @change="handleCityChange" clearable>
              <el-option v-for="item in cityList" :key="item.cityId" :label="item.cityName" :value="item.cityId">
              </el-option>
            </el-select>
            <el-select v-model="vendorForm.areaIds" v-show="vendorForm.authType === 2" size="small" placeholder="选择景区权限" :multiple="true" clearable>
              <el-option v-for="item in selectableSceneList" :key="item.cfgArea.areaId" :label="item.cfgArea.areaName" :value="item.cfgArea.areaId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="vendorFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 表格 -->
      <i-table :tableData="tableData" :columns="columns" :pagination="pagination" @handleTableChange="handleTableChange" :operateColumn="operateColumn">
      </i-table>
    </div>
  </div>

</template>
<script>
import CityInfoBll from '../../service/CityInfoBll'
import AuthVendor from '../../api/AuthVendor'
import ITable from '../../components/iTable.vue'
import { mapGetters } from 'vuex'
import UUID from '../../utils/uuid'

export default {
  components: {
    ITable
  },
  data() {
    return {
      search: {
        spName: ''
      },
      showAreaList: false,
      cityList: [],
      sceneList: [],
      selectableSceneList: [],
      vendorFormVisible: false,
      vendorForm: {
        id: '',
        spId: '',
        spName: '',
        authKey: '',
        authIp: '',
        authType: 0,
        sysId: '',
        cityId: '',
        areaIds: [],
        reserve: '',
        remark: ''
      },
      authTypeSet: [{ label: '免授权限', value: 1 }, { label: '景区权限', value: 2 }, { label: '城市权限', value: 3 }],
      columns: [
        { prop: 'id', label: 'ID', width: '60' },
        { prop: 'spId', label: '厂商编号' },
        { prop: 'spName', label: '厂商名称' },
        { prop: 'authKey', label: '授权Key' },
        { prop: 'authIp', label: '授权IP' },
        {
          prop: 'authType',
          label: '授权类型',
          render: row => <span>{row.authType && this.authTypeSet.find(item => item.value === row.authType).label}</span>
        },
        { prop: 'sysId', label: '系统权限' },
        { prop: 'cityId', label: '城市权限' },
        { prop: 'areaIds', label: '景区权限' }
      ],
      pagination: {
        current: 1,
        pageSize: 10,
        size: 10,
        total: 0,
        sidx: 1,
        sord: 'asc'
      },
      tableData: [],
      operateColumn: {
        width: 150,
        fixed: 'right',
        list: [
          {
            type: 'warning',
            name: '编辑',
            method: row => {
              this.handleEdit(row)
            }
          },
          {
            type: 'danger',
            name: '删除',
            method: row => {
              this.handleDelete(row.id)
            }
          }
        ]
      },
      vendorRules: {
        spName: { required: true, message: '请输入厂商名称', trigger: 'blur' },
        authIp: [
          { required: true, message: '请输入IP', trigger: 'blur' },
          { max: 100, message: 'IP过长', trigger: 'blur' }
        ],
        authKey: { required: true, message: '请输入授权Key', trigger: 'blur' },
        authType: {
          required: true,
          message: '请选择授权类型',
          trigger: 'blur'
        },
        sysId: { required: true, message: '请选择系统权限', trigger: 'blur' },
        areaIds: { required: true, message: '请选择景区权限', trigger: 'blur' }
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'authInfo', 'permissions'])
  },
  mounted() {
    this.loadAllCities()
    this.loadAllScenes()
    this.handleTableChange()
  },
  methods: {
    // 获取城市列表
    loadAllCities() {
      this.cityList = CityInfoBll.getCityList(this.permissions.provinceId)
    },
    // 获取对应的ID景区
    loadAllScenes() {
      CityInfoBll.getScenicListById({ permissions: 'PROVINCE' }).then(res => {
        this.sceneList = res.data
      })
    },
    handleAuthTypeChange(val) {
      this.vendorForm.areaIds = []
    },
    // 城市选择事件触发
    handleCityChange() {
      this.vendorForm.areaIds = []
      this.selectableSceneList = CityInfoBll.findScenicListBySysId(
        this.sceneList,
        CityInfoBll.getSysIdByCityId(this.vendorForm.cityId)
      )
    },
    handleTableChange(pagination) {
      this.pagination = { ...this.pagination, ...pagination }
      AuthVendor.findByPagination(this.pagination).then(({ data }) => {
        this.tableData = data.rows
        this.pagination.total = data.recordCnt
      })
    },
    // 重置表单
    resetForm() {
      this.$refs.vendorForm && this.$refs.vendorForm.resetFields()
      for (var key in this.vendorForm) {
        this.vendorForm[key] = null
      }
      this.vendorForm.sysId = 1
      this.vendorForm.areaIds = []
    },
    // 新增
    handleCreate() {
      this.resetForm()
      this.vendorForm.spId = UUID.getUID(36, 16)
      this.vendorFormVisible = true
    },
    // 编辑
    handleEdit(row) {
      this.resetForm()
      for (var key in this.vendorForm) {
        this.vendorForm[key] = row[key]
      }
      // this.cityId = CityInfoBll.getCityIdBySysId(row.sysId)
      this.handleCityChange()
      this.vendorForm.areaIds = row.areaIds.split(',').map(item => parseInt(item))
      this.vendorFormVisible = true
    },
    // 删除
    handleDelete(id) {
      this.$confirm('确定删除?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        AuthVendor.delete(id).then(res => {
          this.handleTableChange()
        })
      })
    },
    // 搜索
    handleSearch() {
      this.handleTableChange(this.search)
    },
    // vendorForm表单提交
    handleSubmit() {
      this.$refs.vendorForm.validate(valid => {
        if (valid) {
          // this.vendorForm.sysId = CityInfoBll.getSysIdByCityId(this.cityId)
          this.vendorForm.areaIds = this.vendorForm.areaIds.join(',')
          AuthVendor.persist(this.vendorForm).then(res => {
            // 添加成功后重新获取列表
            this.handleTableChange()
            // 关闭弹出框
            this.vendorFormVisible = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.el-dialog__body .el-form .el-form-item {
  margin-bottom: 22px !important;
}
</style>

