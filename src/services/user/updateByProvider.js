const update = require('./update');
const getById = require('./getById');

const updateByProvider = async (lastUser, newUser) => {
    const fieldsToUpdate = {}

    if(newUser.given_name !== lastUser.firstname) {
        fieldsToUpdate.firstname = newUser.given_name;
    }
    if(newUser.family_name !== lastUser.lastname) {
        fieldsToUpdate.lastname = newUser.family_name;
    }
    if(newUser.email !== lastUser.email) {
        fieldsToUpdate.email = newUser.email;
    }
    if(newUser.picture !== lastUser.profile_image) {
        fieldsToUpdate.profile_image = newUser.picture;
    }
   
    if(Object.values(fieldsToUpdate).length === 0) {
        return await getById(lastUser._id);
    }

    fieldsToUpdate.id = lastUser._id;

    try {
        await update(fieldsToUpdate);
        return await getById(fieldsToUpdate.id);
    } catch (error) {
        throw error;
    }
}

module.exports = updateByProvider;