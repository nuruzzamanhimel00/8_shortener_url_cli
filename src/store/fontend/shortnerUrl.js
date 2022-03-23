
import axios from "axios"
export default{
    namespaced:true,
    state:{
       getAllUrls:'',
    },
    getters:{

        returnShortenUrls(state){
            return state.getAllUrls;
        }
    },
    mutations:{
        getUrlsByUseridMut(state,payload){
            state.getAllUrls = payload;
        }
    },
    actions:{
      
        getUrlsByUserid(context,userid){

            axios.post('/get-shorten-link', {
                userid: userid,
                })
                .then(function (response) {
                    if(response.data.status == 'success'){
                        context.commit("getUrlsByUseridMut",response.data.getUrl);
                    }
                    
                // console.log(response.data.getUrl);
                })
                .catch(function (error) {
                console.log(error);
            });
           
        }
    }
}