<template>
  <div>
    <div class="table">
      <el-row type="flex">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="addSort"
          >添加分类</el-button
        >
      </el-row>
      <el-table border :data="tableData">
        <el-table-column label="序号" type="index" align="center" width="50">
          <template v-slot="scope">
            <span>{{
              (page.nowPage - 1) * page.pages + scope.$index + 1
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="className" label="分类"></el-table-column>
        <el-table-column prop="Introduction" label="分类介绍"></el-table-column>
        <el-table-column min-width="180" prop="createAt" label="创建时间">
          <template v-slot="scope">
            {{ scope.row.createAt | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column min-width="120" label="操作">
          <template v-slot="scope">
            <el-button
              type="primary"
              @click="editSort(scope.row)"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button
              type="danger"
              @click="delLabel(scope.row._id)"
              icon="el-icon-delete"
              circle
            ></el-button>
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
        <el-form-item label="分类介绍">
          <el-input v-model="sortForm.Introduction"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{ text }}</el-button>
          <el-button @click="Reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getSorts, postSort, putSort, delSort } from '../../api/sort'
export default {
  data() {
    return {
      sortForm: {
        className: '',
        Introduction: ''
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
    this.getSort()
  },
  methods: {
    addSort() {
      this.dialogVisible = true
       this.text = '创建分类'
       this.sortForm = {
        className: '',
        Introduction: ''
      }
    },
    async onSubmit() {
      if (this.text === '修改分类') {
        await putSort({
          data: this.sortForm,
          id: this.sid
        })
        this.sortForm = {
        className: '',
        Introduction: ''
      }
        this.getSort()
      } else {
        await postSort(this.sortForm)
        this.sortForm = {
        className: '',
        Introduction: ''
      }
        this.getSort()
      }
      this.dialogVisible = false
    },
    async getSort() {
      const list = await getSorts(this.page)
      console.log(list)
      if (list) {
        this.tableData = list.data.records
        this.total = list.data.total
      }
    },
    handleSizeChange(page) {
      // 每页数据条数
      this.page.pages = page
      this.getSort()
    },
    handleCurrentChange(page) {
      // 当前第几页
      this.page.nowPage = page
      this.getSort()
    },
    editSort(scope) {
      this.sid = scope._id
      this.text = '修改分类'
      this.sortForm = scope
      this.dialogVisible = true
    },
    async delLabel(id) {
      this.sid = id
      await delSort({ id: this.sid })
      this.getSort()
    },
    Reset() {
      this.text = '创建分类'
      this.sortForm = {
        className: '',
        Introduction: ''
      }
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
