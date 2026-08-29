const validateField = require('./validateField');
const autenticate = require('./autenticate');
const errorHandler = require('./errorHandler');
const authorize = require('./authorize');
const uploadImage = require('./uploadImage');

module.exports = {
    validateField,
    autenticate,
    errorHandler,
    authorize,
    uploadImage
}