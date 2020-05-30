export default {

    routes: [
        {
        path: '/viands',
        name: 'viands',
        component: resolve => require(['@/components/modules/user/Viands.vue'], resolve),
        meta: {
            tokenRequired: false
        }
    },
    {
        path: '/home',
        name: 'home',
        component: resolve => require(['@/components/modules/user/Homepage.vue'], resolve),
        meta: {
            tokenRequired: false
        }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: resolve => require(['@/components/modules/admin/Dashboard.vue'], resolve),
        meta: {
            tokenRequired: true
        }
    },
    {
        path: '/orders',
        name: 'orders',
        component: resolve => require(['@/components/modules/admin/Orders.vue'], resolve),
        meta: {
            tokenRequired: true
        }
    },
    {
        path: '/facts',
        name: 'facts',
        component: resolve => require(['@/components/modules/admin/Facts.vue'], resolve),
        meta: {
            tokenRequired: true
        }
    },
    {
        path: '/*',
        name: '404',
        component: resolve => require(['@/components/modules/user/Error.vue'], resolve),
        meta: {
            tokenRequired: false
        }
    }
    ]
}