const asyncHandler = require("../utils/asyncHandler");
const companyServices = require('../services/company');

const createCompany = asyncHandler(async (req, res) => {
    
    const result = await companyServices.createCompany(req.user, req.body, req.file);

    res.status(201).json({
        message: 'Empresa creada',
        company: result
    });
});

module.exports = {
    createCompany
}