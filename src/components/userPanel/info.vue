<template>
  <v-container grid-list-md>
    <div>
      <userProfileEditFormModal :dialogStatus.sync="dialogStatus" :dialogData.sync="user">
      </userProfileEditFormModal>
    </div>
    <v-layout row wrap v-if="user">
      <v-flex xs9 sm9 md9 layout>
        <div class="mx-4 my-2">
          <table>
            <thead>
              <tr>
                <th align="left">Name</th>
                <th></th>
                <th>:</th>
                <th>{{ user.name }}</th>
              </tr>             
              <tr>
                <th align="left">Mobile</th>
                <th></th>
                <th>:</th>
                <th>{{ user.mobile }}</th>
              </tr>
              <tr>
                <th align="left">Email</th>
                <th></th>
                <th>:</th>
                <th>{{ user.email }}</th>
              </tr>
            </thead>
          </table>
        </div>
      </v-flex>
      <v-btn small color="info" @click="openModal">
        <v-icon left dark>edit_square</v-icon>Edit
      </v-btn>
    </v-layout>
  </v-container>
</template>
<script>

import userProfileEditFormModal from "@/components/userPanel/userProfileEditForm.vue";
export default {
  components: { userProfileEditFormModal },
  data() {
    return {
      dialogStatus: false
    }
  },
  computed: {
    user() {
      return this.$store.getters.getAuthUser;
    }
  },
  methods: {
    openModal() {
      this.dialogStatus = true;
    }
  }
};
</script>
<style>
  th {
    text-align: left;
    padding-left: 5px;
  }
</style>
