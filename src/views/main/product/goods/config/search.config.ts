const searchConfig = {
  pageName: 'goods',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '商品名称',
      placeholder: '请输入查询的商品名称'

      // 默认输入的内容
      // initialValue: '请输入查询的部门名称'
    },
    {
      type: 'input',
      prop: 'oldPrice',
      label: '原价',
      placeholder: '请输入查询的原价'
    },
    {
      type: 'input',
      prop: 'newPrice',
      label: '现价',
      placeholder: '请输入查询的现价'
    },

    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}

export default searchConfig
