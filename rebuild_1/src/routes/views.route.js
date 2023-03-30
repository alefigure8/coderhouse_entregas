import { Router } from "express";

import {
  getProducts,
  getProduct,
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

import {githubAuth} from '../controllers/views/passport.controllers.js'

import { jwtAuth } from "../middlewares/auth.js";
import { githubAuthenticate, githubAuthenticateFailure } from "../middlewares/passport.js";

const router = Router();

// PRODUCTS
router.get("/products", getProducts);
router.get("/product/:id", getProduct);

//CART

//AUTH
router.route("/login").get(getLogin).post(postLogin);
router.route("/register").get(getRegister).post(postRegister);
router.get("/logout", getLogout);
// GITHUB PASSPORT
router.get(
  "/github",
  githubAuthenticate
);

router.get(
  "/callbackGithub",
  githubAuthenticateFailure,
  githubAuth
);

// USER
router.get("/profile", jwtAuth, getProfile);

// ERROR
router.get("/errorLogin", getErrorLogin);
router.get("/errorRegister", getErrorRegister);

export default router;
