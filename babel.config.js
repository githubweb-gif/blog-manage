// 项目发布时用到的插件
const prodplugins = []
if (process.env.NODE_ENV === 'production') {
  prodplugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    // 发布时的插件数组
    ...prodplugins,
    '@babel/plugin-syntax-dynamic-import'
  ]
}
