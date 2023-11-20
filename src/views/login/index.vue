<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const loginForm = reactive({
  account: '18610848230',
  password: '123456'
})
const loginLoading = ref(false)
const loginRules = {
  account: [{ require: true, message: '账号不能为空', trigger: 'blur' }],
  password: [
    { require: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 14, message: '密码长度为6-14个字符', trigger: 'blur' }
  ]
}
const router = useRouter()
const handleLogin = () => {
  loginLoading.value = true
  setTimeout(() => {
    loginLoading.value = false
    ElMessage({
      message: '登陆成功.',
      type: 'success'
    })
  }, 2000)
  router.replace({path:'/home'})
}
</script>

<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="./ikun1.0.jpg" alt="" />
      </div>

      <el-form
        :rules="loginRules"
        ref="loginFormRef"
        label-width="0px"
        class="login_form"
        :model="loginForm"
      >
        <el-form-item prop="account">
          <el-input
            placeholder="请输入手机号"
            v-model="loginForm.account"
            :prefix-icon="'el-icon-user'"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            placeholder="请输入登录密码"
            type="password"
            v-model="loginForm.password"
            :prefix-icon="'el-icon-lock'"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="handleLogin"
            style="width: 100%"
            :loading="loginLoading"
          >
            登录
          </el-button>
        </el-form-item>

        <div class="tips">
          <el-text>密码和基础信息修改请在客户端进行!</el-text>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style lang="css" scoped>
.login_container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
}
.login_box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 300px;
  border-radius: 3px;
  background-color: #2c3e50;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}
.el-input /deep/ .el-input__inner {
  background-color: #283443;
  border: 1px solid transparent;
  color: white;
}
.login_box .avatar_box {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5px;
  width: 90px;
  height: 90px;
  border: 1px solid #eee;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  background-color: #fff;
}
.login_box .avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eeeeee;
}
.login_box .login_form {
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 40px;
}

.tips {
  float: left;
  margin-bottom: 15px;
  color: white;
}
</style>
