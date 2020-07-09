import Vue from 'vue'
import VueRouter from 'vue-router'
import News from '../views/News.vue'
import LoginWithEmail from '../views/LoginWithEmail.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: News },
  { path: '/login/email', name: 'Login', component: LoginWithEmail }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
