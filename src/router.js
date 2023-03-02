import  Vue  from 'vue';
import Router from "vue-router";
import route from "@route.js"
Vue.use(Router);
const routes = [...route];

const router = new Router({
    mode:"history",
    base:process.env.BASE_URL,
    routes:routes
})

// function ifRouteExist(to) {
//     if (to.fullPath === "/home") {
//       return true;
//     } else if (to.fullPath === "/dashboard") {
//       return true;
//     }else if (to.fullPath === "/exam-dashboard") {
//       return true;
//     }else {
//       let flag = false;
//       var menusNotParsed = localStorage.getItem("menu");
//       if (menusNotParsed) {
//         var menus = JSON.parse(menusNotParsed);
//         var menu = {};
//         var menuChild = {};
//         for (menu of menus) {
//           if (!flag) {
//             for (menuChild of menu.children) {
//               let menuLink = menuChild.link;
//               let toLink = to.fullPath;
//               if (menuLink === toLink) {
//                 flag = true;
//                 break;
//               }
//             }
//           } else {
//             break;
//           }
//         }
//       }
//       return flag;
//     }
//   }
  
//   router.beforeEach((to, from, next) => {
//     var isFalseSet = localStorage.getItem("guard") == "false";
//     // console.log("--->", isFalseSet);
//     if (!isFalseSet) {
//       // console.log("in guard true");
//       try {
//         if (!to.matched.length) {
//           next("/PageNotFound");
//         } else {
//           if (to.matched.some((record) => record.meta.loggedIn)) {
//             const token = localStorage.getItem("token");
//             if (token) {
//               if (ifRouteExist(to)) {
//                 next();
//               } else {
//                 next("/home");
//               }
//             } else {
//               next("/login");
//             }
//           } else if (to.matched.some((record) => record.meta.StudentLoggedIn)) {
//             let token = localStorage.getItem("token");
//             let expires = localStorage.getItem("std-expires");
//             if (token && expires) {
//               next();
//             } else {
//               next("/student-login");
//             }
//           } else if (to.matched.some((record) => record.meta.CollegeLoggedIn)) {
//             let token = localStorage.getItem("token");
//             let expires = localStorage.getItem("college-expires");
//             if (token && expires) {
//               next();
//             } else {
//               next("/c-login");
//             }
//           } else if (to.matched.some((record) => record.meta.CollegeUserLoggedIn)) {
//             let token = localStorage.getItem("token");
//             let expires = localStorage.getItem("cu-expires");
//             if (token && expires) {
//               next();
//             } else {
//               next("/cu-login");
//             }
//           } else {
//             next();
//           }
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     } else {
//       next();
//       console.log("in guard false");
//     }
//   });

export default router;;
