import { userService } from '../services/user.service';
const state = {isPromptLogin: false, isLoginInProgress: false, isPromptSignup: false};

const actions = {
    triggerLogin({commit}, on) {
        commit('triggerLogin', on);
    },
    async loginWithProvider({commit}, provider) {
        commit('triggerLogin', false);        
        commit('loginRequest', true);
        let popup = {
            message: "Logging in", 
            isDismissable: false, 
            isLoading: true,
            timeout: 10000
        };
        commit('generalModule/showPopup', popup, { root: true });

        let response = await userService.login(provider);
        if(response.success) {
            commit('generalModule/hidePopup', null, { root: true });
            let user = {
                name: response.data.Name, 
                photo: response.data.PicURL, 
                email: response.data.Email,
                token: response.data.Token,
            };
            commit('loginRequest', false);
            return user;
        } else {
            popup.message = response.error;
            popup.icon = "mdi-alert-circle-outline";
            popup.iconColor = "error";
            popup.isDismissable = true;
            popup.isLoading = false;
            commit('generalModule/showPopup', popup, { root: true });
        }
        commit('loginRequest', false);
        return null;
    },
    triggerSignup({commit}, on) {
        commit('triggerSignup', on);
    },
    submitSignup({commit}, {name, email, password}) {
        // Turn off the  signup dialog
        commit('triggerSignup', false);

        let popup = {
            message: "Loading in progress", 
            isDismissable: false, 
            isLoading: true, 
            icon: null, 
            iconColor: "primary"
        };
        commit('generalModule/showPopup', popup, { root: true });
        
    },
    async logout({commit}) {
        const response = await userService.logout();
        return response;
    }
}

const mutations = {
    triggerLogin(state, on) {
        state.isPromptLogin = on;
    },
    loginRequest(state, on) {
        state.isLoginInProgress = on;
    },
    loginUser(state, user) {
        state.isPromptLogin = false;
        state.user = user;
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