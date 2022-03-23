<template>
    <div id="dashboard" class="mainBodySection">
     

         <div class="contentSection mt-5">
             <div class="container">
                <div class="row">
                   <h1>Welcome to User Home Page</h1>
                   <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae quas dolorem, nobis officiis expedita neque cumque tempora facilis quidem! Quaerat placeat soluta neque molestias! Natus eius perspiciatis harum perferendis magni.</p>
                    
                </div>
            </div>

        </div>
        
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import $ from "jquery";
export default {
    data(){
        return{
    
        }
    },
    created(){

    },
    mounted(){
         this.footerManage();
    },
    computed:{
        ...mapGetters('fontendAuthMod',{userAuth:'userAccessTokenGetters'}),

    },
    methods:{
        footerManage(){
             let windowHeight = window.innerHeight;
             let navHeight =$(".navSection").innerHeight();
             let footerHeight =$(".footerSection").innerHeight();

            let contentHeight = windowHeight - (navHeight +  footerHeight);
            $(".mainBodySection").attr('style',"height:"+contentHeight+"px")
            //  console.log(windowHeight);
            //  console.log(navHeight);
            //  console.log(footerHeight);
            //  console.log(contentHeight);
         }
    },
    components:{
       
    }
}
</script>

