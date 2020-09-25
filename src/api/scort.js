import request from '../untils/request'

// 查询分类
export function scort(page) {
    return request({
        url: 'admin/sort',
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

// 创建文章分类
export function setSort(data) {
    return request({
        url: 'admin/sort/',
        method: 'post',
        data
    })
}
// 修改文章分类
export function setIdSort(datas) {
    return request({
        url: `admin/sort/${datas.id}`,
        method: 'put',
        data: datas.data
    })
}
// 删除文章分类
export function delIdSort(id) {
    return request({
        url: `admin/sort/${id}`,
        method: 'delete'
    })
}
