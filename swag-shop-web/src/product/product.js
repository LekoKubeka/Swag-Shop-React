import React, {Component} from 'react';
import './product.css'
import DataService from '../services/data-service';
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';

var ns = new NotificationService();
var ds = new DataService();


class Product extends Component {
    
    constructor(props){
            super(props);
        
        this.state = {onWishList: ds.itemOnWishList()};
            
    //bind functions
        this.onButtonClicked = this.onButtonClicked.bind(this);
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
    
    onButtonClicked = ()=>{
        if (this.state.onWishList){
            ds.removeWishListItem(this.props.product);
        }else{
            ds.addWishListItem(this.props.product);    
        }
        
        
    }
    
    onWishListChanged = () =>{
        this.setState({onWishList: ds.itemOnWishList(this.props.product)});
    }
    render(){
        
        var btnClass; 
        
        if (this.state.onWishList){
            btnClass = "btn btn-danger";
        }else{
            btnClass = "btn btn-primary";
        }
        
        return(
            <div className = "card product">
                <img className = "card-img-top" src = {this.props.product.imgUrl} alt="Product"></img>
                <div className = "card-block"> 
                    <h4 className = "card-title">{this.props.product.title}</h4>
                    <p className = "card-text">{this.props.product.price}</p>
                    <a href="#" onClick={()=>{this.onButtonClicked()}} className = {btnClass}>{this.state.onWishList? "Remove From Wishlist" :"Add to Cart"}</a>
                </div>
            </div>
        
        );
        
    }
}

export default Product; 