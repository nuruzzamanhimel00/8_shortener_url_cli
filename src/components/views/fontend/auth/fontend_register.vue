<template>
    <div id="fontendRegister">
            <div class="contentSection mt-5">
             <div class="container">
                 <div class="row justify-content-center mt-5">
                <div class="col-md-8">
                    <div class="card" style="background: #29a0bb;">
                        <div class="card-header"><strong>User Registration</strong></div>

                        <div class="card-body">
                            <form @submit.prevent="registration" @keydown="form.onKeydown($event)">
                            

                                <div class="form-group row">
                                    <label for="firstname" class="col-md-4 col-form-label text-md-right">First name</label>
                                    <div class="col-md-6">
                                        <input id="firstname"  v-model="form.firstname"   type="text" class="form-control" name="firstname" value=""   autofocus>
                                        <div v-if="form.errors.has('firstname')" v-html="form.errors.get('firstname')" style="color:red;" />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="lastname" class="col-md-4 col-form-label text-md-right">Last name</label>
                                    <div class="col-md-6">
                                        <input id="lastname" v-model="form.lastname"   type="text" class="form-control" name="lastname" value=""   autofocus>
                                         <div v-if="form.errors.has('lastname')" v-html="form.errors.get('lastname')" style="color:red;" />
                                    </div>
                                </div>
                                
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
                                <div class="form-group row">
                                    <label for="image" class="col-md-4 col-form-label text-md-right">Image</label>
                                    <div class="col-md-6">
                                        <input id="image"  type="file" @change="changeImageFile($event)" class="form-control " name="image"  accept="image/png, image/gif, image/jpeg,image/jpg" >
                                        <img v-if="form.image" :src="showImage()" alt="" style="width:200px;height:200px;">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="phone_no" class="col-md-4 col-form-label text-md-right">Phone No</label>
                                    <div class="col-md-6">
                                        <input id="phone_no"  v-model="form.phone_no"  type="number" class="form-control " name="phone_no"  >
                                        <div v-if="form.errors.has('phone_no')" v-html="form.errors.get('phone_no')" style="color:red;" />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="present_address" class="col-md-4 col-form-label text-md-right">Present Address</label>
                                    <div class="col-md-6">
                                       
                                         <textarea class="form-control" v-model="form.present_address" id="present_address" name="present_address" rows="3"></textarea>
                                         <div v-if="form.errors.has('present_address')" v-html="form.errors.get('present_address')" style="color:red;" />
                                    </div>
                                </div>
                              

                                <div class="form-group row mb-0">
                                    <div class="col-md-8 offset-md-4">
                                        <button type="submit" class="btn btn-primary">
                                        Submit
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

// //izitoast toster insall
import iziToast from "izitoast"
import("../../../../../node_modules/izitoast/dist/css/iziToast.min.css")
import("../../../../../node_modules/izitoast/dist/js/iziToast.min.js")

export default {
    data(){
        return {
            form: new Form({
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                image: '',
                phone_no: '',
                present_address: '',
              
            }),
        }
    },
    mounted(){
        this.userTokenExistCheck();
    },
    computed:{

    },
    methods:{
        async registration () {
         await this.form.post('/registration')
         .then((response)=>{
             if(response.data.status == 'success'){
                   this.form.reset();
                  iziToast.success({
                    title: 'OK',
                    message: 'Registration successfully',
                    });
                       
             }
         });
        // ...
        },
        changeImageFile(event){
             var file = event.target.files[0];
            var reader = new FileReader();
            reader.onload = (e)=> {
                this.form.image = e.target.result;
                // The file's text will be printed here
                // console.log(e.target.result);
            };

            reader.readAsDataURL(file);
        },
         showImage(){
           let img = this.form.image;
            if(img.indexOf("data") != -1){
                return img;
            }else{
                  return "http://localhost/8_shortener_url_api/public/image/admin/Sliders/"+img;
            }
        },
         userTokenExistCheck(){
            let userToken =  localStorage.getItem('UserToken');
            if(userToken){
                 this.$router.push({name:"compFontDashboard"});
            }
        },
    },

}
</script>