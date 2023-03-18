import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// **** DIRNAME **** //
export const __dirname = dirname(fileURLToPath(import.meta.url));

// **** BCRYPT **** //

const SALTROUNDS = 10;

//Generate salt
const generateSalt = async () => {
  return bcrypt.genSalt(SALTROUNDS);
};

//Hash password
export const hashPass = async (pass) => {
  const salt = await generateSalt();
  return bcrypt.hash(pass, salt);
};

//Compare password
export const comparePassword = async (userPass, hashPass) => {
  return bcrypt.compare(userPass, hashPass);
};

// **** JWT **** //

//Generate token
export const generateToken = async (user) => {
  // eslint-disable-next-line no-undef
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
  return token;
};

// **** COOKIE **** //

//Cookie extractor
export const cookieExtractor = (req) => {
  const token = req?.signedCookies?.token;
  return token;
};
