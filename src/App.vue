<template>
  <b-container>
    <b-navbar toggleable variant="light">
        <b-navbar-brand :to="{ name: 'Home' }">colabb<sup>(oard)</sup></b-navbar-brand>
          <b-navbar-nav class="ml-auto float-right" >
            <b-nav-item v-if="authStatus" @click="logout()">Sign out</b-nav-item>
            <b-nav-item v-if="!authStatus" :to="{ name: 'Login' }">Sign in</b-nav-item>
            <b-nav-item v-if="!authStatus" :to="{ name: 'Register' }">Sign on</b-nav-item>
          </b-navbar-nav>
      </b-navbar>
    <div class="m-3">
    <router-view></router-view></div>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
  
export default {
  name: 'app',
  computed: {
     ...mapGetters([
      'authStatus'
    ])
  },
  methods: {
    ...mapActions([
      'logout'
    ])
  }
}
</script>

<style>

</style>
