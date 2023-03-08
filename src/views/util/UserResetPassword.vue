<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <template v-if="credential">
          <v-card class="elevation-1 rounded">
            <v-toolbar color="light-blue darken-4" dark flat>
              <v-layout justify-center>
                <v-toolbar-title>New Password</v-toolbar-title>
              </v-layout>
            </v-toolbar>
            <v-card-text class="pa-0 pt-3 pr-4 pl-3">
              <div class="alert danger" id="alert" v-if="messageShow">
                <p class="text-md-center" style="padding: 5px;color: white;">{{ message }}</p>
              </div>
              <div class="alert info" v-if="messageSuccessShow">
                <p class="text-md-center" style="padding: 5px;color: white;">{{ message }}</p>
              </div>
              <v-form>
                <v-text-field id="password" v-model="user.password" label="Password" name="Password"
                  prepend-icon="password" type="password" v-on:input="showError()" v-validate="'alpha_num|required|min:6'"
                  :error-messages="errors.collect('password')" data-vv-name="password"></v-text-field>
                <v-text-field id="confimrPassword" v-model="user.password_confirmation" label="Confirm Password"
                  name="Confirm Password" prepend-icon="password" type="password" v-on:input="showEmailError()"
                  v-validate="'alpha_num|required|min:6'" :error-messages="errors.collect('password_confirmation')"
                  data-vv-name="password_confirmation"></v-text-field>
                <p id="error" class="text-md-right"></p>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-layout justify-center class="pb-2">
                <v-btn color="error" @click="login">
                  <v-icon left dark>login</v-icon>Login
                </v-btn>
                <v-btn color="light-blue darken-4" @click="savePassword">
                  <v-icon left color="white">edit_square</v-icon><span class="text-white">Update Password</span>
                </v-btn>
              </v-layout>
            </v-card-actions>
            <v-flex mb-4></v-flex>
          </v-card>
        </template>
        <template v-else-if="credentialOut">
          <v-card-text>
            <div style="text-align: center;color:red">
              <h2>{{ message }} <a @click="goForgetPassword" style="text-decoration:underline">Resend Link</a></h2>
            </div>
          </v-card-text>
        </template>
        <template v-else>
          <v-card-text>
            <div style="text-align: center;color:blue">
              Please Wait
            </div>
            <div style="text-align: center;">
              <v-progress-linear color="blue" indeterminate reverse>
              </v-progress-linear>
            </div>
          </v-card-text>
        </template>
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
      expansion: true,
      credential: false,
      credentialOut: false,
      messageShow: false,
      messageSuccessShow: false,
      message: '',
      user: {
        password: "",
        password_confirmation: "",
        reset_code: this.$route.params.reset_code
      }
    };
  },
  created() {
    this.checkCredential();
  },
  computed: {
  },

  methods: {
    login() {
      this.$router.push("/user-login");
    },
    checkCredential() {
      this.$store.dispatch("checkUserResetPasswordTime", this.user)
        .then((response) => {
          if (response.data.data.totalDuration < 5) {
            this.credential = true;
            setTimeout(this.reloadPage, 5 * 60 * 1000);
          }
          else {
            this.credentialOut = true;
            this.message = 'This link is expired !';
          }
        })
        .catch((error) => {
          this.credentialOut = true;
          this.message = 'This link is not valid !';
        })
    },
    savePassword() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.$store
            .dispatch("resetUserPassword", this.user)
            .then(response => {
              if (response.data.status == 'success') {
                this.messageShow = false;
                this.messageSuccessShow = true;
                this.message = response.data.message;
                setTimeout(this.loginPage, 3000);
              }
              else {
                this.messageShow = true;
                this.message = response.data.message[0];
              }
            })
            .catch(error => {
              if (error.response.data.status == 'failed') {
                this.messageShow = true;
                this.message = error.response.data.message;
              }
              console.log(error);
            });
        }
      });

    },
    showError() {
      var p = this.user.password;
      var cp = this.user.password_confirmation;
      if (p.length < 6) {
        this.messageShow = true;
        this.message = "At least 6 character";
        cp.length > 0 ? this.showEmailError() : '';
      }
      else {
        this.messageShow = false;
        cp.length > 0 ? this.showEmailError() : '';
      }
    },
    showEmailError() {
      var p = this.user.password;
      var cp = this.user.password_confirmation;
      if (p == cp) {
        var error = document.getElementById('error');
        error.style.display = "block";
        error.innerHTML = "Password Matched";
        error.style.color = "green";
      } else if (cp != p) {
        var error = document.getElementById('error');
        error.style.display = "block";
        error.innerHTML = "Password Not Matched";
        error.style.color = "red";
      }
    },
    loginPage() {
      this.$router.push('/user-login');
    },
    reloadPage() {
      window.location.reload();
    },
    goForgetPassword() {
      this.$router.push("/user-forget-password");
    },
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
.text-white{
  color: white;
}
.v-progress-linear__bar {
  height: 6px !important;
}
</style>
