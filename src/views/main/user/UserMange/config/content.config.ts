const contentConfig = {
  pageName: 'users',
  header: {
    title: '用户列表',
    btnTitle: '新建用户'
  },
  propsList: [
    // 1.selection 2.index
    { type: 'selection', label: '选择', width: '80px' },
    { type: 'index', label: '序号', width: '80px' },

    { type: 'normal', label: '用户名', prop: 'name', width: '120px' },
    { type: 'normal', label: '真实姓名', prop: 'realname', width: '120px' },
    { type: 'normal', label: '密码', prop: 'password', width: '120px' },
    { type: 'normal', label: '手机号', prop: 'cellphone', width: '120px' },

    { type: 'status', label: '状态', prop: 'enable', width: '100px' },

    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },

    { type: 'handler', label: '操作', width: '120px' }
  ]
}

export default contentConfig
