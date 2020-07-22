import { portfolioService } from '../services/portfolio.service';
const state = {accounts: [], activeAccount: null, isTriggerManageAccountDialog: false, isRequestInProgress: false};

const actions = {
    async getAccounts({commit}) {
        // Clear the accounts stored in state
        commit('clearAccounts');
        let response = await portfolioService.getAccounts();
        
        if(response.success) {
            commit('storeAccounts', response.data);
        }
    },
    initiateEditAccount({commit}, account) {
        commit('initiateEditAccount', account);
    },
    exitManageAccount({commit}) {
        commit('exitManageAccount');
    },
    async updateAccount({commit}, {id, title}) {
        commit('setIsRequestInProgress', true);

        let response = await portfolioService.updateAccount({id, title});
        
        if(response.success) {
            commit('updateAccount', response.data);
        }
        commit('setIsRequestInProgress', false);

        return response;
    }
}

const mutations = {
    storeAccounts(state, accounts) {
        if(accounts.length > 0) {
            state.accounts = accounts;
        }
    },
    clearAccounts(state) {
        state.accounts = [];
    },
    initiateEditAccount(state, account) {
        state.activeAccount = account;
        state.isTriggerManageAccountDialog = true;
    },
    exitManageAccount(state) {
        state.activeAccount = null;
        state.isTriggerManageAccountDialog = false;
    },
    setIsRequestInProgress(state, on) {
        state.isRequestInProgress = on;
    },
    updateAccount(state, account) {
        let accounts = state.accounts;
        accounts = accounts.map(function(item) { return item.ID == account.ID ? account : item; });
        state.accounts = accounts;
    }
}

export const portfolioModule = {
    namespaced: true,
    state,
    actions,
    mutations
}