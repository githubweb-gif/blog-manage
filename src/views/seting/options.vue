<template>
    <div>
        <h2>网站设置</h2>
        <div class="setting">
            <div class="icon">
                <span>网站图标:</span>
                <img v-if="url" :src="BaseUrl+url">
                <el-upload
                  :limit='1'
                  :headers="mytoken"
                  :action="BaseUrl+'/admin/upImg'"
                  list-type="picture-card"
                  :on-success="success"
                  :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
            </div>
            <div class="">
                <span>站点名称:</span>
                <el-input v-model="Webform.Name" placeholder="站点名称"></el-input>
            </div>
            <div class="">
                 <el-checkbox v-model="Webform.comment">开启评论功能</el-checkbox>
                 <el-checkbox v-model="Webform.Review">评论须审核</el-checkbox>
            </div>
            <el-button @click="putSetting" type="primary">保存设置</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            Webform: {
                icon: '',
                Name: '',
                comment: false,
                Review: false
            },
            mytoken: {
              'X-Token': null
            },
            url: ''
        }
    },
    computed: {
        BaseUrl () {
          return this.$store.state.user.userData.baseUrl
     }
    },
    created () {
        this.mytoken['X-Token'] = this.$store.state.user.userData.token
        this.getSetting()
    },
    methods: {
        success (res, file, fileList) {
            console.log(res)
            this.Webform.icon = res.location
            console.log(this.Webform.icon)
            this.url = ''
        },
        handleRemove () {
          this.Webform.icon = ''
        },
        async putSetting () {
            const { data: res } = await this.$store.dispatch('putSetting', this.Webform)
            console.log(res)
        },
        async getSetting () {
            const { data: res } = await this.$store.dispatch('getSetting')
            if (res.icon !== null) {
              this.url = res.icon
              this.Webform = res
            }
        }
    }
}
</script>

<style lang="less" scoped>
@media screen and (max-width: 920px) {
  img {
    margin-bottom: 20px;
  }
  .icon {
    flex-direction: column;
  }
  span {
    margin-bottom: 15px;
  }
}
* {
  color: black;
}
.setting {
  width: 70%;
  margin: 0 auto;
  div {
    margin-bottom: 20px;
  }
}
.el-input {
  width: 70%;
  margin-bottom: 0 !important;
  margin-top: 15px;
}
.icon {
  display: flex;
}
span {
  margin-right: 20px;
}
img {
  width: 148px;
  height: 148px;
  margin-right: 20px;
}
</style>
