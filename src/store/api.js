//local
// export const frontendBaseUrl = "http://localhost:8080";
// export const baseURL = "http://127.0.0.1:8000";
//server
export const frontendBaseUrl = "https://orangetoolz-task.ntsoftwareltd.com";
export const baseURL = "https://backend-task.ntsoftwareltd.com";
export const API_URL = baseURL;
export const API_END_POINT = API_URL + "/api/";
// private api prefix
export const prefix = baseURL + "/api/auth/";
export const prefixPublic = baseURL + "/api/";
// login url
export const changePasswordUrl = prefix + "change-password";
//=========================== users utility helper ===========================================
export const sendUserEmail = API_END_POINT + "user/forget-password";
export const checkUserResetPasswordTime = API_END_POINT + "user/check-user-reset-password-time";
export const resetUserPassword = API_END_POINT + "user/reset-password";
export const setUserPassword = API_END_POINT + "user/set-password";
export const userLoginUrl = API_END_POINT + "user/login";
export const sendOTPCreateAccount = API_END_POINT + "user/send-otp-create-account";
export const verifyOTPCreateAccount = API_END_POINT + "user/verify-otp-create-account";
export const userLogoutUrl = API_END_POINT + "user/logout";
export const userProfileUpdate = API_END_POINT + "user/user-profile-update";
//=========================== utility helper ===========================================

// ======================== users panel===========================
export const getTaskItem = `${API_END_POINT}user/get-tasks-item`;
export const getAllTaskItem = `${API_END_POINT}user/get-all-tasks-item`;
export const saveTaskData = `${API_END_POINT}user/save-tasks-item`;
export const updateTaskData = `${API_END_POINT}user/update-tasks-item`;
export const deleteTaskItem = `${API_END_POINT}user/delete-tasks-item`;
export const updateTaskList = `${API_END_POINT}user/update-tasks-progress`;