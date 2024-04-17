import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "",
    name: "root",
    component: () => import("../components/Layout/Main.vue"),
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "employee",
        name: "employee",
        component: () => import("../views/Employee.vue"),
      },
      {
        path: "setting",
        name: "setting",
        component: () => import("../views/Setting.vue"),
        children: [
          {
            path: "No1",
            name: "No1",
            component: () => import("../modules/exambasicvue/No1.vue"),
          },
          {
            path: "No2",
            name: "No2",
            component: () => import("../modules/exambasicvue/No2.vue"),
          },
          {
            path: "No3",
            name: "No3",
            component: () => import("../modules/exambasicvue/No3.vue"),
          },
          {
            path: "No4",
            name: "No4",
            component: () => import("../modules/exambasicvue/No4.vue"),
          },

          {
            path: "No5",
            name: "No5",
            component: () => import("../modules/exambasicvue/No5.vue"),
          },

          {
            path: "No6",
            name: "No6",
            component: () => import("../modules/exambasicvue/No6.vue"),
          },

          {
            path: "No7",
            name: "No7",
            component: () => import("../modules/exambasicvue/No7.vue"),
          },
          {
            path: "Peam",
            name: "Team",
            component: () => import("../modules/team/PageIndex.vue"),
          },
          {
            path: "Position",
            name: "Position",
            component: () => import("../modules/position/PageIndex.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
