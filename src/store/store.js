import Vue from 'vue'
import Vuex from 'vuex'

//fontend auth
import fontendAuthModules from './fontend/auth/fontend_auth.js'

import ShortnerUrlModules from './fontend/shortnerUrl.js'
Vue.use(Vuex)

 const store = new Vuex.Store({
  modules:{
     //fontend auth
     fontendAuthMod:fontendAuthModules,
     shortnerUrlMod:ShortnerUrlModules,
  } ,
  state: {

  },
  getters:{
   
  },
  mutations: {
    
  },
  actions:{
   
  }

});
export default store;
