import { login, UserFind, delUser, editPower, logout, getUserInfo, putUserInfo, registered, emailCode, resetEmail, resetPass, userPresence } from '../../api/user'
import { setToken, getToken } from '../../untils/auth'
const getDefaultState = () => {
    return {
        userData: {
            name: window.sessionStorage.getItem('username'),
            avatar: window.sessionStorage.getItem('avatar'),
            id: window.sessionStorage.getItem('uId'),
            token: getToken(),
            // prd: 'http://106.53.102.65:3000'
            // 上传文件url
            baseUrl: 'http://localhost:3000'
        },
        role: []
    }
}
const state = getDefaultState()

const mutations = {
    // 更改用户信息
    putUserInfo(state, data) {
        state.userData.name = data.username
        state.userData.avatar = data.avatar
        window.sessionStorage.setItem('username', data.username)
        window.sessionStorage.setItem('avatar', data.avatar)
    },
    // 上传文件URL
    Url(state) {
        state.userData.baseUrl = 'http://106.53.102.65:3000'
    },
    SET_TOKEN(state, data) {
        console.log(data)
        for (var k in state.userData) {
            if (data.userInfo[k] !== undefined || k === 'id') {
                if (k === 'id') {
                    state.userData[k] = data.userInfo._id
                    console.log(state.userData[k])
                } else {
                    state.userData[k] = data.userInfo[k]
                }
            }
        }
        console.log(state.userData.id)
        window.sessionStorage.setItem('uId', data.userInfo._id)
        window.sessionStorage.setItem('username', data.userInfo.username)
        window.sessionStorage.setItem('avatar', data.userInfo.avatar)
        window.sessionStorage.setItem('role', data.userInfo.role)
    },
    SET_ROLES(state, data) {
        state.role[0] = data.data.role
    }
}

const actions = {
    // 用户登录
    login({ commit }, userInfo) {
        const { name, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: name.trim(), password: password }).then((response) => {
                const { data } = response
                commit('SET_TOKEN', data)
                setToken(data.token)
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 用户注册
    registered({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            registered(userInfo).then((response) => {
                const { data } = response
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 邮箱验证码
    emailCode({ commit }, data) {
        return new Promise((resolve, reject) => {
            emailCode(data).then((response) => {
                const { data } = response
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 重置密码
    resetPass({ commit }, data) {
        return new Promise((resolve, reject) => {
            resetPass(data).then((response) => {
                const { data } = response
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 重置邮箱验证码
    resetEmail({ commit }, data) {
        return new Promise((resolve, reject) => {
            resetEmail(data).then((response) => {
                const { data } = response
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 查询用户是否存在
    userPresence({ commit }, data) {
        return new Promise((resolve, reject) => {
            userPresence(data).then((response) => {
                const { data } = response
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 用户退出清除token
    resetToken({ commit }, id) {
        // window.sessionStorage.clear()
        return new Promise((resolve, reject) => {
            logout(id).then((data) => {
                // 清空token及其它数据
                window.sessionStorage.clear()
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 查询所有用户
    UserFind({ commit }, page) {
        return new Promise((resolve, reject) => {
            UserFind(page).then((response) => {
                const data = response
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 删除用户
    delUser({ commit }, id) {
        return new Promise((resolve, reject) => {
            delUser(id).then((response) => {
                const data = response

                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 修改用户状态
    editPower({ commit }, datas) {
        return new Promise((resolve, reject) => {
            editPower(datas).then((response) => {
                const data = response
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 获取用户信息id
    // 只用来获取自身信息
    getUserInfo({ commit }, _id) {
        return new Promise((resolve, reject) => {
            getUserInfo(_id).then((response) => {
                commit('SET_ROLES', response)
                const data = response
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 修改用户信息id
    putUserInfo({ commit }, data) {
        return new Promise((resolve, reject) => {
            putUserInfo(data).then((response) => {
                const data = response
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    }
}

export default {
    state,
    mutations,
    actions
}
