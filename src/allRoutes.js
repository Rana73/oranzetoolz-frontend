export default [
  {
    path: "/",
    component: () => import("@/views/util/UserLoginRegister")
  },
  {
    path: "/user-login",
    component: () => import("@/views/util/UserLoginRegister")
  },
  {
    path: "/user-create-account",
    component: () => import("@/views/util/userCreateAccountEmail")
  },
  {
    path: "/user-forget-password",
    component: () => import("@/views/util/userForgetPassword")
  },
  {
    path: "/user-reset-password/:reset_code",
    component: () => import("@/views/util/UserResetPassword")
  },
  {
    path: "/user-set-password/:reset_code",
    component: () => import("@/views/util/UserSetPassword")
  },
  {
    path: "/user/",
    component: () => import("@/layouts/layoutUser.vue"),
    meta: {
      UserLoggedIn: true
    },
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/userPanel/dashboard")
      },
      {
        path: "profile",
        component: () => import("@/views/userPanel/profile")
      },
      {
        path: "create-task",
        component: () => import("@/views/userPanel/manageTask/createTask")
      },
      {
        path: "manage-task",
        component: () => import("@/views/userPanel/manageTask/manageTask")
      },

    ]
  },
];