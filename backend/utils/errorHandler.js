// What error handler does is modify the message argument of the original Error
//you will have to send error yourself at the end like this

// res.status(err.statusCode).json({
//     success:false,
//     error:err.message,
// })

class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode= statusCode;

        //this will not show the class ErrorHandler in the stack trace
        Error.captureStackTrace(this, this.constructor);
    }

}

module.exports = ErrorHandler;