import request from '../untils/request'

// 登录
export function login(data) {
    return request({
        url: 'login',
        method: 'post',
        data
    })
}
// 注册用户
export function registered(data) {
    return request({
        url: 'login/registered',
        method: 'post',
        data
    })
}
// 获取邮箱验证码
export function emailCode(data) {
    return request({
        url: 'login/email',
        method: 'get',
        params: { data }
    })
}
// 重置密码获取邮箱验证码
export function resetEmail(data) {
    return request({
        url: 'login/resetEmail',
        method: 'get',
        params: { data }
    })
}
// 重置密码
export function resetPass(data) {
    return request({
        url: 'login/resetPwd',
        method: 'put',
        data
    })
}

// 查询用户是否存在
// 传递邮箱
export function userPresence(data) {
    return request({
        url: 'login/userInfo',
        method: 'get',
        params: data
    })
}

// 查询所有用户
export function UserFind(data) {
    return request({
        url: 'admin/user',
        method: 'get',
        params: data
    })
}

// 删除用户
export function delUser(data) {
    return request({
        url: `admin/user/${data.data._id}`,
        method: 'delete',
        params: data
    })
}

export function editPower(data) {
    return request({
        url: `admin/user/${data.id}`,
        method: 'put',
        data
    })
}

// 修改用户信息id
export function putUserInfo(data) {
    return request({
        url: `admin/userInfo/${data._id}`,
        method: 'put',
        data
    })
}

// 获取用户信息id
// 只用来获取自身信息
export function getUserInfo(_id) {
    console.log(_id)
    return request({
        url: `admin/userInfo/${_id}`,
        method: 'get'
    })
}

// 用户退出
export function logout(id) {
    return request({
        url: `admin/logout/${id}`,
        method: 'put'
    })
}
