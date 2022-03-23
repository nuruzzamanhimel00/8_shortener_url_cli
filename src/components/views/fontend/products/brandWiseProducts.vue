<template>
    <div>
        <!-- Brand wise Product {{ $route.params.brandId }} -->
         <div class="contentSection mt-5">
             <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <compAsidebar></compAsidebar>
                    </div>
                    <div class="col-md-8">
                       <div class="row">
                           <!-- {{ getAllProducts.data }} -->
                           <h2 class="mb-3"> Brand wise Products:  {{$route.params.brandId}}</h2>
                           <h3>Brand name: <span class="badge badge-primary"> {{getSingleBrand.name}}</span></h3>
                           <!-- {{ getProductByBrnad.length }} -->
                           
                           <div class="col-md-4" v-for="(value,key) in getProductByBrnad" :key="key"  >
                           
                              <div  class="card" style="text-align: center;">
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

        </div>
    </div>
</template>

<script>

import compAsidebar from '../asidebar.vue'

import {mapActions ,  mapGetters } from 'vuex'

import axios from 'axios'
// //izitoast toster insall
import iziToast from "izitoast"
import("../../../../../node_modules/izitoast/dist/css/iziToast.min.css")
import("../../../../../node_modules/izitoast/dist/js/iziToast.min.js")

export default {
    data(){
        return {
           
        }
    },
    mounted(){
        this.getBrandByBrandidFunction(this.$route.params.brandId);
        this.getProdcutsByBrandidFunction(this.$route.params.brandId);
        
    },
    watch:{
        $route(){
             this.getBrandByBrandidFunction(this.$route.params.brandId);
              this.getProdcutsByBrandidFunction(this.$route.params.brandId);
        }
    },
    computed:{
         ...mapGetters('fontBrandMods',{getSingleBrand:'getBrandByBrandidGetters'}),
         ...mapGetters('fontBrandMods',{getProductByBrnad:'getProductByBrandIdGetters'}),
          ...mapGetters('fontendAuthMod',{userAuth:'userAccessTokenGetters'}),
    },
    methods:{
        // getBrandByBrandidFunction(brandid){
        //     alert(brandid);
        // }
        ...mapActions('fontBrandMods',{getBrandByBrandidFunction:'getBrandByBrandIdAction'}),
        ...mapActions('fontBrandMods',{getProdcutsByBrandidFunction:'getProductByBrandIdActions'}),
         ...mapActions('fontendCartMod',{tryTOfetcartsFunc:'tryTOfetcartsAction'}),
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

                // alert(this.userAuth);
               
                
        },

    },  
    components:{
        compAsidebar
    }

}
</script>