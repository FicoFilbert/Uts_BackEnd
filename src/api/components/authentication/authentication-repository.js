const { User } = require('../../../models');

/**
 * Get user by email for login information
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

async function updateLoginAttempts(email) {
  await User.updateOne(
    { email },
    { $inc: { loginAttempts: 1 }, $set: { lastFailedLogin: new Date() } }
  );
}

async function resetLoginAttempts(email) {
  await User.updateOne({ email }, { loginAttempts: 0 });
}

module.exports = {
  getUserByEmail,
  updateLoginAttempts,
  resetLoginAttempts,
};
