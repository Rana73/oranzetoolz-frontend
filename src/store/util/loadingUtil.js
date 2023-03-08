import { SET_LOADING, UNSET_LOADING } from "@/store/mutation-types";

// initial state
const state = {
  loading: false,
  loading_color: ""
};
// Getters
const getters = {
  getLoading(state) {
    return state.loading;
  },
  getLoadingColor(state) {
    return state.loading_color;
  }
};
// mutations
const mutations = {
  [SET_LOADING](state, payload) {
    state.loading = true;
    state.loading_color = payload.color;
  },
  [UNSET_LOADING](state) {
    state.loading = false;
    state.loading_color = "";
  }
};

export default {
  state,
  getters,
  mutations
};
