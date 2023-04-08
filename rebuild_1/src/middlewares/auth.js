import jwt from "jsonwebtoken";
import {config} from '../utils/config.js'

// JWT
export const jwtAuth = (req, res, next) => {
  const token = req.signedCookies.token;

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (decoded) {
      res.user = decoded;
    } else {
      res.user = undefined;
    }
    
  });

  next();
};