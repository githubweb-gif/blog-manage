import { getComments, delComments, putComments } from '../../api/comment'

const getstate = function () {
    return {
    }
}

const state = getstate()

const mutations = {
}

const actions = {
    // 获取所有评论
    cgetComments({ commit }, page) {
        return new Promise((resolve, reject) => {
            getComments(page).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    // 删除评论
    delComments({ commit }, id) {
        return new Promise((resolve, reject) => {
            delComments(id).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    // 修改评论状态
    async putComments({ commit }, data) {
        console.log(data)
        const info = await putComments(data)
        return info
    }
}

export default {
    state,
    mutations,
    actions
}
