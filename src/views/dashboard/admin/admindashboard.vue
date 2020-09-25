<template>
  <div>
    <header>
      <div class="user statistics">
        <div class="flex">
          <div class="card-panel-icon-wrapper icon-article">
            <svg-icon class-name="card-panel-icon" icon-class="wenzhang"></svg-icon>
          </div>
          <div class="num">
            <h4>总的文章数</h4>
            <span v-if="info">{{ info.article }}</span>
          </div>
        </div>
      </div>
      <div class="comment statistics">
        <div class="flex">
          <div class="card-panel-icon-wrapper icon-yuedu">
            <svg-icon class-name="card-panel-icon" icon-class="yuedu"></svg-icon>
          </div>
          <div class="num">
            <h4>博客总浏览量</h4>
            <span v-if="webInfo.Pageviews">{{webInfo.Pageviews}}</span>
          </div>
        </div>
      </div>
      <div class="article statistics">
        <div class="flex">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon class-name="card-panel-icon" icon-class="peoples"></svg-icon>
          </div>
          <div class="num">
            <h4>总的管理员</h4>
            <span v-if="info">{{ info.user }}</span>
          </div>
        </div>
      </div>
      <div class="article statistics">
        <div class="flex">
          <div class="card-panel-icon-wrapper icon-sort">
            <svg-icon class-name="card-panel-icon" icon-class="sort"></svg-icon>
          </div>
          <div class="num">
            <h4>总的文章分类</h4>
            <span v-if="info">{{ info.sort }}</span>
          </div>
        </div>
      </div>
    </header>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <line-chart :webData="webInfo"></line-chart>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="8">
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 24 }"
        :md="{ span: 24 }"
        :lg="{ span: 12 }"
        :xl="{ span: 13 }"
        style="padding-right:8px;margin-bottom:30px;"
      >
        <article-list />
      </el-col>
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 6 }"
        :xl="{ span: 6 }"
        style="margin-bottom:30px;"
      >
        <to-do />
      </el-col>
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 6 }"
        :xl="{ span: 5 }"
        style="margin-bottom:30px;"
      >
        <el-card class="infoCartd">
          <div class="webIcon" style="width:100%;height:220px;">
            <img
              style="width:100%;height:220px;"
              v-if="webSetting"
              :src="BaseUrl + webSetting.icon"
              alt
            />
          </div>
          <div class="info">
            <div class="avatar">
              <img
                style="width:60px;height:60px;"
                src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
                alt
              />
            </div>
            <div class="name" v-if="webSetting">{{ webSetting.Name }}</div>
          </div>
          <div style="position:relative;padding-left:20px;">
            <div class="progress-item">
              <span>Vue</span>
              <el-progress :percentage="70" />
            </div>
            <div class="progress-item">
              <span>JavaScript</span>
              <el-progress :percentage="18" />
            </div>
            <div class="progress-item">
              <span>Css</span>
              <el-progress :percentage="12" />
            </div>
            <div class="progress-item">
              <span>ESLint</span>
              <el-progress :percentage="100" status="success" />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PieChart from '../chart/PieChart'
import BarChart from '../chart/barChart'
import LineChart from '../chart/lineChart'
import ToDo from '../TodoList/index'
import ArticleList from '../newArticleList'
export default {
  data() {
    return {
      info: null,
      webSetting: null,
      webInfo: {
        Pageviews: 0
      }
    }
  },
  computed: {
    BaseUrl() {
      return this.$store.state.user.userData.baseUrl
    }
  },
  created() {
    this.$store.dispatch('allInfo').then((res) => {
      this.info = res
    })
    this.$store.dispatch('getSetting').then((res) => {
      this.webSetting = res.data
    })
    this.$store.dispatch('Statistics').then((res) => {
      if (res.data) {
        this.webInfo = res.data
      }
    })
  },
  methods: {
    line() {
      this.options.type = 'line'
    }
  },
  components: {
    PieChart,
    BarChart,
    LineChart,
    ToDo,
    ArticleList
  }
}
</script>

<style lang="less" scoped>
.flex {
  i {
    font-size: 30px;
  }
}
.progress-item {
  margin-bottom: 10px;
  font-size: 14px;
}

.info {
  position: relative;
  display: flex;
  justify-content: flex-end;
}
.name {
  padding: 13px;
  font-size: 20px;
}
.avatar {
  position: absolute;
  top: -80%;
  left: 10%;
  width: 70px;
  height: 70px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    border-radius: 50%;
  }
}
.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}

@media (max-width: 1206px) {
  .chart-wrapper {
    padding: 8px;
  }
  .article {
    margin-bottom: 32px;
  }
  .statistics {
    width: 50% !important;
    margin-bottom: 10px;
  }
}

@media (max-width: 650px) {
  .num {
    display: none;
  }
  .flex {
    .card-panel-icon-wrapper {
      width: 100%;
      height: 100%;
      margin: 0 !important;
      padding: 0 !important;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
header {
  margin-left: -20px;
  margin-right: -20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-flow: wrap;
}
.wrappers {
  width: 700px;
  height: 400px;
}
.wrapper {
  width: 700px;
  height: 400px;
}
.statistics {
  width: 25%;
  padding: 0 20px;
  position: relative;
  box-sizing: border-box;
  .flex {
    height: 108px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .card-panel-icon-wrapper {
      padding: 14px;
      margin: 16px 0 0 16px;
      border-radius: 10px;
      transition: all 0.3s ease-out;
    }
    &:hover {
      .card-panel-icon-wrapper {
        color: #ffffff;
      }
      .icon-people {
        background-color: #40c9c6;
      }
      .icon-article {
        background-color: #36a3f7;
      }
      .icon-yuedu {
        background-color: #3d3f40;
      }
      .icon-sort {
        background-color: #f56c6c;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-article {
      color: #36a3f7;
    }
    .icon-yuedu {
      color: #3d3f40;
    }
    .icon-sort {
      color: #f56c6c;
    }
  }
  .num {
    margin-right: 10px;
    text-align: center;
    h4 {
      margin-bottom: 10px;
      color: rgba(0, 0, 0, 0.45);
    }
    span {
      font-weight: 600;
      color: #222222;
    }
  }
}
.statistics:last-child {
  margin-right: 0;
}
</style>
