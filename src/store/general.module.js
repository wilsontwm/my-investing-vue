const state = {popup: {isDisplay: false, isLoading: false, message: '', isDismissable: false, icon: null, iconColor: '', timeout: 5000}};

const actions = {
    showPopup({commit}, {message, isDismissable, icon, iconColor}) {
        commit('showPopup', {message, isDismissable, icon, iconColor});
    },
    hidePopup({commit}) {
        commit('hidePopup');
    },
    allowDismissablePopup({commit}) {
        commit('allowDismissablePopup');
    }
}

const mutations = {
    showPopup(state, {message, isDismissable, isLoading, icon, iconColor, timeout}) {
        state.popup.isDisplay = true;
        state.popup.message = message;
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
    }
}

export const generalModule = {
    namespaced: true,
    state,
    actions,
    mutations
}