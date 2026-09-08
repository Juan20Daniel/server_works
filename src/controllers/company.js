const asyncHandler = require("../utils/asyncHandler");
const companyServices = require('../services/company');

const getCompanysByCreatorId = asyncHandler(async (req, res) => {
    const result = await companyServices.getByCreatorId(
        req.user.id,
        req.query.page,
        req.query.limit
    );

    res.status(201).json({
        message: 'Lista de empresas por creador',
        nextPage: result.nextPage,
        limit: result.limit,
        companies: result.companies,
    });
});

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
    createCompany,
    getCompanysByCreatorId
}