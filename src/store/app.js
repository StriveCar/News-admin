import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
import { ref, reactive } from 'vue'

export const useAppStore = defineStore('app', () => {
  const { cookies } = useCookies()

  const sidebar = reactive({
    // opened: cookies.get('sidebarStatus') ? !!+cookies.get('sidebarStatus') : true,
    opened: true,
    withoutAnimation: false,
  })

  const device = ref('desktop')


  const toggleSidebar = () => {
    sidebar.opened = !sidebar.opened
    sidebar.withoutAnimation = false
    if (sidebar.opened) {
      cookies.set('sidebarStatus', 1)
    } else {
      cookies.set('sidebarStatus', 0)
    }
  }

  const closeSidebar = (withoutAnimation) => {
    set('sidebarStatus', 0)
    sidebar.opened = false
    sidebar.withoutAnimation = withoutAnimation
  }

  const toggleDevice = (device) => {
    sidebar.device = device
  }

  return {
    sidebar,
    device,
    toggleSidebar,
    closeSidebar,
    toggleDevice,
  }
}, {
  persist: true,
})
