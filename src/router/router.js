import { createRouter, createWebHashHistory } from 'vue-router'

import RootLayout from '/src/layouts/RootLayout.vue'
import PrivateLayout from '/src/layouts/PrivateLayout.vue'
import Home from '/src/pages/Home.vue'
import { useSessionStore } from '@/stores/sessionStore.js'

const routes = [

  {
    path: "/",
    component: RootLayout,
    children: [

      // Public Pages

      { path: "/", component: Home},
      { path: "/about", component: ()=> import('/src/pages/About.vue') },
      { path: "/login", component: ()=> import('/src/pages/Login.vue')},
      { path: "/register", component: ()=> import('/src/pages/Register.vue')},
      { path: "/play", component: ()=> import('/src/pages/Games.vue')},
      { path: "/quick", component: ()=> import('/src/pages/Quick.vue')},
      { path: "/zen", component: ()=> import('/src/pages/Zen.vue')},

      // Private pages
      {
        path: "/rules",
        component: PrivateLayout,
        beforeEnter(to, from, next) {
          useSessionStore().isLogged() ? next() : router.push('/')
        },
        children: [
          {
            path: "",
            component: ()=> import('/src/pages/Rules.vue')
          }
        ]
      },
      {
        path: "/profile",
        component: PrivateLayout,
        beforeEnter(to, from, next) {
          useSessionStore().isLogged() ? next() : router.push('/login')
        },
        children: [
          {
            path: "",
            component: ()=> import('/src/pages/MyProfile.vue')
          }
        ]
      },
      {
        path: "/custom",
        beforeEnter(to, from, next) {
          useSessionStore().isLogged() ? next() : router.push('/')
        },
        component: PrivateLayout,
        children: [
          {
            path: "",
            component: ()=> import('/src/pages/Custom.vue')
          }
        ]
      },

      {
        path: "/create",
        component: PrivateLayout,
        beforeEnter(to, from, next) {
          useSessionStore().isLogged() ? next() : router.push('/login')
        },
        children: [
          {
            path: "",
            component: ()=> import('/src/pages/Create.vue')
          }
        ]
      },

      {
        path: "/records",
        beforeEnter(to, from, next) {
          useSessionStore().isLogged() ? next() : router.push('/login')
        },
        component: PrivateLayout,
        children: [
          {
            path: "",
            component: ()=> import('/src/pages/Records.vue')
          }
        ]
      },

      {
        path: "/room",
        beforeEnter(to, from, next) {
          useSessionStore().isLogged() ? next() : router.push('/login')
        },
        component: PrivateLayout,
        children: [
          {
            path: "",
            component: ()=> import('/src/pages/Room.vue')
          }
        ]
      },

    ]

  },
  {path: "/:pathMatch(.*)*", component: () => import('/src/pages/NotFound404.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes:routes
})

export default router