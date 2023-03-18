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

// private cart
export const privateCart = (req, res, next) => {
  const cartId = req.params.id;
  const user = res.user;
  if (user.cartId == cartId) {
    return next();
  }

  res.redirect("/errorLogin");
};
