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
            component: () => import("../components/No1.vue"),
          },
          {
            path: "No2",
            name: "No2",
            component: () => import("../components/No2.vue"),
          },
          {
            path: "No3",
            name: "No3",
            component: () => import("../components/No3.vue"),
          },
          {
            path: "No4",
            name: "No4",
            component: () => import("../components/No4.vue"),
          },

          {
            path: "No5",
            name: "No5",
            component: () => import("../components/No5.vue"),
          },

          {
            path: "No6",
            name: "No6",
            component: () => import("../components/No6.vue"),
          },

          {
            path: "No7",
            name: "No7",
            component: () => import("../components/No7.vue"),
          },
          {
            path: "Peam",
            name: "Team",
            component: () => import("../components/Team.vue"),
          },
          {
            path: "Position",
            name: "Position",
            component: () => import("../components/Position.vue"),
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
