import hyRequest from '@/service'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
/** 用户的网络请求 */
export function postUsersListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo,
    headers: {
      Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function deleteUserById(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`,
    headers: {
      Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function newUserData(userInfo: any) {
  return hyRequest.post({
    url: '/users',
    data: userInfo,
    headers: {
      Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function editUserData(id: number, userInfo: any) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo,
    headers: {
      Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    }
  })
}

/** 针对页面的网络请求: 增删改查 */
export function postPageListData(pageName: string, queryInfo: any) {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo,
    headers: {
      Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function deletePageById(pageName: string, id: number) {
  return hyRequest.delete({
    url: `/${pageName}/${id}`,
    headers: {
      Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function newPageData(pageName: string, pageInfo: any) {
  return hyRequest.post({
    url: `/${pageName}`,
    data: pageInfo,
    headers: {
      Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function editPageData(pageName: string, id: number, pageInfo: any) {
  return hyRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo,
    headers: {
      Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    }
  })
}
