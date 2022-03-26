import AppStorage from '../../storage/AppStorage.js'
import axios from 'axios'
import Api from '../../Api/Api.js'

const tokenCheckGuard = async (to, from, next) =>{
    let token = AppStorage.getToken;
    if(!token){
        AppStorage.localStorageReset();
        return next({
            name:'home',
        });
    }
    axios.post("/check-valid-token",{},{
    headers : Api.getHeaderWithAuth()  
    })
    .then((response) => {
        if(response.data.status == 'error'){
            AppStorage.localStorageReset();
            return next({
                name:'home',
            });
        } return next();
    })
    .catch(function (error) {
        console.log(error);
    });
}

export default tokenCheckGuard;