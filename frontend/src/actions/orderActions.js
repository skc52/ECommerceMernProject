import {
    CREATE_ORDER_REQUEST, CREATE_ORDER_FAIL, CREATE_ORDER_SUCCESS, CLEAR_ERRORS,
    MY_ORDER_REQUEST, MY_ORDER_SUCCESS, MY_ORDER_FAIL,
    ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_DETAIL_FAIL,
    ALL_ORDER_FAIL, ALL_ORDER_REQUEST, ALL_ORDER_SUCCESS, 
    UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_RESET, UPDATE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_RESET, DELETE_ORDER_SUCCESS,
} from "../constants/orderConstants"
import axios from "axios"

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type:CREATE_ORDER_REQUEST,
        })

        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        };

        const {data} = await axios.post("/api/v1/order/new", order, config);

        dispatch({
            type:CREATE_ORDER_SUCCESS, payload:data
        })
    } catch (error) {
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload:error.response.data.error,
        })
    }
}



export const myOrders = () => async (dispatch) => {
    try {
        dispatch({
            type:MY_ORDER_REQUEST,
        })

        const {data} = await axios.get("/api/v1/orders/me");

        dispatch({
            type:MY_ORDER_SUCCESS, payload:data.orders
        })
    } catch (error) {
        dispatch({
            type:MY_ORDER_FAIL,
            payload:error.response.data.error,
        })
    }
}



export const getOrderDetails = (id) => async (dispatch) => {
    try {

        dispatch({
            type:ORDER_DETAIL_REQUEST,
        })
        const {data} = await axios.get(`/api/v1/order/${id}`);
        dispatch({
            type:ORDER_DETAIL_SUCCESS, payload:data.order
        })
        console.log("Yeta")
    } catch (error) {
        dispatch({
            type:ORDER_DETAIL_FAIL,
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



//Get all order -admin
export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({
            type:ALL_ORDER_REQUEST,
        })

        const {data} = await axios.get("/api/v1/admin/orders");

        dispatch({
            type:ALL_ORDER_SUCCESS, payload:data.orders
        })
    } catch (error) {
        dispatch({
            type:ALL_ORDER_FAIL,
            payload:error.response.data.error,
        })
    }
}

//Update an order - admin
export const updateOrder = (id, order) => async (dispatch) => {
    try {
        dispatch({
            type:UPDATE_ORDER_REQUEST,
        })

        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        };

        const {data} = await axios.put(`/api/v1/admin/order/${id}`, order, config);

        dispatch({
            type:UPDATE_ORDER_SUCCESS, payload:data.success
        })
    } catch (error) {
        dispatch({
            type:UPDATE_ORDER_FAIL,
            payload:error.response.data.error,
        })
    }
}

//Delete an order -admin
export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({
            type:DELETE_ORDER_REQUEST,
        })

       

        const {data} = await axios.delete(`/api/v1/admin/order/${id}`);

        dispatch({
            type:DELETE_ORDER_SUCCESS, payload:data.success
        })
    } catch (error) {
        dispatch({
            type:DELETE_ORDER_FAIL,
            payload:error.response.data.error,
        })
    }
}
