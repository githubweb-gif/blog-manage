<template>
    <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
// 引入图表主题
require('echarts/theme/macarons')
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
  return {
    chart: null,
    dataList: []
  }
},
created () {
    this.$store.dispatch('articleData').then((res) => {
        console.log(res)
        this.dataList = res
    })
},
watch: {
    dataList (value) {
      console.log(value)
        this.setOptions(value)
    }
},
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
methods: {
    initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions()
        },
    setOptions (value) {
        this.chart.setOption({
        title: {
           text: '文章分类统计'
         },
        // 提示框组件。
        tooltip: {
        // 触发类型。
          trigger: 'item',
        // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式。
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // 图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
        legend: {
          left: 'center',
          bottom: '10'
          // 图例的数据数组。数组项通常为一个字符串，每一项代表一个系列的 name
        // data: []
        },
        series: [
          {
            // 数据名称
            name: '文章数据',
            // 图表类型
            type: 'pie',
            // 是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
            // 'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小。
            // 'area' 所有扇区圆心角相同，仅通过半径展现数据大小。
            roseType: 'radius',
            // 15 内半径，95外半径
            radius: [15, 95],
            // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
            center: ['50%', '38%'],
            // 图标数据
            data: value,
            // 初始动画的缓动效果
            animationEasing: 'cubicInOut',
            // 初始动画的时长，支持回调函数，可以通过每个数据返回不同的时长实现更戏剧的初始动画效果
            animationDuration: 2600
          }
        ]
            })
        }
    }
}
</script>

<style lang='less' scoped>
</style>
