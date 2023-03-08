import Vue from "vue";
import Vuex from "vuex";
//util
import notifyUtil from "./util/notifyUtil";
import formNotifyUtil from "./util/formNotifyUtil";
import loadingUtil from "./util/loadingUtil";
import notificationType from "./util/notification-types";
import notification from "./module/notification/notification";
import UserLogin from "./loginModule/UserLogin";
import users from "./module/users/users";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    notifyUtil,
    formNotifyUtil,
    loadingUtil,
    notificationType,
    notification,
    UserLogin,
    users
  },
});

export default store;
