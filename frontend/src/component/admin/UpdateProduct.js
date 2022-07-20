import React, {useEffect, useState} from 'react'
import "./NewProduct.css";
import {useSelector, useDispatch} from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, updateProduct, getProductDetail } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import {AccountTree, Description, Storage, Spellcheck, AttachMoney} from "@mui/icons-material"
import Sidebar from './Sidebar';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';

const UpdateProduct = () => {
    const categories = [
        "All",
        "laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "Smartphones"
    ]


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const {isLoading, error:updateError, isUpdated} = useSelector(state=>state.product)
    const {error, product} = useSelector(state=>state.productDetail)
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [oldImages, setOldImages] = useState([]);

    const {id} = useParams();
    const productId = id;

    useEffect(()=>{

        if (product && product._id !== productId){
            dispatch(getProductDetail(productId))
        }else{
            setName(product.name)
            setDescription(product.description)
            setPrice(product.price)
            setCategory(product.category)
            setStock(product.Stock)
            setOldImages(product.images)
        }

        if (updateError){
            alert.error(updateError)
            dispatch(clearErrors());
        }

        if (error){
            alert.error(error)
            dispatch(clearErrors());
        }

        if (isUpdated){
            alert.success("Product Updated Successfully");
            navigate("/admin/products")
            dispatch({type:UPDATE_PRODUCT_RESET});

        }

    }, [dispatch, alert, error, updateError, isUpdated, navigate, productId, product]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);

        images.forEach((image)=>{
            myForm.append("images", image);
        })

        dispatch(updateProduct(productId,myForm));

    }

    const updateProductImagesChange = (e) => {

        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
        console.log(files);

        try {
            files.forEach((file)=>{
                const reader = new FileReader();
    
                reader.onload = () => {
                    if (reader.readyState=== 2){
                        setImagesPreview((old)=>[...old, reader.result]);
                        setImages((old)=>[...old, reader.result]);
                    }
                }
    
                reader.readAsDataURL(file);
            });
            
        } catch (error) {
            console.log(error);
        }
        
    }


  return (
   <>
        <MetaData title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
              <Spellcheck />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoney />
              <input
                type="number"
                placeholder="Price"
                required
                value = {price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <Description/>

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTree />
              <select value = {category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Storage />
              <input
                type="number"
                placeholder="Stock"
                required
                value = {Stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"

                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages && oldImages.map((image, index) => (
                <img key={index} src={image.url} alt="Old Product Preview" />
              ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={isLoading ? true : false}

            >
              Update
            </Button>
          </form>
        </div>
      </div>
   </>
  )
}

export default UpdateProduct