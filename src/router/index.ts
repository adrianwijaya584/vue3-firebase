import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { getCurrentUser } from 'vuefire';

const routes: RouteRecordRaw[]=  [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: ()=> import('@/views/NotFound.vue')
  },
  {
    path: '/',
    name: 'home',
    component: ()=> import("@/views/HomeView.vue")
  },
  {
    path: '/landing',
    name: 'landingPage',
    component: ()=> import("@/views/landing.vue")
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: "/auth",
    name: "Auth Google",
    component: ()=> import("@/views/auth.vue")
  },
  {
    path: "/test",
    meta: {
      needAuth: true,
    },
    component: ()=> import("@/views/HomeView.vue")
  },
  {
    path: "/dashboard",
    component: ()=> import("@/components/dashboardLayout.vue"),
    name: "DashboardLayout",
    meta: {
      needAuth: true,
    },
    children: [
      {
        path: "",
        component: ()=> import("@/views/dashboard/index.vue")
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPos) {
    return {
      top: 0
    }
  },
})

router.beforeEach(async (to, from, next)=> {
  if (to.meta?.needAuth) {    
    const currentUser= await getCurrentUser()

    if (!currentUser) {
      alert("please login to continue.")
      next("/auth")
    }
  }

  next()
})

export default router
