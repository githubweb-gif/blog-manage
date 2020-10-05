import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from '../views/login/login.vue'
const Login = () =>
  import(/* webpackChunkName: "login" */ '../views/login/login.vue')

// import Layout from '../layout/index.vue'
const Layout = () =>
  import(/* webpackChunkName: "Layout" */ '../layout/index.vue')

// import dashboard from '../views/dashboard/dashboard.vue'
const dashboard = () =>
  import(/* webpackChunkName: "dashboard" */ '../views/dashboard/index.vue')

// import Article from '../views/article/article.vue'
const Article = () =>
  import(
    /* webpackChunkName: "Layout_Article" */ '../views/article/article.vue'
  )

// import allArticle from '../views/article/allArticle'
const allArticle = () =>
  import(/* webpackChunkName: "Layout_Article" */ '../views/article/allArticle')

// import sort from '../views/article/sort.vue'
const sort = () =>
  import(/* webpackChunkName: "Layout_Article" */ '../views/article/sort.vue')

// import comment from '../views/article/comment.vue'
const comment = () =>
  import(/* webpackChunkName: "comment" */ '../views/article/comment.vue')

// import User from '../views/user/user.vue'
const UserManagement = () =>
  import(/* webpackChunkName: "User" */ '../views/user/user.vue')
const UserInfo = () =>
  import(/* webpackChunkName: "User" */ '../views/user/userInfo.vue')

// import options from '../views/seting/options.vue'
const options = () =>
  import(/* webpackChunkName: "options" */ '../views/seting/options.vue')

// resetPwd
const resetPwd = () =>
  import(/* webpackChunkName: "resetPwd" */ '../views/login/resetPwd.vue')

const label = () =>
  import('../views/article/label.vue')
  const icon = () =>
  import('../views/icon/index.vue')

Vue.use(VueRouter)

export const asyncRoutes = [
  {
    path: '/article',
    component: Layout,
    alwaysShow: true,
    redirect: '/article/writeArticle',
    meta: {
      roles: ['admin', 'normal'],
      title: '文章',
      icon: 'el-icon-reading'
    },
    children: [
      {
        path: 'writeArticle',
        name: 'WriteArticle',
        component: Article,
        meta: {
          roles: ['admin', 'normal'],
          title: '写文章',
          icon: 'el-icon-reading'
        }
      },
      {
        path: 'allArticle',
        name: 'AllArticle',
        component: allArticle,
        meta: { roles: ['admin', 'normal'], title: '文章管理' }
      },
      {
        path: 'label',
        name: 'Label',
        component: label,
        meta: { roles: ['admin'], title: '文章标签', KeepAlive: true }
      },
      {
        path: 'sort',
        name: 'Sort',
        component: sort,
        meta: { roles: ['admin'], title: '文章分类', KeepAlive: true }
      }
    ]
  },
  {
    path: '/comment',
    component: Layout,
    redirect: '/comment/index',
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        name: 'Comment',
        component: comment,
        meta: {
          roles: ['admin'],
          title: '评论',
          icon: 'el-icon-chat-dot-square',
          KeepAlive: true
        }
      }
    ]
  },
  {
    path: '/icon',
    component: Layout,
    redirect: '/icon/index',
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        name: 'icon',
        component: icon,
        meta: {
          title: '图标',
          icon: 'el-icon-picture',
          KeepAlive: true
        }
      }
    ]
  },
  // 空白页
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('../views/redirect/index')
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/userInfo',
    alwaysShow: true,
    meta: {
      roles: ['admin', 'normal'],
      title: '用户',
      icon: 'el-icon-s-custom'
    },
    children: [
      {
        path: 'userInfo',
        name: 'UserInfo',
        component: UserInfo,
        meta: {
          roles: ['admin', 'normal'],
          title: '个人中心',
          icon: 'el-icon-s-custom'
        }
      },
      {
        path: 'management',
        name: 'Management',
        component: UserManagement,
        meta: { roles: ['admin'], title: '用户管理' }
      }
    ]
  },
  {
    path: '/options',
    component: Layout,
    redirect: '/options/index',
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        name: 'Options',
        component: options,
        meta: { roles: ['admin'], title: '网站设置', icon: 'el-icon-setting' }
      }
    ]
  }
]

export const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      roles: ['admin', 'normal']
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: dashboard,
        meta: {
          roles: ['admin', 'normal'],
          title: '仪表盘',
          icon: 'el-icon-timer',
          affix: true
        }
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    path: '/resetPwd',
    component: resetPwd,
    hidden: true
  }
]

const createRouter = () =>
  new VueRouter({
    mode: 'history',
    routes: routes
  })

const router = createRouter()

export function resetRouter(data) {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
  router.addRoutes(data)
}

// 解决跳转相同路由报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

export default router
