const getByProviderId = require('./getByProviderId');
const getById = require('./getById');
const getByEmail = require('./getByEmail');
const update = require('./update');
const updateByProvider = require('./updateByProvider');
const createByProvider = require('./createByProvider');

module.exports = {
    getByProviderId,
    getById,
    getByEmail,
    update,
    updateByProvider,
    createByProvider
}