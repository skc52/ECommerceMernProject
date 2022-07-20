import React, {useEffect} from 'react'
import './ProductList.css'
import { DataGrid } from '@mui/x-data-grid'
import {
    getAdminProducts,
    clearErrors,
    deleteProduct,
} from "../../actions/productAction"
import {Link, useNavigate} from "react-router-dom"
import { useAlert } from 'react-alert'
import { Button } from '@mui/material'
import MetaData from '../layout/MetaData'
import {Edit, Delete, } from "@mui/icons-material"
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
const ProductList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const {error, products} = useSelector(state=>state.products);
    const {error:deleteError, isDeleted} = useSelector(state=>state.product);
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    const columns = [
        {field:"id", headerName:"Product ID", minWidth:200, flex:0.5},
        {
            field:"name",
            headerName:"Name",
            minWidth:50,
            flex:0.3,
        },
        {
            field:"stock",
            headerName:"Stock",
            type:"number",
            minWidth:50,
            flex:0.3
        },
        {
            field:"price",
            headerName:"Price($)",
            type:"number",
            minWidth:75,
            flex:0.5,
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
                        <Link to = {`/admin/product/${params.getValue(params.id, "id")}`}>
                            <Edit/>
                        </Link>
                        <Button onClick={()=>deleteProductHandler(params.getValue(params.id, "id"))}>
                            <Delete/>
                        </Button>
                    </>
                )
            }
        }
    ]

    const rows = [];

    products && products.forEach((item)=>{
        rows.push({
            id:item._id,
            stock:item.Stock,
            price:item.price,
            name:item.name,

        });
    })

    useEffect(()=>{
        if (error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if(isDeleted){
            alert.success("Deleted successfully");
            navigate("/admin/dashboard");
            dispatch({type:DELETE_PRODUCT_RESET});
        }
        dispatch(getAdminProducts());
    }, [dispatch, alert, error, deleteError, isDeleted])
  return (
    <>
        <MetaData title = {`All Products - Admin`} />
        <div className="dashboard">
            <Sidebar/>
            <div className="productListContainer">
                <h1 id = "productListHeading">All Products</h1>

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

export default ProductList