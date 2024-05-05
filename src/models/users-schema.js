const usersSchema = {
  name: String,
  email: String,
  password: String,
  loginAttempts: { type: Number, default: 0 },
  maxLoginAttempts: { type: Number, default: 5 },
  lastFailedLogin: { type: Date, default: null },
};

module.exports = usersSchema;
