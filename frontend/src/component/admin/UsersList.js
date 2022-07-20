import React, {useEffect} from 'react'
import './ProductList.css'
import { DataGrid } from '@mui/x-data-grid'
import {
    getAllUsers, 
    deleteUser, 
    updateUser,
    getUserDetails,
    clearErrors
} from "../../actions/userAction"
import {Link, useNavigate} from "react-router-dom"
import { useAlert } from 'react-alert'
import { Button } from '@mui/material'
import MetaData from '../layout/MetaData'
import {Edit, Delete, } from "@mui/icons-material"
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_USER_RESET, DELETE_USER_RESET } from '../../constants/userConstants'
const UsersList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    
    const {error, users, isLoading} = useSelector(state=>state.allUsers);
    const {error:deleteError, isDeleted, message} = useSelector(state=>state.profile)
    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    const columns = [
        {field:"id", headerName:"User ID", minWidth:200, flex:0.8},
        {
            field:"email",
            headerName:"Email",
            minWidth:350,
            flex:1,
        },
        {
            field:"name",
            headerName:"Name",
            
            minWidth:150,
            flex:0.5
        },
        {
            field:"role",
            headerName:"Role",
            
            minWidth:75,
            flex:0.3,
            cellClassName:(params)=>{
                return params.getValue(params.id, "role") === "admin"
                ? "greenColor"
                : "redColor";
            }
        },
        {
            field:"actions",
            flex:0.3,
            headerName:"Actions",
            minWidth:50,
            type:"number",
            sortable:false,
            renderCell:(params)=>{
                return(
                    <>
                        <Link to = {`/admin/user/${params.getValue(params.id, "id")}`}>
                            <Edit/>
                        </Link>
                        <Button onClick={()=>deleteUserHandler(params.getValue(params.id, "id"))}>
                            <Delete/>
                        </Button>
                    </>
                )
            }
        }
    ]

    const rows = [];

 

    useEffect(()=>{
        if (error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted){
            alert.success("User Deleted Successfully");
            navigate("/admin/users")
            dispatch({type:DELETE_USER_RESET})
        }
        dispatch(getAllUsers());
        
    }, [dispatch, alert, error, deleteError,isDeleted, message])

    users && users.forEach((item)=>{
        rows.push({
            id:item._id,
            role:item.role,
            email:item.email,
            name:item.name,

        });
    })
  return (
    <>
        <MetaData title = {`All Users - Admin`} />
        <div className="dashboard">
            <Sidebar/>
            <div className="productListContainer">
                <h1 id = "productListHeading">All Users</h1>

                <DataGrid
                    rows = {rows}
                    columns = {columns}
                    pageSize = {10}
                    disableSelectionOnClick
                    className='productListTable'
                    autoHeight
                />
            </div>
        </div>
    </>
  )
}

export default UsersList