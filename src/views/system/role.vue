<template>
  <div id='main'>
    <div class="content">
      <!-- 查询 搜索 -->
      <div class="choose">
        <div class="form_search_pane">
          <el-form :inline="true" :model="search" class="demo-form-inline" @submit.native.prevent="submitSearchForm">
            <el-form-item label="角色名称">
              <el-input v-model="search.name" @keyup.enter.native="submitSearchForm" placeholder="请输入角色名称"
                        clearable></el-input>
            </el-form-item>
            <el-form-item label="创建者">
              <el-input v-model="search.createUser" @keyup.enter.native="submitSearchForm" placeholder="请输入创建者"
                        clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitSearchForm">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="showDialogFormPanel">新增</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 创建专题报告 dialog -->
      <el-dialog :visible.sync="dialogFormVisible" title="创建角色">
        <el-form ref="dialogForm" :model="dialogForm" :rules="roleRules" label-width="120px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="dialogForm.name" style="width: 35rem"></el-input>
          </el-form-item>
          <el-form-item label="所属行业:" prop="industryName">
            <el-select v-model="dialogForm.industry" placeholder="请选择所属行业">
              <el-option v-for="item in industryList" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="系统配置" prop="customerConfigurationId">
            <el-select v-model="dialogForm.customerConfigurationId" clearable placeholder="请选择系统配置">
              <el-option v-for="item in CustomerConfigurationList" :key="item.id" :label="item.systemTitle"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="默认首页" prop="homePageId">
            <el-select v-model="dialogForm.homePageId" clearable placeholder="请选择默认首页">
              <el-option v-for="item in defaultHomePageCandidate" :key="item.id" :label="item.label" :value="item.url"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择角色类型：" required>
            <el-select v-model="dialogForm.type" placeholder="请选择角色类型">
              <el-option v-for="item in roleTypeList" :key="item.type" :label="item.name"
                         :value="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属省市">
            <el-select v-model="dialogForm.provinceId" placeholder="请选择省份" @change="getCityIdList" clearable>
              <el-option label="江苏省" value="1"></el-option>
            </el-select>
            <el-select v-model="dialogForm.cityId" placeholder="请选择城市" @change="cityOptionChange" clearable>
              <el-option v-for="item in cityList" :label="item.cityName" :value="item.cityId"
                         :key="item.cityId"></el-option>
            </el-select>
            <el-select v-model="dialogForm.areaIds" v-show="showAreaList" class="elmoreselect" placeholder="查找景区" clearable>
              <el-option
                v-for="item in areaAry"
                :key="item.cfgArea.areaId"
                :label="item.cfgArea.areaName"
                :value="item.cfgArea.areaId">
              </el-option>
            </el-select>
            <el-tooltip class="item" effect="light" placement="right">
              <div slot="content" style="color: #a13e0d">不配置城市将赋予该角色省级管理员权限</div>
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="栏目权限">
            <el-tree
              :data="treeData"
              show-checkbox
              node-key="id"
              ref="tree"
              :default-checked-keys="defaultCheckedValue"
              accordion>
            </el-tree>
          </el-form-item>
          <el-form-item label="角色状态" prop="status" required>
            <el-switch v-model="dialogForm.status" style="width: 35rem" active-text="可用" inactive-text="不可用"
                       :active-value="1" :inactive-value="0"></el-switch>
          </el-form-item>
          <el-form-item label="数据权限">
            <el-checkbox-group v-model="type">
              <el-checkbox :label="item.id" v-for="(item,i) in permissionDataType" :key="i">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisibleSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 表格 -->
      <i-table :tableData="tableData" :columns="columns" :pagination="pagination"
              @handleTableChange="handleTableChange" :operateColumn="operateColumn" :otherHeight="otherHeight">
      </i-table>
    </div>
    <div style="clear:both"></div>
  </div>

</template>
<script>
  import ITable from '../../components/iTable.vue'
  import RoleBll from '../../service/RoleBll'
  import MenuBll from '../../service/MenuBll'
  import LocationAreaBll from '../../service/locationAreaBll'
  import CityInfoBll from '../../service/CityInfoBll'
  import CustomerConfigBll from '../../api/CustomerConfiguration'

  const roleTypeList = [{ type: 999, name: '普通用户' }, { type: 1, name: '地市客户经理' }, { type: 2, name: '地市管理员' },
    { type: 3, name: '号百商务经理' }, { type: 4, name: '产品经理' }, { type: 5, name: '系统管理员' }]
  export default {
    components: {
      ITable
    },
    data() {
      return {
        roleTypeList, // 角色类型
        industryList: [], // 行业类型
        search: {
          name: '',
          createUser: ''
        },
        defaultCheckedValue: [],
        type: [1, 2],
        permissionDataType: '',
        treeData: [],
        menuList: null,
        dialogFormVisible: false, // 弹出Form表单窗
        // Form表单数据绑定
        dialogForm: {
          id: '',
          name: '',
          status: 1,
          permissionMenu: '',
          permissionData: '',
          provinceId: '',
          cityId: '',
          type: '',
          areaIds: '',
          industry: '',
          homePageId: undefined,
          customerConfigurationId: null
        },
        otherHeight: 0,
        roleRules: {
          name: { required: true, message: '角色名称不能为空', trigger: 'blur' }
        },
        locationDateArea: [],
        showLocationDateArea: false,
        cityList: [],
        showAreaList: false,
        areaAry: [],
        scenicList: [],
        columns: [
          {
            prop: 'id',
            label: 'ID',
            width: '45'
          },
          {
            prop: 'name',
            label: '角色名称',
            width: '150'
          },
          {
            prop: 'type',
            label: '角色类型',
            width: '120',
            format: row => `<span style="color:#e6a23c">${this.findRoleType(row.type).name}</span>`
          },
          {
            prop: 'permissionMenu',
            label: '菜单权限',
            width: '400',
            render: (row) => {
              return <span > {this.filterMenuList(row.permissionMenu.split(',')).map(item => item.label).join(',')}</span>
            }
          },
          {
            prop: 'permissionData',
            label: '数据权限',
            width: '220',
            render: (row) => {
              return <span> {row.permissionData ? this.permissionDataType.filter(item => row.permissionData.split(',').indexOf(item.id) !== -1).map(item => item.name).join(',') : ''}</span>
            }
          },
          {
            prop: 'homePageId',
            label: '指定首页URL'
          },
          {
            prop: 'createUser',
            label: '创建者'
          },
          {
            prop: 'customerConfigurationId',
            label: '系统配置ID',
            width: 100
          },
          {
            prop: 'createTime',
            label: '创建时间'
          }
        ], // 数据列
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
                this.editRoleInfo(row)
              }
            },
            {
              type: 'danger',
              name: '删除',
              method: row => {
                this.deleteRole(row)
              }
            }
          ]
        },
        CustomerConfigurationList: []
      }
    },
    computed: {
      userInfo() {
        return this.$store.getters.userInfo
      },
      defaultHomePageCandidate() {
        return this.menuList && this.menuList.filter(item => item.level === 1)
      }
    },
    mounted() {
      this.permissionDataType = RoleBll.permissionConfigData()
      MenuBll.queryAllMenu().then(res => {
        this.menuList = res.data
        this.handleTableChange()
      })
      this.getCityIdList()
      this.industryList = RoleBll.queryIndustryList()
      this.getCustomerConfigurationList()
      this.loadAll()
    },
    methods: {
      // 获取系统配置
      getCustomerConfigurationList() {
        CustomerConfigBll.queryByPaginationOrCriteria().then(res => {
          this.CustomerConfigurationList = res.data
        })
      },
      handleTableChange(pagination) {
        this.pagination = { ...this.pagination, ...pagination }
        RoleBll.handleTableChange(this.pagination).then(({ data }) => {
          this.tableData = data.rows
          this.pagination.total = data.recordCnt
        })
      },
      // SelectChange事件
      cityOptionChange() {
        if (this.dialogForm.cityId) {
          // 初始化
          var sysId = CityInfoBll.getSysIdByCityId(this.dialogForm.cityId)
          this.showAreaList = true
          // 景区数据
          this.areaAry = []
          this.areaAry = CityInfoBll.findScenicListBySysId(this.scenicList, sysId)
        } else {
          this.showAreaList = false
        }
      },
      // 获取对应的ID景区
      loadAll() {
        CityInfoBll.getScenicListById({ permissions: 'PROVINCE' }).then((res) => {
          this.scenicList = res.data
          this.areaAry = this.scenicList
        })
      },
      // 获取城市ID
      getCityIdList() {
        this.cityList = CityInfoBll.getCityList()
      },
      // 获取角色类型
      findRoleType(type) {
        return this.roleTypeList.find(item => item.type === type)
      },
      // 获取行业名称
      fildIndustryName(item) {
        var industryChinaName = ''
        // 获取行业名称
        for (var p = 0; p < this.industryList.length; p++) {
          if (item.industry != null && item.industry.toString() === this.industryList[p].value) {
            industryChinaName = this.industryList[p].label
          }
        }
        return industryChinaName
      },
      // 获取位置系统区域信息
      getLocationDateArea(cityId) {
        var params = {
          cityId: cityId,
          userId: this.userInfo.userId
        }
        LocationAreaBll.handleTableChange(params).then(res => {
          this.locationDateArea = res.data
        })
      },
      // 编辑
      editRoleInfo(param) {
        this.initDialogFormValueByEdit(param)
        this.dialogFormVisible = true
      },
      // 删除
      deleteRole(row) {
        RoleBll.deleteRoleList({ id: row.id }).then(res => {
          this.handleTableChange()
        })
      },
      filterMenuList(idArr) {
        return this.menuList.filter(item => idArr.indexOf(String(item.id)) !== -1)
      },
      // 搜索列表查询事件
      submitSearchForm() {
        this.handleTableChange({ ...this.search })
      },
      // 点击创建角色模版
      showDialogFormPanel() {
        this.initDialogFormValue()
        this.dialogFormVisible = true
        MenuBll.queryMenuTree().then(res => {
          this.treeData = res.data
          this.attachUrlToMenuLabel(this.treeData)
        }).catch(() => {})
      },
      // dialogForm表单提交
      dialogFormVisibleSubmit() {
        this.$refs['dialogForm'].validate(valid => {
          if (this.dialogForm.type === 1 || this.dialogForm.type === 2) {
            if (this.dialogForm.cityId === '' && this.dialogForm.cityId === '') {
              valid = false
              this.$notify({
                title: '提示', message: '地市管理员/地市客户经理的归属城市不能为null', type: 'error'
              })
            }
          }
          if (valid) {
            this.dialogForm.permissionMenu = this.$refs['tree'].getCheckedKeys().join(',')
            this.dialogForm.permissionData = this.type.join(',')
            RoleBll.createRoleInfo(this.dialogForm).then(res => {
              this.handleTableChange()
            })
            // 关闭弹出框
            this.dialogFormVisible = false
          } else {
            return false
          }
        })
      },
      // 初始化DialogForm
      initDialogFormValue() {
        this.$refs['dialogForm'] && this.$refs['dialogForm'].clearValidate()
        this.defaultCheckedValue = [1]
        this.dialogForm.id = null
        this.dialogForm.name = ''
        this.dialogForm.status = 1
        this.dialogForm.homePageId = undefined
        this.dialogForm.customerConfigurationId = undefined
        this.dialogForm.permissionData = ''
        this.dialogForm.provinceId = '1'
        this.dialogForm.cityId = ''
        this.dialogForm.areaIds = ''
        this.dialogForm.type = 999
        this.dialogForm.industry = '200'
        // this.getCityIdList()
      },
      // 编辑专题的时候进行初始化DialogForm
      initDialogFormValueByEdit(row) {
        // this.getCityIdList()
        this.$refs['dialogForm'] && this.$refs['dialogForm'].clearValidate()
        this.dialogForm.id = row.id
        this.dialogForm.name = row.name
        this.dialogForm.status = row.status
        this.dialogForm.homePageId = row.homePageId
        this.dialogForm.customerConfigurationId = row.customerConfigurationId
        this.dialogForm.provinceId = row.provinceId.toString() || '1'
        this.dialogForm.type = row.type // 角色类型
        this.dialogForm.industry = row.industry.toString() // 行业类型
        this.dialogForm.cityId = row.cityId
        this.dialogForm.areaIds = row.areaIds
        this.defaultCheckedValue = row.permissionMenu.split(',')
        this.type = row.permissionData ? row.permissionData.split(',') : []
        MenuBll.queryMenuTree().then(res => {
          this.treeData = res.data
          this.attachUrlToMenuLabel(this.treeData)
        })
      },
      attachUrlToMenuLabel(menus) {
        menus.forEach(item => {
          item.label = item.label + ' (' + item.url + ')'
          if (item.children && item.children.length) {
            this.attachUrlToMenuLabel(item.children)
          }
        })
      }
    }
  }
</script>
<style scoped>
  .content{
    padding: 0 15px;
  }
  .form_search_pane{
    padding: 10px 0 10px 15px;
  }
  .input_add{
    width: 20rem
  }

  .el-dialog__body .el-form .el-form-item{
    margin-bottom: 22px !important
  }
</style>
