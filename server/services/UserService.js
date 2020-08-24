const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const UserModel = require('../models/User');
const passwordHasher = require('../helpers/passwordHasher');

class UserService {
  fetchAllUsers = (error, success) => {
    try{
      UserModel.find({}, { "password": 0 }, (err, res) => {
        if(err || !res) {
          error({ status_code: 'ERR_USER_NO_USERS', msg: 'Nincsenek felhasználók!' });
        } else {
          success(res);
        }
      });
    } catch(err) {
      console.error(err.message);
      error({ status_code: 'ERR_INTERNAL_SERVER', msg: 'Szerver hiba!' });
    }
    
  }

  fetchUserById = (userId, error, success) => {
    try{
      UserModel.find({ _id: userId }, { "password": 0 }, (err, res) => {
        if(err || !res) {
          error({ status_code: 'ERR_USER_NOTFOUND', msg: 'Felhasználó nem található!' });
        } else {
          success(res);
        }
      });
    } catch(err) {
      if(err.kind === "ObjectId") {
        error({ status_code: 'ERR_USER_NOTFOUND', msg: 'Felhasználó nem található!' });
      }
      console.error(err.message);
      error({ status_code: 'ERR_INTERNAL_SERVER', msg: 'Szerver hiba!' });
    }
  }

  registerUser = (user, error, success) => {
    try {
      if(user.password !== user.password_confirm) {
        error({ status_code: 'ERR_USER_PASSWORD_NOTMATCH', msg: 'A két jelszó nem egyezik meg!' });
      }

      UserModel.findOne({ email: user.email }, (err, res) => {
        if(res !== null) {
          error({ status_code: 'ERR_USER_EMAIL_INUSE', msg: 'Ezzel az email címmel már regisztráltak!' });
        } else {
          const newUser = new UserModel(user);

          newUser.password = passwordHasher(newUser.password);

          newUser.save({}, (err, res) => {
            if(err || !res) {
              error({ status_code: 'ERR_USER_FAILED_REGISTER', msg: 'Hiba történt a regisztráció közben!' }, err);
            } else {
              const payload = {
                user: {
                  id: newUser.id,
                  email: newUser.email,
                  lastName: newUser.lastName,
                  firstName: newUser.firstName
                }
              }

              jwt.sign(
                payload,
                config.get('JWT_SECRET'),
                { expiresIn: 3600000 }, (err, token) => {
                  if(err) {
                    throw err;
                  } else {
                    success({ user: payload.user, token });
                  }
              });
            }
          });
        }
      });
    } catch (err) {
      console.error(err.message);
      error({ status_code: 'ERR_INTERNAL_SERVER', msg: 'Szerver hiba!' });
    }
  }

  changePassword = (user, error, success) => {
    try {
      const { id, old_password, password } = user;
      UserModel.findById(id, (err, userToUpdate) => {
        if(err || !userToUpdate) {
          error({ status_code: 'ERR_USER_NOTFOUND', msg: 'Felhasználó nem található!' });
        } else {
          if(!bcrypt.compareSync(old_password, userToUpdate.password)) {
            error({ status_code: 'ERR_USER_FAILED_PASSWORDVERIFY', msg: 'Hibás jelenlegi jelszó!' });
          } else {
            const hashedPassword = passwordHasher(password);
            userToUpdate.password = hashedPassword;
            userToUpdate.save({}, (err, result) => {
              if(err || !result) {
                error({ status_code: 'ERR_USER_FAILED_PASSWORDCHANGE', msg: 'Hiba történt a jelszómódosítás közben!' });
              } else {
                success({ msg: 'Sikeres jelszómódosítás!' });
              }
            });
          }    
        }
      });
    } catch (err) {
      if(err.kind === "ObjectId") {
        error({ status_code: 'ERR_USER_NOTFOUND', msg: 'Felhasználó nem található!' });
      }
      console.error(err.message);
      error({ status_code: 'ERR_INTERNAL_SERVER', msg: 'Szerver hiba!' });
    }
  }

  deleteUser = (userId, error, success) => {
    try {
      UserModel.findOneAndDelete({ _id: userId }, (err, res) => {
        if(err || !res || res === null) {
          error({ status_code: 'ERR_USER_FAILED_DELETE', msg: 'A felhasználó törlése során hiba történt!' });
        } else {
            success({ msg: 'Sikeres törlés!' });
        }
      });
    } catch (err) {
      if(err.kind === "ObjectId") {
        error({ status_code: 'ERR_USER_NOTFOUND', msg: 'Felhasználó nem található!' });
      }
      console.error(err.message);
      error({ status_code: 'ERR_INTERNAL_SERVER', msg: 'Szerver hiba!' });
    }
  }
}

module.exports = new UserService();