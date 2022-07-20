import React, { useState, useEffect} from 'react'
import "./UpdatePassword.css"

import {MailOutlineOutlined, LockOpenIcon, VPNKey, Lock} from "@mui/icons-material";
import {FaLockOpen, FaEnvelope, FaSmile, FaLock, FaUserLock} from "react-icons/fa"
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, register, updateProfile, changePassword} from '../../actions/userAction';
import { useAlert } from 'react-alert';
import Loading from '../layout/Loader/loading';
import { CHANGE_PASSWORD_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';

 const UpdatePassword = () => {
    const dispatch = useDispatch();
    const {error, isUpdated, isLoading} = useSelector(state=>state.profile);
    const alert = useAlert();
    const navigate = useNavigate();

    

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(changePassword(myForm));
    }


    
    useEffect(()=>{

        
        if(error){
            console.log(error);
            alert.error(error);
            dispatch(clearErrors)
        }

        if (isUpdated){
            alert.success("Password Changed Successfully");
           
            navigate("/account");
            
            dispatch({
                type:CHANGE_PASSWORD_RESET,
            })
        }
    },[dispatch, error, alert, isUpdated])
    return (

        <>
             {isLoading? <Loading/> : 
             <>
                 <MetaData title ="Update Password" />
             <div className="updatePasswordContainer">
                 <div className="updatePasswordBox">
                     <h2 className='updatePasswordHeading'>Update Password</h2>
                 <form className='updatePasswordForm' encType = "multipart/form-data" onSubmit={updatePasswordSubmit} >
                             
         
                             
                        <div className="updatePassword">
                                    {/* <LockOpenIcon/> */}
                                    {/* <VPNKey/> */}
                                    <FaUserLock/>
                                    <input
                                        type = "password"
                                        placeholder='Old Password'
                                        required
                                        value={oldPassword}
                                        onChange = {(e)=>setOldPassword(e.target.value)}
                                    />
                        </div>
                        <div className="updatePassword">
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
                        <div className="updatePassword">
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
                             <input type="submit" value="Change" className='updatePasswordBtn' 
                             /*disabled = {isLoading? true:false}*/ />
                         </form>
                 </div>
             </div>
             </>
             }
        </>
       )
}


export default UpdatePassword;