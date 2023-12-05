import { useCookies } from 'vue3-cookies'

const TokenKey = 'token'

const { cookies } = useCookies()

export function getToken() {
  return cookies.get(TokenKey)
}

export function setToken(token) {
  return cookies.set(TokenKey, token, { expires: 7 })
}

export function removeToken() {
  return cookies.remove(TokenKey)
}

export function setUserInfo(user) {
  let userInfo = '';
  if (user) {
    userInfo = JSON.stringify(user)
  }
  return cookies.set('userInfo', userInfo, { expires: 7 })
}

export function getUserInfo() {
  let userInfoText = cookies.get('userInfo')
  if (userInfoText) {
    return userInfoText;
  }
  return '';
}

export function removeUserInfo() {
  return cookies.remove('userInfo')
}

export function setRoles(roles) {
  let userRoles = []
  if (roles) {
    userRoles = JSON.stringify(roles)
  }
  cookies.set("roles", userRoles, { expires: 7 })
}

export function getRoles() {
  let userRoles = cookies.get("roles")
  if (userRoles) {
    return JSON.parse(userRoles)
  }
  return []
}

export function removeRoles() {
  cookies.remove("roles")
}
