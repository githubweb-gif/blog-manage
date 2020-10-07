<template>
  <div>
    <div class="table">
      <el-row type="flex">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="addLabel"
          >添加标签</el-button
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
        <el-table-column prop="title" label="标签"></el-table-column>
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
              @click="delSort(scope.row._id)"
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
    <el-dialog :visible.sync="dialogVisible" width="400px">
      <el-form ref="labelForm" :model="labelForm" label-width="80px">
        <h3>添加标签</h3>
        <el-form-item label="标签">
          <el-input v-model="labelForm.title"></el-input>
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
export default {
  data() {
    return {
      labelForm: {
        title: ''
      },
      tableData: [],
      page: {
        nowPage: 1,
        pages: 6
      },
      total: 0,
      text: '创建标签',
      sid: '',
      dialogVisible: false
    }
  },
  created() {
    this.getClass()
  },
  methods: {
    addLabel() {
      this.text = '创建标签'
      this.labelForm = {
        title: ''
      }
      this.dialogVisible = true
    },
    async onSubmit() {
      if (this.text === '修改标签') {
        await this.$store.dispatch('setIdLabel', {
          data: this.labelForm,
          id: this.sid
        })
              this.labelForm = {
        title: ''
      }
        this.getClass()
      } else {
        await this.$store.dispatch('setLabel', this.labelForm)
              this.labelForm = {
        title: ''
      }
        this.getClass()
      }
      this.dialogVisible = false
    },
    async getClass() {
      await this.$store.dispatch('label', this.page)
      this.tableData = this.$store.state.label.labelList.records
      this.total = this.$store.state.label.labelList.total
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
      this.text = '修改标签'
      this.labelForm = scope
      this.dialogVisible = true
    },
    async delSort(id) {
      this.sid = id
      await this.$store.dispatch('delIdLabel', this.sid)
      this.getClass()
    },
    Reset() {
      this.text = '创建标签'
            this.labelForm = {
        title: ''
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
.el-dialog {
  h3 {
    margin-bottom: 1rem;
  }
}
</style>
