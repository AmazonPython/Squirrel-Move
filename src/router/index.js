// 引入页面地址
import { createRouter, createWebHashHistory } from 'vue-router'

// 配置页面路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home')
  },{
    path: '/cartList',
    name: 'CartList',
    component: () => import(/* webpackChunkName: "cartList" */ '../views/cartList/CartList')
  },{
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () => import(/* webpackChunkName: "orderConfirmation" */ '../views/orderConfirmation/OrderConfirmation')
  }, {
    path: '/orderList',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "orderList" */ '../views/orderList/OrderList')
  },{
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop')
  }, {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/register/Register'),
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage;
      isLogin ? next({ name: 'Home'}):  next();
    }
  }, {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login'),
    // 路由刚进来，页面运行之前加载的方法，beforeEnter 方法里包含着 to, from, next 三个参数。
    // to: 表示要去的页面
    // from: 从那个页面跳的
    // next: 判断条件，告知下一步行为，如果只是 next() 就继续执行事件，反之给它判断。
    beforeEnter (to, from, next) {
      // 定义一个 isLogin，赋予本地状态
      const { isLogin } = localStorage
      // 如果本地已经登录，跳转 Home 页面，否则继续执行
      isLogin ? next({ name: 'Home' }) : next()
    }
  }, {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */ '../views/search/Search')
  },{
    path: '/searchList',
    name: 'SearchList',
    component: () => import(/* webpackChunkName: "searchList" */ '../views/searchList/SearchList')
  },{
    path: '/address',
    name: 'Address',
    component: () => import(/* webpackChunkName: "address" */ '../views/address/Address')
  },{
    path: '/addressEdit',
    name: 'AddressEdit',
    component: () => import(/* webpackChunkName: "addressEdit" */ '../views/addressEdit/AddressEdit')
  },{
    path: '/addressSelect',
    name: 'addressSelect',
    component: () => import(/* webpackChunkName: "addressSelect" */ '../views/addressSelect/AddressSelect')
  },
]

const router = createRouter({
  // 内部提供了 history 模式的实现。这里使用 hash 模式。
  history: createWebHashHistory(),
  // routes: routes` 的缩写
  routes
})

// 路由拦截,如果没有登录的话，只能去登录页，或者注册页。
// 根据登录状态，或者前往的页面，判断是否要前往的页面。
router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage;
  const { name } = to;
  const isLoginOrRegister = (name === 'Login' || name === 'Register');
  // 点击登录页面时候判断，login 状态是否登录了。
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'Login' });
})

export default router
