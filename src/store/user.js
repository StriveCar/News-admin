import { defineStore } from 'pinia'
import userApi from '@/api/user'
import { getToken, setToken, removeToken, getUserInfo, removeUserInfo, setUserInfo, removeRoles, setRoles, getRoles } from '@/utils/auth'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

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
    const { act, pwd } = userInfo
    return new Promise((resolve, reject) => {
      let userLoginDTO = {
        act: act.trim(),
        pwd: pwd
      }
      userApi.login(userLoginDTO).then(data => {
        console.log(data);
        if (data !== null) {
          setToken(data.token)
          setUserInfo(data.user)
          setRoles(data.user.identification)
          resolve()
        } else {
          ElMessage({
            message: '账号或密码错误',
            type: 'error',
            duration: 2500
          })
          reject()
        }
      }).catch(error=> {
        ElMessage({
          message: error,
          type: 'error',
        })
      })
    })
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
