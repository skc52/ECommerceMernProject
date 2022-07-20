import React, { useState, useEffect} from 'react'
import "./UpdateProfile.css"
import { Link, useNavigate } from 'react-router-dom';
// import {MailOutlineOutlined, LockOpenIcon} from "@mui/icons-material";

import {FaEnvelope, FaSmile} from "react-icons/fa"
import Profile from "../../images/profile.png"
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, register, updateProfile} from '../../actions/userAction';
import { useAlert } from 'react-alert';
import Loading from '../layout/Loader/loading';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';
const UpdateProfile = () => {
    const dispatch = useDispatch();
    const {user  } = useSelector(state => state.user);
    const {error, isUpdated, isLoading} = useSelector(state=>state.profile);
    const alert = useAlert();
    const navigate = useNavigate();

    

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(Profile)

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name)
        myForm.set("email", email);
     
        myForm.set("avatar", avatar);

        dispatch(updateProfile(myForm));
    }


    const updateProfileDataChange = (e) => {
            const reader = new FileReader();
            reader.onload = () => {
                //has 3 states 0 1 2
                if (reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);

                }
            };
            reader.readAsDataURL(e.target.files[0]);
    }

    useEffect(()=>{

        if (user){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        if(error){
            console.log(error);
            alert.error(error);
            dispatch(clearErrors)
        }

        if (isUpdated){
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());

            navigate("/account");
            
            dispatch({
                type:UPDATE_PROFILE_RESET,
            })
        }
        
    },[dispatch, error, alert, user, isUpdated])


  return (

   <>
        {isLoading? <Loading/> : 
        <>
            <MetaData title ="Update Profile" />
        <div className="updateProfileContainer">
            <div className="updateProfileBox">
                <h2 className='updateProfileHeading'>Update Profile</h2>
            <form className='updateProfileForm' encType = "multipart/form-data" onSubmit={updateProfileSubmit} >
                        <div className="updateProfileName">
                            <FaSmile/>
                            <input
                                type = "text"
                                placeholder='Name'
                                required
                                name = "name"
                                value = {name}
                                onChange = {(e)=>setName(e.target.value)}
                            />
                        </div>
                        <div className="updateProfileEmail">
                            <FaEnvelope/>
                            <input type="email" placeholder='Email' required name = "email" value = {email} onChange = {(e)=>setEmail(e.target.value)} />
                        </div>
    
                        
                        <div id="updateProfileImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input type="file" name="avatar" accept='image/*' onChange={updateProfileDataChange} />
                        </div>
                        <input type="submit" value="Update Profile" className='updateProfileBtn' 
                        /*disabled = {isLoading? true:false}*/ />
                    </form>
            </div>
        </div>
        </>
        }
   </>
  )
}

export default UpdateProfile