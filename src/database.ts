import mongoose from 'mongoose';
import config from './config/config';

export default class Database {
  constructor() {
    try {
      mongoose.connect(config.mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (error) {
      return error;
    }
  }
}
