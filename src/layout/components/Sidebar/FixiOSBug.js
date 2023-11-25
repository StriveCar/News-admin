import { onMounted, computed, ref } from "vue"
import { useStore } from 'vuex'
export default function (subMenu) {
    const { state } = useStore()
    const device = computed(() => {
        return state.app.device
    })
    const fixBugIniOS = () => {
        const $subMenu = subMenu
        if ($subMenu) {
            const handleMouseleave = $subMenu.handleMouseleave
            $subMenu.handleMouseleave = (e) => {
                if (device === 'mobile') {
                    return
                }
                handleMouseleave(e)
            }
        }
    }
    return { device, fixBugIniOS }
}