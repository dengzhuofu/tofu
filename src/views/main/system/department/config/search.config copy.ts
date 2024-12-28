const searchConfig = {
  formItems: [
    {
      type: 'select',
      label: '选择部门',
      prop: 'departmentId',
      placeholder: '请选择部门',
      options: []
    },
    {
      type: 'select',
      prop: 'leader',
      label: '部门领导',
      placeholder: '请输入查询的领导名称',
      options: []
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}

export default searchConfig
