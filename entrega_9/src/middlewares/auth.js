//import UsersManager from "../dao/mongoManagers/UsersManager.js";
import jwt from "jsonwebtoken";

// SESSION
export const auth = (req, res, next) => {
  if (req?.session?.logged) {
    res.user = req.session;
  } else {
    res.user = undefined;
  }
  next();
};

// JWT
export const jwtAuth = (req, res, next) => {
  // eslint-disable-next-line no-undef
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
    if (decoded) {
      res.user = decoded;
    } else {
      res.user = undefined;
    }
  });

  next();
};
