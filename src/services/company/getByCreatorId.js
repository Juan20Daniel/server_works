const Company = require('../../models/Company');
const normalizePageNum = require('../../utils/normalizePageNum');

const getByCreatorId = async (id, page=1) => {
    console.log({page:normalizePageNum(page)});

    const limit = 10;
    const companys = await Company.find({
        createBy: id,
        isActive: true
    })
    .select('-__v')
    .limit(10)
    .skip((page - 1) * limit)

    return companys;
}

module.exports = getByCreatorId;