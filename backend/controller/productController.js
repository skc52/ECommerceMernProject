const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");




//Create product -> Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

        let images = [];
        if (typeof(req.body.images) ==="string"){
            images.push(req.body.images);
        }else{  
            images = req.body.images;
        }

        const imagesLink = [];
        for (let i = 0; i < images.length; i++){
            const result = await cloudinary.v2.uploader.upload(images[i],{
                folder:"products",
            })
            imagesLink.push({
                public_id:result.public_id,
                url:result.secure_url,
            })
        }

        req.body.images = imagesLink;
        req.body.user = req.user.id;
        const product = await Product.create(req.body);
        res.status(201).json({
        success:true,
        product
    })
   
})

//Get all products



exports.getAllProducts = async (req, res)=>{
    try{
        console.log("here")
    
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    await Product.countDocuments()
    await Product.countDocuments()
    await Product.countDocuments()
    const apiFeature = new ApiFeatures( Product, req.query);
    apiFeature.search();
    apiFeature.filter();
    
    let products =  await apiFeature.query;
    const filteredCount = products.length;
    apiFeature.pagination(resultPerPage);
    products = await apiFeature.query.clone();
    
    console.log(filteredCount);
    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
      filteredCount
      
    });
    } catch(error) {
        console.log(`Error is ${error}`)
    }
  
    
}


//Get All Products -- admin
exports.getAdminProducts = async (req, res)=>{
    try{
       
    const products = await Product.find();
    
    res.status(200).json({
      success: true,
      products,
      
      
    });
    } catch(error) {
        console.log(`Error is ${error}`)
    }
  
    
}


//Get Product Details
exports.getProductDetails = catchAsyncErrors(async(req, res, next) => {
 
        const product = await Product.findById(req.params.id);

        if(!product){
            return next(new ErrorHandler("Product Not Found", 404));
        }
        
        res.status(200).json({
            success:true,
            product
        })
})


//Update product -- admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {

        let product = await Product.findById(req.params.id);

       if(!product){
            return next(new ErrorHandler("Product Not Found", 404));
        }

        // console.log(req.body);
        console.log("--------------------------------------------------");
        //images start here
        let images = [];
        if (typeof req.body.images === "string"){
            images.push(req.body.images);
        }
        else{
            images = req.body.images;
        }
        // console.log(images);
        if (images !== undefined){
            console.log("Here");
            for(let i = 0; i < product.images.length; i++){
                await cloudinary.v2.uploader.destroy(product.images[i].public_id);
            }

            const imagesLinks = [];

            for (let i = 0; i < images.length; i++){
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder:"products",
                })

                imagesLinks.push({
                    public_id:result.public_id,
                    url:result.secure_url,
                })
            }

            req.body.images = imagesLinks;
        }
        // console.log(req.body.images);
       
        //new:true returns the object after it has been modified
        const productUpdated = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true,
            runValidators:true,
            useFindAndModify:false
        
        });

        // console.log("Updated");
        // console.log(productUpdated);
        res.status(200).json({
            success:true,
            product:productUpdated
        })
    
   
})

//Delete a product --admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
   
        const product = await Product.findById(req.params.id);
        if(!product){
            return next(new ErrorHandler("Product Not Found", 404));
        }
        
        //deleting images from cloudinary
        for(let i= 0; i < product.images.length; i++){
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }


        await product.remove();
        res.status(200).json({
            success:true,
            message:"Product Deleted Successfully",
        })
    
})


//Create new review or update the new review
exports.createProductReview  = catchAsyncErrors(async (req, res, next)=>{
    const {rating, comment, productId} = req.body;
    const review = {
        user:req.user.id,
        name:req.user.name,
        rating:Number(rating),
        comment,

    }
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(rev=>rev.user.toString()===req.user._id.toString());
    if(isReviewed){
        product.reviews.forEach((rev)=>{
            if (rev.user.toString()===req.user._id.toString()){
                rev.rating = rating;
                rev.comment = comment;
                
            }
        })
    }else{
        product.reviews.push(review);
        product.numOfReview = product.reviews.length;
        
    }

    let average = 0;
    product.reviews.forEach(rev=>{
        average += rev.rating;
    })
    console.log(average);
    product.ratings = average/product.numOfReview;

    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
    })

})


exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    console.log("Here");
    const product = await Product.findById(req.query.id);
    console.log("Here")
    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }
    console.log(product.reviews);

    res.status(200).json({
        success:true,
        reviews:product.reviews,
    });
})

exports.deleteReview = catchAsyncErrors(async (req, res, next)=>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }
    console.log(product.reviews[0]._id.toString(),req.query.reviewId )
    const reviews = product.reviews.filter(rev=>rev._id.toString()!== req.query.reviewId);
    console.log("here1")
    let average = 0;
    reviews.forEach(rev=>{
        average += rev.rating;
    });
    let ratings = 0;
    if(reviews.length === 0){
        ratings = 0;
    }
    else{
        ratings = average / reviews.length;
    }
    const numOfReview  = reviews.length;
    
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReview,
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    console.log("Here2")

    res.status(200).json({
        success:true,
    })
})