const state = {
    popup: {
        isDisplay: false, 
        isLoading: false, 
        message: '', 
        isDismissable: false, 
        icon: null, 
        iconColor: '', 
        timeout: 5000
    },
    snackbar: {
        isDisplay: false,
        color: '',
        text: ''
    }
};

const actions = {
    showPopup({commit}, {message, isDismissable, icon, iconColor}) {
        commit('showPopup', {message, isDismissable, icon, iconColor});
    },
    hidePopup({commit}) {
        commit('hidePopup');
    },
    allowDismissablePopup({commit}) {
        commit('allowDismissablePopup');
    },
    showSnackbar({commit}, {text, color}) {
        commit('showSnackbar', {text, color});
    },
    hideSnackbar({commit}) {
        commit('hideSnackbar');
    }
}

const mutations = {
    showPopup(state, {message, isDismissable, isLoading, icon, iconColor, timeout}) {
        state.popup.isDisplay = true;
        state.popup.message = message !== undefined ? message : "Unknown error, please try again later.";
        state.popup.isDismissable = isDismissable;
        state.popup.isLoading = isLoading;
        state.popup.icon = icon !== undefined ? icon : null;
        state.popup.iconColor = iconColor !== undefined ? iconColor : 'primary';
        state.popup.timeout = timeout !== undefined ? timeout : 5000;
    },
    hidePopup(state) {
        state.popup.isDisplay = false;
    },
    allowDismissablePopup(state) {
        state.popup.isDismissable = true;
    },
    showSnackbar(state, {text, color}) {
        state.snackbar.isDisplay = true;
        state.snackbar.color = color;
        state.snackbar.text = text;
    },
    hideSnackbar(state) {
        state.snackbar.isDisplay = false;
        state.snackbar.color = '';
        state.snackbar.text = '';
    }
}

export const generalModule = {
    namespaced: true,
    state,
    actions,
    mutations
}