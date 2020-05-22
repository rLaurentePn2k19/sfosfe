
let beforeEnter = (to, from, next) => {
    if (to.meta.tokenRequired === true) {
        if (localStorage.getItem("admin") == "Softype100") {
            next()
        } else {
            next({ path: '/home' })
        }
    } else {
        next()
    }
}

var devRoutes = []
let app = require('./app.js')
devRoutes = devRoutes.concat(app.default.routes)
for (let x = 0; x < devRoutes.length; x++) {
    devRoutes[x]['beforeEnter'] = beforeEnter
}

let routes = [
    {
        path: '/',
        name: '',
        component: resolve => require(['@/components/modules/user/Homepage.vue'], resolve),
        beforeEnter: beforeEnter
    }
]

routes = routes.concat(devRoutes)

export default {
    routes: routes
}