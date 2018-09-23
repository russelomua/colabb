<template>
  <b-card title="Register Page"
          style="max-width: 50%;"
          class="m-5 ml-auto mr-auto">
    <b-form>
      <b-form-group label="Email address:"
                    label-for="emailInput">
        <b-form-input id="emailInput"
                      type="email"
                      v-model="form.email"
                      required
                      placeholder="Enter email">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Your login:"
                    label-for="loginInput">
        <b-form-input id="loginInput"
                      type="text"
                      v-model="form.login"
                      required
                      placeholder="Enter login">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Your password:"
                    label-for="passwordInput">
        <b-form-input id="passwordInput"
                      type="password"
                      v-model="form.password"
                      minlength="6"
                      required
                      placeholder="Enter passord">
        </b-form-input>
      </b-form-group>

      <b-button @click="doRegister()" variant="primary">Create account</b-button>
    </b-form>
  </b-card>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      form: {}
    }
  },
  methods: {
    ...mapMutations([
      'login'
    ]),
    doRegister () {
      this.$http.post('user', this.form)
          .then(response => {
            this.login(response.body);
            this.$router.push({name:'Home'});
          });
    }
  }
}
</script>