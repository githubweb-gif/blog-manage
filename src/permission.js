import route, { resetRouter } from './router'
import { getToken } from './untils/auth'
import store from './store/index'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration
// 路由白名单
const whiteList = ['/login', '/resetPwd']

// router.beforeEach((to, from, next) => {
//     // 开始进度条
//     NProgress.start()
// })
route.beforeEach(async function(to, from, next) {
  // 开始进度条
  NProgress.start()
  const token = getToken()
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 判断用户角色权限，如果没有重新获取用户信息
      // 这里用用户角色判断，而不是看路由表是否存在
      // 因为在登录后角色就会保存在getters，同时路由表也被建立。它们之间有关联。
      // 只有在刷新页面时用户信息才会消失，路由表也会消失，因为都是存放在getters中。
      // 所以这里只判断是否有用户角色就行。
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      console.log(hasRoles)
      if (hasRoles) {
        // 有用户权限角色，放行
        next()
        NProgress.done()
      } else {
        try {
          // 没有用户角色权限，获取用户信息
          const { data } = await store.dispatch('getUserInfo', store.getters.id)
          const roles = [data.role]
          // 根据用户角色，获取不同的路由表
          const accessRoutes = await store.dispatch('generateRoutes', roles)
          // 添加路由
          route.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          // 放生错误，获取不到用户和路由，清空token。跳转到登录页
          await store.dispatch('resetToken', store.getters.id)
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单，防止页面一直跳转登录页
      // next()，必须要有
      next()
      NProgress.done()
    } else {
      // 没有token，跳转到登录页
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})
