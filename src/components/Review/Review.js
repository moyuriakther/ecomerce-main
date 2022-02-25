import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Shop/Cart';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false);
    useEffect(() => {
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key =>{
            const product = fakeData.find(pd =>pd.key === key);
            product.quantity = savedCart[key];
            return product;           
        })
        setCart(cartProducts);       
    }, [])
    // const handleProceedCheckout = () => {
    //   console.log('place order');
    //   setCart([]);
    //   setOrderPlaced(true);
    //   processOrder();
    // }
    const handleRemoveItem = (key) => {
        console.log('Removing', key)
        const product  = cart.filter(pd => pd.key !== key)
        removeFromDatabaseCart(key);
        setCart(product)
    }
    const thankYou = <img src={happyImage} alt="" />
    return (
        <div className="twin-container">
          <div className="product-container">
            <h1 style={{marginLeft:"12%"}}>this is a review: {cart.length}</h1> 
            {
                cart.map(product => <ReviewItem handleRemoveItem={handleRemoveItem} product={product} key={product.key}/>)
            }
            {orderPlaced && thankYou}
          </div>
          <div className="cart-container">
            <Cart isReview={false} cart={cart}/>
          </div>
        </div>
    );
};

export default Review;