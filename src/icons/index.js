import Vue from 'vue'
import svgIcon from '../components/svgIcon/svgIcon.vue'

Vue.component('svg-icon', svgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext) => {
  console.log(requireContext.keys())
  return requireContext.keys().map(requireContext)
}
requireAll(req)
