<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-1 rounded">
          <v-toolbar color="light-blue darken-4" dark flat>
            <v-layout justify-start>
              <v-toolbar-title>Login</v-toolbar-title>
            </v-layout>
            <v-layout justify-end>
              <a @click="goCreateAccount" class="text-center register">Create Account ?</a>
            </v-layout>
          </v-toolbar>
          <v-card-text class="pa-0 pt-3 pr-4 pl-3">
            <v-form>
              <v-text-field v-model="user.email" label="Email" name="email" prepend-icon="mail"
                color="light-blue darken-4" v-validate="'required|email|max:60'" data-vv-as="email"
                :error-messages="errors.collect('email')" data-vv-name="email"></v-text-field>
              <v-text-field v-model="user.password" label="Password" name="password" prepend-icon="password" type="password"
                color="light-blue darken-4" v-validate="'alpha_num|required|min:6'"
                :error-messages="errors.collect('password')" data-vv-name="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-layout justify-center class="pb-2">
              <template v-if="loginProgress">
                <v-btn color="light-blue darken-3">
                  <v-progress-circular :width="3" :size="20" color="white" indeterminate></v-progress-circular>
                </v-btn>
              </template>
              <template v-else>
                <v-btn color="light-blue darken-4" @click="loginRequest">
                  <v-icon left color="white">login</v-icon><span class="text-white">Login</span>
                </v-btn>
              </template>
              <a @click="goForgetPassword" class="text-center mt-2 ml-3">
                Forget Password ?
              </a>
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
      loginProgress: false,
      user: {
        password: "",
        email: ""
      }
    };
  },
  components: {},
  methods: {
    goHome() {
      this.$router.push("/user/dashboard");
    },
    goCreateAccount(){
      this.$router.push('/user-create-account')
    },
    goForgetPassword() {
      this.$router.push("/user-forget-password");
    },
    loginRequest() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) {
          this.loginProgress = true;
          this.$store
            .dispatch("loginRequest", this.user)
            .then((response) => {
              this.$router.push("/user/dashboard");
            })
            .catch((error) => {
              alert("Email or password is incorrect");
            })
            .then((always) => {
              this.loginProgress = false;
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
.register {
  text-decoration: underline;
  font-size: 15px;
  color: white;
  animation: animate 1.5s linear infinite;
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
