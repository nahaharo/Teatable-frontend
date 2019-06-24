import VueRouter from 'vue-router'
import main from './views/main'
import table from './views/table'

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: main },
        { path: '/table', component: table }
    ]
})

export default router