import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import { generalModule } from './general.module';
import { newsModule } from './news.module';
import { userModule } from './user.module';
import { portfolioModule } from './portfolio.module';

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    generalModule, newsModule, userModule, portfolioModule
  }
})
