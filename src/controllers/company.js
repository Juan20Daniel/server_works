const asyncHandler = require("../utils/asyncHandler");

const createCompany = asyncHandler(async (req, res) => {
    
    console.log(req.body)

    res.status(201).json({
        message: 'Empresa creada',
       
    })
});

module.exports = {
    createCompany
}