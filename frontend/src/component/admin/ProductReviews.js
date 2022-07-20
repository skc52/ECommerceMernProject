import React, {useEffect} from 'react'
import './ProductRewviews.css'
import { DataGrid } from '@mui/x-data-grid'
import { getAllReviews, deleteReview , clearErrors} from '../../actions/productAction'
import {Link, useNavigate} from "react-router-dom"
import { useAlert } from 'react-alert'
import { Button } from '@mui/material'
import MetaData from '../layout/MetaData'
import {Delete, } from "@mui/icons-material"
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import {Star} from "@mui/icons-material"
import { DELETE_REVIEW_RESET } from '../../constants/productConstants'
import { useState } from 'react'
const ProductReviews = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const {error:deleteError, isDeleted} = useSelector(state=>state.review);
    const {error, reviews, isLoading} = useSelector(state=>state.productReviews);
    const [productId, setProductId] = useState("");
    const deleteReviewHandler = (reviewId, productId) => {
      console.log("Deleting");
        dispatch(deleteReview(reviewId, productId))
    }

    

    const columns = [
        {field:"id", headerName:"Review ID", minWidth:200, flex:0.5},
        
        {
            field:"user",
            headerName:"User",
            
            minWidth:150,
            flex:0.3
        },
        {
          field:"comment",
          headerName:"Comment",
          minWidth:350,
          flex:1,
      },
        {
            field:"rating",
            headerName:"rating",
            type:"number",
            minWidth:75,
            flex:0.5,
            cellClassName: (params)=>{
              return params.getValue(params.id, "rating") >=3
              ?"greenColor":"redColor"
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
                       
                        <Button onClick={()=>deleteReviewHandler(params.getValue(params.id, "id"),productId)}>
                            <Delete/>
                        </Button>
                    </>
                )
            }
        }
    ]

    const rows = [];

    reviews && reviews.forEach((item)=>{
        rows.push({
            id:item._id,
            rating:item.rating,
            comment:item.comment,
            user:item.name,

        });
    })
    const productReviewSubmitHandler = (e)=>{
      e.preventDefault();
      
      dispatch(getAllReviews(productId));
    }

    useEffect(()=>{
        if (productId.length === 24){
          dispatch(getAllReviews(productId));
        }

        if (error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if(isDeleted){
            alert.success("Review Deleted successfully");
            navigate("/admin/reviews");
            dispatch({type:DELETE_REVIEW_RESET});
            dispatch(getAllReviews(productId));
        }
        // dispatch(getAdminProducts());
    }, [dispatch, alert, error, deleteError, isDeleted, productId])
  return (
    <>
        <MetaData title = {`All Reviews - Admin`} />
        <div className="dashboard">
            <Sidebar/>
            <div className="productReviewsContainer">
            <form
            className="productReviewsForm"
            encType="multipart/form-data"
            onSubmit={productReviewSubmitHandler}
          >
            <h1 className='productReviewsFormHeading'>All Reviews</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product ID"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
            
        
            <Button
              id="createProductBtn"
              type="submit"
              disabled={isLoading ? true : false || productId === ""?true:false}

            >
              Find Reviews
            </Button>
          </form>
                

                {
                  reviews && reviews.length > 0 ?
                  <>
                    <DataGrid
                    rows = {rows}
                    columns = {columns}
                    pageSize = {10}
                    disableSelectionOnClick
                    className='productListTable'
                    autoHeight
                />
                  </>:
                  <h1 className = "productReviewsFormHeading">No reviews Found</h1>
                }
            </div>
        </div>
    </>
  )
}

export default ProductReviews