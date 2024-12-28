import {
  getEntireDepartments,
  getEntireMenus,
  getEntireRoles
} from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: []
  }),
  actions: {
    async fetchRoleDataAction() {
      const rolesResult = await getEntireRoles()

      // 保存数据
      this.entireRoles = rolesResult.data.list
    },
    async fetchDepartmentDataAction() {
      const departmentsResult = await getEntireDepartments()

      this.entireDepartments = departmentsResult.data.list
      console.log(this.entireDepartments)
    },
    async fetchMenusDataAction() {
      const menusResult = await getEntireMenus()

      this.entireMenus = menusResult.data.list
      console.log(this.entireMenus)
    }
  }
})

export default useMainStore
