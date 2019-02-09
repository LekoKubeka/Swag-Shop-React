import React, {Component} from 'react';
import './product-condensed.css'


class ProductCondensed extends Component {  //line item of a product, in the wishlist
    render(){
        
        return(
           <li className = "list-group-item p-condensed">{/*props from the parent*/}
                <a className = "btn btn-outline-danger">X</a>
                <p>{this.props.product.title} | R{this.props.product.price}</p>
            </li>
        
        );
        
    }
}

export default ProductCondensed; 