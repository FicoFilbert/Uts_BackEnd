const { errorResponder, errorTypes } = require('../../../core/errors');
const authenticationServices = require('./authentication-service');

/**
 * Handle login request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function login(request, response, next) {
  const { email, password } = request.body;

  try {
    const user = await authenticationServices.getUserByEmail(email);

    const { maxLoginAttempts, loginAttempts, lastFailedLogin } = user;

    if (
      loginAttempts >= maxLoginAttempts &&
      loginLimitDuration(lastFailedLogin)
    ) {
      // kalo loginAttempts > 5, dan masih dalam 30 menit maka gagal
      throw errorResponder(
        errorTypes.FORBIDDEN,
        'Too many failed login attempts. Please try again later.'
      );
    }

    // Check login credentials
    const loginSuccess = await authenticationServices.checkLoginCredentials(
      email,
      password
    );

    if (!loginSuccess) {
      await authenticationServices.updateLoginAttempts(email);
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        'Wrong email or password'
      );
    }

    return response.status(200).json(loginSuccess);
  } catch (error) {
    return next(error);
  }
}

function loginLimitDuration(timestamp) {
  const THIRTY_MINUTES = 30 * 60 * 1000; // 30 minutes in milliseconds
  const lastFailedLogin = new Date(timestamp);
  return Date.now() - lastFailedLogin <= THIRTY_MINUTES;
}

module.exports = {
  login,
};
