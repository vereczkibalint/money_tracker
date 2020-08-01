const mongoose = require('mongoose');
const config = require('config');

const dbURI = config.get('MONGODB_URI');

const connectToDB = async() => {
    try {
        await mongoose.connect(dbURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectToDB;