//导出去的路由
export const localRoutes = [
  {
    path: '/main/analysis/dashboard',
    component: () => import('@/views/main/analysis/dashboard/dashboard.vue')
  },
  {
    path: '/main/user/userList',
    component: () => import('@/views/main/user/UserMange/index.vue')
  },
  {
    path: '/main/user/collection',
    component: () => import('@/views/main/user/CollectionMange/index.vue')
  },
  {
    path: '/main/user/browse',
    component: () => import('@/views/main/user/BrowseMange/index.vue')
  },
  {
    path: '/main/company',
    component: () => import('@/views/main/company/company.vue')
  },
  {
    path: '/main/industry',
    component: () => import('@/views/main/industry/industry.vue')
  },
  {
    path: '/main/position',
    component: () => import('@/views/main/position/position.vue')
  },
  {
    path: '/main/apply/applyList',
    component: () => import('@/views/main/apply/ApplyMange/index.vue')
  },
  {
    path: '/main/apply/resume',
    component: () => import('@/views/main/apply/ResumeMange/index.vue')
  },
  {
    path: '/main/apply/interview',
    component: () => import('@/views/main/apply/InterviewMange/index.vue')
  },
  {
    path: '/main/system/advertisement',
    component: () => import('@/views/main/system/AdvertisementMange/index.vue')
  },
  {
    path: '/main/system/notice',
    component: () => import('@/views/main/system/NoticeMange/index.vue')
  }
]

export const adminUserMenu = [
  {
    id: 1,
    icon: 'el-icon-monitor',
    name: '工作台',

    children: [
      {
        id: 101,
        icon: 'el-icon-document',
        name: '数据分析',
        url: '/main/analysis/dashboard'
      }
    ]
  },

  {
    id: 2,
    icon: 'el-icon-message',
    name: '用户管理',
    children: [
      {
        id: 201,
        icon: 'el-icon-menu',
        name: '用户列表',
        url: '/main/user/userList'
      },
      {
        id: 202,
        icon: 'el-icon-menu',
        name: '收藏管理',
        url: '/main/user/collection'
      },
      {
        id: 203,
        icon: 'el-icon-menu',
        name: '浏览管理',
        url: '/main/user/browse'
      }
    ]
  },
  {
    id: 3,
    icon: 'el-icon-menu',
    name: '公司管理',
    url: '/main/company'
  },
  {
    id: 4,
    icon: 'el-icon-menu',
    name: '行业管理',
    url: '/main/industry'
  },
  {
    id: 5,
    icon: 'el-icon-menu',
    name: '职位管理',
    url: '/main/position'
  },
  {
    id: 6,
    icon: 'el-icon-menu',
    name: '投递管理',
    children: [
      {
        id: 601,
        icon: 'el-icon-menu',
        name: '投递列表',
        url: '/main/apply/applyList'
      },
      {
        id: 602,
        icon: 'el-icon-menu',
        name: '简历管理',
        url: '/main/apply/resume'
      },
      {
        id: 603,
        icon: 'el-icon-menu',
        name: '面试管理',
        url: '/main/apply/interview'
      }
    ]
  },

  {
    id: 7,
    icon: 'el-icon-menu',
    name: '系统管理',
    children: [
      {
        id: 901,
        icon: 'el-icon-menu',
        name: '广告管理',
        url: '/main/system/advertisement'
      },
      {
        id: 902,
        icon: 'el-icon-menu',
        name: '公告管理',
        url: '/main/system/notice'
      }
    ]
  }
]

export const companyMenu = [
  {
    id: 1,
    icon: 'el-icon-monitor',
    name: '工作台',
    children: [
      {
        id: 101,
        icon: 'el-icon-document',
        name: '数据分析',
        url: '/main/analysis/dashboard'
      }
    ]
  },

  {
    id: 2,
    icon: 'el-icon-menu',
    name: '公司管理',
    url: '/main/company'
  },
  {
    id: 3,
    icon: 'el-icon-menu',
    name: '职位管理',
    url: '/main/position'
  },
  {
    id: 4,
    icon: 'el-icon-menu',
    name: '投递管理',
    children: [
      {
        id: 401,
        icon: 'el-icon-menu',
        name: '投递列表',
        url: '/main/apply/applyList'
      },
      {
        id: 402,
        icon: 'el-icon-menu',
        name: '简历管理',
        url: '/main/apply/resume'
      },
      {
        id: 403,
        icon: 'el-icon-menu',
        name: '面试管理',
        url: '/main/apply/interview'
      }
    ]
  }
]
