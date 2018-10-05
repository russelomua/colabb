import Vue from 'vue';
import Vuex from 'vuex';
import router from './router'

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    auth: {
      status: false,
      user: {}
    },
    staff: [],
    lastStaffPage: 1
  },
  getters: {
    getStaffById: state => _id => {
      return state.staff.filter(staff => staff._id == _id).shift();
    },
    getIndexById: state => _id => {
      let object = state.staff.filter(staff => staff._id == _id).shift();
      return state.staff.indexOf(object);
    },
    getStaff: state => {
      return state.staff;
    },
    getStaffLenght: state => {
      return state.staff.length;
    },
    lastStaffPage: state => {
      return state.lastStaffPage;
    },
    authStatus: state => {
      return state.auth.status;
    },
    authUser: state => {
      return state.auth.user;
    }
  },
  //sync
  mutations: {
    saveStaff (state, staffData) {
      let index = state.staff.indexOf(this.getters.getStaffById(staffData._id));
      if (index >= 0)
        state.staff.splice(index, 1, staffData);
    },
    removeStaff (state, staffId) {
      let index = this.getters.getIndexById(staffId);
      if (index >= 0)
        state.staff.splice(index, 1);
    },
    addStaff (state, staffData) {
      state.staff.push(staffData);
    },
    replaceAllStaff (state, staffs) {
      state.staff = staffs;
    },
    changeStaffPage (state, page) {
      state.lastStaffPage = page;
    },
    login (state, userData) {
      localStorage.setItem('token', userData.token);
      
      state.auth.user = userData;
      state.auth.status = true;
      
      Vue.http.headers.common['x-access-token'] = userData.token;
      router.push({name: "Home", params: {page: ( router.history.current.params.page ? router.history.current.params.page : 1)}});
    },
    logout (state) {
      localStorage.removeItem('token');
      
      state.auth.user = {};
      state.auth.status = false;
      
      delete Vue.http.headers.common['x-access-token'];
      router.push({name: "Login"});
    }
  },
  //aSync
  actions: {
    loadStaff ({ commit }) {
      return new Promise((resolve, reject) => {
        Vue.http.get('api/staff/')
          .then(response => {
            commit('replaceAllStaff', response.body);
            resolve(response)
          })
          .catch(err => reject(err));
      })
    },
    saveStaff ({ commit }, staffData) {
      return new Promise((resolve, reject) => {
        Vue.http.post('api/staff/'+staffData._id, staffData)
          .then(response => {
            commit('saveStaff', response.body);
            resolve(response)
          })
          .catch(err => reject(err));
      })
    },
    removeStaff ({ commit }, staffId) {
      return new Promise((resolve, reject) => {
        Vue.http.delete('api/staff/'+staffId)
          .then(response => {
            commit('removeStaff', staffId);
            resolve(response)
          })
          .catch(err => reject(err));
      })
    },
    addStaff ({ commit }, staffData) {
      return new Promise((resolve, reject) => {
        Vue.http.post('api/staff/', staffData)
          .then(response => {
            commit('addStaff', response.body);
            resolve(response)
          })
          .catch(err => reject(err));
      })
    },
    changeStaffPage ({ commit }, page) {
      commit('changeStaffPage', page);
    },
    
    loginAction ({ commit }, userData) {
      return new Promise((resolve, reject) => {
        Vue.http.post('auth/', userData)
          .then(response => {
            commit('login', response.body);
            resolve(response)
          })
          .catch(err => {
            commit('logout');
            resolve(err);
          });
      })
    },
    loginRestore ({ commit }, token) {
      return new Promise((resolve, reject) => {
        Vue.http.get('auth/', {headers: {'x-access-token': token}})
          .then(response => {
            commit('login', response.body);
            resolve(response)
          })
          .catch(err => {
            commit('logout');
            resolve(err);
          });
      })
    },
    logout ({ commit }, userData) {
      commit('logout', userData);
    },
  }
})