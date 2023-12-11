import SvgIcon from '@/components/SvgIcon' // svg component

const requireAll = function(requireContext) {
  return requireContext.keys().map(requireContext)
}

const req = require['context']('./svg', false, /\.svg$/) // 用的是vue-cli-service脚手架，可以使用require

requireAll(req)

export default function(app) {
  app.component('svg-icon', SvgIcon)
}
