import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home'
import User from '../components/User'
import Login from '../components/Login'
import Register from '../components/Register'

import Edit from '../components/actions/Edit'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { 
      path: '/list/:page?',
      name: 'Home',
      redirect: (to) => {
        return { name: "HomeWithPage", params: {page: (to.params.page ? to.params.page : 1)}};
      }
    },
    {
      path: '/list/:page',
      name: 'HomeWithPage',
      component: Home,
      meta: { public: false }
    },
    {
      path: '/add',
      name: 'Add',
      component: Edit,
      meta: { public: false }
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      component: Edit,
      meta: { public: false }
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta: { public: false }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { public: true }
    },
    {
      path: '/sign-in',
      name: 'Login',
      component: Login,
      meta: { public: true }
    }
  ],
})

router.beforeEach((to, from, next) => {
  const authRequired = !to.meta.public;
  const loggedIn = localStorage.getItem('token');

  if (authRequired && !loggedIn)
    return next({name: 'Login'});
  if (!authRequired && loggedIn)
    return next({name: 'Home'});
  
  next();
})

export default router;