import React , {Fragment,useEffect, useState} from 'react'
import Carousel from "react-material-ui-carousel";

import { useSelector, useDispatch} from "react-redux"
import { clearErrors, getProductDetail, newReview } from '../../actions/productAction';
import { useParams } from 'react-router-dom';

import ReviewCard from "./ReviewCard.js"
import Loading from '../layout/Loader/loading'
import "./ProductDetail.css"
import { useAlert } from 'react-alert';

import { addItemsToCart } from '../../actions/cartActions';
import MetaData from '../layout/MetaData';
import {Dialog, DialogActions, DialogContent, DialogTitle, Button,} from "@mui/material"

import {Rating} from "@mui/material"
import { USER_REVIEW_RESET } from '../../constants/productConstants';

const ProductDetail = ({match}) => {
    const dispatch = useDispatch();
    const alert = useAlert(); 
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const {id} = useParams();


    const {product, isLoading, error} = useSelector(state => state.productDetail)
    const {success, error:reviewError} = useSelector(state=>state.newReview)
    const options = {
        
        size: "large",
        value:product.ratings,
        readOnly:true,
        precision:0.5,
        
    }
  
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity=()=>{
        if (product.Stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    }

    const decreaseQuantity=()=>{
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item added to cart");
    }

    const submtReviewToggle = () => {
        open? setOpen(false):setOpen(true);

    }
    const reviewSubmitHandler = () => {
        const myForm = new FormData();
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm));
        setOpen(false)


    }

    useEffect(()=>{
        if (error){
             alert.error(error);
             dispatch(clearErrors());
        }

        if (reviewError){
            alert.error(reviewError);
            dispatch(clearErrors());
       }

       if (success){
        alert.success("Review Submitted Successfully!")
        dispatch({type:USER_REVIEW_RESET});
       }
        dispatch(getProductDetail(id))
    }, [dispatch, id, error, reviewError, success, alert])
  return (
   <Fragment>
     {isLoading? <Loading/> : (
        <>
        <MetaData title = {`${product.name} --- ECOMMERCE`} />
            <div className="ProductDetails">
        <div>
            <Carousel className='Carousel'>
                {product.images && product.images.map((item, i)=>(
                    <img className = "CarouselImage"
                    key = {item.url}
                    src = {item.url}
                    alt = {`${i} Slide`}
                        
                    />
                ))}
            </Carousel>
            

        </div>

        <div>
            <div className="detailsBlock1">
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>

            </div>
            <div className="detailsBlock2">
                <Rating {...options}/>
                <span>({product.numOfReview} Reviews)</span>
            </div>
            <div className="detailsBlock3">
            <h2>{`$${product.price}`}</h2>
            <div className="detailsBlock3-1">
                <div className="detailsBlock3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value = {quantity} name="" id="" />
                    <button onClick = {increaseQuantity}>+</button>
                </div>
                <button disabled = {product.Stock < 1 ? true :false} onClick={addToCartHandler}>Add to Cart</button>
            </div>
            <p>Status:{" "}
                    <b className={product.Stock < 1 ? "redColor":"greenColor"}>
                        {product.Stock < 1 ? "OutOfStock":"InStock"}
                    </b>
            </p>

            </div>

            <div className="detailsBlock4">
                Description: <p>{product.description}</p>
            </div>

            <button onClick = {submtReviewToggle} className='submitReview'>Submit Review</button>

        </div>
    </div>
    <h3 className='reviewHeading'>Reviews</h3>
    <Dialog
        aria-labelledby='simple-dialog-title'
        open = {open}
        onClose = {submtReviewToggle}

    >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className='submitDialog'>
            <Rating
                onChange={(e)=>setRating(e.target.value)}
                value = {rating}
                size = "large"
            />
                <textArea
                    className = "submitDialogTextArea"
                    cols = "30"
                    rows = "5"
                    value = {comment}
                    onChange = {(e)=>setComment(e.target.value)}
                >

                </textArea>

        </DialogContent>
        <DialogActions>
            <Button onClick={submtReviewToggle} color = "secondary">Cancel</Button>
            <Button onClick={reviewSubmitHandler} color = "primary" >Submit</Button>
        </DialogActions>
    </Dialog>

    {
        product.reviews && product.reviews[0] ? (
            <div className='reviews'>
                {product.reviews.map((review)=> <ReviewCard review = {review}/>)}
            </div>
        ):(
            <p className='noReviews'>No Reviews Yet</p>
        )
    }

        </>
     )}
   </Fragment>
  )
}

export default ProductDetail