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
    async loginWithEmailLink({commit}, email) {
        commit('triggerLogin', false);        
        commit('loginRequest', true);
        let popup = {
            message: "Logging in", 
            isDismissable: false, 
            isLoading: true,
            timeout: 10000
        };
        commit('generalModule/showPopup', popup, { root: true });

        const response = await userService.loginWithEmailLink(email);

        if(response.success) {
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            localStorage.setItem('emailForSignIn', response.data);

            popup.message = "An email link to login has been emailed to you. Please check your inbox.";
            popup.icon = "mdi-check-circle-outline";
            popup.iconColor = "success";
            popup.isDismissable = true;
            popup.isLoading = false;
            
        } else {
            popup.message = response.error;
            popup.icon = "mdi-alert-circle-outline";
            popup.iconColor = "error";
            popup.isDismissable = true;
            popup.isLoading = false;
        }
        
        commit('loginRequest', false);
        commit('generalModule/showPopup', popup, { root: true });
    },
    async signInWithEmailLink({commit}) {
        commit('loginRequest', true);
        var user = null;
        // Confirm the link is a sign-in with email link.
        if (userService.isSignInWithEmailLink(location.href)) {
            // Additional state parameters can also be passed via URL.
            // This can be used to continue the user's intended action before triggering
            // the sign-in operation.
            // Get the email if available. This should be available if the user completes
            // the flow on the same device where they started it.
            var email = localStorage.getItem('emailForSignIn');
            if (!email) {
                // User opened the link on a different device. To prevent session fixation
                // attacks, ask the user to provide the associated email again. For example:
                email = window.prompt('Please provide your email for confirmation');
            }

            let popup = {
                message: "Logging in", 
                isDismissable: false, 
                isLoading: true,
                timeout: 10000
            };
            commit('generalModule/showPopup', popup, { root: true });

            const response = await userService.signInWithEmailLink(email, location.href);

            if(response.success) {
                // Clear email from storage.
                localStorage.removeItem('emailForSignIn');

                popup.message = "Login successfully";
                popup.icon = "mdi-check-circle-outline";
                popup.iconColor = "success";
                popup.isDismissable = true;
                popup.isLoading = false;

                user = {
                    name: response.data.Name, 
                    photo: response.data.PicURL, 
                    email: response.data.Email,
                    token: response.data.Token,
                };
            } else {
                popup.message = response.error;
                popup.icon = "mdi-alert-circle-outline";
                popup.iconColor = "error";
                popup.isDismissable = true;
                popup.isLoading = false;
            } 
            
            commit('generalModule/showPopup', popup, { root: true });
        }    
        
        commit('loginRequest', false);
        return user;
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