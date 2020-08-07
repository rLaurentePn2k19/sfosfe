import Vue from 'vue'
import Router from 'vue-router'
import ModuleRoutes from './module_routes'

Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: ModuleRoutes.routes
})