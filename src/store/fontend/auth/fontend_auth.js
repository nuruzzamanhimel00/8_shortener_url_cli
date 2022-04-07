
import axios from "axios"
import Api from '../../../Api/Api.js'

const state = {
     
    userAuth:'',
};
const getters  ={
    userAccessTokenGetters(state){
        return state.userAuth;
    }
}
const mutations = {
      
    fetchAuthUserInfo(state,payload){
        state.userAuth = payload;
    },
    userAccessTokenIsNull(state,payload){
        state.userAuth = payload;
    }
};
const actions = {
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
};

export default{
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}