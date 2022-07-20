import {
    CREATE_ORDER_REQUEST, CREATE_ORDER_FAIL, CREATE_ORDER_SUCCESS, CLEAR_ERRORS,
    MY_ORDER_REQUEST, MY_ORDER_SUCCESS, MY_ORDER_FAIL,
    ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_DETAIL_FAIL,
    ALL_ORDER_FAIL, ALL_ORDER_REQUEST, ALL_ORDER_SUCCESS, 
    UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_RESET, UPDATE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_RESET, DELETE_ORDER_SUCCESS,
} from "../constants/orderConstants"


export const newOrderReducer = (state = {}, action)=>{
    switch(action.type){
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                isLoading:true,
            }
        
        case CREATE_ORDER_SUCCESS:
            return {
                isLoading:false,
                order:action.payload,
            }

        case CREATE_ORDER_FAIL:
            return {
                isLoading:false,
                error:action.payload,
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            }

        default:
            return state;
    }
}


export const myOrdersReducer = (state = {orders:[]}, action)=>{
    switch(action.type){
        case MY_ORDER_REQUEST:
            return {
                isLoading:true,
            }
        
        case MY_ORDER_SUCCESS:
            return {
                isLoading:false,
                order:action.payload,
            }

        case MY_ORDER_FAIL:
            return {
                isLoading:false,
                error:action.payload,
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            }

        default:
            return state;
    }
}

export const orderDetailsReducer = (state = {order:{}}, action)=>{
    switch(action.type){
        case ORDER_DETAIL_REQUEST:
            return {
                isLoading:true,
            }
        
        case ORDER_DETAIL_SUCCESS:
            return {
                isLoading:false,
                order:action.payload,
            }

        case ORDER_DETAIL_FAIL:
            return {
                isLoading:false,
                error:action.payload,
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            }

        default:
            return state;
    }
}


export const allOrdersReducer= (state = {orders:[]}, action)=>{
    switch(action.type){
        case ALL_ORDER_REQUEST:
            return {
                isLoading:true,
            }
        case ALL_ORDER_SUCCESS:
            return {
                isLoading:false,
                orders:action.payload,
            }

        case ALL_ORDER_FAIL:
            return{
                isLoading:false,
                error:action.payload,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            }

        default:
            return state;
    }

}

export const ordersReducer= (state = {orders:[]}, action)=>{
    switch(action.type){
        case UPDATE_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
            return {
                ...state,
                isLoading:true,
            }
        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isUpdated:action.payload
            }
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isDeleted:action.payload
            }
        case UPDATE_ORDER_RESET:

            return{
                ...state,
                isUpdated:false,
            }

        case DELETE_ORDER_RESET:

            return{
                ...state,
                isDeleted:false,
            }

        case UPDATE_ORDER_FAIL:
        case DELETE_ORDER_FAIL:
            return{
                ...state,
                isLoading:false,
                error:action.payload,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            }

        default:
            return state;
    }

}


