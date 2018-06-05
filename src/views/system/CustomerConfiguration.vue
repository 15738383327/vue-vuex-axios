<template>
  <div id='main'>
    <div class="content">
      <!-- 搜索 -->
      <div class="form_search_pane">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="配置名称">
            <el-input v-model="searchForm.name" size="small" placeholder="请输入名称" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="executeSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" size="small" @click="showConfigFormPanel">新增</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 新增/编辑 表单 -->
      <el-dialog :visible.sync="configFormVisible" title="填写系统配置信息" width="40%">
        <el-form ref="configForm" :model="configForm" :rules="configRules" label-width="120px">
          <el-form-item label="配置名称" prop="name">
            <el-input v-model="configForm.name" placeholder="请输入配置名称"></el-input>
          </el-form-item>
          <el-form-item label="系统标题" prop="systemTitle">
            <el-input v-model="configForm.systemTitle" placeholder="请输入系统标题"></el-input>
          </el-form-item>
          <el-form-item label="系统主题" prop="systemTheme">
            <el-input v-model="configForm.systemTheme"  placeholder="请输入系统主题"></el-input>
          </el-form-item>
          <el-form-item label="LOGO与背景">
            <el-col :span="12">
              <el-form-item prop="systemIcon">
                <el-upload
                  class="config-img-upload"
                  :action="configImageUploadUrl"
                  :headers="{token: userInfo.token}"
                  list-type="picture-card"
                  :show-file-list="false"
                  :on-success="handleIconSuccess">
                  <img v-if="configForm.systemIcon" :src="configForm.systemIcon" >
                  <i v-else class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="systemBackgroundImage">
                <el-upload
                  class="config-img-upload"
                  :action="configImageUploadUrl"
                  :headers="{token: userInfo.token}"
                  list-type="picture-card"
                  :show-file-list="false"
                  :on-success="handleBgImgSuccess">
                  <img v-if="configForm.systemBackgroundImage" :src="configForm.systemBackgroundImage">
                  <i v-else class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="configFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitConfigForm">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 数据表格 -->
      <div>
        <i-table :tableData="tableData" :columns="columns" :pagination="pagination" @handleTableChange="handleTableChange" :operateColumn="operateColumn">
        </i-table>
      </div>
    </div>
  </div>
</template>

<script>
import ITable from '../../components/iTable.vue'
import CustomerConfigBll from '../../api/CustomerConfiguration'

export default {
  components: {
    ITable
  },
  data() {
    return {
      configFormVisible: true,
      configImageUploadUrl: null,
      searchForm: {
        systemTitle: ''
      },
      configForm: {
        id: null,
        name: '',
        systemTitle: '',
        systemTheme: '',
        systemIcon: '',
        systemBackgroundImage: ''
      },
      configRules: {
        name: { required: true, message: '请输入配置名称', trigger: 'blur' },
        systemTitle: { required: true, message: '请输入系统标题', trigger: 'blur' },
        systemTheme: { required: true, message: '请输入系统主题', trigger: 'blur' },
        systemIcon: { required: true, message: '请上传系统LOGO', trigger: 'blur' },
        systemBackgroundImage: { required: true, message: '请上传系统背景图片', trigger: 'blur' }
      },
      tableData: [],
      columns: [
        { prop: 'id', label: 'ID', width: '60', type: '' },
        { prop: 'name', label: '名称', width: '', type: '' },
        { prop: 'systemTitle', label: '系统标题', width: '', type: '' },
        { prop: 'systemTheme', label: '系统主题', width: '', type: '' },
        {
          prop: 'systemIcon',
          label: '系统LOGO',
          width: '300px',
          render: row => <img src={row.systemIcon} width='200px' height='100px' />
        },
        {
          prop: 'systemBackgroundImage',
          label: '系统背景图片',
          width: '300px',
          render: row => <img src={row.systemBackgroundImage} width='200px' height='100px' />
        }
      ], // 数据列
      operateColumn: {
        width: 150,
        fixed: 'right',
        list: [
          {
            type: 'warning',
            name: '编辑',
            method: row => {
              this.editConfig(row)
            }
          },
          {
            type: 'danger',
            name: '删除',
            method: row => {
              this.deleteConfig(row.id)
            }
          }
        ]
      },
      pagination: {
        current: 1,
        pageSize: 10,
        size: 10,
        total: 0,
        sidx: 1,
        sord: 'asc'
      }
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    }
  },
  mounted() {
    this.configFormVisible = false
    this.configImageUploadUrl = this.$store.state.contextPath + '/picResources/uploadImages'
    this.$store.commit('UPDATE_SEARCH_SHOW_STATE', false)
    this.handleTableChange()
  },
  methods: {
    // 分页查询/条件查询
    handleTableChange(pagination) {
      this.pagination = { ...this.pagination, ...pagination }
      CustomerConfigBll.queryByPaginationOrCriteria(this.pagination).then(({ data }) => {
        this.tableData = data.rows
        this.pagination.total = data.recordCnt
      })
    },
    resetForm() {
      if (this.$refs && this.$refs.configForm) {
        this.$refs.configForm.resetFields()
      }
    },
    showConfigFormPanel() {
      this.resetForm()
      this.configFormVisible = true
    },
    executeSearch() {
      this.handleTableChange({ ...this.searchForm })
    },
    editConfig(row) {
      this.showConfigFormPanel()
      // 数据回显
      for (var i in this.configForm) {
        this.configForm[i] = row[i]
      }
    },
    deleteConfig(id) {
      CustomerConfigBll.deleteCustomerConfig({ id }).then(res => {
        this.queryByPaginationOrCriteria()
      })
    },
    submitConfigForm() {
      this.$refs.configForm.validate(valid => {
        if (valid) {
          CustomerConfigBll.persistCustomerConfig(this.configForm).then(res => {
            if (res.status === 200) {
              this.handleTableChange()
            } else {
              this.$notify.error({
                title: '错误',
                message: res.msg || '持久化配置出错'
              })
            }
          })
          this.configFormVisible = false
        } else {
          return false
        }
      })
    },
    handleIconSuccess(res) {
      this.configForm.systemIcon = res.data
    },
    handleBgImgSuccess(res) {
      this.configForm.systemBackgroundImage = res.data
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
.config-img-upload .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-upload--picture-card,
.el-upload--picture-card > img {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>
