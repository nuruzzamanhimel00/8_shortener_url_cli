<template>
    <div id="fontendMaster">
      
        <div id="navbar" class="navSection">
            <nav class="navbar navbar-expand-lg navbar-light ">
                <a class="navbar-brand" href="#">Shortner URL</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <router-link :to="{ name:'home'}" class="nav-link" href="#">Home </router-link>
                    </li>
                    <li class="nav-item active"  v-if="userAuth">
                        <router-link :to="{ name:'compShortUrl'}" class="nav-link" href="#">Short URL </router-link>
                    </li>
                 
                    <li class="nav-item" v-if="!userAuth">
                        <router-link :to="{ name:'compFontLogin'}" class="nav-link">Login</router-link>
                    </li>
                    <li class="nav-item"  v-if="!userAuth">
                        <router-link :to="{ name:'compFontRegister'}" class="nav-link" >Register</router-link>
                    </li>
                   
                   <li class="nav-item dropdown"  v-if="userAuth">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img :src="showProfileImage(userAuth.image)" alt="" style="width: 40px;height: 40px;border-radius: 50%;"> {{  userAuth.firstname }}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                       
                        <a @click.prevent="logount()" class="dropdown-item" href="#">Logout</a>
                        <!-- <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a> -->
                        </div>
                    </li>
                    </ul>
                  
                </div>
                </nav>
        </div>
    <!-- {{ userAuth }} -->
    <!-- {{ getCarts.length }} -->
          <router-view></router-view>
       
        
      <div id="footerSection" class="footerSection">
            <p>
               @{{ currentYear }} All rights reserved | Ecommarce Site
            </p>
        </div>
         
    
    </div>
</template>

<script>
import moment from 'moment';

import {mapGetters , mapActions} from 'vuex'

import axios from 'axios' 

import AppStorage from '../../../../storage/AppStorage.js'
import Api from '../../../../Api/Api.js'

// //izitoast toster insall
import iziToast from "izitoast"
import("../../../../../node_modules/izitoast/dist/css/iziToast.min.css")
import("../../../../../node_modules/izitoast/dist/js/iziToast.min.js")

export default {
    data(){
        return {
            currentYear:moment().format('YYYY'),
        }
    },
    mounted(){
        this.userAccessToken(AppStorage.getToken());
        // this.footerManage();
    
    },
    watch:{
        $route(){
            //  this.footerManage();
        }
    },
    created(){
         
    },
    computed:{
         ...mapGetters('fontendAuthMod',{userAuth:'userAccessTokenGetters'}),
        //  or 
       
    },
    methods:{
         ...mapActions('fontendAuthMod',{userAccessToken:'userAccessToken'}),
         showProfileImage(img){
            if(img.indexOf("data") != -1){
                return img;
            }else{
                  return "http://localhost/8_shortener_url_api/public/image/fontend/user/"+img;
            }
         },
         logount(){
              axios.post(`/logout`,{},{
                headers : Api.getHeaderWithAuth()  
                })
                .then((response) => {
                    if(response.data.status == 'success'){
                        iziToast.success({
                        title: 'OK',
                        message: response.data.message,
                        });
                    }
                    
                })
                .catch(function (error) {
                console.log(error);
            });
            AppStorage.localStorageReset();
            this.userAccessToken(null);
            this.$router.push({name:"compFontDashboard"});
         },    
    },
    components:{
      
    }
}
</script>

<style scope>
    #footerSection{
        background: rgb(18, 130, 147) none repeat scroll 0% 0%;
          /* position: absolute;
        bottom: 0;
        width: 100%; */
        
        
    }
    #footerSection p{
        margin: 0;
        padding: 11px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
    }
    .navbar {
        background: #29A0BB !important;
    }
</style>