import React, {useEffect, useState} from 'react'
// import "./NewProduct.css";
import {useSelector, useDispatch} from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, createProduct } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import {AccountTree, MailOutline, Person} from "@mui/icons-material"
import Sidebar from './Sidebar';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import { getUserDetails, updateUser } from '../../actions/userAction';
import Loading from '../layout/Loader/loading';
const UpdateUser = () => {
    

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const {isLoading, user, error} = useSelector(state=>state.userDetails);
    const {isLoading:updateLoading, error:updateError, isUpdated} = useSelector(state=>state.profile)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
   
    const {id} = useParams();
    useEffect(()=>{
        
        if (user && user._id!==id){
            console.log("Herswswe")
            dispatch(getUserDetails(id));
            console.log("Here")
        }
        else{
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }

        if (error){
            alert.error(error)
            dispatch(clearErrors());
        }

        if (updateError){
            alert.error(updateError)
            dispatch(clearErrors());
        }


        if (isUpdated){
            alert.success("User Updated Successfully");
            navigate("/admin/users")
            dispatch({type:UPDATE_USER_RESET});

        }


    }, [dispatch, user, alert,updateError,  error, isUpdated, navigate, id]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);
        

        dispatch(updateUser(id,myForm));

    }

   

  return (
   <>
        <MetaData title="Update User" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
            {
                isLoading? <Loading/> :<>
                
                <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateUserSubmitHandler}
          >
            <h1>Update User</h1>

            <div>
              <Person />
              <input
                type="text"
                placeholder="User Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <MailOutline />
              <input
                type = "email"
                placeholder="Email"
                required
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <AccountTree />
              <select value = {role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Choose Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                
              </select>
            </div>

            

           

        
            <Button
              id="createProductBtn"
              type="submit"
              disabled={updateLoading ? true : false || role === ""?true:false}

            >
              Update
            </Button>
          </form>
                </>
            }
        </div>
      </div>
   </>
  )
}

export default UpdateUser