<template>
    <div class="box">
      <div class="main">
          <div class="step">
          <el-steps :active="active" finish-status="success" :align-center="true">
            <el-step title="确认账号"></el-step>
            <el-step title="重置密码"></el-step>
            <el-step title="重置成功"></el-step>
          </el-steps>
          </div>
          <el-form class="content" :rules="rules" :model="ruleForm" ref="ruleForm" v-if="active===0?true:false">
            <el-form-item prop="email">
              <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
              <el-button type="primary" @click="actives">确认</el-button>
          </el-form>
          <div class="form">
             <el-form v-if="active===1?true:false" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
                 <el-form-item label="密码" prop="pass">
                   <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                 </el-form-item>
                 <el-form-item label="确认密码" prop="checkPass">
                   <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                 </el-form-item>
                 <el-form-item label="邮箱">
                   <p>{{ruleForm.email | jiami}}</p>
                 </el-form-item>
                <el-form-item class="Captchas" prop="Captcha">
                    <el-input type="text" placeholder="请输入验证码" v-model="ruleForm.Captcha"></el-input>
                    <el-button type="primary" :disabled="handelDisabled" @click="getCode">{{num===0 || num===10?'获取验证码':num+'秒'}}</el-button>
                </el-form-item>
                 <el-form-item>
                   <el-button type="primary" @click="submitForm">提交</el-button>
                 </el-form-item>
            </el-form>
            </div>
            <div class="success" v-if="active===2?true:false">
              <h3>重置密码成功!</h3>
              <p>{{time}}秒之后跳转到登录页</p>
              <el-button type="primary">跳转到登录页</el-button>
            </div>
      </div>
    </div>
</template>

<script>
export default {
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
        return {
            num: 10,
            handelDisabled: false,
            time: 3,
            active: 0,
            ruleForm: {
              pass: '',
              checkPass: '',
              email: '',
              Captcha: ''

            },
            rules: {
              email: [
                  { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                  { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
              ],
              pass: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 25, message: '长度在 6 到 25 个字符', trigger: 'blur' },
                { validator: validatePass, trigger: 'blur' }
              ],
              checkPass: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { validator: validatePass2, trigger: 'blur' }
              ],
              Captcha: [
              { required: true, message: '请输入验证码', trigger: 'blur' },
              { min: 6, max: 6, message: '长度 6 个字符', trigger: 'blur' }
              ]
            }
        }
    },
    filters: {
      jiami (email) {
        const gg = email.split('@')
        const hh = email.slice(0, 3)
        return hh + '*****' + gg[1]
      }
    },
    methods: {
      getCode () {
        this.$store.dispatch('resetEmail', this.ruleForm.email.trim()).then(() => {
           this.handelDisabled = true
        const that = this
       var time = setInterval(function () {
         that.num--
         if (that.num === 0) {
           that.handelDisabled = false
           that.num = 10
           clearInterval(time)
         }
       }, 1000)
        })
      },
      submitForm () {
      this.$refs.ruleForm.validate((valid) => {
          if (valid) {
          this.$store.dispatch('resetPass', this.ruleForm).then((res) => {
            this.active = 2
            const that = this
            setInterval(function () {
              that.time--
              if (that.time === 0) {
                that.$router.push('/login')
              }
            }, 1000)
          })
          } else {
            this.active = 1
          }
        })
      },
      actives () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$store.dispatch('userPresence', { email: this.ruleForm.email }).then((res) => {
              this.active = 1
            })
          } else {
            this.active = 0
          }
        })
      }
    }
}
</script>

<style lang="less" scoped>
@media screen and (max-width: 886px) {
  .main {
    width: 100%;
  }
}
.Captchas {
  width: 350px;
  position: relative;
  .el-input {
    width: 100%;
    margin: 0 !important;
  }
  .el-button {
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
  }
}
.success {
  h3 {
    text-align: center;
    margin-bottom: 15px;
  }
  p {
    font-size: 14px;
    text-align: center;
    margin-bottom: 15px;
  }
  text-align: center;
}
.form {
  display: flex;
  justify-content: center;
}
.box {
  display: flex;
  justify-content: center;
}
.main {
  width: 900px;
  margin: 150px 0;
  .step {
    margin-bottom: 30px;
  }
}
.content {
  text-align: center;
  .el-button {
    display: block;
    margin: 0 auto;
    width: 350px;
  }
}
.el-input {
  width: 350px;
}
</style>
