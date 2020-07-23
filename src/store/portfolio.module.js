import { portfolioService } from '../services/portfolio.service';
const state = {
    accounts: [], 
    activeAccount: null, 
    isTriggerManageAccountDialog: false, 
    isRequestInProgress: false, 
    isTriggerDeleteAccountDialog: false, 
    isDeleteRequestInProgress: false,
};

const actions = {
    async getAccounts({commit}) {
        // Clear the accounts stored in state
        commit('clearAccounts');
        let response = await portfolioService.getAccounts();
        
        if(response.success) {
            commit('storeAccounts', response.data);
        }
    },
    initiateManageAccount({commit}, account) {
        commit('initiateManageAccount', account);
    },
    exitManageAccount({commit}) {
        commit('exitManageAccount');
    },
    initiateDeleteAccount({commit}, account) {
        commit('initiateDeleteAccount', account);
    },
    exitDeleteAccount({commit}) {
        commit('exitDeleteAccount');
    },
    async updateAccount({commit}, {id, title}) {
        commit('setIsRequestInProgress', true);

        let response = await portfolioService.updateAccount({id, title});
        
        if(response.success) {
            commit('updateAccount', response.data);
        }
        commit('setIsRequestInProgress', false);

        return response;
    },    
    async createAccount({commit}, {title}) {
        commit('setIsRequestInProgress', true);

        let response = await portfolioService.createAccount({title});
        
        if(response.success) {
            commit('createAccount', response.data);
        }
        commit('setIsRequestInProgress', false);

        return response;
    },    
    async deleteAccount({commit}, {id}) {
        commit('setIsDeleteRequestInProgress', true);

        let response = await portfolioService.deleteAccount({id});
        
        if(response.success) {
            commit('deleteAccount', id);
        }
        commit('setIsDeleteRequestInProgress', false);

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
    initiateManageAccount(state, account) {
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
    initiateDeleteAccount(state, account) {
        state.activeAccount = account;
        state.isTriggerDeleteAccountDialog = true;
    },
    exitDeleteAccount(state) {
        state.activeAccount = null;
        state.isTriggerDeleteAccountDialog = false;
    },
    setIsDeleteRequestInProgress(state, on) {
        state.isDeleteRequestInProgress = on;
    },
    createAccount(state, account) {
        state.accounts.unshift(account);
    },
    updateAccount(state, account) {
        let accounts = state.accounts;
        accounts = accounts.map(function(item) { return item.ID == account.ID ? account : item; });
        state.accounts = accounts;
    },
    deleteAccount(state, id) {
        let accounts = state.accounts;
        accounts = accounts.filter(function(item) { return item.ID != id; });
        state.accounts = accounts;
    }
}

export const portfolioModule = {
    namespaced: true,
    state,
    actions,
    mutations
}