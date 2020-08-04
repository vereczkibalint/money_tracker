const MoneyModel = require('../models/Money');

class MoneyService {
  fetchExpense(userId, error, success) {
    MoneyModel.find({ ownedBy: userId }, (err, res) => {
      if(err || !res) {
        error({ status_code: 'ERR_EXPENSE_NOTFOUND', message: 'Kiadás nem található!' });
      } else {
        success(res);
      }
    })
  }

  insertExpense(moneyData, error, success) {
    try {
      const newMoney = new MoneyModel(moneyData);

      newMoney.save({}, (err, res) => {
        if(err || !res) {
          error({ status_code: 'ERR_EXPENSE_FAILED_INSERT', message: 'Hiba történt az összeg mentése közben!' });
        } else {
            success(res);
        }
      });
    } catch (err) {
      console.error(err.message);
      error({ status_code: 'ERR_INTERNAL_SERVER', message: 'Szerver hiba!' });
    }
  }

  updateExpense(moneyData, error, success) {
    try {
      const { expenseId, ownedBy, moneyType, amount, issueDate } = moneyData;

      MoneyModel.findOneAndUpdate({ _id: expenseId, ownedBy }, {
        moneyType,
        amount,
        issueDate
      }, (err, res) => {
        if(err || !res) {
          error({ status_code: 'ERR_EXPENSE_FAILED_UPDATE', message: 'Az érték módosítása során hiba történt!' });
        } else {
            success(res);
        }
      });
    } catch (err) {
      console.error(err.message);
      error({ status_code: 'ERR_INTERNAL_SERVER', message: 'Szerver hiba!' });
    }
  }

  deleteExpense(moneyData, error, success) {
    try {
      const { expenseId, userId } = moneyData;
      MoneyModel.findOneAndDelete({ _id: expenseId, ownedBy: userId }, (err, res) => {
        if(err || !res || res === null) {
          error({ status_code: 'ERR_EXPENSE_FAILED_REMOVE', message: 'Az érték törlése során hiba történt!' });
        } else {
            success({ message: 'Sikeres törlés!' });
        }
      });
    } catch (err) {
      console.error(err.message);
      error({ status_code: 'ERR_INTERNAL_SERVER', message: 'Szerver hiba!' });
    }
  }
}

module.exports = new MoneyService();