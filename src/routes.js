
import compFontendMaster from './components/views/fontend/master/fontend_master.vue'
import compFontDashboard from './components/views/fontend/dashboard.vue'

import compFontRegister from './components/views/fontend/auth/fontend_register.vue'
import compFontLogin from './components/views/fontend/auth/fontend_login.vue'
import compShortUrl from './components/views/fontend/shortUrl/short_url.vue'

import tokenCheckGuard from './middleware/auth/tokenCheckGuard.js'

export const routes = [
    {
        path: '/', 
        component: compFontendMaster,
        name:'home',
        redirect:{path:'/dashboard'},
        children:[
            {
                path: 'dashboard', 
                component: compFontDashboard,
                name:"compFontDashboard"
            },
            {
                path: 'register', 
                component: compFontRegister,
                name:'compFontRegister'
            },
            {
                path: 'login', 
                component: compFontLogin,
                name:'compFontLogin'
            },
            {
                path: 'sorturl', 
                component: compShortUrl,
                name:'compShortUrl',
                beforeEnter: tokenCheckGuard
            },
           
        ]
        
    },
    {
        path: '*',
        component:compFontendMaster,
        redirect:{path:'/dashboard'},
      
    }
   
  ]