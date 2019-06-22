import VueRouter from 'vue-router'
import main from './views/main'

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: main },
        { path: '/table', component: main }
    ]
})

export default router