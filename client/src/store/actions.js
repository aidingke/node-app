export const setIsAutnenticated = ({ commit }, data) => commit('setIsAutnenticated', data)

export const setUser = ({ commit }, data) => commit('setUser', data)

export const setProfile = ({ commit }, data) => commit('setProfile', data)

export const setLoading = ({ commit }, data) => commit('setLoading', data)

export const setProfiles = ({ commit }, data) => commit('setProfiles', data)

export const clearCurrentState = ({ commit }) => {
    commit('setProfile', null)
    commit('setUser', null)
    commit('setIsAutnenticated', false)
}

//改变头像方法
export const setUserAvatar = ({ commit },y)=>{
    commit('setUserAvatar',y)
}