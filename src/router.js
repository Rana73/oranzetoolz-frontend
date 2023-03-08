import Vue from "vue";
import Router from "vue-router";
import allRoutes from "@/allRoutes.js";
Vue.use(Router);
const routes = [...allRoutes];
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes,
});

function ifRouteExist(to) {
  if (to.fullPath === "/dashboard") {
    return true;
  }
}
router.beforeEach((to, from, next) => {
  var isFalseSet = localStorage.getItem("guard") == "false";
  if (!isFalseSet) {
    try {
      if (!to.matched.length) {
        // next("/PageNotFound");
      } else {
        if (to.matched.some((record) => record.meta.loggedIn)) {
          const token = localStorage.getItem("token");
          if (token) {
            if (ifRouteExist(to)) {
              next();
            } else {
              next("/dashboard");
            }
          } else {
            next("/user-login");
          }
        }  else if (to.matched.some((record) => record.meta.UserLoggedIn)) {
          let token = localStorage.getItem("token");
          let expires = localStorage.getItem("user-expires");
          if (token && expires) {
            next();
          } else {
            next("/user-login");
          }
        }else {
          next();
        }
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    next();
    console.log("in guard false");
  }
});

export default router;
