import Axios from "axios";
import { SET_NAVBAR_ITEMS } from "@/store/mutation-types";
import { NavigationApi } from "@/store/api";

// initial state
const state = {
  navbarItems: []
};
// Getters
const getters = {
  getNavbarItems(state) {
    return state.navbarItems;
  }
};

// mutations
const mutations = {
  [SET_NAVBAR_ITEMS](state, navbarItems) {
    state.navbarItems = navbarItems;
  }
};

// Actions
const actions = {
  fetchNavbarItems({ commit }) {
    return new Promise((resolve, reject) => {
      Axios.get(NavigationApi)
        .then(function(response) {
          commit("SET_NAVBAR_ITEMS", response.data.data);
          resolve();
        })
        .catch(function(error) {
          reject();
        });
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
