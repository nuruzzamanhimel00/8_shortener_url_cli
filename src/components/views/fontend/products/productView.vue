<template>
    <div>
        <!-- Brand wise Product {{ $route.params.slug }} -->
         <div class="contentSection mt-5">
             <div class="container">
                <div class="row">
                   <div class="col-md-12">
                     
                       <div class="card">
                           <div class="card-body">
                               <div class="row">
                                   <div class="col-md-5">
                                       <div class="carosol_slider">
                                           <carousel :autoplay="true" :nav="false" :items="1" :loop="true" :margin="10" :mouseDrag="true" :touchDrag="true" :autoplayHoverPause="true">
                                          
                                                     <img  v-for="(value,key) in getSlugWiseProduct.images" :key="key" :src="showProductImage(value.image)" style="width: 100%;height: 60%;">
                                            </carousel>
                                       </div>
                                       <h3>Product Category: <span class="badge badge-info"> {{getSlugWiseProduct.category.name}}</span></h3>
                                       <h3>Product Brand: <span class="badge badge-info">{{getSlugWiseProduct.brand.name}}</span></h3>
                                       
                                   </div>
                                   <div class="col-md-7">
                                       <!-- {{ getSlugWiseProduct }} -->
                                         <h1>{{getSlugWiseProduct.title}}</h1>
                                        <p><b class="">{{ getSlugWiseProduct.price }} BDT</b> 
                                        <span class="badge badge-primary">{{ getSlugWiseProduct.quantity }} items on the Stock</span>
                                        </p>
                                        <p class="display-2">

                                        </p>
                                        <span style="color: rgb(34, 34, 34); font-family: arial, sans-serif; font-size: 16px; background-color: rgb(255, 255, 255);"> {{ getSlugWiseProduct.description }} &nbsp;</span><b style="color: rgb(34, 34, 34); font-family: arial, sans-serif; font-size: 16px; background-color: rgb(255, 255, 255);">breakfas</b>
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

import {mapGetters , mapActions} from 'vuex'

// import Form from 'vform'

// import $ from "jquery";

// import axios from "axios"

// //izitoast toster insall
// import iziToast from "izitoast"
// import("../../../../../node_modules/izitoast/dist/css/iziToast.min.css")
// import("../../../../../node_modules/izitoast/dist/js/iziToast.min.js")

import carousel from 'vue-owl-carousel'

export default {
    data(){
        return {

        }
    },
    mounted(){
       this.productShowSlug(this.$route.params.slug);
    },
    computed:{
           ...mapGetters('fontProductMod',['getSlugWiseProduct']),
        //    or 
        //    ...mapGetters('fontProductMod',{getSlugWiseProduct:'getSlugWiseProduct'}),
           
        
    },
    methods:{
        ...mapActions('fontProductMod',{productShowSlug:'passSlugToProduct'}),
           showProductImage(image){
            console.log(image);
             if(image.indexOf('data') != -1){
                return image;
            }else{
                return "http://localhost/4.lara_ecom_vue_api/public/image/admin/products/product_items/"+image;
            }
        },
            
    },
    components: { carousel },
}
</script>

<style scoped>
    .carosol_slider{
        padding: 20px;
        background: #29A0BB;
        border-radius: 5px;
        border: 1px solid #29A0BB;
    }
</style>


