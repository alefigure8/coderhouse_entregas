import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const productManager = new ProductManager();
    const listaProductos = await productManager.getProducts();
    res.status(200).json({ status: "success", payload: listaProductos });
  } catch (error) {
    res.status(400).json({ status: "error", error: "Ocurrió un error" });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const productManager = new ProductManager();
    const producto = await productManager.getProductById(id);
    res.status(200).json({ status: "success", payload: producto });
  } catch (error) {
    res.status(400).json({ status: "error", error: "Ocurrió un error" });
  }
});

router.post('/', async (req, res)=>{
    try {
        const {title, description, price, thumbnail, code, stock, category, status} = req.body;
        const productManager = new ProductManager();
        const productoAgregado = await productManager.addProduct(title, description, price, thumbnail, code, stock, category, status);
        res.status(200).json({status: "success", payload: productoAgregado});
    } catch (error) {
        res.status(400).json({ status: "error", error: "Ocurrió un error" });
    }
})

router.put('/:pid', async (req, res)=>{
    try {
        const {title, description, price, thumbnail, code, stock, category, status} = req.body;
        const productManager = new ProductManager();
        const productoAgregado = await productManager.updateProduct(title, description, price, thumbnail, code, stock, category, status);
        res.status(200).json({status: "success", payload: productoAgregado});
    } catch (error) {
        res.status(400).json({ status: "error", error: "Ocurrió un error" });
    }
});

router.delete('/:pid', async (req, res)=>{
    try {
        const id = parseInt(req.params.pid);
        const productManager = new ProductManager();
        const productoEliminado = await productManager.deleteProduct(id);
        res.status(200).json({status: "success", payload: productoEliminado});
    } catch (error) {
        res.status(400).json({ status: "error", error: "Ocurrió un error" });
    }
});

export default router;
