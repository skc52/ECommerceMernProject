
import {LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, CLEAR_ERRORS, REGISTER_FAIL, REGISTER_REQUEST
    , REGISTER_SUCCESS, LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAIL, LOGOUT_FAIL, LOGOUT_SUCCESS
    ,UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_RESET,
    CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_RESET,
    FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
    ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS,
    UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_RESET, UPDATE_USER_SUCCESS,
    DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_RESET, DELETE_USER_SUCCESS ,
    USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS
} from "../constants/userConstants";


export const userReducer = (state = {user:{}}, action)=>{
    switch(action.type){
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_REQUEST:
            return {
                ...state,
                isLoading:true,
                isAuthenticated:false,
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isAuthenticated:true,
                user:action.payload
            }

        case LOGOUT_SUCCESS:
            return {
                isLoading:false,
                user:null,
                isAuthenticated:false
            }
        
        case LOGOUT_FAIL:
            return{
                ...state,
                isLoading:false,
                error:action.payload
            }
        
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                ...state,
                isLoading:false,
                isAuthenticated:false,
                error:action.payload,
                user:null,
                
            }

        case LOAD_FAIL:
            return {
                isLoading:false,
                isAuthenticated:false,
                error:action.payload,
                user:null,
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


export const profileReducer = (state = {}, action)=>{
    switch(action.type){
        case UPDATE_PROFILE_REQUEST:
        case CHANGE_PASSWORD_REQUEST:
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
       
            return {
                ...state,
                isLoading:true,
            }
        case UPDATE_PROFILE_SUCCESS:
        case CHANGE_PASSWORD_SUCCESS:
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isUpdated:action.payload
            }

        
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isDeleted:action.success,
                message:action.payload.message,
            }
          
        
        case UPDATE_PROFILE_FAIL:
        case CHANGE_PASSWORD_FAIL:
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                isLoading:false,
                error:action.payload,
            }

        case UPDATE_PROFILE_RESET:
        case CHANGE_PASSWORD_RESET:
        case UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated:false
            }

        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted:false
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


export const forgotPasswordReducer = (state = {}, action)=>{
    switch(action.type){
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
       
            return {
                ...state,
                isLoading:true,
                error:null
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading:false,
                message:action.payload
            }
        
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading:false,
                success:action.payload
            }

        
        
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                isLoading:false,
                error:action.payload,
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

export const allUsersReducer = (state = {users:[]}, action)=>{
    switch(action.type){
        case ALL_USERS_REQUEST:
       
            return {
                ...state,
                isLoading:true,
              
            }
        case ALL_USERS_SUCCESS:
            return {
                ...state,
                isLoading:false,
                users:action.payload
            }
      
        
        
        case ALL_USERS_FAIL:
            return {
                ...state,
                isLoading:false,
                error:action.payload,
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

export const userDetailsReducer = (state = {user:{}}, action)=>{
    switch(action.type){
        case USER_DETAILS_REQUEST:
       
            return {
                ...state,
                isLoading:true,
              
            }
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading:false,
                user:action.payload
            }
      
        
        
        case USER_DETAILS_FAIL:
            return {
                ...state,
                isLoading:false,
                error:action.payload,
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