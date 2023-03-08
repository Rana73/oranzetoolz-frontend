<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogStatus" persistent transition="dialog-bottom-transition" :max-width="500">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Update User Profile</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-btn fab class="ma-0 pa-0" small color="white black--text " @click="close">
            <v-icon medium>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-container fluid>
            <v-form>
              <v-layout class="justify-center" row wrap>
                <v-flex md12>
                  <v-text-field name="name" label="Name" v-model="profile.name" prepend-icon="edit"></v-text-field>
                </v-flex>
                <v-flex md12>
                  <v-text-field name="email" label="Email" v-model="profile.email" v-validate="'required|email'"
                    :error-messages="errors.collect('email')" data-vv-name="email" prepend-icon="edit"></v-text-field>
                </v-flex>
                <v-flex md12>
                  <v-text-field name="mobile" label="Mobile" v-model="profile.mobile" v-validate="'min:11|required'"
                    :error-messages="errors.collect('mobile')" data-vv-name="mobile" prepend-icon="edit"></v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
          <v-divider></v-divider>
          <v-layout>
            <div class="justify-center layout px-0">
              <v-btn color="success" @click="save">Update</v-btn>
            </div>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import Vue from "vue";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);
export default {
  $_veeValidate: {
    validator: "new"
  },
  props: ["dialogStatus", "dialogData"],
  computed: {
    profile() {
      return this.$store.getters.getAuthUser;
    }
  },
  data() {
    return {
      dialog: true,
      user: {
        name: "",
        email: "",
        mobile: "",
      }
    };
  },
  methods: {
    save() {
      let self = this;
      this.$validator.validateAll().then(result => {
        if (result) {
            if (confirm) {
              self.$store
                .dispatch("updateUsersProfile", self.profile)
                .then(success => {
                  this.close();
                });
            }
        }
      });
    },
    close() {
      this.$emit("update:dialogStatus", false);
    }
  }
};
</script>
