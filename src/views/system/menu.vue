<template>
  <div id='main'>
    <div class="content">
      <!-- 查询 搜索 -->
      <div class="choose">
        <div class="form_search_pane">
          <el-form :inline="true" :model="search">
            <el-form-item label="栏目名称">
              <el-input v-model="search.label" size="small" placeholder="请输入栏目名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="创建者">
              <el-input v-model="search.createUser" size="small" placeholder="请输入创建者" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="searchEvent(search)">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" size="small" @click="onCreateMenu">新增</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 创建专题报告 dialog -->
      <el-dialog :visible.sync="dialogFormVisible"  width="48%" title="新增栏目：">
        <el-form ref="dialogForm" :model="dialogForm" :rules="menuRoles" label-width="150px">
          <el-form-item label="栏目名称" prop="label">
            <el-input size="small" class="input_add" v-model="dialogForm.label"></el-input>
          </el-form-item>
          <el-form-item label="栏目层级">
            <el-select size="small" class="input_add" v-model="dialogForm.level" placeholder="请选择栏目层级" @change="levelSelectChange">
              <el-option label="一级栏目" :value="1"></el-option>
              <el-option label="二级栏目" :value="2"></el-option>
            </el-select>
            <el-select size="small" class="input_add" v-if="parentMenuList.length > 0" v-model="dialogForm.parentId" placeholder="请选择父级栏目">
              <el-option v-for="item in parentMenuList" :label="item.label" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="栏目状态">
            <el-select size="small" class="input_add" v-model="dialogForm.status" placeholder="请选择栏目状态">
              <el-option label="有效" :value="1"></el-option>
              <el-option label="无效" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="栏目地址" prop="url">
            <el-input size="small" class="input_add" v-model="dialogForm.url" placeholder="如:/index"></el-input>
          </el-form-item>
          <el-form-item label="栏目图标" prop="icon">
            <el-select size="small" class="input_add" v-model="dialogForm.icon" placeholder="请选择栏目图标">
              <el-option label="404" value="404"><svg-icon icon-class="404"></svg-icon></el-option>
              <el-option label="barchart" value="barchart"><svg-icon icon-class="barchart"></svg-icon></el-option>
              <el-option label="bar_chart_1" value="bar_chart_1"><svg-icon icon-class="bar_chart_1"></svg-icon></el-option>
              <el-option label="bug" value="bug"><svg-icon icon-class="bug"></svg-icon></el-option>
              <el-option label="chart-arc" value="chart-arc"><svg-icon icon-class="chart-arc"></svg-icon></el-option>
              <el-option label="chart-area" value="chart-area"><svg-icon icon-class="chart-area"></svg-icon></el-option>
              <el-option label="chart-areaspline" value="chart-areaspline"><svg-icon icon-class="chart-areaspline"></svg-icon></el-option>
              <el-option label="chart-gantt" value="chart-gantt"><svg-icon icon-class="chart-gantt"></svg-icon></el-option>
              <el-option label="chart-pie" value="chart-pie"><svg-icon icon-class="chart-pie"></svg-icon></el-option>
              <el-option label="chart-scatterplot-hexbin" value="chart-scatterplot-hexbin"><svg-icon icon-class="chart-scatterplot-hexbin"></svg-icon></el-option>
              <el-option label="chart" value="chart"><svg-icon icon-class="chart"></svg-icon></el-option>
              <el-option label="chart1" value="chart1"><svg-icon icon-class="chart1"></svg-icon></el-option>
              <el-option label="chartbar" value="chartbar"><svg-icon icon-class="chartbar"></svg-icon></el-option>
              <el-option label="chartline" value="chartline"><svg-icon icon-class="chartline"></svg-icon></el-option>
              <el-option label="chartpie" value="chartpie"><svg-icon icon-class="chartpie"></svg-icon></el-option>
              <el-option label="chart_1" value="chart_1"><svg-icon icon-class="chart_1"></svg-icon></el-option>
              <el-option label="clipboard" value="clipboard"><svg-icon icon-class="clipboard"></svg-icon></el-option>
              <el-option label="component" value="component"><svg-icon icon-class="component"></svg-icon></el-option>
              <el-option label="dashboard" value="dashboard"><svg-icon icon-class="dashboard"></svg-icon></el-option>
              <el-option label="documentation" value="documentation"><svg-icon icon-class="documentation"></svg-icon></el-option>
              <el-option label="dotchart" value="dotchart"><svg-icon icon-class="dotchart"></svg-icon></el-option>
              <el-option label="down-chart" value="down-chart"><svg-icon icon-class="down-chart"></svg-icon></el-option>
              <el-option label="drag" value="drag"><svg-icon icon-class="drag"></svg-icon></el-option>
              <el-option label="email" value="email"><svg-icon icon-class="email"></svg-icon></el-option>
              <el-option label="example" value="example"><svg-icon icon-class="example"></svg-icon></el-option>
              <el-option label="excel" value="excel"><svg-icon icon-class="excel"></svg-icon></el-option>
              <el-option label="eye" value="eye"><svg-icon icon-class="eye"></svg-icon></el-option>
              <el-option label="form" value="form"><svg-icon icon-class="form"></svg-icon></el-option>
              <el-option label="icon" value="icon"><svg-icon icon-class="icon"></svg-icon></el-option>
              <el-option label="ic_bubble_chart" value="ic_bubble_chart"><svg-icon icon-class="ic_bubble_chart"></svg-icon></el-option>
              <el-option label="international" value="international"><svg-icon icon-class="international"></svg-icon></el-option>
              <el-option label="language" value="language"><svg-icon icon-class="language"></svg-icon></el-option>
              <el-option label="linechart" value="linechart"><svg-icon icon-class="linechart"></svg-icon></el-option>
              <el-option label="lock" value="lock"><svg-icon icon-class="lock"></svg-icon></el-option>
              <el-option label="message" value="message"><svg-icon icon-class="message"></svg-icon></el-option>
              <el-option label="money" value="money"><svg-icon icon-class="money"></svg-icon></el-option>
              <el-option label="password" value="password"><svg-icon icon-class="password"></svg-icon></el-option>
              <el-option label="people" value="people"><svg-icon icon-class="people"></svg-icon></el-option>
              <el-option label="peoples" value="peoples"><svg-icon icon-class="peoples"></svg-icon></el-option>
              <el-option label="polar-chart" value="polar-chart"><svg-icon icon-class="polar-chart"></svg-icon></el-option>
              <el-option label="qq" value="qq"><svg-icon icon-class="qq"></svg-icon></el-option>
              <el-option label="radar-chart" value="radar-chart"><svg-icon icon-class="radar-chart"></svg-icon></el-option>
              <el-option label="seo-marketing-business-analytics-chart-bar-line" value="seo-marketing-business-analytics-chart-bar-line"><svg-icon icon-class="seo-marketing-business-analytics-chart-bar-line"></svg-icon></el-option>
              <el-option label="seo-marketing-business-analytics-chart-bar-trend-upward" value="seo-marketing-business-analytics-chart-bar-trend-upward"><svg-icon icon-class="seo-marketing-business-analytics-chart-bar-trend-upward"></svg-icon></el-option>
              <el-option label="seo-marketing-business-analytics-chart-bar-upward" value="seo-marketing-business-analytics-chart-bar-upward"><svg-icon icon-class="seo-marketing-business-analytics-chart-bar-upward"></svg-icon></el-option>
              <el-option label="seo-marketing-business-analytics-chart-line" value="seo-marketing-business-analytics-chart-line"><svg-icon icon-class="seo-marketing-business-analytics-chart-line"></svg-icon></el-option>
              <el-option label="seo-marketing-business-analytics-chart-pie" value="seo-marketing-business-analytics-chart-pie"><svg-icon icon-class="seo-marketing-business-analytics-chart-pie"></svg-icon></el-option>
              <el-option label="seo-marketing-business-chart-bar-analytics-trend" value="seo-marketing-business-chart-bar-analytics-trend"><svg-icon icon-class="seo-marketing-business-chart-bar-analytics-trend"></svg-icon></el-option>
              <el-option label="shoppingCard" value="shoppingCard"><svg-icon icon-class="shoppingCard"></svg-icon></el-option>
              <el-option label="star" value="star"><svg-icon icon-class="star"></svg-icon></el-option>
              <el-option label="tab" value="tab"><svg-icon icon-class="tab"></svg-icon></el-option>
              <el-option label="table" value="table"><svg-icon icon-class="table"></svg-icon></el-option>
              <el-option label="theme" value="theme"><svg-icon icon-class="theme"></svg-icon></el-option>
              <el-option label="trend-chart-o" value="trend-chart-o"><svg-icon icon-class="trend-chart-o"></svg-icon></el-option>
              <el-option label="user" value="user"><svg-icon icon-class="user"></svg-icon></el-option>
              <el-option label="wechat" value="wechat"><svg-icon icon-class="wechat"></svg-icon></el-option>
              <el-option label="zip" value="zip"><svg-icon icon-class="zip"></svg-icon></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="显示顺序" prop="sortNo">
            <el-input size="small" class="input_add" v-model="dialogForm.sortNo" placeholder="如:1 (注:数字越大显示级别越低)"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="dialogFormVisibleSubmit(dialogForm)">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 表格 -->
      <i-table :tableData="tableData" :columns="columns" :pagination="pagination"
              @handleTableChange="handleTableChange" :operateColumn="operateColumn" :otherHeight="otherHeight">
      </i-table>
    </div>
  </div>

</template>
<script>
import MenuBll from '../../service/MenuBll'
import ITable from '../../components/iTable.vue'
import StaticConfig from '../../../static/json/config.json'
export default {
  components: {
    ITable
  },
  data() {
    return {
      dialogFormVisible: true, // 弹出From表单窗
      search: {
        label: ''
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // From表单数据绑定
      dialogForm: {
        id: '',
        label: '',
        level: 1,
        parentId: '',
        status: 1,
        icon: '',
        url: '',
        sortNo: ''
      },
      otherHeight: 0,
      menuRoles: {
        label: { required: true, message: '请输入栏目名称', trigger: 'blur' },
        sortNo: { required: true, message: '请输入显示顺序', trigger: 'blur' },
        url: { required: true, message: '请输入栏目url', trigger: 'blur' }
      },
      // 数据列
      columns: [
        {
          prop: 'id',
          label: 'ID',
          width: '60',
          type: ''
        },
        {
          prop: 'label',
          label: '栏目名称',
          width: '',
          type: ''
        },
        {
          prop: 'url',
          label: '栏目地址',
          width: '',
          type: ''
        },
        {
          prop: 'level',
          label: '层级',
          width: '',
          type: ''
        },
        {
          prop: 'sortNo',
          label: '显示顺序',
          width: '',
          type: ''
        },
        {
          prop: 'status',
          label: '状态',
          width: '',
          type: '',
          render: (row) => { return <span>{row.status ? '有效' : '无效'}</span> }
        }
      ],
      pagination: {
        current: 1,
        pageSize: 10,
        size: 10,
        total: 0,
        sidx: 9,
        sord: 'asc'
      },
      tableData: [],
      parentMenuList: [],
      operateColumn: {
        width: 150,
        fixed: 'right',
        list: [
          {
            type: 'warning',
            name: '编辑',
            method: row => {
              this.editMenuInfo(row)
            }
          },
          {
            type: 'danger',
            name: '删除',
            method: row => {
              this.delMenuInfo(row.id)
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.dialogFormVisible = false
    this.$store.commit('UPDATE_SEARCH_SHOW_STATE', false)
    this.handleTableChange()
  },
  methods: {
    handleTableChange(pagination) {
      // 这个是翻页的操作
      this.pagination = { ...this.pagination, ...pagination }
      this.pagination.productVersionType = StaticConfig.systemConfigId
      MenuBll.handleTableChange(this.pagination).then(res => {
        this.tableData = res.data.rows
        this.pagination.total = res.data.recordCnt
      })
    },
    // 创建
    onCreateMenu() {
      this.initDialogFormValue()
      this.dialogFormVisible = true
    },
    // 编辑
    editMenuInfo(param) {
      this.refillDialogForm(param)
      this.dialogFormVisible = true
    },
    // SelectChange事件
    levelSelectChange() {
      this.getParentMenuList(this.dialogForm.level)
    },
    // 根据level过滤栏目数据
    getParentMenuList(level, productVersionType) {
      level--
      if (level === 0) {
        this.parentMenuList = []
      } else {
        MenuBll.handleTableChange({ level: level, productVersionType: StaticConfig.systemConfigId }).then(res => {
          this.parentMenuList = res.data
        })
      }
    },
    // 删除
    delMenuInfo(id) {
      MenuBll.deletePageInfo({ id: id }).then(res => {
        this.handleTableChange()
      })
    },
    // 搜索列表查询事件
    searchEvent(param) {
      this.handleTableChange(param)
    },
    // dialogForm表单提交
    dialogFormVisibleSubmit(param) {
      param.productVersionType = StaticConfig.systemConfigId
      // 关闭弹出框
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          MenuBll.createMenu(param).then(res => {
            if (res.status === 200) {
              this.handleTableChange()
              this.$notify({
                title: '提示',
                message: '操作成功',
                type: 'success'
              })
            }
          })
          this.dialogFormVisible = false
        } else {
          return false
        }
      })
    },
    // 初始化DialogForm
    initDialogFormValue() {
      this.$refs.dialogForm.resetFields()
    },
    // 编辑专题的时候进行初始化DialogForm
    refillDialogForm(row) {
      this.initDialogFormValue()
      this.dialogForm.id = row.id
      this.dialogForm.label = row.label
      this.dialogForm.level = row.level
      this.dialogForm.status = row.status
      this.dialogForm.icon = row.icon
      this.dialogForm.url = row.url
      this.getParentMenuList(this.dialogForm.level)
      this.dialogForm.parentId = row.parentId
      this.dialogForm.sortNo = row.sortNo
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


