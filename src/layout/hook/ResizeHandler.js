import { onBeforeMount, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useAppStore } from '@/store/app'
import { useRoute } from 'vue-router'
const { body } = document
const WIDTH = 992

export default function () {
    const isMobile = ref(false)
    const appStore = useAppStore()
    const route = useRoute()

    const isMobileDevice = () => {
        const rect = document.body.getBoundingClientRect()
        return rect.width - 1 < WIDTH
    }

    const resizeHandler = () => {
        if (!document.hidden) {
            isMobile.value = isMobileDevice()
            appStore.toggleDevice(isMobile ? 'mobile' : 'desktop')
            if (isMobile.value) {
                appStore.closeSidebar({ withoutAnimation: true })
            }
        }
    }

    onBeforeMount(() => {
        window.addEventListener('resize', resizeHandler)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize', resizeHandler)
    })

    onMounted(() => {
        isMobile.value = isMobileDevice()
        if (isMobile.value) {
            appStore.toggleDevice('mobile')
            appStore.closeSidebar({ withoutAnimation: true })
        }
    })

    watch(route, () => {
        if (appStore.device === 'mobile' && sidebar.opened) {
            appStore.closeSidebar({ withoutAnimation: false })
        }
    })
}