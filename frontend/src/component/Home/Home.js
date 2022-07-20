import React, { Fragment, useEffect} from 'react'
import {CgMouse} from 'react-icons/all'
import "./Home.css"
import Product from "./Product.js"
import MetaData from '../layout/MetaData'
import { getProduct, clearErrors } from '../../actions/productAction';
import { clearErrors as clearUserErrors } from '../../actions/userAction'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../layout/Loader/loading'
import { useAlert } from 'react-alert'



const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const {isLoading, error,  products, productsCount} = useSelector(state=>state.products)
  const {error:userError} = useSelector(state=>state.user);

  useEffect(()=>{
    if (error){
      alert.error(error);
      dispatch(clearErrors());
    }
    if (userError){
      alert.error(userError);
      dispatch(clearUserErrors());
    }
    dispatch(getProduct())
  }, [dispatch, error, alert, userError]);
  return (
    <Fragment>
      {isLoading ? <Loading/>:<Fragment>
      <MetaData title = "ECommerce"/> 
        <div className="banner">
            <p>Welcome to ECommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse/>
              </button>
            </a>
        </div>

        <h2 className='homeHeading'>Featured Products</h2>
        <div className="container" id='container'>
         {products && products.map(product=>(
          <Product product = {product}/>
         ))}

        </div>
    </Fragment>}
    </Fragment>
  )
}

export default Home