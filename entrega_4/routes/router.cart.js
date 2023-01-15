import { Router } from "express";
import CartManager from "../model/CartManager.js";

const router = Router();

router.get("/:cid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const cartManager = new CartManager();
    const cart = await cartManager.getCartById(cid);
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(400).json({ status: "error", error: "Ocurrió un error" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const { quantity } = req.body;
    const cartManager = new CartManager();
    const cart = await cartManager.updateCart(cid, pid, quantity);
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(400).json({ status: "error", error: "Ocurrió un error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const cartManager = new CartManager();
    const cart = await cartManager.addCart();
    res.status(201).json({ status: "success", cart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

export default router;
