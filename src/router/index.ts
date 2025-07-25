import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login/Login.vue'
import Index from '@/layout/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: Index,
      children: [
        {
          path: 'stage/analy',
          component: () => import('@/views/backstage/Analysis.vue'),
        },
        {
          path: 'stage/visua',
          component: () => import('@/views/backstage/Visualization.vue'),
        },
        {
          path: 'film/cinema',
          component: () => import('@/views/film/Cinema.vue'),
        },
        {
          path: 'film/movie',
          component: () => import('@/views/film/Movie.vue'),
        },
        {
          path: 'film/music',
          component: () => import('@/views/film/Music.vue'),
        },
        {
          path: 'take/com',
          component: () => import('@/views/takeout/Commodity.vue'),
        },
        {
          path: 'take/store',
          component: () => import('@/views/takeout/Store.vue'),
        },
        {
          path: 'car/vxuser',
          component: () => import('@/views/car/VxUser.vue'),
        },
        {
          path: 'car/road',
          component: () => import('@/views/car/Road.vue'),
        },
        {
          path: 'order/detail',
          component: () => import('@/views/order/OrderDetail.vue'),
        },
        {
          path: 'user/index',
          component: () => import('@/views/user/UserList.vue'),
        },
        {
          path: 'user/create',
          component: () => import('@/views/user/UserCreate.vue'),
        },
        {
          path: 'role/index',
          component: () => import('@/views/role/RoleList.vue'),
        },
        {
          path: 'role/create',
          component: () => import('@/views/role/RoleCreate.vue'),
        },
        {
          path: 'auth/index',
          component: () => import('@/views/auth/AuthList.vue'),
        },
        {
          path: 'auth/create',
          component: () => import('@/views/auth/AuthCreate.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to) => {
  let token = null
  try {
    const userInfo = localStorage.getItem('userinfo')
    if (userInfo) {
      token = JSON.parse(userInfo)?.token
    }
  } catch (error) {
    console.error('解析token失败:', error)
  }

  if (to.path === '/login') {
    return true
  } else if (token) {
    return true
  } else {
    return '/login'
  }
})
export default router
