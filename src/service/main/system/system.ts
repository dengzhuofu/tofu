import hyRequest from '@/service'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
/** 用户的网络请求 */
export function postUsersListData(queryInfo: any) {
  return hyRequest.post({
    url: '/user/getUserList',
    data: queryInfo,
    headers: {
      token: localCache.getCache(LOGIN_TOKEN)
    }
    // headers: {
    //   Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    // }
  })
}

export function deleteUserById(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`,
    headers: {
      token: localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function newUserData(userInfo: any) {
  return hyRequest.post({
    url: '/users',
    data: userInfo,
    headers: {
      token: localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function editUserData(id: number, userInfo: any) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo,
    headers: {
      token: localCache.getCache(LOGIN_TOKEN)
    }
  })
}
/** 针对页面的网络请求: 增删改查 */
export function postPageListData(pageName: string, queryInfo: any) {
  const capitalizedPageName =
    pageName.charAt(0).toUpperCase() + pageName.slice(1)
  return hyRequest.post({
    url: `/${pageName}/get${capitalizedPageName}List`,
    data: queryInfo,
    headers: {
      token: localCache.getCache(LOGIN_TOKEN)
    }
  })
}
export function deletePageById(pageName: string, id: string) {
  const capitalizedPageName =
    pageName.charAt(0).toUpperCase() + pageName.slice(1)
  return hyRequest.delete({
    url: `/${pageName}/delete${capitalizedPageName}/${id}`,
    headers: {
      token: localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function newPageData(pageName: string, pageInfo: any) {
  const capitalizedPageName =
    pageName.charAt(0).toUpperCase() + pageName.slice(1)
  return hyRequest.post({
    url: `/${pageName}/add${capitalizedPageName}`,
    data: pageInfo,
    headers: {
      token: localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function editPageData(pageName: string, pageInfo: any) {
  const capitalizedPageName =
    pageName.charAt(0).toUpperCase() + pageName.slice(1)
  console.log('--------------', capitalizedPageName)

  return hyRequest.post({
    url: `/${pageName}/update${capitalizedPageName}`,
    data: pageInfo,
    headers: {
      token: localCache.getCache(LOGIN_TOKEN)
    }
  })
}
