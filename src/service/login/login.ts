import { localCache } from '@/utils/cache'
import hyRequest from '..'
import type { IAccount } from '@/types'
import { LOGIN_TOKEN } from '@/global/constants'
// import { localCache } from '@/utils/cache'
// import { LOGIN_TOKEN } from '@/global/constants'

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/user/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/user/${id}`,
    headers: {
      token: localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function getUserMenusByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`,
    headers: {
      token: localCache.getCache(LOGIN_TOKEN)
    }
  })
}
