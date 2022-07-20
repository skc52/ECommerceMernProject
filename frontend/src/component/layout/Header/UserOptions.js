import React from 'react'
import "./Header.css"

import {SpeedDial, SpeedDialAction, Backdrop} from "@mui/material"
import { useState } from 'react'
import Profile from "../../../images/profile.png"
import {Dashboard, Person, ExitToApp, ListAlt, ShoppingCart} from "@mui/icons-material"
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, logout } from '../../../actions/userAction'


const UserOptions = ({user}) => {

    const {cartItems} = useSelector((state)=>state.cart);
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const options = [
        {icon:<ListAlt/>, name:"Orders", func:orders},
        {icon:<Person/>, name:"Profile", func:account},
        {icon:<ShoppingCart style = {{color:cartItems.length>0?"tomato":"unset"}}/>, name:`Cart${cartItems.length}`, func:cart},
        {icon:<ExitToApp/>, name:"LogOut", func:logoutUser},
        
    ]

    if (user.role ==="admin"){
        options.unshift({icon:<Dashboard/>, name:"Dashboard", func:dashboard})
    }

    function dashboard(){
        navigate("/admin/dashboard");
    }

    function account(){
        navigate("/account");
    }

    function orders(){
        navigate("/orders");
    }

    function cart(){
        navigate("/cart");
    }
    function logoutUser(){
        dispatch(logout());
        alert.success("Logout successful");
        navigate("/");
    }
  return (
    <>
        <Backdrop  open={open} style = {{zIndex:10}}/>
        <SpeedDial
            ariaLabel='SpeedDial tooltip example'
            className='speedDial'
            style={{zIndex:"11"}}
            onClose={()=>setOpen(false)}
            onOpen = {()=>setOpen(true)}
            open = {open}
            direction = "down"
            icon = {<img
                className='speedDialIcon'
                src = {user.avatar.url? user.avatar.url:Profile}
                alt = "Profile"
            />}
        >
           {options.map((item)=>(
            <SpeedDialAction key = {item.name} icon = {item.icon} tooltipTitle = {item.name} onClick = {item.func}
                tooltipOpen = {window.innerWidth <= 600?true:false}
            />
           ))}
        </SpeedDial>
    </>
  )
}

export default UserOptions