const state = {
  visitedViews: [],
  cachedViews: []
}

const mutations = {
  // 添加tag
  ADD_VISITED_VIEWS: (state, view) => {
    if (state.visitedViews.some((v) => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  ADD_CACHED_VIEWS: (state, view) => {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },
  DEL_VISITED_VIEWS: (state, view) => {
    state.visitedViews.forEach((tag, index) => {
      if (tag.path === view.path) {
        state.visitedViews.splice(index, 1)
      }
    })
  },
  DEL_CACHED_VIEWS: (state, view) => {
    state.cachedViews.forEach((tag, index) => {
      if (tag.path === view.path) {
        state.cachedViews.splice(index, 1)
      }
    })
  },
  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  },
  DEL_OTHERS_VIEW(state, view) {
    state.visitedViews = state.visitedViews.filter((v) => {
      return v.meta.affix || v.path === view.path
    })
  },
  DEL_ALL_VIEW(state) {
    state.visitedViews = state.visitedViews.filter((v) => {
      return v.meta.affix
    })
  }
}

const actions = {
  addView({ dispatch }, view) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView({ commit }, view) {
    commit('ADD_VISITED_VIEWS', view)
  },
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEWS', view)
  },
  delView({ dispatch, state }, view) {
    return new Promise((resolve, reject) => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delVisitedView({ commit }, view) {
    return new Promise((resolve, reject) => {
      commit('DEL_VISITED_VIEWS', view)
      resolve({
        visitedViews: [...state.visitedViews]
      })
    })
  },
  delCachedView({ commit }, view) {
    return new Promise((resolve, reject) => {
      commit('DEL_CACHED_VIEWS', view)
      resolve({
        cachedViews: [...state.cachedViews]
      })
    })
  },
  updateVisitedView({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view)
  },
  delOthersVisitedViews({ commit, state }, view) {
    return new Promise((resolve, reject) => {
      commit('DEL_OTHERS_VIEW', view)
      resolve({ visitedViews: [...state.visitedViews] })
    })
  },
  delAllView({ commit, state }, view) {
    return new Promise((resolve, reject) => {
      commit('DEL_ALL_VIEW')
      resolve({
        visitedViews: [...state.visitedViews]
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
