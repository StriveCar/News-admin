import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookie'
import { ref, reactive } from 'vue'

export const useAppStore = defineStore('app', () => {
  const { get, set } = useCookies()

  const sidebar = reactive({
    opened: get('sidebarStatus') ? !!+get('sidebarStatus') : true,
    withoutAnimation: false,
  })
  const device = ref('desktop')


  const toggleSidebar = () => {
    sidebar.opened = !sidebar.opened
    sidebar.withoutAnimation = false
    if (sidebar.opened) {
      set('sidebarStatus', 1)
    } else {
      set('sidebarStatus', 0)
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
