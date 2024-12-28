import { localCache } from '@/utils/cache'
import hyRequest from '..'
import { LOGIN_TOKEN } from '@/global/constants'
// import type { productType } from '@/types'

export function getProductInfo(id: string) {
  return hyRequest.get({
    url: `/goods/${id}`,
    headers: {
      Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function getProductList() {
  return hyRequest.post({
    url: `/goods/list`,
    headers: {
      Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    }
  })
}
