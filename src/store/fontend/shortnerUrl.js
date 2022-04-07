
import axios from "axios"
import Api from '../../Api/Api.js'
const state = {
    getAllUrls:'',
 };
 const getters = {
    returnShortenUrls(state){
        return state.getAllUrls;
    }
};
const mutations = {
    getUrlsByUseridMut(state,payload){
        state.getAllUrls = payload;
    }
};
const actions = { 
    getUrlsByUserid(context,userid){
        axios.post(`/get-link/${userid}`,{},{
            headers:  Api.getHeaderWithAuth()  
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
};
export default{
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}