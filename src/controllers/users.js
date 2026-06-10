const asyncHandler = require("../utils/asyncHandler");

const getUserById = asyncHandler(async (req, res) => {
    
    res.status(200).json({
        message:'Usuario'
    })
});

module.exports = {
    getUserById   
}