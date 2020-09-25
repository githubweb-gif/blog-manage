<template>
    <div>
        <el-table v-if="tableData.length !==0? true: false" border :row-click="getRoweKey" :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="评论人" width="100%">
            </el-table-column>
            <el-table-column prop="content" label="评论内容">
            </el-table-column>
            <el-table-column label="文章标题">
                <template slot-scope="scope">
                    <!-- v-html="scope.row.post.title可以时带标签的转为普通文本" -->
                    <p v-html="scope.row.post.title">{{scope.row.post.title}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="createAt" label="评论时间">
                <template slot-scope="scope">
                   {{scope.row.createAt | dateFormat}}
                </template>
            </el-table-column>
            <el-table-column prop="state" label="状态" width="100%">
                <template slot-scope="scope">
                   {{scope.row.state===0?'未批准':'批准'}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="160%">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" @click="editComment(scope.row)" circle></el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="removeComment(scope.row._id)" circle></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-if="tableData" @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="page.nowPage" :page-sizes="[8, 10, 30, 40]" :page-size="page.pages"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tableData: [],
            page: {
                nowPage: 1,
                pages: 8
            },
            total: null
        }
    },
    created () {
        // this.getComments(this.page)
    },
    methods: {
        async getComments (data) {
            const list = await this.$store.dispatch('cgetComments', data)
            if (list.code === 20000) {
                this.total = list.data.total
                this.tableData = list.data.records
            }
        },
        async editComment (row) {
            await this.$store.dispatch('putComments', { id: row._id, state: row.state })
            this.getComments(this.page)
        },
        async removeComment (id) {
           await this.$store.dispatch('delComments', id)
           this.getComments(this.page)
        },
        handleSizeChange (page) {
            this.page.pages = page
            this.getComments(this.page)
        },
        handleCurrentChange (page) {
            this.page.nowPage = page
            this.getComments(this.page)
        },
        getRoweKey (row) {
            return row._id
        }
    }
}
</script>

<style lang="less" scoped>
</style>
