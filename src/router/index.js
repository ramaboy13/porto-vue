import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import DetailPortofolio from '../components/portofolio/DetailPortofolio.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App
  },
  {
    path: '/portofolio/:id',
    name: 'DetailPortofolio',
    component: DetailPortofolio,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router