import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../layout/Loader/loading'
import MetaData from '../layout/MetaData'
import "./Account.css"
import Profile from "../../images/profile.png"


const Account = ({url}) => {
    const {user, isLoading, isAuthenticated} = useSelector(state=>state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(()=>{
        console.log(`K ho ${isAuthenticated}`);
        if (!isAuthenticated){
            navigate("/login")
        }
        
        
    }, [ isAuthenticated])


  return (
    <>
        {isLoading ?  <Loading/> :
        (<>
        
            <MetaData title = {`${user.name}'s Profile`}/>
            <div className="profileContainer">
                <div>
                    <h1>My Profile</h1>
                    <img src = {user.avatar.url? user.avatar.url:Profile} alt={user.name} />
                    <Link to = "/me/update" >Edit Profile</Link>
                </div>
                <div>
                    <div>
                        <h4>Full Name</h4>
                        <p>{user.name}</p>
                    </div>
                    <div>
                        <h4>Email</h4>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <h4>Joined on</h4>
                        <p>{String(user.createdAt).substr(0,10)}</p>
                    </div>
                    <div>
                        <Link to = "/orders">My Orders</Link>
                        <Link to = "/password/update">Change Password</Link>
                    </div>
                </div>
            </div>
        </>)}
    </>
  )
}

export default Account