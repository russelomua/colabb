import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

Vue.http.options.root = 'http://localhost:5656';

//Vue.http.interceptors.push((req, next) => {
//  next((res) => {
//    //console.log(res);
//    switch (res.status) {
//      case 401:
//        
//      break;
//    }
//    return res;
//   })
//});