import type { IModalConfig } from '@/components/page-modal/type'

const modalConfig: IModalConfig = {
  pageName: 'user',
  header: {
    newTitle: '新建用户',
    editTitle: '编辑用户'
  },
  formItems: [
    {
      type: 'input',
      prop: 'username',
      label: '用户名',
      placeholder: '请输入用户名'
    },

    {
      type: 'input',
      prop: 'password',
      label: '密码',
      placeholder: '请输入密码'
    },
    {
      type: 'input',
      prop: 'mobile',
      label: '手机号码',
      placeholder: '请输入手机号码'
    },
    {
      type: 'select',
      prop: 'role',
      label: '角色',
      placeholder: '请选择角色',
      options: [
        { label: '管理员', value: 2 },
        { label: '招聘者', value: 1 },
        { label: '求职者', value: 0 }
      ]
    },
    {
      type: 'select',
      prop: 'enableStatus',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  ]
}

export default modalConfig
