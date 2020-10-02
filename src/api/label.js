import request from '../untils/request'

// 查询标签
export function label(page) {
    return request({
        url: 'admin/label',
        method: 'get',
        params: page
    })
}

// 统计文章数据
export function articleData() {
    return request({
        url: 'admin/articleData',
        method: 'get'
    })
}

// 查询这一周文章
export function articleSon() {
    return request({
        url: 'admin/articleSon',
        method: 'get'
    })
}

// 统计上一周文章数据
export function articleDay() {
    return request({
        url: 'admin/articleDay',
        method: 'get'
    })
}

// 统计数据
export function allInfo(data) {
    return request({
        url: 'admin/allInfo',
        method: 'get',
        params: data
    })
}

// 创建文章标签
export function setLabel(data) {
    return request({
        url: 'admin/label/',
        method: 'post',
        data
    })
}
// 修改文章标签
export function setIdLabel(datas) {
    return request({
        url: `admin/label/${datas.id}`,
        method: 'put',
        data: datas.data
    })
}
// 删除文章标签
export function delIdLabel(id) {
    return request({
        url: `admin/label/${id}`,
        method: 'delete'
    })
}
