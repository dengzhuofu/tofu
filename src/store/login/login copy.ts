import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import type { IAccount } from '@/types'
import { mapMenusToRoutes } from '@/utils/map-menus'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  // 如何制定state的类型
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录, 获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.name = loginResult.data.name
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 2.获取登录用户的详细信息(role信息)
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo
      console.log(userInfoResult)

      // 3.根据角色请求用户的权限(菜单menus)
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus
      console.log(userMenusResult)

      // 4.进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      // 1..请求所有roles/departments数据
      const mainStore = useMainStore()
      mainStore.fetchDepartmentDataAction()
      mainStore.fetchRoleDataAction()
      mainStore.fetchMenusDataAction()

      // 重要: 获取登录用户的所有按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      this.permissions = permissions

      // 根据菜单动态的添加路由对象(独立的文件中)
      // 1.获取菜单(userMenus) 代码写在位置
      // 2.动态获取所有的路由对象，放到数组中路由对象都在独立的文件中从文件中将所有路由对象先读取数组中
      // 3.根据菜单去匹配正确的路由router.addRoute('main', xxx)
      // 5.页面跳转(main页面)
      // 重要: 动态的添加路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      router.push('/main')
    },

    loadLocalCacheAction() {
      // 1.用户进行刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 1..请求所有roles/departments数据
        const mainStore = useMainStore()
        mainStore.fetchDepartmentDataAction()
        mainStore.fetchRoleDataAction()
        mainStore.fetchMenusDataAction()

        // 重要: 获取登录用户的所有按钮的权限
        const permissions = mapMenusToPermissions(userMenus)
        this.permissions = permissions

        // 2.动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
function mapMenusToPermissions(userMenus: any) {
  throw new Error('Function not implemented.')
}
