import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import { newsModule } from './news.module';
import { userModule } from './user.module';

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
    newsModule, userModule
  }
})
