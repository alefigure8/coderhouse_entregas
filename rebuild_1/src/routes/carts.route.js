import { Router } from "express";

import {
  deleteCart,
  deleteProductInCart,
  deleteProductsInCart,
  getCart,
  postCart,
  putCart,
  putProductInCart,
} from "../controllers/API/carts.controller.js";
import { jwtAuthenticate } from "../middlewares/passport.js";

const router = Router();

// Ver carrito
router.get("/:cid", jwtAuthenticate, getCart);

// Crear un carrito
router.post("/", jwtAuthenticate, postCart);

// Agregar un producto o arreglo de productos al carrito
router.put("/:cid", jwtAuthenticate, putCart);

// Eliminar carrito
router.delete("/:cid/",jwtAuthenticate, deleteCart);

// Actualizar un producto del carrito
router.put("/:cid/product/:pid", jwtAuthenticate, putProductInCart);

// Eliminar un producto del carrito
router.delete("/:cid/product/:pid",jwtAuthenticate, deleteProductInCart);

// Vaciar el carrito
router.delete("/:cid/product", jwtAuthenticate, deleteProductsInCart);

export default router;
