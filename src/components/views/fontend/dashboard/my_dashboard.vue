<template>
    <div>
        <!-- Brand wise Product {{ $route.params.catid }} -->
         <div class="contentSection mt-5">
             <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <compMySidebar></compMySidebar>
                    </div>
                    <div class="col-md-8">
                       <div class="row">
                           <div class="col-md-12">
                               <!-- {{ userAuth }} -->
                               <h1>Welcome to Md Nuruzzaman Himel</h1>
                               <p>You can change you profile and every information.... </p>
                           </div>
                           
                       </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

import {mapGetters} from 'vuex'

import compMySidebar from './my_sidebar.vue'

export default {
    data(){
        return {

        }
    },
    mounted(){
          this.userTokenExistCheck();
    },
    created(){

    },
    computed:{
         ...mapGetters('fontendAuthMod',{userAuth:'userAccessTokenGetters'}),
    },
    methods:{
         userTokenExistCheck(){
            let userToken =  localStorage.getItem('UserToken');
            if(!userToken){
                 this.$router.push({name:"compFontDashboard"});
            }
        },
        showProfileImage(img){
        //    alert(moment().format('YYYY'));
            if(img.indexOf("data") != -1){
                return img;
            }else{
                  return "http://localhost/4.lara_ecom_vue_api/public/image/fontend/user/"+img;
            }
         },
    },
    components:{
        compMySidebar
    }
}
</script>
