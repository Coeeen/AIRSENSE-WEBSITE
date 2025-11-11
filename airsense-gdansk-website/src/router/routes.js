

// import { useAuthStore } from "stores/auth";
// import { LocalStorage } from "quasar";


// const  = (routes) => {
//   return routes.map((route) => ({
//     ...route,
//     beforeEnter: async (to, from, next) => {
//       await guard(to, from, next);
//     },
//   }));
// };

// const guard = async (to, from, next) => {
//   const accessToken = LocalStorage.getItem("access_token");
//   const refreshToken = LocalStorage.getItem("refresh_token");
//   const { handleRefreshToken } = useAuthStore();

//   if (!accessToken) {
//     if (refreshToken) {
//       try {
//         await handleRefreshToken();
//         next();
//       } catch (e) {
//         LocalStorage.clear();
//         console.error("Błąd odświeżania tokena:", e);
//         next({ name: "login" });
//       }
//     } else {
//       next({ name: "login" });
//     }
//   } else {
//     next();
//   }
// };

const routes = [
  {
    path: "/",
    name: "landing-page",
    component: () => import("src/pages/HomePage.vue"),
  },
  {
    path: "/map",
    name: "map-page",
    component: () => import("src/pages/HomeMapPage.vue"),
  },
  // {
  //   path: "/forgotPassword",
  //   name: "forgotPassword",
  //   component: () => import("src/layouts/LoginLayout.vue"),
  // },
  // {
  //   path: "/reset-password/:key",
  //   name: "resetPassword",
  //   component: () => import("src/pages/RestartPassword.vue"),
  // },
  {
    path: "/dashboard",
    component: () => import("layouts/MainLayout.vue"),
    // beforeEnter: async (to, from, next) => {
    //   console.log("Guard is running for route:", to.path);
    //   await guard(to, from, next);
    // },
    children: [
    {
    path: '/main',
    name:'dashboard-main',
    component: () => import('src/pages/IndexPage.vue'),
    meta: {
      moduleName: "main",
    },
  },
  {
    path: '/main/map',
    name:'dashboard-map',
    component: () => import('src/pages/Maps/MapsMainPage.vue'),
    meta: {
      moduleName: "maps",
    },
  },
  {
    path: '/main/calendar',
    component: () => import('src/pages/Calendar/CalendarMainPage.vue'),
    meta: {
      moduleName: "calendar",
    },
  },
  {
    path: '/main/settings',
    component: () => import('src/pages/Other/SettingsMainPage.vue'),
    meta: {
      moduleName: "settings",
    },
  },
  {
    path: '/main/locations',
    component: () => import('src/pages/Locations/LocationsMainPage.vue'),
    meta: {
      moduleName: "locations",
    },
  },
  {
    path: '/main/raports',
    component: () => import('src/pages/Raports/RaportsMainPage.vue'),
    meta: {
      moduleName: "raports",
    },
  },
  {
    path: '/main/help',
    component: () => import('src/pages/Static/HelpMainPage.vue'),
    meta: {
      moduleName: "help",
    },
  },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
