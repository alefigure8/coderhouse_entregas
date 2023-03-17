import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

// **** JWT **** //

//Generate token
export const generateToken = async (user) => {
    // eslint-disable-next-line no-undef
    const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '1h'});
    return token;
}


export const cookieExtractor = (req)=>{
	const token = req?.cookies?.token;
	return token;
}