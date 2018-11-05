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
                      :value="authUser.email"
                      disabled>
        </b-form-input>
      </b-form-group>
      <b-form-group label="Your login:"
                    label-for="loginInput">
        <b-form-input id="loginInput"
                      type="text"
                      :value="authUser.login"
                      disabled>
        </b-form-input>
      </b-form-group>
      <b-form-group label="Change your password:"
                    label-for="passwordInput">
        <b-form-input id="passwordInput"
                      type="password"
                      v-model="form.password"
                      :state="passwordState"
                      placeholder="Enter new passord">
        </b-form-input>
        <b-form-invalid-feedback id="inputPasswordFeedback">
          This is a required field and must be at least 6 characters
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group>
        <b-form-input id="passwordConfirmInput"
                      type="password"
                      v-model="form.passwordConfirm"
                      :state="passwordConfirmState"
                      placeholder="Confirm new password">
        </b-form-input>
        <b-form-invalid-feedback id="inputPasswordFeedback" v-if="!$v.form.passwordConfirm.minLength || !$v.form.passwordConfirm.required">
          This is a required field and must be at least 6 characters
        </b-form-invalid-feedback>
        <b-form-invalid-feedback id="inputPasswordFeedback" v-if="!$v.form.passwordConfirm.confirm">
          Passwords don't match
        </b-form-invalid-feedback>
      </b-form-group>
      
      <p v-if="status === 'PENDING'">Pending ...</p>
      <p v-if="status === 'ERROR'">Some thing going wrong.</p>
      <p v-if="status === 'OK'">Password was changed</p>
      
      <b-button variant="primary" @click="doChangePassword()">Change password</b-button>
    </b-form>
  </b-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { validationMixin } from "vuelidate"
import { required, minLength, sameAs } from "vuelidate/lib/validators"

export default {
  data () {
    return {
      status: undefined,
      form: {}
    }
  },
  computed: {
    ...mapGetters([
      'authUser'
    ]),
    passwordState () {
      if (this.status != 'INVALID')
        return null;
      return !this.$v.form.password.$invalid;
    },
    passwordConfirmState () {
      if (this.status != 'INVALID')
        return null;
      return !this.$v.form.passwordConfirm.$invalid;
    }
  },
  mixins: [ validationMixin ],
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(6)
      },
      passwordConfirm: {
        required,
        minLength: minLength(6),
        confirm: sameAs('password')
      }
    }
  },
  methods: {
    ...mapActions([
      'changePasswordAction'
    ]),
    doChangePassword() {
        this.status = 'INVALID';
        if (this.$v.$invalid) return;
        this.status = 'PENDING';
      
        this.changePasswordAction({password: this.form.password}).then((res) => {
          if (res.status != 200)
            this.status = 'ERROR';
          else
            this.status = 'OK';
        })
      }
  }
}
</script>