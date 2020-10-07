<template>
  <div class="tag">
    <scroll-pane ref="scrollPane" @scroll="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :to="{ path: tag.path, fullPath: tag.fullPath }"
        tag="span"
        :class="isActive(tag) ? 'active' : ''"
        class="tags-view-item"
        @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        ></span>
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      class="card"
      :style="{ left: left + 'px', top: top + 'px' }"
    >
      <li @click="refreshSelectedTag(selectedTag)">刷新当前页</li>
      <li @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags(selectedTag)">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">全部关闭</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane'
import path from 'path'

export default {
  data() {
    return {
      visible: false,
      left: 0,
      top: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  components: {
    ScrollPane
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    routes() {
      return this.$store.state.permission.routes
    }
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    // 根據當前路由判斷此tag是否被選中
    isActive(route) {
      return route.path === this.$route.path
    },
    // 根據此路由是否具有affix，有不執行關閉事件，沒有支持標簽關閉事件
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    // 添加標簽
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('addView', this.$route)
      }
    },
    // 關閉標簽
    closeSelectedTag(tag) {
      this.$store.dispatch('delView', tag).then(({ visitedViews }) => {
        // 如果刪除的是当前路由标签，需要跳转到下一个标签
        if (this.isActive(tag)) {
          this.toLasetView(visitedViews, tag)
        }
      })
    },
    toLasetView(visitedViews, tag) {
      const path = visitedViews[visitedViews.length - 1]
      if (path) {
        this.$router.push(path)
      } else {
        if (tag.name === 'Dashboard') {
          this.$router.replace({ path: tag.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    // 篩選路由表中是否著有affix的標簽
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const temTags = this.filterAffixTags(route.children, route.path)
          if (temTags.length >= 1) {
            tags = [...tags, ...temTags]
          }
        }
      })
      return tags
    },
    // 初始化標簽
    initTags() {
      const affixTags = (this.affixTags = this.filterAffixTags(this.routes))
      affixTags.forEach((tag) => {
        if (tag.name) {
          this.$store.dispatch('addVisitedView', tag)
        }
      })
    },
    // 使當前标签处于较好的位置
    moveToCurrentTag() {
      const tags = this.$refs.tag
      console.log(tags)
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    // 鼠标右键菜单
    openMenu(tag, e) {
      console.log(this.$el.getBoundingClientRect().left)
      const left = e.clientX - this.$el.getBoundingClientRect().left
      console.log(e)
      const top = e.clientY
      // card最大左边距
      const maxLeft = this.$el.offsetWidth - 100
      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left + 15
      }
      this.top = top
      this.visible = true
      this.selectedTag = tag
    },
    // 关闭菜单
    closeMenu() {
      this.visible = false
    },
    // 刷新跳转
    refreshSelectedTag(tag) {
      this.$nextTick(() => {
        this.$router.replace({ path: '/redirect' + tag.fullPath })
      })
    },
    // 关闭其他tag
    closeOthersTags(tag) {
      this.$router.push({ path: tag.path })
      this.$store.dispatch('delOthersVisitedViews', tag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags(view) {
      this.$store.dispatch('delAllView').then(({ visitedViews }) => {
        if (this.affixTags.some((tag) => tag.path === view.path)) {
          return
        }
        this.toLasetView(visitedViews, view)
      })
    },
    // 滚动条滚动关闭菜单
    handleScroll() {
      this.closeMenu()
    }
  }
}
</script>

<style lang="scss" scoped>
.tag {
  height: 30px;
  line-height: 30px;
}
.tags-view-item,
.active {
  display: inline-block;
  font-size: 12px;
  height: 26px;
  line-height: 26px;
  padding: 0px 8px;
  border: 1px solid #d8dce5;
  box-sizing: border-box;
  cursor: pointer;
  margin-left: 5px;
  color: #222222;
}
.active {
  background-color: #42b983;
  color: #fff;
}
.active::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #fff;
}
.el-icon-close {
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 50%;
  font-size: 10px;
  color: #d8dce5;
}
.el-icon-close:hover {
  color: #ffffff;
  background-color: #b4bccc;
}
.card {
  position: absolute;
  z-index: 2000;
  width: 100px;
  font-size: 12px;
  text-align: center;
  color: #222222;
  background-color: #fff;
  padding: 8px 0 0 0;
  box-shadow: 0px 0px 4px rgb(132, 125, 125);
  border-radius: 6px;
  li {
    padding-bottom: 8px;
    cursor: pointer;
  }
}
</style>
