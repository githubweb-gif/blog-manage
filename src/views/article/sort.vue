<template>
  <div class="box" style="min-width:720px;">
    <div class="table">
      <el-row type="flex">
          <el-button type="primary" icon="el-icon-edit" @click="dialogVisible=true">添加标签</el-button>
      </el-row>
      <el-table border :data="tableData">
        <el-table-column label="序号" type="index" align="center" width="50">
          <template scope="scope">
            <span>{{(page.nowPage - 1) * page.pages + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="className" label="分类"></el-table-column>
        <el-table-column prop="title" label="分类属性"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="editSort(scope.row)" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" @click="delSort(scope.row._id)" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.nowPage"
        :page-sizes="[6, 10, 30, 40]"
        :page-size="page.pages"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="400px">
      <el-form ref="sortForm" :model="sortForm" label-width="80px">
        <h3>添加分类</h3>
        <el-form-item label="分类">
          <el-input v-model="sortForm.className"></el-input>
        </el-form-item>
        <el-form-item label="分类属性">
          <el-input v-model="sortForm.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{text}}</el-button>
          <el-button @click="Reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortForm: {
        className: '',
        title: ''
      },
      tableData: [],
      page: {
        nowPage: 1,
        pages: 6
      },
      total: 0,
      text: '创建分类',
      sid: '',
      dialogVisible: false
    }
  },
  created() {
    this.getClass()
  },
  methods: {
    async onSubmit() {
      if (this.text === '修改分类') {
        await this.$store.dispatch('setIdSort', {
          data: this.sortForm,
          id: this.sid
        })
        this.sortForm = {}
        this.getClass()
      } else {
        await this.$store.dispatch('setSort', this.sortForm)
        this.sortForm = {}
        this.getClass()
      }
      this.dialogVisible = false
    },
    async getClass() {
      await this.$store.dispatch('scort', this.page)
      this.tableData = this.$store.state.scort.sortList.records
      this.total = this.$store.state.scort.sortList.total
    },
    handleSizeChange(page) {
      // 每页数据条数
      this.page.pages = page
      this.getClass()
    },
    handleCurrentChange(page) {
      // 当前第几页
      this.page.nowPage = page
      this.getClass()
    },
    editSort(scope) {
      this.sid = scope._id
      this.text = '修改分类'
      this.sortForm = scope
      this.dialogVisible = true
    },
    async delSort(id) {
      this.sid = id
      await this.$store.dispatch('delIdSort', this.sid)
      this.getClass()
    },
    Reset() {
      this.text = '创建分类'
      this.sortForm = {}
    }
  }
}
</script>

<style lang="less" scoped>
* {
  color: black;
}
.el-row {
    margin-bottom: 20px;
}
</style>
