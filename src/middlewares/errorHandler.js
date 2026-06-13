const { AppError, errors } = require("../utils/error")

const errorHandler = (err, req, res, next) => {
    if(err instanceof AppError) {
        if(process.env.NODE_ENV === 'develop') {
            console.log(err);
        }
        return res.status(errors[err.errorCode].status).json({
            errorCode:err.errorCode,
            message:err.message,
            data:err.data??undefined
        });
    }
    if(process.env.NODE_ENV === 'develop') {    
        console.log(err)
    }
    return res.status(errors['INTERNAL_SERVER'].status).json({
       status: "error",
       message: "Internal Server Error",
   });
}

module.exports = errorHandler;