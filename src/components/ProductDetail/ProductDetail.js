import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Shop/Product';

const ProductDetail = () => {
    let {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    console.log(product);
    return (
        <div>
            <h1>this is product detail of {productKey}</h1>
            <Product addToCart={false} product={product}/>
        </div>
    );
};

export default ProductDetail;