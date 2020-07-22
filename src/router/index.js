import Vue from 'vue'
import VueRouter from 'vue-router'
import News from '../views/News.vue'
import Login from '../views/Login.vue'
import LoginWithEmail from '../views/LoginWithEmail.vue'
import PortfolioFund from '../views/portfolio/PortfolioFund.vue'
import PortfolioStocks from '../views/portfolio/PortfolioStocks.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: News },
  { path: '/login', name: 'Login', component: Login },
  { path: '/login/email', name: 'LoginWithEmail', component: LoginWithEmail },
  { path: '/portfolio/stocks', name: 'PortfolioStocks', component: PortfolioStocks },
  { path: '/portfolio/fund', name: 'PortfolioFund', component: PortfolioFund }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
