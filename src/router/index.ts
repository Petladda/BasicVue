import { createRouter,createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import N5 from "../views/N5.vue";

const routes = [
    
    {
      path: '/',
      name: 'Home',
      component: () => import ('../views/Home.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () =>import ('../views/About.vue')
    },
    {
        path: '/N5',
        name: 'N5',
        component: () => import ('../views/N5.vue')
      }
  ]
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router