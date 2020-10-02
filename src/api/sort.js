import request from '../untils/request'

// 获取所有标签
export function getSorts(data) {
    return request({
        method: 'get',
        url: 'admin/sort',
        params: data
    })
}
// 添加标签 className
export function postSort(datas) {
    return request({
        method: 'post',
        url: 'admin/sort',
        data: datas
    })
}

// 修改标签 id className
export function putSort(datas) {
    return request({
        method: 'put',
        url: 'admin/sort',
        data: datas
    })
}

// 删除标签 id
export function delSort(id) {
    return request({
        method: 'delete',
        url: 'admin/sort',
        data: id
    })
}
