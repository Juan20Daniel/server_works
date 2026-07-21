const registerWithEmail = require('./registerWithEmail');
const loginWithEmail = require('./loginWithEmail');
const continueWithGoogle = require('./continueWithGoogle');
const continueWithFacebook = require('./continueWithFacebook');
const refresh = require('./refresh');

module.exports = {
    registerWithEmail,
    loginWithEmail,
    continueWithGoogle,
    continueWithFacebook,
    refresh
}