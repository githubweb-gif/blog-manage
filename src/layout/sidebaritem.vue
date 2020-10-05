<template>
  <div class="sideBar" v-if="!route.hidden">
      <el-menu-item v-if="route.children.length === 1? true:false" :index="route.path">
        <svg-icon class="icon one" :icon-class="route.children[0].meta.icon" />
        <span slot="title" :style="!collapse===true?'z-index:1;':'z-index:-1;'">{{route.children[0].meta.title}}</span>
      </el-menu-item>
    <el-submenu v-else :index="route.meta.title">
        <template slot="title">
          <svg-icon  class="icon one" :icon-class="route.meta.icon" />
          <span :style="!collapse===true?'z-index:1;':'z-index:-1;'">{{route.meta.title}}</span>
        </template>
        <template v-for="(i,index) in route.children" >
    <el-menu-item :key="index" v-if="!i.hidden" :index="route.path+'/'+i.path">
    <svg-icon class="icon two" :icon-class="i.meta.icon" />
               <span :style="!collapse===true?'z-index:1;':'z-index:-1;'" slot="title">{{i.meta.title}}</span>
    </el-menu-item>
        </template>
    </el-submenu>
  </div>
</template>

<script>
export default {
    name: 'sidebarItem',
    props: {
        route: {
            type: Object,
            required: true
        },
        collapse: {
          type: Boolean,
          required: true
        }
    },
    data () {
        return {}
    }
}
</script>

<style lang="less" scoped>
.el-menu-item {
  i {
    color: #bfcbd9 !important;
  }
  span {
    color: #bfcbd9 !important;
    position: relative;
    margin-left: 10px;
  }
}
.el-submenu {
  i {
    color: #bfcbd9 !important;
  }
  span {
    color: #bfcbd9 !important;
    margin-left: 10px;
    position: relative;
  }
}
.one {
  margin-left: 20px;
  margin-right: 16px;
}
.icon {
  width: 1rem;
  height: 1rem;
}
</style>
