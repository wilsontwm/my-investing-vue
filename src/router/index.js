import Vue from 'vue'
import VueRouter from 'vue-router'
import News from '../views/News.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'News',
    component: News
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
