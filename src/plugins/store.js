import Vue from 'vue';
import Vuex from 'vuex';
import router from './router'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: {
      status: false,
      user: {}
    },
    lastStaffId: 5,
    staff: [
      { id: 1, name: { first: 'John', last: 'Doe', middle: 'Vasilievich' }, phone: '+380664480075', sex: 1, added:'2018-06-11', salary: 12000, position: 'Engeneer' },
      { id: 2, name: { first: 'Jane', last: 'Doe' }, sex: 1, added:'2018-11-12', salary: 12000, position: 'Engeneer' },
      { id: 3, name: { first: 'Rubin', last: 'Kincade' }, sex: 0, added:'2018-11-12', salary: 12000, position: 'Engeneer' },
      { id: 4, name: { first: 'Shirley', last: 'Partridge' }, sex: 0, added:'2018-1-12', salary: 12000, position: 'Engeneer' }
    ]
  },
  getters: {
    getStaffById: state => id => {
      return state.staff.filter(staff => staff.id == id).shift();
    },
    getIndexById: state => id => {
      let object = state.staff.filter(staff => staff.id == id).shift();
      return state.staff.indexOf(object);
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
      let index = state.staff.indexOf(this.getters.getStaffById(staffData.id));
      if (index >= 0)
        state.staff.splice(index, 1, staffData);
    },
    removeStaff (state, staffId) {
      let index = this.getters.getIndexById(staffId);
      if (index >= 0)
        state.staff.splice(index, 1);
    },
    addStaff (state, staffData) {
      staffData.id = state.lastStaffId;
      state.lastStaffId++;
      state.staff.push(staffData);
    },
    replaceAllStaff (state, staffs) {
      state.staff = staffs;
    },
    login (state, userData) {
      localStorage.setItem('token', userData.token);
      
      state.auth.user = userData;
      state.auth.status = true;
      router.push({name: "Home"});
    },
    logout (state) {
      localStorage.removeItem('token');
      
      state.auth.user = {};
      state.auth.status = false;
      router.push({name: "Login"});
    }
  },
  //aSync
  actions: {
    loadStaff ({ commit }) {
      return new Promise((resolve, reject) => {
        Vue.http.post('api/staff/')
          .then(response => {
            commit('replaceAllStaff', response.body);
            resolve(response)
          })
          .catch(err => reject(err));
      })
    },
    saveStaff ({ commit }, staffData) {
      commit('saveStaff', staffData);
    },
    removeStaff ({ commit }, staffData) {
      commit('removeStaff', staffData);
    },
    addStaff ({ commit }, staffData) {
      commit('addStaff', staffData);
    },
    loginAction ({ commit }, userData) {
      return new Promise((resolve, reject) => {
        Vue.http.post('auth/', userData)
          .then(response => {
            commit('login', response.body);
            resolve(response)
          })
          .catch(err => reject(err));
      })
    },
    loginRestore ({ commit }, token) {
      return new Promise((resolve, reject) => {
        Vue.http.get('auth/', {headers: {'x-access-token': token}})
          .then(response => {
            commit('login', response.body);
            resolve(response)
          })
          .catch(err => reject(err));
      })
    },
    logout ({ commit }, userData) {
      commit('logout', userData);
    },
  }
})