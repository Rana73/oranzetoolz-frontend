const state = {
  notification_for_all: 1,
  notification_for_specific_type: 2,
  notification_for_specific_type_id: 3,
  notification_for_specific_user: 4,
  notification_center_type: 2,
  notification_regional_center_type: 3
};

const getters = {
  notiForALL(state) {
    return state.notification_for_all;
  },
  notiForSpecificType(state) {
    return state.notification_for_specific_type;
  },
  notiForSpecificTypeID(state) {
    return state.notification_for_specific_type_id;
  },
  notiForSpecificUser(state) {
    return state.notification_for_specific_user;
  },
  notiCenterType(state) {
    return state.notification_center_type;
  },
  notiRegionalCenterType(state) {
    return state.notification_regional_center_type;
  }
};
const mutations = {};

export default {
  state,
  getters,
  mutations
};
