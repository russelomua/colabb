<template>
  <b-container>
    <b-navbar toggleable variant="light">
        <b-navbar-brand :to="{ name: 'Home', params: {page: lastStaffPage} }">colabb<sup>(oard)</sup></b-navbar-brand>
          <b-navbar-nav class="ml-auto float-right" >
            <b-nav-item pills variant="success" v-if="authStatus" :to="{ name: 'Add' }">Add new collaborator</b-nav-item>
            <b-nav-item-dropdown right v-if="authStatus">
              <!-- Using button-content slot -->
              <template slot="button-content">
                <em>{{`${authUser.login} (${authUser.email})`}}</em>
              </template>
              <b-dropdown-item :to="{ name: 'User' }">Profile</b-dropdown-item>
              <b-dropdown-item @click="doLogout()">Sign out</b-dropdown-item>
            </b-nav-item-dropdown>
            
            <b-nav-item v-if="!authStatus" :to="{ name: 'Login' }">Sign in</b-nav-item>
            <b-nav-item v-if="!authStatus" :to="{ name: 'Register' }">Sign up</b-nav-item>
          </b-navbar-nav>
      </b-navbar>
    <div class="m-3">
      <router-view></router-view>
    </div>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
  
export default {
  name: 'app',
  computed: {
     ...mapGetters([
      'authStatus',
      'authUser',
      'lastStaffPage'
    ]),
    authToken() {
      return localStorage.getItem('token');
    }
  },
  methods: {
    ...mapActions([
      'logout',
      'loginRestore'
    ]),
    doLogout() {
      this.logout();
      this.$router.push({name: 'Login'});
    }
  },
  mounted() {
    this.loginRestore(this.authToken);
  }
}
</script>

<style>

</style>
