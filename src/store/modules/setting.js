import { getSetting, putSetting, Statistics } from '../../api/setting'
const getState = () => {
    return {
        data: []
    }
}
const state = getState()

const mutations = {
}

const actions = {
    async getSetting({ commit }) {
        const data = await getSetting()
        console.log(data)
        return data
    },
    // 修改文章分类
    async putSetting({ commit }, info) {
        const data = await putSetting(info)
        console.log(data)
        return data
    },
    // 修改文章分类
    async Statistics({ commit }, info) {
        const data = await Statistics(info)
        console.log(data)
        return data
    }
}

export default {
    state,
    mutations,
    actions
}
