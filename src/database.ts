import mongoose from 'mongoose';
import config from './config/config';

export default class Database {
  static async connect() {
    try {
      return await mongoose.connect(config.mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
    } catch (error) {
      return error;
    }
  }

  static async disconnect() {
    try {
      return await mongoose.disconnect();
    } catch (error) {
      return error;
    }
  }
}
