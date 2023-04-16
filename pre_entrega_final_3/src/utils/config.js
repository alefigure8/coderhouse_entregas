import dotenv from 'dotenv';
import {options} from './commander.js';

dotenv.config({
    path: options.mode === 'stage' ? '.env' : '.env.development'
});

export const config = {
    port: process.env.PORT,
    persistemce: process.env.PERSISTENCE,
    mongoUrl: process.env.MONGO_URI,
    mongoPass: process.env.MONGO_PASS,
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    mailAdmin: process.env.MAIL_ADMIN
};