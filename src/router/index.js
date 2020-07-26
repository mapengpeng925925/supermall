import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

// 安装插件
Vue.use(VueRouter)

//创建router
const routes = [
  { path: '', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/cart', component: Cart},
  { path: '/category', component: Category },
  { path: '/profile', component: Profile },
  { path: '/detail/:iid', component: Detail },
]

const router = new VueRouter({
  routes,
  mode:'history'
})

//导出router
export default router