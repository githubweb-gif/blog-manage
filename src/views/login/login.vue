<template>
    <div class="box">
        <el-form :model="loginFrom" :rules="rules" class="loginFrom"
        ref="loginFrom">
         <!-- 标题 -->
            <h4>后 台 管 理 系 统</h4>
            <!-- 主体 -->
            <div class="card">
                <!-- 标题 -->
                <h3>{{captchaMsg}}</h3>
                <!-- 边框 -->
                <div class="border">
                    <i></i>
                    <span>欢迎登录后台管理</span>
                </div>
                <el-form-item prop="name">
                    <i class="css iconfont icon-ren"></i>
                    <el-input  placeholder="请输入用户名" class="loginu" v-model="loginFrom.name">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <i class="css iconfont icon-suo"></i>
                    <el-input :type="type" placeholder="请输入密码" class="loginu" v-model="loginFrom.password"></el-input>
                    <i @click="iconChange" class="iconfont icon" :class="icon"></i>
                </el-form-item>
                <el-form-item prop="email" v-if="noRegistered">
                    <i class="css el-icon-message"></i>
                    <el-input type="text" placeholder="请输入邮箱" class="loginu" v-model="loginFrom.email"></el-input>
                </el-form-item>
                <el-form-item class="Captcha" prop="Captcha" v-if="noRegistered">
                    <el-input type="text" placeholder="请输入验证码" class="loginu" v-model="loginFrom.Captcha"></el-input>
                    <el-button type="primary" :disabled="handelDisabled" @click="getCode">{{num===0 || num===10?'获取验证码':num+'秒'}}</el-button>
                </el-form-item>
                <!-- 记住密码，忘记密码 -->
                <div class="pwd">
                    <!-- <span><input type="checkbox"> <span>记住密码</span></span> -->
                    <span @click="registered">{{msg}}</span>
                    <span class="wangji" @click="resetPwd">忘记密码?</span>
                </div>
                <div>
                  <el-button @click="adminLogin" :disabled="false" class="login">
                    {{captchaMsg}}
                  </el-button>
                </div>
          </div>
</el-form>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
        num: 10,
        handelDisabled: false,
        captchaMsg: '用户登录',
        msg: '注册账号',
        loginFrom: {
            name: '',
            password: '',
            email: '',
            Captcha: ''
        },
        noRegistered: false,
        type: 'password',
        icon: 'icon-yanjingguanbi',
        rules: {
            name: [
                { required: true, message: '请输入正确的名称', trigger: 'blur' },
                { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 25, message: '长度在 6 到 25 个字符', trigger: 'blur' }
            ],
            Captcha: [
              { required: true, message: '请输入验证码', trigger: 'blur' },
              { min: 6, max: 6, message: '长度 6 个字符', trigger: 'blur' }
            ]
        }
    }
},
methods: {
  // 重置密码
  resetPwd () {
    console.log(1)
    this.$router.push('/resetPwd')
  },
  // 获取邮箱验证码
    getCode () {
     this.$store.dispatch('emailCode', this.loginFrom.email).then((data) => {
        this.handelDisabled = true
       console.log('邮件已发送,注意查收')
       const that = this
       var time = setInterval(function () {
         console.log('邮件已发送,注意查收')
         that.num--
         if (that.num === 0) {
           that.handelDisabled = false
           that.num = 10
           clearInterval(time)
         }
       }, 1000)
     })
    },
  // 注册用户
    registered () {
      this.noRegistered = !this.noRegistered
      if (this.noRegistered === true) {
        this.msg = '已有帐号，登录'
        this.captchaMsg = '用户注册'
      } else {
        this.captchaMsg = '用户登录'
        this.msg = '注册账号'
      }
    },
    iconChange() {
        if (this.icon === 'icon-yanjingguanbi') {
            this.icon = 'icon-yanjingdakai'
            this.type = ''
            return false
        }
        this.icon = 'icon-yanjingguanbi'
        this.type = 'password'
    },
    adminLogin() {
        this.$refs.loginFrom.validate((valid) => {
            if (valid) {
              if (this.noRegistered === true) {
                // 注册页
                this.$store.dispatch('registered', this.loginFrom).then((data) => {
                    this.$router.push('/').then(() => {
                        this.$notify({
                            title: '成功',
                            message: '注册成功',
                            type: 'success',
                            duration: 2000
                        })
                        location.reload()
                    })
                }).catch((err) => {
                  console.log(err)
                    console.log('注册失败')
                })
              } else {
                // 登录页
                  this.$store.dispatch('login', this.loginFrom).then((data) => {
                    this.$router.push('/').then(() => {
                        this.$notify({
                            title: '成功',
                            message: '登录成功',
                            type: 'success',
                            duration: 1000
                        })
                    })
                }).catch((data) => {
                    console.log('登录失败')
                })
              }
            } else {
                return false
            }
        })
    }
},
computed: {
    ...mapState(['userData'])
}
}
</script>

<style lang="less" scoped>
.box {
  height: 100%;
  background: url(../../assets/111.jpg) no-repeat 0 0;
  background-size: 100% 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-form {
  width: 430px;
  text-align: center;
  transform: translate(0, -15%);
}

* {
  padding: 0;
  margin: 0;
}

.el-form > h4 {
  font-weight: normal;
  margin-bottom: 40px;
  font-size: 40px;
  color: #ffffff;
}

.card {
  background-color: #fff;
  box-shadow: 0 0 6px #2c2e2d;
  padding: 20px;
}

.card h3 {
  font-weight: normal;
  font-size: 30px;
  color: #376282;
  margin-bottom: 20px;
}

.border {
  position: relative;
  margin-bottom: 20px;
}

.border i {
  width: 100%;
  display: block;
  position: absolute;
  top: 50%;
  border-bottom: 1px solid #376282;
  z-index: 1;
}

.border span {
  position: relative;
  z-index: 2;
  background-color: #fff;
  font-size: 14px;
  padding: 0 5px;
}

.el-form-item {
  position: relative;
  border: 1px solid #376282;
  margin-bottom: 20px;
  i {
    width: 40px;
  }
  .el-button {
    position: absolute;
    right: 0;
    height: 100%;
    width: 100px;
  }
}

.el-input {
  padding-left: 10px;
  box-sizing: border-box;
}

.css {
  position: absolute;
  line-height: 47px;
  background-color: #fff;
  background-color: #376282;
  color: #ffffff;
  z-index: 999;
  font-size: 18px;
}

.icon {
  position: absolute;
  right: 10px;
  top: 50%;
  line-height: 0;
}

.pwd {
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  margin-bottom: 20px;
  span {
    cursor: pointer;
  }
}

.pwd .wangji {
  color: #83a6cb;
  margin-left: 20px;
}

.login {
  width: 100%;
  padding: 15px 0;
  background-color: #376282;
  margin-bottom: 20px;
  color: #ffffff;
}
</style>
