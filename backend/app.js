const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const errorMiddleWare = require("./middleware/error.js")

const path = require("path")

//config
if (process.env.NODE_ENV==="PRODUCTION"){
    dotenv.config({path:"backend/config/config.env"});
}


// express.json() is a built in middleware function in Express
//  starting from v4.16.0. It parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.json({limit:"50mb"}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({limit: "50mb",extended:true}))
app.use(fileUpload())
app.use(express.urlencoded({extended: true}));
//Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRouter");
const payment = require("./routes/paymentRoute")
app.use("/api/v1", product);
app.use("/api/v1", user)
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use(express.static(path.join(__dirname, "../frontend/build")))

app.get("*", (req ,res)=>{
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
})
//Middleware for error
//at this point if there is an error then the errorMiddleware will catch that error
// and do its job
app.use(errorMiddleWare);

module.exports= app;

