import { defineStore } from 'pinia'
import userApi from '@/api/user'
import { getToken, setToken, removeToken, getUserInfo, removeUserInfo, setUserInfo, removeRoles, setRoles, getRoles } from '@/utils/auth'
import { useRouter } from 'vue-router'
import { Message } from 'element-ui'

const router = useRouter()

export const useUserStore = defineStore('user', () => {
  const getDefaultState = () => {
    return {
      token: getToken(),
      userInfo: getUserInfo(),
      roles: getRoles()
    }
  }

  const state = getDefaultState()

  const ResetState = () => {
    Object.assign(state, getDefaultState())
  }

  const SetToken = (token) => {
    state.token = token
    setToken(token)
  }

  const SetUserInfo = (userInfo) => {
    state.userInfo = userInfo
    setUserInfo(userInfo)
  }

  const SetRoles = (roles) => {
    state.roles = roles
    setRoles(roles)
  }

  const Logout = async () => {
    try {
      await userApi.logout()
      state.token = null
      state.userInfo = null
      state.roles = []
      removeUserInfo()
      removeToken()
      removeRoles()
      router.replace('/login')
    } catch (error) {
      console.error(error)
    }
  }

  const Login = async (userInfo) => {
    const { tel, pwd } = userInfo
    try {
      let userLoginDTO = {
        tel: tel.trim(),
        pwd: pwd
      }
      const data = await userApi.login(userLoginDTO)
      if (data !== null) {
        setToken(data.token)
        setUserInfo(data.user)
        setRoles(data.roles)
      } else {
        Message({
          message: '账号或密码错误',
          type: 'error',
          duration: 2500
        })
      }
    } catch (error) {
      Message({
        message: error,
        type: 'error',
      })
    }
  }

  const UpdateUserInfo = (newUserInfo) => {
    setUserInfo(newUserInfo)
  }

  return {
    state,
    ResetState,
    SetToken,
    SetUserInfo,
    SetRoles,
    Logout,
    Login,
    UpdateUserInfo
  }
}, {
  persistent: true,
})
