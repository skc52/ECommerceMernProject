import React from 'react'
import { useSelector } from 'react-redux'
import {Route, useNavigate} from "react-router-dom"
const ProtectedRoute = ({element:Element, ...rest}) => {
    const {isLoading, isAuthenticated, user } = useSelector((state)=>state.user);
    const navigate = useNavigate();
  return (
    <>
        {!isLoading && (
            <Route
                {...rest}
                render = {(props)=>{
                    if (!isAuthenticated){
                        return navigate("/login")
                    }
                    return <Element {...props}/>
                }}
            />
        )}
    </>
   
  )
}

export default ProtectedRoute