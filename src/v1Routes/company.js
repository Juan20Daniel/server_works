const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company');
const { autenticate, authorize, validateField } = require('../middlewares');
const { ROLES } = require('../constants');
const companySchema = require('../schemas/company.schema');

router.post('/',
    autenticate,
    authorize([ROLES.USER, ROLES.ADMIN]),
    
    // validateField(companySchema.createCompany),
    companyController.createCompany
);

module.exports = router;