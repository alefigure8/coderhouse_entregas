import jwt from "jsonwebtoken";
import { config } from "./config.js";

export const generateToken = async (user) => {
  try {
    // eslint-disable-next-line no-undef
  const token =  jwt.sign(user, config.jwtSecret, { expiresIn: "1h" });
  return token;
  } catch (error) {
    console.log(error);
  }
};
