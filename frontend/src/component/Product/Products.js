import React from 'react'
import "./Products.css"
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productAction'
import Loading from '../layout/Loader/loading'
import Product from '../Home/Product'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Pagination from "react-js-pagination";
import {Slider, Typography} from "@mui/material"
import { useState } from 'react'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'


const categories = [
    "All",
    "laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "Smartphones"
]

const Products = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [rating, setRating] = useState(0);

    const {isLoading, error,  products, productsCount, resultPerPage, filteredCount} = useSelector(state=>state.products)
    const count = products.length;

    const {keyword} = useParams();
    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
        setCurrentPage(1);
    }

    useEffect(()=>{
        if (error){
            alert.error(error);
            dispatch(clearErrors());
        }
        
        dispatch(getProduct(keyword, currentPage, price, category, rating));
    },[dispatch, keyword, currentPage, price, category, rating, alert, error])

    // let count = filteredCount;
    const navigate = useNavigate();
    const clearSearch = () => {
        navigate("/products/")
    }
  return (
    <>
        
        {isLoading? <Loading/> :
        <>
           
            
            <MetaData title="PRODUCTS---ECOMMERCE"/>
            <h1 className="productsHeading">
                Products
            </h1>

            <div className="products">
                {
                    products && products.map((product)=>(
                        <Product key = {product._id} product = {product} />
                    ))
                }
            </div>

            <div className="filterBox">
                <Typography>
                    Price
                </Typography>
                <Slider
                    size = "small"
                    value = {price}
                    onChange = {priceHandler}
                    valueLabelDisplay = "auto"
                    aria-labelledby = "range-slider"
                    min = {0}
                    max = {25000}
                />

                <Typography>
                    Categories
                </Typography>
                <ul className="categoryBox">
                    
                    {categories.map((category)=> (
                        <li className="category-link" key = {category} onClick = {()=>{
                            setCategory(category);
                            setCurrentPage(1);
                        }}>
                                {category}
                        </li>
                    ))}
                </ul>

                <fieldset>
                    <Typography component="legend">Ratings Above
                    </Typography>
                    <Slider
                        value = {rating}
                        onChange = {(e, newRating)=>{
                            setRating(newRating)
                            setCurrentPage(1);
                        }}
                        aria-labelledby = "continuous-slider"
                        valueLabelDisplay='auto'
                        min = {0}
                        max = {5}
                        size = "small"
                    />

                </fieldset>
                <button className='clearSearch' onClick={clearSearch}>Clear Search</button>
            </div>

                
            {
                resultPerPage > filteredCount?<></>: (
                <div className="paginationBox">
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage = {resultPerPage}
                    totalItemsCount = {productsCount}
                    onChange = {setCurrentPageNo}
                    nextPageText = "Next"
                    prevPageText = "Prev"
                    firstPageText = "1st"
                    lastPageText = "Last"
                    itemClass = "page-item"
                    linkClass = "page-link"
                    activeClass = "pageItemActive"
                    activeLinkClass = "pageLinkActive"

                />

            </div>)
            }

            
        </> }
    </>
  )
}

export default Products