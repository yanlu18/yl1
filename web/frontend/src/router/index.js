import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import HandleEquipment from '@/views/HandleEquipment.vue'
import HandleManager from '@/views/HandleManager.vue'
import Login from '@/views/Login.vue'
import Main from '@/views/Main.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
  {
    path: '/welcome',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/equipment',
        name: 'HandleEquipment',
        component: HandleEquipment,
      },
      {
        path: '/manager',
        name: 'HandleManager',
        component: HandleManager,
      },
      {
        path: '/welcome',
        name: 'Main',
        component: Main,
      },
    ]
  },
  
  {
    path: '/',
    name: 'Login',
    component: Login,
  }

]
});


router.beforeEach((to, from, next) =>{
  if(to.path == "/"){
    next();
  }
  else{
    let islogin = localStorage.getItem("islogin");
    // console.log(to.path);
    // console.log(islogin);
    if(islogin === null || islogin === ""){      
      next("/");
      // console.log("back");
    }else{
      next();
      // console.log("next");
    }
  }
  
})

export default router
