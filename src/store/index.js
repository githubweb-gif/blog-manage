import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import label from './modules/label'
import getters from './getters'
import article from './modules/article'
import comment from './modules/comment'
import setting from './modules/setting'
import todo from './modules/todo'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    label,
    article,
    comment,
    setting,
    todo,
    permission,
    tagsView
  },
  getters
})

export default store
