import request from '../untils/request'

// 修改网站设置
export function putSetting(data) {
    console.log('setting')
    return request({
        method: 'put',
        url: 'admin/setting',
        data
    })
}

// 获取网站设置
export function getSetting() {
    return request({
        method: 'get',
        url: 'admin/setting'
    })
}

// 获取网站浏览数据
export function Statistics() {
    return request({
        method: 'get',
        url: 'blog/Statistics'
    })
}
