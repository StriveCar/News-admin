import { getRoles } from "@/utils/auth";

function checkPermission(el, binding) {
  const { value } = binding
  const roles = getRoles()
  if (!value) {
    throw new Error(`need role! Like v-permission="'admin'"`)
  }

  if (roles != value) {
    el.parentNode && el.parentNode.removeChild(el)
  }
}

export default {
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
