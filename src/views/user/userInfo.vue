<template>
  <div class="user">
    <div class="about-me">
      <div class="info">
        <span class="title">关于我</span>
        <div class="userInfo">
          <div class="avatar">
            <img
              v-if="info.avatar === '' ? false : true"
              :src="baseURL + info.avatar"
              alt=""
            />
            <el-upload
              :show-file-list="false"
              :action="baseURL + '/admin/upImg'"
              :on-success="handleSuccess"
              multiple
              accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP"
              :limit="999"
            >
              <i class="el-icon-plus"></i>
              <!-- <el-button size="small" type="primary">点击上传</el-button> -->
            </el-upload>
          </div>
          <div class="education">
            <div class="hh"><i class="el-icon-edit"></i><span>教育</span></div>
            <div>河南师范大学新联学院</div>
          </div>
          <ul>
            <li>
              <i>用户名:</i>
              <span>{{ info.username }}</span>
              <input
                v-show="false"
                type="text"
                v-model="info.username"
                @keydown.enter="submit"
                @blur="submit"
              />
            </li>
            <li>
              <i>电子邮箱:</i><span>{{ info.email }}</span>
            </li>
            <li>
              <i>角色:</i><span>{{ info.role }}</span>
            </li>
            <li>
              <i>创建时间:</i><span>{{ info.createTime | dateFormat1 }}</span>
            </li>
            <!-- <li>
            <i>状态:</i
            ><span>{{ info.status === false ? '未激活' : '已激活' }}</span>
          </li> -->
          </ul>
        </div>
      </div>
    </div>
    <div class="account">
      <el-tabs v-model="activeName">
        <el-tab-pane label="账户" name="first">
          <el-form
            label-position="top"
            :model="info"
            ref="info"
            label-width="100px"
            class="demo-ruleForm"
            :rules="rules"
          >
            <el-form-item label="名称" prop="username">
              <el-input v-model="info.username"></el-input>
            </el-form-item>
            <el-form-item label="电子邮件" prop="email">
              <el-input v-model="info.email"></el-input>
            </el-form-item>
            <el-form-item label="验证码" class="Captchas" prop="Captcha">
              <el-input
                type="text"
                placeholder="如果要修改邮箱请输入验证码"
                v-model="Captcha"
              ></el-input>
              <el-button type="primary" @click="getCode">获取验证码</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit">更新</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="日志" name="second">
          <el-timeline>
            <el-timeline-item timestamp="2018/4/12" placement="top">
              <el-card>
                <h4>更新优化，和添加些交互效果</h4>
                <p>葡萄  提交于 2020/10/2 23:50</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top">
              <el-card>
                <h4>项目部署到github</h4>
                <p>葡萄  提交于 2020/9/28 22:09</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/20" placement="top">
              <el-card>
                <h4>创建项目</h4>
                <p>葡萄 提交于 2020/9/2 9:20</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      info: {
        _id: window.sessionStorage.getItem('uId'),
        username: '',
        avatar: '',
        role: '',
        email: ''
      },
      ruleForm: {
        name: 123
      },
      activeName: 'first',
      Captcha: '',
      rules: {
        username: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        Captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getInfo()
  },
  computed: {
    baseURL() {
      return this.$store.state.user.userData.baseUrl
    }
  },
  methods: {
    ...mapMutations(['putUserInfo']),
    getInfo() {
      this.$store.dispatch('getUserInfo', this.info._id).then((res) => {
        this.info = res.data
        this.putUserInfo(res.data)
      })
    },
    submit() {
      this.$store.dispatch('putUserInfo', this.info).then((res) => {
        this.getInfo()
      })
    },
    handleSuccess(response, file, fileList) {
      this.info.avatar = response.location
      this.submit()
    },
    async getCode() {
      await this.$store.dispatch('resetEmail', this.info.email.trim())
    },
    onSubmit() {}
  }
}
</script>

<style lang="less" scoped>
@media screen and (max-width: 920px) {
  .about-me,
  .account {
    width: 100% !important;
  }
}
.Captchas {
  .el-input {
    margin-bottom: 20px;
  }
}
.about-me {
  float: left;
  width: 25%;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
  .info {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 4px #a6aab2;
    .title {
      display: block;
      font-size: 16px;
      color: #222;
      padding: 10px 15px;
      border-bottom: 1px solid #dddfe1;
    }
    .userInfo {
      padding: 15px;
      .avatar {
        display: flex;
        justify-content: center;
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
      }
      .education {
        font-size: 14px;
        color: #5e9e9d;
        .hh {
          border-bottom: 1px solid #dddfe1;
        }
        div {
          padding: 6px 0;
        }
      }
      ul {
        padding-top: 10px;
        li {
          padding-bottom: 15px;
          color: #000000;
          font-size: 14px;
          input {
            padding: 5px 0;
            font-size: 16px;
          }
        }
      }
    }
  }
}
i {
  font-style: normal;
  margin-right: 10px;
}
.account {
  float: right;
  width: 75%;
  box-sizing: border-box;
  padding: 0 10px;
  .el-tabs {
    background-color: #fff;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0 0 4px #a6aab2;
  }
  .el-timeline {
    h4 {
      padding-bottom: 20px;
    }
  }
}
</style>
