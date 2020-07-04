//import { newsService } from '../services/news.service';
const state = {isPromptLogin: false, isPromptSignup: false};

const actions = {
    triggerLogin({commit}, on) {
        commit('triggerLogin', on);
    },
    triggerSignup({commit}, on) {
        commit('triggerSignup', on);
    },
    submitSignup({commit}, {name, email, password}) {
        // Turn off the  signup dialog
        commit('triggerSignup', false);

        console.log(name);
        console.log(email);
        console.log(password);
    }
}

const mutations = {
    triggerLogin(state, on) {
        state.isPromptLogin = on;
    },
    triggerSignup(state, on) {
        state.isPromptSignup = on;
    }
}

export const userModule = {
    namespaced: true,
    state,
    actions,
    mutations
}