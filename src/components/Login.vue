<template>
  <b-card title="Login Page"
          style="max-width: 50%;"
          class="m-5 ml-auto mr-auto">
    <b-form @submit.prevent="doLogin" novalidate>
      <b-form-group label="Your login:"
                    label-for="login">
        <b-form-input id="login"
                      type="text"
                      v-model="form.login"
                      :state="loginState"
                      aria-describedby="inputLoginFeedback"
                      required
                      placeholder="Enter login">
        </b-form-input>
        <b-form-invalid-feedback id="inputLoginFeedback">
          This is a required field and must be at least 3 characters
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Your password:"
                    label-for="password">
        <b-form-input id="password"
                      type="password"
                      v-model="form.password"
                      :state="passwordState"
                      aria-describedby="inputPasswordFeedback"
                      required
                      placeholder="Enter password">
        </b-form-input>
        <b-form-invalid-feedback id="inputPasswordFeedback">
          This is a required field and must be at least 3 characters
        </b-form-invalid-feedback>
      </b-form-group>
      
      <p v-if="status === 'PENDING'">Pending ...</p>
      <p v-if="status === 'ERROR'">Wrong login or password</p>
      
      <b-button type="submit" variant="primary">Sign in</b-button>
    </b-form>
  </b-card>
</template>

<script>
  import { mapActions } from 'vuex'
  import { validationMixin } from "vuelidate"
  import { required, minLength } from "vuelidate/lib/validators"

  export default {
    data () {
      return {
        status: undefined,
        form: {
          login: '',
          password: ''
        }
      }
    },
    mixins: [ validationMixin ],
    validations: {
      form: {
        login: {
          required,
          minLength: minLength(3)
        },
        password: {
          required,
          minLength: minLength(3)
        }
      }
    },
    computed: {
      loginState () {
        if (this.status != 'INVALID')
          return null;
        return !this.$v.form.login.$invalid;
      },
      passwordState () {
        if (this.status != 'INVALID')
          return null;
        return !this.$v.form.password.$invalid;
      }
    },
    methods: {
      ...mapActions([
        'loginAction'
      ]),
      doLogin() {
        this.status = 'INVALID';
        if (this.$v.$invalid) return;
        this.status = 'PENDING';
      
        this.loginAction(this.form).then((res) => {
          if (res.status != 200)
            this.status = 'ERROR';
          else
            this.status = 'OK';
        })
      }
    },
    mounted() {
      this.$v.$reset();
    }
  }
</script>