const { AppError,  } = require('../utils/error');

const validateField = (schema) => {
    return (req, res, next) => {
        
        const result = schema.safeParse({
            body: req.body,
            params: req.params,
            query: req.query
        });

       if(!result.success) {
            const errors = result.error.issues.map(error => {
                const {path, message} = error;
                return {
                    field:path[1],
                    message
                }
            })
            return next(new AppError(
                'VALIDATION', 
                'Error al validar campos',
                true,
                errors
            ));
        }
        
        next();
    }
}

module.exports = validateField;