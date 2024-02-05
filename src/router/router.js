import { createRouter, createWebHashHistory } from 'vue-router'

import NotFound404 from '/src/pages/NotFound404.vue'
import RootLayout from '/src/layouts/RootLayout.vue'
import PrivateLayout from '/src/layouts/PrivateLayout.vue'
import Home from '/src/pages/Home.vue'


const routes = [

  {
    path: "/",
    component: RootLayout,
    children: [

      // Public Pages

      { path: "/", component: Home},
      { path: "/about", component: ()=> import('/src/pages/About.vue') },
      { path: "/play", component: ()=> import('/src/pages/Login.vue')},
      { path: "/register", component: ()=> import('/src/pages/Register.vue')},

      // Private pages

      {
        path: "/games",
        component: PrivateLayout,
        children: [
          {
            path: "",
            component: ()=> import('/src/pages/Games.vue')
          }
        ]
      },
      {
        path: "/quick",
        component: PrivateLayout,
        children: [
          {
            path: "",
            component: ()=> import('/src/pages/Quick.vue')
          }
        ]
      },
      {
        path: "/mirror",
        component: PrivateLayout,
        children: [
          {
            path: "",
            component: ()=> import('/src/pages/Mirror.vue')
          }
        ]
      },
      {
        path: "/exploding",
        component: PrivateLayout,
        children: [
          {
            path: "",
            component: ()=> import('/src/pages/Exploding.vue')
          }
        ]
      },
      {
        path: "/zen",
        component: PrivateLayout,
        children: [
          {
            path: "",
            component: ()=> import('/src/pages/zen.vue')
          }
        ]
      },
      {
        path: "/profile",
        component: PrivateLayout,
        children: [
          {
            path: "",
            component: ()=> import('/src/pages/MyProfile.vue')
          }
        ]
      },
      {
        path: "/find",
        component: PrivateLayout,
        children: [
          {
            path: "",
            component: ()=> import('/src/pages/FindQuizzes.vue')
          }
        ]
      },
      {
        path: "/ranks",
        component: PrivateLayout,
        children: [
          {
            path: "",
            component: ()=> import('/src/pages/Ranks.vue')
          }
        ]
      },
      {
        path: "/create",
        component: PrivateLayout,
        children: [
          {
            path: "",
            component: ()=> import('/src/pages/Create.vue')
          }
        ]
      },

    ]

  },
  {path: "/:pathMatch(.*)*", component: ()=> NotFound404}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes:routes
})

export default router