<template>
  <div>
    <el-row type="flex">
      <el-select clearable class="right" v-model="page.sortId" placeholder="分类">
        <el-option v-for="item in sorts" :key="item._id" :label="item.className" :value="item._id"></el-option>
      </el-select>
      <el-select clearable class="right" v-model="page.labelId" placeholder="标签">
        <el-option v-for="item in labels" :key="item._id" :label="item.title" :value="item._id"></el-option>
      </el-select>
      <el-select clearable class="right" v-model="page.state" placeholder="状态">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button class="right" type="primary" icon="el-icon-search" @click="getArticle">搜索</el-button>
      <router-link to="writeArticle">
        <el-button type="primary" icon="el-icon-edit">添加文章</el-button>
      </router-link>
    </el-row>
    <el-card>
      <el-table
        border
        v-if="articleData"
        :data="articleData.records"
        style="width: 100%;"
        :default-sort="{ prop: 'sorts.createAt', order: 'descending' }"
      >
        <el-table-column label="序号" type="index" align="center" width="50">
          <template v-slot:default="scope">
            <span>
              {{
              (page.nowPage - 1) * page.pages + scope.$index + 1
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="cover" label="标题图片">
          <template v-slot:default="scope">
              <img :src="BaseUrl+scope.row.cover" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="author.username" label="作者"></el-table-column>
        <el-table-column prop="sorts.className" label="分类" ></el-table-column>
        <el-table-column prop="label.title" label="标签" ></el-table-column>
        <el-table-column prop="meta.views" label="阅读数" >
        </el-table-column>
        <!-- <el-table-column prop="sorts.title" label="开启评论" ></el-table-column> -->
        <el-table-column :sortable="true" width="180" prop="sorts.createAt" label="发表时间">
          <template v-slot:default="scope">{{ scope.row.createAt | dateFormat }}</template>
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template v-slot:default="scope">{{ scope.row.state === 0 ? '草稿' : '已发布' }}</template>
        </el-table-column>
        <el-table-column width="120" label="操作">
          <template v-slot:default="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="editArticle(scope.row._id)"
              circle
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="removeArticle(scope.row._id)"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      v-if="articleData"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.nowPage"
      :page-sizes="[8, 10, 30, 40]"
      :page-size="page.pages"
      layout="total, sizes, prev, pager, next, jumper"
      :total="articleData.total"
    ></el-pagination>
  </div>
</template>

<script>
import { getSorts } from '../../api/sort'
export default {
  data() {
    return {
      currentPage4: 1,
      articleData: null,
      page: {
        nowPage: 1,
        pages: 8,
        state: '',
        sortId: '',
        labelId: ''
      },
      labels: [],
      sorts: [],
      options: [
        {
          value: 0,
          label: '草稿'
        },
        {
          value: 1,
          label: '已发布'
        }
      ]
    }
  },
  computed: {
    sessionPage() {
      return window.sessionStorage.getItem('page')
    },
    BaseUrl() {
      return this.$store.state.user.userData.baseUrl
    }
  },
  created() {
    if (this.sessionPage) {
      this.page = JSON.parse(this.sessionPage)
    }
    this.getArticle()
    // 获取标签
    this.$store.dispatch('label').then((res) => {
      this.labels = res
    })
    // 获取分类
    this.getSorts()
  },
  watch: {
    page: {
      handler(val, oldval) {
        window.sessionStorage.setItem('page', JSON.stringify(this.page))
      },
      deep: true
    },
    'page.id': {
      handler() {
        this.page.nowPage = 1
        this.page.pages = 8
      }
    },
    'page.state': {
      handler() {
        this.page.nowPage = 1
        this.page.pages = 8
      }
    }
  },
  methods: {
    async getArticle() {
      const info = {
        page: this.page,
        role: this.$store.getters.roles[0],
        _id: this.$store.getters.id
      }
      const data = await this.$store.dispatch('getArticle', info)
      console.log(data)
      this.articleData = data
    },
    handleSizeChange(page) {
      this.page.pages = page
      this.getArticle()
    },
    handleCurrentChange(page) {
      this.page.nowPage = page
      this.getArticle()
    },
    editArticle(id) {
      this.$store.commit('set_ID', id)
      this.$router.push('writeArticle')
    },
    async removeArticle(id) {
      await this.$store.dispatch('delArticle', id)
      this.getArticle()
    },
    getSorts() {
      getSorts().then((res) => {
         this.sorts = res.data.records
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
}
.right {
  margin-right: 10px;
}
img {
  width: 100%;
}
</style>
