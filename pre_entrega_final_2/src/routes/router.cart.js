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

// CREAR UN PRODUCTO EN UN CARRITO
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const { quantity } = req.body;
    const cartManager = new CartManager();
    const cart = await cartManager.updateCart(cid, pid, quantity);
    res.status(200).json({ status: "success", payload: cart });
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
router.delete('/:cid/product/:pid', async (req, res)=>{
  try {
    const cartManager = new CartManager();
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cart = await cartManager.deleteProduct(cid, pid);
    res.status(200).json({status: "success", payload: cart});
  } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
  }
});

// DELETE CARRITO
router.delete('/:cid/product/:pid', async (req, res)=>{
  try {
    const cartManager = new CartManager();
    const cid = req.params.cid;
   const cart = cartManager.deleteCart(cid);
    res.status(200).json({status: "success", payload: cart});
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
  
});

export default router;
