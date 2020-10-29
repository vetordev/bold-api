import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

const config = {
  port: process.env.PORT || 3333,
  mongoURL: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtOptions: {
    // expiresIn: 60
  },
};

export default config;
