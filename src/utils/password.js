const bcrypt = require('bcrypt');

const saltResoulds = 15;

const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltResoulds);
    return bcrypt.hashSync(password, salt);
}

const comparePasswords = async (password, db_password) => {
    return await bcrypt.compare(password, db_password);
}

module.exports = {
    encryptPassword,
    comparePasswords
}