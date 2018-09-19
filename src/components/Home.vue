<template>
  <b-table :fields="fields" :items="staff">
    <!-- A virtual column -->
    <template slot="index" slot-scope="data">
      {{data.index + 1}}
    </template>
    <!-- A custom formatted column -->
    <template slot="name" slot-scope="data">
      {{data.value.last}} {{data.value.first}} {{data.value.middle}}
    </template>
    <!-- A virtual composite column -->
    <template slot="actions" slot-scope="data">
      <b-button variant="link" size="sm" :to="{name:'Edit', params: {id: data.item.id}}" class="mr-2">edit</b-button>

      <b-button variant="danger" @click="removeStaff(data.item.id)" size="sm">delete</b-button>
    </template>
  </b-table>

</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
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
    staff() {
      return this.$store.state.staff;
    }
  },
  methods: {
    ...mapActions([
      'removeStaff'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
