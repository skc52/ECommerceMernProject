import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart , removeItemsFromCart, getAllCartItems} from '../../actions/cartActions';
import "./Cart.css";
import CartItemCard from "./CartItemCart.js";
import { useAlert } from 'react-alert';
import {Typography} from "@mui/material"
import {RemoveShoppingCart} from "@mui/icons-material"
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const {cartItems} = useSelector((state)=>state.cart);
    
    const increaseQuantity = (id, quantity, stock)=>{
        const newQty = quantity + 1;

        if (stock <= quantity){
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    }

    const decreaseQuantity = (id, quantity )=>{
        const newQty = quantity - 1;

        if (1 >= quantity){
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    }
    const deleteCartItem = (id) => {
        dispatch(removeItemsFromCart(id));
        alert.success("Item removed from the cart")
    }

    const checkOutHandler = ()=>{
        navigate("/login?redirect=/shipping");
    }

    
  return (
    <>
        {
            cartItems.length === 0?
            <div className="emptyCart">
                <RemoveShoppingCart/>
                <Typography>
                    No Product in Your Cart
                </Typography>

                <Link to = "/products">View Products</Link>
            </div>
            
            
            : 
            <div className="cartPage">
            <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>SubTotal</p>
            </div>

            {
                cartItems && cartItems.map((item)=>(
                    ( <div className="cartContainer" key = {item.product}>
                    <CartItemCard  item = {item} deleteCartItem = {deleteCartItem} />
                    <div className="cartInput">
                        <button onClick={()=>decreaseQuantity(item.product, item.quantity)}>-</button>
                        <input type="number" readOnly value = {item.quantity} />
                        <button onClick={()=>increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                    </div>
                    <p className="cartSubTotal">{`$${
                        item.price*item.quantity
                    }`}</p>
    
                </div>)
                ))
            }

            <div className="cartGrossTotal">
                <div></div>
                <div className="cartGrossProfitBox">
                    <p>Gross Total</p>
                    <p>{`$${cartItems.reduce(
                        (acc, item)=>acc + item.quantity * item.price, 0
                    )}`}</p>

                    
                </div>
                <div></div>
                 
                <div className="checkOutBtn">
                        <button onClick={checkOutHandler}>Check Out</button>
                    </div>
                
            </div>
        </div>
        }
    </>
  )
}

export default Cart
