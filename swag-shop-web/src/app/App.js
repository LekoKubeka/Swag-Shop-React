import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HttpService from '../services/http-service';
import Product from '../product/product';

const http = new HttpService();

class App extends Component {
    
    constructor(props){
        super(props); 
        /*with react you need to bind es6 functions*/
        this.loadData = this.loadData.bind(this);
        
        this.loadData();
    }
    
    loadData = () =>{ //getProducts is a promise. 
        http.getProducts().then(products =>{
            console.log(products);
        }, err => {
            
        });
    }
    
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className = "App-main">
                <Product />
        </div>
      </div>
    );
  }
}

export default App;
