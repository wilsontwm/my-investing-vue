//import { newsService } from '../services/news.service';
const state = {isPromptLogin: false};

const actions = {
    triggerLogin({commit}, on) {
        commit('triggerLogin', on);
    }
}

const mutations = {
    triggerLogin(state, on) {
        state.isPromptLogin = on;
    }
}

export const userModule = {
    namespaced: true,
    state,
    actions,
    mutations
}