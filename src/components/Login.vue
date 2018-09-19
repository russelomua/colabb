<template>
  <b-card title="Login Page"
          style="max-width: 50%;"
          class="m-5 ml-auto mr-auto">
    <b-form @submit="onSubmit" v-if="show">
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

      <b-button @click="login()" variant="primary">Sign in</b-button>
    </b-form>
  </b-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        email: '',
        name: '',
        food: null,
        checked: []
      },
      foods: [
        { text: 'Select One', value: null },
        'Carrots', 'Beans', 'Tomatoes', 'Corn'
      ],
      show: true
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    onSubmit (evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.email = '';
      this.form.name = '';
      this.form.food = null;
      this.form.checked = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    }
  }
}
</script>