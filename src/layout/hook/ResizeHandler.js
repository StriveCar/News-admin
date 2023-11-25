import { onBeforeMount, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
const { body } = document
const WIDTH = 992

export default function (device) {
    const isMobile = ref(false)
    const store = useStore()
    const route = useRoute()

    const isMobileDevice = () => {
        const rect = document.body.getBoundingClientRect()
        return rect.width - 1 < WIDTH
    }

    const resizeHandler = () => {
        if (!document.hidden) {
            isMobile.value = isMobileDevice()

            if (isMobile.value) {
                closeSideBar()
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
            store.dispatch('app/toggleDevice', 'mobile')
            store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
    })

    watch(route, () => {
        if (device && this.sidebar.opened) {
            store.dispatch('app/closeSideBar', { withoutAnimation: false })
        }
    })
}