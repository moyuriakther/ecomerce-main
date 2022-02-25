import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    // console.log(props.cart);
    const cart = props.cart;
    const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);
    const shipping = cart.reduce((total, product) => total + product.shipping, 0);
    const tax = ((totalPrice * 10) / 100);
    const total = (totalPrice + shipping + tax);
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Orderd: ${cart.length}</p>
            <p>Items Price: ${totalPrice.toFixed(2)}</p>
            <p><small>Shipping And Handling: ${shipping.toFixed(2)}</small></p>
            <p><small>Tax: ${tax.toFixed(2)}</small></p>
            <h4>Order Total: ${total.toFixed(2)}</h4>
            { props.isReview ? 
                <Link to="/review"><button className="add-to-cart"> Review Order</button></Link> :
                <Link to="/shipment"><button className="add-to-cart">Proceed Checkout</button></Link>
            }
           
        </div>
    );
};

export default Cart;