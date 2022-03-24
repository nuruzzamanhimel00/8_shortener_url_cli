import AppStorage from '../storage/AppStorage.js'

class Api{
    static getHeaderWithAuth(){
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${AppStorage.getToken()}`
          };
    }

    static getHeaderWithoutAuth(){
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          };
    }
}

export default Api;