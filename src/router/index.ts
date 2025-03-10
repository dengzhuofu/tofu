import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'
import { localRoutes } from './main/localRoutes'
const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系: path => component
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/charts',
      component: () => import('@/views/main/charts/index.vue'),
      children: [
        {
          path: '/charts/chartOne',
          component: import('../../src/views/main/charts/pages/page5/index.vue')
        },
        {
          path: '/charts/chartTwo',
          component: import('../../src/views/main/charts/pages/page6/index.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

// const addRoute = {
//   path: '/main/add',
//   component: () => import('../views/main/crud/add/add.vue')
// }

// router.addRoute('main', addRoute)

localRoutes.forEach((item) => {
  router.addRoute('main', item)
})

// // 2.动态的添加路由
router.addRoute('main', localRoutes[0])
// router.addRoute('main', localRoutes[1])

// 导航守卫
// 参数: to(跳转到的位置)/from(从哪里跳转过来)
// 返回值: 返回值决定导航的路径(不返回或者返回undefined, 默认跳转)
// 举个栗子: / => /main
// to: /main from: / 返回值: /abc
router.beforeEach((to) => {
  // 只有登录成功(token), 才能真正进入到main页面
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }

  // 如果是进入到main
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
