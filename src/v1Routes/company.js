const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company');
const companySchema = require('../schemas/company.schema');
const { ROLES } = require('../constants');
const { UPLOAD_POLICIES } = require('../constants');
const {
    autenticate,
    authorize,
    validateField,
    uploadImage
} = require('../middlewares');

router.post('/',
    autenticate,
    authorize([ROLES.USER, ROLES.ADMIN]),
    uploadImage(UPLOAD_POLICIES.COMPANY_LOGO),
    validateField(companySchema.createCompany),
    companyController.createCompany
);

module.exports = router;