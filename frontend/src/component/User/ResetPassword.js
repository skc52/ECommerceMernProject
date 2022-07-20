import React, { useState, useEffect} from 'react'
import "./ResetPassword.css"

import {MailOutlineOutlined, LockOpenIcon, VPNKey, Lock} from "@mui/icons-material";
import {FaLockOpen, FaEnvelope, FaSmile, FaLock, FaUserLock} from "react-icons/fa"
import { useNavigate , useParams} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword} from '../../actions/userAction';
import { useAlert } from 'react-alert';
import Loading from '../layout/Loader/loading';
import { CHANGE_PASSWORD_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';
const ResetPassword = () => {
    const dispatch = useDispatch();
    const {error, success, isLoading} = useSelector(state=>state.forgotPassword);
    const alert = useAlert();
    const navigate = useNavigate();
    const {token} = useParams();

    

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch( resetPassword(token,myForm));
    }


    
    useEffect(()=>{

        
        if(error){
            console.log(error);
            alert.error(error);
            dispatch(clearErrors)
        }

        if (success){
            alert.success("Password Reset Successfully");
           
            navigate("/login");
            
            
        }
    },[dispatch, error, alert, success])
    return (

        <>
             {isLoading? <Loading/> : 
             <>
                 <MetaData title ="Reset Password" />
             <div className="resetPasswordContainer">
                 <div className="resetPasswordBox">
                     <h2 className='resetPasswordHeading'>Reset Password</h2>
                 <form className='resetPasswordForm' encType = "multipart/form-data" onSubmit={resetPasswordSubmit} >
                             
         
                             
                       
                        <div className="resetPassword">
                                    {/* <LockOpenIcon/> */}
                                    <FaLockOpen/>
                                    <input
                                        type = "password"
                                        placeholder='New Password'
                                        required
                                        value={newPassword}
                                        onChange = {(e)=>setNewPassword(e.target.value)}
                                    />
                        </div>
                        <div className="resetPassword">
                                    {/* <LockOpenIcon/> */}
                                    <Lock/>
                                    <input
                                        type = "password"
                                        placeholder='Confirm Password'
                                        required
                                        value={confirmPassword}
                                        onChange = {(e)=>setConfirmPassword(e.target.value)}
                                    />
                        </div>
                             <input type="submit" value="Reset" className='resetPasswordBtn' 
                             /*disabled = {isLoading? true:false}*/ />
                         </form>
                 </div>
             </div>
             </>
             }
        </>
       )
}

export default ResetPassword