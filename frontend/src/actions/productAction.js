import axios from "axios";
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    USER_REVIEW_REQUEST,
    USER_REVIEW_FAIL,
    USER_REVIEW_SUCCESS,
    USER_REVIEW_RESET,
    CLEAR_ERRORS,

    ADMIN_PRODUCT_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,

    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_RESET,

    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_RESET,

    UPDATE_PRODUCT_FAIL, 
    UPDATE_PRODUCT_REQUEST, 
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_SUCCESS,
    ALL_REVIEW_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_RESET,
    ALL_REVIEW_SUCCESS,
    
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_SUCCESS,
    
} from "../constants/productConstants"




export const getProduct = (keyword = "", currentPage=1, price=[0,25000], category , ratings = 0) => async (dispatch) => {
    try {
        dispatch({
            type:ALL_PRODUCT_REQUEST
        });
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        if (category){
            if (category === "All"){
                link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
            }
            else{
                link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
            }
        }
        
        const {data} = await axios.get(link)

        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data,
        })
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.error,
        })
    }
}


//Get All Products for Admin
export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({type:ADMIN_PRODUCT_REQUEST});

        const {data} = await axios.get(`/api/v1/admin/products`);

        dispatch({
            type:ADMIN_PRODUCT_SUCCESS,
            payload:data.products,
        })
        
    } catch (error) {
        dispatch({
            type:ADMIN_PRODUCT_FAIL,
            payload:error.response.data.error,
        })
    }
}


//Get Product Detail
export const getProductDetail = (id) => async (dispatch) => {
    try {
        dispatch({
            type:PRODUCT_DETAIL_REQUEST
        });
        const {data} = await axios.get(`/api/v1/product/${id}`)

        dispatch({
            type:PRODUCT_DETAIL_SUCCESS,
            payload:data.product,
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAIL_FAIL,
            payload:error.response.data.error,
        })
    }
}




//Get Review
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({
            type:USER_REVIEW_REQUEST
        });

        const config = {
            headers: {"Content-Type":"application/json"},
        }
        const {data} = await axios.put(`/api/v1/review`, reviewData, config);

        dispatch({
            type:USER_REVIEW_SUCCESS,
            payload:data.success,
        })
    } catch (error) {
        dispatch({
            type:USER_REVIEW_FAIL,
            payload:error.response.data.error,
        })
    }
}


//New Product 
export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({
            type:NEW_PRODUCT_REQUEST
        });

        const config = {
            headers: {"Content-Type":"application/json"},
        }
        const {data} = await axios.post(`/api/v1/admin/product/new`, productData, config);

        dispatch({
            type:NEW_PRODUCT_SUCCESS,
            payload:data,
        })
    } catch (error) {
        dispatch({
            type:NEW_PRODUCT_FAIL,
            payload:error.response.data.error,
        })
    }
}


//Delete a product --- admin
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type:DELETE_PRODUCT_REQUEST
        });

        
        const {data} = await axios.delete(`/api/v1/admin/product/${id}`);

        dispatch({
            type:DELETE_PRODUCT_SUCCESS,
            payload:data.success,
        })
    } catch (error) {
        dispatch({
            type:DELETE_PRODUCT_FAIL,
            payload:error.response.data.error,
        })
    }
}



//Update a product --- admin
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({
            type:UPDATE_PRODUCT_REQUEST
        });

        const config = {
            headers:{
                "Content-Type":"application/json",
            }
        }
        
        const {data} = await axios.put(`/api/v1/admin/product/${id}`, productData, config);

        dispatch({
            type:UPDATE_PRODUCT_SUCCESS,
            payload:data.success,
        })
    } catch (error) {
        dispatch({
            type:UPDATE_PRODUCT_FAIL,
            payload:error.response.data.error,
        })
    }
}




//Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type:CLEAR_ERRORS
    })
}




//Get all reviews of a product- admin
export const getAllReviews = (id) => async (dispatch) => {
    try {
        dispatch({
            type:ALL_REVIEW_REQUEST
        });

       
        const {data} = await axios.get(`/api/v1/reviews?id=${id}`);

        // console.log(data.reviews);

        dispatch({
            type:ALL_REVIEW_SUCCESS,
            payload:data.reviews,
        })

    } catch (error) {
        dispatch({
            type:ALL_REVIEW_FAIL,
            payload:error.response.data.error,
        })
    }
}

//Delete a review
export const deleteReview = (reviewId, productId) => async (dispatch) => {
    try {
        dispatch({
            type:DELETE_REVIEW_REQUEST
        });

        
        const {data} = await axios.delete(`/api/v1/reviews?reviewId=${reviewId}&productId=${productId}`);

        dispatch({
            type:DELETE_REVIEW_SUCCESS,
            payload:data.success,
        })
    } catch (error) {
        dispatch({
            type:DELETE_REVIEW_FAIL,
            payload:error.response.data.error,
        })
    }
}
