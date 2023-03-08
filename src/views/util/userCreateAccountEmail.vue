<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-1 rounded">
          <v-toolbar color="light-blue darken-4" dark flat>
            <v-layout justify-center>
              <v-toolbar-title>Create New Account</v-toolbar-title>
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
                <template>
                  <v-text-field v-model="user.email" label="Email" name="email" prepend-icon="mail"
                color="light-blue darken-4" v-validate="'required|email|max:60'" data-vv-as="email"
                :error-messages="errors.collect('email')" data-vv-name="email" :disabled="!visibleEmail"></v-text-field> 
                </template>
                <template v-if="!visibleEmail">
                <v-text-field v-model="user.otp" label="OTP" prepend-icon="pin"
                color="light-blue darken-4" v-validate="'required|numeric|length:6'" data-vv-as="OTP"
                :error-messages="errors.collect('OTP')" data-vv-name="OTP"  :counter="6"></v-text-field> 
                </template>
                  
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-layout justify-center class="pb-2">
              <template>
                <v-btn color="error" @click="goBack">
                <v-icon left dark>keyboard_double_arrow_left</v-icon>Back
              </v-btn>
              </template>            
              <template v-if="sendOTPProgress">
                <v-btn color="light-blue darken-3">
                  <v-progress-circular :width="3" :size="20" color="white" indeterminate></v-progress-circular>
                </v-btn>
              </template>
              <template v-else>
                <v-btn color="light-blue darken-4" @click="sendAction()">
                  <v-icon left color="white">send</v-icon><span class="text-white">{{ buttonText }}</span>
                </v-btn>
              </template>
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
      buttonText: 'SEND OTP',
      sendOTPProgress: false,
      visibleEmail:true,
      set_password_url: "",
      user: {
        email: "",
        otp: "",
      }
    };
  },
  components: {},
  methods: {
    goBack() {
      this.$router.push("/user-login");
    },
    setPasswordPage(url){
      this.$router.push("/user-set-password/"+this.set_password_url);
    },
    sendAction(){
      this.user.otp.length == 6 ? this.verifyOTPCreateAccount() : this.sendOTPCreateAccount();
    },
    sendOTPCreateAccount() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {     
          this.sendOTPProgress = true;
          this.$store
            .dispatch("sendOTPCreateAccount", this.user)
            .then(response => {
                if (response.data.status == 'success') {
                  this.visibleEmail = false;
                  this.sendOTPProgress = false;
                  this.messageErrorShow = false;
                  this.messageShow = true;
                  this.message = response.data.message;
                  this.buttonText = 'VERIFY';
                }
              })
              .catch(error => {
                if (error.response.data.status == 'failed') {
                  this.sendOTPProgress = false;
                  this.buttonText = 'RESEND OTP';
                  this.messageShow = false;
                  this.messageErrorShow = true;
                  this.message = error.response.data.message;
                }
              })
              .then((always) => {
                this.sendOTPProgress = false;
              });
        }
      });
    },
    verifyOTPCreateAccount(){
      this.$validator.validateAll().then(isValid => {
        if (isValid && this.user.otp.length == 6) {     
          this.sendOTPProgress = true;
          this.$store
            .dispatch("verifyOTPCreateAccount", this.user)
            .then(response => {
                if (response.data.status == 'success') {
                  this.visibleEmail = false;
                  this.sendOTPProgress = false;
                  this.messageErrorShow = false;
                  this.messageShow = true;
                  this.message = response.data.message;
                  if(response.data.data != "" && response.data.data!= null){
                    this.set_password_url = response.data.data;
                    setTimeout(this.setPasswordPage, 3000);
                  }               
                }
              })
              .catch(error => {
                if (error.response.data.status == 'failed') {
                  this.sendOTPProgress = false;
                  this.buttonText = 'VERIFY';
                  this.messageShow = false;
                  this.messageErrorShow = true;
                  this.visibleEmail = false;
                  this.message = error.response.data.message;
                }
              })
              .then((always) => {
                this.sendOTPProgress = false;
              });
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
@keyframes animate {
  0% {
    opacity: 0.3;
    color: white;
  }

  50% {
    opacity: 0.7;
  }

  75% {
    opacity: 0.9;
  }

  100% {
    opacity: 1;
    color: yellow;
  }
}
</style>
