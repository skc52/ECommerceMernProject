import React, { useState, useEffect} from 'react'
import "./ForgotPassword.css"
import { Link, useNavigate } from 'react-router-dom';
// import {MailOutlineOutlined, LockOpenIcon} from "@mui/icons-material";

import {FaEnvelope, FaSmile} from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword} from '../../actions/userAction';
import { useAlert } from 'react-alert';
import Loading from '../layout/Loader/loading';
import MetaData from '../layout/MetaData';
const ForgotPassword = () => {


    const dispatch = useDispatch();
    const alert = useAlert();
    const {error, message, isLoading} = useSelector(state=>state.forgotPassword);
    const [email, setEmail] = useState("");


    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
    }


    useEffect(()=>{

        
        if (error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if (message){
            alert.success(message);
        }
    }, [dispatch, error, alert, message])

  return (
    
    
    <>
    {isLoading? <Loading/> : 
    <>
        <MetaData title ="Forgot Password" />
    <div className="forgotPasswordContainer">
        <div className="forgotPasswordBox">
            <h2 className='forgotPasswordHeading'>Forgot Password</h2>
        <form className='forgotPasswordForm' onSubmit={forgotPasswordSubmit} >
                    

                    
                    <div className="forgotPasswordEmail">
                        <FaEnvelope/>
                            <input type="email" placeholder='Email' required name = "email" value = {email} onChange = {(e)=>setEmail(e.target.value)} />
                        </div> 
              
                    <input type="submit" value="Send" className='forgotPasswordBtn' 
                    /*disabled = {isLoading? true:false}*/ />
                </form>
        </div>
    </div>
    </>
    }
</>
  )
}

export default ForgotPassword