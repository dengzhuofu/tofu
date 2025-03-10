import { localCache } from '@/utils/cache'
import hyRequest from '@/service'
import { LOGIN_TOKEN } from '@/global/constants'

export function getEntireRoles() {
  return hyRequest.post({
    url: '/role/list',
    headers: {
      token: localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function getEntireDepartments() {
  return hyRequest.post({
    url: '/department/list',
    headers: {
      token: localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function getEntireMenus() {
  return hyRequest.post({
    url: '/menu/list',
    headers: {
      token: localCache.getCache(LOGIN_TOKEN)
    }
  })
}
