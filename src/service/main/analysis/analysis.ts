import { localCache } from '@/utils/cache'
import hyRequest from '@/service'
import { LOGIN_TOKEN } from '@/global/constants'

export function getAmountListData() {
  return hyRequest.get({
    url: '/goods/amount/list',
    headers: {
      Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function getGoodsCategoryCount() {
  return hyRequest.get({
    url: '/goods/category/count',
    headers: {
      Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function getGoodsCategorySale() {
  return hyRequest.get({
    url: '/goods/category/sale',
    headers: {
      Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function getGoodsCategoryFavor() {
  return hyRequest.get({
    url: '/goods/category/favor',
    headers: {
      Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function getGoodsAddressSale() {
  return hyRequest.get({
    url: '/goods/address/sale',
    headers: {
      Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    }
  })
}
