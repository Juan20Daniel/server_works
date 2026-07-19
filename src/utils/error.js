const errors = {
    BAD_REQUEST:{code:'BAD_REQUEST', status:400},
    DUPLICATE_EMAIL:{code:'DUPLICATE_EMAIL', status:409},
    DUPLICATE_PHONE:{code:'DUPLICATE_PHONE', status:409},
    VALIDATION:{code:'VALIDATION', status:400},
    UNAUTHORIZED:{code:'UNAUTHORIZED', status:401},
    NOT_FOUND:{code:'NOT_FOUND', status:404},
    INTERNAL_SERVER:{code:'INTERNAL_SERVER', status:500},
    FORBIDDEN:{code:'FORBIDDEN', status:403}, //Pero intenta acceder a un recurso exclusivo pero los privilegios no son suficientes
    INVALID_FACEBOOK_TOKEN_TYPE: {code:'INVALID_FACEBOOK_TOKEN_TYPE', status:400},
    FACEBOOK_INVALID_TOKEN: {code:'FACEBOOK_INVALID_TOKEN', status:401},
    FACEBOOK_PROFILE_REQUEST_FAILED: {code:'FACEBOOK_PROFILE_REQUEST_FAILED', status:500},
};

class AppError extends Error {
    constructor(errorCode, description, isOperational, data=null) {
        super(description);
        //para que funcione correctamente
        Object.setPrototypeOf(this, new.target.prototype);

        this.errorCode = errors[errorCode].code;
        this.isOperational = isOperational;
        this.data = data;
        //Para eliminar el ruido innecesario
        Error.captureStackTrace(this);
    }
}

module.exports = {
    AppError,
    errors
}