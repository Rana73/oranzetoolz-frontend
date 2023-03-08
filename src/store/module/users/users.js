


// axios
import Axios from "axios";

// apis
import { 
    userProfileUpdate,
    getTaskItem,
    getAllTaskItem,
    saveTaskData,
    updateTaskData,
    deleteTaskItem,
    updateTaskList
    } from "@/store/api";
// mutation types
import {
    SET_ALL_TASKS,
    UNSET_ALL_TASKS,
    SET_ALL_TASKS_ITEM,
    UNSET_ALL_TASKS_ITEM,
    SET_TASK_ITEM,
    UNSET_TASK_ITEM
} from "../../mutation-types";

// utilities
import { saveMsg, updateMsg, deleteMsg, failedMsg } from "../../erpUtil";

// state../../notifyUtil
const state = {
    get_all_task: [],
    get_all_task_item: [],
    get_task_schema:{
        id: '',
        name: '',
        task_code: '',
        description: '',
        key_points: '',
        start_date: '',
        end_date: '',
        user_id: ''
    }
};

// getters
const getters = {
    // get data lsit
    getTaskItem(state) {
        return state.get_all_task;
    },
    getAllTaskItem(state) {
        return state.get_all_task_item;
    },
    getTaskItemSchema(state){
        return state.get_task_schema
    }
};

// mutations
const mutations = {
    // set all tasks
    [SET_ALL_TASKS](state, tasks) {
        state.get_all_task = tasks;
    },
    // unset all tasks
    [UNSET_ALL_TASKS](state) {
        state.get_all_task = [];
    },
    [SET_ALL_TASKS_ITEM](state, tasks) {
        state.get_all_task_item = tasks;
    },
    // unset all tasks
    [UNSET_ALL_TASKS_ITEM](state) {
        state.get_all_task_item = [];
    },
    [SET_TASK_ITEM](state, item) {
        state.get_task_schema = item;
    },
    // unset all tasks
    [UNSET_TASK_ITEM](state) {
        state.get_task_schema = {
            id: '',
            name: '',
            task_code: '',
            description: '',
            key_points: '',
            start_date: '',
            end_date: '',
            user_id: '' 
        }
    },
};

const actions = {
    updateUsersProfile({ state, commit }, data) {
        Axios.post(userProfileUpdate, data)
            .then((response) => {
                commit("SET_SNACKBAR", {
                    msg: response.data.message,
                    color: "green"
                });
            })
            .catch((error) => {
                console.log('errorrr', error.response)
                commit("SET_SNACKBAR", {
                    msg: error.response.data.message,
                    color: "red"
                });
            })
            ;
    },
    getTaskItem({ commit, state }) {
        commit("SET_LOADING", {
            color: "primary",
          });
        return new Promise(function (resolve, reject) {
          Axios.get(getTaskItem)
            .then((response) => {
                if(response.data.data.length > 0){
                    commit('SET_ALL_TASKS',response.data.data);
                    commit("UNSET_LOADING");
                }
                else{
                    commit('UNSET_ALL_TASKS');
                }
              resolve(response)
            })
            .catch((error) => {
                commit('UNSET_ALL_TASKS');
              reject(error)
            })
            .then(always => {
                commit("UNSET_LOADING");
            })
        })
    },
    getAllTaskItem({ commit, state }) {
        commit("SET_LOADING", {
            color: "primary",
          });
        return new Promise(function (resolve, reject) {
          Axios.get(getAllTaskItem)
            .then((response) => {
                if(response.hasOwnProperty('data') && response.data.hasOwnProperty('data')){
                    if(response.data.data.all.length > 0){
                        commit('SET_ALL_TASKS_ITEM',response.data.data);
                        commit("UNSET_LOADING");
                    }
                    else{
                        commit('UNSET_ALL_TASKS_ITEM');
                    }
                }
                
              resolve(response)
            })
            .catch((error) => {
                commit('UNSET_ALL_TASKS_ITEM');
              reject(error)
            })
            .then(always => {
                commit("UNSET_LOADING");
            })
        })
    },
    saveTaskData({ state, commit }, data) {
        return new Promise(function (resolve, reject) {
        Axios.post(saveTaskData, data)
            .then((response) => {
                resolve(response);
                commit("SET_SNACKBAR", {
                    msg: response.data.message,
                    color: "green"
                });    
            })
            .catch((error) => {
                reject()
                commit("SET_SNACKBAR", {
                    msg: error.response.data.message,
                    color: "red"
                });
                
            })
        });
    },
    updateTaskData({ state, commit }, data) {
        return new Promise(function (resolve, reject) {
        Axios.post(updateTaskData, data)
            .then((response) => {
                resolve(response);
                commit("SET_SNACKBAR", {
                    msg: response.data.message,
                    color: "green"
                });    
            })
            .catch((error) => {
                reject()
                commit("SET_SNACKBAR", {
                    msg: error.response.data.message,
                    color: "red"
                });
                
            })
        });
    },
    deleteTaskItem({ state, commit }, data) {
        return new Promise(function (resolve, reject) {
        Axios.post(deleteTaskItem, {id:data})
            .then((response) => {
                resolve(response);
                commit("SET_SNACKBAR", {
                    msg: response.data.message,
                    color: "green"
                });    
            })
            .catch((error) => {
                reject()
                commit("SET_SNACKBAR", {
                    msg: error.response.data.message,
                    color: "red"
                });
                
            })
        });
    },
    updateTaskList({ state, commit }, data) {
        Axios.post(updateTaskList, data)
            .then((response) => {
                console.log('updated')  
            })
            .catch((error) => {
                console.log('update failed', )
            });          
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};
