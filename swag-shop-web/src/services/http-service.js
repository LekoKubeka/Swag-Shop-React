import 'whatwg-fetch';

class HttpService {
   getProducts = () =>{
       fetch('http://localhost:3004/product').then(response =>{
           console.log(response.json());
       });
   } 
}

export default HttpService; /*ES6 => module.exports in older Js*/
