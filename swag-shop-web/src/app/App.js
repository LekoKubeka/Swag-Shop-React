import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HttpService from '../services/http-service';
import Product from '../product/product';

const http = new HttpService();

class App extends Component {
    
    constructor(props){
        super(props); 
        
        this.state = {products:[]};
        /*with react you need to bind es6 functions*/
        this.loadData = this.loadData.bind(this);
        this.productList = this.productList.bind(this);
        this.loadData();
    }
    
    loadData = () =>{ //getProducts is a promise. 
        //reference this before the promise is loaded as this refers to the context of the Promise once we are using the Promise. 
        var self = this; 
        http.getProducts().then(products_data =>{
            self.setState({products: products_data}) //setState reloads the component and its children
        }, err => {
            
        });
        
   
    }
    
     productList = () => {
        //create a product
        const list = this.state.products.map((product)=>
           <div className = "col-sm-4" key = {product._id}>
                <Product title={product.title} price={product.price} imgUrl={product.imgUrl}/>
                
            </div> 
        );
                                             
            return (list); //brackets because React requires them to render
    }
    
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className = "container App-main">
            <div className = "row">
               {this.productList()}
            </div>
        </div>
      </div>
    );
  }
}

export default App;
