<template>
  <b-card :header="`${headerTitle} ${staffData.name.first} ${staffData.name.last}`"
          border-variant="default"
          header-bg-variant="default"
          header-text-variant="default">
    <b-form @submit.prevent="onSubmit">
      <b-row>
        <input type="hidden" name="_id" :value="staffData._id" />
        <b-col md="4" sm="6" xs="12">
          <b-form-group label="First name:"
                        label-for="name_first">
            <b-form-input id="name_first"
                          name="name.first"
                          type="text"
                          :value="staffData.name.first"
                          required
                          placeholder="Worker's first name">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="4" sm="6" xs="12">
          <b-form-group label="Middle name:"
                        label-for="name_middle">
            <b-form-input id="name_middle"
                          name="name.middle"
                          type="text"
                          :value="staffData.name.middle"
                          placeholder="Worker's middle name">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="4" sm="12">
          <b-form-group label="Last name:"
                        label-for="name_last">
            <b-form-input id="name_last"
                          name="name.last"
                          type="text"
                          :value="staffData.name.last"
                          required
                          placeholder="Worker's last name">
            </b-form-input>
          </b-form-group>
        </b-col>
        
        <b-col md="4" sm="12">
          <b-form-group label="Phone nubmer:"
                        label-for="phone">
            <b-form-input id="phone"
                          name="phone"
                          type="tel"
                          pattern="(\+?\d*){7,13}"
                          title="Phone number from 7 to 13 digit"
                          :value="staffData.phone"
                          required
                          placeholder="Worker's contact phone">
            </b-form-input>
          </b-form-group>
        </b-col>
        
        <b-col md="4" sm="6" xs="12">
          <b-form-group label="Sex:"
                        label-for="sex">
            <b-form-select id="sex"
                           name="sex"
                           :value="staffData.sex"
                           :options="sexOptions" />
          </b-form-group>
        </b-col>
        
        <b-col md="4" sm="6" xs="12">
          <b-form-group label="Added date:"
                        label-for="added">
            <b-form-input id="added"
                          name="added"
                          type="date"
                          :value="staffData.added | moment().format('YYYY-MM-DD')">
            </b-form-input>
          </b-form-group>
        </b-col>
        
        <b-col sm="6" xs="12">
          <b-form-group label="Salary:"
                        label-for="salary">
            <b-form-input id="salary"
                          name="salary"
                          type="number"
                          :value="staffData.salary"
                          min="0.00" max="100000.00" step="0.01"
                          required>
            </b-form-input>
          </b-form-group>
        </b-col>
        
        <b-col sm="6" xs="12">
          <b-form-group label="Position:"
                        label-for="position">
            <b-form-input id="position"
                          name="position"
                          type="text"
                          :value="staffData.position"
                          required>
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      
      <div class="float-right">
        <b-button v-if="isEdit" variant="danger" @click="buttonRemove()">Remove</b-button>
        <b-button type="submit" variant="link">Save</b-button>
      </div>
    </b-form>
  </b-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {},
      sexOptions: [
        { text: 'Male', value: 1 },
        { text: 'Female', value: 0 },
      ]
    }
  },
  computed: {
    staffData() {
      if (this.isAdd)
        return { name: { first: '', last: '', middle: '' } };
      return this.$store.getters.getStaffById(this.$route.params.id);
    },
    isEdit() {
      return typeof this.$route.params.id !== 'undefined';
    },
    isAdd() {
      return typeof this.$route.params.id === 'undefined';
    },
    headerTitle() {
      return (this.isEdit ? 'Edit' : 'Add');
    }
  },
  methods: {
    ...mapActions([
      'saveStaff',
      'removeStaff',
      'addStaff'
    ]),
    onSubmit(e) {
      e.preventDefault();
      
      let formData = this.formSerialize(e.target);
      this.form = formData;
      
      //return;
      if (this.isEdit)
        this.saveStaff(formData).then(() => {
          this.$router.push({ name: 'Home' });
        });
    
      if (this.isAdd)
        this.addStaff(formData).then(() => {
          this.$router.push({ name: 'Home' });
        });
    
      
    },
    buttonRemove() {
      this.removeStaff(this.staffData._id);
      this.$router.push({ name: 'Home' });
    },
    buttonAdd() {
      
    },
    formSerialize(from) {
      const formData = new FormData(from);
      let object = {};
      for (const [fieldKey, field] of formData.entries()) {
        let [key, subkey] = fieldKey.split('.');
        if (typeof subkey == 'undefined')
          object[key] = field;
        else {
          object[key] = (typeof object[key] == 'undefined' ? {} : object[key]);
          object[key][subkey] = field;
        }
      }
      return object;
    }
  }
}
</script>