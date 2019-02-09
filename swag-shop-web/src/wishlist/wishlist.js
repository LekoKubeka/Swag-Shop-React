import React, {Component} from 'react';
import './wishlist.css'


import ProductCondensed from '../product-condensed/product-condensed';
import DataService from '../services/data-service';
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';

var ns = new NotificationService();

class WishList extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {wishList: []};
        //Bind functions
        this.createWishList = this.createWishList.bind(this);
        this.onWishListChanged = this.onWishListChanged.bind(this);
    }
    
    componentDidMount(){
        //add ourself (the wishlist) as an observer here
        ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged);
    }
    
    componentWillUnmount(){
        //remove ourself as an observer here
        ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
    }
    
    onWishListChanged = (newWishList)=>{
        this.setState({wishList: newWishList});
    }
    
     createWishList = () =>{
        const list = this.state.wishList.map((product)=>
                <ProductCondensed product = {product} key = {product._id} />
                //we don't pass the wishlist from the App, to keep things decoupled. The model we build will achieve this. 
            );    
                                             
        return (list);
        
     }
     
    render(){
        
        
       
        return (
        <div className = "card">
            <div className = "card-block">
                <h4 className = "card-title">Wish List</h4>
                <ul className = "list-group">
                    {this.createWishList()};
                </ul>
            </div>
        
        </div>
      );
        
    }
}

export default WishList; 