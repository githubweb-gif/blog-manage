import { scort, setSort, setIdSort, delIdSort, articleData, articleDay, articleSon, allInfo } from '../../api/scort'
const getDefaultState = () => {
    return {
        sortList: []
    }
}
const state = getDefaultState()

const mutations = {
    getData(state, data) {
        state.sortList = data
    }
}

const actions = {
    scort({ commit }, page) {
        console.log('page')
        return new Promise((resolve, reject) => {
            scort(page).then((response) => {
                const { data } = response
                commit('getData', data)
                console.log(data)
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    setSort({ commit }, scortData) {
        return new Promise((resolve, reject) => {
            setSort(scortData).then((response) => {
                const { data } = response
                commit('getData', data)
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 修改文章分类
    setIdSort({ commit }, datas) {
        return new Promise((resolve, reject) => {
            setIdSort(datas).then((response) => {
                const { data } = response
                commit('getData', data)
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 删除文章分类
    delIdSort({ commit }, id) {
        return new Promise((resolve, reject) => {
            delIdSort(id).then((response) => {
                const { data } = response
                commit('getData', data)
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 统计文章数据
    articleData({ commit }) {
        return new Promise((resolve, reject) => {
            articleData().then((response) => {
                const { data } = response
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 统计上一周文章数据
    articleDay({ commit }) {
        return new Promise((resolve, reject) => {
            articleDay().then((response) => {
                const { data } = response
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 统计这周文章数据
    articleSon({ commit }) {
        return new Promise((resolve, reject) => {
            articleSon().then((response) => {
                const { data } = response
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 统计数据
    allInfo({ commit }, data) {
        return new Promise((resolve, reject) => {
            allInfo(data).then((response) => {
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
