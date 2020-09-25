import request from '../untils/request'

export function article(data) {
    return request({
        url: 'admin/article',
        method: 'post',
        data
    })
}
// 查询文章
export function getArticle(data) {
    return request({
        url: 'admin/article',
        method: 'get',
        params: data
    })
}
// 删除文章
export function delArticle(id) {
    return request({
        url: 'admin/article',
        method: 'delete',
        params: id
    })
}
// 修改文章
export function editArticle(datas) {
    return request({
        url: `admin/article/${datas.id}`,
        method: 'put',
        data: datas.data
    })
}
// 查询文章id
export function findArticle(id) {
    return request({
        url: `admin/article/${id}`,
        method: 'get'
    })
}
