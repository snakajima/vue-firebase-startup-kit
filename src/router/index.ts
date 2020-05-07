import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path: '/auth',
		name: 'Auth',
		component: () => import('../views/Auth.vue')
	},
	{
		path: '/chat',
		name: 'Chat',
		component: () => import('../views/Chat.vue')
	},
	{
		path: '/chat/:roomId',
		component: () => import('../views/Chatroom.vue')
	},
	{
		path: '/blog',
		component: () => import('../views/Blog.vue')
	},
	{
		path: '/blog/:articleId',
		component: () => import('../views/BlogArticle.vue')
	},
	{
		path: '/todo',
		component: () => import('../views/Todo.vue')
	},
	{
		path: '/todo/:listId',
		component: () => import('../views/TodoList.vue')
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
