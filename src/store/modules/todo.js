import { addTodo, deleteTodo, putTodo, getTodo, putTodos } from '../../api/todo'
const getDefaultState = () => {
    return {
    }
}
const state = getDefaultState()

const mutations = {
}

const actions = {
    // 添加
    addTodo({ commit }, data) {
        return new Promise((resolve, reject) => {
            addTodo(data).then((response) => {
                const { data } = response
                console.log(data)
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 删除
    deleteTodo({ commit }, id) {
        return new Promise((resolve, reject) => {
            deleteTodo(id).then((response) => {
                const { data } = response
                console.log(data)
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 修改(全部和单个)
    putTodo({ commit }, data) {
        return new Promise((resolve, reject) => {
            putTodo(data).then((response) => {
                const { data } = response
                console.log(data)
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 查询全部数据
    getTodo({ commit }) {
        return new Promise((resolve, reject) => {
            getTodo().then((response) => {
                const { data } = response
                console.log(data)
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    // 全选和反全选
    putTodos({ commit }, data) {
        return new Promise((resolve, reject) => {
            putTodos(data).then((response) => {
                const { data } = response
                console.log(data)
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
