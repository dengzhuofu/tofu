const searchConfig = {
  pageName: 'user',
  formItems: [
    {
      type: 'input',
      prop: 'username',
      label: '用户名',
      placeholder: '请输入查询的用户名'
      // 默认输入的内容
      // initialValue: '请输入查询的部门名称'
    },

    {
      type: 'input',
      prop: 'mobile',
      label: '手机号码',
      placeholder: '请输入查询的手机号码'
    },
    {
      type: 'select',
      prop: 'role',
      label: '角色',
      placeholder: '请输入查询的角色',
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
      placeholder: '请输入查询的状态',
      options: [
        {
          label: '禁用',
          value: '0'
        },
        {
          label: '启用',
          value: '1'
        }
      ]
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}

export default searchConfig
