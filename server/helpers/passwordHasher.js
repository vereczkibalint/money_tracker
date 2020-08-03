const bcrypt = require('bcryptjs');

const passwordHasher = (password) => {
  const passwordSalt = bcrypt.genSaltSync(10);

  return bcrypt.hashSync(password, passwordSalt);
}

module.exports = passwordHasher;