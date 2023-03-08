import { SET_FORMNOTIFY, UNSET_FORMNOTIFY } from "@/store/mutation-types";

// initial state
const state = {
  type: "info", // success, info, warning, error
  msg: "Please Fill Up The Form",
  offOn: false
};
// Getters
const getters = {
  getType(state) {
    return state.type;
  },
  getMsg(state) {
    return state.msg;
  },
  getOffOn(state) {
    return state.offOn;
  }
};
// mutations
const mutations = {
  [SET_FORMNOTIFY](state, payload) {
    state.type = payload.type;
    state.msg = payload.msg;
    state.offOn = true;
  },
  [UNSET_FORMNOTIFY](state) {
    state.type = "info";
    state.msg = "";
    state.offOn = false;
  }
};

export default {
  state,
  getters,
  mutations
};
