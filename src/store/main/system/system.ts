import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUsersListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'
import useMainStore from '../main'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0,
    sucCode: 1
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      const { total, list } = usersListResult.data
      this.usersTotalCount = total
      this.usersList = list
    },
    async deleteUserByIdAction(id: number) {
      // 1.删除数据操作
      const deleteResult = await deleteUserById(id)
      console.log(deleteResult)

      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async newUserDataAction(userInfo: any) {
      // 1.创建新的用户
      const newResult = await newUserData(userInfo)
      console.log(newResult)

      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      // 1.更新用户的数据
      const editResult = await editUserData(id, userInfo)
      console.log(editResult)

      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },

    /** 针对页面的数据: 增删改查 */
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { total, list } = pageListResult.data

      this.pageList = list
      this.pageTotalCount = total
    },
    async deletePageByIdAction(pageName: string, id: string) {
      const deleteResult = await deletePageById(pageName, id)
      console.log(deleteResult)
      // this.code = deleteResult.code
      this.postPageListAction(pageName, { pageSize: 10, current: 1 })
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo)

      // console.log(newResult, pageInfo)
      // this.sucCode = newResult.code
      // console.log('111', this.sucCode)

      this.postPageListAction(pageName, { pageSize: 10, current: 1 })
    },
    async editPageDataAction(pageName: string, pageInfo: any) {
      const editResult = await editPageData(pageName, pageInfo)
      console.log(editResult)
      // this.sucCode = editResult.code
      this.postPageListAction(pageName, { pageSize: 10, current: 1 })

      // // 获取完整的数据
      // const mainStore = useMainStore()
      // mainStore.fetchDepartmentDataAction()
      // mainStore.fetchMenusDataAction()
      // mainStore.fetchRoleDataAction()
    }
  }
})

export default useSystemStore
