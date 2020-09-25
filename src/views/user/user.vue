<template>
  <div class="box">
    <el-card>
      <el-table border :data="tableData" :fit="true">
        <el-table-column label="序号" type="index" width="50" align="center">
          <template scope="scope">
            <span>{{
              (page.nowPage - 1) * page.pages + scope.$index + 1
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户"> </el-table-column>
        <el-table-column prop="role" label="角色"> </el-table-column>
        <el-table-column prop="email" label="邮箱" width="260">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="260">
          <template slot-scope="scope">
            {{ scope.row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <el-switch
              :disabled="scope.row.role === 'admin' ? true : false"
              @change="changeStatus(scope.row)"
              v-model="scope.row.status"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="editUser(scope.row)"
              circle
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="removeUser(scope.row)"
              circle
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              @click="UserPower(scope.row)"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="tableData"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.nowPage"
        :page-sizes="[8, 10, 30, 40]"
        :page-size="page.pages"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <el-dialog title="修改用户信息" :visible.sync="dialogVisible" width="600px">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" pop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <!-- <el-form-item label="修改密码" pop="password">
                <el-input type="password" v-model="pass.password"></el-input>
              </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                   <el-input type="password" v-model="pass.checkPass" autocomplete="off"></el-input>
            </el-form-item> -->
        <el-form-item class="Captchas" prop="Captcha">
          <el-input
            type="text"
            placeholder="如果要修改邮箱请输入验证码"
            v-model="Captcha"
          ></el-input>
          <el-button type="primary" @click="getCode">获取验证码</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      Captcha: '',
      form: {
        username: '',
        email: '',
        _id: '',
        role: ''
      },
      dialogVisible: false,
      tableData: [],
      page: {
        nowPage: 1,
        pages: 8
      },
      total: null,
      rules: {
        username: [],
        email: [],
        avatar: []
      }
    }
  },
  created() {
    this.getUsers(this.page)
  },
  methods: {
    // 提交修改信息
    submit() {
      if (
        this.form._id === this.$store.getters.id ||
        this.form.role === 'normal'
      ) {
        if (this.form.email === this.email) {
          this.$store.dispatch('putUserInfo', this.form).then((res) => {
            this.dialogVisible = false
            this.getUsers(this.page)
          })
        } else {
          if (this.Captcha.trim() === '') {
            this.$message({
              message: '邮箱已有改动，请获取验证码',
              type: 'error',
              duration: 3 * 1000
            })
          } else {
            this.form.Captcha = this.Captcha
            this.$store.dispatch('putUserInfo', this.form).then((res) => {
              this.dialogVisible = false
              this.getUsers(this.page)
            })
          }
        }
      } else {
        this.$message({
          message: '权限不够',
          type: 'error',
          duration: 3 * 1000
        })
      }
    },
    // getCode()
    // 获取验证码
    async getCode() {
      await this.$store.dispatch('resetEmail', this.form.email.trim())
    },
    // 普通用户路由表不能有文章管理，用户管理，网站设置，分类目录
    // 修改用户状态
    changeStatus(row) {
      this.$store
        .dispatch('editPower', {
          id: this.$store.getters.id,
          state: { _id: row._id, status: row.status, role: row.role }
        })
        .then(() => {
          this.getUsers(this.page)
        })
    },
    // 获取用户信息id
    editUser(row) {
      this.dialogVisible = true
      this.$store.dispatch('getUserInfo', row._id).then((res) => {
        this.form = res.data
        this.email = res.data.email
      })
    },
    async getUsers(data) {
      const list = await this.$store.dispatch('UserFind', data)
      if (list.code === 20000) {
        this.total = list.data.total
        this.tableData = list.data.records
      }
    },
    async UserPower(row) {
      this.$store
        .dispatch('editPower', {
          id: this.$store.getters.id,
          state: { _id: row._id, role: row.role }
        })
        .catch((err) => {
          console.log(err)
        })
        .then(() => {
          this.getUsers(this.page)
        })
    },
    async removeUser(row) {
      if (this.$store.getters.id === row._id || row.role === 'admin') {
        this.$message({
          message: '不能删除自己或删除其他管理员',
          type: 'error',
          duration: 3 * 1000
        })
        return false
      }
      await this.$store.dispatch('delUser', {
        id: this.$store.getters.id,
        data: row
      })
      this.getUsers(this.page)
    },
    handleSizeChange(page) {
      this.page.pages = page
      this.getUsers(this.page)
    },
    handleCurrentChange(page) {
      this.page.nowPage = page
      console.log(page)
      this.getUsers(this.page)
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  min-width: 900px;
}
.Captchas {
  .el-input {
    margin-bottom: 20px;
  }
}
</style>
