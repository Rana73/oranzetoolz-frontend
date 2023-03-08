<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-1 rounded">
          <v-toolbar color="light-blue darken-4" dark flat>
            <v-layout justify-center>
              <v-toolbar-title>Reset Password</v-toolbar-title>
            </v-layout>

          </v-toolbar>
          <v-card-text class="pa-0 pt-3 pr-4 pl-3">
            <div class="alert info" id="alerts" v-if="messageShow">
              <p class="text-md-center" style="padding: 5px;color: white;">{{ message }}</p>
            </div>
            <div class="alert danger" v-if="messageErrorShow">
              <p class="text-md-center" style="padding: 5px;color: white;">{{ message }}</p>
            </div>
            <v-form>
              <v-text-field v-model="user.email" label="Email" name="email" id="email"
                v-validate="'required|email|max:60'" :error-messages="errors.collect('email')" data-vv-name="email"
                prepend-icon="email"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-layout justify-center class="pb-2">
              <v-btn color="error" @click="goBack">
                <v-icon left dark>keyboard_double_arrow_left</v-icon>Back
              </v-btn>
              <v-btn color="light-blue darken-4" @click="sendEmail" v-if="buttonStatus">
                <v-icon left color="white">send</v-icon><span class="text-white">{{ buttonText }}</span>
              </v-btn>
              <v-btn color="light-blue darken-4" v-else>
                <v-progress-circular :width="3" color="white" indeterminate style="width:20px"></v-progress-circular>
              </v-btn>
            </v-layout>
          </v-card-actions>
          <v-flex mb-4></v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  $_veeValidate: {
    validator: "new"
  },
  data() {
    return {
      messageShow: false,
      messageErrorShow: false,
      message: '',
      buttonStatus: true,
      buttonText: 'SEND LINK',
      user: {
        email: ""
      }
    };
  },
  computed: {
  },
  methods: {
    goBack() {
      this.$router.push("/user-login");
    },
    sendEmail() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          var email = document.getElementById("email");
          if (email.value.trim() == "") {
            alert("Email is required");
          } else {
            this.buttonStatus = false;
            this.$store
              .dispatch("sendUserEmail", this.user)
              .then(response => {
                if (response.data.status == 'success') {
                  this.buttonStatus = true;
                  this.messageErrorShow = false;
                  this.messageShow = true;
                  this.message = response.data.message;
                  this.buttonText = 'RESEND LINK';
                }
              })
              .catch(error => {
                if (error.response.data.status == 'failed') {
                  this.buttonStatus = true;
                  this.buttonText = 'RESEND LINK';
                  this.messageShow = false;
                  this.messageErrorShow = true;
                  this.message = error.response.data.message;
                }
              });
          }
        }
      });


    }
  },
  mounted() {
    localStorage.clear();
  }
};
</script>

<style scoped>
.rounded {
  border-radius: 7px;
}
.text-white{
  color: white;
}
.danger {
  background-color: red;
}
</style>
