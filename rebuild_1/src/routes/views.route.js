import { Router } from "express";

import {
  getProducts,
  getProduct,
  postProduct,
  getAddProducts
} from "../controllers/views/products.controllers.js";
import { getProfile } from "../controllers/views/users.controller.js";
import {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  getErrorLogin,
  getErrorRegister,
  getLogout,
} from "../controllers/views/auth.controllers.js";
import { githubAuth,  } from "../controllers/views/passport.controllers.js";
import {jwtAuth} from "../middlewares/auth.js"
import {
  githubAuthenticate,
  githubAuthenticateFailure,
  jwtAuthenticate
} from "../middlewares/passport.js";
import { getCart } from "../controllers/views/carts.controllers.js";

const router = Router();

// PRODUCTS
router.route("/products").get(jwtAuth, getProducts).post(jwtAuth, postProduct);
router.get("/product/:id", jwtAuth, getProduct);
router.get("/addproduct", jwtAuth, getAddProducts)

//CART
router.route("/cart/:id").get(jwtAuth, getCart);

//AUTH
router.route("/login").get(jwtAuth, getLogin).post(postLogin);
router.route("/register").get(jwtAuth, getRegister).post(postRegister);
router.get("/logout", getLogout);

// GITHUB PASSPORT
router.get("/github", githubAuthenticate);
router.get("/callbackGithub", githubAuthenticateFailure, githubAuth);

// USER
router.get("/profile", jwtAuth, getProfile);

// ERROR
router.get("/errorLogin", getErrorLogin);
router.get("/errorRegister", getErrorRegister);

export default router;
