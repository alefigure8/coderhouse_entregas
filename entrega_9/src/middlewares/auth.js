//import UsersManager from "../dao/mongoManagers/UsersManager.js";
import jwt from "jsonwebtoken";

// SESSION
export const auth = (req, res, next) => {
  if (req?.session?.logged) {
    res.user = req.session;
    next();
  } else {
    res.user = undefined;
    next();
  }
};

// JWT
export const jwtAuth = (req, res, next) => {
  const isValid = jwt.verify(req.cookies["token"], process.env.JWT_SECRET);
  if (isValid) {
    res.user = isValid;
    next();
  } else {
    res.status(401).json({ error: "No autorizado" });
  }
}