import { userService } from '../services/user.service';
const state = {isPromptLogin: false, isPromptSignup: false, user: null};

const actions = {
    triggerLogin({commit}, on) {
        commit('triggerLogin', on);
    },
    async loginWithProvider({commit}, provider) {
        commit('triggerLogin', false);        

        let popup = {
            message: "Login in progress", 
            isDismissable: false, 
            isLoading: true,
            timeout: 10000
        };
        commit('generalModule/showPopup', popup, { root: true });

        let response = await userService.login(provider);
        let user = null;
        if(response.success) {
            commit('generalModule/hidePopup', null, { root: true });
            console.log(response);
            /*const name = response.data.user.displayName;
            const photo = response.data.user.photoURL;
            user = {name, photo};
            commit('loginUser', user);*/
        } else {
            popup.message = response.error;
            popup.icon = "mdi-alert-circle-outline";
            popup.iconColor = "error";
            popup.isDismissable = true;
            popup.isLoading = false;
            commit('generalModule/showPopup', popup, { root: true });
        }
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
        console.log(name);
        console.log(email);
        console.log(password);
        
    },
    logout({commit}) {
        userService.logout();

        commit('logoutRequest');
    }
}

const mutations = {
    triggerLogin(state, on) {
        state.isPromptLogin = on;
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