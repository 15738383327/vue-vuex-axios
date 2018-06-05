<template>
  <div id='main'>
    <div class="content">
      <!-- 查询 搜索 -->
      <div class="form_search_pane">
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="用户姓名">
            <el-input v-model="search.name" size="small" placeholder="请输入名字" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" size="small" @click="showDialogFormPanel">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 创建 dialog -->
      <el-dialog :visible.sync="dialogFormVisible" title="填写用户信息">
        <el-form ref="dialogForm" :model="dialogForm" :rules="registerRules" label-width="120px">
          <el-form-item label="用户姓名" prop="name">
            <el-input v-model="dialogForm.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="telephone">
            <el-input v-model="dialogForm.telephone" placeholder="请输入手机号/固定电话"></el-input>
          </el-form-item>
          <el-form-item label="选择城市" prop="cityId">
            <el-select v-model="cityId" size="small" clearable placeholder="选择城市" @change="citySelectChange">
              <el-option v-for="item in cityList" :key="item.cityId" :label="item.cityName" :value="item.cityId">
              </el-option>
            </el-select>
            <el-select v-model="dialogForm.areaId" v-show="showAreaList" size="small" placeholder="查找景区" clearable>
              <el-option v-for="item in areaAry" :key="item.cfgArea.areaId" :label="item.cfgArea.areaName" :value="item.cfgArea.areaId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户角色" prop="roleIds" label-width="120px">
            <el-select v-model="dialogForm.roleIds" filterable placeholder="请选择角色">
              <el-option v-for="role in roleList" :key="role.id" :label="role.name" :value="String(role.id)">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户账号" prop="account">
            <el-input v-model="dialogForm.account" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input type="password" v-model="dialogForm.password" placeholder="密码必须由大小写英文字母及数字构成"></el-input>
          </el-form-item>
          <el-form-item label="邮箱地址" prop="email">
            <el-input v-model="dialogForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 表格 -->
      <i-table :tableData="tableData" :columns="columns" :pagination="pagination" @handleTableChange="handleTableChange" :operateColumn="operateColumn" :otherHeight="otherHeight">
      </i-table>
    </div>
  </div>

</template>
<script>
import CityInfoBll from '../../service/CityInfoBll'
import UserBll from '../../service/UserBll'
import RoleBll from '../../service/RoleBll'
import ITable from '../../components/iTable.vue'
import { RSA } from '@/utils/rsa'

export default {
  components: {
    ITable
  },
  data() {
    return {
      search: {
        name: ''
      },
      dialogFormVisible: true, // 弹出From表单窗
      dialogForm: {
        name: '',
        telephone: '',
        areaId: '',
        roleIds: '',
        account: '',
        password: '',
        email: '',
        id: null
      },
      cityId: null,
      otherHeight: 0,
      columns: [
        { prop: 'id', label: 'ID', width: '60', type: '' },
        { prop: 'name', label: '姓名', width: '', type: '' },
        { prop: 'telephone', label: '手机号', width: '', type: '' },
        { prop: 'areaId', label: '区域', width: '', type: '' },
        { prop: 'createUser', label: '创建人', width: '', type: '' },
        { prop: 'createTime', label: '创建时间', width: '', type: '' },
        {
          prop: 'roleIds',
          label: '角色',
          width: '',
          type: '',
          format: row => `<span>${this.findRole(row.roleIds).name}</span>`
        },
        {
          prop: 'status',
          label: '状态',
          width: '',
          type: '',
          format: row => `<span>${row.status ? '可用' : '禁用'}</span>`
        },
        { prop: 'account', label: '账户', width: '', type: '' }
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
              this.editUserInfo(row)
            }
          },
          {
            type: 'danger',
            name: '删除',
            method: row => {
              this.deleteUserList(row.id)
            }
          }
        ]
      },
      registerRules: {
        name: { required: true, message: '请输入姓名', trigger: 'blur' },
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { max: 40, message: '登录名过长', trigger: 'blur' }
        ],
        password: [
          {
            pattern: '^(?![a-zA-z]+$)(?!\\d+$)(?![!@#$%^&*]+$)[a-zA-Z\\d!@#$%^&*]+$',
            message: '密码必须为6-8位数字字母或特殊字符混合！',
            trigger: 'blur'
          }
        ],
        telephone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            pattern: '^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[0-9])|(18[0,5-9]))\\d{8}$',
            message: '手机号码格式不正确！',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: '^\\w+@\\w+.\\w+$', message: '邮箱格式不正确！', trigger: 'blur' }
        ]
      },
      roleList: null,
      showAreaList: false,
      cityList: [],
      areaAry: [],
      scenicList: []
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    }
  },
  mounted() {
    this.dialogFormVisible = false
    this.$store.commit('UPDATE_SEARCH_SHOW_STATE', false)
    this.getRoleList().then(() => {
      this.handleTableChange()
    })
    this.getCityListData()
    this.loadAll()
  },
  methods: {
    handleTableChange(pagination) {
      this.pagination = { ...this.pagination, ...pagination }
      UserBll.handleTableChange(this.pagination).then(({ data }) => {
        this.tableData = data.rows
        this.pagination.total = data.recordCnt
      })
    },
    // 获取城市列表
    getCityListData() {
      this.cityList = CityInfoBll.getCityList(this.provid)
    },
    // 获取对应的ID景区
    loadAll() {
      CityInfoBll.getScenicListById({ permissions: 'PROVINCE' }).then(res => {
        this.scenicList = res.data
        this.areaAry = this.scenicList
      })
    },
    // 城市选择事件触发
    citySelectChange() {
      // 初始化
      var sysId = CityInfoBll.getSysIdByCityId(this.cityId)
      this.showAreaList = true
      // 景区数据
      this.areaAry = []
      this.areaAry = CityInfoBll.findScenicListBySysId(this.scenicList, sysId)
    },
    // 编辑
    editUserInfo(row) {
      this.resetForm()
      this.initDialogFormValueByEdit(row)
      this.dialogFormVisible = true
    },
    // 删除
    deleteUserList(id) {
      this.$confirm('确定删除用户?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          UserBll.deleteUserList({ id: id }).then(res => {
            this.handleTableChange()
          })
        })
        .catch(() => {})
    },
    findRole(id) {
      if (!this.roleList) {
        return {}
      }
      return this.roleList.find(item => item.id === parseInt(id))
    },
    // 获取角色列表
    getRoleList() {
      if (this.roleList == null) {
        return RoleBll.queryRoleList().then(res => {
          this.roleList = res.data
          return res.data
        })
      }
    },
    // 搜索列表查询事件
    onSubmit() {
      this.handleTableChange(this.search)
    },
    resetForm() {
      if (this.$refs && this.$refs['dialogForm']) {
        this.$refs['dialogForm'].resetFields()
      }
      this.dialogForm.id = null
    },
    // 点击创建模版
    showDialogFormPanel() {
      this.resetForm()
      this.dialogFormVisible = true
    },
    // dialogForm表单提交
    dialogFormSubmit() {
      this.$refs['dialogForm'].validate(valid => {
        if (valid) {
          this.dialogForm.password = RSA.encrypt(this.dialogForm.password)
          UserBll.persistUserInfo(this.dialogForm).then(res => {
            // 添加成功后重新获取列表
            this.handleTableChange()
            // 关闭弹出框
            this.dialogFormVisible = false
          })
        } else {
          return false
        }
      })
    },
    // 编辑专题的时候进行初始化DialogForm
    initDialogFormValueByEdit(row) {
      for (var key in this.dialogForm) {
        if (key !== 'password') {
          this.dialogForm[key] = row[key]
        }
      }
    }
  }
}
</script>

<style scoped>
.content {
  padding: 0 15px;
}
.form_search_pane {
  padding: 10px 0 10px 15px;
}
.el-dialog__body .el-form .el-form-item {
  margin-bottom: 22px !important;
}
</style>

