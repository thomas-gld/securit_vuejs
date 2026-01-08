import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import LoginVerify from '../views/LoginVerify.vue'
import Register from '../views/Register.vue'
import RegisterVerify from '../views/registerVerify.vue'
import SetNamePassword from '../views/setNamePassword.vue'
import VisitList from '../views/VisitList.vue'

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
   },
   {
      path: '/register_verify',
      component: RegisterVerify
   },
   {
      path: '/set_name_password',
      component: SetNamePassword
   },
   {
      path: '/visit_list',
      component: VisitList
   }
]

const router = createRouter({
   history: createWebHistory('/'),
   routes
})

export default router