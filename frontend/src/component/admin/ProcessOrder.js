import React from 'react'
// import "./ConfirmOrder.css"
// import CheckoutSteps from './CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar';
import { useEffect } from 'react'
import { clearErrors, getOrderDetails, updateOrder } from '../../actions/orderActions'
import { useAlert } from 'react-alert'
import Loading from '../layout/Loader/loading'
import { useParams } from 'react-router-dom'

import {AccountTree} from "@mui/icons-material"
import { useState } from 'react'
import { Button } from '@mui/material';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'


import "./ProcessOrder.css"

const ProcessOrder = () => {

    // const {shippingInfo, cartItems} = useSelector((state)=>state.cart);
    const {order, error, isLoading} = useSelector(state=>state.orderDetails);
    // const {user} = useSelector((state)=>state.user);
    const {error:updateError, isUpdated} = useSelector(state=>state.order)

    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const [status, setStatus] = useState("");
    const processStatus = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("status", status);
        

        
        dispatch(updateOrder(id, myForm));

    }

    useEffect(()=>{
        if (error){
            alert.error(error);
            dispatch(clearErrors())
        }  
        if (updateError){
            alert.error(error);
            dispatch(clearErrors())
        }   
        if (isUpdated){
            alert.success("Order Status is Updated");
            dispatch({type:UPDATE_ORDER_RESET})
        }  
        dispatch(getOrderDetails(id));

    }, [alert, error,updateError, dispatch, id, isUpdated, updateError])

    // const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`
  return (
<>
    <MetaData title="Process Order" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          
        {isLoading ? <Loading/>:<>
            <div className="confirmOrderPage"
                style = {{
                    display:order.orderStatus === "Delivered"?"block":"grid"
                }}
            >
            <div>
                <div className="confirmShippingArea">
                    <Typography>Shipping Info</Typography>
                    <div className="orderDetailsContainerBox">
                        <div>
                            <p>Name:</p>
                            <span>{order.user && order.user.name}</span>
                        </div>
                        <div>
                            <p>Phone:</p>
                            <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                        </div>
                        <div>
                            <p>Address:</p>
                            <span>{order.shippingInfo && 
                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`
                            }</span>
                        </div>
                    </div>
                    <Typography>Payment</Typography>
                    <div className="orderDetailsContainerBox">
                        <div>
                            <p
                                className={
                                    order.paymentInfo &&
                                    order.paymentInfo.status === "succeeded"
                                    ? "greenColor":
                                    "redColor"
                                }
                            >
                                {order.paymentInfo && 
                                    order.paymentInfo.status === "succeeded"?
                                    "PAID":
                                    "NOT PAID"
                                }
                            </p>
                        </div>

                        <div>
                            <p>Amount:</p>
                            <span>{order.totalPrice && order.totalPrice}</span>
                        </div>
                    </div>
                    <Typography>Order Status</Typography>
                    <div className="orderDetailsContainerBox">
                        <div>
                            <p
                                className={
                                    order.orderStatus && order.orderStatus === "Delivered"
                                    ? "greenColor"
                                    :
                                    "redColor"
                                }
                            >
                                <span>{order.orderStatus && order.orderStatus}</span>
                            </p>
                        </div>
                    </div>
                
                </div>
                <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemsContainer">
                        {
                            order.orderItems && 
                            order.orderItems.map((item)=>(
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


            <div
                style = {{
                    display:order.orderStatus === "Delivered"? "none":"block",

                }}
            >
            <form
            className="updateOrderForm"
            encType="multipart/form-data"
            onSubmit={processStatus}
          >
            <h1>Process Order</h1>

            
            <div>
              <AccountTree />
              <select value = {status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Choose Status</option>
                {order.orderStatus === "Processing" && (
                    <option value="Shipped">Shipped</option>
                )}
                
                {
                    order.orderStatus === "Shipped" &&
                    <option value="Delivered">Delivered</option>
                }
                
                
              </select>
            </div>

            
           

            <Button
              id="createProductBtn"
              type="submit"
              disabled={isLoading ? true : false||status ===""?true:false}

            >
              Process
            </Button>
          </form>
            </div>
        </div>
        </>}
        </div>
      </div>
     
       
    </>
  )
}

export default ProcessOrder