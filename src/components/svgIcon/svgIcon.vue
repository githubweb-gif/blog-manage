<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return `svg-icon ${this.className}`
      } else {
        return 'svg-icon'
      }
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
svg {
  width: 48px;
  height: 48px;
  fill: currentColor;
}
</style>
