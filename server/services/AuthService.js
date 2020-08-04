const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('config');

const UserModel = require('../models/User');

class AuthService {
    loginUser = (reqUser, error, success) => {
        UserModel.findOne({ email: reqUser.email }, (err, user) => {
          if(err || !user) {
            error({ status_code: 'ERR_AUTH_USER_NOTFOUND', message: 'Nincs ilyen felhasználó az adatbázisban!' });
          } else {
            console.log(user);
            if(!bcrypt.compareSync(reqUser.password, user.password)) {
              error({ status_code: 'ERR_AUTH_FAILED', message: 'Sikertelen bejelentkezés!' });
            } else {
              const payload = {
                user: {
                  id: user.id,
                  email: user.email,
                  lastName: user.lastName,
                  firstName: user.firstName
                }
              }

              jwt.sign(
                payload,
                config.get('JWT_SECRET'),
                { expiresIn: 3600000 }, (err, token) => {
                  if(err) {
                    console.log(err);
                  } else {
                    success({ token });
                  }
              });
            }
          }
        });
    }
}

module.exports = new AuthService();