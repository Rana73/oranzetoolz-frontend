import { fb, fs } from "@/plugins/firebase";
import firebase from "firebase/app";
import { SET_NOTIFICATION } from "../../mutation-types";

const state = {
  notifications: []
};
const getters = {
  getNotifications(state) {
    return state.notifications;
  }
};
// mutations
const mutations = {
  [SET_NOTIFICATION](state, notification) {
    state.notifications = notification;
  }
};
// Actions
const actions = {
  getNotification({ commit, dispatch, getters }, payload) {
    let FOR_SPECIFIC_TYPE_ID = getters.notiForSpecificTypeID;
    let FOR_ALL = getters.notiForALL;
    var matchedNotifications = [];

    dispatch("getAuthUserType").then(resType => {
      let authUserType = resType;
      matchedNotifications = [];
      dispatch("getAuthUserTypeID").then(resTypeId => {
        let authUserTypeID = resTypeId;
        return new Promise((resolve, reject) => {
          fs.collection("notifications")
            .where("noti_type", "==", FOR_SPECIFIC_TYPE_ID)
            .where("r_type", "==", authUserType)
            .where("r_type_id", "==", authUserTypeID)
            .onSnapshot(function(querySnapshot) {
              querySnapshot.docChanges().forEach(function(doc) {
                matchedNotifications.push(doc.doc.data());
              });
            });
          fs.collection("notifications")
            .where("noti_type", "==", FOR_ALL)
            .onSnapshot(function(querySnapshot) {
              querySnapshot.docChanges().forEach(function(doc) {
                matchedNotifications.push(doc.doc.data());
              });
            });
          commit("SET_NOTIFICATION", matchedNotifications);
        });
      });
    });
  },
  sendNotification({ commit, state }, payload) {
    var matchedNotifications = [];
    let data = {};
    try {
      data = {
        main_title: payload.main_title,
        main_body: payload.main_body,
        noti_type: payload.noti_type,
        r_type: payload.r_type,
        r_type_id: payload.r_type_id,
        r_user_id: payload.r_user_id,
        s_type: payload.s_type, // needs to be filled
        s_type_id: payload.s_type_id, // needs to be filled
        s_user_id: payload.s_user_id, // needs to be filled
        linkto: payload.linkto,
        date: new firebase.firestore.Timestamp.fromDate(new Date())
      };
    } catch (err) {
      console.log(err);
    }
    return new Promise((resolve, reject) => {
      fs.collection("notifications")
        .add(data)
        .then(() => {
          resolve("success");
        })
        .catch(() => {
          reject("failed");
        });
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
