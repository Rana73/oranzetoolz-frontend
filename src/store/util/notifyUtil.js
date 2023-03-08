import { SET_SNACKBAR, UNSET_SNACKBAR } from "@/store/mutation-types";

// initial state
const state = {
    snackbar: false,
    snackbar_msg: "",
    snackbar_color: "",
    snackbar_timeout: 50000, // default 5s
    snackbar_multiline: true
};
// Getters
const getters = {
    getSnackbar(state) {
        return state.snackbar;
    },
    getSnackbarMsg(state) {
        return state.snackbar_msg;
    },
    getSnackbarColor(state) {
        return state.snackbar_color;
    },
    getSnackbarTimeout(state) {
        return state.snackbar_timeout;
    },
    getSnackbarMultiline(state) {
        return state.snackbar_multiline;
    }
};
// mutations
const mutations = {
    [SET_SNACKBAR](state, payload) {
        state.snackbar = true;
        state.snackbar_msg = payload.msg;
        state.snackbar_color = payload.color;
        state.snackbar_timeout = payload.timeout;
    },
    [UNSET_SNACKBAR](state) {
        state.snackbar = false;
        state.snackbar_msg = "";
        state.snackbar_color = "";
        state.snackbar_timeout = 50000; // default 5s
        state.snackbar_multiline = true;
    }
};

export default {
    state,
    getters,
    mutations
};