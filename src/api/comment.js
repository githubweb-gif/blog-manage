import request from '../untils/request'

// 获取所有评论
export function getComments(data) {
    return request({
        method: 'get',
        url: 'admin/comment',
        params: data
    })
}

// 删除评论
export function delComments(id) {
    return request({
        method: 'delete',
        url: `admin/comment/${id}`
    })
}

// 修改评论状态
export function putComments(datas) {
    console.log(datas)
    return request({
        method: 'put',
        url: `admin/comment/${datas.state}`,
        data: datas
    })
}
