<script setup>
import { h, defineProps } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
})

const render = () => {
  const vnodes = []
  if (props.icon) {
    if (props.icon.includes('el-icon')) {
      vnodes.push(h('i', { class: [props.icon, 'sub-el-icon'] }))
    } else {
      vnodes.push(h('svg-icon', { 'icon-class': props.icon }))
    }
  }

  if (props.title) {
    vnodes.push(h('span', { slot: 'title' }, props.title))
  }

  return vnodes
}
</script>

<style lang="scss" scoped></style>
