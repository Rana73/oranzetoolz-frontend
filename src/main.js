import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/vueGoogleCharts";
import "./plugins/apexCharts";
import "./plugins/filter";
import App from "./App.vue";
import router from "./router";
import store from "./store/";
import VueLocalStorage from "vue-localstorage";
import VueSessionStorage from "vue-sessionstorage";
import VeeValidate from "vee-validate";
import VueTimers from "vue-timers";
import Axios from "axios"; // axios
import Notifications from "vue-notification";
import { fb, fs } from "@/plugins/firebase";
import i18n from "./i18n";
import VueLodash from "vue-lodash";
import lodash from "lodash";
import VueCountdown from "@chenfengyuan/vue-countdown";
import axios from "axios";
Vue.component(VueCountdown.name, VueCountdown);
Vue.use(VueLodash, { name: "custom", lodash: lodash });
Vue.use(VueTimers);
Vue.use(VueSessionStorage);
Vue.use(VueLocalStorage);
Vue.use(VeeValidate);
Vue.use(Notifications);
Vue.config.productionTip = false;

// firebase and firestore
Vue.use(fb);
Vue.use(fs);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");


Axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
Axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status == "401") {
      localStorage.clear();
      location.reload();
    }
    return Promise.reject(error);
  }
);
