
import axios from "axios"
import Api from '../../../Api/Api.js'
export default{
    namespaced:true,
    state:{
     
       userAuth:'',
    },
    getters:{
     
        userAccessTokenGetters(state){
            return state.userAuth;
        }
    },
    mutations:{
      
        fetchAuthUserInfo(state,payload){
            state.userAuth = payload;
        },
        userAccessTokenIsNull(state,payload){
            state.userAuth = payload;
        }
    },
    actions:{
      
        userAccessToken(context,accessToken){
           
            if(accessToken == null){
                context.commit("userAccessTokenIsNull",accessToken)
            }else{
                axios.post('/access-token', {
                    accessToken: accessToken,
                  },{
                      headers:  Api.getHeaderWithAuth()  
                  })
                  .then((response) => {
                      context.commit("fetchAuthUserInfo",response.data.data);
                    // console.log(response.data.data);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
            }
           
        }
    }
}