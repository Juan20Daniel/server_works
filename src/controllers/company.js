const asyncHandler = require("../utils/asyncHandler");
const companyServices = require('../services/company');

const createCompany = asyncHandler(async (req, res) => {
    
    const company = await companyServices.createCompany(
        req.user, 
        req.body, 
        req.file
    );

    res.status(201).json({
        message: 'Empresa creada',
        company: company
    });
});

module.exports = {
    createCompany
}