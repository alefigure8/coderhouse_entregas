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

const router = Router();

// Ver carrito
router.get("/:cid", getCart);

// Crear un carrito
router.post("/", postCart);

// Agregar un producto o arreglo de productos al carrito
router.put("/:cid", putCart);

// Eliminar carrito
router.delete("/:cid/", deleteCart);

// Actualizar un producto del carrito
router.put("/:cid/product/:pid", putProductInCart);

// Eliminar un producto del carrito
router.delete("/:cid/product/:pid",deleteProductInCart);

// Vaciar el carrito
router.delete("/:cid/product", deleteProductsInCart);

export default router;
