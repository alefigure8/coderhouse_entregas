import { Router } from "express";

/* FILE SYSTEM*/
//import CartManager from "../dao/fileManagers/CartManager.js";

/* MONGO */
import CartManager from "../dao/mongoManagers/CartManager.js";

const router = Router();

// VER CARRITO
router.get("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    console.log("cid", cid);
    const cartManager = new CartManager();
    const cart = await cartManager.getCartById(cid);
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
});

// AGREGAR UN ARREGLO DE PRODUCTOS AL CARRITO
router.put("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const products = req.body;
    const cartManager = new CartManager();
    const cart = await cartManager.insertProductsInCart(cid, products);
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
});

// VACIAR CARRITO
router.delete("/:cid/product", async (req, res) => {
  try {
    const cid = req.params.cid;
    const cartManager = new CartManager();
    const cart = await cartManager.emptyCart(cid);
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
});

// ACTUALIZAR UN PRODUCTO EN UN CARRITO
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const { quantity } = req.body;
    const cartManager = new CartManager();
    await cartManager.updateCart(cid, pid, quantity);
    res.redirect(`/carts/${cid}`);
  } catch (error) {
    res.status(400).json({ status: "error", error: "Ocurrió un error" });
  }
});


// CREAR UN CARRITO
router.post("/", async (req, res) => {
  try {
    const cartManager = new CartManager();
    const cart = await cartManager.addCart();
    res.status(201).json({ status: "success", cart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// DELETE PRODUCTO DE UN CARRITO
router.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const cartManager = new CartManager();
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cart = await cartManager.deleteProduct(cid, pid);
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// DELETE CARRITO
router.delete("/:cid/", async (req, res) => {
  try {
    const cartManager = new CartManager();
    const cid = req.params.cid;
    const cart = await cartManager.deleteCart(cid);
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

export default router;
