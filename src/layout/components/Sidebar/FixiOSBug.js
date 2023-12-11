import { onMounted, computed, ref } from "vue"
import { useAppStore } from '@/store/app'
export default function () {
    const appStore = useAppStore()
    const device = computed(() => {
        return appStore.device
    })
    const fixBugIniOS = (subMenu) => {
        const $subMenu = subMenu
        if ($subMenu) {
            const handleMouseleave = $subMenu.handleMouseleave
            console.log($subMenu.handleMouseleave);
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