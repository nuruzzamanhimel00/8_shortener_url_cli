<template>
    <div id="dashboardSearch">
      
         <div class="contentSection mt-5">
             <div class="container">
                <div class="row">
                   
                    <h2 class="mb-3">Search All Products:</h2>
                           <div class="col-md-4" v-for="(value,key) in getSearchProducts" :key="key">
                              <div class="card" style="text-align: center;">
                               
                                 <router-link :to="{name:'compFontProductView', params: { slug: value.slug }}" :tag="a" class="card-title" style="margin: 0 auto;margin-bottom: 12px;" > <img class="card-img-top" :src="showProductImage(value.images[0].image)" alt="Card image cap" width="200" height="300"></router-link>
                                <div class="card-body">
                                  
                                       <router-link :to="{name:'compFontProductView', params: { slug: value.slug }}" :tag="a" class="card-title" style="margin: 0 auto;margin-bottom: 12px;" >{{value.title}}</router-link>
                                    <p class="card-text">Taka - {{value.price}}</p>

                                    <a  v-if="userAuth" @click="addToCart(userAuth.id,value.id)" class="btn btn-primary">Add Card</a>
                                    <a  v-else @click="addToCart(null,value.id)" class="btn btn-primary">Add Card</a>
                                </div>
                                </div>
                           </div>

                    
                </div>
            </div>

        </div>
        
        


    </div>
</template>

<script>
import axios from 'axios'
 import {  mapGetters , mapActions } from 'vuex'


// //izitoast toster insall
import iziToast from "izitoast"
import("../../../../../node_modules/izitoast/dist/css/iziToast.min.css")
import("../../../../../node_modules/izitoast/dist/js/iziToast.min.js")

export default {
    data(){
        return{

        }
    },
    created(){

    },
    mounted(){
 
    },
    
    computed:{
          ...mapGetters('fontProductMod',{getSearchProducts:'backToSearchProduct'}),
             ...mapGetters('fontendAuthMod',{userAuth:'userAccessTokenGetters'}),
    },
    methods:{
    ...mapActions('fontendCartMod',{tryTOfetcartsFunc:'tryTOfetcartsAction'}),
         showImage(img){
           
            if(img.indexOf("data") != -1){
                return img;
            }else{
                  return "http://localhost/4.lara_ecom_vue_api/public/image/admin/Sliders/"+img;
            }
        },
       
        showProductImage(image){
            console.log(image);
             if(image.indexOf('data') != -1){
                return image;
            }else{
                return "http://localhost/4.lara_ecom_vue_api/public/image/admin/products/product_items/"+image;
            }
        },
         addToCart(userid,productid){
               
                // var userAuth = this.userAuth;
               
                axios.post('/add-cart', {
                    userid: userid,
                    productid: productid
                })
                .then( (response)=> {
                    
                    if(response.data.status == 'success'){
                        iziToast.success({
                            title: 'OK',
                            message: 'Cart Added successfully',
                            });
                            //cart function 
                        if(this.userAuth != null){
                                let obj = {
                                    'userid' : this.userAuth.id,
                                    // 'productid' : productid
                                };
                                this.tryTOfetcartsFunc(obj);
                            }else{
                                let obj = {
                                    'userid' :null,
                                    // 'productid' : productid
                                };
                                this.tryTOfetcartsFunc(obj);
                            }
                             
                    }
                    // console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
               
        },
        
        
    },
   
}
</script>

<style >
 .carousel-caption h3 {
    color: rgb(232, 230, 227);
    background: rgba(0, 0, 0, 0.62) !important;
    border: 2px solid rgba(0, 0, 0, 0.62) !important;
    border-radius: 13px;
    padding: 16px;
font-size: 33px;
}
.carousel-indicators li {
    background-color: rgb(43, 102, 132) !important;
    border-top-color: rgb(43, 102, 132) !important;
    border-bottom-color: rgb(43, 102, 132) !important;
}
</style>

