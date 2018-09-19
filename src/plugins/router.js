import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'

import Edit from '../components/actions/Edit'

import store from './store'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.authStatus) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.authStatus) {
    next()
    return
  }
  next({name: 'Login'})
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/add',
      name: 'Add',
      component: Edit,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      component: Edit,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/sign-in',
      name: 'Login',
      component: Login,
      beforeEnter: ifNotAuthenticated
    }
  ],
})