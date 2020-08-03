const bcrypt = require('bcryptjs');

module.exports = passwordHasher = (password) => {
  const passwordSalt = bcrypt.genSaltSync(10);

  return bcrypt.hashSync(password, passwordSalt);
}