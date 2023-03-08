import Axios from "axios";

import {
  SET_USER_LOGGED_IN,
  SET_USER_TOKEN,
  SET_AUTH_USER,
  UNSET_AUTH_USER,
  UNSET_USER_LOGGED_IN,
  UNSET_USER_TOKEN,
} from "../mutation-types";

import { userLoginUrl, userLogoutUrl, frontendBaseUrl, sendUserEmail, checkUserResetPasswordTime, resetUserPassword,sendOTPCreateAccount,verifyOTPCreateAccount,setUserPassword } from "../api";
// initial state
const state = {
  UserLoggedIn: false,
  userToken: "",
  authUser: {},
};

const getters = {
  getAuthUser(state) {
    let user = JSON.parse(localStorage.getItem("user"));
    state.authUser = user;
    return state.authUser ? state.authUser : user;
  },
  getuserToken(state) {
    return state.userToken;
  },
};
const mutations = {
  [SET_USER_LOGGED_IN](state) {
    state.UserLoggedIn = true;
  },
  [UNSET_USER_LOGGED_IN](state) {
    state.UserLoggedIn = false;
  },
  [SET_AUTH_USER](state, user) {
    state.authUser = user;
  },
  [UNSET_AUTH_USER](state) {
    state.authUser = {};
  },
  [SET_USER_TOKEN](state, token) {
    state.userToken = token;
  },
  [UNSET_USER_TOKEN](state) {
    state.userToken = "";
  }
};

const actions = {
  sendUserEmail({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      var params = new URLSearchParams();
      params.append("email", data.email);
      params.append("base_url", frontendBaseUrl);
      Axios.post(sendUserEmail, params)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  sendOTPCreateAccount({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      var params = new URLSearchParams();
      params.append("email", data.email);
      Axios.post(sendOTPCreateAccount, params)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  
  verifyOTPCreateAccount({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      var params = new URLSearchParams();
      params.append("email", data.email);
      params.append("otp", data.otp);
      Axios.post(verifyOTPCreateAccount, params)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  checkUserResetPasswordTime({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      Axios.get(checkUserResetPasswordTime + '/' + data.reset_code, data)
        .then(function (response) {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
    });
  },
  resetUserPassword({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      Axios.post(resetUserPassword + '/' + data.reset_code, data)
        .then(function (response) {
            resolve(response);
        }).catch(error => {
          reject(error);
          return error;
        });
    });
  },
  setUserPassword({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      // data.push({"url":frontendBaseUrl});
      Axios.post(setUserPassword + '/' + data.reset_code, data)
        .then(function (response) {
            resolve(response);
        }).catch(error => {
          reject(error);
          return error;
        });
    });
  },
  loginRequest({ commit }, user) {
    var params = new URLSearchParams();
    localStorage.clear();
    params.append("email", user.email);
    params.append("password", user.password);
    return new Promise((resolve, reject) => {
      Axios.post(userLoginUrl, params)
        .then(function (response) {
          var token = response.data.access_token;
          var expires = response.data.expires_in;
          var user = response.data.data;
          localStorage.setItem("guard", true);
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("user-expires", expires);
          commit("SET_USER_LOGGED_IN");
          commit("SET_AUTH_USER", user);
          commit("SET_USER_TOKEN", token);
          resolve(response);
        })
        .catch(function (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("user-expires");
          commit("UNSET_USER_LOGGED_IN");
          commit("UNSET_AUTH_USER");
          commit("UNSET_USER_TOKEN");
          reject();
        })
        .then((always) => {
        });
    });
  },
  logoutUser({ commit, state }) {
    commit("SET_LOADING", {
      color: "primary",
    });
    let Authorization = `Bearer ${state.userToken}`;
    return new Promise((resolve, reject) => {
      Axios.post(userLogoutUrl, {},
        {
          headers: {
            Authorization: Authorization,
            token_name: "user_token",
          },
        }
      );

      localStorage.removeItem("user_token");
      localStorage.removeItem("user-expires");
      localStorage.removeItem("user");
      localStorage.removeItem("guard");
      localStorage.clear();
      commit("UNSET_USER_LOGGED_IN");
      commit("SET_AUTH_USER");
      commit("UNSET_USER_TOKEN");
      commit("UNSET_LOADING");
      resolve();
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
