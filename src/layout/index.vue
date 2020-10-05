<template>
  <div class="box">
    <el-container>
      <el-aside class="sidebar-container" :width="isCollapse === false ? '210px' : width">
        <el-menu
          :collapse-transition="false"
          router
          mode="vertical"
          :unique-opened="true"
          default-active="2"
          background-color="#304156"
          :collapse="isCollapse"
        >
          <side-barItem
            :collapse="isCollapse"
            :key="index"
            v-for="(item, index) in routes"
            :route="item"
          ></side-barItem>
        </el-menu>
      </el-aside>
      <el-container :style="{ 'margin-left': marginLeft }">
        <el-header>
          <div class="navBar">
            <div class="bar">
              <i @click="collapseChange" class="el-icon-s-fold"></i>
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <transition-group name="breadcrumb">
                  <el-breadcrumb-item
                    :key="item.path"
                    v-for="item in levelList"
                    :to="{ path: item.path }"
                  >{{ item.title }}</el-breadcrumb-item>
                </transition-group>
              </el-breadcrumb>
            </div>
            <div class="logout">
              <img :src="baseURL + avatar" alt />
              <ul>
                <li @click="$router.push('/')">首页</li>
                <li @click="$router.push('/user')">个人中心</li>
                <li @click="LogOut">退出登录</li>
              </ul>
            </div>
          </div>
          <tages-view></tages-view>
        </el-header>
        <el-main>
          <transition name="fade-transform" mode="out-in">
            <keep-alive>
              <router-view v-if="$route.meta.KeepAlive" :key="key"></router-view>
            </keep-alive>
          </transition>
          <transition name="fade-transform" mode="out-in">
            <router-view v-if="!$route.meta.KeepAlive" :key="key"></router-view>
          </transition>
        </el-main>
      </el-container>
      <div class="shadow" v-show="show" @click="isCollapse = true"></div>
    </el-container>
  </div>
</template>

<script>
import sideBarItem from './sidebaritem.vue'
import TagesView from './TagesView/index.vue'

export default {
  data() {
    return {
      isCollapse: true,
      levelList: [],
      width: '0',
      marginLeft: '0',
      show: false
    }
  },
  components: {
    sideBarItem,
    TagesView
  },
  computed: {
    baseURL() {
      return this.$store.state.user.userData.baseUrl
    },
    avatar() {
      return this.$store.state.user.userData.avatar
    },
    routes() {
      return this.$store.getters.permission_routes
    },
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  },
  watch: {
    $route(route) {
      if (document.body.clientWidth < 920) {
        this.isCollapse = true
      }
      if (route.path.startsWith('/dashboard/')) {
        return
      }
      this.getBreadcrumb()
    },
    isCollapse(value) {
      if (document.body.clientWidth < 920) {
        this.marginLeft = 0
        if (value === false) {
          this.show = true
        } else {
          this.show = false
        }
        return
      }
      if (value === false) {
        this.marginLeft = '210px'
      } else {
        this.marginLeft = '58px'
      }
    }
  },
  created() {
    this.getBreadcrumb()
    if (process.env.NODE_ENV === 'production') {
      this.$store.commit('Url')
    }
  },
  methods: {
    getBreadcrumb() {
      this.levelList = []
      const matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      )
      console.log(matched)
      matched.forEach((item, index) => {
        this.levelList[index] = { title: item.meta.title, path: item.path }
      })
    },
    collapseChange() {
      this.isCollapse = !this.isCollapse
    },
    handleOpen() {},
    handleClose() {},
    LogOut() {
      const id = window.sessionStorage.getItem('uId')
      this.$store.dispatch('resetToken', id).then(() => {
        location.reload()
      })
    }
  },
  mounted() {
    const _this = this
    if (document.body.clientWidth < 920) {
      this.width = '0'
      this.marginLeft = '0'
    } else {
      this.width = '58px'
      this.marginLeft = '58px'
      this.isCollapse = true
    }
    window.addEventListener('resize', function () {
      if (document.body.clientWidth < 920) {
        _this.width = '0'
        _this.marginLeft = '0'
      } else {
        _this.width = '58px'
        _this.marginLeft = '58px'
        _this.isCollapse = true
        _this.show = false
      }
    })
  }
}
</script>

<style lang="scss" scoped>
// @media screen and (max-width: 920px) {
//   .el-aside {
//     width: 0 !important;
//   }
// }
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
  height: 100%;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
* {
  color: rgb(191, 203, 217) !important;
}
.box,
.el-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.el-aside {
  background-color: #304156;
  transition: width 0.3s;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  height: 100%;
  z-index: 3;
}
.el-header {
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 !important;
  height: auto !important;
  .navBar {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    align-items: center;
    padding-left: 20px;
    border-bottom: 1px solid #d8dce5;
    .bar {
      display: flex;
      align-items: center;
    }
    i {
      display: inline-block;
      font-size: 30px;
      color: black !important;
      cursor: pointer;
    }
  }
}
.el-main {
  padding: 20px !important;
  background-color: #f0f2f5;
  overflow-x: hidden;
}
.el-menu {
  border: 0;
  width: 100%;
  overflow: hidden;
}
.logout {
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;
  margin-right: 15px;
  li:last-child {
    border-top: 1px solid #e3e3e3;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 8px;
  }
  ul {
    transition: height 0.3s;
    overflow: hidden;
    height: 0;
    position: absolute;
    z-index: 2;
    top: 120%;
    left: -140%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
    li {
      height: 36px;
      line-height: 36px;
      padding: 0 20px;
      font-size: 14px;
      color: black !important;
      cursor: pointer;
    }
  }
}

.logout:hover ul {
  height: 110px;
}
.el-breadcrumb {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  margin-left: 30px;
}
.el-container {
  transition: margin 0.3s;
}
.shadow {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #52484a;
  opacity: 0.5;
  z-index: 2;
}
</style>
