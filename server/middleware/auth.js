const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ status_code: 'ERR_AUTH_TOKEN_NOTFOUND', message: 'Hiányzó token!' });
  }

  try {
    jwt.verify(token, config.get('JWT_SECRET'), (error, token) => {
      if (error) {
        return res.status(401).json({ status_code: 'ERR_AUTH_TOKEN_INVALID', msg: 'Hibás token!' });
      } else {
        req.user = token.user;
        next();
      }
    });
  } catch (err) {
    console.error('auth middleware hiba');
    return res.status(500).json({ status_code: 'ERR_INTERNAL_SERVER', message: 'Szerver hiba!' });
  }
};