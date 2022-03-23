
import Vue from 'vue'

Vue.filter('substr', function (value,f_n,t_n,dotte) {
    if (!value) return ''
    return value = value.substr(f_n,t_n)+dotte;
    
  });
