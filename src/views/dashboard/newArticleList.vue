<template>
    <div class="box">
    <el-table :data="articleList" style="width: 100%">
      <el-table-column prop="createAt" label="日期">
          <template slot-scope="scope">
              {{scope.row.createAt | dateFormat1}}
          </template>
      </el-table-column>
      <el-table-column prop="title" label="文章">
      </el-table-column>
      <el-table-column prop="sorts.className" label="分类">
      </el-table-column>
      <el-table-column prop="label.title" label="标签">
      </el-table-column>
      <el-table-column prop="author.username" label="作者">
      </el-table-column>
    </el-table>
    </div>
</template>

<script>
export default {
    data () {
        return {
            articleList: []
        }
    },
    created () {
        this.$store.dispatch('articleSon').then((res) => {
            res.sort(function (a, b) {
                return new Date(a.createAt) - new Date(b.createAt)
            })
            console.log(res)
            this.articleList = res.reverse().slice(0, 10)
        })
    }
}
</script>

<style lang="scss" scoped>
.box {
      overflow: hidden;
    white-space: nowrap;
}
</style>
