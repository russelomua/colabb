<template>
  <b-card :header="`Edit id: ${$route.params.id}`"
          border-variant="primary"
          header-bg-variant="primary"
          header-text-variant="white"
          class="m-3">
    <b-form>
      <b-row>
        <input type="hidden" v-model="staffData.name.id" />
        <b-col md="4" sm="6" xs="12">
          <b-form-group label="First name:"
                        label-for="name_first">
            <b-form-input id="name_first"
                          type="text"
                          v-model="staffData.name.first"
                          required
                          placeholder="Worker's first name">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="4" sm="6" xs="12">
          <b-form-group label="Middle name:"
                        label-for="name_middle">
            <b-form-input id="name_middle"
                          type="text"
                          v-model="staffData.name.middle"
                          required
                          placeholder="Worker's middle name">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="4" sm="12">
          <b-form-group label="Last name:"
                        label-for="name_last">
            <b-form-input id="name_last"
                          type="text"
                          v-model="staffData.name.last"
                          required
                          placeholder="Worker's last name">
            </b-form-input>
          </b-form-group>
        </b-col>
        
        <b-col md="4" sm="12">
          <b-form-group label="Phone nubmer:"
                        label-for="phone">
            <b-form-input id="phone"
                          type="text"
                          v-model="staffData.phone"
                          required
                          placeholder="Worker's contact phone">
            </b-form-input>
          </b-form-group>
        </b-col>
        
        <b-col md="4" sm="6" xs="12">
          <b-form-group label="Sex:"
                        label-for="sex">
            <b-form-radio-group id="sex"
                                buttons
                                button-variant="light"
                                v-model="staffData.sex"
                                :options="sexOptions" />
          </b-form-group>
        </b-col>
        
        <b-col md="4" sm="6" xs="12">
          <b-form-group label="Added date:"
                        label-for="added">
            <b-form-input id="added"
                          type="date"
                          v-model="staffData.added"
                          required>
            </b-form-input>
          </b-form-group>
        </b-col>
        
        <b-col sm="6" xs="12">
          <b-form-group label="Salary:"
                        label-for="salary">
            <b-form-input id="salary"
                          type="number"
                          v-model="staffData.salary"
                          min="0.00" max="100000.00" step="0.01"
                          required>
            </b-form-input>
          </b-form-group>
        </b-col>
        
        <b-col sm="6" xs="12">
          <b-form-group label="Position:"
                        label-for="position">
            <b-form-input id="position"
                          type="text"
                          v-model="staffData.position"
                          required>
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      
      <div class="float-right">
        <b-button variant="danger" @click="buttonRemove()">Remove</b-button>
        <b-button variant="link" @click="buttonSave()">Save</b-button>
      </div>
    </b-form>
  </b-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      sexOptions: [
        { text: 'Male', value: 1 },
        { text: 'Female', value: 0 },
      ]
    }
  },
  computed: {
    staffData() {
      return this.$store.getters.getStaffById(this.$route.params.id);
    }
  },
  methods: {
    ...mapActions([
      'saveStaff',
      'removeStaff'
    ]),
    buttonSave() {
      this.saveStaff(this.staffData);
      this.$router.push({ name: 'Home' });
    },
    buttonRemove() {
      this.removeStaff(this.staffData.id);
      this.$router.push({ name: 'Home' });
    },
  }
}
</script>