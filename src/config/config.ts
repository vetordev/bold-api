import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

const config = {
  port: process.env.PORT || 3333,
};

export default config;
