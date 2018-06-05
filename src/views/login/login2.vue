<template>
    <div style="height:100%">
      <div class="login_bg">
        <el-row>
          <el-col :span="12" :offset="6">
            <div class="grid-content bg-purple" style="text-align: center">
              <div class="login_box">
                <p><img src="../tourists/tourists_img/logo.png"/></p>
                <h1 class="login_title">苏州旅游客情检测与分析系统</h1>
                <div class="login_form">
                  <div class="demo-input-suffix">
                    <div class="login_input">
                      <el-input
                        placeholder="用户名"
                        suffix-icon="el-icon-news"
                        v-model="u_name">
                      </el-input>
                    </div>
                    <div class="login_input">
                      <el-input
                        placeholder="密码"
                        suffix-icon="el-icon-goods"
                        v-model="u_pwd">
                      </el-input>
                    </div>
                    <div class="login_input">
                      <el-input placeholder="请输入内容" v-model="a_code">
                        <template slot="append">9857</template>
                      </el-input>
                    </div>
                  </div>
                  <el-button type="primary" style="width:100%;">登录</el-button>
                </div>
              </div>
          </div>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        u_name: '',
        u_pwd: '',
        a_code: ''
      }
    }
  }
</script>

<style scoped>
  html,body{
    width:100%;
    height:100%;
  }
  .login_bg{
    width:100%;
    height:100%;
    background:url('../tourists/tourists_img/bg.png') no-repeat;
    background-size:100% 100%;
  }
  .login_box{
    margin-top:5rem;
  }
  .login_title{
    color:#fff;
  }
  .login_form{
    width:70%;
    padding:1rem 2rem 3rem 2rem;
    margin:2rem auto;
    /*height:10rem;*/
    background:rgba(255,255,255,0.2)
  }
  .login_input{
    margin:1.5rem auto;
  }
</style>
