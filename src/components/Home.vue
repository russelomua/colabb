<template>
<div>
  <b-table :per-page="tablePerPage" sort-by="_id" :current-page="tableCurrent" responsive :fields="fields" :items="getStaff">
    <template slot="index" slot-scope="data">
      {{data.index + (tableCurrent-1)*tablePerPage + 1}}
    </template>
    
    <template slot="name" slot-scope="data">
      {{data.value.last}} {{data.value.first}} {{data.value.middle}}
    </template>

    <template slot="sex" slot-scope="data">
      {{(data.value == 0 ? "Female" : "Male")}}
    </template>

    <template slot="added" slot-scope="data">
      {{data.value | moment().format('DD MMM YYYY')}}
    </template>
    
    <template slot="actions" slot-scope="data">
      <b-button variant="link" size="sm" :to="{name:'Edit', params: {id: data.item._id}}" class="mr-2">edit</b-button>

      <b-button variant="danger" @click="removeStaff(data.item._id)" size="sm">delete</b-button>
    </template>
  </b-table>
  <b-pagination-nav align="center" :use-router="true" :limit="tablePerPage" :number-of-pages="getStaffPages" :link-gen="linkGen" v-model="tableCurrent"></b-pagination-nav>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      tablePerPage: 15,
      tableCurrent: 1,
      //ФИО, пол, контактная информация, дата добавления, оклад, должность.
      fields: [
        'index',
        { key: 'name', label: 'Full Name' },
        'sex',
        'phone',
        'added',
        'salary',
        'position',
        { key: 'actions', label: 'Actions' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'authStatus',
      'getStaff',
      'getStaffLenght'
    ]),
    getStaffPages() {
      return Math.ceil(this.getStaffLenght / this.tablePerPage);
    }
  },
  methods: {
    ...mapActions([
      'loadStaff',
      'removeStaff',
      'changeStaffPage'
    ]),
    linkGen (pageNum) {
      return { name: "Home", params: {page: pageNum}};
    }
  },
  watch: {
    authStatus: function (newVal, oldVal) {
      if ((newVal != oldVal) && (newVal == true))
        this.loadStaff();
    },
    tableCurrent: function(newPage) {
      this.changeStaffPage(newPage);
    }
  },
  mounted(){
    if (this.authStatus)
      this.loadStaff();
  }
}
</script>