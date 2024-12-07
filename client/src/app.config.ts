import dotenv from 'dotenv';

dotenv.config();

const { AUTH_PATH } = process.env;
console.log(process.env)

export { AUTH_PATH };
