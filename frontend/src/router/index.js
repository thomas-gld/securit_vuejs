import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import LoginVerify from '../views/LoginVerify.vue'
import Register from '../views/Register.vue'

const routes = [
   {
    path: '/',
    component: Login
   },
   {
    path: '/login_verify',
    component: LoginVerify    
   },
   {
    path: '/register',
    component: Register
   }
]

const router = createRouter({
   history: createWebHistory('/'),
   routes
})

export default router