<script setup>
import { reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'
import config from '@/common/sys-config'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const loginForm = reactive({
  act: '',
  pwd: ''
})
const loginLoading = ref(false)
const loginFormRef = ref(null)
let redirect = ref('')
const validateTel = (rule, value, callback) => {
  if (!/^1[3-9]\d{9}$/.test(value)) {
    callback(new Error('请输入正确的账号或者手机号'))
  } else {
    callback()
  }
}
const validatePwd = (rule, value, callback) => {
  if (value.length < 4 || value.length > 16) {
    callback(new Error('密码的长度在4~16之间'))
  } else {
    callback()
  }
}
const loginRules = {
  act: [
    {
      require: true,
      message: '账号不能为空',
      trigger: 'blur',
      // validator: validateTel
    }
  ],
  pwd: [
    { require: true, message: '密码不能为空', trigger: 'blur' },
    {
      min: 4,
      max: 16,
      message: '密码长度为4-16个字符',
      trigger: 'blur',
      validator: validatePwd
    }
  ]
}

watch(
  route,
  () => {
    redirect = route.query && route.query.redirect
  },
  { immediate: true }
)

const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      loginLoading.value = true
      userStore
        .Login(loginForm)
        .then(() => {
          router.push({ path: redirect || '/' })
          loginLoading.value = false
        })
        .catch(() => {
          loginLoading.value = false
        })
    } else {
      return false
    }
  })
}
</script>

<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img :src="config.avatar" alt="" />
      </div>

      <el-form
        :rules="loginRules"
        ref="loginFormRef"
        label-width="0px"
        class="login_form"
        :model="loginForm"
      >
        <el-form-item prop="act">
          <el-input
            placeholder="请输入账号或者手机号"
            v-model="loginForm.act"
            :prefix-icon="'el-icon-user'"
          ></el-input>
        </el-form-item>

        <el-form-item prop="pwd">
          <el-input
            placeholder="请输入登录密码"
            type="password"
            v-model="loginForm.pwd"
            :prefix-icon="'el-icon-lock'"
            show-password
            @keyup.enter.native="handleLogin"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click.native.prevent="handleLogin"
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
