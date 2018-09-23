<template>
  <b-card title="Login Page"
          style="max-width: 50%;"
          class="m-5 ml-auto mr-auto">
    <b-form>
      <b-form-group label="Your login:"
                    label-for="login">
        <b-form-input id="login"
                      type="text"
                      v-model="form.login"
                      required
                      placeholder="Enter login">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Your password:"
                    label-for="password"
                    description="We'll never share your email with anyone else.">
        <b-form-input id="password"
                      type="password"
                      v-model="form.password"
                      required
                      placeholder="Enter password">
        </b-form-input>
      </b-form-group>

      <b-button @click="doLogin()" variant="primary">Sign in</b-button>
    </b-form>
  </b-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {}
    }
  },
  methods: {
    ...mapActions([
      'loginAction'
    ]),
    doLogin() {
      this.loginAction(this.form)
    }
  }
}
</script>