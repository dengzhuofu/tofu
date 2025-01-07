const contentConfig = {
  pageName: 'user',
  header: {
    title: '用户列表',
    btnTitle: '新建用户'
  },
  propsList: [
    // 1.selection 2.index
    { type: 'selection', label: '选择', width: '80px' },
    { type: 'index', label: '序号', width: '80px' },

    {
      type: 'custom',
      label: '头像',
      prop: 'avatar',
      width: '220px',
      slotName: 'image'
    },

    { type: 'normal', label: '用户名', prop: 'username', width: '220px' },
    // { type: 'normal', label: '真实姓名', prop: 'realname', width: '120px' },
    // { type: 'normal', label: '密码', prop: 'password', width: '120px' },
    { type: 'normal', label: '手机号', prop: 'mobile', width: '220px' },
    { type: 'normal', label: '角色', prop: 'role', width: '180px' },

    { type: 'status', label: '状态', prop: 'enableStatus', width: '150px' },

    { type: 'timer', label: '创建时间', prop: 'registerDate' },

    { type: 'handler', label: '操作', width: '250px' }
  ]
}

export default contentConfig
