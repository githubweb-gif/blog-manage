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
    webData: {
      type: Object
      },
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
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null,
      dataList: [],
      data: {}
    }
  },
  created () {
    console.log(this.webData)
    this.$store.dispatch('articleDay').then((res) => {
        console.log(res)
        this.dataList = res
    })
},
  watch: {
    webData (val) {
      this.data = val
    },
    dataList (val) {
      console.log(val)
      var sums = []
        for (var i = 0; i < 7; i++) {
           var sum = 0
          for (var j = 0; j < val.length; j++) {
            console.log(val[0].data[0])
            if (val[j].data[i] === null || val[j].data[i] === undefined) {
              val[j].data[i] = 0
            }
            sum += val[j].data[i]
          }
          sums.push(sum)
        }
        console.log(sums)
      this.setOptions(sums)
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
      this.setOptions(this.chartData)
    },
    setOptions(val) {
      this.chart.setOption({
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['文章数量']
        },
        series: [{
          name: '文章数量',
          itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: val,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }
        ]
      })
    }
  }
}
</script>
