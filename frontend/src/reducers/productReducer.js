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

export const productsReducer = ( state = {products:[]}, action)=>{
    switch (action.type){
        
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return {
                isLoading:true,
                products:[],
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                isLoading:false,
                products:action.payload.products,
                productsCount:action.payload.productsCount,
                resultPerPage:action.payload.resultPerPage,
                filteredCount:action.payload.filteredCount
            }

        case ADMIN_PRODUCT_SUCCESS:
            return {
                isLoading:false,
                products:action.payload,
            }

        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return {
                isLoading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state;
    }
}

export const productDetailReducer = ( state = {product:{}}, action)=>{
    switch (action.type){
        
        case PRODUCT_DETAIL_REQUEST:
            return {
                isLoading:true,
                ...state,
            }
        case PRODUCT_DETAIL_SUCCESS:
            return {
                isLoading:false,
                product:action.payload
            }

        case PRODUCT_DETAIL_FAIL:
            return {
                isLoading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state;
    }
}

export const newReviewReducer = ( state = {}, action)=>{
    switch (action.type){
        
        case USER_REVIEW_REQUEST:
            return {
                ...state,
                isLoading:true,
                
            }
        case USER_REVIEW_SUCCESS:
            return {
                isLoading:false,
                success:action.payload
            }

        case USER_REVIEW_FAIL:
            return {
                ...state,
                isLoading:false,
                error:action.payload
            }
        case USER_REVIEW_RESET:
            return {
                ...state,
                success: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state;
    }
}

export const newProductReducer = ( state = {product:{}}, action)=>{
    switch (action.type){
        
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading:true,
                
            }
        case NEW_PRODUCT_SUCCESS:
            return {
                isLoading:false,
                success:action.payload.success,
                product:action.payload.product
            }

        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                isLoading:false,
                error:action.payload
            }
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state;
    }
}


export const productReducer = ( state = {}, action)=>{
    switch (action.type){
        
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading:true,
                
            }
        case DELETE_PRODUCT_SUCCESS:
        
            return {
                ...state,
                isLoading:false,
                isDeleted:action.payload,
            }

        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isUpdated:action.payload,
            }
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                isLoading:false,
                error:action.payload
            }

        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted:false,
            }

        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated:false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state;
    }
}


export const productReviewsReducer = ( state = {reviews:[]}, action)=>{
    switch (action.type){
        
        case ALL_REVIEW_REQUEST:
            return {
                isLoading:true,
                ...state,
            }
        case ALL_REVIEW_SUCCESS:
            return {
                
                isLoading:false,
                reviews:action.payload
            }

        case ALL_REVIEW_FAIL:
            return {
                ...state,
                isLoading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state;
    }
}


export const reviewReducer = ( state = {}, action)=>{
    switch (action.type){
        
        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                isLoading:true,
                
            }
        case DELETE_REVIEW_SUCCESS:
            return {
                isLoading:false,
                isDeleted:action.payload
            }

        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                isLoading:false,
                error:action.payload
            }
        case DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state;
    }
}
