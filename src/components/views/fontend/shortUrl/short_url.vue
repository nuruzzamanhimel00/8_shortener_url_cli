<template>
    <div id="fontendRegister" class="mainBodySection">
            <div class="contentSection mt-5">
             <div class="container">
                    <div class="row justify-content-center mt-5">
                           <!-- {{ userAuth.id }} -->
                           <!-- {{ userid }} -->
                           <!-- {{ fetchShortenUrls }} -->
                         <div class="col-md-6"> <h1>Create url shortener</h1></div>
                         <div class="col-md-6">
                             <b-button class="btn btn-success float-right mb-3"  id="show-btn" @click="openShortUrlModal()" >Create Short Url</b-button>
                         </div>
                         <div class="card">

                            <div class="card-body">

                                    <table class="table table-bordered table-sm">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Short Link</th>
                                                <th>Full Link</th>
                                                <th>Visite Par Min</th>
                                                <th>IP Block TIme</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(value,key) in fetchShortenUrls" :key="key">
                                                    <td>{{key+1}}</td>
                                                    <td><a :href="value.shortlink" target="__blank">
                                                        {{ value.shortlink }}    
                                                    </a></td>
                                                    <td>
                                                        {{ value.fulllink }}    
                                                    </td>
                                                    <td>
                                                        {{ value.visiteParMin }}
                                                    </td>
                                                    <td>
                                                        {{ value.ipBlockTime }}
                                                    </td>
                                                    <td>
                                                        <a class="btn btn-success btn-sm" @click.prevent="editShortUrl(value.id)"  >Edit</a>
                                                        <a  class="btn btn-danger btn-sm"  @click.prevent="deleteShortUrl(value.id)"  >Delete</a>
                                                    </td>
                                            </tr>
                                        </tbody>

                                    </table>

                            </div>

                        </div>
   
                    </div>
            </div>
                <b-modal ref="my-modal" size="lg" hide-footer>
                    <template #modal-title>
                        {{ editModal == false ? ' Create Shortner URL' : " Edit Shortner URL" }}
                       
                    </template>
                    <div class="d-block ">
                        <form @submit.prevent=" editModal == false ? addShortUrl(): updateShortUrl() " @keydown="form.onKeydown($event)">
                        
                        <div class="form-group" >
                            <label for="fulllink">Enter Full URL</label>
                            <input type="text" v-model="form.fulllink" name="fulllink" class="form-control" id="fulllink"  placeholder="Enter fulllink">
                            <div v-if="form.errors.has('fulllink')" v-html="form.errors.get('fulllink')" />
                            
                        </div>
                    
                        
                        <div class="form-group">
                            <label for="visiteParMin"> URL Visite Par Min</label>
                            <select class="form-control" id="visiteParMin" v-model="form.visiteParMin" name="visiteParMin" >
                                    <option value="" selected disabled>Select Time</option>

                                    <option v-for="(value,key) in timesRange" :key="key" :value="value">
                                        {{ value }} Times
                                    </option>
                                
                                
                            </select>
                                <div v-if="form.errors.has('visiteParMin')" v-html="form.errors.get('visiteParMin')" />
                        </div>
                        <div class="form-group">
                            <label for="ipBlockTime">IP Block TIme in Min </label>
                            <select class="form-control" id="ipBlockTime" v-model="form.ipBlockTime" name="ipBlockTime" >
                                    <option value="" selected disabled>Select Time</option>
                                     <option v-for="(value,key) in timesRange" :key="key" :value="value">
                                        {{ value }} Minutes
                                    </option>
                                
                            </select>
                                <div v-if="form.errors.has('ipBlockTime')" v-html="form.errors.get('ipBlockTime')" />
                        </div>
                        
                        <button v-if="editModal == false"  type="submit" class="btn btn-primary">ADD</button>
                        <button v-else  type="submit" class="btn btn-primary">Update</button>
                        </form>
                    </div>
                    
                </b-modal>
             

        </div>
    </div>
    
</template>

<script>
import Form from 'vform'

import axios from 'axios'

// import $ from "jquery";

// //izitoast toster insall
import iziToast from "izitoast"
import("../../../../../node_modules/izitoast/dist/css/iziToast.min.css")
import("../../../../../node_modules/izitoast/dist/js/iziToast.min.js")

//import sweetaler2
import Swal from 'sweetalert2'
import("../../../../../node_modules/sweetalert2/dist/sweetalert2.all.min.js")

import AppStorage from '../../../../storage/AppStorage'
import Api from '../../../../Api/Api.js'

import {mapGetters , mapActions} from 'vuex'

export default {
    data(){
        return {
            form: new Form({
                fulllink: '',
                visiteParMin: '',
                ipBlockTime: '',
                // userid: localStorage.getItem('userid'),
                userid: AppStorage.getUserId(),
                id:''
            }),
            timesRange:[],
            editModal: false,
        }
    },
    mounted(){
        this.userTokenExistCheck();
        this.createTimeRange();
        this.getUrlsByUserid(AppStorage.getUserId());
    },
    computed:{
        ...mapGetters('fontendAuthMod',{userAuth:'userAccessTokenGetters'}),
        ...mapGetters('shortnerUrlMod',{fetchShortenUrls:'returnShortenUrls'}),
    },
    methods:{
         ...mapActions('fontendAuthMod',{userAccessToken:'userAccessToken'}),
         ...mapActions('shortnerUrlMod',{getUrlsByUserid:'getUrlsByUserid'}),
       
    
        userTokenExistCheck(){
            let userToken =  AppStorage.getToken;
            if(!userToken){
                 this.$router.push({name:"compFontDashboard"});
            }
        },
        createTimeRange(){
            for(var i = 1; i <= 60 ; i++){
                this.timesRange.push(i);
            }
            // console.log(this.timesRange);
        },
        openShortUrlModal(){
            this.form.reset();
            this.editModal = false;
             this.$refs['my-modal'].show();
        },
         async addShortUrl () {


         await this.form.post('/generate-shorten-link',{
              headers : Api.getHeaderWithAuth()  
            })
            .then((response)=>{
             if(response.data.status == 'success'){
                   this.form.reset();
                    this.$refs['my-modal'].hide();
                  iziToast.success({
                    title: 'OK',
                    message: 'Shortner URL Created Successfully',
                    });
                    this.getUrlsByUserid(AppStorage.getUserId());
             }
            });
       
        },
         async updateShortUrl () {


            await this.form.put(`/update-link/${this.form.id}/user/${AppStorage.getUserId()}`,{
                headers : Api.getHeaderWithAuth()  
                })
                .then((response)=>{
                if(response.data.status == 'success'){
                    this.form.reset();
                    this.$refs['my-modal'].hide();
                    iziToast.success({
                    title: 'OK',
                    message: 'Shortner URL Update Successfully',
                    });
                    this.getUrlsByUserid(AppStorage.getUserId());
                }
                });
       
        },
        editShortUrl(id){
               this.form.reset();
                this.editModal = true;
                let userid = AppStorage.getUserId();
             axios.post("/view-link",{
                 id: id,
                 userid: userid
             },{
                headers : Api.getHeaderWithAuth()  
                })
                .then((response) => {
                    if(response.data.status == 'success'){
                        this.form.fill(response.data.singleUrl);
                         this.$refs['my-modal'].show();
                    }
                    // console.log(response.data);
                })
                .catch(function (error) {
                console.log(error);
            });
            // console.log(id);
        },
         deleteShortUrl(id){
            let userid = localStorage.getItem('userid');
          
               Swal.fire({
                title: 'Are you sure?',
                text: "Are you sure to delete Shortner URL",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`/delete-link/${id}/user/${userid}`,{
                        headers : Api.getHeaderWithAuth()  
                        })
                        .then((response) => {
                            if(response.data.status == 'success'){
                                Swal.fire(
                                'Deleted!',
                                'Shortner URL Deleted Successfully',
                                'success'
                                );
                                this.getUrlsByUserid(AppStorage.getUserId());
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                    
                    
                    }
                });
        },
        
        

    },

}
</script>