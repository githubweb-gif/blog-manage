<template>
  <div>
    <el-form :model="articleForm" ref="articleForm" class="demo-ruleForm" label-position="right">
      <el-form-item prop="title">
        <h2>标题</h2>
        <el-input v-model="articleForm.title"></el-input>
      </el-form-item>
      <div class="rigth">
        <el-form-item prop="cover" label="文章封面" label-width="80px">
          <img v-if="url" :src="BaseUrl+url" alt />
          <el-upload
            accept=".jpg, .jpeg, .png, .gif, .JPG, .JPEG, .PBG, .GIF"
            :on-success="successImg"
            class="upload-demo"
            :action="BaseUrl+'/admin/upImg'"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList2"
            :limit="1"
            list-type="picture"
          >
            <el-button @click="url=''" size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>
        <el-form-item prop="sorts" label="所属分类" label-width="80px">
          <el-select v-model="articleForm.sorts" placeholder="请选择分类">
            <el-option
              :key="item._id"
              v-for="(item) in sortLists"
              :label="item.title"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="发布时间" label-width="80px">
          <el-date-picker v-model="articleForm.createAt" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item prop="state" label="状态" label-width="80px">
          <el-select v-model="articleForm.state" placeholder="请选择状态">
            <el-option label="草稿" value="0"></el-option>
            <el-option label="已发布" value="1"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="left">
        <h2>内容</h2>
        <el-form-item prop="content">
          <!-- <mavon-editor @change="change"></mavon-editor> -->
          <tinymce-editor :LoadContent="articleForm.content" v-model="tinymce"></tinymce-editor>
        </el-form-item>
        <el-form-item>
          <el-button v-if="!edit" type="primary" @click="editArticle">修改文章</el-button>
          <el-button type="primary" @click="newArticle">新文章</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
// import TinymceEditor from './component'
import TinymceEditor from './tinymce'
export default {
  data() {
    return {
      myContent: '',
      articleInfo: {},
      uInfo: {},
      edit: true,
      url: '',
      sortLists: [],
      fileList2: [],
      articleForm: {
        content: '',
        title: '',
        cover: null,
        author: '',
        state: '',
        sorts: '',
        createAt: Date.now
      },
      html: '',
      tinymce: ''
    }
  },
  computed: {
    BaseUrl() {
      return this.$store.state.user.userData.baseUrl
    }
  },
  watch: {
    tinymce(value) {
      console.log(value)
      this.articleForm.content = value
    }
  },
  components: {
    TinymceEditor
  },
  async created() {
    // 书写文章作者id
    this.articleForm.author = window.sessionStorage.getItem('uId')
    // 获取分类
    this.$store
      .dispatch('scort')
      .then((data) => {
        this.sortLists = this.$store.state.scort.sortList
      })
      .catch((err) => {
        console.log(err)
      })
    // 修改文章获取原有文章信息
    if (window.sessionStorage.getItem('ArticleId')) {
      const id = window.sessionStorage.getItem('ArticleId')
      this.edit = false
      // 根据id获取原有文章请求
      const userInfo = await this.$store.dispatch('findArticle', id)
      // 显示原有文章封面
      this.url = userInfo.cover
      for (var item in this.articleForm) {
        for (var i in userInfo) {
          if (item === i) {
            if (item === 'state') {
              this.articleForm[item] = userInfo[i].toString()
            } else if (item === 'sorts') {
              this.articleForm[item] = userInfo[i]._id
            } else {
              this.articleForm[item] = userInfo[i]
            }
          }
        }
      }
    }
  },
  methods: {
    // 上传图片成功
    successImg(response, file, fileList) {
      console.log(response)
      this.articleForm.cover = response.location
    },
    handlePreview() {},
    handleRemove() {},
    // 修改文章
    editArticle() {
      const aId = window.sessionStorage.getItem('ArticleId')
      this.$store
        .dispatch('editArticle', { data: this.articleForm, id: aId })
        .then((data) => {
          window.sessionStorage.removeItem('ArticleId')
          this.$router.push('allArticle')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    newArticle() {
      // 重置文章
      if (window.sessionStorage.getItem('ArticleId')) {
        window.sessionStorage.removeItem('ArticleId')
        // 刷新页面
        this.articleForm.content = ''
        this.articleForm.title = ''
        this.articleForm.cover = null
        this.articleForm.sorts = null
        this.articleForm.state = ''
        this.articleForm.createAt = Date.now
        this.edit = true
        this.url = ''
        return
      }
      // 添加文章
      this.$store
        .dispatch('article', this.articleForm)
        .then((data) => {
          this.$router.push('allArticle')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    change(value, render) {
      this.articleForm.content = render
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and (max-width: 920px) {
  .rigth {
    display: block !important;
  }
}
* {
  color: black;
}
.left {
  .quill-editor {
    height: 380px;
  }
}
.rigth {
  display: flex;
}
img {
  width: 200px;
}
.el-form-item {
  margin-right: 20px;
}
h2 {
  margin-bottom: 15px;
}
</style>
