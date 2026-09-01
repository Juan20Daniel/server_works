const asyncHandler = require("../utils/asyncHandler");
const companyServices = require('../services/company');

const createCompany = asyncHandler(async (req, res) => {
    
    await companyServices.createCompany(req.user, req.body, req.file);

    res.status(201).json({
        message: 'Empresa creada',
       
    });
});

module.exports = {
    createCompany
}