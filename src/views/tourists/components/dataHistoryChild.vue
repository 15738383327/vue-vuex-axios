<template>
  <div style="width:100%;margin-top:1rem;padding-left:1rem;" id="queryData_con_top">
    <!--<label>选择查询</label>-->
    <!--<el-select v-model="value" placeholder="请选择">-->
      <!--<el-option-->
        <!--v-for="item in options"-->
        <!--:key="item.value"-->
        <!--:label="item.label"-->
        <!--:value="item.value">-->
      <!--</el-option>-->
    <!--</el-select>-->
    <div class="dateQuery">
      <div class="block">
        <el-date-picker
          v-model="dateValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyyMMdd">
        </el-date-picker>
      </div>
    </div>
    <el-button type="primary" round style="margin-left:0.5rem;" @click="querySearch">查询</el-button>
  </div>
</template>

<script>
export default {
  props: {

  },
  data() {
    return {
      value: '',
      dateValue: [],
      getPositionId: {}
    }
  },
  mounted() {

  },
  methods: {
    querySearch() {
      this.getPositionId['time'] = this.dateValue
      this.getPositionId['position'] = this.value
      this.$emit('key-word', this.getPositionId)
    }
  }
}
</script>
<style>
  .dateQuery {
    display: inline-block;
    background: #f3f4f8;
    padding: 0.3rem 1rem;
    margin-left: 1rem;
    border-radius: 30px;
  }
  .scenic_top {
    background: #fff;
    margin: 0.5rem 0;
    padding: 0.5rem;
  }

  .search_val {
    width: 15rem;
    border-radius: 15px;
    margin-left: 2rem;
  }

  .scenic_spot {
    display: inline-block;
  }

</style>
