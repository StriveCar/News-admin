<script setup>
import {
  onMounted,
  toRef,
  ref,
  watch,
  defineProps,
  defineEmits,
  reactive
} from 'vue'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

// eslint-disable-next-line import/no-webpack-loader-syntax
import 'script-loader!jsonlint'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'

// 主题样式
import 'codemirror/theme/idea.css'
// 括号显示匹配
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/selection/active-line'
// 括号、引号编辑和删除时成对出现
import 'codemirror/addon/edit/closebrackets'
let jsonEditor = reactive(false)
const emit = defineEmits(['changed', 'input'])
const textarea = ref(null)
const props = defineProps({
  value: {}
})

const getValue = () => {
  return this.jsonEditor.getValue()
}
const value = toRef(props, 'value')
watch(value, (newValue, oldValue) => {
  const editorValue = jsonEditor.getValue()
  if (newValue !== editorValue) {
    jsonEditor.setValue(JSON.stringify(Object.assign({}, value), null, 2))
  }
})

onMounted(() => {
  jsonEditor = CodeMirror.fromTextArea(textarea.value, {
    mode: 'application/json',
    theme: 'idea', // 主日样式
    lint: true,
    tabSize: 2,
    smartIndent: true, // 是否智能缩进
    styleActiveLine: true, // 当前行高亮
    lineNumbers: true, // 显示行号
    gutters: ['CodeMirror-lint-markers'],
    lineWrapping: true, // 自动换行
    matchBrackets: true, // 括号匹配显示
    autoCloseBrackets: true, // 输入和退格时成对
    autoRefresh: true // 自动刷新
  })

  jsonEditor.setValue(JSON.stringify(value, null, 2))
  jsonEditor.on('change', (cm) => {
    emit('changed', cm.getValue())
    emit('input', cm.getValue())
  })
})
</script>

<template>
  <div class="json-editor">
    <textarea ref="textarea" />
  </div>
</template>

<style lang="scss" scoped>
.json-editor {
  height: 100%;
  position: relative;

  ::v-deep {
    .CodeMirror {
      height: auto;
      min-height: 588px;
    }

    .CodeMirror-scroll {
      min-height: 588px;
    }
  }
}
</style>
