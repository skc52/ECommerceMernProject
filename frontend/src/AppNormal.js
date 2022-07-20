
import './App.css';
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import webFont from "webfontloader"
import React, { useState } from 'react';
import Home from "./component/Home/Home.js"
import Loading from './component/layout/Loader/loading';
import ProductDetail from "./component/Product/ProductDetail.js";
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store"
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js"
import Account from "./component/User/Account.js"
import { useSelector } from 'react-redux';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile.js'
import UpdatePassword from './component/User/UpdatePassword.js'
import ForgotPassword from './component/User/ForgotPassword.js'
import ResetPassword from './component/User/ResetPassword.js'
import Cart from "./component/Cart/Cart.js"
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetail from "./component/Order/OrderDetail.js";
import Dashboard from './component/admin/Dashboard.js';
import ProductList from './component/admin/ProductList.js';
import NewProduct from './component/admin/NewProduct.js';
import UpdateProduct from './component/admin/UpdateProduct.js';
import OrderList from './component/admin/OrderList.js';
import ProcessOrder from './component/admin/ProcessOrder';
import UsersList from './component/admin/UsersList.js';

import UpdateUser from './component/admin/UpdateUser.js';

import ProductReviews from './component/admin/ProductReviews.js';
import NotFound from './component/layout/NotFound/NotFound';

import axios from "axios"




function AppNormal() {
  React.useEffect(()=>{
    webFont.load({
      google:{
        families:["Roboto","Droid Sans", "Chilanka"]
      }
    })
    //wont let inspect
    // window.addEventListener("contextmenu", (e)=>e.preventDefault())

    
   
  }, [])

  
  return (
  
      
      <Routes>
        <Route exact path = "/" element = {<Home/>} />
        <Route exact path = "/products/product/:id" element = {<ProductDetail/>}/>
        <Route exact path = "/products" element = {<Products/>}/>
        <Route path = "/products/:keyword" element = {<Products/>}/>
        <Route exact path = "/search" element = {<Search/>}/>
        {<Route exact path = "/login" element = {<LoginSignUp/>} />}
        <Route exact path = "/password/forgot" element = {<ForgotPassword/>} />
        <Route exact path = "/password/reset/:token" element = {<ResetPassword/>} />
        <Route exact path = "/cart" element = {<Cart/>}/>
        {/* <Route path="*" element = {
        <NotFound/>
        }/> */}
        
      </Routes>
      
      
   
    

    
  );
}

export default AppNormal;
