class AppStorage{
    getToken(){
        return JSON.parse (localStorage.getItem('UserToken') );
    }

    setToken(tokenName,token){
        localStorage.setItem (tokenName,JSON.stringify(token));
    }

    removeToken(tokenName){
        localStorage.removeItem (tokenName);
    }

}

export default new AppStorage;