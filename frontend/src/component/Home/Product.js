import React from 'react'
import {Link} from "react-router-dom"
import { Rating } from '@mui/material'
import "./Product.css"



const Product = ({product}) => {
  const options = {
    
    value:product.ratings,
    precision:0.5,
    readOnly:true,
    
}
  return (
    <>
    
    <Link className='productCard' to = {`/products/product/${product._id}`}>
      
        <img src={product.images[0].url} alt = {product.name} />
        <p>{product.name}</p>
        <div>
            <Rating {...options}/> <span className='productCardSpanRating'>({product.numOfReview} Reviews)</span>
        </div>
        <span>{`$${product.price}`}</span>
    </Link>
    </>
    
  )
}

export default Product
