import React, {useRef, useState, useEffect} from 'react'
import "./LoginSignUp.css"
import { Link, useNavigate, useLocation } from 'react-router-dom';
// import {MailOutlineOutlined, LockOpenIcon} from "@mui/icons-material";
import {FaLockOpen, FaEnvelope, FaSmile} from "react-icons/fa"
import Profile from "../../images/profile.png";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, login, register } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import Loading from '../layout/Loader/loading';

const LoginSignUp = () => {

    const dispatch = useDispatch();
    const {error, isLoading, isAuthenticated,  } = useSelector(state => state.user);
    const alert = useAlert();
    const navigate = useNavigate();
    const location = useLocation();

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
    })
    const {name, email, password} = user;

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState(Profile)
    const loginSubmit = (e) => {
        e.preventDefault()
        dispatch(login(loginEmail, loginPassword));
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name)
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);

        dispatch(register(myForm));
    }


    const registerDataChange = (e) => {
        if(e.target.name === "avatar"){
            const reader = new FileReader();
            reader.onload = () => {
                //has 3 states 0 1 2
                if (reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);

                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }else{
            setUser({...user, [e.target.name]:e.target.value})
        }
    }

    const redirect = location.search ? location.search.split("=")[1]:"/account"

    useEffect(()=>{
        if(error){
            console.log(error);
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isAuthenticated){
            navigate(redirect);
        }
    },[dispatch, error, alert, isAuthenticated, redirect])

    const switchTab = (e, tab) => {
        if (tab === "login"){
            switcherTab.current.classList.remove("shiftLineToRegisterSide")

            //move the loginTab to its original place
            loginTab.current.classList.remove("shiftLoginTabToLeft");

            //move the registerTab to its original place
            registerTab.current.classList.remove("shiftRegisterTabToUp")
        }
        if (tab === "register"){
            switcherTab.current.classList.add("shiftLineToRegisterSide")

            //shift loginTab to left
            loginTab.current.classList.add("shiftLoginTabToLeft");
            
            //shift registerTab to up
            registerTab.current.classList.add("shiftRegisterTabToUp");

        }
    }
  return (
    <>
        {isLoading ? <Loading/> : 
            <>
            <div className="LoginSignUpContainer">
                <div className="LoginSignUpBox">
                    <div>
                        <div className="login_signup_toggle">
                            <p onClick={(e)=>switchTab(e, "login")} >LOGIN</p>
                            <p onClick = {(e)=>switchTab(e, "register")} >REGISTER</p>
                        </div>
                        <button ref = {switcherTab} className = "shiftLineToLoginSide" ></button>
                    </div>
                    <form className='loginForm' ref = {loginTab} onSubmit = {loginSubmit} >
                        <div className="loginEmail">
                            {/* <MailOutlineOutlined/> */}
                            <FaEnvelope/>
                            <input
                                type = "email"
                                placeholder='Email'
                                required
                                value={loginEmail}
                                onChange = {(e)=>setLoginEmail(e.target.value)}
                            />
                        </div>
    
                        <div className="loginPassword">
                            {/* <LockOpenIcon/> */}
                            <FaLockOpen/>
                            <input
                                type = "password"
                                placeholder='password'
                                required
                                value={loginPassword}
                                onChange = {(e)=>setLoginPassword(e.target.value)}
                            />
                        </div>
                        <Link to = "/password/forgot">Forgot Password ?</Link>
                        <input type="submit"  value = "Login" className = "loginBtn" name="" id="" />
                    </form>
    
                    <form className='signUpForm' ref = {registerTab} encType = "multipart/form-data" onSubmit={registerSubmit} >
                        <div className="signUpName">
                            <FaSmile/>
                            <input
                                type = "text"
                                placeholder='Name'
                                required
                                name = "name"
                                value = {name}
                                onChange = {registerDataChange}
                            />
                        </div>
                        <div className="signUpEmail">
                            <FaEnvelope/>
                            <input type="email" placeholder='Email' required name = "email" value = {email} onChange = {registerDataChange} />
                        </div>
    
                        <div className="signUpPassword">
                            <FaLockOpen/>
                            <input type="password" placeholder='Password' required name="password" value={password} onChange={registerDataChange}/>
                        </div>
                        <div id="registerImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input type="file" name="avatar" accept='image/*' onChange={registerDataChange} />
                        </div>
                        <input type="submit" value="Register" className='signUpBtn' 
                        /*disabled = {isLoading? true:false}*/ />
                    </form>
                </div>
            </div>
        </>
        }
    </>
  )
}

export default LoginSignUp