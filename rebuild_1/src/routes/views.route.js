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
import {
  githubAuthenticate,
  githubAuthenticateFailure,
  jwtAuthenticate
} from "../middlewares/passport.js";
import { getCart } from "../controllers/views/carts.controllers.js";

const router = Router();

// PRODUCTS
router.route("/products").get(auth, getProducts).post(jwtAuthenticate, postProduct);
router.get("/product/:id", jwtAuthenticate, getProduct);
router.get("/addproduct", jwtAuthenticate, getAddProducts)

//CART
router.route("/cart/:id").get(jwtAuthenticate, getCart);

//AUTH
router.route("/login").get(jwtAuthenticate, getLogin).post(postLogin);
router.route("/register").get(jwtAuthenticate, getRegister).post(postRegister);
router.get("/logout", getLogout);

// GITHUB PASSPORT
router.get("/github", githubAuthenticate);
router.get("/callbackGithub", githubAuthenticateFailure, githubAuth);

// USER
router.get("/profile", jwtAuthenticate, getProfile);

// ERROR
router.get("/errorLogin", getErrorLogin);
router.get("/errorRegister", getErrorRegister);

export default router;
