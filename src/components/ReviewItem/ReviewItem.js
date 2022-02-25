import React from 'react';

const ReviewItem = (props) => {
    const { name, seller, price, stock, quantity, key} = props.product;
    const reviewItemStyle ={
        borderBottom: "1px solid lightgray",
        marginBottom: "5px",
        paddingBottom: "5px",
        marginLeft: "12%"

    }
    return (
       <div>
          <div style={reviewItemStyle} className="product-description">
            <h4>{name}</h4>
            <p>Quantity: {quantity}</p>
            <p>by: {seller}</p>
            <h5><small>${price}</small></h5>
            <p>only {stock} left in stock - order soon</p>
            <button onClick={() => props.handleRemoveItem(key)} className="add-to-cart"> Remove</button>
                
          </div>
       </div>
    );
};

export default ReviewItem;