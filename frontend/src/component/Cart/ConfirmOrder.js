import React from 'react'
import "./ConfirmOrder.css"
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ConfirmOrder = () => {

    const {shippingInfo, cartItems} = useSelector((state)=>state.cart);
    const {user} = useSelector((state)=>state.user);

    const subTotal = cartItems.reduce(
        (acc, item)=>acc + item.quantity*item.price, 0
    )
    const shippingCharges = subTotal>1000?0:200;
    
    const tax = subTotal * 0.18;
    
    const totalPrice = subTotal + tax + shippingCharges;
    const navigate = useNavigate();

    const proceedToPayment = () => {
        const data= {
            subTotal,
            tax, 
            shippingCharges,
            totalPrice,
        }

        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate("/process/payment");
    }

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`
  return (
    <>
        <MetaData title = "Confirm Order"/>
        <CheckoutSteps activeSteps={1}/>
        <div className="confirmOrderPage">
            <div>
                <div className="confirmShippingArea">
                    <Typography>Shipping Info</Typography>
                    <div className="confirmShippingAreaBox">
                       <div>
                            <p>Name:</p>
                            <span>{user.name}</span>
                       </div>
                       <div>
                            <p>Phone:</p>
                            <span>{shippingInfo.phoneNo}</span>
                       </div>
                       <div>
                            <p>Address:</p>
                            <span>{address}</span>
                       </div>
                    </div>
                </div>
                <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemsContainer">
                        {
                            cartItems && 
                            cartItems.map((item)=>(
                                <div key = {item.product}>
                                    <img src={item.image} alt="Product" />
                                    {/* <p>{item.name}</p> */}
                                    <Link to = {`/products/product/${item.product}`}>
                                        {`${item.name}`}
                                    </Link>
                                    <span>
                                        {item.quantity} X ${item.price} = {" "}
                                        <b> {`$${
                                            item.price*item.quantity
                                        }`}</b>
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            {/*  */}
            <div>
                <div className="orderSummary">
                    <Typography>Order Summary</Typography>
                    <div>
                        <div>
                            <p>SubTotal:</p>
                            <span>${subTotal}</span>
                        </div>
                        <div>
                            <p>Shipping Charges:</p>
                            <span>${shippingCharges}</span>
                        </div>
                        <div>
                            <p>GST:</p>
                            <span>${tax}</span>
                        </div>
                    </div>

                    <div className="orderSummaryTotal">
                        <p>
                            <b>Total:</b>
                        </p>
                        <span>${totalPrice}</span>
                    </div>
                    <button onClick={proceedToPayment}>Proceed To Payment</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default ConfirmOrder