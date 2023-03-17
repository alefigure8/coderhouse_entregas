import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from 'bcrypt'

// **** DIRNAME **** //
export const __dirname = dirname(fileURLToPath(import.meta.url));

// **** BCRYPT **** //

//Hash password
const SALTROUNDS = 10;

const generateSalt = async () => {
    return bcrypt.genSalt(SALTROUNDS);
}

export const hashPass = async pass => {
    const salt = await generateSalt();
    return bcrypt.hash(pass, salt);
}

//Compare password
export const comparePassword = async (userPass, hashPass) => {
    return bcrypt.compare(userPass, hashPass)
}