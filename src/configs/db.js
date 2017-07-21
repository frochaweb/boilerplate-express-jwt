import mongoose from 'mongoose';

//const MONGO_URL = 'mongodb://localhost/api_v1';
import constants from './constants';

mongoose.Promise = global.Promise;

try {
    mongoose.connect(constants.MONGO_URL, {useMongoClient: true});
} catch (err) {
    mongoose.createConnection(constants.MONGO_URL);
}

mongoose.connection
    .once('open', () => {
        console.log('MongoDB rodando');
    })
    .on('error', (err) => {
        throw err;
    });