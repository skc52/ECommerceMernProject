const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


//Create new order
exports.newOrder  = async (req, res, next)=>{
    try {
        const {shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;
        console.log(req.body);
        const order = await Order.create({
            shippingInfo,
            orderItems, 
            paymentInfo,
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice, 
            paidAt:Date.now(), 
            user:req.user._id,
        })
        console.log("order placed");
        res.status(201).json({
            success:true,
            order
    })
    } catch (error) {
        console.log(error);
    }
    
}

// get single order
exports.getSingleOrder = catchAsyncErrors(async (req,res,next) =>{
    console.log("Here my order")

    const order = await Order.findById(req.params.id).populate("user", "name email");
    //populate - the first parameter fetches all the user information from the user model
    // the second parameter limits the number of fields that we want to fetch from the user
    // this means that in the user field above instead of just storing the id,
    // we will now be storing the name and email as well.

    console.log("Here my order")

    if(!order){
        return next(new ErrorHandler("Order not found with thid Id", 404));

    }

    res.status(200).json({
        success:true,
        order,
    })
})


// get logged in user orders
exports.myOrders = catchAsyncErrors(async (req,res,next) =>{
    const orders = await Order.find({user:req.user._id});
    
    res.status(200).json({
        success:true,
        orders,
    })
})

// get all orders -admin
exports.getAllOrders = catchAsyncErrors(async (req,res,next) =>{
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success:true,
        totalAmount,
        orders,
    })
})

const updateStock = async(id, quantity)=>{
    const product = await Product.findById(id);
    
    product.Stock -= quantity;
    // if (product.Stock < 0) {
    //     return next(new ErrorHandler("Not enough Stock. Update your inventory", 500));
    // }
    await product.save({validateBeforeSave:false});
}
// update order status --admin
exports.updateOrderStatus = catchAsyncErrors(async (req,res,next) =>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this id", 404));
    }
    
    if(order.orderStatus ==="Delivered" ){
        return next(new ErrorHandler("You have delivered this order", 404));
    }



    if (req.body.status === "Shipped"){
        order.orderItems.forEach(async o=>{
           
            await updateStock(o.product, o.quantity);
        });
    }

    order.orderStatus = req.body.status;

    //since we are updating the status of the order,
    // the fact that it is delivered means that it just got delivered
    // thats why clicked the button to set the status to delivered
    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave:false});


    res.status(200).json({
        success:true,
    })
})


// delete order status --admin
exports.deleteOrder = catchAsyncErrors(async (req,res,next) =>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this id", 404));
    }
 
    await order.remove();


    res.status(200).json({
        success:true,
    })
})


