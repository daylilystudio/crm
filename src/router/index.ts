// import { createRouter, createWebHashHistory } from 'vue-router'

export const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('../components/LayoutManage.vue'),
    children: [
      {
        name: 'profile',
        path: 'profile/:id',
        component: () => import('../views/ProFile.vue')
      },
      {
        name: 'company',
        path: '/company',
        children: [
          {
            name: 'company-info',
            path: '/company/info',
            component: () => import('../views/company/InfoView.vue')
          }
        ]
      },
      {
        name: 'dept',
        path: '/dept',
        children: [
          {
            name: 'dept-info',
            path: '/dept/info',
            component: () => import('../views/dept/InfoView.vue')
          },
          {
            name: 'dept-type',
            path: '/dept/type',
            component: () => import('../views/dept/TypeView.vue')
          }
        ]
      },
      {
        name: 'personnel',
        path: '/personnel',
        children: [
          {
            name: 'personnel-info',
            path: '/personnel/info',
            component: () => import('../views/personnel/InfoView.vue')
          }
        ]
      },
      {
        name: 'role',
        path: '/role',
        children: [
          {
            name: 'role-info',
            path: '/role/info',
            component: () => import('../views/role/InfoView.vue')
          }
        ]
      },
      {
        name: 'permission',
        path: '/permission',
        children: [
          {
            name: 'permission-assign',
            path: '/permission/assign',
            component: () => import('../views/permission/AssignView.vue')
          },
          {
            name: 'permission-assignRole',
            path: '/permission/assignRole',
            component: () => import('../views/permission/AssignRoleView.vue')
          }
        ]
      },
      {
        name: 'customer',
        path: '/customer',
        children: [
          {
            name: 'customer-application',
            path: '/customer/application',
            component: () => import('../views/customer/ApplicationView.vue')
          }
        ]
      },
      {
        name: 'system',
        path: '/system',
        children: [
          {
            name: 'system-log',
            path: '/system/log',
            component: () => import('../views/system/LogView.vue')
          }
        ]
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/LoginPage.vue')
  },
  { path: '/:pathMatch(.*)', name: 'not-found', component: () => import('../views/NotFound.vue') }
]
