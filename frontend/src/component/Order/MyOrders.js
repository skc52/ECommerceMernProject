import React, { useEffect } from 'react'
import "./MyOrders.css"
import {DataGrid} from "@mui/x-data-grid"
import {useSelector, useDispatch} from "react-redux";
import {clearErrors, myOrders} from "../../actions/orderActions";
import Loading from '../layout/Loader/loading';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Typography } from '@mui/material';
import MetaData from '../layout/MetaData';
import {Launch} from "@mui/icons-material"

const MyOrders = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { isLoading, error, order} = useSelector((state)=>state.myOrders);
    const {user} = useSelector((state)=>state.user);

    const columns = [
        {field:"id", headerName:"Order ID", minWidth:300, flex:1},
        {
            field:"status",
            headerName:"Status",
            
            flex:0.5,
            cellClassName:(params)=>{
                return params.getValue(params.id, "status") === "Delivered"
                ? "greenColor"
                : "redColor";
            }
        },
        {
            field:"itemsQty",
            headerName:"Items Qty",
            type:"number",
            
            flex:0.3
            
        },
        {
            field:"amount",
            headerName:"Amount($)",
            type:"number",
            minWidth:300,
            flex:0.5
        },
        {
            field:"actions",
            headerName:"Actions",
            midWidth:150,
            flex:0.3,
            type:"number",
            sortable:false,
            renderCell: (params)=>{
                return (
                    <Link to = {`/order/${params.getValue(params.id, "id")}`}>
                        <Launch/>
                    </Link>
                );
            },

        }
    ];
    const rows = [];

    order &&
    order.forEach((item, index)=>{
        rows.push({
            id:item._id,
            status:item.orderStatus,
            itemsQty:item.orderItems.length,
            amount:item.totalPrice,
        })
    })

    useEffect(()=>{
        if (error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    },[dispatch, alert, error])
  return (
    <>
        <MetaData title={` ${user.name} - Orders `} />
        {isLoading? (<Loading/>) :
         (
        <div className='myOrdersPage'>
            <DataGrid
                rows = {rows}
                columns = {columns}
                pageSize= {10}
                disableSelectionOnClick
                className='myOrdersTable'
                autoHeight
            />
            <Typography id= "myOrdersHeading">
                {user.name}'s Orders
            </Typography>
        </div>)
        }
    </>
  )
}

export default MyOrders