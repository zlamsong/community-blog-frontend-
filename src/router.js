import Vue from 'vue'
import Home from './views/Home.vue'
import VueRouter from 'vue-router'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import Article from './views/Article.vue'
import CreateArticle from './views/CreateArticle.vue'
import Cover from './views/Cover.vue'
import EditArticle from './views/EditArticle.vue'
import Profile from './views/Profile.vue'
import CreateProfile from './views/CreateProfile.vue'
import EditProfile from './views/EditProfile.vue'

Vue.use(VueRouter)

const router = new VueRouter({

    mode:'history',

    routes: [{
        path: '/login',
        component:Login
    },{
        path: '/signup',
        component:Signup
    },{
        path: '/',
        component:Home
    },{
        path: '/article/:id',
        component:Article
    },{
        path: '/articles/create',
        component:CreateArticle
    },{
        path: '/cover',
        component:Cover
    },{
        path: '/edit/:id',
        component:EditArticle
    },{
        path: '/profile/:id',
        component:Profile,
        props(route) {
            return {  userId: route.query.userId }
        }
    },{
        path: '/profiles/create',
        component:CreateProfile
    },{
        path: '/editProfile/:id',
        component:EditProfile
    }]
})

export default router;