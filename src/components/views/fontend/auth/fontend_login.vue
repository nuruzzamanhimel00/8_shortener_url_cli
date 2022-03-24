<template>
    <div id="fontendRegister">
            <div class="contentSection mt-5">
             <div class="container">
                 <div class="row justify-content-center mt-5">
                <div class="col-md-8">
                    <div class="card" style="background: #29a0bb;">
                        <div class="card-header"><strong>User Login</strong></div>

                        <div class="card-body">
                            <form @submit.prevent="login" @keydown="form.onKeydown($event)">
                        
                                <div class="form-group row">
                                    <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>
                                    <div class="col-md-6">
                                        <input id="email" v-model="form.email"    type="email" class="form-control" name="email" value=""   autofocus>
                                        <div v-if="form.errors.has('email')" v-html="form.errors.get('email')" style="color:red;" />
                                    </div>
                                </div>
                                

                                <div class="form-group row">
                                    <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                    <div class="col-md-6">
                                        <input id="password"  v-model="form.password"  type="password" class="form-control " name="password"  autocomplete="current-password">
                                         <div v-if="form.errors.has('password')" v-html="form.errors.get('password')" style="color:red;" />
                                    </div>
                                </div>
                                

                                <div class="form-group row mb-0">
                                    <div class="col-md-8 offset-md-4">
                                        <button type="submit" class="btn btn-primary">
                                        Login
                                        </button>

                                    </div>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
            </div>

        </div>
    </div>
</template>

<script>
import Form from 'vform'

import AppStorage from '../../../../storage/AppStorage.js'
import Api from '../../../../Api/Api.js'

// //izitoast toster insall
import iziToast from "izitoast"
import("../../../../../node_modules/izitoast/dist/css/iziToast.min.css")
import("../../../../../node_modules/izitoast/dist/js/iziToast.min.js")

import {mapGetters , mapActions} from 'vuex'

export default {
    data(){
        return {
            form: new Form({
                email: '',
                password: '',
            
            }),
        }
    },
    mounted(){
        this.userTokenExistCheck();
    },
    computed:{
        ...mapGetters('fontendAuthMod',{userAuth:'userAccessTokenGetters'}),
    },
    methods:{
         ...mapActions('fontendAuthMod',{userAccessToken:'userAccessToken'}),
        async login () {
         await this.form.post('/login',{
              headers : Api.getHeaderWithoutAuth()  
            })
            .then((response)=>{
             if(response.data.status == 'success'){
                   this.form.reset();
                  iziToast.success({
                    title: 'OK',
                    message: 'Login successfully',
                    });

                    let UserToken = response.data.token;
                    let userid = response.data.userid;
                    // user token store
                    AppStorage.setToken('UserToken',UserToken);
                    AppStorage.setToken('userid',userid);
                    // fetch auth user info
                    this.userAccessToken(UserToken);
                    this.$router.push({name:"compFontDashboard"});     
            }
         });
       
        },
       
        changeImageFile(event){
             var file = event.target.files[0];
            var reader = new FileReader();
            reader.onload = (e)=> {
                this.form.image = e.target.result;
                // The file's text will be printed here
                console.log(e.target.result);
            };

            reader.readAsDataURL(file);
        },
         showImage(){
           let img = this.form.image;
            if(img.indexOf("data") != -1){
                return img;
            }else{
                  return "http://localhost/4.lara_ecom_vue_api/public/image/admin/Sliders/"+img;
            }
        },
        userTokenExistCheck(){
            // let userToken =  localStorage.getItem('UserToken');
            let userToken =  AppStorage.getToken();
            if(userToken){
                 this.$router.push({name:"compFontDashboard"});
            }
        }
        

    },

}
</script>