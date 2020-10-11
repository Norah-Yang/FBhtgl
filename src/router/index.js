import Vue from 'vue'
import Router from 'vue-router'
let Home=()=>import("../pages/home")
let MerchantApply=()=>import("../pages/merchant_apply")
let MerchantList=()=>import("../pages/merchant_list")
let Login=()=>import("../pages/login")
let MerchantInfo=()=>import("../pages/merchant_info")
let MerchantModify=()=>import("../pages/merchant_modify")
let WxDispose=()=>import("../pages/wx_dispose")
let EntryModify=()=>import("../pages/entry_modify")
let FunctionList=()=>import("../pages/function_list")
let Generate=()=>import("../pages/generate")

Vue.use(Router)

export default new Router({
  routes: [
   
    {
      path: '/login',
      name: 'Login',
      component:Login,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/merchantApply',
          name: 'MerchantApply',
          component: MerchantApply,
        }, 
        {
          path: '/merchantList',
          name: 'MerchantList',
          component: MerchantList
        },
        {
          path: '/merchantInfo',
          name: 'MerchantInfo',
          component: MerchantInfo
        },
        {
          path: '/merchantModify',
          name: 'MerchantModify',
          component: MerchantModify
        },
        {
          path: '/entryModify',
          name: 'EntryModify',
          component: EntryModify
        },
        {
          path: '/wxDispose',
          name: 'WxDispose',
          component: WxDispose
        },
        {
          path: '/functionList',
          name: 'FunctionList',
          component: FunctionList
        },
        {
          path: '/generate',
          name: 'Generate',
          component: Generate
        },
      ]
    },
    {
      path:'/*',
      redirect:'/merchantList'
    },

  ]
})
