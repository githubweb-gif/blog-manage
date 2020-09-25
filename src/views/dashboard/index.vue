<template>
    <div style="height: 100%;">
        <component :is="currentRole" />
    </div>
</template>

<script>
import adminDashboard from './admin/admindashboard'
import normalDashboard from './normal/normaldashboard'
export default {
    components: {
        adminDashboard,
        normalDashboard
    },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
     computed: {
    roles () {
      return this.$store.getters.roles
    }
  },
    created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'normalDashboard'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
