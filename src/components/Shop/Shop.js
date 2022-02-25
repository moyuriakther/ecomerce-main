import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import Product from './Product';
import Cart from './Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    const first10Data = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10Data);
    const [cart, setCart] = useState([]);

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

    const handleAddProduct = (product) =>{
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== product.key);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map((product) =><Product addToCart={true} handleAddProduct={handleAddProduct} key={product.key} product={product}/>)
                }
            </div>
            <div className="cart-container">
                <Cart isReview={true} cart={cart}/>
            </div>
        </div>
    );
};

export default Shop;