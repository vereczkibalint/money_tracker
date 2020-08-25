const ChallengeModel = require('../models/Challenge');

class ChallengeService {
    fetchAllChallenges = (userId, error, success) => {
        try {
            ChallengeModel.find({ ownedBy: userId }, (err, res) => {
                if(err || !res) {
                    error({ status_code: 'ERR_CHALLENGE_NO_CHALLENGE_FOUND', errors: [ {msg: 'Nincsenek kihívások!'}] });
                } else {
                    success(res);
                }
            });
        } catch (err) {
            console.error(err.message);
            error({ status_code: 'ERR_INTERNAL_SERVER', errors: [ {msg: 'Szerver hiba!'} ] });
        }    
    }

    fetchChallengeById = (challengeData, error, success) => {
        try {
            const { challengeId, userId } = challengeData;
            ChallengeModel.findById({ _id: challengeId, ownerBy: userId }, {}, (err, res) => {
                if(err || !res) {
                    error({ status_code: 'ERR_CHALLENGE_NOT_FOUND', errors: [ {msg: 'A kihívás nem található!'}] });
                } else {
                    success(res);
                }
            });
        } catch (err) {
            if(err.kind === "ObjectId") {
                error({ status_code: 'ERR_CHALLENGE_NOT_FOUND', errors: [ {msg: 'A kihívás nem található!'}] });
            }
            error({ status_code: 'ERR_INTERNAL_SERVER', errors: [ {msg: 'Szerver hiba!' }] });
        }
    }

    insertChallenge = (challenge, error, success) => {
        try {
            const newChallenge = new ChallengeModel(challenge);

            newChallenge.save({}, (err, res) => {
                if(err || !res) {
                    error({ status_code: 'ERR_CHALLENGE_FAILED_INSERT', errors: [ {msg: 'A kihívás felvitele során hiba történt!'}] });
                } else {
                    success(res);
                }
            });
        } catch (err) {
            console.error(err.message);
            error({ status_code: 'ERR_INTERNAL_SERVER', errors: [ {msg: 'Szerver hiba!'}] });
        }
    }

    updateChallenge = (challenge, error, success) => {
        try {
            ChallengeModel.findOneAndUpdate({ _id: challenge.id, ownedBy: challenge.ownedBy }, {
                title: challenge.title,
                description: challenge.description,
                goalAmount: challenge.goalAmount,
                deadline: challenge.deadline
            }, { returnOriginal:false }, (err, res) => {
                if(err || !res) {
                    error({ status_code: 'ERR_CHALLENGE_FAILED_UPDATE', errors: [ {msg: 'A kihívás módosítása során hiba történt!'}] });
                } else {
                    success(res);
                }
            });
        } catch (err) {
            if(err.kind === "ObjectId") {
                error({ status_code: 'ERR_CHALLENGE_CATEGORY_NOTFOUND', errors: [ {msg: 'A kihívás nem található!'}] });
            }
            console.error(err.message);
            error({ status_code: 'ERR_INTERNAL_SERVER', errors: [ {msg: 'Szerver hiba!'}] });
        }
    }

    deleteChallenge = (challenge, error, success) => {
        try {
            const { challengeId, userId } = challenge;
            ChallengeModel.findOneAndDelete({ _id: challengeId, ownedBy: userId }, (err, res) => {
                if(err || !res || res === null) {
                    error({ status_code: 'ERR_CHALLENGE_FAILED_DELETE', errors: [ {msg: 'A kihívás törlése során hiba történt!'}] });
                } else {
                    success({ msg: 'Sikeres törlés!' });
                }
            });
        } catch (err) {
            if(err.kind === "ObjectId") {
                error({ status_code: 'ERR_CHALLENGE_NOT_FOUND', errors: [ {msg: 'A kihívás nem található!'}] });
            }
            console.error(err.message);
            error({ status_code: 'ERR_INTERNAL_SERVER', errors: [ { msg: 'Szerver hiba!'}] });
        }
    }
}

module.exports = new ChallengeService();