//import UsersManager from "../dao/mongoManagers/UsersManager.js";
import jwt from "jsonwebtoken";

// JWT
export const jwtAuth = (req, res, next) => {
  const token = req.signedCookies.token;
  // eslint-disable-next-line no-undef
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (decoded) {
      res.user = decoded;
    } else {
      res.user = undefined;
    }
  });

  next();
};
