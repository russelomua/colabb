import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: {
      status: false,
      login: "login",
      email: "my@gmail.com"
    },
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
      //if (index >= 0)
        state.staff.splice(index, 1);
    },
    login (state, userData) {
      state.auth.status = true;
    },
    logout (state, userData) {
      state.auth.status = false;
    }
  },
  //aSync
  actions: {
    saveStaff ({ commit, state }, staffData) {
      commit('saveStaff', staffData);
    },
    removeStaff ({ commit, state }, staffData) {
      commit('removeStaff', staffData);
    },
    login ({ commit, state }, userData) {
      commit('login', userData);
    },
    logout ({ commit, state }, userData) {
      commit('logout', userData);
    },
  }
})