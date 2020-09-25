import { article, getArticle, delArticle, editArticle, findArticle } from '../../api/article'
const getState = () => {
    return {
        id: window.sessionStorage.getItem('ArticleId'),
        title: ''
    }
}
const state = getState()

const mutations = {
    set_ID(state, data) {
        window.sessionStorage.setItem('ArticleId', data)
        state.id = window.sessionStorage.getItem('ArticleId')
    }
}

const actions = {
    article({ commit }, info) {
        return new Promise((resolve, reject) => {
            article(info).then((response) => {
                const { data } = response
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    getArticle({ commit }, data) {
        return new Promise((resolve, reject) => {
            getArticle(data).then((response) => {
                const { data } = response
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 删除文章
    delArticle({ commit }, data) {
        return new Promise((resolve, reject) => {
            delArticle(data).then((response) => {
                const { data } = response
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 修改文章
    editArticle({ commit }, data) {
        return new Promise((resolve, reject) => {
            editArticle(data).then((response) => {
                const { data } = response
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 查询文章id
    findArticle({ commit }, data) {
        return new Promise((resolve, reject) => {
            findArticle(data).then((response) => {
                const { data } = response
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
