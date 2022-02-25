import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {img, name, seller, price, stock, key} = props.product;
    return (
        <div className="product">
            <img src={img} alt="" />
            <div className="product-description">
                <h4><Link to={"/product/" + key}>{name}</Link></h4>
                <p>by: {seller}</p>
                <h5>{price}</h5>
                <p>only {stock} left in stock - order soon</p>
                {props.addToCart && <button onClick={() => props.handleAddProduct(props.product)} className="add-to-cart"><FontAwesomeIcon icon={faShoppingCart}/> add to cart</button>}
                
            </div>
        </div>
    );
};

export default Product;