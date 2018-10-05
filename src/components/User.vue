<template>
  <b-card header="Edit Current Profile"
          border-variant="default"
          header-bg-variant="default"
          header-text-variant="default">
    <b-form>
      <b-form-group label="Email address:"
                    label-for="emailInput">
        <b-form-input id="emailInput"
                      type="email"
                      v-model="form.email"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group label="Your login:"
                    label-for="loginInput">
        <b-form-input id="loginInput"
                      type="text"
                      v-model="form.login"
                      required
                      disabled>
        </b-form-input>
      </b-form-group>
      <b-form-group label="Change your password:"
                    label-for="passwordInput">
        <b-form-input id="passwordInput"
                      type="password"
                      v-model="form.password"
                      minlength="6"
                      required
                      placeholder="Enter passord">
        </b-form-input>
      </b-form-group>

      <b-button variant="primary">Edit</b-button>
    </b-form>
  </b-card>
</template>

<script>
//import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      form: {}
    }
  },
  methods: {
//    ...mapMutations([
//      'login'
//    ]),
//    doRegister () {
//      this.$http.post('register', this.form)
//          .then(response => {
//            this.login(response.body);
//            this.$router.push({name:'Home'});
//          });
//    }
  }
}
</script>